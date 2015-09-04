'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('ModelCtrl', function ($scope, $http, DataModel) {

  	$scope.dataModel = DataModel;

  	$scope.init = function() {

	  	var handleUserQueryResponse = function(data, status, headers, config) {

	  		var user = new User(data.id, data.name, data.surname, data.email, data.isAdmin);
	  		$scope.dataModel.user = user;

			// A = admin user => fetch list of users for management
			// B = system user => fetch list of campaigns
	  	};

	  	var handleUserQueryError = function(data, status, headers, config) {

	  		var testUser = { "id" : 0, "name" : "david", "surname" : "barkhuizen", "email" : "david@bark.com", "isAdmin" : true };
			handleUserQueryResponse(testUser);
			// redirect to MVC login page
	  	};

	  	$http({
		    url: apiUrl("user"),
		    method: "GET",
		    params: { "id" : null }
		})
		.success(handleUserQueryResponse)
		.error(handleUserQueryError);
  	};

  	if ($scope.dataModel.user === null) {
  		$scope.init();
  	}

  	// 1 = get user - need to know whether we are a system user or an admin user
  	// A = admin user => fetch list of users for management
  	// B = system user => fetch list of campaigns 
  });
