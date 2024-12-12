import FavoriteTemplate from "./FavoriteTemplate";
export default function FavoritesList({ favorites }) {
    return (
        <div>
            <h2>Favoritos</h2>
            {favorites.length > 0 ? (
                <div className="favorites-list">
                    {favorites.map((city, index) => (
                        <FavoriteTemplate key={index} city={city}/>
                    ))}
                </div>
            ) : (
                <p>No tienes favoritos aún.</p>
            )}
        </div>
    );
}
