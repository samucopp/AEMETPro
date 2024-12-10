import React, { useState, useEffect } from 'react';
import { getCurrentWeather, getGeoLocation } from '../utils/ApiCalls';

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

  // Efecto para actualizar el fondo del body cuando se recibe los datos del clima
  useEffect(() => {
    if (weatherData) {
      const weatherCondition = weatherData.weather.weather[0].main;

      // Cambiar el fondo dependiendo de la condición del clima
      if (weatherCondition === 'Rain') {
        document.body.style.backgroundImage = 'url(/images/lluvia.jpg)';
      } else if (weatherCondition === 'Clear') {
        document.body.style.backgroundImage = 'url(/images/sol.jpg)';
      } else if (weatherCondition === 'Clouds') {
        document.body.style.backgroundImage = 'url(/images/nubes.jpg)';
      } else {
        // Si no coincide con las condiciones anteriores, se puede restablecer a un fondo predeterminado
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#f1f5f9';
      }

      document.body.style.backgroundSize = 'cover';  // Asegura que la imagen cubra todo el fondo
      document.body.style.backgroundPosition = 'center';  // Centra la imagen de fondo
    }
  }, [weatherData]);

  return (
    <div className="weather-container">
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ingresa una ciudad"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
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
