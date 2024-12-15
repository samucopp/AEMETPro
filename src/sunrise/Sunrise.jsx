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
                <span className="sunrise-icon">🌅</span>
                <h3>SALIDA DEL SOL</h3>
            </div>
            <div className="sunrise-content">
                <div className="time-value">
                    {horaAmanecer}
                </div>
                <div className="sunrise-graph">
                    <div className="sun-path">
                        <div className="sun-marker"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}