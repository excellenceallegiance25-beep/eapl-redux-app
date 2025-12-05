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
  VerifiedUser,
  Email,
  Phone,
  LocationOn,
  ExpandMore,
  ExpandLess,
  Menu
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
  Typography,
  useMediaQuery,
  Collapse,
  Button,
  Drawer,
  ListItemText,
  AppBar,
  Toolbar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Media queries for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(4);

  // Adjust visible columns based on screen size
  useEffect(() => {
    if (isMobile) {
      setVisibleColumns(1);
      setExpandedSections({});
    } else if (isTablet) {
      setVisibleColumns(2);
    } else {
      setVisibleColumns(4);
    }
  }, [isMobile, isTablet]);

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const quickLinks = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about' },
    { text: 'Services', path: '/services' },
    { text: 'Products', path: '/products' },
    { text: 'Blog', path: '/blog' },
    { text: 'Contact Us', path: '/contact' },
    { text: 'FAQ', path: '/faq' },
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

  const contactInfo = {
    headquarters: [
      '123 Tech Street, Innovation City',
      'Silicon Valley, CA 94000',
      'United States'
    ],
    phones: [
      'Sales: +1 (555) 123-4567',
      'Support: +1 (555) 987-6543',
      'Emergency: +1 (555) 789-0123'
    ],
    emails: [
      'General: info@excellenceallegiance.com',
      'Support: support@excellenceallegiance.com',
      'Careers: careers@excellenceallegiance.com'
    ]
  };

  // Mobile drawer content
  const MobileFooterDrawer = () => (
    <Drawer
      anchor="bottom"
      open={mobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      PaperProps={{
        sx: {
          height: '70vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: 'grey.900',
          color: 'white',
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.light' }}>
            Excellence Allegiance Pvt Ltd
          </Typography>
          <IconButton onClick={() => setMobileDrawerOpen(false)} sx={{ color: 'white' }}>
            <ExpandMore />
          </IconButton>
        </Box>

        {/* Quick Links */}
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            onClick={() => toggleSection('quickLinks')}
            sx={{
              justifyContent: 'space-between',
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Quick Links
            {expandedSections.quickLinks ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={expandedSections.quickLinks}>
            <List>
              {quickLinks.map((link, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'grey.300',
                      textDecoration: 'none',
                      '&:hover': { color: 'secondary.light' },
                    }}
                  >
                    {link.text}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>

        {/* Company Links */}
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            onClick={() => toggleSection('companyLinks')}
            sx={{
              justifyContent: 'space-between',
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Company
            {expandedSections.companyLinks ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={expandedSections.companyLinks}>
            <List>
              {companyLinks.map((link, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'grey.300',
                      textDecoration: 'none',
                      '&:hover': { color: 'secondary.light' },
                    }}
                  >
                    {link.text}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>

        {/* Social Links */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
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
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Contact Info */}
        <Box>
          <Button
            fullWidth
            onClick={() => toggleSection('contactInfo')}
            sx={{
              justifyContent: 'space-between',
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Contact Information
            {expandedSections.contactInfo ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={expandedSections.contactInfo}>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOn sx={{ color: 'secondary.light', fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  {contactInfo.headquarters[0]}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Phone sx={{ color: 'secondary.light', fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  {contactInfo.phones[0]}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'secondary.light', fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  {contactInfo.emails[0]}
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Drawer>
  );

  // Responsive grid configuration
  const getGridConfig = () => {
    if (isMobile) return { xs: 12 };
    if (isTablet) return { xs: 12, sm: 6, md: 3 };
    return { xs: 12, md: 3 };
  };

  return (
    <>
      {/* Mobile Footer Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            top: 'auto',
            bottom: 0,
            backgroundColor: 'grey.900',
            color: 'white',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ color: 'grey.300' }}>
              © {currentYear} Excellence Allegiance
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ color: 'white' }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Main Footer Content (hidden on mobile, shown on tablet/desktop) */}
      {!isMobile && (
        <Box
          component="footer"
          sx={{
            backgroundColor: 'grey.900',
            color: 'white',
            pt: { xs: 4, md: 6 },
            pb: { xs: 8, md: 4 },
            mt: 'auto',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
              {/* Company Info Column */}
              <Grid item xs={12} md={visibleColumns >= 4 ? 4 : 6}>
                <Box sx={{ mb: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant={isTablet ? "h6" : "h5"} 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'secondary.light',
                      fontSize: { xs: '1.1rem', md: '1.5rem' }
                    }}
                  >
                    Excellence Allegiance Pvt Ltd
                  </Typography>
                  <Typography 
                    variant="body2" 
                    paragraph 
                    sx={{ 
                      color: 'grey.300',
                      fontSize: { xs: '0.875rem', md: '0.9rem' }
                    }}
                  >
                    {isMobile ? 'Digital transformation pioneers' : 
                     isTablet ? 'Pioneering digital transformation with innovative solutions' :
                     'Pioneering digital transformation with cutting-edge technology solutions and innovative software development since 2010.'}
                  </Typography>
                </Box>

                {isDesktop && (
                  <>
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
                  </>
                )}

                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Follow Us
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    flexWrap: isMobile ? 'wrap' : 'nowrap'
                  }}>
                    {socialLinks.slice(0, isMobile ? 4 : 6).map((social, index) => (
                      <IconButton
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        size={isMobile ? "small" : "medium"}
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

              {/* Quick Links Column - Conditional rendering */}
              {visibleColumns >= 2 && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'secondary.light',
                      fontSize: { xs: '0.95rem', md: '1.1rem' }
                    }}
                  >
                    Quick Links
                  </Typography>
                  <List dense>
                    {quickLinks.slice(0, isMobile ? 4 : quickLinks.length).map((link, index) => (
                      <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: isMobile ? 20 : 30 }}>
                          <ArrowForward fontSize="small" sx={{ color: 'primary.light' }} />
                        </ListItemIcon>
                        <Link
                          component={RouterLink}
                          to={link.path}
                          sx={{
                            color: 'grey.300',
                            textDecoration: 'none',
                            fontSize: { xs: '0.8rem', md: '0.875rem' },
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
              )}

              {/* Company Column - Conditional rendering */}
              {visibleColumns >= 3 && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'secondary.light',
                      fontSize: { xs: '0.95rem', md: '1.1rem' }
                    }}
                  >
                    Company
                  </Typography>
                  <List dense>
                    {companyLinks.slice(0, isMobile ? 4 : companyLinks.length).map((link, index) => (
                      <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: isMobile ? 20 : 30 }}>
                          <Business fontSize="small" sx={{ color: 'primary.light' }} />
                        </ListItemIcon>
                        <Link
                          component={RouterLink}
                          to={link.path}
                          sx={{
                            color: 'grey.300',
                            textDecoration: 'none',
                            fontSize: { xs: '0.8rem', md: '0.875rem' },
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
              )}

              {/* Support Column - Only on desktop */}
              {/* {isDesktop && visibleColumns >= 4 && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.light' }}>
                    Support
                  </Typography>
                  <List dense>
                    {supportLinks.slice(0, 4).map((link, index) => (
                      <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <ArrowForward fontSize="small" sx={{ color: 'primary.light' }} />
                        </ListItemIcon>
                        <Link
                          component={RouterLink}
                          to={link.path}
                          sx={{
                            color: 'grey.300',
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
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )} */}

              {/* Contact Info Column for Tablet */}
              {isTablet && visibleColumns >= 2 && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.light' }}>
                    Contact
                  </Typography>
                  <Box sx={{ color: 'grey.300', fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                      <LocationOn sx={{ color: 'secondary.light', mt: 0.3, fontSize: '1rem' }} />
                      <Box>
                        <Typography variant="body2">
                          {contactInfo.headquarters[0]}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Phone sx={{ color: 'secondary.light', mt: 0.3, fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {contactInfo.phones[0]}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>

            <Divider sx={{ borderColor: 'grey.700', my: { xs: 3, md: 4 } }} />

            {/* Bottom Footer */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'grey.400',
                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                  }}
                >
                  © {currentYear} Excellence Allegiance Pvt Ltd. All rights reserved.
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block', 
                    color: 'grey.500', 
                    mt: 0.5,
                    fontSize: { xs: '0.7rem', md: '0.75rem' }
                  }}
                >
                  Empowering businesses through technology and innovation.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: { xs: 'flex-start', md: 'flex-end' }, 
                  flexWrap: 'wrap', 
                  gap: { xs: 1, md: 2 }
                }}>
                  {legalLinks.slice(0, isMobile ? 3 : legalLinks.length).map((link, index) => (
                    <Link
                      key={index}
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: 'grey.400',
                        textDecoration: 'none',
                        fontSize: { xs: '0.7rem', md: '0.875rem' },
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

            {/* Certifications for Mobile/Tablet */}
            {/* {(isMobile || isTablet) && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'grey.400', display: 'block', mb: 1 }}>
                  Certifications:
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<VerifiedUser fontSize="small" />}
                    label="ISO 27001"
                    size="small"
                    sx={{ bgcolor: 'primary.dark', color: 'white' }}
                  />
                  <Chip
                    icon={<Security fontSize="small" />}
                    label="GDPR"
                    size="small"
                    sx={{ bgcolor: 'primary.dark', color: 'white' }}
                  />
                </Box>
              </Box>
            )} */}
          </Container>
        </Box>
      )}

      {/* Mobile Footer Drawer */}
      <MobileFooterDrawer />

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
          Thank you for subscribing to our newsletter!
        </Alert>
      </Snackbar>

      {/* Mobile spacing to prevent content from being hidden behind fixed footer */}
      {isMobile && <Box sx={{ height: '56px' }} />}
    </>
  );
};

export default Footer;