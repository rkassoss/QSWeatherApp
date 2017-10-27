'use strict';

/**
 * @ngdoc service
 * @name weatherApp.chartService
 * @description
 * # chartService
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .factory('chartService', function ($modal) {
    var _module = {};

    _module.export = function(chart) {
      qv.table(chart).exportData({format: 'CSV_C', download:true});
    };

    // Expand objects model
    _module.zoom = function(objectID) {
        var zoomObjectId = objectID;
        // console.log(objectID);
        var modalInstance = $modal.open({
            templateUrl: 'views/zoomChartModal.html',
            controller: 'ZoomChartModalCtrl',
            size: 'lg',
            resolve: {
                objectId: function() {
                    return zoomObjectId;//$scope.loadObject;
                }
            }
        });
    };

    return _module;
  });
