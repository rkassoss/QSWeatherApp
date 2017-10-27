angular.module('weatherApp')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  //
  // $locationProvider.html5Mode(true);
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });
  // $locationProvider.hashPrefix('!');
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  // console.log($urlRouterProvider);
  //
  // Now set up the states
  $stateProvider
    .state('splash', {
      url: "/",
      templateUrl: 'views/splash.html',
      controller: 'splashController',
      controllerAs: 'splashController',
      pageId: '9'
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard',
      pageName: 'Temperatures',
      pageId: '1'
    })
    .state('precipitation', {
      url: "/precipitation",
      templateUrl: 'views/precipitation.html',
      controller: 'PrecipitationCtrl',
      pageName: 'Precipitation',
      pageId : '2'
    })
    .state('wind', {
      url: "/wind",
      templateUrl: 'views/wind.html',
      controller: 'WindCtrl',
      pageName: 'Wind Speed & Humidity',
      pageId: '3'
    })
    .state('usa', {
      url: "/usa",
      templateUrl: 'views/usa.html',
      controller: 'USACtrl',
      pageName: 'States Annual & Seasons Measures',
      pageId: '4'
    })
    .state('ad-hoc', {
      url: '/ad-hoc',
      templateUrl: 'views/adhoc.html',
      controller: 'AdHocCtrl',
      pageName: 'Ad-Hoc Analysis',
      pageId: '5'
    })
  ;

});
