using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPMeta2.Definitions;
using SPMeta2.Enumerations;

namespace TM.SP.DataModel.Definitions
{
    public static class ListViews
    {
        public static ListViewDefinition TmLicenseListDefaultView = new ListViewDefinition
        {
            Title     = "1. РЕЕСТР РАЗРЕШЕНИЙ",
            Url       = "Default",
            IsDefault = true,
            RowLimit  = 20,
            Query     = "<OrderBy><FieldRef Name='Title' Ascending='TRUE' /></OrderBy><Where><And><And><And><Geq><FieldRef Name='Tm_LicenseOutputDate' /><Value Type='DateTime'><Today OffsetDays='-30' /></Value></Geq><Eq><FieldRef Name='Tm_LicenseIsMo' /><Value Type='Boolean'>0</Value></Eq></And><Neq><FieldRef Name='Tm_LicenseStatus' /><Value Type='Text'>Аннулировано</Value></Neq></And><Eq><FieldRef Name='_x0421__x0441__x044b__x043b__x04' /><Value Type='Number'>1</Value></Eq></And></Where>",
            JSLink    = String.Format("clienttemplates.js | ~site/{0}/LicenseViewCSR.js", Lists.TmProjectScripts.Url),
            Fields    = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitle,
                 Fields.TmOrgOgrn.InternalName,
                 Fields.TmTaxiStateNumber.InternalName,
                 Fields.TmBlankSeries.InternalName,
                 Fields.TmBlankNo.InternalName,
                 Fields.TmLicenseOutputDate.InternalName,
                 Fields.TmTaxiBrand.InternalName,
                 Fields.TmTaxiModel.InternalName,
                 Fields.TmTaxiYear.InternalName,
                 Fields.TmOrgShortName.InternalName,
                 Fields.TmLicenseFromDate.InternalName,
                 Fields.TmLicenseTillDate.InternalName,
                 Fields.TmLicenseStatus.InternalName,
                 Fields.TmLicenseIsMo.InternalName,
                 Fields.TmTaxiOwnType.InternalName,
                 Fields.TmTaxiStsDetails.InternalName,
                 Fields.TmTaxiBodyColor.InternalName,
                 "_x0421__x0441__x044b__x043b__x04"
            }
        };

        public static ListViewDefinition TmLicenseListCancelledView = new ListViewDefinition
        {
            Title = "2. Аннулированные разрешения",
            Url = "Cancelled",
            IsDefault = false,
            RowLimit = 20,
            Query = "<OrderBy><FieldRef Name='Title' /></OrderBy><Where><Eq><FieldRef Name='Tm_LicenseStatus' /><Value Type='Text'>Аннулировано</Value></Eq></Where>",
            JSLink = String.Format("clienttemplates.js | ~site/{0}/LicenseViewCSR.js", Lists.TmProjectScripts.Url),
            Fields = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitle,
                 Fields.TmOrgOgrn.InternalName,
                 Fields.TmTaxiStateNumber.InternalName,
                 Fields.TmBlankSeries.InternalName,
                 Fields.TmBlankNo.InternalName,
                 Fields.TmLicenseOutputDate.InternalName,
                 Fields.TmTaxiBrand.InternalName,
                 Fields.TmTaxiModel.InternalName,
                 Fields.TmTaxiYear.InternalName,
                 Fields.TmOrganizationName.InternalName,
                 Fields.TmLicenseStatus.InternalName,
                 Fields.TmTaxiLastToDate.InternalName,
                 Fields.TmLicenseTillDate.InternalName,
                 Fields.TmLicenseIsMo.InternalName,
                 "_x0421__x0441__x044b__x043b__x04"
            }
        };

        public static ListViewDefinition TmLicenseListSearchView = new ListViewDefinition
        {
            Title = "3. Поиск",
            Url = "Search",
            IsDefault = false,
            RowLimit = 20,
            Query = "<OrderBy><FieldRef Name='Title' /></OrderBy><Where><Eq><FieldRef Name='ContentType' /><Value Type='Computed'>Tm_License</Value></Eq></Where>",
            JSLink = String.Format("clienttemplates.js | ~site/{0}/LicenseViewCSR.js", Lists.TmProjectScripts.Url),
            Fields = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitle,
                 Fields.TmOrgOgrn.InternalName,
                 Fields.TmTaxiStateNumber.InternalName,
                 Fields.TmBlankSeries.InternalName,
                 Fields.TmBlankNo.InternalName,
                 Fields.TmLicenseOutputDate.InternalName,
                 Fields.TmTaxiBrand.InternalName,
                 Fields.TmTaxiModel.InternalName,
                 Fields.TmTaxiYear.InternalName,
                 Fields.TmOrganizationName.InternalName,
                 Fields.TmLicenseStatus.InternalName,
                 Fields.TmTaxiLastToDate.InternalName,
                 Fields.TmLicenseTillDate.InternalName,
                 Fields.TmLicenseIsMo.InternalName,
                 "_x0421__x0441__x044b__x043b__x04"
            }
        };

        public static ListViewDefinition TmLicenseListDuplicateView = new ListViewDefinition
        {
            Title = "4. Дубликаты",
            Url = "Duplicates",
            IsDefault = false,
            RowLimit = 20,
            Query = "<OrderBy><FieldRef Name='Title' /></OrderBy><Where><Eq><FieldRef Name='Tm_LicenseStatus' /><Value Type='Text'>Выдан дубликат</Value></Eq></Where>",
            JSLink = String.Format("clienttemplates.js | ~site/{0}/LicenseViewCSR.js", Lists.TmProjectScripts.Url),
            Fields = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitle,
                 Fields.TmOrgOgrn.InternalName,
                 Fields.TmTaxiStateNumber.InternalName,
                 Fields.TmBlankSeries.InternalName,
                 Fields.TmBlankNo.InternalName,
                 Fields.TmLicenseOutputDate.InternalName,
                 Fields.TmTaxiBrand.InternalName,
                 Fields.TmTaxiModel.InternalName,
                 Fields.TmTaxiYear.InternalName,
                 Fields.TmOrganizationName.InternalName,
                 Fields.TmLicenseStatus.InternalName,
                 Fields.TmTaxiLastToDate.InternalName,
                 Fields.TmLicenseTillDate.InternalName,
                 Fields.TmLicenseIsMo.InternalName,
                 "_x0421__x0441__x044b__x043b__x04"
            }
        };

        public static ListViewDefinition TmLicenseListArchiveView = new ListViewDefinition
        {
            Title = "5. Архив",
            Url = "Archive",
            IsDefault = false,
            RowLimit = 20,
            Query = "<OrderBy><FieldRef Name='Title' /></OrderBy>",
            JSLink = String.Format("clienttemplates.js | ~site/{0}/LicenseViewCSR.js", Lists.TmProjectScripts.Url),
            Fields = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitle,
                 Fields.TmOrgOgrn.InternalName,
                 Fields.TmTaxiStateNumber.InternalName,
                 Fields.TmBlankSeries.InternalName,
                 Fields.TmBlankNo.InternalName,
                 Fields.TmLicenseOutputDate.InternalName,
                 Fields.TmTaxiBrand.InternalName,
                 Fields.TmTaxiModel.InternalName,
                 Fields.TmTaxiYear.InternalName,
                 Fields.TmOrganizationName.InternalName,
                 Fields.TmLicenseStatus.InternalName,
                 Fields.TmTaxiLastToDate.InternalName,
                 Fields.TmLicenseTillDate.InternalName,
                 Fields.TmLicenseIsMo.InternalName,
                 "_x0421__x0441__x044b__x043b__x04"
            }
        };

        public static ListViewDefinition TmLicenseListPausedView = new ListViewDefinition
        {
            Title = "6. Приостановленные разрешения",
            Url = "Paused",
            IsDefault = false,
            RowLimit = 20,
            Query = "<OrderBy><FieldRef Name='Title' /></OrderBy><Where><Eq><FieldRef Name='Tm_LicenseStatus' /><Value Type='Text'>Приостановлено</Value></Eq></Where>",
            JSLink = String.Format("clienttemplates.js | ~site/{0}/LicenseViewCSR.js", Lists.TmProjectScripts.Url),
            Fields = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitle,
                 Fields.TmOrgOgrn.InternalName,
                 Fields.TmTaxiStateNumber.InternalName,
                 Fields.TmBlankSeries.InternalName,
                 Fields.TmBlankNo.InternalName,
                 Fields.TmLicenseOutputDate.InternalName,
                 Fields.TmTaxiBrand.InternalName,
                 Fields.TmTaxiModel.InternalName,
                 Fields.TmTaxiYear.InternalName,
                 Fields.TmOrganizationName.InternalName,
                 Fields.TmLicenseStatus.InternalName,
                 Fields.TmTaxiLastToDate.InternalName,
                 Fields.TmLicenseTillDate.InternalName,
                 Fields.TmLicenseIsMo.InternalName,
                 "_x0421__x0441__x044b__x043b__x04"
            }
        };

        public static ListViewDefinition TmLicenseListRenewView = new ListViewDefinition
        {
            Title = "7. Переоформлено",
            Url = "Renewed",
            IsDefault = false,
            RowLimit = 20,
            Query = "<OrderBy><FieldRef Name='Title' /></OrderBy><Where><Eq><FieldRef Name='Tm_LicenseStatus' /><Value Type='Text'>Переоформлено</Value></Eq></Where>",
            JSLink = String.Format("clienttemplates.js | ~site/{0}/LicenseViewCSR.js", Lists.TmProjectScripts.Url),
            Fields = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitle,
                 Fields.TmOrgOgrn.InternalName,
                 Fields.TmTaxiStateNumber.InternalName,
                 Fields.TmBlankSeries.InternalName,
                 Fields.TmBlankNo.InternalName,
                 Fields.TmLicenseOutputDate.InternalName,
                 Fields.TmTaxiBrand.InternalName,
                 Fields.TmTaxiModel.InternalName,
                 Fields.TmTaxiYear.InternalName,
                 Fields.TmOrganizationName.InternalName,
                 Fields.TmLicenseStatus.InternalName,
                 Fields.TmTaxiLastToDate.InternalName,
                 Fields.TmLicenseTillDate.InternalName,
                 Fields.TmLicenseIsMo.InternalName,
                 "_x0421__x0441__x044b__x043b__x04"
            }
        };

        public static ListViewDefinition TmIncomRequestListFilterView = new ListViewDefinition
        {
            Title = "FilterView",
            Url = "FilterView",
            IsDefault = false,
            RowLimit = 20,
            Query = "<OrderBy><FieldRef Name='Tm_InternalRegNumber' /></OrderBy>",
            JSLink = "clienttemplates.js",
            Fields = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitleNoMenu,
                 Fields.TmInternalRegNumber.InternalName,
                 Plumsail.Fields.TmRequestedDocumentXml.InternalName,
                 Plumsail.Fields.TmIncomeRequestStateLookupXml.InternalName,
                 Fields.TmSingleNumber.InternalName,
                 Fields.TmRegNumber.InternalName,
                 Fields.TmIncomeRequestDeclarantNames.InternalName,
                 Fields.TmRegistrationDate.InternalName,
                 Fields.TmApplyDate.InternalName,
                 Fields.TmPrepareFactDate.InternalName,
                 Fields.TmIncomeRequestTaxiStateNumbers.InternalName,
                 Fields.TmOutputFactDate.InternalName
            }
        };

        public static ListViewDefinition TmLicenseListFilterView = new ListViewDefinition
        {
            Title = "FilterView",
            Url = "FilterView",
            IsDefault = false,
            RowLimit = 20,
            Query = "<OrderBy><FieldRef Name='Title' /></OrderBy>",
            JSLink = String.Format("clienttemplates.js | ~site/{0}/LicenseViewCSR.js", Lists.TmProjectScripts.Url),
            Fields = new System.Collections.ObjectModel.Collection<string> 
            { 
                 BuiltInInternalFieldNames.LinkTitle,
                 Fields.TmOrgOgrn.InternalName,
                 Fields.TmTaxiStateNumber.InternalName,
                 Fields.TmBlankSeries.InternalName,
                 Fields.TmBlankNo.InternalName,
                 Fields.TmLicenseOutputDate.InternalName,
                 Fields.TmTaxiBrand.InternalName,
                 Fields.TmTaxiModel.InternalName,
                 Fields.TmTaxiYear.InternalName,
                 Fields.TmOrganizationName.InternalName,
                 Fields.TmLicenseStatus.InternalName,
                 Fields.TmTaxiLastToDate.InternalName,
                 Fields.TmLicenseTillDate.InternalName,
                 Fields.TmLicenseIsMo.InternalName,
                 "_x0421__x0441__x044b__x043b__x04"
            }
        };
    }
}
