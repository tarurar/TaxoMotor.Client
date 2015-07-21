using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.SharePoint.Client;
using SPMeta2.CSOM.Extensions;
using SPMeta2.Definitions;

namespace TM.SP.DataModel
{
    public static class ListHelpers
    {
        #region methods

        /// <summary>
        /// Making order of content types in a list
        /// </summary>
        /// <param name="context">Object of ClientContext class</param>
        /// <param name="listName">Internal name of the list (i.e. RootFolder name)</param>
        /// <param name="contentTypeNames">Array of content type names. The first element will be the default content type</param>
        public static void MakeContentTypeDefault(ClientContext context, string listName, string[] contentTypeNames)
        {
            List targetList = WebHelpers.GetWebList(context, listName);
            if (targetList == null)
                throw new Exception(String.Format("List {0} not found", listName));

            List<ContentTypeId> allContentTypes = new List<ContentTypeId>();
            foreach (string ctName in contentTypeNames)
            {
                ContentType listContentType = targetList.ContentTypes.SingleOrDefault(
                    c => c.Name.Equals(ctName, StringComparison.OrdinalIgnoreCase));
                if (listContentType == null)
                    throw new Exception(String.Format("Content type {0} was not found in the list {1}", ctName, listName));

                allContentTypes.Add(listContentType.Id);
            }

            if (allContentTypes.Count > 0)
            {
                targetList.RootFolder.UniqueContentTypeOrder = allContentTypes;
                targetList.RootFolder.Update();
                targetList.Update();
                context.ExecuteQuery();                
            }
        }

        public static void MakeContentTypeDefault(ClientContext context, string listName, string contentTypeName)
        {
            List targetList = WebHelpers.GetWebList(context, listName);
            if (targetList == null)
                throw new Exception(String.Format("List {0} not found", listName));

            List<ContentTypeId> allContentTypes = new List<ContentTypeId>();
            foreach (ContentType ct in targetList.ContentTypes)
            {
                if (ct.Name.Equals(contentTypeName, StringComparison.OrdinalIgnoreCase))
                {
                    allContentTypes.Add(ct.Id);
                }
            }

            if (allContentTypes.Count == 0)
                throw new Exception(String.Format("There is no content type {0} linked to list {1}", contentTypeName,
                    listName));

            targetList.RootFolder.UniqueContentTypeOrder = allContentTypes;
            targetList.RootFolder.Update();
            targetList.Update();
            context.ExecuteQuery();
        }

        public static List GetList(IEnumerable<List> listCollection, string listName, bool breakIfNull = true)
        {
            var retVal = listCollection.SingleOrDefault(l => l.RootFolder.Name == listName);
            if (retVal == null && breakIfNull)
                throw new Exception(String.Format("List {0} not found", listName));

            return retVal;
        }

        public static Field AddFieldAsXmlToList(List list, XElement fieldDefinition,
            AddFieldOptions options, bool deleteExistant = false)
        {
            var listContext = list.Context;

            string fieldName = fieldDefinition.Attribute("Name").Value;
            Field exField = null;
            try
            {
                exField = list.Fields.SingleOrDefault(f => f.InternalName == fieldName);
            }
            catch (Exception ex)
            {
                if (ex is CollectionNotInitializedException || ex is PropertyOrFieldNotInitializedException)
                {
                    listContext.Load(list.Fields);
                    listContext.ExecuteQuery();
                    exField = list.Fields.SingleOrDefault(f => f.InternalName == fieldName);
                }
                else throw;
            }

            Field newField = null;
            if (exField == null)
            {
                newField = list.Fields.AddFieldAsXml(fieldDefinition.ToString(), false, options);
                list.Update();
                listContext.ExecuteQuery();
            }
            else if (deleteExistant)
            {
                exField.DeleteObject();
                listContext.ExecuteQuery();

                newField = list.Fields.AddFieldAsXml(fieldDefinition.ToString(), false, options);
                list.Update();
                listContext.ExecuteQuery();
            }
            else
            {
                newField = exField;
            }
           
            return newField;
        }

        public static void AddListContentTypeFieldLink(ClientContext ctx, ListDefinition listDef, ContentTypeDefinition contentTypeDef, Field spField)
        {
            var listContentTypes = ctx.Web.Lists.GetByTitle(listDef.Title).ContentTypes;
            ctx.Load(listContentTypes);
            ctx.ExecuteQuery();

            ContentType contentType = listContentTypes.FindByName(contentTypeDef.Name);
            FieldLinkCollection flColl = contentType.FieldLinks;
            ctx.Load(spField, inc => inc.Id);
            ctx.Load(contentType);
            ctx.Load(flColl);
            ctx.ExecuteQuery();

            FieldLink fLink = flColl.SingleOrDefault(f => f.Id == spField.Id);
            if (fLink == null)
            {
                flColl.Add(new FieldLinkCreationInformation() { Field = spField });
                contentType.Update(false);
                ctx.ExecuteQuery();
            }
        }

        public static void IndexField(ClientContext context, string listName, string fieldInternalName)
        {
            List targetList = WebHelpers.GetWebList(context, listName);
            if (targetList == null)
                throw new Exception(String.Format("List {0} not found", listName));

            Field fieldToIndex = null;
            try
            {
                fieldToIndex = targetList.Fields.GetByInternalNameOrTitle(fieldInternalName);
            }
            catch (ArgumentException)
            {
                throw new Exception(String.Format("Field {0} not found in the list {1}", fieldInternalName, listName));
            }

            fieldToIndex.Indexed = true;
            fieldToIndex.Update();

            context.ExecuteQuery();
        }

        #endregion
    }
}
