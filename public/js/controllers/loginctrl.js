var app = angular.module('myApp', []);
app.controller('loginCtrl', function($scope, $http, $window) {
    $scope.login = function(params) {
        var gmailid = params.gmailid;
        var password = params.password;
        var json = {
            "_id": gmailid,
            "password": password
        };
        localStorage.setItem('email', gmailid);
        $http.post("/log", json).then(function(response) {
            if (response.data.error == undefined) {
                $scope.result = response.data;
                if ($scope.result == "angularjs" || $scope.result == "ionic" || $scope.result == "mean" || $scope.result == "mulesoft") {
                    window.location.assign("/profile");
                } else if ($scope.result == "manager") {
                    window.location.assign("/managerprofile");
                } else {
                    $scope.result1 = $scope.result;
                }
            } else {
                $window.alert('Please Check Entered ID');
            }
        })
    }
});