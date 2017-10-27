'use strict';


/**
 * @ngdoc directive
 * @name weatherApp.directive:kpiObject
 * @description
 * # kpiObject
 */


angular.module('weatherApp')
  .directive('selectionBtn', function( $templateCache, $http) {

            return {
                restrict: "E",
                templateUrl: "views/selectionBtn.html",
                scope:{
                    field: "@",
                    toggle: "="
                },
                controller: ['$scope', '$attrs', function($scope, $attrs ) {
                    
                    $scope.styles = {width: $attrs.width ? $attrs.width + "px" : "300px"}; // Default to 200px width for dropdown if 'width' attribute not set
    
                    // creates list object
                    senseApp.createList({
                        "qDef": {
                            "qFieldDefs": ["[" + $scope.field + "]"],
                            qSortCriterias: [{
                                qSortByState: 0,
                                qSortByAscii: 1,
                                qSortByNumeric: 0
                            }]
                        },
                        "qAutoSortByState": {
                            qDisplayNumberOfRows: 1
                        },
                        "qInitialDataFetch": [{
                            qTop : 0,
                            qLeft : 0,
                            qHeight : 1000,
                            qWidth : 1
                        }]
                    }, function(reply) {
                        console.log(reply);
                        $scope.rows = _.flatten(reply.qListObject.qDataPages[0].qMatrix).filter(function(row) { 
                            return row.qText; 
                        });
                    }, $scope);
    
                    // handles selections, if 'toggle' attribute set to true, then toggles selections
                    $scope.selectRow=function(row){
                        if ($scope.toggle == true) {
                            senseApp.field($scope.field).select([row.qElemNumber], true);
                        } else {
                            senseApp.field($scope.field).select([row.qElemNumber], false);
                        }
                    }

                  
                }]
            }

});