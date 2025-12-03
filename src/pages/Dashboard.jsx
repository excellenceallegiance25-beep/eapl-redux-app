import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Button,
} from '@mui/material';
import {
  AccountCircle,
  Notifications,
  Timeline,
  Storage,
  Security,
  Cloud,
  ArrowUpward,
  CheckCircle,
  Pending,
} from '@mui/icons-material';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { label: 'Projects Active', value: '12', icon: <Timeline />, color: 'primary' },
    { label: 'Storage Used', value: '78%', icon: <Storage />, color: 'secondary' },
    { label: 'Security Score', value: '95%', icon: <Security />, color: 'success' },
    { label: 'Cloud Services', value: '8', icon: <Cloud />, color: 'warning' },
  ];

  const recentActivities = [
    { action: 'Project Alpha deployed', time: '2 hours ago', status: 'success' },
    { action: 'Security audit completed', time: '1 day ago', status: 'success' },
    { action: 'New team member added', time: '2 days ago', status: 'success' },
    { action: 'Database backup pending', time: '3 days ago', status: 'pending' },
    { action: 'API update scheduled', time: '1 week ago', status: 'success' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
              <AccountCircle fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Welcome back, {user?.name || 'User'}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here's what's happening with your projects today.
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" startIcon={<Notifications />}>
            Notifications
          </Button>
        </Box>
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}.light`,
                      color: `${stat.color}.main`,
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stat.label === 'Storage Used' ? 78 : 100}
                  color={stat.color}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {activity.status === 'success' ? (
                      <CheckCircle color="success" />
                    ) : (
                      <Pending color="warning" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={activity.time}
                  />
                  <Button size="small" variant="text" endIcon={<ArrowUpward />}>
                    View
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" fullWidth>
                Create New Project
              </Button>
              <Button variant="outlined" fullWidth>
                View Analytics
              </Button>
              <Button variant="outlined" fullWidth>
                Manage Team
              </Button>
              <Button variant="outlined" fullWidth>
                System Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;