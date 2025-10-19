import { format, parseISO, isValid } from 'date-fns';

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string (default: 'MMM dd, yyyy')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

/**
 * Format date for input fields
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string for input
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} - Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  } catch (error) {
    console.error('Relative time error:', error);
    return '';
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate random color for categories
 * @param {string} category - Category name
 * @returns {string} - Hex color code
 */
export const getCategoryColor = (category) => {
  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
    '#6366F1', // Indigo
  ];
  
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with score and feedback
 */
export const validatePassword = (password) => {
  const result = {
    score: 0,
    feedback: [],
    isValid: false
  };
  
  if (password.length >= 8) {
    result.score += 1;
  } else {
    result.feedback.push('Password must be at least 8 characters long');
  }
  
  if (/[a-z]/.test(password)) {
    result.score += 1;
  } else {
    result.feedback.push('Password must contain at least one lowercase letter');
  }
  
  if (/[A-Z]/.test(password)) {
    result.score += 1;
  } else {
    result.feedback.push('Password must contain at least one uppercase letter');
  }
  
  if (/\d/.test(password)) {
    result.score += 1;
  } else {
    result.feedback.push('Password must contain at least one number');
  }
  
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.score += 1;
  }
  
  result.isValid = result.score >= 4;
  
  return result;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Download file from blob
 * @param {Blob} blob - Blob to download
 * @param {string} filename - Filename for download
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Get month name from number
 * @param {number} month - Month number (1-12)
 * @returns {string} - Month name
 */
export const getMonthName = (month) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1] || '';
};

/**
 * Calculate percentage change
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} - Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Generate unique ID
 * @returns {string} - Unique ID
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Get expense categories
 * @returns {Array} - Array of category objects
 */
export const getExpenseCategories = () => {
  return [
    { value: 'Food & Dining', label: 'Food & Dining', icon: '🍽️' },
    { value: 'Transportation', label: 'Transportation', icon: '🚗' },
    { value: 'Shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'Entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'Bills & Utilities', label: 'Bills & Utilities', icon: '💡' },
    { value: 'Healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'Education', label: 'Education', icon: '📚' },
    { value: 'Travel', label: 'Travel', icon: '✈️' },
    { value: 'Groceries', label: 'Groceries', icon: '🛒' },
    { value: 'Personal Care', label: 'Personal Care', icon: '💄' },
    { value: 'Gifts & Donations', label: 'Gifts & Donations', icon: '🎁' },
    { value: 'Business', label: 'Business', icon: '💼' },
    { value: 'Other', label: 'Other', icon: '📝' },
  ];
};
