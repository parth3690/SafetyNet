import { useState, useEffect } from 'react';
import dataStore from '../services/dataStore';

/**
 * React hook for accessing and updating data store
 */
export const useDataStore = () => {
  const [data, setData] = useState(dataStore.getAll());
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Refresh data
  const refresh = () => {
    const newData = dataStore.getAll();
    setData(newData);
    setLastUpdated(newData.lastUpdated || Date.now());
  };

  // Update and refresh
  const update = (updates) => {
    if (typeof updates === 'function') {
      const currentData = dataStore.getAll();
      const newData = updates(currentData);
      dataStore.save(newData);
    } else {
      // Handle specific update methods
      if (updates.type === 'user') {
        dataStore.updateUser(updates.data);
      } else if (updates.type === 'location') {
        dataStore.updateLocation(updates.data);
      } else if (updates.type === 'activity') {
        dataStore.addActivity(updates.data);
      } else if (updates.type === 'emergency') {
        dataStore.triggerEmergency(updates.tier);
      } else if (updates.type === 'clearEmergency') {
        dataStore.clearEmergency();
      } else if (updates.type === 'learning') {
        dataStore.updateLearningProgress(updates.progress);
      } else if (updates.type === 'session') {
        if (updates.action === 'start') {
          dataStore.startSession(updates.sessionType, updates.data);
        } else {
          dataStore.endSession(updates.sessionType);
        }
      }
    }
    refresh();
  };

  // Reset all data
  const reset = () => {
    dataStore.reset();
    refresh();
  };

  useEffect(() => {
    // Auto-refresh every 2 seconds for real-time updates
    const interval = setInterval(() => {
      refresh();
      // Compliance: Automatic data cleanup (GDPR Art. 5(1)(e) - Storage Limitation)
      dataStore.cleanupExpiredData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Compliance: Export data method (GDPR Art. 20)
  const exportData = () => {
    const exported = dataStore.exportUserData();
    const blob = new Blob([JSON.stringify(exported, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `circle-data-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    return exported;
  };

  // Compliance: Consent management methods
  const updateConsent = (consentType, granted) => {
    dataStore.updateConsent(consentType, granted);
    refresh();
  };

  const withdrawConsent = (consentType) => {
    dataStore.withdrawConsent(consentType);
    refresh();
  };

  const hasConsent = (consentType) => {
    return dataStore.hasConsent(consentType);
  };

  return {
    data,
    user: data.user,
    circle: data.circle,
    activities: data.activities,
    settings: data.settings,
    activeSessions: data.activeSessions,
    lastUpdated,
    refresh,
    update,
    reset,
    // Convenience methods
    getCurrentLocation: () => data.user.currentLocation,
    getLocationHistory: () => data.user.locationHistory,
    simulateMovement: (destination, duration) => {
      return dataStore.simulateMovement(destination, duration).then(() => refresh());
    },
    // Compliance: User rights methods
    exportData,
    updateConsent,
    withdrawConsent,
    hasConsent
  };
};

