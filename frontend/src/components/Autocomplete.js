import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Autocomplete.css';
export default function Autocomplete({ changeCity, changeLatLon }) {
  const [state, setState] = useState({
    suggestionIdx: 0,
    suggestions: [],
    query: '',
  });

  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const timeOutId = setTimeout(
      () =>
        getData(state.query, token).then((res) => {
          setState({ ...state, suggestions: res });
        }),
      500
    );
    return () => cancel('No longer latest query') || clearTimeout(timeOutId);
  }, [state.query]);

  //   useEffect(() => {
  //     const { cancel, token } = axios.CancelToken.source();
  //     const timeOutId = setTimeout(
  //       () => onSuggestionsFetchRequested(state.query),
  //       500
  //     );
  //     return () => cancel('No longer latest query') || clearTimeout(timeOutId);
  //   }, [state.query]);

  const getData = async (query, cancelToken) => {
    let res = { data: [] };
    if (query) {
      try {
        res = await axios.get(`/api/suggestions?name=${query}`, cancelToken);
        console.log(res);
      } catch (err) {
        console.error(err);
        axios.isCancel(err);
      }
    }
    return res.data;
  };

  //   const getSuggestions = async (value, cancelToken) => {
  //     // const inputValue = value.trim().toLowerCase();
  //     const inputLength = value.length;
  //     return inputLength === 0 ? [] : await getData(value, cancelToken); // make api call here
  //   };

  //   const onSuggestionsFetchRequested = async (value, cancelToken) => {
  //     getSuggestions(value, cancelToken).then((results) => {
  //       setState({ ...state, suggestions: results });
  //     });
  //     // setState({ ...state, suggestions: getSuggestions(value, cancelToken) });
  //   };

  // const onSuggestionsClearRequested = () => {
  //   setState({ ...state, suggestionIdx: 0, suggestions: [] });
  // };

  const onSuggestionAccept = () => {
    let selection = state.suggestions[state.suggestionIdx];
    setState({
      ...state,
      query: '',
      suggestionIdx: 0,
      suggestions: [],
    });
  };

  const onChange = (e) => {
    setState({ ...state, query: e.currentTarget.value });
  };

  const onClick = (e) => {
    // changeLatLon(e.currentTarget.dataset.item);
    setState({
      suggestionIdx: 0,
      suggestions: [],
      query: '',
    });
    changeCity({
      name: e.currentTarget.dataset.city,
      lat: e.currentTarget.dataset.lat,
      lon: e.currentTarget.dataset.lon,
    });
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      //enter key
      onSuggestionAccept();
    } else if (e.keyCode === 38 && state.suggestionIdx !== 0) {
      setState({ ...state, suggestionIdx: state.suggestionIdx - 1 });
    } else if (
      e.keyCode === 40 &&
      state.suggestionIdx < state.suggestions.length - 1
    ) {
      setState({ ...state, suggestionIdx: state.suggestionIdx + 1 });
    }
  };

  //   const Suggestion = ({ suggestion, onClick }, index) => {
  //     return (
  //       <li key={index} onClick={onClick}>
  //         <a href=''>{suggestion.name}</a>
  //       </li>
  //     );
  //   };

  //   const Suggestions = (suggestions) =>
  //     suggestions.map((suggestion, index) => {
  //       return (
  //         <Suggestion key={index} suggestion={suggestion} onClick={onClick} />
  //       );
  //     });

  const SearchBar = ({ onChange, onKeyDown, placeholder, query }) => {
    return (
      <div className='input-group mt-3 rounded'>
        <input
          autoFocus
          type='search'
          value={query}
          autoComplete='off'
          onChange={onChange}
          onKeyDown={onKeyDown}
          id='form1'
          className='form-control'
          placeholder={placeholder}
          aria-label='Search'
        />
      </div>
    );
  };

  const suggs = state.suggestions;
  return (
    <>
      <SearchBar
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={'City'}
        query={state.query}
      />
      {suggs && (
        <ul className='dropdown-menu scrollable-menu position-static rounded show'>
          {suggs.map((suggestion, index) => {
            return (
              <li
                className='d-flex justify-content-between dropdown-item'
                data-city={suggestion.name}
                data-lat={suggestion.coord.lat}
                data-lon={suggestion.coord.lon}
                key={index}
                onClick={onClick}
              >
                <span>
                  {suggestion.name + ', '}
                  {suggestion.state && suggestion.state + ', '}
                  {suggestion.country + ' '}
                  <img
                    src={`https://openweathermap.org/images/flags/${suggestion.country.toLowerCase()}.png`}
                    alt=''
                  />
                </span>
                <span className='text-muted small'>
                  {suggestion.coord.lat.toFixed(3) +
                    ', ' +
                    suggestion.coord.lon.toFixed(3)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
