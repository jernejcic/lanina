(function() {

  angular.module('lanina', [
    'angular-meteor',
    'ui.router',
    'lanina.weather'
  ])
  .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/weather');
  })
  ;

})();

