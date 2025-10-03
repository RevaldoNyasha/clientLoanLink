// Validators utility - handles form validation
export const validators = {
  // Email validation
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  },

  // Password validation
  password: (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  },

  // Confirm password validation
  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  },

  // Name validation
  name: (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return null;
  },

  // National ID validation
  nationalId: (nationalId) => {
    if (!nationalId) return 'National ID is required';
    if (nationalId.length < 8) return 'National ID must be at least 8 characters';
    if (!/^[0-9]+$/.test(nationalId)) return 'National ID must contain only numbers';
    return null;
  },

  // Phone number validation
  phone: (phone) => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    if (phone.replace(/[^0-9]/g, '').length < 10) return 'Phone number must be at least 10 digits';
    return null;
  },

  // Amount validation
  amount: (amount, minAmount = 0, maxAmount = Infinity) => {
    if (!amount) return 'Amount is required';
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return 'Please enter a valid amount';
    if (numAmount < minAmount) return `Amount must be at least ${minAmount}`;
    if (numAmount > maxAmount) return `Amount must not exceed ${maxAmount}`;
    return null;
  },

  // Required field validation
  required: (value, fieldName) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  },

  // Date validation
  date: (date) => {
    if (!date) return 'Date is required';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return 'Please enter a valid date';
    return null;
  },

  // Age validation
  age: (dateOfBirth, minAge = 18) => {
    if (!dateOfBirth) return 'Date of birth is required';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < minAge) return `You must be at least ${minAge} years old`;
    return null;
  },

  // EC Number validation (for private sector employees)
  ecNumber: (ecNumber, employmentType) => {
    if (employmentType === 'Private Sector') {
      if (!ecNumber) return 'EC Number is required for private sector employees';
      if (ecNumber.length < 3) return 'EC Number must be at least 3 characters';
    }
    return null;
  },

  // Validate form data
  validateForm: (data, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const fieldRules = rules[field];
      const value = data[field];
      
      for (const rule of fieldRules) {
        const error = rule(value, data);
        if (error) {
          errors[field] = error;
          break; // Stop at first error for this field
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
