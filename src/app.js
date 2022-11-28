function displayCurrentTemperature(response) {
  console.log(response.data);
}

let apiKey = "0d38oda45d824a5t0254fbaff5f740bd";
let urlEndpoint = "https://api.shecodes.io/weather/v1/current?";
let query = "New York";
let units = "imperial";
let apiUrl = `${urlEndpoint}query=${query}&key=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayCurrentTemperature);
