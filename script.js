const time = document.getElementById('time');
const date = document.getElementById('date');
const button = document.querySelector('button');
const currentWeather = document.getElementById('currentweatheritems');
const weatherForecast = document.getElementById("weatherforecast")
const currentTemps = document.getElementById("currenttemp");
const city = document.getElementById('cityinput');
const humid = document.querySelector("#humid");
const press = document.querySelector('#press');
const windspeed = document.querySelector('#windspeed');
const searchedCities = document.querySelector("#city");

var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';

setInterval(() => {
    var localTime = moment().format("hh:mm A");
    var currentDate = moment().format('MM-DD-YYYY');

    time.innerHTML = localTime
    date.innerHTML = currentDate + '<span id="date"></span>'

}, 500);

//created to be saved for search history
function init () {
    searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
    //createHistory();
};

button.addEventListener('click', function(event) {
    event.preventDefault();
    runWeather(city);
    if (city === ' ') {
        return $('#noCitymodal').modal('toggle');
     };
    //if statement to activate modal when city is empty
    
     $('#noCityModal').on('toggle')
        
    createHistory();
});

//both API's from openweathermap
function runWeather () {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city.value + '&limit=5&appid=1567899baf64751e46a6d93ae8fa5cd8')
    .then(response =>response.json())
    .then(data => {
  
        let lat = data[0].lat;
        let long = data[0].lon;
        //console.log(data[0])

        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ long + '&units=imperial' + '&appid=1567899baf64751e46a6d93ae8fa5cd8')
            .then(response =>response.json())
            .then(data => {
            //curent info
           let humidity = data.list[0].main.humidity
           let pressure = data.list[0].main.pressure
           let windSpeed = data.list[0].wind.speed
           let dayTemp1 = data.list[0].main.temp_max
           let nightTemp1 = data.list[0].main.temp_min

            //futurecast info
           let dayTemp2 = data.list[1].main.temp_max
           let nightTemp2 = data.list[1].main.temp_min
           let dayTemp3 = data.list[2].main.temp_max
           let nightTemp3 = data.list[2].main.temp_min
           let dayTemp4 = data.list[3].main.temp_max
           let nightTemp4 = data.list[3].main.temp_min
           let dayTemp5 = data.list[4].main.temp_max
           let nightTemp5 = data.list[4].main.temp_min
            //console.log(data.list)

        //jQuery to show on current and futurecast
            $("#humid").html(humidity + ' %');
            $("#press").html(pressure + ' inHg');
            $("#windspeed").html(windSpeed + ' MPH');

            //currrently not showing 
            $('.dayTemp1').html('Day - ' + dayTemp1 + '\u00B0 F')
            $('.nightTemp1').html('Night - ' + nightTemp1 + '\u00B0 F')
            $('.dayTemp2').html('Day - ' + dayTemp2 + '\u00B0 F')
            $('.nightTemp2').html('Night - ' + nightTemp2 + '\u00B0 F')
            $('.dayTemp3').html('Day - ' + dayTemp3 + '\u00B0 F')
            $('.nightTemp3').html('Night - ' + nightTemp3 + '\u00B0 F')
            $('.dayTemp4').html('Day - ' + dayTemp4 + '\u00B0 F')
            $('.nightTemp4').html('Night - ' + nightTemp4 + '\u00B0 F')
            $('.dayTemp5').html('Day - ' + dayTemp5 + '\u00B0 F')
            $('.nightTemp5').html('Night - ' + nightTemp5 + '\u00B0 F')

         //to be set to local storage for current weather
        localStorage.setItem('humidity', humid)
        localStorage.setItem('pressure', press)
        localStorage.setItem('windspeed', windSpeed)
        localStorage.setItem('dayTemp1', $(dayTemp1))
        localStorage.setItem('nightTemp1', $(nightTemp1))
        
        });
    });
};

function createHistory(city){
    //city.createElement('button')
    localStorage.getItem(city)
}