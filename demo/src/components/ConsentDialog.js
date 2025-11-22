import React, {useState} from 'react';
import './ConsentDialog.css';

/**
 * Consent Dialog Component
 * GDPR/CCPA Compliant consent mechanism
 * 
 * Compliance: GDPR Art. 7 (Consent), CCPA (Opt-in)
 */
const ConsentDialog = ({ onAccept, onReject, required = false }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="consent-overlay">
      <div className="consent-dialog">
        <div className="consent-header">
          <div className="consent-icon">🔒</div>
          <h2 className="consent-title">Privacy & Location Consent</h2>
        </div>

        <div className="consent-body">
          <p className="consent-intro">
            To provide safety monitoring, Circle needs to collect and use your location data.
          </p>

          <button 
            className="consent-expand"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '▼' : '▶'} What data we collect and why
          </button>

          {expanded && (
            <div className="consent-details">
              <h3>Data We Collect:</h3>
              <ul>
                <li><strong>Location Data:</strong> GPS coordinates to monitor your safety and learn your routines</li>
                <li><strong>Movement Patterns:</strong> To detect anomalies and provide alerts</li>
                <li><strong>Device Information:</strong> Battery level, connectivity for emergency detection</li>
                <li><strong>Usage Data:</strong> App interactions to improve service</li>
              </ul>

              <h3>How We Use It:</h3>
              <ul>
                <li>Safety monitoring and emergency alerts</li>
                <li>Learning your routine patterns (AI)</li>
                <li>Sharing with your circle during emergencies only</li>
                <li>Service improvement (anonymized)</li>
              </ul>

              <h3>Your Rights:</h3>
              <ul>
                <li>You can withdraw consent at any time (Settings → Privacy)</li>
                <li>You can export your data (Settings → Privacy → Export Data)</li>
                <li>You can delete your data (Settings → Account → Delete Account)</li>
                <li>You can limit location tracking (Settings → Privacy → Location)</li>
              </ul>

              <p className="consent-policy">
                <a href="/privacy-policy" target="_blank">Read full Privacy Policy</a>
              </p>
            </div>
          )}

          <div className="consent-legal">
            <p>
              By continuing, you consent to our collection and use of location data as described.
              This consent is required for the app to function. You can withdraw consent at any time.
            </p>
          </div>
        </div>

        <div className="consent-actions">
          {!required && (
            <button 
              className="btn-secondary consent-reject"
              onClick={onReject}
            >
              Deny (Limited Features)
            </button>
          )}
          <button 
            className="btn-primary consent-accept"
            onClick={onAccept}
          >
            I Consent & Continue
          </button>
        </div>

        <div className="consent-footer">
          <small>
            Required for: Safety monitoring, emergency alerts, routine learning
          </small>
        </div>
      </div>
    </div>
  );
};

export default ConsentDialog;

