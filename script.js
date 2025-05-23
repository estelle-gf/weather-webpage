function changeWeather(response) {
  console.log(response);
  let temperature = response.data.temperature.current;
  let roundedTemperature = Math.round(temperature);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = roundedTemperature;
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
let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
