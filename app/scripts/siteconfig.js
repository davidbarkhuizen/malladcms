'use strict'

var siteConfig = {

	siteRoot : "/",

	api : {
		"user" : "user"
	}
};

function apiUrl(api) {
	return siteConfig.siteRoot + siteConfig.api[api] + "/";
}