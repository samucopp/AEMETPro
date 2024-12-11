import './sunset.css';

export function WeatherTodaySunset({ currentWeather }) {
    if (!currentWeather || !currentWeather.main) {
        return null;
    }

    return (
        <div className="current_sunset">
            <h3>Puesta de sol</h3>
            <div>
                <p><span>🌅</span></p>
                <p>
                    <span>Noche:</span>{' '}
                    {new Date(currentWeather.sunset * 1000).toLocaleTimeString('es-ES')}
                </p>
            </div>
        </div>
    );
}