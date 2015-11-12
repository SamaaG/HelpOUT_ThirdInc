helpOutModule.controller('editLocationModalCtrl', ["$scope", "$modalInstance", "locationSvc", "location",
    function ($scope, $modalInstance, locationSvc, location) {
        $scope.location = $.extend(true, {}, location);

        $scope.updateLocation = function () {
            $scope.submitting = true;  // will use this for a spinner

            locationSvc.updateLocation($scope.location).then(function () {
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