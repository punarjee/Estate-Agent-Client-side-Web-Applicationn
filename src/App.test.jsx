import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { filterProperties, propertyToDate } from './utils/searchUtils';
import { propertiesData } from './propertiesData';

/**
 * Test Suite for Estate Agent Application
 * Covers critical functionality including search, filtering, and favourites
 */

// Test 1: Application renders successfully
test('renders Estate Agent application header', () => {
  render(<App />);
  const headerElement = screen.getByText(/EstateAgent Pro/i);
  expect(headerElement).toBeInTheDocument();
});

// Test 2: Search functionality - Filter by property type
test('filters properties by type correctly', () => {
  const criteria = { type: 'House' };
  const results = filterProperties(propertiesData.properties, criteria);
  
  expect(results.length).toBeGreaterThan(0);
  results.forEach(property => {
    expect(property.type).toBe('House');
  });
});

// Test 3: Search functionality - Filter by price range
test('filters properties by price range correctly', () => {
  const criteria = { minPrice: '400000', maxPrice: '800000' };
  const results = filterProperties(propertiesData.properties, criteria);
  
  results.forEach(property => {
    expect(property.price).toBeGreaterThanOrEqual(400000);
    expect(property.price).toBeLessThanOrEqual(800000);
  });
});

// Test 4: Search functionality - Filter by bedroom count
test('filters properties by bedroom count correctly', () => {
  const criteria = { minBedrooms: '2', maxBedrooms: '3' };
  const results = filterProperties(propertiesData.properties, criteria);
  
  results.forEach(property => {
    expect(property.bedrooms).toBeGreaterThanOrEqual(2);
    expect(property.bedrooms).toBeLessThanOrEqual(3);
  });
});

// Test 5: Search functionality - Filter by postcode
test('filters properties by postcode correctly', () => {
  const criteria = { postcode: 'BR5' };
  const results = filterProperties(propertiesData.properties, criteria);
  
  results.forEach(property => {
    expect(property.postcode).toMatch(/^BR5/);
  });
});

// Test 6: Search functionality - Multiple criteria
test('filters properties with multiple criteria correctly', () => {
  const criteria = {
    type: 'Flat',
    minPrice: '300000',
    maxPrice: '600000',
    minBedrooms: '2'
  };
  const results = filterProperties(propertiesData.properties, criteria);
  
  results.forEach(property => {
    expect(property.type).toBe('Flat');
    expect(property.price).toBeGreaterThanOrEqual(300000);
    expect(property.price).toBeLessThanOrEqual(600000);
    expect(property.bedrooms).toBeGreaterThanOrEqual(2);
  });
});

// Test 7: Date conversion utility function
test('converts property date to Date object correctly', () => {
  const property = {
    added: {
      month: 'October',
      day: 12,
      year: 2022
    }
  };
  
  const date = propertyToDate(property);
  expect(date).toBeInstanceOf(Date);
  expect(date.getFullYear()).toBe(2022);
  expect(date.getMonth()).toBe(9); // October is month 9 (0-indexed)
  expect(date.getDate()).toBe(12);
});

// Test 8: Empty search returns all properties
test('returns all properties when no criteria specified', () => {
  const criteria = {
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: ''
  };
  
  const results = filterProperties(propertiesData.properties, criteria);
  expect(results.length).toBe(propertiesData.properties.length);
});

// Test 9: No results scenario
test('returns empty array when no properties match criteria', () => {
  const criteria = {
    type: 'House',
    minPrice: '2000000', // Price higher than any property
    maxPrice: '3000000'
  };
  
  const results = filterProperties(propertiesData.properties, criteria);
  expect(results).toEqual([]);
  expect(results.length).toBe(0);
});

// Test 10: Data integrity - All properties have required fields
test('all properties have required fields', () => {
  propertiesData.properties.forEach(property => {
    expect(property).toHaveProperty('id');
    expect(property).toHaveProperty('type');
    expect(property).toHaveProperty('bedrooms');
    expect(property).toHaveProperty('price');
    expect(property).toHaveProperty('description');
    expect(property).toHaveProperty('location');
    expect(property).toHaveProperty('postcode');
    expect(property).toHaveProperty('added');
    expect(property.added).toHaveProperty('month');
    expect(property.added).toHaveProperty('day');
    expect(property.added).toHaveProperty('year');
  });
});