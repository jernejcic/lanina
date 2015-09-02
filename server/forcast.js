Meteor.methods({
  getWeather: function(lat, lng) {
    this.unblock();
    var api = 'https://api.forecast.io/forecast/' + Meteor.settings.forecastApiKey + '/' + lat + ',' + lng;
    return Meteor.http.call('get', api);
  }
});

