import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import FavouritesList from './FavouritesList';
import { filterProperties } from '../utils/searchUtils';
import '../SearchPage.css';

function SearchPage({ 
  properties, 
  viewProperty, 
  favourites, 
  addToFavourites, 
  removeFromFavourites, 
  clearFavourites 
}) {
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: null,
    dateTo: null
  });

  const [searchResults, setSearchResults] = useState(properties);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle search form submission
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    const results = filterProperties(properties, criteria);
    setSearchResults(results);
    
  };

  // Handle property drop on favourites area
  const handleDrop = (propertyId) => {
    addToFavourites(propertyId);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-main">
          <section className="search-form-section">
            <h2>Search Properties</h2>
            <SearchForm onSearch={handleSearch} />
          </section>

          <section className="search-results-section">
            <h2>
              {hasSearched 
                ? `${searchResults.length} ${searchResults.length === 1 ? 'Property' : 'Properties'} Found`
                : 'All Properties'}
            </h2>
            <SearchResults 
              properties={searchResults} 
              viewProperty={viewProperty}
              addToFavourites={addToFavourites}
              favourites={favourites}
            />
          </section>
        </div>

        <aside className="favourites-sidebar">
          <FavouritesList
            favourites={favourites}
            properties={properties}
            viewProperty={viewProperty}
            removeFromFavourites={removeFromFavourites}
            clearFavourites={clearFavourites}
            onDrop={handleDrop}
          />
        </aside>
      </div>
    </div>
  );
}

export default SearchPage;