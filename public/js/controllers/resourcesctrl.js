
function totalemployeesinprojectCtrl($scope, $rootScope, $http, $window,httpFactory) {
	var vm=this; 
    vm.addemployees = function(z) {
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
       httpFactory.updateavailableresourcesapi(json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Employee added successfully');
            } else {
                $window.alert('No resource is available');
            }
        })
        vm.employees = z;
        console.log("EMP JSON" + JSON.stringify($rootScope.employees));
        var projectname = z.project;;
        var employeename = vm.employees;
        var json = {
            "projectname": projectname,
            "employeename": employeename,
        };
        console.log("UPDATING EACH EMP DETAILS" + JSON.stringify(json))
        httpFactory.updateprojectdetailsapi(json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Changes made Successfully');
            } else {
                $window.alert('Please Check Entered ID');
            }
        })
    }
    vm.removefromproject = function(params) {
        var gmailid = params;
        var json = {
            "projectname": localStorage.getItem('project'),
            "gmailid": gmailid,
        };
        httpFactory.editprojectresourcesapi(json).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Resource Deleted Successfully');
            } else {
                $window.alert('Please Check Entered ID');
            }
        })
    }
    vm.totalemployeesinproject = function(params) {
        var json = {
            "_id": localStorage.getItem('project')
        };
        httpFactory.totalbillableresourcesinprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL BILLABLE EMPS IN PROJECT" + JSON.stringify(response))
                vm.result = response.data.result;
            } else {
                $window.alert('NO BILLABLE RESOURCES');
            }
        })
        httpFactory.totalshadowresourcesinprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL SHADOW EMPS IN PROJECT" + JSON.stringify(response))
                vm.result1 = response.data.result;
            } else {
                $window.alert('NO SHADOW RESOURCES');
            }
        })
        httpFactory.totalbenchresourcesapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL BENCH EMPS" + JSON.stringify(response))
                vm.result2 = response.data.result;
            } else {
                $window.alert('NO BENCH RESOURCES');
            }
        });
    }
    vm.out = function() {
        window.location.assign("/employeesbillableinfo");
    }
    vm.shadowout = function() {
        window.location.assign("/employeesshadowinfo");
    }
    vm.benchout = function() {
        window.location.assign("/employeesbenchinfo");
    }
}


angular.module('myApp')
.controller('totalemployeesinprojectCtrl',totalemployeesinprojectCtrl);