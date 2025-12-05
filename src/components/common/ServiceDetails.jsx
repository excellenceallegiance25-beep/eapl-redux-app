import React, { useState } from 'react';
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
  Divider,
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
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Download,
  Share,
  MoreVert,
  Timeline,
  People,
  AttachMoney,
  CalendarToday,
  AccessTime,
  CheckCircle,
  Error,
  Warning,
  Pending,
  ArrowUpward,
  ArrowDownward,
  TrendingUp,
  Comment,
  Attachment,
  Person,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Mock service data - In real app, fetch based on serviceId
  const serviceData = {
    id: serviceId || 'web-dev',
    name: 'Web Development Service',
    description: 'Full-stack web application development with modern technologies including React, Node.js, and cloud deployment.',
    progress: 85,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: '$45,200',
    spent: '$38,420',
    teamLead: 'Alex Johnson',
    client: 'TechCorp Inc.',
    priority: 'high',
    category: 'Development',
    tasks: [
      { id: 1, name: 'Frontend Development', status: 'completed', dueDate: '2024-03-15', assignedTo: 'Sarah Chen' },
      { id: 2, name: 'Backend API', status: 'in-progress', dueDate: '2024-04-30', assignedTo: 'Mike Wilson' },
      { id: 3, name: 'Database Design', status: 'completed', dueDate: '2024-02-28', assignedTo: 'David Lee' },
      { id: 4, name: 'Testing & QA', status: 'pending', dueDate: '2024-05-15', assignedTo: 'Emma Davis' },
      { id: 5, name: 'Deployment', status: 'not-started', dueDate: '2024-06-30', assignedTo: 'Alex Johnson' },
    ],
    milestones: [
      { id: 1, name: 'Project Kickoff', date: '2024-01-20', status: 'completed' },
      { id: 2, name: 'Design Approval', date: '2024-02-15', status: 'completed' },
      { id: 3, name: 'Development Phase 1', date: '2024-03-31', status: 'completed' },
      { id: 4, name: 'Alpha Release', date: '2024-04-30', status: 'in-progress' },
      { id: 5, name: 'Beta Testing', date: '2024-05-31', status: 'pending' },
      { id: 6, name: 'Final Delivery', date: '2024-06-30', status: 'pending' },
    ],
    teamMembers: [
      { name: 'Alex Johnson', role: 'Project Lead', avatar: 'AJ', status: 'online' },
      { name: 'Sarah Chen', role: 'Frontend Developer', avatar: 'SC', status: 'online' },
      { name: 'Mike Wilson', role: 'Backend Developer', avatar: 'MW', status: 'away' },
      { name: 'Emma Davis', role: 'QA Engineer', avatar: 'ED', status: 'offline' },
      { name: 'David Lee', role: 'Database Admin', avatar: 'DL', status: 'online' },
    ],
    documents: [
      { name: 'Project Requirements.pdf', size: '2.4 MB', date: '2024-01-10' },
      { name: 'Design Mockups.zip', size: '15.2 MB', date: '2024-01-25' },
      { name: 'API Documentation.docx', size: '1.8 MB', date: '2024-02-15' },
      { name: 'Test Reports.xlsx', size: '3.1 MB', date: '2024-03-01' },
    ],
    activityLog: [
      { id: 1, action: 'Project requirements finalized', user: 'Alex Johnson', time: '2 hours ago' },
      { id: 2, action: 'Frontend development started', user: 'Sarah Chen', time: '1 day ago' },
      { id: 3, action: 'Backend API endpoints created', user: 'Mike Wilson', time: '2 days ago' },
      { id: 4, action: 'Database schema approved', user: 'David Lee', time: '3 days ago' },
      { id: 5, action: 'Client meeting scheduled', user: 'Alex Johnson', time: '1 week ago' },
    ],
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'in-progress': return <Timeline color="primary" />;
      case 'pending': return <Pending color="warning" />;
      case 'not-started': return <Error color="error" />;
      default: return <Warning color="info" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'warning';
      case 'not-started': return 'error';
      default: return 'info';
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/dashboard" color="inherit">
          Dashboard
        </Link>
        <Link component={RouterLink} to="/services" color="inherit">
          Services
        </Link>
        <Typography color="text.primary">{serviceData.name}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h4" fontWeight="bold">
                {serviceData.name}
              </Typography>
              <Chip 
                label={serviceData.status.toUpperCase()} 
                color={getStatusColor(serviceData.status)}
                size="small"
              />
            </Box>
            <Typography variant="body1" color="text.secondary" paragraph>
              {serviceData.description}
            </Typography>
            
            <Stack direction="row" spacing={3} alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Category
                </Typography>
                <Chip label={serviceData.category} size="small" sx={{ ml: 1 }} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Priority
                </Typography>
                <Chip 
                  label={serviceData.priority} 
                  size="small" 
                  color={serviceData.priority === 'high' ? 'error' : 'warning'}
                  sx={{ ml: 1 }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Client
                </Typography>
                <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                  {serviceData.client}
                </Typography>
              </Box>
            </Stack>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<Edit />}>
              Edit
            </Button>
            <Button variant="outlined" startIcon={<Download />}>
              Export
            </Button>
            <Button variant="contained" startIcon={<Share />}>
              Share
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
          <Tab icon={<Timeline />} label="Overview" />
          <Tab icon={<People />} label="Team" />
          <Tab icon={<AttachMoney />} label="Budget" />
          <Tab icon={<CalendarToday />} label="Timeline" />
          <Tab icon={<Attachment />} label="Documents" />
          <Tab icon={<Comment />} label="Activity" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Progress & Stats */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Project Progress
                </Typography>
                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Overall Completion
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {serviceData.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={serviceData.progress} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Start Date
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {serviceData.startDate}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        End Date
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {serviceData.endDate}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Lead Info */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Team Lead
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                    {serviceData.teamLead.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {serviceData.teamLead}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Project Lead
                    </Typography>
                  </Box>
                </Box>
                <Stack spacing={1}>
                  <Button variant="outlined" startIcon={<Email />} fullWidth>
                    Send Email
                  </Button>
                  <Button variant="outlined" startIcon={<Phone />} fullWidth>
                    Call
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Tasks List */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Tasks
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Assigned To</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {serviceData.tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>
                            <Typography fontWeight="medium">
                              {task.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(task.status)}
                              label={task.status}
                              size="small"
                              color={getStatusColor(task.status)}
                            />
                          </TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>{task.assignedTo}</TableCell>
                          <TableCell align="right">
                            <Button size="small">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Team Members
                </Typography>
                <Grid container spacing={3}>
                  {serviceData.teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper sx={{ p: 2 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {member.avatar}
                          </Avatar>
                          <Box>
                            <Typography fontWeight="bold">
                              {member.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {member.role}
                            </Typography>
                            <Chip 
                              label={member.status}
                              size="small"
                              color={member.status === 'online' ? 'success' : 'default'}
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Budget Overview
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Total Budget"
                      secondary={serviceData.budget}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Amount Spent"
                      secondary={serviceData.spent}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Remaining"
                      secondary={`$${(parseFloat(serviceData.budget.replace('$', '').replace(',', '')) - 
                             parseFloat(serviceData.spent.replace('$', '').replace(',', ''))).toLocaleString()}`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Recent Expenses
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoney />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Development Tools"
                      secondary="$2,500 - March 2024"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoney />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Team Training"
                      secondary="$1,800 - February 2024"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoney />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Software Licenses"
                      secondary="$3,200 - January 2024"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Project Timeline
            </Typography>
            <List>
              {serviceData.milestones.map((milestone) => (
                <ListItem key={milestone.id}>
                  <ListItemIcon>
                    {getStatusIcon(milestone.status)}
                  </ListItemIcon>
                  <ListItemText 
                    primary={milestone.name}
                    secondary={`Due: ${milestone.date}`}
                  />
                  <Chip 
                    label={milestone.status}
                    size="small"
                    color={getStatusColor(milestone.status)}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {activeTab === 4 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Project Documents
            </Typography>
            <List>
              {serviceData.documents.map((doc, index) => (
                <ListItem 
                  key={index}
                  secondaryAction={
                    <Button size="small">Download</Button>
                  }
                >
                  <ListItemIcon>
                    <Attachment />
                  </ListItemIcon>
                  <ListItemText 
                    primary={doc.name}
                    secondary={`${doc.size} • ${doc.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {activeTab === 5 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Activity Log
            </Typography>
            <List>
              {serviceData.activityLog.map((activity) => (
                <ListItem key={activity.id}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={activity.action}
                    secondary={`${activity.user} • ${activity.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ServiceDetails;