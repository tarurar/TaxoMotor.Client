(function() {
    
    var addDeclarantHtml = '<a href="javascript:" id="addDeclarant">Заполнить данные заявителя</a>';
    var addTrusteeHtml = '<a href="javascript:" id="addTrustee">Заполнить данные доверенного лица</a>';
    $("table[id*='Tm_RequestAccountBCSLookupField'][id$='OuterTable'] tr:last").after('<tr><td colspan="3">' + addDeclarantHtml + '</td></tr>');
    $("table[id*='Tm_RequestTrusteeBcsLookupField'][id$='OuterTable'] tr:last").after('<tr><td colspan="3">' + addTrusteeHtml + '</td></tr>');
    $("table[id*='Tm_RequestAccountBCSLookupField'][id$='OuterTable'] tr:first td:last").css('display', 'none');
    $("table[id*='Tm_RequestTrusteeBcsLookupField'][id$='OuterTable'] tr:first td:last").css('display', 'none');

    var tm = window.TM || {};
    tm.SP = tm.SP || {};

    tm.SP.ShowRequestAccountDlg = function () {

        var options = {};

        var selected = $("div[id*='Tm_RequestAccountBCSLookupField']").text();
        if (selected && selected.trim()) {
            var entityData = $("table[id*='Tm_RequestAccountBCSLookupField'][id$='OuterTable'] div[id='divEntityData'");
            var instanceId = entityData.attr('key');

            options = {
                url: _spPageContextInfo.webAbsoluteUrl + '/' + tm.SP.IncomeRequestDeclarantForms.EditUrl + '?ID=' + instanceId,
                title: 'Редактирование данных заявителя',
                allowMaximize: false,
                showClose: true,
                dialogReturnValueCallback: Function.createDelegate(null, function (result) {
                    if (result == SP.UI.DialogResult.OK) {
                        $("a[id*='Tm_RequestAccountBCSLookupField'][id$='checkNames']").click();
                    }
                })
            };
        } else {
            options = {
                url: _spPageContextInfo.webAbsoluteUrl + '/' + tm.SP.IncomeRequestDeclarantForms.NewUrl,
                title: 'Ввод данных заявителя',
                allowMaximize: false,
                showClose: true,
                dialogReturnValueCallback: Function.createDelegate(null, function (result) {
                    if (result == SP.UI.DialogResult.OK) {
                        $.ajax({
                            type: 'POST',
                            url: _spPageContextInfo.webAbsoluteUrl + '/' + _spPageContextInfo.layoutsUrl + '/TaxoMotor/CommonService.aspx/GetLatestRequestAccountId',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                var id = data.d.Data;
                                $("div[id*='Tm_RequestAccountBCSLookupField']").text(id);
                                $("a[id*='Tm_RequestAccountBCSLookupField'][id$='checkNames']").click();
                            },
                            fail: function (jqXhr) {
                                var response = $.parseJSON(jqXhr.responseText).d;
                                if (console) {
                                    console.error("Exception Message: " + response.Error.SystemMessage);
                                    console.error("Exception StackTrace: " + response.Error.StackTrace);
                                }
                            }
                        });
                    }
                })
            };
        }

        SP.UI.ModalDialog.showModalDialog(options);
    };

    tm.SP.ShowRequestContactDlg = function () {

        var options = {};

        var selected = $("div[id*='Tm_RequestTrusteeBcsLookupField']").text();
        if (selected && selected.trim()) {
            var entityData = $("table[id*='Tm_RequestTrusteeBcsLookupField'][id$='OuterTable'] div[id='divEntityData'");
            var instanceId = entityData.attr('key');

            options = {
                url: _spPageContextInfo.webAbsoluteUrl + '/' + tm.SP.IncomeRequestTrusteeForms.EditUrl + '?ID=' + instanceId,
                title: 'Редактирование данных доверенного лица',
                allowMaximize: false,
                showClose: true,
                dialogReturnValueCallback: Function.createDelegate(null, function (result) {
                    if (result == SP.UI.DialogResult.OK) {
                        $("a[id*='Tm_RequestTrusteeBcsLookupField'][id$='checkNames']").click();
                    }
                })
            };
        } else {
            options = {
                url: _spPageContextInfo.webAbsoluteUrl + '/' + tm.SP.IncomeRequestTrusteeForms.NewUrl,
                title: 'Ввод данных доверенного лица',
                allowMaximize: false,
                showClose: true,
                dialogReturnValueCallback: Function.createDelegate(null, function (result) {
                    if (result == SP.UI.DialogResult.OK) {
                        $.ajax({
                            type: 'POST',
                            url: _spPageContextInfo.webAbsoluteUrl + '/' + _spPageContextInfo.layoutsUrl + '/TaxoMotor/CommonService.aspx/GetLatestRequestContactId',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                var id = data.d.Data;
                                $("div[id*='Tm_RequestTrusteeBcsLookupField']").text(id);
                                $("a[id*='Tm_RequestTrusteeBcsLookupField'][id$='checkNames']").click();
                            },
                            fail: function (jqXhr) {
                                var response = $.parseJSON(jqXhr.responseText).d;
                                if (console) {
                                    console.error("Exception Message: " + response.Error.SystemMessage);
                                    console.error("Exception StackTrace: " + response.Error.StackTrace);
                                }
                            }
                        });
                    }
                })
            };
        }

        SP.UI.ModalDialog.showModalDialog(options);
    };

    tm.SP.IncomeRequestDeclarantForms = {};
    tm.SP.IncomeRequestTrusteeForms = {};

    tm.SP.GetListDefaultNewFormUrl("RequestAccountBCSList", function (data) {
        tm.SP.IncomeRequestDeclarantForms.NewUrl = data;
        $("#addDeclarant").attr("onclick", "TM.SP.ShowRequestAccountDlg();");
    }, function () {
        if (console) {
            console.error("Произошла ошибка при запросе адреса формы добавления юридического лица по умолчанию");
        }
    });

    tm.SP.GetListDefaultEditFormUrl("RequestAccountBCSList", function (data) {
        var url = data;
        tm.SP.IncomeRequestDeclarantForms.EditUrl = url;
    }, function () {
        if (console) {
            console.error("Произошла ошибка при запросе адреса формы редактирования юридического лица по умолчанию");
        }
    });

    tm.SP.GetListDefaultNewFormUrl("RequestContactBCSList", function (data) {
        tm.SP.IncomeRequestTrusteeForms.NewUrl = data;
        $("#addTrustee").attr("onclick", "TM.SP.ShowRequestContactDlg();");
    }, function () {
        if (console) {
            console.error("Произошла ошибка при запросе адреса формы добавления физического лица по умолчанию");
        }
    });

    tm.SP.GetListDefaultEditFormUrl("RequestContactBCSList", function (data) {
        var url = data;
        tm.SP.IncomeRequestTrusteeForms.EditUrl = url;
    }, function () {
        if (console) {
            console.error("Произошла ошибка при запросе адреса формы редактирования физического лица по умолчанию");
        }
    });

})();