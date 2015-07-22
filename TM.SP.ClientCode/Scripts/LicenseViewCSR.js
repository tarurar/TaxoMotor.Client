(function () {

    var Columns = {
        isLast: "_x0421__x0441__x044b__x043b__x04",
        status: "Tm_LicenseStatus"
    };

    var Colors = {
        cancelled: "#D0CBD4",
        paused   : "#FFFD9E",
        archive  : "#FAAFAF"
    };

    var Statuses = {
        cancelled: "Аннулировано",
        paused   : "Приостановлено"
    };

    var removeColumnFromView = function (columnName) {
        var cell = $("div[name='" + columnName + "']");
        if (cell) {
            var th = cell.closest("th");
            var cellIndex = th[0].cellIndex + 1;
            $('td:nth-child(' + cellIndex + ')').hide();
            $('th:nth-child(' + cellIndex + ')').hide();
        }
    }

    SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function () {
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides({
            OnPostRender: function (ctx) {
                
                removeColumnFromView(Columns.isLast);

                var rows = ctx.ListData.Row;
                for (var i = 0; i < rows.length; i++) {
                    var rowElementId = GenerateIIDForListItem(ctx, rows[i]);
                    var tr = document.getElementById(rowElementId);
                    
                    var isLast = rows[i][Columns.isLast] == 1;
                    var status = rows[i][Columns.status];
                    if (isLast) {
                        if (status == Statuses.cancelled) {
                            tr.style.backgroundColor = Colors.cancelled;
                        } else if (status == Statuses.paused) {
                            tr.style.backgroundColor = Colors.paused;
                        }
                    } else {
                        tr.style.backgroundColor = Colors.archive;
                    }
                }
            }
        });
    })

})();