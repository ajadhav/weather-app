import React from 'react';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onChangeQuery,
  showSuggestions,
  hideSuggestions,
  setSelectedCity,
  searches,
}) => {
  const suggestions =
    showSuggestions &&
    searches &&
    searches.map((item, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            // console.log(e);
            setSelectedCity(item.name);
            setSearchTerm('');
            hideSuggestions();
          }}
        >
          <a className='dropdown-item' href='#'>
            {item.name}
          </a>
        </li>
      );
    });
  let dropdownClass = 'dropdown-menu rounded position-static';
  if (searches) {
    dropdownClass += ' show';
  }
  return (
    <>
      <div className='input-group mt-3 rounded'>
        <input
          autoFocus
          type='search'
          value={searchTerm}
          autoComplete='off'
          onChange={onChangeQuery}
          id='form1'
          className='form-control'
          placeholder='City'
          aria-label='Search'
        />
      </div>
      <ul className={dropdownClass}>{suggestions}</ul>
    </>
  );
};

export default SearchBar;
