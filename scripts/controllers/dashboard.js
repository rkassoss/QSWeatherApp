'use strict';

/**
 * @ngdoc function
 * @name travelMashupAngularsenseApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('DashboardCtrl', function ( $scope, $timeout, $cookies, $location,$anchorScroll,anchorSmoothScroll, $modal, senseConfig) {

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


    // splashpage functionality

    // $scope.skip = false;
    
    // $scope.init = function () {
    //         $scope.inSplash = false; 

    //         if ($cookies.get('straightToAnalysis')) {
    //             $scope.inSplash = false;
    //             $scope.slideDown(true);
    //         } else {
    //             $('#splashContainer').css('opacity', '1.0');
    //             $scope.inSplash = true;
    //         }
        
    // }

    // $scope.checkClick = function () {
    //   $scope.skip = true;
    //   $timeout(function () {
    //       $scope.slideDown();
    //   }, 500);

    //   $cookies.put('straightToAnalysis', 'true');
      
    // };

    // $scope.slideDown = function (straight) {
    //   var delayed = 1000;

    //   if (straight) {
    //       $scope.inSplash = false;
    //       $(".page-bg").css('opacity', "1.0");
    //       $("#splashContainer").css('display', 'none');
    //       return;
    //   }

    //   $scope.inSplash = false;
    //   $(".page-bg").css('opacity', "0");
    //   $(".splash").slideUp(delayed, function() {
    //       $('#splashContainer').animate({"bottom":"100%"}, delayed);
    //       $(".page-bg").animate({"opacity":"1.0"}, delayed / 2);
    //   });
    // };

    //  $scope.init();





    


});
