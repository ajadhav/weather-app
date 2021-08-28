import axios from 'axios';

export const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
export const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// call current weather data for one location
// by city name
// by city ID
// by geographic coordinates
// by ZIP code

// call current weather data for several cities
// within rectangle zone
// cities in circle

// bulk downloading

const request = async (_url, cancelToken, method = 'GET', body = '') => {
  const url = `${API_BASE_URL}${_url}&appid=${API_KEY}`;
  // const response = await fetch(url);
  // const { status, headers } = response;
  // if (status === 204 || headers.get('Content-Length') === 0) {
  //   return {};
  // }
  // return await response.json();
  return await axios(url, {
    params: {
      units: 'imperial',
    },
    cancelToken,
  });
};

export const getData = (url, cancelToken) => request(url, cancelToken, 'GET');
