<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="wssuc" TagName="ButtonSection" Src="/_controltemplates/15/ButtonSection.ascx" %>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Установка признака "Запрет отправки в ГИБДД"
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Установка признака "Запрет отправки в ГИБДД"
</asp:Content>

<asp:Content ID="AddPageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:CssRegistration runat="server" ID="CssRegistration1" Name="TM.SP.Customizations/themes/base/core.css"></SharePoint:CssRegistration>
    <SharePoint:CssRegistration runat="server" ID="CssRegistration2" Name="TM.SP.Customizations/themes/base/datepicker.css"></SharePoint:CssRegistration>
    <SharePoint:CssRegistration runat="server" ID="CssRegistration3" Name="TM.SP.Customizations/themes/base/theme.css"></SharePoint:CssRegistration>
    
    <object id="cadesplugin" type="application/x-cades" class="hiddenObject"></object>
    <object id='certEnrollClassFactory' classid='clsid:884e2049-217d-11da-b2a4-000e7bbb2b09' class="hiddenObject"></object>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="needIE" data-bind="ifnot: bis.ie">
        <div style="background-color: bisque; padding: 10px;">
            <span>
                Для выполнения этого действия понадобится электронно-цифровая подпись, которая поддерживается только в браузерах Internet Explorer.
            </span>
        </div>
    </div>
    <div id="paramsForm" data-bind="with: Params">
        <section style="margin-top: 10px;">
            <div style="float: left; margin-right: 20px; width: 100%;">
                <label for="actionReason" style="display: block">Причина изменения признака</label>
                <textarea id="actionReason" style="display: block; width: 100%; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;" rows="7" data-bind="value: ActionReason" ></textarea>
            </div>
        </section>
    </div>
    <div id="errorList" class="error-list" data-bind="visible: Errors().length > 0">
        <span>Обратите внимание на следующие ошибки</span>
        <table>
            <thead>
                <tr><th>Описание</th></tr>
            </thead>
            <tbody data-bind="foreach: Errors">
                <tr><td><span data-bind="html: MessageBody"></span></td></tr>
            </tbody>
        </table>
    </div>
    <div id="buttonPanel">
        <table id="maintable" border="0" cellspacing="0" cellpadding="0" class="ms-propertysheet" width="100%">
            <wssuc:ButtonSection runat="server" ShowStandardCancelButton="False">
            <Template_Buttons>
                <asp:placeholder ID="Placeholder1" runat="server">
                    <button type="button" id="BtnOk" class="ms-ButtonHeightWidth" data-bind="click: DoAction, enable: !InProgress()">Ок</button>
                <SeparatorHtml>
                    <span id="idSpace" class="ms-SpaceBetButtons" />
                </SeparatorHtml>
                <button type="button" id="BtnCancel" class="ms-ButtonHeightWidth" data-bind="click: CancelAction">Отмена</button>
                </asp:PlaceHolder>
            </Template_Buttons>
            </wssuc:ButtonSection>
        </table>
    </div>

    <script type="text/javascript">
        document.write(TM.SP_.GetVersionedStyleMarkup('/ProjectScripts/LicenseActions.css'));
        document.write(TM.SP_.GetVersionedScriptMarkup('/ProjectScripts/CryptoProTs.js'));
        document.write(TM.SP_.GetVersionedScriptMarkup('/ProjectScripts/LicenseDisableGibdd.js'));
    </script>
</asp:Content>