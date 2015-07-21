using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Microsoft.SharePoint.Client.WebParts;

namespace TM.SP.DataModel.Helpers
{
    public static class WebPartHelpers
    {
        #region methods

        public static string SetWebPartV3PropertyNode(string propertyName, string propertyValue, string webPartXml)
        {
            XmlDocument document = new XmlDocument();
            document.LoadXml(webPartXml);
            string xPath = String.Format("//*[local-name()='property' and @name='{0}']", propertyName);

            XmlNode node = document.SelectSingleNode(xPath);
            if (node != null)
                node.InnerText = propertyValue;

            return document.InnerXml;
        }

        #endregion
    }
}
