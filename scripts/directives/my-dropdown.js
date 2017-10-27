'use strict';


/**
 * @ngdoc directive
 * @name weatherApp.directive:kpiObject
 * @description
 * # kpiObject
 */


angular.module('weatherApp')
  .directive('myDropdown', function($modal, $templateCache, $http) {

            return {
                restrict: "E",
                templateUrl: "views/dropdown.html",
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
                                qSortByAscii: 1,
                                qSortByNumeric: -1
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
                        // console.log(reply);
                        $scope.rows = _.flatten(reply.qListObject.qDataPages[0].qMatrix).filter(function(row) { 
                            return row.qText !== "Toronto Blue Jays"; });
                    }, $scope);
    
                    // handles selections, if 'toggle' attribute set to true, then toggles selections
                    $scope.selectRow=function(row){
                        if ($scope.toggle == true) {
                            senseApp.field($scope.field).select([row.qElemNumber], true);
                        } else {
                            senseApp.field($scope.field).select([row.qElemNumber], false);
                        }
                        $("ul").scrollTop(0);
                    }

                    // updates value of button
                    $scope.$watchCollection('rows', function(rows) {
                        var defaultValue = $attrs.name ? $attrs.name : $attrs.field;
                        if(rows == undefined) { 
                            $scope.selectedValue = defaultValue;
                            return; 
                        }
                        $scope.selectedRows = rows.filter(function(row) { return row.qState === "S" });
                        if ($scope.selectedRows.length === 1) {
                            $scope.selectedValue = $scope.selectedRows[0].qText;
                        } else if ($scope.selectedRows.length > 1) {
                            $scope.selectedValue = defaultValue + ": " + $scope.selectedRows.length + " selected";
                        } else {
                            $scope.selectedValue = defaultValue;
                        }
                    });

           
                    // edge detection for dropdown, so it doesn't overflow page
                    $scope.edgeDetection = function($event) {
                        var $button = $($event.target);
                        var $dropdown = $($event.target).next();

                        $('.dropdown-directive').removeClass('open');
                        $button.parent().addClass('open');


                        // if ($button.offset().left + $dropdown.width() > $(window).width()-15) {
                        //     $dropdown.css("left", ($(window).width() - $button.offset().left - $dropdown.width() - 15) + "px");
                        // } else {
                        //     $dropdown.css("left", "0");
                        // }   
                    }


                    // close dropdwon when clicking somewhere else.
                    $('body').click(function(evt){   
                        if(!$(evt.target).hasClass('dropdown-toggle')) {
                            $('.dropdown-directive').removeClass('open');
                        }                        
                    });

                }]
            }

});