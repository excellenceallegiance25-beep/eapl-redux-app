import AccountCircle from "@mui/icons-material/AccountCircle";
import Add from "@mui/icons-material/Add";
import ArrowForward from "@mui/icons-material/ArrowForward";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CameraAlt from "@mui/icons-material/CameraAlt";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Delete from "@mui/icons-material/Delete";
import Done from "@mui/icons-material/Done";
import Edit from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import History from "@mui/icons-material/History";
import Info from "@mui/icons-material/Info";
import Pending from "@mui/icons-material/Pending";
import Person from "@mui/icons-material/Person";
import Save from "@mui/icons-material/Save";
import Security from "@mui/icons-material/Security";
import Update from "@mui/icons-material/Update";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Visibility from "@mui/icons-material/Visibility";
import {
  Alert,
  AlertTitle,
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControlLabel,
  Grid,
  Grow,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LeaveFormDialog from "../components/dashboardmenu/LeaveFormDialog";
import {
  getEmpAppliedLeaveList,
  getEmployeePHistoryList,
  getEmployeeProfileList,
  getEmployeeSkillList,
  updateEmployeeCompleteProfile, // Your existing generic API
} from "../services/AppConfigAction";
import Swal from "sweetalert2";

const Profile = () => {
  const { userId } = useParams(); // This gets the userId from URL
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [leaves, setLeaves] = useState([]);
  // const [filteredLeaves, setfilteredLeaves] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [editMode, setEditMode] = useState(false);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [updateHistoryExpanded, setUpdateHistoryExpanded] = useState(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const [updateSteps, setUpdateSteps] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changePasswordStep, setChangePasswordStep] = useState(0);
  const [avatarChanged, setAvatarChanged] = useState(false);
  // Separate states for each data type
  const [originalProfileData, setOriginalProfileData] = useState(null);
  const [editedProfileData, setEditedProfileData] = useState(null);
  const [profileSkills, setProfileSkills] = useState([]);
  const [profileHistory, setProfileHistory] = useState([]);
  const [tempSkills, setTempSkills] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selectedLeaves, setSelectedLeaves] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  // Add this with your other state declarations
  const [passwordChanged, setPasswordChanged] = useState(false);
  // Add this with your other state declarations (around line 60-70)
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  // Format leave data for DataGrid
  const formatLeavesForGrid = (leavesData) => {
    return leavesData.map((leave, index) => ({
      id: leave.leaveId || index,
      leaveId: leave.leaveId,
      employeeName: leave.employeeName,
      employeeId: leave.employeeId,
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      duration: leave.isHalfDay === "t" ? "Half Day" : "Full Day",
      halfDayPeriod: leave.halfDayPeriod,
      totalDays: leave.totalDays,
      status: leave.status,
      reason: leave.reason,
      appliedDate: leave.appliedDate,
      approvedBy: leave.approvedBy,
      approvedDate: leave.approvedDate,
      rejectionReason: leave.rejectionReason,
      isHalfDay: leave.isHalfDay,
    }));
  };

  // useEffect(() => {
  //   const loadConfigs = async () => {
  //     try {
  //       const result = await dispatch(getEmpAppliedLeaveList());
  //       console.log('Leave loaded successfully', 'success');
  //       if (result.type === "LEAVE_LIST") {
  //         // Ensure data matches the expected structure
  //         const formattedServices = result.payload.dataList.map(leave => ({
  //           ...leave,
  //         })).sort((a, b) => parseInt(b.leaveId) - parseInt(a.leaveId));
  //         setLeaves(formattedServices);
  //       }
  //     } catch (error) {
  //       console.error('Error loading services:', error);
  //     }
  //   };

  //   loadConfigs();
  // }, [dispatch]);

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        const result = await dispatch(getEmpAppliedLeaveList());
        // console.log('Leave loaded successfully', 'success');

        if (result.type === "LEAVE_LIST") {
          // Filter leaves for the current user
          const filteredLeaves = result.payload.dataList.filter(
            (leave) =>
              // Compare as strings since employeeId from API is string
              leave.employeeId === user?.id?.toString(),
          );

          // Ensure data matches the expected structure
          const formattedServices = filteredLeaves
            .map((leave) => ({
              ...leave,
            }))
            .sort((a, b) => {
              // First sort by appliedDate (descending - newest first)
              const dateDiff =
                new Date(b.appliedDate) - new Date(a.appliedDate);

              // If same date, sort by leaveId (descending - newest first)
              if (dateDiff === 0) {
                return parseInt(b.leaveId) - parseInt(a.leaveId);
              }

              return dateDiff;
            });

          setLeaves(formattedServices);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      }
    };

    // Only load if user is available
    if (user?.id) {
      loadConfigs();
    }
  }, [dispatch, user?.id]); // Add user?.id as dependency

  // Filter leaves based on search
  const filteredLeaves = leaves.filter((leave) => {
    if (!searchText.trim()) return true;

    const searchLower = searchText.toLowerCase();
    return (
      (leave.employeeName || "").toLowerCase().includes(searchLower) ||
      String(leave.employeeId || "")
        .toLowerCase()
        .includes(searchLower) ||
      (leave.leaveType || "").toLowerCase().includes(searchLower) ||
      (leave.status || "").toLowerCase().includes(searchLower)
    );
  });

  // Add these to your component state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [viewMode, setViewMode] = useState(false); // Add this state

  // Handler function for view details
  const handleViewDetails = (rowData) => {
    // console.log("Viewing leave details:", rowData);
    setCurrentLeave(rowData);
    setDialogOpen(true);
    setViewMode(true);
  };

  // Handler for form submission (if needed)
  const handleFormSubmit = async (formData) => {
    try {
      // Your submit logic here
      // console.log("Form submitted:", formData);

      // Close dialog after successful submission
      setDialogOpen(false);
      setCurrentLeave(null);

      // Refresh leave list if needed
      // await loadLeaves();

      return { success: true, message: "Leave updated successfully" };
    } catch (error) {
      console.error("Error submitting form:", error);
      return { success: false, message: error.message };
    }
  };

  // Handler for closing dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentLeave(null);
    setViewMode(false);
  };

  // Column definitions
  const columns = [
    {
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Tooltip title="View Details">
            <IconButton
              size="small"
              color="info"
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click event
                handleViewDetails(params.row);
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "employeeName",
      headerName: "Employee",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "leaveType",
      headerName: "Leave Type",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color="primary"
          variant="outlined"
        />
      ),
    },
    {
      field: "period",
      headerName: "Period",
      width: 230,
      // align: 'center',
      // headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: 'center',
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="body2">
            {params.row.startDate} &nbsp; to &nbsp; {params.row.endDate}
          </Typography>
        </Box>
      ),
    },
    {
      field: "isHalfDay",
      headerName: "Duration",
      width: 160,
      renderCell: (params) => {
        const durationText =
          params.row.isHalfDay === "t"
            ? `Half Day (${params.row.halfDayPeriod})`
            : `Full Day (${params.row.totalDays} day${params.row.totalDays > 1 ? "s" : ""})`;

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // justifyContent: 'center',
              height: "100%",
              width: "100%",
            }}
          >
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              {durationText}
            </Typography>
          </Box>
        );
      },
    },
    // {
    //   field: 'totalDays',
    //   headerName: 'Total Days',
    //   width: 100,
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderCell: (params) => (
    //     <Chip
    //       label={params.value}
    //       size="small"
    //       color="default"
    //       variant="filled"
    //     />
    //   ),
    // },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const getStatusColor = (status) => {
          switch (status?.toLowerCase()) {
            case "approved":
              return "success";
            case "pending":
              return "warning";
            case "rejected":
              return "error";
            default:
              return "default";
          }
        };

        const formatStatus = (status) =>
          status ? status.charAt(0).toUpperCase() + status.slice(1) : "";

        return (
          <Chip
            label={formatStatus(params.value)}
            color={getStatusColor(params.value)}
            size="small"
            sx={{ fontWeight: "medium" }}
          />
        );
      },
    },
    {
      field: "appliedDate",
      headerName: "Applied Date",
      width: 130,
    },
    {
      field: "reason",
      headerName: "Leave Reason",
      width: 330,
      // align: 'center',
      // headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: 'center',
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
  ];

  const handleRefresh = () => {
    // Refresh data logic
    console.log("Refreshing leaves data...");
  };

  const handleExport = () => {
    // Export data logic
    console.log("Exporting leaves data...");
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedLeaves(newSelection);
  };

  // Load all data
  useEffect(() => {
    loadAllData();
  }, [dispatch]);

  const loadAllData = async () => {
    try {
      await Promise.all([loadProfileData(), loadSkills(), loadHistory()]);
      setHasChanges(false);
    } catch (error) {
      console.error("Error loading profile data:", error);
      Swal.fire({
        icon: "error",
        title: "Profile Error",
        text: "Failed to load profile data",
      });
    }
  };

  const loadProfileData = async () => {
    const result = await dispatch(getEmployeeProfileList());

    if (
      result.type === "EMP_INFO_LIST" &&
      result.payload &&
      result.payload.length > 0
    ) {
      // Get the current logged-in user from Redux auth state
      const currentUserId = user?.id;

      // Find the profile data that matches the logged-in user
      let userProfileData = null;

      if (currentUserId) {
        // Try to find by matching ID
        userProfileData = result.payload.find(
          (emp) => emp.id === currentUserId,
        );
      }

      // If not found by ID, try to find by email
      if (!userProfileData && user?.email) {
        userProfileData = result.payload.find(
          (emp) =>
            emp.email && emp.email.toLowerCase() === user.email.toLowerCase(),
        );
      }

      // If still not found, use the first item (fallback)
      if (!userProfileData) {
        userProfileData = result.payload[0];
        console.warn(
          "Could not find exact user profile, using first available",
        );
      }

      // Set the picture if available
      if (userProfileData) {
        let picture = null;

        if (
          userProfileData.profilePicture &&
          userProfileData.profilePictureType
        ) {
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
      console.error("No profile data found in API response");
    }
  };

  const loadSkills = async () => {
    const result = await dispatch(getEmployeeSkillList());
    const currentUserId = user?.id;

    if (result.type === "EMP_SKILL_LIST" && result.payload) {
      // Filter skills for the current user
      const userSkills = Array.isArray(result.payload)
        ? result.payload.filter((skill) => skill.employeeId === currentUserId)
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
    // console.log("Current user ID:", currentUserId);

    if (
      result.type === "EMP_HISTORY_LIST" &&
      result.payload &&
      Array.isArray(result.payload)
    ) {
      // Filter history for the current user only
      const userHistory = result.payload.filter(
        (history) => Number(history.employeeId) === Number(currentUserId),
      );

      // console.log('Filtered user history:', userHistory);

      // Sort by timestamp (newest first)
      const sortedHistory = userHistory.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
      );

      setProfileHistory(sortedHistory);
    } else {
      // console.warn('No history data found');
      setProfileHistory([]);
    }
  };

  const skillLevelColors = {
    Beginner: theme.palette.info?.main || "#0288d1",
    Intermediate: theme.palette.success?.main || "#2e7d32",
    Advanced: theme.palette.warning?.main || "#ed6c02",
    Expert: theme.palette.error?.main || "#d32f2f",
  };

  // Default profile data if API returns null
  const defaultProfileData = {
    name: user?.name || profile?.name || "E A P L",
    email: user?.email || profile?.email || "eapl@example.com",
    phone: user?.phone || "555-123-4567",
    title: user?.title || "Senior Software Engineer",
    company: user?.company || "Excellence Allegiance Pvt Ltd",
    location: user?.location || "San Francisco, CA",
    bio:
      user?.bio ||
      "Passionate software engineer with 8+ years of experience in building scalable web applications and cloud solutions.",
    education: user?.education || "M.S. Computer Science, Stanford University",
    website: user?.website || "https://johndoe.dev",
    github: user?.github || "https://github.com/johndoe",
    linkedin: user?.linkedin || "https://linkedin.com/in/johndoe",
    joinedDate: user?.joinedDate || "January 2022",
    status: user?.status || "Active",
    role: user?.role || "Senior Developer",
    roleType: user?.roleType || "Full-time",
    notificationsEmail: user?.notificationsEmail || true,
    notificationsPush: user?.notificationsPush || true,
    notificationsMarketing: user?.notificationsMarketing || false,
    notificationsSecurity: user?.notificationsSecurity || true,
    twoFactorEnabled: user?.twoFactorEnabled || false,
    lastProfileUpdate: user?.lastProfileUpdate || new Date().toISOString(),
  };

  // Use actual data or defaults
  const currentProfileData =
    editedProfileData || originalProfileData || defaultProfileData;

  // Check for changes
  useEffect(() => {
    if (editMode) {
      const profileChanged =
        JSON.stringify(editedProfileData) !==
        JSON.stringify(originalProfileData);
      const skillsChanged =
        JSON.stringify(tempSkills) !== JSON.stringify(profileSkills);
      const passwordHasChanges =
        passwordChanged &&
        (passwordData.newPassword || passwordData.currentPassword);
      setHasChanges(
        profileChanged ||
          skillsChanged ||
          newSkill.trim() !== "" ||
          passwordHasChanges ||
          avatarChanged,
      );
    }
  }, [
    editMode,
    editedProfileData,
    originalProfileData,
    tempSkills,
    profileSkills,
    newSkill,
    passwordChanged,
    passwordData.newPassword,
    passwordData.currentPassword,
    avatarChanged,
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // const handleInputChangedd = (field, value) => {
  //   setEditedProfileData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  const handleInputChange = (field, value) => {
    // Special handling for phone field
    if (field === "phone") {
      // Remove non-digits and limit to 10 characters
      const digitsOnly = value.replace(/\D/g, "");
      const truncated = digitsOnly.slice(0, 10);

      setEditedProfileData((prev) => ({
        ...prev,
        [field]: truncated,
      }));
    } else {
      // For all other fields, handle normally
      setEditedProfileData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // When adding a new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const newSkillObj = {
        id: `temp-${Date.now()}`, // Temporary ID for UI only
        skillName: newSkill.trim(),
        level: "Beginner",
        yearsExperience: 1,
        updatedAt: new Date().toISOString().split("T")[0],
      };

      setTempSkills((prev) => [...prev, newSkillObj]);
      setNewSkill("");
    }
  };

  // When updating skill level
  const handleUpdateSkillLevel = (skillId, newLevel) => {
    setTempSkills((prev) =>
      prev.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              level: newLevel,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : skill,
      ),
    );
  };

  const handleSaveProfile = async () => {
    setIsUpdating(true);

    try {
      const employeeId = currentProfileData.id;

      // Convert profile picture to base64 if selected
      let profilePictureBase64 = null;
      let profilePictureType = null;
      if (selectedAvatar && selectedAvatar.startsWith("data:")) {
        profilePictureBase64 = selectedAvatar;
        // Extract MIME type from data URL
        const match = selectedAvatar.match(/^data:([^;]+);base64,/);
        if (match) {
          profilePictureType = match[1];
        }
      }

      // FIXED: Prepare skills array matching backend SkillUpdateRequest
      const skillsArray = tempSkills.map((skill) => ({
        employeeId: parseInt(employeeId), // Make sure it's a number
        skillName: skill.skillName, // Use the skillName from tempSkills
        level: skill.level,
        yearsExperience: skill.yearsExperience || 1,
        updatedAt: skill.updatedAt,
      }));

      // Prepare request payload
      const payload = {
        id: parseInt(employeeId), // Ensure it's a number
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
        notificationsEmail:
          editedProfileData?.notificationsEmail ??
          currentProfileData.notificationsEmail,
        notificationsPush:
          editedProfileData?.notificationsPush ??
          currentProfileData.notificationsPush,
        notificationsMarketing:
          editedProfileData?.notificationsMarketing ??
          currentProfileData.notificationsMarketing,
        notificationsSecurity:
          editedProfileData?.notificationsSecurity ??
          currentProfileData.notificationsSecurity,
        twoFactorEnabled:
          editedProfileData?.twoFactorEnabled ??
          currentProfileData.twoFactorEnabled,
        skills: skillsArray.length > 0 ? skillsArray : undefined, // Only include if has skills
        currentPassword: passwordData.currentPassword || undefined,
        newPassword: passwordData.newPassword || undefined,
        profilePicture: profilePictureBase64,
        profilePictureType: profilePictureType,
        indicator: parseInt(employeeId) ? "U" : "I",
        // // Only include password if changed
        // ...(passwordChanged && {
        //   currentPassword: passwordData.currentPassword,
        //   newPassword: passwordData.newPassword,
        // }),
      };

      // Remove undefined values (not null or empty string)
      Object.keys(payload).forEach((key) => {
        if (payload[key] === undefined) {
          delete payload[key];
        }
      });

      const result = await dispatch(updateEmployeeCompleteProfile(payload));

      if (result && result.type === "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS") {
        // Reload all data
        await loadAllData();

        // Reset form
        setNewSkill("");
        setPasswordChanged(false); // Reset password changed state
        setAvatarChanged(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result?.payload?.message || "Profile updated successfully!",
          timer: 2500,
          showConfirmButton: false,
        });
        setEditMode(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: result?.payload?.message || "Failed to update profile",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveSkill = (skillId) => {
    setTempSkills((prev) => prev.filter((skill) => skill.id !== skillId));
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
        setAvatarChanged(true);
        // Note: Avatar upload would be part of the consolidated save
        Swal.fire({
          icon: "info",
          title: "Info",
          text: 'Profile picture will be saved when you click "Save Changes"',
          timer: 2500,
          showConfirmButton: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTwoFactorToggle = (enabled) => {
    setEditedProfileData((prev) => ({
      ...prev,
      twoFactorEnabled: enabled,
    }));
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "New passwords do not match",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "New Password Error",
        text: "Password must be at least 6 characters long",
      });
      return;
    }

    // Mark that password has been changed
    setPasswordChanged(true);

    // Password change will be handled in the consolidated save
    Swal.fire({
      icon: "info",
      title: "Info",
      text: "Password change will be applied when you save all changes",
      timer: 2500,
      showConfirmButton: false,
    });
    setChangePasswordDialogOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <Done color="success" fontSize="small" />;
      case "pending":
        return <Pending color="warning" fontSize="small" />;
      case "failed":
        return <ErrorIcon color="error" fontSize="small" />;
      default:
        return <Info color="info" fontSize="small" />;
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Never";

    const now = new Date();
    const past = new Date(timestamp);
    if (isNaN(past.getTime())) return "Invalid date";

    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return past.toLocaleDateString();
  };

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Profile", icon: <AccountCircle /> },
    { label: "Security", icon: <Security /> },
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "90vh", py: 8 }}>
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

      <Accordion
        sx={{
          m: { xs: 1, sm: 1.5, md: 2, lg: 3 },
          boxShadow: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMore
              sx={{
                color: "white",
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
              }}
            />
          }
          sx={{
            bgcolor: "#6288a6",
            borderTopLeftRadius: { xs: 8, sm: 10, md: 12 },
            borderTopRightRadius: { xs: 8, sm: 10, md: 12 },
            minHeight: { xs: 48, sm: 52, md: 56 },
            "&.Mui-expanded": {
              minHeight: { xs: 48, sm: 52, md: 56 },
              borderBottom: "1px solid",
              bgcolor: "#037294",
              borderColor: "divider",
            },
            px: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              pr: { xs: 1, sm: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              <Person
                sx={{
                  color: "white",
                  fontSize: { xs: 20, sm: 24, md: 26, lg: 28 },
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                color="white"
                sx={{
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.125rem",
                    lg: "1.25rem",
                  },
                }}
              >
                Profile Management
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ p: { xs: 1, sm: 1.5, md: 2, lg: 3 } }}>
          {/* Update Progress Overlay */}
          {isUpdating && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                backdropFilter: "blur(4px)",
              }}
            >
              <Card
                sx={{
                  width: { xs: "90%", sm: 400 },
                  p: { xs: 2, sm: 3 },
                  textAlign: "center",
                  borderRadius: { xs: 2, sm: 3 },
                }}
              >
                <CircularProgress size={isMobile ? 40 : 48} sx={{ mb: 2 }} />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}
                >
                  Saving All Changes
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={updateProgress}
                  sx={{ my: 2, height: { xs: 6, sm: 8 }, borderRadius: 4 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                >
                  {updateSteps.find((step) => !step.completed)?.label ||
                    "Finalizing..."}
                </Typography>
              </Card>
            </Box>
          )}

          <Box sx={{ position: "relative", width: "100%", zIndex: 1 }}>
            <Container
              maxWidth="xl"
              sx={{
                py: { xs: 2, sm: 3, md: 4, lg: 5 },
                px: { xs: 1, sm: 2, md: 2.5, lg: 3 },
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* TWO COLUMN LAYOUT */}
              <Grid
                container
                spacing={{ xs: 2, sm: 2.5, md: 3 }}
                sx={{ width: "100%", m: 0 }}
              >
                {/* LEFT COLUMN - Profile Overview (30% width on large screens) */}
                <Grid
                  item
                  xs={12} // Full width on mobile
                  md={4} // 4/12 = 33% on medium screens
                  lg={4} // 4/12 = 33% on large screens
                  xl={3} // 3/12 = 25% on extra large screens
                  sx={{
                    px: { xs: 1, sm: 1.5, md: 2 },
                  }}
                >
                  {/* Profile Card */}
                  <Grow in={true} timeout={300}>
                    <Card
                      sx={{
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                        boxShadow: theme.shadows[4],
                        overflow: "visible",
                        position: "relative",
                        mb: { xs: 2, sm: 3 },
                      }}
                    >
                      <Box
                        sx={{
                          height: { xs: 60, sm: 70, md: 80 },
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
                          borderRadius: {
                            xs: "8px 8px 0 0",
                            sm: "10px 10px 0 0",
                            md: "12px 12px 0 0",
                          },
                        }}
                      />

                      <CardContent
                        sx={{
                          textAlign: "center",
                          p: { xs: 2, sm: 2.5, md: 3 },
                          pt: 0,
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            mt: { xs: -4, sm: -5, md: -6 },
                          }}
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <Tooltip title="Change avatar">
                                <label htmlFor="avatar-upload">
                                  <IconButton
                                    component="span"
                                    sx={{
                                      bgcolor: theme.palette.primary.main,
                                      color: "white",
                                      "&:hover": {
                                        bgcolor: theme.palette.primary.dark,
                                      },
                                      width: { xs: 28, sm: 32, md: 36 },
                                      height: { xs: 28, sm: 32, md: 36 },
                                      border: `3px solid ${theme.palette.background.paper}`,
                                    }}
                                  >
                                    {uploading ? (
                                      <CircularProgress
                                        size={14}
                                        color="inherit"
                                      />
                                    ) : (
                                      <CameraAlt
                                        sx={{
                                          fontSize: { xs: 12, sm: 14, md: 16 },
                                        }}
                                      />
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
                              style={{ display: "none" }}
                              onChange={handleAvatarUpload}
                              disabled={uploading || !editMode}
                            />
                            <Avatar
                              src={selectedAvatar}
                              sx={{
                                width: { xs: 80, sm: 100, md: 110, lg: 120 },
                                height: { xs: 80, sm: 100, md: 110, lg: 120 },
                                fontSize: {
                                  xs: "2rem",
                                  sm: "2.5rem",
                                  md: "3rem",
                                },
                                bgcolor: theme.palette.primary.main,
                                border: `4px solid ${theme.palette.background.paper}`,
                                boxShadow: theme.shadows[4],
                              }}
                            >
                              {currentProfileData.name
                                ? currentProfileData.name.charAt(0)
                                : "U"}
                            </Avatar>
                          </Badge>
                        </Box>

                        <Typography
                          variant="h5"
                          gutterBottom
                          fontWeight="bold"
                          sx={{
                            mt: { xs: 1, sm: 1.5, md: 2 },
                            fontSize: {
                              xs: "1.1rem",
                              sm: "1.2rem",
                              md: "1.3rem",
                              lg: "1.4rem",
                            },
                          }}
                        >
                          {currentProfileData.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          paragraph
                          sx={{
                            fontSize: {
                              xs: "0.85rem",
                              sm: "0.9rem",
                              md: "1rem",
                            },
                          }}
                        >
                          {currentProfileData.title}
                        </Typography>
                        <Chip
                          label={currentProfileData.role}
                          color="primary"
                          size="small"
                          icon={
                            <VerifiedUser
                              sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                            />
                          }
                          sx={{
                            mb: 2,
                            height: { xs: 24, sm: 28, md: 32 },
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.75rem",
                              md: "0.8rem",
                            },
                          }}
                        />

                        {/* Last Update Indicator */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            mb: 3,
                            p: 1,
                            borderRadius: 2,
                            bgcolor: safeAlpha(theme.palette.success.main, 0.1),
                            border: `1px solid ${safeAlpha(theme.palette.success.main, 0.2)}`,
                          }}
                        >
                          <Update
                            sx={{
                              fontSize: { xs: 14, sm: 16 },
                              color: theme.palette.success.main,
                            }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                          >
                            Last updated:{" "}
                            {formatTimeAgo(
                              currentProfileData.lastProfileUpdate,
                            )}
                          </Typography>
                        </Box>

                        {/* Changes Indicator */}
                        {editMode && hasChanges && (
                          <Alert
                            severity="info"
                            sx={{ mb: 2, borderRadius: 2 }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                            >
                              You have unsaved changes
                            </Typography>
                          </Alert>
                        )}

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: { xs: 1.5, sm: 2 },
                            mt: 3,
                          }}
                        >
                          <Button
                            variant={editMode ? "contained" : "outlined"}
                            startIcon={
                              editMode ? (
                                <Save
                                  sx={{
                                    fontSize: { xs: "1rem", sm: "1.2rem" },
                                  }}
                                />
                              ) : (
                                <Edit
                                  sx={{
                                    fontSize: { xs: "1rem", sm: "1.2rem" },
                                  }}
                                />
                              )
                            }
                            onClick={
                              editMode
                                ? handleSaveProfile
                                : () => setEditMode(true)
                            }
                            fullWidth
                            disabled={isUpdating || (editMode && !hasChanges)}
                            size={isMobile ? "small" : "medium"}
                            sx={{
                              py: { xs: 1, sm: 1.2, md: 1.5 },
                              borderRadius: 2,
                              fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "1rem",
                              },
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: isDesktop
                                  ? "translateY(-2px)"
                                  : "none",
                                boxShadow: theme.shadows[4],
                              },
                            }}
                          >
                            {editMode ? "Save All Changes" : "Edit Profile"}
                          </Button>

                          {editMode && (
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                setEditMode(false);
                                setEditedProfileData(originalProfileData);
                                setTempSkills(profileSkills);
                                setNewSkill("");
                                setPasswordChanged(false);
                                setAvatarChanged(false);
                                setPasswordData({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
                                setHasChanges(false);
                              }}
                              fullWidth
                              size={isMobile ? "small" : "medium"}
                              sx={{
                                py: { xs: 1, sm: 1.2, md: 1.5 },
                                borderRadius: 2,
                                fontSize: {
                                  xs: "0.8rem",
                                  sm: "0.9rem",
                                  md: "1rem",
                                },
                              }}
                            >
                              Cancel Editing
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>

                  {/* Update History - Only shown on mobile (below) and desktop (in right column) */}
                  {/* This will automatically stack below on mobile due to grid */}
                  <Grow in={true} timeout={500}>
                    <Card
                      sx={{
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                        boxShadow: theme.shadows[4],
                        display: { xs: "block", md: "block" }, // Always show
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                              fontSize: {
                                xs: "1rem",
                                sm: "1.1rem",
                                md: "1.2rem",
                              },
                            }}
                          >
                            Update History
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              setUpdateHistoryExpanded(!updateHistoryExpanded)
                            }
                          >
                            {updateHistoryExpanded ? (
                              <ExpandLess
                                sx={{
                                  fontSize: { xs: "1.2rem", sm: "1.3rem" },
                                }}
                              />
                            ) : (
                              <ExpandMore
                                sx={{
                                  fontSize: { xs: "1.2rem", sm: "1.3rem" },
                                }}
                              />
                            )}
                          </IconButton>
                        </Box>

                        <Collapse in={updateHistoryExpanded}>
                          <List dense>
                            {profileHistory.slice(0, 5).map((update) => (
                              <ListItem key={update.id} sx={{ px: 0, py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  {getStatusIcon(update.status)}
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                      sx={{
                                        fontSize: {
                                          xs: "0.8rem",
                                          sm: "0.875rem",
                                        },
                                      }}
                                    >
                                      {update.fieldName} {update.action}
                                    </Typography>
                                  }
                                  secondary={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                          fontSize: {
                                            xs: "0.65rem",
                                            sm: "0.7rem",
                                          },
                                        }}
                                      >
                                        {formatTimeAgo(update.timestamp)}
                                      </Typography>
                                      <Chip
                                        label={update.status}
                                        size="small"
                                        sx={{
                                          height: { xs: 18, sm: 20 },
                                          fontSize: {
                                            xs: "0.6rem",
                                            sm: "0.65rem",
                                          },
                                          bgcolor: safeAlpha(
                                            update.status === "completed"
                                              ? theme.palette.success.main
                                              : update.status === "pending"
                                                ? theme.palette.warning.main
                                                : theme.palette.error.main,
                                            0.1,
                                          ),
                                          color:
                                            update.status === "completed"
                                              ? theme.palette.success.main
                                              : update.status === "pending"
                                                ? theme.palette.warning.main
                                                : theme.palette.error.main,
                                        }}
                                      />
                                    </Box>
                                  }
                                  secondaryTypographyProps={{
                                    component: "span",
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>

                        <Button
                          fullWidth
                          startIcon={
                            <History
                              sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
                            />
                          }
                          onClick={() =>
                            setUpdateHistoryExpanded(!updateHistoryExpanded)
                          }
                          size="small"
                          sx={{
                            mt: 2,
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                          }}
                        >
                          {updateHistoryExpanded
                            ? "Show Less"
                            : "Show Update History"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>

                {/* RIGHT COLUMN - Main Content (70% width on large screens) */}
                <Grid
                  item
                  xs={12} // Full width on mobile
                  md={8} // 8/12 = 67% on medium screens
                  lg={8} // 8/12 = 67% on large screens
                  xl={9} // 9/12 = 75% on extra large screens
                  sx={{
                    px: { xs: 1, sm: 1.5, md: 2 },
                  }}
                >
                  {/* Tabs */}
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant={isMobile ? "fullWidth" : "scrollable"}
                    scrollButtons={isMobile ? false : "auto"}
                    allowScrollButtonsMobile
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      bgcolor: safeAlpha(theme.palette.primary.main, 0.02),
                      minHeight: { xs: 48, sm: 56, md: 60 },
                      borderRadius: {
                        xs: "8px 8px 0 0",
                        sm: "10px 10px 0 0",
                        md: "12px 12px 0 0",
                      },
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
                          minHeight: { xs: 48, sm: 56, md: 60 },
                          fontSize: {
                            xs: "0.7rem",
                            sm: "0.8rem",
                            md: "0.9rem",
                          },
                          "&.Mui-selected": {
                            color: theme.palette.primary.main,
                            fontWeight: "bold",
                          },
                        }}
                      />
                    ))}
                  </Tabs>

                  {/* Tab Content */}
                  <Zoom in={true} timeout={400}>
                    <Paper
                      sx={{
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                        overflow: "hidden",
                        boxShadow: theme.shadows[4],
                        mb: 3,
                      }}
                    >
                      <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                        {activeTab === 0 && (
                          <>
                            {/* Profile Update Status Banner */}
                            {editMode && (
                              <Alert
                                severity="info"
                                icon={<Update />}
                                sx={{ mb: 3, borderRadius: 2 }}
                              >
                                <AlertTitle
                                  sx={{
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                  }}
                                >
                                  Editing Mode Active
                                </AlertTitle>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                  }}
                                >
                                  All changes will be saved together in a single
                                  API call.
                                </Typography>
                              </Alert>
                            )}

                            {/* Basic Information */}
                            <Box sx={{ mb: 4 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 3,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  sx={{
                                    fontSize: {
                                      xs: "1rem",
                                      sm: "1.1rem",
                                      md: "1.2rem",
                                    },
                                  }}
                                >
                                  Basic Information
                                </Typography>
                              </Box>

                              <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                                {[
                                  { field: "name", label: "Full Name" },
                                  { field: "title", label: "Job Title" },
                                  { field: "company", label: "Company" },
                                  { field: "location", label: "Location" },
                                  { field: "email", label: "Email" },
                                  { field: "phone", label: "Phone" },
                                  { field: "github", label: "GitHub" },
                                  { field: "linkedin", label: "LinkedIn" },
                                  { field: "education", label: "Education" },
                                  { field: "website", label: "Website" },
                                  { field: "status", label: "Active" },
                                  { field: "role", label: "Role" },
                                  { field: "roleType", label: "Role Type" },
                                ].map((item) => (
                                  <Grid item xs={12} sm={6} key={item.field}>
                                    <TextField
                                      fullWidth
                                      label={item.label}
                                      value={
                                        editedProfileData?.[item.field] ||
                                        currentProfileData[item.field] ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.field,
                                          e.target.value,
                                        )
                                      }
                                      disabled={
                                        ["status", "role", "roleType"].includes(
                                          item.field,
                                        ) || !editMode
                                      }
                                      size="small"
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          fontSize: {
                                            xs: "0.8rem",
                                            sm: "0.875rem",
                                          },
                                        },
                                      }}
                                      InputLabelProps={{
                                        sx: {
                                          fontSize: {
                                            xs: "0.8rem",
                                            sm: "0.875rem",
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>

                            {/* Bio */}
                            <Box sx={{ mb: 4 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="bold"
                                sx={{
                                  fontSize: {
                                    xs: "1rem",
                                    sm: "1.1rem",
                                    md: "1.2rem",
                                  },
                                  mb: 3,
                                }}
                              >
                                Bio
                              </Typography>
                              <TextField
                                fullWidth
                                multiline
                                rows={isMobile ? 3 : 4}
                                value={
                                  editedProfileData?.bio ||
                                  currentProfileData.bio ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleInputChange("bio", e.target.value)
                                }
                                disabled={!editMode}
                                size="small"
                                InputProps={{
                                  sx: {
                                    borderRadius: 2,
                                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                  },
                                }}
                                helperText={
                                  editMode
                                    ? "Briefly describe yourself and your experience"
                                    : ""
                                }
                                FormHelperTextProps={{
                                  sx: {
                                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                  },
                                }}
                              />
                            </Box>

                            {/* Skills */}
                            <Box sx={{ mb: 4 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 3,
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                      fontSize: {
                                        xs: "1rem",
                                        sm: "1.1rem",
                                        md: "1.2rem",
                                      },
                                    }}
                                  >
                                    Skills
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                                    }}
                                  >
                                    {tempSkills.length} skills •{" "}
                                    {editMode ? "Edit mode" : "View mode"}
                                  </Typography>
                                </Box>
                                {editMode && (
                                  <Button
                                    startIcon={
                                      <Add
                                        sx={{
                                          fontSize: {
                                            xs: "1rem",
                                            sm: "1.2rem",
                                          },
                                        }}
                                      />
                                    }
                                    size="small"
                                    onClick={handleAddSkill}
                                    sx={{
                                      borderRadius: 2,
                                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                    }}
                                  >
                                    Add Skill
                                  </Button>
                                )}
                              </Box>

                              {editMode && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 1,
                                    mb: 3,
                                    flexDirection: { xs: "column", sm: "row" },
                                  }}
                                >
                                  <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Enter a new skill (e.g., GraphQL)"
                                    value={newSkill}
                                    onChange={(e) =>
                                      setNewSkill(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                      e.key === "Enter" && handleAddSkill()
                                    }
                                    InputProps={{
                                      sx: {
                                        borderRadius: 2,
                                        fontSize: {
                                          xs: "0.8rem",
                                          sm: "0.875rem",
                                        },
                                      },
                                      endAdornment: (
                                        <Tooltip title="Press Enter to add">
                                          <ArrowForward
                                            sx={{
                                              color: "text.disabled",
                                              fontSize: "1rem",
                                            }}
                                          />
                                        </Tooltip>
                                      ),
                                    }}
                                  />
                                  <Button
                                    variant="contained"
                                    onClick={handleAddSkill}
                                    sx={{
                                      borderRadius: 2,
                                      minWidth: { xs: "100%", sm: 100 },
                                      fontSize: {
                                        xs: "0.8rem",
                                        sm: "0.875rem",
                                      },
                                      py: { xs: 1, sm: 1.2 },
                                    }}
                                    disabled={!newSkill.trim()}
                                  >
                                    Add
                                  </Button>
                                </Box>
                              )}

                              <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                                {tempSkills.map((skill) => {
                                  const skillColor = getSkillColor(skill.level);
                                  return (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={4}
                                      key={skill.id}
                                    >
                                      <Card sx={{ borderRadius: 2 }}>
                                        <CardContent
                                          sx={{ p: { xs: 1.5, sm: 2 } }}
                                        >
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              mb: 1,
                                            }}
                                          >
                                            <Typography
                                              variant="subtitle1"
                                              fontWeight="bold"
                                              sx={{
                                                fontSize: {
                                                  xs: "0.9rem",
                                                  sm: "1rem",
                                                },
                                              }}
                                            >
                                              {skill.skillName}
                                              {skill.isNew && (
                                                <Chip
                                                  label="New"
                                                  size="small"
                                                  color="success"
                                                  sx={{
                                                    ml: 1,
                                                    height: { xs: 16, sm: 18 },
                                                    fontSize: {
                                                      xs: "0.55rem",
                                                      sm: "0.6rem",
                                                    },
                                                  }}
                                                />
                                              )}
                                            </Typography>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                              }}
                                            >
                                              {editMode && (
                                                <>
                                                  <Tooltip title="Remove skill">
                                                    <IconButton
                                                      size="small"
                                                      onClick={() =>
                                                        handleRemoveSkill(
                                                          skill.id,
                                                        )
                                                      }
                                                    >
                                                      <Delete
                                                        sx={{
                                                          fontSize: {
                                                            xs: "1rem",
                                                            sm: "1.2rem",
                                                          },
                                                        }}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                  <Select
                                                    value={skill.level ?? ""}
                                                    onChange={(e) =>
                                                      handleUpdateSkillLevel(
                                                        skill.id,
                                                        e.target.value,
                                                      )
                                                    }
                                                    size="small"
                                                    sx={{
                                                      minWidth: {
                                                        xs: 100,
                                                        sm: 120,
                                                      },
                                                      "& .MuiSelect-select": {
                                                        fontSize: {
                                                          xs: "0.7rem",
                                                          sm: "0.8rem",
                                                        },
                                                        py: {
                                                          xs: 0.5,
                                                          sm: 0.8,
                                                        },
                                                      },
                                                    }}
                                                    disabled={!editMode}
                                                  >
                                                    <MenuItem value="Beginner">
                                                      Beginner
                                                    </MenuItem>
                                                    <MenuItem value="Intermediate">
                                                      Intermediate
                                                    </MenuItem>
                                                    <MenuItem value="Advanced">
                                                      Advanced
                                                    </MenuItem>
                                                    <MenuItem value="Expert">
                                                      Expert
                                                    </MenuItem>
                                                  </Select>
                                                </>
                                              )}
                                              {!editMode && (
                                                <Chip
                                                  label={skill.level}
                                                  size="small"
                                                  sx={{
                                                    bgcolor: safeAlpha(
                                                      skillColor,
                                                      0.1,
                                                    ),
                                                    color: skillColor,
                                                    fontWeight: "bold",
                                                    height: { xs: 20, sm: 24 },
                                                    fontSize: {
                                                      xs: "0.6rem",
                                                      sm: "0.7rem",
                                                    },
                                                  }}
                                                />
                                              )}
                                            </Box>
                                          </Box>

                                          {editMode && (
                                            <Box sx={{ mb: 1 }}>
                                              <LinearProgress
                                                variant="determinate"
                                                value={
                                                  ([
                                                    "Beginner",
                                                    "Intermediate",
                                                    "Advanced",
                                                    "Expert",
                                                  ].indexOf(skill.level) +
                                                    1) *
                                                  25
                                                }
                                                sx={{
                                                  height: { xs: 4, sm: 6 },
                                                  borderRadius: 3,
                                                  bgcolor: safeAlpha(
                                                    skillColor,
                                                    0.1,
                                                  ),
                                                  "& .MuiLinearProgress-bar": {
                                                    bgcolor: skillColor,
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}

                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}
                                          >
                                            {editMode ? (
                                              <Chip
                                                label={skill.level}
                                                size="small"
                                                sx={{
                                                  bgcolor: safeAlpha(
                                                    skillColor,
                                                    0.1,
                                                  ),
                                                  color: skillColor,
                                                  fontWeight: "bold",
                                                  height: { xs: 20, sm: 24 },
                                                  fontSize: {
                                                    xs: "0.6rem",
                                                    sm: "0.7rem",
                                                  },
                                                }}
                                              />
                                            ) : (
                                              <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                  fontSize: {
                                                    xs: "0.65rem",
                                                    sm: "0.7rem",
                                                  },
                                                }}
                                              >
                                                Level: {skill.level}
                                              </Typography>
                                            )}
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
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 3,
                              }}
                            >
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                  fontSize: {
                                    xs: "1rem",
                                    sm: "1.1rem",
                                    md: "1.2rem",
                                  },
                                }}
                              >
                                Security Settings
                              </Typography>
                            </Box>

                            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                              <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                  <CardContent
                                    sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 2,
                                        flexWrap: "wrap",
                                        gap: 1,
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          variant="subtitle1"
                                          fontWeight="bold"
                                          sx={{
                                            fontSize: {
                                              xs: "0.9rem",
                                              sm: "1rem",
                                              md: "1.1rem",
                                            },
                                          }}
                                        >
                                          Password
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{
                                            fontSize: {
                                              xs: "0.75rem",
                                              sm: "0.8rem",
                                              md: "0.875rem",
                                            },
                                          }}
                                        >
                                          Change your account password
                                        </Typography>
                                      </Box>
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          setChangePasswordDialogOpen(true)
                                        }
                                        disabled={!editMode}
                                        size={isMobile ? "small" : "medium"}
                                        sx={{
                                          fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.875rem",
                                          },
                                        }}
                                      >
                                        Change Password
                                      </Button>
                                    </Box>

                                    <Alert
                                      severity="info"
                                      sx={{ mt: 2, borderRadius: 2 }}
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.8rem",
                                            md: "0.875rem",
                                          },
                                        }}
                                      >
                                        Password changes will be saved together
                                        with other profile updates.
                                      </Typography>
                                    </Alert>
                                  </CardContent>
                                </Card>
                              </Grid>

                              <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                  <CardContent
                                    sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 2,
                                        flexWrap: "wrap",
                                        gap: 1,
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          variant="subtitle1"
                                          fontWeight="bold"
                                          sx={{
                                            fontSize: {
                                              xs: "0.9rem",
                                              sm: "1rem",
                                              md: "1.1rem",
                                            },
                                          }}
                                        >
                                          Two-Factor Authentication
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{
                                            fontSize: {
                                              xs: "0.75rem",
                                              sm: "0.8rem",
                                              md: "0.875rem",
                                            },
                                          }}
                                        >
                                          Add an extra layer of security to your
                                          account
                                        </Typography>
                                      </Box>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            checked={
                                              editedProfileData?.twoFactorEnabled ??
                                              currentProfileData.twoFactorEnabled
                                            }
                                            onChange={(e) =>
                                              handleTwoFactorToggle(
                                                e.target.checked,
                                              )
                                            }
                                            color="primary"
                                            disabled={!editMode}
                                            size={isMobile ? "small" : "medium"}
                                          />
                                        }
                                        label=""
                                      />
                                    </Box>
                                    {currentProfileData.twoFactorEnabled ? (
                                      <Alert
                                        severity="success"
                                        sx={{ mt: 2, borderRadius: 2 }}
                                      >
                                        <AlertTitle
                                          sx={{
                                            fontSize: {
                                              xs: "0.85rem",
                                              sm: "0.9rem",
                                              md: "1rem",
                                            },
                                          }}
                                        >
                                          2FA Active
                                        </AlertTitle>
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            fontSize: {
                                              xs: "0.75rem",
                                              sm: "0.8rem",
                                              md: "0.875rem",
                                            },
                                          }}
                                        >
                                          Two-factor authentication is currently
                                          protecting your account.
                                        </Typography>
                                      </Alert>
                                    ) : (
                                      <Alert
                                        severity="warning"
                                        sx={{ mt: 2, borderRadius: 2 }}
                                      >
                                        <AlertTitle
                                          sx={{
                                            fontSize: {
                                              xs: "0.85rem",
                                              sm: "0.9rem",
                                              md: "1rem",
                                            },
                                          }}
                                        >
                                          2FA Not Active
                                        </AlertTitle>
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            fontSize: {
                                              xs: "0.75rem",
                                              sm: "0.8rem",
                                              md: "0.875rem",
                                            },
                                          }}
                                        >
                                          Enable two-factor authentication for
                                          enhanced security.
                                        </Typography>
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
        </AccordionDetails>
      </Accordion>

      {/* <Accordion
        sx={{
          m: 3,
          boxShadow: 4,
          borderRadius: 3,
          "&:before": { display: "none" }, // Remove the default divider line
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            bgcolor: "#6288a6",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            minHeight: 40,
            "&.Mui-expanded": {
              minHeight: 40,
              borderBottom: "1px solid",
              bgcolor: "#037294",
              borderColor: "divider",
            },
          }}
          // id="panel1-header"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              pr: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Person
                sx={{
                  color: "white",
                  fontSize: { xs: 24, sm: 26, md: 28 }, // Responsive icon size
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                color="white"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" }, // Responsive text
                }}
              >
                Profile Management
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {isUpdating && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
              }}
            >
              <Card sx={{ width: 400, p: 3, textAlign: "center" }}>
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
                  {updateSteps.find((step) => !step.completed)?.label ||
                    "Finalizing..."}
                </Typography>
              </Card>
            </Box>
          )}

          <Box sx={{ position: "relative", width: "100%", zIndex: 1 }}>
            <Container
              maxWidth="xl"
              sx={{
                py: { xs: 3, sm: 4, md: 5 },
                position: "relative",
                zIndex: 2,
              }}
            >
              <Grid
                container
                spacing={3}
                sx={{ width: "100%", m: 0, justifyContent: "space-between" }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  lg={6}
                  xl={5}
                  width={{ xl: "20%", md: "40%", lg: "20%", xs: "100%" }}
                >
                  <Grow in={true} timeout={300}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: theme.shadows[4],
                        overflow: "visible",
                        position: "relative",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          height: 80,
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
                          borderRadius: "12px 12px 0 0",
                        }}
                      />

                      <CardContent sx={{ textAlign: "center", p: 3, pt: 0 }}>
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            mt: -6,
                          }}
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <Tooltip title="Change avatar">
                                <label htmlFor="avatar-upload">
                                  <IconButton
                                    component="span"
                                    sx={{
                                      bgcolor: theme.palette.primary.main,
                                      color: "white",
                                      "&:hover": {
                                        bgcolor: theme.palette.primary.dark,
                                      },
                                      width: 36,
                                      height: 36,
                                      border: `3px solid ${theme.palette.background.paper}`,
                                    }}
                                  >
                                    {uploading ? (
                                      <CircularProgress
                                        size={16}
                                        color="inherit"
                                      />
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
                              style={{ display: "none" }}
                              onChange={handleAvatarUpload}
                              disabled={uploading || !editMode}
                            />
                            <Avatar
                              src={selectedAvatar}
                              sx={{
                                width: 120,
                                height: 120,
                                fontSize: "3rem",
                                bgcolor: theme.palette.primary.main,
                                border: `4px solid ${theme.palette.background.paper}`,
                                boxShadow: theme.shadows[4],
                              }}
                            >
                              {currentProfileData.name
                                ? currentProfileData.name.charAt(0)
                                : "U"}
                            </Avatar>
                          </Badge>
                        </Box>

                        <Typography
                          variant="h5"
                          gutterBottom
                          fontWeight="bold"
                          sx={{ mt: 2 }}
                        >
                          {currentProfileData.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          paragraph
                        >
                          {currentProfileData.title}
                        </Typography>
                        <Chip
                          label={currentProfileData.role}
                          color="primary"
                          size="small"
                          icon={<VerifiedUser sx={{ fontSize: 16 }} />}
                          sx={{ mb: 2 }}
                        />

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            mb: 3,
                            p: 1,
                            borderRadius: 2,
                            bgcolor: safeAlpha(theme.palette.success.main, 0.1),
                            border: `1px solid ${safeAlpha(theme.palette.success.main, 0.2)}`,
                          }}
                        >
                          <Update
                            sx={{
                              fontSize: 16,
                              color: theme.palette.success.main,
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Last updated:{" "}
                            {formatTimeAgo(
                              currentProfileData.lastProfileUpdate,
                            )}
                          </Typography>
                        </Box>

                        {editMode && hasChanges && (
                          <Alert
                            severity="info"
                            sx={{ mb: 2, borderRadius: 2 }}
                          >
                            <Typography variant="caption">
                              You have unsaved changes
                            </Typography>
                          </Alert>
                        )}

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt: 3,
                          }}
                        >
                          <Button
                            variant={editMode ? "contained" : "outlined"}
                            startIcon={editMode ? <Save /> : <Edit />}
                            onClick={
                              editMode
                                ? handleSaveProfile
                                : () => setEditMode(true)
                            }
                            fullWidth
                            disabled={isUpdating || (editMode && !hasChanges)}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: theme.shadows[4],
                              },
                            }}
                          >
                            {editMode ? "Save All Changes" : "Edit Profile"}
                          </Button>

                          {editMode && (
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                setEditMode(false);
                                setEditedProfileData(originalProfileData);
                                setTempSkills(profileSkills);
                                setNewSkill("");
                                setPasswordChanged(false); // Reset password changed state
                                setPasswordData({
                                  // Clear password data
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
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

                  <Grow in={true} timeout={500}>
                    <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[4] }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Typography variant="h6" fontWeight="bold">
                            Update History
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              setUpdateHistoryExpanded(!updateHistoryExpanded)
                            }
                          >
                            {updateHistoryExpanded ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
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
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      {update.fieldName} {update.action}
                                    </Typography>
                                  }
                                  secondary={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {formatTimeAgo(update.timestamp)}
                                      </Typography>
                                      <Chip
                                        label={update.status}
                                        size="small"
                                        sx={{
                                          height: 20,
                                          fontSize: "0.7rem",
                                          bgcolor: safeAlpha(
                                            update.status === "completed"
                                              ? theme.palette.success.main
                                              : update.status === "pending"
                                                ? theme.palette.warning.main
                                                : theme.palette.error.main,
                                            0.1,
                                          ),
                                          color:
                                            update.status === "completed"
                                              ? theme.palette.success.main
                                              : update.status === "pending"
                                                ? theme.palette.warning.main
                                                : theme.palette.error.main,
                                        }}
                                      />
                                    </Box>
                                  }
                                  secondaryTypographyProps={{
                                    component: "span",
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>

                        <Button
                          fullWidth
                          startIcon={<History />}
                          onClick={() =>
                            setUpdateHistoryExpanded(!updateHistoryExpanded)
                          }
                          sx={{ mt: 2 }}
                        >
                          {updateHistoryExpanded
                            ? "Show Less"
                            : "Show Update History"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={8}
                  width={{ xl: "78%", md: "55%", lg: "78%", xs: "100%" }}
                >
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
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
                          "&.Mui-selected": {
                            color: theme.palette.primary.main,
                            fontWeight: "bold",
                          },
                        }}
                      />
                    ))}
                  </Tabs>
                  <Zoom in={true} timeout={400}>
                    <Paper
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: theme.shadows[4],
                        mb: 3,
                      }}
                    >
                      <Box sx={{ p: { xs: 2, sm: 3 } }}>
                        {activeTab === 0 && (
                          <>
                            {editMode && (
                              <Alert
                                severity="info"
                                icon={<Update />}
                                sx={{ mb: 3, borderRadius: 2 }}
                              >
                                <AlertTitle>Editing Mode Active</AlertTitle>
                                All changes will be saved together in a single
                                API call when you click "Save All Changes".
                              </Alert>
                            )}

                            <Box sx={{ mb: 4 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 3,
                                }}
                              >
                                <Typography variant="h6" fontWeight="bold">
                                  Basic Information
                                </Typography>
                              </Box>

                              <Grid container spacing={2}>
                                {[
                                  { field: "name", label: "Full Name" },
                                  { field: "title", label: "Job Title" },
                                  { field: "company", label: "Company" },
                                  { field: "location", label: "Location" },
                                  { field: "email", label: "Email" },
                                  { field: "phone", label: "Phone" },
                                  { field: "github", label: "github" },
                                  { field: "linkedin", label: "linkedIn" },
                                  { field: "education", label: "education" },
                                  { field: "website", label: "website" },
                                  {
                                    field: "status",
                                    label: "Active",
                                  },
                                  { field: "role", label: "role" },
                                  { field: "roleType", label: "roleType" },
                                ].map((item) => (
                                  <Grid item xs={12} sm={6} key={item.field}>
                                    <TextField
                                      fullWidth
                                      label={item.label}
                                      value={
                                        editedProfileData?.[item.field] ||
                                        currentProfileData[item.field] ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.field,
                                          e.target.value,
                                        )
                                      }
                                      // disabled={!editMode}
                                      disabled={
                                        ["status", "role", "roleType"].includes(
                                          item.field,
                                        ) || !editMode
                                      }
                                      size="small"
                                      InputProps={{
                                        sx: { borderRadius: 2 },
                                      }}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>



                            <Box sx={{ mb: 4 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="bold"
                                sx={{ mb: 3 }}
                              >
                                Bio
                              </Typography>
                              <TextField
                                fullWidth
                                multiline
                                rows={4}
                                value={
                                  editedProfileData?.bio ||
                                  currentProfileData.bio ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleInputChange("bio", e.target.value)
                                }
                                disabled={!editMode}
                                size="small"
                                InputProps={{
                                  sx: { borderRadius: 2 },
                                }}
                                helperText={
                                  editMode
                                    ? "Briefly describe yourself and your experience"
                                    : ""
                                }
                              />
                            </Box>


                            <Box sx={{ mb: 4 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 3,
                                }}
                              >
                                <Box>
                                  <Typography variant="h6" fontWeight="bold">
                                    Skills
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {tempSkills.length} skills •{" "}
                                    {editMode ? "Edit mode" : "View mode"}
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
                                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Enter a new skill (e.g., GraphQL)"
                                    value={newSkill}
                                    onChange={(e) =>
                                      setNewSkill(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                      e.key === "Enter" && handleAddSkill()
                                    }
                                    InputProps={{
                                      sx: { borderRadius: 2 },
                                      endAdornment: (
                                        <Tooltip title="Press Enter to add">
                                          <ArrowForward
                                            sx={{ color: "text.disabled" }}
                                          />
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
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={4}
                                      key={skill.id}
                                    >
                                      <Card
                                        sx={{
                                          borderRadius: 2,
                                          transition: "all 0.3s ease",
                                        }}
                                      >
                                        <CardContent sx={{ p: 2 }}>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              mb: 1,
                                            }}
                                          >
                                            <Typography
                                              variant="subtitle1"
                                              fontWeight="bold"
                                            >
                                              {skill.skillName}
                                              {skill.isNew && (
                                                <Chip
                                                  label="New"
                                                  size="small"
                                                  color="success"
                                                  sx={{
                                                    ml: 1,
                                                    height: 16,
                                                    fontSize: "0.6rem",
                                                  }}
                                                />
                                              )}
                                            </Typography>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                              }}
                                            >
                                              {editMode && (
                                                <>
                                                  <Tooltip title="Remove skill">
                                                    <IconButton
                                                      size="small"
                                                      onClick={() =>
                                                        handleRemoveSkill(
                                                          skill.id,
                                                        )
                                                      }
                                                    >
                                                      <Delete fontSize="small" />
                                                    </IconButton>
                                                  </Tooltip>
                                                  <Select
                                                    value={skill.level ?? ""}
                                                    onChange={(e) =>
                                                      handleUpdateSkillLevel(
                                                        skill.id,
                                                        e.target.value,
                                                      )
                                                    }
                                                    size="small"
                                                    sx={{ minWidth: 120 }}
                                                    disabled={!editMode}
                                                  >
                                                    <MenuItem value="Beginner">
                                                      Beginner
                                                    </MenuItem>
                                                    <MenuItem value="Intermediate">
                                                      Intermediate
                                                    </MenuItem>
                                                    <MenuItem value="Advanced">
                                                      Advanced
                                                    </MenuItem>
                                                    <MenuItem value="Expert">
                                                      Expert
                                                    </MenuItem>
                                                  </Select>
                                                </>
                                              )}
                                              {!editMode && (
                                                <Chip
                                                  label={skill.level}
                                                  size="small"
                                                  sx={{
                                                    bgcolor: safeAlpha(
                                                      skillColor,
                                                      0.1,
                                                    ),
                                                    color: skillColor,
                                                    fontWeight: "bold",
                                                  }}
                                                />
                                              )}
                                            </Box>
                                          </Box>

                                          {editMode && (
                                            <Box sx={{ mb: 1 }}>
                                              <LinearProgress
                                                variant="determinate"
                                                value={
                                                  ([
                                                    "Beginner",
                                                    "Intermediate",
                                                    "Advanced",
                                                    "Expert",
                                                  ].indexOf(skill.level) +
                                                    1) *
                                                  25
                                                }
                                                sx={{
                                                  height: 6,
                                                  borderRadius: 3,
                                                  bgcolor: safeAlpha(
                                                    skillColor,
                                                    0.1,
                                                  ),
                                                  "& .MuiLinearProgress-bar": {
                                                    bgcolor: skillColor,
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}

                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}
                                          >
                                            {editMode ? (
                                              <Chip
                                                label={skill.level}
                                                size="small"
                                                sx={{
                                                  bgcolor: safeAlpha(
                                                    skillColor,
                                                    0.1,
                                                  ),
                                                  color: skillColor,
                                                  fontWeight: "bold",
                                                }}
                                              />
                                            ) : (
                                              <Typography
                                                variant="caption"
                                                color="text.secondary"
                                              >
                                                Level: {skill.level}
                                              </Typography>
                                            )}
                                           
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
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 3,
                              }}
                            >
                              <Typography variant="h6" fontWeight="bold">
                                Security Settings
                              </Typography>
                            </Box>

                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                  <CardContent>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 2,
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          variant="subtitle1"
                                          fontWeight="bold"
                                        >
                                          Password
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Change your account password
                                        </Typography>
                                      </Box>
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          setChangePasswordDialogOpen(true)
                                        }
                                        disabled={!editMode}
                                      >
                                        Change Password
                                      </Button>
                                    </Box>

                                    <Alert
                                      severity="info"
                                      sx={{ mt: 2, borderRadius: 2 }}
                                    >
                                      Password changes will be saved together
                                      with other profile updates.
                                    </Alert>
                                  </CardContent>
                                </Card>
                              </Grid>

                              <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                  <CardContent>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          variant="subtitle1"
                                          fontWeight="bold"
                                        >
                                          Two-Factor Authentication
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Add an extra layer of security to your
                                          account
                                        </Typography>
                                      </Box>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            checked={
                                              editedProfileData?.twoFactorEnabled ??
                                              currentProfileData.twoFactorEnabled
                                            }
                                            onChange={(e) =>
                                              handleTwoFactorToggle(
                                                e.target.checked,
                                              )
                                            }
                                            color="primary"
                                            disabled={!editMode}
                                          />
                                        }
                                        label=""
                                      />
                                    </Box>
                                    {currentProfileData.twoFactorEnabled ? (
                                      <Alert
                                        severity="success"
                                        sx={{ mt: 2, borderRadius: 2 }}
                                      >
                                        <AlertTitle>2FA Active</AlertTitle>
                                        Two-factor authentication is currently
                                        protecting your account.
                                      </Alert>
                                    ) : (
                                      <Alert
                                        severity="warning"
                                        sx={{ mt: 2, borderRadius: 2 }}
                                      >
                                        <AlertTitle>2FA Not Active</AlertTitle>
                                        Enable two-factor authentication for
                                        enhanced security.
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
        </AccordionDetails>
      </Accordion> */}

      <Accordion
        defaultExpanded
        // sx={{
        //   m: 3,
        //   boxShadow: 4,
        //   borderRadius: 3,
        //   "&:before": { display: "none" }, // Remove the default divider line
        // }}
        sx={{
          m: { xs: 1, sm: 1.5, md: 2, lg: 3 },
          boxShadow: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMore
              sx={{
                color: "white",
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
              }}
            />
          }
          sx={{
            bgcolor: "#6288a6",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            minHeight: 40,
            "&.Mui-expanded": {
              minHeight: 40,
              borderBottom: "1px solid",
              bgcolor: "#037294",
              borderColor: "divider",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              pr: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CalendarToday
                sx={{
                  color: "white",
                  fontSize: { xs: 24, sm: 28 },
                  // display: { xs: 'none', sm: 'block' } // Hide icon on xs
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                color="white"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Leave Management
              </Typography>

              <Chip
                label={`${leaves.length} Leaves`}
                size="small"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: "bold",
                  display: { xs: "none", sm: "flex" },
                  fontSize: { sm: "0.75rem", md: "0.875rem" },
                }}
              />

              {/* Show only count on small screens */}
              <Chip
                label={leaves.length}
                size="small"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: "bold",
                  display: { xs: "flex", sm: "none" },
                  minWidth: "28px",
                  height: "28px",
                  "& .MuiChip-label": {
                    px: 0.5,
                  },
                }}
              />
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                placeholder="Search leaves..."
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{ width: 300 }}
              />
              {/* <Tooltip title="Filter">
                <IconButton>
                  <FilterList />
                </IconButton>
              </Tooltip> */}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              {selectedLeaves.length > 0 && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ alignSelf: "center", mr: 1 }}
                >
                  {selectedLeaves.length} selected
                </Typography>
              )}
            </Box>
          </Box>

          {/* DataGrid */}
          <Paper
            sx={{
              height: 500,
              width: "88.3%",
              borderRadius: 2,
              overflow: "hidden",
              margin: "0px 6%",
            }}
          >
            <DataGrid
              // checkboxSelection
              disableRowSelectionOnClick
              rows={filteredLeaves}
              columns={columns}
              getRowId={(row) => row.leaveId}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25, 50]}
              sx={{
                height: 500,
                border: "none",
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#224e67ff !important",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "#fdfafaff !important",
                  fontWeight: "bold !important",
                },
              }}
            />
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Change Password Dialog */}
      {/* <Dialog
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
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
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
                type={showPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
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
                Password change will be saved together with other profile
                updates when you click "Save All Changes".
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
              onClick={() => setChangePasswordStep((prev) => prev + 1)}
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
      </Dialog> */}

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
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                error={
                  passwordData.currentPassword.length > 0 &&
                  passwordData.currentPassword.length < 6
                }
                helperText={
                  passwordData.currentPassword.length > 0 &&
                  passwordData.currentPassword.length < 6
                    ? "Password must be at least 6 characters"
                    : ""
                }
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
                type={showPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                error={
                  passwordData.newPassword.length > 0 &&
                  passwordData.newPassword.length < 6
                }
                helperText={
                  passwordData.newPassword.length > 0 &&
                  passwordData.newPassword.length < 6
                    ? "Password must be at least 6 characters"
                    : "Minimum 6 characters required"
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                error={
                  passwordData.confirmPassword.length > 0 &&
                  passwordData.newPassword !== passwordData.confirmPassword
                }
                helperText={
                  passwordData.confirmPassword.length > 0 &&
                  passwordData.newPassword !== passwordData.confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
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
                Password change will be saved together with other profile
                updates when you click "Save All Changes".
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setChangePasswordDialogOpen(false);
              setChangePasswordStep(0);
              setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
            }}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          {changePasswordStep < 2 ? (
            <Button
              variant="contained"
              onClick={() => setChangePasswordStep((prev) => prev + 1)}
              disabled={
                (changePasswordStep === 0 &&
                  passwordData.currentPassword.length < 6) ||
                (changePasswordStep === 1 &&
                  (passwordData.newPassword.length < 6 ||
                    passwordData.confirmPassword.length < 6 ||
                    passwordData.newPassword !== passwordData.confirmPassword))
              }
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

      {/* Dialog for viewing/editing leave */}
      <LeaveFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
        initialData={currentLeave}
        title={currentLeave ? "View Leave Details" : "Add Leave"}
        submitText={currentLeave ? "Update" : "Add"}
        showStatusField={!!currentLeave}
        mode="dialog"
        viewMode={viewMode}
      />
    </Box>
  );
};

export default Profile;
