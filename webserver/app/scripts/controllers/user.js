'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the mallcmsApp 
 */  
angular.module('mallcmsApp')
	.controller('UserCtrl', function ($scope, $routeParams, DataModel, $http, $location, $rootScope) {

		$scope.dataModel = DataModel;

        $scope.userEdit = new User(null, '', '', '', false);

        if ($routeParams.userId !== 'new') {

            var userId = parseInt($routeParams.userId);

            var match = $scope.dataModel.users.first(
                function(x) { 
                    return (x.id === userId); 
                });

            $scope.userEdit = match.clone();
        }

    	$scope.originalUserstate = new User(
      		$scope.userEdit.id,
        	$scope.userEdit.name,
        	$scope.userEdit.surname,
        	$scope.userEdit.email,
            $scope.userEdit.isAdmin
        	);

        $scope.password = {
            change:false,
            password:"",
            confirm:""
        };

        $scope.createUpdateUserServerError = null;

        $scope.toggleChangePassword = function() {
            $scope.password.change = (!$scope.password.change);

            $scope.password.password = '';
            $scope.password.confirm = '';
        };

    	$scope.userHasChanged = function() {

    		var changed =
                (
    			($scope.originalUserstate.email !== $scope.userEdit.email)
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
                    ($scope.userEdit.email === $scope.originalUserstate.email) 
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

            if ((pwd === null) || (pwd === undefined) || (pwd.length === 0)) {
                return false;
            }

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

                if (user.id == $scope.userEdit.id) {
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
                ($scope.emailPatternIsValid($scope.userEdit.email)) 
                && 
                ($scope.emailIsUnique($scope.userEdit.email))
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
                $scope.userEdit.name, 
                $scope.userEdit.surname, 
                $scope.userEdit.email, 
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

        $scope.createUser = function() {

            var userToCreate = $scope.userEdit;

            var handleCreateUserResponse = function(data, status, headers, config) {
                $scope.dataModel.ajax = false; 

                // reload users
                $rootScope.$emit(Event.LoadUsers);
                window.alert('New user created:\n{0}'.replace("{0}", userToCreate.email)); 
                $location.path('/users');
            };

            var handleCreateUserError = function(data, status, headers, config) {
                $scope.dataModel.ajax = false;

                // MIMIC SERVER
                //
                test.users.push(userToCreate);
                handleCreateUserResponse({}, 200);
            };

            $scope.dataModel.ajax = true;

            $http({
                url: siteConfig.apiUrl(siteConfig.api.user),
                method: "POST",
                data: userToCreate
            })
            .success(handleCreateUserResponse)
            .error(handleCreateUserError);
        };

        $scope.updateUser = function() {

            var userToUpdate = $scope.userEdit;

            var handleUpdateUserResponse = function(data, status, headers, config) {
                $scope.dataModel.ajax = false; 

                $rootScope.$emit(Event.LoadUsers);
                window.alert('Existing user updated:\n{0}'.replace("{0}", userToUpdate.email)); 
                $location.path('/users');
            };

            var handleUpdateUserError = function(data, status, headers, config) {
                $scope.dataModel.ajax = false;

                // MIMIC SERVER
                //
                var original = test.users.first(function(x){ return (x.id === userToUpdate.id);});
                var originalIdx = test.users.indexOf(original);
                test.users.splice(originalIdx, 1, userToUpdate);
                handleUpdateUserResponse({}, 200);
            };

            $scope.dataModel.ajax = true;

            $http({
                url: siteConfig.apiUrl(siteConfig.api.user),
                method: "POST",
                data: userToUpdate
            })
            .success(handleUpdateUserResponse)
            .error(handleUpdateUserError);
        };
  	});	