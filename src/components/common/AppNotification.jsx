import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/slices/authSlice';
import { clearUserError } from '../../redux/slices/userSlice';

const AppNotification = () => {
  const dispatch = useDispatch();
  const { error: authError } = useSelector((state) => state.auth);
  const { error: userError } = useSelector((state) => state.user);

  const error = authError || userError;
  const open = !!error;

  const handleClose = () => {
    if (authError) dispatch(clearError());
    if (userError) dispatch(clearUserError());
  };

  if (!error) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        severity="error" 
        onClose={handleClose}
        variant="filled"
        sx={{ width: '100%' }}
      >
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default AppNotification;