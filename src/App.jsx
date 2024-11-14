import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');
  const [top10, setTop10] = useState('');
  const [alphabetical, setAlphabetical] = useState(false);

  // Fetch countries data
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data));
  }, []);

  // Filter and sort countries based on selected criteria
  useEffect(() => {
    let data = [...countries];

    // Filter by continent
    if (continentFilter) {
      data = data.filter(country => country.continents.includes(continentFilter));
      setSubregionFilter(''); // Clear subregion filter if continent is active
    }

    // Filter by subregion
    if (subregionFilter) {
      data = data.filter(country => country.subregion === subregionFilter);
      setContinentFilter(''); // Clear continent filter if subregion is active
    }

    // Sort top 10 by population or area if selected
    if (top10) {
      data = data
        .sort((a, b) => (b[top10] || 0) - (a[top10] || 0))
        .slice(0, 10);
    }

    // Sort alphabetically if checked
    if (alphabetical) {
      data = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }

    setFilteredCountries(data);
  }, [countries, continentFilter, subregionFilter, top10, alphabetical]);

  // Event handler functions for filters and sorters
  const handleContinentChange = (e) => {
    setContinentFilter(e.target.value);
    setTop10(''); // Reset top 10 filter when continent is changed
  };

  const handleSubregionChange = (e) => {
    setSubregionFilter(e.target.value);
    setTop10(''); // Reset top 10 filter when subregion is changed
  };

  const handleTop10Change = (criteria) => {
    setTop10(criteria);
    setContinentFilter('');
    setSubregionFilter('');
  };

  const toggleAlphabeticalSort = () => setAlphabetical(!alphabetical);

  return (
    <div>
      <h1>Countries of the World</h1>
      <div className="filters">
        <h2>Filter & Sort</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div className="filter-container">
            <label>
              <input type="checkbox" checked={alphabetical} onChange={toggleAlphabeticalSort} />
              Alphabetical
            </label>
          </div>

          <div className="filter-container">
            <p>Top 10</p>
            <label>
              <input
                type="radio"
                name="top10"
                checked={top10 === 'population'}
                onChange={() => handleTop10Change('population')}
              />
              by population
            </label>
            <label>
              <input
                type="radio"
                name="top10"
                checked={top10 === 'area'}
                onChange={() => handleTop10Change('area')}
              />
              by area
            </label>
          </div>

          <div className="filter-container">
            <p>By continent</p>
            <select value={continentFilter} onChange={handleContinentChange}>
              <option value="">All</option>
              <option value="Antarctica">Antarctica</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
            </select>
          </div>

          <div className="filter-container">
            <p>By subregion</p>
            <select value={subregionFilter} onChange={handleSubregionChange}>
              <option value="">Choose region</option>
              {/* Add all necessary subregion options here */}
              <option value="Caribbean">Caribbean</option>
              <option value="Western Europe">Western Europe</option>
              {/* ...add more subregions as needed */}
            </select>
          </div>
        </div>
      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
