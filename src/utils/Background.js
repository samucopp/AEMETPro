const getBackgroundImage = (weatherMain) => {
    const backgrounds = {
        Rain: 'url(/images/rain.gif)',
        Clear: 'url(/images/clearSkyDay.gif)',
        Clouds: 'url(/images/clouds.gif)',
        Thunderstorm: 'url(/images/thunderstorm.gif)',
        Drizzle: 'url(/images/drizzle.gif)',
        Snow: 'url(/images/snow.gif)',
        Atmosphere: 'url(/images/atmosphere.gif)',
    };
    return backgrounds[weatherMain] || 'none'; // Fondo predeterminado
};

export default getBackgroundImage;