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
				// testUser.isAdmin = true;
			}

			testUsers.push(testUser);
		}

		return testUsers;
	},

	genRandomCampaign: function(id) {

		var id = id;
		var code = test.randomString(5);
		var description = test.randomString(10);
		var isActive = true;

		var startDate = new Date();
		startDate.setDate(startDate.getDate() - Math.floor((Math.random() * 100) + 1));

		var endDate = new Date();
		endDate.setDate(endDate.getDate() + Math.floor((Math.random() * 100) + 1));

		return new Campaign(id, code, description, isActive, startDate, endDate);
	},

	genTestMalls: function() {

		var names = [
			"Alberton City", 
			"Brooklyn Mall", 
			"Canal Walk", 
			"Cavendish Square", 
			"Cresta", 
			"Eastgate",
			"East Point Mall",
			"Fourways Mall",
			"Gateway",
			"Hyde Park",
			"Northgate",
			"Rosebank Mall",
			"Sandton City",
			"Southgate",
			"The Zone"
		];

		var malls = [];
		for(var i = 0; i < names.length; i++) {

			var mall = new Mall(i, names[i], '');
			malls.push(mall);
		}

		return malls;
	},

	genRandomTestCampaigns: function(count) {

		var testCampaigns = [];
		for(var i = 0; i < count; i++) {

			var testCampaign = test.genRandomCampaign(i);
			testCampaigns.push(testCampaign);
		}

		return testCampaigns;
	},


	users : [],
	campaigns : [],
	campaignSummaries : []
};

test.users = test.genRandomTestUsers(15);
test.malls = test.genTestMalls();
test.campaigns = test.genRandomTestCampaigns(15);