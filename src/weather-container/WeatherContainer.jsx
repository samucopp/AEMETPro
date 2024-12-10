import React, { useState, useEffect } from 'react';
import { getCurrentWeather, getGeoLocation } from '../utils/ApiCalls';
import Input from "../input/Input";
import Button from '../button/Button';

export default function WeatherContainer() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const geoData = await getGeoLocation(city);
      const weather = await getCurrentWeather(geoData.lat, geoData.lon);

      setWeatherData({
        name: geoData.name,
        country: geoData.country,
        state: geoData.state,
        weather: weather,
      });
    } catch (err) {
      setError(err.message || 'Error al buscar el clima');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData) {
      const weatherCondition = weatherData.weather.weather[0].main;

      if (weatherCondition === 'Rain') {
        document.body.style.backgroundImage = 'url(/images/lluvia.jpg)';
      } else if (weatherCondition === 'Clear') {
        document.body.style.backgroundImage = 'url(/images/sol.jpg)';
      } else if (weatherCondition === 'Clouds') {
        document.body.style.backgroundImage = 'url(/images/nubes.jpg)';
      } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#f1f5f9';
      }

      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }
  }, [weatherData]);

  return (
    <div className="weather-container">
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button loading={loading} />
        </form>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {weatherData && (
        <div className="weather-card">
          <div className="weather-header">
            <h2>
              {weatherData.name}
              {weatherData.state && `, ${weatherData.state}`}
              {weatherData.country && `, ${weatherData.country}`}
            </h2>
          </div>

          <div className="weather-content">
            <div className="temperature-box">
              <div className="temperature">
                {Math.round(weatherData.weather.main.temp)}°C
              </div>
              <div className="weather-description">
                {weatherData.weather.weather[0].description}
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                💧 Humedad: <span>{weatherData.weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                🌡️ Sensación: <span>{Math.round(weatherData.weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                💨 Viento: <span>{Math.round(weatherData.weather.wind.speed * 3.6)} km/h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}