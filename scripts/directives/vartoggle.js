angular.module('weatherApp')
    .directive('vartoggle', function ($rootScope) {
    return {
        restrict: 'E',
        scope: {
            variable: '@',
            values: '@',
            defaultvalue: '@',
            label: '@',
            additionalclass: '@'
        },
        template: '<span class="var-toggle-button btn" ng-repeat="val in var_values" ng-click="changed(val)" ng-class="{\'inactive-state\': variableValue == val.value}">{{val.name}}</span>',
        link: function ($scope, element, attrs) {
            $scope.variableLoaded = false;
            $scope.variableValue = null;
            $scope.var_values = [];

            if ($scope.values) {
                var vals = $scope.values.split('|');
                for (var i = 0; i < vals.length; ++i) {
                    var c = vals[i];
                    var name,value;

                    if (c.indexOf(',') > -1) {
                        var split = c.split(',');
                        name = split[0].replace("'", '').replace("'", '');
                        value = split[1].replace("'",'').replace("'", '');
                    }   else {
                        name = c; 
                        value = c;
                    }
                    $scope.var_values.push( {
                        name: name,
                        value: value
                    });
                }
            } 

            $scope.getVarVal = function () {
                senseApp.variable.getContent($scope.variable).then(function (model) {
                    if (model) {
                        if (model.qContent && model.qContent.qIsNum) {
                            $scope.variableValue = Number(model.qContent.qString);
                        } else {
                            $scope.variableValue = model.qContent.qString;
                        }
                        $scope.variableLoaded = true;
                    }
                });
            };


            $scope.changed = function (val) {
                $(element).addClass('var-toggle-loading');
                if (val.name) {
                    $scope.variableValue = val.value;
                } else {
                    $scope.variableValue = val;
                }
                console.log($scope.variableValue);
                senseApp.variable.setContent($scope.variable, $scope.variableValue).then(function() {
                    $(element).removeClass('var-toggle-loading');
                });
            };


            if ($rootScope.senseAppIsLoaded) {
                $scope.getVarVal();
            } else {
                $rootScope.$on('senseapp-loaded', function () {
                    $scope.getVarVal();
                });
            }


        }
    };
});