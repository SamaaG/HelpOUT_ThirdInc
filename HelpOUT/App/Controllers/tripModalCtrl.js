helpOutModule.controller('tripModalCtrl', ["$scope", "$modalInstance", "taskSvc", "tripSvc", "trip",
    function ($scope, $modalInstance, taskSvc, tripSvc, trip) {
        $scope.trip = $.extend(true, {}, trip);

        $scope.updateTrip = function () {
            $scope.submitting = true;  // will use this for a spinner

            tripSvc.updateTrip($scope.trip).then(function () {
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