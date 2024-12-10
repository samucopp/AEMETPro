import Button from '../button/Button';
import Input from '../input/Input';
import { getGeoLocation } from '../utils/ApiCalls';
import { useState } from 'react';
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
                    />
                    <Button loading={loading} />
                </form>
                <div className="drop-down-menu">
                    {cityList.map((city) => (
                        <div onClick={() => handleSubmit(city)} key={city.state}>{city.name}</div>
                    ))}
                </div>
            </div>
            {error && (
                <div className="error-message">{error}</div>
            )}
        </>
    );
}

export default SearchBar;