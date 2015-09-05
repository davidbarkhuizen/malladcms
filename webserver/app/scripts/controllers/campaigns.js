'use strict';

/**
 * @ngdoc function
 * @name mallcmsApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the mallcmsApp
 */
angular.module('mallcmsApp')
  .controller('CampaignsCtrl', function ($scope, DataModel) {

  	$scope.dataModel = DataModel;

    // -----------------------------------------

	var buttonTemplate = '<a ng-href="#/campaign/{{row.entity.id}}" style="display:table-cell;vertical-align:middle;"><button type="button" class="btn btn-primary btn-sm">{0}</button></a>'
		.replace('{0}', 'Manage');

	var manageCellTemplate = '<div style="text-align:center;height:100%;width:100%;display:table;">{0}</div>'
		.replace('{0}', buttonTemplate);

	$scope.verticallyCenteredCellTemplate = function(text) {

		return '<div style="text-align:center;height:100%;width:100%;display:table;"><span style="display:table-cell;vertical-align:middle;">{0}</span></div>'
			.replace('{0}', text);
	};

    $scope.campaignsGridOptions = {
    	
    	data: $scope.dataModel.campaignSummaries,

    	rowHeight:40,
		
		paginationPageSizes: [10],
    	paginationPageSize: 10,

    	// code, description, isActive, startDate, endDate

    	columnDefs: [
			{ 	
				field: 'code', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.code }}')
			},
			{ 	
				field: 'description', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.description }}')
			},
			{ 	
				field: 'isActive', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.isActive }}')
			},
			{ 	
				field: 'startDate', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.startDateString() }}')
			},
			{ 	
				field: 'endDate', 
				enableSorting: false, 
				enableHiding: false,
				headerCellClass: 'center',
				cellTemplate: $scope.verticallyCenteredCellTemplate('{{ row.entity.endDateString() }}')
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
