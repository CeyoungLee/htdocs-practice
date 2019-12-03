const API_KEY = "75b111d42020954d87dd702444406ada";
const COORDS = 'coords';
const weather = document.querySelector(".js-weather");


function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
      .then(function(response){return response.json()})
      .then(function(json){
        console.log(json);
        const temperature = Math.round(json.main.temp);
        const mainWeather = json.weather[0].main;
        const place = json.name;
        weather.innerHTML = `${mainWeather}, ${temperature}\u2103 @ ${place}`
      });
}


function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj =
      {
        latitude,
        longitude
      };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access Geo");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError,)
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    //no geo
    askForCoords();
  } else {
    //yes geo. get weather
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();