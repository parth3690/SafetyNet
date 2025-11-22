import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDataStore} from '../hooks/useDataStore';
import './PrivacySettingsScreen.css';

/**
 * Privacy Settings Screen
 * Compliance: GDPR Art. 15 (Right of Access), Art. 7 (Consent Management)
 */
const PrivacySettingsScreen = () => {
  const navigate = useNavigate();
  const { user, settings, updateConsent, withdrawConsent, hasConsent, exportData, reset } = useDataStore();

  const handleConsentToggle = (consentType, value) => {
    if (value) {
      updateConsent(consentType, true);
    } else {
      if (window.confirm(`Disabling ${consentType} may limit app functionality. Continue?`)) {
        withdrawConsent(consentType);
      }
    }
  };

  const handleExportData = () => {
    try {
      exportData();
      alert('Data exported! Check your downloads folder.');
    } catch (error) {
      alert('Error exporting data. Please try again.');
      console.error(error);
    }
  };

  const handleViewData = () => {
    const data = {
      user: user,
      settings: settings,
      consents: user.consents
    };
    alert('Your Data:\n\n' + JSON.stringify(data, null, 2) + '\n\n(Full export available via "Export My Data" button)');
  };

  return (
    <div className="privacy-settings-screen">
      <div className="nav-bar">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="nav-title">Privacy & Data</div>
        <div style={{width: '60px'}}></div>
      </div>

      <div className="privacy-content">
        <div className="privacy-section">
          <h2 className="section-title">Your Data Rights</h2>
          <p className="section-description">
            Under GDPR and CCPA, you have the right to access, export, correct, and delete your data.
          </p>

          <div className="privacy-actions">
            <button className="btn-primary" onClick={handleViewData}>
              👁️ View My Data
            </button>
            <button className="btn-primary" onClick={handleExportData} style={{marginTop: '12px'}}>
              📥 Export My Data (JSON)
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => {
                if (window.confirm('Delete all your data? This cannot be undone.')) {
                  reset();
                  alert('All data deleted. Refreshing...');
                  window.location.reload();
                }
              }}
              style={{marginTop: '12px', borderColor: 'var(--error)', color: 'var(--error)'}}
            >
              🗑️ Delete All Data
            </button>
          </div>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">Consent Management</h2>
          <p className="section-description">
            Control what data we collect and how we use it. You can withdraw consent at any time.
          </p>

          <div className="consent-item">
            <div className="consent-info">
              <div className="consent-label">📍 Location Tracking</div>
              <div className="consent-description">
                Required for safety monitoring and emergency alerts
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={hasConsent('locationTracking')}
                onChange={(e) => handleConsentToggle('locationTracking', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="consent-item">
            <div className="consent-info">
              <div className="consent-label">👥 Location Sharing with Circle</div>
              <div className="consent-description">
                Share location with circle members during emergencies only
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={hasConsent('locationSharing')}
                onChange={(e) => handleConsentToggle('locationSharing', e.target.checked)}
                disabled={!hasConsent('locationTracking')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="consent-item">
            <div className="consent-info">
              <div className="consent-label">📊 Analytics & Service Improvement</div>
              <div className="consent-description">
                Anonymized data to improve app performance
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={hasConsent('analytics')}
                onChange={(e) => handleConsentToggle('analytics', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="consent-item">
            <div className="consent-info">
              <div className="consent-label">📧 Marketing Communications</div>
              <div className="consent-description">
                Promotional emails and app updates
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={hasConsent('marketing')}
                onChange={(e) => handleConsentToggle('marketing', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">Data Retention</h2>
          <div className="retention-info">
            <p><strong>Location History:</strong> {user.dataRetention?.locationHistoryRetention || 30} days</p>
            <p><strong>Activities:</strong> {user.dataRetention?.activitiesRetention || 90} days</p>
            <p><strong>Last Cleanup:</strong> {user.dataRetention?.lastCleanup ? new Date(user.dataRetention.lastCleanup).toLocaleString() : 'Never'}</p>
          </div>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">Privacy Policy</h2>
          <p className="section-description">
            Read our complete privacy policy to understand how we collect, use, and protect your data.
          </p>
          <button className="btn-secondary" onClick={() => window.open('/PRIVACY_POLICY.md', '_blank')}>
            📄 View Privacy Policy
          </button>
        </div>

        {user.consents?.consentDate && (
          <div className="privacy-footer">
            <small>
              Consent given: {new Date(user.consents.consentDate).toLocaleString()}<br/>
              Policy version: {user.consents.consentVersion || '2.0'}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacySettingsScreen;

