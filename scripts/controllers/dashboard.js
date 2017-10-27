'use strict';

/**
 * @ngdoc function
 * @name travelMashupAngularsenseApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('DashboardCtrl', function ( $scope, $timeout, $location,$anchorScroll,anchorSmoothScroll, $modal, senseConfig) {

    $scope.gotoAnchor = function(x) {
      var newHash = x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash(x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };


    $scope.objectCarousel = function() {
      $scope.myInterval = 10000;

      $scope.slides = [
        {
          id: 'FXMz'
        },
        {
          id: 'cLpVpPr'
        },
        {
          id: 'YuRVe'
        },
        {
          id: 'hazMfK'
        }
      ];
    }

    $scope.$watch(function () {
      for (var i = 0; i < $scope.slides.length; i++) {
        if ($scope.slides[i].active) {
          return $scope.slides[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        // console.log('currentSlide:', currentSlide);

        qv.resize(currentSlide.id);
      }
    });
    

    // $scope.onSlideChanged = function (nextSlide, direction) {
    //     // console.log('onSlideChanged:', direction, nextSlide);
    //      var nextSlideId = nextSlide.$parent.slide.id;
    //     // console.log(nextSlide.$parent.slide.id);
    //     qv.resize(nextSlideId);
    //     // console.log(direction);

    // };



    $scope.objectCarousel();



    $('.collapse-toggle').on('click',function(){
      var objectID = $(this).data('object');
      qv.resize(objectID);
      $anchorScroll([objectID]);

     
    });



});
