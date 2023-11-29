
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#enterCity');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var fiveCard = document.querySelector('#card');
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


var displayWeather = function (weatherData, searchTerm,) {

    // console.log(weatherData);
    // console.log(searchTerm);

    // clear old content
    weatherContainerEl.textContent = '';
    // weatherSearchTerm.textContent = searchTerm + ' ' + now;

    if (searchTerm == null) {
        weatherSearchTerm.textContent = now;
    } else {
        weatherSearchTerm.textContent = searchTerm + ' ' + now;
    }

    
        // need to add in icons for weather
        
        if (weatherData && weatherData.main) {

            // var iconCode = weatherData.weather.icon;
            // var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '.png';
            // console.log(iconUrl);
            // var iconDiv = document.createElement('div');
            // iconDiv.append(iconUrl);
            // weatherContainerEl.appendChild(iconDiv);

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
            displayFive(data, name);
        });
    });

    // var fiveUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + name + '&APPID=28d6a72429cf685ec90ed4979e8a1345&units=imperial';

    // fetch(fiveUrl)
    //     .then(function(response) {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(function(data) {
    //         // Call displayFive with the fetched data
    //         displayFive(data, name);
    //     })
    //     .catch(function(error) {
    //         console.error('Error:', error);
    //         // Handle the error, show a user-friendly message, etc.
    //     });

    
};

var displayFive = function (forecastData, searchTerm) {
    console.log(forecastData);
    console.log(searchTerm);

    for (let i = 0; i < forecastData.list.length; i++){

        var temper = forecastData.list[i].main.temp;
        //console.log(temper);
        var humid = forecastData.list[i].main.humidity;
        var high = forecastData.list[i].main.temp_max;
        var low = forecastData.list[i].main.temp_min;

        var weatherContainer = document.createElement('div');
        weatherContainer.classList = 'card-body';
        fiveCard.appendChild(weatherContainer);
        
        var title = document.createElement('h5');
        title.classList = 'card-title';
        const a = dayjs();
        const b = a.add(0, 'day');
        b.format('MMM, DD');
        title.textContent = b;
        weatherContainer.appendChild(title);

        var temperP = document.createElement('p');
        temperP.classList = 'card-text';
        temperP.textContent = 'Temperature: ' + temper;
        weatherContainer.appendChild(temperP);

        var humidP = document.createElement('p');
        humidP.classList = 'card-text';
        humidP.textContent = 'Humidity: ' + humid;
        weatherContainer.appendChild(humidP);

        var highP = document.createElement('p');
        highP.classList = 'card-text';
        highP.textContent = 'High: ' + high;
        weatherContainer.appendChild(highP);

        var lowP = document.createElement('p');
        lowP.classList = 'card-text';
        lowP.textContent = 'Low: ' + low;
        weatherContainer.appendChild(lowP);

    }    
};


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



displayWeather();

cityFormEl.addEventListener('submit', formSubmitHandler);

fiveDay();
// make sure to call at bottom or it doesnt let anything else run
displayFive();


