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

  	// USERS
  	//
	$scope.unBindUsersWatch = $scope.$watch('dataModel.users.length', function(after, before) {
  		if (after > 0) { 
  			$scope.unBindUsersWatch();
  			$scope.handleLoadSequence('users'); 
  		}	
	});
  	$rootScope.$on(Event.LoadUsers, function(evt, data){ $scope.loadUsers(); })
  	$scope.loadUsers = function() {

  		var handleLoadUsersResponse = function(data, status, headers, config) {

  			$scope.dataModel.users.length = 0;

  			for(var i = 0; i < data.list.length; i++) {
  				var userData = data.list[i];

  				var user = new User(userData.id, userData.name, userData.surname, userData.email, userData.isAdmin);
	  			$scope.dataModel.users.push(user);
  			}

  			$scope.dataModel.user = $scope.dataModel.users
  				.first(function(x){ return (x.id == $scope.dataModel.user.id);});
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
		    url: siteConfig.apiUrl(siteConfig.api.users),
		    method: "GET",
		    params: { "id" : null }
		})
		.success(handleLoadUsersResponse)
		.error(handleLoadUsersError);
  	};

  	// CAMPAIGN SUMMARIES
  	// 
  	$scope.unBindCampaignSummariesWatch = $scope.$watch('dataModel.campaignSummaries.length', function(after, before) {
  		if (after > 0) { 
  			$scope.unBindCampaignSummariesWatch();
  			$scope.handleLoadSequence('campaigns'); 
  		}	
	});
  	$rootScope.$on(Event.LoadCampaignSummaries, function(evt, data){ $scope.loadCampaignSummaries(); })
  	$scope.loadCampaignSummaries = function() {

  		var handleLoadCampaignSummariesResponse = function(data, status, headers, config) {

  			$scope.dataModel.campaignSummaries.length = 0;

  			for(var i = 0; i < data.list.length; i++) {
  				var dto = data.list[i];

  				var campaignSummary = new CampaignSummary(dto.id, dto.code, dto.description, dto.isActive, dto.startDate, dto.endDate);
	  			$scope.dataModel.campaignSummaries.push(campaignSummary);
  			}
	  	};

	  	var handleLoadCampaignSummariesError = function(data, status, headers, config) {

	  		// MIMIC SERVER
	  		//
	  		var data = { list : [] };
	  		test.campaigns.forEach(function(x){ data.list.push(x.genSummary()); });
			handleLoadCampaignSummariesResponse(data);
	  	};

	  	$http({
		    url: siteConfig.apiUrl(siteConfig.api.campaignSummaries),
		    method: "GET",
		    params: { "id" : null }
		})
		.success(handleLoadCampaignSummariesResponse)
		.error(handleLoadCampaignSummariesError);
  	};

  	// MALLS
  	//
  	$scope.unBindMallsWatch = $scope.$watch('dataModel.malls.length', function(after, before) {
  		if (after > 0) {
  			$scope.unBindMallsWatch();
  			$scope.handleLoadSequence('malls'); 
  		}	
	});
	$rootScope.$on(Event.LoadMalls, function(evt, data){ $scope.loadMalls(); })
  	$scope.loadMalls = function() {

  		var handleLoadMallsResponse = function(data, status, headers, config) {

  			$scope.dataModel.malls.length = 0;

  			for(var i = 0; i < data.list.length; i++) {
  				var dto = data.list[i];

  				var mall = new Mall(dto.id, dto.name, dto.description);
	  			$scope.dataModel.malls.push(mall);
  			}
	  	};

	  	var handleLoadMallsError = function(data, status, headers, config) {

	  		// MIMIC SERVER
	  		//
	  		var data = { list : [] };
	  		test.malls.forEach(function(x){ data.list.push(x.clone()); });
			handleLoadMallsResponse(data);
	  	};

	  	$http({
		    url: siteConfig.apiUrl(siteConfig.api.malls),
		    method: "GET",
		    params: { "id" : null }
		})
		.success(handleLoadMallsResponse)
		.error(handleLoadMallsError);
  	};

  	// USER
  	//
	$scope.unBindUserWatch = $scope.$watch('dataModel.user', function(after, before) {
		if (after !== null) { 
	  		$scope.unBindUserWatch();
			$scope.handleLoadSequence('user') 
		};
	});
	$rootScope.$on(Event.LoadUser, function(evt, data){ $scope.loadUser(); })
  	$scope.loadUser = function() {

	  	var handleUserQueryResponse = function(data, status, headers, config) {

	  		var user = new User(data.id, data.name, data.surname, data.email, data.isAdmin);
	  		$scope.dataModel.user = user;
	  	};

	  	var handleUserQueryError = function(data, status, headers, config) {

			handleUserQueryResponse(test.users[0]);
			// redirect to MVC login page
	  	};

	  	$http({
		    url: siteConfig.apiUrl(siteConfig.api.user),
		    method: "GET",
		    params: { "id" : null }
		})
		.success(handleUserQueryResponse)
		.error(handleUserQueryError);
  	};

  	// campaign
  	//
	$rootScope.$on(Event.LoadCampaign, function(evt, id){ $scope.loadCampaign(id); })
  	$scope.loadCampaign = function(id) {

	  	var handleLoadCampaignResponse = function(data, status, headers, config) {

	  		var dto = data;

	  		var campaign = new Campaign
	  			(
  				dto.id, 
	  			dto.code,
	  			dto.description,
	  			dto.isActive,
	  			dto.startDate,
	  			dto.endDate,
	  			dto.malls
	  			);

	  		$rootScope.$emit(Event.CampaignLoaded, campaign);
	  	};

	  	var handleLoadCampaignError = function(data, status, headers, config) {

	  		var campaign = test.campaigns.first(function(c){ return (c.id == id); });
			handleLoadCampaignResponse(campaign);
	  	};

	  	$http({
		    url: siteConfig.apiUrl(siteConfig.api.campaign),
		    method: "GET",
		    params: { "id" : id }
		})
		.success(handleLoadCampaignResponse)
		.error(handleLoadCampaignError);
  	};

	$scope.handleLoadSequence = function(source) {

		console.log(source);
		
		if (source === 'user') {
	  		if ($scope.dataModel.user.isAdmin === true) {
	  			$rootScope.$emit(Event.LoadUsers);
	  			return;
	  		}
	  		else {
	  			$rootScope.$emit(Event.LoadMalls);
	  			return;
	  		}
		}
		else if (['malls', 'units'].indexOf(source) !== -1) {

			var dependencies = [$scope.dataModel.malls]; // $scope.dataModel.units
			var satisfied = true;
			for (var i = 0; i < dependencies.length; i++) {
				if (dependencies[i].length === 0)
					satisfied = false;
			} 
			if (satisfied === true) {
				$scope.$emit(Event.LoadCampaignSummaries);
			}
		}
	};

  	if ($scope.dataModel.user === null) {
  		$rootScope.$emit(Event.LoadUser);
  	}
  });
