'use strict';

var siteConfig = {

	siteRoot : "/",

	api : {
		"user" : "user",
		"users" : "users"
	},

	apiUrl : function (api) {
		return siteConfig.siteRoot + siteConfig.api[api] + "/";
	}
};


'use strict';

// ----------------------------------------------------------
// GUID

// broofa @ http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
//
function guid() {

	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

		.replace(/[xy]/g,
			function(c) {
    			var r = Math.random()*16|0;
    			var v = c === 'x' ? r : (r&0x3|0x8);
    			return v.toString(16);
			}
		);
}

function suffixStaticUrlWithGuid(url) {
	return url + "?guid=" + guid();
}

// STRING ---------------------------------------------------------

// fearphage
// @ http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
//
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

// ARRAY ---------------------------------------------------------

Object.defineProperty(Array.prototype, "remove", {
	enumerable: false,
	value: function(match) {
		var that = this;

		var toRetain = this.filter(function(x) { return (x !== match); });
		this.length = 0;
		toRetain.forEach(function(x) { that.push(x); });

		return this;
    }
});

Object.defineProperty(Array.prototype, "removeWhere", {
	enumerable: false,
	value: function(predicate) {
		var that = this;

		var toRetain = this.filter(function(x) { return !predicate(x); });
		this.length = 0;
		toRetain.forEach(function(x) { that.push(x); });

		return this;
    }
});

Object.defineProperty(Array.prototype, "first", {
	enumerable: false,
	value: function(predicate) {

		var matching = this.filter(predicate); 
		
		return (matching.length === 0)
			 ? undefined
			 : matching[0];
    }
});

Object.defineProperty(Array.prototype, "countWhere", {
	enumerable: false,
	value: function(predicate) {

		var count = 0;
		this.forEach(function(x) { count = predicate(x) ? count + 1 : count; });
		return count;
    }
});

Object.defineProperty(Array.prototype, "contains", {
	enumerable: false,
	value: function(match) {
		var that = this;

		for(var i = 0; i < this.length; i++) {
			if (this[i] === match) {
				return true;
			}
		}

		return false;
    }
});

Object.defineProperty(Array.prototype, "containsWhere", {
	enumerable: false,
	value: function(predicate) {
		
		for(var i in this) {
			if (predicate(this[i]) === true) { 
				return true;
			}
		}

		return false;
    }
});
'use strict';

/**
 * @ngdoc overview
 * @name mallcmsApp
 * @description
 * # mallcmsApp
 *
 * Main module of the application.
 */
angular
  .module('mallcmsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ui.grid.pagination',
    'ui'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
'use strict';

function User(id, name, surname, email, isAdmin) {

	var that = this;

	this.id = id;
	this.name = name;
	this.surname = surname;
	this.email = email;
	this.isAdmin = isAdmin;

	this.clone = function() {
		return new User(that.id, that.name, that.surname, that.email, that.isAdmin);
	};
}

var privateModel = {

	ajax : false,

	user : null,
	users : [],
	selectedUser : null
};

angular.module('mallcmsApp')
  .factory('DataModel', function () {
    return privateModel;
});
'use strict';

var Event = {
	LoadUsers : guid()
};
'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('MainCtrl', ["$scope", "$http", "DataModel", function ($scope, $http, DataModel) {

  }]);

'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('UsersCtrl', ["$scope", "DataModel", function ($scope, DataModel) {

  	$scope.dataModel = DataModel;

    // -----------------------------------------

	var buttonTemplate = '<a ng-href="#/user/{{row.entity.id}}" style="display:table-cell;vertical-align:middle;"><button type="button" class="btn btn-primary btn-sm">{0}</button></a>'
		.replace('{0}', 'Manage');

	var manageCellTemplate = '<div style="text-align:center;height:100%;width:100%;display:table;">{0}</div>'
		.replace('{0}', buttonTemplate);

	$scope.verticallyCenteredCellTemplate = function(text) {

		return '<div style="text-align:center;height:100%;width:100%;display:table;"><span style="display:table-cell;vertical-align:middle;">{0}</span></div>'
			.replace('{0}', text);
	};

    $scope.usersGridOptions = {
    	
    	data: $scope.dataModel.users,

    	rowHeight:40,
		
		paginationPageSizes: [10],
    	paginationPageSize: 10,

    	columnDefs: [
			{ 	
				field: 'name', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.name }}')
			},
			{ 	
				field: 'surname', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.surname }}')
			},
			{ 	
				field: 'email', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.email }}')
			},
			{ 	
				field: 'id', 
				cellTemplate: manageCellTemplate,
				headerCellTemplate: '<span></span>',
				enableSorting: false, 
				enableHiding: false
			}
		]
    };

  }]);

'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the mallcmsApp 
 */  
angular.module('mallcmsApp')
	.controller('UserCtrl', ["$scope", "$routeParams", "DataModel", "$http", "$location", "$rootScope", function ($scope, $routeParams, DataModel, $http, $location, $rootScope) {

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
                url: siteConfig.apiUrl("user"),
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
                url: siteConfig.apiUrl("user"),
                method: "POST",
                data: userToUpdate
            })
            .success(handleUpdateUserResponse)
            .error(handleUpdateUserError);
        };
  	}]);	
'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('ModelCtrl', ["$scope", "$http", "DataModel", "$rootScope", function ($scope, $http, DataModel, $rootScope) {

  	$scope.dataModel = DataModel;

  	$scope.cursorClass = function() {
  		return ($scope.dataModel.ajax === true)
  		? 'wait'
  		: '';
  	};

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
  				.first(function(x){ return (x.id == scope.dataModel.user);});
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
		    url: siteConfig.apiUrl("users"),
		    method: "GET",
		    params: { "id" : null }
		})
		.success(handleLoadUsersResponse)
		.error(handleLoadUsersError);
  	};

  	$scope.init = function() {

	  	var handleUserQueryResponse = function(data, status, headers, config) {

	  		var user = new User(data.id, data.name, data.surname, data.email, data.isAdmin);
	  		$scope.dataModel.user = user;

	  		if ($scope.dataModel.user.isAdmin) {
	  			$scope.loadUsers();
	  		}
	  		else {
	  			// load campaigns
	  		}
	  	};

	  	var handleUserQueryError = function(data, status, headers, config) {

			handleUserQueryResponse(test.users[0]);
			// redirect to MVC login page
	  	};

	  	$http({
		    url: siteConfig.apiUrl("user"),
		    method: "GET",
		    params: { "id" : null }
		})
		.success(handleUserQueryResponse)
		.error(handleUserQueryError);
  	};

  	if ($scope.dataModel.user === null) {
  		$scope.init();
  	}
  }]);

'use strict';

var test = {

	randomString: function(length) {
		return Math.random().toString(36).substring(length);
	},

	genRandomUser: function(id) {

		var name = test.randomString(10);
		var surname = test.randomString(10);
		var email = test.randomString(10) + '@' + test.randomString(10) + '.' + test.randomString(3);
		var isAdmin = false;

		return new User(id, name, surname, email, isAdmin);
	},

	genRandomTestUsers: function(count) {

		var testUsers = [];
		for(var i = 0; i < count; i++) {

			var testUser = test.genRandomUser(i);
			if (i == 0) {
				testUser.isAdmin = true;
			}

			testUsers.push(testUser);
		}

		return testUsers;
	},

	users : []
};

test.users = test.genRandomTestUsers(15);
angular.module('mallcmsApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div style=\"text-align:center\"> <br> <div style=\"color:grey;font-weight:bold;font-size:6em\"> Mall CMS </div> <br> <div class=\"double-text\"> manage your mall advertising campaigns <br> in the cloud </div> <br> <br> <br> <div> 2015 <br> david barkhuizen </div> </div>"
  );


  $templateCache.put('views/user.html',
    "<div class=\"view-header\"> <span ng-if=\"userEdit.id !== null\"> Manage Existing User </span> <span ng-if=\"userEdit.id === null\"> Create New User </span> </div> <br> <form name=\"userEditForm\" class=\"one-point-five-text\"> <div class=\"error\" ng-if=\"(createUpdateUserServerError !== null)\"> {{ createUpdateUserServerError }} </div> <label> <span class=\"form-label\">Name</span> <input type=\"text\" name=\"name\" ng-model=\"userEdit.name\" required ng-disabled=\"(userEdit.id !== null) || dataModel.ajax\"> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.name.$error.required\"> required! </div> </label> <br> <label> <span class=\"form-label\">Surname</span> <input type=\"text\" name=\"surname\" ng-model=\"userEdit.surname\" required ng-disabled=\"(userEdit.id !== null) || dataModel.ajax\"> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.surname.$error.required\"> required! </div> </label> <br> <label> <span class=\"form-label\">Email</span> <input type=\"text\" name=\"email\" ng-model=\"userEdit.email\" required ui-validate=\"{ validemailpattern : 'emailPatternIsValid($value)', uniqueemail : 'emailIsUnique($value)' }\" ng-disabled=\"dataModel.ajax\"> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.email.$error.required\"> required! </div> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.email.$error.validemailpattern\"> not a valid email! </div> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.email.$error.uniqueemail\"> this email is already in use! </div> </label> <br> <div ng-show=\"((userEdit.id !== null) && (password.change == false))\"> <label> <span class=\"form-label\">Password</span> <a ng-href=\"\"> <button type=\"button\" ng-click=\"toggleChangePassword()\" class=\"btn btn-warning btn-sm\">Change Password</button> </a> </label> </div> <div ng-show=\"(password.change == true)\"> <label> <span class=\"form-label\"></span> <a ng-href=\"\"> <button type=\"button\" ng-click=\"toggleChangePassword()\" class=\"btn btn-success btn-sm\">Undo Password Changes</button> </a> </label> </div> <div ng-show=\"((userEdit.id == null) || (password.change == true))\"> <label> <span class=\"form-label\">Password</span> <input type=\"password\" name=\"password\" ng-model=\"password.password\" ng-required=\"((userEdit.id == null) || (password.change))\" ui-validate=\"{strongpassword : 'passwordIsStrong($value)'}\" ng-disabled=\"dataModel.ajax\"> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.password.$error.required\"> required! </div> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.password.$error.strongpassword\"> the password is too weak. it must <ol> <li>be at least 8 long</li> <li>have at least 1 uppercase letter</li> <li>have at least 1 number</li> <li>have at least 1 special character ! \" # $ % &amp; ' ( ) * + , - . / : ; &lt; = &gt; ? @ [ \\ ] ^ _ ` { | } ~</li> </ol> </div> </label> <br> <label> <span class=\"form-label\">Confirm Password</span> <input type=\"password\" name=\"confirmpassword\" ng-model=\"password.confirm\" ng-required=\"((userEdit.id == null) || (password.change))\" ui-validate=\"{confirmpassword : 'confirmPassword($value)'}\" ng-disabled=\"dataModel.ajax\"> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.confirmpassword.$error.required\"> required! </div> <div role=\"alert\" class=\"error\" ng-show=\"userEditForm.confirmpassword.$error.confirmpassword\"> does not match! </div> </label> </div> <br> <div> <div ng-show=\"userEdit.id === null\"> <a ng-href=\"\"> <button type=\"button\" ng-click=\"createUser()\" ng-disabled=\"!canCreateUser() || dataModel.ajax\" class=\"btn btn-primary btn-sm\">Create User</button> </a> </div> <div ng-show=\"userEdit.id !== null\"> <a ng-href=\"#/users\"> <button type=\"button\" class=\"btn btn-success btn-sm\">Cancel</button> </a> <a ng-href=\"\"> <button type=\"button\" ng-click=\"updateUser()\" ng-disabled=\"((userHasChanged() == false) || (!userChangesAreValid()))\" class=\"btn btn-danger btn-sm\">Submit Changes</button> </a> </div> </div> <br> </form>"
  );


  $templateCache.put('views/users.html',
    "<div> <div class=\"view-header\"> Manage System Users </div> <br> <!-- <div ng-repeat='user in existingUsers'>\n" +
    "\t\t{{ user.name }}, {{ user.surname }} - {{ user.email }}\n" +
    "\t</div> --> <div> <a ng-href=\"#/user/new\"> <button type=\"button\" class=\"btn btn-primary btn-sm\">Create New User</button> </a> </div> <br> <div ui-grid=\"usersGridOptions\" ui-grid-pagination style=\"width:100%;height:100%\"></div> <br> </div>"
  );

}]);
