import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { getData } from './apis/config';
import SearchBar from './components/SearchBar';
import Cities from './components/Cities';
import WeatherCardSkeleton from './components/WeatherCardSkeleton';
import WeatherCard from './components/WeatherCard';
import './App.css';

function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        weatherData: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'RESET':
      return {
        weatherData: {
          name: '',
          condition: '',
          dt: null,
          timezone: null,
          humidity: null,
          icon: '',
          temp: null,
          windspd: null,
        },
        isLoading: false,
        isError: false,
      };
    default:
      throw new Error();
  }
}

async function fetchWeatherData(query, dispatch, cancelToken) {
  if (query) {
    dispatch({ type: 'FETCH_START' });
    try {
      console.log(query);
      const res = await getData(`/weather?q=${query}`, cancelToken);
      console.log(res);
      const weatherInfo = {
        name: res.data.name,
        condition: res.data.weather[0].main,
        dt: res.data.dt,
        timezone: res.data.timezone,
        humidity: res.data.main.humidity,
        icon: res.data.weather[0].icon,
        temp: res.data.main.temp,
        windspd: res.data.wind.speed,
      };

      dispatch({ type: 'FETCH_SUCCESS', payload: weatherInfo });
      //setSelectedCity(res.name);
    } catch (err) {
      console.error(err);
      axios.isCancel(err) || dispatch({ type: 'FETCH_FAILURE' });
    }
  }
}

const App = () => {
  //const defaultCity = () => window.localStorage.getItem('city');
  //state: search->city->api->weather info
  const cities = ['New York', 'Detroit', 'Chicago', 'Los Angeles', 'Seattle'];
  const [selectedCity, setSelectedCity] = useState('');
  const [units, setUnits] = useState('imperial');
  const [{ weatherData, isError, isLoading }, dispatch] = useReducer(
    fetchReducer,
    {
      weatherData: {
        name: '',
        condition: '',
        dt: null,
        timezone: null,
        humidity: null,
        icon: '',
        temp: null,
        windspd: null,
      },
      isLoading: false,
      isError: false,
    }
  );
  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const timeOutId = setTimeout(
      () => fetchWeatherData(selectedCity, dispatch, token),
      500
    );
    return () => cancel('No longer latest query') || clearTimeout(timeOutId);
  }, [selectedCity]);

  return (
    <div className='App'>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='position-relative col-md-8 col-lg-6 col-xl-4'>
            <h1 className='text-center'>Weather App</h1>
            <SearchBar
              city={selectedCity}
              onChangeCity={(e) => {
                console.log(e);
                if (e.target.value === '') {
                  dispatch({ type: 'RESET' });
                }
                setSelectedCity(e.target.value);
              }}
            />
            <div className='my-3 d-flex flex-wrap justify-content-center align-items-stretch align-self-stretch'>
              <button
                onClick={() => {
                  setUnits('imperial');
                }}
                class='btn btn-sm btn-light'
              >
                °F
              </button>
              <button
                onClick={() => {
                  setUnits('metric');
                }}
                class='btn btn-sm btn-dark'
              >
                °C
              </button>
            </div>
            <Cities
              cityList={cities}
              onSelection={(e) => {
                setSelectedCity(e);
              }}
            />
            {isError && (
              <div className='alert alert-danger'>
                {selectedCity
                  ? `We do not have information for ${selectedCity}, please enter another city`
                  : 'Something went wrong...please enter another city'}
              </div>
            )}
            {isLoading ? (
              <WeatherCardSkeleton />
            ) : selectedCity !== '' && !isError ? (
              <WeatherCard units={units} weatherInfo={weatherData} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
