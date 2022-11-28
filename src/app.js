function displayCurrentTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "0d38oda45d824a5t0254fbaff5f740bd";
let urlEndpoint = "https://api.shecodes.io/weather/v1/current?";
let query = "New York";
let units = "imperial";
let apiUrl = `${urlEndpoint}query=${query}&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayCurrentTemperature);
