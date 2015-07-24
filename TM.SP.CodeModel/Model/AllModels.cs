using System.IO;
using Microsoft.SharePoint.Client;
using SPMeta2.Models;
using SPMeta2.Syntax.Default;
using TM.SP.DataModel;
using SPMeta2Contrib.Core.Store;
using SPMeta2Contrib.Provision.Deployers;

namespace TM.SP.CodeModel.Model
{
    public static class AllModels
    {
        #region methods

        public static ModelNode GetTaxomotorScriptsModel(ClientContext ctx, FileHashStore provisionCache)
        {
            var model = SPMeta2Model.NewWebModel(web =>
            {
                string scriptsFolder = Path.GetFullPath(@"..\..\..\PostBuildFiles\Scripts");
                IDeployer jsDeployer = provisionCache == null
                    ? new FileDeployer(null, web, Lists.TmProjectScripts, scriptsFolder)
                    : new FileDeployerCacheable(null, web, Lists.TmProjectScripts, scriptsFolder, provisionCache);
                jsDeployer.Deploy();
            });

            return model;
        }

        public static ModelNode GetTaxomotorStylesModel(ClientContext ctx, FileHashStore provisionCache)
        {
            var model = SPMeta2Model.NewWebModel(web =>
            {
                string stylesFolder = Path.GetFullPath(@"..\..\..\PostBuildFiles\Styles");
                IDeployer cssDeployer = provisionCache == null
                    ? new FileDeployer(null, web, Lists.TmProjectScripts, stylesFolder)
                    : new FileDeployerCacheable(null, web, Lists.TmProjectScripts, stylesFolder, provisionCache);
                cssDeployer.Deploy();                    
            });

            return model;
        }

        public static ModelNode GetTaxomotorPagesModel(ClientContext ctx, FileHashStore provisionCache)
        {
            var model = SPMeta2Model.NewWebModel(web =>
            {
                string pagesFolder = Path.GetFullPath(@"..\..\..\PostBuildFiles\Pages");
                IDeployer pagesDeployer = provisionCache == null
                    ? new FileDeployer(null, web, Lists.TmProjectSitePages, pagesFolder)
                    : new FileDeployerCacheable(null, web, Lists.TmProjectSitePages, pagesFolder, provisionCache);
                pagesDeployer.Deploy();
            });

            return model;
        }

        #endregion
    }
}
