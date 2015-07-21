using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Threading.Tasks;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Client;
using CommandLine;
using NLog;
using SPMeta2.CSOM;
using SPMeta2.CSOM.DefaultSyntax;
using SPMeta2.CSOM.Extensions;
using SPMeta2.CSOM.ModelHosts;
using SPMeta2.CSOM.Services;
using SPMeta2.Definitions;

using TM.SP.DataModel;

namespace TM.SP.DataModelDeploy
{
    class Program
    {
        internal class Options
        {
            [Option('s', "site", Required = true, HelpText = "URL адрес сайта")]
            public string siteUrl { get; set; }
            [Option('l', "winlogin", Required = true, HelpText = "Windows Account Login")]
            public string windowsLogin { get; set; }
            [Option('p', "winpassword", Required = true, HelpText = "Windows Account Password")]
            public string windowsPassword { get; set; }
            [Option('d', "windomain", Required = true, HelpText = "Windows Domain")]
            public string windowsDomain { get; set; }
        }

        private static readonly Logger Logger = LogManager.GetLogger("ExceptionLogger");
        private static readonly Logger cLogger = LogManager.GetLogger("ConsoleLogger");

        internal static bool CheckArguments(Options options)
        {
            bool retVal = true;

            if (String.IsNullOrEmpty(options.siteUrl))
            {
                cLogger.Info("Необходимо указать адрес сайта, параметр командной строки -s");
                retVal = false;
            }

            if (String.IsNullOrEmpty(options.windowsLogin))
            {
                cLogger.Info("Необходимо указать логин пользователя, имеющего административный доступ к сайту, параметр командной строки -l");
                retVal = false;
            }

            if (String.IsNullOrEmpty(options.windowsPassword))
            {
                cLogger.Info("Необходимо указать пароль пользователя, имеющего административный доступ к сайту, параметр командной строки -p");
                retVal = false;
            }

            if (String.IsNullOrEmpty(options.windowsDomain))
            {
                cLogger.Info("Необходимо указать домен учетной записи пользователя, параметр командной строки -d");
                retVal = false;
            }

            return retVal;
        }

        private static void Deploy(Options options)
        {
            using (var ctx = new ClientContext(options.siteUrl))
            {
                ctx.ExecutingWebRequest +=
                    (sender, e) => e.WebRequestExecutor.RequestHeaders.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f");
                ctx.Credentials = new NetworkCredential(options.windowsLogin, options.windowsPassword,
                    options.windowsDomain);
                var pService = new CSOMProvisionService();

                pService.DeployModel(SiteModelHost.FromClientContext(ctx), 
                    AllModels.GetTaxoMotorSiteModel(ctx));
                pService.DeployModel(WebModelHost.FromClientContext(ctx), 
                    AllModels.GetTaxoMotorWebModel(ctx));
                pService.DeployModel(SiteModelHost.FromClientContext(ctx), 
                    AllModels.GetTaxoMotorSiteDependentModel(ctx));
                pService.DeployModel(WebModelHost.FromClientContext(ctx), 
                    AllModels.GetTaxoMotorWebDependentModel());
                pService.DeployModel(SiteModelHost.FromClientContext(ctx), 
                    AllModels.GetTaxoMotorIncomeRequestSiteDependentModel(ctx));
                pService.DeployModel(WebModelHost.FromClientContext(ctx), 
                    AllModels.GetTaxoMotorIncomeRequestWebDependentModel(ctx));
                pService.DeployModel(WebModelHost.FromClientContext(ctx),
                    AllModels.GetTaxoMotorWebPagesModel(ctx));
                pService.DeployModel(WebModelHost.FromClientContext(ctx),
                    AllModels.GetTaxomotorLookupsModel(ctx));
                
                ModelHandlers.MakeContentTypesDefault(ctx);
                ModelHandlers.CreateBcsFields(ctx);
                ModelHandlers.CreatePlumsailFields(ctx);
                ModelHandlers.CreateFieldIndexes(ctx);
            }
        }

        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.Unicode;
            var options = new Options();
            CommandLine.Parser.Default.ParseArguments(args, options);

            if (!CheckArguments(options))
            {
                cLogger.Error("Есть ошибки в параметрах командной строки");
                Console.ReadKey();
                return;
            }

            cLogger.Info("Развертывание модели начато...");
            try
            {
                Deploy(options);
            }
            catch (Exception ex)
            {
                cLogger.Error(String.Format("Ошибка при развертывании: {0}." + Environment.NewLine + " StackTrace: {1}", ex.Message, ex.StackTrace));
                Console.ReadKey();
                return;
            }

            cLogger.Info("Развертывание успешно завершено");
            Console.ReadKey();
        }
    }
}
