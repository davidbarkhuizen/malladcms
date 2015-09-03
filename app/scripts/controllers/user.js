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
  					return (x.id === $routeParams.userId); 
  				})
  		
  			: new User(null, '', '', '');

    	$scope.originalUserstate = new User(
      		$scope.dataModel.user.id,
        	$scope.dataModel.user.name,
        	$scope.dataModel.user.surname,
        	$scope.dataModel.user.email
        	);

        $scope.password = {
            password:"",
            confirm:""
        };

    	$scope.userHasChanged = function() {

    		var changed =
    			(
    			($scope.originalUserstate.email !== $scope.dataModel.user.email)
    			);

    		return changed;
    	};

    	$scope.passwordIsStrong = function(pwd) {

    		if (pwd.length < 8) {
    			return false;
    		}

    		var sets = [
    			"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    			"0123456789",
    			"!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~"
    		];

    		for (var s = 0; s < sets.length; s++) {
    			var targetSet = sets[s];

    			var hasSetMember = false;
	    		for(var i = 0; i < targetSet.length; i++) {
	    			if (pwd.indexOf(targetSet[i]) !== -1) {
	    				hasSetMember = true;
	    				break;
	    			}
    			}

	    		if (!hasSetMember) {
    				return false;
	    		}
    		}

    		return true;
    	};

    	$scope.passwordIsValid = function() {

    		if ($scope.passwordIsStrong($scope.password.password)) {
    			return true;
            }
    		else {
    			return false;
            }
    	};

        $scope.confirmPassword = function(passwordConfirm) {
            return ($scope.password.password === passwordConfirm);
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