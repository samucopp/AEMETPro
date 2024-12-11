// Wind.jsx
import React from 'react';

export function WeatherTodayWind({ currentWeather }) {
    if (!currentWeather || !currentWeather.wind) {
        return null;
    }

    return (
        <div className="current_wind">
            <h3>Información del Viento</h3>
            <div>
                <p><span>☁️
                </span></p>
                <p>
                    <span>Velocidad:</span>{' '}
                    {Math.round(currentWeather.wind.speed * 3.6)} km/h
                </p>
                <p>
                    <span>Dirección:</span>{' '}
                    {Math.round(currentWeather.wind.deg)}°
                </p>
                {currentWeather.wind.gust && (
                    <p>
                        <span>Ráfagas:</span>{' '}
                        {Math.round(currentWeather.wind.gust * 3.6)} km/h
                    </p>
                )}
            </div>
        </div>
    );
}

export default WeatherTodayWind;