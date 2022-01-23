import React from 'react';
import { SET_UNITS } from './weather.actions';
import { useWeather } from './weather.context';
const UnitToggle = ({ handleImperial, handleMetric }) => {
  const { dispatch } = useWeather();
  return (
    <div className='my-3 d-flex flex-wrap justify-content-center align-items-stretch align-self-stretch'>
      <button
        onClick={() => dispatch({ type: SET_UNITS, payload: 'imperial' })}
        className='btn btn-sm btn-light'
      >
        °F
      </button>
      <button
        onClick={() => dispatch({ type: SET_UNITS, payload: 'metric' })}
        className='btn btn-sm btn-dark'
      >
        °C
      </button>
    </div>
  );
};

export default UnitToggle;
