/// <reference path="typings/sharepoint/SharePoint.d.ts"/>

interface String
{
    startsWith(str: string): boolean;
}

// ReSharper disable InconsistentNaming
module TM.SP_ {

     var jsVersion = "1.0.0.22";

     export function GetVersionedScriptMarkup(scriptPath: string): string {
         return '<script type="text/javascript" src="' + scriptPath + '?rev=' + jsVersion + '"></script>';
     }

     export function GetVersionedStyleMarkup(cssPath: string): string {
         return '<link rel="Stylesheet" type="text/css" href="' + cssPath + '?rev=' + jsVersion + '" />';
     }

     export function showIconNotification(message: string, iconUrl: string, autoClose: boolean) {
         var messageHtml = '<div><span style="float: left;"><img src="' +
             iconUrl + '" /></span><span style="padding: 5px;">' + message + '</span></div>';
         return SP.UI.Notify.addNotification(messageHtml, !autoClose);
     };

     export function setTargetBlank(toFindInLink: string): void {
         // Get the collection of <a> tags
         var aAllLinks = document.getElementsByTagName('a');

         // For each <a> tags, 
         for (var i = 0; i < aAllLinks.length; i++) {
             var oA = aAllLinks[i];
             var sHref = oA.attributes["href"] ? oA.attributes["href"].value.toLowerCase() : null;

             // If href value contains paramter
             if (sHref && sHref.indexOf(toFindInLink.toLowerCase()) > 0)
                 oA.attributes["target"].value = "_blank";
         }
     };

     export function GetBcsFieldIdentityFieldName(listId: string, bcsFieldName: string,
         success: (data) => void, fail: (sender: any, args: SP.ClientRequestFailedEventArgs) => void) {
         var auto = bcsFieldName.startsWith('bdil_');

         if (auto) {
             var value = bcsFieldName.replace('bdil_', 'bdilid_');
             success(value);
         } else {
             SP.SOD.executeOrDelayUntilScriptLoaded(() => {
                 var ctx = SP.ClientContext.get_current();
                 var list = ctx.get_web().get_lists().getById(listId);
                 var field = list.get_fields().getByInternalNameOrTitle(bcsFieldName);
                 ctx.load(field);
                 ctx.executeQueryAsync(() => {
                     var xml = field.get_schemaXml();
                     var xmlDoc = $.parseXML(xml);
                     var fn = $(xmlDoc).find('Field').attr('RelatedFieldWssStaticName');
                     success(fn);
                 }, fail);
             }, 'sp.js');
         }
     };

     export function GetItemFieldValues(listId: string, itemId: number, fieldNames: string[],
         success: (data) => void, fail: (sender: any, args: SP.ClientRequestFailedEventArgs) => void) {
         SP.SOD.executeOrDelayUntilScriptLoaded(() => {
             var ctx = SP.ClientContext.get_current();
             var list = ctx.get_web().get_lists().getById(listId);
             var item = list.getItemById(itemId);
             for (var i = 0; i < fieldNames.length; i++) {
                 ctx.load(item, fieldNames[i]);
             }
             ctx.executeQueryAsync(() => {
                 var values = [];
                 for (var j = 0; j < fieldNames.length; j++) {
                     values.push(item.get_item(fieldNames[j]));
                 }
                 success(values);
             }, fail);
         }, 'sp.js');
     };

     export function GetListDefaultDisplayFormUrl(spListTitle: string,
         success: (data) => void, fail: (sender: any, args: SP.ClientRequestFailedEventArgs) => void) {
         SP.SOD.executeOrDelayUntilScriptLoaded(() => {
             var ctx = SP.ClientContext.get_current();
             var list = ctx.get_web().get_lists().getByTitle(spListTitle);
             ctx.load(list, 'DefaultDisplayFormUrl');
             ctx.executeQueryAsync(() => {
                 var value = list.get_defaultDisplayFormUrl();
                 success(value);
             }, fail);
         }, 'sp.js');
     };

     export function GetListDefaultNewFormUrl(spListTitle: string,
         success: (data) => void, fail: (sender: any, args: SP.ClientRequestFailedEventArgs) => void) {
         SP.SOD.executeOrDelayUntilScriptLoaded(() => {

             var ctx = SP.ClientContext.get_current();
             var list = ctx.get_web().get_lists().getByTitle(spListTitle);
             ctx.load(list, 'DefaultNewFormUrl');
             ctx.executeQueryAsync(() => {
                 var value = list.get_defaultNewFormUrl();
                 success(value);
             }, fail);
         }, 'sp.js');
     };

     export function GetListDefaultEditFormUrl(spListTitle: string,
         success: (data) => void, fail: (sender: any, args: SP.ClientRequestFailedEventArgs) => void) {
         SP.SOD.executeOrDelayUntilScriptLoaded(() => {
             var ctx = SP.ClientContext.get_current();
             var list = ctx.get_web().get_lists().getByTitle(spListTitle);
             ctx.load(list, 'DefaultEditFormUrl');
             ctx.executeQueryAsync(() => {
                 var value = list.get_defaultEditFormUrl();
                 success(value);
             }, fail);
         }, 'sp.js');
     };

     export function MakeBcsFieldControlLinked (listId: string, itemId: number, fieldToGetDataFrom: string, linkedListName: string, fieldToLink: string) {
         var fieldToDisplay = fieldToLink ? fieldToLink : fieldToGetDataFrom;
         var div = $('.fd_field[fd_name=' + fieldToDisplay + '] > div.fd_control');
         if (div == null) return;
         var text = $(div).text().trim();
         if (!text) return;

         GetBcsFieldIdentityFieldName(listId, fieldToGetDataFrom, (fn) => {
             GetItemFieldValues(listId, itemId, [fn], (fieldValues) => {
                 var extItemId = fieldValues[0];
                 if (!extItemId) return;
                 GetListDefaultDisplayFormUrl(linkedListName, (url) => {

                     var href = url + '?ID=' + extItemId;
                     var atag = '<a href="' + href + '" target="_blank">' + text + '</a>';
                     $(div).html(atag);
                 }, (sender, args) => {
                     console.error('Не удалось получить адрес формы списка. ' + args.get_message() + '\n' + args.get_stackTrace());
                 });
             }, (sender, args) => {
                 console.error('Не удалось получить значение полей. ' + args.get_message() + '\n' + args.get_stackTrace());
             });
         }, (sender, args) => {
             console.error('Не удалось получить описание поля. ' + args.get_message() + '\n' + args.get_stackTrace());
         });
     };

     export function GetContentTypeName (ctId: string, listId: string, success: (data) => void, fail: (data) => void) {
         SP.SOD.executeOrDelayUntilScriptLoaded(() => {
             var ctx = SP.ClientContext.get_current();
             var list = ctx.get_web().get_lists().getById(listId);
             var ctList = list.get_contentTypes();
             ctx.load(ctList);
             ctx.executeQueryAsync(() => {

                 var value = '';
                 var contentTypeEnumerator = ctList.getEnumerator();
                 while (contentTypeEnumerator.moveNext()) {
                     var content = contentTypeEnumerator.get_current();
                     var contentId = content.get_id().get_stringValue();

                     if (contentId == ctId) {
                         value = content.get_name();
                         break;
                     }
                 };

                 if (value) {
                     success(value);
                 } else fail('Тип содержимого с id = ' + ctId + ' не найден');
             }, fail);
         }, 'sp.js');
     };

     export function GetListItemsByFieldValueEq (listName: string, fieldName: string, fieldValue: string, success, fail) {

         var filterUrlPart = "$filter=" + fieldName + " eq '" + fieldValue + "'";
         var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items?" + filterUrlPart;
         
         $.ajax({
             url: encodeURI(url),
             method: "GET",
             headers: { "Accept": "application/json; odata=verbose" },
             success: success,
             error: fail
         });
     };

     export function GetLocalTime(date: Date): number {
         return (date.getTime() - (date.getTimezoneOffset() * 60000));
     };
    
}
// ReSharper restore InconsistentNaming