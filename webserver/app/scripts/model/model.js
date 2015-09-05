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

function CampaignSummary(id, code, description, isActive, startDate, endDate) {

	var that = this;

	this.id = id;
	this.code = code;
	this.description = description;
	this.isActive = isActive;
	this.startDate = startDate;
	this.endDate = endDate;

	this.startDateString = function() {
  		return dateToShortString(that.startDate);
  	};
	this.endDateString = function() {
  		return dateToShortString(that.endDate);
  	};

	this.clone = function() {
		return new CampaignSummary(that.id, that.code, that.description, that.isActive, that.startDate, that.endDate);
	};
}

function Mall(id, name) {

	var that = this;

	this.id = id;
	this.name = name;

	this.clone = function() {
		return new Mall(that.id, that.name);
	}
}

function Campaign(id, code, description, isActive, startDate, endDate, malls) {

	var that = this;

	this.id = id;
	this.code = code;
	this.description = description;
	this.isActive = isActive;
	this.startDate = startDate;
	this.endDate = endDate;

	this.malls = malls;

	this.clone = function() {
		return new Campaign(that.id, that.code, that.description, that.isActive, that.startDate, that.endDate, that.malls);
	};

	this.genSummary = function() {
		return new CampaignSummary(that.id, that.code, that.description, that.isActive, that.startDate, that.endDate);
	};
}

var privateModel = {

	// global ajax lock
	//
	ajax : false,

	user : null,
	users : [],

	campaigns : [],
	campaignSummaries : [],

	malls : []
};

angular.module('mallcmsApp')
  .factory('DataModel', function () {
    return privateModel;
});