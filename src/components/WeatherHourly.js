import './WeatherHourly.css';

export const HourlyItem = ({ hour }) => {
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
  }).format(new Date(hour?.dt * 1000));
  const icon = hour?.weather[0].icon;
  const description = hour?.weather[0].description;
  const temp = hour?.temp;
  return (
    <div className='flex-column hf__item small'>
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
    <div className='d-flex justify-content-around text-center'>
      {hourly &&
        hourly.map((hour, index) => {
          return <HourlyItem key={index} hour={hour} />;
        })}
    </div>
  );
};
