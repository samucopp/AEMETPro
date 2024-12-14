import { useEffect } from 'react';
import { WeatherTodayWind } from '../wind/Wind';
import { WeatherTodayRise } from '../sunrise/Sunrise';
import { WeatherTodaySunset } from '../sunset/Sunset';
import { WeatherTodayHumidity } from '../humidity/Humidity';
import { WeatherTodayGroundPressure } from '../groundPressure/GroundPressure';
import { WeatherTodayVisibility } from '../visibility/Visibility';
import { WeatherTodaySeaLevel } from '../sea/Sea'; 
import { WeatherTodayClouds } from '../clouds/Clouds';
import { WeatherTodayRain } from '../rain/Rain';
import { WeatherTodayFeellsLike } from '../feeling/Feeling';
import { WeatherTodayPollution } from '../pollution/Pollution';
import '../weatherCard/WeatherCard.css';
import './weatherToday.css';

function WeatherToday({ currentWeather, next24Hours, cityName, datosDelSistema, zonaHoraria, pollutionData }) {
    const getWeatherEmoji = (weatherCode) => {
        if (!weatherCode) return '🌤️';
        if (weatherCode >= 200 && weatherCode < 300) return '🌩️';
        if (weatherCode >= 300 && weatherCode < 400) return '🌧️';
        if (weatherCode >= 500 && weatherCode < 600) return '🌧️';
        if (weatherCode >= 600 && weatherCode < 700) return '🌨️';
        if (weatherCode >= 700 && weatherCode < 800) return '🌫️';
        if (weatherCode === 800) return '☀️';
        if (weatherCode > 800) return '☁️';
        return '🌤️';
    };

    useEffect(() => {
        if (currentWeather?.weather?.[0]?.main) {
            const weatherMain = currentWeather.weather[0].main;
            const appElement = document.querySelector('.app-container');

            if (appElement) {
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

                return () => {
                    appElement.style.backgroundImage = '';
                    appElement.style.backgroundColor = '';
                };
            }
        }
    }, [currentWeather]);

    
    if (!currentWeather || !currentWeather.weather || !currentWeather.weather[0] || !currentWeather.main || !currentWeather.wind) {
        return <div>Cargando datos del clima...</div>;
    }

    return (
        <div className="weather-today">
            <div className="current-weather">
                <div className="current-weather__main">
                    <div className="current-weather__temp-container">
                        <h2 className="current-weather__city">
                            {cityName || 'Ciudad no disponible'}
                        </h2>
                        <span className="current-weather__icon">
                            {getWeatherEmoji(currentWeather.weather[0]?.id)}
                        </span>
                        <span className="current-weather__temp">
                            {Math.round(currentWeather.main?.temp || 0)}°
                        </span>
                    </div>
                    <div className="current-weather__details">
                        <p>{currentWeather.weather[0]?.description || 'Descripción no disponible'}</p>
                        <p>Humedad: {currentWeather.main?.humidity || 0}%</p>
                        <p>Viento: {Math.round((currentWeather.wind?.speed || 0) * 3.6)} km/h</p>
                    </div>
                </div>
            </div>

            {next24Hours && next24Hours.length > 0 && (
                <>
                    <div className="section-title">Próximas 24 horas</div>
                    <div className="hourly-forecast">
                        {next24Hours.map((period) => {
                            if (!period || !period.dt || !period.weather || !period.main) return null;
                            const date = new Date(period.dt * 1000);
                            const hour = date.getHours();

                            return (
                                <div key={period.dt} className="hourly-item">
                                    <div className="hourly-time">
                                        {hour === new Date().getHours() ? 'Ahora' : `${hour}:00`}
                                    </div>
                                    <div className="hourly-icon">
                                        {getWeatherEmoji(period.weather[0]?.id)}
                                    </div>
                                    <div className="hourly-temp">
                                        {Math.round(period.main?.temp || 0)}°
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

                    {/* Viento y Lluvia */}
                    {currentWeather && (
                        <div className="weather-metrics-container">
                            <WeatherTodayWind currentWeather={currentWeather} />
                            <WeatherTodayRain currentWeather={currentWeather} />
                        </div>
                    )}

                    {/* Nubes y Visibilidad */}
                    {currentWeather && (
                        <div className="weather-metrics-container">
                            <WeatherTodayClouds currentWeather={currentWeather} />
                            <WeatherTodayVisibility currentWeather={currentWeather} />
                        </div>
                    )}

                    {/* Humedad y Sensación Térmica */}
                    {currentWeather && (
                        <div className="weather-metrics-container">
                            <WeatherTodayHumidity currentWeather={currentWeather} />
                            <WeatherTodayFeellsLike currentWeather={currentWeather} />
                        </div>
                    )}

                    {/* Sol */}
                    {datosDelSistema && zonaHoraria && (
                        <div className="weather-metrics-container">
                            <WeatherTodayRise datosAmanecer={datosDelSistema} zonaHoraria={zonaHoraria} />
                            <WeatherTodaySunset datosAmanecer={datosDelSistema} zonaHoraria={zonaHoraria} />
                        </div>
                    )}

                    {/* Presiones */}
                    {currentWeather && (
                        <div className="weather-metrics-container">
                            <WeatherTodayGroundPressure currentWeather={currentWeather} />
                            <WeatherTodaySeaLevel currentWeather={currentWeather} />
                        </div>
                    )}

                    {/* Polución */}
                    {pollutionData && (
                        <div className="weather-metrics-container">
                            <WeatherTodayPollution data={pollutionData} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default WeatherToday;