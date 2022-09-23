const time = document.getElementById('time');
const date = document.getElementById('date');
const currenWeather = document.getElementById('currentweather-items');
const timeZone = document.getElementById("time-zone");
const country = document.getElementById('country');
const weatherForecast = document.getElementById("weatherforecast")
const currentTemps = document.getElementById("currenttemp");
const city = document.getElementById('city');

var APIKey = '1567899baf64751e46a6d93ae8fa5cd8';

setInterval(() => {
    var localTime = moment().format("hh:mm");

    time.innerHTML = localTime + '<span id="am-pm">PM</span>';
    date.innerHTML = moment().format('mmm-dd-yyyy');

}, 1000)

getWeatherData()

function getWeatherData(data) {
    navigator.geolocation.getCurrentPosition((success) => {
    
        let {latitude, longitude} = success.corrds;

        fetch('api.openweathermap.org/data/1.0/forecast?lat=${latitude}&lon=${longitude}&q=${city}&limit=37unit=imperial&appid=${APIKey}')
            .then(response =>response.json())
            .then(data => {
                console.log(data)
            })
        .catch(err => alert('wrong city name'))


    })
}