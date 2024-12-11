import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

export default function Map(city) {
    return (
        <div className='mapa-container'>
            <MapContainer className='precipitation-map' center={[city.city.lat, city.city.lon]} zoom={5} scrollWheelZoom={true}>
                <TileLayer className='base-map'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    opacity={0.7}
                />
                <TileLayer className='precipitation-layer'
                    url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`}
                    detectRetina={true}
                    opacity={1}
                />
            </MapContainer>
            <MapContainer className='clouds-map' center={[city.city.lat, city.city.lon]} zoom={5} scrollWheelZoom={true}>
                <TileLayer className='base-map'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    opacity={0.7}
                />
                <TileLayer className='clouds-layer'
                    url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`}
                    detectRetina={true}
                    opacity={1}
                />
            </MapContainer>
            <MapContainer className='pressure-map' center={[city.city.lat, city.city.lon]} zoom={5} scrollWheelZoom={true}>
                <TileLayer className='base-map'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    opacity={0.7}
                />
                <TileLayer className='pressure-layer'
                    url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`}
                    detectRetina={true}
                    opacity={1}
                />
            </MapContainer>
            <MapContainer className='wind-map' center={[city.city.lat, city.city.lon]} zoom={5} scrollWheelZoom={true}>
                <TileLayer className='base-map'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    opacity={0.7}
                />
                <TileLayer className='wind-layer'
                    url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`}
                    detectRetina={true}
                    opacity={1}
                />
            </MapContainer>
            <MapContainer className='temp-map' center={[city.city.lat, city.city.lon]} zoom={5} scrollWheelZoom={true}>
                <TileLayer className='base-map'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    opacity={0.7}
                />
                <TileLayer className='temp-layer'
                    url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=98122e0b77bec612bce873d52e0343a4`}
                    detectRetina={true}
                    opacity={1}
                />
            </MapContainer>
        </div>
    );
}