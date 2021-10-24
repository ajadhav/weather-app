import { DailyForecast } from './WeatherDaily';
import './Footer.css';
const Footer = ({ daily }) => {
  return (
    <div className='card-footer row g-0 p-4'>
      <DailyForecast daily={daily} />
      <a
        className='btn btn-link link-info p-md-1 my-1'
        data-mdb-toggle='collapse'
        href='#collapseContent1'
        role='button'
        aria-expanded='false'
        aria-controls='collapseContent1'
      >
        <i className='fas fa-chevron-down fa-lg'></i>
        <i className='fas fa-chevron-up fa-lg'></i>
      </a>
    </div>
  );
};

export default Footer;
