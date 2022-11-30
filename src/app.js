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

function displayCurrentTemperature(response) {
  let cityElement = document.querySelector("#city");
  let dateTimeElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.city;
  dateTimeElement.innerHTML = formatDateTime(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.condition.icon}`);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "0d38oda45d824a5t0254fbaff5f740bd";
let urlEndpoint = "https://api.shecodes.io/weather/v1/current?";
let query = "New York";
let units = "imperial";
let apiUrl = `${urlEndpoint}query=${query}&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayCurrentTemperature);
