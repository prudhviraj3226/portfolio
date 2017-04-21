angular.module('myApp.services',[])
 .factory('httpFactory', function($http){
    var factory = {};

    factory.getApi = function(url){
        return $http.get(url);
    };
	
	factory.postApi = function(url,data){
        return $http.post(url,data);
    };
	
	factory.employeeapi = function(data){
        return $http.post('/profile',data);
    };
	
	factory.loginapi = function(data){
        return $http.post('/log',data);
    };
	
	factory.totalprojectsapi = function(data){
        return $http.post('/totalprojects',data);
    };
	
	factory.totalemployeesinprojectapi = function(data){
        return $http.post('/totalemployeesinproject',data);
    };
	
	factory.totalbillableresourcesinprojectapi = function(data){
        return $http.post('/totalbillableresourcesinproject',data);
    };
	
	factory.totalshadowresourcesinprojectapi = function(data){
        return $http.post('/totalshadowresourcesinproject',data);
    };
	
	factory.totalbenchresourcesapi = function(data){
        return $http.post('/totalbenchresources',data);
    };
	
	factory.availableresourcesapi = function(data){
        return $http.post('/availableresources',data);
    };
	
	factory.updateavailableresourcesapi = function(data){
        return $http.post('/updateavailableresources',data);
    };
	
	factory.addprojectapi = function(data){
        return $http.post('/addproject',data);
    };
	
	factory.updatechangeresourcesapi = function(data){
        return $http.post('/updatechangeresources',data);
    };
	
	factory.deleteprojectapi = function(data){
        return $http.post('/deleteproject',data);
    };
	
	factory.updateprojectdetailsapi = function(data){
        return $http.post('/updateprojectdetails',data);
    };
	
	factory.editprojectresourcesapi = function(data){
        return $http.post('/editprojectresources',data);
    };
	

    return factory;
});