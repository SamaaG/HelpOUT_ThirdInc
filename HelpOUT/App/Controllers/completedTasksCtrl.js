helpOutModule.controller("completedTasksCtrl", ["$scope", "taskSvc", "$uibModal",
    function ($scope, taskSvc, $uibModal) {
        // PRIVATE PROPETIES
        var selectedTasks = [];

        // MODEL PROPERTIES
        $scope.sortType = "date";
        $scope.sortReverse = false;

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
                animation: $scope.animationsEnabled,
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

        $scope.markUnfinished = function () {
            if (selectedTasks.length === 0) return;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'App/Templates/confirmationModal.html',
                controller: 'confirmationModalCtrl',
                resolve: {
                    action: function () {
                        return "mark as incomplete";
                    },
                    objects: function () {
                        return "tasks";
                    }
                }
            });

            modalInstance.result.then(function () {
                selectedTasks.forEach(function (task) {
                    task.isComplete = false;
                    delete task.checked;

                    taskSvc.updateTask(task).then(function () {
                        removeFromTaskArray($scope.tasks, task);
                        removeFromTaskArray(selectedTasks, task);
                    }, function (err) {
                        task.checked = true;
                        // display friendly error message
                    });
                });
                $scope.anyTasksSelected = false;
            });
        };

        // CONTROLLER INITIALIZATION
        taskSvc.getArchivedTasks().then(function (response) {
            $scope.tasks = response.data;
        });
    }
]);