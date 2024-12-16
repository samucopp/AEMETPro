import { IoSpeedometer } from "react-icons/io5";
import './Sea.css';

export function WeatherTodaySeaLevel({ currentWeather }) {
    if (!currentWeather?.main?.sea_level) {
        return null;
    }
    const seaLevel = currentWeather.main.sea_level;

    return (
        <div className="sealevel-card">
            <div className="sealevel-header">
                <IoSpeedometer className="sealevel-icon"/>
                <h3>PRESIÓN A NIVEL DEL MAR</h3>
            </div>
            <div className="sealevel-content">
                <div className="sealevel-value">
                    {seaLevel}
                    <span className="sealevel-unit">hPa</span>
                </div>
            </div>
        </div>
    );
}