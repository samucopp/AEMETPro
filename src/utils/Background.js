const getBackgroundImage = (weatherMain) => {
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6;
    const backgrounds = {
        Rain: 'url(/images/rain.gif)',
        Clear: `url(/images/clearSky${isNight ? 'Night' : 'Day'}.gif)`,
        Clouds: 'url(/images/clouds.gif)',
        Thunderstorm: 'url(/images/thunderstorm.gif)',
        Drizzle: 'url(/images/drizzle.gif)',
        Snow: 'url(/images/snow.gif)',
        Atmosphere: 'url(/images/atmosphere.gif)',
    };
    return backgrounds[weatherMain] || 'url(images/fondo-principal.png)';
};

export default getBackgroundImage;