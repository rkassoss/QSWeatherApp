angular.module('weatherApp')
  .controller('createBmModalCtrl', function( $scope, $modalInstance) {


    $scope.submit = function(bmName, bmDesc, bmSheet) {
        senseApp.bookmark.create($scope.bmName,$scope.bmDesc);
        senseApp.doSave();
        $modalInstance.close();
    }
    // $scope.ok = function() {
    //       $modalInstance.close();
    // };

    $scope.cancel = function() {
         $modalInstance.dismiss('cancel');
    };



  });
