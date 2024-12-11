function ItemList({ items, favorites, toggleFavorite }) {
    const isFavorite = (item) => favorites.some((fav) => fav.id === item.id);

    
}

export default ItemList;