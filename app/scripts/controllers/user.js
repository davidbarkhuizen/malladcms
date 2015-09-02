'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('UserCtrl', function ($scope, $routeParams, DataModel) {

  	$scope.dataModel = DataModel;

	$scope.dataModel.user = ($routeParams.userId !== 'new')
		
		? $scope.dataModel.user = $scope.dataModel.users.first(
			function(x){ 
  				return (x.id == $routeParams.userId); 
  			})
  		
  		: new User(null, '', '', '');
  });	