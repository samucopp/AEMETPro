import { IoMdEye } from "react-icons/io";
import './Visibility.css';

export function WeatherTodayVisibility({ currentWeather }) {
    if (!currentWeather || !currentWeather.visibility) {
        return null;
    }
    const visibilityInKm = (currentWeather.visibility / 1000).toFixed(1);

    return (
        <div className="current_visibility">
            <div className="visibility-header">
                <IoMdEye className="visibility-icon"/>
                <h3>VISIBILIDAD</h3>
            </div>
            <div className="visibility-content">
                <div className="visibility-value">
                    {visibilityInKm}
                    <span className="visibility-unit">km</span>
                </div>
            </div>
        </div>
    );
}