import {
  ArrowForward,
  Business,
  Facebook,
  GitHub,
  Instagram,
  Language,
  LinkedIn,
  Security,
  Star,
  Twitter,
  VerifiedUser
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Snackbar,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      // Simulate API call
      setTimeout(() => {
        setSubscriptionSuccess(true);
        setSnackbarOpen(true);
        setEmail('');
      }, 500);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const quickLinks = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about' },
    { text: 'Services', path: '/services' },
    { text: 'Products', path: '/products' },
    { text: 'Blog', path: '/blog' },
    { text: 'Contact Us', path: '/contact' },
  ];

  const companyLinks = [
    { text: 'Our Team', path: '/team' },
    { text: 'Careers', path: '/careers' },
    { text: 'Press & Media', path: '/press' },
    { text: 'Partnerships', path: '/partnerships' },
    { text: 'Investor Relations', path: '/investors' },
    { text: 'Sustainability', path: '/sustainability' },
  ];

  const supportLinks = [
    { text: 'Help Center', path: '/help' },
    { text: 'Documentation', path: '/docs' },
    { text: 'API Reference', path: '/api' },
    { text: 'Community Forum', path: '/community' },
    { text: 'Contact Support', path: '/support' },
    { text: 'Service Status', path: '/status' },
  ];

  const legalLinks = [
    { text: 'Privacy Policy', path: '/privacy' },
    { text: 'Terms of Service', path: '/terms' },
    { text: 'Cookie Policy', path: '/cookies' },
    { text: 'GDPR Compliance', path: '/gdpr' },
    { text: 'Security', path: '/security' },
    { text: 'SLA', path: '/sla' },
  ];

  const careerOpportunities = [
    { role: 'Senior Frontend Developer', type: 'Remote', category: 'Engineering' },
    { role: 'DevOps Engineer', type: 'On-site', category: 'Operations' },
    { role: 'UX/UI Designer', type: 'Hybrid', category: 'Design' },
    { role: 'Sales Executive', type: 'Remote', category: 'Sales' },
    { role: 'Data Scientist', type: 'On-site', category: 'Research' },
  ];

  const socialLinks = [
    { icon: <Facebook />, label: 'Facebook', url: 'https://facebook.com' },
    { icon: <Twitter />, label: 'Twitter', url: 'https://twitter.com' },
    { icon: <LinkedIn />, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <Instagram />, label: 'Instagram', url: 'https://instagram.com' },
    { icon: <GitHub />, label: 'GitHub', url: 'https://github.com' },
    { icon: <Language />, label: 'Website', url: 'https://excellenceallegiance.com' },
  ];

  const achievements = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Projects Delivered', value: '500+' },
    { label: 'Happy Clients', value: '200+' },
    { label: 'Countries Served', value: '50+' },
  ];

  return (
    <>
      {/* Top Footer Section with Stats */}
      {/* <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            {achievements.map((achievement, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" fontWeight="bold" sx={{ color: 'secondary.light' }}>
                    {achievement.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {achievement.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* Main Footer Content */}
      <Box
        component="footer"
        sx={{
          backgroundColor: 'grey.900',
          color: 'white',
          pt: 6,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={20} alignItems="center">
            {/* Company Info Column */}
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.light' }}>
                  Excellence Allegiance Pvt Ltd
                </Typography>
                {/* <Typography variant="h6" sx={{ color: 'primary.light', mb: 2 }}>
                  Pvt Ltd
                </Typography> */}
                <Typography variant="body2" paragraph sx={{ color: 'grey.300' }}>
                  Pioneering digital transformation with cutting-edge technology solutions
                  and <br/> innovative software development since 2010.
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Certifications & Awards
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    icon={<VerifiedUser fontSize="small" />}
                    label="ISO 27001"
                    size="small"
                    sx={{ bgcolor: 'primary.dark', color: 'white' }}
                  />
                  <Chip
                    icon={<Security fontSize="small" />}
                    label="GDPR Compliant"
                    size="small"
                    sx={{ bgcolor: 'primary.dark', color: 'white' }}
                  />
                  <Chip
                    icon={<Star fontSize="small" />}
                    label="Best Tech 2023"
                    size="small"
                    sx={{ bgcolor: 'primary.dark', color: 'white' }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'grey.300',
                        border: '1px solid',
                        borderColor: 'grey.700',
                        '&:hover': {
                          color: 'secondary.light',
                          borderColor: 'secondary.light',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Quick Links Column */}
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.light' }}>
                Quick Links
              </Typography>
              <List dense>
                {quickLinks.map((link, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <ArrowForward fontSize="small" sx={{ color: 'primary.light' }} />
                    </ListItemIcon>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: 'grey.300',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'secondary.light',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.text}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Company Column */}
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.light' }}>
                Company
              </Typography>
              <List dense>
                {companyLinks.map((link, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <Business fontSize="small" sx={{ color: 'primary.light' }} />
                    </ListItemIcon>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: 'grey.300',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'secondary.light',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.text}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          {/* Contact Information */}
          {/* <Box sx={{ mt: 6, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocationOn sx={{ color: 'secondary.light', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      Headquarters
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                      123 Tech Street, Innovation City
                      <br />
                      Silicon Valley, CA 94000
                      <br />
                      United States
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Phone sx={{ color: 'secondary.light', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      Contact Numbers
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                      Sales: +1 (555) 123-4567
                      <br />
                      Support: +1 (555) 987-6543
                      <br />
                      Emergency: +1 (555) 789-0123
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Email sx={{ color: 'secondary.light', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      Email Addresses
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                      General: info@excellenceallegiance.com
                      <br />
                      Support: support@excellenceallegiance.com
                      <br />
                      Careers: careers@excellenceallegiance.com
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box> */}

          <Divider sx={{ borderColor: 'grey.700', my: 4 }} />

          {/* Bottom Footer */}
          <Grid container spacing={15} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                © {currentYear} Excellence Allegiance Pvt Ltd. All rights reserved.
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', color: 'grey.500', mt: 0.5 }}>
                Empowering businesses through technology and innovation.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { md: 'flex-end' }, flexWrap: 'wrap', gap: 2 }}>
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'secondary.light',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Trust Badges */}
          {/* <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle sx={{ color: '#4CAF50', fontSize: '1.2rem' }} />
                <Typography variant="caption" sx={{ color: 'grey.400' }}>
                  SSL Secured
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Payment sx={{ color: '#2196F3', fontSize: '1.2rem' }} />
                <Typography variant="caption" sx={{ color: 'grey.400' }}>
                  Secure Payments
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShipping sx={{ color: '#FF9800', fontSize: '1.2rem' }} />
                <Typography variant="caption" sx={{ color: 'grey.400' }}>
                  Global Delivery
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SupportAgent sx={{ color: '#9C27B0', fontSize: '1.2rem' }} />
                <Typography variant="caption" sx={{ color: 'grey.400' }}>
                  24/7 Support
                </Typography>
              </Box>
            </Box>
          </Box> */}
        </Container>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {subscriptionSuccess
            ? 'Thank you for subscribing to our newsletter!'
            : 'Subscription failed. Please try again.'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Footer;