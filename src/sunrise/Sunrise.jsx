

export function WeatherTodayRise({ currentWeather }) {
    if (!currentWeather || !currentWeather.main) {
        return null;
    }

    return (
        <div className="current_rise">
            <h3>Amanecer</h3>
            <div>
                <p><span>🌅</span></p>
                <p>
                    <span>Manana:</span>{' '}
                    {new Date(currentWeather.sunrise * 1000).toLocaleTimeString('es-ES')}
                </p>
               
            </div>
        </div>
    );
}