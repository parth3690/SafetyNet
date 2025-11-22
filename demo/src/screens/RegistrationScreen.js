import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {validatePhone, validateEmail, formatPhoneInput, formatNameInput, formatEmailInput, validateRegistrationForm} from '../utils/validation';
import './RegistrationScreen.css';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');

  // Real-time phone formatting
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow + for international format
    if (value.startsWith('+') || /^[\d\s()+-]*$/.test(value)) {
      const formatted = formatPhoneInput(value);
      setPhone(formatted);
      setPhoneError('');
      
      // Real-time validation
      if (formatted.length > 0) {
        const validation = validatePhone(formatted);
        if (!validation.valid && formatted.length > 5) {
          setPhoneError(validation.error);
        } else {
          setPhoneError('');
        }
      }
    }
  };

  // Real-time email formatting
  const handleEmailChange = (e) => {
    const value = e.target.value;
    const formatted = formatEmailInput(value);
    setEmail(formatted);
    setEmailError('');
    
    // Real-time validation
    if (formatted.length > 0) {
      const validation = validateEmail(formatted);
      if (!validation.valid && formatted.includes('@')) {
        setEmailError(validation.error);
      } else {
        setEmailError('');
      }
    }
  };

  const handleContinue = () => {
    // Clear previous errors
    setPhoneError('');
    setEmailError('');
    setFormError('');

    // Validate form
    const validation = validateRegistrationForm({ phone, email });
    
    if (!validation.valid) {
      // Set individual field errors
      if (validation.errors.phone) setPhoneError(validation.errors.phone);
      if (validation.errors.email) setEmailError(validation.errors.email);
      if (validation.errors.form) setFormError(validation.errors.form);
      return;
    }

    // If we get here, form is valid
    navigate('/home');
  };

  // Check if form is valid
  const phoneValidation = phone ? validatePhone(phone) : { valid: true };
  const emailValidation = email ? validateEmail(email) : { valid: true };
  const isValid = (phone && phoneValidation.valid) || (email && emailValidation.valid);

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
                className={`input ${phoneError ? 'input-error' : ''}`}
                placeholder="+1 (512) 555-0123 or (512) 555-0123"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={20}
              />
              {phoneError && <div className="error-message">{phoneError}</div>}
              {phone && !phoneError && phoneValidation.valid && (
                <div className="success-message">✓ Valid phone number</div>
              )}
              <div className="input-hint">
                US: (XXX) XXX-XXXX | International: +[country code][number]
              </div>
            </div>
        <div className="divider">OR</div>
            <div className="input-group">
              <label className="input-label">📧 Email Address</label>
              <input
                type="email"
                className={`input ${emailError ? 'input-error' : ''}`}
                placeholder="your@email.com"
                value={email}
                onChange={handleEmailChange}
                maxLength={254}
              />
              {emailError && <div className="error-message">{emailError}</div>}
              {email && !emailError && emailValidation.valid && (
                <div className="success-message">✓ Valid email address</div>
              )}
            </div>
            {formError && (
              <div className="form-error-message">{formError}</div>
            )}
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

