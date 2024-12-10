import { useState } from 'react';
//import Favorites from './favorites/Favorites';
import SearchBar from './search-bar/SearchBar';
//import WeatherCard from './weatherCard/WeatherCard';

export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div>
      {/* <Favorites /> */}
      <SearchBar onSubmit={setSelectedCity} />
      {selectedCity && <WeatherCard />}
    </div>
  );
}