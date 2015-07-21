using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPMeta2.Definitions;
using SPMeta2.Enumerations;

namespace TM.SP.DataModel
{
    public static class Lists
    {
        public static ListDefinition TmIncomeRequestStateBookList = new ListDefinition()
        {
            Title               = "Состояния обращений (справочник)",
            Url                 = "IncomeRequestStateBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Справочник состояний обращения",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmIncomeRequestStateInternalBookList = new ListDefinition()
        {
            Title               = "Внутренние статусы обращений (справочник)",
            Url                 = "IncomeRequestStateInternalBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Справочник внутренних статусов обращения",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmDenyReasonBookList = new ListDefinition()
        {
            Title               = "Причины отказа (справочник)",
            Url                 = "DenyReasonBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Справочник причин отказа по обращениям, автомобилям и т. д.",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmPossessionReasonBookList = new ListDefinition()
        {
            Title               = "Основание владения (справочник)",
            Url                 = "PossessionReasonBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Справочник оснований владения",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmGovServiceSubTypeBookList = new ListDefinition()
        {
            Title               = "Подтип госуслуги (справочник)",
            Url                 = "GovServiceSubTypeBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Справочник подтипов госуслуги",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmCancellationReasonBookList = new ListDefinition()
        {
            Title               = "Причины аннулирования (справочник)",
            Url                 = "CancellationReasonBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Справочник причин аннулирования разрешений",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmIncomeRequestList = new ListDefinition()
        {
            Title               = "Обращения",
            Url                 = "IncomeRequestList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Обращения",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmOutcomeRequestTypeBookList = new ListDefinition()
        {
            Title               = "Тип межвед. запроса (справочник)",
            Url                 = "OutcomeRequestTypeBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Справочник типов межведомственных запросов",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmLegalFormOfBusinessBookList = new ListDefinition()
        {
            Title               = "Организационно-правовые формы (справочник)",
            Url                 = "LegalFormOfBusinessBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Справочник кодов организационно-правовых форм",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmOutcomeRequestStateList = new ListDefinition()
        {
            Title               = "Состояние межвед. запросов",
            Url                 = "OutcomeRequestStateList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Список содержит статусы межведомственных запросов по обращениям",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmTaxiList = new ListDefinition()
        {
            Title               = "Транспортные средства",
            Url                 = "TaxiList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Транспортные средства",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmIncomeRequestAttachList = new ListDefinition()
        {
            Title               = "Документы обращения",
            Url                 = "IncomeRequestAttachList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Документы обращения",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmConfigurationList = new ListDefinition()
        {
            Title               = "Конфигурация",
            Url                 = "ConfigurationList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Элементы конфигурации системы",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmAttachLib = new ListDefinition()
        {
            Title               = "Вложения документов",
            Url                 = "AttachLib",
            TemplateType        = BuiltInListTemplateTypeId.DocumentLibrary,
            Description         = "Библиотека документов обращений, транспортных средств и других сущностей",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmIdentityDocumentTypeBookList = new ListDefinition()
        {
            Title               = "Виды документов удост. личность",
            Url                 = "IdentityDocumentTypeBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Список видов документов, которые являются документами, удостоверяющими личность",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmProjectSitePages = new ListDefinition()
        {
            Title               = "Страницы проекта",
            Url                 = "ProjectSitePages",
            TemplateType        = BuiltInListTemplateTypeId.WebPageLibrary,
            Description         = "Список для контент-страниц проекта",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmProjectScripts = new ListDefinition()
        {
            Title               = "Скрипты проекта",
            Url                 = "ProjectScripts",
            TemplateType        = BuiltInListTemplateTypeId.DocumentLibrary,
            Description         = "Библиотека для скриптов",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmLicenseList = new ListDefinition()
        {
            Title               = "Разрешения",
            Url                 = "LicenseList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Список разрешений (лицензий) на осуществление таксомоторной деятельности",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmDocumentTypeBookList = new ListDefinition()
        {
            Title               = "Виды документов",
            Url                 = "DocumentTypeBookList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Список видов документов",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmIncomeRequestStatusLogList = new ListDefinition()
        {
            Title               = "История статусов обращений",
            Url                 = "IncomeRequestStatusLogList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "История статусов обращений",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmDocumentTemplateLib = new ListDefinition()
        {
            Title               = "Шаблоны генерируемых документов",
            Url                 = "DocumentTemplateLib",
            TemplateType        = BuiltInListTemplateTypeId.DocumentLibrary,
            Description         = "Библиотека шаблонов, используемых при генерации документов",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmMadiControlList = new ListDefinition()
        {
            Title               = "Проверки МАДИ",
            Url                 = "MadiControlList",
            TemplateType        = BuiltInListTemplateTypeId.GenericList,
            Description         = "Проверки МАДИ",
            ContentTypesEnabled = true
        };

        public static ListDefinition TmProdCalendarList = new ListDefinition()
        {
            Title               = "Производственный календарь",
            Url                 = "ProdCalendarList",
            TemplateType        = BuiltInListTemplateTypeId.Events,
            Description         = "Производственный календарь",
            ContentTypesEnabled = true
        };
    }
}
