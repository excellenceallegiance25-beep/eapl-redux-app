import {
  ArrowForward,
  Business,
  Chat,
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
  CircularProgress,
  Container,
  Fade,
  FormControl,
  Grid,
  Grow,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
  useTheme,
  Zoom
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
      details: ['123 Tech Street', 'Innovation City', 'Silicon Valley, CA 94000'],
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      delay: 100,
      action: () => window.open('https://www.google.com/maps/place/Excellence+Allegiance+Private+Limited/@22.4959095,88.3984308,17z/data=!4m7!3m6!1s0x3a0271d4ec05af01:0xaece0c5471680424!4b1!8m2!3d22.4959095!4d88.4010004!16s%2Fg%2F11xflb9647?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D', '_blank')
    },
    {
      icon: <Email fontSize="large" />,
      title: 'Email Us',
      details: ['info@excellenceallegiance.com', 'support@excellenceallegiance.com'],
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
      delay: 200,
      action: () => window.location.href = 'mailto:info@excellenceallegiance.com?subject=Inquiry%20from%20Website'
    },
    {
      icon: <Phone fontSize="large" />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      delay: 300,
      action: () => window.location.href = 'tel:+15551234567'
    },
    {
      icon: <Schedule fontSize="large" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
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
      console.log('Form submitted:', formData);
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
        }}
      />

      <Container maxWidth="xl" sx={{ mt: -8 }}>
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
          <Grid container spacing={6} alignItems="center">
            {/* Contact Form */}
            <Grid item xs={12} lg={7}>
              <Zoom in={true} timeout={500}>
                <Paper
                  elevation={6}
                  sx={{
                    p: { xs: 2, sm: 3, md: 4, lg: 5 },
                    borderRadius: { xs: 2, sm: 3 },
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      [theme.breakpoints.up('sm')]: {
                        height: '5px',
                      }
                    }
                  }}
                >
                  <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                    <Chip
                      label="CONTACT FORM"
                      color="primary"
                      icon={<Chat />}
                      sx={{
                        mb: { xs: 1.5, sm: 2 },
                        fontWeight: 'bold',
                        px: { xs: 1.5, sm: 2 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        height: { xs: 28, sm: 32 }
                      }}
                    />
                    <Typography
                      variant="h3"
                      gutterBottom
                      fontWeight="bold"
                      sx={{
                        fontSize: {
                          xs: '1.75rem',
                          sm: '2rem',
                          md: '2.25rem',
                          lg: '2.5rem'
                        },
                        lineHeight: 1.2
                      }}
                    >
                      Send us a Message
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        lineHeight: 1.6
                      }}
                    >
                      Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                      {/* Name Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          required
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            sx: {
                              borderRadius: 1.5,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              height: { xs: 48, sm: 56 }
                            }
                          }}
                          InputLabelProps={{
                            sx: {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }
                          }}
                          FormHelperTextProps={{
                            sx: {
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              mx: 0
                            }
                          }}
                        />
                      </Grid>

                      {/* Email Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          required
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            sx: {
                              borderRadius: 1.5,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              height: { xs: 48, sm: 56 }
                            }
                          }}
                          InputLabelProps={{
                            sx: {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }
                          }}
                          FormHelperTextProps={{
                            sx: {
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              mx: 0
                            }
                          }}
                        />
                      </Grid>

                      {/* Phone Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            sx: {
                              borderRadius: 1.5,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              height: { xs: 48, sm: 56 }
                            }
                          }}
                          InputLabelProps={{
                            sx: {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }
                          }}
                        />
                      </Grid>

                      {/* Department Field */}
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          error={!!errors.department}
                          size="medium"
                        >
                          <InputLabel
                            sx={{
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}
                          >
                            Department *
                          </InputLabel>
                          <Select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            label="Department *"
                            sx={{
                              borderRadius: 1.5,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              height: { xs: 48, sm: 56 },
                              '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center'
                              }
                            }}
                            MenuProps={{
                              PaperProps: {
                                sx: {
                                  maxHeight: { xs: 300, sm: 400 },
                                  borderRadius: 1.5,
                                }
                              }
                            }}
                          >
                            {departments.map((dept) => (
                              <MenuItem
                                key={dept}
                                value={dept}
                                sx={{
                                  fontSize: { xs: '0.875rem', sm: '1rem' },
                                  py: { xs: 1, sm: 1.5 }
                                }}
                              >
                                {dept}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.department && (
                            <Typography
                              variant="caption"
                              color="error"
                              sx={{
                                mt: 0.5,
                                display: 'block',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                              }}
                            >
                              {errors.department}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>

                      {/* Subject Field */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          required
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            sx: {
                              borderRadius: 1.5,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              height: { xs: 48, sm: 56 }
                            }
                          }}
                          InputLabelProps={{
                            sx: {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }
                          }}
                          FormHelperTextProps={{
                            sx: {
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              mx: 0
                            }
                          }}
                        />
                      </Grid>

                      {/* Message Field */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          multiline
                          rows={{ xs: 4, sm: 5, md: 6 }}
                          required
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            sx: {
                              borderRadius: 1.5,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              '& textarea': {
                                minHeight: { xs: 80, sm: 100, md: 120 }
                              }
                            }
                          }}
                          InputLabelProps={{
                            sx: {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }
                          }}
                          FormHelperTextProps={{
                            sx: {
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              mx: 0
                            }
                          }}
                        />
                      </Grid>

                      {/* Submit Button */}
                      <Grid item xs={12}>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: { xs: 'center', sm: 'flex-start' },
                          mt: { xs: 1, sm: 2 }
                        }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            endIcon={!submitting && <ArrowForward />}
                            disabled={submitting}
                            sx={{
                              width: { xs: '100%', sm: 'auto' },
                              minWidth: { xs: '100%', sm: 200 },
                              py: { xs: 1.25, sm: 1.5 },
                              px: { xs: 3, sm: 4 },
                              borderRadius: 1.5,
                              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              fontWeight: 600,
                              '&:hover': {
                                transform: { xs: 'none', sm: 'translateY(-2px)' },
                                boxShadow: theme.shadows[6],
                              },
                              '&:active': {
                                transform: { xs: 'scale(0.98)', sm: 'translateY(0)' },
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {submitting ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={20} color="inherit" />
                                <span>Sending...</span>
                              </Box>
                            ) : (
                              'Send Message'
                            )}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>

            {/* Map and Quick Info */}
            <Grid item xs={12} md={5}>
              <Fade in={true} timeout={700}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row', xl: 'row', lg: 'row' },
                    justifyContent: 'center',
                    gap: { xs: 3, md: 4 },
                    height: '100%'
                  }}>
                  {/* Interactive Google Map */}
                  <Box>
                    <Paper
                      elevation={6}
                      sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        height: { xs: 350, md: 400, lg: 500, xl: 500 },
                        '&:hover .map-overlay': {
                          opacity: 1,
                        },
                      }}
                    >
                      {/* Google Maps Embed */}
                      <Box
                        sx={{
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Google Maps iframe */}
                        <iframe
                          title="Google Maps - Our Headquarters"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.9885395373094!2d88.3984308!3d22.4959095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271d4ec05af01%3A0xaece0c5471680424!2sExcellence%20Allegiance%20Private%20Limited!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{
                            border: 0,
                            filter: 'grayscale(20%) contrast(1.1) saturate(1.1)',
                            borderRadius: '12px'
                          }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />

                        {/* Map Overlay Content */}
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
                              boxShadow: theme.shadows[2]
                            }}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                📍 Current Location
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                22.4959° N, 88.4010° E
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
                            pointerEvents: 'auto'
                          }}>
                            {/* Map Interaction Buttons */}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<Language />}
                                onClick={() => window.open('https://www.google.com/maps/place/Excellence+Allegiance+Private+Limited/@22.4959095,88.3984308,17z/data=!4m7!3m6!1s0x3a0271d4ec05af01:0xaece0c5471680424!4b1!8m2!3d22.4959095!4d88.4010004!16s%2Fg%2F11xflb9647?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D', '_blank')}
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
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<LocationOn />}
                                onClick={() => window.open('https://www.google.com/maps/dir//Excellence+Allegiance+Private+Limited,+Kolkata,+West+Bengal/@22.4959095,88.3984308,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a0271d4ec05af01:0xaece0c5471680424!2m2!1d88.4010004!2d22.4959095?entry=ttu', '_blank')}
                                sx={{
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  '&:hover': {
                                    bgcolor: 'primary.dark',
                                    transform: 'translateY(-2px)',
                                  },
                                  boxShadow: theme.shadows[3]
                                }}
                              >
                                Directions
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  {/* Quick Contact & Info Cards */}
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr', sm: '1fr 1fr', md: '1fr', lg: '1fr 1fr', xl: '1fr 1fr'
                    },
                    gap: 3
                  }}>
                    {/* Quick Contact Card */}
                    <Paper
                      elevation={4}
                      sx={{
                        p: { xs: 2.5, md: 3 },
                        borderRadius: 3,
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
                          onClick={() => window.location.href = 'tel:+15551234567'}
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
                          Call: +1 (555) 123-4567
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Email />}
                          onClick={() => window.location.href = 'mailto:support@excellenceallegiance.com?subject=Urgent%20Inquiry'}
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

                    {/* Office Hours Card */}
                    <Paper
                      elevation={4}
                      sx={{
                        p: { xs: 2.5, md: 3 },
                        borderRadius: 3,
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
                          { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM', status: 'Open' },
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
          </Grid>
        </Box>

        {/* Global Offices */}
        <Box sx={{ mt: 10, mb: 6 }}>
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
        </Box>
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