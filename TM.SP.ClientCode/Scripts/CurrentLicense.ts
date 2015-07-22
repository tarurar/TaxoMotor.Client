/// <reference path="typings/sharepoint/SharePoint.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="LicenseEntityHelper.ts" />

module TM.SP_.License {
    "use strict";

    var _current: SP.ListItem = null;
    var _helper: LicenseEntityHelper = null;

    export function getCurrent(): SP.ListItem {
        return _current;
    }

    export function getHelper(): LicenseEntityHelper {
        return _helper;
    }

    SP.SOD.loadMultiple(["sp.js", "sp.init.js"], () => {
        var def = $.Deferred();
        JSRequest.EnsureSetup();
        var listId = decodeURIComponent(JSRequest.QueryString["List"]);
        var itemId = parseInt(decodeURIComponent(JSRequest.QueryString["ID"]), 10);

        if (listId && itemId) {
            var listGuid = new SP.Guid(listId);
            LicenseEntityHelper.Create<LicenseEntityHelper>(LicenseEntityHelper, listGuid, itemId, (helper: LicenseEntityHelper) => {
                _current = helper.currentItem;
                _helper = helper;
                def.resolve();
            }, def.reject);
        } else {
            def.reject();
        }

        def.always(() => {
            SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CurrentLicense.js");
        });
    });
}