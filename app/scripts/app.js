'use strict';

/**
 * @ngdoc overview
 * @name mallcmsApp
 * @description
 * # mallcmsApp
 *
 * Main module of the application.
 */
angular
  .module('mallcmsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ui.grid.pagination',
    'ui.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  });