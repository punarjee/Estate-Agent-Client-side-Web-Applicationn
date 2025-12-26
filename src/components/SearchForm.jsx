import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../SearchForm.css';

function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: null,
    dateTo: null
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  // Reset form
  const handleReset = () => {
    const resetData = {
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateFrom: null,
      dateTo: null
    };
    setFormData(resetData);
    onSearch(resetData);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Property Type */}
      <div className="form-group">
        <label htmlFor="type">Property Type</label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          className="form-select"
        >
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minPrice">Min Price (£)</label>
          <input
            type="number"
            id="minPrice"
            value={formData.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            placeholder="No min"
            className="form-input"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            type="number"
            id="maxPrice"
            value={formData.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            placeholder="No max"
            className="form-input"
            min="0"
            step="1000"
          />
        </div>
      </div>

      {/* Bedrooms Range */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minBedrooms">Min Bedrooms</label>
          <input
            type="number"
            id="minBedrooms"
            value={formData.minBedrooms}
            onChange={(e) => handleChange('minBedrooms', e.target.value)}
            placeholder="No min"
            className="form-input"
            min="0"
            max="10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxBedrooms">Max Bedrooms</label>
          <input
            type="number"
            id="maxBedrooms"
            value={formData.maxBedrooms}
            onChange={(e) => handleChange('maxBedrooms', e.target.value)}
            placeholder="No max"
            className="form-input"
            min="0"
            max="10"
          />
        </div>
      </div>

      {/* Postcode */}
      <div className="form-group">
        <label htmlFor="postcode">Postcode Area</label>
        <input
          type="text"
          id="postcode"
          value={formData.postcode}
          onChange={(e) => handleChange('postcode', e.target.value.toUpperCase())}
          placeholder="e.g. BR1, NW1"
          className="form-input"
          pattern="[A-Z]{1,2}[0-9]{1,2}"
          title="Enter postcode area (e.g., BR1, NW1)"
        />
      </div>

      {/* Date Range */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dateFrom">Added From</label>
          <DatePicker
            id="dateFrom"
            selected={formData.dateFrom}
            onChange={(date) => handleChange('dateFrom', date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select start date"
            className="form-input date-picker"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={10}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateTo">Added To</label>
          <DatePicker
            id="dateTo"
            selected={formData.dateTo}
            onChange={(date) => handleChange('dateTo', date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select end date"
            className="form-input date-picker"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={10}
            minDate={formData.dateFrom}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Search Properties
        </button>
        <button type="button" onClick={handleReset} className="btn btn-secondary">
          Reset
        </button>
      </div>
    </form>
  );
}

export default SearchForm;