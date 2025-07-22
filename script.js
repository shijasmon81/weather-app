const apiKey = 'APP-KEY'; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    const weatherHTML = `
      <div class="weather-icon">
        <img src="${iconUrl}" alt="${data.weather[0].description}">
      </div>
      <h2>${data.name}, ${data.sys.country}</h2>
      <p class="weather-temp">${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = '<p>Error fetching data.</p>';
    console.error(error);
  }
}
