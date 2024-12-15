import './Feeling.css';

export function WeatherTodayFeellsLike({ currentWeather }) {
    if (!currentWeather || !currentWeather.main) {
        return null;
    }

    return (
        <div className="current_feelsLike">
            <div className="feels-header">
                <span className="feels-icon">🌡️</span>
                <h3>SENSACIÓN TÉRMICA</h3>
            </div>
            <div className="feels-content">
                <div className="feels-value">
                    {Math.round(currentWeather.main.feels_like)}
                    <span className="feels-unit">°C</span>
                </div>
            </div>
        </div>
    );
}