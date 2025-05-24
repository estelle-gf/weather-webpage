function changeWeather(response) {
  let temperature = response.data.temperature.current;
  let roundedTemperature = Math.round(temperature);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
    src= "${response.data.condition.icon_url}"
    class="weather-icon"/>`;

  temperatureElement.innerHTML = roundedTemperature;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "2a99380b94355b9foa25076te09bd049";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city");

  searchCity(searchInput.value);
}

function correctDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "2a99380b94355b9foa25076te09bd049";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${correctDay(day.time)}</div>
          <div > <img src="${
            day.condition.icon_url
          }" class="weather-forecast-icon"/></div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.maximum
            )}°C</div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°C</div>
          </div>
        </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

searchCity("London");
