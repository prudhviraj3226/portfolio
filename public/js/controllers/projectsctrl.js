var app = angular.module('myApp', []);
app.controller('totalprojectsCtrl', function($scope, $http, $window, $location, $rootScope) {
    var assigned_array = [];
    var employeename = [];
    $scope.searchskillset = function(params) {
        var skillset = params.skillset;
        var json = {
            "skillset": skillset
        };
        $http.post("/availableresources", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("AVAILABLE RESORCES" + JSON.stringify(response))
                $rootScope.result = response.data.result;
                $scope.username = response.data.result[0].username;
                $scope.totalcount = response.data.result.length;
            } else {
                $window.alert('No resource is available');
            }
        })
    }
    $scope.addemployees = function(x) {
        var employee = x._id;
        x.status = 1;
        x.project = document.getElementById('projectname').value;
        var resourcetype = prompt("BILLABLE OR SHADOW", "BILLABLE");
        var json = {
            "_id": employee,
            "project": x.project,
            "resourcetype": resourcetype
        };
        console.log("RESOURCE TYPE" + resourcetype)
        x.resourcetype = resourcetype;
        $http.post("/updateavailableresources", json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Employee added successfully');
            } else {
                $window.alert('No resource is available');
            }
        })
        assigned_array.push(x);
        $rootScope.employees = assigned_array;
        console.log("TOTAL ADDED EMPLOYEES IN ARRAY" + JSON.stringify($scope.employees));
    }
    $scope.addproject = function(params) {
        var projectname = params.projectname;
        var startdate = params.startdate;
        var manager = params.manager;
        employeename = $rootScope.employees;
        var json = {
            "_id": projectname,
            "startdate": startdate,
            "manager": manager,
            "employeename": employeename,
        };
        console.log("JSON DATA BEFORE ADDING PROJECT" + JSON.stringify(json))
        $http.post("/addproject", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("GETTING RESPONSE FROM NODE" + JSON.stringify(response))
                $window.alert('Project added successfully');
            } else {
                $window.alert('No resource is available');
            }
        })
    }
    $scope.totalprojects = function(params) {
        var json = {
            "manager": localStorage.getItem('email')
        };
        $http.post("/totalprojects", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL  PROJECTS" + JSON.stringify(response))
                $scope.projects = response.data.result;
                $scope.manager = response.data.result[0].manager;
                //$scope.result=response.data.result[0].employees;
                //$scope.totalcount=response.data.result[0].employees.length;
            } else {
                $window.alert('Project is not Present');
            }
        })
    }
    $scope.out = function(x) {
        localStorage.setItem('project', x);
        window.location.assign("/resources");
    }
    $scope.removeproject = function(x) {
        localStorage.setItem('project', x);
        var projectname = localStorage.getItem('project');
        var json = {
            "_id": projectname
        };
        $http.post("/totalemployeesinproject", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL EMPS IN PROJECT" + JSON.stringify(response))
                $rootScope.result = response.data.result[0].employees;
                $scope.totalcount = response.data.result[0].employees.length;
                angular.forEach($rootScope.result, function(value, index) {
                    var json = {
                        "_id": value._id
                    }
                    console.log("_ID BEFORE DELETING EMPLOYEE FROM PROJECT" + JSON.stringify(json))
                    $http.post("/updatechangeresources", json).then(function(response) {
                        if (response.data.error == undefined) {} else {
                            $window.alert('Project is not Present');
                        }
                    })
                })
            } else {
                $window.alert('Project is not Present');
            }
        })
        $http.post("/deleteproject", json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Delete made Successfully');
            } else {
                $window.alert('Please Check Entered ID');
            }
        })
    }
});