// 'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:navMenus
 * @description
 * # navMenus
 */

 // angular.module('weatherApp')
 //   .run(function($templateCache) {
 //     $templateCache.put('toolbar.html',
 //     '<button type="button" class="btn btn-default btn-sm btn-panel-heading pull-right" ng-click="export()"> \
 //        <span class="fa fa-floppy-o"></span> \
 //      </button>');
 //   });

angular.module('weatherApp')
  .controller('NavCtrl', function($rootScope, $scope, $state, $document, $location, $modal) {

    senseApp.getAppLayout().then(function(reply){
      $rootScope.reloadTime = reply.layout.qLastReloadTime;
    });


    if (!senseApp) senseApp = qv.openApp(appId, config);


    var global = qv.getGlobal(config);
    global.getAuthenticatedUser(function(reply){
        $scope.curuser = reply.qReturn;
    });

    
    window._location = $location;
    window.scope = $scope;
    window.root = $rootScope;

    $rootScope.seasonClass = "";




    var locationParams = $location.search();

    if (locationParams.bm) {
      senseApp.bookmark.apply(locationParams.bm).then(function(d){
        // console.log(d);
      });
    }


    if (locationParams.cid) {
      // console.log(locationParams.cid);
      setTimeout(
        function(){ angular.element('#'+locationParams.cid).children().scope().zoom();
      }, 2000);
    }

    $scope.currentState = $state.current.name;
    $scope.isCollapsed = {filters: false};
  
    $scope.intro = {
        cs: 'This is a tooltip!',
        leftNav: 'This is the left nav',
        filter: 'Click the filter icon to bring up the menu of filters'
    };

    senseApp.model.getVersion().then(function(e){
      $scope.senseVersion = e.substring(0,3);
    });

    $scope.startIntroJs = function(){
      var intro = introJs();
      intro.setOptions({
        steps: [
          {
            element: '#CurrentSelections',
            intro: "This is the current selections toolbar. Here you will see any filters being applied to the data"
          },
          {
            element: '.filter-dropdown',
            intro: 'Click the filter icon to bring up the menu of filters'
          },
          {
            element:".side-menu",
            intro: "Here is the nav",
            position: 'right'
          },
          {
            element: $('.sense-chart')[0],
            intro: 'Here is a chart!',
            // position: 'left'
          },

        ]
      });

      intro.onbeforechange(function(targetElement) {
        elem = targetElement;
        // console.log(targetElement);
        if (targetElement.dataset.step == 2){
          $scope.show.filterPane = !$scope.show.filterPane;
          // console.log($scope.show.filterPane);
        }
      });

      intro.start();
    };

   
    $scope.resize = function() {
      // qv.resize();
    };

    $scope.expandMenu = function(){
      $('.app-container .content-container .side-menu').addClass('menu-expanded');
      $('.app-container').addClass('expanded');
      $('.navbar-expand-toggle').addClass('fa-rotate-90');
      
    };

    $scope.showSelectionBar = function() {
            $("#chart-body, .app-container .content-container .side-menu").toggleClass("cs-slide");
            $("#selectionBar").toggleClass("hideit");
    }

    $scope.hideMenu = function(){
      $('.app-container .content-container .side-menu').removeClass('menu-expanded');
      $('.app-container').removeClass('expanded');
      $('.navbar-expand-toggle').removeClass('fa-rotate-90');
      $('.navbar-brand .title').removeClass('hidden');
    };

    senseApp.getObject('CurrentSelections','CurrentSelections');

    // senseApp.getObject('chat','JjrbRyz').then(function(d){
    //   console.log(d);
    // });
    // senseApp.getObject('talk','RFUqP');

    senseApp.getObject('CAL02', 'LrdKS');

    senseApp.getList( "BookmarkList", function ( reply ) {
      // console.log(reply);
      $scope.bookmarks = reply.qBookmarkList.qItems;
      var str = "";
      reply.qBookmarkList.qItems.forEach( function ( value ) {
        // console.log(value.qData);
        if ( value.qData.title ) {
          str += '<li><a href="#" data-id="' + value.qInfo.qId + '">' + value.qData.title + '<div class="bm-desc">'+ value.qData.description +  '</div></a><a href="#" data-id="' + value.qInfo.qId + '" data-remove="1" class="remove-bm"><i class="fa fa-fw fa-remove"></i></a></li>';
        }
      } );
      
      str += '<li class="nav-divider"></li><li><a href="#" data-cmd="create">Create a new bookmark</a></li>';

      $( '#qbmlist' ).html( str ).find( 'a' ).on( 'click', function (e) {
        e.preventDefault();
        var id = $( this ).data( 'id' );
        var remove = $( this ).data( 'remove' );
          if ( id ) {
            if(remove){
              senseApp.bookmark.remove(id).then(function(model){
                senseApp.doSave();
              });
            } else {
              senseApp.bookmark.apply( id );
            }
          } else {
            var cmd = $( this ).data( 'cmd' );
            if ( cmd === "create" ) {
              $modal.open({
                templateUrl: 'views/createBmModal.html',
                controller: 'createBmModalCtrl',
                size: 'md',
                scope: $scope
              });
            }
          }
      } );
    } );

    $scope.applyBookmark = function(bookmarkId){
      senseApp.bookmark.apply( bookmarkId );
    };

    $scope.removeBookmark = function(bookmarkId){
      senseApp.bookmark.remove(bookmarkId).then(function(model){
        senseApp.doSave();
      });
    };


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $("[id^=QV-filter]").empty();
      $('.app-container .content-container .side-menu').removeClass('menu-expanded');



    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $scope.currentState = toState.name;
      $scope.parentState = toState.name.split('-')[0];
      $scope.pageName = $state.current.pageName;
      $rootScope.pageId = $state.current.pageId;

      $("[id^=QV-filter]").empty();

    });

    $scope.show = {
      currentSelections: true,
      menu: false,
      filterPane: false
    };


    $scope.collapse = function(menu) {
      $scope.isCollapsed[menu] = !$scope.isCollapsed[menu];
      // console.log($scope.isCollapsed[menu]);
    };


    // Original App Selections
    $scope.selState = senseApp.selectionState();

    $scope.clearAllSelections = function() {
      senseApp.clearAll();
      secondApp.clearAll();
    } 
    $scope.selectedSeason = 'Annual';

////////////////////////////////////////////////////////////////////////////
// Dan's promise
    var fieldSelections = {};
    function getFieldSelections(fieldName,appObject){
        return new Promise(function(resolve, reject){
            if (fieldSelections[fieldName]){
                fieldSelections[fieldName].then(function(reply){
                    resolve(reply.selections);
                })
            } else {
                fieldSelections[fieldName] = appObject.createGenericObject( {
                    selections: {
                        qStringExpression: "=GetFieldSelections(["+fieldName+"],',',1000)"
                    },
                    selectionsCount: {
                        qValueExpression: "=GetSelectedCount(["+fieldName+"])"
                    }
                }).then(function(reply){
                    reply.layoutSubscribe(function(layout){
                        reply.selections = layout.selections == '-' ? [] : layout.selections.split(',');
                        resolve(reply.selections);
                    });
                    return reply;
                })
            }
        });
    };
//////////////////////////////////////////////////////////////////////////////
function syncSelections(){
  senseApp.selections.selections.forEach(function(selection){
    console.log(selections.fieldName, selections.selectedValues.map(function(e){ return e.qName; }))
  });
};

senseApp.model.waitForOpen.promise.then(function(){
  senseApp.selections.OnData.bind(syncSelections);
})
    var prevSelApp1, prevSelApp2;
    senseApp.getList( "SelectionObject", function ( reply ) {
              // console.log(reply);
              var selections = reply.qSelectionObject.qSelections;
              prevSelApp1 = selections;

              console.log("app1 - "+selections);

                
              $scope.selectionsCount = function() {
                    var count = 0;
                    angular.forEach(selections, function(selection){
                        count += selections ? 1 : 0;
                    });
                    return count; 
              }

              if ( selections.length > 0 ) {
                      selections.forEach( function ( value ) {
                          // console.log("app2 - "+prevSelApp2);
                          
                          console.log(value.qSelected);


                        //     // if not selected in app 2
                        // if (prevSelApp2.indexOf(value)<0){
                        //       // manually select the matching field on the second app
                        //       console.log("field is not in app2, manualy select it.");
                              secondApp.field(value.qField).selectMatch(value.qSelected);
                        // } else {
                        //       // filed is in there, check if the value is different.
                        //       console.log("field is in app2, now check if the value is different.");
                        // }




                        // Dan's promise approach
                        // getFieldSelections(value.qField,senseApp).then(function(reply){
                        //     console.log(reply);
                        // });


                        // if season selected - change background img
                        if (value.qField === "Season") {
                          if (typeof value.qSelected !== 'undefined' && value.qSelected.length > 0) {
                            $scope.selectedSeason = value.qSelected;
                          } else {
                            $scope.selectedSeason = 'Annual';
                          }                
                        }                           
                      });
                } else {
                  $scope.selectedSeason = 'Annual';
                }
                
    } );



    // Secondary App Selections
    secondApp.getList( "SelectionObject", function ( reply ) {
      var selectionsApp2 = reply.qSelectionObject.qSelections;

      prevSelApp2 = selectionsApp2;

      if ( selectionsApp2.length > 0 ) {
        selectionsApp2.forEach( function ( value ) {
               //if not seleced in 1
              // if(prevSelApp1.indexOf(value)<0){
              //       // manually select the matching field on the main app
              //       console.log("field is not in app1, manualy select it.");
              //       senseApp.field(value.qField).selectMatch(value.qSelected); 
              //  } else {
              //     // filed is in there, check if the value is different.
              //     console.log("field is selected in app1, now check if the value is different.");
              //  }

              // getFieldSelections(value.qField,secondApp).then(function(reply){
              //   console.log(reply);
              // });
          
        });
      }
    });
      
  })

  .directive('navMenus', function() {
    return {
      templateUrl: 'views/nav.html',
      restrict: 'E',
      controller: 'NavCtrl'
    };
  });
