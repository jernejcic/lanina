(function() {

  function WeatherCtrl($log, $meteor, $timeout) {
    var self = this;
    self.data = 'Retrieving weather...';

    var getWeather = function(latitude, longitude) {
      $meteor.call('getWeather', latitude, longitude).then(
        function success(data) {
          self.data = JSON.stringify(JSON.parse(data.content), null, 2);
          $log.debug(data);
        },
        function error(err) {
          $log.error(err);
        }
      );
    };

    //navigator.geolocation.getCurrentPosition(getWeather, function(err) { $log.debug(err); });

    var getLocation = function() {
      var loc = Geolocation.currentLocation();
      if (!loc) {
        self.data += '.';
        $timeout(getLocation, 500);
      } else {
        getWeather(loc.coords.latitude, loc.coords.longitude);
      }
    };

    getLocation();
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

