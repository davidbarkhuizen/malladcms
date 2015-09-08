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
    'ui',
    'ui.bootstrap'
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
      .when('/user/:id', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/campaigns', {
        templateUrl: 'views/campaigns.html',
        controller: 'CampaignsCtrl',
        controllerAs: 'campaigns'
      })
      .when('/campaign/:id', {
        templateUrl: 'views/campaign.html',
        controller: 'CampaignCtrl',
        controllerAs: 'campaign'
      })
      .otherwise({
        redirectTo: '/'
      });
  });