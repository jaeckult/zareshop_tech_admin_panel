export const sortData = (data, sortKey, direction) => {
  if (!data || data.length === 0) return data;

  return [...data].sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    // Handle nested properties
    if (sortKey.includes('.')) {
      const keys = sortKey.split('.');
      aValue = keys.reduce((obj, key) => obj?.[key], a);
      bValue = keys.reduce((obj, key) => obj?.[key], b);
    }

    // Handle different data types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      // Numbers are already comparable
    } else if (aValue instanceof Date && bValue instanceof Date) {
      aValue = aValue.getTime();
      bValue = bValue.getTime();
    } else if (typeof aValue === 'string' && aValue) {
      // Try to parse as date
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        aValue = aDate.getTime();
        bValue = bDate.getTime();
      } else {
        // Fall back to string comparison
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
    }

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) aValue = '';
    if (bValue === null || bValue === undefined) bValue = '';

    if (direction === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
}; 