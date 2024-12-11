import { useEffect, useState } from 'react';
import { getFiveDayForecast } from '../utils/ApiCalls';
import WeatherToday from './WeatherToday';
import WeatherFiveDays from './WeatherFiveDays';
import './WeatherCard.css';

function WeatherCard({ city, addToFavorites }) {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [next24Hours, setNext24Hours] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!city) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const fiveDayData = await getFiveDayForecast(city.lat, city.lon);
                
                // Próximas 24 horas y tiempo actual
                setNext24Hours(fiveDayData.list.slice(0, 8));
                setCurrentWeather(fiveDayData.list[0]);

                // Agrupar por días para el pronóstico de 5 días
                const groupedByDay = fiveDayData.list.reduce((acc, item) => {
                    const date = new Date(item.dt * 1000).toLocaleDateString();
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(item);
                    return acc;
                }, {});

                // Obtener los próximos 5 días
                const dailyData = Object.entries(groupedByDay)
                    .slice(1, 6)
                    .map(([date, items]) => ({
                        date,
                        forecasts: items
                    }));

                setDailyForecast(dailyData);
            } catch (err) {
                setError(err.message || 'Error al obtener datos del clima');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!currentWeather || !next24Hours || !dailyForecast) return null;

    return (
        <div className="weather-card">
            <div className="card-header">
                <h2 className="current-weather__city">{city.name}</h2>
                <button 
                    className="favorites" 
                    onClick={() => addToFavorites(city)}>
                    Añadir a Favoritos
                </button>
            </div>
            <WeatherToday 
                currentWeather={currentWeather} 
                next24Hours={next24Hours} 
            />
            <WeatherFiveDays 
                dailyForecast={dailyForecast} 
            />
        </div>
    );
}

export default WeatherCard;
