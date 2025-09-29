// Validation utilities for forms

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  phone?: boolean;
  creditCard?: boolean;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type ValidationSchema = Record<string, ValidationRule>;

// Common validation patterns
export const Patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/.+/,
  creditCard: /^(?:\d{4}[-\s]?){3}\d{4}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  letters: /^[a-zA-Z\s]+$/,
  numbers: /^\d+$/,
};

// Validation functions
export const validateField = (
  value: any,
  rules: ValidationRule
): ValidationResult => {
  if (rules.required && (!value || value.toString().trim() === '')) {
    return { isValid: false, error: 'This field is required' };
  }

  if (!value && !rules.required) {
    return { isValid: true };
  }

  const stringValue = value.toString();

  if (rules.minLength && stringValue.length < rules.minLength) {
    return {
      isValid: false,
      error: `Minimum length is ${rules.minLength} characters`,
    };
  }

  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return {
      isValid: false,
      error: `Maximum length is ${rules.maxLength} characters`,
    };
  }

  if (rules.min !== undefined && Number(value) < rules.min) {
    return { isValid: false, error: `Minimum value is ${rules.min}` };
  }

  if (rules.max !== undefined && Number(value) > rules.max) {
    return { isValid: false, error: `Maximum value is ${rules.max}` };
  }

  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return { isValid: false, error: 'Invalid format' };
  }

  if (rules.email && !Patterns.email.test(stringValue)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (rules.url && !Patterns.url.test(stringValue)) {
    return { isValid: false, error: 'Please enter a valid URL' };
  }

  if (rules.phone && !Patterns.phone.test(stringValue)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  if (rules.creditCard && !Patterns.creditCard.test(stringValue)) {
    return { isValid: false, error: 'Please enter a valid card number' };
  }

  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      return { isValid: false, error: customError };
    }
  }

  return { isValid: true };
};

// Validate entire form
export const validateForm = (
  values: Record<string, any>,
  schema: ValidationSchema
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  Object.entries(schema).forEach(([fieldName, rules]) => {
    const result = validateField(values[fieldName], rules);
    if (!result.isValid) {
      errors[fieldName] = result.error!;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Common validation presets
export const ValidationPresets = {
  email: { email: true, required: true },
  password: { 
    required: true, 
    minLength: 8,
    pattern: Patterns.password 
  },
  phone: { phone: true, required: true },
  name: { 
    required: true, 
    minLength: 2, 
    maxLength: 50,
    pattern: Patterns.letters 
  },
  url: { url: true, required: true },
  required: { required: true },
  optional: {},
};

// Hook for form validation
import { useState, useEffect } from 'react';

export const useFormValidation = (
  initialValues: Record<string, any>,
  schema: ValidationSchema
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    const result = validateForm(values, schema);
    setErrors(result.errors);
    setIsValid(result.isValid);
    return result;
  };

  useEffect(() => {
    validate();
  }, [values]);

  const handleChange = (fieldName: string, value: any) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsValid(false);
  };

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setValues,
    validate,
    reset,
  };
};
