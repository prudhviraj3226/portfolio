
function totalprojectsCtrl($scope, $http, $window, $location, $rootScope,httpFactory) {
   var vm=this;   
   var assigned_array = [];
    var employeename = [];
    vm.searchskillset = function(params) {
        var skillset = params.skillset;
        var json = {
            "skillset": skillset
        };
        httpFactory.availableresourcesapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("AVAILABLE RESORCES" + JSON.stringify(response))
                vm.result = response.data.result;
                vm.username = response.data.result[0].username;
                vm.totalcount = response.data.result.length;
            } else {
                $window.alert('No resource is available');
            }
        })
    }
    vm.addemployees = function(x) {
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
        httpFactory.updateavailableresourcesapi(json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Employee added successfully');
            } else {
                $window.alert('No resource is available');
            }
        })
        assigned_array.push(x);
        vm.employees = assigned_array;
        console.log("TOTAL ADDED EMPLOYEES IN ARRAY" + JSON.stringify(vm.employees));
    }
    vm.addproject = function(params) {
        var projectname = params.projectname;
        var startdate = params.startdate;
        var manager = params.manager;
        employeename = vm.employees;
        var json = {
            "_id": projectname,
            "startdate": startdate,
            "manager": manager,
            "employeename": employeename,
        };
        console.log("JSON DATA BEFORE ADDING PROJECT" + JSON.stringify(json))
        httpFactory.addprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("GETTING RESPONSE FROM NODE" + JSON.stringify(response))
                $window.alert('Project added successfully');
            } else {
                $window.alert('No resource is available');
            }
        })
    }
    vm.totalprojects = function() {
        var json = {
            "manager": localStorage.getItem('email')
        };
        httpFactory.totalprojectsapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL  PROJECTS" + JSON.stringify(response))
                vm.projects = response.data.result;
                vm.manager = response.data.result[0].manager;
                //$scope.result=response.data.result[0].employees;
                //$scope.totalcount=response.data.result[0].employees.length;
            } else {
                $window.alert('Project is not Present');
            }
        })
    }
    vm.out = function(x) {
        localStorage.setItem('project', x);
        window.location.assign("/resources");
    }
    vm.removeproject = function(x) {
        localStorage.setItem('project', x);
        var projectname = localStorage.getItem('project');
        var json = {
            "_id": projectname
        };
        httpFactory.totalemployeesinprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL EMPS IN PROJECT" + JSON.stringify(response))
                vm.result = response.data.result[0].employees;
                vm.totalcount = response.data.result[0].employees.length;
                angular.forEach(vm.result, function(value, index) {
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
        httpFactory.deleteprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Delete made Successfully');
            } else {
                $window.alert('Please Check Entered ID');
            }
        });
    }
}

angular.module('myApp')
.controller('totalprojectsCtrl',totalprojectsCtrl);