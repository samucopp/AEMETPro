import './sunrise.css';

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

    return (
        <div className="current_rise">
            <h3>Amanecer</h3>
            <div>
                <p><span>🌅</span></p>
                <p>
                    <span>Hora:</span>{' '}
                    {horaAmanecer}
                </p>
            </div>
        </div>
    );
}