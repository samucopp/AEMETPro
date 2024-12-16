import { BsSunriseFill } from "react-icons/bs";
import './Sunrise.css';

export function WeatherTodayRise({ datosAmanecer, zonaHoraria }) {
    if (!datosAmanecer?.sunrise) {
        return null;
    }
    const horaAmanecer = new Date((datosAmanecer.sunrise + zonaHoraria) * 1000)
        .toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
    const horaAtardecer = new Date((datosAmanecer.sunset + zonaHoraria) * 1000)
        .toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });

    return (
        <div className="sunrise-card">
            <div className="sunrise-header">
                <BsSunriseFill className="sunrise-icon"/>
                <h3>AMANECER</h3>
            </div>
            <div className="sunrise-content">
                <div className="time-value">
                    {horaAmanecer}
                </div>
            </div>
        </div>
    );
}