using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client.WebParts;
using SPMeta2.Definitions;
using SPMeta2.Enumerations;
using WebPartDefinition = SPMeta2.Definitions.WebPartDefinition;

namespace TM.SP.DataModel
{
    public static class Pages
    {
        #region properties

        public static WebPartPageDefinition IncomeRequestSearch = new WebPartPageDefinition()
        {
            FileName             = "incomeRequestSearch.aspx",
            Title                = "Поиск обращений",
            NeedOverride         = true,
            PageLayoutTemplate   = BuiltInWebPartPageTemplates.spstd1
        };

        public static WebPartPageDefinition LicenseMo = new WebPartPageDefinition
        {
            FileName           = "LicenseMo.aspx",
            Title              = "Разрешения МО",
            NeedOverride       = true,
            PageLayoutTemplate = BuiltInWebPartPageTemplates.spstd1
        };

        public static WebPartPageDefinition LicenseFilterPage = new WebPartPageDefinition()
        {
            FileName           = "LicenseFilterPage.aspx",
            Title              = "Фильтрация разрешений",
            NeedOverride       = true,
            PageLayoutTemplate = BuiltInWebPartPageTemplates.spstd1
        };

        #endregion
    }
}
