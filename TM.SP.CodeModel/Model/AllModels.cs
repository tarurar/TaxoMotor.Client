using System.Net.Mime;
using Microsoft.SharePoint.Client;
using SPMeta2.Models;
using SPMeta2.Syntax.Default;
using TM.SP.DataModel;
using TM.SP.CodeModel.Deployers;

namespace TM.SP.CodeModel.Model
{
    public static class AllModels
    {
        #region methods

        public static ModelNode GetTaxomotorScriptsModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewWebModel(web =>
            {
                const string scriptsFolder = @"..\..\..\PostBuildFiles\Scripts";
                var jsDeployer = new FileDeployer(null, web, Lists.TmProjectScripts, scriptsFolder);
                jsDeployer.Deploy();
            });

            return model;
        }

        public static ModelNode GetTaxomotorStylesModel(ClientContext ctx)
        {
            var model = SPMeta2Model.NewWebModel(web =>
            {
                const string stylesFolder = @"..\..\..\PostBuildFiles\Styles";
                var cssDeployer = new FileDeployer(null, web, Lists.TmProjectScripts, stylesFolder);
                cssDeployer.Deploy();                    
            });

            return model;
        }

        #endregion
    }
}
