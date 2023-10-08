var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#enterCity');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');

var getWeather = function(name) {

    // format weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&APPID=28d6a72429cf685ec90ed4979e8a1345&units=imperial&main=main.temp';

    // make request to url
   fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
        displayWeather(data, name);
    });
   });
};

var formSubmitHandler = function(event) {

    event.preventDefault();

    // get value from input element 
    var city = cityInputEl.value.trim();
    if(city) {
        getWeather(city);
        cityInputEl.value = '';
    } else {
        alert('Enter a city you dingus');
    }
  
};

var displayWeather = function (weather, searchTerm) {
    console.log(weather);
    console.log(searchTerm);

    // clear old content
    weatherContainerEl.textContent = '';
    weatherSearchTerm.textContent = searchTerm;

    // loop over info
    

        // format weather info
        var weatherStuff = JSON.stringify(weather);

        // create container for weather info
        var info = document.createElement('div');
        info.classList = "justify-space-between align-center";

        // create span to hold weather 
        var titleEl = document.createElement('span');
        titleEl.textContent = weatherStuff;

        // append to container
        info.appendChild(titleEl);

        // append container to DOM
        weatherContainerEl.appendChild(info);
     

    
};

displayWeather();

cityFormEl.addEventListener('submit', formSubmitHandler);

//getWeather('Oxnard');