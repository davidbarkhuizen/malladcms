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

  	console.log('model controller instantiated');

  	// 1 = get user - need to know whether we are a system user or an admin user
  	// A = admin user => fetch list of users for management
  	// B = system user => fetch list of campaigns 
  });
