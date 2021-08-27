import React from 'react';

const SearchBar = ({ city, onChangeCity }) => {
  return (
    <div className='input-group rounded my-3'>
      <input
        autoFocus
        type='search'
        value={city}
        autoComplete='off'
        onChange={onChangeCity}
        id='form1'
        className='form-control'
        placeholder='City'
        aria-label='Search'
      />
    </div>
  );
};

export default SearchBar;
