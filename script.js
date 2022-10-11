const time = document.getElementById('time');
const date = document.getElementById('date');
const button = document.querySelector('button');
const currentWeather = document.getElementById('currentweatheritems');
const weatherForecast = document.getElementById("weatherforecast")
const currentTemps = document.getElementById("currenttemp");
let city = document.getElementById('cityinput');
//let humid = document.querySelector("#humid");
//let press = document.querySelector('#press');
//let windspeed = document.querySelector('#windspeed');
//let searchedCities = document.querySelector("#city");

var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';

setInterval(() => {
    var localTime = moment().format("hh:mm A");
    var currentDate = moment().format('ddd, MM-DD-YYYY');

    time.innerHTML = localTime;
    date.innerHTML = currentDate + '<span id="date"></span>';
}, 200);

//created to be saved for search history
function init () {
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities))
    createSearchHistory();
};

button.addEventListener('click', function(event) {
    event.preventDefault();
    //console.log(city.value);
    runWeather(city.value);
    citySearch()
});

let searchedCities = [];
//console.log(searchedCities)

let viewedCity = localStorage.setItem('city', JSON.stringify(city))

//both API's from openweathermap
function runWeather (cityName) {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=1567899baf64751e46a6d93ae8fa5cd8')
    .then(response =>response.json())
    .then(data => {

        let lat = data[0].lat;
        let long = data[0].lon;
        //console.log(data[0])
  

        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ long + '&units=imperial' + '&appid=1567899baf64751e46a6d93ae8fa5cd8')
            .then(response =>response.json())
            .then(data => {
            
           // how to extract data from api, curent info
            

                for (let i = 0; i < data.list.length; i += 7) {
                    let day = (data.list[i].dt_txt);
                    let humidity = (data.list[i].main.humidity) | 0;
                    let pressure = (data.list[i].main.pressure) | 0;
                    let windSpeed = (data.list[i].wind.speed) | 0;
                    let dayTemp = (data.list[i].main.temp_max) | 0;
                    let nightTemp = (data.list[i].main.temp_min) | 0;
                        //console.log(day)
                    //console.log(data.list)
                    
                    day[i]= [
                            $('.day' + [i]).html(day.split('06:00:00')),
                            $("#humid" + [i]).html(humidity + ' %'),
                            $("#press" + [i]).html(pressure + ' inHg'),
                            $("#windspeed" + [i]).html(windSpeed + ' MPH'),
                            $('.dayTemp' + [i]).html('Day: ' + dayTemp + '\u00B0 F'),
                            $('.nightTemp' + [i]).html('Night: ' + nightTemp + '\u00B0 F')
                        ]
                    console.log(day)
                };    
        });
        
    }) .catch((err) => {
        console.error(err)
        alert('Please enter a location')
    });

    //console.log(fetch2)
};

function citySearch(city){
    //console.log(city)
    searchedCities.push(city);
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities))
    //console.log(searchedCities)
};

//console.log(citySearch())

function createSearchHistory(city){
    if (search_history.childElementCount > 0) {
        search_history.innerHTML = "";
    };

    for (let i = 0; i < citySearch.length; i++) {
    const historyButton = document.createElement("button");
    historyButton.setAttribute("class", "btn btn-primary mt-3 col-12");
    let historyItem = city
    historyButton.textContent = historyItem;
    search_history.append(historyButton);
    historyButton.addEventListener("click", city);
  };


};
//console.log(searchedCities)