import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { formatData } from '../utils';
import './WeatherCard.css';

const WeatherCard = ({ data, units }) => {
  const weatherData = formatData(data, units);
  return (
    <div className='card' style={{ borderRadius: '1.25rem' }}>
      <Header
        name={weatherData?.current?.name}
        dateTime={weatherData?.current?.dt}
      />
      <Body current={weatherData?.current} hourly={weatherData?.hourly} />
      <Footer daily={weatherData?.daily} />
    </div>
  );
};

export default WeatherCard;
