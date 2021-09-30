import React from 'react';

const CurrentWeather = ({ current }) => {
  const conds = ['humidity', 'wind_speed'];
  const icons = {
    humidity: 'fas fa-tint fa-fw',
    wind_speed: 'fas fa-wind fa-fw',
  };
  const conditions = Object.keys(current)
    .filter((k) => conds.includes(k))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: current[key],
      };
    }, {});

  return (
    <div>
      <div>
        <h6></h6>
        <p></p>
        <div>
          {Object.entries(conditions).map((entry) => {
            return (
              <div>
                <i className={icons[entry[0]]}></i>
                <span>entry[1]</span>
              </div>
            );
          })}
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/${current?.weather[0].icon}.png`}
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

const HeaderSkeleton = () => {
  return (
    <div class='card-header row placeholder-glow d-flex justify-content-between g-0 p-4'>
      <h4 class='card-title flex-grow-1  col-4'>
        <span class='placeholder col-6'></span>
      </h4>
      <h6 class='col-4'>
        <span class='placeholder col-12'></span>
      </h6>
    </div>
  );
};

const ConditionSkeleton = () => {
  return (
    <div class='col-4'>
      {[...Array(2).keys()].map((e) => {
        return (
          <div key={e}>
            <i class='placeholder col-1'></i>
            <span class='placeholder col-9'></span>
          </div>
        );
      })}
    </div>
  );
};

const BodySkeleton = () => {
  return (
    <div class='card-body row placeholder-glow g-0 p-4'>
      <div class='text-center'>
        <h6 class='display-4 font-weight-bold'>
          <span class='placeholder col-6'></span>
        </h6>
        <p class='small px-5'>
          <span class='placeholder col-6'></span>
        </p>
      </div>
      <div class='d-flex justify-content-between align-items-center'>
        <ConditionSkeleton />
        <div class='display-4 col-4'>
          <span class='placeholder col-12'></span>
        </div>
      </div>
    </div>
  );
};

const DailyForecastItem = ({ forecast }) => {
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
    .format(new Date(forecast.dt * 1000))
    .substring(0, 3);
  const temp = { min: forecast.temp.min, max: forecast.temp.max };
  const icon = forecast.weather[0].icon;
  return (
    <div className='df__item flex-column text-center'>
      <p className='small mb-1'>{day}</p>
      <div className=' small mb-0'>
        <img
          className='img-fluid'
          src={`${process.env.PUBLIC_URL}/assets/icons/${icon}.png`}
          alt=''
        />
        <p className='small mb-0'>{temp.max}</p>
        <p className='small mb-0 text-muted'>{temp.min}</p>
      </div>
    </div>
  );
};

const HourlyForecastItemSkeleton = () => {
  return (
    <div class='df__item flex-column text-center'>
      <h1>
        <span class='placeholder col-12 placeholder-lg'></span>
      </h1>
    </div>
  );
};

const HourlyForecastSkeleton = () => {
  return (
    <div class='d-flex justify-content-space-evenly align-items-center'>
      {[...Array(7).keys()].map((forecast, index) => {
        return <HourlyForecastItemSkeleton key={index} forecast={forecast} />;
      })}
    </div>
  );
};

const FooterSkeleton = () => {
  return (
    <div class='card-footer row placeholder-glow g-0 p-4'>
      <HourlyForecastSkeleton />
    </div>
  );
};

const WeatherCardSkeleton = () => {
  return (
    <div class='card' aria-hidden='true'>
      <HeaderSkeleton />
      <BodySkeleton />
      <FooterSkeleton />
    </div>
    // <div className='card' style={{ borderRadius: '1.25rem' }}>
    //   <div className='card-body p-4'>
    //     <div className='d-flex'>
    //       <h6 className='placeholder-glow flex-grow-1'>
    //         <span className='placeholder col-6'></span>
    //       </h6>
    //       <h6 className='placeholder-glow'>
    //         <span className='placeholder col-6'></span>
    //       </h6>
    //     </div>

    //     <div className='d-flex flex-column text-center mt-5 mb-4'>
    //       <h6 className='placeholder-glow display-4 mb-0 font-weight-bold'>
    //         <span className='placeholder col-6'></span>
    //       </h6>
    //       <span className='placeholder small'></span>
    //     </div>

    //     <div className='d-flex align-items-center'>
    //       <div className='flex-grow-1'>
    //         <div>
    //           <i className='fas fa-wind fa-fw'></i>
    //           <span className='placeholder ms-1'> </span>
    //         </div>
    //         <div>
    //           <i className='fas fa-tint fa-fw'></i>
    //           <span className='placeholder ms-1'></span>
    //         </div>
    //       </div>
    //       <div>
    //         <img src='' alt=''></img>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default WeatherCardSkeleton;
