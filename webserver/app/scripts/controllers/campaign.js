'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:CampaignCtrl
 * @description
 * # CampaignCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('CampaignCtrl', function ($scope, $routeParams, DataModel) {

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

	var malls = [];
	$scope.dataModel.malls.forEach(function(mall){ malls.push(mall); });	

	$scope.campaignEdit = new Campaign(null, '', '', false, new Date(), new Date(), malls);

	if ($routeParams.id !== 'new') {

	    var id = parseInt($routeParams.id);

	    /*
	    var match = $scope.dataModel.users.first(
	        function(x) { 
	            return (x.id === id); 
	        });

	    $scope.campaignEdit = match.clone();
	    */
	}

	$scope.originalCampaignState = $scope.campaignEdit.clone();

	$scope.canSubmitCampaign = function() {
		console.log('canSubmitCampaign');
		return false;
	};
});