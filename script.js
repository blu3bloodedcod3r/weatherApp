const time = document.getElementById('time');
const date = document.getElementById('date');
const button = document.querySelector('button');
const currentWeather = document.getElementById('currentweatheritems');
const weatherForecast = document.getElementById("weatherforecast")
const currentTemps = document.getElementById("currenttemp");
const city = document.getElementById('city');
const humid = document.querySelector("#humid");
const press = document.querySelector('#press');
const windspeed = document.querySelector('#windspeed');
const dayTemp1 = document.querySelector("#dayTemp1")
const searchedCities = document.querySelector("#city");

var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';

setInterval(() => {
    var localTime = moment().format("hh:mm A");
    var currentDate = moment().format('MM-DD-YYYY');

    time.innerHTML = localTime
    date.innerHTML = currentDate + '<span id="date"></span>'

}, 500);

runWeather();

//created to be saved for search history
function init () {
    searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
    //createHistory();
};

button.addEventListener('click', function(event) {
    event.preventDefault();
    //createHistory();
    //if statement to activate modal when city is empty
    if (city === ' ') {
        $('noCityModal#').modal('show')
           return;
      } ;

});

//both API's from openweathermap
function runWeather () {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city.value + '&limit=5&appid=1567899baf64751e46a6d93ae8fa5cd8')
    .then(response =>response.json())
    .then(data => {
  
        console.log(data)
        var long = data[0].lon
        var lat = data[0].lat
        //console.log(data[0])
        //console.log(long)
        //console.log(lat)
    }) 

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ long + '&appid=1567899baf64751e46a6d93ae8fa5cd8')
    .then(response =>response.json())
    .then(data => {
        var humidity= data.main.humidity
        var pressure = data.main.pressure
        var windSpeed = data.wind.speed
        var dayTemp = data.main[4]
        var nightTemp = data.main[5]
        //var todaysTempDay= data.temp.currentDate
        //var tonightsTemp = data.temp.tonight
        //console.log(data)
        //console.log(humidity)
        //console.log(pressure)

        humid.innerHTML= humidity + ' %';
        press.innerHTML = pressure + ' inHg';
         windspeed.innerHTML = windSpeed + ' MPH';
        dayTemp1.innerHTML = dayTemp + 'F'
        //currentWeather.innerHTML = 

        //to be set to local storage for current weather
        localStorage.setItem('humidity', humid)
        localStorage.setItem('pressure', press)
        localStorage.setItem('windspeed', windSpeed)
    });
}


