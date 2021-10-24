const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

const mphToms = (mph) => {
  return mph * 0.44704;
};

export const formatData = (data, units) => {
  if (data.current) {
    // const temps = ['temp', 'feels_like', 'dew_point'];
    // const winds = ['wind_speed', 'wind_gust'];
    const unitMapper = {
      temp: units === 'metric' ? '°C' : '°F',
      feels_like: units === 'metric' ? '°C' : '°F',
      pressure: 'hPa',
      humidity: '%',
      dew_point: units === 'metric' ? '°C' : '°F',
      clouds: '%',
      visibility: 'm',
      wind_speed: units === 'metric' ? ' m/s' : ' mph',
      wind_gust: units === 'metric' ? ' m/s' : ' mph',
      wind_deg: '°',
      rain: 'mm',
      snow: 'mm',
    };
    const convTemp = (temp, units) => {
      return (
        temp &&
        (units === 'metric' ? fahrenheitToCelsius(temp) : temp).toFixed()
      );
    };
    const convSpd = (spd, units) => {
      return spd && (units === 'metric' ? mphToms(spd) : spd).toFixed();
    };
    const res = {
      ...data?.current,
      temp: convTemp(data?.current?.temp, units),
      feels_like: convTemp(data?.current?.feels_like, units),
      dew_point: convTemp(data?.current?.dew_point, units),
      wind_speed: convSpd(data?.current?.wind_speed, units),
      wind_gust: convSpd(data?.current?.wind_gust, units),
    };
    return {
      ...data,
      current: Object.keys(res).reduce((acc, key) => {
        acc[key] = key in unitMapper ? res[key] + unitMapper[key] : res[key];
        return acc;
      }, {}),
      daily: data.daily.map((day) => {
        return {
          ...day,
          temp: Object.fromEntries(
            Object.entries(day.temp).map(([k, v]) => [k, convTemp(v, units)])
          ),
        };
      }),
      hourly: data.hourly.map((hour) => {
        return {
          ...hour,
          temp: convTemp(hour.temp, units),
        };
      }),
    };
  }
};

// const geo_default = {
//   enableHighAccuracy: true,
//   timeout: 10000,
//   maximumAge: 30000,
// };

// const getLocation = (opts) => {
//   if ('geolocation' in navigator) {
//     opts = opts ? opts : geo_default;
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve(position);
//         },
//         (err) => {
//           reject(err);
//         },
//         opts
//       );
//     });
//   } else {
//     let err = new Error('No browser support for geolocatoin');
//     return Promise.reject(err);
//   }
// };
