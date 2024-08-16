function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours >= 12) {
    ampm = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  } else {
    ampm = "AM"; // Initialize ampm for the morning
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let message = `${day}, ${hours}:${minutes}${ampm}`;
  let time = document.querySelector("#time");
  time.innerHTML = message; // the time for searched cities doessnt update.
}
// Does not work:(

// Dark mode based on time of day in city
function changeTheme() {
  if (isNight()) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  changeTheme();
}
// Does not work:(

let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
// Works!

//  Show Current Info
function showCurrentLocationInfo(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(currentApiUrl).then(showSearchedLocationInfo);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationInfo);
});
//Works!

//Gets the date for forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Display Weather Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

    <div class="col-2">
      <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)}</div><img
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="76px"
      /> 
      <div class="weather-forecast-temperatures"> 
  <span class="weather-forecast-temperature-max">${Math.round(
    forecastDay.temp.max
  )}° </span> 
  <span class="weather-forecast-temperature-min">${Math.round(
    forecastDay.temp.min
  )}°</span>
</div>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Forecast API Call
function getForecast(coordinates) {
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let forecastApiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(forecastApiURL).then(displayForecast);
}

// Display search input
function displaySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-results");
  let cityName = searchInput.value.trim(); // Get the city name and remove leading/trailing spaces
  if (cityName !== "") {
    getWeatherForCity(cityName);
  }
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}
let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", displaySearch);
//Works!

function getWeatherForCity(cityName) {
  let units = "imperial";
  let searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(searchApiUrl).then(showSearchedLocationInfo);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getWeatherForCity);
});

// //let celsiusTemperature = null;
//  Show Search Info
function showSearchedLocationInfo(response) {
  let city = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let humidityLevel = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");

  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  celsiusTemperature = response.data.main.temp;

  let h2 = document.querySelector("h2");
  h2.innerHTML = Math.round(celsiusTemperature);

  var span = document.querySelector(".weather-description");
  span.innerHTML = weatherDescription;
  var span = document.querySelector(".humidity-level");
  span.innerHTML = `Humidity ${humidityLevel}%`;
  var span = document.querySelector(".wind-speed");
  span.innerHTML = `Winds ${windSpeed}mp/h`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  updateTime(); // do I need this?

  getForecast(response.data.coord);
}

//function displayFahrenheitTemperature(event) {
// event.preventDefault();
// let temperatureElement = document.querySelector(".searched-temperature");
// celsiusLink.classList.remove("link");
// fahrenheitLink.classList.add("link");

// let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
// temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
// }
// Works!

// function displayCelsiusTemperature(event) {
// event.preventDefault();
// celsiusLink.classList.add("link");
// fahrenheitLink.classList.remove("link");

// let temperatureElement = document.querySelector(".searched-temperature");
// temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }
// Works!

let form = document.querySelector(".search-form");
form.addEventListener("submit", displaySearch);

// let fahrenheitLink = document.querySelector("#tempSymbolF");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//let celsiusLink = document.querySelector("#tempSymbolC");
//celsiusLink.addEventListener("click", displayCelsiusTemperature);

getWeatherForCity("Alaska");
// Works! Although I do not think the time is accurate to Alaska
