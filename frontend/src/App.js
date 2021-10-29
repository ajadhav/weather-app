import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
// import { getData } from './apis/config';
// import SearchBar from './components/SearchBar';
import Cities from './components/Cities';
import WeatherCardSkeleton from './components/WeatherCardSkeleton';
import WeatherCard from './components/WeatherCard';
import './App.css';
import UnitToggle from './components/UnitToggle';
import Autocomplete from './components/Autocomplete';

const initialState = {
  lat: null,
  lon: null,
  name: '',
  timezone: '',
  timezone_offset: null,
  current: null,
  hourly: [],
  daily: [],
};

function fetchReducer(state, action) {
  switch (action.type) {
    case 'SEED':
      return {
        ...state,
        weatherData: action.payload,
      };
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        weatherData: action.payload,
        isLoading: false,
        isError: false,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'RESET':
      return {
        weatherData: initialState,
        isLoading: false,
        isError: false,
      };
    default:
      throw new Error();
  }
}

async function fetchWeatherData(query, dispatch, cancelToken) {
  let res = {};
  if (query.name || (query?.coord?.lat && query?.coord?.lon)) {
    dispatch({ type: 'FETCH_START' });
    try {
      // const cityInfo = await getData(`/weather?q=${query}`, cancelToken);
      // // console.log(cityInfo);
      // const { lat, lon } = cityInfo.coord;
      // const data = await getData(
      //   `/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts`
      // );
      // // console.log(data);
      // const weatherInfo = data;
      // weatherInfo.current.name = cityInfo.name;
      const params = {};
      if (query.name) {
        params.name = query.name;
      }
      if (query.coord.lat && query.coord.lon) {
        params.lat = query.coord.lat;
        params.lon = query.coord.lon;
      }
      res = await axios.get('/api/weather', { params }, cancelToken);
      let weatherInfo = res.data;
      weatherInfo.current.name = query.name;
      weatherInfo.current.sunset = new Date(
        weatherInfo.current.sunset * 1000
      ).toLocaleTimeString([], { timeStyle: 'short' });
      weatherInfo.current.sunrise = new Date(
        weatherInfo.current.sunrise * 1000
      ).toLocaleTimeString([], { timeStyle: 'short' });
      dispatch({ type: 'FETCH_SUCCESS', payload: weatherInfo });

      // else {
      //   const cityInfo = await getData(`/weather?q=${query.city}`, cancelToken);
      //   // console.log(cityInfo);
      //   const { lat, lon } = cityInfo.coord;
      //   const res = await getData(
      //     `/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts`
      //   );
      //   // console.log(data);
      //   const weatherInfo = res;
      //   weatherInfo.current.name = cityInfo.name;
      //   dispatch({ type: 'FETCH_SUCCESS', payload: weatherInfo });
      // }
      //setSelectedCity(res.name);
    } catch (err) {
      console.error(err);
      axios.isCancel(err) || dispatch({ type: 'FETCH_FAILURE' });
    }
  }
}

// async function fetchSearchSuggestions(query, cancelToken) {
//   if (query) {
//     // dispatch({ type: 'FETCH_START' });
//     try {
//       const result = await axios.get(
//         `/api/weather?cityname=${query}`,
//         cancelToken
//       );
//       console.log(result);
//       return result.data;
//       // cb(result);
//     } catch (err) {
//       console.error(err);
//       axios.isCancel(err);
//       // || dispatch({ type: 'FETCH_FAILURE' });
//     }
//   }
// }

const App = () => {
  //const defaultCity = () => window.localStorage.getItem('city');
  //state: search->city->api->weather info
  const cities = ['New York', 'Detroit', 'Chicago', 'Los Angeles', 'Seattle'];
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCoord, setSelectedCoord] = useState({ lat: null, lon: null });
  // const [showSuggestions, setShowSuggestions] = useState(false);
  // const [_searches, setSearchSuggestions] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [units, setUnits] = useState('imperial');

  const [{ weatherData, isError, isLoading }, dispatch] = useReducer(
    fetchReducer,
    {
      weatherData: initialState,
      isLoading: false,
      isError: false,
    }
  );
  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      fetchWeatherData(
        { name: selectedCity, coord: selectedCoord },
        dispatch,
        token
      );
    }, 500);
    return () => cancel('No longer latest query') || clearTimeout(timeOutId);
  }, [selectedCity, selectedCoord]);

  // useEffect(() => {
  //   const { cancel, token } = axios.CancelToken.source();
  //   const timeOutId = setTimeout(
  //     () =>
  //       fetchSearchSuggestions(searchTerm, token).then((res) =>
  //         setSearchSuggestions(res)
  //       ),
  //     500
  //   );
  //   return () => cancel('No longer latest query') || clearTimeout(timeOutId);
  // }, [searchTerm]);

  const onChangeCity = (e) => {
    // if (e.target.value === '') {
    //   dispatch({ type: 'RESET' });
    // }
    setSelectedCity(e.name);
    setSelectedCoord({ lat: e.lat ?? null, lon: e.lon ?? null });
  };
  const onSelectCity = (e) => {
    // if (e.target.value === '') {
    //   dispatch({ type: 'RESET' });
    // }
    setSelectedCity(e);
    setSelectedCoord({ lat: null, lon: null });
  };

  // const onChangeLatLon = (e) => {
  //   dispatch({
  //     type: 'SEED',
  //     payload: {
  //       lat: e.coord.lat,
  //       lon: e.coord.lon,
  //       name: e.name,
  //       timezone: '',
  //       timezone_offset: null,
  //       current: null,
  //       hourly: [],
  //       daily: [],
  //     },
  //   });
  // };

  // const onChangeQuery = (e) => {
  //   if (e.target.value === '') {
  //     dispatch({ type: 'RESET' });
  //   }
  //   setShowSuggestions(true);
  //   setSearchTerm(e.target.value);
  // };

  // const hideSuggestions = () => setShowSuggestions(false);

  return (
    <div className='App'>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='position-relative col-md-8 col-lg-6 col-xl-4'>
            <h1 className='text-center'>Weather App</h1>
            {/* <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onChangeQuery={onChangeQuery}
              setSelectedCity={setSelectedCity}
              showSuggestions={showSuggestions}
              hideSuggestions={hideSuggestions}
              searches={_searches}
            /> */}
            <Autocomplete
              changeCity={onChangeCity}
              // changeLatLon={onChangeLatLon}
            />
            <UnitToggle
              handleImperial={() => setUnits('imperial')}
              handleMetric={() => setUnits('metric')}
            />
            <Cities cityList={cities} onSelection={onSelectCity} />
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
              <>
                <WeatherCard data={weatherData} units={units} />
                {/* <ChartInst hourlyData={weatherData.hourly.slice(0, 8)} /> */}
              </>
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
