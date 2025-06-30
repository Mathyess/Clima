import React from 'react';
import { WeatherData } from '../types/weather';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Cloud, Sun, Droplets, CloudRain, CloudLightning, Wind } from 'lucide-react';

interface HourlyForecastProps {
  weatherData: WeatherData;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ weatherData }) => {
  const { forecast } = weatherData;
  const today = forecast.forecastday[0];

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sol') || conditionLower.includes('clear')) return <Sun className="w-6 h-6 text-yellow-500 weather-icon" />;
    if (conditionLower.includes('nuvem') || conditionLower.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-500 weather-icon" />;
    if (conditionLower.includes('chuva') || conditionLower.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-500 weather-icon" />;
    if (conditionLower.includes('tempestade') || conditionLower.includes('storm')) return <CloudLightning className="w-6 h-6 text-purple-500 weather-icon" />;
    return <Sun className="w-6 h-6 text-yellow-500 weather-icon" />;
  };

  const formatHour = (time: string) => {
    return format(new Date(`2000-01-01T${time}`), 'HH:mm');
  };

  // Filtrar apenas as próximas 24 horas
  const next24Hours = today.hour.filter((hour, index) => {
    const hourDate = new Date(hour.time);
    const now = new Date();
    return hourDate > now && index < 24;
  });

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Previsão por Hora</h2>
      
      {next24Hours.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
            {next24Hours.map((hour) => (
              <div key={hour.time} className="hourly-forecast min-w-[120px] text-center">
                <p className="text-gray-700 font-semibold text-lg mb-3">
                  {formatHour(hour.time)}
                </p>
                
                <div className="mb-3 flex justify-center">
                  {getWeatherIcon(hour.condition.text)}
                </div>
                
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  {Math.round(hour.temp_c)}°
                </p>
                
                <p className="text-gray-600 text-sm text-center mb-3 leading-tight">
                  {hour.condition.text}
                </p>
                
                <div className="flex items-center justify-center text-gray-500 text-sm mb-2">
                  <Wind className="w-4 h-4 mr-1" />
                  {hour.wind_kph} km/h
                </div>
                
                {hour.chance_of_rain > 0 && (
                  <div className="flex items-center justify-center text-blue-500 text-sm">
                    <Droplets className="w-4 h-4 mr-1" />
                    {hour.chance_of_rain}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Cloud className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg">Não há dados de previsão por hora disponíveis para hoje.</p>
        </div>
      )}
    </div>
  );
};

export default HourlyForecast; 