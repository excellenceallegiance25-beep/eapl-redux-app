import {
  ArrowForward,
  PlayCircle,
  KeyboardArrowDown,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Fade,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrustIndicators from './TrustIndicators';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.dark} 0%, 
          ${theme.palette.primary.main} 50%, 
          ${theme.palette.secondary.main} 100%
        )`,
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(${alpha('#fff', 0.2)} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box sx={{
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            zIndex: 1,
            px: { xs: 2, sm: 3, md: 0 }
          }}>
            <Typography
              variant={isMobile ? "h3" : isTablet ? "h2" : "h1"}
              sx={{
                fontWeight: 900,
                mb: 3,
                fontSize: {
                  xs: '2rem',
                  sm: '2.8rem',
                  md: '3.5rem',
                  lg: '4.5rem'
                },
                lineHeight: 1.2,
              }}
            >
              Excellence Allegiance{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(45deg, #FFD700, #FF8C00)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  display: isMobile ? 'block' : 'inline'
                }}
              >
                Private Limited
              </Box>
            </Typography>

            <Typography
              variant={isMobile ? "body1" : "h5"}
              sx={{
                mb: 5,
                opacity: 0.9,
                maxWidth: 800,
                mx: 'auto',
                fontSize: {
                  xs: '1rem',
                  sm: '1.2rem',
                  md: '1.5rem'
                },
                lineHeight: 1.6,
              }}
            >
              We deliver innovative technology solutions that drive growth, enhance efficiency,
              and create sustainable competitive advantages for businesses worldwide.
            </Typography>

            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={3}
              justifyContent="center"
              sx={{ mb: { xs: 6, md: 8 } }}
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
                  fontWeight: 'bold',
                  borderRadius: 2,
                  minWidth: { xs: '100%', sm: 200 },
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size={isMobile ? "medium" : "large"}
                startIcon={<PlayCircle />}
                sx={{
                  py: { xs: 1.5, md: 2 },
                  px: { xs: 3, md: 4 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 },
                  minWidth: { xs: '100%', sm: 200 },
                }}
              >
                Watch Demo
              </Button>
            </Stack>

            {/* <TrustIndicators /> */}
          </Box>
        </Fade>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 20, md: 40 },
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            cursor: 'pointer',
            display: isMobile ? 'none' : 'block',
          }}
          onClick={scrollToNext}
        >
          <Typography variant="body2" sx={{ color: 'white', mb: 1, opacity: 0.8 }}>
            Explore Services
          </Typography>
          <KeyboardArrowDown
            sx={{
              color: 'white',
              animation: 'bounce 2s infinite',
              fontSize: 40,
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;