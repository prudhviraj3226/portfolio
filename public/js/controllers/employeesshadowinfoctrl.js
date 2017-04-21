
function totalemployeeswithshadowCtrl($scope, $rootScope, $http, $window,httpFactory) {
	var vm=this;   
    $scope.totalemployeeswithshadow = function(params) {
        var json = {
            "_id": localStorage.getItem('project')
        };
        httpFactory.totalshadowresourcesinprojectapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log("TOTAL SHADOW EMPS IN PROJECT" + JSON.stringify(response))
                vm.result = response.data.result;
            } else {
                $window.alert('NO SHADOW RESOURCES');
            }
        });
    }
}

angular.module('myApp')
.controller('totalemployeeswithshadowCtrl',totalemployeeswithshadowCtrl);