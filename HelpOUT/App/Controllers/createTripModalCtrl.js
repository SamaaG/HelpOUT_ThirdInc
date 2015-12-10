helpOutModule.controller('createTripModalCtrl', ["$scope", "$modalInstance", "tripSvc", "taskSvc", "$uibModal",
    function ($scope, $modalInstance, tripSvc, taskSvc, $uibModal) {
        // PRIVATE PROPERTIES
        var selectedTasks = [];

        // MODEL PROPERTIES
        $scope.tasks = [];
        $scope.startLocation = {};
        $scope.endLocation = {};
        $scope.anyTaskSelected = false;

        // PRIVATE METHODS
        var removeFromTaskArray = function (array, task) {
            var index = array.indexOf(task);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        var getStartLocationData = function () {
            var query = $scope.startAddress;
            var fullAddress = $scope.startLocationDetails ? $scope.startLocationDetails.formatted_address : $scope.startLocation.fullAddress;
            var geometry = $scope.startLocationDetails ? $scope.startLocationDetails.geometry : $scope.startLocation.geometry;
            var placeId = $scope.startLocationDetails ? $scope.startLocationDetails.place_id : $scope.startLocation.placeId;
            var name = $scope.startLocationDetails ? $scope.startLocationDetails.name : $scope.startLocation.name;
            var icon = $scope.startLocationDetails ? $scope.startLocationDetails.icon : $scope.startLocation.icon;
            var comments = $scope.startLocationDetails ? null : $scope.startLocation.comments;
            $scope.startLocation = {
                "query": query,
                "fullAddress": fullAddress,
                "geometry": geometry,
                "placeId": placeId,
                "name": name,
                "icon": icon,
                "comments" : comments
            };
        }

        var getEndLocationData = function() {
            var query = $scope.endAddress;
            var fullAddress = $scope.endLocationDetails ? $scope.endLocationDetails.formatted_address : $scope.endLocation.fullAddress;
            var geometry = $scope.endLocationDetails ? $scope.endLocationDetails.geometry : $scope.endLocation.geometry;
            var placeId = $scope.endLocationDetails ? $scope.endLocationDetails.place_id : $scope.endLocation.placeId;
            var name = $scope.endLocationDetails ? $scope.endLocationDetails.name : $scope.endLocation.name;
            var icon = $scope.endLocationDetails ? $scope.endLocationDetails.icon : $scope.endLocation.icon;
            var comments = $scope.endLocationDetails ? null : $scope.endLocation.comments;
            $scope.endLocation = {
                "query": query,
                "fullAddress": fullAddress,
                "geometry": geometry,
                "placeId": placeId,
                "name": name,
                "icon": icon,
                "comments": comments
            };
        }
        
        // MODEL METHODS
        $scope.createTrip = function () {
            var taskData = [];
            $scope.tasks.forEach(function(task) {
                taskData.push({
                    "taskId": task._id.$oid
                });
            });

            getStartLocationData();
            getEndLocationData();

            $scope.trip = {
                "name": $scope.name,
                "datetime": $scope.datetime,
                "startLocation": $scope.startLocation,
                "endLocation": $scope.endLocation,
                "tasks": taskData,
                "comments": $scope.comments,
                "isComplete": false
            };

            tripSvc.postTrip($scope.trip).then(function () {
                $modalInstance.close();
            });
        };

        $scope.createLocation = function (isStart) {
            if (isStart) {
                getStartLocationData();
            } else {
                getEndLocationData();
            }
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/createLocationModal.html',
                controller: 'createLocationModalCtrl',
                resolve: {
                    location: function () {
                        return isStart ? $scope.startLocation : $scope.endLocation;
                    }
                }
            });

            modalInstance.result.then(function (location) {
                if (isStart) {
                    $scope.startLocation = location;
                } else {
                    $scope.endLocation = location;
                }
            });
        };

        $scope.addExistingLocation = function (isStart) {
            if (isStart) {
                getStartLocationData();
            } else {
                getEndLocationData();
            }
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/addLocationModal.html',
                controller: 'addLocationModalCtrl',
                resolve: {
                    location: function () {
                        return isStart ? $scope.startLocation : $scope.endLocation;
                    }
                }
            });

            modalInstance.result.then(function (location) {
                if (isStart) {
                    $scope.startLocation = location;
                    $scope.startAddress = location.query;
                } else {
                    $scope.endLocation = location;
                    $scope.endAddress = location.query;
                }
            });
        }

        $scope.addTasks = function() {
            var modalInstance = $uibModal.open({
                size: 'lg',
                animation: true,
                templateUrl: 'App/Templates/addTaskModal.html',
                controller: 'addTaskModalCtrl',
                resolve: {
                    tripTasks: function() {
                        return $scope.tasks;
                    }
                }
            });

            modalInstance.result.then(function (tasks) {
                selectedTasks = [];
                $scope.tasks = tasks;
            });
        };

        $scope.selectToggle = function () {
            $scope.tasks.forEach(function (task) {
                if (!$scope.allChecked) {
                    task.checked = true;
                } else {
                    delete task.checked;
                }
                $scope.selectTask(task);
            });
            $scope.allChecked = !$scope.allChecked;
        }

        $scope.selectTask = function (task) {
            if (task.checked) {
                if (selectedTasks.indexOf(task) === -1) {
                    selectedTasks.push(task);
                }
                $scope.anyTaskSelected = true;
            } else {
                removeFromTaskArray(selectedTasks, task);
                if (selectedTasks.length === 0) {
                    $scope.anyTaskSelected = false;
                }
            }
        }

        $scope.removeTasks = function() {
            selectedTasks.forEach(function (task) {
                removeFromTaskArray($scope.tasks, task); 
            });
            selectedTasks = [];
            $scope.anyTaskSelected = false;
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }]);