async function getGeoLocation(city) {
  const apiKey = "98122e0b77bec612bce873d52e0343a4";
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
  console.log('Fetching geo location for:', city);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error de red: ${response.status}`);
  }
  const data = await response.json();
  console.log('Geo location data:', data);
  if (!data || data.length === 0) {
    throw new Error('Ciudad no encontrada');
  }
  return data;
}

async function getCurrentWeather(lat, lon) {
  const apiKey = "98122e0b77bec612bce873d52e0343a4";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error de red: ${response.status}`);
  }
  const data = await response.json();
  console.log('API Response:', data);
  return data;
}

async function getFiveDayForecast(lat, lon) {
  const apiKey = "98122e0b77bec612bce873d52e0343a4";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
  console.log('Fetching 5-day forecast for coordinates:', { lat, lon });
  const response = await fetch(url);
  if (!response.ok) {
    console.error('Error response:', await response.text());
    throw new Error(`Error de red: ${response.status}`);
  }
  const data = await response.json();
  console.log('5-day forecast data:', data);

  if (data.cod && data.cod !== "200") {
    throw new Error(data.message || 'Error al obtener el pronóstico');
  }

  return data;
}

async function getPolution(lat, lon) {
  const apiKey = "98122e0b77bec612bce873d52e0343a4";
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log('Fetching pollution for coordinates:', { lat, lon });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error de red: ${response.status}`);
  }
  const data = await response.json();
  console.log('Pollution data:', data);
  if (data.cod && data.cod !== "200") {
    throw new Error(data.message || 'Error al obtener la calidad del aire');
  }
  return data;
}

export { getGeoLocation, getCurrentWeather, getFiveDayForecast, getPolution };