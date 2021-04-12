import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.params.appid = process.env.REACT_APP_WEATHER_KEY
  return config;
});


export const getGeo = (params: any) => api.get('/geo/1.0/direct', { params })
export const getForecast = (params: any) => api.get('/data/2.5/onecall', { params })
export const getAirQuality = (params: any) => api.get('/data/2.5/air_pollution', { params })
