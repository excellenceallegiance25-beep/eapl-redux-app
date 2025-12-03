import { Box, Typography, useMediaQuery } from '@mui/material';

const TrustIndicators = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const indicators = [
    { value: '10+', label: 'Years Experience', color: '#FFD700' },
    { value: '500+', label: 'Projects', color: '#4CAF50' },
    { value: '200+', label: 'Clients', color: '#2196F3' },
    { value: '50+', label: 'Countries', color: '#9C27B0' },
  ];

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: { xs: 3, md: 4 },
      flexWrap: 'wrap',
      mt: { xs: 4, md: 0 }
    }}>
      {indicators.map((indicator, index) => (
        <Box key={index} sx={{ textAlign: 'center' }}>
          <Typography variant={isMobile ? "h4" : "h3"} sx={{ fontWeight: 'bold', color: indicator.color }}>
            {indicator.value}
          </Typography>
          <Typography variant={isMobile ? "caption" : "body2"} sx={{ opacity: 0.8 }}>
            {indicator.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TrustIndicators;