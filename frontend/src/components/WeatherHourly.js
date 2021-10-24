import './WeatherHourly.css';

export const HourlyItem = ({ hour }) => {
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
  })
    .format(new Date(hour?.dt * 1000))
    .replace(/\s+/g, '');
  const icon = hour?.weather[0].icon;
  const description = hour?.weather[0].description;
  const temp = hour?.temp;
  return (
    <div className='d-flex flex-column hf__item justify-content-evenly small'>
      <p className='mb-0'>{time}</p>
      <div>
        <img
          className='img-fluid'
          src={`${process.env.PUBLIC_URL}/assets/icons/${icon}.png`}
          alt={description}
        />
      </div>
      <p>{temp}</p>
    </div>
  );
};

export const HourlyForecast = ({ hourly }) => {
  return (
    <div className='d-flex  hf__items text-center'>
      {hourly &&
        hourly.map((hour, index) => {
          return <HourlyItem key={index} hour={hour} />;
        })}
    </div>
  );
};
