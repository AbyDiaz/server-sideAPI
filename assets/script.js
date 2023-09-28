var getWeather = function(name) {

    // format weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&APPID=28d6a72429cf685ec90ed4979e8a1345&units=imperial';

    // make request to url
   fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
        console.log(data);
    });
   });
};

getWeather('Oxnard');