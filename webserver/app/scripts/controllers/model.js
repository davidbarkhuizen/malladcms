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

  	$scope.loadUsers = function() {

  		var handleLoadUsersResponse = function(data, status, headers, config) {

  			$scope.dataModel.users.length = 0;

  			for(var i = 0; i < data.list.length; i++) {
  				var userData = data.list[i];

  				var user = new User(userData.id, userData.name, userData.surname, userData.email, userData.isAdmin);
	  			$scope.dataModel.users.push(user);
  			}
	  	};

	  	var handleLoadUsersError = function(data, status, headers, config) {

	  		var data = { list : test.users };
			handleLoadUsersResponse(data);
			// redirect to MVC login page
	  	};

	  	$http({
		    url: siteConfig.apiUrl("users"),
		    method: "GET",
		    params: { "id" : null }
		})
		.success(handleLoadUsersResponse)
		.error(handleLoadUsersError);
  	};

  	$scope.init = function() {

	  	var handleUserQueryResponse = function(data, status, headers, config) {

	  		var user = new User(data.id, data.name, data.surname, data.email, data.isAdmin);
	  		$scope.dataModel.user = user;

	  		if ($scope.dataModel.user.isAdmin) {
	  			$scope.loadUsers();
	  		}
	  		else {
	  			// load campaigns
	  		}
	  	};

	  	var handleUserQueryError = function(data, status, headers, config) {

			handleUserQueryResponse(test.users[0]);
			// redirect to MVC login page
	  	};

	  	$http({
		    url: siteConfig.apiUrl("user"),
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
