helpOutModule.controller('createTripModalCtrl', ["$scope", "$modalInstance", "tripSvc", "taskSvc", "$uibModal",
    function ($scope, $modalInstance, tripSvc, taskSvc, $uibModal) {
        // PRIVATE PROPERTIES
        var selectedTasks = [];

        // MODEL PROPERTIES
        $scope.tasks = [];
        
        // PRIVATE METHODS
        var removeFromTaskArray = function (array, task) {
            var index = array.indexOf(task);
            if (index > -1) {
                array.splice(index, 1);
            }
        }
        
        // MODEL METHODS
        $scope.createTrip = function () {
            $scope.submitting = true;  // will use this for a spinner
            
            var taskData = [];
            $scope.tasks.forEach(function(task) {
                taskData.push({
                    "taskId": task._id.$oid
                });
            });

            $scope.trip = {
                "title": $scope.title,
                "datetime": $scope.datetime,
                "startLocation": $scope.startLocation,
                "tasks": taskData,
                "comments": $scope.comments,
                "isComplete": false
            };

            tripSvc.postTrip($scope.trip).then(function () {
                $scope.submitting = false;
                $modalInstance.close();
            }, function (err) {
                $scope.submitting = false;
                // display friendly error message
            });
        };

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

        $scope.selectTask = function (task) {
            if (task.checked) {
                selectedTasks.push(task);
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