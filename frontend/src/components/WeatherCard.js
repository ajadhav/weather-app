import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { formatData } from '../utils';
import './WeatherCard.css';
import { useWeather } from './weather.context';
import WeatherCardSkeleton from './WeatherCardSkeleton';

const WeatherCard = () => {
  const {
    state: { weatherData, units, loading, error },
  } = useWeather();
  const formattedData = formatData(weatherData, units);
  return (
    <>
      {loading ? (
        <WeatherCardSkeleton />
      ) : weatherData.name !== '' && !error ? (
        <div className='card' style={{ borderRadius: '1.25rem' }}>
          <Header
            name={formattedData?.current?.name}
            dateTime={formattedData?.current?.dt}
          />
          <Body
            current={formattedData?.current}
            hourly={formattedData?.hourly}
          />
          <Footer daily={formattedData?.daily} />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default WeatherCard;
