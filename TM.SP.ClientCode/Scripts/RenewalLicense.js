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

        self.DateFrom = ko.observable(new Date());
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
        self.Validate = function () {
            self.Errors.removeAll();

            var dateFrom = self.Params().DateFrom();

            if (!dateFrom)
                self.AddError(new ErrorMessage('Необходимо указать дату возобновления'));
            if (!cryptoPro.isPluginInstalled())
                self.AddError(new ErrorMessage('Необходимо <a href="http://www.cryptopro.ru/products/cades/plugin/get">установить плагин</a> для работы с ЭЦП'));

            var dlg = SP.UI.ModalDialog.get_childDialog();
            if (dlg) dlg.autoSize();
        };

        self.BuildGetXmlJson = function () {
            var itemId = JSRequest.QueryString.ItemId;
            var dateFrom = TM.SP.GetLocalTime(self.Params().DateFrom());
            var reason = self.Params().ActionReason();

            return '{' +
                'licenseId: ' + itemId + ', ' +
                'dateFrom: "\\\/Date(' + dateFrom + ')\\\/", ' +
                'reason: "' + encodeURIComponent(reason) + '"' +
                '}';
        };

        self.BuildSaveSignedJson = function (signatureValue) {
            var itemId = JSRequest.QueryString.ItemId;
            var dateFrom = TM.SP.GetLocalTime(self.Params().DateFrom());
            var reason = self.Params().ActionReason();

            return '{' +
                'licenseId: ' + itemId + ', ' +
                'dateFrom: "\\\/Date(' + dateFrom + ')\\\/", ' +
                'reason: "' + encodeURIComponent(reason) + '", ' +
                'signature: "' + encodeURIComponent(signatureValue) + '"' +
                '}';
        };

        self.AddError = function (newError) {
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

            // server validation logic
            $.ajax({
                type: 'POST',
                url: self.RequestUrl + '/RenewalValidate',
                data: self.BuildGetXmlJson(),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    $.ajax({
                        type: 'POST',
                        url: self.RequestUrl + '/RenewalGetXml',
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
                                        url: self.RequestUrl + '/SaveSignedRenewal',
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
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    var response = $.parseJSON(xhr.responseText).d;
                    self.AddError(new ErrorMessage(response.Error.SystemMessage));
                    def.reject();
                }
            });

            def.always(function () {
                self.InProgress(false);
            });
        };

        self.CancelAction = function () {
            window.frameElement.commonModalDialogClose(0, null);
        };

        // initialization
        JSRequest.EnsureSetup();
        self.RequestUrl = _spPageContextInfo.webAbsoluteUrl + '/' + _spPageContextInfo.layoutsUrl + '/TaxoMotor/LicenseService.aspx';
    }

    function sharepointReady() {
        ko.applyBindings(new LicenseModel());
    }

    ko.bindingHandlers.href = {
        update: function (element, valueAccessor) {
            ko.bindingHandlers.attr.update(element, function () {
                return { href: valueAccessor() };
            });
        }
    };

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {},
                $el = $(element);

            $el.datepicker(options);

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($el.datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $el.datepicker("destroy");
            });

        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                $el = $(element);

            //handle date data coming via json from Microsoft
            if (String(value).indexOf('/Date(') === 0) {
                value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")));
            }

            var current = $el.datepicker("getDate");

            if (value - current !== 0) {
                $el.datepicker("setDate", value);
            }
        }
    };

    function init() {
        $.datepicker.regional.ru = {
            closeText: 'Закрыть',
            prevText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional.ru);

        SP.SOD.executeOrDelayUntilScriptLoaded(sharepointReady, "SP.js");
    }

    if (!_spBodyOnLoadCalled) {
        _spBodyOnLoadFunctions.push(init);
    } else {
        init();
    }

})(cryptoPro);