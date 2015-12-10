helpOutModule.controller("activeTripsCtrl", ["$scope", "tripSvc", "$uibModal", "$location",
    function ($scope, tripSvc, $uibModal, $location) {
        // PRIVATE PROPETIES
        var selectedTrips = [];

        // MODEL PROPERTIES
        $scope.sortType = "datetime";
        $scope.sortReverse = false;
        $scope.currentDate = moment().format();
        $scope.allChecked = false;

        // PRIVATE METHODS
        var removeFromTripArray = function (array, trip) {
            var index = array.indexOf(trip);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        // MODEL METHODS
        $scope.addDays = function (date, days) {
            var result = moment(date).add(days, 'days').format();
            return result;
        }

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

        $scope.viewTrip = function (tripId) {
            $location.path('/trip/' + tripId);
        }

        $scope.selectToggle = function () {
            $scope.trips.forEach(function (trip) {
                if (!$scope.allChecked) {
                    trip.checked = true;
                } else {
                    delete trip.checked;
                }
                $scope.selectTrip(trip);
            });
            $scope.allChecked = !$scope.allChecked;
        }

        $scope.selectTrip = function (trip) {
            if (trip.checked) {
                if (selectedTrips.indexOf(trip) === -1) {
                    selectedTrips.push(trip);
                }
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
                    });
                });
            });
        };

        $scope.markFinished = function () {
            if (selectedTrips.length === 0) return;
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/confirmCompletedTripModal.html',
                controller: 'confirmCompletedTripModalCtrl',
                resolve: {
                    trips: function () {
                        return selectedTrips;
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