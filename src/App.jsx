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