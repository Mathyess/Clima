import React, { useState } from 'react';
import { WeatherData } from '../types/weather';
import { 
  MapPin, 
  Wind, 
  Droplets, 
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  Search
} from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData;
  onSearch: (city: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, onSearch }) => {
  const [city, setCity] = useState('');
  const [showInput, setShowInput] = useState(false);

  const { location, current } = weatherData;

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sol') || conditionLower.includes('clear')) return <Sun className="w-12 h-12 text-yellow-500 weather-icon" />;
    if (conditionLower.includes('nuvem') || conditionLower.includes('cloud')) return <Cloud className="w-12 h-12 text-gray-500 weather-icon" />;
    if (conditionLower.includes('chuva') || conditionLower.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-500 weather-icon" />;
    if (conditionLower.includes('tempestade') || conditionLower.includes('storm')) return <CloudLightning className="w-12 h-12 text-purple-500 weather-icon" />;
    return <Sun className="w-12 h-12 text-yellow-500 weather-icon" />;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowInput(false);
      setCity('');
    }
  };

  return (
    <div className="weather-main-card">
      <div className="top-row">
        <span className="city">
          <MapPin size={18} style={{ color: '#2563eb' }} />
          {location.name.toUpperCase()}
        </span>
        <button className="search-btn" onClick={() => setShowInput((v) => !v)} title="Buscar cidade">
          <Search size={20} style={{ color: '#2563eb' }} />
        </button>
      </div>
      {showInput && (
        <form onSubmit={handleSearch} style={{ width: '100%', marginBottom: 12 }}>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Digite a cidade..."
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1.5px solid #e5e7eb',
              fontSize: 15,
              marginTop: 4,
              marginBottom: 4
            }}
            autoFocus
          />
        </form>
      )}
      {getWeatherIcon(current.condition.text)}
      <div className="temp">{Math.round(current.temp_c)}<span style={{ fontSize: 18, fontWeight: 400 }}>°C</span></div>
      <div className="desc">{current.condition.text}</div>
      <div className="bottom-row">
        <div className="info-block">
          <Droplets className="icon" size={20} style={{ color: '#2563eb' }} />
          <span>{current.humidity}%</span>
          <span style={{ fontSize: 13 }}>Humidity</span>
        </div>
        <div className="info-block">
          <Wind className="icon" size={20} style={{ color: '#2563eb' }} />
          <span>{current.wind_kph}Km/h</span>
          <span style={{ fontSize: 13 }}>Wind Speed</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 