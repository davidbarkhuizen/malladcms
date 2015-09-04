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

