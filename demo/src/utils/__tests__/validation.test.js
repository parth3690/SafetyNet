/**
 * Validation Utilities Tests
 * Tests all validation functions for proper error handling
 */

import {
  validatePhone,
  validateEmail,
  validateName,
  validateAddress,
  validatePIN,
  formatPhoneInput,
  formatNameInput,
  formatEmailInput
} from '../validation';

describe('Phone Validation', () => {
  test('validates US phone number format', () => {
    const result = validatePhone('(512) 555-0123');
    expect(result.valid).toBe(true);
    expect(result.formatted).toBeDefined();
  });

  test('validates international phone number with country code', () => {
    const result = validatePhone('+1 512 555 0123');
    expect(result.valid).toBe(true);
  });

  test('rejects invalid phone number', () => {
    const result = validatePhone('123');
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('rejects phone number with letters', () => {
    const result = validatePhone('abc-def-ghij');
    expect(result.valid).toBe(false);
  });

  test('handles empty phone number', () => {
    const result = validatePhone('');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('required');
  });

  test('handles null/undefined phone number', () => {
    const result1 = validatePhone(null);
    const result2 = validatePhone(undefined);
    expect(result1.valid).toBe(false);
    expect(result2.valid).toBe(false);
  });
});

describe('Email Validation', () => {
  test('validates correct email format', () => {
    const result = validateEmail('test@example.com');
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe('test@example.com');
  });

  test('rejects invalid email format', () => {
    const result = validateEmail('invalid-email');
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('detects common email typos', () => {
    const result = validateEmail('test@gmial.com');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('gmail.com');
  });

  test('rejects email that is too long', () => {
    const longEmail = 'a'.repeat(250) + '@example.com';
    const result = validateEmail(longEmail);
    expect(result.valid).toBe(false);
  });

  test('handles empty email', () => {
    const result = validateEmail('');
    expect(result.valid).toBe(false);
  });

  test('rejects email with consecutive dots', () => {
    const result = validateEmail('test..user@example.com');
    expect(result.valid).toBe(false);
  });
});

describe('Name Validation', () => {
  test('validates correct name format', () => {
    const result = validateName('John Doe');
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe('John Doe');
  });

  test('rejects name with numbers', () => {
    const result = validateName('John123');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('numbers');
  });

  test('rejects name that is too short', () => {
    const result = validateName('A');
    expect(result.valid).toBe(false);
  });

  test('rejects name that is too long', () => {
    const longName = 'A'.repeat(51);
    const result = validateName(longName);
    expect(result.valid).toBe(false);
  });

  test('handles names with hyphens and apostrophes', () => {
    const result1 = validateName("Mary-Jane O'Brien");
    expect(result1.valid).toBe(true);
  });

  test('handles empty name', () => {
    const result = validateName('');
    expect(result.valid).toBe(false);
  });

  test('rejects name with invalid special characters', () => {
    const result = validateName('John@Doe');
    expect(result.valid).toBe(false);
  });
});

describe('PIN Validation', () => {
  test('validates 4-digit PIN', () => {
    // Use a non-sequential PIN to avoid sequential check
    const result = validatePIN('1357');
    expect(result.valid).toBe(true);
  });

  test('rejects PIN that is too short', () => {
    const result = validatePIN('123');
    expect(result.valid).toBe(false);
  });

  test('rejects PIN that is too long', () => {
    const result = validatePIN('1234567');
    expect(result.valid).toBe(false);
  });

  test('rejects PIN with all same digits', () => {
    const result = validatePIN('1111');
    expect(result.valid).toBe(false);
  });

  test('rejects sequential PIN', () => {
    const result = validatePIN('1234');
    // Sequential PINs should be rejected for security
    expect(result.valid).toBe(false);
    expect(result.error).toContain('sequential');
  });
});

describe('Input Formatting', () => {
  test('formats phone input correctly', () => {
    const formatted = formatPhoneInput('5125550123');
    expect(formatted).toContain('(');
    expect(formatted).toContain(')');
  });

  test('formats name input by removing numbers', () => {
    const formatted = formatNameInput('John123Doe');
    expect(formatted).toBe('JohnDoe');
  });

  test('formats email input to lowercase', () => {
    const formatted = formatEmailInput('TEST@EXAMPLE.COM');
    expect(formatted).toBe('test@example.com');
  });
});

