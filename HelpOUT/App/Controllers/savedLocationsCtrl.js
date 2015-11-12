helpOutModule.controller("savedLocationsCtrl", ["$scope", "locationSvc", "$uibModal",
    function ($scope, locationSvc, $uibModal) {
        // PRIVATE PROPETIES
        var selectedLocations = [];

        // MODEL PROPERTIES
        $scope.sortType = "name";
        $scope.sortReverse = false;

        // PRIVATE METHODS
        var removeFromLocationArray = function (array, location) {
            var index = array.indexOf(location);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        // MODEL METHODS
        $scope.sort = function (criteria) {
            $scope.sortType = criteria;
            $scope.sortReverse = !$scope.sortReverse;
        }

        $scope.selectLocation = function (location) {
            if (location.checked) {
                selectedLocations.push(location);
                $scope.anyLocationsSelected = true;
            } else {
                removeFromLocationArray(selectedLocations, location);
                if (selectedLocations.length === 0) {
                    $scope.anyLocationsSelected = false;
                }
            }
        }

        $scope.createLocation = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/createLocationModal.html',
                controller: 'createLocationModalCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                locationSvc.getLocations().then(function (response) {
                    $scope.locations = response.data;
                });
            });
        };

        $scope.editLocation = function (location) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/editLocationModal.html',
                controller: 'editLocationModalCtrl',
                resolve: {
                    location: function () {
                        return location;
                    }
                }
            });

            modalInstance.result.then(function () {
                locationSvc.getLocations().then(function (response) {
                    $scope.locations = response.data;
                });
            });
        }

        $scope.removeLocation = function () {
            if (selectedLocations.length === 0) return;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/confirmationModal.html',
                controller: 'confirmationModalCtrl',
                resolve: {
                    action: function () {
                        return "delete";
                    },
                    objects: function () {
                        return "location(s)";
                    }
                }
            });

            modalInstance.result.then(function () {
                selectedLocations.forEach(function (location) {
                    locationSvc.deleteLocation(location._id.$oid).then(function () {
                        removeFromLocationArray($scope.locations, location);
                        removeFromLocationArray(selectedLocations, location);
                        $scope.anyLocationsSelected = false;
                    }, function (err) {
                        // display friendly error message
                    });
                });
            });
        };

        // CONTROLLER INITIALIZATION
        locationSvc.getLocations().then(function (response) {
            $scope.locations = response.data;
        });

    }
]);
