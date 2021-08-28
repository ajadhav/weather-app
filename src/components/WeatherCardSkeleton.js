import React from 'react';

const WeatherCardSkeleton = () => {
  return (
    <div className='card' style={{ borderRadius: '1.25rem' }}>
      <div className='card-body p-4'>
        <div className='d-flex'>
          <h6 className='placeholder-glow flex-grow-1'>
            <span class='placeholder col-6'></span>
          </h6>
          <h6 className='placeholder-glow'>
            <span class='placeholder col-6'></span>
          </h6>
        </div>

        <div className='d-flex flex-column text-center mt-5 mb-4'>
          <h6 className='placeholder-glow display-4 mb-0 font-weight-bold'>
            <span class='placeholder col-6'></span>
          </h6>
          <span className='placeholder small'></span>
        </div>

        <div className='d-flex align-items-center'>
          <div className='flex-grow-1'>
            <div>
              <i className='fas fa-wind fa-fw'></i>
              <span className='placeholder ms-1'> </span>
            </div>
            <div>
              <i className='fas fa-tint fa-fw'></i>
              <span className='placeholder ms-1'></span>
            </div>
          </div>
          <div>
            <img src='' alt=''></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
