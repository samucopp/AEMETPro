import Button from '../button/Button';
import Input from '../input/Input';
import { getGeoLocation } from '../utils/ApiCalls';
import { useState } from 'react';
import DropDownMenu from '../drop-down-menu/DropDownMenu';
import './SearchBar.css';

function SearchBar({ onSubmit }) {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cityList, setCityList] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
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

    const handleSubmit = city => {
        setCityList([]);
        onSubmit(city);
    }

    return (
        <>
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Buscar ciudad..."
                    />
                    <Button loading={loading} />
                </form>
                {cityList.length > 0 && (
                    <DropDownMenu 
                        cityList={cityList}
                        onCitySelect={handleSubmit}
                    />
                )}
            </div>
            {error && (
                <div className="error-message">{error}</div>
            )}
        </>
    );
}

export default SearchBar;