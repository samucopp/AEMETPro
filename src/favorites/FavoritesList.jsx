/* // FavoritesList.jsx
import WeatherToday from '../weatherCard/WeatherToday';


export default function FavoritesList({ favorites, onRemove }) {
    if (!favorites.length) return null;

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">Ciudades Favoritas</h2>
            <div className="favorites-grid">
                {favorites.map((favorite) => (
                    <div key={favorite.id} className="favorite-item">
                        <div className="favorite-header">
                            <h3>{favorite.name}</h3>
                            <button
                                className="remove-favorite"
                                onClick={() => onRemove(favorite.id)}
                            >
                                ✕
                            </button>
                        </div>
                        <WeatherToday 
                            currentWeather={favorite.weather}
                            cityName={favorite.name}
                            compact={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
} */