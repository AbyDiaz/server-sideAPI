
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#enterCity');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var fiveCard = document.querySelector('#fiveCard');
var fiveDiv = document.querySelector('#fiveDiv');
var now = dayjs().format('MMMM DD, YYYY');


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


//    var fiveUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + name + '&APPID=28d6a72429cf685ec90ed4979e8a1345';
//    console.log(fiveUrl);

}

var formSubmitHandler = function(event) {

    event.preventDefault();

    // get value from input element 
    var city = cityInputEl.value.trim();
    if(city) {
        getWeather(city);
        fiveDay(city);
        cityInputEl.value = '';
    } else {
        alert('Enter a city you dingus');
    }
  
};


var displayWeather = function (weatherData, searchTerm,) {

    // console.log(weatherData);
    // console.log(searchTerm);

    // clear old content
    weatherContainerEl.textContent = '';
    weatherSearchTerm.textContent = searchTerm + ' ' + now;

    
        // need to add in icons for weather
        
        if (weatherData && weatherData.main) {

            var temperature = weatherData.main.temp;
            var temperatureDiv = document.createElement('div');
            temperatureDiv.textContent = 'Temperature: ' + temperature + '°F';
            weatherContainerEl.appendChild(temperatureDiv);

            var tempHigh = weatherData.main.temp_max;
            var tempDiv = document.createElement('div');
            tempDiv.textContent = 'High: ' + tempHigh + '°F';
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
            errorDiv.textContent = 'Enter a city to find see the weather';
            weatherContainerEl.appendChild(errorDiv);
        }
    
};

var fiveDay = function(name) {

    var fiveUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + name + '&APPID=28d6a72429cf685ec90ed4979e8a1345&units=imperial';

    fetch(fiveUrl).then(function(response) {
        response.json().then(function(data) {
            // data.list to access the list of the array
            displayFive(data.list, name);
        });
    });
    
};

var displayFive = function(forecastData, searchTerm) {

    console.log(forecastData);
    console.log(searchTerm);



    // create containers to hold five day weather
    // need to add icons to these also :i
    
    for (let i = 0; i < forecastData.length; i++) {

        var forecast = forecastData[i];

        console.log(forecast);
    }


};



displayWeather();

cityFormEl.addEventListener('submit', formSubmitHandler);

fiveDay();
// make sure to call at bottom or it doesnt let anything else run
displayFive();


