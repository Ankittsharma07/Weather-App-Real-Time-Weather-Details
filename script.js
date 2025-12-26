const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const temp = document.getElementById('temp');
const cityName = document.getElementById('city');
const country = document.getElementById('Country');
const description = document.getElementById('description')
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weather = document.getElementById('weather-icon');
const errorMsg = document.getElementById('error-msg');

const weatherIcons = {
    "Clouds": "./weather-icon/Clouds.png",
    "Rain": "./weather-icon/Rain.png",
    "Drizzle": "./weather-icon/Drizzle.png",
    "Thunderstorm": "./weather-icon/Thunderstorm.png",
    "Snow": "./weather-icon/Snow.png",
    "Mist": "./weather-icon/Mist.png",
    "Haze": "./weather-icon/Haze.png",
    "Smoke": "./weather-icon/Smoke.png",
    "Clear": "./weather-icon/Clear.png"
};

const API_KEY = 'f6533e7917fc3b6290f40408f37320ff';

function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then((data) => {
            // OpenWeatherMap response structure
            const tempC = Math.round(data.main.temp - 273.15);
            temp.innerHTML = tempC + '°C';
            cityName.innerHTML = data.name || 'Unknown City';
            country.innerHTML = data.sys.country || 'N/A';
            description.innerHTML = data.weather[0].description || 'N/A';
            humidity.innerHTML = data.main.humidity + '<span style="font-size:0.8em">%</span>';
            // 0° = North, 90° = East, 180° = South, 270° = West
            const directions = [
                'North',
                'North-East',
                'East',
                'South-East',
                'South',
                'South-West',
                'West',
                'North-West'
            ];
            const deg = data.wind.deg;
            const index = Math.round(deg / 45) % 8;
            const windDir = directions[index];

            wind.innerHTML = (data.wind.speed * 3.6).toFixed(1) + ' km/h (' + windDir + ')';

            // Set weather icon
            const condition = data.weather[0].main;                    // "Smoke", "Clouds", "Clear" etc.
            weather.src = weatherIcons[condition] || "./weather-icon/Clear.png";  // fallback

            errorMsg.innerHTML = '';
            errorMsg.style.display = 'none';
        })
        .catch(error => {
            errorMsg.innerHTML = 'City not found';
            errorMsg.style.display = 'block';
            console.error(error);
        });
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        checkWeather(city);
        errorMsg.style.display = 'none';
    }
});

cityInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

checkWeather("mumbai");