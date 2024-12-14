import { useEffect, useState } from 'react';
import { getFiveDayForecast, getCurrentWeather, getPolution } from '../utils/ApiCalls';
import WeatherToday from '../weatherToday/WeatherToday';
import WeatherFiveDays from '../weatherFiveDays/WeatherFiveDays';
import SliderMaps from '../map/Map';

import './WeatherCard.css';

function WeatherCard({ city }) {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);
    const [datosDelSistema, setDatosDelSistema] = useState(null);
    const [zonaHoraria, setZonaHoraria] = useState(null);
    const [next24Hours, setNext24Hours] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [pollutionData, setPollutionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    
    useEffect(() => {
        if (city) {
            const favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
            const isCurrentCityFavorite = favorites.some(fav => 
                fav.name === city.name && 
                fav.lat === city.lat && 
                fav.lon === city.lon
            );
            setIsFavorite(isCurrentCityFavorite);
        }
    }, [city]);

    
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!city) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const [currentData, fiveDayData, pollutionResponse] = await Promise.all([
                    getCurrentWeather(city.lat, city.lon),
                    getFiveDayForecast(city.lat, city.lon),
                    getPolution(city.lat, city.lon)
                ]);

                setCurrentWeather(currentData);
                setDatosDelSistema(currentData.sys);
                setZonaHoraria(currentData.timezone);
                setPollutionData(pollutionResponse);

                setNext24Hours(fiveDayData.list.slice(0, 8));
                setForecastWeather(fiveDayData.list[0]);

                const groupedByDay = fiveDayData.list.reduce((acc, item) => {
                    const date = new Date(item.dt * 1000).toLocaleDateString();
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(item);
                    return acc;
                }, {});

                const dailyData = Object.entries(groupedByDay)
                    .slice(1, 6)
                    .map(([_, items]) => ({
                        date: items[0].dt * 1000,
                        forecasts: items
                    }));

                setDailyForecast(dailyData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message || 'Error al obtener datos del clima');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    const toggleFavorite = async () => {
        try {
            let favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
            
            if (isFavorite) {
                favorites = favorites.filter(fav => 
                    !(fav.name === city.name && fav.lat === city.lat && fav.lon === city.lon)
                );
            } else {
                const newFavorite = {
                    name: city.name,
                    lat: city.lat,
                    lon: city.lon
                };
                favorites.push(newFavorite);
            }
            
            localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
            setIsFavorite(!isFavorite);
            
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!currentWeather || !next24Hours || !dailyForecast) return null;

    return (
        <div className="weather-card">
            <div className="card-header">
                <button 
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={toggleFavorite}
                    aria-label={isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
                >
                    {isFavorite ? <img src="/fav-icons/heart-full.png" alt="Favorito" className='fav-icon' /> : <img src="/fav-icons/heart-empty.png" alt="No favorito" className='fav-icon'/>}

                </button>
            </div>
            
            <WeatherToday 
                currentWeather={currentWeather} 
                forecastWeather={forecastWeather}
                next24Hours={next24Hours}
                cityName={city.name}
                datosDelSistema={datosDelSistema}
                zonaHoraria={zonaHoraria}
                pollutionData={pollutionData}
            />
            
            <WeatherFiveDays 
                dailyForecast={dailyForecast} 
            />

            <SliderMaps 
                city={city}
            />
        </div>
    );
}

export default WeatherCard;