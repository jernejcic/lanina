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

  function onReady() {
      angular.bootstrap(document, ['lanina']);
  }

  if (Meteor.isCordova)
      angular.element(document).on("deviceready", onReady);
  else
      angular.element(document).ready(onReady);

})();

