helpOutModule.controller('addTaskModalCtrl', ["$scope", "$modalInstance", "taskSvc", "tripTasks",
    function ($scope, $modalInstance, taskSvc, tripTasks) {
        // PRIVATE PROPERTIES
        var selectedTasks = !tripTasks ? [] : tripTasks;

        // MODEL PROPERTIES
        $scope.sortType = "datetime";
        $scope.sortReverse = false;
        $scope.allChecked = false;

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
                $scope.anyTasksSelected = true;
            } else {
                removeFromTaskArray(selectedTasks, task);
                if (selectedTasks.length === 0) {
                    $scope.anyTasksSelected = false;
                }
            }
        }

        $scope.addTasks = function () {
            selectedTasks.forEach(function(task) {
                delete task.checked;
            });
            $modalInstance.close(selectedTasks);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        // CONTROLLER INITIALIZATION
        taskSvc.getCurrentTasks().then(function (response) {
            $scope.tasks = response.data;

            var selectedTaskIds = [];
            selectedTasks.forEach(function(task) {
                selectedTaskIds.push(task._id.$oid);
            });
            selectedTasks = [];
            $scope.tasks.forEach(function(task) {
                if (selectedTaskIds.indexOf(task._id.$oid) > -1) {
                    task.checked = true;
                    $scope.selectTask(task);
                }
            });
        });
    }]);