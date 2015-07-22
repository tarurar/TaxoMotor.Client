(function (jQuery) {
    'use strict';
    
    function autoSize() {
        var dlg = SP.UI.ModalDialog.get_childDialog();
        if (dlg) dlg.autoSize();
    }

// ReSharper disable InconsistentNaming
    function ActionProgress() {
// ReSharper restore InconsistentNaming
        var self = this;

        self.Percent = ko.observable(0);
        self.Comment = ko.observable('');
    }

// ReSharper disable InconsistentNaming
    function Action() {
// ReSharper restore InconsistentNaming
        var self = this;

        self.State = ko.observable(); // 0 - undefined, 1 - in progress, 2 - completed successfully, 3 - error
        self.Text = ko.observable('');
        self.Progress = ko.observable(new ActionProgress());
    }

// ReSharper disable InconsistentNaming
    function ProgressDlgModel() {
// ReSharper restore InconsistentNaming

        var self = this;

        self.Actions = ko.observableArray([]);
        self.WholeProgress = ko.observable(new ActionProgress());
        self.CurrentAction = ko.observable();
        self.Error = ko.observable('');

        self.Close = function () {
            window.frameElement.commonModalDialogClose(0, null);
        };

        self.addAction = function (text) {

            var newAction = new Action();
            newAction.Text(text);
            newAction.State(1);

            self.Actions.push(newAction);
            self.CurrentAction = newAction;

            autoSize();

            return newAction;
        };

        self.finishAction = function(action, percent) {
            action.State(2);
            if (percent)
                self.WholeProgress().Percent(percent);
        }

        self.errorAction = function(action, text) {
            action.State(3);
            if (text) {
                var currentError = self.Error();
                self.Error(currentError + '\r\n' + text);
            }

            autoSize();
        }
    }

    function sharepointReady() {
        var model                  = new ProgressDlgModel();
        var parent                 = window.parent;
        var tm                     = parent.TM || (parent.TM = {});
        var tmsp                   = tm.SP || (tm.SP = {});

        ko.applyBindings(model);

        if (tmsp.registeredProgressDlgConsumer)
            tmsp.registeredProgressDlgConsumer(model);
    }

    $(document).ready(function () {
        SP.SOD.executeOrDelayUntilScriptLoaded(sharepointReady, "SP.js");
    });

})($);