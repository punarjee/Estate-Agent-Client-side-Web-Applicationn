import React from 'react';
import { useDrag } from 'react-dnd';
import '../FavouriteItem.css';

const ItemTypes = {
  FAVOURITE: 'favourite'
};

function FavouriteItem({ property, viewProperty, removeFromFavourites }) {
  // Setup drag functionality for removing
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FAVOURITE,
    item: { id: property.id },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        // If dropped outside, remove from favourites
        removeFromFavourites(item.id);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  }).format(property.price);

  return (
    <div 
      ref={drag}
      className={`favourite-item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img 
        src={property.picture} 
        alt={property.location}
        onClick={() => viewProperty(property.id)}
        style={{ cursor: 'pointer' }}
      />
      <div className="favourite-info">
        <p className="favourite-price">{formattedPrice}</p>
        <p className="favourite-location">{property.location}</p>
        <p className="favourite-features">
          {property.type} • {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
        </p>
      </div>
      <button
        className="remove-favourite"
        onClick={() => removeFromFavourites(property.id)}
        aria-label="Remove from favourites"
        title="Remove from favourites"
      >
        ×
      </button>
    </div>
  );
}

export default FavouriteItem;