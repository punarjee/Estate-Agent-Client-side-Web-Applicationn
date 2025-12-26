import React from 'react';
import PropertyCard from './PropertyCard';
import '../SearchResults.css';

function SearchResults({ properties, viewProperty, addToFavourites, favourites }) {
  if (properties.length === 0) {
    return (
      <div className="no-results">
        <p>No properties found matching your criteria.</p>
        <p>Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          viewProperty={viewProperty}
          addToFavourites={addToFavourites}
          isFavourite={favourites.includes(property.id)}
        />
      ))}
    </div>
  );
}

export default SearchResults;