import {
  AccountCircle,
  ArrowForward,
  CheckCircle,
  Error,
  MoreVert,
  Notifications,
  Pending,
  Refresh,
  Security,
  Storage,
  Timeline,
  TrendingDown,
  TrendingUp,
  Warning
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  Tab,
  Tabs,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const Dashboards = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState(null);

  // Service progress status data
  const allServices = [
    {
      id: 1,
      name: 'Web Development',
      progress: 85,
      status: 'active',
      clients: 24,
      revenue: '$45,200',
      trend: 'up',
      tasks: 12,
      color: 'primary',
      category: 'development'
    },
    {
      id: 2,
      name: 'Mobile App Dev',
      progress: 65,
      status: 'delayed',
      clients: 18,
      revenue: '$32,800',
      trend: 'down',
      tasks: 8,
      color: 'secondary',
      category: 'development'
    },
    {
      id: 3,
      name: 'Cloud Services',
      progress: 92,
      status: 'active',
      clients: 32,
      revenue: '$67,500',
      trend: 'up',
      tasks: 5,
      color: 'success',
      category: 'infrastructure'
    },
    {
      id: 4,
      name: 'DevOps & CI/CD',
      progress: 78,
      status: 'warning',
      clients: 15,
      revenue: '$28,400',
      trend: 'up',
      tasks: 3,
      color: 'warning',
      category: 'infrastructure'
    },
    {
      id: 5,
      name: 'UI/UX Design',
      progress: 45,
      status: 'delayed',
      clients: 22,
      revenue: '$38,900',
      trend: 'down',
      tasks: 15,
      color: 'info',
      category: 'design'
    },
    {
      id: 6,
      name: 'QA & Testing',
      progress: 88,
      status: 'active',
      clients: 19,
      revenue: '$29,700',
      trend: 'up',
      tasks: 7,
      color: 'error',
      category: 'testing'
    },
    {
      id: 7,
      name: 'API Development',
      progress: 92,
      status: 'active',
      clients: 28,
      revenue: '$52,100',
      trend: 'up',
      tasks: 9,
      color: 'primary',
      category: 'development'
    },
    {
      id: 8,
      name: 'Database Management',
      progress: 95,
      status: 'active',
      clients: 21,
      revenue: '$41,300',
      trend: 'up',
      tasks: 6,
      color: 'success',
      category: 'infrastructure'
    },
    {
      id: 9,
      name: 'Security Audit',
      progress: 60,
      status: 'warning',
      clients: 16,
      revenue: '$35,800',
      trend: 'down',
      tasks: 4,
      color: 'warning',
      category: 'security'
    },
  ];

  // Overall metrics with counts
  const overallMetrics = [
    {
      label: 'Total Projects',
      value: allServices.length.toString(),
      change: '+2',
      icon: <Timeline />,
      filter: 'all'
    },
    {
      label: 'Active Projects',
      value: allServices.filter(s => s.status === 'active').length.toString(),
      change: '+5',
      icon: <Storage />,
      filter: 'active'
    },
    {
      label: 'Delayed Projects',
      value: allServices.filter(s => s.status === 'delayed').length.toString(),
      change: '+2',
      icon: <Error />,
      filter: 'delayed'
    },
    {
      label: 'Warning Projects',
      value: allServices.filter(s => s.status === 'warning').length.toString(),
      change: '+1',
      icon: <Warning />,
      filter: 'warning'
    },
  ];

  // Category tabs
  const categories = [
    { label: 'All Services', value: 'all' },
    { label: 'Development', value: 'development' },
    { label: 'Infrastructure', value: 'infrastructure' },
    { label: 'Design', value: 'design' },
    { label: 'Testing', value: 'testing' },
    { label: 'Security', value: 'security' },
  ];

  // Filter services based on active filter
  const filteredServices = allServices.filter(service => {
    if (selectedMetric) {
      return service.status === selectedMetric;
    }
    if (activeFilter === 'all') {
      return true;
    }
    return service.category === activeFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle color="success" />;
      case 'delayed': return <Error color="error" />;
      case 'warning': return <Warning color="warning" />;
      default: return <Pending color="info" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'delayed': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  };

  const handleMetricClick = (metricFilter) => {
    if (selectedMetric === metricFilter) {
      setSelectedMetric(null); // Clear filter if clicking same metric
    } else {
      setSelectedMetric(metricFilter);
    }
    setActiveFilter('all'); // Reset category filter when metric is selected
  };

  const handleCategoryChange = (event, newValue) => {
    setActiveFilter(newValue);
    setSelectedMetric(null); // Clear metric filter when category is selected
  };

  const clearFilters = () => {
    setActiveFilter('all');
    setSelectedMetric(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
              <AccountCircle fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Project Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time tracking of all services
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Stack>
        </Box>
      </Paper>

      {/* Overall Metrics */}
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        Project Overview
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {overallMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                border: selectedMetric === metric.filter ? '2px solid' : 'none',
                borderColor: selectedMetric === metric.filter ? 'primary.main' : 'transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => handleMetricClick(metric.filter)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.label}
                    </Typography>
                  </Box>
                  <Box sx={{
                    color: selectedMetric === metric.filter ? 'primary.main' : 'primary.light',
                    transform: selectedMetric === metric.filter ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s'
                  }}>
                    {metric.icon}
                  </Box>
                </Box>
                <Chip
                  label={metric.change}
                  size="small"
                  color={metric.change.includes('+') ? 'success' : 'error'}
                  icon={metric.change.includes('+') ? <TrendingUp /> : <TrendingDown />}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Active Filters */}
      {(selectedMetric || activeFilter !== 'all') && (
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: 'action.hover' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" fontWeight="medium">
                Active Filters:
              </Typography>
              {selectedMetric && (
                <Chip
                  label={`Status: ${selectedMetric}`}
                  size="small"
                  color={getStatusColor(selectedMetric)}
                  onDelete={() => setSelectedMetric(null)}
                />
              )}
              {activeFilter !== 'all' && (
                <Chip
                  label={`Category: ${activeFilter}`}
                  size="small"
                  color="primary"
                  onDelete={() => setActiveFilter('all')}
                />
              )}
            </Box>
            <Button
              size="small"
              variant="text"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Showing {filteredServices.length} of {allServices.length} services
          </Typography>
        </Paper>
      )}

      {/* Category Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeFilter}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: activeFilter === 'all' ? 600 : 500,
              minHeight: 48
            }
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.value}
              label={
                <Box display="flex" alignItems="center" gap={0.5}>
                  {category.label}
                  {category.value !== 'all' && (
                    <Chip
                      label={
                        allServices.filter(s => s.category === category.value).length
                      }
                      size="small"
                      sx={{ height: 20, fontSize: '0.75rem' }}
                    />
                  )}
                </Box>
              }
              value={category.value}
              sx={{
                borderBottom: activeFilter === category.value ? '3px solid' : 'none',
                borderColor: 'primary.main'
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Service Progress Grid */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Service Status
          {selectedMetric || activeFilter !== 'all' ? ` (${filteredServices.length})` : ''}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedMetric || activeFilter !== 'all' ? 'Filtered Results' : 'All Services'}
        </Typography>
      </Box>

      {filteredServices.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
          <Pending sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No services found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Try changing your filters to see more results
          </Typography>
          <Button
            variant="outlined"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredServices.map((service) => (
            <Grid item xs={12} md={6} lg={4} key={service.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      {getStatusIcon(service.status)}
                      <Typography variant="h6" fontWeight="medium">
                        {service.name}
                      </Typography>
                    </Box>
                    <Chip
                      label={service.category}
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>

                  <Box mb={3}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {service.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={service.progress}
                      color={service.color}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Active Clients
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {service.clients}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Revenue
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {service.revenue}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Tasks
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {service.tasks}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Trend
                        </Typography>
                        <Box display="flex" alignItems="center">
                          {service.trend === 'up' ? (
                            <TrendingUp fontSize="small" color="success" />
                          ) : (
                            <TrendingDown fontSize="small" color="error" />
                          )}
                          <Chip
                            label={service.status}
                            size="small"
                            color={getStatusColor(service.status)}
                            sx={{ ml: 1, height: 20 }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowForward />}
                    sx={{ mt: 3 }}
                    component={RouterLink}
                    to={`/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Legend */}
      <Paper sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Status Legend
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Click metrics above to filter
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <CheckCircle color="success" />
              <Typography variant="body2">Active - On track</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Warning color="warning" />
              <Typography variant="body2">Warning - Needs attention</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Error color="error" />
              <Typography variant="body2">Delayed - Behind schedule</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Pending color="info" />
              <Typography variant="body2">Pending - Not started</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboards;