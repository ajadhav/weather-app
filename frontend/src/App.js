import React, { useState, useRef, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cities from './components/Cities';
import Error from './components/Error';
import WeatherCardSkeleton from './components/WeatherCardSkeleton';
import WeatherCard from './components/WeatherCard';
import './App.css';
import UnitToggle from './components/UnitToggle';
import Autocomplete from './components/Autocomplete';
import initcities from './initCities';
import {
  LOAD_WEATHER,
  LOAD_WEATHER_ERROR,
  LOAD_WEATHER_SUCCESS,
  SET_LOCATION,
} from './components/weather.actions';
import {
  WeatherProvider,
  updateWeather,
  useWeather,
} from './components/weather.context';

// const initialState = {
//   lat: null,
//   lon: null,
//   name: '',
//   timezone: '',
//   timezone_offset: null,
//   current: null,
//   hourly: [],
//   daily: [],
// };

// function fetchReducer(state, action) {
//   switch (action.type) {
//     case 'SEED':
//       return {
//         ...state,
//         weatherData: action.payload,
//       };
//     case 'FETCH_START':
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         weatherData: action.payload,
//         isLoading: false,
//         isError: false,
//       };
//     case 'FETCH_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };
//     case 'RESET':
//       return {
//         weatherData: initialState,
//         isLoading: false,
//         isError: false,
//       };
//     default:
//       throw new Error();
//   }
// }

// async function fetchWeatherData(query, dispatch, cancelToken) {
//   let res = {};
//   if (query.name || (query?.coord?.lat && query?.coord?.lon)) {
//     dispatch({ type: LOAD_WEATHER });
//     try {
//       // const cityInfo = await getData(`/weather?q=${query}`, cancelToken);
//       // // console.log(cityInfo);
//       // const { lat, lon } = cityInfo.coord;
//       // const data = await getData(
//       //   `/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts`
//       // );
//       // // console.log(data);
//       // const weatherInfo = data;
//       // weatherInfo.current.name = cityInfo.name;
//       const params = {};
//       if (query.name) {
//         params.name = query.name;
//       }
//       if (query.coord.lat && query.coord.lon) {
//         params.lat = query.coord.lat;
//         params.lon = query.coord.lon;
//       }
//       res = await axios.get('/api/weather', { params }, cancelToken);
//       let weatherInfo = res.data;
//       weatherInfo.current.name = query.name;
//       weatherInfo.current.sunset = new Date(
//         weatherInfo.current.sunset * 1000
//       ).toLocaleTimeString([], { timeStyle: 'short' });
//       weatherInfo.current.sunrise = new Date(
//         weatherInfo.current.sunrise * 1000
//       ).toLocaleTimeString([], { timeStyle: 'short' });
//       dispatch({ type: LOAD_WEATHER_SUCCESS, payload: weatherInfo });
//     } catch (err) {
//       console.error(err);
//       axios.isCancel(err) || dispatch({ type: LOAD_WEATHER_ERROR });
//     }
//   }
// }

const App = () => {
  //state: search->city->api->weather info
  const cities = initcities.cities;

  // const [selectedCity, setSelectedCity] = useState('');
  // const [selectedCoord, setSelectedCoord] = useState({ lat: null, lon: null });

  // const [units, setUnits] = useState('imperial');

  // const [{ weatherData, isError, isLoading }, dispatch] = useReducer(
  //   fetchReducer,
  //   {
  //     weatherData: initialState,
  //     isLoading: false,
  //     isError: false,
  //   }
  // );
  // const [state, dispatch] = useWeather();
  // const curData = useRef(state);
  // useEffect(() => {
  //   const { cancel, token } = axios.CancelToken.source();
  //   const timeOutId = setTimeout(() => {
  //     updateWeather(
  //       {
  //         name: curData.selectedCity,
  //         lat: curData.selectedLat,
  //         lon: curData.selectedLon,
  //       },
  //       dispatch,
  //       token
  //     );
  //   }, 500);
  //   return () => cancel('No longer latest query') || clearTimeout(timeOutId);
  // }, [curData.selectedCity]);

  // const onChangeCity = (e) => {
  //   // setSelectedCity(e.name);
  //   // setSelectedCoord({ lat: e.lat ?? null, lon: e.lon ?? null });
  //   dispatch({
  //     type: SET_LOCATION,
  //     payload: { name: e.name, lat: e.lat, lon: e.lon },
  //   });
  // };
  // const onSelectCity = (e) => {
  //   dispatch({
  //     type: SET_LOCATION,
  //     payload: { name: e.name, lat: e.lat, lon: e.lon },
  //   });
  //   // setSelectedCity(e.name);
  //   // setSelectedCoord({ lat: e.coord.lat ?? null, lon: e.coord.lon ?? null });
  // };

  return (
    <div className='App'>
      <WeatherProvider>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='position-relative col-md-8 col-lg-6 col-xl-4'>
              <h1 className='text-center'>Weather App</h1>
              <Autocomplete />
              <UnitToggle />
              <Cities cityList={cities} />
              <Error />
              <WeatherCard />
            </div>
          </div>
        </div>
      </WeatherProvider>
    </div>
  );
};

export default App;
