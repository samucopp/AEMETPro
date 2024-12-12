import FavoriteTemplate from "./FavoriteTemplate";
export default function FavoritesList({ favorites, OnCityClick }) {
    return (
        <div>
            <h2>Favoritos</h2>
            {favorites.length > 0 ? (
                <div className="favorites-list">
                    {favorites.map((city, index) => (
                        <div
                        key={index}
                        className="favorite-card"
                        onClick={() => OnCityClick(city)}
                        style={{cursor:"pointer"}}
                        >
                        <FavoriteTemplate key={index} city={city}/>
                    ))}
                </div>
            ) : (
                <p>No tienes favoritos aún.</p>
            )}
        </div>
    );
}
