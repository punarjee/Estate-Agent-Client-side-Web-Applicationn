import React from 'react';
import { useDrop } from 'react-dnd';
import FavouriteItem from './FavouriteItem';
import '../FavouritesList.css';

const ItemTypes = {
  PROPERTY: 'property',
  FAVOURITE: 'favourite'
};

function FavouritesList({ 
  favourites, 
  properties, 
  viewProperty, 
  removeFromFavourites, 
  clearFavourites,
  onDrop 
}) {
  // Setup drop zone for favourites
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PROPERTY,
    drop: (item) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  // Get favourite properties
  const favouriteProperties = favourites
    .map(id => properties.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div 
      ref={drop}
      className={`favourites-list ${isOver ? 'drop-active' : ''}`}
    >
      <div className="favourites-header">
        <h3>
          Favourites
          {favourites.length > 0 && (
            <span className="favourite-count">{favourites.length}</span>
          )}
        </h3>
        {favourites.length > 0 && (
          <button 
            className="btn btn-clear"
            onClick={clearFavourites}
            title="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>No favourites yet</p>
          <p className="hint">Drag properties here or click the ★ icon</p>
          
        </div>
      ) : (
        <div className="favourites-items">
          {favouriteProperties.map(property => (
            <FavouriteItem
              key={property.id}
              property={property}
              viewProperty={viewProperty}
              removeFromFavourites={removeFromFavourites}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavouritesList;