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