'use strict';


/**
 * @ngdoc directive
 * @name weatherApp.directive:customObject
 * @description
 * # customObject
 */


angular.module('weatherApp')
.directive('onCarouselChange', function ($parse) {
  return {
    require: 'carousel',
    link: function (scope, element, attrs, carouselCtrl) {
      var fn = $parse(attrs.onCarouselChange);
      var origSelect = carouselCtrl.select;
      carouselCtrl.select = function (nextSlide, direction) {
        if (nextSlide !== this.currentSlide) {
          fn(scope, {
            nextSlide: nextSlide,
            direction: direction,
          });
        }
        return origSelect.apply(this, arguments);
      };
    }
  };
});