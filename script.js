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
                    let day = (data.list[i].dt_txt  += [7]);
                    let humidity = (data.list[i].main.humidity) | 0;
                    let pressure = (data.list[i].main.pressure) | 0;
                    let windSpeed = (data.list[i].wind.speed) | 0;
                    let dayTemp = (data.list[i].main.temp_max) | 0;
                    let nightTemp = (data.list[i].main.temp_min) | 0;
                        //console.log(day)
                    console.log(data.list)
                
                    return    day[0]= [
                            $('.day').html(day[i += 7]),
                            $("#humid").html(humidity + ' %'),
                            $("#press").html(pressure + ' inHg'),
                            $("#windspeed").html(windSpeed + ' MPH'),
                            $('.dayTemp').html('Day: ' + dayTemp + '\u00B0 F'),
                            $('.nightTemp').html('Night: ' + nightTemp + '\u00B0 F')
                        ],

                        day[7]= [
                            $('.day').html(day),
                            $("#humid").html(humidity + ' %'),
                            $("#press").html(pressure + ' inHg'),
                            $("#windspeed").html(windSpeed + ' MPH'),
                            $('.dayTemp').html('Day: ' + dayTemp + '\u00B0 F'),
                            $('.nightTemp').html('Night: ' + nightTemp + '\u00B0 F'),
                            
                        ]
                };    

                    //$('.dayTemp2').html('Day - ' + dayTemp + '\u00B0 F'),
                    //$('.nightTemp2').html('Night - ' + nightTemp + '\u00B0 F'),
                    //$("#humid2").html(humidity + ' %'),
                    //$("#windspeed2").html(windSpeed + ' MPH'),
                
                    //$('.dayTemp3').html('Day - ' + dayTemp + '\u00B0 F'),
                    //$('.nightTemp3').html('Night - ' + nightTemp + '\u00B0 F'),
                    //$("#humid3").html(humidity + ' %'),
                    //$("#windspeed3").html(windSpeed + ' MPH'),
                    //$('.dayTemp4').html('Day - ' + dayTemp + '\u00B0 F'),
                    //$('.nightTemp4').html('Night - ' + nightTemp + '\u00B0 F'),
                    //$("#humid4").html(humidity + ' %'),
                    //$("#windspeed4").html(windSpeed + ' MPH'),

                    // $('.dayTemp5').html('Day - ' + dayTemp + '\u00B0 F'),
                    //$('.nightTemp5').html('Night - ' + nightTemp + '\u00B0 F'),
                    //$("#humid5").html(humidity + ' %'),
                    //$("#windspeed5").html(windSpeed + ' MPH'),

                    //$('.dayTemp6').html('Day - ' + dayTemp + '\u00B0 F'),
                    //$('.nightTemp6').html('Night - ' + nightTemp + '\u00B0 F'),
                    //$("#humid6").html(humidity + ' %'),
                    // $("#windspeed6").html(windSpeed + ' MPH'),
               

           //console.log(dayTemp)
            //futurecast info
           //let dayTemp2 = (data.list[1].main.temp_max) | 0
           //let nightTemp2 = (data.list[1].main.temp_min) | 0
           //let humidity2 = (data.list[1].main.humidity) | 0
           //let windSpeed2 = (data.list[1].wind.speed) | 0

           //let dayTemp3 = (data.list[2].main.temp_max) | 0
           //let nightTemp3 = (data.list[2].main.temp_min) | 0
           //let humidity3 = (data.list[2].main.humidity) | 0
           //let windSpeed3 = (data.list[2].wind.speed) | 0

           //let dayTemp4 = (data.list[3].main.temp_max) | 0
           //let nightTemp4 = (data.list[3].main.temp_min) | 0
           //let humidity4 = (data.list[3].main.humidity) | 0
           //let windSpeed4 = (data.list[3].wind.speed) | 0

           //let dayTemp5 = (data.list[4].main.temp_max) | 0
           //let nightTemp5 = (data.list[4].main.temp_min) | 0
           //let humidity5 = (data.list[4].main.humidity) | 0
            //let windSpeed5 = (data.list[4].wind.speed) | 0

            //let dayTemp6 = (data.list[5].main.temp_max) | 0
            //let nightTemp6 = (data.list[5].main.temp_min) | 0
            //let humidity6 = (data.list[5].main.humidity) | 0
            //let windSpeed6 = (data.list[5].wind.speed) | 0


            //console.log(windSpeed6)

        //jQuery to show on current and futurecast
          //  $("#humid").html(humidity + ' %');
          //  $("#press").html(pressure + ' inHg');
           // $("#windspeed").html(windSpeed + ' MPH');

          // $('.dayTemp').html('Day - ' + dayTemp1 + '\u00B0 F')
           // $('.nightTemp').html('Night - ' + nightTemp1 + '\u00B0 F')
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