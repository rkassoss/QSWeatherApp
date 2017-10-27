'use strict';


/**
 * @ngdoc directive
 * @name weatherApp.directive:kpiObject
 * @description
 * # kpiObject
 */


angular.module('weatherApp')
  .directive('kpiObject', function($modal, $templateCache, $http) {

      return {
        restrict: 'E',
        scope: {
          id: '@',
          objclass: '@',
          title: '=',
          titleObj: '@',
          stitle: '=',
          footnote: '=',
          class: '@',
          trendid: '@',
          catclass: '@'
        },
        templateUrl: 'views/kpiobject.html',
        replace: true,

        link: function(scope, element, attrs) {

          var objectID = scope.id;
          window.objectID = scope.id;

          var divID = 'object_'+objectID;

          var trendID = scope.trendid;
          var divTrendID = 'object_'+trendID;

          scope.objectHeight = "100%";
          scope.wrapperHeight = "120px";

          // console.log(scope.catclass);


            scope.getViz = function() {

                  if (objectID) {
                  senseApp.getObject(divID, objectID)
                    .then(function (d) {
                      // console.log(d);
                      d.layout.showTitles = false;
                      $('#'+divID).attr('tid', objectID);
                      scope.objType = 'viz';
                      if (!scope.titleObj) scope.titleObj = d.layout.title;
                    });
                  }
                  if (trendID) {
                    scope.objectHeight = "50%";
                    scope.wrapperHeight = "140px";
                    scope.objclass = "has-trend";
                    senseApp.getObject(divTrendID, trendID)
                      .then(function (d) {
                        
                        d.layout.showTitles = false;
                        $('#'+divTrendID).attr('tid', trendID);
                        if (!scope.titleObj) scope.titleObj = d.layout.title;
                        // console.log(d);
                      });
                    }
      
            };

            scope.getViz();
            
            setTimeout(function(){
              scope.getViz();
            },100);

        }
      }
    });
