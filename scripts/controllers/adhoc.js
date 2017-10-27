'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */

angular.module('weatherApp')
  .controller('AdHocCtrl', function($scope, $modal, senseConfig) {
    // console.log('controllerloaded');

    var objConvert = require('objects.extension/object-conversion');
    // console.log(objConvert);

    $scope.isCollapsed = false;
    $scope.lists = {};
    $scope.lists.selected = {
      dims: [],
      measures: []
    };

    $scope.chartTypes = [{
      label: 'Pivot Table',
      value: 'pivot-table',
      options: {}
    }, {
      label: 'Straight Table',
      value: 'table',
      options: {}
    }, {
      label: 'Line Chart',
      value: 'linechart',
      options: {}
    }, {
      label: 'Pie Chart',
      value: 'piechart',
      options: {}
    }, {
      label: 'Treemap',
      value: 'treemap',
      options: {}
    }, {
      label: 'Bar Chart',
      value: 'barchart',
      options: {
        barGrouping: ['grouped', 'stacked'],
        orientation: ['horizontal', 'vertical'],
        legend: {
          show: [true, false],
          dock: ['auto', 'right', 'left', 'top'],
          showTitle: [true, false]
        }
      }
    }];

    $scope.selectedChart = angular.copy($scope.chartTypes[0]); //{}//value: 'table'};

    $scope.updateChartOptions = function() {

      $scope.lists.selected.measures = _.chain($scope.lists.measures.qMeasureList.qItems)
        .filter(function(o) {
          return o.isSelected;
        })
        //  .map(function(o) { return o.qData.title; })
        .map(function(o) {
          return {
            "qLibraryId": o.qInfo.qId,
            "qType": "measure"
          };
        })
        .value();

      $scope.lists.selected.dims = _.chain($scope.lists.dimensions.qDimensionList.qItems)
        .filter(function(o) {
          return o.isSelected;
        })
        .map(function(o) {
          return {
            "qLibraryId": o.qInfo.qId,
            "qType": "dimension"
          };
        })

      // .map(function(o) { return o.qData.title; })
      .value();
      // console.log($scope.lists.selected);

      if ($scope.lists.selected.dims.length !== 0 && $scope.lists.selected.measures.length !== 0){
        $scope.createChart();
      }

    };

    senseApp.getList("DimensionList", function(reply) {
      if (!$scope.lists.dimensions) {
        $scope.lists.dimensions = reply;
        $scope.lists.dimensions.qDimensionList.qItems.forEach(function(e) {
          e.isSelected = false;
        });
        // console.log(reply);
      }
    });

    senseApp.getList("MeasureList", function(reply) {
      $scope.lists.measures = reply;
      $scope.lists.measures.qMeasureList.qItems.forEach(function(e) {
        e.isSelected = false;
      });
      // console.log(reply);
    });

    $scope.currentChart = null;

    $scope.sortableOptions = {
      stop: function(e, ui) {
        $scope.updateChartOptions();
      }
    };


    $scope.export = function() {
      $scope.currentChart.model.enigmaModel.exportData()
        .then(function(reply){
          console.log(reply);
          window.location = location.origin + reply.qUrl;
        });
    };


    $scope.createChart = function() {

      var selectedFields = $scope.lists.selected.dims.concat($scope.lists.selected.measures);
      //selectedDims.concat(selectedMeasures);

      // console.log(selectedFields);

      // if ($scope.currentChart) {
      //   // console.log(currentChart);
      //   $scope.currentChart.close();
      // }

      senseApp.visualization.create($scope.selectedChart.value, selectedFields
      ).then(function(visual) {
        // console.log(visual);
        $scope.currentChart = visual;
        visual.show('QV01');
      });

    };



  });
