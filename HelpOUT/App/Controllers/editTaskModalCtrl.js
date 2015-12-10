helpOutModule.controller('editTaskModalCtrl', ["$scope", "$modalInstance", "taskSvc", "task", "$uibModal",
    function ($scope, $modalInstance, taskSvc, task, $uibModal) {
        // MODEL PROPERTIES
        $scope.task = $.extend(true, {}, task);

        // PRIVATE METHODS
        var getLocationData = function () {
            return {
                "query": $scope.task.location.query,
                "fullAddress": $scope.locationDetails ? $scope.locationDetails.formatted_address : $scope.task.location.fullAddress,
                "geometry": $scope.locationDetails ? $scope.locationDetails.geometry : $scope.task.location.geometry,
                "placeId": $scope.locationDetails ? $scope.locationDetails.place_id : $scope.task.location.placeId,
                "name": $scope.locationDetails ? $scope.locationDetails.name : $scope.task.location.name,
                "icon": $scope.locationDetails ? $scope.locationDetails.icon : $scope.task.location.icon
            };
        }

        // MODEL METHODS
        $scope.updateTask = function () {
            $scope.task.location = getLocationData();
            taskSvc.updateTask($scope.task).then(function () {
                $modalInstance.close();
            });
        };

        $scope.createLocation = function () {
            $scope.task.location = getLocationData();
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/createLocationModal.html',
                controller: 'createLocationModalCtrl',
                resolve: {
                    location: function () {
                        return $scope.task.location;
                    }
                }
            });

            modalInstance.result.then(function (location) {
                $scope.task.location = location;
            });
        };

        $scope.addExistingLocation = function () {
            $scope.task.location = getLocationData();
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/addLocationModal.html',
                controller: 'addLocationModalCtrl',
                resolve: {
                    location: function() {
                        return $scope.task.location;
                    }
                }
            });

            modalInstance.result.then(function(location) {
                $scope.task.location = location;
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
]);