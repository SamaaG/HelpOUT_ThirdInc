helpOutModule.factory("taskSvc", ["$http",
    function ($http) {
        var baseURL = 'https://api.mongolab.com/api/1/databases/helpout/collections/tasks';
        var apiKey = 'XQzdrOK0PALzMTwUCxE4x3x3CUQvIb_V';
        return {
            getCurrentTasks: function() {
                return $http.get(baseURL + '?q={"isComplete":false}&apiKey=' + apiKey);
            },
            getArchivedTasks: function() {
                return $http.get(baseURL + '?q={"isComplete":true}&apiKey=' + apiKey);
            },
            getTask: function(taskId) {
                //GET /databases/{database}/collections/{collection}/{_id}
                return $http.get(baseURL + '/' + taskId + '?apiKey=' + apiKey);
            },
            updateTask: function(task) {
                return $http.put(baseURL + '/' + task._id.$oid + '?apiKey=' + apiKey, task);
            },
            deleteTask: function(taskId) {
                //return $http.delete('Api/Task/' + taskId);
                return $http.delete(baseURL + '/' + taskId + '?apiKey=' + apiKey);
            },
            postTask: function (task) {
                //return $http.post('Api/Task/', task);
                return $http.post(baseURL + '?apiKey=' + apiKey, task);
            }
        }
    }
]);