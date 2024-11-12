const apiKey = 'd265e78e37d67178c79e597ef8990b45'; 
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');

searchButton.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    getWeatherData(city);
  } else {
    alert('Будь ласка, введіть назву міста.');
  }
});

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Місто не знайдено. Спробуйте ще раз.');
    }
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
}

function updateUI(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `Температура: ${data.main.temp} °C`;
  humidity.textContent = `Вологість: ${data.main.humidity}%`;
  windSpeed.textContent = `Швидкість вітру: ${data.wind.speed} м/с`;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

// Додатково: очищення поля вводу після пошуку
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchButton.click();
  }
});