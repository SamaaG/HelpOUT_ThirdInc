helpOutModule.factory("tripSvc", ["$http",
    function ($http) {
        var baseURL = 'https://api.mongolab.com/api/1/databases/helpout/collections/trips';
        var apiKey = 'XQzdrOK0PALzMTwUCxE4x3x3CUQvIb_V';
        return {
            getCurrentTrips: function () {
                return $http.get(baseURL + '?q={"isComplete":false}&apiKey=' + apiKey);
            },
            getArchivedTrips: function () {
                return $http.get(baseURL + '?q={"isComplete":true}&apiKey=' + apiKey);
            },
            getTrip: function (tripId) {
                //GET /databases/{database}/collections/{collection}/{_id}
                return $http.get(baseURL + '/' + tripId + '?apiKey=' + apiKey);
            },
            updateTrip: function (trip) {
                return $http.put(baseURL + '/' + trip._id.$oid + '?apiKey=' + apiKey, trip);
            },
            deleteTrip: function (tripId) {
                //return $http.delete('Api/Task/' + taskId);
                return $http.delete(baseURL + '/' + tripId + '?apiKey=' + apiKey);
            },
            postTrip: function (trip) {
                //return $http.post('Api/Task/', task);
                return $http.post(baseURL + '?apiKey=' + apiKey, trip);
            }
        }
    }
]);