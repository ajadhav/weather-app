import { ConditionList } from './WeatherCondition';
import { HourlyForecast } from './WeatherHourly';
const Body = ({ current, hourly }) => {
  const temp = current?.temp;
  const description = current?.weather[0]?.description;
  const icon = current?.weather[0]?.icon;
  return (
    <div className='card-body row g-0 p-4'>
      <div className='text-center d-flex flex-column mb-4'>
        <h4 className='display-4 font-weight-bold'>{temp}</h4>
        <p className='small px-5'>{description}</p>
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
      <HourlyForecast hourly={hourly && hourly.slice(0, 7)} />
    </div>
  );
};

export default Body;
