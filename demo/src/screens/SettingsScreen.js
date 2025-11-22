import React from 'react';
import {useNavigate} from 'react-router-dom';
import './SettingsScreen.css';

const SettingsScreen = () => {
  const navigate = useNavigate();

  const settingsItems = [
    {label: 'Monitoring', value: 'On', action: null},
    {label: 'Sensitivity', value: 'Medium', action: null},
    {label: 'Safe Zones', value: '3 locations', action: null},
    {label: 'Notifications', value: 'All', action: null},
    {label: 'Privacy & Data', value: 'Manage consents', action: () => navigate('/privacy')},
    {label: 'Account', value: '', action: null},
    {label: 'Help & Support', value: '', action: null},
  ];

  return (
    <div className="settings-screen">
      <div className="nav-bar">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="nav-title">Settings</div>
        <div style={{width: '60px'}}></div>
      </div>
      <div className="settings-content">
        <div className="settings-list">
          {settingsItems.map((item, index) => (
            <div 
              key={index} 
              className="settings-item"
              onClick={item.action || undefined}
              style={{cursor: item.action ? 'pointer' : 'default'}}
            >
              <div className="settings-label">{item.label}</div>
              <div className="settings-right">
                {item.value && <div className="settings-value">{item.value}</div>}
                <div className="settings-arrow">›</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

