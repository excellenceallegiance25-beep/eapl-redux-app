import {
  Add,
  AdminPanelSettings,
  ArrowBack,
  Cancel,
  CheckCircle,
  Delete,
  Edit,
  ManageAccounts,
  Person,
  Search,
  Upload,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
  alpha,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import eaplRotatingLogo from "../../assets/images/EAPLfavicon.png";
import useLoading from "../../redux/slices/useLoading";
import {
  getApplicationDepartmentsList,
  getApplicationPositionsList,
  getApplicationRolesList,
  getEmployeeProfileList,
  updateEmployeeCompleteProfile,
} from "../../services/AppConfigAction";

export const EmployeeManagementPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    role: "",
    department: "",
    position: "",
    status: true,
    profilePicture: "",
    profilePictureType: "",
    indicator: "I",
  });

  // Error handling
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // File upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { showLoader, hideLoader } = useLoading();

  // FIX: Remove aria-hidden from root when dialog opens
  useEffect(() => {
    if (openDialog) {
      // Find the root element
      const rootElement = document.getElementById("root");
      if (rootElement && rootElement.getAttribute("aria-hidden") === "true") {
        rootElement.removeAttribute("aria-hidden");
      }

      // Also check body element
      if (document.body.getAttribute("aria-hidden") === "true") {
        document.body.removeAttribute("aria-hidden");
      }
    }
  }, [openDialog]);

  // Responsive font sizes
  const getFontSize = {
    h4: { xs: "1.5rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
    h5: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem", lg: "1.5rem" },
    h6: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
    body1: { xs: "0.875rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
    body2: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem", lg: "0.95rem" },
    caption: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem", lg: "0.8rem" },
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      showLoader(eaplRotatingLogo, 0);
      try {
        await loadEmployees();
        await loadRolesDetails();
        await loadDepartmentDetails();
        await loadPositionDetails();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
        hideLoader();
      }
    };

    loadAllData();
  }, [dispatch]);

  const loadEmployees = async () => {
    const result = await dispatch(getEmployeeProfileList());
    if (result.type === "EMP_INFO_LIST") {
      const formattedEmployees = result.payload.map((employee) => ({
        ...employee,
        status: employee.status === true,
      }));
      setEmployees(formattedEmployees);
      setFilteredEmployees(formattedEmployees);
    }
  };

  const loadRolesDetails = async () => {
    const result = await dispatch(getApplicationRolesList());
    if (result.type === "APPCONFIG_INIT") {
      setEmployeeRoles(result.payload);
    }
  };

  const loadDepartmentDetails = async () => {
    const result = await dispatch(getApplicationDepartmentsList());
    if (result.type === "APPCONFIG_INIT") {
      setDepartments(result.payload);
    }
  };

  const loadPositionDetails = async () => {
    const result = await dispatch(getApplicationPositionsList());
    if (result.type === "APPCONFIG_INIT") {
      setPositions(result.payload);
    }
  };

  // Filter employees based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.phone?.includes(searchTerm) ||
          employee.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.department
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employee.position?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const handleEdit = (employee) => {
    const employeeData = {
      ...employee,
      id: employee.id || "",
      name: employee.name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      password: employee.password || "",
      newPassword: employee.newPassword || "",
      role: employee.role || "",
      department: employee.department || "",
      position: employee.position || "",
      status: employee.status === true,
      profilePicture: null,
      profilePictureType: null,
    };

    setCurrentEmployee(employeeData);

    if (employee.profilePicture) {
      setImagePreview(`data:image/png;base64,${employee.profilePicture}`);
    } else {
      setImagePreview(null);
    }

    setSelectedImage(null);
    setErrors({});
    setSubmitError("");
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const payload = {
        id: id,
        indicator: "D",
      };

      Swal.fire({
        title: "Deleting...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let result;
      result = await dispatch(updateEmployeeCompleteProfile(payload));

      if (result?.type === "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS") {
        await loadEmployees();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Employee has been deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: result.payload?.message || "Operation failed",
        });
        setErrors(result.payload?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to save employee",
      });
      setSubmitError(error.message || "Failed to save employee");
    }
  };

  const toggleStatus = async (id) => {
    try {
      const employee = employees.find((emp) => emp.id === id);
      if (!employee) return;

      const newStatus = employee.status === "active" ? false : true;

      const payload = {
        employeeId: id,
        status: newStatus,
      };

      const result = await dispatch(updateEmployeeCompleteProfile(payload));
      if (result.type === "EMP_INFO_UPDATE_SUCCESS") {
        await loadEmployees();
      } else {
        throw new Error(result.payload?.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.message || "Failed to update status");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!currentEmployee.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!currentEmployee.id && !currentEmployee.password?.trim()) {
      newErrors.password = "Password is required";
    }

    if (!currentEmployee.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentEmployee.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!currentEmployee.role) {
      newErrors.role = "Role is required";
    }

    if (!currentEmployee.department) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrors({
        ...errors,
        profilePicture: "Please upload a valid image (JPEG, PNG, GIF)",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        profilePicture: "Image size should be less than 5MB",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String);
      setSelectedImage(file);

      if (errors.profilePicture) {
        const newErrors = { ...errors };
        delete newErrors.profilePicture;
        setErrors(newErrors);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      let profilePictureBase64 = null;
      let profilePictureType = null;

      if (selectedImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          profilePictureBase64 = base64String.split(",")[1];
          profilePictureType = selectedImage.type;
          completeSubmission(profilePictureBase64, profilePictureType);
        };
        reader.readAsDataURL(selectedImage);
      } else if (imagePreview && !selectedImage) {
        profilePictureBase64 = imagePreview.split(",")[1];
        profilePictureType = imagePreview.split(";")[0].split(":")[1];
        await completeSubmission(profilePictureBase64, profilePictureType);
      } else {
        await completeSubmission(null, null);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      setSubmitError("Failed to process image. Please try again.");
    }
  };

  const completeSubmission = async (
    profilePictureBase64,
    profilePictureType,
  ) => {
    try {
      const payload = {
        ...currentEmployee,
        status: currentEmployee.status === true,
        profilePicture: profilePictureBase64,
        profilePictureType: profilePictureType,
        indicator: currentEmployee.id ? "U" : "I",
        currentPassword: currentEmployee.id
          ? currentEmployee.password
          : currentEmployee.password,

        newPassword: currentEmployee.id
          ? currentEmployee.newPassword
          : currentEmployee.password,
      };

      Object.keys(payload).forEach((key) => {
        if (payload[key] === undefined || payload[key] === null) {
          delete payload[key];
        }
      });

      // 🔵 Show loading popup
      Swal.fire({
        title: currentEmployee.id ? "Updating..." : "Creating...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let result;
      result = await dispatch(updateEmployeeCompleteProfile(payload));
      Swal.close();
      if (result?.type === "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS") {
        if (result.payload?.type === "FAILED") {
          // 🔴 Backend returned FAILED
          Swal.fire({
            icon: "error",
            title: "Operation Failed",
            text: result.payload?.message || "Operation failed",
          });
          // setSubmitError(result.payload?.message || "Operation failed");
        } else {
          await loadEmployees();
          handleCloseDialog();

          // ✅ Success popup
          Swal.fire({
            icon: "success",
            title: currentEmployee.id ? "Updated!" : "Created!",
            text:
              result.payload?.message ||
              (currentEmployee.id
                ? "Employee updated successfully"
                : "Employee created successfully"),
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } else {
        // 🔴 Redux failure
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            result?.payload?.message ||
            (typeof result?.payload === "string"
              ? result.payload
              : "Operation failed"),
        });
        // setSubmitError(result.payload?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: error.message || "Failed to save employee",
      });
      // setSubmitError(error.message || "Failed to save employee");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEmployee({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      position: "",
      status: true,
      profilePicture: null,
      profilePictureType: null,
    });
    setImagePreview(null);
    setSelectedImage(null);
    setErrors({});
    setSubmitError("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle color="success" />;
      case "inactive":
        return <Cancel color="error" />;
      default:
        return <Cancel color="disabled" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return <AdminPanelSettings />;
      case "manager":
        return <ManageAccounts />;
      case "employee":
        return <Person />;
      default:
        return <Person />;
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "error";
      case "manager":
        return "warning";
      case "employee":
        return "primary";
      default:
        return "default";
    }
  };

  // DataGrid columns with responsive widths
  const columns = [
    {
      field: "id",
      headerName: "EID",
      width: isMobile ? 60 : 70,
      type: "number",
      headerClassName: "no-sort-icon",
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
          <Typography
            variant="body2"
            fontWeight="bold"
            noWrap
            sx={{ fontSize: getFontSize.body2 }}
          >
            #{params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "profilePicture",
      headerName: "",
      width: isMobile ? 50 : 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const hasImage = Boolean(params.value);
        const src = hasImage
          ? `data:image/png;base64,${params.value}`
          : undefined;

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Avatar
              src={src}
              sx={{
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
                bgcolor: "primary.main",
              }}
            >
              {!hasImage && <Person sx={{ fontSize: isMobile ? 16 : 20 }} />}
            </Avatar>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 100 : 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={isMobile ? 0.5 : 1}
          sx={{ alignItems: "center", height: "100%" }}
        >
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEdit(params.row)}
              sx={{
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
              }}
            >
              <Edit sx={{ fontSize: isMobile ? 16 : 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
              sx={{
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
              }}
            >
              <Delete sx={{ fontSize: isMobile ? 16 : 20 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
    {
      field: "name",
      headerName: "Employee Name",
      width: isMobile ? 120 : isTablet ? 150 : 180,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: isMobile ? 140 : isTablet ? 160 : 200,
      renderCell: (params) => (
        <a
          href={`mailto:${params.value}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Typography
            sx={{ fontSize: getFontSize.body2, wordBreak: "break-word" }}
          >
            {params.value}
          </Typography>
        </a>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: isMobile ? 100 : isTablet ? 110 : 130,
    },
    {
      field: "role",
      headerName: "Role",
      width: isMobile ? 100 : isTablet ? 110 : 120,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            height: "100%",
          }}
        >
          {!isMobile && getRoleIcon(params.value)}
          <Chip
            label={params.value}
            color={getRoleColor(params.value)}
            size="small"
            variant="outlined"
            sx={{
              fontSize: getFontSize.caption,
              height: isMobile ? 20 : 24,
            }}
          />
        </Box>
      ),
    },
    {
      field: "department",
      headerName: "Department",
      width: isMobile ? 110 : isTablet ? 130 : 140,
      renderCell: (params) => (
        <Chip
          label={params.value ? params.value : "Not Assigned"}
          color={params.value ? "info" : "warning"}
          size="small"
          variant="outlined"
          sx={{
            fontSize: getFontSize.caption,
            height: isMobile ? 20 : 24,
            maxWidth: "100%",
            "& .MuiChip-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          }}
        />
      ),
    },
    {
      field: "position",
      headerName: "Position",
      width: isMobile ? 110 : isTablet ? 130 : 160,
      renderCell: (params) => (
        <Typography sx={{ fontSize: getFontSize.body2 }}>
          {params.value ? params.value : "Not Assigned"}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      alignItems: "center",
      width: isMobile ? 90 : 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            height: "100%",
          }}
        >
          {!isMobile &&
            getStatusIcon(params.value === true ? "active" : "inactive")}
          <Chip
            label={params.value === true ? "active" : "inactive"}
            color={getStatusColor(
              params.value === true ? "active" : "inactive",
            )}
            size="small"
            variant="outlined"
            sx={{
              fontSize: getFontSize.caption,
              height: isMobile ? 20 : 24,
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      {/* Back Button */}
      {/* <Button
        startIcon={<ArrowBack sx={{ fontSize: { xs: 16, sm: 20 } }} />}
        onClick={() => navigate("/dashboard")}
        sx={{ 
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
        }}
      >
        Back to Dashboard
      </Button> */}

      {/* Header Section */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          mb: { xs: 2, sm: 3 },
          mt: 10,
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          backgroundColor: alpha(theme.palette.primary.main, 0.02),
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
          gap={1}
        >
          {/* Title */}
          {/* <Box>
            <Typography 
              variant="h5" 
              fontWeight="bold"
              sx={{ 
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                mb: 0.5
              }}
            >
              Employee Management
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: getFontSize.body2 }}
            >
              Manage employee profiles, roles, and permissions
            </Typography>
          </Box> */}

          {/* Add Button */}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setCurrentEmployee({
                name: "",
                email: "",
                phone: "",
                role: "",
                department: "",
                position: "",
                status: true,
                profilePicture: null,
                profilePictureType: null,
              });
              setImagePreview(null);
              setSelectedImage(null);
              setErrors({});
              setSubmitError("");
              setOpenDialog(true);
            }}
            size={isMobile ? "medium" : "medium"}
            sx={{
              whiteSpace: "nowrap",
              width: { xs: "100%", md: "auto" },
              py: { xs: 1, sm: 1.2 },
              fontSize: getFontSize.body2,
            }}
          >
            Add Employee
          </Button>

          {/* Search Section */}
          {/* <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            width={{ xs: "100%", md: "auto",lg:"50%" }}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <TextField
              fullWidth
              placeholder="Search employees by name, email, role, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: { xs: 16, sm: 20 } }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                "& .MuiInputBase-input": {
                  fontSize: getFontSize.body2,
                },
              }}
            />
          </Box> */}
        </Box>

        {/* <Divider sx={{ my: { xs: 2, sm: 2.5 } }} /> */}
      </Paper>

      {/* DataGrid Container */}
      <Paper
        elevation={2}
        sx={{
          height: "calc(100vh - 250px)",
          width: "100%",
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: isMobile ? 5 : 10 },
            },
            sorting: {
              sortModel: [{ field: "id", sort: "asc" }],
            },
          }}
          pageSizeOptions={isMobile ? [5, 10, 25] : [5, 10, 25, 50]}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-main": {
              width: "100%",
            },
            "& .MuiDataGrid-cell": {
              fontSize: {
                xs: "0.7rem",
                sm: "0.75rem",
                md: "0.8rem",
                lg: "0.875rem",
              },
              padding: { xs: "0px 4px", sm: "0px 8px" },
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#6288a6 !important",
              height: {
                xs: "48px !important",
                sm: "52px !important",
                md: "56px !important",
              },
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#fdfafaff !important",
              fontWeight: "bold !important",
              fontSize: {
                xs: "0.7rem",
                sm: "0.75rem",
                md: "0.8rem",
                lg: "0.875rem",
              },
              whiteSpace: "normal",
              lineHeight: { xs: 1.2, sm: 1.3 },
            },
            "& .MuiDataGrid-footerContainer": {
              minHeight: { xs: "48px", sm: "52px", md: "56px" },
            },
            "& .MuiTablePagination-root": {
              fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
              },
            "& .MuiTablePagination-select": {
              fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
            },
            "& .MuiDataGrid-toolbarContainer": {
              padding: { xs: 1, sm: 1.5 },
              gap: 1,
              flexWrap: "wrap",
            },
            "& .MuiButton-text": {
              fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
            },
            "& .no-sort-icon .MuiDataGrid-iconButtonContainer, & .no-sort-icon .MuiDataGrid-menuIcon":
              {
                display: "none",
              },
          }}
        />
      </Paper>

      {/* Add/Edit Dialog - FIX: Added proper props to handle accessibility */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        // FIX: Add these props to properly handle focus management
        disableEnforceFocus={false}
        disableAutoFocus={false}
        keepMounted={false}
        aria-modal={true}
        PaperProps={{
          sx: {
            m: isMobile ? 0 : { xs: 2, sm: 3 },
            borderRadius: isMobile ? 0 : { xs: 2, sm: 2.5, md: 3 },
            maxHeight: { xs: "100vh", sm: "90vh" },
          },
        }}
      >
        <DialogTitle
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
            borderBottom: 1,
            borderColor: "divider",
            // bgcolor: alpha("#010b13", 0.4),
            bgcolor: " #057488",
            color: "#f5f8fa",
          }}
        >
          {currentEmployee.id
            ? `Edit Employee: ${currentEmployee.name}`
            : "Add New Employee"}
        </DialogTitle>
        <DialogContent
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            mt: 1,
            overflowY: "auto",
          }}
        >
          {submitError && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: 2,
                "& .MuiAlert-message": { fontSize: getFontSize.body2 },
              }}
            >
              {submitError}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Profile Picture Upload */}
            <Box
              display="flex"
              alignItems="center"
              gap={{ xs: 2, sm: 3 }}
              mb={2}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Avatar
                src={imagePreview}
                sx={{
                  width: { xs: 60, sm: 70, md: 80 },
                  height: { xs: 60, sm: 70, md: 80 },
                  cursor: "pointer",
                  border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
                onClick={() =>
                  document.getElementById("profile-picture-upload").click()
                }
              >
                {!imagePreview && (
                  <Person sx={{ fontSize: { xs: 30, sm: 35, md: 40 } }} />
                )}
              </Avatar>
              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: getFontSize.h6 }}
                >
                  Profile Picture
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-picture-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="profile-picture-upload">
                  <Button
                    component="span"
                    startIcon={<Upload />}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      mt: 1,
                      fontSize: getFontSize.body2,
                    }}
                  >
                    Upload Image
                  </Button>
                </label>
                {errors.profilePicture && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ display: "block", fontSize: getFontSize.caption }}
                  >
                    {errors.profilePicture}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ fontSize: getFontSize.caption }}
                >
                  Square image, max 5MB
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name *"
                  value={currentEmployee.name}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      name: e.target.value,
                    })
                  }
                  fullWidth
                  required
                  size={isMobile ? "small" : "medium"}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  FormHelperTextProps={{
                    sx: { fontSize: getFontSize.caption },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address *"
                  type="email"
                  value={currentEmployee.email}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      email: e.target.value,
                    })
                  }
                  fullWidth
                  required
                  size={isMobile ? "small" : "medium"}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  FormHelperTextProps={{
                    sx: { fontSize: getFontSize.caption },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  value={currentEmployee.phone}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  InputProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  placeholder="1234567891"
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  value={currentEmployee.phone}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      phone: e.target.value,
                    })
                  }
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  InputProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                />
              </Grid> */}
            </Grid>

            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <Select
                  value={currentEmployee.department || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      department: e.target.value,
                    })
                  }
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  error={!!errors.department}
                  displayEmpty
                  sx={{ fontSize: getFontSize.body2 }}
                >
                  <MenuItem value="">
                    <em style={{ fontSize: getFontSize.body2 }}>
                      Select Department *
                    </em>
                  </MenuItem>
                  {departments.map((dept) => (
                    <MenuItem
                      key={dept.id}
                      value={dept.name}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.department && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ fontSize: getFontSize.caption }}
                  >
                    {errors.department}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  value={currentEmployee.position || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      position: e.target.value,
                    })
                  }
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  displayEmpty
                  sx={{ fontSize: getFontSize.body2 }}
                >
                  <MenuItem value="">
                    <em style={{ fontSize: getFontSize.body2 }}>
                      Select Position (Optional)
                    </em>
                  </MenuItem>
                  {positions.map((position) => (
                    <MenuItem
                      key={position.id}
                      value={position.name}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      {position.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  value={currentEmployee.role || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      role: e.target.value,
                    })
                  }
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  error={!!errors.role}
                  displayEmpty
                  sx={{ fontSize: getFontSize.body2 }}
                >
                  <MenuItem value="">
                    <em style={{ fontSize: getFontSize.body2 }}>
                      Select Role *
                    </em>
                  </MenuItem>
                  {employeeRoles.map((role) => (
                    <MenuItem
                      key={role.id}
                      value={role.name}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        {getRoleIcon(role.name)}
                        <span style={{ fontSize: getFontSize.body2 }}>
                          {role.name}
                        </span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ fontSize: getFontSize.caption }}
                  >
                    {errors.role}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password *"
                  error={!!errors.password}
                  value={currentEmployee.password || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      password: e.target.value,
                    })
                  }
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  disabled={!!currentEmployee.id}
                  InputProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: getFontSize.body2 },
                  }}
                  FormHelperTextProps={{
                    sx: { fontSize: getFontSize.caption },
                  }}
                />
              </Grid>
              {currentEmployee.id && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="New Password"
                    value={currentEmployee.newPassword || ""}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        newPassword: e.target.value,
                      })
                    }
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                    InputProps={{
                      sx: { fontSize: getFontSize.body2 },
                    }}
                    InputLabelProps={{
                      sx: { fontSize: getFontSize.body2 },
                    }}
                  />
                </Grid>
              )}
            </Grid>

            <FormControlLabel
              control={
                <Switch
                  checked={currentEmployee.status === true}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      status: e.target.checked,
                    })
                  }
                  size={isMobile ? "small" : "medium"}
                />
              }
              label={`Status: ${currentEmployee.status === true ? "Active" : "Inactive"}`}
              sx={{
                mt: 2,
                width: "155px",
                "& .MuiTypography-root": { fontSize: getFontSize.body2 },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            borderTop: 1,
            borderColor: "divider",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Button
            onClick={handleCloseDialog}
            fullWidth={isMobile}
            sx={{
              fontSize: getFontSize.body2,
              order: { xs: 2, sm: 1 },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth={isMobile}
            sx={{
              fontSize: getFontSize.body2,
              order: { xs: 1, sm: 2 },
            }}
          >
            {currentEmployee.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
