function ItemList({ items, favorites, toggleFavorite }) {
    const isFavorite = (item) => favorites.some((fav) => fav.id === item.id);

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.name}
                    <button onClick={() => toggleFavorite(item)}>
                        {isFavorite(item) ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ItemList;
