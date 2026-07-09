function refreshWeatherData(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let temperature = temperatureElement.innerHTML;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}% `;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  // let date = new Date(response.data.time * 1000);
  // let timeElement = document.querySelector("#time");
  // timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="Weather Icon">`;
  console.log(response.data);

  getCityLocalTime(response.data.coordinates);
  getForecast(response.data.city);
}

// function formatDate(date) {

//   let hours = date.getHours();
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   let minutes = date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[date.getDay()];
//   return `${day} ${hours}:${minutes} ,`;

function displayCityLocalTime(response) {
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = `${response.data.dayOfWeek} ${response.data.time}`;

  console.log(response.data);
}

function getCityLocalTime(coordinates) {
  let timeApiUrl = `https://timeapi.io/api/time/current/coordinate?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`;
  axios.get(timeApiUrl).then(displayCityLocalTime);
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

function getForecast(city) {
  let apiKey = "00fd2534b306ca4ac44778fc7b36o08t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  // console.log(apiUrl);


}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Oslo"); // Default city when the page loads
// getForecast("Oslo"); // Fetch forecast for the default city