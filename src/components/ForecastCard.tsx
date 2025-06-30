import React from 'react';
import { WeatherData } from '../types/weather';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Cloud, Sun, Droplets, CloudRain, CloudLightning } from 'lucide-react';

interface ForecastCardProps {
  weatherData: WeatherData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ weatherData }) => {
  const { forecast } = weatherData;

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sol') || conditionLower.includes('clear')) return <Sun className="w-8 h-8 text-yellow-500 weather-icon" />;
    if (conditionLower.includes('nuvem') || conditionLower.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-500 weather-icon" />;
    if (conditionLower.includes('chuva') || conditionLower.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500 weather-icon" />;
    if (conditionLower.includes('tempestade') || conditionLower.includes('storm')) return <CloudLightning className="w-8 h-8 text-purple-500 weather-icon" />;
    return <Sun className="w-8 h-8 text-yellow-500 weather-icon" />;
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEEE', { locale: ptBR });
  };

  const getShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM', { locale: ptBR });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Previsão para 7 Dias</h2>
      <div className="space-y-4">
        {forecast.forecastday.map((day, index) => (
          <div key={day.date} className="forecast-item">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center min-w-[100px]">
                  <p className="font-bold text-gray-800 text-lg">
                    {index === 0 ? 'Hoje' : getDayName(day.date)}
                  </p>
                  <p className="text-gray-500 text-sm">{getShortDate(day.date)}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {getWeatherIcon(day.day.condition.text)}
                  <div>
                    <p className="text-gray-700 font-medium">{day.day.condition.text}</p>
                    <p className="text-gray-500 text-sm">
                      {day.day.daily_chance_of_rain > 0 && (
                        <span className="flex items-center">
                          <Droplets className="w-4 h-4 mr-1" />
                          {day.day.daily_chance_of_rain}% chance de chuva
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-1">Máx</p>
                  <p className="font-bold text-red-500 text-xl">{Math.round(day.day.maxtemp_c)}°</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-1">Mín</p>
                  <p className="font-bold text-blue-500 text-xl">{Math.round(day.day.mintemp_c)}°</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard; 