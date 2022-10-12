const time = document.getElementById('time');
const date = document.getElementById('date');
const button = document.querySelector('button');
const currentWeather = document.getElementById('currentweatheritems');
const weatherForecast = document.getElementById("weatherforecast")
const currentTemps = document.getElementById("currenttemp");
let city = document.getElementById('cityinput');
let viewedCity= city.value;


var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';

setInterval(() => {
    var localTime = moment().format("hh:mm A");
    var currentDate = moment().format('ddd, MM-DD-YYYY');

    time.innerHTML = localTime;
    date.innerHTML = currentDate + '<span id="date"></span>';
}, 200);

button.addEventListener('click', function(event) {
    event.preventDefault();

    viewedCity = city.value;
    runWeather(viewedCity);

    updatedHistory(viewedCity);
    //console.log(updatedHistory(viewedCity))
});

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
            

                for (let i = 0; i < data.list.length; i += 8) {
                    let day = (data.list[i].dt_txt);
                    let humidity = (data.list[i].main.humidity) | 0;
                    let pressure = (data.list[i].main.pressure) | 0;
                    let windSpeed = (data.list[i].wind.speed) | 0;
                    let dayTemp = (data.list[i].main.temp_max) | 0;
                    let nightTemp = (data.list[i].main.temp_min) | 0;
                    //console.log(data.list)
                    
                    day[i]= [
                            $('.day' + [i]).html(day.split('03:00:00').join('00:00:00').split('06:00:00').join('00:00:00').split('09:00:00').join('00:00:00').split('00:00:00')),
                            $("#humid" + [i]).html(humidity + ' %'),
                            $("#press" + [i]).html(pressure + ' inHg'),
                            $("#windspeed" + [i]).html(windSpeed + ' MPH'),
                            $('.dayTemp' + [i]).html('Day: ' + dayTemp + '\u00B0 F'),
                            $('.nightTemp' + [i]).html('Night: ' + nightTemp + '\u00B0 F')
                        ]
                    
                    //console.log(day[i])
                };    
        });
        
    }) .catch((err) => {
        console.error(err)
        alert('Please enter a location')
    });
};

let searchedCities = []; 
console.log(searchedCities)


function updatedHistory () {
    searchedCities.push(viewedCity);
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
    createSearchHistory();
};

function createSearchHistory(){

    let cityButton = document.createElement('button');
    cityButton.innerHTML = viewedCity;
    
    const searchHistory = document.querySelector('.search_history');
    //append buttons to the page
    searchHistory.appendChild(cityButton);
    //add event listener to each button
    cityButton.addEventListener('click', function(event){
        event.preventDefault();
        runWeather(viewedCity);
    }
)};
