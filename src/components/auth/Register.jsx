import React, { useState } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { AppRegistration } from '@mui/icons-material';
import RegisterPopup from './RegisterPopup';

const Register = () => {
  const [popupOpen, setPopupOpen] = useState(false);

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
            p: 6,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'primary.light',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
            }}
          >
            <AppRegistration sx={{ fontSize: 40 }} />
          </Box>

          <Typography variant="h4" gutterBottom fontWeight="bold">
            Join Our Tech Community
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Create an account to access exclusive features, track your projects, and 
            connect with our tech experts at Excellence Allegiance.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Why Register?
            </Typography>
            <Box textAlign="left" sx={{ maxWidth: 400, mx: 'auto' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                ✓ Access to premium tech resources
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                ✓ Project management dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                ✓ Priority technical support
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                ✓ Exclusive webinars and training
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✓ Community forum access
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => setPopupOpen(true)}
            sx={{ minWidth: 200, mb: 3 }}
          >
            Create Free Account
          </Button>

          <Typography variant="caption" display="block" color="text.secondary">
            By registering, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Paper>
      </Box>

      {/* Registration Popup */}
      <RegisterPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </Container>
  );
};

export default Register;