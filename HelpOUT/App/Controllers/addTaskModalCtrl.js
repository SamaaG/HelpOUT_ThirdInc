helpOutModule.controller('addTaskModalCtrl', ["$scope", "$modalInstance", "taskSvc", "tripTasks",
    function ($scope, $modalInstance, taskSvc, tripTasks) {
        // MODEL PROPERTIES
        $scope.sortType = "date";
        $scope.sortReverse = false;
        $scope.selectedTasks = !tripTasks ? [] : tripTasks;

        // PRIVATE METHODS
        var removeFromTaskArray = function (array, task) {
            var index = array.indexOf(task);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        // MODEL METHODS
        $scope.test = function(task) {
            var index = $scope.tasks.indexOf(task);
            var inArray = index > -1;
            alert(inArray);
        }

        $scope.sort = function (criteria) {
            $scope.sortType = criteria;
            $scope.sortReverse = !$scope.sortReverse;
        }

        $scope.selectTask = function (task) {
            if (task.checked) {
                $scope.selectedTasks.push(task);
            } else {
                removeFromTaskArray($scope.selectedTasks, task);
            }
        }

        $scope.addTasks = function () {
            $scope.selectedTasks.forEach(function(task) {
                delete task.checked;
            });
            $modalInstance.close($scope.selectedTasks);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        // CONTROLLER INITIALIZATION
        taskSvc.getCurrentTasks().then(function (response) {
            $scope.tasks = response.data;

            var selectedTaskIds = [];
            $scope.selectedTasks.forEach(function(task) {
                selectedTaskIds.push(task._id.$oid);
            });
            $scope.selectedTasks = [];
            $scope.tasks.forEach(function(task) {
                if (selectedTaskIds.indexOf(task._id.$oid) > -1) {
                    task.checked = true;
                    $scope.selectTask(task);
                }
            });
        });
    }]);