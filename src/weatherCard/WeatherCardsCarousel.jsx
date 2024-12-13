// WeatherCardsCarousel.jsx
import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import './weatherCardsCarousel.css';

function WeatherCardsCarousel({ favorites, activeCity, searchedCity }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allCities, setAllCities] = useState([]);

    
    useEffect(() => {
        const cities = [...favorites];
        
       
        if (searchedCity && !favorites.some(fav => 
            fav.lat === searchedCity.lat && fav.lon === searchedCity.lon
        )) {
            cities.unshift(searchedCity);
        }
        
        setAllCities(cities);

        
        const activeIndex = cities.findIndex(city => 
            city.lat === activeCity.lat && city.lon === activeCity.lon
        );
        setCurrentIndex(activeIndex !== -1 ? activeIndex : 0);
    }, [favorites, searchedCity, activeCity]);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === allCities.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? allCities.length - 1 : prevIndex - 1
        );
    };

    if (!allCities.length) return null;

    return (
        <div className="weather-cards-carousel">
            {allCities.length > 1 && (
                <button 
                    className="carousel-nav prev"
                    onClick={prevCard}
                    aria-label="Anterior ciudad"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
            )}

            <div className="carousel-content">
                <WeatherCard city={allCities[currentIndex]} />
            </div>

            {allCities.length > 1 && (
                <button 
                    className="carousel-nav next"
                    onClick={nextCard}
                    aria-label="Siguiente ciudad"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default WeatherCardsCarousel;