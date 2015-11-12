helpOutModule.controller('createLocationModalCtrl', ["$scope", "$modalInstance", "locationSvc",
    function ($scope, $modalInstance, locationSvc) {
        $scope.createLocation = function () {
            $scope.submitting = true;  // will use this for a spinner

            // might need to store LatLng data for trips
            $scope.location = {
                "name": $scope.name,
                "address": $scope.address,
                "comments": $scope.comments
            };

            locationSvc.postLocation($scope.location).then(function () {
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