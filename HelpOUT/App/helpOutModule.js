var helpOutModule = angular.module("helpOutModule", ["ngAutocomplete", "ngRoute", "ui.bootstrap", "ui.bootstrap.datetimepicker"]);

helpOutModule.config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "App/Templates/activeTasks.html",
            controller: "activeTasksCtrl"
        })
        .when("/tasks", {
            templateUrl: "App/Templates/activeTasks.html",
            controller: "activeTasksCtrl"
        })
        .when("/completedTasks", {
            templateUrl: "App/Templates/completedTasks.html",
            controller: "completedTasksCtrl"
        })
        .when("/trips", {
            templateUrl: "App/Templates/activeTrips.html",
            controller: "activeTripsCtrl"
        })
        .when("/completedTrips", {
            templateUrl: "App/Templates/completedTrips.html",
            controller: "completedTripsCtrl"
        })
        .when("/locations", {
            templateUrl: "App/Templates/savedLocations.html",
            controller: "savedLocationsCtrl"
        })
        .otherwise({
            templateUrl: "App/Templates/activeTasks.html",
            controller: "activeTasksCtrl"
        });
    }
]);