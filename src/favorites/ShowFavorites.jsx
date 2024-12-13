// ShowFavorites.jsx
import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../utils/ApiCalls';
import WeatherToday from '../weatherCard/WeatherToday';
import './favoritesList.css';

function ShowFavorites({ onFavoriteClick }) {
    const [favorites, setFavorites] = useState([]);
    const [favoritesWeather, setFavoritesWeather] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    
    useEffect(() => {
        const loadFavorites = () => {
            const saved = localStorage.getItem('weatherFavorites');
            if (saved) {
                try {
                    const parsedFavorites = JSON.parse(saved);
                    setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
                    setCurrentIndex(0);
                } catch (error) {
                    console.error('Error parsing favorites:', error);
                    setFavorites([]);
                }
            }
        };

        loadFavorites();

        const handleStorageChange = () => {
            loadFavorites();
        };

        window.addEventListener('favoritesUpdated', handleStorageChange);
        return () => {
            window.removeEventListener('favoritesUpdated', handleStorageChange);
        };
    }, []);

    
    useEffect(() => {
        const updateFavoritesWeather = async () => {
            const weatherData = {};
            for (const city of favorites) {
                try {
                    const weather = await getCurrentWeather(city.lat, city.lon);
                    weatherData[`${city.name}-${city.lat}-${city.lon}`] = weather;
                } catch (error) {
                    console.error(`Error loading weather for ${city.name}:`, error);
                }
            }
            setFavoritesWeather(weatherData);
        };

        if (favorites.length > 0) {
            updateFavoritesWeather();

            
            const interval = setInterval(updateFavoritesWeather, 300000);
            return () => clearInterval(interval);
        }
    }, [favorites]);

    const nextFavorite = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === favorites.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevFavorite = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? favorites.length - 1 : prevIndex - 1
        );
    };

    const handleFavoriteClick = (favorite) => {
        if (onFavoriteClick) {
            onFavoriteClick(favorite);
        }
    };

    if (!favorites.length) return null;

    const currentFavorite = favorites[currentIndex];
    const cityKey = `${currentFavorite.name}-${currentFavorite.lat}-${currentFavorite.lon}`;

    return (
        <div className="carousel-container">
            {favorites.length > 1 && (
                <button 
                    className="carousel-button prev"
                    onClick={prevFavorite}
                    aria-label="Anterior favorito"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
            )}
            
            <div 
                className="favorite-item"
                onClick={() => handleFavoriteClick(currentFavorite)}
                style={{ cursor: 'pointer' }}
            >
                {favoritesWeather[cityKey] && (
                    <WeatherToday 
                        currentWeather={favoritesWeather[cityKey]}
                        cityName={currentFavorite.name}
                        compact={true}
                    />
                )}
            </div>

            {favorites.length > 1 && (
                <button 
                    className="carousel-button next"
                    onClick={nextFavorite}
                    aria-label="Siguiente favorito"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default ShowFavorites;