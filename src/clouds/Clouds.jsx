import { useEffect, useState } from 'react';
import './clouds.css';

export function WeatherTodayClouds({ currentWeather }) {
    const [percentage, setPercentage] = useState(0);
    
    useEffect(() => {
        if (currentWeather?.clouds?.all) {
            setPercentage(currentWeather.clouds.all);
        }
    }, [currentWeather]);

    if (!currentWeather || !currentWeather.clouds) {
        return null;
    }

    // Calcular los valores para el círculo SVG
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="current_clouds">
            <div className="clouds-header">
                <span className="clouds-icon">☁️</span>
                <h3>NUBES</h3>
            </div>
            <div className="clouds-content">
                <div className="clouds-circle">
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
                            stroke="#60A5FA"
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
                            className="clouds-percentage"
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