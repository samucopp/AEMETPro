import { LayerGroup, MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

export default function Map(city) {
    console.log(city.city);
    return (
        <div className='mapa-container'>
            <MapContainer center={[city.city.lat, city.city.lon]} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
}