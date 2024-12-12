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

    // Tomamos los datos del primer registro del día para la información general
    const mainData = dayData[0];

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
                            <span className="temp-value">{Math.round(mainData.main.temp)}°</span>
                            <span className="weather-description">{mainData.weather[0].description}</span>
                        </div>
                        <div className="temp-range">
                            <span>Mín: {Math.round(mainData.main.temp_min)}°</span>
                            <span>Máx: {Math.round(mainData.main.temp_max)}°</span>
                        </div>
                    </div>

                    <div className="hourly-forecast">
                        {dayData.map((hour) => (
                            <div key={hour.dt} className="hour-item">
                                <span className="hour">{new Date(hour.dt * 1000).getHours()}:00</span>
                                <span className="temp">{Math.round(hour.main.temp)}°</span>
                            </div>
                        ))}
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