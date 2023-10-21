var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#enterCity');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');

var getWeather = function(name) {

    // format weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&APPID=28d6a72429cf685ec90ed4979e8a1345&units=imperial';

//     // make request to url
//    fetch(apiUrl).then(function(response) {
//     response.json().then(function(data) {
//         displayWeather(data, name);
//     });
//    });
fetch(apiUrl)
.then(function(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(function(data) {
    // Check if the 'coord' property exists in the response
    if (data && data.coord) {
        displayWeather(data, name);
    } else {
        throw new Error('Invalid data format received from the API');
    }
})
.catch(function(error) {
    console.error('Error:', error);
    // Handle the error, show a user-friendly message, etc.
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

var displayWeather = function (weatherData, searchTerm,) {

    console.log(weatherData);
    console.log(searchTerm);

    // clear old content
    weatherContainerEl.textContent = '';
    weatherSearchTerm.textContent = searchTerm;
    
    

        // Check if weatherData contains 'main' property
        // H2 needs to be searchterm and current date .... use day.js
        // need to add in icons for weather
        
        if (weatherData && weatherData.main) {

            var temperature = weatherData.main.temp;
            var temperatureDiv = document.createElement('div');
            temperatureDiv.textContent = 'Temperature: ' + temperature + '°F';
            weatherContainerEl.appendChild(temperatureDiv);

            var tempHigh = weatherData.main.temp_max;
            var tempDiv = document.createElement('div');
            tempDiv.textContent = ' High: ' + tempHigh + '°F';
            weatherContainerEl.appendChild(tempDiv);

            var tempLow = weatherData.main.temp_min;
            var lowDiv = document.createElement('div');
            lowDiv.textContent = ' Low: ' + tempLow + '°F';
            weatherContainerEl.appendChild(lowDiv);

            var wind = weatherData.wind.speed;
            var windDiv = document.createElement('div');
            windDiv.textContent = ' Wind: ' + wind + ' MPH';
            weatherContainerEl.appendChild(windDiv);

            var humidity = weatherData.main.humidity;
            var humDiv = document.createElement('div');
            humDiv.textContent = ' Humidity: ' + humidity + ' %';
            weatherContainerEl.appendChild(humDiv);


        } else {
            // Handle the case where 'main' property is not available in the response
            var errorDiv = document.createElement('div');
            errorDiv.textContent = 'Weather data not available for the specified location.';
            weatherContainerEl.appendChild(errorDiv);
        }
    
};



displayWeather();

cityFormEl.addEventListener('submit', formSubmitHandler);

//getWeather('Oxnard');