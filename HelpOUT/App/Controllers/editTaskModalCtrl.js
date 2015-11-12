helpOutModule.controller('editTaskModalCtrl', ["$scope", "$modalInstance", "taskSvc", "task",
    function ($scope, $modalInstance, taskSvc, task) {
        $scope.task = $.extend(true, {}, task);

        $scope.updateTask = function () {
            $scope.submitting = true;  // will use this for a spinner

            taskSvc.updateTask($scope.task).then(function () {
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
    }
]);