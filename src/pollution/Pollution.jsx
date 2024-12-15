import './Pollution.css';

const AirQualityIndex = ({ aqi }) => {
  const getAQIStatus = (aqi) => {
    switch (aqi) {
      case 1:
        return { text: 'Buena', className: 'aqi-good' };
      case 2:
        return { text: 'Regular', className: 'aqi-moderate' };
      case 3:
        return { text: 'Moderada', className: 'aqi-unhealthy' };
      case 4:
        return { text: 'Mala', className: 'aqi-bad' };
      case 5:
        return { text: 'Muy Mala', className: 'aqi-hazardous' };
      default:
        return { text: 'No disponible', className: '' };
    }
  };
  const status = getAQIStatus(aqi);

  return (
    <div className="aqi-indicator">
      <div className={`aqi-value ${status.className}`}>
        {status.text}
      </div>
      <div className="aqi-label">
        Índice de Calidad del Aire
      </div>
    </div>
  );
};

const WeatherTodayPollution = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) {
    return <div className="current_pollution">No hay datos disponibles</div>;
  }
  const pollutionData = data.list[0];
  const { main, components } = pollutionData;
  const formatValue = (value) => {
    return value.toFixed(2);
  };

  return (
    <div className="current_pollution">
      <div className="pollution-header">
        <h3>Calidad del Aire</h3>
      </div>
      <AirQualityIndex aqi={main.aqi} />
      <div className="pollution-content">
        <div className="pollution-item">
          <span className="pollution-label">CO</span>
          <span className="pollution-value">
            {formatValue(components.co)}
            <span className="pollution-unit">μg/m³</span>
          </span>
        </div>
        <div className="pollution-item">
          <span className="pollution-label">NO₂</span>
          <span className="pollution-value">
            {formatValue(components.no2)}
            <span className="pollution-unit">μg/m³</span>
          </span>
        </div>
        <div className="pollution-item">
          <span className="pollution-label">O₃</span>
          <span className="pollution-value">
            {formatValue(components.o3)}
            <span className="pollution-unit">μg/m³</span>
          </span>
        </div>
        <div className="pollution-item">
          <span className="pollution-label">SO₂</span>
          <span className="pollution-value">
            {formatValue(components.so2)}
            <span className="pollution-unit">μg/m³</span>
          </span>
        </div>
        <div className="pollution-item">
          <span className="pollution-label">PM2.5</span>
          <span className="pollution-value">
            {formatValue(components.pm2_5)}
            <span className="pollution-unit">μg/m³</span>
          </span>
        </div>
        <div className="pollution-item">
          <span className="pollution-label">PM10</span>
          <span className="pollution-value">
            {formatValue(components.pm10)}
            <span className="pollution-unit">μg/m³</span>
          </span>
        </div>
        <div className="pollution-item">
          <span className="pollution-label">NH₃</span>
          <span className="pollution-value">
            {formatValue(components.nh3)}
            <span className="pollution-unit">μg/m³</span>
          </span>
        </div>
        <div className="pollution-item">
          <span className="pollution-label">NO</span>
          <span className="pollution-value">
            {formatValue(components.no)}
            <span className="pollution-unit">μg/m³</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export { WeatherTodayPollution };
export default WeatherTodayPollution;