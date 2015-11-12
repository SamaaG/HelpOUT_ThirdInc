helpOutModule.controller("activeTripsCtrl", ["$scope", "tripSvc", "$uibModal",
    function ($scope, tripSvc, $uibModal) {
        // PRIVATE PROPETIES
        var selectedTrips = [];

        // MODEL PROPERTIES
        $scope.sortType = "date";
        $scope.sortReverse = false;

        // PRIVATE METHODS
        var removeFromTripArray = function (array, trip) {
            var index = array.indexOf(trip);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        // MODEL METHODS
        $scope.sort = function (criteria) {
            $scope.sortType = criteria;
            $scope.sortReverse = !$scope.sortReverse;
        }

        $scope.createTrip = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/createTripModal.html',
                controller: 'createTripModalCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                tripSvc.getCurrentTrips().then(function (response) {
                    $scope.trips = response.data;
                });
            });
        };

        $scope.viewTrip = function (trip) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/tripModal.html',
                controller: 'tripModalCtrl',
                resolve: {
                    trip: function () {
                        return trip;
                    }
                }
            });

            modalInstance.result.then(function () {
                tripSvc.getCurrentTrips().then(function (response) {
                    $scope.trips = response.data;
                });
            });
        }

        $scope.selectTrip = function (trip) {
            if (trip.checked) {
                selectedTrips.push(trip);
                $scope.anyTripsSelected = true;
            } else {
                removeFromTripArray(selectedTrips, trip);
                if (selectedTrips.length === 0) {
                    $scope.anyTripsSelected = false;
                }
            }
        }

        $scope.removeTrip = function () {
            if (selectedTrips.length === 0) return;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/confirmationModal.html',
                controller: 'confirmationModalCtrl',
                resolve: {
                    action: function () {
                        return "delete";
                    },
                    objects: function () {
                        return "trips";
                    }
                }
            });

            modalInstance.result.then(function () {
                selectedTrips.forEach(function (trip) {
                    tripSvc.deleteTrip(trip._id.$oid).then(function () {
                        removeFromTripArray($scope.trips, trip);
                        removeFromTripArray(selectedTrips, trip);
                        $scope.anyTripsSelected = false;
                    }, function (err) {
                        // display friendly error message
                    });
                });
            });
        };

        $scope.markFinished = function () {
            if (selectedTrips.length === 0) return;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/confirmationModal.html',
                controller: 'confirmationModalCtrl',
                resolve: {
                    action: function () {
                        return "mark as complete";
                    },
                    objects: function () {
                        return "trips";
                    }
                }
            });

            modalInstance.result.then(function () {
                selectedTrips.forEach(function (trip) {
                    trip.isComplete = true;
                    delete trip.checked;

                    tripSvc.updateTrip(trip).then(function () {
                        removeFromTripArray($scope.trips, trip);
                        removeFromTripArray(selectedTrips, trip);
                        $scope.anyTripsSelected = false;
                    }, function (err) {
                        trip.checked = true;
                        // display friendly error message
                    });
                });
            });
        };

        // CONTROLLER INITIALIZATION
        tripSvc.getCurrentTrips().then(function (response) {
            $scope.trips = response.data;
        });
    }
]);