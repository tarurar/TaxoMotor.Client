var TM;

(function (tm) {

    tm.SP = (function (tmsp) {

        tmsp.RequestAccount = (function (ra) {

            ra.GetLegalFormTitleByCode = function (code, onsuccess, onfail) {

                var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Организационно-правовые формы (справочник)')/items?$filter=Tm_ServiceCode eq '" + code + "'";

                $.ajax({
                    type: "GET",
                    url: encodeURI(url),
                    headers: { Accept: "application/json;odata=verbose" }
                }).success(function (data) {
                    if (data.d.results.length > 0) {
                        var item = data.d.results[0];
                        onsuccess(item["Title"]);
                    } else fail("В справочнике нет значения с кодом элемента " + code);
                }).fail(onfail);
            }

            ra.CreateSelectHtmlElemForBookList = function (onsuccess, onfail) {

                var htmlTemplate = "<select id = 'select_" + Math.random().toString(36).substr(2) + "'></select>";

                // getting values for select options
                var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Организационно-правовые формы (справочник)')/items?$select=Tm_ServiceCode,Title&$orderby=Title";

                $.ajax({
                    type: "GET",
                    url: encodeURI(url),
                    headers: { Accept: "application/json;odata=verbose" }
                }).success(function (data) {
                    if (data.d.results.length > 0) {
                        var items = data.d.results;

                        htmlTemplate = $(htmlTemplate).append($("<option / >").val("0").text("<Значение не выбрано>"));
                        
                        $.each(items, function () {
                            htmlTemplate = $(htmlTemplate).append($("<option / >").val(this["Tm_ServiceCode"]).text(this["Title"]));
                        });

                        onsuccess(htmlTemplate);
                    } else onfail("Справочник пуст");
                }).fail(onfail);
            }

            return ra;
        })(tmsp.RequestAccount || (tmsp.RequestAccount = {}));

        return tmsp;
    })(tm.SP || (tm.SP = {}));

})(TM || (TM = {}));