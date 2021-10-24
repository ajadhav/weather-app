const axios = require('axios');
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const UNITS = 'imperial';
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
// const WEATHER = require('../models/Weather');
class Weather {
  useAutocomplete = async (searchTerm, corpus) => {
    // assumes corpus is sorted
    if (searchTerm) {
      let st = 0;
      let ed = corpus.length - 1;
      let result = Array.from(Array(searchTerm.length), () => new Array(0));

      for (let i = 0; i < searchTerm.length && st <= ed; ++i) {
        while (
          st <= ed &&
          (corpus[st].norm.length <= i || corpus[st].norm[i] != searchTerm[i])
        ) {
          ++st;
        }
        while (
          st <= ed &&
          (corpus[ed].norm.length <= i || corpus[ed].norm[i] != searchTerm[i])
        ) {
          --ed;
        }
        for (let k = st; k <= ed && k < st + 8; ++k) {
          result[i].push(corpus[k]);
        }
      }
      return result;
    }
  };
  getWeatherData = async (cityName) => {
    const url = `${API_BASE_URL}/weather?q=${cityName}&units=${UNITS}&appid=${API_KEY}`;
    return (await axios(url)).data;
  };
  getWeatherDataFromTerm = async (term, corpus) => {
    const result = await this.useAutocomplete(term, corpus);
    // console.log(corpus[0]);
    return result && result[result.length - 1];
  };
  getWeatherDataFromQuery = async (query) => {
    const url = `${API_BASE_URL}/find?q=${query}&units=${UNITS}&appid=${API_KEY}`;
    return (await axios(url)).data;
  };
  getWeatherDataFromCoord = async (coord) => {
    const { lat, lon } = coord;
    const url = `${API_BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${UNITS}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    return (await axios(url)).data;
  };
  // getWeatherDataFromMongo = async (cityName) => {
  //   return WEATHER.findOne({ name: cityName });
  // };
}

module.exports = Weather;

//https://openweathermap.org/data/2.5/find?q=Novi&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric

// find City or Search
// `${API_BASE_URL}/find?q=${query}&units=${UNITS}&appid=${API_KEY}
//<span data-v-68963a64="" style="width: 140px;">New York City, US <img data-v-49496dbe="" data-v-68963a64="" src="https://openweathermap.org/images/flags/us.png" class="flag"></span>

// old query
//getData(`/weather?q=${query}`

// one call api for hourly,daily forecast
//getData(`/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts`
