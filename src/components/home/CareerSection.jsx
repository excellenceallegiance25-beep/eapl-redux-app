import {
  ArrowForward,
  ArrowRightAlt,
  CheckCircle,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getJobOpeningsList } from '../../services/AppConfigAction';

const benefits = [
  'Competitive salary & equity packages',
  'Flexible remote work options',
  'Continuous learning & development',
  'Health & wellness benefits',
  'Cutting-edge technology stack',
  'Global team collaboration',
];

const openingss = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Remote',
  },
  {
    title: 'DevOps Engineer',
    department: 'Operations',
    location: 'Bangalore',
    type: 'Hybrid',
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'San Francisco',
    type: 'On-site',
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Remote',
  },
];

const CareerSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // Move the function definition inside useEffect
    const loadConfigs = async () => {
      const result = await dispatch(getJobOpeningsList());
      console.log('Configurations loaded successfully', 'success');
      if (result.type === "JOB_OPENING_LIST") {
        setOpenings(result.payload);
      }
    };

    loadConfigs();
  }, [dispatch]); // Only dispatch is needed as dependency



  return (
    <Box sx={{ py: { xs: 6, sm: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{
          transition: 'all 0.5s ease-in-out',
          justifyContent: 'center', // Center align cards
        }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ px: { xs: 2, sm: 3, md: 0 } }}>
              <Chip
                label="Careers"
                color="primary"
                sx={{
                  mb: 3,
                  fontWeight: 'bold',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  py: 1,
                  px: 2,
                }}
              />
              <Typography
                variant={isMobile ? "h3" : "h2"}
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
              >
                Join Our Amazing Team
              </Typography>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                color="text.secondary"
                paragraph
                sx={{
                  mb: 3,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                }}
              >
                Work with the best minds in technology and make an impact
              </Typography>

              <Stack spacing={2} sx={{ mb: 4 }}>
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle sx={{ color: 'primary.main', fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
                    <Typography variant={isMobile ? "body2" : "body1"}>{benefit}</Typography>
                  </Box>
                ))}
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size={isMobile ? "medium" : "large"}
                  endIcon={<ArrowForward />}
                  component={RouterLink}
                  to="/careers"
                  sx={{
                    py: { xs: 1.25, md: 1.5 },
                    px: { xs: 3, md: 4 },
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  View Open Positions
                </Button>
                <Button
                  variant="outlined"
                  size={isMobile ? "medium" : "large"}
                  component={RouterLink}
                  to="/contact"
                  sx={{
                    py: { xs: 1.25, md: 1.5 },
                    px: { xs: 3, md: 4 },
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  Contact HR
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: { xs: 2, md: 4 },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                gutterBottom
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' } }}
              >
                Current Openings
              </Typography>
              <Stack spacing={2} sx={{ mt: 3 }}>
                {openings.map((opening, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: { xs: 1.5, md: 2 },
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                      },
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1,
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Typography
                        variant={isMobile ? "subtitle1" : "h6"}
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                      >
                        {opening.title}
                      </Typography>
                      <Chip
                        label={opening.type}
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          bgcolor: opening.type === 'Remote' ? '#4CAF50' :
                            opening.type === 'Hybrid' ? '#FF9800' : '#2196F3',
                          color: 'white',
                          fontSize: { xs: '0.7rem', md: '0.875rem' }
                        }}
                      />
                    </Box>
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      color="text.secondary"
                      sx={{ mb: 2, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                      {opening.department} • {opening.location}
                    </Typography>
                    <Button
                      variant="text"
                      size={isMobile ? "small" : "medium"}
                      endIcon={<ArrowRightAlt />}
                      sx={{
                        color: 'primary.main',
                        fontSize: { xs: '0.8rem', md: '0.875rem' }
                      }}
                    >
                      Apply Now
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CareerSection;