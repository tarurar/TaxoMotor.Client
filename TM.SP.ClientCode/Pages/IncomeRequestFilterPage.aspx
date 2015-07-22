<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Import Namespace="Microsoft.SharePoint" %> <%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="AppPages" Namespace="TM.SP.AppPages" Assembly="TM.SP.AppPages, Version=1.0.0.0, Culture=neutral, PublicKeyToken=63e92b7beac312db"%>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	Фильтрация обращений
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Фильтрация обращений
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderSearchArea" runat="server">
	<SharePoint:DelegateControl runat="server"
		ControlId="SmallSearchInputBox"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" ID="Main" FrameType="TitleBarOnly">
        <ZoneTemplate>
            <AppPages:IncomRequestFilterWebPart runat="server" View="FilterView" 
                CatalogIconImageUrl="/_layouts/15/images/TaxoMotor/WebPartIcon_IncomRequestFilterWebPart.gif" 
                ChromeType="None" Description="IncomRequestFilterWebPart Description" 
                ImportErrorMessage="Cannot import IncomRequestFilterWebPart Title Web Part." 
                Title="IncomRequestFilterWebPart Title" TitleIconImageUrl="/_layouts/15/images/TaxoMotor/WebPartIcon_IncomRequestFilterWebPart.gif" 
                ID="g_37215d17_ec49_455b_87f7_ae1c608ef58c" __MarkupType="vsattributemarkup" __WebPartId="{37215D17-EC49-455B-87F7-AE1C608EF58C}" 
                WebPart="true" __designer:IsClosed="false" partorder="2"></AppPages:IncomRequestFilterWebPart>
        </ZoneTemplate>
    </WebPartPages:WebPartZone>
</asp:Content>
