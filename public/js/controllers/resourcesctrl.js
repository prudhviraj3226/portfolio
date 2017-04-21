var app = angular.module('myApp', []);
app.controller('totalemployeesinprojectCtrl', function($scope, $rootScope, $http, $window) {
    $scope.addemployees = function(z) {
        var employee = z._id;
        z.status = 1;
        z.project = localStorage.getItem('project');
        var resourcetype = prompt("BILLABLE OR SHADOW", "BILLABLE");
        var json = {
            "_id": employee,
            "project": z.project,
            "resourcetype": resourcetype
        };
        console.log("RESOURCE TYPE" + resourcetype)
        z.resourcetype = resourcetype;
        $http.post("/updateavailableresources", json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Employee added successfully');
            } else {
                $window.alert('No resource is available');
            }
        })
        $rootScope.employees = z;
        console.log("EMP JSON" + JSON.stringify($rootScope.employees));
        var projectname = z.project;;
        var employeename = $rootScope.employees;
        var json = {
            "projectname": projectname,
            "employeename": employeename,
        };
        console.log("UPDATING EACH EMP DETAILS" + JSON.stringify(json))
        $http.post("/updateprojectdetails", json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Changes made Successfully');
            } else {
                $window.alert('Please Check Entered ID');
            }
        })
    }
    $scope.removefromproject = function(params) {
        var gmailid = params;
        var json = {
            "projectname": localStorage.getItem('project'),
            "gmailid": gmailid,
        };
        $http.post("/editprojectresources", json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Resource Deleted Successfully');
            } else {
                $window.alert('Please Check Entered ID');
            }
        })
    }
    $scope.totalemployeesinproject = function(params) {
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
        $http.post("/totalshadowresourcesinproject", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL SHADOW EMPS IN PROJECT" + JSON.stringify(response))
                $scope.result1 = response.data.result;
            } else {
                $window.alert('NO SHADOW RESOURCES');
            }
        })
        $http.post("/totalbenchresources", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL BENCH EMPS" + JSON.stringify(response))
                $scope.result2 = response.data.result;
            } else {
                $window.alert('NO BENCH RESOURCES');
            }
        })
    }
    $scope.out = function() {
        window.location.assign("/employeesbillableinfo");
    }
    $scope.shadowout = function() {
        window.location.assign("/employeesshadowinfo");
    }
    $scope.benchout = function() {
        window.location.assign("/employeesbenchinfo");
    }
});