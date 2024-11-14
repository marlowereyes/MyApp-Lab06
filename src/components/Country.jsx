import React from 'react';
import '../App.css';

function Country({ country }) {
  return (
    <div className='country'>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width={50} />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <p>Continent: {country.continents.join(', ')}</p>
      <p>Subregion: {country.subregion}</p>
    </div>
  );
}

export default Country;
