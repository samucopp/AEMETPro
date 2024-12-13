import './pressure.css';

export function WeatherTodayPressure({ currentWeather }) {
    if (!currentWeather?.main?.pressure) {
        return null;
    }

    const pressure = currentWeather.main.pressure;
    const rotationDegrees = ((pressure - 950) / (1050 - 950)) * 180 - 90; 

    return (
        <div className="pressure-card">
            <div className="pressure-header">
                <span className="pressure-icon">🌡️</span>
                <h3>PRESIÓN</h3>
            </div>
            
            <div className="pressure-content">
                <div className="pressure-value">
                    {pressure}
                    <span className="pressure-unit">hPa</span>
                </div>
                <div className="pressure-gauge">
                    <div className="gauge-arrow">
                        ↑
                    </div>
                    <div className="gauge-dial"></div>
                    <div className="gauge-labels">
                        <span>Baja</span>
                        <span>Alta</span>
                    </div>
                </div>
            </div>
        </div>
    );
}