'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('UsersCtrl', function ($scope, DataModel) {

  	$scope.dataModel = DataModel;

    $scope.manageUser = function(id) {
    	console.log('manageUser ' + id);
    };

    // -----------------------------------------

	var buttonTemplate = '<a ng-href="#/user/{{row.entity.id}}" style="display:table-cell;vertical-align:middle;"><button type="button" class="btn btn-primary btn-sm">{0}</button></a>'
		.replace('{0}', 'Manage');

	// <a class="btn-primary btn-md" style="" href="#" title="manage user" ng-click="grid.appScope.manageUser(row.id);">manage</a>

	var manageCellTemplate = '<div style="text-align:center;height:100%;width:100%;display:table;">{0}</div>'
		.replace('{0}', buttonTemplate);

	$scope.verticallyCenteredCellTemplate = function(text) {

		return '<div style="text-align:center;height:100%;width:100%;display:table;"><span style="display:table-cell;vertical-align:middle;">{0}</span></div>'
			.replace('{0}', text);
	};

    $scope.usersGridOptions = {
    	
    	data: $scope.dataModel.users,

    	rowHeight:40,
		
		paginationPageSizes: [10],
    	paginationPageSize: 10,

    	columnDefs: [
			{ 	
				field: 'name', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.name }}')
			},
			{ 	
				field: 'surname', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.surname }}')
			},
			{ 	
				field: 'email', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.email }}')
			},
			{ 	
				field: 'id', 
				cellTemplate: manageCellTemplate,
				headerCellTemplate: '<span></span>',
				enableSorting: false, 
				enableHiding: false
			}
		]
    };

  });
