export const DailyItem = ({ day }) => {
  const dayofWeek = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(new Date(day.dt * 1000));
  const temp = { min: day.temp.min, max: day.temp.max };
  const icon = day.weather[0].icon;
  const description = day?.weather[0].description;
  return (
    <div className='d-flex align-items-center list-group-item border-0 mb-0'>
      <p className='flex-grow-1 small mb-0'>{dayofWeek}</p>
      <p className='small mb-0'>
        <img
          className='img-fluid w-50'
          src={`${process.env.PUBLIC_URL}/assets/icons/${icon}.png`}
          alt={description}
        />
      </p>
      <p className='small col-2 mb-0'>{temp.max}</p>
      <p className='small col-2 text-muted mb-0'>{temp.min}</p>
    </div>
  );
};

export const DailyForecast = ({ daily }) => {
  return (
    <div className='list-group collapse' id='collapseContent1'>
      {daily &&
        daily.map((day, index) => {
          return <DailyItem key={index} day={day} />;
        })}
    </div>
  );
};
