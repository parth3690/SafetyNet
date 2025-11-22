/**
 * Error Logging Service
 * Tracks all errors for metrics and analytics
 * Compliance: GDPR Art. 5(1)(f) - Security - Error logs for system integrity
 */

class ErrorLogger {
  constructor() {
    this.storageKey = 'circle_app_error_logs';
    this.maxLogs = 1000; // Keep last 1000 errors
    this.logs = this.loadLogs();
  }

  /**
   * Load error logs from localStorage
   */
  loadLogs() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading error logs:', error);
      return [];
    }
  }

  /**
   * Save error logs to localStorage
   */
  saveLogs() {
    try {
      // Keep only last maxLogs entries
      if (this.logs.length > this.maxLogs) {
        this.logs = this.logs.slice(-this.maxLogs);
      }
      localStorage.setItem(this.storageKey, JSON.stringify(this.logs));
      return true;
    } catch (error) {
      console.error('Error saving error logs:', error);
      return false;
    }
  }

  /**
   * Log an error with context
   * @param {string} errorType - Type of error (NaN, ArrayBounds, NullReference, etc.)
   * @param {string} userMessage - User-friendly error message
   * @param {Error|object} error - Original error object
   * @param {object} context - Additional context (component, action, data)
   */
  logError(errorType, userMessage, error = null, context = {}) {
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      errorType,
      userMessage,
      technicalMessage: error?.message || error?.toString() || 'Unknown error',
      stack: error?.stack || null,
      context: {
        component: context.component || 'Unknown',
        action: context.action || 'Unknown',
        data: context.data || null,
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...context
      },
      severity: this.getSeverity(errorType),
      resolved: false
    };

    this.logs.push(logEntry);
    this.saveLogs();

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${errorType}] ${userMessage}`, logEntry);
    }

    return logEntry;
  }

  /**
   * Get severity level for error type
   */
  getSeverity(errorType) {
    const severityMap = {
      'NaN': 'medium',
      'ArrayBounds': 'high',
      'NullReference': 'high',
      'TypeError': 'high',
      'NetworkError': 'medium',
      'ValidationError': 'low',
      'StorageError': 'high',
      'PermissionError': 'medium',
      'Unknown': 'low'
    };
    return severityMap[errorType] || 'low';
  }

  /**
   * Get all error logs
   */
  getAllLogs() {
    return this.logs;
  }

  /**
   * Get logs by error type
   */
  getLogsByType(errorType) {
    return this.logs.filter(log => log.errorType === errorType);
  }

  /**
   * Get logs by severity
   */
  getLogsBySeverity(severity) {
    return this.logs.filter(log => log.severity === severity);
  }

  /**
   * Get recent logs (last N entries)
   */
  getRecentLogs(count = 50) {
    return this.logs.slice(-count);
  }

  /**
   * Get error metrics
   */
  getMetrics() {
    const metrics = {
      total: this.logs.length,
      byType: {},
      bySeverity: {
        high: 0,
        medium: 0,
        low: 0
      },
      recent24h: 0,
      recent7d: 0,
      unresolved: 0
    };

    const now = Date.now();
    const day24h = 24 * 60 * 60 * 1000;
    const day7d = 7 * 24 * 60 * 60 * 1000;

    this.logs.forEach(log => {
      // Count by type
      metrics.byType[log.errorType] = (metrics.byType[log.errorType] || 0) + 1;

      // Count by severity
      metrics.bySeverity[log.severity] = (metrics.bySeverity[log.severity] || 0) + 1;

      // Count unresolved
      if (!log.resolved) {
        metrics.unresolved++;
      }

      // Count recent errors
      const logTime = new Date(log.timestamp).getTime();
      if (now - logTime < day24h) {
        metrics.recent24h++;
      }
      if (now - logTime < day7d) {
        metrics.recent7d++;
      }
    });

    return metrics;
  }

  /**
   * Mark error as resolved
   */
  resolveError(logId) {
    const log = this.logs.find(l => l.id === logId);
    if (log) {
      log.resolved = true;
      log.resolvedAt = new Date().toISOString();
      this.saveLogs();
      return true;
    }
    return false;
  }

  /**
   * Clear all logs
   */
  clearLogs() {
    this.logs = [];
    this.saveLogs();
  }

  /**
   * Clear old logs (older than N days)
   */
  clearOldLogs(days = 30) {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    this.logs = this.logs.filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      return logTime > cutoff;
    });
    this.saveLogs();
    return this.logs.length;
  }

  /**
   * Export logs for analysis
   */
  exportLogs() {
    return {
      logs: this.logs,
      metrics: this.getMetrics(),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
  }
}

// Export singleton instance
export default new ErrorLogger();

