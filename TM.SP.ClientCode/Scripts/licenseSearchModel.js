(function () {

    'use strict';

    function Params() {
        var self = this;

        self.RegNumber = ko.observable();
        self.BlankNo = ko.observable();
        self.BlankSeries = ko.observable();
        self.OrgName = ko.observable();
        self.JuridicalAddress = ko.observable();
        self.PhoneNumber = ko.observable();
        self.AddContactData = ko.observable();
        self.Ogrn = ko.observable();
        self.Inn = ko.observable();
        self.TaxiBrand = ko.observable();
        self.TaxiModel = ko.observable();
        self.TaxiStateNumber = ko.observable();
        self.TaxiYear = ko.observable();
        self.OutputDate = ko.observable();
        self.TillDate = ko.observable();
        self.ChangeDate = ko.observable();
        self.Status = ko.observable(0);
        self.DataSourceName = ko.computed(function () {

            var listName = '';

            switch (+self.Status()) {
                case 0:
                    listName = 'LicenseAllBCSList';
                    break;
                case 1:
                    listName = 'LicenseActingBCSList';
                    break;
                case 2:
                    listName = 'LicensePausedBCSList';
                    break;
                case 3:
                    listName = 'LicenseCancelledBCSList';
                    break;
                case 4:
                    listName = 'LicenseEverChangedBCSList';
                    break;
                default:
                    listName = 'LicenseAllBCSList';
            }

            return listName;
        }, self);

        self.ODataFilters = function () {
            var filters = [];

            if (self.RegNumber())
                filters.push("substringof('" + self.RegNumber() + "', RegNumber)");
            if (self.BlankNo())
                filters.push("substringof('" + self.BlankNo() + "', BlankNo)");
            if (self.BlankSeries())
                filters.push("substringof('" + self.BlankSeries() + "', BlankSeries)");
            if (self.OrgName())
                filters.push("substringof('" + self.OrgName() + "', OrgName)");
            if (self.JuridicalAddress())
                filters.push("substringof('" + self.JuridicalAddress() + "', JuridicalAddress)");
            if (self.PhoneNumber())
                filters.push("substringof('" + self.PhoneNumber() + "', PhoneNumber)");
            if (self.AddContactData())
                filters.push("substringof('" + self.AddContactData() + "', AddContactData)");
            if (self.Ogrn())
                filters.push("substringof('" + self.Ogrn() + "', Ogrn)");
            if (self.Inn())
                filters.push("substringof('" + self.Inn() + "', Inn)");
            if (self.TaxiBrand())
                filters.push("substringof('" + self.TaxiBrand() + "', TaxiBrand)");
            if (self.TaxiModel())
                filters.push("substringof('" + self.TaxiModel() + "', TaxiModel)");
            if (self.TaxiStateNumber())
                filters.push("substringof('" + self.TaxiStateNumber() + "', TaxiStateNumber)");
            if (self.TaxiYear())
                filters.push("TaxiYear eq " + self.TaxiYear());
            if (self.OutputDate())
                filters.push("OutputDate eq datetime'" + self.OutputDate().toISOString() + "'");
            if (self.TillDate())
                filters.push("TillDate eq datetime'" + self.TillDate().toISOString() + "'");
            if (self.ChangeDate())
                filters.push("ChangeDate eq datetime'" + self.ChangeDate().toISOString() + "'");

            return filters;
        }
    }

    function License(data) {
        this.Id = data.BdcIdentity ? ko.observable(data.BdcIdentity) : ko.observable(data.ID);
        this.Title = ko.observable(data.Title);
        this.RegNumber = ko.observable(data.RegNumber);
        this.BlankSeries = ko.observable(data.BlankSeries);
        this.BlankNo = ko.observable(data.BlankNo);
        this.OrgName = ko.observable(data.OrgName);
        this.Ogrn = ko.observable(data.Ogrn);
        this.Inn = ko.observable(data.Inn);
        this.Status = ko.observable(data.Status);
        this.Document = ko.observable(data.Document);
        this.Signature = ko.observable(data.Signature);
        this.TaxiId = ko.observable(data.TaxiId);
        this.Lfb = ko.observable(data.Lfb);
        this.JuridicalAddress = ko.observable(data.JuridicalAddress);
        this.PhoneNumber = ko.observable(data.PhoneNumber);
        this.AddContactData = ko.observable(data.AddContactData);
        this.AccountAbbr = ko.observable(data.AccountAbbr);
        this.TaxiBrand = ko.observable(data.TaxiBrand);
        this.TaxiModel = ko.observable(data.TaxiModel);
        this.TaxiStateNumber = ko.observable(data.TaxiStateNumber);
        this.TaxiYear = ko.observable(data.TaxiYear);
        this.OutputDate = ko.observable(data.OutputDate ? new Date(data.OutputDate).toLocaleDateString() : '');
        this.CreationDate = ko.observable(data.CreationDate ? new Date(data.CreationDate).toLocaleDateString() : '');
        this.TillDate = ko.observable(data.TillDate ? new Date(data.TillDate).toLocaleDateString() : '');
        this.TillSuspensionDate = ko.observable(data.TillSuspensionDate ? new Date(data.TillSuspensionDate).toLocaleDateString() : '');
        this.CancellationReason = ko.observable(data.CancellationReason);
        this.SuspensionReason = ko.observable(data.SuspensionReason);
        this.ChangeReason = ko.observable(data.ChangeReason);
        this.InvalidReason = ko.observable(data.InvalidReason);
        this.IsLast = ko.observable(data.IsLast ? data.IsLast : 1);
        this.IsLastText = ko.computed(function () {
            return +this.IsLast() == 1 ? "Текущая" : "Архивная";
        }, this);
    }

    function LicenseSearchModel() {
        var self = this;
        // model properties
        self.Results = ko.observableArray([]);
        self.Params = ko.observable(new Params());
        self.IsEmpty = ko.computed(function () {
            return self.Results().length == 0;
        }, self);
        // model methods
        self.init = function () {
            self.hostweburl = window.location.protocol + '//' + window.location.host;
        }

        self.getBaseWebUrl = function () {
            return self.hostweburl + "/_api/web";
        }

        self.buildRequestUrl = function (currentRequestUrlToken) {
            var url = self.getBaseWebUrl() + currentRequestUrlToken;
            return self.getBaseWebUrl() + currentRequestUrlToken;
        }

        self.CreateResultsFromJSON = function (jsonData, listMD) {
            if (!listMD) return;

            var displayForm = $.grep(listMD, function (el, index) { return (el.FormType == 4); });
            var editForm = $.grep(listMD, function (el, index) { return (el.FormType == 6); });
            var newForm = $.grep(listMD, function (el, index) { return (el.FormType == 8); });

            for (var i = 0; i < jsonData.length; i++) {
                var item = new License(jsonData[i]);
                item.DisplayUrl = displayForm.length > 0 ? (self.hostweburl + displayForm[0].ServerRelativeUrl + '?ID=' + item.Id()) : '';
                item.EditUrl = editForm.length > 0 ? (self.hostweburl + editForm[0].ServerRelativeUrl + '?ID=' + item.Id()) : '';
                item.NewUrl = newForm.length > 0 ? (self.hostweburl + newForm[0].ServerRelativeUrl) : '';

                self.Results.push(item);
            }
        }

        self.GetListMetaData = function (listName, success, fail) {
            var url = self.buildRequestUrl("/lists/getByTitle('" + listName + "')/Forms?$select=FormType,ServerRelativeUrl");
            $.ajax({
                url: encodeURI(url),
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    success(data.d.results);
                },
                error: function (data, errorCode, errorMessage) {
                    fail(errorMessage);
                }
            });
        }

        self.loadAllData = function () {
            var listName = self.Params().DataSourceName();

            self.GetListMetaData(listName, function (metadata) {
                var url = self.buildRequestUrl("/lists/getbytitle('" + listName + "')/items");
                $.ajax({
                    url: encodeURI(url),
                    method: "GET",
                    headers: { "Accept": "application/json; odata=verbose" },
                    success: function (data) {
                        self.CreateResultsFromJSON(data.d.results, metadata);
                    },
                    error: function (data, errorCode, errorMessage) {
                        $('#message').text("Произошла ошибка: " + errorMessage);
                    }
                });
            }, function (errorMessage) {
                $('#message').text("Произошла ошибка при запросе метаданных списка: " + errorMessage);
            });

            return self;
        }

        self.LoadFilteredData = function (filterUrlPart) {
            var listName = self.Params().DataSourceName();

            self.GetListMetaData(listName, function (metadata) {
                var url = self.buildRequestUrl("/lists/getByTitle('" + listName + "')/items?" + filterUrlPart);
                $.ajax({
                    url: encodeURI(url),
                    method: "GET",
                    headers: { "Accept": "application/json; odata=verbose" },
                    success: function (data) {
                        self.CreateResultsFromJSON(data.d.results, metadata);
                    },
                    error: function (data, errorCode, errorMessage) {
                        $('#message').text("Произошла ошибка: " + errorMessage);
                    }
                });
            }, function (errorMessage) {
                $('#message').text("Произошла ошибка при запросе метаданных списка: " + errorMessage);
            });

            return self;
        }

        self.Search = function () {
            self.Results.removeAll();

            var filters = self.Params().ODataFilters();
            var filterstr = '';
            if (filters.length > 0) {
                for (var i = 0; i < filters.length; i++) {
                    var last = i == filters.length - 1;
                    filterstr += filters[i] + (last ? '' : ' and ');
                }
                filterstr = "$filter=" + filterstr;
                self.LoadFilteredData(filterstr);
            } else self.loadAllData();
        }

        self.OnParamKeyDown = function (data, event) {
            if (event.keyCode == 13) {
                self.Search();
            }
            else return true;
        }
    }

    function sharepointReady() {
        var model = new LicenseSearchModel();
        model.init();
        ko.applyBindings(model.loadAllData());
    }

    ko.bindingHandlers.href = {
        update: function (element, valueAccessor) {
            ko.bindingHandlers.attr.update(element, function () {
                return { href: valueAccessor() }
            });
        }
    };

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {},
                $el = $(element);

            $el.datepicker(options);

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($el.datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $el.datepicker("destroy");
            });

        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                $el = $(element);

            //handle date data coming via json from Microsoft
            if (String(value).indexOf('/Date(') == 0) {
                value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")));
            }

            var current = $el.datepicker("getDate");

            if (value - current !== 0) {
                $el.datepicker("setDate", value);
            }
        }
    };

    function init() {
        $.datepicker.regional.ru = {
            closeText: 'Закрыть',
            prevText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional.ru);

        SP.SOD.executeOrDelayUntilScriptLoaded(sharepointReady, "SP.js");
    }

    if (!_spBodyOnLoadCalled) {
        _spBodyOnLoadFunctions.push(init);
    } else {
        init();
    }

})();