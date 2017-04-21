var app = angular.module('myApp', []);
app.controller('totalemployeeswithbillableCtrl', function($scope, $rootScope, $http, $window) {
    $scope.totalemployeeswithbillable = function(params) {
        var json = {
            "_id": localStorage.getItem('project')
        };
        $http.post("/totalbillableresourcesinproject", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL BILLABLE EMPS IN PROJECT" + JSON.stringify(response))
                $scope.result = response.data.result;
            } else {
                $window.alert('NO BILLABLE RESOURCES');
            }
        })
    }
});