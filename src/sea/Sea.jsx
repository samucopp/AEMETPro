import './sea.css';

export function WeatherTodaySeaLevel({ currentWeather }) {
    if (!currentWeather?.main?.sea_level) {
        return null;
    }

    const seaLevel = currentWeather.main.sea_level;

    return (
        <div className="sealevel-card">
            <div className="sealevel-header">
                <span className="sealevel-icon">🌊</span>
                <h3>NIVEL DEL MAR</h3>
            </div>
            
            <div className="sealevel-content">
                <div className="sealevel-value">
                    {seaLevel}
                    <span className="sealevel-unit">hPa</span>
                </div>
                <div className="sealevel-gauge">
                    <div className="gauge-arrow">
                        ↑
                    </div>
                    <div className="gauge-dial"></div>
                    <div className="gauge-labels">
                        <span>Bajo</span>
                        <span>Alto</span>
                    </div>
                </div>
            </div>
        </div>
    );
}