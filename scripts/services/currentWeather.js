'use strict';

/**
 * @ngdoc service
 * @name weatherApp.currentWeather
 * @description
 * # currentWeather
 * Service in the weatherApp. Uses openweathermap.org API
 */

angular.module('weatherApp').factory('weatherService', function($http) {
    return { 
      getWeather: function(lat,lon) {
        var weather = { temp: {}, clouds: null };
        $http.jsonp('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&callback=JSON_CALLBACK&APPID=88bd662d7668938d3c9555bcc0f558b1').success(function(data) {
            if (data) {
                console.log(data);
                
                if (data.main) {
                    weather.temp.current = data.main.temp;
                    weather.temp.min = data.main.temp_min;
                    weather.temp.max = data.main.temp_max;
                }
                weather.clouds = data.clouds ? data.clouds.all : undefined;
            }
        });
  
        return weather;
      }
    }; 
  });
  