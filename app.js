import { weekDays } from "./utils/customDate.js";
import getWeather from "./utils/httpReq.js";
import { removeAlert, showAlert } from "./utils/modal.js";

const input = document.querySelector("input");
const button = document.querySelector("button");
const divContainer = document.querySelector("#weather");
const forecastContainer = document.querySelector("#forecast");
const locationIcon = document.querySelector("#location");
const modalButton = document.querySelector("#modal-button");

const renderCurrentData = (data) => {
  
  if (!data) return;

  const { name, sys, main, weather, wind } = data;
  const weatherJsx = `
          <h1>${name}, ${sys.country}</h1>
          <div id="main">
          <img alt="weather icon" src="https://openweathermap.org/img/wn/${
            weather[0].icon
          }.png"/>
          <p>${weather[0].main}</p>
          <span>${Math.round(main.temp)} °C</span>
          </div>
          <div id="info">
                <p>Humidity: <span>${main.humidity} %</span></p>
                <p>Wind speed: <span>${wind.speed} m/s</span></p>
          </div>
  `;
  divContainer.innerHTML = weatherJsx;
};

const renderForeCastWeather = (data) => {
  if (!data) return;
  
  forecastContainer.innerHTML = "";
  
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const foreCastJsx = `
      <div>
       <img alt="weather icon" src="https://openweathermap.org/img/wn/${
         i.weather[0].icon
       }.png"/>
       <h3>${weekDays(i.dt)}</h3>
       <p>${Math.round(i.main.temp)}</p>
       <span>${i.weather[0].main} °C</span>
       </div>
      `;
    console.log(i);
    forecastContainer.innerHTML += foreCastJsx;
  });
  console.log(data);
};

const searchHandler = async () => {
  const inputValue = input.value;
  if (!inputValue) {
    showAlert("Please enter city name");
  }
  const currenData = await getWeather("current", inputValue);
  renderCurrentData(currenData);
  const foreCast = await getWeather("forecast", inputValue);
  renderForeCastWeather(foreCast);
};

const currentPositionCallback = async (postion) => {
  const currentData = await getWeather("current", postion.coords);
  renderCurrentData(currentData);
};

const errorCallback = (error) => {
  showAlert(error.message);
};


const locationHandler = () => {
  console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      currentPositionCallback,
      errorCallback
    );
  } else {
    showAlert("Your browser doesnt supprot geolocation");
  }
};

const initHandler = async () => {
  const currenData = await getWeather("current", "tehran");
  renderCurrentData(currenData);
  const foreCast = await getWeather("forecast", "tehran");
  renderForeCastWeather(foreCast);
};

button.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeAlert);
document.addEventListener("DOMContentLoaded", initHandler);
