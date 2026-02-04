import {
  AccessTime,
  Add,
  Business,
  Chat,
  CheckCircle,
  Description,
  Directions,
  Email,
  Language,
  LocationOn,
  Navigation,
  Person,
  Phone,
  Place,
  Remove,
  Schedule,
  Security,
  Send,
  SupportAgent,
  Verified,
  WhatsApp
} from '@mui/icons-material';
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Container,
  Fade,
  Grid,
  Grow,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import workingHour_bg from '../assets/images/workingHour.jpg';
import { useDispatch } from 'react-redux';
import { sendUserDetailsToManager } from '../services/AppConfigAction';

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
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploading, setUploading] = useState(false);


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
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      action: () => window.open('https://maps.app.goo.gl/4KzGDkDDPkAnKovw7', '_blank')
    },
    {
      icon: <Email fontSize="large" />,
      title: 'Email Us',
      details: ['contact@myeapl.com'],
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
      delay: 200,
      action: () => window.location.href = 'mailto:contact@myeapl.com?subject=Inquiry%20from%20Website',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    },
    {
      icon: <Phone fontSize="large" />,
      title: 'Call Us',
      details: ['+91 6289534780'],
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      delay: 300,
      action: () => window.location.href = 'tel:+91 6289534780',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
    },
    {
      icon: <Schedule fontSize="large" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 10:30AM - 07:30PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
      delay: 400,
      image: workingHour_bg,
      action: null // No action for this card
    },
  ];

  const contactInfo1 = [
    {
      icon: <LocationOn fontSize="large" />,
      title: 'Visit Our Office',
      details: ['1st floor, 1/16, Basanta Rd.', 'Nitai Nagar,Mukundapur', 'Kolkata, West Bengal 700099'],
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      delay: 100,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      action: () => window.open('https://maps.app.goo.gl/4KzGDkDDPkAnKovw7', '_blank')
    },
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Contact Email',
      details: ['hello@excellenceallegiance.com', 'sales@excellenceallegiance.com', 'careers@excellenceallegiance.com'],
      color: '#f5576c',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: 'Phone Numbers',
      details: ['+1 (415) 123-4567 (Sales)', '+1 (415) 987-6543 (Support)', '24/7 Emergency: +1 (415) 555-7890'],
      color: '#4CAF50',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
    }
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

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate form
    if (!validateForm(data)) {
      console.error("Form validation failed");
      return;
    }

    const payload = {
      ...data,
      source: "website_contact_form",
    };

    try {
      setUploading(true);
      setError(null);
      setSubmitting('Submitting response...');

      const result = await dispatch(sendUserDetailsToManager(payload));

      // Redux Toolkit / Thunk safe handling
      if (result?.type === "USER_DETAILS_FETCH_SUCCESS") {
        if (result?.payload?.success) {
          console.log("User details saved successfully");

          // Show success snackbar
          setOpenSnackbar(true);

          e.target.reset();
          setError(null);
          // Clear submitting message after a delay
          setTimeout(() => {
            setSubmitting('');
          }, 2000);
        } else {
          console.error("Backend error:", result?.payload?.message);
          setError(result?.payload?.message || "Submission failed");
          setSubmitting('');
        }
      } else {
        console.error("Unexpected action type:", result?.type);
        setError("Unexpected server response");
        setSubmitting('');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit contact form");
      setSubmitting('');
    } finally {
      setUploading(false);
    }
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
            {contactInfo.map((contact, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={contact.delay}>
                  <Card elevation={4}
                    onClick={contact.action}
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: contact.action ? 'pointer' : 'default',
                      border: `2px solid transparent`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                        borderColor: contact.action ? contact.color : 'transparent',
                      },
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(contact.color, 0.2)}`,
                        '& .contact-image': {
                          transform: 'scale(1.1)'
                        }
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
                        background: `linear-gradient(90deg, ${contact.color}, ${alpha(contact.color, 0.5)})`,
                      }
                    }}
                    onMouseEnter={() => setActiveInfo(index)}>
                    <Box
                      className="contact-image"
                      sx={{
                        height: 150,
                        backgroundImage: `url(${contact.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.5s'
                      }}
                    />
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: alpha(contact.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '-55px auto 25px',
                          color: contact.color,
                          border: `4px solid ${theme.palette.background.paper}`,
                          position: 'relative',
                          zIndex: 1
                        }}
                      >
                        {contact.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                        {contact.title}
                      </Typography>
                      {contact.details.map((detail, idx) => (
                        <Typography
                          key={idx}
                          variant="body1"
                          sx={{
                            mb: 2,
                            color: idx === 0 ? 'text.primary' : 'text.secondary',
                            transition: 'all 0.3s',
                            '&:hover': {
                              color: contact.color,
                              transform: 'translateX(5px)'
                            }
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Information with Images */}
        {/* <Box sx={{ position: 'relative', zIndex: 2 }}>
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
                          backgroundImage: `url(${info.image})`,
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
        </Box> */}

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
                {/* Enhanced Map Container with Custom Google Maps */}
                <Box
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 40%' },
                    maxWidth: { xs: '100%', md: '500px' },
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      position: 'relative',
                      height: { xs: 350, md: 450 },
                      transform: 'translateZ(0)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-5px) scale(1.01)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    {/* Original Google Maps with Custom Styling */}
                    <Box
                      sx={{
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        '& iframe': {
                          filter: 'saturate(1.2) contrast(1.05)',
                        },
                      }}
                    >
                      <iframe
                        title="Google Maps - Our Headquarters"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.772122709782!2d88.4031208!3d22.4952639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271d4ec05af01%3A0xaece0c5471680424!2sExcellence%20Allegiance%20Private%20Limited!5e0!3m2!1sen!2sin!4v1705661567895!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{
                          border: 0,
                          borderTopLeftRadius: '20px',
                          borderTopRightRadius: '20px',
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />

                      {/* Custom Google Maps Overlay Controls */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 20,
                          right: 20,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          pointerEvents: 'auto',
                        }}
                      >
                        {/* Custom Zoom Controls */}
                        <Box
                          sx={{
                            background: 'white',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                          }}
                        >
                          <Button
                            size="small"
                            sx={{
                              minWidth: 40,
                              height: 40,
                              borderRadius: 0,
                              borderBottom: '1px solid #eee',
                              '&:hover': {
                                background: '#f5f5f5',
                              },
                            }}
                          >
                            <Add />
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              minWidth: 40,
                              height: 40,
                              borderRadius: 0,
                              '&:hover': {
                                background: '#f5f5f5',
                              },
                            }}
                          >
                            <Remove />
                          </Button>
                        </Box>

                        {/* Compass Control */}
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'rotate(30deg)',
                              background: '#f8f9fa',
                            },
                          }}
                        >
                          <Navigation sx={{ color: '#666', fontSize: 20 }} />
                        </Box>
                      </Box>

                      {/* Custom Location Pin with Pulse Effect */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -100%)',
                          pointerEvents: 'none',
                        }}
                      >
                        {/* Pulsing ring effect */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: 'rgba(255, 68, 68, 0.2)',
                            animation: 'pulse 2s infinite',
                            '@keyframes pulse': {
                              '0%': {
                                transform: 'translate(-50%, -50%) scale(0.8)',
                                opacity: 0.8,
                              },
                              '100%': {
                                transform: 'translate(-50%, -50%) scale(1.5)',
                                opacity: 0,
                              },
                            },
                          }}
                        />

                        {/* Main pin */}
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50% 50% 50% 0',
                            background: 'linear-gradient(135deg, #ff4444, #ff6666)',
                            transform: 'rotate(-45deg)',
                            position: 'relative',
                            boxShadow: '0 10px 30px rgba(255, 68, 68, 0.3)',
                            animation: 'bounce 2s infinite',
                            '@keyframes bounce': {
                              '0%, 100%': { transform: 'rotate(-45deg) translateY(0)' },
                              '50%': { transform: 'rotate(-45deg) translateY(-10px)' },
                            },
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: 30,
                              height: 30,
                              background: 'white',
                              borderRadius: '50%',
                            },
                            '&::after': {
                              content: '"🏢"',
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%) rotate(45deg)',
                              fontSize: '16px',
                            },
                          }}
                        />
                      </Box>

                      {/* Custom Info Window at Bottom */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                          backdropFilter: 'blur(10px)',
                          padding: 2,
                          borderTop: '1px solid rgba(0,0,0,0.1)',
                          transform: 'translateY(0)',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ flexShrink: 0 }}>
                            <Place
                              sx={{
                                color: theme.palette.primary.main,
                                fontSize: 24,
                              }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Excellence Allegiance Pvt Ltd
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Kolkata, West Bengal • 22.4952639° N, 88.4031208° E
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Directions />}
                            onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=22.4952639,88.4031208', '_blank')}
                            sx={{
                              background: 'linear-gradient(135deg, #4285F4, #34A853)',
                              borderRadius: '20px',
                              fontWeight: 'bold',
                              boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 16px rgba(66, 133, 244, 0.4)',
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            Directions
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>

                  {/* Map Stats Cards */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      mt: 2,
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      sx={{
                        background: 'white',
                        padding: 1.5,
                        borderRadius: '12px',
                        minWidth: '100px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        📍 Latitude
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        22.495264° N
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        background: 'white',
                        padding: 1.5,
                        borderRadius: '12px',
                        minWidth: '100px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        🌐 Longitude
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        88.403121° E
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        background: 'white',
                        padding: 1.5,
                        borderRadius: '12px',
                        minWidth: '100px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        ⏰ Timezone
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        IST (UTC+5:30)
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* second section */}
                <Box
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 30%' },
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '500px', md: '400px', lg: '40%' },
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                  {/* <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                      borderRadius: { xs: 2, md: 3 },
                      height: '100%',
                      minHeight: { xs: 'auto', sm: 420, md: 450 },
                      background: 'white',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: {
                          xs: '0 10px 25px rgba(0,0,0,0.06)',
                          md: '0 20px 40px rgba(0,0,0,0.08)'
                        },
                        '&::before': {
                          opacity: 1,
                        },
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: { xs: '2px', sm: '3px' },
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        opacity: 0.7,
                        transition: 'opacity 0.3s ease',
                      },
                    }}
                  > */}
                  {/* Unified Header */}
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1.5, sm: 2 },
                    mb: { xs: 3, sm: 4 }
                  }}>
                    <Box
                      sx={{
                        width: { xs: 48, sm: 52, md: 56 },
                        height: { xs: 48, sm: 52, md: 56 },
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#667eea',
                        position: 'relative',
                        flexShrink: 0,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: { xs: '-3px', sm: '-4px' },
                          borderRadius: '50%',
                          border: '2px solid rgba(102, 126, 234, 0.2)',
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.5 },
                          },
                        },
                      }}
                    >
                      <Business sx={{
                        fontSize: {
                          xs: 24,
                          sm: 26,
                          md: 28
                        }
                      }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="grey.900"
                        sx={{
                          fontSize: {
                            xs: '1rem',
                            sm: '1.1rem',
                            md: '1.25rem'
                          },
                          lineHeight: 1.3
                        }}
                      >
                        Contact & Hours
                      </Typography>
                      <Typography
                        variant="body2"
                        color="grey.600"
                        sx={{
                          fontSize: {
                            xs: '0.75rem',
                            sm: '0.875rem'
                          },
                          mt: 0.5
                        }}
                      >
                        Connect instantly or check availability
                      </Typography>
                    </Box>
                  </Box>

                  {/* Response Time Section */}
                  <Box
                    sx={{
                      mb: { xs: 3, sm: 4 },
                      p: { xs: 1.5, sm: 2, md: 2.5 },
                      borderRadius: { xs: 1.5, sm: 2 },
                      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                      border: '1px solid',
                      borderColor: 'grey.100',
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: { xs: 1, sm: 0 },
                      mb: { xs: 1, sm: 1.5 }
                    }}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="grey.700"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                      >
                        Response Performance
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #10b981, #34d399)',
                            animation: 'pulse-small 2s infinite',
                            '@keyframes pulse-small': {
                              '0%, 100%': { opacity: 1 },
                              '50%': { opacity: 0.5 },
                            },
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color="success.dark"
                          sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                        >
                          85% within 2h
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{
                      height: { xs: 4, sm: 6 },
                      bgcolor: 'grey.200',
                      borderRadius: 3,
                      overflow: 'hidden'
                    }}>
                      <Box
                        sx={{
                          height: '100%',
                          width: '85%',
                          background: 'linear-gradient(90deg, #10b981, #34d399)',
                          borderRadius: 3,
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            animation: 'shimmer 2s infinite',
                            '@keyframes shimmer': {
                              '0%': { transform: 'translateX(-100%)' },
                              '100%': { transform: 'translateX(100%)' },
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Contact Actions Grid */}
                  <Grid
                    container
                    spacing={{ xs: 1.5, sm: 2 }}
                    sx={{ mb: { xs: 3, sm: 4 } }}
                  >
                    <Grid item xs={12} sm={6}>
                      <Box
                        onClick={() => window.location.href = 'tel:+91 6289534780'}
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: { xs: 1.5, sm: 2 },
                          border: '1px solid',
                          borderColor: 'grey.200',
                          background: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          '&:hover': {
                            borderColor: '#3b82f6',
                            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                            transform: { xs: 'translateY(-1px)', sm: 'translateY(-2px)' },
                            boxShadow: {
                              xs: '0 3px 8px rgba(59, 130, 246, 0.12)',
                              sm: '0 4px 12px rgba(59, 130, 246, 0.15)'
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 36, sm: 40, md: 44 },
                            height: { xs: 36, sm: 40, md: 44 },
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            mb: { xs: 1, sm: 1.5 },
                          }}
                        >
                          <Phone sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="grey.900"
                          sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                        >
                          Call Now
                        </Typography>
                        <Typography
                          variant="caption"
                          color="grey.600"
                          sx={{
                            mt: 0.5,
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            wordBreak: 'break-word'
                          }}
                        >
                          +91 62895 34780
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        onClick={() => window.location.href = 'mailto:eapl.techhub@gmail.com'}
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: { xs: 1.5, sm: 2 },
                          border: '1px solid',
                          borderColor: 'grey.200',
                          background: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          '&:hover': {
                            borderColor: '#8b5cf6',
                            background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
                            transform: { xs: 'translateY(-1px)', sm: 'translateY(-2px)' },
                            boxShadow: {
                              xs: '0 3px 8px rgba(139, 92, 246, 0.12)',
                              sm: '0 4px 12px rgba(139, 92, 246, 0.15)'
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 36, sm: 40, md: 44 },
                            height: { xs: 36, sm: 40, md: 44 },
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            mb: { xs: 1, sm: 1.5 },
                          }}
                        >
                          <Email sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="grey.900"
                          sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                        >
                          Email Us
                        </Typography>
                        <Typography
                          variant="caption"
                          color="grey.600"
                          sx={{
                            mt: 0.5,
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            wordBreak: 'break-all'
                          }}
                        >
                          eapl.techhub@gmail.com
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Office Hours Section */}
                  <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: { xs: 2, sm: 3 }
                    }}>
                      <Schedule sx={{
                        color: 'grey.500',
                        fontSize: { xs: 18, sm: 20 }
                      }} />
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="grey.700"
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.875rem' } }}
                      >
                        Office Hours
                      </Typography>
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      flexWrap: { sm: 'wrap' },
                      gap: { xs: 1.5, sm: 2 }
                    }}>
                      {[
                        {
                          day: 'Mon - Fri',
                          time: '10:30 AM - 7:30 PM',
                          status: 'Open',
                          color: '#10b981',
                          bgColor: '#d1fae5'
                        },
                        {
                          day: 'Saturday',
                          time: '10:00 AM - 4:00 PM',
                          status: 'Limited',
                          color: '#f59e0b',
                          bgColor: '#fef3c7'
                        },
                        {
                          day: 'Sunday',
                          time: 'Closed',
                          status: 'Closed',
                          color: '#6b7280',
                          bgColor: '#f3f4f6'
                        },
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            flex: { xs: 'none', sm: 1 },
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'column' },
                            alignItems: { xs: 'center', sm: 'flex-start' },
                            justifyContent: 'space-between',
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: { xs: 1.5, sm: 2 },
                            background: index === 0 ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' :
                              index === 1 ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' :
                                'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                            border: '1px solid',
                            borderColor: index === 0 ? '#bbf7d0' :
                              index === 1 ? '#fde68a' :
                                '#e5e7eb',
                            transition: 'all 0.3s ease',
                            minWidth: { sm: 0 },
                            '&:hover': {
                              transform: {
                                xs: 'translateX(2px)',
                                sm: 'translateY(-2px)'
                              },
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            },
                          }}
                        >
                          <Box sx={{
                            flex: { xs: 1, sm: 'none' },
                            mb: { sm: 1 }
                          }}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="grey.900"
                              sx={{
                                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                mb: { sm: 0.5 }
                              }}
                            >
                              {item.day}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="grey.600"
                              sx={{
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                display: 'block'
                              }}
                            >
                              {item.time}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              px: { xs: 1, sm: 1.5, md: 2 },
                              py: { xs: 0.25, sm: 0.5 },
                              borderRadius: '20px',
                              background: item.bgColor,
                              border: `1px solid ${item.color}40`,
                              flexShrink: 0,
                              mt: { xs: 0, sm: 'auto' }
                            }}
                          >
                            <Typography
                              variant="caption"
                              fontWeight={600}
                              sx={{
                                color: item.color,
                                fontSize: { xs: '0.7rem', sm: '0.75rem' }
                              }}
                            >
                              {item.status}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* </Paper> */}
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Box>

        {/* Current Time Display */}
        {/* <Box
          sx={{
            p: { xs: 1.5, sm: 2, md: 2.5 },
            borderRadius: { xs: 1.5, sm: 2 },
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            border: '1px solid #334155',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)',
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: { xs: 1.5, sm: 2 }
            }}>
              <Typography
                variant="caption"
                fontWeight={600}
                color="#94a3b8"
                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              >
                CURRENT TIME
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{
                  width: { xs: 6, sm: 8 },
                  height: { xs: 6, sm: 8 },
                  borderRadius: '50%',
                  background: '#10b981'
                }} />
                <Typography
                  variant="caption"
                  color="#10b981"
                  fontWeight={600}
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                >
                  LIVE
                </Typography>
              </Box>
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 1
            }}>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: 'white',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  fontSize: {
                    xs: '1.5rem',
                    sm: '1.75rem',
                    md: '2rem'
                  },
                  lineHeight: 1.2
                }}
              >
                {new Date().toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
              <Typography
                variant="body2"
                color="#cbd5e1"
                sx={{
                  ml: { xs: 0, sm: 'auto' },
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }}
              >
                IST
              </Typography>
            </Box>

            <Typography
              variant="caption"
              color="#94a3b8"
              sx={{
                display: 'block',
                mt: 1,
                fontSize: { xs: '0.7rem', sm: '0.75rem' }
              }}
            >
              Indian Standard Time • UTC+5:30
            </Typography>
          </Box>
        </Box> */}

        {/* Send a Message Section */}
        <Box sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          ml: '-50vw',
          mr: '-50vw',
          mt: 12,
          py: { xs: 8, md: 12 },
          px: { xs: 2, sm: 3 },
          background: 'linear-gradient(135deg, #D4C9BE 0%, #123458 50%, #0F172A 100%)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          }
        }}>
          <Container maxWidth="lg">
            <Fade in={true} timeout={1000}>
              <Box>
                <Grid container spacing={5} alignItems="stretch">
                  {/* Left Column: Contact Form */}
                  <Grid item xs={12} md={7}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 4, sm: 5, md: 6 },
                        borderRadius: 4,
                        height: '100%',
                        background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
                        border: '1px solid rgba(255,255,255,0.9)',
                        boxShadow: `0 20px 40px rgba(0,0,0,0.08),
                                  0 8px 16px rgba(0,0,0,0.04),
                                  inset 0 1px 0 rgba(255,255,255,0.9)`,
                        position: 'relative',
                        overflow: 'hidden',
                        backdropFilter: 'blur(10px)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '5px',
                          background: 'linear-gradient(90deg, #3B82F6 0%, #083de9 50%, #0F172A 100%)',
                          borderBottomLeftRadius: 4,
                          borderBottomRightRadius: 4,
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '120px',
                          height: '120px',
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
                          borderTopLeftRadius: '50%',
                        }
                      }}
                    >
                      <Box sx={{ mb: 5, position: 'relative', zIndex: 1 }}>
                        <Typography
                          variant="h4"
                          fontWeight={700}
                          color="#0F172A"
                          gutterBottom
                          sx={{
                            background: 'linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          Send a Message
                        </Typography>
                        <Typography variant="body1" color="#475569" sx={{ lineHeight: 1.7 }}>
                          Complete the form below and our dedicated team will respond to your inquiry
                          within 24 business hours.
                        </Typography>
                      </Box>

                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                          {/* Name Field */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              required
                              name="name"
                              label="Full Name"
                              variant="outlined"
                              size="medium"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                  border: '1px solid #E2E8F0',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  '&:hover': {
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#94A3B8',
                                    boxShadow: '0 2px 8px rgba(148, 163, 184, 0.1)',
                                  },
                                  '&.Mui-focused': {
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#3B82F6',
                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: '#64748B',
                                  fontWeight: 500,
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Person sx={{ color: '#8a2605', fontSize: 20 }} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* Email Field */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              required
                              name="email"
                              type="email"
                              label="Email Address"
                              variant="outlined"
                              size="medium"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                  border: '1px solid #E2E8F0',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  '&:hover': {
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#94A3B8',
                                    boxShadow: '0 2px 8px rgba(148, 163, 184, 0.1)',
                                  },
                                  '&.Mui-focused': {
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#3B82F6',
                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                                  },
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Email sx={{ color: '#0964e2', fontSize: 20 }} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* Phone Field */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name="phone"
                              label="Phone Number"
                              variant="outlined"
                              size="medium"
                              helperText="Optional"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                  border: '1px solid #E2E8F0',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                },
                                '& .MuiFormHelperText-root': {
                                  color: '#94A3B8',
                                  fontSize: '0.75rem',
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Phone sx={{ color: '#bb0ed2', fontSize: 20 }} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* Subject Field */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              required
                              name="subject"
                              label="Subject"
                              variant="outlined"
                              size="medium"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                  border: '1px solid #E2E8F0',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Description sx={{ color: '#09b209', fontSize: 20 }} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* Message Field */}
                          <Grid item xs={12} lg={4}>
                            <TextField
                              fullWidth
                              required
                              name="message"
                              label="Your Message"
                              multiline
                              rows={5}
                              variant="outlined"
                              size="medium"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                  border: '1px solid #E2E8F0',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  '&:hover, &.Mui-focused': {
                                    backgroundColor: '#FFFFFF',
                                  }
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start" sx={{ alignItems: 'flex-start', mt: 1.5 }}>
                                    <Chat sx={{ color: '#4c079b', fontSize: 20 }} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* Submit Button */}
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              fullWidth
                              sx={{
                                py: 2,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #D4C9BE 0%, #1E40AF 100%)',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                                letterSpacing: '0.01em',
                                boxShadow: `
                          0 4px 20px rgba(59, 130, 246, 0.25),
                          0 2px 8px rgba(59, 130, 246, 0.2)
                        `,
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: '-100%',
                                  width: '100%',
                                  height: '100%',
                                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                  transition: 'left 0.7s ease',
                                },
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: `
                            0 8px 30px rgba(59, 130, 246, 0.35),
                            0 4px 12px rgba(59, 130, 246, 0.25)
                          `,
                                  background: 'linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)',
                                  '&::before': {
                                    left: '100%',
                                  },
                                },
                                '&:active': {
                                  transform: 'translateY(0)',
                                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                                },
                              }}
                              startIcon={<Send sx={{ fontSize: 22 }} />}
                            >
                              Send Message
                            </Button>
                          </Grid>

                          {/* Privacy Note */}
                          <Grid item xs={12}>
                            <Typography
                              variant="caption"
                              color="#64748B"
                              align="center"
                              sx={{
                                display: 'block',
                                mt: 2,
                                lineHeight: 1.6,
                                fontSize: '0.875rem'
                              }}
                            >
                              By submitting this form, you acknowledge and agree to our{' '}
                              <Link
                                href="/privacy"
                                color="primary"
                                sx={{
                                  textDecoration: 'none',
                                  fontWeight: 600,
                                  color: '#3B82F6',
                                  borderBottom: '1px solid transparent',
                                  transition: 'border-color 0.2s',
                                  '&:hover': {
                                    borderBottomColor: '#3B82F6',
                                  }
                                }}
                              >
                                Privacy Policy
                              </Link>{' '}
                              and consent to being contacted regarding your inquiry.
                            </Typography>
                          </Grid>
                        </Grid>
                      </form>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Success Message */}
                <Collapse in={false}>
                  <Box
                    sx={{
                      mt: 4,
                      p: 4,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      backdropFilter: 'blur(10px)',
                      textAlign: 'center',
                      animation: 'fadeIn 0.6s ease-out',
                      '@keyframes fadeIn': {
                        from: { opacity: 0, transform: 'translateY(-10px)' },
                        to: { opacity: 1, transform: 'translateY(0)' }
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                      <CheckCircle sx={{ color: '#10B981', fontSize: 28 }} />
                      <Typography variant="h6" fontWeight={600} color="#065F46">
                        Message Sent Successfully!
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="#047857" sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.7 }}>
                      Thank you for reaching out. We've received your message and our team will review
                      your inquiry. You can expect a response within 24 business hours.
                    </Typography>
                  </Box>
                </Collapse>
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Right Column: Why Choose Us */}
        <Box sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          ml: '-50vw',
          mr: '-50vw',
          // mt: 12,
          // mb: 8,
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 3 },
          // background: 'linear-gradient(135deg, #0C2C55 0%, #f1f5f9 100%)',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <Container maxWidth="lg">
            <Box>
              <Grid item xs={12} md={5}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Response Time & Features */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, sm: 4 },
                      borderRadius: 3,
                      flex: 1,
                      background: 'white',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom sx={{ mb: 3 }}>
                      Why Choose Us
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {[
                        {
                          icon: <AccessTime sx={{ color: '#3b82f6' }} />,
                          title: 'Fast Response Time',
                          description: '85% of inquiries answered within 2 business hours',
                          color: '#3b82f6',
                          bgColor: '#eff6ff',
                        },
                        {
                          icon: <Verified sx={{ color: '#10b981' }} />,
                          title: 'Expert Support',
                          description: 'Dedicated team with 10+ years of industry experience',
                          color: '#10b981',
                          bgColor: '#f0fdf4',
                        },
                        {
                          icon: <Security sx={{ color: '#8b5cf6' }} />,
                          title: 'Secure & Private',
                          description: 'Your information is protected with enterprise-grade security',
                          color: '#8b5cf6',
                          bgColor: '#f5f3ff',
                        },
                        {
                          icon: <SupportAgent sx={{ color: '#f59e0b' }} />,
                          title: '24/7 Support',
                          description: 'Emergency support available round the clock',
                          color: '#f59e0b',
                          bgColor: '#fffbeb',
                        },
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            background: item.bgColor,
                            border: `1px solid ${item.color}20`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateX(4px)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            },
                          }}
                        >
                          <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: `${item.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}>
                            {item.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight={600} color="#1e293b">
                              {item.title}
                            </Typography>
                            <Typography variant="caption" color="#64748b">
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: '100%',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            }
          }}
          icon={false}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              {/* Animated Icon */}
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  animation: 'pulse 2s infinite',
                }}
              >
                <CheckCircle sx={{ fontSize: 28, color: 'white' }} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    color: 'white',
                    mb: 0.5,
                    fontSize: '1rem'
                  }}
                >
                  ✨ Message sent successfully!
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.5,
                    fontSize: '0.875rem'
                  }}
                >
                  We'll get back to you soon. Thank you for reaching out!
                </Typography>

                {/* Quick Info */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mt: 1.5,
                    pt: 1.5,
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 16, opacity: 0.8 }} />
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Response within 2h
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Verified sx={{ fontSize: 16, opacity: 0.8 }} />
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Confirmation sent
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;