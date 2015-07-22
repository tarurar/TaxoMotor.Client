<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="wssuc" TagName="ButtonSection" Src="/_controltemplates/15/ButtonSection.ascx" %>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Ход процесса
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Ход процесса
</asp:Content>

<asp:Content ID="AddPageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:CssRegistration runat="server" ID="CssRegistration1" Name="TM.SP.Customizations/themes/base/core.css"></SharePoint:CssRegistration>
    <SharePoint:CssRegistration runat="server" ID="CssRegistration3" Name="TM.SP.Customizations/themes/base/theme.css"></SharePoint:CssRegistration>

    <script type="text/javascript">
        document.write(TM.SP.GetVersionedStyleMarkup('/ProjectScripts/ProgressDlg.css'));
    </script>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    
    <div id="actionList">
        <table>
            <tbody data-bind="foreach: Actions">
                <tr>
                    <td>
                        <div data-bind="if: State() == 1" >
                            <img src="/_layouts/15/images/loadingcirclests16.gif" alt=""/>
                        </div>
                        <div data-bind="if: State() == 2" >
                            <img src="/_layouts/15/images/kpinormal-0.gif" alt=""/>
                        </div>
                        <div data-bind="if: State() == 3" >
                            <img src="/_layouts/15/images/kpinormal-2.gif" alt=""/>
                        </div>
                    </td>
                    <td data-bind="text: Text"></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="errorList" data-bind="if: Error">
        <textarea id="error" data-bind="value: Error" ></textarea>
    </div>
    <div id="progressBar">
        <progress max="100" data-bind="value: WholeProgress().Percent()"></progress>
    </div>

    <div id="buttonPanel">
        <table id="maintable" border="0" cellspacing="0" cellpadding="0" class="ms-propertysheet" width="100%">
            <wssuc:ButtonSection runat="server" ShowStandardCancelButton="False">
            <Template_Buttons>
                <asp:placeholder ID="Placeholder1" runat="server">
                    <button type="button" id="BtnClose" class="ms-ButtonHeightWidth" data-bind="click: Close">Закрыть</button>
                </asp:PlaceHolder>
            </Template_Buttons>
            </wssuc:ButtonSection>
        </table>
    </div>

    <script type="text/javascript">
        document.write(TM.SP.GetVersionedScriptMarkup('/ProjectScripts/ProgressDlg.js'));
    </script>
</asp:Content>