 /// <reference path="typings/sharepoint/SharePoint.d.ts" />
 /// <reference path="typings/jquery/jquery.d.ts" />

// ReSharper disable once InconsistentNaming
declare function RefreshCommandUI(): void;

module TM.SP_ {
    "use strict";

    export module RequestParams {
        export class CommonParam {
            public Stringify(): string {
                return JSON.stringify(this);
            }
        }

        export class EntityCommonParam extends CommonParam {
            public EntityId: number;

            constructor(entity: EntityHelper) {
                super();

                this.EntityId = entity.currentItem.get_id();
            }
        }
    }

    export module RequestMethods {
        export function MakePostRequest(param: RequestParams.CommonParam, methodUrl: string): JQueryXHR {
            return $.ajax({
                type       : "POST",
                url        : methodUrl,
                data       : param.Stringify(),
                contentType: "application/json; charset=utf-8",
                dataType   : "json"
            });
        }
    }

    export class EntityHelper {
        private _serviceUrl: string;
        private _currentItem: SP.ListItem;
        public selectedCertificate: any;

        public get currentItem(): SP.ListItem {
            return this._currentItem;
        }

        public static Create<T extends EntityHelper>(t: { new (): T;}, listGuid: SP.Guid, itemId: number,
            succeededCallback: (entity: T) => void,
            failedCallback?: (sender: any, args: SP.ClientRequestFailedEventArgs) => void) {

            var ctx  = SP.ClientContext.get_current();
            var web  = ctx.get_web();
            var list = web.get_lists().getById(listGuid);
            var item = list.getItemById(itemId);

            ctx.load(item);
            ctx.executeQueryAsync((sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                var newEntity = new t();
                newEntity._currentItem = item;
                succeededCallback(newEntity);
            }, failedCallback);

        }

        public ServiceUrl(): string {
            if (!this._serviceUrl) {
                var layoutsUrl = SP.ScriptHelpers.urlCombine(
                    _spPageContextInfo.webAbsoluteUrl,
                    _spPageContextInfo.layoutsUrl);
                var tmUrl = SP.ScriptHelpers.urlCombine(layoutsUrl, "TaxoMotor");
                this._serviceUrl = tmUrl;
            }
            return this._serviceUrl;
        }

        public BuildMethodUrl(methodName: string): string {
            var rootUrl = this.ServiceUrl();
            return SP.ScriptHelpers.urlCombine(rootUrl, methodName);
        }

        public PostWebMethod<T extends RequestParams.EntityCommonParam>(t: { new (entity: EntityHelper): T }, updateParam: (param: T) => void, methodName: string): JQueryXHR {
            var param = new t(this);
            if (updateParam) {
                updateParam(param);
            }

            return RequestMethods.MakePostRequest(param, this.BuildMethodUrl(methodName));
        }
        
        public PostNonEntityWebMethod<T extends RequestParams.CommonParam>(t: { new (): T }, updateParam: (param: T) => void, methodName: string): JQueryXHR {
            var param = new t();
            if (updateParam) {
                updateParam(param);
            }

            return RequestMethods.MakePostRequest(param, this.BuildMethodUrl(methodName));
        }

        public EnsureCertificate(success: (data: string) => void, fail: (msg: string) => void): void {
            var fakeString = "Fake string for signing";

            var oCertificate = this.selectedCertificate || (cryptoPro.SelectCertificate(
                cryptoPro.StoreLocation.CAPICOM_CURRENT_USER_STORE,
                cryptoPro.StoreNames.CAPICOM_MY_STORE,
                cryptoPro.StoreOpenMode.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));

            this.selectedCertificate = this.selectedCertificate || oCertificate;

            if (oCertificate != null) {
                var signedData;
                var errorMsg;
                try {
                    signedData = cryptoPro.signPkcs7Create(oCertificate, fakeString);
                } catch (e) {
                    errorMsg = "Ошибка при формировании подписи pkcs7: " + e.message;
                }

                if (errorMsg) {
                    fail(errorMsg);
                } else {
                    success(signedData);
                }

            } else {
                fail("При формировании ЭЦП pkcs7 не удалось обнаружить сертификат");
            }

        }
    }

}
