'use strict';


/**
 * @ngdoc directive
 * @name weatherApp.directive:senseObject
 * @description
 * # senseObject
 */


angular.module('weatherApp')
  .directive('senseObject', function($modal, $templateCache, $http) {

      return {
        restrict: 'E',
        scope: {
          id: '@',
          objclass: '@',
          title: '=',
          titleObj: '@',
          stitle: '=',
          footnote: '=',
          class: '@'
        },
        templateUrl: 'views/senseobject.html',
        replace: true,

        link: function($scope, $element, $attrs ) {

              var objectID = $scope.id;
              // window.objectID = $scope.id;
              var divID = 'object_'+objectID;

              $scope.buttonsOn = false;
              $scope.showType = 'viz';
              

              $scope.getTable = function() {
                // console.log($scope.chart);
                $scope.chart.getProperties()
                  .then(function(d){
                    // console.log(d);
                    var qHyperCubeDef = d.qHyperCubeDef;
                    var fields = [].concat(qHyperCubeDef.qDimensions).concat(qHyperCubeDef.qMeasures);

                    qHyperCubeDef.columnOrder = fields.map(function(d,i){ return i; });
                    qHyperCubeDef.columnWidths = fields.map(function(d,i){ return -1; });

                    var objProperties = {qHyperCubeDef: qHyperCubeDef };
                    // $scope.chart.close();

                    senseApp.visualization.create('table',null,objProperties)
                      .then(function(visual) {
                        visual.show(divID);
                        $scope.chart = visual;
                        $scope.objType = 'table';
                      });
                });
              };

       

                // $scope.toggleButtons = function(show){
                //   var chart = $('#'+objectID);
                //   var buttons = $('#'+objectID).find('.buttons-group');
                //   if (show && $scope.chart) {
                //     buttons.attr('style','display: initial');
                //     var spaceLeft = chart.find('.panel-heading').width() - (chart.find('.chart-actions').width() + chart.find('.chart-title').width());
                //     if (spaceLeft <= 0) chart.find('.chart-title').attr('style','display: none');
                //   } else {
                //     buttons.attr('style','display: none');
                //     chart.find('.chart-title').attr('style','display: initial')
                //   }
                // };
                

                $scope.export = function() {
                  $scope.chart.enigmaModel.exportData()
                    .then(function(reply){
                      // console.log(reply);
                      window.location = location.origin + reply.qUrl;
                    });
                };

                // Expand objects model
                $scope.zoom = function() {
                  $modal.open({
                    templateUrl: 'views/zoomChartModal.html',
                    controller: 'ZoomChartModalCtrl',
                    size: 'lg',
                    scope: $scope
                  });
                };

                $scope.getViz = function() {
                  
                        // if ($scope.chart) {  $scope.chart.close();   }

                        senseApp.getObject(divID, objectID)
                          .then(function (d) {

                            // console.log(d);
                            d.layout.showTitles = false;

                            d.Validated.bind(function(){
                              d.layout.showTitles = false;
                            });

                            $('#'+divID).attr('tid', objectID);

                            $scope.chart = d;
                            $scope.objType = 'viz';
                            $scope.vizType = d.genericType;

                            // console.log($scope.chart);

                            if (!$scope.titleObj) $scope.titleObj = d.layout.title;

                          });

                };

          $scope.getViz();

          setTimeout(function(){
            $scope.getViz();
          },300);


        }
      }
    });
