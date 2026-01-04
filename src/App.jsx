import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';
import propertiesData from './propertiesData.json';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('search');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favourites, setFavourites] = useState([]);

  // Navigate to property detail page
  const viewProperty = (propertyId) => {
    const property = propertiesData.properties.find(p => p.id === propertyId);
    setSelectedProperty(property);
    setCurrentView('property');
  };

  // Add property to favourites via drag-and-drop (prevent duplicates)
const handleDrop = (propertyId) => {
  setFavourites(prev => {
    if (prev.includes(propertyId)) return prev; // prevent duplicate
    return [...prev, propertyId]; // keep old favourites and add new one
  });
};


  // Navigate back to search page
  const backToSearch = () => {
    setCurrentView('search');
    setSelectedProperty(null);
  };

  // Add property to favourites (prevent duplicates)
  const addToFavourites = (propertyId) => {
    if (!favourites.includes(propertyId)) {
      setFavourites([...favourites, propertyId]);
    }
  };

  // Remove property from favourites
  const removeFromFavourites = (propertyId) => {
    setFavourites(favourites.filter(id => id !== propertyId));
  };

  // Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="app-header">

            <video className="header-video" autoPlay loop muted playsInline>
              <source src="/videos/header-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
          <div className="header-content">
            <h1 onClick={backToSearch} style={{ cursor: 'pointer' }}>
              Home Vista
            </h1>
            <p>Your one stop platform for finding the perfect property.</p>
          </div>
        </header>

        <main className="app-main">
          {currentView === 'search' ? (
            <SearchPage
              properties={propertiesData.properties}
              viewProperty={viewProperty}
              favourites={favourites}
              addToFavourites={addToFavourites}
              removeFromFavourites={removeFromFavourites}
              clearFavourites={clearFavourites}
            />
          ) : (
            <PropertyPage
              property={selectedProperty}
              backToSearch={backToSearch}
              isFavourite={favourites.includes(selectedProperty?.id)}
              addToFavourites={addToFavourites}
              removeFromFavourites={removeFromFavourites}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 EstateAgent Pro. All rights reserved.</p>
        </footer>
      </div>
    </DndProvider>
  );
}

export default App;