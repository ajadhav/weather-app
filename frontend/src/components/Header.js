const Header = ({ name, dateTime }) => {
  const date = new Date(dateTime * 1000);
  // const fullDate = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  return (
    <div className='card-header row g-0 p-4'>
      <div className='hstack gap-3'>
        <div className='h3 card-title pe-5'>{name}</div>
        <div className='vr'></div>
        <div className='vstack px-5'>
          <div className='h6 text-muted small'>{date.toLocaleDateString()}</div>
          <div className='h6 text-muted small'> {date.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
