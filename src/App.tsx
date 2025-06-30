import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import { WeatherData } from './types/weather';
import { getWeatherData } from './services/weatherApi';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  // Buscar clima de São Paulo por padrão ao carregar a página
  useEffect(() => {
    searchWeather('São Paulo');
  }, []);

  return (
    <div style={{ padding: '0 20px' }}>
      {loading && (
        <div style={{ color: '#fff', textAlign: 'center', marginBottom: 20 }}>Carregando...</div>
      )}
      {error && (
        <div style={{ color: '#ff4d4f', textAlign: 'center', marginBottom: 20 }}>{error}</div>
      )}
      {weatherData && !loading && (
        <WeatherCard weatherData={weatherData} onSearch={searchWeather} />
      )}
    </div>
  );
};

export default App; 