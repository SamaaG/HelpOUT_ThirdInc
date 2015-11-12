helpOutModule.factory("locationSvc", ["$http",
    function ($http) {
        var baseURL = 'https://api.mongolab.com/api/1/databases/helpout/collections/locations';
        var apiKey = 'XQzdrOK0PALzMTwUCxE4x3x3CUQvIb_V';
        return {
            getLocations: function () {
                return $http.get(baseURL + '?apiKey=' + apiKey);
            },
            updateLocation: function (location) {
                return $http.put(baseURL + '/' + location._id.$oid + '?apiKey=' + apiKey, location);
            },
            deleteLocation: function (locationId) {
                //return $http.delete('Api/Task/' + taskId);
                return $http.delete(baseURL + '/' + locationId + '?apiKey=' + apiKey);
            },
            postLocation: function (location) {
                //return $http.post('Api/Task/', task);
                return $http.post(baseURL + '?apiKey=' + apiKey, location);
            }
        }
    }
]);