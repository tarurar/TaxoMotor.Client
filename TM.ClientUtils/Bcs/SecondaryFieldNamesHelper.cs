using System;
using System.Collections;
using System.Text;
using System.IO;
using System.Globalization;
using System.Web.UI;

namespace TM.ClientUtils.Bcs
{
    public static class SecondaryFieldNamesHelper
    {
        #region fields & properties
        private static string[] s_crgstrUrlHexValue =
        {
            "%00", "%01", "%02", "%03", "%04", "%05", "%06", "%07", "%08", "%09", "%0A", "%0B", "%0C", "%0D", "%0E", "%0F",
            "%10", "%11", "%12", "%13", "%14", "%15", "%16", "%17", "%18", "%19", "%1A", "%1B", "%1C", "%1D", "%1E", "%1F",
            "%20", "%21", "%22", "%23", "%24", "%25", "%26", "%27", "%28", "%29", "%2A", "%2B", "%2C", "%2D", "%2E", "%2F",
            "%30", "%31", "%32", "%33", "%34", "%35", "%36", "%37", "%38", "%39", "%3A", "%3B", "%3C", "%3D", "%3E", "%3F",
            "%40", "%41", "%42", "%43", "%44", "%45", "%46", "%47", "%48", "%49", "%4A", "%4B", "%4C", "%4D", "%4E", "%4F",
            "%50", "%51", "%52", "%53", "%54", "%55", "%56", "%57", "%58", "%59", "%5A", "%5B", "%5C", "%5D", "%5E", "%5F",
            "%60", "%61", "%62", "%63", "%64", "%65", "%66", "%67", "%68", "%69", "%6A", "%6B", "%6C", "%6D", "%6E", "%6F",
            "%70", "%71", "%72", "%73", "%74", "%75", "%76", "%77", "%78", "%79", "%7A", "%7B", "%7C", "%7D", "%7E", "%7F",
            "%80", "%81", "%82", "%83", "%84", "%85", "%86", "%87", "%88", "%89", "%8A", "%8B", "%8C", "%8D", "%8E", "%8F",
            "%90", "%91", "%92", "%93", "%94", "%95", "%96", "%97", "%98", "%99", "%9A", "%9B", "%9C", "%9D", "%9E", "%9F",
            "%A0", "%A1", "%A2", "%A3", "%A4", "%A5", "%A6", "%A7", "%A8", "%A9", "%AA", "%AB", "%AC", "%AD", "%AE", "%AF",
            "%B0", "%B1", "%B2", "%B3", "%B4", "%B5", "%B6", "%B7", "%B8", "%B9", "%BA", "%BB", "%BC", "%BD", "%BE", "%BF",
            "%C0", "%C1", "%C2", "%C3", "%C4", "%C5", "%C6", "%C7", "%C8", "%C9", "%CA", "%CB", "%CC", "%CD", "%CE", "%CF",
            "%D0", "%D1", "%D2", "%D3", "%D4", "%D5", "%D6", "%D7", "%D8", "%D9", "%DA", "%DB", "%DC", "%DD", "%DE", "%DF",
            "%E0", "%E1", "%E2", "%E3", "%E4", "%E5", "%E6", "%E7", "%E8", "%E9", "%EA", "%EB", "%EC", "%ED", "%EE", "%EF",
            "%F0", "%F1", "%F2", "%F3", "%F4", "%F5", "%F6", "%F7", "%F8", "%F9", "%FA", "%FB", "%FC", "%FD", "%FE", "%FF"
        };
        #endregion

        #region public methods
        public static bool IsEncodedString(string str)
        {
            if (string.IsNullOrEmpty(str))
                return false;

            bool res = true;
            try
            {
                SplitStrings(str);
            }
            catch
            {
                res = false;
            }
            return res;
        }

        public static string Encode(string[] secondaryFieldNames)
        {
            return CombineStrings(secondaryFieldNames);
        }

        public static string[] Decode(string str)
        {
            if (string.IsNullOrEmpty(str))
                return new string[0];
            return SplitStrings(str);
        }

        public static string ConvertToSP2010(string str)
        {
            if (IsEncodedString(str))
                return str;

            string[] fieldNames = str.Split(new[] { ":" }, StringSplitOptions.RemoveEmptyEntries);
            string encodedVal = CombineStrings(fieldNames);
            return encodedVal;
        }
        #endregion

        #region internal methods
        private static string[] SplitStrings(string combinedEncoded)
        {
            string[] array;
            ArrayList list = new ArrayList();
            if ("0" == combinedEncoded)
                return new string[0];
            try
            {
                string str = UrlKeyValueDecode(combinedEncoded);
                string[] strArray2 = str.Split(new[] { ' ' }, StringSplitOptions.None);
                int result;
                if ((strArray2 == null) || !int.TryParse(strArray2[strArray2.Length - 1], NumberStyles.Integer, CultureInfo.InvariantCulture, out result))
                    throw new ArgumentException(string.Empty, "combinedEncoded");
                int num2 = str.LastIndexOf(' ');
                string str2 = str.Substring(result, num2 - result);
                int length = str2.Length;
                int index = 0;
                int startIndex = 0;
                while (startIndex < length)
                {
                    string s = strArray2[index];
                    int num6 = 1;
                    if ((s != null) && (s.Length == 0))
                        list.Add(null);
                    else
                    {
                        if (!int.TryParse(s, NumberStyles.Integer, CultureInfo.InvariantCulture, out num6))
                            throw new ArgumentException(string.Empty, "combinedEncoded");
                        list.Add(str2.Substring(startIndex, num6 - 1));
                    }
                    startIndex += num6;
                    index++;
                }
                array = new string[list.Count];
                list.CopyTo(array);
            }
            catch (Exception exception)
            {
                throw new ArgumentException(string.Empty, "combinedEncoded", exception);
            }
            return array;
        }

        private static string UrlKeyValueDecode(string keyOrValueToDecode)
        {
            if (string.IsNullOrEmpty(keyOrValueToDecode))
                return keyOrValueToDecode;
            return UrlDecodeHelper(keyOrValueToDecode, keyOrValueToDecode.Length, true);
        }

        private static string UrlDecodeHelper(string stringToDecode, int length, bool decodePlus)
        {
            if ((stringToDecode == null) || (stringToDecode.Length == 0))
                return stringToDecode;
            StringBuilder builder = new StringBuilder(length);
            byte[] bytes = null;
            int nIndex = 0;
            while (nIndex < length)
            {
                char ch = stringToDecode[nIndex];
                if (ch < ' ')
                    nIndex++;
                else
                {
                    if (decodePlus && (ch == '+'))
                    {
                        builder.Append(" ");
                        nIndex++;
                        continue;
                    }
                    if (IsHexEscapedChar(stringToDecode, nIndex, length))
                    {
                        if (bytes == null)
                            bytes = new byte[(length - nIndex) / 3];
                        int count = 0;
                        do
                        {
                            int num3 = (FromHexNoCheck(stringToDecode[nIndex + 1]) * 0x10) + FromHexNoCheck(stringToDecode[nIndex + 2]);
                            bytes[count++] = (byte)num3;
                            nIndex += 3;
                        }
                        while (IsHexEscapedChar(stringToDecode, nIndex, length));
                        builder.Append(Encoding.UTF8.GetChars(bytes, 0, count));
                        continue;
                    }
                    builder.Append(ch);
                    nIndex++;
                }
            }
            if (length < stringToDecode.Length)
                builder.Append(stringToDecode.Substring(length));
            return builder.ToString();
        }

        private static bool IsHexEscapedChar(string str, int nIndex, int nPathLength)
        {
            if ((((nIndex + 2) >= nPathLength) || (str[nIndex] != '%')) || (!IsHexDigit(str[nIndex + 1]) || !IsHexDigit(str[nIndex + 2])))
                return false;
            if (str[nIndex + 1] == '0')
                return (str[nIndex + 2] != '0');
            return true;
        }

        private static bool IsHexDigit(char digit)
        {
            if ((('0' > digit) || (digit > '9')) && (('a' > digit) || (digit > 'f')))
                return (('A' <= digit) && (digit <= 'F'));
            return true;
        }

        private static int FromHexNoCheck(char digit)
        {
            if (digit <= '9')
                return (digit - '0');
            if (digit <= 'F')
                return ((digit - 'A') + 10);
            return ((digit - 'a') + 10);
        }

        private static string CombineStrings(string[] strings)
        {
            StringBuilder builder = new StringBuilder();
            int index = 0;
            for (int i = 0; i < strings.Length; i++)
            {
                string str = strings[i];
                string str2 = ((str != null) ? ((str.Length + 1)).ToString(CultureInfo.InvariantCulture) : string.Empty) + ' ';
                builder.Insert(index, str2);
                index += str2.Length;
                builder.Append(str + ' ');
            }
            builder.Append(index.ToString(CultureInfo.InvariantCulture));
            return UrlKeyValueEncode(builder.ToString());
        }

        private static string UrlKeyValueEncode(string keyOrValueToEncode)
        {
            if ((keyOrValueToEncode == null) || (keyOrValueToEncode.Length == 0))
                return keyOrValueToEncode;
            StringBuilder sb = new StringBuilder(0xff);
            HtmlTextWriter output = new HtmlTextWriter(new StringWriter(sb, CultureInfo.InvariantCulture));
            UrlKeyValueEncode(keyOrValueToEncode, output);
            return sb.ToString();
        }

        private static void UrlKeyValueEncode(string keyOrValueToEncode, TextWriter output)
        {
            if (((keyOrValueToEncode != null) && (keyOrValueToEncode.Length != 0)) && (output != null))
            {
                bool fUsedNextChar = false;
                int startIndex = 0;
                int length = 0;
                int num3 = keyOrValueToEncode.Length;
                for (int i = 0; i < num3; i++)
                {
                    char ch = keyOrValueToEncode[i];
                    if (((('0' <= ch) && (ch <= '9')) || (('a' <= ch) && (ch <= 'z'))) || (('A' <= ch) && (ch <= 'Z')))
                        length++;
                    else
                    {
                        if (length > 0)
                        {
                            output.Write(keyOrValueToEncode.Substring(startIndex, length));
                            length = 0;
                        }
                        UrlEncodeUnicodeChar(output, keyOrValueToEncode[i], (i < (num3 - 1)) ? keyOrValueToEncode[i + 1] : '\0', out fUsedNextChar);
                        if (fUsedNextChar)
                            i++;
                        startIndex = i + 1;
                    }
                }
                if ((startIndex < num3) && (output != null))
                    output.Write(keyOrValueToEncode.Substring(startIndex));
            }
        }

        private static void UrlEncodeUnicodeChar(TextWriter output, char ch, char chNext, out bool fUsedNextChar)
        {
            bool fInvalidUnicode = false;
            UrlEncodeUnicodeChar(output, ch, chNext, ref fInvalidUnicode, out fUsedNextChar);
        }

        private static void UrlEncodeUnicodeChar(TextWriter output, char ch, char chNext, ref bool fInvalidUnicode, out bool fUsedNextChar)
        {
            int num = 0xc0;
            int num2 = 0xe0;
            int num3 = 240;
            int num4 = 0x80;
            int num5 = 0xd800;
            int num6 = 0xfc00;
            int num7 = 0x10000;
            fUsedNextChar = false;
            int index = ch;
            if (index <= 0x7f)
                output.Write(s_crgstrUrlHexValue[index]);
            else
            {
                int num8;
                if (index <= 0x7ff)
                {
                    num8 = num | (index >> 6);
                    output.Write(s_crgstrUrlHexValue[num8]);
                    num8 = num4 | (index & 0x3f);
                    output.Write(s_crgstrUrlHexValue[num8]);
                }
                else if ((index & num6) != num5)
                {
                    num8 = num2 | (index >> 12);
                    output.Write(s_crgstrUrlHexValue[num8]);
                    num8 = num4 | ((index & 0xfc0) >> 6);
                    output.Write(s_crgstrUrlHexValue[num8]);
                    num8 = num4 | (index & 0x3f);
                    output.Write(s_crgstrUrlHexValue[num8]);
                }
                else if (chNext != '\0')
                {
                    index = (index & 0x3ff) << 10;
                    fUsedNextChar = true;
                    index |= chNext & 'Ͽ';
                    index += num7;
                    num8 = num3 | (index >> 0x12);
                    output.Write(s_crgstrUrlHexValue[num8]);
                    num8 = num4 | ((index & 0x3f000) >> 12);
                    output.Write(s_crgstrUrlHexValue[num8]);
                    num8 = num4 | ((index & 0xfc0) >> 6);
                    output.Write(s_crgstrUrlHexValue[num8]);
                    num8 = num4 | (index & 0x3f);
                    output.Write(s_crgstrUrlHexValue[num8]);
                }
                else
                    fInvalidUnicode = true;
            }
        }
        #endregion
    }
}
