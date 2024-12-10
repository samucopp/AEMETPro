async function getGeoLocation(city) {
    const apiKey = "98122e0b77bec612bce873d52e0343a4";
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    
    console.log('Fetching geo location for:', city);
    const response = await fetch(url);
    const data = await response.json();
    console.log('Geo location data:', data);
    
    if (!data || data.length === 0) {
      throw new Error('Ciudad no encontrada');
    }
    
    return data;
  }

  async function getCurrentWeather(lat, lon) {
    const apiKey = "98122e0b77bec612bce873d52e0343a4";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    console.log('Fetching weather for coordinates:', { lat, lon });
    const response = await fetch(url);
    const data = await response.json();
    console.log('Weather data:', data);
    
    if (data.cod && data.cod !== 200) {
      throw new Error(data.message || 'Error al obtener el clima');
    }
    
    return data;
  }

  export { getGeoLocation, getCurrentWeather };