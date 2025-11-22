/**
 * US Cities Data Tests
 * Tests city data structure and helper functions
 */

import {
  US_CITIES,
  getAllCities,
  getCitiesByState,
  getCityById,
  getDefaultCity,
  searchCities
} from '../usCities';

describe('US Cities Data', () => {
  test('has all required cities', () => {
    const cities = getAllCities();
    expect(cities.length).toBeGreaterThan(0);
    expect(cities.some(c => c.id === 'austin')).toBe(true);
    expect(cities.some(c => c.id === 'newYork')).toBe(true);
    expect(cities.some(c => c.id === 'losAngeles')).toBe(true);
  });

  test('each city has required properties', () => {
    const cities = getAllCities();
    cities.forEach(city => {
      expect(city).toHaveProperty('id');
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('state');
      expect(city).toHaveProperty('stateCode');
      expect(city).toHaveProperty('center');
      expect(city).toHaveProperty('locations');
      expect(city.center).toHaveProperty('lat');
      expect(city.center).toHaveProperty('lng');
    });
  });

  test('each city has locations', () => {
    const cities = getAllCities();
    cities.forEach(city => {
      expect(Object.keys(city.locations).length).toBeGreaterThan(0);
      expect(city.locations.downtown).toBeDefined();
    });
  });

  test('location coordinates are valid numbers', () => {
    const cities = getAllCities();
    cities.forEach(city => {
      expect(typeof city.center.lat).toBe('number');
      expect(typeof city.center.lng).toBe('number');
      expect(!isNaN(city.center.lat)).toBe(true);
      expect(!isNaN(city.center.lng)).toBe(true);
      
      Object.values(city.locations).forEach(location => {
        expect(typeof location.lat).toBe('number');
        expect(typeof location.lng).toBe('number');
        expect(!isNaN(location.lat)).toBe(true);
        expect(!isNaN(location.lng)).toBe(true);
      });
    });
  });
});

describe('City Helper Functions', () => {
  test('getAllCities returns array', () => {
    const cities = getAllCities();
    expect(Array.isArray(cities)).toBe(true);
  });

  test('getCityById returns correct city', () => {
    const city = getCityById('austin');
    expect(city).toBeDefined();
    expect(city.id).toBe('austin');
    expect(city.name).toBe('Austin');
  });

  test('getCityById returns null for invalid ID', () => {
    const city = getCityById('invalidCity');
    expect(city).toBeNull();
  });

  test('getDefaultCity returns Austin', () => {
    const city = getDefaultCity();
    expect(city.id).toBe('austin');
  });

  test('getCitiesByState filters correctly', () => {
    const texasCities = getCitiesByState('TX');
    expect(texasCities.length).toBeGreaterThan(0);
    texasCities.forEach(city => {
      expect(city.stateCode).toBe('TX');
    });
  });

  test('searchCities finds cities by name', () => {
    const results = searchCities('Austin');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(c => c.name === 'Austin')).toBe(true);
  });

  test('searchCities finds cities by state', () => {
    const results = searchCities('Texas');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(city => {
      expect(city.state).toContain('Texas');
    });
  });

  test('searchCities is case insensitive', () => {
    const results1 = searchCities('austin');
    const results2 = searchCities('AUSTIN');
    expect(results1.length).toBe(results2.length);
  });

  test('searchCities returns empty array for no matches', () => {
    const results = searchCities('NonexistentCity123');
    expect(results).toEqual([]);
  });
});

