/*global SP, JSRequest, ko, _spPageContextInfo*/

(function () {
    'use strict';

    // ReSharper disable InconsistentNaming
    function Params() {
        // ReSharper restore InconsistentNaming
        var self = this;

        self.DenyReason = ko.observableArray([]);
        self.selectedReason = ko.observable();
        self.ActionComment = ko.observable("");
        self.NeedPersonVisit = ko.observable(false);
    }

    // ReSharper disable InconsistentNaming
    function TaxiModel() {
        // ReSharper restore InconsistentNaming
        var self = this;
        // model properties
        self.Params = ko.observable(new Params());

        self.DoAction = function () {
            window.frameElement.commonModalDialogClose(SP.UI.DialogResult.OK, {
                SelectedReason: self.Params().selectedReason(),
                ActionComment: self.Params().ActionComment(),
                NeedPersonVisit: self.Params().NeedPersonVisit()
            });
        };

        self.CancelAction = function () {
            window.frameElement.commonModalDialogClose(SP.UI.DialogResult.cancel, null);
        };

        // initialization
        JSRequest.EnsureSetup();
        self.RequestUrl = _spPageContextInfo.webAbsoluteUrl + '/' + _spPageContextInfo.layoutsUrl + '/TaxoMotor/IncomeRequestService.aspx';
        // load reasons list
        self.Params().DenyReason.push({ id: 0, Title: "<Без указания причины>", Code: 0 });
        $.ajax({
            type: "GET",
            url: encodeURI(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Причины отказа (справочник)')/items?$select=ID, Title, Tm_ServiceCode"),
            headers: { Accept: "application/json;odata=verbose" }
        }).success(function (data) {
            if (data && data.d) {
                $.each(data.d.results, function (index, value) {
                    self.Params().DenyReason.push({ id: this.Id, Title: this.Title, Code: this["Tm_ServiceCode"] });
                });
            }
        }).fail(function (err) {
            alert(err);
        });
    }

    function sharepointReady() {
        ko.applyBindings(new TaxiModel());
    }

    $(document).ready(function () {
        SP.SOD.executeOrDelayUntilScriptLoaded(sharepointReady, "SP.js");
    });
})();