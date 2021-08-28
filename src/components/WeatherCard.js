import React from 'react';

const WeatherCard = ({ weatherInfo, units }) => {
  const { name, condition, dt, timezone, humidity, icon, temp, windspd } =
    weatherInfo;
  const date = new Date(dt * 1000);
  const toCelsius = (fahrenheit) => {
    return (((fahrenheit - 32) * 5) / 9).toFixed(1);
  };
  const formatted_temp =
    units === 'metric' ? toCelsius(temp) + '°C' : temp + '°F';
  return (
    <div className='card' style={{ borderRadius: '1.25rem' }}>
      <div className='card-body p-4'>
        <div className='d-flex'>
          <h6 className='flex-grow-1'>{name}</h6>
          <h6>
            {date.toLocaleDateString()} - {date.toLocaleTimeString()}
          </h6>
        </div>

        <div className='d-flex flex-column text-center mt-5 mb-4'>
          <h6 className='display-4 mb-0 font-weight-bold'>{formatted_temp}</h6>
          <span className='small'>{condition}</span>
        </div>

        <div className='d-flex align-items-center'>
          <div className='flex-grow-1'>
            <div>
              <i className='fas fa-wind fa-fw'></i>
              <span className='ms-1'> {windspd} km/h </span>
            </div>
            <div>
              <i className='fas fa-tint fa-fw'></i>
              <span className='ms-1'> {humidity}% </span>
            </div>
          </div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt=''
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

// const WeatherCard = ({
//   city,
//   condition,
//   dt,
//   humidity,
//   icon,
//   temp,
//   windspd,
// }) => {
//   const date = new Date(dt);

//   return (
//     <div className='card'>
//       <div className='card-body'>
//         <p>
//           {date.toLocaleDateString()}-{date.toLocaleTimeString()}
//         </p>
//         <p className='font-weight-bold'>{temp}°</p> <p>{condition}</p>
//         <p>Humidity</p>
//         <p>{humidity}</p>
//         <p>Wind Speed</p>
//         <p>{windspd}</p>
//       </div>
//     </div>
//   );
// };

// export default WeatherCard;

/* cityname
datetime
timezone
icon,iconurl
temp
condition
humidity
wind speed
*/
