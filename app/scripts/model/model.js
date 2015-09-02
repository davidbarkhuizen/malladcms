'use strict';

function User(id, name, surname, email) {

	var that = this;

	this.id = id;
	this.name = name;
	this.surname = surname;
	this.email = email;
}

function randomString(length) {
	return Math.random().toString(36).substring(length);
}

function genRandomUser(id) {

	var name = randomString(10);
	var surname = randomString(10);
	var email = randomString(10);

	return new User(id, name, surname, email);
}

var testUsers = [];
for(var i = 0; i < 15; i++) {
	testUsers.push(genRandomUser(i));
}

angular.module('mallcmsApp')
  .factory('DataModel', function () {
    return { users: testUsers };
})