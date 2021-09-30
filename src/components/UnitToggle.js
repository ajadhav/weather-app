import React from 'react';

const UnitToggle = ({ handleImperial, handleMetric }) => {
  return (
    <div className='my-3 d-flex flex-wrap justify-content-center align-items-stretch align-self-stretch'>
      <button onClick={handleImperial} className='btn btn-sm btn-light'>
        °F
      </button>
      <button onClick={handleMetric} className='btn btn-sm btn-dark'>
        °C
      </button>
    </div>
  );
};

export default UnitToggle;
