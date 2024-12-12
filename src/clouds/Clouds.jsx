import './clouds.css';

export function WeatherTodayClouds({ currentWeather }) {
    if (!currentWeather || !currentWeather.clouds) {
        return null;
    }

    return (
        <div className="current_clouds">
            <div className="clouds-header">
                <span className="clouds-icon">☁️</span>
                <h3>NUBES</h3>
            </div>
            <div className="clouds-content">
                <div className="clouds-value">
                    {currentWeather.clouds.all}
                    <span className="clouds-unit">%</span>
                </div>
            </div>
        </div>  
    );
}