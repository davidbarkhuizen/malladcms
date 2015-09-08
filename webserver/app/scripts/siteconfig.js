'use strict';

var siteConfig = {

	siteRoot : "/",

	api : {
		user : "user",
		users : "users",
		malls : "malls",
		campaign : "campaign",
		campaignSummaries : "campaignsummaries"
	},

	apiUrl : function (apiToken) {
		return siteConfig.siteRoot + apiToken + "/";
	}
};

