import axios from 'axios';
import React, { createContext, useReducer, useContext } from 'react';
import { weatherReducer } from './weather.reducer';
import {
  LOAD_WEATHER,
  LOAD_WEATHER_ERROR,
  LOAD_WEATHER_SUCCESS,
  SET_LOCATION,
} from './weather.actions';
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, {
    weatherData: {
      lat: null,
      lon: null,
      name: '',
      timezone: '',
      timezone_offset: null,
      current: null,
      hourly: [],
      daily: [],
    },
    loading: false,
    error: false,
    units: 'imperial',
    selectedCity: '',
    selectedLat: null,
    selectedLon: null,
  });
  const value = { state, dispatch };
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export async function updateWeather(query, dispatch, cancelToken) {
  dispatch({ type: LOAD_WEATHER });
  try {
    console.log(query);
    const res = await axios.get('/api/weather', { params: query }, cancelToken);
    let weatherInfo = res.data;
    //TODO clean this up
    weatherInfo.current.name = query.name;
    weatherInfo.current.sunset = new Date(
      weatherInfo.current.sunset * 1000
    ).toLocaleTimeString([], { timeStyle: 'short' });
    weatherInfo.current.sunrise = new Date(
      weatherInfo.current.sunrise * 1000
    ).toLocaleTimeString([], { timeStyle: 'short' });
    dispatch({ type: LOAD_WEATHER_SUCCESS, payload: weatherInfo });
  } catch (err) {
    console.error(err);
    axios.isCancel(err) || dispatch({ type: LOAD_WEATHER_ERROR });
  }
}
