import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from '../components/Modal';
import MapView from '../components/MapView';
import ConsentDialog from '../components/ConsentDialog';
import {useDataStore} from '../hooks/useDataStore';
import {AUSTIN_LOCATIONS} from '../services/dataStore';
import './HomeScreen.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { user, activities, update, reset, simulateMovement, getCurrentLocation, lastUpdated, hasConsent, updateConsent } = useDataStore();
  const [activeModal, setActiveModal] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showConsent, setShowConsent] = useState(!hasConsent('locationTracking'));

  // Compliance: Check consent on mount (GDPR Art. 7)
  useEffect(() => {
    if (!hasConsent('locationTracking')) {
      setShowConsent(true);
    }
  }, [hasConsent]);

  // Compliance: Handle consent acceptance (GDPR Art. 7)
  const handleConsentAccept = () => {
    updateConsent('locationTracking', true);
    updateConsent('locationSharing', true); // For circle members during emergencies
    setShowConsent(false);
  };

  // Compliance: Handle consent rejection (GDPR Art. 7(3))
  const handleConsentReject = () => {
    updateConsent('locationTracking', false);
    setShowConsent(false);
    alert('Location tracking disabled. Some features will be limited. You can enable it in Settings → Privacy.');
  };

  const quickActions = [
    {icon: '🏃‍♀️', label: 'Walking Home', modal: 'walking'},
    {icon: '📅', label: 'Going Out', modal: 'goingOut'},
    {icon: '✈️', label: 'Traveling', modal: 'traveling'},
    {icon: '✅', label: 'Check In', modal: 'checkIn'},
  ];

  const handleQuickAction = (modalType) => {
    setActiveModal(modalType);
  };

  const handleModalAction = (action, data) => {
    if (data) {
      update(data);
    }
    if (typeof action === 'string') {
      alert(action);
    }
    setActiveModal(null);
  };

  // Compliance: Check consent before location operations (GDPR Art. 7)
  const handleWalkingHome = () => {
    if (!hasConsent('locationTracking')) {
      alert('Location tracking is required for this feature. Please enable it in Settings → Privacy.');
      return;
    }

    const destination = AUSTIN_LOCATIONS.downtown;
    update({ type: 'session', action: 'start', sessionType: 'walking', data: { destination } });
    update({ type: 'user', data: { status: 'walking' } });
    update({ type: 'activity', data: { type: 'walking', message: 'Started walking home', icon: '🏃‍♀️' } });
    simulateMovement(destination, 5000).then(() => {
      update({ type: 'session', action: 'end', sessionType: 'walking' });
      update({ type: 'user', data: { status: 'safe' } });
      update({ type: 'activity', data: { type: 'check_in', message: 'Arrived home safely', icon: '✅' } });
    });
  };

  const handleGoingOut = (duration) => {
    update({ type: 'session', action: 'start', sessionType: 'goingOut', data: { duration, startTime: Date.now() } });
    update({ type: 'user', data: { status: 'going_out' } });
    update({ type: 'activity', data: { type: 'going_out', message: `Going out for ${duration}`, icon: '📅' } });
  };

  const handleTraveling = (destination) => {
    const location = AUSTIN_LOCATIONS[destination] || AUSTIN_LOCATIONS.airport;
    update({ type: 'session', action: 'start', sessionType: 'traveling', data: { destination: location } });
    update({ type: 'user', data: { status: 'traveling' } });
    update({ type: 'activity', data: { type: 'traveling', message: `Traveling to ${location.address}`, icon: '✈️' } });
  };

  const handleCheckIn = () => {
    update({ type: 'user', data: { lastCheckIn: Date.now(), status: 'safe' } });
    update({ type: 'activity', data: { type: 'check_in', message: 'Checked in safe', icon: '✅' } });
  };

  return (
    <div className="home-screen">
      <div className="nav-bar">
        <button 
          className="reset-button" 
          onClick={() => {
            if (window.confirm('Reset all data? This will clear everything and start fresh.')) {
              reset();
              alert('Data reset! Refreshing...');
              window.location.reload();
            }
          }}
          title="Reset All Data"
        >
          🔄
        </button>
        <div className="nav-title">Circle</div>
        <button className="settings-button" onClick={() => navigate('/settings')}>⚙️</button>
      </div>
      <div className="home-content">
        <div className="greeting">👋 Hey {user.name}</div>

        {user.isLearningMode ? (
          <div className="status-card learning">
            <div className="status-header">
              <span className="status-icon">🧠</span>
              <span className="status-title">Learning Your Routine</span>
            </div>
            <div className="progress-container">
              <div className="progress-label">Day {user.learningDay} of 14</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${user.learningProgress}%`}}></div>
              </div>
            </div>
            <div className="status-body">
              I'm learning when you leave home, where you go, and when you return. Help me learn faster by labeling activities.
            </div>
            <button className="btn-secondary" onClick={() => {
              const newProgress = Math.min(user.learningProgress + 10, 100);
              update({ type: 'learning', progress: newProgress });
              if (newProgress >= 100) {
                setTimeout(() => {
                  alert('🎉 Learning Complete!\n\nI\'ve learned your routine with 85% accuracy. Full protection is now active!');
                }, 500);
              } else {
                alert('Thanks for helping me learn! 🧠\n\nProgress: ' + newProgress + '%');
              }
            }}>Help Me Learn →</button>
          </div>
        ) : (
          <div className="status-card protected">
            <div className="status-header">
              <span className="status-icon">🛡️</span>
              <span className="status-title">You're Protected</span>
            </div>
            <div className="status-body">
              Everything looks normal. You typically leave work around 6pm. I'll check on you if you're running late.
            </div>
            <button className="btn-secondary" onClick={() => {
              alert('Your Patterns:\n\n• Home → Work: 8:00 AM (Mon-Fri)\n• Work → Home: 6:30 PM (Mon-Fri)\n• Gym visits: Tuesday & Thursday evenings\n• Weekend patterns: Variable');
            }}>View My Patterns →</button>
          </div>
        )}

        <div className="section-title">Quick Actions</div>
        <div className="quick-actions">
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className="action-card"
              onClick={() => handleQuickAction(action.modal)}
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-label">{action.label}</div>
            </div>
          ))}
        </div>

        <div className="circle-section">
          <div className="circle-header">
            <div className="section-title">Your Circle (3)</div>
            <a href="#" className="view-all" onClick={(e) => {e.preventDefault(); navigate('/circle');}}>View All →</a>
          </div>
          <div className="circle-members">
            <div className="avatar">M</div>
            <div className="avatar" style={{background: 'linear-gradient(135deg, #FF9500, #CC7700)'}}>S</div>
            <div className="avatar" style={{background: 'linear-gradient(135deg, #34C759, #28A745)'}}>J</div>
          </div>
        </div>

        <div className="section-title">Recent Activity</div>
        <div className="activity-list">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-text">{activity.icon} {activity.message}</div>
              <div className="activity-time">
                {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : 'Just now'}
              </div>
            </div>
          ))}
        </div>

        {/* Map Toggle & Data Status */}
        <div style={{marginTop: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <button 
            className="btn-secondary" 
            onClick={() => setShowMap(!showMap)}
            style={{width: 'auto', padding: '12px 24px', margin: '0 auto'}}
          >
            {showMap ? '📍 Hide Map' : '📍 Show Map'}
          </button>
          <div style={{fontSize: '12px', color: 'var(--text-tertiary)'}}>
            Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Just now'}
            <span style={{marginLeft: '8px', color: 'var(--success)'}}>●</span> Live
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div style={{marginTop: '24px', height: '300px', borderRadius: '16px', overflow: 'hidden'}}>
            {hasConsent('locationTracking') && getCurrentLocation() ? (
              <MapView
                center={[getCurrentLocation().lat, getCurrentLocation().lng]}
                zoom={13}
                userLocation={getCurrentLocation()}
                showUserLocation={true}
              />
            ) : (
              <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', color: 'var(--text-secondary)'}}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '48px', marginBottom: '16px'}}>📍</div>
                  <div>Location tracking disabled</div>
                  <button 
                    className="btn-secondary" 
                    onClick={() => updateConsent('locationTracking', true)}
                    style={{marginTop: '16px', width: 'auto', padding: '8px 16px'}}
                  >
                    Enable Location
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Compliance: Consent Dialog (GDPR Art. 7) */}
        {showConsent && (
          <ConsentDialog
            onAccept={handleConsentAccept}
            onReject={handleConsentReject}
            required={false}
          />
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'walking'}
        onClose={() => setActiveModal(null)}
        title="Walking Home"
        icon="🏃‍♀️"
      >
        <p className="modal-text">I'll monitor your route and check that you arrive safely. Expected arrival: 15 minutes.</p>
        <div style={{marginBottom: '16px', height: '200px', borderRadius: '12px', overflow: 'hidden'}}>
          <MapView
            center={[getCurrentLocation().lat, getCurrentLocation().lng]}
            zoom={14}
            userLocation={getCurrentLocation()}
            markers={[{...AUSTIN_LOCATIONS.downtown, title: 'Home', color: '#34C759'}]}
            showUserLocation={true}
            showPath={true}
            pathCoordinates={[getCurrentLocation(), AUSTIN_LOCATIONS.downtown]}
          />
        </div>
        <button className="btn-primary" onClick={() => {
          handleWalkingHome();
          handleModalAction('Walking mode activated! ✅');
        }}>
          Start Monitoring
        </button>
        <button className="btn-secondary" onClick={() => setActiveModal(null)} style={{marginTop: '12px'}}>
          Cancel
        </button>
      </Modal>

      <Modal
        isOpen={activeModal === 'goingOut'}
        onClose={() => setActiveModal(null)}
        title="Going Out Tonight"
        icon="📅"
      >
        <p className="modal-text">How long will you be out?</p>
        <button className="btn-primary" onClick={() => {
          handleGoingOut('1 hour');
          handleModalAction('Going out for 1 hour. I\'ll check on you if you\'re late! ✅');
        }}>
          1 Hour
        </button>
        <button className="btn-primary" onClick={() => {
          handleGoingOut('2-3 hours');
          handleModalAction('Going out for 2-3 hours. I\'ll check on you if you\'re late! ✅');
        }} style={{marginTop: '12px'}}>
          2-3 Hours
        </button>
        <button className="btn-primary" onClick={() => {
          handleGoingOut('All Night');
          handleModalAction('Going out all night. I\'ll check on you if you\'re late! ✅');
        }} style={{marginTop: '12px'}}>
          All Night
        </button>
        <button className="btn-secondary" onClick={() => setActiveModal(null)} style={{marginTop: '12px'}}>
          Cancel
        </button>
      </Modal>

      <Modal
        isOpen={activeModal === 'traveling'}
        onClose={() => setActiveModal(null)}
        title="Travel Mode"
        icon="✈️"
      >
        <p className="modal-text">Where are you traveling to in Austin?</p>
        <select 
          className="input" 
          style={{marginBottom: '16px'}}
          id="destination-select"
          defaultValue=""
        >
          <option value="">Select destination...</option>
          <option value="airport">Austin Airport</option>
          <option value="university">University of Texas</option>
          <option value="zilker">Zilker Park</option>
          <option value="capitol">Texas State Capitol</option>
          <option value="southAustin">South Austin</option>
          <option value="northAustin">North Austin</option>
        </select>
        <button className="btn-primary" onClick={() => {
          const select = document.getElementById('destination-select');
          const destination = select.value;
          if (destination) {
            const validation = validateDestination(AUSTIN_LOCATIONS[destination].address);
            if (validation.valid) {
              handleTraveling(destination);
              handleModalAction(`Travel mode activated to ${AUSTIN_LOCATIONS[destination].address}! ✅`);
            } else {
              alert(validation.error);
            }
          } else {
            alert('Please select a destination');
          }
        }}>
          Start Travel Mode
        </button>
        <button className="btn-secondary" onClick={() => setActiveModal(null)} style={{marginTop: '12px'}}>
          Cancel
        </button>
      </Modal>

      <Modal
        isOpen={activeModal === 'checkIn'}
        onClose={() => setActiveModal(null)}
        title="Check In Successful"
        icon="✅"
      >
        <p className="modal-text">Your circle has been notified that you're safe.</p>
        <div style={{marginBottom: '16px', height: '150px', borderRadius: '12px', overflow: 'hidden'}}>
          <MapView
            center={[getCurrentLocation().lat, getCurrentLocation().lng]}
            zoom={15}
            userLocation={getCurrentLocation()}
            showUserLocation={true}
          />
        </div>
        <button className="btn-primary" onClick={() => {
          handleCheckIn();
          setActiveModal(null);
        }}>
          Done
        </button>
      </Modal>

      <div className="tab-bar">
        <div className="tab-item active">
          <div className="tab-icon">🏠</div>
          <div className="tab-label">Home</div>
        </div>
        <div className="tab-item" onClick={() => navigate('/circle')}>
          <div className="tab-icon">👥</div>
          <div className="tab-label">Circle</div>
        </div>
        <div className="tab-item" onClick={() => navigate('/emergency/1')}>
          <div className="tab-icon">🚨</div>
          <div className="tab-label">Emergency</div>
        </div>
        <div className="tab-item" onClick={() => navigate('/settings')}>
          <div className="tab-icon">👤</div>
          <div className="tab-label">Profile</div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

