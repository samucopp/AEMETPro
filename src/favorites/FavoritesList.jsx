import { useState,useEffect } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/localStorageHelpers";

function FavoritesList() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = loadFromLocalStorage("favorites");
        if (savedFavorites) {
            setFavorites(savedFavorites);
        }
    }, []);
    return (
        <div>
            <h2>Favoritos</h2>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map((fav) => (
                        <li key={fav.id}>{fav.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No tienes favoritos aún.</p>
            )}
        </div>
    );
}

export default FavoritesList;
