const Header = ({ name, dateTime }) => {
  const date = new Date(dateTime * 1000);
  const fullDate = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  return (
    <div className='card-header row g-0 p-4'>
      <div className='d-flex justify-content-around'>
        <h4 className='card-title'>{name}</h4>
        <h6 className='text-muted'>{fullDate}</h6>
      </div>
    </div>
  );
};

export default Header;
