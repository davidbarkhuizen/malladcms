'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('ModelCtrl', function ($scope, $http, DataModel, $rootScope) {

  	$scope.dataModel = DataModel;

  	$scope.cursorClass = function() {
  		return ($scope.dataModel.ajax === true)
  		? 'wait'
  		: '';
  	};

  	$rootScope.$on(Event.LoadUsers, function(evt, data){ $scope.loadUsers(); })
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

	  		// MIMIC SERVER
	  		//
	  		var data = { list : [] };
	  		test.users.forEach(function(x){ data.list.push(x.clone()); });
			handleLoadUsersResponse(data);

			// redirect to MVC login page
			// RETRY, THEN FAIL
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
  });
