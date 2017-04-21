
function totalemployeesinprojectCtrl($scope, $http, $window,httpFactory) {
	var vm=this;
    vm.totalprojects = function() {
        var json = {
            "manager": localStorage.getItem('email')
        };
          httpFactory.totalprojectsapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL  PROJECTS" + JSON.stringify(response))
                vm.projects = response.data.result;
                vm.manager = response.data.result[0].manager;
            } else {
                $window.alert('Project is not Present');
            }
        })
    }
    vm.update = function() {
        var json = {
            "_id": vm.item
        };
        httpFactory.totalemployeesinprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL EMPS IN PROJECT" + JSON.stringify(response))
                vm.project = response.data.result[0]._id;
                vm.result = response.data.result[0].employees;
                vm.username = response.data.result[0].employees[0].username;
                vm.resourcetype = response.data.result[0].employees[0].resourcetype;
                vm.totalcount = response.data.result[0].employees.length;
            } else {
                $window.alert('Project is not Present');
            }
        })
        httpFactory.totalbillableresourcesinprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL BILLABLE EMPS IN PROJECT" + JSON.stringify(response))
                vm.result = response.data.result[0].employees;
                vm.totalcount1 = response.data.result.length;
            } else {
                $window.alert('NO BILLABLE RESOURCES');
                vm.totalcount1 = 0;
            }
        })
        httpFactory.totalshadowresourcesinprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL SHADOW EMPS IN PROJECT" + JSON.stringify(response))
                vm.result = response.data.result[0].employees;
               vm.totalcount2 = response.data.result.length;
            } else {
                $window.alert('No SHADOW RESOURCES');
               vm.totalcount2 = 0;
            }
        });
    }
}


angular.module('myApp')
.controller('totalemployeesinprojectCtrl',totalemployeesinprojectCtrl);