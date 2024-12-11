import React from 'react';
import './DropDownMenu.css';  // Puedes crear un archivo CSS separado si lo prefieres

function DropDownMenu({ cityList, onCitySelect }) {
    return (
        <div className="drop-down-menu">
            {cityList.map((city) => (
                <div 
                    className="city-item"
                    onClick={() => onCitySelect(city)} 
                    key={`${city.lat}-${city.lon}`}
                >
                    <span className="city-name">{city.name}</span>
                    {city.state && <span className="city-state">, {city.state}</span>}
                    <span className="city-country"> ({city.country})</span>
                </div>
            ))}
        </div>
    );
}

export default DropDownMenu;