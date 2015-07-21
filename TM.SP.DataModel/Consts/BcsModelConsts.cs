using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace TM.SP.DataModel
{
    public static class BcsModelConsts
    {
        #region [CoordinateV5 model]
        public static readonly string CV5SystemName               = "CoordinateV5";
        public static readonly string CV5EntityNamespace          = "TM.SP.BCSModels.CoordinateV5";
        public static readonly string CV5RequestAccountEntityName = "RequestAccount";
        public static readonly string CV5RequestContactEntityName = "RequestContact";
        #endregion

        #region [Taxi model]
        public static readonly string TaxiSystemName              = "Taxi";
        public static readonly string TaxiEntityNamespace         = "TM.SP.BCSModels.Taxi";
        #endregion

        #region [TaxiV2 model]
        public static readonly string TaxiV2SystemName            = "TaxiV2";
        public static readonly string TaxiV2EntityNamespace       = "TM.SP.BCSModels.TaxiV2";
        public static readonly string TaxiV2LicenseAllEntityName  = "LicenseAllView";
        #endregion

        #region [Bcs models feature id's]
        public static readonly string CV5ListsFeatureId           = "{88749623-db7e-4ffc-b1e4-b6c4cf9332b6}";
        public static readonly string TaxiListsFeatureId          = "{fd2daa37-e95d-4e98-b360-2f8390c3f2ba}";
        public static readonly string TaxiV2ListsFeatureId        = "{38cd390b-fda5-434c-8f3b-2810dee6c8a1}";
        #endregion
    }
}
