
function totalemployeeswithbillableCtrl($scope, $rootScope, $http, $window,httpFactory) {
	var vm=this;   
    vm.totalemployeeswithbillable = function(params) {
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
        });
    }
}

angular.module('myApp')
.controller('totalemployeeswithbillableCtrl',totalemployeeswithbillableCtrl);