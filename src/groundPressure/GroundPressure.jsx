import './GroundPressure.css';

export function WeatherTodayGroundPressure({ currentWeather }) {
    if (!currentWeather?.main?.grnd_level) {
        return null;
    }
    const groundPressure = currentWeather.main.grnd_level;

    return (
        <div className="ground-pressure-card">
            <div className="ground-pressure-header">
                <span className="ground-pressure-icon">🌡️</span>
                <h3>PRESIÓN DEL SUELO</h3>
            </div>
            <div className="ground-pressure-content">
                <div className="ground-pressure-value">
                    {groundPressure}
                    <span className="ground-pressure-unit">hPa</span>
                </div>
                <div className="ground-pressure-gauge">
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