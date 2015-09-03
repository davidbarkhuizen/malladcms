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

    	$scope.originalUserstate = new User(
      		$scope.dataModel.user.id,
        	$scope.dataModel.user.name,
        	$scope.dataModel.user.surname,
        	$scope.dataModel.user.email
        	);

    	$scope.password = '';
    	$scope.confirmPassword = '';

    	$scope.userHasChanged = function() {

    		var changed =
    			(
    			($scope.originalUserstate.email !== $scope.dataModel.user.email)
    			);

    		return changed;
    	};

    	$scope.validatePassword = function(pwd) {
    		console.log('validatePassword ' + pwd);
    	};

    	$scope.passwordIsValid = function() {

    		var isValid =  
    			(
    				($scope.password !== '')
    				&&
    				($scope.password.length !== null)
    				&&
    				($scope.password.length > 0)
    				&&
    				($scope.password === $scope.confirmPassword)
    			);

    		return isValid;
    	};

    	$scope.newUserInfoIsCompleteAndValid = function() {

    		var completed =
    			(
    				($scope.dataModel.user.name.length > 0)
    				&&
    				($scope.dataModel.user.surname.length > 0)
    				&&
    				($scope.dataModel.user.email.length > 0)
	   			);

    		return (completed && $scope.passwordIsValid());
    	};
  	});	