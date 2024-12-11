import './humidity.css';
export function WeatherTodayHumidity({ currentWeather }) {
    if (!currentWeather || !currentWeather.main) {
        return null;
    }

    return (
        <div className="current_humidity">
            <h3>Humedad</h3>
            <div>
                <p><span>💧</span></p>
                <p>
                    <span>Humedad:</span>{' '}
                    {Math.round(currentWeather.main.humidity)}%
                </p>
            </div>
        </div>
    )
}