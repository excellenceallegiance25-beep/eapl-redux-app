import React, { useState, useEffect } from 'react';
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
  Tooltip,
  CircularProgress,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  AlertTitle,
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
  History,
  Update,
  Pending,
  Done,
  Error,
  Info,
  ArrowForward,
  ExpandMore,
  ExpandLess,
  Lock,
  LockOpen,
  CloudUpload,
  PersonAdd,
  Timeline,
} from '@mui/icons-material';
import PageHeader from '../components/common/PageHeader';
import { updateProfileSuccess } from '../redux/slices/userSlice';
import {
  getEmployeeProfileList,
  getEmployeeSkillList,
  getEmployeePHistoryList,
  updateEmployeeCompleteProfile  // Your existing generic API
} from '../services/AppConfigAction';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams(); // This gets the userId from URL
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showPassword, setShowPassword] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [updateHistoryExpanded, setUpdateHistoryExpanded] = useState(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [updateSteps, setUpdateSteps] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changePasswordStep, setChangePasswordStep] = useState(0);

  // Separate states for each data type
  const [originalProfileData, setOriginalProfileData] = useState(null);
  const [editedProfileData, setEditedProfileData] = useState(null);
  const [profileSkills, setProfileSkills] = useState([]);
  const [profileHistory, setProfileHistory] = useState([]);
  const [tempSkills, setTempSkills] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Load all data
  useEffect(() => {
    loadAllData();
  }, [dispatch]);

  const loadAllData = async () => {
    try {
      await Promise.all([
        loadProfileData(),
        loadSkills(),
        loadHistory()
      ]);
      setHasChanges(false);
    } catch (error) {
      console.error('Error loading profile data:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to load profile data');
      setSnackbarOpen(true);
    }
  };

  const loadProfileData = async () => {
    const result = await dispatch(getEmployeeProfileList());

    if (result.type === "EMP_INFO_LIST" && result.payload && result.payload.length > 0) {

      // Get the current logged-in user from Redux auth state
      const currentUserId = user?.id;

      // Find the profile data that matches the logged-in user
      let userProfileData = null;

      if (currentUserId) {
        // Try to find by matching ID
        userProfileData = result.payload.find(emp => emp.id === currentUserId);
      }

      // If not found by ID, try to find by email
      if (!userProfileData && user?.email) {
        userProfileData = result.payload.find(emp =>
          emp.email && emp.email.toLowerCase() === user.email.toLowerCase()
        );
      }

      // If still not found, use the first item (fallback)
      if (!userProfileData) {
        userProfileData = result.payload[0];
        console.warn('Could not find exact user profile, using first available');
      }

      // Set the picture if available
      if (userProfileData) {
        let picture = null;

        if (userProfileData.profilePicture && userProfileData.profilePictureType) {
          picture = `data:${userProfileData.profilePictureType};base64,${userProfileData.profilePicture}`;
        }
        setSelectedAvatar(picture);

        setOriginalProfileData(userProfileData);
        setEditedProfileData(userProfileData);

        // Update Redux auth user data if it's missing info
        if (!user.name && userProfileData.name) {
          // You might want to dispatch an action to update the auth user
          // console.log('Updating user info with profile data');
        }
      }
    } else {
      console.error('No profile data found in API response');
    }
  };

  const loadSkills = async () => {
    const result = await dispatch(getEmployeeSkillList());
    const currentUserId = user?.id;

    if (result.type === "EMP_SKILL_LIST" && result.payload) {
      // Filter skills for the current user
      const userSkills = Array.isArray(result.payload)
        ? result.payload.filter(skill => skill.employeeId === currentUserId)
        : [];

      // console.log('Loaded skills for user', currentUserId, ':', userSkills);

      setProfileSkills(userSkills);
      setTempSkills([...userSkills]); // Create a copy for editing
    }
  };

  const loadHistory = async () => {
    const result = await dispatch(getEmployeePHistoryList());
    const currentUserId = user?.id;

    // console.log('History API response:', result);
    console.log('Current user ID:', currentUserId);

    if (result.type === "EMP_HISTORY_LIST" && result.payload && Array.isArray(result.payload)) {

      // Filter history for the current user only
      const userHistory = result.payload.filter(history =>
        Number(history.employeeId) === Number(currentUserId)
      );

      // console.log('Filtered user history:', userHistory);

      // Sort by timestamp (newest first)
      const sortedHistory = userHistory.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      );

      setProfileHistory(sortedHistory);

    } else {
      // console.warn('No history data found');
      setProfileHistory([]);
    }
  };

  const skillLevelColors = {
    'Beginner': theme.palette.info?.main || '#0288d1',
    'Intermediate': theme.palette.success?.main || '#2e7d32',
    'Advanced': theme.palette.warning?.main || '#ed6c02',
    'Expert': theme.palette.error?.main || '#d32f2f',
  };

  // Default profile data if API returns null
  const defaultProfileData = {
    name: user?.name || profile?.name || 'John Doe',
    email: user?.email || profile?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    title: user?.title || 'Senior Software Engineer',
    company: user?.company || 'Excellence Allegiance Pvt Ltd',
    location: user?.location || 'San Francisco, CA',
    bio: user?.bio || 'Passionate software engineer with 8+ years of experience in building scalable web applications and cloud solutions.',
    education: user?.education || 'M.S. Computer Science, Stanford University',
    website: user?.website || 'https://johndoe.dev',
    github: user?.github || 'https://github.com/johndoe',
    linkedin: user?.linkedin || 'https://linkedin.com/in/johndoe',
    joinedDate: user?.joinedDate || 'January 2022',
    status: user?.status || 'Active',
    role: user?.role || 'Senior Developer',
    roleType: user?.roleType || 'Full-time',
    notificationsEmail: user?.notificationsEmail || true,
    notificationsPush: user?.notificationsPush || true,
    notificationsMarketing: user?.notificationsMarketing || false,
    notificationsSecurity: user?.notificationsSecurity || true,
    twoFactorEnabled: user?.twoFactorEnabled || false,
    lastProfileUpdate: user?.lastProfileUpdate || new Date().toISOString(),
  };

  // Use actual data or defaults
  const currentProfileData = editedProfileData || originalProfileData || defaultProfileData;

  // Check for changes
  useEffect(() => {
    if (editMode) {
      const profileChanged = JSON.stringify(editedProfileData) !== JSON.stringify(originalProfileData);
      const skillsChanged = JSON.stringify(tempSkills) !== JSON.stringify(profileSkills);
      setHasChanges(profileChanged || skillsChanged || newSkill.trim() !== '');
    }
  }, [editMode, editedProfileData, originalProfileData, tempSkills, profileSkills, newSkill]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field, value) => {
    setEditedProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // When adding a new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const newSkillObj = {
        id: `temp-${Date.now()}`, // Temporary ID for UI only
        skillName: newSkill.trim(),
        level: 'Beginner',
        yearsExperience: 1,
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setTempSkills(prev => [...prev, newSkillObj]);
      setNewSkill('');
    }
  };

  // When updating skill level
  const handleUpdateSkillLevel = (skillId, newLevel) => {
    setTempSkills(prev =>
      prev.map(skill =>
        skill.id === skillId
          ? {
            ...skill,
            level: newLevel,
            updatedAt: new Date().toISOString().split('T')[0]
          }
          : skill
      )
    );
  };

  const handleSaveProfile = async () => {
    setIsUpdating(true);

    try {
      const employeeId = currentProfileData.id;

      // Convert profile picture to base64 if selected
      let profilePictureBase64 = null;
      let profilePictureType = null;
      if (selectedAvatar && selectedAvatar.startsWith('data:')) {
        profilePictureBase64 = selectedAvatar;
        // Extract MIME type from data URL
        const match = selectedAvatar.match(/^data:([^;]+);base64,/);
        if (match) {
          profilePictureType = match[1];
        }
      }

      // FIXED: Prepare skills array matching backend SkillUpdateRequest
      const skillsArray = tempSkills.map(skill => ({
        employeeId: parseInt(employeeId),  // Make sure it's a number
        skillName: skill.skillName,        // Use the skillName from tempSkills
        level: skill.level,
        yearsExperience: skill.yearsExperience || 1,
        updatedAt: skill.updatedAt
      }));

      // Prepare request payload
      const payload = {
        id: parseInt(employeeId),  // Ensure it's a number
        name: editedProfileData?.name || currentProfileData.name,
        email: editedProfileData?.email || currentProfileData.email,
        phone: editedProfileData?.phone || currentProfileData.phone,
        title: editedProfileData?.title || currentProfileData.title,
        company: editedProfileData?.company || currentProfileData.company,
        location: editedProfileData?.location || currentProfileData.location,
        bio: editedProfileData?.bio || currentProfileData.bio,
        education: editedProfileData?.education || currentProfileData.education,
        website: editedProfileData?.website || currentProfileData.website,
        github: editedProfileData?.github || currentProfileData.github,
        linkedin: editedProfileData?.linkedin || currentProfileData.linkedin,
        status: editedProfileData?.status || currentProfileData.status,
        role: editedProfileData?.role || currentProfileData.role,
        roleType: editedProfileData?.roleType || currentProfileData.roleType,
        notificationsEmail: editedProfileData?.notificationsEmail ?? currentProfileData.notificationsEmail,
        notificationsPush: editedProfileData?.notificationsPush ?? currentProfileData.notificationsPush,
        notificationsMarketing: editedProfileData?.notificationsMarketing ?? currentProfileData.notificationsMarketing,
        notificationsSecurity: editedProfileData?.notificationsSecurity ?? currentProfileData.notificationsSecurity,
        twoFactorEnabled: editedProfileData?.twoFactorEnabled ?? currentProfileData.twoFactorEnabled,
        skills: skillsArray.length > 0 ? skillsArray : undefined, // Only include if has skills
        currentPassword: passwordData.currentPassword || undefined,
        newPassword: passwordData.newPassword || undefined,
        profilePicture: profilePictureBase64,
        profilePictureType: profilePictureType,
        indicator: parseInt(employeeId) ? "U" : "I",
      };

      // Remove undefined values (not null or empty string)
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) {
          delete payload[key];
        }
      });

      // DEBUG: Log what's being sent
      // console.log("Final payload to send:", JSON.stringify(payload, null, 2));

      // Call API
      const result = await dispatch(updateEmployeeCompleteProfile(payload));

      if (result && result.type === "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS") {
        // Reload all data
        await loadAllData();

        // Reset form
        setNewSkill('');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });

        setSnackbarSeverity('success');
        // setSnackbarMessage('Profile updated successfully!');
        setSnackbarMessage(result?.payload.data[0].operationMessage);
        setSnackbarOpen(true);
        setEditMode(false);
      } else {
        throw new Error(result?.payload?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage(error.message || 'Failed to update profile');
      setSnackbarOpen(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveSkill = (skillId) => {
    setTempSkills(prev => prev.filter(skill => skill.id !== skillId));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);

      // For now, just update local state
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result);
        setUploading(false);

        // Note: Avatar upload would be part of the consolidated save
        setSnackbarSeverity('info');
        setSnackbarMessage('Profile picture will be saved when you click "Save Changes"');
        setSnackbarOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTwoFactorToggle = (enabled) => {
    setEditedProfileData(prev => ({
      ...prev,
      twoFactorEnabled: enabled,
    }));
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbarSeverity('error');
      setSnackbarMessage('New passwords do not match');
      setSnackbarOpen(true);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Password must be at least 6 characters long');
      setSnackbarOpen(true);
      return;
    }

    // Password change will be handled in the consolidated save
    setSnackbarSeverity('info');
    setSnackbarMessage('Password change will be applied when you save all changes');
    setSnackbarOpen(true);
    setChangePasswordDialogOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Done color="success" fontSize="small" />;
      case 'pending':
        return <Pending color="warning" fontSize="small" />;
      case 'failed':
        return <Error color="error" fontSize="small" />;
      default:
        return <Info color="info" fontSize="small" />;
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Never';

    const now = new Date();
    const past = new Date(timestamp);
    if (isNaN(past.getTime())) return 'Invalid date';

    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return past.toLocaleDateString();
  };

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Profile', icon: <AccountCircle /> },
    { label: 'Security', icon: <Security /> },
  ];

  const getSkillColor = (level) => {
    return skillLevelColors[level] || theme.palette.primary.main;
  };

  const safeAlpha = (color, opacity) => {
    try {
      return alpha(color, opacity);
    } catch (error) {
      return `rgba(25, 118, 210, ${opacity})`;
    }
  };

  if (!currentProfileData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* <PageHeader
        title="My Profile"
        subtitle="Manage your account information and preferences"
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
      /> */}

      {/* Update Progress Overlay */}
      {isUpdating && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <Card sx={{ width: 400, p: 3, textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Saving All Changes
            </Typography>
            <LinearProgress
              variant="determinate"
              value={updateProgress}
              sx={{ my: 2, height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary">
              {updateSteps.find(step => !step.completed)?.label || 'Finalizing...'}
            </Typography>
          </Card>
        </Box>
      )}

      <Box sx={{ position: 'relative', width: '100%', zIndex: 1 }}>
        <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 5 }, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={3} sx={{ width: '100%', m: 0, justifyContent: 'space-between' }}>
            {/* Left Column - Profile Overview */}
            <Grid item xs={12} md={4} lg={6} xl={5} width={{ xl: "20%", md: "40%", lg: "20%", xs: "100%" }}>
              <Grow in={true} timeout={300}>
                <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4], overflow: 'visible', position: 'relative', mb: 3 }}>
                  <Box sx={{
                    height: 80,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
                    borderRadius: '12px 12px 0 0',
                  }} />

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
                                  '&:hover': { bgcolor: theme.palette.primary.dark },
                                  width: 36,
                                  height: 36,
                                  border: `3px solid ${theme.palette.background.paper}`,
                                }}
                              >
                                {uploading ? <CircularProgress size={16} color="inherit" /> : <CameraAlt sx={{ fontSize: 16 }} />}
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
                          disabled={uploading || !editMode}
                        />
                        <Avatar
                          src={selectedAvatar}
                          sx={{
                            width: 120,
                            height: 120,
                            fontSize: '3rem',
                            bgcolor: theme.palette.primary.main,
                            border: `4px solid ${theme.palette.background.paper}`,
                            boxShadow: theme.shadows[4],
                          }}
                        >
                          {currentProfileData.name ? currentProfileData.name.charAt(0) : 'U'}
                        </Avatar>
                      </Badge>
                    </Box>

                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                      {currentProfileData.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {currentProfileData.title}
                    </Typography>
                    <Chip
                      label={currentProfileData.role}
                      color="primary"
                      size="small"
                      icon={<VerifiedUser sx={{ fontSize: 16 }} />}
                      sx={{ mb: 2 }}
                    />

                    {/* Last Update Indicator */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      mb: 3,
                      p: 1,
                      borderRadius: 2,
                      bgcolor: safeAlpha(theme.palette.success.main, 0.1),
                      border: `1px solid ${safeAlpha(theme.palette.success.main, 0.2)}`,
                    }}>
                      <Update sx={{ fontSize: 16, color: theme.palette.success.main }} />
                      <Typography variant="caption" color="text.secondary">
                        Last updated: {formatTimeAgo(currentProfileData.lastProfileUpdate)}
                      </Typography>
                    </Box>

                    {/* Changes Indicator */}
                    {editMode && hasChanges && (
                      <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                        <Typography variant="caption">
                          You have unsaved changes
                        </Typography>
                      </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                      <Button
                        variant={editMode ? 'contained' : 'outlined'}
                        startIcon={editMode ? <Save /> : <Edit />}
                        onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
                        fullWidth
                        disabled={isUpdating || (editMode && !hasChanges)}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[4] },
                        }}
                      >
                        {editMode ? 'Save All Changes' : 'Edit Profile'}
                      </Button>

                      {editMode && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            setEditMode(false);
                            setEditedProfileData(originalProfileData);
                            setTempSkills(profileSkills);
                            setNewSkill('');
                            setHasChanges(false);
                          }}
                          fullWidth
                          sx={{ py: 1.5, borderRadius: 2 }}
                        >
                          Cancel Editing
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grow>

              {/* Update History */}
              <Grow in={true} timeout={500}>
                <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4] }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Update History
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setUpdateHistoryExpanded(!updateHistoryExpanded)}
                      >
                        {updateHistoryExpanded ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>

                    <Collapse in={updateHistoryExpanded}>
                      <List dense>
                        {profileHistory.slice(0, 5).map((update) => (
                          <ListItem key={update.id} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              {getStatusIcon(update.status)}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2" fontWeight="medium">
                                  {update.fieldName} {update.action}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="caption" color="text.secondary">
                                    {formatTimeAgo(update.timestamp)}
                                  </Typography>
                                  <Chip
                                    label={update.status}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: '0.7rem',
                                      bgcolor: safeAlpha(
                                        update.status === 'completed'
                                          ? theme.palette.success.main
                                          : update.status === 'pending'
                                            ? theme.palette.warning.main
                                            : theme.palette.error.main,
                                        0.1
                                      ),
                                      color:
                                        update.status === 'completed'
                                          ? theme.palette.success.main
                                          : update.status === 'pending'
                                            ? theme.palette.warning.main
                                            : theme.palette.error.main,
                                    }}
                                  />
                                </Box>
                              }
                              slotProps={{
                                secondary: { component: 'span' }    // ✅ New correct API (no <p>)
                              }}
                            />

                          </ListItem>
                        ))}
                      </List>
                    </Collapse>

                    <Button
                      fullWidth
                      startIcon={<History />}
                      onClick={() => setUpdateHistoryExpanded(!updateHistoryExpanded)}
                      sx={{ mt: 2 }}
                    >
                      {updateHistoryExpanded ? 'Show Less' : 'Show Update History'}
                    </Button>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            {/* Right Column - Main Content */}
            <Grid item xs={12} md={8} width={{ xl: "78%", md: "55%", lg: "78%", xs: "100%" }}>
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
                    value={index}
                    icon={tab.icon}
                    label={tab.label}
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
              <Zoom in={true} timeout={400}>
                <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: theme.shadows[4], mb: 3 }}>

                  <Box sx={{ p: { xs: 2, sm: 3 } }}>
                    {activeTab === 0 && (
                      <>
                        {/* Profile Update Status Banner */}
                        {editMode && (
                          <Alert
                            severity="info"
                            icon={<Update />}
                            sx={{ mb: 3, borderRadius: 2 }}
                          >
                            <AlertTitle>Editing Mode Active</AlertTitle>
                            All changes will be saved together in a single API call when you click "Save All Changes".
                          </Alert>
                        )}

                        <Box sx={{ mb: 4 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" fontWeight="bold">
                              Basic Information
                            </Typography>
                          </Box>

                          <Grid container spacing={2}>
                            {[
                              { field: 'name', label: 'Full Name' },
                              { field: 'title', label: 'Job Title' },
                              { field: 'company', label: 'Company' },
                              { field: 'location', label: 'Location' },
                              { field: 'email', label: 'Email' },
                              { field: 'phone', label: 'Phone' },
                              { field: 'github', label: 'github' },
                              { field: 'linkedin', label: 'linkedIn' },
                              { field: 'education', label: 'education' },
                              { field: 'website', label: 'website' },
                              { field: 'status', label: 'status' },
                              { field: 'role', label: 'role' },
                              { field: 'roleType', label: 'roleType' },
                            ].map((item) => (
                              <Grid item xs={12} sm={6} key={item.field}>
                                <TextField
                                  fullWidth
                                  label={item.label}
                                  value={editedProfileData?.[item.field] || currentProfileData[item.field] || ''}
                                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                                  disabled={!editMode}
                                  size="small"
                                  InputProps={{
                                    sx: { borderRadius: 2 },
                                  }}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Box>

                        {/* <Divider sx={{ my: 4 }}>
                          <Chip label="About" size="small" />
                        </Divider> */}

                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                            Bio
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={editedProfileData?.bio || currentProfileData.bio || ''}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            disabled={!editMode}
                            size="small"
                            InputProps={{
                              sx: { borderRadius: 2 },
                            }}
                            helperText={editMode ? "Briefly describe yourself and your experience" : ""}
                          />
                        </Box>

                        {/* <Divider sx={{ my: 4 }}>
                          <Chip label="Skills & Expertise" size="small" />
                        </Divider> */}

                        <Box sx={{ mb: 4 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Box>
                              <Typography variant="h6" fontWeight="bold">
                                Skills
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {tempSkills.length} skills • {editMode ? 'Edit mode' : 'View mode'}
                              </Typography>
                            </Box>
                            {editMode && (
                              <Button
                                startIcon={<Add />}
                                size="small"
                                onClick={handleAddSkill}
                                sx={{ borderRadius: 2 }}
                              >
                                Add Skill
                              </Button>
                            )}
                          </Box>

                          {editMode && (
                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Enter a new skill (e.g., GraphQL)"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                InputProps={{
                                  sx: { borderRadius: 2 },
                                  endAdornment: (
                                    <Tooltip title="Press Enter to add">
                                      <ArrowForward sx={{ color: 'text.disabled' }} />
                                    </Tooltip>
                                  ),
                                }}
                              />
                              <Button
                                variant="contained"
                                onClick={handleAddSkill}
                                sx={{ borderRadius: 2, minWidth: 100 }}
                                disabled={!newSkill.trim()}
                              >
                                Add
                              </Button>
                            </Box>
                          )}

                          <Grid container spacing={2}>
                            {tempSkills.map((skill) => {
                              const skillColor = getSkillColor(skill.level);
                              return (
                                <Grid item xs={12} sm={6} md={4} key={skill.id}>
                                  <Card sx={{ borderRadius: 2, transition: 'all 0.3s ease' }}>
                                    <CardContent sx={{ p: 2 }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                          {skill.skillName}
                                          {skill.isNew && (
                                            <Chip
                                              label="New"
                                              size="small"
                                              color="success"
                                              sx={{ ml: 1, height: 16, fontSize: '0.6rem' }}
                                            />
                                          )}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                          {editMode && (
                                            <>
                                              <Tooltip title="Remove skill">
                                                <IconButton
                                                  size="small"
                                                  onClick={() => handleRemoveSkill(skill.id)}
                                                >
                                                  <Delete fontSize="small" />
                                                </IconButton>
                                              </Tooltip>
                                              <Select
                                                value={skill.level}
                                                onChange={(e) => handleUpdateSkillLevel(skill.id, e.target.value)}
                                                size="small"
                                                sx={{ minWidth: 120 }}
                                                disabled={!editMode}
                                              >
                                                <MenuItem value="Beginner">Beginner</MenuItem>
                                                <MenuItem value="Intermediate">Intermediate</MenuItem>
                                                <MenuItem value="Advanced">Advanced</MenuItem>
                                                <MenuItem value="Expert">Expert</MenuItem>
                                              </Select>
                                            </>
                                          )}
                                          {!editMode && (
                                            <Chip
                                              label={skill.level}
                                              size="small"
                                              sx={{
                                                bgcolor: safeAlpha(skillColor, 0.1),
                                                color: skillColor,
                                                fontWeight: 'bold',
                                              }}
                                            />
                                          )}
                                        </Box>
                                      </Box>

                                      {editMode && (
                                        <Box sx={{ mb: 1 }}>
                                          <LinearProgress
                                            variant="determinate"
                                            value={(['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(skill.level) + 1) * 25}
                                            sx={{
                                              height: 6,
                                              borderRadius: 3,
                                              bgcolor: safeAlpha(skillColor, 0.1),
                                              '& .MuiLinearProgress-bar': {
                                                bgcolor: skillColor,
                                              },
                                            }}
                                          />
                                        </Box>
                                      )}

                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {editMode ? (
                                          <Chip
                                            label={skill.level}
                                            size="small"
                                            sx={{
                                              bgcolor: safeAlpha(skillColor, 0.1),
                                              color: skillColor,
                                              fontWeight: 'bold',
                                            }}
                                          />
                                        ) : (
                                          <Typography variant="caption" color="text.secondary">
                                            Level: {skill.level}
                                          </Typography>
                                        )}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          <Typography variant="caption" color="text.secondary">
                                            &nbsp;{skill.yearsExperience} year{skill.yearsExperience > 1 ? 's' : ''}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      </>
                    )}

                    {activeTab === 1 && (
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                          <Typography variant="h6" fontWeight="bold">
                            Security Settings
                          </Typography>
                        </Box>

                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                              <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                  <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      Password
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Change your account password
                                    </Typography>
                                  </Box>
                                  <Button
                                    variant="outlined"
                                    onClick={() => setChangePasswordDialogOpen(true)}
                                    disabled={!editMode}
                                  >
                                    Change Password
                                  </Button>
                                </Box>

                                <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                                  Password changes will be saved together with other profile updates.
                                </Alert>
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
                                        checked={editedProfileData?.twoFactorEnabled ?? currentProfileData.twoFactorEnabled}
                                        onChange={(e) => handleTwoFactorToggle(e.target.checked)}
                                        color="primary"
                                        disabled={!editMode}
                                      />
                                    }
                                    label=""
                                  />
                                </Box>
                                {currentProfileData.twoFactorEnabled ? (
                                  <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                                    <AlertTitle>2FA Active</AlertTitle>
                                    Two-factor authentication is currently protecting your account.
                                  </Alert>
                                ) : (
                                  <Alert severity="warning" sx={{ mt: 2, borderRadius: 2 }}>
                                    <AlertTitle>2FA Not Active</AlertTitle>
                                    Enable two-factor authentication for enhanced security.
                                  </Alert>
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordDialogOpen}
        onClose={() => !isUpdating && setChangePasswordDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        disableRestoreFocus
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Stepper activeStep={changePasswordStep} sx={{ my: 3 }}>
            <Step>
              <StepLabel>Enter Current Password</StepLabel>
            </Step>
            <Step>
              <StepLabel>Set New Password</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm Change</StepLabel>
            </Step>
          </Stepper>

          {changePasswordStep === 0 && (
            <Box>
              <TextField
                fullWidth
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary" paragraph>
                Enter your current password to continue.
              </Typography>
            </Box>
          )}

          {changePasswordStep === 1 && (
            <Box>
              <TextField
                fullWidth
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary" paragraph>
                Enter and confirm your new password.
              </Typography>
            </Box>
          )}

          {changePasswordStep === 2 && (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                <AlertTitle>Ready to Update</AlertTitle>
                Password change will be saved together with other profile updates when you click "Save All Changes".
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setChangePasswordDialogOpen(false);
              setChangePasswordStep(0);
            }}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          {changePasswordStep < 2 ? (
            <Button
              variant="contained"
              onClick={() => setChangePasswordStep(prev => prev + 1)}
              disabled={isUpdating}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                handleChangePassword();
                setChangePasswordStep(0);
              }}
              disabled={isUpdating}
            >
              Save Password Change
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar for updates */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          icon={snackbarSeverity === 'success' ? <CheckCircle /> : <Error />}
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