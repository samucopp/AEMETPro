import './WeatherCard.css';

function WeatherFiveDays({ dailyForecast }) {
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
        <div>
            {/* Próximos días */}
            <div className="section-title">Próximos días</div>
            <div className="daily-grid">
                {dailyForecast.map((day) => {
                    const date = new Date(day.forecasts[0].dt * 1000);
                    const forecasts = day.forecasts;
                    const maxTemp = Math.max(...forecasts.map(f => f.main.temp));
                    const minTemp = Math.min(...forecasts.map(f => f.main.temp));
                    const maxPop = Math.max(...forecasts.map(f => f.pop || 0));

                    return (
                        <div key={day.date} className="daily-compact">
                            <div className="daily-compact__date">
                                {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                            </div>
                            <div className="daily-compact__forecasts">
                                {forecasts.map((forecast, idx) => (
                                    <div key={idx} className="forecast-hour">
                                        <div className="forecast-hour__time">
                                            {new Date(forecast.dt * 1000).getHours()}:00
                                        </div>
                                        <div className="forecast-hour__icon">
                                            {getWeatherEmoji(forecast.weather[0].id)}
                                        </div>
                                        <div className="forecast-hour__temp">
                                            {Math.round(forecast.main.temp)}°
                                        </div>
                                    </div>
                                ))}
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
        </div>
    );
}

export default WeatherFiveDays;