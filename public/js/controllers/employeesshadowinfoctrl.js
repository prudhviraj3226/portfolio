var app = angular.module('myApp', []);
app.controller('totalemployeeswithshadowCtrl', function($scope, $rootScope, $http, $window) {
    $scope.totalemployeeswithshadow = function(params) {
        var json = {
            "_id": localStorage.getItem('project')
        };
        $http.post("/totalshadowresourcesinproject", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL SHADOW EMPS IN PROJECT" + JSON.stringify(response))
                $scope.result = response.data.result;
            } else {
                $window.alert('NO SHADOW RESOURCES');
            }
        })
    }
});