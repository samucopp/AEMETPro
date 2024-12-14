import React from 'react';
import './weatherModal.css';

import { WeatherTodayWind } from '../wind/Wind';
import { WeatherTodayClouds } from '../clouds/Clouds';

import { WeatherTodayFeellsLike } from '../feeling/Feeling';
import { WeatherTodayVisibility } from '../visibility/Visibility';
import { WeatherTodayHumidity } from '../humidity/Humidity';
import { WeatherTodayGroundPressure } from '../groundPressure/GroundPressure';
import { WeatherTodaySeaLevel } from '../sea/Sea';
import { WeatherTodayRise } from '../sunrise/Sunrise';
import { WeatherTodaySunset } from '../sunset/Sunset';



function WeatherModal({ isOpen, onClose, dayData, date}) {
    if (!isOpen) return null;

    const mainData = dayData[0];
    const currentHour = new Date().getHours();
    const next24Hours = dayData.filter((item, index) => index < 8);

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

                <div className="current-weather">
                    <div className="current-weather__main">
                        <div className="current-weather__temp-container">
                            <span className="current-weather__icon">
                                {getWeatherEmoji(mainData.weather[0].id)}
                            </span>
                            <span className="current-weather__temp">
                                {Math.round(mainData.main.temp)}°
                            </span>
                        </div>
                        <div className="current-weather__details">
                            <p>{mainData.weather[0].description}</p>
                            <p>Humedad: {mainData.main.humidity}%</p>
                            <p>Viento: {Math.round(mainData.wind.speed * 3.6)} km/h</p>
                        </div>
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

                <div className="weather-metrics-single">
                    <WeatherTodayWind currentWeather={mainData} />
                </div>

                <div className="weather-metrics-container">
                    <WeatherTodayClouds currentWeather={mainData} />
                    
                    <WeatherTodayHumidity currentWeather={mainData} />
                </div>

                <div className="sun-container">
                    <WeatherTodayRise currentWeather={mainData} />
                    <WeatherTodaySunset currentWeather={mainData} />
                </div>

                <div className="weather-metrics-container">
                    <WeatherTodayFeellsLike currentWeather={mainData} />
                    <WeatherTodayVisibility currentWeather={mainData} />
                </div>

               
                <div className="weather-metrics-container">
                    <WeatherTodayGroundPressure currentWeather={mainData} />
                    <WeatherTodaySeaLevel currentWeather={mainData} />
                </div>
            </div>
        </div>
    );
}

export default WeatherModal;