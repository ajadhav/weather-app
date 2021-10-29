import { ConditionList } from './WeatherCondition';
import { HourlyForecast } from './WeatherHourly';
import ChartInst from './ChartInst';
const Body = ({ current, hourly }) => {
  const temp = current?.temp;
  const feels_like = current?.feels_like;
  const description = current?.weather[0]?.description;
  const icon = current?.weather[0]?.icon;
  return (
    <div className='card-body row g-0 p-4'>
      <div className='text-center d-flex flex-column mb-4'>
        <h4 className='display-4 font-weight-bold'>{temp}</h4>
        <span className='small px-5'> Feels like: {feels_like}</span>
        <span className='small px-5'>{description}</span>
      </div>
      <div className='d-flex align-items-center pb-3'>
        <ConditionList current={current} />
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/${icon}.png`}
            alt={description}
          />
        </div>
      </div>
      <ChartInst hourlyData={hourly?.slice(0, 8)} />
      <HourlyForecast hourly={hourly} />
    </div>
  );
};

export default Body;
