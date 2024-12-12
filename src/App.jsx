import { useState, useEffect } from 'react';
import ItemList from "./favorites/ItemList";
import FavoritesList from "./favorites/FavoritesList";
import SearchBar from './search-bar/SearchBar';
import WeatherCard from './weatherCard/WeatherCard';
import './App.css';

export default function App() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [items, setItems] = useState([
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
    ]);
    const [favorites, setFavorites] = useState([]);

    const handleCitySelect = (city) => {
        console.log('Ciudad seleccionada:', city);
        setSelectedCity(city);
    };

    useEffect(() => {
        const savedFavorites = loadFromLocalStorage("favorites");
        if (savedFavorites) {
            setFavorites(savedFavorites);
        }
    }, []);

    useEffect(() => {
        saveToLocalStorage("favorites", favorites);
    }, [favorites]);

    const addToFavorites = (city) => {
        setFavorites((prevFavorites) => {
            // Evitar duplicados
            if (prevFavorites.some((fav) => fav.name === city.name)) {
                return prevFavorites;
            }
            return [...prevFavorites, city]; // Almacenar toda la ciudad
        });
    };

    const toggleFavorite = (item) => {
        setFavorites((prevFavorites) =>
            prevFavorites.some((fav) => fav.id === item.id)
                ? prevFavorites.filter((fav) => fav.id !== item.id)
                : [...prevFavorites, item]
        );
    };

    return (
        <div className={`app-container ${selectedCity ? 'with-weather' : ''}`}>
            <div className="content-wrapper">
                <h1>Lista de elementos y Favoritos</h1>
                <SearchBar onSubmit={handleCitySelect} />
                {selectedCity && (
                    <div className="weather-wrapper">
                        <WeatherCard city={selectedCity} addToFavorites={addToFavorites} />
                    </div>
                )}
                <ItemList items={items} favorites={favorites} toggleFavorite={toggleFavorite} />
                <FavoritesList favorites={favorites} />
            </div>
        </div>
    );
}

// Funciones de ayuda para localStorage
const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};
