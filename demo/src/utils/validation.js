/**
 * Field Validation Utilities
 * Compliance: GDPR Art. 5(1)(d) - Accuracy - Ensures data quality
 */

// Phone number validation with country code support
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { valid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters except + for country code
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Check if starts with + (country code)
  if (cleaned.startsWith('+')) {
    // International format: +[country code][number]
    // Minimum: +1 (US) + 10 digits = 12 chars
    // Maximum: +[3 digit country] + 15 digits = 18 chars
    if (cleaned.length < 12 || cleaned.length > 18) {
      return { 
        valid: false, 
        error: 'Invalid international phone format. Use +[country code][number]' 
      };
    }
    
    // Check country code (1-3 digits after +)
    const countryCodeMatch = cleaned.match(/^\+(\d{1,3})/);
    if (!countryCodeMatch) {
      return { valid: false, error: 'Invalid country code format' };
    }
    
    // Check remaining digits (should be 7-15 digits)
    const numberPart = cleaned.substring(countryCodeMatch[0].length);
    if (numberPart.length < 7 || numberPart.length > 15) {
      return { valid: false, error: 'Phone number must be 7-15 digits' };
    }
    
    return { valid: true, formatted: cleaned };
  } else {
    // US format: 10 digits (with or without formatting)
    const digitsOnly = cleaned.replace(/\D/g, '');
    
    if (digitsOnly.length === 10) {
      // Format as (XXX) XXX-XXXX
      const formatted = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
      return { valid: true, formatted: `+1${digitsOnly}`, display: formatted };
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      // US with leading 1
      const formatted = `(${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`;
      return { valid: true, formatted: `+${digitsOnly}`, display: formatted };
    } else {
      return { 
        valid: false, 
        error: 'US phone number must be 10 digits. For international, use +[country code]' 
      };
    }
  }
};

// Email validation
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email address is required' };
  }

  const trimmed = email.trim().toLowerCase();
  
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  // Check for common typos
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
  const domain = trimmed.split('@')[1];
  
  // Check for common misspellings
  const misspellings = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com'
  };
  
  if (misspellings[domain]) {
    return { 
      valid: false, 
      error: `Did you mean ${misspellings[domain]}?` 
    };
  }
  
  // Length check
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email address is too long (max 254 characters)' };
  }
  
  // Local part (before @) check
  const localPart = trimmed.split('@')[0];
  if (localPart.length > 64) {
    return { valid: false, error: 'Email address is invalid' };
  }
  
  // Check for consecutive dots
  if (trimmed.includes('..')) {
    return { valid: false, error: 'Email address cannot contain consecutive dots' };
  }
  
  // Check for leading/trailing dots
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return { valid: false, error: 'Email address cannot start or end with a dot' };
  }
  
  return { valid: true, formatted: trimmed };
};

// Name validation (no numbers, special characters limited)
export const validateName = (name, fieldName = 'Name') => {
  if (!name || name.trim() === '') {
    return { valid: false, error: `${fieldName} is required` };
  }

  const trimmed = name.trim();
  
  // Length check
  if (trimmed.length < 2) {
    return { valid: false, error: `${fieldName} must be at least 2 characters` };
  }
  
  if (trimmed.length > 50) {
    return { valid: false, error: `${fieldName} must be less than 50 characters` };
  }
  
  // Check for numbers
  if (/\d/.test(trimmed)) {
    return { valid: false, error: `${fieldName} cannot contain numbers` };
  }
  
  // Allow letters, spaces, hyphens, apostrophes (for names like O'Brien, Mary-Jane)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return { 
      valid: false, 
      error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` 
    };
  }
  
  // Check for consecutive special characters
  if (/\s{2,}/.test(trimmed) || /-{2,}/.test(trimmed) || /'{2,}/.test(trimmed)) {
    return { valid: false, error: `${fieldName} has invalid formatting` };
  }
  
  // Check for leading/trailing special characters
  if (trimmed.startsWith('-') || trimmed.startsWith("'") || 
      trimmed.endsWith('-') || trimmed.endsWith("'")) {
    return { valid: false, error: `${fieldName} cannot start or end with special characters` };
  }
  
  // Capitalize properly
  const formatted = trimmed
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return { valid: true, formatted };
};

// Address validation
export const validateAddress = (address) => {
  if (!address || address.trim() === '') {
    return { valid: false, error: 'Address is required' };
  }

  const trimmed = address.trim();
  
  if (trimmed.length < 5) {
    return { valid: false, error: 'Address is too short' };
  }
  
  if (trimmed.length > 200) {
    return { valid: false, error: 'Address is too long (max 200 characters)' };
  }
  
  return { valid: true, formatted: trimmed };
};

// Relationship validation (for circle members)
export const validateRelationship = (relationship) => {
  const validRelationships = [
    'Family', 'Friend', 'Partner', 'Roommate', 
    'Colleague', 'Neighbor', 'Other'
  ];
  
  if (!relationship || relationship.trim() === '') {
    return { valid: false, error: 'Relationship is required' };
  }
  
  if (!validRelationships.includes(relationship)) {
    return { 
      valid: false, 
      error: `Please select a valid relationship: ${validRelationships.join(', ')}` 
    };
  }
  
  return { valid: true };
};

// PIN/Password validation (for emergency cancellation)
export const validatePIN = (pin) => {
  if (!pin || pin.trim() === '') {
    return { valid: false, error: 'PIN is required' };
  }
  
  // PIN should be 4-6 digits
  const digitsOnly = pin.replace(/\D/g, '');
  
  if (digitsOnly.length < 4 || digitsOnly.length > 6) {
    return { valid: false, error: 'PIN must be 4-6 digits' };
  }
  
  // Check for all same digits (1111, 2222, etc.)
  if (/^(\d)\1+$/.test(digitsOnly)) {
    return { valid: false, error: 'PIN cannot be all the same digit' };
  }
  
  // Check for sequential (1234, 4321, etc.)
  const isSequential = (str) => {
    const nums = str.split('').map(Number);
    const ascending = nums.every((n, i) => i === 0 || n === nums[i-1] + 1);
    const descending = nums.every((n, i) => i === 0 || n === nums[i-1] - 1);
    return ascending || descending;
  };
  
  if (isSequential(digitsOnly)) {
    return { valid: false, error: 'PIN cannot be sequential numbers' };
  }
  
  return { valid: true, formatted: digitsOnly };
};

// Duration validation (for "Going Out" feature)
export const validateDuration = (duration) => {
  const validDurations = ['1 hour', '2-3 hours', 'All Night'];
  
  if (!duration || !validDurations.includes(duration)) {
    return { valid: false, error: 'Please select a valid duration' };
  }
  
  return { valid: true };
};

// Destination validation (for travel mode)
export const validateDestination = (destination) => {
  if (!destination || destination.trim() === '') {
    return { valid: false, error: 'Destination is required' };
  }
  
  const trimmed = destination.trim();
  
  if (trimmed.length < 2) {
    return { valid: false, error: 'Destination is too short' };
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Destination is too long (max 100 characters)' };
  }
  
  // Allow letters, numbers, spaces, commas, hyphens for addresses
  const destinationRegex = /^[a-zA-Z0-9\s,.-]+$/;
  if (!destinationRegex.test(trimmed)) {
    return { valid: false, error: 'Destination contains invalid characters' };
  }
  
  return { valid: true, formatted: trimmed };
};

// Real-time input formatting helpers
export const formatPhoneInput = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // If starts with +, preserve it
  if (value.startsWith('+')) {
    return '+' + digits;
  }
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
};

export const formatNameInput = (value) => {
  // Remove numbers and invalid characters
  return value.replace(/[^a-zA-Z\s'-]/g, '');
};

export const formatEmailInput = (value) => {
  // Remove spaces and convert to lowercase
  return value.replace(/\s/g, '').toLowerCase();
};

// Comprehensive form validation
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  // Phone validation
  if (formData.phone) {
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.valid) {
      errors.phone = phoneValidation.error;
    }
  }
  
  // Email validation
  if (formData.email) {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      errors.email = emailValidation.error;
    }
  }
  
  // At least one required
  if (!formData.phone && !formData.email) {
    errors.form = 'Please provide either a phone number or email address';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

// Compliance: Data quality validation (GDPR Art. 5(1)(d) - Accuracy)
export const validateDataQuality = (data, dataType) => {
  const issues = [];
  
  switch (dataType) {
    case 'phone':
      const phoneCheck = validatePhone(data);
      if (!phoneCheck.valid) issues.push(phoneCheck.error);
      break;
      
    case 'email':
      const emailCheck = validateEmail(data);
      if (!emailCheck.valid) issues.push(emailCheck.error);
      break;
      
    case 'name':
      const nameCheck = validateName(data);
      if (!nameCheck.valid) issues.push(nameCheck.error);
      break;
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
};

