import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageGallery from 'react-image-gallery';
import DOMPurify from 'dompurify';
import 'react-tabs/style/react-tabs.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../PropertyPage.css';

function PropertyPage({ 
  property, 
  backToSearch, 
  isFavourite, 
  addToFavourites, 
  removeFromFavourites 
}) {
  if (!property) {
    return (
      <div className="property-page">
        <p>Property not found</p>
        <button onClick={backToSearch} className="btn btn-back">
          Back to Search
        </button>
      </div>
    );
  }

  // Format images for gallery
  const galleryImages = property.images.map(img => ({
    original: img,
    thumbnail: img
  }));

  // Sanitize description
  const sanitizedDescription = DOMPurify.sanitize(property.description);

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  }).format(property.price);

  // Toggle favourite
  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites(property.id);
    } else {
      addToFavourites(property.id);
    }
  };

  return (
    <div className="property-page">
      <div className="property-page-header">
        <button onClick={backToSearch} className="btn btn-back">
          ← Back to Search
        </button>
        <button 
          className={`btn btn-favourite ${isFavourite ? 'active' : ''}`}
          onClick={toggleFavourite}
        >
          {isFavourite ? '★ Remove from Favourites' : '☆ Add to Favourites'}
        </button>
      </div>

      <div className="property-page-content">
        {/* Image Gallery */}
        <section className="property-gallery">
          <ImageGallery 
            items={galleryImages}
            showPlayButton={false}
            showFullscreenButton={true}
            showNav={true}
            thumbnailPosition="bottom"
          />
        </section>

        {/* Property Summary */}
        <section className="property-summary">
          <h1>{formattedPrice}</h1>
          <h2>{property.location}</h2>
          <div className="property-meta">
            <span className="meta-item">
              <strong>Type:</strong> {property.type}
            </span>
            <span className="meta-item">
              <strong>Bedrooms:</strong> {property.bedrooms}
            </span>
            <span className="meta-item">
              <strong>Tenure:</strong> {property.tenure}
            </span>
            <span className="meta-item">
              <strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}
            </span>
          </div>
        </section>

        {/* Tabbed Content */}
        <section className="property-tabs">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <div className="tab-content">
                <h3>Property Description</h3>
                <div 
                  className="description-text"
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="tab-content">
                <h3>Floor Plan</h3>
                <img 
                  src={property.floorplan} 
                  alt="Floor Plan"
                  className="floorplan-image"
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="tab-content">
                <h3>Location Map</h3>
                <div className="map-container">
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(property.location)}`}
                  />
                  <p className="map-note">
                    Map showing approximate location of {property.location}
                  </p>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </section>
      </div>
    </div>
  );
}

export default PropertyPage;