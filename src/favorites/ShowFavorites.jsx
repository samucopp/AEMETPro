// ShowFavorites.jsx
import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../utils/ApiCalls';
import WeatherToday from '../weatherCard/WeatherToday';
import './favoritesList.css';

const CarouselDots = ({ total, current, onDotClick }) => {
    return (
        <div className="carousel-dots">
            {Array.from({ length: total }, (_, index) => (
                <button
                    key={index}
                    className={`carousel-dot ${index === current ? 'active' : ''}`}
                    onClick={() => onDotClick && onDotClick(index)}
                    aria-label={`Ir a ciudad ${index + 1}`}
                />
            ))}
        </div>
    );
};

function ShowFavorites({ onFavoriteClick }) {
    const [favorites, setFavorites] = useState([]);
    const [favoritesWeather, setFavoritesWeather] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

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

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            nextFavorite();
        }
        if (isRightSwipe) {
            prevFavorite();
        }
    };

    if (!favorites.length) return null;

    const currentFavorite = favorites[currentIndex];
    const cityKey = `${currentFavorite.name}-${currentFavorite.lat}-${currentFavorite.lon}`;

    return (
        <div className="carousel-container">
            <div className="carousel-content">
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
                    onClick={() => onFavoriteClick(currentFavorite)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
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

            {favorites.length > 1 && (
                <CarouselDots 
                    total={favorites.length} 
                    current={currentIndex}
                    onDotClick={setCurrentIndex}
                />
            )}
        </div>
    );
}

export default ShowFavorites;