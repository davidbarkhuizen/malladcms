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
	user : null,
	users : [],
	selectedUser : null
};

angular.module('mallcmsApp')
  .factory('DataModel', function () {
    return privateModel;
});