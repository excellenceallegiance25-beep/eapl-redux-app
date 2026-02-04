import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Button,
  IconButton,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Divider,
  Fade,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Timeline,
  People,
  AttachMoney,
  CalendarToday,
  AccessTime,
  CheckCircle,
  Error,
  Warning,
  Pending,
  Person,
  Phone,
  Email,
  LocationOn,
  Language,
  Business,
  ConnectWithoutContact,
  Speed,
  Star,
  TrendingUp,
  Security,
  Cloud,
  Code,
  DesignServices,
  Analytics,
  Support,
  Web,
  Smartphone,
  Storage,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { getApplicationServicesList } from '../../services/AppConfigAction';

// Service icons mapping
const serviceIcons = {
  'Cloud': Cloud,
  'Development': Code,
  'Security': Security,
  'Analytics': Analytics,
  'Mobile': Smartphone,
  'Transformation': Business,
  'IoT': Web,
  'Blockchain': Storage,
  'Design': DesignServices,
  'Support': Support,
  'Default': Cloud,
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [serviceData, setServiceData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch services list from your API/Redux
        const result = await dispatch(getApplicationServicesList());

        if (result?.type === 'APPCONFIG_INIT') {
          // Find the specific service by ID
          const foundService = result.payload.find(
            service => String(service.id) === String(serviceId)
          );

          if (foundService) {
            setServiceData(foundService);

            // In a real app, you would fetch related team members and partners
            // based on the service ID from separate API calls
            // For now, we'll use mock data or simulate
            simulateRelatedData(foundService);
          } else {
            setError('Service not found');
          }
        } else {
          setError('Failed to load service data');
        }
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError('Error loading service details');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId, dispatch]);

  const simulateRelatedData = (service) => {
    // Mock team members data (in real app, fetch from API)
    const mockTeamMembers = [
      {
        id: 1,
        name: "Alex Johnson",
        role: "Lead Engineer",
        avatar: "AJ",
        status: "online",
        email: "alex@company.com",
        expertise: ["Architecture", "DevOps", "Cloud"],
        rating: 4.8
      },
      {
        id: 2,
        name: "Sarah Chen",
        role: "Security Specialist",
        avatar: "SC",
        status: "online",
        email: "sarah@company.com",
        expertise: ["Security", "Compliance", "Audit"],
        rating: 4.9
      },
      {
        id: 3,
        name: "Mike Wilson",
        role: "Support Engineer",
        avatar: "MW",
        status: "away",
        email: "mike@company.com",
        expertise: ["Support", "Maintenance", "Monitoring"],
        rating: 4.7
      }
    ];

    // Mock partners data
    const mockPartners = [
      {
        id: 101,
        name: "Amazon Web Services",
        type: "Cloud Provider",
        logo: "AWS",
        partnership: "Strategic Partner",
        since: "2022"
      },
      {
        id: 102,
        name: "Microsoft",
        type: "Technology Partner",
        logo: "MS",
        partnership: "Gold Partner",
        since: "2021"
      }
    ];

    setTeamMembers(mockTeamMembers);
    setPartners(mockPartners);
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return <CheckCircle color="success" />;
      case 'active':
      case 'in-progress': return <Timeline color="primary" />;
      case 'pending': return <Pending color="warning" />;
      case 'inactive': return <Error color="error" />;
      default: return <Warning color="info" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'active': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'warning';
      case 'inactive': return 'error';
      default: return 'info';
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getIconColor = (category) => {
    const colors = {
      'Cloud': '#2196F3',
      'Development': '#673AB7',
      'Security': '#F44336',
      'Analytics': '#4CAF50',
      'Mobile': '#FF9800',
      'Transformation': '#009688',
      'IoT': '#9C27B0',
      'Blockchain': '#795548',
      'Design': '#E91E63',
      'Support': '#00BCD4',
      'Default': '#2196F3'
    };
    return colors[category] || colors['Default'];
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}>
        <Box textAlign="center">
          <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h6" color="text.secondary">
            Loading service details...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error || !serviceData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Fade in>
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <Error sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="error">
              {error || 'Service not found'}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The service you're looking for doesn't exist or may have been removed.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/services')}
              startIcon={<ArrowBack />}
              sx={{ mt: 2 }}
            >
              Back to Services
            </Button>
          </Paper>
        </Fade>
      </Container>
    );
  }

  const IconComponent = serviceIcons[serviceData.category] || serviceIcons.Default;
  const iconColor = getIconColor(serviceData.category);

  return (
    <Fade in={!loading}>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* Header Section */}
        <Paper sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${iconColor}15 0%, ${iconColor}05 100%)`,
          borderLeft: `6px solid ${iconColor}`,
        }}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={3}>
            <Box flex={1} minWidth={300}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <IconButton
                  onClick={() => navigate('/services')}
                  sx={{
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <ArrowBack />
                </IconButton>
                <Typography variant="h4" fontWeight="bold" component="h1">
                  {serviceData.title}
                </Typography>
              </Box>

              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 3 }}>
                {serviceData.description}
              </Typography>

              <Grid container spacing={3}>
                {/* <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      STATUS
                    </Typography>
                    <Chip
                      icon={getStatusIcon(serviceData.status)}
                      label={serviceData.status?.toUpperCase()}
                      color={getStatusColor(serviceData.status)}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Grid> */}

                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      CATEGORY
                    </Typography>
                    <Chip
                      icon={<IconComponent sx={{ fontSize: 16 }} />}
                      label={serviceData.category}
                      sx={{
                        bgcolor: `${iconColor}20`,
                        color: iconColor,
                        fontWeight: 600
                      }}
                    />
                  </Box>
                </Grid>

                {/* <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      PRICE
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {'$' + serviceData.price || 'Custom Quote'}
                    </Typography>
                  </Box>
                </Grid> */}

                {/* <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      PROGRESS
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box flex={1}>
                        <LinearProgress
                          variant="determinate"
                          value={serviceData.progress || 0}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: `${iconColor}20`,
                            '& .MuiLinearProgress-bar': {
                              bgcolor: iconColor,
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body1" fontWeight="bold">
                        {serviceData.progress || 0}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid> */}
              </Grid>
            </Box>

            <Avatar sx={{
              width: 120,
              height: 120,
              bgcolor: iconColor,
              fontSize: 40
            }}>
              <IconComponent sx={{ fontSize: 60 }} />
            </Avatar>
          </Box>
        </Paper>

        {/* Tabs Navigation */}
        {/* <Paper sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            sx={{
              '& .MuiTab-root': {
                minHeight: 60,
                fontSize: '0.95rem',
                fontWeight: 500,
              }
            }}
          >
            <Tab icon={<Timeline />} label="Overview" />
            <Tab icon={<People />} label={`Team (${teamMembers.length})`} />
            <Tab icon={<ConnectWithoutContact />} label={`Partners (${partners.length})`} />
            <Tab icon={<AttachMoney />} label="Pricing & Budget" />
            <Tab icon={<Speed />} label="Performance" />
          </Tabs>
        </Paper> */}

        {/* Tab Content */}
        <Box sx={{ mb: 4 }}>
          {activeTab === 0 && (
            <Grid container spacing={4}>
              {/* Service Details Card */}
              <Grid item xs={12} md={8}>
                <Card sx={{ height: '100%', borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                      Service Overview
                    </Typography>

                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
                      {serviceData.details || serviceData.description}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                      Key Features
                    </Typography>
                    <Grid container spacing={2}>
                      {serviceData.features?.split(',').map((feature, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: `${iconColor}08`,
                            border: `1px solid ${iconColor}20`,
                          }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Star sx={{ color: iconColor, fontSize: 20 }} />
                              <Typography fontWeight="medium">
                                {feature.trim()}
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>

                    {/* <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                      Timeline
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2, borderRadius: 2 }}>
                          <Box display="flex" alignItems="center" gap={2}>
                            <CalendarToday sx={{ color: iconColor }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Start Date
                              </Typography>
                              <Typography fontWeight="medium">
                                {serviceData.startDate || 'Not specified'}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2, borderRadius: 2 }}>
                          <Box display="flex" alignItems="center" gap={2}>
                            <CalendarToday sx={{ color: iconColor }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                End Date
                              </Typography>
                              <Typography fontWeight="medium">
                                {serviceData.endDate || 'Not specified'}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid> */}
                  </CardContent>
                </Card>
              </Grid>

              {/* Contact & Quick Info Card */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 1 }}>
                      Contact Information
                    </Typography>

                    <List disablePadding>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Person sx={{ color: iconColor }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Contact Person"
                          secondary={
                            <Typography fontWeight="medium" color="text.primary">
                              {serviceData.contactPerson || 'Excellence HR'}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Email sx={{ color: iconColor }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email Address"
                          secondary={
                            <Typography fontWeight="medium" color="text.primary">
                              {serviceData.contactEmail || 'eapl.techhub@gmail.com'}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Phone sx={{ color: iconColor }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phone Number"
                          secondary={
                            <Typography fontWeight="medium" color="text.primary">
                              {serviceData.contactPhone || '+91 6289534780'}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <LocationOn sx={{ color: iconColor }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Location"
                          secondary={
                            <Typography fontWeight="medium" color="text.primary">
                              {serviceData.location || '1st floor, 1/16, Basanta Rd., Nitai Nagar, Mukundapur, Kolkata, West Bengal 700099'}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>

                    {/* <Divider sx={{ my: 3 }} /> */}

                    {/* <Typography variant="h6" gutterBottom fontWeight="bold">
                      Additional Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Client Company
                        </Typography>
                        <Typography fontWeight="medium">
                          {serviceData.client || 'Not specified'}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Service Duration
                        </Typography>
                        <Typography fontWeight="medium">
                          {serviceData.duration || 'Not specified'}
                        </Typography>
                      </Box>
                      {serviceData.website && (
                        <Box>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Language />}
                            href={serviceData.website}
                            target="_blank"
                            sx={{ mt: 1 }}
                          >
                            Visit Client Website
                          </Button>
                        </Box>
                      )}
                    </Stack> */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Team Tab */}
          {activeTab === 1 && (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                  Team Members
                </Typography>

                {teamMembers.length > 0 ? (
                  <Grid container spacing={3}>
                    {teamMembers.map((member) => (
                      <Grid item xs={12} sm={6} md={4} key={member.id}>
                        <Paper sx={{
                          p: 3,
                          borderRadius: 3,
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4,
                          }
                        }}>
                          <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Avatar sx={{
                              bgcolor: iconColor,
                              width: 56,
                              height: 56,
                              fontSize: 20
                            }}>
                              {member.avatar}
                            </Avatar>
                            <Box flex={1}>
                              <Typography variant="h6" fontWeight="bold">
                                {member.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {member.role}
                              </Typography>
                            </Box>
                          </Box>

                          <Box mb={2}>
                            <Chip
                              label={member.status}
                              size="small"
                              color={member.status === 'online' ? 'success' : 'default'}
                              sx={{ mb: 2 }}
                            />
                          </Box>

                          <Typography variant="body2" color="text.secondary" paragraph>
                            {member.email}
                          </Typography>

                          <Typography variant="subtitle2" gutterBottom>
                            Expertise:
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                            {member.expertise?.map((skill, idx) => (
                              <Chip
                                key={idx}
                                label={skill}
                                size="small"
                                variant="outlined"
                                sx={{ borderColor: iconColor }}
                              />
                            ))}
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    No team members assigned to this service.
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Partners Tab */}
          {activeTab === 2 && (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                  Partners & Collaborators
                </Typography>

                {partners.length > 0 ? (
                  <Grid container spacing={3}>
                    {partners.map((partner) => (
                      <Grid item xs={12} md={6} key={partner.id}>
                        <Paper sx={{
                          p: 3,
                          borderRadius: 3,
                          height: '100%',
                          border: `2px solid ${iconColor}30`,
                        }}>
                          <Box display="flex" alignItems="center" gap={3} mb={2}>
                            <Avatar sx={{
                              bgcolor: iconColor,
                              width: 60,
                              height: 60,
                              fontSize: 24,
                              fontWeight: 'bold'
                            }}>
                              {partner.logo}
                            </Avatar>
                            <Box flex={1}>
                              <Typography variant="h6" fontWeight="bold">
                                {partner.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {partner.type}
                              </Typography>
                            </Box>
                          </Box>

                          <Box mb={3}>
                            <Chip
                              label={partner.partnership}
                              sx={{
                                bgcolor: `${iconColor}20`,
                                color: iconColor,
                                fontWeight: 600
                              }}
                            />
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Partnership Since
                              </Typography>
                              <Typography variant="body1" fontWeight="medium">
                                {partner.since}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                fullWidth
                                variant="contained"
                                sx={{ bgcolor: iconColor }}
                                onClick={() => {/* Add partner details action */ }}
                              >
                                View Details
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    No partners for this service.
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Pricing & Budget Tab */}
          {activeTab === 3 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                      Financial Overview
                    </Typography>

                    <List disablePadding>
                      <ListItem sx={{ px: 0, py: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 44 }}>
                          <AttachMoney sx={{ color: iconColor, fontSize: 28 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="h6" color="primary" fontWeight="bold">
                              {serviceData.price || 'Custom Quote'}
                            </Typography>
                          }
                          secondary="Service Price"
                        />
                      </ListItem>

                      <ListItem sx={{ px: 0, py: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 44 }}>
                          <TrendingUp sx={{ color: iconColor, fontSize: 28 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="h6" fontWeight="bold">
                              {serviceData.budget || 'Not specified'}
                            </Typography>
                          }
                          secondary="Total Budget"
                        />
                      </ListItem>

                      <ListItem sx={{ px: 0, py: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 44 }}>
                          <AttachMoney sx={{ color: iconColor, fontSize: 28 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="h6" fontWeight="bold">
                              {serviceData.spent || 'Not specified'}
                            </Typography>
                          }
                          secondary="Amount Spent"
                        />
                      </ListItem>
                    </List>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary" align="center">
                        * All prices are exclusive of taxes. Final pricing may vary based on project requirements.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                      Duration & Timeline
                    </Typography>

                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                          PROJECT DURATION
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color={iconColor}>
                          {serviceData.duration || 'Not specified'}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                          Timeline Breakdown
                        </Typography>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Start Date
                            </Typography>
                            <Typography fontWeight="medium">
                              {serviceData.startDate || 'Not specified'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              End Date
                            </Typography>
                            <Typography fontWeight="medium">
                              {serviceData.endDate || 'Not specified'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                          Current Status
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                          <LinearProgress
                            variant="determinate"
                            value={serviceData.progress || 0}
                            sx={{
                              flex: 1,
                              height: 10,
                              borderRadius: 5,
                              bgcolor: `${iconColor}20`,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: iconColor,
                              }
                            }}
                          />
                          <Typography variant="body1" fontWeight="bold">
                            {serviceData.progress || 0}%
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Performance Tab */}
          {activeTab === 4 && (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                  Service Performance
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
                      <Typography variant="h2" fontWeight="bold" color={iconColor}>
                        {serviceData.progress || 0}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completion Rate
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
                      <Typography variant="h2" fontWeight="bold" color="success.main">
                        4.8
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Client Rating
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
                      <Typography variant="h2" fontWeight="bold" color="warning.main">
                        98%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Uptime
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
                      <Typography variant="h2" fontWeight="bold" color="info.main">
                        24/7
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Support
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Footer Actions */}
        {/* <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/services')}
            startIcon={<ArrowBack />}
          >
            Back to Services
          </Button>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Edit />}
              sx={{ bgcolor: iconColor }}
              onClick={() => navigate(`/services/${serviceId}/edit`)}
            >
              Edit Service
            </Button>
            <Button
              variant="outlined"
              startIcon={<Language />}
              onClick={() => window.open(serviceData.website || '#', '_blank')}
              disabled={!serviceData.website}
            >
              Visit Website
            </Button>
          </Stack>
        </Box> */}
      </Container>
    </Fade>
  );
};

export default ServiceDetails;