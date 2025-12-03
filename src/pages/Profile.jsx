import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Avatar,
  Button,
  TextField,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import {
  Edit,
  Save,
  CameraAlt,
  Security,
  Notifications,
  AccountCircle,
  Work,
  School,
  LocationOn,
  Email,
  Phone,
  Link,
  CheckCircle,
} from '@mui/icons-material';
import PageHeader from '../components/common/PageHeader';
// Import the action creator correctly
import { updateProfileSuccess } from '../redux/slices/userSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [profileData, setProfileData] = useState({
    name: user?.name || profile?.name || 'John Doe',
    email: user?.email || profile?.email || 'john.doe@example.com',
    phone: profile?.phone || '+1 (555) 123-4567',
    title: profile?.title || 'Senior Software Engineer',
    company: profile?.company || 'Excellence Allegiance Pvt Ltd',
    location: profile?.location || 'San Francisco, CA',
    bio: profile?.bio || 'Passionate software engineer with 8+ years of experience in building scalable web applications and cloud solutions.',
    skills: profile?.skills || ['React', 'Node.js', 'AWS', 'TypeScript', 'Python', 'Docker'],
    education: profile?.education || 'M.S. Computer Science, Stanford University',
    website: profile?.website || 'https://johndoe.dev',
    github: profile?.github || 'https://github.com/johndoe',
    linkedin: profile?.linkedin || 'https://linkedin.com/in/johndoe',
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Dispatch action to update profile in Redux store
    dispatch(updateProfileSuccess(profileData));
    setEditMode(false);
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarOpen(true);
  };

  const handleAddSkill = (skill) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const tabs = [
    { label: 'Profile', icon: <AccountCircle /> },
    { label: 'Account', icon: <Security /> },
    { label: 'Notifications', icon: <Notifications /> },
  ];

  return (
    <Box>
      <PageHeader
        title="My Profile"
        subtitle="Manage your account and preferences"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Profile', path: '/profile' },
        ]}
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Profile Overview */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      margin: '0 auto 20px',
                      fontSize: '3rem',
                      bgcolor: 'primary.main',
                    }}
                  >
                    {profileData.name.charAt(0)}
                  </Avatar>
                  {editMode && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 25,
                        right: 25,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' },
                      }}
                    >
                      <CameraAlt />
                    </IconButton>
                  )}
                </Box>
                
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {profileData.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {profileData.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profileData.company}
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant={editMode ? 'contained' : 'outlined'}
                    startIcon={editMode ? <Save /> : <Edit />}
                    onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
                    fullWidth
                  >
                    {editMode ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Contact Information
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Email color="action" />
                  <Typography variant="body2">{profileData.email}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Phone color="action" />
                  <Typography variant="body2">{profileData.phone}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <LocationOn color="action" />
                  <Typography variant="body2">{profileData.location}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Work color="action" />
                  <Typography variant="body2">{profileData.company}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <School color="action" />
                  <Typography variant="body2">{profileData.education}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Detailed Info */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    icon={tab.icon}
                    label={tab.label}
                    iconPosition="start"
                  />
                ))}
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {/* Profile Tab */}
                {activeTab === 0 && (
                  <>
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Basic Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={profileData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            disabled={!editMode}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Job Title"
                            value={profileData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            disabled={!editMode}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Company"
                            value={profileData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            disabled={!editMode}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Location"
                            value={profileData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            disabled={!editMode}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Bio
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!editMode}
                      />
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Skills
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {profileData.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            onDelete={editMode ? () => handleRemoveSkill(skill) : undefined}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      {editMode && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            size="small"
                            placeholder="Add a skill"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddSkill(e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                          <Button
                            variant="outlined"
                            onClick={(e) => {
                              const input = e.target.previousElementSibling?.querySelector('input');
                              if (input?.value) {
                                handleAddSkill(input.value);
                                input.value = '';
                              }
                            }}
                          >
                            Add
                          </Button>
                        </Box>
                      )}
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Social Links
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Website"
                            value={profileData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            disabled={!editMode}
                            InputProps={{
                              startAdornment: <Link sx={{ mr: 1, color: 'action.active' }} />,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="GitHub"
                            value={profileData.github}
                            onChange={(e) => handleInputChange('github', e.target.value)}
                            disabled={!editMode}
                            InputProps={{
                              startAdornment: <Link sx={{ mr: 1, color: 'action.active' }} />,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="LinkedIn"
                            value={profileData.linkedin}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            disabled={!editMode}
                            InputProps={{
                              startAdornment: <Link sx={{ mr: 1, color: 'action.active' }} />,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}

                {/* Account Tab */}
                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Security Settings
                    </Typography>
                    <Alert severity="info" sx={{ mb: 3 }}>
                      Manage your account security and privacy settings here.
                    </Alert>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Current Password"
                          type="password"
                          disabled={!editMode}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="New Password"
                          type="password"
                          disabled={!editMode}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Confirm New Password"
                          type="password"
                          disabled={!editMode}
                        />
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Two-Factor Authentication
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2">
                          Add an extra layer of security to your account
                        </Typography>
                        <Button variant="outlined" size="small">
                          Enable 2FA
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Notifications Tab */}
                {activeTab === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Notification Preferences
                    </Typography>
                    
                    {[
                      { label: 'Email Notifications', description: 'Receive updates via email' },
                      { label: 'Push Notifications', description: 'Get instant alerts on your device' },
                      { label: 'Marketing Emails', description: 'Receive product updates and offers' },
                      { label: 'Security Alerts', description: 'Important security notifications' },
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 2,
                          borderBottom: index < 3 ? '1px solid' : 'none',
                          borderColor: 'divider',
                        }}
                      >
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {item.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                        <Button variant="outlined" size="small">
                          Configure
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Paper>

            {/* Activity Summary */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Activity
              </Typography>
              {[
                { action: 'Updated profile information', time: '2 hours ago' },
                { action: 'Changed password', time: '1 day ago' },
                { action: 'Completed security check', time: '3 days ago' },
                { action: 'Logged in from new device', time: '1 week ago' },
              ].map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                    borderBottom: index < 3 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <CheckCircle color="success" />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2">{activity.action}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          icon={<CheckCircle />}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;