'use strict'

var config = {

	siteRoot : "/",

	api : {
		"context" : "context"
	},

	apiUrl: function(api) {
		return config.siteRoot + config.api[api] + "/";
	}
};