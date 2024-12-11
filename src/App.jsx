import { useState, useEffect} from 'react';
import ItemList from "./favorites/ItemList";
import FavoritesList from "./favorites/FavoriteList";
import SearchBar from './search-bar/SearchBar';
//import WeatherCard from './weatherCard/WeatherCard';

 export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div>
        <FavoritesList />
      <SearchBar onSubmit={setSelectedCity} />
      {selectedCity && <WeatherCard />}
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
