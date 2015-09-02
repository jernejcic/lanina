(function() {

  function WeatherCtrl($log, $meteor) {
    var self = this;
    self.data = 'Retrieving weather...';

    var getWeather = function(position) {
      $meteor.call('getWeather', position.coords.latitude, position.coords.longitude).then(
        function success(data) {
          self.data = JSON.stringify(JSON.parse(data.content), null, 2);
          $log.debug(data);
        },
        function error(err) {
          $log.error(err);
        }
      );
    };

    navigator.geolocation.getCurrentPosition(getWeather, function(err) { $log.debug(err); });
  }

  angular.module('lanina.weather', [
    'ui.router'
  ])
  .config(function ($stateProvider) {
    $stateProvider.state('weather', {
      url: '/weather',
      views: {
        'main': {
          controllerAs: 'weatherctrl',
          controller: 'WeatherCtrl',
          templateUrl: 'client/weather/weather.ng.html'
        }
      },
      data: {
        pageTitle: 'Weather'
      }
    });
  })
  .controller('WeatherCtrl', WeatherCtrl)
  ;

})();

