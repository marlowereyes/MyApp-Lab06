import React from 'react';
import Country from './Country';
import '../App.css';

function Countries({ countries }) {
  return (
    <div className="country-container">
      {countries.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </div>
  );
}

export default Countries;
