/*global cryptoPro, SP, JSRequest, ko, _spPageContextInfo*/

(function (cryptoPro) {
    'use strict';

// ReSharper disable once InconsistentNaming
    function ErrorMessage(message) {
// ReSharper restore InconsistentNaming
        var self = this;

        self.MessageBody = ko.observable(message);
    }

// ReSharper disable InconsistentNaming
    function Params() {
// ReSharper restore InconsistentNaming
        var self = this;

        self.Disable = ko.observable(true);
        self.ActionReason = ko.observable("");
    }

// ReSharper disable InconsistentNaming
    function LicenseModel() {
// ReSharper restore InconsistentNaming
        var self = this;
        // model properties
        self.Params = ko.observable(new Params());
        self.Errors = ko.observableArray([]);
        self.InProgress = ko.observable(false);
        // model methods
        self.Validate = function() {
            self.Errors.removeAll();

            if (!cryptoPro.isPluginInstalled())
                self.AddError(new ErrorMessage('Необходимо <a href="http://www.cryptopro.ru/products/cades/plugin/get">установить плагин</a> для работы с ЭЦП'));

            var dlg = SP.UI.ModalDialog.get_childDialog();
            if (dlg) dlg.autoSize();
        };

        self.BuildGetXmlJson = function() {
            var itemId = JSRequest.QueryString.ItemId;
            var reason = self.Params().ActionReason();
            var disable = self.Params().Disable();

            return '{' +
                'licenseId: ' + itemId + ', ' +
                'disabled: ' + disable + ', ' +
                'reason: "' + encodeURIComponent(reason) + '"' +
                '}';
        };

        self.BuildSaveSignedJson = function(signatureValue) {
            var itemId = JSRequest.QueryString.ItemId;
            var reason = self.Params().ActionReason();
            var disable = self.Params().Disable();

            return '{' +
                'licenseId: ' + itemId + ', ' +
                'disabled: ' + disable + ', ' +
                'reason: "' + encodeURIComponent(reason) + '", ' +
                'signature: "' + encodeURIComponent(signatureValue) + '"' +
                '}';
        };

        self.AddError = function(newError) {
            self.Errors.push(newError);

            var dlg = SP.UI.ModalDialog.get_childDialog();
            if (dlg) dlg.autoSize();
        };

        self.DoAction = function () {
            self.InProgress(true);
            var def = new $.Deferred();

            // client validation logic
            self.Validate();

            if (self.Errors().length > 0) {
                def.reject();
                return;
            }

            $.ajax({
                type: 'POST',
                url: self.RequestUrl + '/DisableGibddGetXml',
                data: self.BuildGetXmlJson(),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.d) {
                        var dataToSign = data.d;

                        var oCertificate = cryptoPro.SelectCertificate(
                            cryptoPro.StoreLocation.CAPICOM_CURRENT_USER_STORE,
                            cryptoPro.StoreNames.CAPICOM_MY_STORE,
                            cryptoPro.StoreOpenMode.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

                        if (oCertificate) {
                            dataToSign =
                                "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                                    "<Envelope xmlns=\"urn:envelope\">\n" +
                                    dataToSign +
                                    " \n" +
                                    "</Envelope>";

                            var signedData;
                            try {
                                signedData = cryptoPro.SignXMLCreate(oCertificate, dataToSign);
                            } catch (e) {
                                self.AddError(new ErrorMessage("Ошибка при формировании подписи: " + e.message));
                                def.reject();
                            }

                            if (typeof signedData === 'undefined' || !signedData) {
                                def.reject();
                                return;
                            }

                            $.ajax({
                                type: 'POST',
                                url: self.RequestUrl + '/SaveSignedDisableGibdd',
                                data: self.BuildSaveSignedJson(signedData),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function () {
                                    window.frameElement.commonModalDialogClose(1, null);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    self.AddError(new ErrorMessage("Ошибка сохранения подписанного документа: " + xhr.status + ", " + thrownError));
                                    def.reject();
                                }
                            });
                        } else {
                            def.reject();
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    self.AddError(new ErrorMessage("Ошибка получения xml для подписи: " + xhr.status + ", " + thrownError));
                    def.reject();
                }
            });

            def.always(function () {
                self.InProgress(false);
            });
        };

        self.CancelAction = function() {
            window.frameElement.commonModalDialogClose(0, null);
        };

        // initialization
        JSRequest.EnsureSetup();
        self.RequestUrl = _spPageContextInfo.webAbsoluteUrl + '/' + _spPageContextInfo.layoutsUrl + '/TaxoMotor/LicenseService.aspx';
    }

    function sharepointReady() {
        ko.applyBindings(new LicenseModel());
    }

    function init() {
        SP.SOD.executeOrDelayUntilScriptLoaded(sharepointReady, "SP.js");
    }

    if (!_spBodyOnLoadCalled) {
        _spBodyOnLoadFunctions.push(init);
    } else {
        init();
    }

})(cryptoPro);