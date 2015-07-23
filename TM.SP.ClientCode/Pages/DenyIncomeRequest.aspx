<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="wssuc" TagName="ButtonSection" Src="/_controltemplates/15/ButtonSection.ascx" %>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Отказ по обращению
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Отказ по обращению
</asp:Content>

<asp:Content ID="AddPageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:CssRegistration runat="server" ID="CssRegistration1" Name="TM.SP.Customizations/themes/base/core.css"></SharePoint:CssRegistration>
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
        <div id="s1">
            <section style="margin-top: 10px;">
                <div style="float: left; margin-right: 20px;">
                    <label for="denyReason" style="display: block">Укажите причину отказа</label>
                    <select id="denyReason" data-bind="options: DenyReason, optionsText: 'Title', value: selectedReason"></select>
                </div>
                <br style="clear:both;" />
            </section>
            <section style="margin-top: 10px;">
                <div style="float: left; margin-right: 20px; width: 100%;">
                    <label for="actionComment" style="display: block">Комментарий</label>
                    <textarea id="actionComment" style="display: block; width: 100%; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;" rows="7" data-bind="value: ActionComment" ></textarea>
                </div>
            </section>
        </div>
        <div id="s2">
            <section style="margin-top: 10px;">
                <div style="float: left; margin-right: 20px;">
                    <label for="denyReason2" style="display: block">Укажите причину отказа</label>
                    <select id="denyReason2" data-bind="options: DenyReason, optionsText: 'Title', value: selectedReason2"></select>
                </div>
                <br style="clear:both;" />
            </section>
            <section style="margin-top: 10px;">
                <div style="float: left; margin-right: 20px; width: 100%;">
                    <label for="actionComment2" style="display: block">Комментарий</label>
                    <textarea id="actionComment2" style="display: block; width: 100%; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;" rows="7" data-bind="value: ActionComment2" ></textarea>
                </div>
            </section>
        </div>
        <div id="s3">
            <section style="margin-top: 10px;">
                <div style="float: left; margin-right: 20px;">
                    <label for="denyReason3" style="display: block">Укажите причину отказа</label>
                    <select id="denyReason3" data-bind="options: DenyReason, optionsText: 'Title', value: selectedReason3"></select>
                </div>
                <br style="clear:both;" />
            </section>
            <section style="margin-top: 10px;">
                <div style="float: left; margin-right: 20px; width: 100%;">
                    <label for="actionComment3" style="display: block">Комментарий</label>
                    <textarea id="actionComment3" style="display: block; width: 100%; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;" rows="7" data-bind="value: ActionComment3" ></textarea>
                </div>
            </section>
        </div>
        <section style="margin-top: 10px;">
            <div style="float: left; margin-right: 20px; width: 100%;">
                <p style="display: block;">
                    Необходим очный визит
                    <input data-bind="checked: NeedPersonVisit" type="checkbox" id="needPersonVisit" />
                </p>
                <p style="display: block;">
                    Отказ в приеме документов
                    <input data-bind="checked: RefuseDocuments" type="checkbox" id="refuseDocuments" />
                </p>                
            </div>
        </section>
    </div>
    <div id="buttonPanel">
        <table id="maintable" border="0" cellspacing="0" cellpadding="0" class="ms-propertysheet" width="100%">
            <wssuc:ButtonSection runat="server" ShowStandardCancelButton="False">
            <Template_Buttons>
                <asp:placeholder ID="Placeholder1" runat="server">
                    <button type="button" id="BtnOk" class="ms-ButtonHeightWidth" data-bind="click: DoAction">Ок</button>
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
        document.write(TM.SP_.GetVersionedStyleMarkup('/ProjectScripts/IncomeRequestActions.css'));
        document.write(TM.SP_.GetVersionedScriptMarkup('/ProjectScripts/CryptoProTs.js'));
        document.write(TM.SP_.GetVersionedScriptMarkup('/ProjectScripts/DenyIncomeRequest.js'));
    </script>
</asp:Content>