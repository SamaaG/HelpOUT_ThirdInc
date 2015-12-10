helpOutModule.controller('confirmCompletedTripModalCtrl', ["$scope", "$modalInstance", "trips", "taskSvc", "tripSvc",
    function ($scope, $modalInstance, trips, taskSvc, tripSvc) {
        // PRIVATE PROPERTIES
        var selectedTasks = [];
        var unselectedTasks = [];

        // MODEL PROPERTIES
        $scope.trips = trips;
        $scope.tripData = [];
        $scope.sortType = "datetime";
        $scope.sortReverse = false;
        $scope.allChecked = true;

        // PRIVATE METHODS
        var removeFromArray = function (array, obj) {
            var index = array.indexOf(obj);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        var getTripData = function(trip) {
            var tripName = trip.name;
            var tasks = [];
            trip.tasks.forEach(function (taskInfo) {
                taskSvc.getTask(taskInfo.taskId).then(function (response) {
                    var task = response.data;
                    task.checked = true;
                    $scope.selectTask(task, trip);
                    tasks.push(task);
                });
            });
            $scope.tripData.push({ tripName: tripName, tasks: tasks });
        }

        // MODEL METHODS
        $scope.sort = function(criteria) {
            $scope.sortType = criteria;
            $scope.sortReverse = !$scope.sortReverse;
        };

        $scope.selectToggle = function () {
            $scope.tripData.forEach(function (trip) {
                trip.tasks.forEach(function(task) {
                    if (!$scope.allChecked) {
                        task.checked = true;
                    } else {
                        delete task.checked;
                    }
                    $scope.selectTask(task);
                });
            });
            $scope.allChecked = !$scope.allChecked;
        }

        $scope.selectTask = function(task, trip) {
            if (task.checked) {
                removeFromArray(unselectedTasks, { task: task, trip: trip });
                selectedTasks.push(task);
            } else {
                removeFromArray(selectedTasks, task);
                unselectedTasks.push({ task: task, trip: trip });
            }
        };

        $scope.ok = function () {
            selectedTasks.forEach(function (task) {
                task.isComplete = true;
                delete task.checked;
                taskSvc.updateTask(task);
            });
            unselectedTasks.forEach(function(tripTask) {
                $scope.trips.forEach(function(trip) {
                    if (tripTask.trip === trip.name) {
                        trip.tasks.forEach(function(task) {
                            if (tripTask.task._id.$oid === task.taskId) {
                                removeFromArray(trip.tasks, task.taskId);
                                tripSvc.updateTrip(trip);
                            }
                        });
                    }
                });
            });
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        // CONTROLLER INITIALIZATION
        if ($scope.trips instanceof Array) {
            $scope.trips.forEach(function(trip) {
                getTripData(trip);
            });
        } else {
            getTripData($scope.trips);
        }
    }]);