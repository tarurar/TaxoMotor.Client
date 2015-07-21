using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client.WebParts;
using WebPartDefinition = SPMeta2.Definitions.WebPartDefinition;

namespace TM.SP.DataModel.Definitions
{
    public static class WebParts
    {
        public static WebPartDefinition SPListViewFilter = new WebPartDefinition()
        {
            Id                 = "incomeRequestFilterFields",
            WebpartXmlTemplate = WebPartsRes.SPFilterListViewXml,
            Title              = "Поиск обращений",
            ZoneId             = "Main",
            ZoneIndex          = 0
        };

        public static WebPartDefinition IncomeRequestListView = new WebPartDefinition()
        {
            Id                 = "incomeRequestListView",
            WebpartXmlTemplate = WebPartsRes.IncomeRequestListViewXml,
            Title              = "Обращения",
            ZoneId             = "Main",
            ZoneIndex          = 1
        };

        public static WebPartDefinition LicenseMoListView = new WebPartDefinition()
        {
            Id                 = "licenseMoListView",
            WebpartXmlTemplate = WebPartsRes.LicenseMoListViewXml,
            Title              = "Разрешения Московской области",
            ZoneId             = "Main",
            ZoneIndex          = 1
        };

        public static WebPartDefinition LicenseFilterWebPart = new WebPartDefinition()
        {
            Id                 = "licenseFilterWebPart",
            WebpartXmlTemplate = WebPartsRes.LicenseFilterWebPartXml,
            ChromeType         = "None",
            Title              = "Фильтрация разрешений",
            ZoneId             = "Main",
            ZoneIndex          = 1
        };
    }
}
