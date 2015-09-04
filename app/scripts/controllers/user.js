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

		$scope.dataModel.selectedUser = ($routeParams.userId !== 'new')
		
			? $scope.dataModel.selectedUser = $scope.dataModel.users.first(
				function(x){ 
  					return (x.id === parseInt($routeParams.userId)); 
  				})
  		
  			: new User(null, '', '', '', false);

    	$scope.originalUserstate = new User(
      		$scope.dataModel.selectedUser.id,
        	$scope.dataModel.selectedUser.name,
        	$scope.dataModel.selectedUser.surname,
        	$scope.dataModel.selectedUser.email,
            $scope.dataModel.selectedUser.isAdmin
        	);

        $scope.password = {
            change:false,
            password:"",
            confirm:""
        };

        $scope.toggleChangePassword = function() {
            $scope.password.change = (!$scope.password.change);
        };

    	$scope.userHasChanged = function() {

    		var changed =
                (
    			($scope.originalUserstate.email !== $scope.dataModel.selectedUser.email)
                ||
                ($scope.password.change)
    			);

    		if (changed) {
                return true;
            }
            else {
                return false;
            }
    	};

        $scope.userChangesAreValid = function() {

            var passwordOK = 
                (
                    (!$scope.password.change) 
                    ||
                    ($scope.passwordIsValid())
                );

            var emailOK = 
                (
                    ($scope.user.email === $scope.originalUserstate.email) 
                    ||
                    ($scope.userEmailIsValid())
                ); 

            if (passwordOK && emailOK) {
                return true;
            }
            else {
                return false;
            }
        };

    	$scope.passwordIsStrong = function(pwd) {

            if ((pwd === null) || (pwd === undefined) || (pwd.length === 0))
                return false;

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

            var isStrong = $scope.passwordIsStrong($scope.password.password);
            var isConfirmed = ($scope.password.password === $scope.password.confirm);

    		if (isStrong && isConfirmed) {
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

                if (user.id == $scope.dataModel.selectedUser.id) {
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
                ($scope.emailPatternIsValid($scope.dataModel.selectedUser.email)) 
                && 
                ($scope.emailIsUnique($scope.dataModel.selectedUser.email))
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
                $scope.dataModel.selectedUser.name, 
                $scope.dataModel.selectedUser.surname, 
                $scope.dataModel.selectedUser.email, 
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