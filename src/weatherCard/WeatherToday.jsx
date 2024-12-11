import { useEffect } from 'react';
import { WeatherTodayWind } from '../wind/Wind';
import { WeatherTodayRise } from '../sunrise/Sunrise';
import { WeatherTodaySunset } from '../sunset/Sunset';
import { WeatherTodayHumidity } from '../humidity/Humidity';
import { WeatherTodayPressure } from '../pressure/Pressure';
import { WeatherTodayGroundPressure } from '../groundPressure/GroundPressure';
import { WeatherTodayVisibility } from '../visibility/Visibility';
import { WeatherTodaySeaLevel } from '../sea/Sea'; 
import { WeatherTodayClouds } from '../clouds/Clouds';
import { WeatherTodayRain } from '../rain/Rain';
import { WeatherTodayFeellsLike } from '../feeling/Feeling';
import './WeatherCard.css';

function WeatherToday({ currentWeather, forecastWeather, next24Hours, cityName, datosDelSistema, zonaHoraria }) {
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

    useEffect(() => {
        if (forecastWeather) {
            const weatherMain = forecastWeather.weather[0].main;
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

            return () => {
                appElement.style.backgroundImage = '';
                appElement.style.backgroundColor = '';
            };
        }
    }, [forecastWeather]);

    return (
        <>
            <div className="weather-today">
                <div className="current-weather">
                    <div className="current-weather__main">
                        <div className="current-weather__temp-container">
                            <h2 className="current-weather__city">
                                {cityName}
                            </h2>
                            <span className="current-weather__icon">
                                {getWeatherEmoji(forecastWeather.weather[0].id)}
                            </span>
                            <span className="current-weather__temp">
                                {Math.round(forecastWeather.main.temp)}°
                            </span>
                        </div>
                        <div className="current-weather__details">
                            <p>{forecastWeather.weather[0].description}</p>
                            <p>Humedad: {forecastWeather.main.humidity}%</p>
                            <p>Viento: {Math.round(forecastWeather.wind.speed * 3.6)} km/h</p>
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

            <WeatherTodayWind currentWeather={currentWeather} />
            
            <div className="weather-metrics-container">
            <WeatherTodayClouds currentWeather={currentWeather} />
            <WeatherTodayRain currentWeather={currentWeather} />
            <WeatherTodayFeellsLike currentWeather={currentWeather} />
            </div>
            
            
           
            <WeatherTodayVisibility currentWeather={currentWeather} />
            
            <div className="sun-container">
                <WeatherTodayRise datosAmanecer={datosDelSistema} zonaHoraria={zonaHoraria} />
                <WeatherTodaySunset datosAmanecer={datosDelSistema} zonaHoraria={zonaHoraria} />
            </div>

            <WeatherTodayHumidity currentWeather={currentWeather} />
            
            <div className="pressure-container">
                {/* <WeatherTodayPressure currentWeather={currentWeather} /> */}
                <WeatherTodayGroundPressure currentWeather={currentWeather} />
                <WeatherTodaySeaLevel currentWeather={currentWeather} />
            </div>
        </>
    );
}

export default WeatherToday;