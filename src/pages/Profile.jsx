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
  useTheme,
  alpha,
  Fade,
  Zoom,
  Grow,
  Badge,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tooltip,
  CircularProgress,
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
  GitHub,
  LinkedIn,
  Language,
  VerifiedUser,
  CalendarToday,
  AccessTime,
  Visibility,
  VisibilityOff,
  Delete,
  Add,
  Star,
  StarBorder,
} from '@mui/icons-material';
import PageHeader from '../components/common/PageHeader';
import { updateProfileSuccess } from '../redux/slices/userSlice';

const Profile = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Define skillLevelColors with fallback colors
  const skillLevelColors = {
    'Beginner': theme.palette.info?.main || '#0288d1',
    'Intermediate': theme.palette.success?.main || '#2e7d32',
    'Advanced': theme.palette.warning?.main || '#ed6c02',
    'Expert': theme.palette.error?.main || '#d32f2f',
  };

  const [profileData, setProfileData] = useState({
    name: user?.name || profile?.name || 'John Doe',
    email: user?.email || profile?.email || 'john.doe@example.com',
    phone: profile?.phone || '+1 (555) 123-4567',
    title: profile?.title || 'Senior Software Engineer',
    company: profile?.company || 'Excellence Allegiance Pvt Ltd',
    location: profile?.location || 'San Francisco, CA',
    bio: profile?.bio || 'Passionate software engineer with 8+ years of experience in building scalable web applications and cloud solutions.',
    skills: profile?.skills || [
      { name: 'React', level: 'Expert', years: 5 },
      { name: 'Node.js', level: 'Advanced', years: 4 },
      { name: 'AWS', level: 'Advanced', years: 3 },
      { name: 'TypeScript', level: 'Expert', years: 4 },
      { name: 'Python', level: 'Intermediate', years: 3 },
      { name: 'Docker', level: 'Intermediate', years: 2 },
    ],
    education: profile?.education || 'M.S. Computer Science, Stanford University',
    website: profile?.website || 'https://johndoe.dev',
    github: profile?.github || 'https://github.com/johndoe',
    linkedin: profile?.linkedin || 'https://linkedin.com/in/johndoe',
    joinedDate: profile?.joinedDate || 'January 2022',
    status: profile?.status || 'Active',
    role: profile?.role || 'Senior Developer',
    notifications: {
      email: true,
      push: true,
      marketing: false,
      security: true,
    },
    twoFactorEnabled: profile?.twoFactorEnabled || false,
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

  const handleNotificationChange = (type, value) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }));
  };

  const handleSaveProfile = () => {
    dispatch(updateProfileSuccess(profileData));
    setEditMode(false);
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarOpen(true);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, { name: newSkill.trim(), level: 'Beginner', years: 1 }],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillName) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.name !== skillName),
    }));
  };

  const handleUpdateSkillLevel = (skillName, newLevel) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.name === skillName ? { ...skill, level: newLevel } : skill
      ),
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedAvatar(reader.result);
          setUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  const tabs = [
    { label: 'Profile', icon: <AccountCircle /> },
    { label: 'Security', icon: <Security /> },
    { label: 'Notifications', icon: <Notifications /> },
    { label: 'Preferences', icon: <VerifiedUser /> },
  ];

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Helper function to get color with fallback
  const getSkillColor = (level) => {
    return skillLevelColors[level] || theme.palette.primary.main;
  };

  // Safe alpha function wrapper
  const safeAlpha = (color, opacity) => {
    try {
      return alpha(color, opacity);
    } catch (error) {
      console.warn('Alpha function error:', error);
      return `rgba(25, 118, 210, ${opacity})`; // Fallback to primary color
    }
  };

  return (
    <Box sx={{
      bgcolor: theme.palette.background.default,
      minHeight: '100vh',
    }}>
      <PageHeader
        title="My Profile"
        subtitle="Manage your account and preferences"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Profile', path: '/profile' },
        ]}
        backgroundImage={`linear-gradient(rgba(38, 50, 62, 0.85), rgba(20, 33, 44, 0.85)), url(https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=2070&q=80)`}
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '10vh',
          display: 'flex',
          alignItems: 'center',
        }}
      />

      {/* Main Content Container - Fixed Version */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        zIndex: 1,
      }}>
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 3, sm: 4, md: 5 },
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 3, lg: 2, xl: 4 }} sx={{ width: '100%', m: 0, justifyContent: 'space-between' }}>
            {/* Left Column - Profile Overview */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              sx={{
                display: 'flex',
                flexDirection: { md: 'row', lg: 'column', xl: 'column' },
                gap: { xs: 2, sm: 3 },
                width: { xs: '100%', sm: '100%', md: '50%', lg: '25%', xl: '25%' },
              }}
            >
              <Grow in={true} timeout={300}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: theme.shadows[4],
                    overflow: 'visible',
                    position: 'relative',
                    width: '100%',
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      height: 80,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
                      borderRadius: '12px 12px 0 0',
                    }}
                  />

                  <CardContent sx={{ textAlign: 'center', p: 3, pt: 0 }}>
                    <Box sx={{ position: 'relative', display: 'inline-block', mt: -6 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <Tooltip title="Change avatar">
                            <label htmlFor="avatar-upload">
                              <IconButton
                                component="span"
                                sx={{
                                  bgcolor: theme.palette.primary.main,
                                  color: 'white',
                                  '&:hover': {
                                    bgcolor: theme.palette.primary.dark,
                                  },
                                  width: 36,
                                  height: 36,
                                  border: `3px solid ${theme.palette.background.paper}`,
                                }}
                              >
                                {uploading ? (
                                  <CircularProgress size={16} color="inherit" />
                                ) : (
                                  <CameraAlt sx={{ fontSize: 16 }} />
                                )}
                              </IconButton>
                            </label>
                          </Tooltip>
                        }
                      >
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleAvatarUpload}
                          disabled={uploading}
                        />
                        <Avatar
                          src={selectedAvatar}
                          sx={{
                            width: { xs: 100, sm: 120, md: 140 },
                            height: { xs: 100, sm: 120, md: 140 },
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                            bgcolor: theme.palette.primary.main,
                            border: `4px solid ${theme.palette.background.paper}`,
                            boxShadow: theme.shadows[4],
                          }}
                        >
                          {profileData.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    </Box>

                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                      {profileData.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {profileData.title}
                    </Typography>
                    <Chip
                      label={profileData.role}
                      color="primary"
                      size="small"
                      sx={{ mb: 2 }}
                    />

                    <Box sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 2 },
                      mt: 3
                    }}>
                      <Button
                        variant={editMode ? 'contained' : 'outlined'}
                        startIcon={editMode ? <Save /> : <Edit />}
                        onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
                        fullWidth
                        sx={{
                          py: 1,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4],
                          },
                        }}
                      >
                        {editMode ? 'Save Changes' : 'Edit Profile'}
                      </Button>

                      {editMode && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => setEditMode(false)}
                          fullWidth
                          sx={{
                            py: 1,
                            borderRadius: 2,
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grow>

              {/* Contact Info */}
              <Grow in={true} timeout={500}>
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: theme.shadows[4],
                  width: '100%',
                  flexShrink: 0,
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Contact Information
                    </Typography>

                    {[
                      { icon: <Email />, label: 'Email', value: profileData.email },
                      { icon: <Phone />, label: 'Phone', value: profileData.phone },
                      { icon: <LocationOn />, label: 'Location', value: profileData.location },
                      { icon: <Work />, label: 'Company', value: profileData.company },
                      { icon: <School />, label: 'Education', value: profileData.education },
                      { icon: <CalendarToday />, label: 'Joined', value: profileData.joinedDate },
                    ].map((item, index) => (
                      <Fade in={true} timeout={index * 100 + 300} key={index}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mb: 2,
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: safeAlpha(theme.palette.primary.main, 0.03),
                          '&:hover': {
                            bgcolor: safeAlpha(theme.palette.primary.main, 0.08),
                          },
                          transition: 'background-color 0.3s ease',
                        }}>
                          <Box sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: safeAlpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                          }}>
                            {item.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {item.label}
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {item.value}
                            </Typography>
                          </Box>
                        </Box>
                      </Fade>
                    ))}
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            {/* Right Column - Detailed Info */}
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 },
                width: { xs: '100%', sm: '100%', md: '100%', lg: '73%', xl: '72%' },
              }}
            >
              <Zoom in={true} timeout={400}>
                <Paper sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[4],
                  width: '100%',
                }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      bgcolor: safeAlpha(theme.palette.primary.main, 0.02),
                    }}
                  >
                    {tabs.map((tab, index) => (
                      <Tab
                        key={index}
                        icon={tab.icon}
                        label={<span style={{ fontSize: '0.875rem' }}>{tab.label}</span>}
                        iconPosition="start"
                        sx={{
                          minHeight: 60,
                          '&.Mui-selected': {
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                          },
                        }}
                      />
                    ))}
                  </Tabs>

                  <Box sx={{ p: { xs: 2, sm: 3 } }}>
                    {/* Profile Tab */}
                    {activeTab === 0 && (
                      <>
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                            Basic Information
                          </Typography>
                          <Grid container spacing={{ xs: 2, sm: 3 }}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Full Name"
                                value={profileData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                disabled={!editMode}
                                size="small"
                                InputProps={{
                                  sx: { borderRadius: 2 }
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Job Title"
                                value={profileData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                disabled={!editMode}
                                size="small"
                                InputProps={{
                                  sx: { borderRadius: 2 }
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Company"
                                value={profileData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                disabled={!editMode}
                                size="small"
                                InputProps={{
                                  sx: { borderRadius: 2 }
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Location"
                                value={profileData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                disabled={!editMode}
                                size="small"
                                InputProps={{
                                  sx: { borderRadius: 2 }
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                            Bio
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={profileData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            disabled={!editMode}
                            size="small"
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Box sx={{ mb: 4 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" fontWeight="bold">
                              Skills
                            </Typography>
                            {editMode && (
                              <Button
                                startIcon={<Add />}
                                size="small"
                                onClick={() => handleAddSkill()}
                                sx={{ borderRadius: 2 }}
                              >
                                Add Skill
                              </Button>
                            )}
                          </Box>

                          {editMode && (
                            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Add a new skill"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleAddSkill();
                                  }
                                }}
                                InputProps={{
                                  sx: { borderRadius: 2 }
                                }}
                              />
                              <Button
                                variant="contained"
                                onClick={handleAddSkill}
                                sx={{
                                  borderRadius: 2,
                                  minWidth: { xs: '100%', sm: 100 }
                                }}
                              >
                                Add
                              </Button>
                            </Box>
                          )}

                          <Grid container spacing={2}>
                            {profileData.skills.map((skill, index) => {
                              const skillColor = getSkillColor(skill.level);
                              return (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                  <Card
                                    sx={{
                                      borderRadius: 2,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[4],
                                      }
                                    }}
                                  >
                                    <CardContent sx={{ p: 2 }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                          {skill.name}
                                        </Typography>
                                        {editMode && (
                                          <IconButton
                                            size="small"
                                            onClick={() => handleRemoveSkill(skill.name)}
                                            sx={{ color: theme.palette.error.main }}
                                          >
                                            <Delete fontSize="small" />
                                          </IconButton>
                                        )}
                                      </Box>

                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Box key={star}>
                                            {star <= (skillLevels.indexOf(skill.level) + 1) ? (
                                              <Star sx={{ fontSize: 16, color: skillColor }} />
                                            ) : (
                                              <StarBorder sx={{ fontSize: 16, color: 'text.disabled' }} />
                                            )}
                                          </Box>
                                        ))}
                                      </Box>

                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Chip
                                          label={skill.level}
                                          size="small"
                                          sx={{
                                            bgcolor: safeAlpha(skillColor, 0.1),
                                            color: skillColor,
                                            fontWeight: 'bold',
                                          }}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                          {skill.years} year{skill.years > 1 ? 's' : ''}
                                        </Typography>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Box>
                          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                            Social Links
                          </Typography>
                          <Grid container spacing={{ xs: 2, sm: 3 }}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Website"
                                value={profileData.website}
                                onChange={(e) => handleInputChange('website', e.target.value)}
                                disabled={!editMode}
                                size="small"
                                InputProps={{
                                  startAdornment: <Language sx={{ mr: 1, color: 'action.active' }} />,
                                  sx: { borderRadius: 2 }
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
                                size="small"
                                InputProps={{
                                  startAdornment: <GitHub sx={{ mr: 1, color: 'action.active' }} />,
                                  sx: { borderRadius: 2 }
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
                                size="small"
                                InputProps={{
                                  startAdornment: <LinkedIn sx={{ mr: 1, color: 'action.active' }} />,
                                  sx: { borderRadius: 2 }
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    )}

                    {/* Security Tab */}
                    {activeTab === 1 && (
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          Security Settings
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                              <CardContent>
                                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                                  Change Password
                                </Typography>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      label="Current Password"
                                      type={showPassword ? 'text' : 'password'}
                                      size="small"
                                      InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        ),
                                        sx: { borderRadius: 2 }
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="New Password"
                                      type={showPassword ? 'text' : 'password'}
                                      size="small"
                                      InputProps={{
                                        sx: { borderRadius: 2 }
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Confirm New Password"
                                      type={showPassword ? 'text' : 'password'}
                                      size="small"
                                      InputProps={{
                                        sx: { borderRadius: 2 }
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                                <Button
                                  variant="contained"
                                  sx={{ mt: 2, borderRadius: 2 }}
                                >
                                  Update Password
                                </Button>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                              <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      Two-Factor Authentication
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Add an extra layer of security to your account
                                    </Typography>
                                  </Box>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={profileData.twoFactorEnabled}
                                        onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
                                        color="primary"
                                      />
                                    }
                                    label=""
                                  />
                                </Box>
                                {profileData.twoFactorEnabled && (
                                  <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                                    2FA is currently enabled on your account.
                                  </Alert>
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 2 && (
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          Notification Preferences
                        </Typography>

                        <Grid container spacing={2}>
                          {[
                            {
                              type: 'email',
                              label: 'Email Notifications',
                              description: 'Receive updates via email'
                            },
                            {
                              type: 'push',
                              label: 'Push Notifications',
                              description: 'Get instant alerts on your device'
                            },
                            {
                              type: 'marketing',
                              label: 'Marketing Emails',
                              description: 'Receive product updates and offers'
                            },
                            {
                              type: 'security',
                              label: 'Security Alerts',
                              description: 'Important security notifications'
                            },
                          ].map((item, index) => (
                            <Grid item xs={12} key={index}>
                              <Card sx={{ borderRadius: 2 }}>
                                <CardContent sx={{ p: 2 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                      <Typography variant="body1" fontWeight="medium">
                                        {item.label}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                      </Typography>
                                    </Box>
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          checked={profileData.notifications[item.type]}
                                          onChange={(e) => handleNotificationChange(item.type, e.target.checked)}
                                          color="primary"
                                        />
                                      }
                                      label=""
                                    />
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === 3 && (
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          Account Preferences
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                              <InputLabel>Language</InputLabel>
                              <Select
                                label="Language"
                                defaultValue="en"
                                sx={{ borderRadius: 2 }}
                              >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="es">Spanish</MenuItem>
                                <MenuItem value="fr">French</MenuItem>
                                <MenuItem value="de">German</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                              <InputLabel>Time Zone</InputLabel>
                              <Select
                                label="Time Zone"
                                defaultValue="est"
                                sx={{ borderRadius: 2 }}
                              >
                                <MenuItem value="est">EST (Eastern Time)</MenuItem>
                                <MenuItem value="pst">PST (Pacific Time)</MenuItem>
                                <MenuItem value="gmt">GMT (Greenwich Mean Time)</MenuItem>
                                <MenuItem value="ist">IST (Indian Standard Time)</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                              <CardContent>
                                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                                  Privacy Settings
                                </Typography>
                                <FormControlLabel
                                  control={<Switch defaultChecked />}
                                  label="Make profile public"
                                />
                                <FormControlLabel
                                  control={<Switch defaultChecked />}
                                  label="Show activity status"
                                />
                                <FormControlLabel
                                  control={<Switch />}
                                  label="Allow search engine indexing"
                                />
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Zoom>

              {/* Activity Summary */}
              <Grow in={true} timeout={600}>
                <Paper sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  boxShadow: theme.shadows[4],
                  width: '100%',
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Recent Activity
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<AccessTime />}
                      sx={{ borderRadius: 2 }}
                    >
                      View All
                    </Button>
                  </Box>

                  <Grid container spacing={2}>
                    {[
                      { action: 'Updated profile information', time: '2 hours ago', icon: <CheckCircle color="success" /> },
                      { action: 'Changed password', time: '1 day ago', icon: <Security color="info" /> },
                      { action: 'Completed security check', time: '3 days ago', icon: <VerifiedUser color="warning" /> },
                      { action: 'Logged in from new device', time: '1 week ago', icon: <AccountCircle color="primary" /> },
                    ].map((activity, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card sx={{
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[3],
                          }
                        }}>
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: safeAlpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                              }}>
                                {activity.icon}
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body2" fontWeight="medium">
                                  {activity.action}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {activity.time}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          icon={<CheckCircle />}
          sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: theme.shadows[6],
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;