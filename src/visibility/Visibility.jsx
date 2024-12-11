import './visibility.css';

export function WeatherTodayVisibility({ currentWeather }) {
    if (!currentWeather || !currentWeather.visibility) {
        return null;
    }

    return (
        <div className="current_visibility">
            <h3>Visibilidad</h3>
            <div>
                <p><span>👁️</span></p>
                <p>
                    <span>Visibilidad:</span>{' '}
                    {Math.round(currentWeather.visibility / 1000)} km
                </p>
            </div>
        </div>
    )
}