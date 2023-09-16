// src/App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'eb06cca728caef5dd729368993b747f3'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    try {
      if (!cityName) {
        throw new Error('Please enter a city name');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
