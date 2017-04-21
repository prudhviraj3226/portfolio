var app = angular.module('myApp', []);
app.controller('profileCtrl', function($scope, $http, $window) {
    $scope.profile = function(params) {
        var json = {
            "_id": localStorage.getItem('email')
        };
        $http.post("/profile", json).then(function(response) {
            if (response.data.error == undefined) {
                console.log(JSON.stringify(response.data))
                $scope.result = response.data;
                console.log("PROFILE DATA" + JSON.stringify($scope.result))
                $scope.username = response.data[0].username;
                $scope.projectname = response.data[0].project;
                $scope.uploadimage = response.data[0].uploadimage;
                $scope.skillset = response.data[0].skillset;
                $scope.doj = response.data[0].doj;
                $scope.phonenumber = response.data[0].phonenumber;
            } else {
                $window.alert('Please Check Entered ID');
            }
        })
    }
});