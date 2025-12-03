import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CTASection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 12 },
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.dark} 0%, 
          ${theme.palette.primary.main} 100%
        )`,
        color: 'white',
      }}
    >
      <Container maxWidth="xl">
        <Box textAlign="center" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
          >
            Ready to Transform Your Business?
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h5"}
            sx={{
              mb: 5,
              opacity: 0.9,
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
            }}
          >
            Join thousands of successful companies already working with us
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            <Button
              variant="contained"
              color="secondary"
              size={isMobile ? "medium" : "large"}
              endIcon={<ArrowForward />}
              onClick={handleGetStarted}
              sx={{
                py: { xs: 1.5, md: 2 },
                px: { xs: 3, md: 4 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 'bold'
              }}
            >
              Get Started Today
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size={isMobile ? "medium" : "large"}
              sx={{
                py: { xs: 1.5, md: 2 },
                px: { xs: 3, md: 4 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                borderWidth: 2
              }}
            >
              Schedule a Demo
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;