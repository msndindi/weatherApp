function refreshWeatherData(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let temperature =temperatureElement.innerHTML;
  
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "00fd2534b306ca4ac44778fc7b36o08t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeatherData);
}

function handleSearchSubmission(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  
  searchCity(searchInputElement.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearchSubmission);


searchCity("Paris"); // Default city when the page loads