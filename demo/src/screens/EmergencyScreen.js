import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import MapView from '../components/MapView';
import {useDataStore} from '../hooks/useDataStore';
import './EmergencyScreen.css';

const EmergencyScreen = () => {
  const {tier} = useParams();
  const navigate = useNavigate();
  const tierNum = parseInt(tier) || 1;
  const { user, getCurrentLocation, update } = useDataStore();

  const handleResponse = (response) => {
    if (response === 'safe') {
      update({ type: 'clearEmergency' });
      update({ type: 'user', data: { status: 'safe' } });
      update({ type: 'activity', data: { type: 'check_in', message: 'User confirmed safe', icon: '✅' } });
      navigate('/home');
    } else if (response === 'help') {
      update({ type: 'emergency', tier: 3 });
      navigate('/emergency/3');
    } else if (response === 'time') {
      update({ type: 'activity', data: { type: 'alert', message: 'User needs more time', icon: '⏰' } });
      navigate('/home');
    }
  };

  if (tierNum === 1) {
    return (
      <div className="emergency-screen tier1">
        <div className="emergency-icon">👋</div>
        <div className="emergency-title">Just Checking In</div>
        <div className="emergency-text">You're usually home by now. Everything okay?</div>
        <button className="btn-primary safe-button" onClick={() => handleResponse('safe')}>
          I'm Safe
        </button>
        <button className="btn-secondary" onClick={() => handleResponse('time')}>
          Need More Time
        </button>
        <button className="help-button" onClick={() => handleResponse('help')}>
          Need Help
        </button>
      </div>
    );
  }

  if (tierNum === 2) {
    return (
      <div className="emergency-screen tier2">
        <div className="emergency-icon">⚠️</div>
        <div className="emergency-title">We're Concerned</div>
        <div className="emergency-text">
          You haven't responded to our check-in. We've tried calling twice with no answer.
        </div>
            <div className="location-card">
              <div className="location-title">📍 Last Known Location</div>
              <div style={{height: '150px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px'}}>
                <MapView
                  center={[getCurrentLocation().lat, getCurrentLocation().lng]}
                  zoom={15}
                  userLocation={getCurrentLocation()}
                  showUserLocation={true}
                />
              </div>
              <div className="location-address">{getCurrentLocation().address}</div>
              <div className="location-time">
                {getCurrentLocation().timestamp ? new Date(getCurrentLocation().timestamp).toLocaleString() : 'Just now'}
              </div>
            </div>
        <div className="emergency-text notification-text">Your circle has been notified.</div>
        <button className="btn-primary safe-button" onClick={() => handleResponse('safe')}>
          I'm Safe Now
        </button>
        <button className="help-button tier2-help" onClick={() => handleResponse('help')}>
          I Need Help
        </button>
      </div>
    );
  }

  // Tier 3 - Full Emergency
  return (
    <div className="emergency-screen tier3">
      <div className="emergency-icon">🚨</div>
      <div className="emergency-title">EMERGENCY ACTIVE</div>
      <div className="emergency-text">Your circle has been alerted</div>
      <div className="status-card">
        <div className="status-text">📍 Sharing real-time location</div>
        <div className="status-text">🎙️ Audio recording started</div>
        <div style={{height: '200px', borderRadius: '12px', overflow: 'hidden', marginTop: '16px'}}>
          <MapView
            center={[getCurrentLocation().lat, getCurrentLocation().lng]}
            zoom={16}
            userLocation={getCurrentLocation()}
            showUserLocation={true}
            markers={[
              {...getCurrentLocation(), title: 'Your Location', color: '#FF3B30'}
            ]}
          />
        </div>
      </div>
      <div className="status-card">
        <div className="status-text">👤 Mom - 📞 Calling you</div>
        <div className="status-text">👤 Sarah - 🏃 On the way</div>
        <div className="status-text">👤 Jake - 👁️ Watching</div>
      </div>
      <button className="cancel-button" onClick={() => navigate('/home')}>
        Cancel Emergency (Requires PIN)
      </button>
      <div className="timer">Started 3 minutes ago</div>
    </div>
  );
};

export default EmergencyScreen;

