// Utility functions for filtering properties based on search criteria

/**
 * Convert property date to Date object for comparison
 */
export const propertyToDate = (property) => {
  const monthMap = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  const month = monthMap[property.added.month];
  return new Date(property.added.year, month, property.added.day);
};

/**
 * Filter properties based on search criteria
 * Supports searching by any combination of criteria
 */
export const filterProperties = (properties, criteria) => {
  return properties.filter(property => {
    // Type filter
    if (criteria.type && property.type !== criteria.type) {
      return false;
    }

    // Min price filter
    if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
      return false;
    }

    // Max price filter
    if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
      return false;
    }

    // Min bedrooms filter
    if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
      return false;
    }

    // Max bedrooms filter
    if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
      return false;
    }

    // Postcode filter
    if (criteria.postcode && !property.postcode.startsWith(criteria.postcode)) {
      return false;
    }

    // Date range filter
    const propertyDate = propertyToDate(property);
    
    if (criteria.dateFrom) {
      const fromDate = new Date(criteria.dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      if (propertyDate < fromDate) {
        return false;
      }
    }

    if (criteria.dateTo) {
      const toDate = new Date(criteria.dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (propertyDate > toDate) {
        return false;
      }
    }

    return true;
  });
};