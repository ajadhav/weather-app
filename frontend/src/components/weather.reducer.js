import {
  LOAD_WEATHER,
  LOAD_WEATHER_SUCCESS,
  LOAD_WEATHER_ERROR,
  RESET,
  SET_UNITS,
  SET_LOCATION,
} from './weather.actions';

export const weatherReducer = (state, action) => {
  switch (action.type) {
    case LOAD_WEATHER:
      return { ...state, loading: true, error: false };
    case LOAD_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        weatherData: action.payload,
      };
    case LOAD_WEATHER_ERROR:
      return { ...state, loading: false, error: true };
    case RESET:
      return {
        ...state,
        weatherData: {
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
        },
        loading: false,
        error: false,
      };
    case SET_UNITS:
      return {
        ...state,
        units: action.payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        selectedCity: action.payload.name,
        selectedLat: action.payload.lat,
        selectedLon: action.payload.lon,
      };
    default:
      throw new Error();
  }
};
