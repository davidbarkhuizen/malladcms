'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:CampaignCtrl
 * @description
 * # CampaignCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('CampaignCtrl', function ($scope, $routeParams, DataModel, $rootScope) {

	$scope.dataModel = DataModel;

	$scope.activeTab = 1;
	$scope.tabCount = 3;

	$scope.tabClass = function(n) {
		return (n === $scope.activeTab) ? 'active' : ''; 
	};

	$scope.setActiveTab = function(n) {
		$scope.activeTab = n;
	}

	$scope.isActiveTab = function(n) {
		return (n === $scope.activeTab) ? true : false; 
	};

	$scope.gotoNextTab = function() {
		$scope.activeTab = ($scope.activeTab < $scope.tabCount) 
			? $scope.activeTab + 1 
			: $scope.activeTab;
	}

	$scope.gotoPreviousTab = function() {
		$scope.activeTab = ($scope.activeTab > 1) 
			? $scope.activeTab - 1 
			: $scope.activeTab;
	}

	// -------------------------------------------------------------------------------

	$scope.createUpdateCampaignServerError = function() {
		return null;
	};

	$scope.isOpen = {
	    startDate: false,
	    endDate: false,
	};
	$scope.toggleStartDateIsOpen = function($event) {
    	$scope.isOpen.startDate = true;
  	};
	$scope.toggleEndDateIsOpen = function($event) {
    	$scope.isOpen.endDate = true;
  	};

  	$scope.dateOptions = {
    	formatYear: 'yy',
    	startingDay: 1
  	};

	$scope.maxDate = new Date(2020, 5, 22);
	$scope.minDate = new Date(2015, 1, 1)

	// INIT --------------------------------------------------------------------------

	$scope.originalCampaignState = new Campaign(null, '', '', false, null, null, malls);
	$scope.campaignEdit = $scope.originalCampaignState.clone();

  	$rootScope.$on(Event.CampaignLoaded, function(evt, campaign){
  		$scope.originalCampaignState = campaign;
  		$scope.campaignEdit = campaign.clone();
  	});

	var malls = [];
	$scope.dataModel.malls.forEach(function(mall){ malls.push(mall); });

	if ($routeParams.id !== 'new') {
		var id = parseInt($routeParams.id);
		$rootScope.$emit(Event.LoadCampaign, id);
	}

	$scope.canSubmitCampaign = function() {
		return false;
	};
});