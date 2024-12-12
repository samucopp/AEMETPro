import React from 'react';
import './weatherModal.css';

import { WeatherTodayWind } from '../wind/Wind';
import { WeatherTodayClouds } from '../clouds/Clouds';
import { WeatherTodayRain } from '../rain/Rain';
import { WeatherTodayFeellsLike } from '../feeling/Feeling';
import { WeatherTodayVisibility } from '../visibility/Visibility';
import { WeatherTodayHumidity } from '../humidity/Humidity';
import { WeatherTodayPressure } from '../pressure/Pressure';
import { WeatherTodayGroundPressure } from '../groundPressure/GroundPressure';
import { WeatherTodaySeaLevel } from '../sea/Sea';

function WeatherModal({ isOpen, onClose, dayData, date }) {
    if (!isOpen) return null;

    // Extract the main data for current conditions
    const mainData = dayData[0];
    
    // Filter and process the next 24 hours of data
    const currentHour = new Date().getHours();
    const next24Hours = dayData.filter((item, index) => index < 8); // Assuming 3-hour intervals, 8 periods = 24 hours

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

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-header">
                    <h2>{new Date(date).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</h2>
                </div>

                <div className="modal-body">
                    <div className="temperature-overview">
                        <div className="current-temp">
                            <span className="current-emoji">{getWeatherEmoji(mainData.weather[0].id)}</span>
                            <span className="temp-value">{Math.round(mainData.main.temp)}°</span>
                            <span className="weather-description">{mainData.weather[0].description}</span>
                        </div>
                        <div className="temp-range">
                            <span>Mín: {Math.round(mainData.main.temp_min)}°</span>
                            <span>Máx: {Math.round(mainData.main.temp_max)}°</span>
                        </div>
                    </div>

                    <div className="section-title">Próximas 24 horas</div>
                    <div className="hourly-forecast">
                        {next24Hours.map((period) => {
                            const date = new Date(period.dt * 1000);
                            const hour = date.getHours();

                            return (
                                <div key={period.dt} className="hourly-item">
                                    <div className="hourly-time">
                                        {hour === currentHour ? 'Ahora' : `${hour}:00`}
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

                    <div className="weather-details-grid">
                        <WeatherTodayWind currentWeather={mainData} />
                        <WeatherTodayClouds currentWeather={mainData} />
                        <WeatherTodayRain currentWeather={mainData} />
                        <WeatherTodayFeellsLike currentWeather={mainData} />
                        <WeatherTodayVisibility currentWeather={mainData} />
                        <WeatherTodayHumidity currentWeather={mainData} />
                    </div>

                    <div className="pressure-container">
                        <WeatherTodayPressure currentWeather={mainData} />
                        <WeatherTodayGroundPressure currentWeather={mainData} />
                        <WeatherTodaySeaLevel currentWeather={mainData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherModal;