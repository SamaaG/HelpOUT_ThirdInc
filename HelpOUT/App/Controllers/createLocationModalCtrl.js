helpOutModule.controller('createLocationModalCtrl', ["$scope", "$modalInstance", "locationSvc", "location",
    function ($scope, $modalInstance, locationSvc, location) {
        $scope.location = location;
        
        $scope.createLocation = function () {
            var hasNewPlaceDetails = $scope.locationDetails;
            var location = {
                "query": $scope.location.query,
                "fullAddress": hasNewPlaceDetails ? $scope.locationDetails.formatted_address : $scope.location.fullAddress,
                "geometry" : hasNewPlaceDetails ? $scope.locationDetails.geometry : $scope.location.geometry,
                "placeId": hasNewPlaceDetails ? $scope.locationDetails.place_id : $scope.location.placeId,
                "name": $scope.location.name,
                "icon": hasNewPlaceDetails ? $scope.locationDetails.icon : $scope.location.icon,
                "comments": $scope.location.comments
            };

            locationSvc.postLocation(location).then(function () {
                $modalInstance.close(location);
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }]);