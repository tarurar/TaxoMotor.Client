
using System;
using System.Collections.Generic;
using SPMeta2.Models;
using SPMeta2.Syntax.Default;
using SPMeta2.CSOM.Behaviours;
using SPMeta2.Utils;
using Microsoft.SharePoint.Client;
using SPMeta2.Syntax.Default.Modern;
using TM.SP.DataModel.Definitions;
using TM.SP.DataModel.Helpers;

// ReSharper disable CheckNamespace
namespace TM.SP.DataModel
// ReSharper restore CheckNamespace
{
    public static class AllModels
    {
        #region methods

        public static ModelNode GetTaxoMotorSiteModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewSiteModel(site => site
                .WithFields(fields => fields
                    .AddField(Fields.TmMadiTranfererName)
                    .AddField(Fields.TmMadiOgrn)
                    .AddField(Fields.TmMadiPlannedControl)
                    .AddField(Fields.TmMadiControlType, f => f.OnProvisioned<Field>(context => context.Object.MakeChoices(new string[] { "Выездная", "Документарная" })))
                    .AddField(Fields.TmMadiControlDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmMadiOrderNumber)
                    .AddField(Fields.TmMadiControllerNames)
                    .AddField(Fields.TmMadiControlResult, f => f.OnProvisioned<Field>(context => context.Object.MakeChoices(new string[] { "Акт", "Предписание", "Отметка об исполнении предписания" })))
                    .AddField(Fields.TmMadiLicenseNumber)
                    .AddField(Fields.TmMadiStateNumber)
                    .AddField(Fields.TmServiceCode)
                    .AddField(Fields.TmUsageScopeInteger)
                    .AddField(Fields.TmPrintTitle)
                    .AddField(Fields.TmInternalRegNumber)
                    .AddField(Fields.TmRegNumber)
                    .AddField(Fields.TmRefuseDocuments)
                    .AddField(Fields.TmPriority, f => f.OnProvisioned<Field>(context => context.Object.MakeDefaultValue("0")))
                    .AddField(Fields.TmLastProcessDate)
                    .AddField(Fields.TmResultCode)
                    .AddField(Fields.TmSingleNumber)
                    .AddField(Fields.TmFirstName)
                    .AddField(Fields.TmLastName)
                    .AddField(Fields.TmSecondName)
                    .AddField(Fields.TmTransferFirmName)
                    .AddField(Fields.TmTransferBrandName)
                    .AddField(Fields.TmOgrnDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmOgrnNum)
                    .AddField(Fields.TmOgrnName)
                    .AddField(Fields.TmGrAddress)
                    .AddField(Fields.TmOrgInnDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmOrgInnName)
                    .AddField(Fields.TmOrgInnNum)
                    .AddField(Fields.TmTransferAddress)
                    .AddField(Fields.TmTransferFax)
                    .AddField(Fields.TmTransferMail)
                    .AddField(Fields.TmTaxiStateNumberColor)
                    .AddField(Fields.TmTaxiStsDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmTaxiOwnDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmTaxiOwnType)
                    .AddField(Fields.TmTaxiOwnNumber)
                    .AddField(Fields.TmTaxiVin)
                    .AddField(Fields.TmLicenseDateOd,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmLicenseGuidOd)
                    .AddField(Fields.TmLicenseIsMo)
                    .AddField(Fields.TmLicenseGuidMo)
                    .AddField(Fields.TmLicenseDateMo,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmLicenseIsFromPortal)
                    .AddField(Fields.TmRegistrationDate,
                        f => f.OnProvisioned<Field>(context =>
                        {
                            context.Object.MakeDateOnly();
                            context.Object.MakeRequired();

                        }))
                    .AddField(Fields.TmApplyDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmComment)
                    .AddField(Fields.TmComment2)
                    .AddField(Fields.TmComment3)
                    .AddField(Fields.TmInstanceCounter)
                    .AddField(Fields.TmRequestedDocumentPrice)
                    .AddField(Fields.TmOutputFactDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmOutputTargetDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmPrepareFactDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmPrepareTargetDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmRefuseDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmPlannedWorkInDate,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmOutputDate)
                    .AddField(Fields.TmErrorDescription)
                    .AddField(Fields.TmTaxiBrand, f => f.OnProvisioned<Field>(context => context.Object.MakeRequired()))
                    .AddField(Fields.TmTaxiModel, f => f.OnProvisioned<Field>(context => context.Object.MakeRequired()))
                    .AddField(Fields.TmTaxiYear, f => f.OnProvisioned<Field>(context => context.Object.MakeRequired()))
                    .AddField(Fields.TmTaxiLastToDate,
                         f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmTaxiStateNumber, f => f.OnProvisioned<Field>(context => context.Object.MakeRequired()))
                    .AddField(Fields.TmTaxiLeasingContractDetails)
                    .AddField(Fields.TmTaxiBodyYellow, f => f.OnProvisioned<Field>(context => context.Object.MakeRequired()))
                    .AddField(Fields.TmTaxiBodyColor, f => f.OnProvisioned<Field>(context => context.Object.MakeRequired()))
                    .AddField(Fields.TmTaxiBodyColor2)
                    .AddField(Fields.TmTaxiStateNumberYellow)
                    .AddField(Fields.TmTaxiTaxometer)
                    .AddField(Fields.TmTaxiGps)
                    .AddField(Fields.TmTaxiPrevStateNumber)
                    .AddField(Fields.TmTaxiDecision)
                    .AddField(Fields.TmTaxiBlankNo)
                    .AddField(Fields.TmTaxiInfoOld)
                    .AddField(Fields.TmTaxiPrevLicenseNumber)
                    .AddField(Fields.TmTaxiPrevLicenseDate,
                         f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmTaxiStsDetails, f => f.OnProvisioned<Field>(context => context.Object.MakeRequired()))
                    .AddField(Fields.TmTaxiOwner)
                    .AddField(Fields.TmTaxiBodyType)
                    .AddField(Fields.TmTaxiStatus, f => f.OnProvisioned<Field>(
                        context =>
                            context.Object.MakeChoices(new[] { "В работе", "Решено положительно", "Отказано", "Не получено", "Решено отрицательно" })))
                    .AddField(Fields.TmTaxiDenyComment)
                    .AddField(Fields.TmAttachType)
                    .AddField(Fields.TmAttachDocNumber)
                    .AddField(Fields.TmAttachDocDate,
                         f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmAttachDocSerie)
                    .AddField(Fields.TmAttachWhoSigned)
                    .AddField(Fields.TmRenewalReason_AddressCompany)
                    .AddField(Fields.TmRenewalReason_AddressPerson)
                    .AddField(Fields.TmRenewalReason_IdentityCard)
                    .AddField(Fields.TmRenewalReason_NameCompany)
                    .AddField(Fields.TmRenewalReason_NamePerson)
                    .AddField(Fields.TmRenewalReason_ReorgCompany)
                    .AddField(Fields.TmRenewalReason_StateNumber)
                    .AddField(Fields.TmCancellationReasonOther)
                    .AddField(Fields.TmConfigurationCategory)
                    .AddField(Fields.TmConfigurationValue)
                    .AddField(Fields.TmConfigurationDescr)
                    .AddField(Fields.TmAnswerReceived)
                    .AddField(Fields.TmCentralDocStoreUrl)
                    .AddField(Fields.TmAttachDocSubType)
                    .AddField(Fields.TmAttachValidityPeriod,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmAttachListCount)
                    .AddField(Fields.TmAttachCopyCount)
                    .AddField(Fields.TmAttachDivisionCode)
                    .AddField(Fields.TmIdentityDocTypeComment)
                    .AddField(Fields.TmAttachSingleStrDocName)
                    .AddField(Fields.TmBlankNo)
                    .AddField(Fields.TmBlankSeries)
                    .AddField(Fields.TmOrganizationName)
                    .AddField(Fields.TmOrgShortName)
                    .AddField(Fields.TmOrgOgrn)
                    .AddField(Fields.TmOrgInn)
                    .AddField(Fields.TmLicenseStatus, f => f.OnProvisioned<Field>(
                        context =>
                            context.Object.MakeChoices(new[] { "Первичное", "Выдан дубликат", "Приостановлено", "Аннулировано", "Переоформлено" })))
                    .AddField(Fields.TmLicenseObsolete)
                    .AddField(Fields.TmLicenseDisableGibdd)
                    .AddField(Fields.TmLicenseObsoleteComment)
                    .AddField(Fields.TmLicenseDisableGibddComment)
                    .AddField(Fields.TmOrgLfb)
                    .AddField(Fields.TmJuridicalAddress)
                    .AddField(Fields.TmPhoneNumber)
                    .AddField(Fields.TmAddContactData)
                    .AddField(Fields.TmJuridicalPersonAbbreviation)
                    .AddField(Fields.TmLicenseOutputDate, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmLicenseTillDate, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmLicenseFromDate, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmLicenseTillSuspensionDate, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeDateOnly()))
                    .AddField(Fields.TmLicenseCancellationReason)
                    .AddField(Fields.TmLicenseChangeReason)
                    .AddField(Fields.TmLicenseSuspensionReason)
                    .AddField(Fields.TmLicenseInvalidReason)
                    .AddField(Fields.TmLicenseExternalId)
                    .AddField(Fields.TmIncomeRequestTaxiModels, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestTaxiBrands, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestTaxiStateNumbers, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestTaxiYears, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestTaxiLastToDates, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestDeclarantNames, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestDeclarantFullNames, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestDeclarantOgrns, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestOrgFormCodes, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestDeclarantAddresses, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestDeclarantINNs, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestTrusteeNames, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestTrusteeAddresses, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestTrusteeINNs, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestIdentityDocs, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeFillInChoice()))
                    .AddField(Fields.TmIncomeRequestSystemUpdateAvailable, f => f.OnProvisioned<Field>(
                        context => context.Object.MakeDefaultValue("FALSE")))
                    .AddField(Fields.TmServiceCodeSend)
                    .AddField(Fields.TmMessageId,
                        f => f.OnProvisioned<Field>(context => context.Object.MakeHidden(false)))
                    .AddField(Fields.TmIncomeRequestForm,
                        f => f.OnProvisioned<Field>(context =>
                            context.Object.MakeChoices(new[] { "Портал госуслуг", "Очный визит" })))
                    .AddField(Fields.TmShortName)
                    .AddField(Fields.TmXmlValue)
                    .AddField(Fields.TmNeedPersonVisit)
                    .AddField(Fields.TmTermOfService)
                )
                .WithContentTypes(
                    ctList => ctList
                        .AddContentType(ContentTypes.TmIncomeRequestState, ct => ct
                            .AddContentTypeFieldLink(Fields.TmServiceCode)
                            .AddContentTypeFieldLink(Fields.TmIncomeRequestSystemUpdateAvailable))
                        .AddContentType(ContentTypes.TmIncomeRequestStateInternal,
                            ct => ct.AddContentTypeFieldLink(Fields.TmServiceCode))
                        .AddContentType(ContentTypes.TmDenyReason, ct => ct
                            .AddContentTypeFieldLink(Fields.TmServiceCode)
                            .AddContentTypeFieldLink(Fields.TmUsageScopeInteger)
                            .AddContentTypeFieldLink(Fields.TmPrintTitle)
                            .AddContentTypeFieldLink(Fields.TmServiceCodeSend))
                        .AddContentType(ContentTypes.TmGovServiceSubType, ct => ct
                            .AddContentTypeFieldLink(Fields.TmServiceCode)
                            .AddContentTypeFieldLink(Fields.TmTermOfService))
                        .AddContentType(ContentTypes.TmOutcomeRequestType,
                            ct => ct.AddContentTypeFieldLink(Fields.TmServiceCode))
                        .AddContentType(ContentTypes.TmPossessionReason,
                            ct => ct.AddContentTypeFieldLink(Fields.TmServiceCode))
                        .AddContentType(ContentTypes.TmCancellationReason,
                            ct => ct.AddContentTypeFieldLink(Fields.TmServiceCode))
                        .AddContentType(ContentTypes.TmAttachDoc,
                            ct => ct.AddContentTypeFieldLink(Fields.TmCentralDocStoreUrl))
                        .AddContentType(ContentTypes.TmConfigurationEntry, ct => ct
                            .AddContentTypeFieldLink(Fields.TmConfigurationCategory)
                            .AddContentTypeFieldLink(Fields.TmConfigurationValue)
                            .AddContentTypeFieldLink(Fields.TmConfigurationDescr))
                        .AddContentType(ContentTypes.TmIdentityDocumentType, ct => ct
                            .AddContentTypeFieldLink(Fields.TmServiceCode)
                            .AddContentTypeFieldLink(Fields.TmIdentityDocTypeComment))
                        .AddContentType(ContentTypes.TmLegalFormOfBusinessCode, ct => ct
                            .AddContentTypeFieldLink(Fields.TmServiceCode))
                        .AddContentType(ContentTypes.TmLicense, ct => ct
                            .AddContentTypeFieldLink(Fields.TmRegNumber)
                            .AddContentTypeFieldLink(Fields.TmBlankSeries)
                            .AddContentTypeFieldLink(Fields.TmBlankNo)
                            .AddContentTypeFieldLink(Fields.TmOrganizationName)
                            .AddContentTypeFieldLink(Fields.TmOrgShortName)
                            .AddContentTypeFieldLink(Fields.TmFirstName)
                            .AddContentTypeFieldLink(Fields.TmLastName)
                            .AddContentTypeFieldLink(Fields.TmSecondName)
                            .AddContentTypeFieldLink(Fields.TmTransferFirmName)
                            .AddContentTypeFieldLink(Fields.TmTransferBrandName)
                            .AddContentTypeFieldLink(Fields.TmOgrnDate)
                            .AddContentTypeFieldLink(Fields.TmOgrnNum)
                            .AddContentTypeFieldLink(Fields.TmOgrnName)
                            .AddContentTypeFieldLink(Fields.TmGrAddress)
                            .AddContentTypeFieldLink(Fields.TmOrgInnDate)
                            .AddContentTypeFieldLink(Fields.TmOrgInnName)
                            .AddContentTypeFieldLink(Fields.TmOrgInnNum)
                            .AddContentTypeFieldLink(Fields.TmTransferAddress)
                            .AddContentTypeFieldLink(Fields.TmTransferFax)
                            .AddContentTypeFieldLink(Fields.TmTransferMail)
                            .AddContentTypeFieldLink(Fields.TmTaxiBodyColor)
                            .AddContentTypeFieldLink(Fields.TmTaxiStateNumberColor)
                            .AddContentTypeFieldLink(Fields.TmTaxiGps)
                            .AddContentTypeFieldLink(Fields.TmTaxiTaxometer)
                            .AddContentTypeFieldLink(Fields.TmTaxiLastToDate)
                            .AddContentTypeFieldLink(Fields.TmTaxiStsDetails)
                            .AddContentTypeFieldLink(Fields.TmTaxiStsDate)
                            .AddContentTypeFieldLink(Fields.TmTaxiOwnDate)
                            .AddContentTypeFieldLink(Fields.TmTaxiOwnType)
                            .AddContentTypeFieldLink(Fields.TmTaxiOwnNumber)
                            .AddContentTypeFieldLink(Fields.TmTaxiVin)
                            .AddContentTypeFieldLink(Fields.TmLicenseDateOd)
                            .AddContentTypeFieldLink(Fields.TmLicenseGuidOd)
                            .AddContentTypeFieldLink(Fields.TmLicenseIsMo)
                            .AddContentTypeFieldLink(Fields.TmLicenseGuidMo)
                            .AddContentTypeFieldLink(Fields.TmLicenseDateMo)
                            .AddContentTypeFieldLink(Fields.TmLicenseIsFromPortal)
                            .AddContentTypeFieldLink(Fields.TmOrgOgrn)
                            .AddContentTypeFieldLink(Fields.TmOrgInn)
                            .AddContentTypeFieldLink(Fields.TmLicenseStatus)
                            .AddContentTypeFieldLink(Fields.TmOrgLfb)
                            .AddContentTypeFieldLink(Fields.TmJuridicalAddress)
                            .AddContentTypeFieldLink(Fields.TmPhoneNumber)
                            .AddContentTypeFieldLink(Fields.TmAddContactData)
                            .AddContentTypeFieldLink(Fields.TmJuridicalPersonAbbreviation)
                            .AddContentTypeFieldLink(Fields.TmTaxiBrand)
                            .AddContentTypeFieldLink(Fields.TmTaxiModel)
                            .AddContentTypeFieldLink(Fields.TmTaxiYear)
                            .AddContentTypeFieldLink(Fields.TmTaxiStateNumber)
                            .AddContentTypeFieldLink(Fields.TmLicenseOutputDate)
                            .AddContentTypeFieldLink(Fields.TmLicenseTillDate)
                            .AddContentTypeFieldLink(Fields.TmLicenseFromDate)
                            .AddContentTypeFieldLink(Fields.TmLicenseTillSuspensionDate)
                            .AddContentTypeFieldLink(Fields.TmLicenseCancellationReason)
                            .AddContentTypeFieldLink(Fields.TmLicenseSuspensionReason)
                            .AddContentTypeFieldLink(Fields.TmLicenseChangeReason)
                            .AddContentTypeFieldLink(Fields.TmLicenseInvalidReason)
                            .AddContentTypeFieldLink(Fields.TmLicenseExternalId)
                            .AddContentTypeFieldLink(Fields.TmLicenseObsolete)
                            .AddContentTypeFieldLink(Fields.TmLicenseDisableGibdd)
                            .AddContentTypeFieldLink(Fields.TmLicenseObsoleteComment)
                            .AddContentTypeFieldLink(Fields.TmLicenseDisableGibddComment))
                        .AddContentType(ContentTypes.TmDocumentType, ct => ct
                            .AddContentTypeFieldLink(Fields.TmServiceCode)
                            .AddContentTypeFieldLink(Fields.TmShortName))
                        .AddContentType(ContentTypes.TmIncomeRequestStatusLog, ct => ct
                            .AddContentTypeFieldLink(Fields.TmXmlValue))
                        .AddContentType(ContentTypes.TmDocumentTemplate, ct => ct
                            .AddContentTypeFieldLink(Fields.TmServiceCode))
                        .AddContentType(ContentTypes.TmMadiControl, ct => ct
                            .AddContentTypeFieldLink(Fields.TmMadiTranfererName)
                            .AddContentTypeFieldLink(Fields.TmMadiOgrn)
                            .AddContentTypeFieldLink(Fields.TmMadiPlannedControl)
                            .AddContentTypeFieldLink(Fields.TmMadiControlType)
                            .AddContentTypeFieldLink(Fields.TmMadiControlDate)
                            .AddContentTypeFieldLink(Fields.TmMadiOrderNumber)
                            .AddContentTypeFieldLink(Fields.TmMadiControllerNames)
                            .AddContentTypeFieldLink(Fields.TmMadiControlResult)
                            .AddContentTypeFieldLink(Fields.TmMadiLicenseNumber)
                            .AddContentTypeFieldLink(Fields.TmMadiStateNumber))
                ));

            return model;
        }

        public static ModelNode GetTaxoMotorWebModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewWebModel(web => web
                .WithLists(
                    lists => lists
                        .AddList(Lists.TmIncomeRequestStateBookList, l => 
                        { 
                            l.AddContentTypeLink(ContentTypes.TmIncomeRequestState);
                            l.AddField(Fields.TmIncomeRequestSysUpdAvailCalc);
                        })
                        .AddList(Lists.TmIncomeRequestStateInternalBookList,
                            l => l.AddContentTypeLink(ContentTypes.TmIncomeRequestStateInternal))
                        .AddList(Lists.TmDenyReasonBookList,
                            l => l.AddContentTypeLink(ContentTypes.TmDenyReason))
                        .AddList(Lists.TmGovServiceSubTypeBookList,
                            l => l.AddContentTypeLink(ContentTypes.TmGovServiceSubType))
                        .AddList(Lists.TmOutcomeRequestTypeBookList,
                            l => l.AddContentTypeLink(ContentTypes.TmOutcomeRequestType))
                        .AddList(Lists.TmPossessionReasonBookList,
                            l => l.AddContentTypeLink(ContentTypes.TmPossessionReason))
                        .AddList(Lists.TmCancellationReasonBookList,
                            l => l.AddContentTypeLink(ContentTypes.TmCancellationReason))
                        .AddList(Lists.TmConfigurationList,
                            l => l.AddContentTypeLink(ContentTypes.TmConfigurationEntry))
                        .AddList(Lists.TmAttachLib,
                            l => l.AddContentTypeLink(ContentTypes.TmAttachDoc))
                        .AddList(Lists.TmIdentityDocumentTypeBookList,
                            l => l.AddContentTypeLink(ContentTypes.TmIdentityDocumentType))
                        .AddList(Lists.TmLegalFormOfBusinessBookList, 
                            l => l.AddContentTypeLink(ContentTypes.TmLegalFormOfBusinessCode))
                        .AddList(Lists.TmProjectScripts)
                        .AddList(Lists.TmLicenseList, l => l
                            .AddContentTypeLink(ContentTypes.TmLicense)
                            .AddField(Fields.TmLicenseTitle)
                            .OnProvisioned<List>(context => 
                            { 
                                context.Object.MakeFolderCreationAvailable(true);
                                context.Object.EnableVersioning = true;
                            })
                            .AddListView(ListViews.TmLicenseListDefaultView, lv => lv
                                .OnProvisioned<View>(context => context.Object.MakeFoldersInvisible()))
                            .AddListView(ListViews.TmLicenseListCancelledView, lv => lv
                                .OnProvisioned<View>(context => context.Object.MakeFoldersInvisible()))
                            .AddListView(ListViews.TmLicenseListPausedView, lv => lv
                                .OnProvisioned<View>(context => context.Object.MakeFoldersInvisible()))
                            .AddListView(ListViews.TmLicenseListArchiveView, lv => lv
                                .OnProvisioned<View>(context => context.Object.MakeFoldersInvisible()))
                            .AddListView(ListViews.TmLicenseListSearchView, lv => lv
                                .OnProvisioned<View>(context =>
                                {
                                    context.Object.Aggregations = "On";
                                }))
                            .AddListView(ListViews.TmLicenseListDuplicateView, lv => lv
                                .OnProvisioned<View>(context => context.Object.MakeFoldersInvisible()))
                            .AddListView(ListViews.TmLicenseListRenewView, lv => lv
                                .OnProvisioned<View>(context => 
                                {
                                    context.Object.MakeFoldersInvisible();
                                    context.Object.AggregationsStatus = "On";
                                    context.Object.Aggregations = "<FieldRef Name='LinkTitle' Type='COUNT' />";
                                }))
                            .AddListView(ListViews.TmLicenseListFilterView, lv => lv
                                .OnProvisioned<View>(context => 
                                { 
                                    context.Object.MakeFoldersInvisible();
                                    context.Object.MakeHidden();
                                    context.Object.AggregationsStatus = "On";
                                    context.Object.Aggregations = "<FieldRef Name='LinkTitle' Type='COUNT' />";
                                }))
                        )
                        .AddList(Lists.TmDocumentTypeBookList,
                            l => l.AddContentTypeLink(ContentTypes.TmDocumentType))
                        .AddList(Lists.TmIncomeRequestStatusLogList,
                            l => l.AddContentTypeLink(ContentTypes.TmIncomeRequestStatusLog))
                        .AddList(Lists.TmDocumentTemplateLib,
                            l => l.AddContentTypeLink(ContentTypes.TmDocumentTemplate))
                        .AddList(Lists.TmMadiControlList,
                            l => l.AddContentTypeLink(ContentTypes.TmMadiControl))
                        .AddList(Lists.TmProdCalendarList)
                ));

            return model;
        }

        public static ModelNode GetTaxoMotorSiteDependentModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewSiteModel(site => site
                .WithContentTypes(ctList => ctList
                    .AddContentType(ContentTypes.TmIncomeRequest, ct => ct
                        .AddContentTypeFieldLink(Fields.TmInternalRegNumber)
                        .AddContentTypeFieldLink(Fields.TmRegNumber)
                        .AddContentTypeFieldLink(Fields.TmSingleNumber)
                        .AddContentTypeFieldLink(Fields.TmRegistrationDate)
                        .AddContentTypeFieldLink(Fields.TmApplyDate)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestForm)
                        .AddContentTypeFieldLink(Fields.TmComment)
                        .AddContentTypeFieldLink(Fields.TmComment2)
                        .AddContentTypeFieldLink(Fields.TmComment3)
                        .AddContentTypeFieldLink(Fields.TmInstanceCounter)
                        .AddContentTypeFieldLink(Fields.TmRequestedDocumentPrice)
                        .AddContentTypeFieldLink(Fields.TmOutputFactDate)
                        .AddContentTypeFieldLink(Fields.TmOutputTargetDate)
                        .AddContentTypeFieldLink(Fields.TmPrepareFactDate)
                        .AddContentTypeFieldLink(Fields.TmPrepareTargetDate)
                        .AddContentTypeFieldLink(Fields.TmRefuseDate)
                        .AddContentTypeFieldLink(Fields.TmPlannedWorkInDate)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestTaxiModels)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestTaxiBrands)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestTaxiStateNumbers)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestTaxiYears)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestTaxiLastToDates)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestDeclarantNames)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestDeclarantFullNames)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestDeclarantOgrns)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestOrgFormCodes)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestDeclarantAddresses)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestDeclarantINNs)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestTrusteeNames)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestTrusteeAddresses)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestTrusteeINNs)
                        .AddContentTypeFieldLink(Fields.TmIncomeRequestIdentityDocs)
                        .AddContentTypeFieldLink(Fields.TmMessageId)
                        .AddContentTypeFieldLink(Fields.TmNeedPersonVisit)
                        .AddContentTypeFieldLink(Fields.TmRefuseDocuments)
                    )
                    .AddContentType(ContentTypes.TmNewIncomeRequest)
                    .AddContentType(ContentTypes.TmDuplicateIncomeRequest)
                    .AddContentType(ContentTypes.TmRenewIncomeRequest, ct => ct
                        .AddContentTypeFieldLink(Fields.TmRenewalReason_AddressCompany)
                        .AddContentTypeFieldLink(Fields.TmRenewalReason_AddressPerson)
                        .AddContentTypeFieldLink(Fields.TmRenewalReason_IdentityCard)
                        .AddContentTypeFieldLink(Fields.TmRenewalReason_NameCompany)
                        .AddContentTypeFieldLink(Fields.TmRenewalReason_NamePerson)
                        .AddContentTypeFieldLink(Fields.TmRenewalReason_ReorgCompany)
                        .AddContentTypeFieldLink(Fields.TmRenewalReason_StateNumber)
                    )
                    .AddContentType(ContentTypes.TmCancelIncomeRequest, ct => ct
                        .AddContentTypeFieldLink(Fields.TmCancellationReasonOther)
                    )
                ));

            return model;
        }

        public static ModelNode GetTaxoMotorWebDependentModel()
        {
            var model = SPMeta2Model.NewWebModel(web => web
                .WithLists(lists => lists
                    .AddList(Lists.TmIncomeRequestList, l => l
                        .AddContentTypeLink(ContentTypes.TmNewIncomeRequest)
                        .AddContentTypeLink(ContentTypes.TmDuplicateIncomeRequest)
                        .AddContentTypeLink(ContentTypes.TmCancelIncomeRequest)
                        .AddContentTypeLink(ContentTypes.TmRenewIncomeRequest)
                        .OnProvisioned<List>(context =>
                        {
                            context.Object.EnableVersioning = true;
                        })
                        .AddListView(ListViews.TmIncomRequestListFilterView, lv => lv
                            .OnProvisioned<View>(context => 
                            { 
                                context.Object.MakeFoldersInvisible();
                                context.Object.MakeHidden();
                                context.Object.AggregationsStatus = "On";
                                context.Object.Aggregations = "<FieldRef Name='LinkTitleNoMenu' Type='COUNT' />";
                            }))
                    )));

            return model;
        }

        public static ModelNode GetTaxoMotorIncomeRequestSiteDependentModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewSiteModel(site => site
                .WithContentTypes(ctList => ctList
                    .AddContentType(ContentTypes.TmOutcomeRequestState, ct => ct
                        .AddContentTypeFieldLink(Fields.TmOutputDate)
                        .AddContentTypeFieldLink(Fields.TmErrorDescription)
                        .AddContentTypeFieldLink(Fields.TmMessageId)
                        .AddContentTypeFieldLink(Fields.TmAnswerReceived)
                        .AddContentTypeFieldLink(Fields.TmPriority)
                        .AddContentTypeFieldLink(Fields.TmLastProcessDate)
                        .AddContentTypeFieldLink(Fields.TmXmlValue)
                        .AddContentTypeFieldLink(Fields.TmResultCode)
                    )
                    .AddContentType(ContentTypes.TmTaxi, ct => ct
                        .AddContentTypeFieldLink(Fields.TmTaxiBrand)
                        .AddContentTypeFieldLink(Fields.TmTaxiModel)
                        .AddContentTypeFieldLink(Fields.TmTaxiYear)
                        .AddContentTypeFieldLink(Fields.TmTaxiLastToDate)
                        .AddContentTypeFieldLink(Fields.TmTaxiStateNumber)
                        .AddContentTypeFieldLink(Fields.TmTaxiLeasingContractDetails)
                        .AddContentTypeFieldLink(Fields.TmTaxiBodyYellow)
                        .AddContentTypeFieldLink(Fields.TmTaxiBodyColor)
                        .AddContentTypeFieldLink(Fields.TmTaxiBodyColor2)
                        .AddContentTypeFieldLink(Fields.TmTaxiStateNumberYellow)
                        .AddContentTypeFieldLink(Fields.TmTaxiTaxometer)
                        .AddContentTypeFieldLink(Fields.TmTaxiGps)
                        .AddContentTypeFieldLink(Fields.TmTaxiPrevStateNumber)
                        .AddContentTypeFieldLink(Fields.TmTaxiDecision)
                        .AddContentTypeFieldLink(Fields.TmBlankSeries)
                        .AddContentTypeFieldLink(Fields.TmBlankNo)
                        .AddContentTypeFieldLink(Fields.TmTaxiInfoOld)
                        .AddContentTypeFieldLink(Fields.TmTaxiPrevLicenseNumber)
                        .AddContentTypeFieldLink(Fields.TmTaxiPrevLicenseDate)
                        .AddContentTypeFieldLink(Fields.TmTaxiStsDetails)
                        .AddContentTypeFieldLink(Fields.TmTaxiOwner)
                        .AddContentTypeFieldLink(Fields.TmTaxiBodyType)
                        .AddContentTypeFieldLink(Fields.TmTaxiStatus)
                        .AddContentTypeFieldLink(Fields.TmTaxiDenyComment)
                        .AddContentTypeFieldLink(Fields.TmMessageId)
                        .AddContentTypeFieldLink(Fields.TmNeedPersonVisit)
                        .AddContentTypeFieldLink(Fields.TmTaxiVin)
                    )
                    .AddContentType(ContentTypes.TmAttach, ct => ct
                        .AddContentTypeFieldLink(Fields.TmAttachType)
                        .AddContentTypeFieldLink(Fields.TmAttachDocNumber)
                        .AddContentTypeFieldLink(Fields.TmAttachDocDate)
                        .AddContentTypeFieldLink(Fields.TmAttachDocSerie)
                        .AddContentTypeFieldLink(Fields.TmAttachWhoSigned)
                        .AddContentTypeFieldLink(Fields.TmAttachDocSubType)
                        .AddContentTypeFieldLink(Fields.TmAttachValidityPeriod)
                        .AddContentTypeFieldLink(Fields.TmAttachListCount)
                        .AddContentTypeFieldLink(Fields.TmAttachCopyCount)
                        .AddContentTypeFieldLink(Fields.TmAttachDivisionCode)
                        .AddContentTypeFieldLink(Fields.TmAttachSingleStrDocName)
                        .AddContentTypeFieldLink(Fields.TmMessageId)
                    )
                ));

            return model;
        }

        public static ModelNode GetTaxoMotorIncomeRequestWebDependentModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewWebModel(web => web
                .WithLists(lists => lists
                    .AddList(Lists.TmOutcomeRequestStateList, l =>
                        l.AddContentTypeLink(ContentTypes.TmOutcomeRequestState))
                    .AddList(Lists.TmTaxiList, l => l
                        .AddContentTypeLink(ContentTypes.TmTaxi)
                        .OnProvisioned<List>(context => { context.Object.EnableVersioning = true; }))
                    .AddList(Lists.TmIncomeRequestAttachList, l => l
                        .AddContentTypeLink(ContentTypes.TmAttach)
                        .OnProvisioned<List>(context => {
                            context.Object.EnableVersioning = true;
                        }))
                ));

            return model;
        }

        public static ModelNode GetTaxoMotorWebPagesModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewWebModel(web => web
                .WithLists(
                    lists => lists
                        .AddList(Lists.TmProjectSitePages, list =>
                        {
                            list
                                .AddWebPartPage(Pages.IncomeRequestSearch, page =>
                                {
                                    if (!WebHelpers.CheckFeatureActivation(ctx,
                                        new Guid(ModelConsts.SPListViewFilter20FeatureId), FeatureScope.Site))
                                        throw new Exception(String.Format("Feature with id = {0} must be activated",
                                            ModelConsts.SPListViewFilter20FeatureId));
                                    string wpXml;
                                    // adding SPListViewFilter web part
                                    WebParts.SPListViewFilter.WebpartXmlTemplate =
                                        WebPartHelpers.SetWebPartV3PropertyNode("Title", WebParts.SPListViewFilter.Title,
                                            WebParts.SPListViewFilter.WebpartXmlTemplate);
                                    page.AddWebPart(WebParts.SPListViewFilter);
                                    // adding XsltListViewWebPart for income requests to be filtered
                                    IEnumerable<List> allLists = WebHelpers.GetWebLists(ctx);
                                    List incomeRequestList = ListHelpers.GetList(allLists, Lists.TmIncomeRequestList.Url);

                                    wpXml = WebPartHelpers.SetWebPartV3PropertyNode("ListId",
                                        incomeRequestList.Id.ToString("D"),
                                        WebParts.IncomeRequestListView.WebpartXmlTemplate);
                                    wpXml = WebPartHelpers.SetWebPartV3PropertyNode("ListName",
                                        incomeRequestList.Id.ToString("B"), wpXml);
                                    wpXml = WebPartHelpers.SetWebPartV3PropertyNode("Title",
                                        WebParts.IncomeRequestListView.Title, wpXml);
                                    WebParts.IncomeRequestListView.WebpartXmlTemplate = wpXml;
                                    page.AddWebPart(WebParts.IncomeRequestListView);
                                })
                                .AddWebPartPage(Pages.LicenseMo, page =>
                                {
                                    IEnumerable<List> allLists = WebHelpers.GetWebLists(ctx);
                                    List licenseList = ListHelpers.GetList(allLists, Lists.TmLicenseList.Url);

                                    string wpXml;
                                    wpXml = WebPartHelpers.SetWebPartV3PropertyNode("ListId",
                                        licenseList.Id.ToString("D"),
                                        WebParts.LicenseMoListView.WebpartXmlTemplate);
                                    wpXml = WebPartHelpers.SetWebPartV3PropertyNode("ListName",
                                        licenseList.Id.ToString("B"), wpXml);
                                    wpXml = WebPartHelpers.SetWebPartV3PropertyNode("Title",
                                        WebParts.LicenseMoListView.Title, wpXml);
                                    WebParts.LicenseMoListView.WebpartXmlTemplate = wpXml;
                                    page.AddWebPart(WebParts.LicenseMoListView);
                                })
                                .AddWebPartPage(Pages.LicenseFilterPage, page =>
                                {
                                    page.AddWebPart(WebParts.LicenseFilterWebPart);
                                });
                        })
                ));

            return model;
        }

        public static ModelNode GetTaxomotorLookupsModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewWebModel(web => web
                .AddHostList(Lists.TmIncomeRequestList, list => list.AddField(Fields.TmIncomeRequestTaxiCount)));

            return model;
        }

        #endregion
    }
}
