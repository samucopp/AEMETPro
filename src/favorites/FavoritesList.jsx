import React from "react";

export default function FavoritesList({ favorites, onCityClick }) {
    return (
        <div>
            <h2>Favoritos</h2>
            {favorites.length > 0 ? (
                <div className="favorites-list">
                    {favorites.map((city, index) => (
                        <div
                            key={index}
                            className="favorite-card"
                            onClick={() => onCityClick(city)}
                            style={{ cursor: "pointer" }} 
                        >
                            <h3>{city.name}</h3>
                            <p>Temperatura: {city.temperature}°C</p>
                            <p>Descripción: {city.description}</p>
                            <img src={city.iconUrl} alt={`Clima en ${city.name}`} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes favoritos aún.</p>
            )}
        </div>
    );
}
