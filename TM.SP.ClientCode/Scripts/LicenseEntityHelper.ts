/// <reference path="typings/sharepoint/SharePoint.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="EntityHelper.ts" />
/// <reference path="CryptoProTs.ts" />
/// <reference path="CurrentLicense.ts" />

module TM.SP_.License {
    "use strict";

    export module RequestParams {

        export class LicenseCommonParam extends TM.SP_.RequestParams.EntityCommonParam {

            public Stringify(): string {
                var str = super.Stringify();
                return str.replace("EntityId", "licenseId");
            }
        }

        export class MakeObsoleteParam extends LicenseCommonParam {
            public obsolete: boolean;
            public reason: string;
        }

        export class MakeObsoleteSignedParam extends MakeObsoleteParam {
            public signature: string;
        }

        export class DisableGibddParam extends LicenseCommonParam {
            public disabled: boolean;
            public reason: string;
        }

        export class DisableGibddSignedParam extends DisableGibddParam {
            public signature: string;
        }
    }

    export class LicenseEntityHelper extends EntityHelper {

        public ServiceUrl(): string {
            var rootUrl = super.ServiceUrl();
            return SP.ScriptHelpers.urlCombine(rootUrl, "LicenseService.aspx");
        }

        public MakeObsoleteGetXml(obsolete: boolean, reason: string): JQueryXHR {

            var param = new RequestParams.MakeObsoleteParam(this);
            param.obsolete = obsolete;
            param.reason = reason;

            return RequestMethods.MakePostRequest(param, this.BuildMethodUrl("MakeObsoleteGetXml"));
        }

        public MakeObsoleteSaveSigned(obsolete: boolean, reason: string, signature: string): JQueryXHR {

            var param       = new RequestParams.MakeObsoleteSignedParam(this);
            param.obsolete  = obsolete;
            param.reason    = reason;
            param.signature = encodeURIComponent(signature);

            return RequestMethods.MakePostRequest(param, this.BuildMethodUrl("SaveSignedMakeObsolete"));
        }

        public DisableGibddGetXml(disabled: boolean, reason: string): JQueryXHR {
            var param = new RequestParams.DisableGibddParam(this);
            param.disabled = disabled;
            param.reason = reason;

            return RequestMethods.MakePostRequest(param, this.BuildMethodUrl("DisableGibddGetXml"));
        }

        public DisabledGibddSaveSigned(disabled: boolean, reason: string, signature: string): JQueryXHR {
            var param       = new RequestParams.DisableGibddSignedParam(this);
            param.disabled  = disabled;
            param.reason    = reason;
            param.signature = encodeURIComponent(signature);

            return RequestMethods.MakePostRequest(param, this.BuildMethodUrl("SaveSignedDisableGibdd"));
        }

        public ValidateLicense(): JQueryXHR {
            return this.PostWebMethod<RequestParams.LicenseCommonParam>(
                RequestParams.LicenseCommonParam, null, "ValidateLicense");
        }

        public ChangeObsoleteAttribute(obsolete: boolean, reason: string, success: () => void, fail: (failObj: any) => void): void {
            this.EnsureCertificate((data) => {
                this.MakeObsoleteGetXml(obsolete, reason).done((xml: any) => {
                    var dataToSign: string = xml.d;
                    var oCertificate = this.selectedCertificate || cryptoPro.SelectCertificate(
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

                        var signedData: string;
                        try {
                            signedData = cryptoPro.SignXMLCreate(oCertificate, dataToSign);
                        } catch (e) {
                            fail("Ошибка при формировании подписи: " + e.message);
                        }

                        if (typeof signedData === "undefined" || !signedData) {
                            fail("Ошибка при формировании подписи");
                        }

                        this.MakeObsoleteSaveSigned(obsolete, reason, signedData).done(success).fail(fail);
                    }
                }).fail(() => {
                    fail("Ошибка при получении xml для разрешения");
                });
            },(error) => {
                fail('Не удалось выбрать сертификат для подписания. Действие прервано.');
            });
        }

        public ChangeDisableGibddAttribute(disabled: boolean, reason: string, success: () => void, fail: (msg: string) => void): void
        {
            this.EnsureCertificate((data) => {
                this.DisableGibddGetXml(disabled, reason).done((xml: any) => {
                    var dataToSign: string = xml.d;
                    
                    var oCertificate = this.selectedCertificate || cryptoPro.SelectCertificate(
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

                        var signedData: string;
                        try {
                            signedData = cryptoPro.SignXMLCreate(oCertificate, dataToSign);
                        } catch (e) {
                            fail("Ошибка при формировании подписи: " + e.message);
                        }

                        if (typeof signedData === "undefined" || !signedData) {
                            fail("Ошибка при формировании подписи");
                        }

                        this.DisabledGibddSaveSigned(disabled, reason, signedData).done(success).fail(fail);
                    }
                }).fail(() => {
                    fail("Ошибка при получении xml для разрешения");
                });
            }, (error) => {
                fail('Не удалось выбрать сертификат для подписания. Действие прервано.');
            });
        }
    }

    export class RibbonActions {
        public static makeObsolete(): void {
            JSRequest.EnsureSetup();
            SP.UI.Status.removeAllStatus(true);
            var newValue = !getCurrent().get_item('Tm_LicenseObsolete');

            if (newValue) {
                var options = new SP.UI.DialogOptions();
                options.url = _spPageContextInfo.webAbsoluteUrl + '/ProjectSitePages/LicenseMakeObsolete.aspx?ItemId=' + getCurrent().get_id();
                options.title = 'Установка признака "Устаревшие данные"';
                options.allowMaximize = false;
                options.showClose = true;
                options.dialogReturnValueCallback = (dialogResult, returnValue) => {
                    if (dialogResult == SP.UI.DialogResult.OK) {
                        if (returnValue == null) {
                            TM.SP_.showIconNotification('Признак "Устаревшие данные" изменен', '_layouts/15/images/kpinormal-0.gif', true);
                            debugger;
                            setTimeout(() => {
                                var gobackBtn = $('input[type=button][name*="GoBack"]');
                                if (gobackBtn) {
                                    gobackBtn.click();
                                }
                            }, 2000);
                        }
                        else if (returnValue == -1) {
                            TM.SP_.showIconNotification('В процессе установки признака возникли ошибки', '_layouts/15/images/kpinormal-2.gif', true);
                            setTimeout(() => {
                                SP.UI.ModalDialog.RefreshPage(SP.UI.DialogResult.cancel);
                            }, 2000);
                        }
                    }
                };

                SP.UI.ModalDialog.showModalDialog(options);
            } else {
                getHelper().ChangeObsoleteAttribute(false, '',() => {
                    var successMsgPart = newValue ? 'установлен' : 'снят';
                    var successStatus = SP.UI.Status.addStatus('Признак "Устаревшие данные" успешно ' + successMsgPart);
                    SP.UI.Status.setStatusPriColor(successStatus, 'green');

                    debugger;
                    setTimeout(() => {
                        var gobackBtn = $('input[type=button][name*="GoBack"]');
                        if (gobackBtn) {
                            gobackBtn.click();
                        }
                    }, 2000);
                },(failObj: any) => {
                        var msg: string;
                        if (typeof failObj == 'string') {
                            msg = failObj;
                        } else {
                            var jqXhr = <JQueryXHR> failObj;
                            var response = $.parseJSON(jqXhr.responseText).d;
                            console.error('Exception Message: ' + response.Error.SystemMessage);
                            console.error('Exception StackTrace: ' + response.Error.StackTrace);
                            msg = response.Error.UserMessage + ': ' + response.Error.SystemMessage;
                        }
                        var failStatus = SP.UI.Status.addStatus(msg);
                        SP.UI.Status.setStatusPriColor(failStatus, 'red');
                });
            }
        }
        public static makeObsoleteEnabled(): boolean {
            var result = false;
            if (getCurrent() != null) {
                var isLast = getCurrent().get_item('_x0421__x0441__x044b__x043b__x04');
                result = isLast;
            } else {
                SP.SOD.executeOrDelayUntilScriptLoaded(RefreshCommandUI, 'CurrentLicense.js');
            }

            return result;
        }
    }
}