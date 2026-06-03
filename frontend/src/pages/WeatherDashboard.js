import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'react-icons/fa';
import './WeatherDashboard.css';

function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('London');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // metric for Celsius, imperial for Fahrenheit

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: unit,
        },
      });

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: unit,
        },
      });

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setCity(cityName);
      setSearchInput('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data. Please try again.');
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [unit]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeatherData(searchInput);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '⛅',
      '02n': '☁️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌧️',
      '09n': '🌧️',
      '10d': '🌧️',
      '10n': '🌧️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '❄️',
      '13n': '❄️',
      '50d': '🌫️',
      '50n': '🌫️',
    };
    return iconMap[iconCode] || '🌡️';
  };

  const getDailyForecast = () => {
    if (!forecast) return [];
    const dailyData = {};
    
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  return (
    <div className="weather-dashboard">
      <div className="weather-header">
        <h1>🌤️ Weather Dashboard</h1>
        <p>Real-time weather information powered by OpenWeatherMap</p>
      </div>

      <div className="weather-controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <button 
          onClick={toggleUnit} 
          className="unit-toggle"
          title={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
        >
          °{unit === 'metric' ? 'C' : 'F'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {loading && (
        <div className="loading">
          <p>Loading weather data...</p>
        </div>
      )}

      {weather && !loading && (
        <>
          <div className="current-weather">
            <div className="weather-info">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <div className="weather-main">
                <span className="weather-icon">
                  {getWeatherIcon(weather.weather[0].icon)}
                </span>
                <div className="temperature-section">
                  <div className="temperature">
                    {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                  </div>
                  <p className="description">{weather.weather[0].main}</p>
                  <p className="feels-like">
                    Feels like {Math.round(weather.main.feels_like)}°
                  </p>
                </div>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <div className="detail-icon">
                  <Droplets />
                </div>
                <div className="detail-text">
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">{weather.main.humidity}%</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Wind />
                </div>
                <div className="detail-text">
                  <p className="detail-label">Wind Speed</p>
                  <p className="detail-value">
                    {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Gauge />
                </div>
                <div className="detail-text">
                  <p className="detail-label">Pressure</p>
                  <p className="detail-value">{weather.main.pressure} mb</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Eye />
                </div>
                <div className="detail-text">
                  <p className="detail-label">Visibility</p>
                  <p className="detail-value">
                    {(weather.visibility / 1000).toFixed(1)} km
                  </p>
                </div>
              </div>
            </div>

            <div className="weather-range">
              <div className="temp-range">
                <span>🌡️ Max: {Math.round(weather.main.temp_max)}°</span>
                <span>Min: {Math.round(weather.main.temp_min)}°</span>
              </div>
              {weather.rain && (
                <div className="rain-info">
                  <span>🌧️ Rain (1h): {weather.rain['1h']} mm</span>
                </div>
              )}
            </div>
          </div>

          <div className="forecast">
            <h3>5-Day Forecast</h3>
            <div className="forecast-container">
              {getDailyForecast().map((day, index) => (
                <div key={index} className="forecast-item">
                  <p className="forecast-date">
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="forecast-icon">
                    {getWeatherIcon(day.weather[0].icon)}
                  </p>
                  <p className="forecast-description">{day.weather[0].main}</p>
                  <p className="forecast-temp">
                    {Math.round(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                  </p>
                  <p className="forecast-humidity">💧 {day.main.humidity}%</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!weather && !loading && !error && (
        <div className="no-data">
          <p>Enter a city name to get started!</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
