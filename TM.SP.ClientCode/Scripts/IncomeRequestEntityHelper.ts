/// <reference path="typings/sharepoint/SharePoint.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="EntityHelper.ts" />

module TM.SP_.IncomeRequest {
    "use strict";
    
    export class TaxiStatus {
        static InWork      = "В работе";
        static Success     = "Решено положительно";
        static Refused     = "Отказано";
        static Fail        = "Решено отрицательно";
        static NotReceived = "Не получено";
    }

    export class RequestStrings {
        static EgripDlgTitle = "Отправка запроса в Единый Государственный Реестр Индивидуальных Предпринимателей (ЕГРИП)";
        static EgrulDlgTitle = "Отправка запроса в Единый Государственный Реестр Юридических Лиц (ЕГРЮЛ)";
        static PtsDlgTitle = "Запрос сведений о транспортных средствах и владельцах";
    }

    export class RequestErrStrings {
        static EgripDlg = "При отправке запроса в ЕГРИП возникли ошибки";
        static EgrulDlg = "При отправке запроса в ЕГРЮЛ возникли ошибки";
        static PtsDlg = "При отправке запросов по транспортным средствам возникли ошибки";
        static SignXml = "Ошибка при формировании подписи: ";
        static SignNoCert = "При формировании ЭЦП не удалось обнаружить сертификат";
    }

    export class ListTitles {
        static Taxi = "Транспортные средства";
    }

    export module RequestParams {

        export class IncomeRequestCommonParam extends TM.SP_.RequestParams.EntityCommonParam {

            public Stringify(): string {
                var str = super.Stringify();
                return str.replace("EntityId", "incomeRequestId");
            }
        }

        export class ClosingIncomeRequestParam extends IncomeRequestCommonParam {
            public Stringify(): string {
                var str = super.Stringify();
                return str.replace("incomeRequestId", "closingIncomeRequestId");
            }
        }

        export class StatusesParam extends IncomeRequestCommonParam {
            public statuses: string;
        }

        export class StatusParam extends IncomeRequestCommonParam {
            public status: string;
        }

        export class SignatureParam extends IncomeRequestCommonParam {
            public signature: string;
        }

        export class RefuseParam extends IncomeRequestCommonParam {
            public refuseReasonCode: number;
            public refuseComment: string;
            public refuseReasonCode2: number;
            public refuseComment2: string;
            public refuseReasonCode3: number;
            public refuseComment3: string;
            public needPersonVisit: boolean;
            public refuseDocuments: string;
        }

        export class TaxiListParam extends IncomeRequestCommonParam {
            public taxiIdList: string;
        }

        export class RefuseTaxiParam extends TaxiListParam {
            public refuseReasonCode: number;
            public refuseComment: string;
            public needPersonVisit: boolean;
        }

        export class LicenseListParam extends TM.SP_.RequestParams.CommonParam {
            public licenseIdList: string;
        }

        export class LicenseParam extends TM.SP_.RequestParams.CommonParam {
            public licenseId: number;
        }

        export class LicenseSignatureParam extends LicenseParam {
            public signature: string;
        }

        export class StatusCodeParam extends IncomeRequestCommonParam {
            public statusCode: string;
        }

        export class DocumentSignatureParam extends TM.SP_.RequestParams.CommonParam {
            public documentId: number;
            public signature: string;
        }
    }

    export class IncomeRequestEntityHelper extends EntityHelper {

        public SelectedCertificate: any;

        public ServiceUrl(): string {
            var rootUrl = super.ServiceUrl();
            return SP.ScriptHelpers.urlCombine(rootUrl, "IncomeRequestService.aspx");
        }

        public IsAllTaxiInStatus(statuses: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.StatusesParam>(RequestParams.StatusesParam,(param) => {
                param.statuses = statuses;
            }, "IsAllTaxiInStatus");
        }

        public IsAnyTaxiInStatus(statuses: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.StatusesParam>(RequestParams.StatusesParam,(param) => {
                param.statuses = statuses;
            }, "IsAnyTaxiInStatus");
        }

        public IsAllTaxiInStatusHasBlankNo(status: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.StatusParam>(RequestParams.StatusParam,(param) => {
                param.status = status;
            }, "IsAllTaxiInStatusHasBlankNo");
        }

        public IsAllTaxiInStatusHasLicenseNumber(status: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.StatusParam>(RequestParams.StatusParam,(param) => {
                param.status = status;
            }, "IsAllTaxiInStatusHasLicenseNumber");
        }

        public GetAllTaxiInRequestByStatus(status: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.StatusParam>(RequestParams.StatusParam,(param) => {
                param.status = status;
            }, "GetAllTaxiInRequestByStatus");
        }

        public GetAllWorkingTaxiInRequest(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "GetAllWorkingTaxiInRequest");
        }

        public AcceptTaxiRequest(taxiIdList: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.TaxiListParam>(RequestParams.TaxiListParam,(param) => {
                param.taxiIdList = taxiIdList;
            }, "AcceptTaxi");
        }

        public RefuseTaxiRequest(taxiIdList: string, refuseReasonCode: number, refuseComment: string, needPersonVisit: boolean): JQueryXHR {
            return this.PostWebMethod<RequestParams.RefuseTaxiParam>(RequestParams.RefuseTaxiParam,(param) => {
                param.taxiIdList       = taxiIdList;
                param.refuseReasonCode = refuseReasonCode;
                param.refuseComment    = encodeURIComponent(refuseComment);
                param.needPersonVisit  = needPersonVisit;
            }, "RefuseTaxi");
        }

        public CanReleaseNewLicensesForRequest(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "CanReleaseNewLicensesForRequest");
        }

        public HasRequestActingLicenses(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "HasRequestActingLicenses");
        }

        public CreateDocumentsWhileClosing(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "CreateDocumentsWhileClosing");
        }

        public CreateDocumentsWhileRefusing(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "CreateDocumentsWhileRefusing");
        }

        public GetDocumentsForSendStatus(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "GetDocumentsForSendStatus");
        }

        public PromoteLicenseDrafts(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "PromoteLicenseDrafts");
        }

        public GetLicenseXmlById(licenseIdList: string): JQueryXHR {
            return this.PostNonEntityWebMethod<RequestParams.LicenseListParam>(RequestParams.LicenseListParam,(param) => {
                param.licenseIdList = licenseIdList;
            }, "GetLicenseXmlById");
        }
        
        public DeleteLicenseDraftsByTaxiStatus(status: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.StatusParam>(RequestParams.StatusParam,(param) => {
                param.status = status;
            }, "DeleteLicenseDraftsByTaxiStatus");
        }

        public SetStatusOnClosing(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "SetStatusOnClosing");
        }

        public UpdateSignatureForLicense(licenseId: number, signature: string): JQueryXHR {
            return this.PostNonEntityWebMethod<RequestParams.LicenseSignatureParam>(RequestParams.LicenseSignatureParam,(param) => {
                param.licenseId = licenseId;
                param.signature = encodeURIComponent(signature);
            }, "UpdateSignatureForLicense");
        }

        public UpdateOutcomeRequestsOnClosing(): JQueryXHR {
            return this.PostWebMethod<RequestParams.ClosingIncomeRequestParam>(
                RequestParams.ClosingIncomeRequestParam, null, "UpdateOutcomeRequestsOnClosing");
        }

        public GetCurrentStatusCode(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "GetCurrentStatusCode");
        }

        public OutputRequest(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "MakeOutput");
        }

        public SendToAsguf(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "SendToAsguf");
        }

        public SendEgripRequest(onsuccess: () => void, onfail: (err: string) => void): void {
            var url = SP.ScriptHelpers.urlCombine(this.ServiceUrl(), "SendRequestEGRIPPage.aspx");
            var urlParams = "IsDlg=1";
            urlParams += ("&ListId=" + _spPageContextInfo.pageListId);
            urlParams += ("&Items=" + this.currentItem.get_id());
            urlParams += ("&Source=" + location.href);
            url += ("?" + urlParams);
            
            var options = {
                url: encodeURI(url),
                title: RequestStrings.EgripDlgTitle,
                allowMaximize: false,
                showClose: true,
                width: 800,
                dialogReturnValueCallback: function (result, returnValue) {
                    if (result == SP.UI.DialogResult.OK) {
                        if (onsuccess) {
                            onsuccess();
                        }
                    } else if (result == -1) {
                        if (onfail) {
                            onfail(RequestErrStrings.EgripDlg);
                        }
                    }
                }
            };

            SP.UI.ModalDialog.showModalDialog(options);
        }

        public SendEgrulRequest(onsuccess: () => void, onfail: (err: string) => void): void {
            var url = SP.ScriptHelpers.urlCombine(this.ServiceUrl(), "SendRequestEGRULPage.aspx");
            var urlParams = "IsDlg=1";
            urlParams += ("&ListId=" + _spPageContextInfo.pageListId);
            urlParams += ("&Items=" + this.currentItem.get_id());
            urlParams += ("&Source=" + location.href);
            url += ("?" + urlParams);

            var options = {
                url: encodeURI(url),
                title: RequestStrings.EgrulDlgTitle,
                allowMaximize: false,
                showClose: true,
                width: 800,
                dialogReturnValueCallback: function (result, returnValue) {
                    if (result == SP.UI.DialogResult.OK) {
                        if (onsuccess) {
                            onsuccess();
                        }
                    }
                    else if (result == -1) {
                        if (onfail) {
                            onfail(RequestErrStrings.EgrulDlg);
                        }
                    }
                }
            };

            SP.UI.ModalDialog.showModalDialog(options);
        }

        public SendPTSRequest(onsuccess: () => void, onfail: (err?: string) => void): void {
            var jqxhr = this.GetAllWorkingTaxiInRequest();

            jqxhr.done((data: any) => {
                if (!data || !data.d) { onfail(); }

                var ctx = SP.ClientContext.get_current();
                var taxiList = ctx.get_web().get_lists().getByTitle(ListTitles.Taxi);
                ctx.load(taxiList);
                ctx.executeQueryAsync((sender: any, args: SP.ClientRequestSucceededEventArgs) => {

                    var taxiItems = data.d.replace(/\;/g, ',');

                    var url = SP.ScriptHelpers.urlCombine(this.ServiceUrl(), "SendRequestPTSPage.aspx");
                    var urlParams = "IsDlg=1";
                    urlParams += ("&ListId=" + taxiList.get_id());
                    urlParams += ("&Items=" + taxiItems);
                    urlParams += ("&Source=" + location.href);
                    url += ("?" + urlParams);

                    var options = {
                        url: encodeURI(url),
                        title: RequestStrings.PtsDlgTitle,
                        allowMaximize: false,
                        showClose: true,
                        width: 800,
                        dialogReturnValueCallback: function (result, returnValue) {
                            if (result == SP.UI.DialogResult.OK) {
                                if (onsuccess) {
                                    onsuccess();
                                }
                            }
                            else if (result == -1) {
                                if (onfail) {
                                    onfail(RequestErrStrings.PtsDlg);
                                }
                            }
                        }
                    };

                    SP.UI.ModalDialog.showModalDialog(options);

                }, onfail);
            });

            jqxhr.fail(onfail);
        }

        public SendStatus(attachsStr: string): JQueryXHR {
            var url = SP.ScriptHelpers.urlCombine(this.ServiceUrl(), "SendStatus.aspx");
            var urlParams = ("ListId=" + _spPageContextInfo.pageListId);
            urlParams += ("&Items=" + this.currentItem.get_id());
            urlParams += attachsStr ? ("&AttachDocuments=" + attachsStr) : "";
            url += ("?" + urlParams);

            return $.ajax({
                url: encodeURI(url),
                method: 'POST'
            });
        }

        public CalculateDatesAndSetStatus(statusCode: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.StatusCodeParam>(RequestParams.StatusCodeParam,(param) => {
                param.statusCode = statusCode;
            }, "CalculateDatesAndSetStatus");
        }

        public GetIncomeRequestCoordinateV5StatusMessage(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "GetIncomeRequestCoordinateV5StatusMessage");
        }

        public SaveIncomeRequestStatusLog(signature: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.SignatureParam>(RequestParams.SignatureParam,(param) => {
                param.signature = encodeURIComponent(signature);
            }, "SaveIncomeRequestStatusLog");
        }

        public SetRefuseReasonAndComment(refuseReasonCode: number, refuseComment: string, refuseReasonCode2: number, refuseComment2: string, refuseReasonCode3: number, refuseComment3: string, needPersonVisit: boolean, refuseDocuments: string): JQueryXHR {
            return this.PostWebMethod<RequestParams.RefuseParam>(RequestParams.RefuseParam,(param) => {
                param.refuseReasonCode  = refuseReasonCode;
                param.refuseComment     = encodeURIComponent(refuseComment);
                param.refuseReasonCode2 = refuseReasonCode2;
                param.refuseComment2    = encodeURIComponent(refuseComment2);
                param.refuseReasonCode3 = refuseReasonCode3;
                param.refuseComment3    = encodeURIComponent(refuseComment3);
                param.needPersonVisit   = needPersonVisit;
                param.refuseDocuments   = refuseDocuments;
            }, "SetRefuseReasonAndComment");
        }

        public IsRequestDeclarantPrivateEntrepreneur(): JQueryXHR {
            return this.PostWebMethod<RequestParams.IncomeRequestCommonParam>(
                RequestParams.IncomeRequestCommonParam, null, "IsRequestDeclarantPrivateEntrepreneur");
        }

        public SaveDocumentDetachedSignature(documentId: number, signature: string): JQueryXHR {
            return this.PostNonEntityWebMethod<RequestParams.DocumentSignatureParam>(RequestParams.DocumentSignatureParam,(param) => {
                param.documentId = documentId;
                param.signature = encodeURIComponent(signature);
            }, "SaveDocumentDetachedSignature");
        }

        public SignXml(xml: string, onsuccess: (data: string) => void, onfail: (msg: string) => void): void {
            var oCertificate = this.SelectedCertificate || (cryptoPro.SelectCertificate(
                cryptoPro.StoreLocation.CAPICOM_CURRENT_USER_STORE,
                cryptoPro.StoreNames.CAPICOM_MY_STORE,
                cryptoPro.StoreOpenMode.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));

            this.SelectedCertificate = this.SelectedCertificate || oCertificate;

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
                    errorMsg = RequestErrStrings.SignXml + e.message;
                }

                if (errorMsg) {
                    if (onfail) onfail(errorMsg);
                } else {
                    onsuccess(signedData);
                }

            } else {
                if (onfail) onfail(RequestErrStrings.SignNoCert);
            }
        }
    }
}