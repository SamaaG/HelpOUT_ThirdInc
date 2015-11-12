helpOutModule.directive('prettyDatetime', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function (data) {
                //convert data from view format to model format
                var storedDate = moment(data).format();
                return storedDate; //converted
            });

            ngModelController.$formatters.push(function (data) {
                //convert data from model format to view format
                var prettyDate = moment(data).toDate().toString();
                return prettyDate; //converted
            });
        }
    };
});