import axios from 'axios';
import { WeatherData } from '../types/weather';

// Use uma variável de ambiente para a chave da API
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'ec0931837a3a423f86611842252906';
const BASE_URL = 'https://api.weatherapi.com/v1';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    aqi: 'no',
    lang: 'pt'
  }
});

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/forecast.json', {
      params: {
        q: city,
        days: 7
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
      } else if (error.response?.status === 401) {
        throw new Error('Erro de autenticação da API. Verifique sua chave de API.');
      } else if (error.response?.status === 429) {
        throw new Error('Limite de requisições excedido. Tente novamente em alguns minutos.');
      } else {
        throw new Error('Erro ao buscar dados do clima. Tente novamente.');
      }
    }
    throw new Error('Erro inesperado. Tente novamente.');
  }
};

export const getCurrentLocationWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/forecast.json', {
      params: {
        q: `${lat},${lon}`,
        days: 7
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao buscar dados da localização atual.');
    }
    throw new Error('Erro inesperado. Tente novamente.');
  }
}; 