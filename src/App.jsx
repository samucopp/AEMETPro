import { useState, useEffect } from 'react';
import SearchBar from './search-bar/SearchBar';
import ShowFavorites from './favorites/ShowFavorites';
import WeatherCardsCarousel from './weatherCarousel/WeatherCardsCarousel';
import './App.css';

export default function App() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchedCity, setSearchedCity] = useState(null);
    const [showFavorites, setShowFavorites] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('weatherFavorites');
        return saved ? JSON.parse(saved) : [];
    });
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSearchedCity(city);
        setShowFavorites(false);
    };
    const handleFavoriteClick = (favorite) => {
        setSelectedCity(favorite);
        setShowFavorites(false);
    };
    useEffect(() => {
        const handleFavoritesUpdate = () => {
            const saved = localStorage.getItem('weatherFavorites');
            if (saved) {
                const parsedFavorites = JSON.parse(saved);
                setFavorites(parsedFavorites);
                if (searchedCity) {
                    const updatedSearchedCity = parsedFavorites.find(fav =>
                        fav.lat === searchedCity.lat && fav.lon === searchedCity.lon
                    );
                    if (updatedSearchedCity) {
                        setSearchedCity(updatedSearchedCity);
                    }
                }
            }
        };
        window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
        return () => {
            window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
        };
    }, [searchedCity]);

    return (
        <div className={`app-container ${selectedCity ? 'with-weather' : ''}`}>
            <div className="content-wrapper">
                <div className={`fav-container ${selectedCity ? 'hidden' : ''}`}>
                    {showFavorites && (
                        <ShowFavorites
                            onFavoriteClick={handleFavoriteClick}
                        />
                    )}
                </div>
                <SearchBar onSubmit={handleCitySelect} />
                {selectedCity && (
                    <WeatherCardsCarousel
                        favorites={favorites}
                        activeCity={selectedCity}
                        searchedCity={searchedCity}
                    />
                )}
            </div>
        </div>
    );
}