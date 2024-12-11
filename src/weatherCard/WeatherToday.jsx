import { useEffect } from 'react';
import './WeatherCard.css';

function WeatherToday({ currentWeather, next24Hours }) {
    const getWeatherEmoji = (weatherCode) => {
        if (weatherCode >= 200 && weatherCode < 300) return '🌩️';
        if (weatherCode >= 300 && weatherCode < 400) return '🌧️';
        if (weatherCode >= 500 && weatherCode < 600) return '🌧️';
        if (weatherCode >= 600 && weatherCode < 700) return '🌨️';
        if (weatherCode >= 700 && weatherCode < 800) return '🌫️';
        if (weatherCode === 800) return '☀️';
        if (weatherCode > 800) return '☁️';
        return '🌤️';
    };

    // Efecto para cambiar el fondo según el clima
    useEffect(() => {
        if (currentWeather) {
            const weatherMain = currentWeather.weather[0].main;
            const appElement = document.querySelector('.app-container');

            if (weatherMain === 'Rain') {
                appElement.style.backgroundImage = 'url(/images/lluvia.jpg)';
            } else if (weatherMain === 'Clear') {
                appElement.style.backgroundImage = 'url(/images/sol.jpg)';
            } else if (weatherMain === 'Clouds') {
                appElement.style.backgroundImage = 'url(/images/nubes.jpg)';
            } else {
                appElement.style.backgroundImage = 'none';
                appElement.style.backgroundColor = '#2d3748';
            }

            appElement.style.backgroundSize = 'cover';
            appElement.style.backgroundPosition = 'center';
            appElement.style.backgroundAttachment = 'fixed';

            // Limpieza al desmontar el componente
            return () => {
                appElement.style.backgroundImage = '';
                appElement.style.backgroundColor = '';
            };
        }
    }, [currentWeather]);

    return (
        <div className="weather-today">
            {/* Tiempo actual */}
            <div className="current-weather">
                <div className="current-weather__main">
                    <div className="current-weather__temp-container">
                        <span className="current-weather__city">
                        
                        </span>
                        <span className="current-weather__icon">
                            {getWeatherEmoji(currentWeather.weather[0].id)}
                        </span>
                        <span className="current-weather__temp">
                            {Math.round(currentWeather.main.temp)}°
                        </span>
                    </div>
                    <div className="current-weather__details">
                        <p>{currentWeather.weather[0].description}</p>
                        <p>Humedad: {currentWeather.main.humidity}%</p>
                        <p>Viento: {Math.round(currentWeather.wind.speed * 3.6)} km/h</p>
                    </div>
                </div>
            </div>

            {/* Próximas 24 horas */}
            <div className="section-title">Próximas 24 horas</div>
            <div className="hourly-forecast">
                {next24Hours.map((period) => {
                    const date = new Date(period.dt * 1000);
                    const hour = date.getHours();
                    
                    return (
                        <div key={period.dt} className="hourly-item">
                            <div className="hourly-time">
                                {hour === new Date().getHours() ? 'Ahora' : `${hour}:00`}
                            </div>
                            <div className="hourly-icon">
                                {getWeatherEmoji(period.weather[0].id)}
                            </div>
                            <div className="hourly-temp">
                                {Math.round(period.main.temp)}°
                            </div>
                            {period.pop > 0 && (
                                <div className="hourly-pop">
                                    {Math.round(period.pop * 100)}%
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WeatherToday;