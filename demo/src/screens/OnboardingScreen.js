import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './OnboardingScreen.css';

const onboardingData = [
  {
    icon: '🧠',
    title: 'AI That Learns\nYour Routine',
    description: "Circle understands your daily patterns so it knows when something's wrong—without you lifting a finger.",
  },
  {
    icon: '👥',
    title: 'Your Trusted Circle\nProtects You',
    description: "Invite friends and family to your Circle. They'll get alerts only when you might need help.",
  },
  {
    icon: '🔔',
    title: 'Always Watching,\nNever Intrusive',
    description: "Works quietly in the background. You'll only hear from us when something's actually wrong.",
  },
];

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/registration');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentSlide = onboardingData[currentIndex];

  return (
    <div className="onboarding-screen">
      <div className="onboarding-content">
        <div className="onboarding-icon">{currentSlide.icon}</div>
        <div className="onboarding-title">{currentSlide.title}</div>
        <div className="onboarding-text">{currentSlide.description}</div>
        <div className="page-indicators">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="onboarding-actions">
        <button className="back-button" onClick={handleBack} disabled={currentIndex === 0}>
          {currentIndex === 0 ? '' : '← Back'}
        </button>
        <button className="btn-primary" onClick={handleNext}>
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;

