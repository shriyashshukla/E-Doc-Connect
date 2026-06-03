/**
 * Formats a date string to a human-readable format
 * @param {string|Date} dateVal - Date to format
 * @returns {string} - Formatted date (e.g. "Oct 12, 2026")
 */
export function formatDate(dateVal) {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return String(dateVal);
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Formats a date string into a verbose date (e.g. "Monday, October 12, 2026")
 */
export function formatLongDate(dateVal) {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return String(dateVal);
  
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
