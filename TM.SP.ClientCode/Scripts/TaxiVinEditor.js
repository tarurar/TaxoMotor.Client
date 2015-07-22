/*global SP, JSRequest, ko, _spPageContextInfo*/

(function () {
    'use strict';

    function autoSize() {
        var dlg = SP.UI.ModalDialog.get_childDialog();
        if (dlg) dlg.autoSize();
    }

    // ReSharper disable InconsistentNaming
    function Params() {
        // ReSharper restore InconsistentNaming
        var self = this;

        self.Vin = ko.observable('');
    }

    // ReSharper disable InconsistentNaming
    function VinEditorModel() {
        // ReSharper restore InconsistentNaming
        var self = this;
        // model properties
        self.Params = ko.observable(new Params());
        self.Error = ko.observable('');

        self.DoAction = function () {
            self.Error('');
            autoSize();

            var ctx = SP.ClientContext.get_current();
            var taxiList = ctx.get_web().get_lists().getById(taxiListId);
            var taxiItem = taxiList.getItemById(taxiId);

            taxiItem.set_item("Tm_TaxiVin", self.Params().Vin());
            taxiItem.update();

            ctx.executeQueryAsync(function () {
                window.frameElement.commonModalDialogClose(SP.UI.DialogResult.OK, null);
            }, function (sender, args) {
                self.Error('При обновлении ТС возникла ошибка. ' + args.get_message() + '\n' + args.get_stackTrace());
                autoSize();
            });
        };

        self.CancelAction = function () {
            window.frameElement.commonModalDialogClose(SP.UI.DialogResult.cancel, null);
        };

        // initialization
        JSRequest.EnsureSetup();
        var taxiId = decodeURIComponent(JSRequest.QueryString.TaxiId);
        var taxiListId = decodeURIComponent(JSRequest.QueryString.TaxiListId);
    }

    function sharepointReady() {
        ko.applyBindings(new VinEditorModel());
    }

    function init() {
        SP.SOD.executeOrDelayUntilScriptLoaded(sharepointReady, "SP.js");
        // $("#vin").inputmask("Regex");
    }

    if (!_spBodyOnLoadCalled) {
        _spBodyOnLoadFunctions.push(init);
    } else {
        init();
    }

})();