//To display current time and date
function formatDateTime(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[currentDate.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//To display a city's weather
function displayCurrentTemperature(response) {
  let cityElement = document.querySelector("#city");
  let dateTimeElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  fahrenheitTemp = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  dateTimeElement.innerHTML = formatDateTime(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.condition.icon}`);
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.city);
  changeMusic(response.data.condition.icon);
  changeBackground(response.data.condition.icon);
}

//Change background according to weather conditon
function changeBackground(icon) {
  if (icon === "clear-sky-day") {
    document.body.style.backgroundImage = "url(src/sun.jpg)";
  } else if (icon === "clear-sky-night") {
    document.body.style.backgroundImage = "url(src/moon.jpg)";
  } else if (icon === "few-clouds-day") {
    document.body.style.backgroundImage = "url(src/cloud-sun.jpg)";
  } else if (icon === "few-clouds-night") {
    document.body.style.backgroundImage = "url(src/cloud-moon.jpg)";
  } else if (icon === "scattered-clouds-day" || icon === "broken-clouds-day") {
    document.body.style.backgroundImage = "url(src/day-cloud.jpg)";
  } else if (
    icon === "scattered-clouds-night" ||
    icon === "broken-clouds-night"
  ) {
    document.body.style.backgroundImage = "url(src/night-cloud.jpg)";
  } else if (
    icon === "shower-rain-day" ||
    icon === "shower-rain-night" ||
    icon === "rain-day" ||
    icon === "rain-night"
  ) {
    document.body.style.backgroundImage = "url(src/rain.jpg)";
  } else if (icon === "thunderstorm-day" || icon === "thunderstorm-night") {
    document.body.style.backgroundImage = "url(src/lightning.jpg)";
  } else if (icon === "snow-day" || icon === "snow-night") {
    document.body.style.backgroundImage = "url(src/snow.jpg)";
  } else if (icon === "mist-day" || icon === "mist-night") {
    document.body.style.backgroundImage = "url(src/mist.jpg)";
  }
}

//Change music in the Spotify playlist
function changeMusic(icon) {
  let playlist = document.querySelector("#playlist");
  if (icon === "clear-sky-day") {
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/track/6dGnYIeXmHdcikdzNNDMm2?utm_source=generator&theme=0`
    );
  } else if (icon === "clear-sky-night") {
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/track/0FDzzruyVECATHXKHFs9eJ?utm_source=generator&theme=0`
    );
  } else if (
    icon === "few-clouds-day" ||
    icon === "few-clouds-night" ||
    icon === "scattered-clouds-day" ||
    icon === "scattered-clouds-night" ||
    icon === "broken-clouds-day" ||
    icon === "broken-clouds-night"
  ) {
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/track/1CKvinIoExZec5pv8OHtzU?utm_source=generator&theme=0`
    );
  } else if (
    icon === "shower-rain-day" ||
    icon === "shower-rain-night" ||
    icon === "rain-day" ||
    icon === "rain-night"
  ) {
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/track/2IvetNzSZMH5gwjInoyr18?utm_source=generator&theme=0`
    );
  } else if (icon === "thunderstorm-day" || icon === "thunderstorm-night") {
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/track/1zB4vmk8tFRmM9UULNzbLB?utm_source=generator&theme=0`
    );
  } else if (icon === "snow-day" || icon === "snow-night") {
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/track/2SrL6XxbWgCZFYJB7qOatl?utm_source=generator&theme=0`
    );
  } else if (icon === "mist-day" || icon === "mist-night") {
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/track/69cIkktQN1ef2VtZuHxNwK?utm_source=generator&theme=0`
    );
  }
}

//For the search engine
function searchCity(city) {
  let apiKey = "0d38oda45d824a5t0254fbaff5f740bd";
  let urlEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let units = "imperial";
  let apiUrl = `${urlEndpoint}query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

//Unit Conversion
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

//For the forecast
function getForecast(city) {
  let apiEndpoint = `https://api.shecodes.io/weather/v1/forecast?query`;
  let apiKey = "0d38oda45d824a5t0254fbaff5f740bd";
  let units = "imperial";
  let apiUrl = `${apiEndpoint}=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div class="forecast-date">${formatDay(forecastDay.time)}</div>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png"
      alt="sunny"
      width="48"
    />
    <div class="forecast-temp">
      <span class="forecast-temp-max">${Math.round(
        forecastDay.temperature.maximum
      )}° /</span>
      <span class="forecast-temp-min">${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Global Variables
let fahrenheitTemp = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

searchCity("New York");
