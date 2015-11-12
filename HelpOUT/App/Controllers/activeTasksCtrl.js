helpOutModule.controller("activeTasksCtrl", ["$scope", "taskSvc", "$uibModal",
    function ($scope, taskSvc, $uibModal) {
        // PRIVATE PROPETIES
        var selectedTasks = [];

        // MODEL PROPERTIES
        $scope.sortType = "date";
        $scope.sortReverse = false;
        $scope.currentDate = moment().format();

        // PRIVATE METHODS
        var removeFromTaskArray = function (array, task) {
            var index = array.indexOf(task);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        // MODEL METHODS
        $scope.sort = function (criteria) {
            $scope.sortType = criteria;
            $scope.sortReverse = !$scope.sortReverse;
        }

        $scope.createTask = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/createTaskModal.html',
                controller: 'createTaskModalCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                taskSvc.getCurrentTasks().then(function (response) {
                    $scope.tasks = response.data;
                });
            });
        };

        $scope.editTask = function (task) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'App/Templates/editTaskModal.html',
                controller: 'editTaskModalCtrl',
                resolve: {
                    task: function () {
                        return task;
                    }
                }
            });

            modalInstance.result.then(function () {
                taskSvc.getCurrentTasks().then(function (response) {
                    $scope.tasks = response.data;
                });
            });
        }

        $scope.selectTask = function (task) {
            if (task.checked) {
                selectedTasks.push(task);
                $scope.anyTasksSelected = true;
            } else {
                removeFromTaskArray(selectedTasks, task);
                if (selectedTasks.length === 0) {
                    $scope.anyTasksSelected = false;
            }
        }
        }

        $scope.removeTask = function () {
            if (selectedTasks.length === 0) return;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/confirmationModal.html',
                controller: 'confirmationModalCtrl',
                resolve: {
                    action: function () {
                        return "delete";
                    },
                    objects: function () {
                        return "tasks";
                    }
                }
            });

            modalInstance.result.then(function () {
                selectedTasks.forEach(function (task) {
                    taskSvc.deleteTask(task._id.$oid).then(function () {
                        removeFromTaskArray($scope.tasks, task);
                        removeFromTaskArray(selectedTasks, task);
                        $scope.anyTasksSelected = false;
                    }, function (err) {
                        // display friendly error message
                    });
                });
            });
        };

        $scope.markFinished = function () {
            if (selectedTasks.length === 0) return;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'App/Templates/confirmationModal.html',
                controller: 'confirmationModalCtrl',
                resolve: {
                    action: function () {
                        return "mark as complete";
                    },
                    objects: function () {
                        return "tasks";
                    }
                }
            });

            modalInstance.result.then(function () {
                selectedTasks.forEach(function (task) {
                    task.isComplete = true;
                    delete task.checked;

                    taskSvc.updateTask(task).then(function () {
                        removeFromTaskArray($scope.tasks, task);
                        removeFromTaskArray(selectedTasks, task);
                        $scope.anyTasksSelected = false;
                    }, function (err) {
                        task.checked = true;
                        // display friendly error message
                    });
                });
            });
        };

        $scope.addToNewTrip = function () {
            if (selectedTasks.length === 0) return;
            selectedTasks.forEach(function (task) {
                // api PUT call to create/update new trip w/ selected tasks
            });
        };

        // CONTROLLER INITIALIZATION
        taskSvc.getCurrentTasks().then(function (response) {
            $scope.tasks = response.data;
        });
    }
]);