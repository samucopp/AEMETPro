import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { IoUmbrella } from "react-icons/io5";
import { BsCloudsFill } from "react-icons/bs";
import { IoSpeedometer } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";
import 'leaflet/dist/leaflet.css';
import './Map.css';

export default function Map({ city }) {
    const maps = [
        {
            name: <><IoUmbrella className='icons' />{'Precipitaciones'}</>,
            className: 'precipitation-map',
            url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`,
        },
        {
            name: <><BsCloudsFill className='icons'/>{'Nubes'}</>,
            className: 'clouds-map',
            url: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`,
        },
        {
            name: <><IoSpeedometer className='icons'/>{'Presión a nivel del mar'}</>,
            className: 'pressure-map',
            url: `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`,
        },
        {
            name: <><FaWind className='icons'/>{'Velocidad del viento'}</>,
            className: 'wind-map',
            url: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`,
        },
        {
            name: <><FaTemperatureHalf className='icons'/>{'Temperatura'}</>,
            className: 'temp-map',
            url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`,
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextMap = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % maps.length);
    };
    const prevMap = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? maps.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className={"map-section " + maps[currentIndex].className}>
            <div className="map-title ">{maps[currentIndex].name}</div>
            <div className="map-container">
                <button className="arrow left" onClick={prevMap}>◀</button>
                <MapContainer
                    className="complete-map"
                    center={[city.lat, city.lon]}
                    zoom={8}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        className="base-map"
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        opacity={0.7}
                    />
                    <TileLayer
                        className='layer-map'
                        url={maps[currentIndex].url}
                        opacity={1}
                    />
                </MapContainer>
                <button className="arrow right" onClick={nextMap}>▶</button>
                <div className="indicators">
                    {maps.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
}
