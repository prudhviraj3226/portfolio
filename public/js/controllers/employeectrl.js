
function profileCtrl($scope, $http, $window,httpFactory) {
	var vm=this;   
    vm.profile = function(params) {
        var json = {
            "_id": localStorage.getItem('email')
        };
        httpFactory.employeeapi(json).then(function(response) {
            if (response.data.error == undefined) {
                console.log(JSON.stringify(response.data))
                vm.result = response.data;
                console.log("PROFILE DATA" + JSON.stringify($scope.result))
                vm.username = response.data[0].username;
                vm.projectname = response.data[0].project;
                vm.uploadimage = response.data[0].uploadimage;
                vm.skillset = response.data[0].skillset;
                vm.doj = response.data[0].doj;
                vm.phonenumber = response.data[0].phonenumber;
            } else {
                $window.alert('Please Check Entered ID');
            }
        });
    }
}

angular.module('myApp')
.controller('profileCtrl',profileCtrl);