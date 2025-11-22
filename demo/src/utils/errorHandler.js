/**
 * Error Handling Utilities
 * Safe operations for arrays, numbers, and data access
 * Compliance: GDPR Art. 5(1)(f) - Security - Error prevention
 */

import errorLogger from '../services/errorLogger';
import { getUserErrorMessage, detectErrorType, getErrorSubType } from './errorMessages';

/**
 * Safe array access with bounds checking
 * @param {Array} array - Array to access
 * @param {number} index - Index to access
 * @param {any} defaultValue - Default value if index is out of bounds
 * @param {object} context - Context for error logging
 * @returns {any} Array element or default value
 */
export const safeArrayAccess = (array, index, defaultValue = null, context = {}) => {
  try {
    // Check if array is valid
    if (!Array.isArray(array)) {
      const error = new Error(`Expected array, got ${typeof array}`);
      errorLogger.logError(
        'TypeError',
        getUserErrorMessage('TypeError', 'invalidType', error),
        error,
        { ...context, expected: 'array', got: typeof array }
      );
      return defaultValue;
    }

    // Check if array is empty
    if (array.length === 0) {
      const error = new Error('Array is empty');
      errorLogger.logError(
        'ArrayBounds',
        getUserErrorMessage('ArrayBounds', 'emptyArray'),
        error,
        { ...context, arrayLength: 0, index }
      );
      return defaultValue;
    }

    // Check if index is valid
    if (typeof index !== 'number' || isNaN(index)) {
      const error = new Error(`Invalid index: ${index}`);
      errorLogger.logError(
        'NaN',
        getUserErrorMessage('NaN', 'invalidNumber', error),
        error,
        { ...context, index, arrayLength: array.length }
      );
      return defaultValue;
    }

    // Check bounds
    if (index < 0 || index >= array.length) {
      const error = new Error(`Index ${index} out of bounds for array of length ${array.length}`);
      errorLogger.logError(
        'ArrayBounds',
        getUserErrorMessage('ArrayBounds', 'indexOutOfRange'),
        error,
        { ...context, index, arrayLength: array.length }
      );
      return defaultValue;
    }

    return array[index];
  } catch (error) {
    errorLogger.logError(
      detectErrorType(error),
      getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
      error,
      { ...context, operation: 'safeArrayAccess' }
    );
    return defaultValue;
  }
};

/**
 * Safe array slice with bounds checking
 * @param {Array} array - Array to slice
 * @param {number} start - Start index
 * @param {number} end - End index (optional)
 * @param {object} context - Context for error logging
 * @returns {Array} Sliced array or empty array
 */
export const safeArraySlice = (array, start, end = undefined, context = {}) => {
  try {
    if (!Array.isArray(array)) {
      const error = new Error(`Expected array, got ${typeof array}`);
      errorLogger.logError(
        'TypeError',
        getUserErrorMessage('TypeError', 'invalidType', error),
        error,
        { ...context, expected: 'array', got: typeof array }
      );
      return [];
    }

    // Validate start index
    if (typeof start !== 'number' || isNaN(start)) {
      const error = new Error(`Invalid start index: ${start}`);
      errorLogger.logError(
        'NaN',
        getUserErrorMessage('NaN', 'invalidNumber', error),
        error,
        { ...context, start, arrayLength: array.length }
      );
      return [];
    }

    // Validate end index if provided
    if (end !== undefined) {
      if (typeof end !== 'number' || isNaN(end)) {
        const error = new Error(`Invalid end index: ${end}`);
        errorLogger.logError(
          'NaN',
          getUserErrorMessage('NaN', 'invalidNumber', error),
          error,
          { ...context, end, arrayLength: array.length }
        );
        return [];
      }
    }

    // Normalize indices
    const normalizedStart = Math.max(0, Math.min(start, array.length));
    const normalizedEnd = end !== undefined ? Math.max(0, Math.min(end, array.length)) : array.length;

    if (normalizedStart > normalizedEnd) {
      const error = new Error(`Start index ${normalizedStart} greater than end index ${normalizedEnd}`);
      errorLogger.logError(
        'ArrayBounds',
        getUserErrorMessage('ArrayBounds', 'invalidIndex'),
        error,
        { ...context, start: normalizedStart, end: normalizedEnd, arrayLength: array.length }
      );
      return [];
    }

    return array.slice(normalizedStart, normalizedEnd);
  } catch (error) {
    errorLogger.logError(
      detectErrorType(error),
      getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
      error,
      { ...context, operation: 'safeArraySlice' }
    );
    return [];
  }
};

/**
 * Safe number operation - ensures result is a valid number
 * @param {Function} operation - Function that performs the calculation
 * @param {any} defaultValue - Default value if calculation fails
 * @param {object} context - Context for error logging
 * @returns {number} Result of operation or default value
 */
export const safeNumberOperation = (operation, defaultValue = 0, context = {}) => {
  try {
    const result = operation();
    
    if (typeof result !== 'number' || isNaN(result)) {
      const error = new Error(`Calculation resulted in NaN or invalid number: ${result}`);
      errorLogger.logError(
        'NaN',
        getUserErrorMessage('NaN', 'calculation', error),
        error,
        { ...context, result }
      );
      return defaultValue;
    }

    if (!isFinite(result)) {
      const error = new Error(`Calculation resulted in infinite value: ${result}`);
      errorLogger.logError(
        'NaN',
        getUserErrorMessage('NaN', 'calculation', error),
        error,
        { ...context, result }
      );
      return defaultValue;
    }

    return result;
  } catch (error) {
    errorLogger.logError(
      detectErrorType(error),
      getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
      error,
      { ...context, operation: 'safeNumberOperation' }
    );
    return defaultValue;
  }
};

/**
 * Safe property access with null checking
 * @param {object} obj - Object to access
 * @param {string} path - Property path (e.g., 'user.name' or ['user', 'name'])
 * @param {any} defaultValue - Default value if property doesn't exist
 * @param {object} context - Context for error logging
 * @returns {any} Property value or default value
 */
export const safePropertyAccess = (obj, path, defaultValue = null, context = {}) => {
  try {
    if (obj == null) {
      const error = new Error(`Cannot access property on null/undefined object`);
      errorLogger.logError(
        'NullReference',
        getUserErrorMessage('NullReference', 'undefinedValue', error),
        error,
        { ...context, path }
      );
      return defaultValue;
    }

    const keys = Array.isArray(path) ? path : path.split('.');
    let current = obj;

    for (const key of keys) {
      if (current == null) {
        const error = new Error(`Property '${key}' is null/undefined in path '${path}'`);
        errorLogger.logError(
          'NullReference',
          getUserErrorMessage('NullReference', 'notFound', error),
          error,
          { ...context, path, key }
        );
        return defaultValue;
      }

      current = current[key];
    }

    return current !== undefined ? current : defaultValue;
  } catch (error) {
    errorLogger.logError(
      detectErrorType(error),
      getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
      error,
      { ...context, operation: 'safePropertyAccess', path }
    );
    return defaultValue;
  }
};

/**
 * Safe array map with error handling
 * @param {Array} array - Array to map
 * @param {Function} mapper - Mapping function
 * @param {object} context - Context for error logging
 * @returns {Array} Mapped array or empty array
 */
export const safeArrayMap = (array, mapper, context = {}) => {
  try {
    if (!Array.isArray(array)) {
      const error = new Error(`Expected array, got ${typeof array}`);
      errorLogger.logError(
        'TypeError',
        getUserErrorMessage('TypeError', 'invalidType', error),
        error,
        { ...context, expected: 'array', got: typeof array }
      );
      return [];
    }

    if (typeof mapper !== 'function') {
      const error = new Error(`Expected function, got ${typeof mapper}`);
      errorLogger.logError(
        'TypeError',
        getUserErrorMessage('TypeError', 'invalidType', error),
        error,
        { ...context, expected: 'function', got: typeof mapper }
      );
      return [];
    }

    return array.map((item, index) => {
      try {
        return mapper(item, index);
      } catch (error) {
        errorLogger.logError(
          detectErrorType(error),
          getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
          error,
          { ...context, operation: 'safeArrayMap', index, arrayLength: array.length }
        );
        return null; // Skip failed items
      }
    }).filter(item => item !== null);
  } catch (error) {
    errorLogger.logError(
      detectErrorType(error),
      getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
      error,
      { ...context, operation: 'safeArrayMap' }
    );
    return [];
  }
};

/**
 * Safe array filter with error handling
 * @param {Array} array - Array to filter
 * @param {Function} predicate - Filter function
 * @param {object} context - Context for error logging
 * @returns {Array} Filtered array or empty array
 */
export const safeArrayFilter = (array, predicate, context = {}) => {
  try {
    if (!Array.isArray(array)) {
      const error = new Error(`Expected array, got ${typeof array}`);
      errorLogger.logError(
        'TypeError',
        getUserErrorMessage('TypeError', 'invalidType', error),
        error,
        { ...context, expected: 'array', got: typeof array }
      );
      return [];
    }

    if (typeof predicate !== 'function') {
      const error = new Error(`Expected function, got ${typeof predicate}`);
      errorLogger.logError(
        'TypeError',
        getUserErrorMessage('TypeError', 'invalidType', error),
        error,
        { ...context, expected: 'function', got: typeof predicate }
      );
      return [];
    }

    return array.filter((item, index) => {
      try {
        return predicate(item, index);
      } catch (error) {
        errorLogger.logError(
          detectErrorType(error),
          getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
          error,
          { ...context, operation: 'safeArrayFilter', index, arrayLength: array.length }
        );
        return false; // Exclude failed items
      }
    });
  } catch (error) {
    errorLogger.logError(
      detectErrorType(error),
      getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
      error,
      { ...context, operation: 'safeArrayFilter' }
    );
    return [];
  }
};

/**
 * Safe parseInt with error handling
 * @param {any} value - Value to parse
 * @param {number} radix - Radix for parsing
 * @param {number} defaultValue - Default value if parsing fails
 * @param {object} context - Context for error logging
 * @returns {number} Parsed integer or default value
 */
export const safeParseInt = (value, radix = 10, defaultValue = 0, context = {}) => {
  try {
    if (value == null) {
      const error = new Error('Cannot parse null/undefined value');
      errorLogger.logError(
        'NullReference',
        getUserErrorMessage('NullReference', 'undefinedValue', error),
        error,
        { ...context, value }
      );
      return defaultValue;
    }

    const parsed = parseInt(value, radix);
    
    if (isNaN(parsed)) {
      const error = new Error(`Failed to parse "${value}" as integer`);
      errorLogger.logError(
        'NaN',
        getUserErrorMessage('NaN', 'numberFormat', error),
        error,
        { ...context, value, radix }
      );
      return defaultValue;
    }

    return parsed;
  } catch (error) {
    errorLogger.logError(
      detectErrorType(error),
      getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
      error,
      { ...context, operation: 'safeParseInt', value }
    );
    return defaultValue;
  }
};

/**
 * Safe parseFloat with error handling
 * @param {any} value - Value to parse
 * @param {number} defaultValue - Default value if parsing fails
 * @param {object} context - Context for error logging
 * @returns {number} Parsed float or default value
 */
export const safeParseFloat = (value, defaultValue = 0, context = {}) => {
  try {
    if (value == null) {
      const error = new Error('Cannot parse null/undefined value');
      errorLogger.logError(
        'NullReference',
        getUserErrorMessage('NullReference', 'undefinedValue', error),
        error,
        { ...context, value }
      );
      return defaultValue;
    }

    const parsed = parseFloat(value);
    
    if (isNaN(parsed)) {
      const error = new Error(`Failed to parse "${value}" as float`);
      errorLogger.logError(
        'NaN',
        getUserErrorMessage('NaN', 'numberFormat', error),
        error,
        { ...context, value }
      );
      return defaultValue;
    }

    return parsed;
  } catch (error) {
    errorLogger.logError(
      detectErrorType(error),
      getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
      error,
      { ...context, operation: 'safeParseFloat', value }
    );
    return defaultValue;
  }
};

/**
 * Wrap async function with error handling
 * @param {Function} asyncFn - Async function to wrap
 * @param {object} context - Context for error logging
 * @returns {Function} Wrapped function
 */
export const withErrorHandling = (asyncFn, context = {}) => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      errorLogger.logError(
        detectErrorType(error),
        getUserErrorMessage(detectErrorType(error), getErrorSubType(error, context), error),
        error,
        { ...context, operation: asyncFn.name || 'anonymous', args }
      );
      throw error; // Re-throw for caller to handle
    }
  };
};

/**
 * Handle error and return user-friendly message
 * @param {Error} error - Error object
 * @param {object} context - Context for error logging
 * @returns {string} User-friendly error message
 */
export const handleError = (error, context = {}) => {
  const errorType = detectErrorType(error);
  const subType = getErrorSubType(error, context);
  const userMessage = getUserErrorMessage(errorType, subType, error);
  
  errorLogger.logError(errorType, userMessage, error, context);
  
  return userMessage;
};

