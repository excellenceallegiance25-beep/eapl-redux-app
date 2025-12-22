import {
  Analytics,
  Api,
  ArrowForward,
  CheckCircle,
  Cloud,
  Code,
  ExpandMore,
  Rocket,
  Security,
  Settings,
  Smartphone,
  Storage,
  SupportAgent,
  ViewList
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { useDispatch } from 'react-redux';
import { getApplicationServicesList } from '../services/AppConfigAction';

import chart_bg from '../assets/images/chart.jpg';
import codescreen_bg from '../assets/images/codescreen.jpg';
import computing_bg from '../assets/images/computing.jpg';
import earthconnection_bg from '../assets/images/earthconnection.jpg';
import meeting_bg from '../assets/images/meeting.jpg';
import mobileappscreen_bg from '../assets/images/mobileappscreen.jpg';
import motherboard_bg from '../assets/images/motherboard.avif';
import review_bg from '../assets/images/review.jpg';
import robotdoing_bg from '../assets/images/robotdoing.jpg';
import serverconnection_bg from '../assets/images/serverconnection.jpg';
import workinghuman_bg from '../assets/images/workinghuman.jpg';
import workingonlaptop_bg from '../assets/images/workingonlaptop.jpg';

const Services = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // Move the function definition inside useEffect
    const loadConfigs = async () => {
      const result = await dispatch(getApplicationServicesList());
      console.log('Configurations loaded successfully', 'success');
      if (result.type === "APPCONFIG_INIT") {
        setServices(result.payload);
      }
    };

    loadConfigs();
  }, [dispatch]); // Only dispatch is needed as dependency

  // Header image
  const headerImage = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80';

  // ==================== SYMMETRICAL CARD CONFIGURATION ====================
  const SYMMETRICAL_CARD_CONFIG = {
    fixedDimensions: {
      width: 345,
      height: 350,
    },
    cardsPerRow: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 4,
    },
    initialRows: {
      xs: 2,
      sm: 2,
      md: 2,
      lg: 2,
      xl: 2,
    },
    spacing: {
      xs: 3,
      sm: 3,
      md: 4,
      lg: 4,
      xl: 4,
    },
    padding: 2.5,
    iconSize: 50,
    iconFontSize: 32,
    titleFontSize: '1.25rem',
    titleHeight: 56,
    descriptionFontSize: '0.875rem',
    descriptionHeight: 66,
    descriptionLines: 3,
    featuresHeight: 32,
    chipFontSize: '0.75rem',
    chipHeight: 24,
    buttonFontSize: '0.875rem',
    buttonPaddingY: 0.8,
  };

  const serviceCategories = [
    { name: 'All', icon: <ViewList />, color: '#2196F3' },
    { name: 'Cloud', icon: <Cloud />, color: '#2196F3' },
    { name: 'Development', icon: <Code />, color: '#673AB7' },
    { name: 'Security', icon: <Security />, color: '#F44336' },
    { name: 'Mobile', icon: <Smartphone />, color: '#FF9800' },
    { name: 'Analytics', icon: <Analytics />, color: '#4CAF50' },
    { name: 'Transformation', icon: <Rocket />, color: '#9C27B0' },
  ];

  // Service-specific background images
  const getServiceBackground = (serviceTitle) => {
    const backgrounds = {
      'Cloud Solutions': workinghuman_bg,
      'Software Development': codescreen_bg,
      'Cybersecurity': motherboard_bg,
      'AI & Analytics': robotdoing_bg,
      'Mobile Development': mobileappscreen_bg,
      'Digital Transformation': workingonlaptop_bg,
      'IoT Solutions': earthconnection_bg,
      'Blockchain Services': computing_bg,
      'DevOps & CI/CD': serverconnection_bg,
      'Quality Assurance': review_bg,
      'UI/UX Design': chart_bg,
      'Consulting Services': meeting_bg,
    };
    return backgrounds[serviceTitle] || 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url("https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=345&q=80")';
  };

  const servicePackages = [
    {
      name: 'Starter',
      price: '$2,999',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      features: ['Up to 5 Users', 'Basic Support', '10GB Storage', 'Standard Security', 'Monthly Reports'],
      recommended: false,
      color: '#4CAF50',
    },
    {
      name: 'Professional',
      price: '$5,999',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: ['Up to 20 Users', 'Priority Support', '100GB Storage', 'Advanced Security', 'API Access', 'Weekly Reports'],
      recommended: true,
      color: '#2196F3',
    },
    {
      name: 'Enterprise',
      price: '$12,999',
      period: '/month',
      description: 'Complete solution for large organizations',
      features: ['Unlimited Users', '24/7 Support', '1TB Storage', 'Enterprise Security', 'Custom Solutions', 'Dedicated Manager'],
      recommended: false,
      color: '#9C27B0',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Discovery',
      description: 'Understand your requirements and business goals',
      icon: <SupportAgent />,
      color: '#2196F3'
    },
    {
      step: '2',
      title: 'Planning',
      description: 'Create detailed project roadmap and architecture',
      icon: <Analytics />,
      color: '#673AB7'
    },
    {
      step: '3',
      title: 'Development',
      description: 'Build, test, and iterate on the solution',
      icon: <Code />,
      color: '#4CAF50'
    },
    {
      step: '4',
      title: 'Deployment',
      description: 'Launch and monitor the implementation',
      icon: <Cloud />,
      color: '#FF9800'
    },
    {
      step: '5',
      title: 'Support',
      description: 'Ongoing maintenance and optimization',
      icon: <CheckCircle />,
      color: '#9C27B0'
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setViewAll(newValue === 0);
  };

  const filteredServices = viewAll || tabValue === 0
    ? services
    : services.filter(service => service.category === serviceCategories[tabValue].name);

  return (
    <Box>
      {/* Enhanced Header with Background Image */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 400, md: 500 },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Animated background overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(156, 39, 176, 0.1))',
            animation: 'gradientShift 8s ease infinite',
            '@keyframes gradientShift': {
              '0%, 100%': { opacity: 0.1 },
              '50%': { opacity: 0.2 },
            }
          }}
        />

        {/* Floating elements */}
        <Box
          sx={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            top: '20%',
            left: '10%',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            bottom: '20%',
            right: '10%',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />

        <Container maxWidth="xl">
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 800,
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 1s ease-out',
                '@keyframes fadeInUp': {
                  '0%': { opacity: 0, transform: 'translateY(30px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' },
                }
              }}
            >
              Transform Your Business
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.75rem' },
                mb: 4,
                fontWeight: 300,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                maxWidth: 800,
                mx: 'auto',
                animation: 'fadeInUp 1s ease-out 0.3s both',
              }}
            >
              Comprehensive technology solutions tailored for modern businesses
            </Typography>

            {/* <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  animation: 'fadeInUp 1s ease-out 0.6s both',
                }}
              >
                Get Started
              </Button>
            </Box> */}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Service Tabs Section */}
        <Box sx={{ mb: 8 }}>
          {/* <Typography variant="h2" align="center" gutterBottom fontWeight="bold">
            Our Services
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Explore our comprehensive range of technology services designed to drive your business forward
          </Typography> */}

          <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  minHeight: 70,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&.Mui-selected': {
                    color: serviceCategories[tabValue]?.color || 'primary.main',
                  },
                },
              }}
            >
              {serviceCategories.map((category, index) => (
                <Tab
                  key={index}
                  icon={category.icon}
                  label={category.name}
                  sx={{
                    transition: 'all 0.3s',
                    '&:hover': {
                      color: category.color,
                      bgcolor: alpha(category.color, 0.05),
                    },
                  }}
                />
              ))}
            </Tabs>

            <Box sx={{ p: 3 }}>
              {tabValue > 0 && !viewAll && (
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: alpha(serviceCategories[tabValue].color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    {serviceCategories[tabValue].icon}
                  </Box>
                  <Typography variant="h3" gutterBottom fontWeight="bold">
                    {serviceCategories[tabValue].name} Services
                  </Typography>
                  <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
                    Transform your business with our specialized {serviceCategories[tabValue].name.toLowerCase()} solutions
                  </Typography>
                </Box>
              )}

              {/* Services Grid */}
              <Grid container spacing={4} justifyContent="center">
                {filteredServices.map((service, index) => (
                  <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={3}
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <Card
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      sx={{
                        width: SYMMETRICAL_CARD_CONFIG.fixedDimensions.width,
                        height: SYMMETRICAL_CARD_CONFIG.fixedDimensions.height,
                        position: 'relative',
                        overflow: 'hidden',
                        border: 'none',
                        borderRadius: 3,
                        backgroundImage: `
                                            linear-gradient(
                                                to bottom,
                                                rgba(0, 0, 0, 0.85) 0%,
                                                rgba(0, 0, 0, 0.7) 30%,
                                                rgba(0, 0, 0, 0.4) 70%,
                                                rgba(0, 0, 0, 0.2) 100%
                                            ),
                                            url(${getServiceBackground(service.title)})
                                        `,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-12px) scale(1.02)',
                          boxShadow: `0 20px 40px ${alpha(service.color, 0.3)}`,
                          '& .service-overlay': {
                            opacity: 1,
                          },
                          '& .service-stats': {
                            transform: 'translateY(0)',
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      {/* Overlay */}
                      <Box
                        className="service-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(to bottom, ${alpha(service.color, 0.2)}, ${alpha(service.color, 0.8)})`,
                          opacity: hoveredCard === index ? 1 : 0.7,
                          transition: 'opacity 0.3s ease',
                        }}
                      />

                      <CardContent sx={{
                        position: 'relative',
                        zIndex: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                      }}>
                        {/* Icon */}
                        <Box
                          sx={{
                            width: SYMMETRICAL_CARD_CONFIG.iconSize,
                            height: SYMMETRICAL_CARD_CONFIG.iconSize,
                            fontSize: SYMMETRICAL_CARD_CONFIG.iconFontSize,
                            borderRadius: 2,
                            bgcolor: alpha('#fff', 0.2),
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            transition: 'all 0.3s',
                            transform: hoveredCard === index ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                          }}
                        >
                          {service.icon}
                        </Box>

                        {/* Title and Category */}
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {service.title}
                          </Typography>
                          <Chip
                            label={service.category}
                            size="small"
                            sx={{
                              bgcolor: alpha('#fff', 0.2),
                              color: 'white',
                              backdropFilter: 'blur(10px)',
                              fontWeight: 500,
                            }}
                          />
                        </Box>

                        {/* Description */}
                        <Typography variant="body2" sx={{
                          flex: 1,
                          opacity: 0.9,
                          lineHeight: 1.6,
                          mb: 2,
                        }}>
                          {service.description}
                        </Typography>

                        {/* Features */}
                        <Box sx={{ mb: 2 }}>
                          {service.features.split(',').map((feature, idx) => (
                            <Chip
                              key={idx}
                              label={feature}
                              size="small"
                              sx={{
                                mr: 0.5,
                                mb: 0.5,
                                bgcolor: alpha('#fff', 0.1),
                                color: 'white',
                                border: '1px solid',
                                borderColor: alpha('#fff', 0.2),
                                fontSize: '0.7rem',
                              }}
                            />
                          ))}
                        </Box>

                        {/* Button */}
                        <Button
                          fullWidth
                          component={RouterLink}
                          to={`/services/${service.id}`}
                          variant="outlined"
                          size="small"
                          endIcon={<ArrowForward />}
                          sx={{
                            borderColor: alpha('#fff', 0.3),
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                              borderColor: 'white',
                              bgcolor: alpha('#fff', 0.1),
                            },
                          }}
                        >
                          See More
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Box>

        {/* Service Packages Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" align="center" gutterBottom fontWeight="bold">
            Choose Your Plan
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Flexible pricing designed to scale with your business
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {servicePackages.map((pkg, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    border: pkg.recommended ? `2px solid ${pkg.color}` : 'none',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 15px 30px ${alpha(pkg.color, 0.2)}`,
                    }
                  }}
                >
                  {pkg.recommended && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        bgcolor: pkg.color,
                      }}
                    />
                  )}

                  {pkg.recommended && (
                    <Chip
                      label="Most Popular"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: pkg.color,
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  )}

                  <CardContent sx={{ textAlign: 'center', pt: pkg.recommended ? 8 : 6 }}>
                    <Typography variant="h4" gutterBottom fontWeight="bold" color={pkg.color}>
                      {pkg.name}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" paragraph>
                      {pkg.description}
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h2" component="span" fontWeight="bold">
                        {pkg.price}
                      </Typography>
                      <Typography variant="h6" component="span" color="text.secondary">
                        {pkg.period}
                      </Typography>
                    </Box>

                    <List sx={{ mb: 3 }}>
                      {pkg.features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>
                            <CheckCircle color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{ variant: 'body1' }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      fullWidth
                      component={RouterLink}
                      to={`/services/${pkg.id}`}
                      variant={pkg.recommended ? 'contained' : 'outlined'}
                      size="large"
                      sx={{
                        bgcolor: pkg.recommended ? pkg.color : 'transparent',
                        borderColor: pkg.color,
                        color: pkg.recommended ? 'white' : pkg.color,
                        '&:hover': {
                          bgcolor: pkg.recommended ? alpha(pkg.color, 0.9) : alpha(pkg.color, 0.05),
                        },
                        fontWeight: 'bold',
                        py: 1.5,
                        borderRadius: 2,
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Process Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" align="center" gutterBottom fontWeight="bold">
            How We Work
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Our proven methodology for delivering exceptional results
          </Typography>

          <Box sx={{ position: 'relative' }} >
            {/* Process timeline - Only show on desktop */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 3,
                bgcolor: 'divider',
                transform: 'translateY(-50%)',
                display: { xs: 'none', md: 'block' },
              }}
            />

            {/* Horizontal Scroll Container with Custom Scrollbar */}
            <Box
              sx={{
                position: 'relative',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: 60,
                  zIndex: 1,
                  pointerEvents: 'none',
                },
                '&::before': {
                  left: 0,
                  background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))',
                },
                '&::after': {
                  right: 0,
                  background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))',
                }
              }}
            >
              {/* Scrollable Grid Container */}
              <Box
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  py: 3,
                  px: { xs: 2, sm: 3 },
                  gap: 3,
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': {
                    height: 8,
                  },
                  '&::-webkit-scrollbar-track': {
                    background: theme.palette.grey[100],
                    borderRadius: 4,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.grey[300],
                    borderRadius: 4,
                    '&:hover': {
                      background: theme.palette.grey[400],
                    }
                  },
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth',
                }}
              >
                {processSteps.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: '0 0 auto',
                      width: {
                        xs: 280,      // Mobile: fixed width for better scrolling
                        sm: 300,      // Tablet: slightly larger
                        md: 320       // Desktop: full width
                      },
                      minWidth: { xs: 280, sm: 300, md: 320 },
                      position: 'relative',
                    }}
                  >
                    {/* Connecting arrow between steps (desktop only) */}
                    {index < processSteps.length - 1 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '100%',
                          transform: 'translateY(-50%)',
                          width: 24,
                          height: 2,
                          bgcolor: 'primary.light',
                          opacity: 0.5,
                          display: { xs: 'none', md: 'block' },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: -4,
                            top: -3,
                            width: 0,
                            height: 0,
                            borderTop: '4px solid transparent',
                            borderBottom: '4px solid transparent',
                            borderLeft: '6px solid',
                            borderLeftColor: 'primary.main',
                          }
                        }}
                      />
                    )}

                    <Card
                      sx={{
                        textAlign: 'center',
                        height: '100%',
                        border: 'none',
                        boxShadow: 3,
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'visible',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 6,
                          '& .step-number': {
                            transform: 'scale(1.1)',
                            boxShadow: 4,
                          }
                        }
                      }}
                    >
                      {/* Step number circle */}
                      <Box
                        className="step-number"
                        sx={{
                          position: 'absolute',
                          top: -24,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: step.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          zIndex: 2,
                          boxShadow: 3,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {step.step}
                      </Box>

                      <CardContent sx={{ pt: 6, pb: 3, px: { xs: 2, sm: 3 } }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: alpha(step.color, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            color: step.color,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {React.cloneElement(step.icon, {
                            sx: { fontSize: '1.75rem' }
                          })}
                        </Box>

                        <Typography
                          variant="h6"
                          gutterBottom
                          fontWeight="bold"
                          sx={{
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                            mb: 1
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' } }}
                        >
                          {step.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Scroll Indicators (Mobile/Tablet) */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                mt: 3,
              }}
            >
              {processSteps.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: index === 0 ? 'primary.main' : 'grey.300',
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </Box>

            {/* Scroll Buttons (Desktop) */}
            {/* <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
                px: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  const container = document.querySelector('.process-scroll-container');
                  if (container) {
                    container.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
                startIcon={<ArrowBackIos />}
                size="small"
              >
                Previous
              </Button>

              <Typography variant="caption" color="text.secondary">
                Scroll or use buttons to navigate
              </Typography>

              <Button
                variant="outlined"
                onClick={() => {
                  const container = document.querySelector('.process-scroll-container');
                  if (container) {
                    container.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
                endIcon={<ArrowForwardIos />}
                size="small"
              >
                Next
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;