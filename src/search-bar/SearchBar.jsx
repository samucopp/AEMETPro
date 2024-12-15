import { getGeoLocation } from '../utils/ApiCalls';
import { useRef, useState } from 'react';
import Input from '../input/Input';
import DropDownMenu from '../drop-down-menu/DropDownMenu';
import './SearchBar.css';

function SearchBar({ onSubmit }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cityList, setCityList] = useState([]);
    const searchTimeout = useRef(null);
    const handleSearch = async (city) => {
        if (!city.trim()) {
            setCityList([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const geoData = await getGeoLocation(city);
            setCityList(geoData);
        } catch (err) {
            setError(err.message || 'Error al buscar la ciudad');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const newCity = e.target.value;
        setCityList([]);
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(() => {
            handleSearch(newCity);
        }, 500);
    };
    const handleSubmit = city => {
        setCityList([]);
        onSubmit(city);
    }

    return (
        <div className="search-container">
            <div className="page-title">
                <h1>Pronostik</h1>
            </div>
            <div className="search-bar">
                <Input
                    onChange={handleInputChange}
                    placeholder="Buscar ciudad..."
                />
                {cityList.length > 0 && (
                    <DropDownMenu
                        cityList={cityList}
                        onCitySelect={handleSubmit}
                    />
                )}
                {error && (
                    <div className="error-message">{error}</div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;