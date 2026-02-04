import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowBack } from '@mui/icons-material';
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
  Stepper,
  Step,
  StepLabel,
  Paper,
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
  VerifiedUser,
  TimerOutlined,
} from '@mui/icons-material';
import { newEmployeeRegistration, resendOTPnewEmployeeRegistration } from '../../services/AppConfigAction';
import { useNavigate } from 'react-router-dom';

const RegisterPopup = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Steps for registration process
  const steps = ['Registration Details', 'Email Verification', 'Complete'];
  const [activeStep, setActiveStep] = useState(0);

  // Form states
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

  const [verificationData, setVerificationData] = useState({
    otp: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [verificationErrors, setVerificationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // API responses
  const [apiResponse, setApiResponse] = useState({
    success: false,
    message: '',
    type: null
  });

  // OTP timer and storage
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOTP, setCanResendOTP] = useState(true);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [storedOTP, setStoredOTP] = useState(''); // Store OTP for verification
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;

  // Loading states
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Reset everything when dialog opens
  useEffect(() => {
    if (open) {
      setActiveStep(0);
      setErrors({});
      setVerificationErrors({});
      setApiResponse({
        success: false,
        message: '',
        type: null
      });
      setOtpTimer(0);
      setCanResendOTP(true);
      setStoredOTP('');
      setVerificationAttempts(0);
      setIsRegistering(false);
      setIsVerifying(false);
      setIsResendingOTP(false);
    }
  }, [open]);

  // OTP Timer Effect
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    } else if (otpTimer === 0 && storedOTP) {
      setCanResendOTP(true);
      // Clear stored OTP when timer expires
      setStoredOTP('');
    }
    return () => clearTimeout(timer);
  }, [otpTimer, storedOTP]);

  const startOTPTimer = () => {
    setOtpTimer(180); // 3 minutes
    setCanResendOTP(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Form validations
  const validateForm = () => {
    const newErrors = {};

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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  const validateOTP = () => {
    const newErrors = {};
    if (!verificationData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(verificationData.otp)) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiResponse.message) {
      setApiResponse({ success: false, message: '', type: null });
    }
  };

  const handleOTPChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setVerificationData(prev => ({
      ...prev,
      [name]: numericValue,
    }));

    if (verificationErrors[name]) {
      setVerificationErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Auto-verify when 6 digits are entered
    if (numericValue.length === 6 && storedOTP) {
      setTimeout(() => handleVerifyOTP(), 100);
    }
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();

    setApiResponse({ success: false, message: '', type: null });
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const registrationPayload = {
      employeeId: 0,
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      company: formData.company,
      phone: formData.phone.replace(/\D/g, ''),
      currentPassword: formData.password,
      newPassword: formData.password
    };

    setIsRegistering(true);
    setApiResponse({ success: false, message: '', type: null });

    try {
      const result = await dispatch(newEmployeeRegistration(registrationPayload));

      if (result.payload) {
        if (result.payload.success === true) {
          // Store OTP from the response
          let receivedOTP = '';

          // Check different possible response structures for OTP
          if (result.payload.dataList && result.payload.dataList[0]) {
            receivedOTP = result.payload.dataList[0];
          }

          if (receivedOTP) {
            setStoredOTP(receivedOTP);
          } else {
            // Fallback: generate a demo OTP for testing
            const demoOTP = Math.floor(100000 + Math.random() * 900000).toString();
            setStoredOTP(demoOTP);
          }

          setVerificationData(prev => ({
            ...prev,
            email: formData.email
          }));

          setApiResponse({
            success: true,
            message: result.payload.message || 'Registration successful! Please check your email for OTP.',
            type: 'OTP_SENT'
          });

          // Move to verification step
          setActiveStep(1);
          startOTPTimer();

          // Auto-paste OTP for better UX (optional)
          if (storedOTP) {
            setTimeout(() => {
              setVerificationData(prev => ({
                ...prev,
                otp: storedOTP
              }));
            }, 500);
          }
        } else {
          setApiResponse({
            success: false,
            message: result.payload.message || 'Registration failed. Please try again.',
            type: null
          });
        }
      } else if (result.error) {
        setApiResponse({
          success: false,
          message: result.error.message || 'Registration failed. Please try again.',
          type: null
        });
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: error.message || 'An unexpected error occurred.',
        type: null
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleVerifyOTP = () => {
    // Validate OTP format
    const validationErrors = validateOTP();
    if (Object.keys(validationErrors).length > 0) {
      setVerificationErrors(validationErrors);
      return;
    }

    // Check if verification attempts exceeded
    if (verificationAttempts >= MAX_ATTEMPTS) {
      setApiResponse({
        success: false,
        message: `Maximum verification attempts (${MAX_ATTEMPTS}) exceeded. Please resend OTP.`,
        type: null
      });
      setVerificationErrors({ otp: 'Maximum attempts exceeded' });
      return;
    }

    // Check if OTP has expired
    if (otpTimer <= 0 && storedOTP) {
      setApiResponse({
        success: false,
        message: 'OTP has expired. Please resend a new code.',
        type: null
      });
      setVerificationErrors({ otp: 'OTP expired' });
      setStoredOTP('');
      setCanResendOTP(true);
      return;
    }

    // Verify OTP
    if (!storedOTP) {
      setApiResponse({
        success: false,
        message: 'No OTP found. Please resend OTP.',
        type: null
      });
      setVerificationErrors({ otp: 'OTP not found' });
      return;
    }

    // Increment attempt counter
    setVerificationAttempts(prev => prev + 1);
    setIsVerifying(true);

    if (verificationData.otp === storedOTP) {
      // OTP is correct
      setApiResponse({
        success: true,
        message: 'Email verified successfully! Your account is now active.',
        type: 'VERIFIED'
      });

      // Clear OTP data
      setStoredOTP('');
      setOtpTimer(0);

      // Move to success step
      setActiveStep(2);

      // Auto close after success
      setTimeout(() => {
        handleClose();
        navigate('/login');
      }, 3000);
    } else {
      // OTP is incorrect
      const remainingAttempts = MAX_ATTEMPTS - verificationAttempts;
      setVerificationErrors({ otp: 'Invalid OTP' });

      // Clear OTP input
      setVerificationData(prev => ({ ...prev, otp: '' }));

      // If no attempts left, disable verification
      if (remainingAttempts <= 0) {
        setTimeout(() => {
          setApiResponse({
            success: false,
            message: 'Too many failed attempts. Please resend OTP to try again.',
            type: null
          });
        }, 1000);
      }
    }

    setIsVerifying(false);
  };

  const handleResendOTP = async () => {
    if (!canResendOTP) return;

    setIsResendingOTP(true);
    setApiResponse({ success: false, message: '', type: null });
    setVerificationErrors({});
    setVerificationData(prev => ({ ...prev, otp: '' }));
    setVerificationAttempts(0);

    try {
      // Call the resend OTP API
      const result = await dispatch(resendOTPnewEmployeeRegistration({
        firstname: formData.firstName,
        email: verificationData.email || formData.email
      }));

      if (result.payload) {
        if (result.payload.success === true) {
          // Get new OTP from response
          let newOTP = '';

          // Check different possible response structures for OTP
          if (result.payload.dataList && result.payload.dataList[0]) {
            newOTP = result.payload.dataList[0];
          }

          if (newOTP) {
            setStoredOTP(newOTP);
          } else {
            // Fallback: generate a demo OTP
            const demoOTP = Math.floor(100000 + Math.random() * 900000).toString();
            setStoredOTP(demoOTP);
            newOTP = demoOTP;
          }

          setApiResponse({
            success: true,
            message: result.payload.message || 'New OTP has been sent to your email.',
            type: 'OTP_RESENT'
          });

          startOTPTimer();
        } else {
          setApiResponse({
            success: false,
            message: result.payload.message || 'Failed to resend OTP. Please try again.',
            type: null
          });
        }
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: error.message || 'Failed to resend OTP.',
        type: null
      });
    } finally {
      setIsResendingOTP(false);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
    setApiResponse({ success: false, message: '', type: null });
    setVerificationErrors({});
    setVerificationData({ otp: '', email: '' });
    setVerificationAttempts(0);
    setIsVerifying(false);
  };

  const handleClose = () => {
    setActiveStep(0);
    setErrors({});
    setVerificationErrors({});
    setApiResponse({
      success: false,
      message: '',
      type: null
    });
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
    setVerificationData({ otp: '', email: '' });
    setOtpTimer(0);
    setCanResendOTP(true);
    setStoredOTP('');
    setVerificationAttempts(0);
    setIsRegistering(false);
    setIsVerifying(false);
    setIsResendingOTP(false);
    onClose();
  };

  // Step content renderers
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderRegistrationForm();
      case 1:
        return renderVerificationForm();
      case 2:
        return renderSuccessScreen();
      default:
        return null;
    }
  };

  const renderRegistrationForm = () => (
    <>
      {apiResponse.message && !apiResponse.success && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiResponse.message}
        </Alert>
      )}

      <form onSubmit={handleSubmitRegistration}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Pramod"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
              disabled={isRegistering || loading}
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
              placeholder="Kumar"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
              disabled={isRegistering || loading}
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
              placeholder="eapl@gmail.com"
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              disabled={isRegistering || loading}
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
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                handleChange({ target: { name: 'phone', value: e.target.value } });
              }}
              error={!!errors.phone}
              helperText={errors.phone}
              disabled={isRegistering || loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone fontSize="small" />
                  </InputAdornment>
                ),
              }}
              placeholder="00 000 000 00"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              placeholder="E A PVT LTD"
              name="company"
              value={formData.company}
              onChange={handleChange}
              error={!!errors.company}
              helperText={errors.company}
              required
              disabled={isRegistering || loading}
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
                placeholder="Abcd@2025"
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password *"
                required
                disabled={isRegistering || loading}
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
                      disabled={isRegistering || loading}
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
                disabled={isRegistering || loading}
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
                      disabled={isRegistering || loading}
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
                disabled={isRegistering || loading}
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
            disabled={isRegistering || loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isRegistering || loading}
            startIcon={isRegistering ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ minWidth: 120 }}
          >
            {isRegistering ? 'Registering...' : 'Register & Verify'}
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
              navigate('/login');
            }}
            disabled={isRegistering || loading}
          >
            Sign In
          </Button>
        </Typography>
      </Box>
    </>
  );

  const renderVerificationForm = () => (
    <>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'info.light' }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Email sx={{ mr: 1, color: 'info.main' }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Verification Email Sent
          </Typography>
        </Box>
        <Typography variant="body2">
          We've sent a 6-digit OTP to <strong>{verificationData.email}</strong>.
          Please check your inbox (and spam folder).
        </Typography>
      </Paper>

      {apiResponse.message && (
        <Alert
          severity={apiResponse.success ? 'success' : 'error'}
          sx={{ mb: 2 }}
          onClose={() => setApiResponse({ success: false, message: '', type: null })}
        >
          {apiResponse.message}
        </Alert>
      )}

      <Box textAlign="center" mb={3}>
        <VerifiedUser sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Verify Your Email
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Enter the 6-digit verification code sent to your email address
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Verification Code (OTP)"
            name="otp"
            value={verificationData.otp}
            onChange={handleOTPChange}
            error={!!verificationErrors.otp}
            helperText={verificationErrors.otp || `Attempts remaining: ${MAX_ATTEMPTS - verificationAttempts}`}
            placeholder="Enter 6-digit code"
            disabled={verificationAttempts >= MAX_ATTEMPTS || isVerifying || isResendingOTP}
            InputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              startAdornment: (
                <InputAdornment position="start">
                  <VerifiedUser fontSize="small" />
                </InputAdornment>
              ),
              sx: {
                fontSize: '24px',
                textAlign: 'center',
                letterSpacing: '8px',
                fontFamily: 'monospace',
              }
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <TimerOutlined sx={{ mr: 1, color: otpTimer > 0 ? 'warning.main' : 'text.secondary' }} />
              <Typography variant="body2" color={otpTimer > 0 ? 'warning.main' : 'text.secondary'}>
                {otpTimer > 0 ? `Code expires in ${formatTime(otpTimer)}` : 'Code expired'}
              </Typography>
            </Box>
            <Button
              variant="text"
              size="small"
              onClick={handleResendOTP}
              disabled={(!canResendOTP && otpTimer > 0) || isResendingOTP || isVerifying}
              startIcon={isResendingOTP ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {isResendingOTP ? 'Sending...' : 'Resend OTP'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <DialogActions sx={{ px: 0, pt: 3 }}>
        <Button
          onClick={handleBack}
          variant="outlined"
          startIcon={<ArrowBack />}
          disabled={isVerifying || isResendingOTP}
        >
          Back to Registration
        </Button>
        <Button
          onClick={handleVerifyOTP}
          variant="contained"
          color="primary"
          disabled={isVerifying || verificationData.otp.length !== 6 || verificationAttempts >= MAX_ATTEMPTS || isResendingOTP}
          startIcon={isVerifying ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{ minWidth: 120 }}
        >
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </Button>
      </DialogActions>
    </>
  );

  const renderSuccessScreen = () => (
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
        Account Verified Successfully!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {apiResponse.message || 'Your email has been successfully verified! Please contact your manager to activate your account.'}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        You will be redirected to login page in a few seconds...
      </Typography>
      <DialogActions sx={{ justifyContent: 'center', pt: 3 }}>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            navigate('/login');
          }}
        >
          Go to Login
        </Button>
      </DialogActions>
    </Box>
  );

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
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {activeStep === 0 ? 'Create Account' :
                activeStep === 1 ? 'Verify Email' :
                  'Registration Complete'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activeStep === 0 ? 'Join Excellence Allegiance Pvt Ltd' :
                activeStep === 1 ? 'Enter verification code' :
                  'Account successfully created'}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            disabled={isRegistering || isVerifying || isResendingOTP}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {activeStep < 2 && (
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {renderStepContent(activeStep)}
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPopup;