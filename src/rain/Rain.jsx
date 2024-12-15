import './Rain.css';

export function WeatherTodayRain({ currentWeather, forecastWeather }) {
    if (!currentWeather?.rain?.['1h'] && !forecastWeather?.pop) {
        return null;
    }
    const currentRain = currentWeather?.rain?.['1h'];
    const rainProbability = forecastWeather?.pop ? Math.round(forecastWeather.pop * 100) : null;

    return (
        <div className="rain-card">
            <div className="rain-header">
                <span className="rain-icon">🌧️</span>
                <h3>PRECIPITACIÓN</h3>
            </div>
            <div className="rain-content">
                {currentRain && (
                    <div className="rain-value">
                        {currentRain}
                        <span className="rain-unit">mm</span>
                    </div>
                )}
                {rainProbability && (
                    <div className="rain-probability">
                        <div className="probability-value">{rainProbability}%</div>
                        <div className="probability-label">Probabilidad de lluvia</div>
                    </div>
                )}
                <div className="rain-subtitle">
                    Hoy
                </div>
            </div>
        </div>
    );
}