// WeatherCardsCarousel.jsx
import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import './weatherCardsCarousel.css';

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

function WeatherCardsCarousel({ favorites, activeCity, searchedCity }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allCities, setAllCities] = useState([]);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

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
            nextCard();
        }
        if (isRightSwipe) {
            prevCard();
        }
    };

    if (!allCities.length) return null;

    return (
        <div className="weather-cards-carousel">
            <div className="carousel-content">
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

                <div 
                    className="card-container"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
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

            {allCities.length > 1 && (
                <CarouselDots 
                    total={allCities.length} 
                    current={currentIndex}
                    onDotClick={setCurrentIndex}
                />
            )}
        </div>
    );
}

export default WeatherCardsCarousel;