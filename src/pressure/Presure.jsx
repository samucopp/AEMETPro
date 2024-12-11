export function WeatherTodayPressure({ currentWeather }) {
    if (!currentWeather || !currentWeather.main) {
        return null;
    }

    return (
        <div className="current_pressure">
            <h3>Presión</h3>
            <div>
                <p><span>🌡️</span></p>
                <p>
                    <span>Presión:</span>{' '}
                    {Math.round(currentWeather.main.pressure)} hPa
                </p>
            </div>
        </div>  
    
    )
}