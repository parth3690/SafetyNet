/**
 * Error Logger Tests
 * Tests error logging and metrics functionality
 */

import errorLogger from '../errorLogger';

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

describe('Error Logger', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    errorLogger.clearLogs();
  });

  test('logs error with context', () => {
    const error = new Error('Test error');
    const logEntry = errorLogger.logError(
      'TypeError',
      'User-friendly message',
      error,
      { component: 'TestComponent', action: 'testAction' }
    );

    expect(logEntry).toBeDefined();
    expect(logEntry.errorType).toBe('TypeError');
    expect(logEntry.userMessage).toBe('User-friendly message');
    expect(logEntry.context.component).toBe('TestComponent');
  });

  test('gets all logs', () => {
    errorLogger.logError('NaN', 'Test message', null, {});
    errorLogger.logError('ArrayBounds', 'Another message', null, {});
    
    const logs = errorLogger.getAllLogs();
    expect(logs.length).toBe(2);
  });

  test('gets logs by type', () => {
    errorLogger.logError('NaN', 'Message 1', null, {});
    errorLogger.logError('NaN', 'Message 2', null, {});
    errorLogger.logError('ArrayBounds', 'Message 3', null, {});
    
    const nanLogs = errorLogger.getLogsByType('NaN');
    expect(nanLogs.length).toBe(2);
  });

  test('gets metrics', () => {
    errorLogger.logError('NaN', 'Message 1', null, {});
    errorLogger.logError('ArrayBounds', 'Message 2', null, {});
    errorLogger.logError('NaN', 'Message 3', null, {});
    
    const metrics = errorLogger.getMetrics();
    expect(metrics.total).toBe(3);
    expect(metrics.byType.NaN).toBe(2);
    expect(metrics.byType.ArrayBounds).toBe(1);
  });

  test('resolves error', () => {
    const logEntry = errorLogger.logError('NaN', 'Test', null, {});
    const resolved = errorLogger.resolveError(logEntry.id);
    
    expect(resolved).toBe(true);
    const logs = errorLogger.getAllLogs();
    expect(logs[0].resolved).toBe(true);
  });

  test('clears old logs', () => {
    // Add some logs
    for (let i = 0; i < 5; i++) {
      errorLogger.logError('NaN', `Message ${i}`, null, {});
    }
    
    const before = errorLogger.getAllLogs().length;
    const after = errorLogger.clearOldLogs(0); // Clear all (0 days)
    
    expect(after).toBe(0);
  });

  test('exports logs', () => {
    errorLogger.logError('NaN', 'Test', null, {});
    const exportData = errorLogger.exportLogs();
    
    expect(exportData).toHaveProperty('logs');
    expect(exportData).toHaveProperty('metrics');
    expect(exportData.logs.length).toBeGreaterThan(0);
  });
});

