helpOutModule.controller('createTaskModalCtrl', ["$scope", "$modalInstance", "taskSvc", "$uibModal",
    function ($scope, $modalInstance, taskSvc, $uibModal) {
        // MODEL PROPERTIES
        $scope.location = {};

        // PRIVATE METHODS
        var getLocationData = function () {
            var query = $scope.address;
            var fullAddress = $scope.locationDetails ? $scope.locationDetails.formatted_address : $scope.location.fullAddress;
            var geometry = $scope.locationDetails ? $scope.locationDetails.geometry : $scope.location.geometry;
            var placeId = $scope.locationDetails ? $scope.locationDetails.place_id : $scope.location.placeId;
            var name = $scope.locationDetails ? $scope.locationDetails.name : $scope.location.name;
            var icon = $scope.locationDetails ? $scope.locationDetails.icon : $scope.location.icon;
            $scope.location = {
                "query": query,
                "fullAddress": fullAddress,
                "geometry": geometry,
                "placeId": placeId,
                "name": name,
                "icon": icon
            };
        }
        
        // MODEL METHODS
        $scope.createTask = function () {
            getLocationData();
            $scope.task = {
                "name": $scope.name,
                "datetime": $scope.datetime,
                "comments": $scope.comments,
                "location" : $scope.location,
                "isComplete": false
            };

            taskSvc.postTask($scope.task).then(function () {
                $modalInstance.close();
            });
        };

        $scope.createLocation = function () {
            getLocationData();
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/createLocationModal.html',
                controller: 'createLocationModalCtrl',
                resolve: {
                    location: function() {
                        return $scope.location;
                    }
                }
            });

            modalInstance.result.then(function (location) {
                $scope.location = location;
            });
        };

        $scope.addExistingLocation = function () {
            getLocationData();
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/addLocationModal.html',
                controller: 'addLocationModalCtrl',
                resolve: {
                    location: function () {
                        return $scope.location;
                    }
                }
            });

            modalInstance.result.then(function (location) {
                $scope.location = location;
                $scope.address = location.query;
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }]);