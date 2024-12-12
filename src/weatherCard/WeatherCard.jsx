import { useEffect, useState } from 'react';
import { getFiveDayForecast, getCurrentWeather } from '../utils/ApiCalls';
import WeatherToday from './WeatherToday';
import WeatherFiveDays from './WeatherFiveDays';
import './WeatherCard.css';

function WeatherCard({ city, addToFavorites }) {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);
    const [datosDelSistema, setDatosDelSistema] = useState(null);
    const [zonaHoraria, setZonaHoraria] = useState(null);
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
                // Obtener datos actuales
                const currentData = await getCurrentWeather(city.lat, city.lon);
                setCurrentWeather(currentData);
                setDatosDelSistema(currentData.sys);
                setZonaHoraria(currentData.timezone);

                // Obtener pronóstico de 5 días
                const fiveDayData = await getFiveDayForecast(city.lat, city.lon);
                setNext24Hours(fiveDayData.list.slice(0, 8));
                setForecastWeather(fiveDayData.list[0]);

                // Agrupar por días para el pronóstico de 5 días
                const groupedByDay = fiveDayData.list.reduce((acc, item) => {
                    const date = new Date(item.dt * 1000).toLocaleDateString();
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(item);
                    return acc;
                }, {});

                // Modificamos esta parte para usar timestamps en lugar de strings de fecha
                const dailyData = Object.entries(groupedByDay)
                    .slice(1, 6)
                    .map(([_, items]) => ({
                        date: items[0].dt * 1000, // Guardamos el timestamp
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
                <button className="favorites">Favoritos</button>
            </div>
            
            <WeatherToday 
                currentWeather={currentWeather}
                forecastWeather={forecastWeather}
                next24Hours={next24Hours}
                cityName={city.name}
                datosDelSistema={datosDelSistema}
                zonaHoraria={zonaHoraria}
            />
            
            <WeatherFiveDays 
                dailyForecast={dailyForecast} 
            />
        </div>
    );
}

export default WeatherCard;
