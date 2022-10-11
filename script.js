const time = document.getElementById('time');
const date = document.getElementById('date');
const button = document.querySelector('button');
const currentWeather = document.getElementById('currentweatheritems');
const weatherForecast = document.getElementById("weatherforecast")
const currentTemps = document.getElementById("currenttemp");
let city = document.getElementById('cityinput');
//let searchedCities = document.querySelector("#city");

var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';

setInterval(() => {
    var localTime = moment().format("hh:mm A");
    var currentDate = moment().format('ddd, MM-DD-YYYY');

    time.innerHTML = localTime;
    date.innerHTML = currentDate + '<span id="date"></span>';
}, 200);

button.addEventListener('click', function(event) {
    event.preventDefault();
    runWeather(city.value);
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
                            $('.day' + [i]).html(day.split('09:00:00')),
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

    //console.log(fetch2)
};

//history buttons creations
let searchedCities = []; 

function createSearchHistory(){

    //create buttons for each city searched
    let cityButton = document.createElement('button');
    cityButton.textContent = city.value;

    //append buttons to the page
    document.getElementById('city').appendChild(cityButton);

    //add event listener to each button
    cityButton.addEventListener('click', function(event){
        event.preventDefault();
        runWeather(cityButton.textContent);
    }
)};

let viewedCity = city.value;

//created to be saved for search history
function updatedHistory () {
    
    localStorage.setItem('viewedCity', JSON.stringify(searchedCities));
    createSearchHistory();
    //console.log(viewedCity)
};

//sotrage
function citySearch(){
    searchedCities.push(viewedCity);
    localStorage.setItem('viewedCity', JSON.stringify(viewedCity));
    console.log(searchedCities)
    createSearchHistory();
};