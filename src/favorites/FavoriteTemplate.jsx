import { useState, useEffect } from "react";
import { getCurrentWeather } from "../utils/ApiCalls";
import WeatherToday from "../weatherCard/WeatherToday";

function FavoriteTemplate({city}) {
const [currentWeather, setCurrentWeather] = useState (null);

useEffect (()=>{
    async function getTodayWeather(city){
        const weatherResponse = await getCurrentWeather(city.lat, city.lon);
        setCurrentWeather(weatherResponse)
    }
    getTodayWeather(city);
},[city])

return(
    <>
    {currentWeather && <WeatherToday currentWeather={currentWeather}/>}
    </>
)
}

export default FavoriteTemplate