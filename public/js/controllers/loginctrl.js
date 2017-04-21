function loginCtrl($scope, $http, $window, httpFactory) {
	
	var vm=this;
    vm.login = function() {
        var gmailid = vm.gmailid;
        var password = vm.password;
        var json = {
            "_id": gmailid,
            "password": password
        };
        localStorage.setItem('email', gmailid);
        httpFactory.loginapi(json).then(function(response) {
            if (response.data.error == undefined) {
                vm.result = response.data;
                if (vm.result == "angularjs" || vm.result == "ionic" || vm.result == "mean" || vm.result == "mulesoft") {
                    window.location.assign("/profile");
                } else if (vm.result == "manager") {
                    window.location.assign("/managerprofile");
                } else {
                    vm.result1 = vm.result;
                }
            } else {
                $window.alert('Please Check Entered ID');
            }
        });
    }
}

angular.module('myApp')
.controller('loginCtrl',loginCtrl);