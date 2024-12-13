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
import getWeatherIcon from '../utils/WeatherIcons';
import getBackgroundImage from '../utils/Background';
import './WeatherToday.css';


function WeatherToday({ currentWeather, next24Hours, cityName, datosDelSistema, zonaHoraria }) {
    useEffect(() => {
        if (currentWeather) {
            const weatherMain = currentWeather.weather[0].main;
            const appElement = document.querySelector('.app-container');

            const backgroundImage = getBackgroundImage(weatherMain);

            appElement.style.backgroundImage = backgroundImage;
            appElement.style.backgroundSize = 'cover';
            appElement.style.backgroundPosition = 'center';
            appElement.style.backgroundAttachment = 'fixed';

            return () => {
                appElement.style.backgroundImage = '';
                appElement.style.backgroundColor = '';
            };
        }
    }, [currentWeather]);

    return (
        <div className="weather-today">
            <div className="current-weather">
                <div className="current-weather__main">
                    <div className="current-weather__temp-container">
                        <h2 className="current-weather__city">
                            {cityName}
                        </h2>
                        <img
                            src={getWeatherIcon(currentWeather.weather[0].id)}
                            alt="Weather Icon"
                            className="current-weather__icon"
                        />
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
            {next24Hours && (
                <>
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
                                    <img
                                        src={getWeatherIcon(period.weather[0].id)}
                                        alt="Weather Icon"
                                        className="hourly-icon"
                                    />
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
            )
            }
        </div >
    );
}

export default WeatherToday;