/**
 * Error Handler Utilities Tests
 * Tests safe operations for arrays, numbers, and error handling
 */

import {
  safeArrayAccess,
  safeArraySlice,
  safeNumberOperation,
  safePropertyAccess,
  safeArrayMap,
  safeArrayFilter,
  safeParseInt,
  safeParseFloat,
  handleError
} from '../errorHandler';

describe('Safe Array Access', () => {
  test('accesses valid array index', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = safeArrayAccess(arr, 2, null);
    expect(result).toBe(3);
  });

  test('returns default for out of bounds index', () => {
    const arr = [1, 2, 3];
    const result = safeArrayAccess(arr, 10, 'default');
    expect(result).toBe('default');
  });

  test('returns default for negative index', () => {
    const arr = [1, 2, 3];
    const result = safeArrayAccess(arr, -1, 'default');
    expect(result).toBe('default');
  });

  test('handles empty array', () => {
    const arr = [];
    const result = safeArrayAccess(arr, 0, 'default');
    expect(result).toBe('default');
  });

  test('handles null/undefined array', () => {
    const result1 = safeArrayAccess(null, 0, 'default');
    const result2 = safeArrayAccess(undefined, 0, 'default');
    expect(result1).toBe('default');
    expect(result2).toBe('default');
  });

  test('handles NaN index', () => {
    const arr = [1, 2, 3];
    const result = safeArrayAccess(arr, NaN, 'default');
    expect(result).toBe('default');
  });
});

describe('Safe Array Slice', () => {
  test('slices array correctly', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = safeArraySlice(arr, 1, 4);
    expect(result).toEqual([2, 3, 4]);
  });

  test('handles out of bounds slice', () => {
    const arr = [1, 2, 3];
    const result = safeArraySlice(arr, 0, 10);
    expect(result).toEqual([1, 2, 3]);
  });

  test('handles null/undefined array', () => {
    const result = safeArraySlice(null, 0, 5);
    expect(result).toEqual([]);
  });

  test('handles invalid start index', () => {
    const arr = [1, 2, 3];
    const result = safeArraySlice(arr, NaN, 2);
    expect(result).toEqual([]);
  });
});

describe('Safe Number Operations', () => {
  test('performs valid calculation', () => {
    const result = safeNumberOperation(() => 10 + 5, 0);
    expect(result).toBe(15);
  });

  test('returns default for NaN result', () => {
    const result = safeNumberOperation(() => NaN, 0);
    expect(result).toBe(0);
  });

  test('returns default for Infinity', () => {
    const result = safeNumberOperation(() => Infinity, 0);
    expect(result).toBe(0);
  });

  test('handles division by zero', () => {
    const result = safeNumberOperation(() => 10 / 0, 0);
    expect(result).toBe(0); // Infinity should be caught
  });

  test('handles thrown errors', () => {
    const result = safeNumberOperation(() => {
      throw new Error('Test error');
    }, 42);
    expect(result).toBe(42);
  });
});

describe('Safe Property Access', () => {
  test('accesses nested property', () => {
    const obj = { user: { name: 'John' } };
    const result = safePropertyAccess(obj, 'user.name', null);
    expect(result).toBe('John');
  });

  test('returns default for missing property', () => {
    const obj = { user: { name: 'John' } };
    const result = safePropertyAccess(obj, 'user.age', 0);
    expect(result).toBe(0);
  });

  test('handles null object', () => {
    const result = safePropertyAccess(null, 'user.name', 'default');
    expect(result).toBe('default');
  });

  test('handles undefined object', () => {
    const result = safePropertyAccess(undefined, 'user.name', 'default');
    expect(result).toBe('default');
  });

  test('handles array path', () => {
    const obj = { user: { name: 'John' } };
    const result = safePropertyAccess(obj, ['user', 'name'], null);
    expect(result).toBe('John');
  });
});

describe('Safe Array Map', () => {
  test('maps array correctly', () => {
    const arr = [1, 2, 3];
    const result = safeArrayMap(arr, x => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  test('handles null array', () => {
    const result = safeArrayMap(null, x => x * 2);
    expect(result).toEqual([]);
  });

  test('handles mapper errors gracefully', () => {
    const arr = [1, 2, 3];
    const result = safeArrayMap(arr, x => {
      if (x === 2) throw new Error('Test error');
      return x * 2;
    });
    // Should filter out failed items
    expect(result.length).toBeLessThan(arr.length);
  });
});

describe('Safe Parse Int/Float', () => {
  test('parses valid integer', () => {
    const result = safeParseInt('123', 10, 0);
    expect(result).toBe(123);
  });

  test('returns default for invalid integer', () => {
    const result = safeParseInt('abc', 10, 0);
    expect(result).toBe(0);
  });

  test('parses valid float', () => {
    const result = safeParseFloat('123.45', 0);
    expect(result).toBe(123.45);
  });

  test('returns default for invalid float', () => {
    const result = safeParseFloat('abc', 0);
    expect(result).toBe(0);
  });

  test('handles null/undefined values', () => {
    expect(safeParseInt(null, 10, 0)).toBe(0);
    expect(safeParseFloat(undefined, 0)).toBe(0);
  });
});

