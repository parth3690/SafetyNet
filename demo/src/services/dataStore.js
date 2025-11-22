/**
 * Temporary Data Store for Circle App
 * Simulates database with localStorage persistence
 */

// Austin, TX coordinates
const AUSTIN_CENTER = {
  lat: 30.2672,
  lng: -97.7431
};

// Initial location (downtown Austin)
const INITIAL_LOCATION = {
  lat: 30.2672,
  lng: -97.7431,
  address: "Downtown Austin, TX",
  timestamp: Date.now()
};

class DataStore {
  constructor() {
    this.storageKey = 'circle_app_data';
    this.init();
  }

  init() {
    // Initialize with default data if empty
    if (!this.load()) {
      this.reset();
    }
  }

  // Load data from localStorage
  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error loading data:', e);
      return null;
    }
  }

  // Save data to localStorage
  save(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving data:', e);
      return false;
    }
  }

  // Get all data
  getAll() {
    return this.load() || this.getDefaultData();
  }

  // Get default data structure
  getDefaultData() {
    return {
      user: {
        name: "Sarah",
        email: "sarah@example.com",
        phone: "+1 (512) 555-0123",
        isLearningMode: true,
        learningProgress: 35,
        learningDay: 5,
        currentLocation: INITIAL_LOCATION,
        locationHistory: [INITIAL_LOCATION],
        status: "safe", // safe, walking, going_out, traveling, emergency
        emergencyTier: null, // null, 1, 2, 3
        lastCheckIn: Date.now() - 7200000, // 2 hours ago
        // Compliance: Consent tracking (GDPR Art. 7, CCPA)
        consents: {
          locationTracking: false, // Must be explicitly granted
          locationSharing: false, // For circle members
          analytics: false, // For service improvement
          marketing: false, // For communications
          consentDate: null, // When consent was given
          consentVersion: "2.0" // Privacy policy version
        },
        // Compliance: Data retention tracking
        dataRetention: {
          locationHistoryRetention: 30, // days (GDPR principle)
          activitiesRetention: 90, // days
          lastCleanup: Date.now()
        }
      },
      circle: [
        {
          id: 1,
          name: "Mom",
          relation: "Family",
          initial: "M",
          phone: "+1 (512) 555-0100",
          email: "mom@example.com",
          isActive: true,
          lastSeen: Date.now() - 3600000
        },
        {
          id: 2,
          name: "Sarah",
          relation: "Friend",
          initial: "S",
          phone: "+1 (512) 555-0101",
          email: "sarah.friend@example.com",
          isActive: true,
          lastSeen: Date.now() - 1800000
        },
        {
          id: 3,
          name: "Jake",
          relation: "Friend",
          initial: "J",
          phone: "+1 (512) 555-0102",
          email: "jake@example.com",
          isActive: true,
          lastSeen: Date.now() - 900000
        }
      ],
      activities: [
        {
          id: 1,
          type: "check_in",
          message: "Checked in safe",
          timestamp: Date.now() - 7200000,
          icon: "✅"
        },
        {
          id: 2,
          type: "circle_alert",
          message: "Emily asked about you",
          timestamp: Date.now() - 86400000,
          icon: "👤"
        }
      ],
      activeSessions: {
        walking: null,
        goingOut: null,
        traveling: null
      },
      settings: {
        monitoring: true,
        sensitivity: "medium",
        safeZones: [
          { name: "Home", lat: 30.2672, lng: -97.7431, radius: 100 },
          { name: "Work", lat: 30.2747, lng: -97.7403, radius: 100 },
          { name: "Gym", lat: 30.2600, lng: -97.7500, radius: 50 }
        ],
        notifications: true
      },
      lastUpdated: Date.now()
    };
  }

  // Reset all data
  reset() {
    const defaultData = this.getDefaultData();
    this.save(defaultData);
    return defaultData;
  }

  // User methods
  getUser() {
    return this.getAll().user;
  }

  updateUser(updates) {
    const data = this.getAll();
    data.user = { ...data.user, ...updates };
    data.lastUpdated = Date.now();
    this.save(data);
    return data.user;
  }

  // Location methods
  getCurrentLocation() {
    return this.getUser().currentLocation;
  }

  // Compliance: Check consent before updating location (GDPR Art. 7)
  updateLocation(location) {
    const data = this.getAll();
    
    // Compliance: Verify consent before collecting location (GDPR Art. 7)
    if (!data.user.consents.locationTracking) {
      console.warn('Location update rejected: No consent');
      return null;
    }

    const newLocation = {
      ...location,
      timestamp: Date.now()
    };
    data.user.currentLocation = newLocation;
    data.user.locationHistory.push(newLocation);
    
    // Compliance: Data retention - 30 days max (GDPR Art. 5(1)(e))
    const retentionDays = data.user.dataRetention.locationHistoryRetention;
    const cutoffTime = Date.now() - (retentionDays * 24 * 60 * 60 * 1000);
    data.user.locationHistory = data.user.locationHistory.filter(
      loc => loc.timestamp > cutoffTime
    );
    
    data.lastUpdated = Date.now();
    this.save(data);
    return newLocation;
  }

  // Compliance: Consent management (GDPR Art. 7)
  updateConsent(consentType, granted, version = "2.0") {
    const data = this.getAll();
    data.user.consents[consentType] = granted;
    if (granted) {
      data.user.consents.consentDate = Date.now();
      data.user.consents.consentVersion = version;
    }
    data.lastUpdated = Date.now();
    this.save(data);
    return data.user.consents;
  }

  // Compliance: Check if consent exists (GDPR Art. 7)
  hasConsent(consentType) {
    return this.getUser().consents[consentType] === true;
  }

  // Compliance: Withdraw consent (GDPR Art. 7(3))
  withdrawConsent(consentType) {
    const data = this.getAll();
    data.user.consents[consentType] = false;
    
    // Compliance: If location consent withdrawn, stop collecting (GDPR Art. 7(3))
    if (consentType === 'locationTracking') {
      // Stop location updates
      data.user.currentLocation = null;
      data.user.locationHistory = [];
    }
    
    data.lastUpdated = Date.now();
    this.save(data);
    return data.user.consents;
  }

  getLocationHistory() {
    return this.getUser().locationHistory;
  }

  // Simulate movement (for demo)
  simulateMovement(destination, duration = 5000) {
    return new Promise((resolve) => {
      const startLocation = this.getCurrentLocation();
      const steps = 20;
      const stepTime = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        const newLat = startLocation.lat + (destination.lat - startLocation.lat) * progress;
        const newLng = startLocation.lng + (destination.lng - startLocation.lng) * progress;

        this.updateLocation({
          lat: newLat,
          lng: newLng,
          address: destination.address || `Moving to destination...`
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          this.updateLocation(destination);
          resolve(destination);
        }
      }, stepTime);
    });
  }

  // Circle methods
  getCircle() {
    return this.getAll().circle;
  }

  addCircleMember(member) {
    const data = this.getAll();
    const newMember = {
      ...member,
      id: Date.now(),
      isActive: true,
      lastSeen: Date.now()
    };
    data.circle.push(newMember);
    data.lastUpdated = Date.now();
    this.save(data);
    return newMember;
  }

  removeCircleMember(id) {
    const data = this.getAll();
    data.circle = data.circle.filter(m => m.id !== id);
    data.lastUpdated = Date.now();
    this.save(data);
  }

  // Activity methods
  getActivities() {
    return this.getAll().activities;
  }

  addActivity(activity) {
    const data = this.getAll();
    const newActivity = {
      ...activity,
      id: Date.now(),
      timestamp: Date.now()
    };
    data.activities.unshift(newActivity);
    // Keep only last 50 activities
    if (data.activities.length > 50) {
      data.activities = data.activities.slice(0, 50);
    }
    data.lastUpdated = Date.now();
    this.save(data);
    return newActivity;
  }

  // Session methods
  startSession(type, data) {
    const allData = this.getAll();
    allData.activeSessions[type] = {
      ...data,
      startTime: Date.now()
    };
    allData.lastUpdated = Date.now();
    this.save(allData);
  }

  endSession(type) {
    const data = this.getAll();
    data.activeSessions[type] = null;
    data.lastUpdated = Date.now();
    this.save(data);
  }

  getActiveSession(type) {
    return this.getAll().activeSessions[type];
  }

  // Emergency methods
  triggerEmergency(tier) {
    const data = this.getAll();
    data.user.emergencyTier = tier;
    data.user.status = "emergency";
    data.lastUpdated = Date.now();
    this.save(data);
    
    // Add activity
    this.addActivity({
      type: "emergency",
      message: `Emergency Tier ${tier} activated`,
      icon: "🚨",
      tier: tier
    });
  }

  clearEmergency() {
    const data = this.getAll();
    data.user.emergencyTier = null;
    data.user.status = "safe";
    data.lastUpdated = Date.now();
    this.save(data);
  }

  // Settings methods
  getSettings() {
    return this.getAll().settings;
  }

  updateSettings(updates) {
    const data = this.getAll();
    data.settings = { ...data.settings, ...updates };
    data.lastUpdated = Date.now();
    this.save(data);
    return data.settings;
  }

  // Learning progress
  updateLearningProgress(progress) {
    const data = this.getAll();
    data.user.learningProgress = Math.min(progress, 100);
    if (data.user.learningProgress >= 100) {
      data.user.isLearningMode = false;
    }
    data.lastUpdated = Date.now();
    this.save(data);
    return data.user;
  }

  // Compliance: Data export (GDPR Art. 20 - Right to Data Portability)
  exportUserData() {
    const data = this.getAll();
    // Compliance: Export in machine-readable format (GDPR Art. 20)
    return {
      user: {
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        // Compliance: Only export data user has consented to
        locationHistory: data.user.consents.locationTracking 
          ? data.user.locationHistory 
          : [],
        activities: data.user.activities,
        consents: data.user.consents,
        settings: data.settings
      },
      circle: data.circle,
      exportDate: new Date().toISOString(),
      exportVersion: "1.0"
    };
  }

  // Compliance: Data cleanup - automatic retention enforcement (GDPR Art. 5(1)(e))
  cleanupExpiredData() {
    const data = this.getAll();
    const now = Date.now();
    
    // Clean location history (30 days)
    const locationRetention = data.user.dataRetention.locationHistoryRetention * 24 * 60 * 60 * 1000;
    const locationCutoff = now - locationRetention;
    data.user.locationHistory = data.user.locationHistory.filter(
      loc => loc.timestamp > locationCutoff
    );
    
    // Clean activities (90 days)
    const activityRetention = data.user.dataRetention.activitiesRetention * 24 * 60 * 60 * 1000;
    const activityCutoff = now - activityRetention;
    data.activities = data.activities.filter(
      act => act.timestamp > activityCutoff
    );
    
    data.user.dataRetention.lastCleanup = now;
    data.lastUpdated = now;
    this.save(data);
    return data;
  }
}

// Export singleton instance
export default new DataStore();

// Export Austin locations for demo
export const AUSTIN_LOCATIONS = {
  downtown: { lat: 30.2672, lng: -97.7431, address: "Downtown Austin, TX" },
  university: { lat: 30.2849, lng: -97.7341, address: "University of Texas, Austin" },
  airport: { lat: 30.1945, lng: -97.6699, address: "Austin-Bergstrom International Airport" },
  zilker: { lat: 30.2669, lng: -97.7728, address: "Zilker Park, Austin" },
  capitol: { lat: 30.2747, lng: -97.7403, address: "Texas State Capitol" },
  southAustin: { lat: 30.2000, lng: -97.7500, address: "South Austin" },
  northAustin: { lat: 30.3500, lng: -97.7500, address: "North Austin" }
};

