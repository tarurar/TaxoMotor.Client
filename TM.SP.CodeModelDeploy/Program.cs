﻿using System;
using System.Configuration;
using CommandLine;
using NLog;
using Microsoft.SharePoint.Client;
using System.Net;
using NLog.Internal;
using SPMeta2.CSOM.ModelHosts;
using SPMeta2.CSOM.Services;
using SPMeta2Contrib.Core.Hash;
using SPMeta2Contrib.Core.Store;
using SPMeta2Contrib.Core.StoreProviders;
using TM.SP.CodeModel.Model;
using ConfigurationManager = System.Configuration.ConfigurationManager;

namespace TM.SP.CodeModelDeploy
{
    class Program
    {
        internal class Options
        {
            [Option('s', "site", Required = true, HelpText = "URL адрес сайта")]
            public string SiteUrl { get; set; }
            [Option('l', "winlogin", Required = true, HelpText = "Windows Account Login")]
            public string WindowsLogin { get; set; }
            [Option('p', "winpassword", Required = true, HelpText = "Windows Account Password")]
            public string WindowsPassword { get; set; }
            [Option('d', "windomain", Required = true, HelpText = "Windows Domain")]
            public string WindowsDomain { get; set; }
        }

        private static readonly Logger CLogger = LogManager.GetLogger("ConsoleLogger");

        internal static bool CheckArguments(Options options)
        {
            bool retVal = true;

            if (String.IsNullOrEmpty(options.SiteUrl))
            {
                CLogger.Info("Необходимо указать адрес сайта, параметр командной строки -s");
                retVal = false;
            }

            if (String.IsNullOrEmpty(options.WindowsLogin))
            {
                CLogger.Info("Необходимо указать логин пользователя, имеющего административный доступ к сайту, параметр командной строки -l");
                retVal = false;
            }

            if (String.IsNullOrEmpty(options.WindowsPassword))
            {
                CLogger.Info("Необходимо указать пароль пользователя, имеющего административный доступ к сайту, параметр командной строки -p");
                retVal = false;
            }

            if (String.IsNullOrEmpty(options.WindowsDomain))
            {
                CLogger.Info("Необходимо указать домен учетной записи пользователя, параметр командной строки -d");
                retVal = false;
            }

            return retVal;
        }

        private static void Deploy(Options options)
        {
            using (var ctx = new ClientContext(options.SiteUrl))
            {
                ctx.ExecutingWebRequest +=
                    (sender, e) => e.WebRequestExecutor.RequestHeaders.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f");
                ctx.Credentials = new NetworkCredential(options.WindowsLogin, options.WindowsPassword,
                    options.WindowsDomain);
                var pService = new CSOMProvisionService();

                var cacheFileName = ConfigurationManager.AppSettings["ProvisionCacheFileName"] ??
                                "defaultProvisionCache.xml";
                var provisionFileCache = new FileHashStore(new DictionaryXmlStoreProvider(cacheFileName),
                    new FileMd5Hasher());
                provisionFileCache.Load();

                #region deploy models
                pService.DeployModel(WebModelHost.FromClientContext(ctx),
                    AllModels.GetTaxomotorScriptsModel(ctx, provisionFileCache));
                pService.DeployModel(WebModelHost.FromClientContext(ctx),
                    AllModels.GetTaxomotorStylesModel(ctx, provisionFileCache));
                pService.DeployModel(WebModelHost.FromClientContext(ctx),
                    AllModels.GetTaxomotorPagesModel(ctx, provisionFileCache));
                #endregion

                provisionFileCache.Save();
            }
        }

        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.Unicode;
            var options = new Options();
            Parser.Default.ParseArguments(args, options);

            if (!CheckArguments(options))
            {
                CLogger.Error("Есть ошибки в параметрах командной строки");
                Console.ReadKey();
                return;
            }

            CLogger.Info("Развертывание модели начато...");
            try
            {
                Deploy(options);
            }
            catch (Exception ex)
            {
                CLogger.Error("Ошибка при развертывании: {0}." + Environment.NewLine + " StackTrace: {1}", ex.Message, ex.StackTrace);
                Console.ReadKey();
                return;
            }

            CLogger.Info("Развертывание успешно завершено");
            Console.ReadKey();
        }
    }
}
