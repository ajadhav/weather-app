import axios from 'axios';

export const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
export const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const UNITS = 'imperial';

/* use 
city-> current weather
current weather-> lat,long -> one call api (current, hourly, daily)
*/

const request = async (_url, cancelToken, method = 'GET', body = '') => {
  const url = `${API_BASE_URL}${_url}&units=${UNITS}&appid=${API_KEY}`;
  // const response = await fetch(url);
  // const { status, headers } = response;
  // if (status === 204 || headers.get('Content-Length') === 0) {
  //   return {};
  // }
  // return await response.json();
  const data = await axios(url, {
    cancelToken,
  }).then((res) => res.data);
  return data;
};

export const getData = (url, cancelToken) => request(url, cancelToken, 'GET');
