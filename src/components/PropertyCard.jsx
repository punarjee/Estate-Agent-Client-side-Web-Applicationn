import React from 'react';
import { useDrag } from 'react-dnd';
import DOMPurify from 'dompurify';
import '../PropertyCard.css';

const ItemTypes = {
  PROPERTY: 'property'
};

function PropertyCard({ property, viewProperty, addToFavourites, isFavourite }) {
  // Setup drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PROPERTY,
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  // Sanitize description for XSS protection
  const sanitizedDescription = DOMPurify.sanitize(property.description);
  const shortDescription = sanitizedDescription.length > 150 
    ? sanitizedDescription.substring(0, 150) + '...' 
    : sanitizedDescription;

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  }).format(property.price);

  return (
    <div 
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="property-image">
        <img src={property.picture} alt={property.location} />
        <button
          className={`favourite-icon ${isFavourite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            addToFavourites(property.id);
          }}
          aria-label="Add to favourites"
          title={isFavourite ? 'Already in favourites' : 'Add to favourites'}
        >
          {isFavourite ? '★' : '☆'}
        </button>
      </div>

      <div className="property-details">
        <h3 className="property-price">{formattedPrice}</h3>
        
        <p className="property-location">{property.location}</p>
        
        <div className="property-features">
          <span className="feature">
            <strong>{property.type}</strong>
          </span>
          <span className="feature">
            🛏️ {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
          </span>
          <span className="feature">
            📅 Added {property.added.month} {property.added.year}
          </span>
        </div>

        <p 
          className="property-description"
          dangerouslySetInnerHTML={{ __html: shortDescription }}
        />

        <button 
          className="btn btn-view"
          onClick={() => viewProperty(property.id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;