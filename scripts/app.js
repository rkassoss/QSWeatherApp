// 'use strict';

/**
 * @ngdoc overview
 * @name weatherApp
 * @description
 * # weatherApp
 *
 * Main module of the application.
 */

var senseApp;
var qv;
var config;
var chartTitles;
var appId;
var global;
var currentUser;

// appId = 'weather trends.qvf'; // Sense Desktop
// appId = 'c60b027e-7284-4c23-8e67-49f4ec0893d0'; // Sense Server Local VM http://qmi-qs-cln/qmc
// appId = '0c51a51a-986e-4887-a170-b8b90f39eca7'; // Sense Server on http://demo.qliksensestudios.com/
appId = '133411f1-5871-4a75-99d8-17ee7f597af9'; // Sense Server on http://beta.qliksensestudios.com/


// appId2 = 'ABC Sales.qvf';

config = {
  host: window.location.hostname,
  prefix: "/",
  port: window.location.port == 9000 ? 4848 : window.location.port,
  isSecure: window.location.protocol === "https:"
};

define( "client.services/grid-service", {} );

var base = window.location.origin + window.location.pathname
var extPath = base.substr( 0, base.lastIndexOf( "/" ) ) + '/scripts/extensions/';

require.config({
  baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources",

 paths: {
    'selectize': 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.2/js/standalone/selectize.min',
    'under_score': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min'
  },
  shim: {
    under_score: {
      exports: '_'
    }
}
});
require(['js/qlik','selectize', 'under_score'], function(qlik, Selectize, _) {
    // window.under = under;
    // console.log(under);
    window.Selectize = Selectize;
      // var theme = require('core.utils/theme');
      // window.theme = theme;

      qv = qlik;
      window.app = qv.currApp();

      angular.bootstrap(document, ["weatherApp", "qlik-angular"]);

      senseApp = qlik.openApp(appId, config);
      // secondApp = qlik.openApp(appId2, config);
      // console.log(secondApp);


      senseApp.addAlternateState('newState');
      

      qlik.setOnError(function(error) {
          $("#errmsg").html(error.message).parent().show();
      });

});

angular.module('weatherApp', [
      'ngSanitize',
      'ngAnimate',
      // 'ngCookies',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'ngTouch',
      'ui.sortable',
      'ngGeolocation',
      'AngularReverseGeocode',
      'pageslide-directive',
      'smartArea',
      'selectize'
])
.service("senseConfig", function() {
  if (!senseApp) {
    this.senseApp = qv.openApp(appId, config);
    senseApp = this.senseApp;
  }
});
;

// angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
// $templateCache.put("template/modal/window.html",
// "< div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
// " < div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\">< div class=\"modal-content\" ng-transclude>< /div>< /div>\n" +
// "< /div>");
// }]);

angular.module('weatherApp').directive( 'inject', function() {
   return {
       link: function( $scope, $element, $attrs, controller, $transclude ) {
           if ( !$transclude ) {
               throw minErr( 'ngTransclude' )( 'orphan',
                   'Illegal use of ngTransclude directive in the template! ' +
                   'No parent directive that requires a transclusion found. ' +
                   'Element: {0}',
                   startingTag( $element ));
           }

           $transclude( $scope, function( clone ) {
               $element.empty();
               $element.append( clone );
           });
       }
   };

   
});

