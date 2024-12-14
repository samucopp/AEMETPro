function getWeatherIcon(weatherCode, hour=null) { 
    let currentHour = hour
    if (!currentHour) {
        currentHour = new Date().getHours();
    }
    const isNight = currentHour >= 18 || currentHour < 6;

    if (weatherCode >= 200 && weatherCode <= 232) return '/weather-icons/nube-lluvia-rayo.png';
    if (weatherCode >= 300 && weatherCode <= 321) return '/weather-icons/nube-lluvia.png';
    if (weatherCode >= 500 && weatherCode <= 504) return `/weather-icons/nube-${isNight ? 'luna' : 'sol'}-lluvia.png`;
    if (weatherCode >= 520 && weatherCode <= 531) return '/weather-icons/nube-lluvia.png';
    if (weatherCode >= 600 && weatherCode < 622) return '/weather-icons/nube-nieve.png';
    if (weatherCode >= 701 && weatherCode < 781) return '/weather-icons/nube1.png';
    if (weatherCode === 511) return '/weather-icons/nube-lluvia-nieve.png';
    if (weatherCode === 800) return `/weather-icons/${isNight ? 'luna' : 'sol'}.png`;
    if (weatherCode === 801) return `/weather-icons/nube-${isNight ? 'luna' : 'sol'}.png`;
    if (weatherCode >= 802 && weatherCode <= 804) return '/weather-icons/nube.png';
}

export default getWeatherIcon;