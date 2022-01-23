import React from 'react';
import { useWeather, updateWeather } from './weather.context';
import { SET_LOCATION } from './weather.actions';
const Cities = (props) => {
  const { dispatch } = useWeather();
  const onSelection = (e) => {
    const query = {
      name: e.name,
      lat: e.lat,
      lon: e.lon,
    };
    dispatch({
      type: SET_LOCATION,
      payload: query,
    });
    updateWeather(query, dispatch, null);
    // setSelectedCity(e.name);
    // setSelectedCoord({ lat: e.coord.lat ?? null, lon: e.coord.lon ?? null });
  };
  const cityList = props.cityList.map((city) => (
    <button
      key={city.id}
      onClick={() => onSelection(city)}
      className='btn btn-light my-1 mx-1'
    >
      {city.name}
    </button>
  ));
  return (
    <div className='my-3 d-flex flex-wrap justify-content-center align-items-stretch align-self-stretch'>
      {cityList}
    </div>
  );
};

export default Cities;
