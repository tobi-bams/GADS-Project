let button = document.getElementById("btn");
let bodyContents = document.getElementById("main_content");
let locationInput = document.getElementById("location_input");
let errMsg = document.getElementById('errMsg');
let temperature = document.getElementById('temperature');
let status = document.getElementById('status');
let currentDate = document.getElementById('date');
let currentLocation = document.getElementById('location');
let windSpeed = document.getElementById('wind_speed');
let pressure = document.getElementById('pressure');
let humidity = document.getElementById('humidity');
let temp = document.getElementById('temp');
let errorCity = document.getElementById('errorCity');
let loader = document.getElementById('loaderWrapper');
let happy = "Happy";
let localStorage = window.localStorage;
// let deferredPrompt;
// let promptBox = document.getElementById('prompt');
// let closeButton = document.getElementById('closeButton');
// const downloadButton = document.getElementById('download_button');


// window.addEventListener('beforeinstallprompt', (e) => {
//   deferredPrompt = e;
//   promptBox.style.display = "flex";
// });

// downloadButton.addEventListener('click', (e) => {
//   promptBox.style.display = "none";
//   deferredPrompt.prompt();
//   deferredPrompt.userChoice.then(choiceResult => {
//     if(choiceResult.outcome === 'accepted'){
//       //console.log('User accepted the A2HS prompt');
//     } else {
//       //console.log('User dismissed the A2HS prompt');
//     }

//     deferredPrompt = null;
//   });
// })

// closeButton.addEventListener('click', () => {
//   promptBox.style.display = 'none';
// })

let date = new Date();
const month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let currentMonth = month[date.getMonth()];
let currentDayWeek = day[date.getDay()];
let currentDay = date.getDate();

let chosenCity2 = locationInput.value;
//console.log(chosenCity)


function temperatureConverter(temp_value){
    let celcius = temp_value - 273.15;
    return Math.round(celcius);
}

let apiRequest1 = new XMLHttpRequest();
//let apiRequest2 = new XMLHttpRequest();

button.addEventListener('click', ($event) => {
    $event.preventDefault();
    if (locationInput.value === ''){
        locationInput.style.border = "3px solid hsl(0, 100%, 57%)";
        errMsg.style.display = "inline";
        bodyContents.style.display = "none";
    }

    else{
        bodyContents.style.display = "none";
        errMsg.style.display = "none";
        locationInput.style.border = "none";
        loader.style.display = "flex";
        let chosenCity = locationInput.value;
        apiRequest1.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&APPID=3c4d8896ac0bb0e38caf8bfa148bd151` );
        apiRequest1.send();
        // apiRequest2.open('GET', 'http://open.mapquestapi.com/geocoding/v1/address?key=9aZ0PWBlMZpFoJ1W0Yh32WAjvXKSsQti&location='+chosenCity);
        // apiRequest2.send();
    }

    currentDate.innerHTML = `${currentDayWeek}, ${currentDay} ${currentMonth}` ;
   
  });


//   apiRequest2.onreadystatechange = () => {
      
//     if(apiRequest2.readyState === 4) {

//         //Actions if and errror occurs from the Server
//         if(apiRequest2.status === 404) {
//             errorCity.style.display = "inline";
//             bodyContents.style.display = "none";
//         }

//         //Actions When the request was received succesfully
//         if(apiRequest2.status === 200 || apiRequest2.status === 201){
//             errorCity.style.display = "none";
//             const response2 = JSON.parse(apiRequest2.response);
//             //console.log(JSON.stringify(response2));
//             let countryName = response2.results[0].locations[0].adminArea1;
//             let cityName = response2.results[0].providedLocation.location;
//             // console.log(JSON.stringify(response2.results[0].providedLocation.location));
//             // console.log(JSON.stringify(response2.results[0].locations[1].latLng));
//             // console.log(JSON.stringify(response2.results[0].locations[1].latLng.lat));
//             // console.log(JSON.stringify(response2.results[0].locations[1].latLng.lng));
//             currentLocation.innerHTML = `${cityName}, ${countryName}`;
    
//             let lat = response2.results[0].locations[0].latLng.lat;
//             let lng = response2.results[0].locations[0].latLng.lng;
    
//         }
//     }
// }
  
  apiRequest1.onreadystatechange = () => {
    
      if(apiRequest1.readyState === 4) {
          loader.style.display = "none";
          if(apiRequest1.status === 404) {
              errorCity.style.display = "inline";
              bodyContents.style.display = "none";
          }

          if(apiRequest1.status === 200 || apiRequest1.status === 201) {
            errorCity.style.display = "none";
            const response = JSON.parse(apiRequest1.response);
            //console.log(JSON.stringify(response));
            let chosenCity2 = locationInput.value;
            temperature.innerHTML = `${temperatureConverter(response.main.temp)}°C`;
            humidity.innerHTML = `${response.main.humidity}%`;
            windSpeed.innerHTML = `${response.wind.speed}m/s`;
            pressure.innerHTML = `${response.main.pressure} hPa`;
            status.innerHTML = `${response.weather[0].description}`;
            temp.innerHTML = `${response.wind.deg}\u00B0`;
            currentLocation.innerHTML = `${response.name}`;
            bodyContents.style.display = "inline";

            
            localStorage.setItem("temperature", `${temperatureConverter(response.main.temp)}°C`);
            localStorage.setItem("humidity", `${response.main.humidity}%`);
            localStorage.setItem("windspeed", `${response.wind.speed}m/s`);
            localStorage.setItem("pressure", `${response.main.pressure} hPa`);
            localStorage.setItem("status", `${response.weather[0].description}`);
            localStorage.setItem("windDegree", `${response.wind.deg}\u00B0`);
            localStorage.setItem("chosenCity", `${response.name}`);
          }
      }
  }

            temperature.innerHTML = `${localStorage.getItem("temperature")}`;
            humidity.innerHTML = `${localStorage.getItem("humidity")}`;
            windSpeed.innerHTML = `${localStorage.getItem("windspeed")}`;
            pressure.innerHTML = `${localStorage.getItem("pressure")}`;
            status.innerHTML = `${localStorage.getItem("status")}`;
            temp.innerHTML = `${localStorage.getItem("windDegree")}`;
            currentLocation.innerHTML = `${localStorage.getItem("chosenCity")}`;

  //Local Storage
  if(!localStorage.getItem("temperature")){
    bodyContents.style.display = "none";
  }

  else{
    bodyContents.style.display = "inline";
  }
  

  // console.log(localStorage.getItem("temperature"));
  // console.log(localStorage.getItem("humidity"));
  // console.log(localStorage.getItem("windspeed"));
  // console.log(localStorage.getItem("pressure"));

  
