var app = angular.module('myApp', []);
app.controller('totalemployeeswithbenchCtrl', function($scope, $rootScope, $http, $window) {
    $scope.totalemployeeswithbench = function(params) {
        var json = {
            "_id": localStorage.getItem('project')
        };
        $http.post("/totalbenchresources", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL BENCH EMPS" + JSON.stringify(response))
                $scope.result = response.data.result;
            } else {
                $window.alert('NO BENCH RESOURCES');
            }
        })
    }
});