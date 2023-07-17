
var APIKey = "643d8ed49a8eab3810eb70a4438d8c93";
var cityInput = document.getElementById("city-search-input");
var searchBtn = document.getElementById("search-button");
var liveCity = document.getElementById("live-city");
var liveTemp = document.getElementById("live-temp");
var liveWind = document.getElementById("live-wind");
var liveHum = document.getElementById("live-hum");
let cities = [];
let thisCity;

function getWeather() {
    let city = cityInput.value || thisCity ;
    liveCity.textContent = city;
    queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            var forecastEl = document.querySelector("#five-day-container");
            forecastEl.innerHTML = "";
            liveTemp.textContent = data.list[0].main.temp + " ºF";
            liveWind.textContent = data.list[0].wind.speed + " MPH";
            liveHum.textContent = data.list[0].main.humidity + "%";
            for (let i = 0; i < data.list.length; i += 8) {
                let forecastDate = data.list[i].dt_txt.substring(5, 10);
                let forecastTemp = data.list[i].main.temp;
                let forecastWind = data.list[i].wind.speed;
                let forecastHum = data.list[i].main.humidity;
                var forecastData = `
                <div id="forecast-box" class="p-2 pr-5">
                <h5> ${forecastDate} </h5>
                <img class="img-fluid m-4 custom-icon" src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon
                    }.png" alt="weather icon" />
                <h6> ${forecastTemp}ºF </h6>
                <p> Wind: <span class="fw-bold">${forecastWind}</span>MPH </p>
                <p> Humidity: <span class="fw-bold">${forecastHum}</span>% </p>
                </div>
                `

                forecastEl.insertAdjacentHTML('beforeend', forecastData);
            }
            cityInput.value = '';
        }, 
    )
};

function renderCity() {
    let city = cityInput.value;
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    var myCities = document.querySelector(".city-list");
    var citySave = document.createElement('button');
    citySave.classList.add('city-btn');
    let storedCity = localStorage.getItem("cities");
    let cityHistory = JSON.parse(storedCity);
    for (let i = 0; i < cityHistory.length; i++){
        citySave.textContent = cityHistory[i];
    }
    myCities.appendChild(citySave);
    citySave.addEventListener("click", e => {
        e.preventDefault;
        thisCity = e.target.textContent;
        getWeather(thisCity);
    } );
}










searchBtn.addEventListener("click", renderCity);
searchBtn.addEventListener("click", getWeather);



