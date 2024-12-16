import { FaWind } from "react-icons/fa";
import './Wind.css';

export function WeatherTodayWind({ currentWeather }) {
    if (!currentWeather?.wind) {
        return null;
    }
    const windSpeed = Math.round(currentWeather.wind.speed * 3.6);
    const windGust = currentWeather.wind.gust ? Math.round(currentWeather.wind.gust * 3.6) : null;
    const windDirection = currentWeather.wind.deg;
    return (
        <div className="wind-card">
            <div className="wind-header">
                <FaWind className="wind-icon"/>
                <h3>VIENTO</h3>
            </div>
            <div className="wind-content">
                <div className="wind-info">
                    <div className="wind-row">
                        <span className="wind-label">Viento</span>
                        <span className="wind-value">{windSpeed} km/h</span>
                    </div>
                    <div className="wind-row">
                        <span className="wind-label">Dirección</span>
                        <span className="wind-value">{windDirection}° SE</span>
                    </div>
                    <div className="wind-row">
                        {windGust ? (
                            <>
                                <span className="wind-label">Rachas</span>
                                <span className="wind-value">{windGust} km/h</span>
                            </>
                        ) : (
                            <span className="wind-no-gust">No se prevén rachas de viento</span>
                        )}
                    </div>
                </div>
                <div className="wind-compass">
                    <div className="compass-circle">
                        <div className="compass-arrow" style={{ transform: `rotate(${windDirection}deg)` }}>
                            ↑
                        </div>
                        <div className="compass-labels">
                            <span className="compass-n">N</span>
                            <span className="compass-s">S</span>
                            <span className="compass-e">E</span>
                            <span className="compass-w">O</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}