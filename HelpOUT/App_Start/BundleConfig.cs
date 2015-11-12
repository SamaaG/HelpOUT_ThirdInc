using System.Web.Optimization;

namespace HelpOUT
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/jquery.validate*"));
                
            bundles.Add(new ScriptBundle("~/bundles/helpOutDependencies").Include(
                "~/Scripts/moment.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/angular.js",
                "~/Scripts/datetimepicker.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/Scripts/location-autocomplete.js",
                "~/Scripts/ngAutocomplete.js"));

            bundles.Add(new ScriptBundle("~/bundles/helpOut").Include(
                "~/App/helpOutModule.js",
                "~/App/Controllers/activeTasksCtrl.js",
                "~/App/Controllers/completedTasksCtrl.js",
                "~/App/Controllers/activeTripsCtrl.js",
                "~/App/Controllers/completedTripsCtrl.js",
                "~/App/Controllers/savedLocationsCtrl.js",
                "~/App/Controllers/editLocationModalCtrl.js",
                "~/App/Controllers/createLocationModalCtrl.js",
                "~/App/Controllers/createTaskModalCtrl.js",
                "~/App/Controllers/editTaskModalCtrl.js",
                "~/App/Controllers/createTripModalCtrl.js",
                "~/App/Controllers/addTaskModalCtrl.js",
                "~/App/Controllers/tripModalCtrl.js",
                "~/App/Controllers/confirmationModalCtrl.js",
                "~/App/Services/taskSvc.js",
                "~/App/Services/tripSvc.js",
                "~/App/Services/locationSvc.js",
                "~/App/Directives/prettyDatetimeDirective.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/datetimepicker.css",
                "~/Content/site.css"));

        }
    }
}
