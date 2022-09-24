const time = document.getElementById('time');
const date = document.getElementById('date');
const button = document.querySelector('button');
const currenWeather = document.getElementById('currentweather-items');
const weatherForecast = document.getElementById("weatherforecast")
const currentTemps = document.getElementById("currenttemp");
const city = document.getElementById('city');

var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';

setInterval(() => {
    var localTime = moment().format("hh:mm");
    var currentDate = moment().format('MM-DD-YYYY');

    time.innerHTML = localTime + '<span id="am-pm">PM</span>';
    date.innerHTML = currentDate + '<span id="date"></span>'

}, 1000)

button.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city.value  + '&limit=5&appid=1567899baf64751e46a6d93ae8fa5cd8')
    .then(response =>response.json())
    .then(data => {
        var long = data[0].lon
        var lat = data[0].lat
        // console.log(data)
        // console.log(data[0].lat)
        // console.log(data[0].lon)
    
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ long + '&appid=1567899baf64751e46a6d93ae8fa5cd8')
    .then(response =>response.json())
    .then(data => {
        
        var humidity= data.main.humidity
        var pressure = data.main.pressure
        var windSpeed = data.wind.speed

        // console.log(data)
        // console.log(data.main.humidity)

        // console.log(humidity)
        // console.log(pressure)
        // console.log(windSpeed)
    })
    
    })
})

