import React from 'react';
import { Box } from '@mui/material';
import DotsBackground from './DotsBackground';

const AppContainer = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <DotsBackground />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppContainer;