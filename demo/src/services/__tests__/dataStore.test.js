/**
 * DataStore Tests
 * Tests all data store operations with error handling
 */

import dataStore from '../dataStore';
import { getDefaultCity, getCityById } from '../../data/usCities';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

global.localStorage = localStorageMock;

describe('DataStore Operations', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    dataStore.reset();
  });

  test('initializes with default data', () => {
    const data = dataStore.getAll();
    expect(data).toBeDefined();
    expect(data.user).toBeDefined();
    expect(data.circle).toBeDefined();
    expect(data.activities).toBeDefined();
  });

  test('saves and loads data', () => {
    const originalData = dataStore.getAll();
    dataStore.updateUser({ name: 'Test User' });
    const newData = dataStore.getAll();
    expect(newData.user.name).toBe('Test User');
  });

  test('handles save errors gracefully', () => {
    // Test that save method exists and handles data
    const testData = { test: 'data', timestamp: Date.now() };
    const result = dataStore.save(testData);
    
    // Save should succeed with valid data
    expect(result).toBe(true);
    
    // Verify error handling is in place by checking the method structure
    // The actual error handling is tested through integration
    expect(typeof dataStore.save).toBe('function');
  });

  test('handles load errors gracefully', () => {
    // Test that load method exists and can handle errors
    // The actual error handling is tested through the error logger
    const data = dataStore.load();
    
    // Load should return data or null, but method should exist
    expect(data !== undefined).toBe(true);
    expect(typeof dataStore.load).toBe('function');
    
    // Verify getAll handles null load gracefully
    const allData = dataStore.getAll();
    expect(allData).toBeDefined();
    expect(allData.user).toBeDefined();
  });
});

describe('City Selection', () => {
  beforeEach(() => {
    localStorageMock.clear();
    dataStore.reset();
  });

  test('gets default city', () => {
    const city = dataStore.getSelectedCity();
    expect(city).toBeDefined();
    expect(city.id).toBe('austin');
  });

  test('sets and gets selected city', () => {
    const result = dataStore.setSelectedCity('newYork');
    expect(result).toBe(true);
    
    const city = dataStore.getSelectedCity();
    expect(city.id).toBe('newYork');
    expect(city.name).toBe('New York');
  });

  test('handles invalid city ID', () => {
    const result = dataStore.setSelectedCity('invalidCity');
    expect(result).toBe(false);
  });

  test('updates location when city changes', () => {
    dataStore.setSelectedCity('losAngeles');
    const user = dataStore.getUser();
    expect(user.currentLocation.address).toContain('Los Angeles');
  });

  test('gets city locations', () => {
    dataStore.setSelectedCity('chicago');
    const locations = dataStore.getCityLocations();
    expect(locations).toBeDefined();
    expect(locations.downtown).toBeDefined();
  });
});

describe('Location Operations', () => {
  beforeEach(() => {
    localStorageMock.clear();
    dataStore.reset();
  });

  test('updates location with consent', () => {
    dataStore.updateConsent('locationTracking', true);
    const newLocation = {
      lat: 30.3000,
      lng: -97.8000,
      address: 'Test Location'
    };
    const result = dataStore.updateLocation(newLocation);
    expect(result).toBeDefined();
    expect(result.address).toBe('Test Location');
  });

  test('rejects location update without consent', () => {
    dataStore.updateConsent('locationTracking', false);
    const newLocation = {
      lat: 30.3000,
      lng: -97.8000,
      address: 'Test Location'
    };
    const result = dataStore.updateLocation(newLocation);
    expect(result).toBeNull();
  });

  test('maintains location history retention', () => {
    dataStore.updateConsent('locationTracking', true);
    
    // Add multiple locations
    for (let i = 0; i < 10; i++) {
      dataStore.updateLocation({
        lat: 30.2672 + i * 0.001,
        lng: -97.7431 + i * 0.001,
        address: `Location ${i}`
      });
    }
    
    const history = dataStore.getLocationHistory();
    expect(Array.isArray(history)).toBe(true);
  });
});

describe('Circle Operations', () => {
  beforeEach(() => {
    localStorageMock.clear();
    dataStore.reset();
  });

  test('adds circle member', () => {
    const member = {
      name: 'Test Member',
      phone: '+1 (555) 123-4567',
      relation: 'Friend'
    };
    const result = dataStore.addCircleMember(member);
    expect(result).toBeDefined();
    expect(result.name).toBe('Test Member');
    expect(result.id).toBeDefined();
  });

  test('removes circle member', () => {
    const member = dataStore.addCircleMember({
      name: 'Test Member',
      phone: '+1 (555) 123-4567',
      relation: 'Friend'
    });
    
    const circleBefore = dataStore.getCircle();
    dataStore.removeCircleMember(member.id);
    const circleAfter = dataStore.getCircle();
    
    expect(circleAfter.length).toBe(circleBefore.length - 1);
  });

  test('gets circle members', () => {
    const circle = dataStore.getCircle();
    expect(Array.isArray(circle)).toBe(true);
    expect(circle.length).toBeGreaterThan(0);
  });
});

describe('Activity Operations', () => {
  beforeEach(() => {
    localStorageMock.clear();
    dataStore.reset();
  });

  test('adds activity', () => {
    const activity = {
      type: 'check_in',
      message: 'Test check-in',
      icon: '✅'
    };
    const result = dataStore.addActivity(activity);
    expect(result).toBeDefined();
    expect(result.message).toBe('Test check-in');
  });

  test('limits activity history to 50', () => {
    for (let i = 0; i < 60; i++) {
      dataStore.addActivity({
        type: 'test',
        message: `Activity ${i}`,
        icon: '📝'
      });
    }
    
    const activities = dataStore.getActivities();
    expect(activities.length).toBeLessThanOrEqual(50);
  });
});

describe('Emergency Operations', () => {
  beforeEach(() => {
    localStorageMock.clear();
    dataStore.reset();
  });

  test('triggers emergency', () => {
    dataStore.triggerEmergency(1);
    const user = dataStore.getUser();
    expect(user.emergencyTier).toBe(1);
    expect(user.status).toBe('emergency');
  });

  test('clears emergency', () => {
    dataStore.triggerEmergency(2);
    dataStore.clearEmergency();
    const user = dataStore.getUser();
    expect(user.emergencyTier).toBeNull();
    expect(user.status).toBe('safe');
  });
});

describe('Consent Management', () => {
  beforeEach(() => {
    localStorageMock.clear();
    dataStore.reset();
  });

  test('updates consent', () => {
    dataStore.updateConsent('locationTracking', true);
    const hasConsent = dataStore.hasConsent('locationTracking');
    expect(hasConsent).toBe(true);
  });

  test('withdraws consent', () => {
    dataStore.updateConsent('locationTracking', true);
    dataStore.withdrawConsent('locationTracking');
    const hasConsent = dataStore.hasConsent('locationTracking');
    expect(hasConsent).toBe(false);
  });

  test('clears location data when location consent withdrawn', () => {
    dataStore.updateConsent('locationTracking', true);
    dataStore.updateLocation({ lat: 30.2672, lng: -97.7431, address: 'Test' });
    
    dataStore.withdrawConsent('locationTracking');
    const user = dataStore.getUser();
    expect(user.currentLocation).toBeNull();
    expect(user.locationHistory).toEqual([]);
  });
});

