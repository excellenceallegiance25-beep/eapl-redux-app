import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore,
  Cloud,
  Code,
  Security,
  Smartphone,
  Analytics,
  Rocket,
  Settings,
  SupportAgent,
  Storage,
  Api,
  CheckCircle,
} from '@mui/icons-material';
import PageHeader from '../components/common/PageHeader';

const Services = () => {
  const [tabValue, setTabValue] = useState(0);

  const services = [
    {
      icon: <Cloud fontSize="large" />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services',
      features: ['AWS/Azure/GCP', 'Cloud Migration', 'Serverless Architecture', 'Cost Optimization'],
      details: 'We provide end-to-end cloud solutions including migration strategy, implementation, and ongoing management.',
    },
    {
      icon: <Code fontSize="large" />,
      title: 'Custom Software Development',
      description: 'Tailored software solutions for your business needs',
      features: ['Web Applications', 'Enterprise Software', 'API Development', 'Microservices'],
      details: 'From concept to deployment, we build robust and scalable software solutions.',
    },
    {
      icon: <Security fontSize="large" />,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions and compliance',
      features: ['Penetration Testing', 'Security Audits', 'Compliance', 'Threat Monitoring'],
      details: 'Protect your digital assets with our advanced security solutions.',
    },
    {
      icon: <Smartphone fontSize="large" />,
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications',
      features: ['iOS & Android', 'React Native', 'Flutter', 'PWA'],
      details: 'Build engaging mobile experiences with our expert development team.',
    },
    {
      icon: <Analytics fontSize="large" />,
      title: 'Data Analytics & AI',
      description: 'Transform data into actionable insights',
      features: ['Business Intelligence', 'Machine Learning', 'Data Visualization', 'Predictive Analytics'],
      details: 'Leverage the power of data with our analytics and AI solutions.',
    },
    {
      icon: <Rocket fontSize="large" />,
      title: 'Digital Transformation',
      description: 'Complete digital overhaul for businesses',
      features: ['Strategy Consulting', 'Process Automation', 'Legacy Modernization', 'Change Management'],
      details: 'Guide your business through digital transformation with our proven methodologies.',
    },
  ];

  const servicePackages = [
    {
      name: 'Basic',
      price: '$2,999',
      period: '/month',
      features: ['Up to 5 Users', 'Basic Support', '10GB Storage', 'Standard Security'],
      recommended: false,
    },
    {
      name: 'Professional',
      price: '$5,999',
      period: '/month',
      features: ['Up to 20 Users', 'Priority Support', '100GB Storage', 'Advanced Security', 'API Access'],
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: '$12,999',
      period: '/month',
      features: ['Unlimited Users', '24/7 Support', '1TB Storage', 'Enterprise Security', 'Custom Solutions'],
      recommended: false,
    },
  ];

  const processSteps = [
    { step: '1', title: 'Discovery', description: 'Understand your requirements and goals' },
    { step: '2', title: 'Planning', description: 'Create detailed project roadmap and architecture' },
    { step: '3', title: 'Development', description: 'Build, test, and iterate on the solution' },
    { step: '4', title: 'Deployment', description: 'Launch and monitor the implementation' },
    { step: '5', title: 'Support', description: 'Ongoing maintenance and optimization' },
  ];

  return (
    <Box>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive technology solutions for modern businesses"
        breadcrumbs={[{ label: 'Services', path: '/services' }]}
      />

      <Container maxWidth="lg">
        {/* Service Tabs */}
        <Paper sx={{ mb: 6, borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<Cloud />} label="Cloud" />
            <Tab icon={<Code />} label="Development" />
            <Tab icon={<Security />} label="Security" />
            <Tab icon={<Smartphone />} label="Mobile" />
            <Tab icon={<Analytics />} label="Analytics" />
            <Tab icon={<Rocket />} label="Transformation" />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {services[tabValue].title}
            </Typography>
            <Typography variant="body1" paragraph>
              {services[tabValue].details}
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {services[tabValue].features.map((feature, index) => (
                <Grid item key={index}>
                  <Chip label={feature} color="primary" variant="outlined" />
                </Grid>
              ))}
            </Grid>
            
            <Button variant="contained" sx={{ mt: 3 }} startIcon={<Settings />}>
              Get Started
            </Button>
          </Box>
        </Paper>

        {/* All Services Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            All Services
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Explore our comprehensive service offerings
          </Typography>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                  <CardContent>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mb: 3,
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {service.description}
                    </Typography>
                    
                    <List dense>
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Service Packages */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Service Packages
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Choose the perfect plan for your business needs
          </Typography>

          <Grid container spacing={4}>
            {servicePackages.map((pkg, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    border: pkg.recommended ? '2px solid' : 'none',
                    borderColor: 'primary.main',
                  }}
                >
                  {pkg.recommended && (
                    <Chip
                      label="Most Popular"
                      color="primary"
                      sx={{ position: 'absolute', top: 16, right: 16 }}
                    />
                  )}
                  <CardContent sx={{ textAlign: 'center', pt: pkg.recommended ? 6 : 4 }}>
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                      {pkg.name}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h2" component="span" fontWeight="bold">
                        {pkg.price}
                      </Typography>
                      <Typography variant="h6" component="span" color="text.secondary">
                        {pkg.period}
                      </Typography>
                    </Box>
                    
                    <List>
                      {pkg.features.map((feature, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon sx={{ minWidth: 30, justifyContent: 'center' }}>
                            <CheckCircle color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button
                      fullWidth
                      variant={pkg.recommended ? 'contained' : 'outlined'}
                      size="large"
                      sx={{ mt: 3 }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Process */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Our Process
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        margin: '0 auto 20px',
                      }}
                    >
                      {step.step}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Frequently Asked Questions
          </Typography>
          
          {[
            {
              question: 'What is your typical project timeline?',
              answer: 'Project timelines vary based on complexity. Small projects typically take 4-8 weeks, while enterprise solutions can take 3-6 months.',
            },
            {
              question: 'Do you provide ongoing support?',
              answer: 'Yes, we offer various support packages including 24/7 monitoring, regular maintenance, and emergency support.',
            },
            {
              question: 'Can you work with our existing infrastructure?',
              answer: 'Absolutely. We specialize in integrating with legacy systems and modernizing existing infrastructure.',
            },
            {
              question: 'What industries do you serve?',
              answer: 'We serve clients across various industries including finance, healthcare, retail, manufacturing, and technology.',
            },
          ].map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="bold">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;