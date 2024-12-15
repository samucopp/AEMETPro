import { useState } from 'react';
import WeatherModal from '../weatherModal/WeatherModal';
import getWeatherIcon from '../utils/WeatherIcons';
import './WeatherFiveDays.css'
import '../weatherCard/WeatherCard.css';

function WeatherFiveDays({ dailyForecast }) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="section-title">Próximos días</div>
            <div className="daily-grid">
                {dailyForecast.map((day) => {
                    const date = new Date(day.forecasts[0].dt * 1000);
                    const forecasts = day.forecasts;
                    const maxTemp = Math.max(...forecasts.map(f => f.main.temp));
                    const minTemp = Math.min(...forecasts.map(f => f.main.temp));
                    const maxPop = Math.max(...forecasts.map(f => f.pop || 0));

                    return (
                        <div
                            key={day.date}
                            className="daily-compact"
                            onClick={() => handleDayClick(day)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="daily-compact__date">
                                {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                            </div>
                            <div className="daily-compact__forecasts">
                                {forecasts.map((forecast, idx) => {
                                    const hour = new Date(forecast.dt * 1000).getHours();
                                    return (
                                        <div key={idx} className="forecast-hour">
                                            <div className="forecast-hour__time">
                                                {hour}:00
                                            </div>
                                            <img
                                                src={getWeatherIcon(forecast.weather[0].id, hour)}
                                                alt="Weather Icon"
                                                className="forecast-hour__icon"
                                            />
                                            <div className="forecast-hour__temp">
                                                {Math.round(forecast.main.temp)}°
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="daily-compact__summary">
                                <span className="daily-compact__temps">
                                    {Math.round(minTemp)}° / {Math.round(maxTemp)}°
                                </span>
                                {maxPop > 0 && (
                                    <span className="daily-compact__pop">
                                        {Math.round(maxPop * 100)}%
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedDay && (
                <WeatherModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    dayData={selectedDay.forecasts}
                    date={selectedDay.date}
                />
            )}
        </div>
    );
}

export default WeatherFiveDays;