helpOutModule.controller("tripCtrl", ["$scope", "tripSvc", "taskSvc", "$uibModal", "$location",
    function ($scope, tripSvc, taskSvc, $uibModal, $location) {
        // PRIVATE PROPERTIES
        var tripId = $location.path().slice($location.path().lastIndexOf("/") + 1);
        var todayDateTime = new Date();

        // MODEL PROPERTIES
        $scope.tasks = [];
        $scope.reOrderedTasks = [];
        $scope.taskCount = Number.MAX_VALUE;
        $scope.tripDateTime;

        // PRIVATE METHODS
        function calcRoute() {
            var map = new google.maps.Map(document.getElementById('map-canvas'));
            var waypts = [];
            $scope.tasks.forEach(function (task) {
                waypts.push({
                    location: task.location.fullAddress,
                    stopover: true
                });
            });

            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            var request = {
                origin: $scope.trip.startLocation.fullAddress,
                destination: $scope.trip.endLocation.fullAddress,
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
                drivingOptions: {
                    departureTime: $scope.tripDateTime
                }
            };

            directionsService.route(request, function (result, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                    directionsDisplay.setPanel(document.getElementById('directions'));
                    $scope.directionsResult = result;
                    $scope.$apply();
                }
            });
        }

        // MODEL METHODS
        $scope.delete = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/confirmationModal.html',
                controller: 'confirmationModalCtrl',
                resolve: {
                    action: function () {
                        return "delete";
                    },
                    objects: function () {
                        return "trip";
                    }
                }
            });

            modalInstance.result.then(function () {
                tripSvc.deleteTrip($scope.trip._id.$oid).then(function () {
                    $location.path('/trips');
                });

            });
        };

        $scope.markFinished = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/confirmCompletedTripModal.html',
                controller: 'confirmCompletedTripModalCtrl',
                resolve: {
                    trips: function () {
                        return $scope.trip;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.trip.isComplete = true;
                tripSvc.updateTrip($scope.trip).then(function () {
                    $location.path('/trips');
                });
            });
        };

        $scope.getChar = function(number) {
            return String.fromCharCode(66 + number);
        }

        // CONTROLLER INITIALIZATION
        tripSvc.getTrip(tripId).then(function (response) {
            $scope.trip = response.data;
            $scope.tripDateTime = new Date($scope.trip.datetime);
            if ($scope.tripDateTime < todayDateTime) $scope.tripDateTime = todayDateTime;
            if (!$scope.trip.endLocation.query) $scope.trip.endLocation = $scope.trip.startLocation;

            $scope.taskCount = $scope.trip.tasks.length;
            $scope.trip.tasks.forEach(function (taskData) {
                taskSvc.getTask(taskData.taskId).then(function (response) {
                    $scope.tasks.push(response.data);
                    --$scope.taskCount;
                });
            });
        });

        $scope.$watch("taskCount", function(newValue, oldValue) {
            if (newValue === 0) calcRoute();
        });

        $scope.$watch("directionsResult", function(newValue, oldValue) {
            if (newValue) {
                $scope.directionsResult.routes[0].waypoint_order.forEach(function(index) {
                    $scope.reOrderedTasks.push($scope.tasks[index]);
                });
                $scope.haveDirections = true;
            }
        });
    }
]);