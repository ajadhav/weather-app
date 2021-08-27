import React from 'react';

const Cities = (props) => {
  const cityList = props.cityList.map((city) => (
    <button
      onClick={() => props.onSelection(city)}
      className='btn btn-light my-1 mx-1'
    >
      {city}
    </button>
  ));
  return (
    <div className='my-3 d-flex flex-wrap justify-content-center align-items-stretch align-self-stretch'>
      {cityList}
    </div>
  );
};

export default Cities;
