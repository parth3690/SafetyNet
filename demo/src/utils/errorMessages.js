/**
 * User-Friendly Error Messages
 * Provides clear, actionable error messages for users
 * Compliance: GDPR Art. 12 - Transparent communication
 */

export const ERROR_MESSAGES = {
  // NaN (Not a Number) errors
  NaN: {
    calculation: 'Unable to calculate this value. Please check your input and try again.',
    invalidNumber: 'Please enter a valid number.',
    numberFormat: 'The value entered is not a valid number. Please try again.',
    default: 'A calculation error occurred. Please refresh the page and try again.'
  },

  // Array out of bounds errors
  ArrayBounds: {
    indexOutOfRange: 'The requested item could not be found. Please try again.',
    emptyArray: 'No items available. Please add items first.',
    invalidIndex: 'Invalid selection. Please choose a different option.',
    default: 'Unable to access the requested data. Please refresh and try again.'
  },

  // Null/Undefined reference errors
  NullReference: {
    missingData: 'Required information is missing. Please complete all fields.',
    notFound: 'The requested information could not be found.',
    undefinedValue: 'Some data is not available. Please refresh the page.',
    default: 'An error occurred while loading data. Please try again.'
  },

  // Type errors
  TypeError: {
    invalidType: 'Invalid data format. Please check your input.',
    wrongFormat: 'The data format is incorrect. Please try again.',
    conversionFailed: 'Unable to process this data. Please check the format.',
    default: 'A data format error occurred. Please refresh and try again.'
  },

  // Network errors
  NetworkError: {
    connectionFailed: 'Unable to connect. Please check your internet connection.',
    timeout: 'The request took too long. Please try again.',
    serverError: 'Our servers are experiencing issues. Please try again later.',
    offline: 'You appear to be offline. Please check your connection.',
    default: 'A network error occurred. Please check your connection and try again.'
  },

  // Validation errors
  ValidationError: {
    invalidInput: 'Please check your input and try again.',
    requiredField: 'This field is required.',
    formatError: 'The format is incorrect. Please check and try again.',
    default: 'Please correct the errors and try again.'
  },

  // Storage errors
  StorageError: {
    saveFailed: 'Unable to save your data. Please try again.',
    loadFailed: 'Unable to load your data. Please refresh the page.',
    quotaExceeded: 'Storage is full. Please clear some data and try again.',
    accessDenied: 'Unable to access storage. Please check your browser settings.',
    default: 'A storage error occurred. Please try again or contact support.'
  },

  // Permission errors
  PermissionError: {
    locationDenied: 'Location access is required for this feature. Please enable it in your browser settings.',
    notificationDenied: 'Notification permission is required. Please enable it in your browser settings.',
    storageDenied: 'Storage access is required. Please check your browser settings.',
    default: 'Permission is required for this feature. Please enable it in your settings.'
  },

  // Generic errors
  Unknown: {
    default: 'An unexpected error occurred. Please refresh the page and try again. If the problem persists, please contact support.'
  }
};

/**
 * Get user-friendly error message
 * @param {string} errorType - Type of error
 * @param {string} subType - Sub-type of error (optional)
 * @param {Error} error - Original error object (optional)
 * @returns {string} User-friendly error message
 */
export const getUserErrorMessage = (errorType, subType = 'default', error = null) => {
  const errorMessages = ERROR_MESSAGES[errorType] || ERROR_MESSAGES.Unknown;
  
  // Try to get specific message, fallback to default
  const message = errorMessages[subType] || errorMessages.default || ERROR_MESSAGES.Unknown.default;
  
  return message;
};

/**
 * Detect error type from error object
 * @param {Error|any} error - Error object
 * @returns {string} Error type
 */
export const detectErrorType = (error) => {
  if (!error) return 'Unknown';

  // Check error name
  if (error.name) {
    const name = error.name.toLowerCase();
    if (name.includes('network') || name.includes('fetch')) return 'NetworkError';
    if (name.includes('type')) return 'TypeError';
    if (name.includes('reference')) return 'NullReference';
    if (name.includes('range')) return 'ArrayBounds';
    if (name.includes('quota') || name.includes('storage')) return 'StorageError';
  }

  // Check error message
  const message = error.message?.toLowerCase() || '';
  if (message.includes('nan') || message.includes('not a number')) return 'NaN';
  if (message.includes('out of bounds') || message.includes('index')) return 'ArrayBounds';
  if (message.includes('null') || message.includes('undefined')) return 'NullReference';
  if (message.includes('network') || message.includes('fetch') || message.includes('connection')) return 'NetworkError';
  if (message.includes('storage') || message.includes('quota')) return 'StorageError';
  if (message.includes('permission') || message.includes('denied')) return 'PermissionError';

  return 'Unknown';
};

/**
 * Get error sub-type from context
 * @param {Error} error - Error object
 * @param {object} context - Error context
 * @returns {string} Error sub-type
 */
export const getErrorSubType = (error, context = {}) => {
  const message = error?.message?.toLowerCase() || '';
  const errorType = detectErrorType(error);

  switch (errorType) {
    case 'NaN':
      if (message.includes('calculation')) return 'calculation';
      if (message.includes('format')) return 'numberFormat';
      return 'invalidNumber';

    case 'ArrayBounds':
      if (context.arrayLength === 0) return 'emptyArray';
      if (message.includes('index')) return 'indexOutOfRange';
      return 'invalidIndex';

    case 'NullReference':
      if (context.field) return 'missingData';
      if (message.includes('not found')) return 'notFound';
      return 'undefinedValue';

    case 'NetworkError':
      if (message.includes('timeout')) return 'timeout';
      if (message.includes('offline')) return 'offline';
      if (message.includes('500') || message.includes('server')) return 'serverError';
      return 'connectionFailed';

    case 'StorageError':
      if (message.includes('quota')) return 'quotaExceeded';
      if (message.includes('denied')) return 'accessDenied';
      if (message.includes('save')) return 'saveFailed';
      if (message.includes('load')) return 'loadFailed';
      return 'default';

    case 'PermissionError':
      if (message.includes('location')) return 'locationDenied';
      if (message.includes('notification')) return 'notificationDenied';
      if (message.includes('storage')) return 'storageDenied';
      return 'default';

    default:
      return 'default';
  }
};

