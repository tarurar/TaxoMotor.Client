using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using CommandLine;
using Microsoft.SharePoint.Client;
using NLog;
using SPDataUpload;

namespace TM.SP.DataDeploy
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
            [Option('f', "folder", Required = true, HelpText = "Folder path with csv files")]
            public string folderPath { get; set; }
            [Option('e', "erase", Required = false, HelpText = "Delete existant data in list")]
            public bool deleteData { get; set; }
        }

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

            if (String.IsNullOrEmpty(options.folderPath))
            {
                cLogger.Info("Необходимо указать каталог с данными в формате csv, параметр командной строки -d");
                retVal = false;
            }

            return retVal;
        }

        private static readonly Logger Logger = LogManager.GetLogger("ExceptionLogger");
        private static readonly Logger cLogger = LogManager.GetLogger("ConsoleLogger");

        private static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.Unicode;
            Options options = new Options();
            CommandLine.Parser.Default.ParseArguments(args, options);

            if (!CheckArguments(options))
            {
                cLogger.Error("Есть ошибки в параметрах командной строки");
                Console.ReadKey();
                return;
            }

            try
            {
                Load(options);
            }
            catch (Exception ex)
            {
                cLogger.Error(String.Format("Ошибка при загрузке: {0}." + Environment.NewLine + " StackTrace: {1}", ex.Message, ex.StackTrace));
                Console.ReadKey();
                return;
            }

            cLogger.Info("Загрузка успешно завершена");
            Console.ReadKey();
        }

        private static void Load(Options options)
        {
            var allFiles = Directory.EnumerateFiles(options.folderPath).Where(f => Path.GetExtension(f) == ".csv");

            using (var ctx = new ClientContext(options.siteUrl))
            {
                ctx.ExecutingWebRequest +=
                    (sender, e) => e.WebRequestExecutor.RequestHeaders.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f");
                ctx.Credentials = new NetworkCredential(options.windowsLogin, options.windowsPassword,
                    options.windowsDomain);

                ListDataUploader uploader = new ListDataUploader();
                foreach (string fn in allFiles)
                {
                    Console.WriteLine(String.Format("Начата обработка файла {0}", fn));
                    try
                    {
                        uploader.UploadToListByFileName(fn, ";", ctx, options.deleteData);
                        Console.WriteLine("Обработка файла {0} завершена", fn);
                    }
                    catch (Exception)
                    {
                        Console.WriteLine("При обработке файла {0} произошла ошибка", fn);
                        throw;
                    }
                }
            }

        }
    }
}
