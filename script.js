var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';
var city;
var state;
var queryUrl = 'api.openweathermap.org/data/1.0/forecast?q=' + city + state + '&limit=3' + '&appid=' + APIKey;

//fetch(queryUrl)