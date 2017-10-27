'use strict';

/**
 * @ngdoc function
 * @name travelMashupAngularsenseApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('splashController', function ($scope, $timeout, $cookies, $location,$geolocation, $http, weatherService, senseConfig) {



    $scope.getGeoLocation = function() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
                var crd = pos.coords;
                console.log('Your current position is:');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);

                $scope.lat = crd.latitude;
                $scope.lng = crd.longitude;


            $scope.weather = weatherService.getWeather(crd.latitude,crd.longitude);

        };
        
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };
        
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

        

    $scope.skip = false;

    $scope.init = function () {
            $scope.getGeoLocation();
               $scope.inSplash = false; 

            if ($cookies.get('straightToAnalysis')) {
                  $scope.inSplash = false;
                  $location.url('/dashboard');
            } else {
                  $('#splashContainer').css('opacity', '1.0');
                  $scope.inSplash = true;
            }
    }
    

    $scope.checkClick = function () {
          $scope.skip = true;
          $timeout(function () {
              $scope.slideDown();
          }, 500);

           $cookies.put('straightToAnalysis', 'true');
          
    };




    $scope.splashOut = function (straight) {
        var delayed = 1000;

        $scope.inSplash = false;

        // $timeout(function() {  $location.url('/dashboard') }, 500);

        $location.url('/dashboard');
    };

    $scope.init();


  });