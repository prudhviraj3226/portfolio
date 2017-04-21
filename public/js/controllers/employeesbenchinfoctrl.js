
function totalemployeeswithbenchCtrl($scope, $rootScope, $http, $window,httpFactory) {
	var vm=this;
   vm.totalemployeeswithbench = function(params) {
        var json = {
            "_id": localStorage.getItem('project')
        };
        httpFactory.totalbenchresourcesapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL BENCH EMPS" + JSON.stringify(response))
                vm.result = response.data.result;
            } else {
                $window.alert('NO BENCH RESOURCES');
            }
        })
    }
});