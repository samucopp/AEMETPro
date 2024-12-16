import { BsSunsetFill } from "react-icons/bs";
import './Sunset.css';

export function WeatherTodaySunset({ datosAmanecer, zonaHoraria }) {
    if (!datosAmanecer?.sunset) {
        return null;
    }
    const horaAtardecer = new Date((datosAmanecer.sunset + zonaHoraria) * 1000)
        .toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    const horaAmanecer = new Date((datosAmanecer.sunrise + zonaHoraria) * 1000)
        .toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

    return (
        <div className="sunset-card">
            <div className="sunset-header">
                <BsSunsetFill className="sunset-icon"/>
                <h3>ATARDECER</h3>
            </div>
            <div className="sunset-content">
                <div className="time-value">
                    {horaAtardecer}
                </div>
            </div>
        </div>
    );
}