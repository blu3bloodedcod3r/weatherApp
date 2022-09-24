const time = document.getElementById('time');
const date = document.getElementById('date');
button = document.querySelector('button');
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

button.addEventListener('click', function() {
    fetch('api.openweathermap.org/data/1.0/forecast?&q='+city.value+'&limit=5&unit=imperial&appid=$' + APIKey)
    .then(response =>response.json())
    .then(data => {
        
        var humidity= data['main']['humidity'].document.getElementById('humid')
        var pressure = data['main']['pressure'].document.getElementById('press')
        city = data['windspeed']

        console.log(humidity)
        console.log(pressure)
    })

    .catch(err => alert('wrong city name'))
})

