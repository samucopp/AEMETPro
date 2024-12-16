import { IoSpeedometer } from "react-icons/io5";
import './GroundPressure.css';

export function WeatherTodayGroundPressure({ currentWeather }) {
    if (!currentWeather?.main?.grnd_level) {
        return null;
    }
    const groundPressure = currentWeather.main.grnd_level;

    return (
        <div className="ground-pressure-card">
            <div className="ground-pressure-header">
                <IoSpeedometer className="ground-pressure-icon"/>
                <h3>PRESIÓN TERRESTRE</h3>
            </div>
            <div className="ground-pressure-content">
                <div className="ground-pressure-value">
                    {groundPressure}
                    <span className="ground-pressure-unit">hPa</span>
                </div>
            </div>
        </div>
    );
}