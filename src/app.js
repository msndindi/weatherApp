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
  axios(apiUrl).then(displayForecast);
  // console.log(apiUrl);
}

function formatForecastDay(timestamp) {
  // timestamp can be seconds (number) or an ISO string
  let date;
  if (typeof timestamp === "number") {
    date = new Date(timestamp * 1000);
  } else {
    date = new Date(timestamp);
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  // Accept the forecast API response and build HTML for the first 5 days
  let forecastElement = document.querySelector("#forecast");
  if (!forecastElement) return;

  let forecastHtml = "";

  let daily = response?.data?.daily || [];
  daily.slice(0, 5).forEach(function (day) {
    let dayName = formatForecastDay(day.time || day.datetime || day.date);
    let maxTemp = Math.round(
      day.temperature?.maximum ?? day.temperature?.max ?? 15,
    );
    let minTemp = Math.round(
      day.temperature?.minimum ?? day.temperature?.min ?? 9,
    );
    let iconUrl = day.condition?.icon_url || "";

    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${dayName}</div>
        <div class="weather-forecast-icon">${
          iconUrl ? `<img src="${iconUrl}" alt="icon">` : "🌥️"
        }</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${maxTemp}°</strong>
          </div>
          <div class="weather-forecast-temperature">${minTemp}°</div>
        </div>
      </div>
    `;
  });

  forecastElement.innerHTML = forecastHtml;
}


// function displayForecastDemo() {
//   // Render demo forecast (no API required)
//   let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
//   let forecastElement = document.querySelector("#forecast");
//   if (!forecastElement) return;

//   let forecastHtml = "";
//   days.forEach(function (day) {
//     forecastHtml += `
//       <div class="weather-forecast-day">
//         <div class="weather-forecast-date">${day}</div>
//         <div class="weather-forecast-icon">🌥️</div>
//         <div class="weather-forecast-temperatures">
//           <div class="weather-forecast-temperature">
//             <strong>15°</strong>
//           </div>
//           <div class="weather-forecast-temperature">9°</div>
//         </div>
//       </div>
//     `;
//   });

//   forecastElement.innerHTML = forecastHtml;
// }

searchCity("Oslo"); // Default city when the page loads
// displayForecastDemo(); // Show demo forecast first
