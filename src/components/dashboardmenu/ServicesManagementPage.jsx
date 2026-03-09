import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  Chip,
  IconButton,
  Tooltip,
  InputAdornment,
  FormControlLabel,
  Switch,
  Avatar,
  Grid,
  FormHelperText,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
  alpha,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  Search,
  CheckCircle,
  Cancel,
  Image as ImageIcon,
  CloudUpload,
} from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  getApplicationServicesList,
  updateServiceRequest,
} from "../../services/AppConfigAction";
import useLoading from "../../redux/slices/useLoading";
import eaplRotatingLogo from "../../assets/images/EAPLfavicon.png";

export const ServicesManagementPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoading();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const [services, setServices] = useState([]);

  // Dialog state - MUST be declared BEFORE any useEffect that uses it
  const [openDialog, setOpenDialog] = useState(false);

  // Responsive font sizes
  const getFontSize = {
    h4: { xs: "1.5rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
    h5: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem", lg: "1.5rem" },
    h6: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
    body1: { xs: "0.875rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
    body2: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem", lg: "0.95rem" },
    caption: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem", lg: "0.8rem" },
  };

  // Fix for aria-hidden warning - this useEffect comes AFTER openDialog is declared
  useEffect(() => {
    if (openDialog) {
      const rootElement = document.getElementById("root");
      if (rootElement && rootElement.getAttribute("aria-hidden") === "true") {
        rootElement.removeAttribute("aria-hidden");
      }
      if (document.body.getAttribute("aria-hidden") === "true") {
        document.body.removeAttribute("aria-hidden");
      }
    }
  }, [openDialog]);

  useEffect(() => {
    const loadConfigs = async () => {
      showLoader(eaplRotatingLogo, 0);
      setLoading(true);
      try {
        const result = await dispatch(getApplicationServicesList());
        if (result.type === "APPCONFIG_INIT") {
          const formattedServices = result.payload.map((service) => ({
            ...service,
            id: service.service_id || service.id,
            status:
              service.status === true ||
              service.status === "active" ||
              service.status === 1
                ? "active"
                : "inactive",
            icon: service.icon || service.icon_url || "📊",
          }));
          setServices(formattedServices);
          setFilteredServices(formattedServices);
        }
      } catch (error) {
        console.error("Error loading services:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load services",
          timer: 3000,
          showConfirmButton: true,
        });
      } finally {
        setLoading(false);
        hideLoader();
      }
    };

    loadConfigs();
  }, [dispatch]);

  // Filter services based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) =>
          service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.price?.toString().includes(searchTerm) ||
          service.duration?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);

  const [currentService, setCurrentService] = useState({
    title: "",
    description: "",
    icon: "",
    category: "Development",
    features: "",
    bg_type: "image/jpeg",
    price: "",
    duration: "",
    status: "active",
    indicator: "I",
  });

  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState("");

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!currentService.title?.trim()) {
      newErrors.title = "Service title is required";
    } else if (currentService.title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!currentService.category?.trim()) {
      newErrors.category = "Category is required";
    }

    if (
      currentService.description &&
      currentService.description.trim().length > 500
    ) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (
      currentService.price &&
      isNaN(parseFloat(currentService.price)) &&
      currentService.price !== "Custom quote"
    ) {
      newErrors.price = 'Price must be a valid number or "Custom quote"';
    }

    // Icon validation
    // if (!currentService.icon?.trim() && !iconFile) {
    //   newErrors.icon = "Icon or image is required";
    // }

    if (currentService.features) {
      const featuresArray = currentService.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);
      if (featuresArray.length > 10) {
        newErrors.features = "Maximum 10 features allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate icon file
  const validateIconFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];

    if (!validTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please upload a valid image (JPEG, PNG, GIF, SVG, WebP)",
        timer: 3000,
        showConfirmButton: true,
      });
      return false;
    }

    // Validate file size (max 2MB for icons)
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Image size should be less than 2MB",
        timer: 3000,
        showConfirmButton: true,
      });
      return false;
    }

    return true;
  };

  const handleEdit = (service) => {
    // Convert status to proper format for the form
    const statusForForm =
      service.status === "active" ||
      service.status === true ||
      service.status === 1
        ? "active"
        : "inactive";

    setCurrentService({
      ...service,
      status: statusForForm, // Use string for the form
      indicator: "U", // Update indicator
    });

    // Clear previous errors
    setErrors({});
    setSubmitError("");

    // Set icon preview if icon exists
    if (service.icon) {
      if (service.icon.startsWith("http") || service.icon.startsWith("data:")) {
        setIconPreview(service.icon);
      } else {
        // If it's an emoji or text, use it as is
        setIconPreview(service.icon);
      }
    }
    setIconFile(null);
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
    });

    if (result.isConfirmed) {
      try {
        const deletePayload = {
          id: id,
          indicator: "D", // Delete indicator
        };

        const apiResult = await dispatch(updateServiceRequest(deletePayload));

        if (apiResult.type === "SERVICE_DETAILS_FETCH_SUCCESS") {
          // Update local state
          setServices(services.filter((service) => service.id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Service deleted successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: apiResult.payload?.message || "Failed to delete service",
            timer: 3000,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error deleting service",
          timer: 3000,
          showConfirmButton: true,
        });
      }
    }
  };

  const toggleStatus = async (id) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    const newStatus = service.status === "active" ? "inactive" : "active";
    const statusText = newStatus === "active" ? "activate" : "deactivate";

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${statusText} this service?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "active" ? "#28a745" : "#dc3545",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${statusText} it!`,
    });

    if (result.isConfirmed) {
      const updatedService = {
        id: service.service_id || service.id,
        status: newStatus === "active", // Convert to boolean for API
        indicator: "U",
      };

      try {
        const apiResult = await dispatch(updateServiceRequest(updatedService));

        if (apiResult.type === "SERVICE_DETAILS_FETCH_SUCCESS") {
          // Update local state with string status
          setServices(
            services.map((s) =>
              s.id === id ? { ...s, status: newStatus } : s,
            ),
          );

          Swal.fire({
            icon: "success",
            title: "Status Updated!",
            text: `Service ${statusText}d successfully`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: apiResult.payload?.message || "Failed to update status",
            timer: 3000,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating status",
          timer: 3000,
          showConfirmButton: true,
        });
      }
    }
  };

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!validateIconFile(file)) {
      return;
    }

    setIconFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setIconPreview(base64String);
      // Set the icon as base64 string for the payload
      setCurrentService({
        ...currentService,
        icon: base64String,
      });

      // Clear icon error if exists
      if (errors.icon) {
        const newErrors = { ...errors };
        delete newErrors.icon;
        setErrors(newErrors);
      }
    };
    reader.readAsDataURL(file);
  };

  const preparePayloadTEST = () => {
    let iconValue = currentService.icon;
    let iconType = null;

    // If we have an uploaded file, extract base64 data
    if (iconFile) {
      iconType = iconFile.type;
      // iconValue is already base64 from handleIconUpload
    } else if (currentService.icon && currentService.icon.startsWith("data:")) {
      // Extract type from existing base64
      const matches = currentService.icon.match(/^data:(.+);base64,/);
      if (matches) {
        iconType = matches[1];
        // Remove data URL prefix for API
        iconValue = currentService.icon.split(",")[1];
      }
    }

    // Convert status based on what your backend expects
    let statusValue;

    // Try boolean first (most common)
    if (currentService.status === "active" || currentService.status === true) {
      statusValue = true;
    } else {
      statusValue = false;
    }

    // Prepare features
    const featuresValue = Array.isArray(currentService.features)
      ? currentService.features.join(",")
      : currentService.features;

    // Build payload
    const payload = {
      id: currentService.service_id || currentService.id,
      title: currentService.title.trim(),
      description: currentService.description?.trim() || "",
      icon: iconValue,
      icon_type: iconType,
      category: currentService.category,
      features: featuresValue,
      bg_type: iconType,
      price: currentService.price?.trim() || "",
      duration: currentService.duration?.trim() || "",
      status: statusValue, // Use the converted value
      indicator: currentService.indicator,
    };

    // Remove any undefined or null values
    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === undefined ||
        payload[key] === null ||
        payload[key] === ""
      ) {
        delete payload[key];
      }
    });

    return payload;
  };

  const preparePayload = () => {
    let iconValue = null;
    let iconType = null;

    // ✅ Only when NEW file uploaded
    if (iconFile && currentService.icon) {
      iconType = iconFile.type;

      if (currentService.icon.startsWith("data:")) {
        iconValue = currentService.icon.split(",")[1];
      } else {
        // Already pure base64
        iconValue = currentService.icon;
      }
    }

    const statusValue =
      currentService.status === "active" || currentService.status === true;

    const payload = {
      id: currentService.service_id || currentService.id,
      title: currentService.title?.trim() || "",
      description: currentService.description?.trim() || "",
      category: currentService.category,
      features: currentService.features || "",
      price: currentService.price || "",
      duration: currentService.duration || "",
      status: statusValue,
      indicator: currentService.indicator,
    };

    // Only attach icon if uploaded
    if (iconFile && iconValue) {
      payload.icon = iconValue;
      payload.icon_type = iconType;
      payload.bg_type = iconType;
    }

    return payload;
  };

  const handleSubmit = async () => {
    // Clear previous submit error
    setSubmitError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = preparePayload();

      const result = await dispatch(updateServiceRequest(payload));

      if (result.type === "SERVICE_DETAILS_FETCH_SUCCESS") {
        if (result.payload?.success) {
          // Refresh services list
          const refreshResult = await dispatch(getApplicationServicesList());
          if (refreshResult.type === "APPCONFIG_INIT") {
            const formattedServices = refreshResult.payload.map((service) => ({
              ...service,
              id: service.service_id || service.id,
              status:
                service.status === true ||
                service.status === "active" ||
                service.status === 1
                  ? "active"
                  : "inactive",
              icon: service.icon || service.icon_url || "📊",
            }));
            setServices(formattedServices);
            setFilteredServices(formattedServices);
          }

          Swal.fire({
            icon: "success",
            title: "Success!",
            text:
              currentService.indicator === "I"
                ? "Service added successfully"
                : "Service updated successfully",
            timer: 2000,
            showConfirmButton: false,
          });

          // Reset and close dialog
          resetDialog();
          setOpenDialog(false);
        } else {
          setSubmitError(result.payload?.message || "Operation failed");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.payload?.message || "Operation failed",
            timer: 3000,
            showConfirmButton: true,
          });
        }
      } else {
        setSubmitError(result.payload?.message || "Operation failed");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.payload?.message || "Operation failed",
          timer: 3000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error.message || "Failed to save service. Please try again.",
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to save service",
        timer: 3000,
        showConfirmButton: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetDialog = () => {
    setCurrentService({
      title: "",
      description: "",
      icon: "",
      category: "Development",
      features: "",
      bg_type: "image/jpeg",
      price: "",
      duration: "",
      status: "active",
      indicator: "I",
    });
    setIconFile(null);
    setIconPreview("");
    setErrors({});
    setSubmitError("");
  };

  const getStatusIcon = (status) => {
    if (status === "active" || status === true) {
      return <CheckCircle color="success" />;
    } else {
      return <Cancel color="error" />;
    }
  };

  const getStatusColor = (status) => {
    // Handle both string and boolean values
    if (status === "active" || status === true) {
      return "success";
    } else {
      return "error";
    }
  };

  const getCategoryColor = (category) => {
    if (!category) return "default"; // Handle undefined/null

    switch (category.toLowerCase()) {
      case "development":
        return "primary";
      case "design":
        return "secondary";
      case "marketing":
        return "warning";
      case "consulting":
        return "info";
      case "support":
        return "success";
      case "security":
        return "error";
      case "cloud":
        return "info";
      case "analytics":
        return "warning";
      default:
        return "default"; // Always return a valid color
    }
  };

  // Define columns for DataGrid with responsive widths
  const columns = [
    {
      field: "icon",
      headerName: "",
      width: isMobile ? 60 : 80,
      renderCell: (params) => {
        const iconValue = params.value;

        // Determine how to display the icon
        const renderIconGGGGG = () => {
          if (!iconValue) {
            return (
              <Avatar
                sx={{
                  bgcolor: "grey.300",
                  width: isMobile ? 24 : 32,
                  height: isMobile ? 24 : 32,
                }}
              >
                <ImageIcon fontSize="small" />
              </Avatar>
            );
          }

          // Check if it's a Base64 string
          if (typeof iconValue === "string") {
            // Check if it's already a data URL
            if (iconValue.startsWith("data:image/")) {
              return (
                <Avatar
                  sx={{ width: isMobile ? 24 : 32, height: isMobile ? 24 : 32 }}
                  src={iconValue}
                  alt="Service Icon"
                />
              );
            }

            // Check if it's a pure Base64 (without data URL prefix)
            if (iconValue.length > 100 && /^[A-Za-z0-9+/=]+$/.test(iconValue)) {
              // It's likely a Base64 string without prefix
              const base64Url = `data:image/jpeg;base64,${iconValue}`;
              return (
                <Avatar
                  sx={{ width: isMobile ? 24 : 32, height: isMobile ? 24 : 32 }}
                  src={base64Url}
                  alt="Service Icon"
                />
              );
            }

            // Check if it's an emoji or short text
            if (iconValue.length <= 3) {
              return (
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: isMobile ? 24 : 32,
                    height: isMobile ? 24 : 32,
                    fontSize: isMobile ? "0.8rem" : "1rem",
                  }}
                >
                  {iconValue}
                </Avatar>
              );
            }

            // Check if it's a URL
            if (iconValue.startsWith("http")) {
              return (
                <Avatar
                  sx={{ width: isMobile ? 24 : 32, height: isMobile ? 24 : 32 }}
                  src={iconValue}
                  alt="Service Icon"
                />
              );
            }
          }

          // Default fallback
          return (
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: isMobile ? 24 : 32,
                height: isMobile ? 24 : 32,
              }}
            >
              📊
            </Avatar>
          );
        };

        const renderIcon = () => {
          if (!iconValue || typeof iconValue !== "string") {
            return (
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: isMobile ? 24 : 32,
                  height: isMobile ? 24 : 32,
                }}
              >
                📊
              </Avatar>
            );
          }

          // Already data URL
          if (iconValue.startsWith("data:image/")) {
            return (
              <Avatar
                sx={{ width: isMobile ? 24 : 32, height: isMobile ? 24 : 32 }}
                src={iconValue}
              />
            );
          }

          // Pure base64
          if (/^[A-Za-z0-9+/=]+$/.test(iconValue)) {
            return (
              <Avatar
                sx={{ width: isMobile ? 24 : 32, height: isMobile ? 24 : 32 }}
                src={`data:image/jpeg;base64,${iconValue}`}
              />
            );
          }

          // URL
          if (iconValue.startsWith("http")) {
            return (
              <Avatar
                sx={{ width: isMobile ? 24 : 32, height: isMobile ? 24 : 32 }}
                src={iconValue}
              />
            );
          }

          // Emoji
          return (
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: isMobile ? 24 : 32,
                height: isMobile ? 24 : 32,
              }}
            >
              {iconValue}
            </Avatar>
          );
        };

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
            {renderIcon()}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 100 : 130,
      sortable: false,
      filterable: false,
      headeralign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            height: "100%",
            width: "100%",
          }}
        >
          <Tooltip
            title={params.row.status === "active" ? "Deactivate" : "Activate"}
          >
            <IconButton
              size="small"
              onClick={() => toggleStatus(params.row.id)}
              sx={{ width: isMobile ? 28 : 32, height: isMobile ? 28 : 32 }}
            >
              {getStatusIcon(params.row.status)}
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEdit(params.row)}
              sx={{ width: isMobile ? 28 : 32, height: isMobile ? 28 : 32 }}
            >
              <Edit sx={{ fontSize: isMobile ? 16 : 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
              sx={{ width: isMobile ? 28 : 32, height: isMobile ? 28 : 32 }}
            >
              <Delete sx={{ fontSize: isMobile ? 16 : 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "title",
      headerName: "Service Name",
      width: isMobile ? 120 : isTablet ? 150 : 200,
      editable: false,
    },
    {
      field: "category",
      headerName: "Category",
      width: isMobile ? 100 : isTablet ? 120 : 150,
      renderCell: (params) => {
        const category = params.value || ""; // Ensure it's not undefined
        return (
          <Chip
            label={category}
            color={getCategoryColor(category)}
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
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: isMobile ? 90 : 120,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography fontWeight="medium" sx={{ fontSize: getFontSize.body2 }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      width: isMobile ? 90 : 120,
      renderCell: (params) => (
        <Typography sx={{ fontSize: getFontSize.body2 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: isMobile ? 90 : 130,
      renderCell: (params) => {
        const status =
          params.value === "active" || params.value === true
            ? "active"
            : "inactive";
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              height: "100%",
            }}
          >
            {!isMobile && getStatusIcon(status)}
            <Chip
              label={status}
              color={getStatusColor(status)}
              size="small"
              variant="outlined"
              sx={{
                fontSize: getFontSize.caption,
                height: isMobile ? 20 : 24,
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: isMobile ? 150 : isTablet ? 300 : 500,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: getFontSize.body2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {params.value || "No description"}
          </Typography>
        </Box>
      ),
    },
  ];

  // Service categories for dropdown
  const serviceCategories = [
    "Development",
    "Design",
    "Marketing",
    "Consulting",
    "Support",
    "Cloud",
    "Security",
    "Analytics",
    "Integration",
    "Other",
  ];

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack sx={{ fontSize: { xs: 16, sm: 20 } }} />}
        onClick={() => navigate("/dashboard")}
        sx={{
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
        }}
      >
        Back to Dashboard
      </Button>

      {/* Header Section */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          mb: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          backgroundColor: alpha(theme.palette.primary.main, 0.02),
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
          gap={2}
        >
          {/* <Box>
            <Typography 
              variant="h5" 
              fontWeight="bold"
              sx={{ 
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                mb: 0.5
              }}
            >
              Services Management
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: getFontSize.body2 }}
            >
              Manage service offerings, categories, and pricing
            </Typography>
          </Box> */}

          <Button
            variant="contained"
            startIcon={<Add sx={{ fontSize: { xs: 16, sm: 20 } }} />}
            onClick={() => {
              resetDialog();
              setOpenDialog(true);
            }}
            size={isMobile ? "medium" : "medium"}
            sx={{
              whiteSpace: "nowrap",
              minWidth: { xs: "100%", sm: "150px" },
              width: { xs: "100%", sm: "auto" },
              fontSize: getFontSize.body2,
            }}
          >
            Add Service
          </Button>
        </Box>

        {/* <Divider sx={{ my: { xs: 2, sm: 2.5 } }} /> */}

        {/* Search Section */}
        {/* <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          width="100%"
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            fullWidth
            placeholder="Search services by name, category, price, or duration..."
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
              '& .MuiInputBase-input': {
                fontSize: getFontSize.body2,
              }
            }}
          />
        </Box> */}
      </Paper>

      {/* DataGrid Container */}
      <Paper
        elevation={2}
        sx={{
          height: "calc(100vh - 230px)",
          width: "100%",
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={filteredServices}
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

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => !submitting && setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
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
            // bgcolor: alpha(theme.palette.primary.main, 0.02),
            bgcolor: "#05566e",
            color: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" } }}
            >
              {currentService.id
                ? `Edit Service: ${currentService.title}`
                : "Add New Service"}
            </Typography>
            {currentService.id && (
              <Chip
                label={
                  currentService.indicator === "U"
                    ? "Update Mode"
                    : "Insert Mode"
                }
                color="info"
                size="small"
                sx={{ ml: { xs: 0, sm: 2 } }}
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              pt: { xs: 1, sm: 2 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
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

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {/* Icon Upload Section */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    p: { xs: 1.5, sm: 2 },
                    border: "1px solid",
                    borderColor: errors.icon ? "error.main" : "divider",
                    borderRadius: { xs: 1.5, sm: 2 },
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontSize: getFontSize.body2 }}
                  >
                    Service Icon *
                  </Typography>

                  {/* Icon Preview */}
                  <Avatar
                    sx={{
                      width: { xs: 60, sm: 70, md: 80 },
                      height: { xs: 60, sm: 70, md: 80 },
                      bgcolor: "primary.main",
                      fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
                      mb: 2,
                      border: errors.icon ? "2px solid red" : "none",
                    }}
                    src={
                      iconPreview && iconPreview.startsWith("data:")
                        ? iconPreview
                        : undefined
                    }
                  >
                    {iconPreview && !iconPreview.startsWith("data:")
                      ? iconPreview
                      : currentService.icon || "📊"}
                  </Avatar>

                  {errors.icon && (
                    <FormHelperText
                      error
                      sx={{
                        textAlign: "center",
                        mb: 1,
                        fontSize: getFontSize.caption,
                      }}
                    >
                      {errors.icon}
                    </FormHelperText>
                  )}

                  {/* Upload Button */}
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="icon-upload"
                    type="file"
                    onChange={handleIconUpload}
                    disabled={submitting}
                  />
                  <label htmlFor="icon-upload" style={{ width: "100%" }}>
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={
                        <CloudUpload sx={{ fontSize: { xs: 16, sm: 18 } }} />
                      }
                      size={isMobile ? "small" : "medium"}
                      fullWidth
                      sx={{
                        mb: 1,
                        fontSize: getFontSize.body2,
                      }}
                      disabled={submitting}
                    >
                      Upload Icon
                    </Button>
                  </label>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                    sx={{ fontSize: getFontSize.caption }}
                  >
                    Supported: JPEG, PNG, GIF, SVG, WebP (max 2MB)
                  </Typography>

                  {/* Or enter emoji/text */}
                  <TextField
                    label="Or enter icon/emoji"
                    value={currentService.icon}
                    onChange={(e) => {
                      setCurrentService({
                        ...currentService,
                        icon: e.target.value,
                      });
                      setIconPreview(e.target.value);
                      // Clear error if user enters something
                      if (errors.icon) {
                        const newErrors = { ...errors };
                        delete newErrors.icon;
                        setErrors(newErrors);
                      }
                    }}
                    size="small"
                    fullWidth
                    placeholder="e.g., 📊, 🔒, 🚀"
                    error={!!errors.icon}
                    disabled
                    InputProps={{
                      sx: { fontSize: getFontSize.body2 },
                    }}
                    InputLabelProps={{
                      sx: { fontSize: getFontSize.body2 },
                    }}
                  />
                </Box>
              </Grid>

              {/* Form Fields - Right Side */}
              <Grid item xs={12} md={8}>
                <Stack spacing={{ xs: 2, sm: 2.5 }}>
                  <Grid container spacing={{ xs: 2, sm: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Service Title *"
                        value={currentService.title}
                        onChange={(e) => {
                          setCurrentService({
                            ...currentService,
                            title: e.target.value,
                          });
                          if (errors.title) {
                            const newErrors = { ...errors };
                            delete newErrors.title;
                            setErrors(newErrors);
                          }
                        }}
                        fullWidth
                        required
                        size="small"
                        error={!!errors.title}
                        helperText={errors.title}
                        disabled={submitting}
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
                      <Select
                        value={currentService.category}
                        onChange={(e) => {
                          setCurrentService({
                            ...currentService,
                            category: e.target.value,
                          });
                          if (errors.category) {
                            const newErrors = { ...errors };
                            delete newErrors.category;
                            setErrors(newErrors);
                          }
                        }}
                        fullWidth
                        required
                        size="small"
                        error={!!errors.category}
                        disabled={submitting}
                        sx={{ fontSize: getFontSize.body2 }}
                      >
                        {serviceCategories.map((category) => (
                          <MenuItem
                            key={category}
                            value={category}
                            sx={{ fontSize: getFontSize.body2 }}
                          >
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <FormHelperText
                          error
                          sx={{ fontSize: getFontSize.caption }}
                        >
                          {errors.category}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container spacing={{ xs: 2, sm: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Price"
                        value={currentService.price}
                        onChange={(e) => {
                          setCurrentService({
                            ...currentService,
                            price: e.target.value,
                          });
                          if (errors.price) {
                            const newErrors = { ...errors };
                            delete newErrors.price;
                            setErrors(newErrors);
                          }
                        }}
                        fullWidth
                        size="small"
                        placeholder="e.g., 2541, $5000, Custom quote"
                        error={!!errors.price}
                        helperText={errors.price}
                        disabled={submitting}
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
                        label="Duration"
                        value={currentService.duration}
                        onChange={(e) =>
                          setCurrentService({
                            ...currentService,
                            duration: e.target.value,
                          })
                        }
                        fullWidth
                        size="small"
                        placeholder="e.g., 12 months, 2 weeks, On-going"
                        disabled={submitting}
                        InputProps={{
                          sx: { fontSize: getFontSize.body2 },
                        }}
                        InputLabelProps={{
                          sx: { fontSize: getFontSize.body2 },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Description"
                    value={currentService.description}
                    onChange={(e) => {
                      setCurrentService({
                        ...currentService,
                        description: e.target.value,
                      });
                      if (errors.description) {
                        const newErrors = { ...errors };
                        delete newErrors.description;
                        setErrors(newErrors);
                      }
                    }}
                    fullWidth
                    multiline
                    rows={isMobile ? 3 : 4}
                    size="small"
                    placeholder="Brief description of the service..."
                    error={!!errors.description}
                    helperText={
                      errors.description ||
                      `${currentService.description?.length || 0}/500 characters`
                    }
                    disabled={submitting}
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

                  <TextField
                    label="Features (comma separated)"
                    value={currentService.features}
                    onChange={(e) => {
                      setCurrentService({
                        ...currentService,
                        features: e.target.value,
                      });
                      if (errors.features) {
                        const newErrors = { ...errors };
                        delete newErrors.features;
                        setErrors(newErrors);
                      }
                    }}
                    fullWidth
                    multiline
                    rows={isMobile ? 2 : 3}
                    size="small"
                    placeholder="e.g., Feature 1,Feature 2,Feature 3"
                    helperText={
                      errors.features ||
                      "Separate multiple features with commas"
                    }
                    error={!!errors.features}
                    disabled={submitting}
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

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: { xs: 1.5, sm: 2 },
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: { xs: 1.5, sm: 2 },
                      mt: 1,
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      Service Status
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={currentService.status === "active"}
                          onChange={(e) =>
                            setCurrentService({
                              ...currentService,
                              status: e.target.checked ? "active" : "inactive",
                            })
                          }
                          size={isMobile ? "small" : "medium"}
                          disabled={submitting}
                        />
                      }
                      label={
                        currentService.status === "active"
                          ? "Active"
                          : "Inactive"
                      }
                      labelPlacement="start"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: getFontSize.body2,
                        },
                      }}
                    />
                  </Box>

                  {/* Operation Indicator */}
                  {currentService.id && (
                    <Box
                      sx={{
                        p: { xs: 1, sm: 1.5 },
                        bgcolor:
                          currentService.indicator === "U"
                            ? alpha(theme.palette.info.main, 0.1)
                            : alpha(theme.palette.warning.main, 0.1),
                        borderRadius: { xs: 1, sm: 1.5 },
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight="medium"
                        sx={{ fontSize: getFontSize.caption }}
                      >
                        Mode:{" "}
                        {currentService.indicator === "U" ? "UPDATE" : "INSERT"}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
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
            onClick={() => setOpenDialog(false)}
            disabled={submitting}
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
            color={currentService.indicator === "D" ? "error" : "primary"}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : null}
            fullWidth={isMobile}
            sx={{
              fontSize: getFontSize.body2,
              order: { xs: 1, sm: 2 },
            }}
          >
            {submitting
              ? "Processing..."
              : currentService.id
                ? currentService.indicator === "D"
                  ? "Confirm Delete"
                  : "Update"
                : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
