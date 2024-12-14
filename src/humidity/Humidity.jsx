import { useEffect, useState } from 'react';
import './humidity.css';

export function WeatherTodayHumidity({ currentWeather }) {
    const [percentage, setPercentage] = useState(0);
    
    useEffect(() => {
        if (currentWeather?.main?.humidity) {
            setPercentage(currentWeather.main.humidity);
        }
    }, [currentWeather]);

    if (!currentWeather || !currentWeather.main) {
        return null;
    }

    // Calcular los valores para el círculo SVG
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="current_humidity">
            <div className="humidity-header">
                <span className="humidity-icon">💧</span>
                <h3>HUMEDAD</h3>
            </div>
            <div className="humidity-content">
                <div className="humidity-circle">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        {/* Círculo base (gris) */}
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            stroke="#4B5563"
                            strokeWidth="8"
                            fill="none"
                        />
                        {/* Círculo de progreso */}
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            stroke="#38BDF8" // Color azul más claro para humedad
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            transform="rotate(-90 60 60)"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="progress-ring__circle"
                        />
                        {/* Texto central */}
                        <text
                            x="60"
                            y="60"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="humidity-percentage"
                            fill="white"
                        >
                            {percentage}%
                        </text>
                    </svg>
                </div>
            </div>
        </div>  
    );
}