helpOutModule.controller('addLocationModalCtrl', ["$scope", "$modalInstance", "locationSvc", "location",
    function ($scope, $modalInstance, locationSvc, location) {
        // MODEL PROPERTIES
        $scope.sortType = "name";
        $scope.sortReverse = false;
        $scope.selectedLocation = location;

        // PRIVATE METHODS
        var uncheckLocations = function () {
            $scope.locations.forEach(function(location) {
                if (location.checked) delete location.checked;
            });
        }

        // MODEL METHODS
        $scope.sort = function (criteria) {
            $scope.sortType = criteria;
            $scope.sortReverse = !$scope.sortReverse;
        }

        $scope.selectLocation = function (location) {
            if (location.checked) {
                delete location.checked;
                $scope.selectedLocation = null;
            } else {
                uncheckLocations();
                location.checked = true;
                $scope.selectedLocation = location;
            }
        }

        $scope.addLocation = function () {
            delete $scope.selectedLocation.checked;
            $modalInstance.close($scope.selectedLocation);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        // CONTROLLER INITIALIZATION
        locationSvc.getLocations().then(function (response) {
            $scope.locations = response.data;

            if ($scope.selectedLocation) {
                $scope.locations.forEach(function(location) {
                    if (location.placeId === $scope.selectedLocation.placeId) {
                        location.checked = true;
                    }
                });
            }
        });
    }]);