'use strict';

var siteConfig = {

	siteRoot : "/",

	api : {
		user : "user",
		users : "users",
		campaigns : "campaigns",
		campaignSummaries : "campaignsummaries"
	},

	apiUrl : function (apiToken) {
		return siteConfig.siteRoot + apiToken + "/";
	}
};

