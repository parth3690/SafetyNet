import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-logo">🛡️</div>
      <div className="splash-title">CIRCLE</div>
      <div className="splash-subtitle">Your AI Safety Companion</div>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default SplashScreen;

