helpOutModule.controller('editLocationModalCtrl', ["$scope", "$modalInstance", "locationSvc", "location",
    function ($scope, $modalInstance, locationSvc, location) {
        // MODEL PROPERTIES
        $scope.location = $.extend(true, {}, location);

        // MODEL METHODS
        $scope.updateLocation = function () {
            $scope.submitting = true;

            if ($scope.locationDetails) {
                $scope.location.fullAddress = $scope.locationDetails.formatted_address;
                $scope.location.geometry = $scope.locationDetails.geometry;
                $scope.location.placeId = $scope.locationDetails.place_id;
                $scope.location.icon = $scope.locationDetails.icon;
            }

            delete $scope.location.checked;

            locationSvc.updateLocation($scope.location).then(function () {
                $modalInstance.close();
            }, function(err) {
                $scope.submitting = false;
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
]);