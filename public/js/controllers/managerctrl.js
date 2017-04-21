var app = angular.module('myApp', []);
app.controller('totalemployeesinprojectCtrl', function($scope, $http, $window) {
    $scope.totalprojects = function() {
        var json = {
            "manager": localStorage.getItem('email')
        };
        $http.post("/totalprojects", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL  PROJECTS" + JSON.stringify(response))
                $scope.projects = response.data.result;
                $scope.manager = response.data.result[0].manager;
            } else {
                $window.alert('Project is not Present');
            }
        })
    }
    $scope.update = function(params) {
        var json = {
            "_id": params
        };
        $http.post("/totalemployeesinproject", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL EMPS IN PROJECT" + JSON.stringify(response))
                $scope.project = response.data.result[0]._id;
                $scope.result = response.data.result[0].employees;
                $scope.username = response.data.result[0].employees[0].username;
                $scope.resourcetype = response.data.result[0].employees[0].resourcetype;
                $scope.totalcount = response.data.result[0].employees.length;
            } else {
                $window.alert('Project is not Present');
            }
        })
        $http.post("/totalbillableresourcesinproject", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL BILLABLE EMPS IN PROJECT" + JSON.stringify(response))
                $scope.result = response.data.result[0].employees;
                $scope.totalcount1 = response.data.result.length;
            } else {
                $window.alert('NO BILLABLE RESOURCES');
                $scope.totalcount1 = 0;
            }
        })
        $http.post("/totalshadowresourcesinproject", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL SHADOW EMPS IN PROJECT" + JSON.stringify(response))
                $scope.result = response.data.result[0].employees;
                $scope.totalcount2 = response.data.result.length;
            } else {
                $window.alert('No SHADOW RESOURCES');
                $scope.totalcount2 = 0;
            }
        })
    }
});