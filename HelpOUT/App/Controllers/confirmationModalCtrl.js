helpOutModule.controller('confirmationModalCtrl', ["$scope", "$modalInstance", "action", "objects",
    function ($scope, $modalInstance, action, objects) {
        $scope.action = action;
        $scope.objects = objects;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }]);