import React from 'react';

const HeaderSkeleton = () => {
  return (
    <div className='card-header row placeholder-glow d-flex justify-content-between g-0 p-4'>
      <h4 className='card-title flex-grow-1  col-4'>
        <span className='placeholder col-6'></span>
      </h4>
      <h6 className='col-4'>
        <span className='placeholder col-12'></span>
      </h6>
    </div>
  );
};

const ConditionSkeleton = () => {
  return (
    <div className='col-4'>
      {[...Array(2).keys()].map((e) => {
        return (
          <div key={e}>
            <i className='placeholder col-1'></i>
            <span className='placeholder col-9'></span>
          </div>
        );
      })}
    </div>
  );
};

const BodySkeleton = () => {
  return (
    <div className='card-body row placeholder-glow g-0 p-4'>
      <div className='text-center'>
        <h6 className='display-4 font-weight-bold'>
          <span className='placeholder col-6'></span>
        </h6>
        <p className='small px-5'>
          <span className='placeholder col-6'></span>
        </p>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <ConditionSkeleton />
        <div className='display-4 col-4'>
          <span className='placeholder col-12'></span>
        </div>
      </div>
      <HourlyForecastSkeleton />
    </div>
  );
};

// const DailyForecastItem = ({ forecast }) => {
//   const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
//     .format(new Date(forecast.dt * 1000))
//     .substring(0, 3);
//   const temp = { min: forecast.temp.min, max: forecast.temp.max };
//   const icon = forecast.weather[0].icon;
//   return (
//     <div className='df__item flex-column text-center'>
//       <p className='small mb-1'>{day}</p>
//       <div className=' small mb-0'>
//         <img
//           className='img-fluid'
//           src={`${process.env.PUBLIC_URL}/assets/icons/${icon}.png`}
//           alt=''
//         />
//         <p className='small mb-0'>{temp.max}</p>
//         <p className='small mb-0 text-muted'>{temp.min}</p>
//       </div>
//     </div>
//   );
// };

const HourlyForecastItemSkeleton = () => {
  return (
    <div className='df__item flex-column text-center'>
      <h1>
        <span className='placeholder col-12 placeholder-lg'></span>
      </h1>
    </div>
  );
};

const HourlyForecastSkeleton = () => {
  return (
    <div className='d-flex justify-content-space-evenly align-items-center'>
      {[...Array(7).keys()].map((forecast, index) => {
        return <HourlyForecastItemSkeleton key={index} forecast={forecast} />;
      })}
    </div>
  );
};

// const FooterSkeleton = () => {
//   return (
//     <div className='card-footer row placeholder-glow g-0 p-4'>
//       <HourlyForecastSkeleton />
//     </div>
//   );
// };

const WeatherCardSkeleton = () => {
  return (
    <div className='card' aria-hidden='true'>
      <HeaderSkeleton />
      <BodySkeleton />
    </div>
  );
};

export default WeatherCardSkeleton;
