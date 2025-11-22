import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './RegistrationScreen.css';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (phone || email) {
      navigate('/home');
    }
  };

  const isValid = phone.length > 0 || email.length > 0;

  return (
    <div className="registration-screen">
      <div className="nav-bar">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="nav-title">Get Started</div>
        <div style={{width: '60px'}}></div>
      </div>
      <div className="registration-content">
        <div className="form-title">Let's create your account</div>
        <div className="form-subtitle">Sign up to start protecting yourself</div>
        <div className="input-group">
          <label className="input-label">📱 Phone Number</label>
          <input
            type="tel"
            className="input"
            placeholder="+1 (___) ___-____"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="divider">OR</div>
        <div className="input-group">
          <label className="input-label">📧 Email Address</label>
          <input
            type="email"
            className="input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={!isValid}
          style={{marginTop: '32px'}}
        >
          Continue
        </button>
        <div className="terms-text">
          By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;

