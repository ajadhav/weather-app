import React from 'react';
import { useWeather } from './weather.context';
const Error = () => {
  const {
    state: { weatherData, error },
  } = useWeather();
  return (
    <>
      {error && (
        <div className='alert alert-danger'>
          {weatherData.name
            ? `We do not have information for ${weatherData.name}, please enter another city`
            : 'Something went wrong...please enter another city'}
        </div>
      )}
    </>
  );
};
export default Error;
