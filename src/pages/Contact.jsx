import {
  Business,
  CheckCircle,
  Email,
  Language,
  LocationOn,
  Phone,
  Schedule
} from '@mui/icons-material';
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Fade,
  Grid,
  Grow,
  Paper,
  Snackbar,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeInfo, setActiveInfo] = useState(0);

  const departments = [
    'General Inquiry',
    'Sales',
    'Technical Support',
    'Billing',
    'Partnership',
    'Careers',
  ];

  const contactInfo = [
    {
      icon: <LocationOn fontSize="large" />,
      title: 'Visit Our Office',
      details: ['1st floor, 1/16, Basanta Rd.', 'Nitai Nagar,Mukundapur', 'Kolkata, West Bengal 700099'],
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      delay: 100,
      action: () => window.open('https://maps.app.goo.gl/4KzGDkDDPkAnKovw7', '_blank')
    },
    {
      icon: <Email fontSize="large" />,
      title: 'Email Us',
      details: ['contact@myeapl.com'],
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
      delay: 200,
      action: () => window.location.href = 'mailto:contact@myeapl.com?subject=Inquiry%20from%20Website'
    },
    {
      icon: <Phone fontSize="large" />,
      title: 'Call Us',
      details: ['+91 6289534780'],
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      delay: 300,
      action: () => window.location.href = 'tel:+91 6289534780'
    },
    {
      icon: <Schedule fontSize="large" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 10:30AM - 07:30PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
      delay: 400,
      action: null // No action for this card
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.department) newErrors.department = 'Please select a department';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      // console.log('Form submitted:', formData);
      setSubmitting(false);
      setOpenSnackbar(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: '',
      });
    }, 1500);
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      <PageHeader
        title="Get in Touch"
        subtitle="We're here to help and answer any questions you might have"
        breadcrumbs={[{ label: 'Contact', path: '/contact' }]}
        backgroundImage={`linear-gradient(rgba(52, 59, 67, 0.85), rgba(31, 56, 77, 0.85)), url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80)`}
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      <Container maxWidth="xl" sx={{ mt: -5 }}>
        {/* Floating Contact Info Cards */}
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={3} justifyContent="center">
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={info.delay}>
                  <Card
                    elevation={4}
                    onClick={info.action}
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: info.action ? 'pointer' : 'default',
                      border: `2px solid transparent`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                        borderColor: info.action ? info.color : 'transparent',
                      },
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${info.color}, ${alpha(info.color, 0.5)})`,
                      }
                    }}
                    onMouseEnter={() => setActiveInfo(index)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          bgcolor: info.bgColor,
                          color: info.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 24px',
                          transition: 'all 0.3s ease',
                          transform: activeInfo === index ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        {info.title}
                      </Typography>
                      {info.details.map((detail, idx) => (
                        <Fade in={true} timeout={500 + idx * 100} key={idx}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                            sx={{ mb: 1 }}
                          >
                            {detail}
                          </Typography>
                        </Fade>
                      ))}
                      {info.action && (
                        <Fade in={true} timeout={800}>
                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="text"
                              size="small"
                              sx={{
                                color: info.color,
                                '&:hover': {
                                  backgroundColor: alpha(info.color, 0.1),
                                }
                              }}
                            >
                              {info.title === 'Visit Our Office' ? 'View on Map' :
                                info.title === 'Email Us' ? 'Send Email' :
                                  info.title === 'Call Us' ? 'Call Now' : 'View Details'}
                            </Button>
                          </Box>
                        </Fade>
                      )}
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 12, mb: 8 }}>
          <Grid item xs={12}>
            <Fade in={true} timeout={700}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: 3, md: 4 },
                  height: '100%',
                  width: '100%'
                }}
              >
                {/* Box 1 - Map */}
                <Box
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 30%' },
                    maxWidth: { xs: '100%', md: '400px' },
                    width: '100%'
                  }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      position: 'relative',
                      height: { xs: 350, md: 450 },
                      '&:hover .map-overlay': {
                        opacity: 1,
                      },
                    }}
                  >
                    {/* Google Maps Embed - Same as original */}
                    <Box
                      sx={{
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <iframe
                        title="Google Maps - Our Headquarters"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3099.7440518386675!2d88.4031208032891!3d22.4952639028466!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271d4ec05af01%3A0xaece0c5471680424!2sExcellence%20Allegiance%20Private%20Limited!5e0!3m2!1sen!2sin!4v1767942272317!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{
                          border: 0,
                          filter: 'grayscale(20%) contrast(1.1) saturate(1.1)',
                          borderRadius: '12px',
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />

                      {/* Map Overlay Content - Same as original */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          pointerEvents: 'none',
                          p: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        {/* Header with Current Location */}
                        <Box sx={{ pointerEvents: 'auto' }}>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                            bgcolor: 'rgba(255,255,255,0.95)',
                            p: 2,
                            borderRadius: 2,
                            maxWidth: 300,
                            backdropFilter: 'blur(10px)',
                            boxShadow: theme.shadows[2]
                          }}>
                            <Box sx={{
                              width: 50,
                              height: 50,
                              borderRadius: '50%',
                              bgcolor: theme.palette.primary.main,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              flexShrink: 0
                            }}>
                              <LocationOn sx={{ fontSize: 28 }} />
                            </Box>
                            <Box>
                              <Typography variant="h6" fontWeight="bold">
                                Our Headquarters
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Kolkata, India
                              </Typography>
                            </Box>
                          </Box>

                          {/* Current Location Info */}
                          <Box sx={{
                            bgcolor: 'rgba(255,255,255,0.95)',
                            p: 2,
                            borderRadius: 2,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0,0,0,0.1)',
                            maxWidth: 300,
                            boxShadow: theme.shadows[2],
                            mt: { sx: 0, md: 10, lg: 12, xl: 20 }
                          }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              📍 Current Location
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              22.495933002999138, 88.40099908906008
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Elevation: 9m • Timezone: IST (UTC+5:30)
                            </Typography>
                          </Box>
                        </Box>

                        {/* Map Controls */}
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end',
                          pointerEvents: 'auto',
                          ml: 4
                        }}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<Language />}
                              onClick={() => window.open('https://maps.app.goo.gl/4KzGDkDDPkAnKovw7', '_blank')}
                              sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                  bgcolor: 'grey.100',
                                  transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                                boxShadow: theme.shadows[3]
                              }}
                            >
                              View Map
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                {/* Box 2 - Quick Contact */}
                <Box
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 30%' },
                    maxWidth: { xs: '100%', md: '400px' },
                    width: '100%'
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: 3,
                      height: '100%',
                      minHeight: { xs: 'auto', md: 450 },
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[6],
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Box sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary.main,
                      }}>
                        <Business sx={{ fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Quick Contact
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Need immediate assistance?
                        </Typography>
                      </Box>
                    </Box>

                    {/* Response Time Indicator */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Average Response Time:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          85% within 2 hours
                        </Typography>
                      </Box>
                      <Box sx={{
                        height: 8,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '85%',
                            background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                            borderRadius: 4,
                            animation: 'loading 1.5s ease-out',
                            '@keyframes loading': {
                              '0%': { width: '0%' },
                              '100%': { width: '85%' }
                            }
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Contact Actions */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<Phone />}
                        onClick={() => window.location.href = 'tel:+91 6289534780'}
                        sx={{
                          borderRadius: 2,
                          py: 1.25,
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4],
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Call: +91 6289534780
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Email />}
                        onClick={() => window.location.href = 'mailto:eapl.techhub@gmail.com?subject=Urgent%20Inquiry'}
                        sx={{
                          borderRadius: 2,
                          py: 1.25,
                          borderWidth: 2,
                          '&:hover': {
                            borderWidth: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Email Urgent Inquiry
                      </Button>
                    </Box>
                  </Paper>
                </Box>

                {/* Box 3 - Office Hours */}
                <Box
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 30%' },
                    maxWidth: { xs: '100%', md: '400px' },
                    width: '100%'
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: 3,
                      height: '100%',
                      minHeight: { xs: 'auto', md: 450 },
                      background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.info.light, 0.05)} 100%)`,
                      border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[6],
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Box sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.info.main,
                      }}>
                        <Schedule sx={{ fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Office Hours
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          When we're available
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      {[
                        { day: 'Monday - Friday', time: '10:30 AM - 7:30 PM', status: 'Open' },
                        { day: 'Saturday', time: '10:00 AM - 4:00 PM', status: 'Limited' },
                        { day: 'Sunday', time: 'Closed', status: 'Closed' },
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 1.5,
                            borderBottom: index < 2 ? `1px solid ${alpha(theme.palette.divider, 0.5)}` : 'none',
                          }}
                        >
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {item.day}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.time}
                            </Typography>
                          </Box>
                          <Chip
                            label={item.status}
                            size="small"
                            color={
                              item.status === 'Open' ? 'success' :
                                item.status === 'Limited' ? 'warning' : 'default'
                            }
                            sx={{
                              fontWeight: 'medium',
                              fontSize: '0.7rem'
                            }}
                          />
                        </Box>
                      ))}
                    </Box>

                    {/* Current Time Display */}
                    <Box sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.05),
                      p: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                      border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                    }}>
                      <Typography variant="caption" color="text.secondary" gutterBottom>
                        Current Local Time
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="info.main">
                        {new Date().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        IST (Indian Standard Time)
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Box>

        {/* Global Offices */}
        {/* <Box sx={{ mt: 10, mb: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label="GLOBAL PRESENCE"
              color="primary"
              icon={<Language />}
              sx={{ mb: 3, fontWeight: 'bold', px: 3, py: 1 }}
            />
            <Typography variant="h2" gutterBottom fontWeight="bold">
              Our Worldwide Offices
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              We're strategically located in major tech hubs around the world to serve you better
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {[
              {
                city: 'San Francisco',
                country: 'United States',
                address: '123 Tech Street, Silicon Valley',
                phone: '+1 (555) 123-4567',
                timezone: 'PST',
                flag: '🇺🇸',
                color: theme.palette.primary.main,
              },
              {
                city: 'London',
                country: 'United Kingdom',
                address: '456 Innovation Road, Tech City',
                phone: '+44 20 7946 0958',
                timezone: 'GMT',
                flag: '🇬🇧',
                color: theme.palette.info.main,
              },
              {
                city: 'Singapore',
                country: 'Singapore',
                address: '789 Digital Avenue, Marina Bay',
                phone: '+65 6123 4567',
                timezone: 'SGT',
                flag: '🇸🇬',
                color: theme.palette.success.main,
              },
              {
                city: 'Bangalore',
                country: 'India',
                address: '101 IT Park, Electronic City',
                phone: '+91 80 4123 4567',
                timezone: 'IST',
                flag: '🇮🇳',
                color: theme.palette.warning.main,
              },
            ].map((office, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: office.color,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4">{office.flag}</Typography>
                        <Chip
                          label={office.timezone}
                          size="small"
                          sx={{ bgcolor: alpha(office.color, 0.1), color: office.color }}
                        />
                      </Box>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {office.city}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {office.country}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                        <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mt: 0.25 }} />
                        <Typography variant="body2">
                          {office.address}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {office.phone}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          icon={<CheckCircle />}
          sx={{
            width: '100%',
            boxShadow: theme.shadows[6],
            borderRadius: 2,
            bgcolor: 'success.main',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            }
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Message sent successfully!
          </Typography>
          <Typography variant="body2">
            We'll get back to you within 2 business hours.
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;