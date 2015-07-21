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
                var jsDeployer = new FileDeployer(null, web, Lists.TmProjectScripts, "");
                jsDeployer.Deploy();
            });

            return model;
        }

        #endregion
    }
}
