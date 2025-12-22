import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { userLogin } from '../../services/AppConfigAction';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      dispatch(loginFailure('Please fill in all fields'));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch(loginFailure('Please enter a valid email address'));
      return;
    }

    try {
      // Start loading
      dispatch(loginStart());

      // Dispatch login action
      const result = await dispatch(userLogin(formData));

      // Check the action type in the result
      if (result.type === "EMP_COMPLETE_LOGIN_SUCCESS") {

        // Validate the payload structure
        if (!result.payload) {
          dispatch(loginFailure('Invalid server response'));
          return;
        }

        // Check if dataList exists and is not empty
        if (!result.payload.dataList || !Array.isArray(result.payload.dataList)) {
          dispatch(loginFailure('No user data received from server'));
          return;
        }

        if (result.payload.dataList.length === 0) {
          dispatch(loginFailure('Access denied. Your account is either inactive or does not exist. Please contact your manager.'));
          return;
        }

        // Get user data from the payload - safely
        const userData = result.payload.dataList[0];

        // Validate user data has required fields
        if (!userData || !userData.id) {
          dispatch(loginFailure('Invalid user data received'));
          return;
        }

        // Ensure user has minimum required data
        const completeUserData = {
          id: userData.id,
          name: userData.name || '',
          email: userData.email || formData.email,
          role: userData.role || 'user',
          // Add other fields with defaults if missing
          phone: userData.phone || '',
          title: userData.title || '',
          status: userData.status !== undefined ? userData.status : true,
          role_type: userData.role_type || '',
          profile_picture: userData.profile_picture || null,
          profile_picture_type: userData.profile_picture_type || null,
          department: userData.department || '',
          position: userData.position || ''
        };

        // Store in sessionStorage
        sessionStorage.setItem('authToken', result.payload.token || 'dummy-token');
        sessionStorage.setItem('userData', JSON.stringify(completeUserData));

        // Update Redux state
        dispatch(loginSuccess({
          user: completeUserData,
          token: result.payload.token || 'dummy-token'
        }));

        // Navigate to profile
        navigate(`/profile/${completeUserData.id}`);

      } else if (result.type === "EMP_FAILURE_LOGIN") {
        // Show error from payload
        const errorMessage = result.payload || 'Login failed';
        dispatch(loginFailure(errorMessage));
      } else {
        // Handle unexpected response types
        console.error('Unexpected response type:', result.type);
        dispatch(loginFailure('Unexpected server response'));
      }

    } catch (error) {
      console.error("Login error:", error);

      // More specific error messages
      if (error.message && error.message.includes('Network Error')) {
        dispatch(loginFailure('Network error. Please check your connection.'));
      } else if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        if (status === 401) {
          dispatch(loginFailure('Invalid email or password'));
        } else if (status === 403) {
          dispatch(loginFailure('Account disabled or access denied'));
        } else if (status === 404) {
          dispatch(loginFailure('Service not found'));
        } else if (status >= 500) {
          dispatch(loginFailure('Server error. Please try again later.'));
        } else {
          dispatch(loginFailure(`Error ${status}: ${error.response.data?.message || 'Unknown error'}`));
        }
      } else {
        dispatch(loginFailure('An unexpected error occurred.'));
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
          }}
        >
          <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
            Excellence Allegiance Pvt Ltd
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="current-password"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  fontWeight="bold"
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;