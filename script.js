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
    var currentDate = moment().format('ddd, MM-DD-YYYY');

    time.innerHTML = localTime;
    date.innerHTML = currentDate + '<span id="date"></span>';

    //daily dates
    //$('.day1') = moment(currentDate).format('ddd')
}, 200);

//created to be saved for search history
function init () {
    citySearch = JSON.parse(localStorage.getItem("citySearch")) || [];
    createSearchHistory();
};

button.addEventListener('click', function(event) {
    event.preventDefault();
    runWeather(city);
});

const modal = $('#noCityModal').modal('toggle', () => 
    $('#noCityModal').modal('hide')
);

//both API's from openweathermap
function runWeather () {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city.value + '&limit=5&appid=1567899baf64751e46a6d93ae8fa5cd8')
    .then(response =>response.json())
    .then(data => {
    
        let lat = data[0].lat;
        let long = data[0].lon;
        //console.log(data[0])

        (lat === ' ' | null) ? modal :  $('#noCityModal').modal('show')

        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ long + '&units=imperial' + '&appid=1567899baf64751e46a6d93ae8fa5cd8')
            .then(response =>response.json())
            .then(data => {
            //curent info
            //console.log(data)
           let humidity = (data.list[0].main.humidity) | 0
           let pressure = (data.list[0].main.pressure) | 0
           let windSpeed = (data.list[0].wind.speed) | 0
           let dayTemp1 = (data.list[0].main.temp_max) | 0
           let nightTemp1 = (data.list[0].main.temp_min) | 0

            //futurecast info
           let dayTemp2 = (data.list[1].main.temp_max) | 0
           let nightTemp2 = (data.list[1].main.temp_min) | 0
           let humidity2 = (data.list[1].main.humidity) | 0
           let windSpeed2 = (data.list[1].wind.speed) | 0

           let dayTemp3 = (data.list[2].main.temp_max) | 0
           let nightTemp3 = (data.list[2].main.temp_min) | 0
           let humidity3 = (data.list[2].main.humidity) | 0
           let windSpeed3 = (data.list[2].wind.speed) | 0

           let dayTemp4 = (data.list[3].main.temp_max) | 0
           let nightTemp4 = (data.list[3].main.temp_min) | 0
           let humidity4 = (data.list[3].main.humidity) | 0
           let windSpeed4 = (data.list[3].wind.speed) | 0

           let dayTemp5 = (data.list[4].main.temp_max) | 0
           let nightTemp5 = (data.list[4].main.temp_min) | 0
           let humidity5 = (data.list[4].main.humidity) | 0
            let windSpeed5 = (data.list[4].wind.speed) | 0

            let dayTemp6 = (data.list[5].main.temp_max) | 0
            let nightTemp6 = (data.list[5].main.temp_min) | 0
            let humidity6 = (data.list[5].main.humidity) | 0
            let windSpeed6 = (data.list[5].wind.speed) | 0
            //console.log(windSpeed6)

        //jQuery to show on current and futurecast
            $("#humid").html(humidity + ' %');
            $("#press").html(pressure + ' inHg');
            $("#windspeed").html(windSpeed + ' MPH');

            $('.dayTemp1').html('Day - ' + dayTemp1 + '\u00B0 F')
            $('.nightTemp1').html('Night - ' + nightTemp1 + '\u00B0 F')

            $('.dayTemp2').html('Day - ' + dayTemp2 + '\u00B0 F')
            $('.nightTemp2').html('Night - ' + nightTemp2 + '\u00B0 F')
            $("#humid2").html(humidity2 + ' %');
            $("#windspeed2").html(windSpeed2 + ' MPH');

            $('.dayTemp3').html('Day - ' + dayTemp3 + '\u00B0 F')
            $('.nightTemp3').html('Night - ' + nightTemp3 + '\u00B0 F')
            $("#humid3").html(humidity3 + ' %');
            $("#windspeed3").html(windSpeed3 + ' MPH');
            $('.dayTemp4').html('Day - ' + dayTemp4 + '\u00B0 F')
            $('.nightTemp4').html('Night - ' + nightTemp4 + '\u00B0 F')
            $("#humid4").html(humidity4 + ' %');
            $("#windspeed4").html(windSpeed4 + ' MPH');

            $('.dayTemp5').html('Day - ' + dayTemp5 + '\u00B0 F')
            $('.nightTemp5').html('Night - ' + nightTemp5 + '\u00B0 F')
            $("#humid5").html(humidity5 + ' %');
            $("#windspeed5").html(windSpeed5 + ' MPH');

            $('.dayTemp6').html('Day - ' + dayTemp6 + '\u00B0 F')
            $('.nightTemp6').html('Night - ' + nightTemp6 + '\u00B0 F')
            $("#humid6").html(humidity6 + ' %');
            $("#windspeed6").html(windSpeed6 + ' MPH');
        
        });
    });
};

searchedCities= []

function citySearch(city){
    citySearch.push(city);
    localStorage.setItem('citySearch', JSON.stringify(citySearch))
}

function createSearchHistory(){
    if (sideNavHistory.childElementCount > 0) {
        sideNavHistory.innerHTML = "";
    }
    
    for (var i = 0; i < citySearch.length; i++) {
    var historyButton = document.createElement("button");
    historyButton.setAttribute("class", "btn btn-primary mt-3 col-12");
    var historyItem = city[i]
    historyButton.textContent = historyItem;
    sideNavHistory.append(historyButton);
    historyButton.addEventListener("click", extractAddress);
  }
   
}
//console.log(searchedCities)