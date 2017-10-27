angular.module('weatherApp')
  .controller('ZoomChartModalCtrl', function($scope, $modalInstance) {

    console.log($scope);

      var getChart = function(){
        senseApp.getObject('modelObject', $scope.$parent.id);
      };

      setTimeout(getChart, 50);

      $scope.ok = function() {
          $modalInstance.close();
      };

      $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
      };



  });
