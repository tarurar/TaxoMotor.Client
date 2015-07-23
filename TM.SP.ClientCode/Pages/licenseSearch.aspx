<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Реестр разрешений
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Реестр разрешений
</asp:Content>

<asp:Content ID="AddPageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:CssRegistration runat="server" ID="CssRegistration1" Name="TM.SP.Customizations/themes/base/core.css"></SharePoint:CssRegistration>
    <SharePoint:CssRegistration runat="server" ID="CssRegistration2" Name="TM.SP.Customizations/themes/base/datepicker.css"></SharePoint:CssRegistration>
    <SharePoint:CssRegistration runat="server" ID="CssRegistration3" Name="TM.SP.Customizations/themes/base/theme.css"></SharePoint:CssRegistration>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="searchForm" class="main-form">
        <div id="searchParams" class="search-params">
            <div class="input-param">
                <label for="regNumber">Регистрационный номер</label>
                <input id="regNumber" type="text" data-bind="value: Params().RegNumber, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/> 
            </div>
        
            <div class="input-param">
                <label for="blankSeries">Серия бланка</label>
                <input id="blankSeries" type="text" data-bind="value: Params().BlankSeries, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
            
            <div class="input-param">
                <label for="blankno">Номер бланка</label>
                <input id="blankno" type="text" data-bind="value: Params().BlankNo, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>

            <div class="input-param">
                <label for="orgName">Наименование организации</label>
                <input id="orgName" type="text" data-bind="value: Params().OrgName, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="juridicalAddress">Юридический адрес</label>
                <input id="juridicalAddress" type="text" data-bind="value: Params().JuridicalAddress, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="phoneNumber">Номер телефона или факса</label>
                <input id="phoneNumber" type="text" data-bind="value: Params().PhoneNumber, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="addContactData">Иные контактные данные</label>
                <input id="addContactData" type="text" data-bind="value: Params().AddContactData, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="ogrn">ОГРН/ОГРНИП</label>
                <input id="ogrn" type="text" data-bind="value: Params().Ogrn, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="inn">ИНН</label>
                <input id="inn" type="text" data-bind="value: Params().Inn, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>

            <div class="input-param">
                <label for="taxiBrand">Марка ТС</label>
                <input id="taxiBrand" type="text" data-bind="value: Params().TaxiBrand, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="taxiModel">Модель ТС</label>
                <input id="taxiModel" type="text" data-bind="value: Params().TaxiModel, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="taxiStateNumber">Гос. рег. знак ТС</label>
                <input id="taxiStateNumber" type="text" data-bind="value: Params().TaxiStateNumber, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="taxiYear">Год выпуска ТС</label>
                <input id="taxiYear" type="text" data-bind="value: Params().TaxiYear, valueUpdate: 'afterkeydown', event: { keypress: OnParamKeyDown }"/>
            </div>
        
            <div class="input-param">
                <label for="licenseOutDate">Дата выдачи</label>
                <input id="licenseOutDate" data-bind="datepicker: Params().OutputDate"/>
            </div>
        
            <div class="input-param">
                <label for="licenseTillDate">Срок действия</label>
                <input id="licenseTillDate" data-bind="datepicker: Params().TillDate"/>
            </div>
        
            <div class="input-param">
                <label for="licenseChangeDate">Дата внесения изменений</label>
                <input id="licenseChangeDate" data-bind="datepicker: Params().ChangeDate"/>
            </div>
        
            <div class="input-param">
                <label for="licenseStatus">Статус</label>
                <select id="licenseStatus" data-bind="value: Params().Status">
                    <option value="0">Все</option>
                    <option value="1">Действующие</option>
                    <option value="2">Приостановленные</option>
                    <option value="3">Аннулированные</option>
                    <option value="4">Переоформлено</option>
                </select>
            </div>
        </div>
    
        <div id="buttonPanel" class="donotfloat fullwidth">
            <button id="searchButton" class="alignright" type="button" data-bind="click: Search">Найти</button>
        </div>

        <div id="results" class="donotfloat" data-bind="css: { hidden: IsEmpty }">
            <table>
                <thead>
                    <tr>
                        <th>Дата разрешения</th>
                        <th>Действует с</th>
                        <th>Действует по</th>
                        <th>Статус</th>
                        <th>Номер разрешения</th>
                        <th>Наименование перевозчика</th>
                        <th>Марка ТС</th>
                        <th>Модель ТС</th>
                        <th>Номер ТС</th>
                        <th>Адрес перевозчика</th>
                        <th>Тип записи</th>
                    </tr>
                </thead>
                <tbody data-bind="foreach: Results">
                    <tr data-bind="css: {even: $index() % 2}">
                        <td><a data-bind="href: DisplayUrl, attr: { target: '_blank' }, text: CreationDate"></a></td>
                        <td data-bind="text: OutputDate"></td>
                        <td data-bind="text: TillDate"></td>
                        <td data-bind="text: Status"></td>
                        <td data-bind="text: RegNumber"></td>
                        <td data-bind="text: OrgName"></td>
                        <td data-bind="text: TaxiBrand"></td>
                        <td data-bind="text: TaxiModel"></td>
                        <td data-bind="text: TaxiStateNumber"></td>
                        <td data-bind="text: JuridicalAddress"></td>
                        <td data-bind="text: IsLastText"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div data-bind="css: { hidden: !IsEmpty() }">
            <p id="message">Ничего не найдено</p>
        </div>
    </div>

    <script type="text/javascript">
        document.write(TM.SP_.GetVersionedStyleMarkup('/ProjectScripts/licenseSearchModel.css'));
        document.write(TM.SP_.GetVersionedScriptMarkup('/ProjectScripts/licenseSearchModel.js'));
    </script>
</asp:Content>