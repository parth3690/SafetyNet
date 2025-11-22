import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import CircleScreen from './screens/CircleScreen';
import SettingsScreen from './screens/SettingsScreen';
import PrivacySettingsScreen from './screens/PrivacySettingsScreen';

function App() {
  return (
    <Router>
      <div className="phone-frame">
        <div className="status-bar">
          <span>9:41</span>
          <span>🔋📶</span>
        </div>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/registration" element={<RegistrationScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/emergency/:tier" element={<EmergencyScreen />} />
          <Route path="/circle" element={<CircleScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/privacy" element={<PrivacySettingsScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

