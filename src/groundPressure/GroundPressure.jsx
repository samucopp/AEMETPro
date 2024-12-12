import './groundPressure.css'

export function WeatherTodayGroundPressure({ currentWeather }) {
    if (!currentWeather || !currentWeather.main) {
        return null;
    }

    return (
        <div className="current_groundPressure">
            <h3>Presión del suelo</h3>
            <div>
                <p><span>🌡️</span></p>
                <p>
                    <span>Presión:</span>{' '}
                    {Math.round(currentWeather.main.grnd_level)} hPa
                </p>
            </div>
        </div>
    );
}