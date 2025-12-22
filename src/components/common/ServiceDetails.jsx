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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Download,
  Share,
  Timeline,
  People,
  AttachMoney,
  CalendarToday,
  AccessTime,
  CheckCircle,
  Error,
  Warning,
  Pending,
  Comment,
  Attachment,
  Person,
  Phone,
  Email,
  LocationOn,
  Cloud,
  Code,
  DesignServices,
  Analytics,
  Support,
  Web,
  Smartphone,
  Storage,
  Security,
  Save,
  Close,
  Language,
  Business,
  ConnectWithoutContact,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
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

// ========== INDEPENDENT ARRAYS ==========

// Service Details Array (enhanced version of your DB data)
const servicesArray = [
  {
    id: 1,
    title: "Cloud Solutions",
    description: "Enterprise cloud infrastructure with auto-scaling and global CDN.",
    icon: "☁️",
    color: "#2196F3",
    features: "AWS/Azure,Migration,DevOps",
    category: "Cloud",
    details: "We provide end-to-end cloud solutions including migration strategy, implementation, and ongoing management. Our team ensures 99.9% uptime and optimal performance.",
    price: "$5000/month",
    duration: "Ongoing",
    status: "active",
    progress: 85,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: "$45,200",
    spent: "$38,420",
    teamLead: "Alex Johnson",
    client: "TechCorp Inc.",
    priority: "high",
    contactPerson: "John Smith",
    contactEmail: "john@techcorp.com",
    contactPhone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://techcorp.com",
    serviceTeam: [1, 2, 3], // References teamMembers array IDs
    servicePartners: [101, 102], // References partners array IDs
    externalSources: [
      { type: "website", url: "https://aws.amazon.com/solutions/" },
      { type: "api", url: "https://api.cloudproviders.com/services" }
    ]
  },
  {
    id: 2,
    title: "Software Development",
    description: "Custom applications with modern frameworks and best practices.",
    icon: "💻",
    color: "#673AB7",
    features: "Web Apps,Mobile Apps,APIs",
    category: "Development",
    details: "From concept to deployment, we build robust and scalable software solutions using Agile methodology.",
    price: "$15,000",
    duration: "3 months",
    status: "active",
    progress: 65,
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    budget: "$15,000",
    spent: "$9,750",
    teamLead: "Maria Garcia",
    client: "StartUp Inc.",
    priority: "medium",
    contactPerson: "Jane Doe",
    contactEmail: "jane@startup.com",
    contactPhone: "+1 (555) 987-6543",
    location: "Remote",
    website: "https://startup.com",
    serviceTeam: [4, 5],
    servicePartners: [103]
  },
  {
    id: 3,
    title: "Cybersecurity",
    description: "Complete security solutions with threat detection and compliance.",
    icon: "🔒",
    color: "#F44336",
    features: "Pen Testing,Encryption,Monitoring",
    category: "Security",
    details: "Protect your digital assets with our advanced security solutions including 24/7 monitoring.",
    price: "$8,000/month",
    duration: "Ongoing",
    status: "active",
    progress: 90,
    startDate: "2023-11-01",
    endDate: "2024-10-31",
    budget: "$96,000",
    spent: "$72,000",
    teamLead: "Robert Chen",
    client: "SecureBank Ltd.",
    priority: "high",
    contactPerson: "Mike Johnson",
    contactEmail: "mike@securebank.com",
    contactPhone: "+1 (555) 456-1234",
    location: "Chicago, IL",
    serviceTeam: [6, 7]
  }
];

// Team Members Array (independent)
const teamMembersArray = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Cloud Architect",
    avatar: "AJ",
    status: "online",
    email: "alex@company.com",
    phone: "+1 (555) 111-2222",
    expertise: ["AWS", "Azure", "DevOps"],
    services: [1], // Service IDs they work on
    joinDate: "2020-03-15"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "DevOps Engineer",
    avatar: "SC",
    status: "online",
    email: "sarah@company.com",
    phone: "+1 (555) 222-3333",
    expertise: ["Docker", "Kubernetes", "CI/CD"],
    services: [1],
    joinDate: "2021-06-01"
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Security Specialist",
    avatar: "MW",
    status: "away",
    email: "mike@company.com",
    phone: "+1 (555) 333-4444",
    expertise: ["Security", "Compliance"],
    services: [1, 3],
    joinDate: "2019-11-20"
  },
  {
    id: 4,
    name: "Maria Garcia",
    role: "Project Manager",
    avatar: "MG",
    status: "online",
    email: "maria@company.com",
    phone: "+1 (555) 444-5555",
    expertise: ["Agile", "Scrum", "Project Management"],
    services: [2],
    joinDate: "2022-01-10"
  },
  {
    id: 5,
    name: "Tom Brown",
    role: "Frontend Developer",
    avatar: "TB",
    status: "online",
    email: "tom@company.com",
    phone: "+1 (555) 555-6666",
    expertise: ["React", "JavaScript", "UI/UX"],
    services: [2],
    joinDate: "2023-02-15"
  }
];

// Partners Array (independent)
const partnersArray = [
  {
    id: 101,
    name: "Amazon Web Services",
    type: "Cloud Provider",
    logo: "AWS",
    website: "https://aws.amazon.com",
    contact: "partners@amazon.com",
    partnershipDate: "2020-01-15",
    services: [1], // Service IDs they partner on
    description: "Official AWS partner providing cloud infrastructure solutions"
  },
  {
    id: 102,
    name: "Microsoft Azure",
    type: "Cloud Provider",
    logo: "Azure",
    website: "https://azure.microsoft.com",
    contact: "partner@microsoft.com",
    partnershipDate: "2021-03-20",
    services: [1],
    description: "Microsoft Gold Partner for cloud solutions"
  },
  {
    id: 103,
    name: "GitHub",
    type: "Development Tools",
    logo: "GitHub",
    website: "https://github.com",
    contact: "partnerships@github.com",
    partnershipDate: "2022-05-10",
    services: [2],
    description: "Code repository and collaboration platform partner"
  }
];

// External Sources Array
const externalSourcesArray = [
  {
    id: 1001,
    serviceId: 1,
    type: "documentation",
    url: "https://docs.aws.amazon.com/",
    title: "AWS Documentation",
    lastUpdated: "2024-03-01"
  },
  {
    id: 1002,
    serviceId: 1,
    type: "api",
    url: "https://api.status.cloud/",
    title: "Cloud Status API",
    lastUpdated: "2024-02-15"
  }
];

// ========== COMPONENT ==========

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [serviceData, setServiceData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchServiceData = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(async () => {
        const foundService = servicesArray.find(service => service.id.toString() === serviceId);
        const result = await dispatch(getApplicationServicesList());
        console.log('Configurations loaded successfully');

        if (result?.type === 'APPCONFIG_INIT') {
          const foundServiceapi = result.payload.find(
            service => String(service.id) === String(serviceId)
          );

          setServiceData(foundServiceapi || null);
        }


        if (foundService) {
          // setServiceData(foundService);
          setEditData(foundService);

          // Fetch related team members
          const serviceTeamIds = foundService.serviceTeam || [];
          const relatedTeamMembers = teamMembersArray.filter(member =>
            serviceTeamIds.includes(member.id)
          );
          setTeamMembers(relatedTeamMembers);

          // Fetch related partners
          const servicePartnerIds = foundService.servicePartners || [];
          const relatedPartners = partnersArray.filter(partner =>
            servicePartnerIds.includes(partner.id)
          );
          setPartners(relatedPartners);
        }

        setLoading(false);
      }, 500);
    };

    fetchServiceData();
  }, [serviceId, dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'active':
      case 'in-progress': return <Timeline color="primary" />;
      case 'pending': return <Pending color="warning" />;
      case 'inactive': return <Error color="error" />;
      default: return <Warning color="info" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
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

  const handleEditOpen = () => {
    setEditData(serviceData);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = () => {
    // In real app, this would update the DB via API
    alert('Service updated successfully! (In real app, this would save to database)');
    setServiceData(editData);
    setEditDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchExternalData = () => {
    // Simulate fetching from external API
    const externalSources = externalSourcesArray.filter(source =>
      source.serviceId === serviceData.id
    );

    if (externalSources.length > 0) {
      alert(`Found ${externalSources.length} external sources for this service.\nFirst source: ${externalSources[0].title}`);
    } else {
      alert('No external sources found for this service.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!serviceData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Service not found</Alert>
        <Button onClick={() => navigate('/services')} startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Back to Services
        </Button>
      </Container>
    );
  }

  const IconComponent = serviceIcons[serviceData.category] || serviceIcons.Default;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb Navigation */}
      {/* <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/dashboard" color="inherit">
          Dashboard
        </Link>
        <Link component={RouterLink} to="/services" color="inherit">
          Services
        </Link>
        <Typography color="text.primary">{serviceData.title}</Typography>
      </Breadcrumbs> */}

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <IconButton onClick={() => navigate('/services')}>
                <ArrowBack />
              </IconButton>
              <Avatar sx={{ bgcolor: serviceData.color || 'primary.main' }}>
                <IconComponent />
              </Avatar>
              <Typography variant="h4" fontWeight="bold">
                {serviceData.title}
              </Typography>
              <Chip
                label={serviceData.status}
                color={getStatusColor(serviceData.status)}
                size="small"
              />
            </Box>
            <Typography variant="body1" color="text.secondary" paragraph>
              {serviceData.description}
            </Typography>

            <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" gap={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Category
                </Typography>
                <Chip
                  label={serviceData.category}
                  size="small"
                  sx={{ ml: 1 }}
                  icon={<IconComponent />}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Price
                </Typography>
                <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium', color: 'primary.main' }}>
                  {serviceData.price || 'Custom Quote'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Client
                </Typography>
                <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                  {serviceData.client}
                </Typography>
              </Box>
              {serviceData.website && (
                <Box>
                  <Button
                    size="small"
                    startIcon={<Language />}
                    href={serviceData.website}
                    target="_blank"
                  >
                    Visit Website
                  </Button>
                </Box>
              )}
            </Stack>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<Edit />} onClick={handleEditOpen}>
              Edit
            </Button>
            <Button variant="contained" onClick={fetchExternalData} startIcon={<Language />}>
              Get External Data
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
          <Tab icon={<Timeline />} label="Overview" />
          <Tab icon={<People />} label="Team" />
          <Tab icon={<ConnectWithoutContact />} label="Partners" />
          <Tab icon={<AttachMoney />} label="Finance" />
          <Tab icon={<Comment />} label="Details" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Service Details */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Service Details
                </Typography>
                <Typography paragraph>
                  {serviceData.details}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Features
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {serviceData.features?.split(',').map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature.trim()}
                      variant="outlined"
                      sx={{ backgroundColor: serviceData.color + '20' }}
                    />
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Progress
                </Typography>
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Completion
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {serviceData.progress || 0}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={serviceData.progress || 0}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact & Dates */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Contact & Schedule
                </Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText
                      primary="Contact"
                      secondary={serviceData.contactPerson || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={serviceData.contactEmail || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={serviceData.contactPhone || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={serviceData.location || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary="Start Date"
                      secondary={serviceData.startDate || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary="End Date"
                      secondary={serviceData.endDate || 'Not specified'}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Team Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Team Members
                </Typography>
                {teamMembers.length > 0 ? (
                  <Grid container spacing={3}>
                    {teamMembers.map((member) => (
                      <Grid item xs={12} sm={6} md={4} key={member.id}>
                        <Paper sx={{ p: 2 }}>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: serviceData.color || 'primary.main' }}>
                              {member.avatar}
                            </Avatar>
                            <Box>
                              <Typography fontWeight="bold">
                                {member.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {member.role}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {member.email}
                              </Typography>
                              <Stack direction="row" spacing={1} mt={1}>
                                <Chip
                                  label={member.status}
                                  size="small"
                                  color={member.status === 'online' ? 'success' : 'default'}
                                />
                                {member.expertise?.slice(0, 2).map((skill, idx) => (
                                  <Chip key={idx} label={skill} size="small" variant="outlined" />
                                ))}
                              </Stack>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary">No team members assigned</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Partners Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Partners & Collaborators
                </Typography>
                {partners.length > 0 ? (
                  <Grid container spacing={3}>
                    {partners.map((partner) => (
                      <Grid item xs={12} sm={6} md={4} key={partner.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {partner.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {partner.description}
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                              Type: {partner.type}
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                              Partner since: {partner.partnershipDate}
                            </Typography>
                            <Button
                              size="small"
                              href={partner.website}
                              target="_blank"
                              startIcon={<Language />}
                            >
                              Visit Website
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary">No partners for this service</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Finance Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Budget Summary
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoney />
                    </ListItemIcon>
                    <ListItemText
                      primary="Total Budget"
                      secondary={serviceData.budget || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoney />
                    </ListItemIcon>
                    <ListItemText
                      primary="Amount Spent"
                      secondary={serviceData.spent || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoney />
                    </ListItemIcon>
                    <ListItemText
                      primary="Service Price"
                      secondary={serviceData.price || 'Custom quote'}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Duration & Timeline
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText
                      primary="Project Duration"
                      secondary={serviceData.duration || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary="Start Date"
                      secondary={serviceData.startDate || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary="End Date"
                      secondary={serviceData.endDate || 'Not specified'}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Edit Service</Typography>
            <IconButton onClick={handleEditClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Service Title"
              name="title"
              value={editData.title || ''}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={editData.category || ''}
              onChange={handleInputChange}
              select
            >
              <MenuItem value="Cloud">Cloud</MenuItem>
              <MenuItem value="Development">Development</MenuItem>
              <MenuItem value="Security">Security</MenuItem>
              <MenuItem value="Analytics">Analytics</MenuItem>
              <MenuItem value="Mobile">Mobile</MenuItem>
              <MenuItem value="Transformation">Transformation</MenuItem>
              <MenuItem value="IoT">IoT</MenuItem>
              <MenuItem value="Blockchain">Blockchain</MenuItem>
            </TextField>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              name="description"
              value={editData.description || ''}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={editData.status || ''}
              onChange={handleInputChange}
              select
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={editData.price || ''}
              onChange={handleInputChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" startIcon={<Save />}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServiceDetails;