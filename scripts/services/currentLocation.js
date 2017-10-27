'use strict';

/**
 * @ngdoc service
 * @name weatherApp.locationService
 * @description
 * # locationService
 * Service in the weatherApp. Uses Google Geocode
 */

angular.module('weatherApp').factory('locationService', function($http) {
   
    return { 
        getLocation: function(latitude ,longitude) {
          var address;
          var apiKey = 'AIzaSyBUkmRgg88KtpCS9eNJWUv-yzxm_F3U0Uk';
          $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key='+apiKey+'&sensor=true').success(function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                    console.log(results);
                    cosnole.log(status);
                    } else {
                    window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
          });
    
          return address;
        }
      };

  });

