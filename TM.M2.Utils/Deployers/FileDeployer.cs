using SPMeta2.Definitions;
using SPMeta2.Models;
using SPMeta2.Syntax.Default;
using System.IO;
using System.Linq;
using File = System.IO.File;

namespace TM.M2.Utils.Deployers
{
    public class FileDeployer : IDeployer
    {
        protected readonly ModelNode Site;
        protected readonly ModelNode Web;

        protected readonly ListDefinition RootNode;
        protected readonly string SourcePath;

        public FileDeployer(ModelNode site, ModelNode web, ListDefinition rootNode, string sourcePath)
        {
            Site       = site;
            Web        = web;
            RootNode   = rootNode;
            SourcePath = sourcePath;
        }

        public void Deploy()
        {
            Web.AddHostList(RootNode, list => ProcessDirectory(SourcePath, list));
        }

        protected void ProcessDirectory(string path, ModelNode parent)
        {
            parent.AddModuleFiles(
                Directory.EnumerateFiles(path)
                    .Select(fileName =>
                        new ModuleFileDefinition
                        {
                            FileName = Path.GetFileName(fileName),
                            Content = File.ReadAllBytes(fileName)
                        }));

            foreach (string name in Directory.EnumerateDirectories(path))
            {
                string folderName = name;
                parent.AddFolder(
                    new FolderDefinition { Name = name.Remove(0, name.LastIndexOf('\\') + 1) },
                    folder => ProcessDirectory(folderName, folder));
            }
        }
    }
}
