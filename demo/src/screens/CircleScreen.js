import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from '../components/Modal';
import {validateName, validatePhone, validateEmail, formatPhoneInput, formatNameInput} from '../utils/validation';
import {useDataStore} from '../hooks/useDataStore';
import './CircleScreen.css';

const CircleScreen = () => {
  const navigate = useNavigate();
  const { circle, update } = useDataStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relation: 'Friend'
  });
  const [errors, setErrors] = useState({});

  const members = circle || [
    {name: 'Mom', relation: 'Family', initial: 'M'},
    {name: 'Sarah', relation: 'Friend', initial: 'S'},
    {name: 'Jake', relation: 'Friend', initial: 'J'},
  ];

  const handleNameChange = (e) => {
    const value = formatNameInput(e.target.value);
    setFormData({...formData, name: value});
    const validation = validateName(value, 'Name');
    if (!validation.valid && value.length > 0) {
      setErrors({...errors, name: validation.error});
    } else {
      const newErrors = {...errors};
      delete newErrors.name;
      setErrors(newErrors);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith('+') || /^[\d\s()+-]*$/.test(value)) {
      const formatted = formatPhoneInput(value);
      setFormData({...formData, phone: formatted});
      const validation = validatePhone(formatted);
      if (!validation.valid && formatted.length > 5) {
        setErrors({...errors, phone: validation.error});
      } else {
        const newErrors = {...errors};
        delete newErrors.phone;
        setErrors(newErrors);
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s/g, '');
    setFormData({...formData, email: value});
    const validation = validateEmail(value);
    if (!validation.valid && value.includes('@')) {
      setErrors({...errors, email: validation.error});
    } else {
      const newErrors = {...errors};
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handleAddMember = () => {
    const newErrors = {};
    
    // Validate name
    const nameValidation = validateName(formData.name, 'Name');
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.error;
    }
    
    // Validate phone or email (at least one required)
    if (formData.phone) {
      const phoneValidation = validatePhone(formData.phone);
      if (!phoneValidation.valid) {
        newErrors.phone = phoneValidation.error;
      }
    }
    
    if (formData.email) {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.valid) {
        newErrors.email = emailValidation.error;
      }
    }
    
    if (!formData.phone && !formData.email) {
      newErrors.form = 'Please provide either a phone number or email address';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add member
    const initial = formData.name.charAt(0).toUpperCase();
    update({
      type: 'circle',
      action: 'add',
      data: {
        name: nameValidation.formatted || formData.name,
        phone: formData.phone,
        email: formData.email,
        relation: formData.relation,
        initial: initial
      }
    });
    
    // Reset form
    setFormData({name: '', phone: '', email: '', relation: 'Friend'});
    setErrors({});
    setShowAddModal(false);
    alert('Circle member added! ✅');
  };

  return (
    <div className="circle-screen">
      <div className="nav-bar">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="nav-title">My Circle</div>
        <div style={{width: '60px'}}></div>
      </div>
      <div className="circle-content">
        {members.map((member, index) => (
          <div key={index} className="member-card">
            <div className="member-avatar" style={{
              background: index === 0 
                ? 'linear-gradient(135deg, #4A90E2, #2E5C8A)'
                : index === 1
                ? 'linear-gradient(135deg, #FF9500, #CC7700)'
                : 'linear-gradient(135deg, #34C759, #28A745)'
            }}>
              {member.initial}
            </div>
            <div className="member-info">
              <div className="member-name">{member.name}</div>
              <div className="member-relation">{member.relation}</div>
            </div>
          </div>
        ))}
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          + Add Circle Member
        </button>

        {/* Add Member Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setFormData({name: '', phone: '', email: '', relation: 'Friend'});
            setErrors({});
          }}
          title="Add Circle Member"
          icon="👥"
        >
          <div style={{textAlign: 'left'}}>
            <div className="input-group">
              <label className="input-label">Name *</label>
              <input
                type="text"
                className={`input ${errors.name ? 'input-error' : ''}`}
                placeholder="Enter name"
                value={formData.name}
                onChange={handleNameChange}
                maxLength={50}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
              {formData.name && !errors.name && validateName(formData.name, 'Name').valid && (
                <div className="success-message">✓ Valid name</div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input
                type="tel"
                className={`input ${errors.phone ? 'input-error' : ''}`}
                placeholder="+1 (512) 555-0123"
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength={20}
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
              {formData.phone && !errors.phone && validatePhone(formData.phone).valid && (
                <div className="success-message">✓ Valid phone number</div>
              )}
            </div>

            <div className="divider" style={{margin: '16px 0', fontSize: '13px'}}>OR</div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="member@email.com"
                value={formData.email}
                onChange={handleEmailChange}
                maxLength={254}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
              {formData.email && !errors.email && validateEmail(formData.email).valid && (
                <div className="success-message">✓ Valid email address</div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Relationship</label>
              <select
                className="input"
                value={formData.relation}
                onChange={(e) => setFormData({...formData, relation: e.target.value})}
              >
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Partner">Partner</option>
                <option value="Roommate">Roommate</option>
                <option value="Colleague">Colleague</option>
                <option value="Neighbor">Neighbor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {errors.form && (
              <div className="form-error-message" style={{marginBottom: '16px'}}>
                {errors.form}
              </div>
            )}

            <button className="btn-primary" onClick={handleAddMember}>
              Add to Circle
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => {
                setShowAddModal(false);
                setFormData({name: '', phone: '', email: '', relation: 'Friend'});
                setErrors({});
              }}
              style={{marginTop: '12px'}}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CircleScreen;

