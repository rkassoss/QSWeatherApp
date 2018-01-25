'use strict';

/**
 * @ngdoc function
 * @name travelMashupAngularsenseApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('USACtrl', function ($anchorScroll, $location, $scope, $modal, senseConfig) {
    $scope.divID = 'us-state-chart';



    $scope.activeBtn = 'avgTemp';
    $scope.activeSeason = 'Annual';
   
    $scope.chartTitle = "Humidity Effect on Temperatures Measured";

    $scope.fieldAgr = 'Avg';
    $scope.fieldSetA = $scope.activeCountry = 'United States';

    $scope.subtitle = "Chart is showing results for " + $scope.fieldSetA + " only";


    $scope.fieldName = '[Average of the 24 hourly temperature observations in degrees Celsius]';
    $scope.fieldLabel = 'Avg Temp';

    $scope.helpContent = 'This chart shows Temperatures measurements and Avg Relative Humidity and Date. You can further analyze the results by country as "Set Analysis", meaning your selection will be specicfc to the chart. ';
    

    // Expand objects model
    $scope.zoom = function() {
      $modal.open({
        templateUrl: 'views/zoomChartModal.html',
        controller: 'ZoomChartModalCtrl',
        size: 'lg',
        scope: $scope
      });
    };


    

    // update the viz field
    $scope.updateField = function(fieldAgr,fieldName,fieldLabel) {
      if (fieldAgr === '=Min') {
        $scope.activeBtn = 'minTemp';
      }
      if (fieldAgr === '=Avg') {
        $scope.activeBtn = 'avgTemp';
      }
      if (fieldAgr === '=Max') {
        $scope.activeBtn = 'maxTemp';
      }

      $scope.fieldAgr = fieldAgr;
      $scope.fieldName = fieldName;
      $scope.fieldLabel = fieldLabel;
      $scope.createViz($scope.chartTitle, $scope.fieldAgr,$scope.fieldSetA, $scope.fieldName, $scope.fieldLabel);
    }

    //update viz set analysis
    $scope.updateSetAnalysis = function(fieldSetA) {
      if (fieldSetA === "*") {
        $scope.fieldSetA = fieldSetA;
        $scope.activeCountry = "Global";

        $scope.subtitle = "";
        $('#chartSetAn').collapse('toggle');
        if ( $('#panel-'+$scope.divID).hasClass("glow")) {
          $('#panel-'+$scope.divID).removeClass("glow");
        }
       

      } else {
        $scope.fieldSetA = $scope.activeCountry = fieldSetA;
        $scope.subtitle = "Chart is showing results for " + fieldSetA + " only";
        if (! $('#panel-'+$scope.divID).hasClass("glow")) {
          $('#panel-'+$scope.divID).addClass("glow");
        }
      }
      $scope.createViz($scope.chartTitle, $scope.fieldAgr,$scope.fieldSetA, $scope.fieldName, $scope.fieldLabel, $scope.subtitle);
    }

    // Update Selection
    $scope.updateSelection = function(selectedVal) {
      $scope.activeSeason = selectedVal;
      senseApp.field("Season").selectValues([selectedVal], false, true);
    }
    $scope.clearField = function(field) {
      $scope.activeSeason = field;
      senseApp.field("Season").clear();
    }

    // export
    $scope.export = function() {
      console.log($scope.chart);
      $scope.chart.model.exportData()
       .then(function(reply){
         console.log(reply);
        window.location = location.origin + reply.qUrl;
       })
    };


    // help
    $scope.help = function() {
      $('#panel-'+$scope.divID).toggleClass("show-help");
    }
    


    // create viz
    $scope.createViz = function(chartTitle,fieldAgr, fieldSetA, fieldName, fieldLabel, subtitle) {
      senseApp.visualization.create(
        'combochart',
        [
          {
            "qDef" : {
              "qFieldDefs" : ["Month"],
              "qFieldLabels" : ["Month"]
            },
            "qNullSuppression" : true,
          },
          {
            "qDef" : {
              "qDef" : "=Avg({$<[Country] = {["+fieldSetA+"]}>}[Average of the 24 hourly relative humidity values  as a percentage])/100",
              // "qDef" : "=Avg([Average of the 24 hourly relative humidity values  as a percentage])/100",
              "qLabel" : "Avg Relative Humidity"
            }
          },
          {
            "qDef" : {
              // "qDef" : fieldAgr+"("+fieldName+")",
              "qDef" : fieldAgr+"({$<[Country] = {["+fieldSetA+"]}>}"+fieldName+")",
              "qLabel" : fieldLabel,
              "series" : { "type" : "line", "axis" : 1 }
            }
          }
        ],
        {
          "title" : subtitle,
          "showTitles" : true,
          "dataPoint" : {
            "show" : true
          },
          "legend" : {
            "dock" : "auto"
          }
        }
      ).then(function(chart){
        chart.show($scope.divID);

        $scope.chart = chart;
        $scope.id = chart.id;

        
      });
    };


    $scope.createViz($scope.chartTitle, $scope.fieldAgr,$scope.fieldSetA, $scope.fieldName, $scope.fieldLabel, $scope.subtitle);




    $('.collapse-toggle').on('click',function(){
      var objectID = $(this).data('object');
      qv.resize(objectID);
      $anchorScroll([objectID]);
    });


  });
