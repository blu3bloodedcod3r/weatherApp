const time = document.getElementById('time');
const date = document.getElementById('date');
const currenWeather = document.getElementById('currentweather-items');
const timeZone = document.getElementById("time-zone");
const country = document.getElementById('country');
const weatherForecast = document.getElementById("weatherforecast")
const currentTemps = document.getElementById("currenttemp");

var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';
var city;
var queryUrl = 'api.openweathermap.org/data/1.0/forecast?q=${city}&limit=3&appid=${APIKey}';
fetch(queryUrl)

setInterval(() => {
    time = moment().format('LTS').innerHTML;

    date = moment().format('ll').innerHTML;

}, 1000)

getWeatherData()

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let city = success.coords;

        fetch(queryUrl)
    })
}