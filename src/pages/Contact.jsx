import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Card,
  CardContent,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Send,
  LocationOn,
  Email,
  Phone,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';
import PageHeader from '../components/common/PageHeader';

const Contact = () => {
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
      color: 'primary.main',
    },
    {
      icon: <Email fontSize="large" />,
      title: 'Email Us',
      details: ['info@excellenceallegiance.com', 'support@excellenceallegiance.com'],
      color: 'secondary.main',
    },
    {
      icon: <Phone fontSize="large" />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'success.main',
    },
    {
      icon: <Schedule fontSize="large" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
      color: 'warning.main',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
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
    
    // Simulate API call
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
    <Box>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team"
        breadcrumbs={[{ label: 'Contact', path: '/contact' }]}
      />

      <Container maxWidth="lg">
        {/* Contact Info Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      bgcolor: info.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {info.title}
                  </Typography>
                  {info.details.map((detail, idx) => (
                    <Typography key={idx} variant="body2" color="text.secondary" paragraph>
                      {detail}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Send us a Message
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
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
                    />
                  </Grid>
                  
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
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.department}>
                      <InputLabel>Department *</InputLabel>
                      <Select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        label="Department *"
                      >
                        {departments.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.department && (
                        <Typography variant="caption" color="error">
                          {errors.department}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  
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
                    />
                  </Grid>
                  
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
                      rows={6}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={submitting ? null : <Send />}
                      disabled={submitting}
                      sx={{ minWidth: 200 }}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Map and Additional Info */}
          <Grid item xs={12} md={5}>
            {/* Map */}
            <Paper elevation={3} sx={{ mb: 4, overflow: 'hidden' }}>
              <Box
                sx={{
                  height: 300,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <LocationOn sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Interactive Map
                  </Typography>
                  <Typography variant="body2">
                    (Map integration would go here)
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* FAQ Preview */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Frequently Asked
              </Typography>
              
              {[
                {
                  question: 'What is your typical response time?',
                  answer: 'We respond to all inquiries within 24 hours during business days.',
                },
                {
                  question: 'Do you offer emergency support?',
                  answer: 'Yes, we provide 24/7 emergency support for our enterprise clients.',
                },
                {
                  question: 'Can I schedule a demo?',
                  answer: 'Absolutely! Contact our sales team to schedule a personalized demo.',
                },
              ].map((faq, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    {faq.question}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                  {index < 2 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
              
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => {/* Navigate to FAQ page */}}
              >
                View All FAQs
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Global Offices */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Global Offices
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
            We're located in major tech hubs around the world
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                city: 'San Francisco',
                country: 'USA',
                address: '123 Tech Street, Silicon Valley',
                phone: '+1 (555) 123-4567',
              },
              {
                city: 'London',
                country: 'UK',
                address: '456 Innovation Road, Tech City',
                phone: '+44 20 7946 0958',
              },
              {
                city: 'Singapore',
                country: 'Singapore',
                address: '789 Digital Avenue, Marina Bay',
                phone: '+65 6123 4567',
              },
              {
                city: 'Bangalore',
                country: 'India',
                address: '101 IT Park, Electronic City',
                phone: '+91 80 4123 4567',
              },
            ].map((office, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {office.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {office.country}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {office.address}
                    </Typography>
                    <Typography variant="body2">
                      {office.phone}
                    </Typography>
                  </CardContent>
                </Card>
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
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          icon={<CheckCircle />}
          sx={{ width: '100%' }}
        >
          Message sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;