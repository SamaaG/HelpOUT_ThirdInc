helpOutModule.controller('createTaskModalCtrl', ["$scope", "$modalInstance", "taskSvc",
    function ($scope, $modalInstance, taskSvc) {
        $scope.createTask = function () {
            $scope.submitting = true;  // will use this for a spinner

            $scope.task = {
                "title": $scope.title,
                "datetime": $scope.datetime,
                "comments": $scope.comments,
                "location" : $scope.location,
                "isComplete": false
            };

            taskSvc.postTask($scope.task).then(function () {
                $scope.submitting = false;
                $modalInstance.close();
            }, function (err) {
                $scope.submitting = false;
                // display friendly error message
            });
        };


        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }]);