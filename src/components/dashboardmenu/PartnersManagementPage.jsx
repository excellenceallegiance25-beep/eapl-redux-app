import {
  Add,
  ArrowBack,
  Block,
  CheckCircle,
  CloudUpload,
  Delete,
  Edit,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
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
  InputAdornment,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import eaplRotatingLogo from "../../assets/images/EAPLfavicon.png";
import useLoading from "../../redux/slices/useLoading";
import {
  getPartnerList,
  updatePartnersDetails,
} from "../../services/AppConfigAction";

export const PartnersManagementPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const { showLoader, hideLoader, withLoader } = useLoading();

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

  // FIX: Properly handle aria-hidden when dialog opens/closes
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

      // Find any dialog containers with aria-hidden and remove it
      const dialogContainers = document.querySelectorAll(
        '.MuiDialog-root[aria-hidden="true"]',
      );
      dialogContainers.forEach((container) => {
        container.removeAttribute("aria-hidden");
      });
    }
  }, [openDialog]);

  // FIX: Clean up on unmount
  useEffect(() => {
    return () => {
      // Clean up any stray aria-hidden attributes when component unmounts
      const rootElement = document.getElementById("root");
      if (rootElement && rootElement.getAttribute("aria-hidden") === "true") {
        rootElement.removeAttribute("aria-hidden");
      }
    };
  }, []);

  useEffect(() => {
    loadPartners();
  }, [dispatch]);

  const loadPartners = async () => {
    showLoader(eaplRotatingLogo, 0);
    setLoading(true);
    setError(null);
    try {
      const result = await dispatch(getPartnerList());
      if (result.type === "PARTNER_LIST") {
        setPartners(result.payload);
      }
    } catch (error) {
      console.error("Error loading partners:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load partners",
        timer: 3000,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const [currentPartner, setCurrentPartner] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    services: "",
    type: "",
    color: "",
    logo: "",
    status: true,
    profilePicture: null,
    profilePictureUrl: "",
    profilePictureType: "",
    indicator: "I", // I for Insert, U for Update, D for Delete
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Please select a valid image file (JPEG, PNG, GIF, WebP)",
          timer: 3000,
          showConfirmButton: true,
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "File size should be less than 5MB",
          timer: 3000,
          showConfirmButton: true,
        });
        return;
      }

      try {
        // Convert to base64
        const base64Image = await convertImageToBase64(file);

        // Extract file type from base64 string
        const fileTypeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
        const fileType = fileTypeMatch ? fileTypeMatch[1] : "image/jpeg";

        setSelectedFile(file);
        setFilePreview(base64Image);
        setCurrentPartner({
          ...currentPartner,
          profilePicture: base64Image,
          profilePictureUrl: base64Image,
          profilePictureType: fileType,
        });
      } catch (error) {
        console.error("Error converting image:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to process image",
          timer: 3000,
          showConfirmButton: true,
        });
      }
    }
  };

  const handleEdit = (partner) => {
    // Determine profile picture URL
    let profilePictureUrl = "";
    let profilePictureType = "";
    let profilePicture = null;

    // Check for profile picture in various formats
    if (partner.profilePicture) {
      if (typeof partner.profilePicture === "string") {
        // If it's already a data URL
        if (partner.profilePicture.startsWith("data:image/")) {
          profilePictureUrl = partner.profilePicture;
          profilePicture = partner.profilePicture;
          profilePictureType =
            partner.profilePictureType ||
            partner.profilePicture.match(/^data:(image\/\w+);base64,/)?.[1] ||
            "image/jpeg";
        }
        // If it's a pure base64 string (without data URL prefix)
        else if (partner.profilePicture.length > 100) {
          try {
            // Try to decode to check if it's valid base64
            atob(partner.profilePicture);
            // Convert to data URL
            profilePictureUrl = `data:image/jpeg;base64,${partner.profilePicture}`;
            profilePicture = partner.profilePicture;
            profilePictureType = partner.profilePictureType || "image/jpeg";
          } catch (e) {
            // If not base64, assume it's a URL
            profilePictureUrl = partner.profilePicture;
            profilePicture = partner.profilePicture;
            profilePictureType = partner.profilePictureType || "image/jpeg";
          }
        }
      }
    } else if (partner.profilePictureUrl) {
      // Use profilePictureUrl as fallback
      profilePictureUrl = partner.profilePictureUrl;
      profilePicture = partner.profilePictureUrl;
    }

    // Set the preview
    if (profilePictureUrl) {
      setFilePreview(profilePictureUrl);
    } else {
      setFilePreview("");
    }

    setCurrentPartner({
      id: partner.id || 0,
      name: partner.name || "",
      email: partner.email || "",
      phone: partner.phone || "",
      services: Array.isArray(partner.services)
        ? partner.services.join(", ")
        : partner.services || "",
      type: partner.type || "",
      color: partner.color || "",
      logo: partner.logo || "",
      status: partner.status !== false, // Ensure boolean
      profilePicture: profilePicture,
      profilePictureUrl: profilePictureUrl,
      profilePictureType:
        profilePictureType || partner.profilePictureType || "",
      indicator: "U",
    });

    setSelectedFile(null);
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
        const partnerToDelete = partners.find((partner) => partner.id === id);
        if (!partnerToDelete) return;

        const deletePayload = {
          id: partnerToDelete.id,
          indicator: "D",
        };

        const apiResult = await dispatch(updatePartnersDetails(deletePayload));

        if (
          apiResult.type === "PARTNER_DETAILS_FETCH_SUCCESS" &&
          apiResult.payload.success
        ) {
          // Remove from local state
          setPartners(partners.filter((partner) => partner.id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Partner has been deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: apiResult.payload.message || "Failed to delete partner",
            timer: 3000,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Error deleting partner:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete partner",
          timer: 3000,
          showConfirmButton: true,
        });
      }
    }
  };

  const toggleStatus = async (id) => {
    const partner = partners.find((p) => p.id === id);
    if (!partner) return;

    const newStatus = !partner.status;
    const statusText = newStatus ? "activate" : "deactivate";

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${statusText} this partner?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus ? "#28a745" : "#dc3545",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${statusText} it!`,
    });

    if (result.isConfirmed) {
      try {
        const updatePayload = {
          id: partner.id,
          name: partner.name,
          email: partner.email,
          phone: partner.phone,
          services: Array.isArray(partner.services)
            ? partner.services.join(", ")
            : partner.services,
          type: partner.type,
          color: partner.color,
          logo: partner.logo,
          status: newStatus,
          profilePicture: partner.profilePicture,
          profilePictureType: partner.profilePictureType,
          indicator: "U",
        };

        const apiResult = await dispatch(updatePartnersDetails(updatePayload));

        if (
          apiResult.type === "PARTNER_DETAILS_FETCH_SUCCESS" &&
          apiResult.payload.success
        ) {
          // Update local state
          setPartners(
            partners.map((partner) =>
              partner.id === id ? { ...partner, status: newStatus } : partner,
            ),
          );

          Swal.fire({
            icon: "success",
            title: "Status Updated!",
            text: `Partner has been ${statusText}d successfully.`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: apiResult.payload.message || "Failed to update status",
            timer: 3000,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update status",
          timer: 3000,
          showConfirmButton: true,
        });
      }
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!currentPartner.name) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Name is required",
        timer: 3000,
        showConfirmButton: true,
      });
      return;
    }

    setUploading(true);

    try {
      // Prepare payload according to backend API
      const payload = {
        id: currentPartner.id || 0,
        name: currentPartner.name,
        email: currentPartner.email || "",
        phone: currentPartner.phone || "",
        services: Array.isArray(currentPartner.services)
          ? currentPartner.services
          : currentPartner.services
              .split(",")
              .map((s) => s.trim())
              .join(","),
        type: currentPartner.type || "",
        color: currentPartner.color || "",
        logo: currentPartner.logo || "",
        status: currentPartner.status !== false, // Ensure boolean
        indicator: currentPartner.indicator,
      };

      // Add profile picture if exists
      if (currentPartner.profilePicture) {
        payload.profilePicture = currentPartner.profilePicture;
        payload.profilePictureType = currentPartner.profilePictureType;
      }

      // console.log("Submitting payload:", payload);

      const result = await dispatch(updatePartnersDetails(payload));

      if (result.type === "PARTNER_DETAILS_FETCH_SUCCESS") {
        if (result.payload.success) {
          // Reload partners to get updated data
          await loadPartners();

          // Reset form
          setOpenDialog(false);
          setCurrentPartner({
            id: 0,
            name: "",
            email: "",
            phone: "",
            services: "",
            type: "",
            color: "",
            logo: "",
            status: true,
            profilePicture: null,
            profilePictureUrl: "",
            profilePictureType: "",
            indicator: "I",
          });
          setSelectedFile(null);
          setFilePreview("");

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `Partner ${currentPartner.indicator === "I" ? "added" : "updated"} successfully`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.payload.message || "Operation failed",
            timer: 3000,
            showConfirmButton: true,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save partner",
          timer: 3000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error saving partner:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to ${currentPartner.indicator === "I" ? "create" : "update"} partner`,
        timer: 3000,
        showConfirmButton: true,
      });
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === true || status === "true") {
      return <CheckCircle color="success" />;
    } else {
      return <Block color="error" />;
    }
  };

  const getStatusLabel = (status) => {
    if (status === true || status === "true") {
      return "Active";
    } else {
      return "Inactive";
    }
  };

  const getStatusColor = (status) => {
    if (status === true || status === "true") {
      return "success";
    } else {
      return "error";
    }
  };

  // Define columns for DataGrid with responsive widths
  const columns = [
    {
      field: "profilePicture",
      headerName: "",
      width: isMobile ? 60 : 80,
      renderCell: (params) => {
        const iconValue = params.value;
        const partnerName = params.row.name || "";

        // Helper function to render avatar
        const renderAvatar = () => {
          // If no profile picture, show initials
          if (!iconValue) {
            return (
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: isMobile ? 32 : 40,
                  height: isMobile ? 32 : 40,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  fontWeight: "bold",
                }}
              >
                {partnerName.charAt(0).toUpperCase()}
              </Avatar>
            );
          }

          // Check if it's a Base64 string
          if (typeof iconValue === "string") {
            // Check if it's already a data URL
            if (iconValue.startsWith("data:image/")) {
              return (
                <Avatar
                  sx={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}
                  src={iconValue}
                  alt={partnerName}
                />
              );
            }

            // Check if it's a pure Base64 (without data URL prefix)
            if (iconValue.length > 100) {
              try {
                // Try to decode to check if it's valid base64
                atob(iconValue);
                // It's likely a Base64 string without prefix
                const base64Url = `data:image/jpeg;base64,${iconValue}`;
                return (
                  <Avatar
                    sx={{
                      width: isMobile ? 32 : 40,
                      height: isMobile ? 32 : 40,
                    }}
                    src={base64Url}
                    alt={partnerName}
                  />
                );
              } catch (e) {
                // Not valid base64, treat as URL or text
              }
            }

            // Check if it's a URL
            if (
              iconValue.startsWith("http://") ||
              iconValue.startsWith("https://")
            ) {
              return (
                <Avatar
                  sx={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}
                  src={iconValue}
                  alt={partnerName}
                  onError={(e) => {
                    // If image fails to load, show initials
                    e.target.style.display = "none";
                  }}
                >
                  {partnerName.charAt(0).toUpperCase()}
                </Avatar>
              );
            }
          }

          // Default fallback to initials
          return (
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: isMobile ? 32 : 40,
                height: isMobile ? 32 : 40,
                fontSize: isMobile ? "0.8rem" : "1rem",
                fontWeight: "bold",
              }}
            >
              {partnerName.charAt(0).toUpperCase()}
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
            {renderAvatar()}
          </Box>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 100 : 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={isMobile ? 0.5 : 1}
          sx={{ alignItems: "center", height: "100%" }}
        >
          <Tooltip title={`Set ${params.row.status ? "Inactive" : "Active"}`}>
            <IconButton
              size="small"
              onClick={() => toggleStatus(params.row.id)}
              color={params.row.status ? "success" : "error"}
              sx={{ width: isMobile ? 28 : 32, height: isMobile ? 28 : 32 }}
            >
              {getStatusIcon(params.row.status)}
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEdit(params.row)}
              color="primary"
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
        </Stack>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: isMobile ? 120 : 160,
      editable: false,
      align: "center",
      headerAlign: "center",
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
            sx={{ fontWeight: "medium", fontSize: getFontSize.body2 }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: isMobile ? 140 : 200,
      renderCell: (params) => {
        if (!params.value) return null;
        return (
          <a
            href={`mailto:${params.value}`}
            style={{
              color: "inherit",
              textDecoration: "none",
              fontSize: getFontSize.body2,
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            {params.value.length > (isMobile ? 15 : 25)
              ? `${params.value.substring(0, isMobile ? 15 : 25)}...`
              : params.value}
          </a>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: isMobile ? 100 : 140,
      renderCell: (params) => {
        if (!params.value) return null;
        return (
          <a
            href={`tel:${params.value}`}
            style={{
              color: "inherit",
              textDecoration: "none",
              fontSize: getFontSize.body2,
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            {params.value}
          </a>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: isMobile ? 90 : 120,
      renderCell: (params) => (
        <Chip
          label={params.value || "N/A"}
          size="small"
          variant="outlined"
          color="primary"
          sx={{
            fontSize: getFontSize.caption,
            height: isMobile ? 20 : 24,
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: isMobile ? 90 : 130,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            height: "100%",
          }}
        >
          {!isMobile && getStatusIcon(params.value)}
          <Chip
            label={getStatusLabel(params.value)}
            color={getStatusColor(params.value)}
            size="small"
            variant="outlined"
            sx={{
              minWidth: isMobile ? "60px" : "80px",
              fontWeight: "medium",
              fontSize: getFontSize.caption,
              height: isMobile ? 20 : 24,
            }}
          />
        </Box>
      ),
    },
    {
      field: "services",
      headerName: "Services",
      width: isMobile ? 150 : isTablet ? 250 : 350,
      renderCell: (params) => {
        if (!params.value) return null;

        let servicesArray = [];
        if (Array.isArray(params.value)) {
          servicesArray = params.value;
        } else if (typeof params.value === "string") {
          servicesArray = params.value
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "");
        }

        if (servicesArray.length === 0) return null;

        // On mobile, show fewer services
        const maxServicesToShow = isMobile ? 1 : 3;

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              height: "100%",
              width: "100%",
            }}
          >
            {servicesArray.slice(0, maxServicesToShow).map((service, index) => (
              <Tooltip key={index} title={service} arrow>
                <Chip
                  label={
                    service.length > (isMobile ? 8 : 10)
                      ? `${service.substring(0, isMobile ? 8 : 10)}...`
                      : service
                  }
                  size="small"
                  sx={{
                    maxWidth: isMobile ? 70 : 90,
                    height: isMobile ? 20 : 22,
                    fontSize: getFontSize.caption,
                    fontWeight: 500,
                    borderRadius: 1.5,
                    backgroundColor: "rgba(79,195,247,0.12)",
                    color: "#0f2a44",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      backgroundColor: "rgba(79,195,247,0.2)",
                    },
                  }}
                />
              </Tooltip>
            ))}

            {servicesArray.length > maxServicesToShow && (
              <Tooltip
                title={servicesArray.slice(maxServicesToShow).join(", ")}
                arrow
              >
                <Chip
                  label={`+${servicesArray.length - maxServicesToShow}`}
                  size="small"
                  sx={{
                    height: isMobile ? 20 : 22,
                    fontSize: getFontSize.caption,
                    fontWeight: 600,
                    borderRadius: 1.5,
                    cursor: "pointer",
                    backgroundColor: "rgba(15,42,68,0.08)",
                    color: "#0f2a44",
                    "&:hover": {
                      backgroundColor: "rgba(15,42,68,0.15)",
                    },
                  }}
                />
              </Tooltip>
            )}
          </Box>
        );
      },
    },
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
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                mb: 0.5,
              }}
            >
              Partners Management
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: getFontSize.body2 }}
            >
              Manage partner profiles, services, and status
            </Typography>
          </Box> */}

          <Button
            variant="contained"
            startIcon={<Add sx={{ fontSize: { xs: 16, sm: 20 } }} />}
            onClick={() => {
              setCurrentPartner({
                id: 0,
                name: "",
                email: "",
                phone: "",
                services: "",
                type: "",
                color: "",
                logo: "",
                status: true,
                profilePicture: null,
                profilePictureUrl: "",
                profilePictureType: "",
                indicator: "I",
              });
              setFilePreview("");
              setSelectedFile(null);
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
            Add Partner
          </Button>
        </Box>
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
          rows={partners}
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

      {/* Add/Edit Dialog - FIX: Added proper accessibility props */}
      <Dialog
        open={openDialog}
        onClose={() => !uploading && setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        // FIX: Add these props to properly handle focus management
        disableEnforceFocus={false}
        disableAutoFocus={false}
        keepMounted={false}
        aria-modal={true}
        // FIX: Remove aria-hidden from the dialog container
        hideBackdrop={false}
        PaperProps={{
          sx: {
            m: isMobile ? 0 : { xs: 2, sm: 3 },
            borderRadius: isMobile ? 0 : { xs: 2, sm: 2.5, md: 3 },
            maxHeight: { xs: "100vh", sm: "90vh" },
          },
        }}
        // FIX: Add transition handlers to clean up aria-hidden
        TransitionProps={{
          onExited: () => {
            // Clean up any stray aria-hidden attributes after dialog closes
            const rootElement = document.getElementById("root");
            if (
              rootElement &&
              rootElement.getAttribute("aria-hidden") === "true"
            ) {
              rootElement.removeAttribute("aria-hidden");
            }
            const dialogContainers = document.querySelectorAll(
              '.MuiDialog-root[aria-hidden="true"]',
            );
            dialogContainers.forEach((container) => {
              container.removeAttribute("aria-hidden");
            });
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
            bgcolor: "#035964",
            color: "#fff",
          }}
        >
          {currentPartner.indicator === "I" ? "Add Partner" : "Edit Partner"}
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
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            {/* Profile Picture Upload Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                p: { xs: 1.5, sm: 2 },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: { xs: 1.5, sm: 2 },
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: getFontSize.body2 }}
              >
                Profile Picture
              </Typography>

              {/* Profile Picture Preview */}
              <Avatar
                sx={{
                  width: { xs: 80, sm: 90, md: 100 },
                  height: { xs: 80, sm: 90, md: 100 },
                  bgcolor:
                    filePreview ||
                    currentPartner.profilePicture ||
                    currentPartner.profilePictureUrl
                      ? "transparent"
                      : "primary.main",
                  fontSize:
                    filePreview ||
                    currentPartner.profilePicture ||
                    currentPartner.profilePictureUrl
                      ? "auto"
                      : { xs: "2rem", sm: "2.2rem", md: "2.5rem" },
                  mb: 2,
                  border: "2px solid",
                  borderColor: "divider",
                }}
                src={(() => {
                  // Priority 1: File preview (new upload)
                  if (filePreview) return filePreview;

                  // Priority 2: Existing profile picture
                  if (currentPartner.profilePicture) {
                    // Check if it's a data URL
                    if (typeof currentPartner.profilePicture === "string") {
                      if (
                        currentPartner.profilePicture.startsWith("data:image/")
                      ) {
                        return currentPartner.profilePicture;
                      } else if (currentPartner.profilePicture.length > 100) {
                        try {
                          atob(currentPartner.profilePicture);
                          return `data:image/jpeg;base64,${currentPartner.profilePicture}`;
                        } catch (e) {
                          return currentPartner.profilePicture;
                        }
                      }
                    }
                    return currentPartner.profilePicture;
                  }

                  // Priority 3: Profile picture URL
                  if (currentPartner.profilePictureUrl) {
                    return currentPartner.profilePictureUrl;
                  }

                  return null;
                })()}
                alt={currentPartner.name || "Partner"}
              >
                {!filePreview &&
                !currentPartner.profilePicture &&
                !currentPartner.profilePictureUrl
                  ? currentPartner.name?.charAt(0)?.toUpperCase() || "P"
                  : null}
              </Avatar>

              {/* Upload Button */}
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-picture-upload"
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <label htmlFor="profile-picture-upload" style={{ width: "100%" }}>
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
                  disabled={uploading}
                >
                  Upload Picture
                </Button>
              </label>

              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                sx={{ fontSize: getFontSize.caption }}
              >
                Supported: JPEG, PNG, GIF, WebP (max 5MB)
              </Typography>

              {/* Remove Picture Button (only show if there's a picture) */}
              {(filePreview ||
                currentPartner.profilePicture ||
                currentPartner.profilePictureUrl) && (
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  onClick={() => {
                    setFilePreview("");
                    setSelectedFile(null);
                    setCurrentPartner({
                      ...currentPartner,
                      profilePicture: null,
                      profilePictureUrl: "",
                      profilePictureType: "",
                    });
                  }}
                  disabled={uploading}
                  sx={{
                    mt: 1,
                    fontSize: getFontSize.body2,
                  }}
                >
                  Remove Picture
                </Button>
              )}
            </Box>

            <TextField
              label="Partner Name *"
              value={currentPartner.name}
              onChange={(e) =>
                setCurrentPartner({ ...currentPartner, name: e.target.value })
              }
              fullWidth
              required
              disabled={uploading}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
              InputLabelProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={currentPartner.email}
              onChange={(e) =>
                setCurrentPartner({ ...currentPartner, email: e.target.value })
              }
              fullWidth
              disabled={uploading}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
              InputLabelProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
            />
            <TextField
              label="Phone"
              value={currentPartner.phone}
              onChange={(e) => {
                // Remove non-digits and limit to 10 characters
                const digitsOnly = e.target.value.replace(/\D/g, "");
                const truncated = digitsOnly.slice(0, 10);

                setCurrentPartner({
                  ...currentPartner,
                  phone: truncated,
                });
              }}
              fullWidth
              disabled={uploading}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                sx: { fontSize: getFontSize.body2 },
                // Optional: Add +91 prefix display
                startAdornment: currentPartner.phone ? (
                  <InputAdornment position="start">+91</InputAdornment>
                ) : null,
              }}
              InputLabelProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
              placeholder="9876543210"
              helperText="Enter 10-digit mobile number"
            />
            {/* <TextField
              label="Phone"
              value={currentPartner.phone}
              onChange={(e) =>
                setCurrentPartner({ ...currentPartner, phone: e.target.value })
              }
              fullWidth
              disabled={uploading}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
              InputLabelProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
            /> */}
            <TextField
              label="Type"
              value={currentPartner.type}
              onChange={(e) =>
                setCurrentPartner({ ...currentPartner, type: e.target.value })
              }
              fullWidth
              disabled={uploading}
              size={isMobile ? "small" : "medium"}
              placeholder="Partner type"
              InputProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
              InputLabelProps={{
                sx: { fontSize: getFontSize.body2 },
              }}
            />
            <TextField
              label="Services (comma separated)"
              value={currentPartner.services}
              onChange={(e) =>
                setCurrentPartner({
                  ...currentPartner,
                  services: e.target.value,
                })
              }
              fullWidth
              placeholder="Web Development, Cloud Services"
              helperText="Separate services with commas"
              disabled={uploading}
              multiline
              rows={isMobile ? 2 : 3}
              size={isMobile ? "small" : "medium"}
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
            <FormControlLabel
              control={
                <Switch
                  checked={currentPartner.status !== false}
                  onChange={(e) =>
                    setCurrentPartner({
                      ...currentPartner,
                      status: e.target.checked,
                    })
                  }
                  disabled={uploading}
                  size={isMobile ? "small" : "medium"}
                />
              }
              label="Active Status"
              sx={{
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
            onClick={() => setOpenDialog(false)}
            disabled={uploading}
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
            disabled={uploading || !currentPartner.name}
            fullWidth={isMobile}
            sx={{
              fontSize: getFontSize.body2,
              order: { xs: 1, sm: 2 },
            }}
          >
            {uploading && <CircularProgress size={20} sx={{ mr: 1 }} />}
            {currentPartner.indicator === "I" ? "Add" : "Update"} Partner
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
