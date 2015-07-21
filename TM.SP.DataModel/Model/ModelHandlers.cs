using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using SPMeta2.BuiltInDefinitions;
using SPMeta2.CSOM.Behaviours;
using SPMeta2.CSOM.Extensions;
using SPMeta2.Syntax.Default;
using SPMeta2.Enumerations;
using TM.SP.DataModel.Consts;
using PlumsailFields = TM.SP.DataModel.Plumsail.Fields;

namespace TM.SP.DataModel
{
    public static class ModelHandlers
    {
        #region methods

        public static void MakeContentTypesDefault(ClientContext ctx)
        {
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmIncomeRequestStateBookList.Url,
                    ContentTypes.TmIncomeRequestState.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmIncomeRequestStateInternalBookList.Url,
                ContentTypes.TmIncomeRequestStateInternal.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmDenyReasonBookList.Url,
                ContentTypes.TmDenyReason.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmGovServiceSubTypeBookList.Url,
                ContentTypes.TmGovServiceSubType.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmOutcomeRequestTypeBookList.Url,
                ContentTypes.TmOutcomeRequestType.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmIncomeRequestList.Url,
                new string[]
                {
                    ContentTypes.TmNewIncomeRequest.Name, 
                    ContentTypes.TmDuplicateIncomeRequest.Name,
                    ContentTypes.TmRenewIncomeRequest.Name, 
                    ContentTypes.TmCancelIncomeRequest.Name
                });
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmOutcomeRequestStateList.Url,
                ContentTypes.TmOutcomeRequestState.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmTaxiList.Url,
                ContentTypes.TmTaxi.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmIncomeRequestAttachList.Url,
                ContentTypes.TmAttach.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmPossessionReasonBookList.Url,
                ContentTypes.TmPossessionReason.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmCancellationReasonBookList.Url,
                ContentTypes.TmCancellationReason.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmConfigurationList.Url,
                ContentTypes.TmConfigurationEntry.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmAttachLib.Url,
                ContentTypes.TmAttachDoc.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmIdentityDocumentTypeBookList.Url,
                ContentTypes.TmIdentityDocumentType.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmLicenseList.Url,
                ContentTypes.TmLicense.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmDocumentTypeBookList.Url,
                ContentTypes.TmDocumentType.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmIncomeRequestStatusLogList.Url,
                ContentTypes.TmIncomeRequestStatusLog.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmDocumentTemplateLib.Url,
                ContentTypes.TmDocumentTemplate.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmMadiControlList.Url,
                ContentTypes.TmMadiControl.Name);
            ListHelpers.MakeContentTypeDefault(ctx, Lists.TmLegalFormOfBusinessBookList.Url,
                ContentTypes.TmLegalFormOfBusinessCode.Name);
        }

        public static void CreateBcsFields(ClientContext ctx)
        {
            CheckBcsFeaturesActivation(ctx);

            IEnumerable<List> allLists = WebHelpers.GetWebLists(ctx);
            List incomeRequestList     = ListHelpers.GetList(allLists, Lists.TmIncomeRequestList.Url);
            List licenseList           = ListHelpers.GetList(allLists, Lists.TmLicenseList.Url);

            #region [Income Request List]
            ListHelpers.AddFieldAsXmlToList(incomeRequestList, Fields.TmRequestAccountBcsLookupXml,
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestList, Fields.TmRequestContactBcsLookupXml,
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestList, Fields.TmRequestTrusteeBcsLookupXml,
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            #endregion

            #region [License List]
            ListHelpers.AddFieldAsXmlToList(licenseList, Fields.TmLicenseAllViewBcsLookupXml,
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            #endregion
        }

        private static void CheckBcsFeaturesActivation(ClientContext ctx)
        {
            if (!WebHelpers.CheckFeatureActivation(ctx, new Guid(BcsModelConsts.CV5ListsFeatureId), FeatureScope.Web))
                throw new Exception(String.Format("Feature with id = {0} must be activated", BcsModelConsts.CV5ListsFeatureId));

            if (!WebHelpers.CheckFeatureActivation(ctx, new Guid(BcsModelConsts.TaxiListsFeatureId), FeatureScope.Web))
                throw new Exception(String.Format("Feature with id = {0} must be activated", BcsModelConsts.TaxiListsFeatureId));

            if (!WebHelpers.CheckFeatureActivation(ctx, new Guid(BcsModelConsts.TaxiV2ListsFeatureId), FeatureScope.Web))
                throw new Exception(String.Format("Feature with id = {0} must be activated", BcsModelConsts.TaxiV2ListsFeatureId));
        }

        private static void SetPlumsailLookups(ClientContext ctx)
        {
            #region [Getting lists]
            IEnumerable<List> allLists              = WebHelpers.GetWebLists(ctx);
            List incomeRequestList                  = ListHelpers.GetList(allLists, Lists.TmIncomeRequestList.Url);
            List incomeRequestStateBookList         = ListHelpers.GetList(allLists, Lists.TmIncomeRequestStateBookList.Url);
            List incomeRequestStateInternalBookList = ListHelpers.GetList(allLists, Lists.TmIncomeRequestStateInternalBookList.Url);
            List denyReasonBookList                 = ListHelpers.GetList(allLists, Lists.TmDenyReasonBookList.Url);
            List govServiceSubTypeBookList          = ListHelpers.GetList(allLists, Lists.TmGovServiceSubTypeBookList.Url);
            List outcomeRequestTypeBookList         = ListHelpers.GetList(allLists, Lists.TmOutcomeRequestTypeBookList.Url);
            List possessionReasonBookList           = ListHelpers.GetList(allLists, Lists.TmPossessionReasonBookList.Url);
            List cancellationReasonBookList         = ListHelpers.GetList(allLists, Lists.TmCancellationReasonBookList.Url);
            List taxiList                           = ListHelpers.GetList(allLists, Lists.TmTaxiList.Url);
            List incomeRequestAttachList            = ListHelpers.GetList(allLists, Lists.TmIncomeRequestAttachList.Url);
            List licenseList                        = ListHelpers.GetList(allLists, Lists.TmLicenseList.Url);
            List documentTypeBookList               = ListHelpers.GetList(allLists, Lists.TmDocumentTypeBookList.Url);
            #endregion
            #region [Setting list links]
            PlumsailFields.TmIncomeRequestLookupXml.ListId              = incomeRequestList.Id;
            PlumsailFields.TmIncomeRequestStateLookupXml.ListId         = incomeRequestStateBookList.Id;
            PlumsailFields.TmIncomeRequestStateInternalLookupXml.ListId = incomeRequestStateInternalBookList.Id;
            PlumsailFields.TmDenyReasonLookupXml.ListId                 = denyReasonBookList.Id;
            PlumsailFields.TmDenyReasonLookup2Xml.ListId                = denyReasonBookList.Id;
            PlumsailFields.TmDenyReasonLookup3Xml.ListId                = denyReasonBookList.Id;
            PlumsailFields.TmRequestedDocumentXml.ListId                = govServiceSubTypeBookList.Id;
            PlumsailFields.TmOutputRequestTypeLookupXml.ListId          = outcomeRequestTypeBookList.Id;
            PlumsailFields.TmPossessionReasonLookupXml.ListId           = possessionReasonBookList.Id;
            PlumsailFields.TmCancellationReasonLookupXml.ListId         = cancellationReasonBookList.Id;
            PlumsailFields.TmTaxiLookupXml.ListId                       = taxiList.Id;
            PlumsailFields.TmIncomeRequestAttachLookupXml.ListId        = incomeRequestAttachList.Id;
            PlumsailFields.TmLicenseParentLicenseLookupXml.ListId       = licenseList.Id;
            PlumsailFields.TmLicenseRootParentLicenseLookupXml.ListId   = licenseList.Id;
            PlumsailFields.TmLicenseLookupXml.ListId                    = licenseList.Id;
            PlumsailFields.TmDocumentTypeLookupXml.ListId               = documentTypeBookList.Id;
            #endregion
        }

        public static void CreatePlumsailFields(ClientContext ctx)
        {
            if (!WebHelpers.CheckFeatureActivation(ctx, new Guid(PlumsailConsts.CrossSiteLookupFeatureId), FeatureScope.Site))
                throw new Exception(String.Format("Feature with id = {0} must be activated",
                    PlumsailConsts.CrossSiteLookupFeatureId));

            SetPlumsailLookups(ctx);
            
            #region [Getting lists]
            Guid webId = WebHelpers.GetWebId(ctx);
            IEnumerable<List> allLists = WebHelpers.GetWebLists(ctx);
            List taxiList                   = ListHelpers.GetList(allLists, Lists.TmTaxiList.Url);
            List outcomeRequestStateList    = ListHelpers.GetList(allLists, Lists.TmOutcomeRequestStateList.Url);
            List incomeRequestAttachList    = ListHelpers.GetList(allLists, Lists.TmIncomeRequestAttachList.Url);
            List incomeRequestList          = ListHelpers.GetList(allLists, Lists.TmIncomeRequestList.Url);
            List attachLibrary              = ListHelpers.GetList(allLists, Lists.TmAttachLib.Url);
            List licenseList                = ListHelpers.GetList(allLists, Lists.TmLicenseList.Url);
            List incomeRequestStateLogList  = ListHelpers.GetList(allLists, Lists.TmIncomeRequestStatusLogList.Url);
            List madiControlList            = ListHelpers.GetList(allLists, Lists.TmMadiControlList.Url);
            #endregion
            #region [Adding lookup fields]
            ListHelpers.AddFieldAsXmlToList(taxiList               , PlumsailFields.TmIncomeRequestLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(taxiList               , PlumsailFields.TmDenyReasonLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(taxiList               , PlumsailFields.TmPossessionReasonLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(outcomeRequestStateList, PlumsailFields.TmIncomeRequestLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(outcomeRequestStateList, PlumsailFields.TmOutputRequestTypeLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(outcomeRequestStateList, PlumsailFields.TmTaxiLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(outcomeRequestStateList, PlumsailFields.TmLicenseLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(outcomeRequestStateList, PlumsailFields.TmLicenseRootParentLicenseLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestAttachList, PlumsailFields.TmIncomeRequestLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestAttachList, PlumsailFields.TmDocumentTypeLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestAttachList, PlumsailFields.TmTaxiLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestList      , PlumsailFields.TmIncomeRequestStateLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestList      , PlumsailFields.TmIncomeRequestStateInternalLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestList      , PlumsailFields.TmDenyReasonLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestList, PlumsailFields.TmDenyReasonLookup2Xml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestList, PlumsailFields.TmDenyReasonLookup3Xml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestList      , PlumsailFields.TmRequestedDocumentXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(attachLibrary          , PlumsailFields.TmIncomeRequestLookupXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(attachLibrary          , PlumsailFields.TmTaxiLookupXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(attachLibrary          , PlumsailFields.TmIncomeRequestAttachLookupXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(licenseList            , PlumsailFields.TmLicenseParentLicenseLookupXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(licenseList, PlumsailFields.TmLicenseRootParentLicenseLookupXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(licenseList            , PlumsailFields.TmTaxiLookupXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestStateLogList, PlumsailFields.TmIncomeRequestLookupXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(incomeRequestStateLogList, PlumsailFields.TmIncomeRequestStateLookupXml.ToXml(),
               AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            ListHelpers.AddFieldAsXmlToList(madiControlList, PlumsailFields.TmLicenseLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToAllContentTypes);
            #endregion
            #region [Adding TmCancellationReasonLookupXml field to TmCancelIncomeRequest contenttype ONLY]
            Field cancellationReasonLookupField = ListHelpers.AddFieldAsXmlToList(incomeRequestList,
                PlumsailFields.TmCancellationReasonLookupXml.ToXml(),
                AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddToNoContentType);
            ListHelpers.AddListContentTypeFieldLink(ctx, Lists.TmIncomeRequestList, ContentTypes.TmCancelIncomeRequest,
                cancellationReasonLookupField);
            #endregion
        }

        public static void CreateFieldIndexes(ClientContext ctx)
        {
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmLicenseExternalId.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmTaxiStateNumber.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmLicenseOutputDate.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, BuiltInInternalFieldNames.Title);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmRegNumber.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmLicenseIsMo.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmLicenseStatus.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmLicenseFromDate.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmLicenseTillDate.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Fields.TmTaxiVin.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, "_x0421__x0441__x044b__x043b__x04");
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, BuiltInFieldDefinitions.ContentType.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmLicenseList.Url, Plumsail.Fields.TmTaxiLookupXml.InternalName);

            ListHelpers.IndexField(ctx, Lists.TmIncomeRequestAttachList.Url, Fields.TmAttachType.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmIncomeRequestAttachList.Url, Plumsail.Fields.TmIncomeRequestLookupXml.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmIncomeRequestAttachList.Url, Plumsail.Fields.TmTaxiLookupXml.InternalName);

            ListHelpers.IndexField(ctx, Lists.TmAttachLib.Url, Plumsail.Fields.TmIncomeRequestAttachLookupXml.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmAttachLib.Url, Plumsail.Fields.TmIncomeRequestLookupXml.InternalName);

            ListHelpers.IndexField(ctx, Lists.TmTaxiList.Url, Plumsail.Fields.TmIncomeRequestLookupXml.InternalName);

            ListHelpers.IndexField(ctx, Lists.TmIncomeRequestList.Url, Fields.TmRegistrationDate.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmIncomeRequestList.Url, Fields.TmPrepareFactDate.InternalName);

            ListHelpers.IndexField(ctx, Lists.TmOutcomeRequestStateList.Url, Plumsail.Fields.TmTaxiLookupXml.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmOutcomeRequestStateList.Url, Plumsail.Fields.TmLicenseLookupXml.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmOutcomeRequestStateList.Url, Plumsail.Fields.TmIncomeRequestLookupXml.InternalName);
            ListHelpers.IndexField(ctx, Lists.TmOutcomeRequestStateList.Url, Fields.TmAnswerReceived.InternalName);
        }

        #endregion
    }
}
