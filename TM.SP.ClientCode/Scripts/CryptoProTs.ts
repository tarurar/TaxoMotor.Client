interface HTMLElement {
    CreateObject(name: string): any;
}

module cryptoPro {
    "use strict";

    // CAPICOM_STORE_LOCATION enumeration
    export enum StoreLocation {
        CAPICOM_MEMORY_STORE,
        CAPICOM_LOCAL_MACHINE_STORE,
        CAPICOM_CURRENT_USER_STORE,
        CAPICOM_ACTIVE_DIRECTORY_USER_STORE,
        CAPICOM_SMART_CARD_USER_STORE
    }

    // CAPICOM_STORE_OPEN_MODE enumeration
    export enum StoreOpenMode {
        CAPICOM_STORE_OPEN_READ_ONLY       = 0,
        CAPICOM_STORE_OPEN_READ_WRITE      = 1,
        CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2,
        CAPICOM_STORE_OPEN_EXISTING_ONLY   = 128,
        CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED= 256
    }

    // CAPICOM_CERTIFICATE_FIND_TYPE enumeration
    export enum CertFindType {
        CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
        CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME,
        CAPICOM_CERTIFICATE_FIND_ISSUER_NAME,
        CAPICOM_CERTIFICATE_FIND_ROOT_NAME,
        CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME,
        CAPICOM_CERTIFICATE_FIND_EXTENSION,
        CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
        CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY,
        CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY,
        CAPICOM_CERTIFICATE_FIND_TIME_VALID,
        CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID,
        CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED,
        CAPICOM_CERTIFICATE_FIND_KEY_USAGE
    }

    // CAPICOM_PROPID enumeration
    export enum PropId {
        CAPICOM_PROPID_UNKNOWN                       = 0,
        CAPICOM_PROPID_KEY_PROV_HANDLE               = 1,
        CAPICOM_PROPID_KEY_PROV_INFO                 = 2,
        CAPICOM_PROPID_SHA1_HASH                     = 3,
        CAPICOM_PROPID_HASH_PROP                     = 3,
        CAPICOM_PROPID_MD5_HASH                      = 4,
        CAPICOM_PROPID_KEY_CONTEXT                   = 5,
        CAPICOM_PROPID_KEY_SPEC                      = 6,
        CAPICOM_PROPID_IE30_RESERVED                 = 7,
        CAPICOM_PROPID_PUBKEY_HASH_RESERVED          = 8,
        CAPICOM_PROPID_ENHKEY_USAGE                  = 9,
        CAPICOM_PROPID_CTL_USAGE                     = 9,
        CAPICOM_PROPID_NEXT_UPDATE_LOCATION          = 10,
        CAPICOM_PROPID_FRIENDLY_NAME                 = 11,
        CAPICOM_PROPID_PVK_FILE                      = 12,
        CAPICOM_PROPID_DESCRIPTION                   = 13,
        CAPICOM_PROPID_ACCESS_STATE                  = 14,
        CAPICOM_PROPID_SIGNATURE_HASH                = 15,
        CAPICOM_PROPID_SMART_CARD_DATA               = 16,
        CAPICOM_PROPID_EFS                           = 17,
        CAPICOM_PROPID_FORTEZZA_DATA                 = 18,
        CAPICOM_PROPID_ARCHIVED                      = 19,
        CAPICOM_PROPID_KEY_IDENTIFIER                = 20,
        CAPICOM_PROPID_AUTO_ENROLL                   = 21,
        CAPICOM_PROPID_PUBKEY_ALG_PARA               = 22,
        CAPICOM_PROPID_CROSS_CERT_DIST_POINTS        = 23,
        CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH    = 24,
        CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH   = 25,
        CAPICOM_PROPID_ENROLLMENT                    = 26,
        CAPICOM_PROPID_DATE_STAMP                    = 27,
        CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH = 28,
        CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH         = 29,
        CAPICOM_PROPID_EXTENDED_ERROR_INFO           = 30,
        CAPICOM_PROPID_RENEWAL                       = 64,
        CAPICOM_PROPID_ARCHIVED_KEY_HASH             = 65,
        CAPICOM_PROPID_FIRST_RESERVED                = 66,
        CAPICOM_PROPID_LAST_RESERVED                 = 0x00007FFF,
        CAPICOM_PROPID_FIRST_USER                    = 0x00008000,
        CAPICOM_PROPID_LAST_USER                     = 0x0000FFFF
    }

    // CADESCOM_XML_SIGNATURE_TYPE enumeration
    export enum SignatureType  {
        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED,
        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING,
        CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE
    }

    // public static CADESCOM_HASH_ALGORITHM enumeration
    export enum HashAlgorithm  {
        CADESCOM_HASH_ALGORITHM_CP_GOST_3411 = 100,
        CADESCOM_HASH_ALGORITHM_MD2          = 1,
        CADESCOM_HASH_ALGORITHM_MD4          = 2,
        CADESCOM_HASH_ALGORITHM_MD5          = 3,
        CADESCOM_HASH_ALGORITHM_SHA_256      = 4,
        CADESCOM_HASH_ALGORITHM_SHA_384      = 5,
        CADESCOM_HASH_ALGORITHM_SHA_512      = 6,
        CADESCOM_HASH_ALGORITHM_SHA1         = 0
    }

    export enum CadesType  {
        CADESCOM_CADES_DEFAULT       = 0,
        CADESCOM_CADES_BES           = 1,
        CADESCOM_CADES_X_LONG_TYPE_1 = 0x5d
    }

    export enum ContentEncoding  {
        CADESCOM_BASE64_TO_BINARY = 0x01,
        CADESCOM_STRING_TO_UCS2LE = 0x00
    }

    export class StoreNames {
        public static CAPICOM_MY_STORE: string = "My";
    }

    export class GostXmlDSigUrls {
        public static XmlDsigGost3410Url: string = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411";
        public static XmlDsigGost3411Url: string = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411";
    }

    function getErrorMessage(e: any) {
        var err = e.message;
        if (!err) {
            err = e;
        } else if (e.number) {
            err += " (" + e.number + ")";
        }
        return err;
    }

    export function isPluginInstalled(): any {
        try {
            var oAbout = CreateObject("CAdESCOM.About");
            // После получения объекта CAdESCOM.About можно дополнительно проверить версию
            // установленного КриптоПро ЭЦП Browser plug-in
            return oAbout;
        } catch (err) {
            console.error("Ошибка при создании объекта CAdESCOM.About. Вероятно, Browser Plugin CryptoPro не установлен");
        }
        return false;
    };

    export function CreateObject(name: string): any {
        switch (navigator.appName) {
            case "Microsoft Internet Explorer":
                return new ActiveXObject(name);
            default:
                var userAgent = navigator.userAgent;
                if (userAgent.match(/Trident\/./i)) { // IE11
                    return new ActiveXObject(name);
                }
                var cadesobject = document.getElementById("cadesplugin");
                return cadesobject.CreateObject(name);
        }
    };

    export function SelectCertificate(storeLocation: StoreLocation, storeName: string, storeOpenMode: StoreOpenMode): any {
        try {
            var oStore = CreateObject("CAPICOM.Store");
            oStore.Open(storeLocation, storeName, storeOpenMode);

            var oCertificates = oStore.Certificates;
            if (oCertificates.Count === 0) {
                alert("В хранилище нет ни одного сертификата");
            } else {
                // Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
                if (oCertificates.Count > 0) {
                    oCertificates = oCertificates.Find(CertFindType.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
                        PropId.CAPICOM_PROPID_KEY_PROV_INFO);
                }

                // Выбираются только сертификаты, действительные в настоящее время
                var today = new Date();
                var date = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
                if (oCertificates.Count > 0) {
                    oCertificates = oCertificates.Find(CertFindType.CAPICOM_CERTIFICATE_FIND_TIME_VALID, date);
                }

                if (oCertificates.Count > 1) {
                    oCertificates = oCertificates.Select("Выбор сертификата для подписи", "АИС ТаксоМотор", false);
                }

                var oCertificate = oCertificates.Item(1);
            }

            oStore.Close();

            return oCertificate;

        } catch (e) {
            if (e.number !== -2138568446) {// отказ от выбора сертификата
                alert("Ошибка выбора сертификата: " + getErrorMessage(e));
            }
            return false;
        }
    };

    // Подписание XmlDsig
    export function SignXMLCreate (oCertificate: any, dataToSign: string): string {
        // Создаем объект CAdESCOM.CPSigner
        var oSigner = CreateObject("CAdESCOM.CPSigner");
        oSigner.Certificate = oCertificate;

        // Создаем объект CAdESCOM.SignedXML
        var oSignedXml = CreateObject("CAdESCOM.SignedXML");
        oSignedXml.Content = dataToSign;

        // Указываем тип подписи - в данном случае вложенная
        oSignedXml.SignatureType = SignatureType.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED;

        // Указываем алгоритм подписи
        oSignedXml.SignatureMethod = GostXmlDSigUrls.XmlDsigGost3410Url;

        // Указываем алгоритм хэширования
        oSignedXml.DigestMethod = GostXmlDSigUrls.XmlDsigGost3411Url;

        var sSignedMessage: string = "";
        try {
            sSignedMessage = oSignedXml.Sign(oSigner);
        } catch (err) {
            alert("Failed to create signature. Error: " + getErrorMessage(err));
            return sSignedMessage;
        }

        return sSignedMessage;
    };

    export function signPkcs7Create (oCertificate: any, dataToSign: string): string {
        // Создаем объект CAdESCOM.CPSigner
        var oSigner = CreateObject("CAdESCOM.CPSigner");
        oSigner.Certificate = oCertificate;

        var oSignedData = CreateObject("CAdESCOM.CadesSignedData");
        // Значение свойства ContentEncoding должно быть задано
        // до заполнения свойства Content
        oSignedData.ContentEncoding = ContentEncoding.CADESCOM_BASE64_TO_BINARY;
        oSignedData.Content = Base64.encode(dataToSign);

        var sSignedMessage: string = "";
        try {
            sSignedMessage = oSignedData.SignCades(oSigner, CadesType.CADESCOM_CADES_BES, true);
        } catch (err) {
            alert("Failed to create signature. Error: " + getErrorMessage(err));
            return sSignedMessage;
        }

        return sSignedMessage;
    };

    export function XmlVerify (sSignedMessage: string): boolean {
        // Создаем объект CAdESCOM.SignedXML
        var oSignedXml = CreateObject("CAdESCOM.SignedXML");

        try {
            oSignedXml.Verify(sSignedMessage);
        } catch (err) {
            alert("Failed to verify signature. Error: " + getErrorMessage(err));
            return false;
        }

        return true;
    };

    class Base64 {
        private static _keyStr: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        public static encode (e: string): string {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = this._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64;
                } else if (isNaN(i)) {
                    a = 64;
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
            }
            return t;
        }

        public static decode (e: string): string {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u !== 64) {
                    t = t + String.fromCharCode(r);
                }
                if (a !== 64) {
                    t = t + String.fromCharCode(i);
                }
            }
            t = this._utf8_decode(t);
            return t;
        }

        private static _utf8_encode (e: string): string {
            e = e.replace(/\r\n/g, "\n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128);
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128);
                }
            }
            return t;
        }

        private static _utf8_decode (e: string): string {
            var t = "";
            var n = 0;
            var r = 0, c2 = 0, c3 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++;
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2;
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3;
                }
            }
            return t;
        }
    };
}