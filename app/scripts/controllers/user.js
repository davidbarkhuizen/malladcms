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

    		if (
                    $scope.passwordIsStrong($scope.password.password)
                    && 
                    ($scope.password.password === $scope.password.confirm)
                ) {
    			return true;
            }
    		else {
    			return false;
            }
    	};

        $scope.confirmPassword = function(passwordConfirm) {
            return ($scope.password.password === passwordConfirm);
        };

        $scope.emailPatternIsValid = function(email) {
            if ( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
                return true;  
            } 
            else {
                return false;
            }
        };

        $scope.emailIsUnique = function(email) {
            
            for (var i = 0; i < $scope.dataModel.users.length; i++) {

                var user = $scope.dataModel.users[i]; 

                if (user.id == $scope.dataModel.user.id) {
                    continue;
                }

                if (user.email == email) {
                    return false;
                }
            }

            return true;
        };

        $scope.userEmailIsValid = function() {

            if (
                ($scope.emailPatternIsValid($scope.dataModel.user.email)) 
                && 
                ($scope.emailIsUnique($scope.dataModel.user.email))
                )
            {
                return true;
            }
            else 
            {
                return false;
            }
        };

        $scope.canCreateUser = function() {
            
            var complete = true;
            var toComplete = [
                $scope.dataModel.user.name, 
                $scope.dataModel.user.surname, 
                $scope.dataModel.user.email, 
                $scope.password.password,
                $scope.password.confirm
            ];
            for (var i = 0; i < toComplete.length; i++) {
                var x = toComplete[i];
                if ((x === null) || (x === undefined) || (x.length === 0)) {
                    complete = false;
                    break;
                }
            }

            var valid = 
                (
                    ($scope.userEmailIsValid())
                    &&
                    ($scope.passwordIsValid())
                );

            if (complete && valid) {
                return true;
            }
            else {
                return false;
            }
        };
  	});	