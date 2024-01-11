const inputCity = document.getElementById("inputCity");
const cityEntered = document.getElementById("city-entered");
const weather = document.getElementById("weather");
const min_temp = document.getElementById("min_temp");
const max_temp = document.getElementById("max_temp");
const speed = document.getElementById("speed");
const degrees = document.getElementById("degrees");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const submitButton = document.getElementById("submit");

let apiRequest = new XMLHttpRequest();

submitButton.addEventListener("click", ($event) => {
  $event.preventDefault();
  const city = inputCity.value;

  apiRequest.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=Your API key"
  );
  apiRequest.send();
});

apiRequest.onreadystatechange = () => {
  if (apiRequest.readyState === 4) {
    const response = JSON.parse(apiRequest.response);

    if (response.cod === "404") {
      cityEntered.style.color = "red";
      cityEntered.style.margin = "7px";
      cityEntered.style.fontSize = "24px";
      cityEntered.textContent = "Invalid City";
      weather.textContent = "";
      min_temp.textContent = "";
      max_temp.textContent = "";
      speed.textContent = "";
      degrees.textContent = "";
      visibility.textContent = "";
      pressure.textContent = "";
    } else {
      cityEntered.style.color = "black";
      cityEntered.style.margin = "7px";
      cityEntered.textContent = inputCity.value;
      weather.textContent = response.weather[0].main;
      min_temp.textContent = (response.main.temp_min-273).toFixed(3) + " °C";
      max_temp.textContent = (response.main.temp_max-273).toFixed(3) + " °C";
      speed.textContent = response.wind.speed + " m/s";
      degrees.textContent = response.wind.deg;
      pressure.textContent = response.main.pressure + " hPa";
      visibility.textContent = response.visibility + " meters";
    }
  }
};