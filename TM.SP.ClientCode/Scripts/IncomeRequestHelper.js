var TM;

(function (tm) {

    tm.SP = (function (tmsp) {

        tmsp.IncomeRequest = (function(ir) {

            SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                var layoutsUrl = SP.ScriptHelpers.urlCombine(_spPageContextInfo.webAbsoluteUrl, _spPageContextInfo.layoutsUrl);
                var tmUrl      = SP.ScriptHelpers.urlCombine(layoutsUrl, 'TaxoMotor');
                ir.ServiceUrl  = SP.ScriptHelpers.urlCombine(tmUrl, 'IncomeRequestService.aspx');
            }, 'sp.init.js');

            ir.TaxiStatus = {
                InWork     : "В работе",
                Success    : "Решено положительно",
                Refused    : "Отказано",
                Fail       : "Решено отрицательно",
                NotReceived: "Не получено"
            }

            ir.IsAllTaxiInStatus = function (incomeRequestId, statuses) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/IsAllTaxiInStatus',
                    data: '{ incomeRequestId: ' + incomeRequestId + ', statuses: "' + statuses + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.IsAnyTaxiInStatus = function (incomeRequestId, statuses) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/IsAnyTaxiInStatus',
                    data: '{ incomeRequestId: ' + incomeRequestId + ', statuses: "' + statuses + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.ValidateTaxiDuplicates = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/ValidateTaxiDuplicates',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.IsAllTaxiInStatusHasBlankNo = function(incomeRequestId, status) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/IsAllTaxiInStatusHasBlankNo',
                    data: '{ incomeRequestId: ' + incomeRequestId + ', status: "' + status + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.IsAllTaxiInStatusHasLicenseNumber = function (incomeRequestId, status) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/IsAllTaxiInStatusHasLicenseNumber',
                    data: '{ incomeRequestId: ' + incomeRequestId + ', status: "' + status + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.GetAllTaxiInRequestByStatus = function (incomeRequestId, status) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/GetAllTaxiInRequestByStatus',
                    data: '{ incomeRequestId: ' + incomeRequestId + ', status: "' + status + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.GetAllWorkingTaxiInRequest = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/GetAllWorkingTaxiInRequest',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.AcceptTaxiRequest = function (incomeRequestId, taxiIdList) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/AcceptTaxi',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' , taxiIdList: "' + taxiIdList + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.RefuseTaxiRequest = function(incomeRequestId, taxiIdList, refuseReasonCode, refuseComment,
                needPersonVisit) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/RefuseTaxi',
                    data: '{ incomeRequestId: ' + incomeRequestId +
                          ' , taxiIdList: "' + taxiIdList + '"' +
                          ' , refuseReasonCode: ' + refuseReasonCode +
                          ' , refuseComment: "' + encodeURIComponent(refuseComment) + '"' +
                          ' , needPersonVisit: ' + needPersonVisit + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            }

            ir.CanReleaseNewLicensesForRequest = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/CanReleaseNewLicensesForRequest',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.HasRequestActingLicenses = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/HasRequestActingLicenses',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.CreateDocumentsWhileClosing = function(incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/CreateDocumentsWhileClosing',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.CreateDocumentsWhileRefusing = function(incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/CreateDocumentsWhileRefusing',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.GetDocumentsForSendStatus = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/GetDocumentsForSendStatus',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.PromoteLicenseDrafts = function(incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/PromoteLicenseDrafts',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.GetLicenseXmlById = function (licenseIdList) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/GetLicenseXmlById',
                    data: '{ licenseIdList: "' + licenseIdList + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.DeleteLicenseDraftsByTaxiStatus = function (incomeRequestId, status) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/DeleteLicenseDraftsByTaxiStatus',
                    data: '{ incomeRequestId: ' + incomeRequestId + ', status: "' + status + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.SetStatusOnClosing = function(incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/SetStatusOnClosing',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.UpdateSignatureForLicense = function (licenseId, signature) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/UpdateSignatureForLicense',
                    data: '{ licenseId: ' + licenseId + ', signature: "' + encodeURIComponent(signature) + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.UpdateOutcomeRequestsOnClosing = function(closingIncomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/UpdateOutcomeRequestsOnClosing',
                    data: '{ closingIncomeRequestId: ' + closingIncomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.GetCurrentStatusCode = function(incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/GetCurrentStatusCode',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.OutputRequest = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/MakeOutput',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.SendToAsguf = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/SendToAsguf',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.SendEgripRequest = function (incomeRequestId, onsuccess, onfail) {
                var url = SP.Utilities.Utility.getLayoutsPageUrl('TaxoMotor/SendRequestEGRIPPage.aspx') + '?IsDlg=1&ListId=' +
                    _spPageContextInfo.pageListId + '&Items=' + incomeRequestId + '&Source=' + location.href;

                var options = {
                    url: encodeURI(url),
                    title: 'Отправка запроса в Единый Государственный Реестр Индивидуальных Предпринимателей (ЕГРИП)',
                    allowMaximize: false,
                    showClose: true,
                    width: 800,
                    dialogReturnValueCallback: Function.createDelegate(null, function(result, returnValue) {
                        if (result == SP.UI.DialogResult.OK) {
                            if (onsuccess) {
                                onsuccess();
                            }
                        } else if (result == -1) {
                            if (onfail) {
                                onfail('При отправке запроса в ЕГРИП возникли ошибки');
                            }
                        }
                    })
                };

                SP.UI.ModalDialog.showModalDialog(options);
            };

            ir.SendEgrulRequest = function (incomeRequestId, onsuccess, onfail) {
                var url = SP.Utilities.Utility.getLayoutsPageUrl('TaxoMotor/SendRequestEGRULPage.aspx') + '?IsDlg=1&ListId=' +
                    _spPageContextInfo.pageListId + '&Items=' + incomeRequestId + '&Source=' + location.href;
                var options = {
                    url: encodeURI(url),
                    title: 'Отправка запроса в Единый Государственный Реестр Юридических Лиц (ЕГРЮЛ)',
                    allowMaximize: false,
                    showClose: true,
                    width: 800,
                    dialogReturnValueCallback: Function.createDelegate(null, function (result, returnValue) {
                        if (result == SP.UI.DialogResult.OK) {
                            if (onsuccess) {
                                onsuccess();
                            }
                        }
                        else if (result == -1) {
                            if (onfail) {
                                onfail('При отправке запроса в ЕГРЮЛ возникли ошибки');
                            }
                        }
                    })
                };

                SP.UI.ModalDialog.showModalDialog(options);
            };

            ir.SendPTSRequest = function (incomeRequestId, onsuccess, onfail) {

                ir.GetAllWorkingTaxiInRequest(incomeRequestId).success(function(data) {

                    if (data && data.d) {

                        var ctx = SP.ClientContext.get_current();
                        var taxiList = ctx.get_web().get_lists().getByTitle('Транспортные средства');
                        ctx.load(taxiList);
                        ctx.executeQueryAsync(function() {
                            
                            var taxiItems = data.d.replace(/\;/g, ',');

                            var url = SP.Utilities.Utility.getLayoutsPageUrl('TaxoMotor/SendRequestPTSPage.aspx') + '?IsDlg=1&ListId=' +
                                taxiList.get_id() + '&Items=' + taxiItems + '&Source=' + location.href;

                            var options = {
                                url: encodeURI(url),
                                title: 'Запрос сведений о транспортных средствах и владельцах',
                                allowMaximize: false,
                                showClose: true,
                                width: 800,
                                dialogReturnValueCallback: Function.createDelegate(null, function (result, returnValue) {
                                    if (result == SP.UI.DialogResult.OK) {
                                        if (onsuccess) {
                                            onsuccess();
                                        }
                                    }
                                    else if (result == -1) {
                                        if (onfail) {
                                            onfail('При отправке запросов по транспортным средствам возникли ошибки');
                                        }
                                    }
                                })
                            };

                            SP.UI.ModalDialog.showModalDialog(options);

                        }, onfail);

                    } else onfail();

                }).fail(onfail);
            };

            ir.SendStatus = function(incomeRequestId, attachsStr) {
                var url = _spPageContextInfo.webAbsoluteUrl + '/' + _spPageContextInfo.layoutsUrl + '/' + 'TaxoMotor/SendStatus.aspx?ListId=' +
                    _spPageContextInfo.pageListId +
                    '&Items=' + incomeRequestId +
                    (attachsStr ? '&AttachDocuments=' + attachsStr : '');

                return $.ajax({
                    url: encodeURI(url),
                    method: 'POST'
                });
            };

            ir.CalculateDatesAndSetStatus = function(incomeRequestId, statusCode) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/CalculateDatesAndSetStatus',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' , statusCode: ' + statusCode + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            }

            ir.GetIncomeRequestCoordinateV5StatusMessage = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/GetIncomeRequestCoordinateV5StatusMessage',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            }

            ir.SaveIncomeRequestStatusLog = function(incomeRequestId, signature) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/SaveIncomeRequestStatusLog',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' , signature: "' + encodeURIComponent(signature) + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            }

            ir.EndingApplyForNew = function (incomeRequestId, onsuccess, onfail) {
                // Запросы ПТС по транспортным средствам обращения
                ir.SendPTSRequest(incomeRequestId, function () {
                    // Расчет сроков оказания услуги и установка статуса обращения
                    ir.CalculateDatesAndSetStatus(incomeRequestId, 7704).success(function () {
                        // Получение xml для измененного состояния обращения
                        ir.GetIncomeRequestCoordinateV5StatusMessage(incomeRequestId).success(function (data) {
                            //Подписывание xml
                            if (data && data.d) {
                                ir.SignXml(data.d, function (signedData) {
                                    // Сохранение факта изменения статуса обращения в историю изменения статусов
                                    ir.SaveIncomeRequestStatusLog(incomeRequestId, signedData).success(function () {
                                        // Отправка обращения в АСГУФ
                                        ir.SendToAsguf(incomeRequestId);
                                        // Отправка статуса обращения по межведомственному взаимодействию
                                        ir.SendStatus(incomeRequestId).success(onsuccess).fail(function (err) { onfail("При отправке статуса возникла ошибка"); });
                                    }).fail(onfail);
                                }, onfail);
                            } else onfail("Не удалось получить статус обращения в виде xml");
                        }).fail(onfail);
                    }).fail(onfail);
                }, onfail);
            };

            ir.EndingApplyForCancellation = function (incomeRequestId, onsuccess, onfail) {
                // Запросы ПТС по транспортным средствам обращения
                //ir.SendPTSRequest(incomeRequestId, function () {
                    // Расчет сроков оказания услуги и установка статуса обращения
                    ir.CalculateDatesAndSetStatus(incomeRequestId, 1050).success(function () {
                        // Получение xml для измененного состояния обращения
                        ir.GetIncomeRequestCoordinateV5StatusMessage(incomeRequestId).success(function (data) {
                            //Подписывание xml
                            if (data && data.d) {
                                ir.SignXml(data.d, function (signedData) {
                                    // Сохранение факта изменения статуса обращения в историю изменения статусов
                                    ir.SaveIncomeRequestStatusLog(incomeRequestId, signedData).success(function () {
                                        // Отправка обращения в АСГУФ
                                        ir.SendToAsguf(incomeRequestId);
                                        // Отправка статуса обращения по межведомственному взаимодействию
                                        ir.SendStatus(incomeRequestId).success(onsuccess).fail(function (err) { onfail("При отправке статуса возникла ошибка"); });
                                    }).fail(onfail);
                                }, onfail);
                            } else onfail("Не удалось получить статус обращения в виде xml");
                        }).fail(onfail);
                    }).fail(onfail);
                //}, onfail);
            };

            ir.ApplyForNewForJuridicalPerson = function (incomeRequestId, onsuccess, onfail) {
                // Запрос в ЕГРЮЛ
                ir.SendEgrulRequest(incomeRequestId, function () {
                    ir.EndingApplyForNew(incomeRequestId, onsuccess, onfail);
                }, onfail);
            };

            ir.ApplyForNewForPrivateEntrepreneur = function (incomeRequestId, onsuccess, onfail) {
                // Запрос в ЕГРИП
                ir.SendEgripRequest(incomeRequestId, function () {
                    ir.EndingApplyForNew(incomeRequestId, onsuccess, onfail);
                }, onfail);
            };

            ir.ApplyForChangeForJuridicalPerson = ir.ApplyForNewForJuridicalPerson;

            ir.ApplyForChangeForPrivateEntrepreneur = ir.ApplyForNewForPrivateEntrepreneur;

            ir.ApplyForCancellationForPrivateEntrepreneur = function (incomeRequestId, onsuccess, onfail) {
                // Запрос в ЕГРИП
                //ir.SendEgripRequest(incomeRequestId, function () {
                    ir.EndingApplyForCancellation(incomeRequestId, onsuccess, onfail);
                //}, onfail);
            };

            ir.ApplyForCancellationForJuridicalPerson = function (incomeRequestId, onsuccess, onfail) {
                // Запрос в ЕГРЮЛ
                //ir.SendEgrulRequest(incomeRequestId, function () {
                    ir.EndingApplyForCancellation(incomeRequestId, onsuccess, onfail);
                //}, onfail);
            };

            ir.ApplyForNew = function (incomeRequestId, onsuccess, onfail) {
                ir.EnsureCerificate(function () {
                    // Проверить всем ли ТС присвоен статус
                    ir.IsAllTaxiInStatus(incomeRequestId, "В работе;Отказано").success(function (data) {
                        if (data && data.d) {
                            // Проверить, остались ли в обращении ТС со статусом
                            ir.IsAnyTaxiInStatus(incomeRequestId, "В работе").success(function (data) {
                                if (data && data.d) {
                                    // Провести проверку на дубли разрешений
                                    //ir.CanReleaseNewLicensesForRequest(incomeRequestId).success(function (data) {
                                    //if (data && data.d.CanRelease) {
                                    // Заявитель - индивидуальный предприниматель?
                                    ir.IsRequestDeclarantPrivateEntrepreneur(incomeRequestId).success(function (data) {
                                        if (data && data.d) {
                                            ir.ApplyForNewForPrivateEntrepreneur(incomeRequestId, onsuccess, onfail);
                                        } else {
                                            ir.ApplyForNewForJuridicalPerson(incomeRequestId, onsuccess, onfail);
                                        }
                                    }).fail(function (err) { onfail("При проверке заявителя возникла ошибка"); });
                                    //} else onfail('Разрешение на ТС с номером ' + data.d.TaxiNumber + ' уже существует');
                                    //}).fail(onfail);
                                } else onfail('В обращении нет ТС');
                            }).fail(onfail);
                        } else onfail('Не всем ТС проставлен признак');
                    }).fail(onfail);
                }, function () {
                    onfail('Не удалось выбрать сертификат для подписания. Действие прервано.');
                });
            };

            ir.ApplyForDuplicate = function (incomeRequestId, onsuccess, onfail) {
                ir.EnsureCerificate(function () {
                    // Проверить всем ли ТС присвоен статус
                    ir.IsAllTaxiInStatus(incomeRequestId, "В работе;Отказано").success(function (data) {
                        if (data && data.d) {
                            // Проверить, остались ли в обращении ТС со статусом
                            ir.IsAnyTaxiInStatus(incomeRequestId, "В работе").success(function (data) {
                                if (data && data.d) {
                                    // Провести проверку на дубли разрешений. Наличие дублей обязательно.
                                    //ir.HasRequestActingLicenses(incomeRequestId).success(function (data) {
                                    //if (data && data.d.CanRelease) {
                                    // Расчет сроков оказания услуги и установка статуса обращения
                                    ir.CalculateDatesAndSetStatus(incomeRequestId, 1050).success(function () {
                                        // Получение xml для измененного состояния обращения
                                        ir.GetIncomeRequestCoordinateV5StatusMessage(incomeRequestId).success(function (data) {
                                            //Подписывание xml
                                            if (data && data.d) {
                                                ir.SignXml(data.d, function (signedData) {
                                                    // Сохранение факта изменения статуса обращения в историю изменения статусов
                                                    ir.SaveIncomeRequestStatusLog(incomeRequestId, signedData).success(function () {
                                                        // Отправка обращения в АСГУФ
                                                        ir.SendToAsguf(incomeRequestId);
                                                        // Отправка статуса обращения по межведомственному взаимодействию
                                                        ir.SendStatus(incomeRequestId).success(onsuccess).fail(function (err) { onfail("При отправке статуса возникла ошибка"); });
                                                    }).fail(onfail);
                                                }, onfail);
                                            } else onfail("Не удалось получить статус обращения в виде xml");
                                        }).fail(onfail);
                                    }).fail(onfail);
                                    //} else onfail('Разрешение на ТС с номером ' + data.d.TaxiNumber + ' не существует');
                                    //}).fail(onfail);
                                } else onfail('В обращении нет ТС');
                            }).fail(onfail);
                        } else onfail('Не всем ТС проставлен признак');
                    }).fail(onfail);
                }, function () {
                    onfail('Не удалось выбрать сертификат для подписания. Действие прервано.');
                });
            };

            ir.ApplyForChange = function (incomeRequestId, onsuccess, onfail) {
                ir.EnsureCerificate(function () {
                    // Проверить всем ли ТС присвоен статус
                    ir.IsAllTaxiInStatus(incomeRequestId, "В работе;Отказано").success(function (data) {
                        if (data && data.d) {
                            // Проверить, остались ли в обращении ТС со статусом
                            ir.IsAnyTaxiInStatus(incomeRequestId, "В работе").success(function (data) {
                                if (data && data.d) {
                                    // Провести проверку на дубли разрешений. Наличие дублей обязательно.
                                    //ir.HasRequestActingLicenses(incomeRequestId).success(function (data) {
                                    //if (data && data.d.CanRelease) {
                                    // Заявитель - индивидуальный предприниматель?
                                    ir.IsRequestDeclarantPrivateEntrepreneur(incomeRequestId).success(function (data) {
                                        if (data && data.d) {
                                            ir.ApplyForChangeForPrivateEntrepreneur(incomeRequestId, onsuccess, onfail);
                                        } else {
                                            ir.ApplyForChangeForJuridicalPerson(incomeRequestId, onsuccess, onfail);
                                        }
                                    }).fail(function (err) { onfail("При проверке заявителя возникла ошибка"); });
                                    //} else onfail('Разрешение на ТС с номером ' + data.d.TaxiNumber + ' не существует');
                                    //}).fail(onfail);
                                } else onfail('В обращении нет ТС');
                            }).fail(onfail);
                        } else onfail('Не всем ТС проставлен признак');
                    }).fail(onfail);
                }, function () {
                    onfail('Не удалось выбрать сертификат для подписания. Действие прервано.');
                });
            }

            ir.ApplyForCancellation = function (incomeRequestId, onsuccess, onfail) {
                ir.EnsureCerificate(function () {
                    // Проверить всем ли ТС присвоен статус
                    ir.IsAllTaxiInStatus(incomeRequestId, "В работе;Отказано").success(function (data) {
                        if (data && data.d) {
                            // Проверить, остались ли в обращении ТС со статусом
                            ir.IsAnyTaxiInStatus(incomeRequestId, "В работе").success(function (data) {
                                if (data && data.d) {
                                    // Провести проверку на дубли разрешений. Наличие дублей обязательно.
                                    //ir.HasRequestActingLicenses(incomeRequestId).success(function (data) {
                                    //if (data && data.d.CanRelease) {
                                    // Заявитель - индивидуальный предприниматель?
                                    ir.IsRequestDeclarantPrivateEntrepreneur(incomeRequestId).success(function (data) {
                                        if (data && data.d) {
                                            ir.ApplyForCancellationForPrivateEntrepreneur(incomeRequestId, onsuccess, onfail);
                                        } else {
                                            ir.ApplyForCancellationForJuridicalPerson(incomeRequestId, onsuccess, onfail);
                                        }
                                    }).fail(function (err) { onfail("При проверке заявителя возникла ошибка"); });
                                    //} else onfail('Разрешение на ТС с номером ' + data.d.TaxiNumber + ' не существует');
                                    //}).fail(onfail);
                                } else onfail('В обращении нет ТС');
                            }).fail(onfail);
                        } else onfail('Не всем ТС проставлен признак');
                    }).fail(onfail);
                }, function () {
                    onfail('Не удалось выбрать сертификат для подписания. Действие прервано.');
                });
            };

            ir.SetRefuseReasonAndComment = function (incomeRequestId, refuseReasonCode, refuseComment, refuseReasonCode2, refuseComment2, refuseReasonCode3, refuseComment3, needPersonVisit, refuseDocuments) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/SetRefuseReasonAndComment',
                    data: '{ incomeRequestId: ' + incomeRequestId +
                            ' , refuseReasonCode: ' + refuseReasonCode +
                            ' , refuseComment: "' + encodeURIComponent(refuseComment) + '"' +
                            ' , refuseReasonCode2: ' + refuseReasonCode2 +
                            ' , refuseComment2: "' + encodeURIComponent(refuseComment2) + '"' +
                            ' , refuseReasonCode3: ' + refuseReasonCode3 +
                            ' , refuseComment3: "' + encodeURIComponent(refuseComment3) + '"' +
                            ' , needPersonVisit: ' + needPersonVisit +
                            ', refuseDocuments: ' +refuseDocuments + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.Refuse = function (incomeRequestId, onsuccess, onfail) {
                ir.EnsureCerificate(function () {
                    // Получим причину и комментарий
                    var options = {
                        url: _spPageContextInfo.webAbsoluteUrl + '/ProjectSitePages/DenyIncomeRequest.aspx',
                        title: 'Отказ по обращению',
                        allowMaximize: false,
                        width: 600,
                        showClose: true,
                        dialogReturnValueCallback: Function.createDelegate(null, function (result, returnValue) {
                            if (result == SP.UI.DialogResult.OK) {

                                var reasonCode = returnValue.SelectedReason.Code;
                                var reasonCode2 = returnValue.SelectedReason2.Code;
                                var reasonCode3 = returnValue.SelectedReason3.Code;
                                var reasonText = returnValue.ActionComment;
                                var reasonText2 = returnValue.ActionComment2;
                                var reasonText3 = returnValue.ActionComment3;
                                var needPersonVisit = returnValue.NeedPersonVisit;
                                var refuseDocuments = returnValue.RefuseDocuments;

                                // Установка причины отказа и комментария
                                ir.SetRefuseReasonAndComment(incomeRequestId, reasonCode, reasonText, reasonCode2, reasonText2, reasonCode3, reasonText3, needPersonVisit, refuseDocuments).success(function () {
                                    // Генерация документов отказа
                                    ir.CreateDocumentsWhileRefusing(incomeRequestId).success(function (refuseDocData) {
                                        if (refuseDocData && refuseDocData.d && refuseDocData.d.Data && refuseDocData.d.Data[0]) {
                                            var refuseFileId = refuseDocData.d.Data[0].DocumentId;
                                            // Подписание документа отказа
                                            ir.SignDocumentContent(refuseDocData.d.Data[0].DocumentUrl, function (signedRefuseDoc) {
                                                // Сохранение подписи документа отказа
                                                ir.SaveDocumentDetachedSignature(refuseFileId, signedRefuseDoc).success(function (sigFileData) {
                                                    if (sigFileData && sigFileData.d) {
                                                        var sigFileId = sigFileData.d;
                                                        // Удаление черновиков всех разрешений по всем ТС обращения
                                                        ir.DeleteLicenseDraftsOnRefusing(incomeRequestId).success(function () {
                                                            // В зависимости от текущего статуса устанавливаем новый
                                                            ir.GetCurrentStatusCode(incomeRequestId).success(function (data) {
                                                                var currStatus = data.d.Data;
                                                                var newStatus = currStatus == 1040 ? 1030 : 1080;
                                                                // Установка статуса обращения
                                                                ir.CalculateDatesAndSetStatus(incomeRequestId, newStatus).success(function () {
                                                                    // Получение xml для измененного состояния обращения
                                                                    ir.GetIncomeRequestCoordinateV5StatusMessage(incomeRequestId).success(function (data) {
                                                                        //Подписание xml
                                                                        if (data && data.d) {
                                                                            ir.SignXml(data.d, function (signedData) {
                                                                                // Сохранение факта изменения статуса обращения в историю изменения статусов
                                                                                ir.SaveIncomeRequestStatusLog(incomeRequestId, signedData).success(function () {
                                                                                    // Отправка статуса обращения по межведомственному взаимодействию
                                                                                    ir.GetDocumentsForSendStatus(incomeRequestId).success(function (docs) {
                                                                                        var attachs = $.map(docs.d, function (el) { return el.DocumentId; }).join(',');
                                                                                        ir.SendStatus(incomeRequestId, attachs)
                                                                                            .success(onsuccess)
                                                                                            .fail(function (err) { onfail("При отправке статуса возникла ошибка"); });
                                                                                    }).fail(onfail);
                                                                                }).fail(onfail);
                                                                            }, onfail);
                                                                        } else onfail("Не удалось получить статус обращения в виде xml");
                                                                    }).fail(onfail);
                                                                }).fail(onfail);
                                                            }).fail(function (jqXhr, status, error) {
                                                                var response = $.parseJSON(jqXhr.responseText).d;
                                                                console.error("Exception Message: " + response.Error.SystemMessage);
                                                                console.error("Exception StackTrace: " + response.Error.StackTrace);
                                                            });
                                                        }).fail(onfail);
                                                    } else onfail("Не удалось создать документ открепленной подписи");
                                                }).fail(onfail);
                                            }, onfail);
                                        } else onfail("Не удалось создать документ-уведомление");
                                    }).fail(function (jqXhr, status, error) {
                                        var response = $.parseJSON(jqXhr.responseText).d;
                                        console.error("Exception Message: " + response.Error.SystemMessage);
                                        console.error("Exception StackTrace: " + response.Error.StackTrace);
                                        onfail(response.Error.UserMessage);
                                    });
                                }).fail(onfail);
                            }
                        })
                    };

                    SP.UI.ModalDialog.showModalDialog(options);
                }, function () {
                    onfail('Не удалось выбрать сертификат для подписания. Действие прервано.');
                });
            };

            ir.IsRequestDeclarantPrivateEntrepreneur = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/IsRequestDeclarantPrivateEntrepreneur',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            }

            ir.SaveDocumentDetachedSignature = function(documentId, signature) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/SaveDocumentDetachedSignature',
                    data: '{ documentId: ' + documentId + ' , signature: "' + signature + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            }

            ir.SignXml = function(xml, onsuccess, onfail) {

                var oCertificate = ir.SelectedCertificate || (cryptoPro && cryptoPro.SelectCertificate(
                        cryptoPro.StoreLocation.CAPICOM_CURRENT_USER_STORE,
                        cryptoPro.StoreNames.CAPICOM_MY_STORE,
                        cryptoPro.StoreOpenMode.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));

                ir.SelectedCertificate = ir.SelectedCertificate || oCertificate;

                if (oCertificate) {
                    xml =
                        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                        "<Envelope xmlns=\"urn:envelope\">\n" +
                        xml +
                        " \n" +
                        "</Envelope>";

                    var signedData;
                    var errorMsg;
                    try {
                        signedData = cryptoPro.SignXMLCreate(oCertificate, xml);
                    } catch (e) {
                        errorMsg = "Ошибка при формировании подписи: " + e.message;
                    }

                    if (errorMsg) {
                        if (onfail) onfail(errorMsg);
                    } else {
                        onsuccess(signedData);
                    }

                } else {
                    if (onfail) onfail("При формировании ЭЦП не удалось обнаружить сертификат");
                }
            };

            ir.SignPkcs7 = function (dataToSign, onsuccess, onfail) {

                var oCertificate = ir.SelectedCertificate || (cryptoPro && cryptoPro.SelectCertificate(
                        cryptoPro.StoreLocation.CAPICOM_CURRENT_USER_STORE,
                        cryptoPro.StoreNames.CAPICOM_MY_STORE,
                        cryptoPro.StoreOpenMode.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));

                ir.SelectedCertificate = ir.SelectedCertificate || oCertificate;

                if (oCertificate) {
                    var signedData;
                    var errorMsg;
                    try {
                        signedData = cryptoPro.signPkcs7Create(oCertificate, dataToSign);
                    } catch (e) {
                        errorMsg = "Ошибка при формировании подписи pkcs7: " + e.message;
                    }

                    if (errorMsg) {
                        if (onfail) onfail(errorMsg);
                    } else {
                        onsuccess(signedData);
                    }

                } else {
                    if (onfail) onfail("При формировании ЭЦП pkcs7 не удалось обнаружить сертификат");
                }
            };

            ir.SignDocumentContent = function(documentUrl, onsuccess, onfail) {
                $.get(documentUrl, function(data) {
                    if (data) {
                        ir.SignPkcs7(data, onsuccess, onfail);
                    } else onfail("Невозможно загрузить документ по адресу " + documentUrl);
                });
            };

            ir.DeleteLicenseDraftsOnRefusing = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/DeleteLicenseDraftsOnRefusing',
                    data: '{ refusedIncomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.AcceptTaxi = function (incomeRequestId, taxiIdList, onsuccess, onfail) {
                ir.AcceptTaxiRequest(incomeRequestId, taxiIdList)
                    .success(onsuccess)
                    .fail(onfail);
            };

            ir.RefuseTaxi = function (incomeRequestId, taxiIdList, onsuccess, onfail) {
                // Получим причину и комментарий
                var options = {
                    url: _spPageContextInfo.webAbsoluteUrl + '/ProjectSitePages/DenyTaxi.aspx',
                    title: 'Отказ по транспортному средству',
                    allowMaximize: false,
                    width: 600,
                    showClose: true,
                    dialogReturnValueCallback: Function.createDelegate(null, function (result, returnValue) {
                        if (result == SP.UI.DialogResult.OK) {
                            
                            var reasonCode = returnValue.SelectedReason.Code;
                            var reasonText = returnValue.ActionComment;
                            var needPersonVisit = returnValue.NeedPersonVisit;
                            // Выполним запрос на отмену транспортных средств в обращении
                            ir.RefuseTaxiRequest(incomeRequestId, taxiIdList, reasonCode, reasonText, needPersonVisit)
                                .success(onsuccess)
                                .fail(onfail);
                        }
                    })
                };

                SP.UI.ModalDialog.showModalDialog(options);
            }

            ir.SignDocumentSaveSignatureMultiple = function(docsMetadata, onsucces, onfail) {
                var deferreds = [];

                for (var i = 0; i < docsMetadata.length; i++) {
                    var currentDeferred = $.Deferred();
                    var currentDocData = docsMetadata[i];

                    ir.SignDocumentContent(currentDocData.DocumentUrl, function(document, def) {
                        return function(signedDoc) {
                            ir.SaveDocumentDetachedSignature(document.DocumentId, signedDoc).success(function(sigFileData) {
                                if (sigFileData && sigFileData.d) {
                                    def.resolveWith(null, [sigFileData.d]);
                                } else def.rejectWith(document, ["Не удалось создать документ открепленной подписи"]);
                            }).fail(function(jqXhr, status, error) {
                                def.rejectWith(document, [error]);
                            });
                        }
                    }(currentDocData, currentDeferred), function(document, def) {
                        return function(err) {
                            def.rejectWith(document, [err]);
                        }
                    }(currentDocData, currentDeferred));

                    deferreds.push(currentDeferred);
                }

                $.when.apply($, deferreds).done(onsucces).fail(onfail);
            };

            ir.SignLicenseSaveSignatureMultiple = function (docsMetadata, onsucces, onfail) {
                var deferreds = [];

                for (var i = 0; i < docsMetadata.length; i++) {
                    var currentDeferred = $.Deferred();
                    var currentDocData = docsMetadata[i];

                    ir.SignXml(currentDocData.Xml, function(document, def) {
                        return function(signedData) {
                            ir.UpdateSignatureForLicense(document.ExternalId, signedData).success(function() {
                                def.resolve();
                            }).fail(function (jqXhr, status, error) {
                                var response = $.parseJSON(jqXhr.responseText).d;
                                console.error("Exception Message: " + response.Error.SystemMessage);
                                console.error("Exception StackTrace: " + response.Error.StackTrace);
                                def.rejectWith(document, [response.Error.UserMessage]);
                            });
                        }
                    }(currentDocData, currentDeferred), function(document, def) {
                        return function(err)
                        {
                            def.rejectWith(document, [err]);
                        }
                    }(currentDocData, currentDeferred));

                    deferreds.push(currentDeferred);
                }

                $.when.apply($, deferreds).done(onsucces).fail(onfail);
            };

            ir.PromoteLicenseDraftsAndSign = function (incomeRequestId, cancellationMode) {

                var def = $.Deferred();

                ir.GetContentTypeName(incomeRequestId, function (ctName) {
                    var promote = false;
                    if (cancellationMode) {
                        if (ctName != 'Аннулирование') {
                            def.resolve();
                        } else {
                            promote = true;
                        }
                    } else {
                        if (ctName == 'Аннулирование') {
                            def.resolve();
                        } else {
                            promote = true;
                        }
                    }

                    if (promote) {
                        ir.PromoteLicenseDrafts(incomeRequestId).success(function (data) {
                            ir.GetLicenseXmlById(data.d.Data).success(function (data) {
                                ir.SignLicenseSaveSignatureMultiple(data.d.Data, def.resolve, def.reject);
                            }).fail(function (jqXhr, status, error) {
                                var response = $.parseJSON(jqXhr.responseText).d;
                                console.error("Exception Message: " + response.Error.SystemMessage);
                                console.error("Exception StackTrace: " + response.Error.StackTrace);
                                def.reject();
                            });
                        }).fail(function (jqXhr, status, error) {
                            var response = $.parseJSON(jqXhr.responseText).d;
                            console.error("Exception Message: " + response.Error.SystemMessage);
                            console.error("Exception StackTrace: " + response.Error.StackTrace);
                            def.reject();
                        });
                    }
                });

                return def;
            };

            ir.GetContentTypeName = function (incomeRequestId, callback) {

                SP.SOD.executeOrDelayUntilScriptLoaded(function() {
                    var ctx  = SP.ClientContext.get_current();
                    var list = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId);
                    var item = list.getItemById(incomeRequestId);
                    var ct   = item.get_contentType();

                    ctx.load(ct);
                    ctx.executeQueryAsync(function () {
                        if (callback)
                            callback(ct.get_name());
                    });
                }, "sp.js");
            }

            ir.Output = function (incomeRequestId, onsuccess, onfail) {
                ir.EnsureCerificate(function () {
                    ir.OutputRequest(incomeRequestId)
                        .success(function () {
                            ir.PromoteLicenseDraftsAndSign(incomeRequestId, true).done(onsuccess).fail(onfail);
                        })
                        .fail(onfail);
                }, function () {
                    onfail('Не удалось выбрать сертификат для подписания. Действие прервано.');
                });
            };

            ir.Close = function (incomeRequestId, onsuccess, onfail) {
                ir.EnsureCerificate(function () {
                    var actions = {
                        taxiPositiveExists: 'Проверка на наличие ТС со статусом "Решено положительно"',
                        taxiAllInStatuses: 'Проверяем все ли ТС находятся в статусе "Решено положительно" или "Отказано" или "Решено отрицательно"',
                        taxiAllHasBlankNo: 'Проверяем у всех ли ТС со статусом "Решено положительно" заполнены номер и серия бланка разрешения',
                        taxiDuplicates: 'Проверка на дубликаты по номеру ТС, номеру VIN и номеру разрешения',
                        signCreateNotifications: 'Формирование и подписание уведомлений',
                        signCreateLicenses: 'Подписание разрешений',
                        deleteDrafts: 'Удаление черновиков разрешений',
                        sendStatus: 'Установка и отправка статуса обращения в АС ГУФ',
                        updateOutRequestStatuses: 'Обновление межведомственных запросов'
                    }

                    var options = {
                        url: _spPageContextInfo.webAbsoluteUrl + '/ProjectSitePages/ProgressDlg.aspx',
                        title: 'Завершение работы с обращением',
                        allowMaximize: false,
                        showClose: false,
                        dialogReturnValueCallback: Function.createDelegate(null, function (result, returnValue) {
                            SP.UI.ModalDialog.RefreshPage(SP.UI.DialogResult.OK);
                        })
                    };
                    SP.UI.ModalDialog.showModalDialog(options);

                    TM.SP.registeredProgressDlgConsumer = function (progress) {

                        var action = progress.addAction(actions.taxiPositiveExists);
                        ir.IsAnyTaxiInStatus(incomeRequestId, ir.TaxiStatus.Success).success(function (data) {
                            if (data && data.d) {
                                progress.finishAction(action, 10);

                                action = progress.addAction(actions.taxiAllInStatuses);
                                var isAllTaxiInStatus = [ir.TaxiStatus.Success, ir.TaxiStatus.Refused, ir.TaxiStatus.Fail].join(";");
                                ir.IsAllTaxiInStatus(incomeRequestId, isAllTaxiInStatus).success(function (data) {
                                    if (data && data.d) {
                                        progress.finishAction(action, 20);

                                        var ctDef = $.Deferred();
                                        ir.GetContentTypeName(incomeRequestId, function (ctName) {
                                            if (ctName == "Аннулирование") {
                                                ctDef.resolve();
                                            } else {
                                                action = progress.addAction(actions.taxiAllHasBlankNo);
                                                ir.IsAllTaxiInStatusHasBlankNo(incomeRequestId, ir.TaxiStatus.Success)
                                                    .success(function (data) {
                                                        if (data && data.d) {
                                                            progress.finishAction(action, 30);
                                                            ctDef.resolve();
                                                        } else {
                                                            progress.errorAction(action);
                                                            ctDef.reject();
                                                        }
                                                    }).fail(function (jqXhr, status, error) {
                                                        progress.errorAction(action, error.message);
                                                        ctDef.reject();
                                                    });
                                            }
                                        });

                                        ctDef.done(function () {
                                            action = progress.addAction(actions.taxiDuplicates);
                                            ir.ValidateTaxiDuplicates(incomeRequestId).success(function (data) {
                                                if (data && data.d) {
                                                    progress.finishAction(action, 40);

                                                    action = progress.addAction(actions.signCreateNotifications);
                                                    ir.CreateDocumentsWhileClosing(incomeRequestId).success(function (docs) {
                                                        if (docs && docs.d) {
                                                            ir.SignDocumentSaveSignatureMultiple(docs.d, function () {
                                                                progress.finishAction(action, 50);
                                                                // Для всех услуг кроме аннулирование подписываем разрешения
                                                                action = progress.addAction(actions.signCreateLicenses);
                                                                ir.PromoteLicenseDraftsAndSign(incomeRequestId, false).done(function () {
                                                                    progress.finishAction(action, 70);

                                                                    action = progress.addAction(actions.deleteDrafts);
                                                                    ir.DeleteLicenseDraftsByTaxiStatus(incomeRequestId, ir.TaxiStatus.Refused).success(function () {

                                                                        ir.DeleteLicenseDraftsByTaxiStatus(incomeRequestId, ir.TaxiStatus.Fail).success(function () {
                                                                            progress.finishAction(action, 80);

                                                                            action = progress.addAction(actions.sendStatus);
                                                                            ir.SetStatusOnClosing(incomeRequestId).success(function () {
                                                                                // Получение xml для измененного состояния обращения
                                                                                ir.GetIncomeRequestCoordinateV5StatusMessage(incomeRequestId).success(function (data) {
                                                                                    //Подписание xml
                                                                                    if (data && data.d) {
                                                                                        ir.SignXml(data.d, function (signedData) {
                                                                                            // Сохранение факта изменения статуса обращения в историю изменения статусов
                                                                                            ir.SaveIncomeRequestStatusLog(incomeRequestId, signedData).success(function () {
                                                                                                // Отправка статуса обращения по межведомственному взаимодействию
                                                                                                // сначала получим список документов, которые необходимо прикрепить
                                                                                                ir.GetDocumentsForSendStatus(incomeRequestId).success(function (docs) {
                                                                                                    var attachs = $.map(docs.d, function (el) { return el.DocumentId; }).join(',');
                                                                                                    ir.SendStatus(incomeRequestId, attachs).success(function () {
                                                                                                        progress.finishAction(action, 90);

                                                                                                        action = progress.addAction(actions.updateOutRequestStatuses);
                                                                                                        ir.UpdateOutcomeRequestsOnClosing(incomeRequestId).success(function () {
                                                                                                            progress.finishAction(action, 100);
                                                                                                        }).fail(function (jqXhr, status, error) {
                                                                                                            progress.errorAction(action, error);
                                                                                                        });

                                                                                                    }).fail(function (jqXhr, status, error) {
                                                                                                        progress.errorAction(action, error);
                                                                                                    });
                                                                                                }).fail(function (jqXhr, status, error) {
                                                                                                    progress.errorAction(action, error);
                                                                                                });
                                                                                            }).fail(function (jqXhr, status, error) {
                                                                                                progress.errorAction(action, error);
                                                                                            });
                                                                                        }, function (jqXhr, status, error) {
                                                                                            progress.errorAction(action, error);
                                                                                        });
                                                                                    } else {
                                                                                        progress.errorAction(action, "Не удалось получить статус обращения в виде xml");
                                                                                    };
                                                                                }).fail(function (jqXhr, status, error) {
                                                                                    progress.errorAction(action, error);
                                                                                });
                                                                            }).fail(function (jqXhr, status, error) {
                                                                                var response = $.parseJSON(jqXhr.responseText).d;
                                                                                console.error("Exception Message: " + response.Error.SystemMessage);
                                                                                console.error("Exception StackTrace: " + response.Error.StackTrace);
                                                                                progress.errorAction(action, response.Error.UserMessage);
                                                                            });
                                                                        }).fail(function (jqXhr, status, error) {
                                                                            var response = $.parseJSON(jqXhr.responseText).d;
                                                                            console.error("Exception Message: " + response.Error.SystemMessage);
                                                                            console.error("Exception StackTrace: " + response.Error.StackTrace);
                                                                            progress.errorAction(action, response.Error.UserMessage);
                                                                        });
                                                                    }).fail(function (jqXhr, status, error) {
                                                                        var response = $.parseJSON(jqXhr.responseText).d;
                                                                        console.error("Exception Message: " + response.Error.SystemMessage);
                                                                        console.error("Exception StackTrace: " + response.Error.StackTrace);
                                                                        progress.errorAction(action, response.Error.UserMessage);
                                                                    });
                                                                }).fail(function (err) {
                                                                    progress.errorAction(action, err);
                                                                });
                                                            }, function (err) {
                                                                progress.errorAction(action, err);
                                                            });
                                                        } else progress.errorAction(action);
                                                    }).fail(function (jqXhr, status, error) {
                                                        progress.errorAction(action, error.message);
                                                    });
                                                } else progress.errorAction(action);
                                            }).fail(function (jqXhr, status, error) {
                                                progress.errorAction(action, error.message);
                                            });
                                        });
                                    } else progress.errorAction(action);
                                }).fail(function (jqXhr, status, error) {
                                    progress.errorAction(action, error.message);
                                });
                            } else progress.errorAction(action);
                        }).fail(function (jqXHR, status, error) {
                            progress.errorAction(action, error.message);
                        });
                    }
                }, function () {
                    onfail('Не удалось выбрать сертификат для подписания. Действие прервано.');
                });
            };

            ir.SelectedCertificate = null;

            ir.FindWebPartsByListUrl = function (listUrl) {
                if (!fd_relateditems_webparts) return null;

                var retVal = [];

                for (var i = 0; i < fd_relateditems_webparts.length; i++) {
                    var ctxNum = g_ViewIdToViewCounterMap['{' + fd_relateditems_webparts[i].toUpperCase() + '}'];
                    if (ctxNum) {
                        var ctxT = window["ctx" + ctxNum];

                        if (ctxT && (ctxT.listUrlDir == listUrl))
                            retVal.push(ctxT);
                    }
                    
                }

                return retVal;
            };

            ir.GetWebPartSelectedItemsDict = function(webPartContext) {
                var dictSelRet = [];
                var i = 0;

                for (var key in GetSelectedItemsDict(webPartContext)) {
                    dictSelRet[i] = {
                        id: webPartContext.dictSel[key].id,
                        fsObjType: webPartContext.dictSel[key].fsObjType
                    };
                    i++;
                }

                return dictSelRet;
            };

            ir.GetTaxiToPrintLicenseMultiple = function (incomeRequestId) {

                var errors = {
                    isAllTaxiInStatus: "Формирование разрешений невозможно. Не по всем ТС принято решение",
                    isAnyTaxiInStatus: "Отсутствуют данные для формирования разрешений. В обращении отсутствуют ТС, по которым принято положительное решение",
                    isAllTaxiInStatusHasLicenseNumber: "Формирование разрешений невозможно. Не всем ТС присвоен номер разрешения",
                    requestError: "Ошибка выполнения запроса на сервер"
                };

                var deferred = new $.Deferred();
                var requestErrorHandler = Function.createDelegate(this, function() {
                    deferred.reject(errors.requestError);
                });

                var condition1 = ir.IsAllTaxiInStatus(incomeRequestId, "Решено положительно;Отказано;Решено отрицательно");
                var condition2 = ir.IsAnyTaxiInStatus(incomeRequestId, "Решено положительно");
                var condition3 = ir.IsAllTaxiInStatusHasLicenseNumber(incomeRequestId, "Решено положительно");

                $.when(condition1, condition2, condition3).done(function (v1, v2, v3) {
                    if (!v1[0].d) { deferred.reject(errors.isAllTaxiInStatus) };
                    if (!v2[0].d) { deferred.reject(errors.isAnyTaxiInStatus) };
                    if (!v3[0].d) { deferred.reject(errors.isAllTaxiInStatusHasLicenseNumber) };

                    if (deferred.state() != "rejected") {
                        var action = ir.GetAllTaxiInRequestByStatus(incomeRequestId, "Решено положительно");
                        action.done(function (data) {
                            deferred.resolve(data.d);
                        }).fail(requestErrorHandler)
                    }
                }).fail(requestErrorHandler);

                return deferred.promise();
            };

            ir.AssignInternalRegNumber = function (incomeRequestId) {
                return $.ajax({
                    type: 'POST',
                    url: ir.ServiceUrl + '/AssignInternalRegNumber',
                    data: '{ incomeRequestId: ' + incomeRequestId + ' }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            };

            ir.EnsureCerificate = function (onsuccess, onfail) {
                var fakeString = "Fake string for signing";
                ir.SignPkcs7(fakeString, onsuccess, onfail);
            };

            return ir;
        })(tmsp.IncomeRequest || (tmsp.IncomeRequest = {}));

        return tmsp;
    })(tm.SP || (tm.SP = {}));

})(TM || (TM = {}));