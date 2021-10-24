// import React from 'react';
// import DailyForecast from './DailyForecast';
// import { formatCurrentWeather } from '../utils.js';
// const Header = ({ cityName, dateTime }) => {
//   const date = new Date(dateTime * 1000);
//   return (
//     <div className='d-flex'>
//       <h4 className='card-title flex-grow-1'>{cityName}</h4>
//       <h6 className='text-muted'>
//         {date.toLocaleDateString()} - {date.toLocaleTimeString()}
//       </h6>
//     </div>
//   );
// };

// const Content = ({ data }) => {
//   const temp = data?.temp;
//   const description = data?.weather[0].description;

//   return (
//     <div className='text-center'>
//       <h6 className='display-4 font-weight-bold'>{temp}</h6>
//       <p className='small px-5 text-center '>{description}</p>
//     </div>
//   );
// };

// const ConditionItem = ({ data, classData }) => {
//   return (
//     <div>
//       <i className={classData}></i>
//       <span className='ms-1'> {data}</span>
//     </div>
//   );
// };

// const ConditionList = ({ conditions }) => {
//   return (
//     <div>
//       {conditions.map((condition) => {
//         return (
//           <ConditionItem
//             key={condition.id}
//             data={condition.data}
//             classData={condition.iconClass}
//           />
//         );
//       })}
//     </div>
//   );
// };

// const WeatherCard = ({ weatherData, units }) => {
//   const weatherInfo = formatCurrentWeather(weatherData?.current, units);
//   const icon = weatherInfo?.weather[0].icon;
//   const conditions = [
//     { data: weatherInfo?.humidity, iconClass: 'fas fa-tint fa-fw' },
//     { data: weatherInfo?.wind_speed, iconClass: 'fas fa-wind fa-fw' },
//   ];
//   return (
//     <div className='card' style={{ borderRadius: '1.25rem' }}>
//       <div class='card-header row g-0 p-4'>
//         <Header cityName={weatherInfo?.name} dateTime={weatherInfo?.dt} />
//       </div>
//       <div className='card-body row g-0 p-4'>
//         <Content data={weatherInfo} />
//         <div class='d-flex justify-content-between align-items-center '>
//           <ConditionList conditions={conditions} />
//           <div>
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/icons/${icon}.png`}
//               alt=''
//             />
//           </div>
//         </div>
//       </div>
//       <div class='card-footer row g-0 p-4'>
//         <DailyForecast forecasts={weatherData.daily.slice(0, 7)} />
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

// const CurrentWeather = ({ current }) => {
//   const conds = ['humidity', 'wind_speed'];
//   const icons = {
//     humidity: 'fas fa-tint fa-fw',
//     wind_speed: 'fas fa-wind fa-fw',
//   };
//   const conditions = Object.keys(current)
//     .filter((k) => conds.includes(k))
//     .reduce((obj, key) => {
//       return {
//         ...obj,
//         [key]: current[key],
//       };
//     }, {});

//   return (
//     <div>
//       <div>
//         <h6></h6>
//         <p></p>
//         <div>
//           {Object.entries(conditions).map((entry) => {
//             return (
//               <div>
//                 <i className={icons[entry[0]]}></i>
//                 <span>entry[1]</span>
//               </div>
//             );
//           })}
//         </div>
//         <div>
//           <img
//             src={`${process.env.PUBLIC_URL}/assets/icons/${current?.weather[0].icon}.png`}
//             alt=''
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
