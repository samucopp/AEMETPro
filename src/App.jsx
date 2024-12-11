import { useState, useEffect} from 'react';
import ItemList from "./favorites/ItemList";
import FavoritesList from "./favorites/FavoriteList";
import { useState } from 'react';
import SearchBar from './search-bar/SearchBar';
import WeatherCard from './weatherCard/WeatherCard';
import './App.css';

 export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    console.log('Ciudad seleccionada:', city);
    setSelectedCity(city);
  };

  return (
    <div>
        <FavoritesList />
      <SearchBar onSubmit={setSelectedCity} />
      {selectedCity && <WeatherCard />}
    <div className={`app-container ${selectedCity ? 'with-weather' : ''}`}>
      <div className="content-wrapper">
        <h1></h1>
        <div className="search-wrapper">
          <SearchBar onSubmit={handleCitySelect} />
        </div>
        {selectedCity && (
          <div className="weather-wrapper">
            <WeatherCard city={selectedCity} />
          </div>
        )}
      </div>
    </div>
  );
}
 /* function App() {
    const [items, setItems] = useState([
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
    ]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = loadFromLocalStorage("favorites");
        if (savedFavorites) {
            setFavorites(savedFavorites);
        }
    }, []);

    useEffect(() => {
        saveToLocalStorage("favorites", favorites);
    }, [favorites]);

    const toggleFavorite = (item) => {
        setFavorites((prevFavorites) =>
            prevFavorites.some((fav) => fav.id === item.id)
                ? prevFavorites.filter((fav) => fav.id !== item.id)
                : [...prevFavorites, item]
        );
    };

    return (
        <div>
            <h1>Lista de elementos</h1>
            <ItemList items={items} favorites={favorites} toggleFavorite={toggleFavorite} />
            <FavoritesList favorites={favorites} />
        </div>
    );
} */

/* export default App; */
