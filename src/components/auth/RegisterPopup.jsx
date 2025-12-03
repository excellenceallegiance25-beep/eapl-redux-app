import React, { useState } from 'react';
import { CheckCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import {
  Close,
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Phone,
  Business,
} from '@mui/icons-material';
import { registerStart, registerSuccess, registerFailure, clearError } from '../../redux/slices/authSlice';

const RegisterPopup = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but validate if provided)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }

    // Clear Redux error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(registerStart());

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // For demo, we'll simulate random success/failure
          const isSuccess = Math.random() > 0.3; // 70% success rate for demo
          
          if (isSuccess) {
            resolve();
          } else {
            reject(new Error('Registration failed. Please try again.'));
          }
        }, 1500);
      });

      // Registration successful
      const mockUser = {
        id: Math.floor(Math.random() * 1000),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      const mockToken = `mock-jwt-token-${Date.now()}`;

      dispatch(registerSuccess({
        user: mockUser,
        token: mockToken,
      }));

      setRegistrationSuccess(true);
      
      // Reset form after successful registration
      setTimeout(() => {
        onClose();
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false,
        });
        setRegistrationSuccess(false);
      }, 2000);

    } catch (err) {
      dispatch(registerFailure(err.message || 'Registration failed. Please try again.'));
    }
  };

  const handleClose = () => {
    // Clear any errors when closing
    dispatch(clearError());
    setErrors({});
    setRegistrationSuccess(false);
    onClose();
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return value;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">
            Create Account
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Join Excellence Allegiance Pvt Ltd
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {registrationSuccess ? (
          <Box textAlign="center" py={4}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h5" gutterBottom fontWeight="bold" color="success.main">
              Registration Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to Excellence Allegiance Pvt Ltd. Your account has been created successfully.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Redirecting to dashboard...
            </Typography>
          </Box>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      handleChange({ target: { name: 'phone', value: formatted } });
                    }}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="(123) 456-7890"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    error={!!errors.company}
                    helperText={errors.company}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={!!errors.password}>
                    <InputLabel>Password *</InputLabel>
                    <OutlinedInput
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      label="Password *"
                      required
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock fontSize="small" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {errors.password || 'Min 8 chars with uppercase, lowercase & numbers'}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={!!errors.confirmPassword}>
                    <InputLabel>Confirm Password *</InputLabel>
                    <OutlinedInput
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      label="Confirm Password *"
                      required
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock fontSize="small" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.confirmPassword && (
                      <FormHelperText error>{errors.confirmPassword}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" alignItems="flex-start" sx={{ mt: 1 }}>
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      style={{ marginTop: '4px', marginRight: '8px' }}
                      required
                    />
                    <label htmlFor="acceptTerms" style={{ fontSize: '0.875rem' }}>
                      I agree to the{' '}
                      <a href="/terms" style={{ color: '#1976d2' }}>
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" style={{ color: '#1976d2' }}>
                        Privacy Policy
                      </a>
                    </label>
                  </Box>
                  {errors.acceptTerms && (
                    <Typography color="error" variant="caption">
                      {errors.acceptTerms}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <DialogActions sx={{ px: 0, pt: 3 }}>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </DialogActions>
            </form>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    handleClose();
                    // You can add logic to open login modal here
                  }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPopup;