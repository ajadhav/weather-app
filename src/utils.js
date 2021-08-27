const geo_default = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 30000,
};

const region_default = {
  language: 'en',
  units: 'metric',
  offset: 0,
};

const default_state = {
  coord: {
    lon: -122.08,
    lat: 37.39,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 282.55,
    feels_like: 281.86,
    temp_min: 280.37,
    temp_max: 284.26,
    pressure: 1023,
    humidity: 100,
  },
  visibility: 16093,
  wind: {
    speed: 1.5,
    deg: 350,
  },
  clouds: {
    all: 1,
  },
  dt: 1560350645,
  sys: {
    type: 1,
    id: 5122,
    message: 0.0139,
    country: 'US',
    sunrise: 1560343627,
    sunset: 1560396563,
  },
  timezone: -25200,
  id: 420006353,
  name: 'Mountain View',
  cod: 200,
};

const getLocation = (opts) => {
  if ('geolocation' in navigator) {
    opts = opts ? opts : geo_default;
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (err) => {
          reject(err);
        },
        opts
      );
    });
  } else {
    let err = new Error('No browser support for geolocatoin');
    return Promise.reject(err);
  }
};

async function getWeatherData(opts) {
  const optionsMerged = Object.assign({}, region_default, opts);
  const { language, units } = optionsMerged;
  if (!OPENWEATHER_API_KEY) {
    throw new Error('Open Weather API key not found');
  }
  try {
    const position = await getLocation();
    const { latitude, longitude } = position.coords;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${language}&units=${units}&cnt=1&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(url);
    const { weather_data } = await response.json();
    return weather_data;
  } catch (err) {
    console.error(err.message);
  }
}

export { getLocation, getWeatherData };
