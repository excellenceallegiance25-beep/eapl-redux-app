import {
  Analytics,
  ArrowBack,
  AttachMoney,
  Business,
  CheckCircle,
  ChevronRight,
  Cloud,
  Code,
  ContactSupport,
  Dashboard,
  DesignServices,
  Email,
  Error,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  LocationOn,
  People,
  Person,
  Phone,
  Schedule,
  Security,
  Smartphone,
  Star,
  StarHalf,
  Storage,
  Support,
  TrendingUp,
  Twitter,
  Verified,
  Web,
  WhatsApp,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Box,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  Grow,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationServicesList } from "../../services/AppConfigAction";

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(33, 150, 243, 0.2); }
  50% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.4); }
  100% { box-shadow: 0 0 5px rgba(33, 150, 243, 0.2); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Service icons mapping with colors
const serviceIcons = {
  Cloud: {
    icon: Cloud,
    color: "#2196F3",
    gradient: "linear-gradient(135deg, #2196F3, #64B5F6)",
  },
  Development: {
    icon: Code,
    color: "#673AB7",
    gradient: "linear-gradient(135deg, #673AB7, #9575CD)",
  },
  Security: {
    icon: Security,
    color: "#F44336",
    gradient: "linear-gradient(135deg, #F44336, #E57373)",
  },
  Analytics: {
    icon: Analytics,
    color: "#4CAF50",
    gradient: "linear-gradient(135deg, #4CAF50, #81C784)",
  },
  Mobile: {
    icon: Smartphone,
    color: "#FF9800",
    gradient: "linear-gradient(135deg, #FF9800, #FFB74D)",
  },
  Transformation: {
    icon: Business,
    color: "#009688",
    gradient: "linear-gradient(135deg, #009688, #4DB6AC)",
  },
  IoT: {
    icon: Web,
    color: "#9C27B0",
    gradient: "linear-gradient(135deg, #9C27B0, #BA68C8)",
  },
  Blockchain: {
    icon: Storage,
    color: "#795548",
    gradient: "linear-gradient(135deg, #795548, #A1887F)",
  },
  Design: {
    icon: DesignServices,
    color: "#E91E63",
    gradient: "linear-gradient(135deg, #E91E63, #F06292)",
  },
  Support: {
    icon: Support,
    color: "#00BCD4",
    gradient: "linear-gradient(135deg, #00BCD4, #4DD0E1)",
  },
  Default: {
    icon: Cloud,
    color: "#2196F3",
    gradient: "linear-gradient(135deg, #2196F3, #64B5F6)",
  },
};

// Status colors - Fixed to handle both string and boolean
const statusConfig = {
  active: { color: "success", icon: CheckCircle, label: "Active" },
  completed: { color: "info", icon: CheckCircle, label: "Completed" },
  pending: { color: "warning", icon: Error, label: "Pending" },
  inactive: { color: "error", icon: Error, label: "Inactive" },
  "in-progress": { color: "primary", icon: TrendingUp, label: "In Progress" },
  true: { color: "success", icon: CheckCircle, label: "Active" },
  false: { color: "error", icon: Error, label: "Inactive" },
};

// Social media icons
const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: LinkedIn,
  github: GitHub,
  instagram: Instagram,
  whatsapp: WhatsApp,
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [activeTab, setActiveTab] = useState(0);
  const [serviceData, setServiceData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const dispatch = useDispatch();

  // Responsive values
  const containerMaxWidth = isMobile ? false : isTablet ? "md" : "lg";
  const containerPadding = isMobile ? 2 : isTablet ? 3 : 4;

  // WhatsApp configuration
  const whatsappNumber = "916289534780"; // Replace with your actual WhatsApp number
  const getWhatsAppMessage = () => {
    return encodeURIComponent(`Hello, I'm interested in your service: ${serviceData?.title || 'Service'}. Can you provide more information?`);
  };

  const handleWhatsAppClick = () => {
    const message = getWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await dispatch(getApplicationServicesList());

        if (result?.type === "APPCONFIG_INIT") {
          const foundService = result.payload.find(
            (service) => String(service.id) === String(serviceId),
          );

          if (foundService) {
            setServiceData(foundService);
            simulateRelatedData(foundService);
          } else {
            setError("Service not found");
          }
        } else {
          setError("Failed to load service data");
        }
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("Error loading service details");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId, dispatch]);

  const simulateRelatedData = (service) => {
    // Enhanced mock team members
    const mockTeamMembers = [
      {
        id: 1,
        name: "Alex Johnson",
        role: "Lead Engineer",
        avatar: "AJ",
        avatarColor: "#2196F3",
        status: "online",
        email: "alex.j@excellence.com",
        phone: "+1 (555) 123-4567",
        expertise: ["Architecture", "DevOps", "Cloud", "Kubernetes"],
        rating: 4.8,
        projects: 24,
        social: {
          linkedin: "https://linkedin.com/in/alexjohnson",
          github: "https://github.com/alexj",
        },
      },
      {
        id: 2,
        name: "Sarah Chen",
        role: "Security Specialist",
        avatar: "SC",
        avatarColor: "#F44336",
        status: "online",
        email: "sarah.c@excellence.com",
        phone: "+1 (555) 234-5678",
        expertise: ["Security", "Compliance", "Audit", "Penetration Testing"],
        rating: 4.9,
        projects: 18,
        social: {
          linkedin: "https://linkedin.com/in/sarahchen",
        },
      },
      {
        id: 3,
        name: "Mike Wilson",
        role: "Support Engineer",
        avatar: "MW",
        avatarColor: "#4CAF50",
        status: "away",
        email: "mike.w@excellence.com",
        phone: "+1 (555) 345-6789",
        expertise: ["Support", "Maintenance", "Monitoring", "Documentation"],
        rating: 4.7,
        projects: 15,
        social: {
          linkedin: "https://linkedin.com/in/mikewilson",
        },
      },
      {
        id: 4,
        name: "Priya Patel",
        role: "Cloud Architect",
        avatar: "PP",
        avatarColor: "#9C27B0",
        status: "online",
        email: "priya.p@excellence.com",
        phone: "+1 (555) 456-7890",
        expertise: ["AWS", "Azure", "GCP", "Terraform"],
        rating: 4.9,
        projects: 21,
        social: {
          linkedin: "https://linkedin.com/in/priyapatel",
        },
      },
    ];

    // Enhanced mock partners
    const mockPartners = [
      {
        id: 101,
        name: "Amazon Web Services",
        type: "Cloud Provider",
        logo: "AWS",
        logoColor: "#FF9900",
        partnership: "Strategic Partner",
        since: "2022",
        description: "Premier consulting partner for cloud solutions",
        projects: 45,
        rating: 4.9,
        website: "https://aws.amazon.com",
      },
      {
        id: 102,
        name: "Microsoft",
        type: "Technology Partner",
        logo: "MS",
        logoColor: "#00A4EF",
        partnership: "Gold Partner",
        since: "2021",
        description: "Specialized in Azure and .NET solutions",
        projects: 38,
        rating: 4.8,
        website: "https://microsoft.com",
      },
      {
        id: 103,
        name: "Google Cloud",
        type: "Cloud Provider",
        logo: "GC",
        logoColor: "#4285F4",
        partnership: "Premier Partner",
        since: "2022",
        description: "Expert in GCP and AI/ML solutions",
        projects: 32,
        rating: 4.9,
        website: "https://cloud.google.com",
      },
    ];

    setTeamMembers(mockTeamMembers);
    setPartners(mockPartners);
  };

  const getIconConfig = (category) => {
    return serviceIcons[category] || serviceIcons.Default;
  };

  // Fixed getStatusConfig function to handle different status types
  const getStatusConfig = (status) => {
    if (status === undefined || status === null) {
      return statusConfig.active;
    }

    // Handle boolean status
    if (typeof status === "boolean") {
      return status ? statusConfig.true : statusConfig.false;
    }

    // Handle string status
    if (typeof status === "string") {
      const statusKey = status.toLowerCase();
      return statusConfig[statusKey] || statusConfig.active;
    }

    // Handle number status (0 or 1)
    if (typeof status === "number") {
      return status === 1 ? statusConfig.true : statusConfig.false;
    }

    return statusConfig.active;
  };

  if (loading) {
    return (
      <Container
        maxWidth={containerMaxWidth}
        sx={{
          py: containerPadding,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: { xs: "60vh", sm: "70vh", md: "80vh" },
        }}
      >
        <Box textAlign="center">
          <Zoom in={true}>
            <CircularProgress
              size={isMobile ? 40 : isTablet ? 50 : 60}
              thickness={4}
              sx={{
                mb: { xs: 2, sm: 2.5, md: 3 },
                color: serviceData
                  ? getIconConfig(serviceData.category).color
                  : "primary.main",
              }}
            />
          </Zoom>
          <Fade in={true} timeout={1000}>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              color="text.secondary"
            >
              Loading service details...
            </Typography>
          </Fade>
        </Box>
      </Container>
    );
  }

  if (error || !serviceData) {
    return (
      <Container
        maxWidth={containerMaxWidth}
        sx={{ py: containerPadding }}
      >
        <Fade in>
          <Paper
            sx={{
              p: { xs: 2, sm: 3, md: 4, lg: 5 },
              textAlign: "center",
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            }}
          >
            <Zoom in={true}>
              <Error
                sx={{
                  fontSize: { xs: 40, sm: 50, md: 60 },
                  color: "error.main",
                  mb: { xs: 1.5, sm: 2, md: 2.5 },
                  animation: `${pulse} 2s infinite`,
                }}
              />
            </Zoom>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              gutterBottom
              color="error"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                mb: { xs: 1.5, sm: 2, md: 2.5 },
              }}
            >
              {error || "Service not found"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              paragraph
              sx={{
                maxWidth: { xs: "100%", sm: 400, md: 500 },
                mx: "auto",
                mb: { xs: 2, sm: 2.5, md: 3 },
                fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                px: { xs: 1, sm: 2 },
              }}
            >
              The service you're looking for doesn't exist or may have been
              removed.
            </Typography>
            <Button
              variant="contained"
              size={isMobile ? "small" : "medium"}
              onClick={() => navigate("/services")}
              startIcon={<ArrowBack />}
              sx={{
                px: { xs: 2, sm: 2.5, md: 3 },
                py: { xs: 0.75, sm: 1, md: 1.25 },
                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
              }}
            >
              Back to Services
            </Button>
          </Paper>
        </Fade>
      </Container>
    );
  }

  const iconConfig = getIconConfig(serviceData.category);
  const IconComponent = iconConfig.icon;
  const status = getStatusConfig(serviceData.status);
  const StatusIcon = status.icon;

  return (
    <Fade in={!loading}>
      <Container
        maxWidth={containerMaxWidth}
        sx={{
          py: 10,
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {/* Breadcrumbs */}
        {/* <Breadcrumbs
          separator={<ChevronRight sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
          sx={{ mb: { xs: 1.5, sm: 2, md: 2.5 } }}
        >
          <Link
            component="button"
            onClick={() => navigate("/")}
            underline="hover"
            color="inherit"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }}
          >
            Home
          </Link>
          <Link
            component="button"
            onClick={() => navigate("/services")}
            underline="hover"
            color="inherit"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }}
          >
            Services
          </Link>
          <Typography
            color="text.primary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }}
          >
            {serviceData.title}
          </Typography>
        </Breadcrumbs> */}

        {/* Header Section */}
        <Grow in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
              mb: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              background: `linear-gradient(135deg, ${iconConfig.color}15 0%, ${iconConfig.color}05 100%)`,
              borderLeft: {
                xs: `4px solid ${iconConfig.color}`,
                sm: `5px solid ${iconConfig.color}`,
                md: `6px solid ${iconConfig.color}`,
              },
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: isDesktop ? "translateY(-4px)" : "none",
                boxShadow: isDesktop ? 6 : 3,
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: { xs: "80px", sm: "120px", md: "160px", lg: "200px" },
                height: { xs: "80px", sm: "120px", md: "160px", lg: "200px" },
                background: `radial-gradient(circle, ${iconConfig.color}20 0%, transparent 70%)`,
                borderRadius: "50%",
                transform: "translate(50%, -50%)",
              },
            }}
          >
            <Box
              display="flex"
              alignItems={{ xs: "center", md: "center" }}
              justifyContent="space-between"
              flexDirection={{ xs: "column", md: "row" }}
              gap={{ xs: 2, sm: 2.5, md: 3 }}
            >
              <Box flex={1} width="100%">
                <Box
                  display="flex"
                  alignItems="center"
                  gap={{ xs: 1, sm: 1.5, md: 2 }}
                  mb={{ xs: 1.5, sm: 2, md: 2.5 }}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <IconButton
                    onClick={() => navigate("/services")}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      bgcolor: "background.paper",
                      "&:hover": {
                        bgcolor: "action.hover",
                        transform: isDesktop ? "scale(1.1)" : "none",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ArrowBack sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                  </IconButton>
                  <Box textAlign={{ xs: "center", sm: "left" }}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      fontWeight="bold"
                      component="h1"
                      sx={{
                        fontSize: { 
                          xs: "1.5rem", 
                          sm: "1.8rem", 
                          md: "2rem", 
                          lg: "2.2rem" 
                        },
                        background: iconConfig.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        lineHeight: { xs: 1.3, sm: 1.4 },
                      }}
                    >
                      {serviceData.title}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      mt={1}
                      flexWrap="wrap"
                      justifyContent={{ xs: "center", sm: "flex-start" }}
                    >
                      <Chip
                        icon={<StatusIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
                        label={status.label}
                        color={status.color}
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          fontWeight: 600,
                          height: { xs: 24, sm: 28, md: 32 },
                          fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                        }}
                      />
                      <Chip
                        icon={<IconComponent sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
                        label={serviceData.category}
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          bgcolor: `${iconConfig.color}20`,
                          color: iconConfig.color,
                          fontWeight: 600,
                          height: { xs: 24, sm: 28, md: 32 },
                          fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem", lg: "1rem" },
                    lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
                    maxWidth: { xs: "100%", md: "800px" },
                    mx: { xs: "auto", md: 0 },
                    textAlign: { xs: "center", md: "left" },
                    mb: { xs: 2, sm: 2.5, md: 3 },
                  }}
                >
                  {serviceData.description}
                </Typography>

                {/* Quick Stats */}
                <Grid
                  container
                  spacing={{ xs: 1, sm: 1.5, md: 2 }}
                  sx={{ mt: { xs: 1, sm: 1.5, md: 2 } }}
                >
                  <Grid item xs={6} sm={3}>
                    <Paper
                      sx={{
                        p: { xs: 1, sm: 1.5, md: 2 },
                        textAlign: "center",
                        background: `${iconConfig.color}08`,
                        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                        border: `1px solid ${iconConfig.color}20`,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={iconConfig.color}
                        sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}
                      >
                        24/7
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                      >
                        Support
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper
                      sx={{
                        p: { xs: 1, sm: 1.5, md: 2 },
                        textAlign: "center",
                        background: `${iconConfig.color}08`,
                        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                        border: `1px solid ${iconConfig.color}20`,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={iconConfig.color}
                        sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}
                      >
                        {teamMembers.length}+
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                      >
                        Experts
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper
                      sx={{
                        p: { xs: 1, sm: 1.5, md: 2 },
                        textAlign: "center",
                        background: `${iconConfig.color}08`,
                        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                        border: `1px solid ${iconConfig.color}20`,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={iconConfig.color}
                        sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}
                      >
                        98%
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                      >
                        Satisfaction
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper
                      sx={{
                        p: { xs: 1, sm: 1.5, md: 2 },
                        textAlign: "center",
                        background: `${iconConfig.color}08`,
                        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                        border: `1px solid ${iconConfig.color}20`,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={iconConfig.color}
                        sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}
                      >
                        5+ yrs
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                      >
                        Experience
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              {/* Animated Avatar */}
              <Box
                sx={{
                  position: "relative",
                  animation: isDesktop ? `${float} 3s ease-in-out infinite` : "none",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 70, sm: 80, md: 90, lg: 100 },
                    height: { xs: 70, sm: 80, md: 90, lg: 100 },
                    bgcolor: iconConfig.color,
                    fontSize: { xs: 35, sm: 40, md: 45, lg: 50 },
                    boxShadow: `0 ${isMobile ? "5px" : "10px"} 30px ${iconConfig.color}40`,
                    border: { xs: "3px solid white", sm: "4px solid white" },
                    animation: isDesktop ? `${glow} 2s ease-in-out infinite` : "none",
                  }}
                >
                  <IconComponent sx={{ fontSize: { xs: 35, sm: 40, md: 45, lg: 50 } }} />
                </Avatar>
                <Tooltip title="Active Service" arrow>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: { xs: 12, sm: 14, md: 16 },
                      height: { xs: 12, sm: 14, md: 16 },
                      bgcolor: "success.main",
                      borderRadius: "50%",
                      border: { xs: "2px solid white", sm: "3px solid white" },
                      animation: isDesktop ? `${pulse} 2s infinite` : "none",
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Paper>
        </Grow>

        {/* Main Content Grid */}
        <Grid 
          container 
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
        >
          {/* Left Column - Service Details */}
          <Grid item xs={12} md={8}>
            <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {/* Service Overview */}
              <Zoom in={true} timeout={500}>
                <Card
                  sx={{
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: isDesktop ? "translateY(-4px)" : "none",
                      boxShadow: isDesktop ? 6 : 3,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: iconConfig.color,
                        fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                        mb: { xs: 2, sm: 2.5, md: 3 },
                      }}
                    >
                      <Dashboard sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                      Service Overview
                    </Typography>

                    <Typography
                      variant="body2"
                      paragraph
                      sx={{
                        lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
                        mb: { xs: 2, sm: 2.5, md: 3 },
                        color: "text.primary",
                        fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                      }}
                    >
                      {serviceData.details || serviceData.description}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                        mb: { xs: 1.5, sm: 2, md: 2.5 },
                      }}
                    >
                      Key Features
                    </Typography>

                    <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                      {serviceData.features
                        ?.split(",")
                        .map((feature, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Grow in={true} timeout={500 + index * 100}>
                              <Paper
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                sx={{
                                  p: { xs: 1.5, sm: 1.8, md: 2 },
                                  borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                                  background:
                                    hoveredCard === index
                                      ? `linear-gradient(135deg, ${iconConfig.color}15, ${iconConfig.color}05)`
                                      : `${iconConfig.color}05`,
                                  border: `1px solid ${iconConfig.color}20`,
                                  transition: "all 0.3s ease",
                                  transform:
                                    hoveredCard === index && isDesktop
                                      ? "translateY(-4px) scale(1.02)"
                                      : "none",
                                  boxShadow:
                                    hoveredCard === index && isDesktop ? 4 : 1,
                                  cursor: "pointer",
                                }}
                              >
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  gap={{ xs: 1, sm: 1.5, md: 2 }}
                                >
                                  <Box
                                    sx={{
                                      width: { xs: 28, sm: 32, md: 36 },
                                      height: { xs: 28, sm: 32, md: 36 },
                                      borderRadius: "50%",
                                      background: `${iconConfig.color}20`,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Star
                                      sx={{
                                        color: iconConfig.color,
                                        fontSize: { xs: 16, sm: 18, md: 20 },
                                      }}
                                    />
                                  </Box>
                                  <Box flex={1}>
                                    <Typography
                                      fontWeight="medium"
                                      sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" } }}
                                    >
                                      {feature.trim()}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                                    >
                                      Feature {index + 1}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Paper>
                            </Grow>
                          </Grid>
                        ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Zoom>

              {/* Team Members */}
              {/* <Zoom in={true} timeout={700}>
                <Card 
                  sx={{ 
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: isDesktop ? 'translateY(-4px)' : 'none',
                      boxShadow: isDesktop ? 6 : 3,
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="space-between"
                      flexWrap="wrap"
                      gap={2}
                      sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}
                    >
                      <Typography 
                        variant="h6" 
                        fontWeight="bold"
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: iconConfig.color,
                          fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                        }}
                      >
                        <People sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                        Team Members ({teamMembers.length})
                      </Typography>
                      
                      <AvatarGroup 
                        max={4} 
                        sx={{ 
                          '& .MuiAvatar-root': { 
                            width: { xs: 32, sm: 36, md: 40 },
                            height: { xs: 32, sm: 36, md: 40 },
                            border: `2px solid ${iconConfig.color}`,
                            fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                          } 
                        }}
                      >
                        {teamMembers.map((member) => (
                          <Tooltip key={member.id} title={member.name}>
                            <Avatar sx={{ bgcolor: member.avatarColor }}>
                              {member.avatar}
                            </Avatar>
                          </Tooltip>
                        ))}
                      </AvatarGroup>
                    </Box>

                    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                      {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} key={member.id}>
                          <Grow in={true} timeout={500 + index * 100}>
                            <Paper 
                              onMouseEnter={() => setHoveredCard(`team-${index}`)}
                              onMouseLeave={() => setHoveredCard(null)}
                              sx={{
                                p: { xs: 1.5, sm: 2, md: 2.5 },
                                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                                height: '100%',
                                transition: 'all 0.3s ease',
                                transform: hoveredCard === `team-${index}` && isDesktop ? 'translateY(-4px)' : 'none',
                                boxShadow: hoveredCard === `team-${index}` && isDesktop ? 6 : 2,
                                border: `1px solid ${member.avatarColor}20`,
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  height: '4px',
                                  background: member.avatarColor,
                                }
                              }}
                            >
                              <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <Badge
                                  color={member.status === 'online' ? 'success' : 'warning'}
                                  variant="dot"
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                  }}
                                >
                                  <Avatar 
                                    sx={{ 
                                      bgcolor: member.avatarColor,
                                      width: { xs: 40, sm: 45, md: 50, lg: 56 },
                                      height: { xs: 40, sm: 45, md: 50, lg: 56 },
                                      fontSize: { xs: 16, sm: 18, md: 20 },
                                      border: '2px solid white',
                                      boxShadow: `0 4px 12px ${member.avatarColor}40`,
                                    }}
                                  >
                                    {member.avatar}
                                  </Avatar>
                                </Badge>
                                <Box flex={1}>
                                  <Typography 
                                    variant="subtitle1" 
                                    fontWeight="bold" 
                                    sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" } }}
                                  >
                                    {member.name}
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" } }}
                                  >
                                    {member.role}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box mb={2}>
                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                  <Rating 
                                    value={member.rating} 
                                    precision={0.1} 
                                    readOnly 
                                    size={isMobile ? "small" : "medium"}
                                    sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}
                                  />
                                  <Typography 
                                    variant="caption" 
                                    fontWeight="medium"
                                    sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                                  >
                                    {member.rating}
                                  </Typography>
                                </Box>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                                >
                                  {member.projects} projects completed
                                </Typography>
                              </Box>

                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                  mb: 2,
                                  fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                                  wordBreak: 'break-all'
                                }}
                              >
                                {member.email}
                              </Typography>

                              <Typography 
                                variant="caption" 
                                gutterBottom 
                                sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                              >
                                Expertise:
                              </Typography>
                              <Stack 
                                direction="row" 
                                spacing={0.5} 
                                flexWrap="wrap" 
                                gap={0.5}
                                sx={{ mb: 2 }}
                              >
                                {member.expertise?.slice(0, 3).map((skill, idx) => (
                                  <Chip
                                    key={idx}
                                    label={skill}
                                    size="small"
                                    sx={{ 
                                      bgcolor: `${member.avatarColor}10`,
                                      color: member.avatarColor,
                                      fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
                                      height: { xs: 20, sm: 22, md: 24 },
                                    }}
                                  />
                                ))}
                                {member.expertise?.length > 3 && (
                                  <Chip
                                    label={`+${member.expertise.length - 3}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ 
                                      fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
                                      height: { xs: 20, sm: 22, md: 24 },
                                    }}
                                  />
                                )}
                              </Stack>

                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Button
                                  size="small"
                                  variant="outlined"
                                  startIcon={<ContactSupport sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
                                  sx={{ 
                                    borderColor: member.avatarColor,
                                    color: member.avatarColor,
                                    fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                                    height: { xs: 32, sm: 36, md: 40 },
                                    '&:hover': {
                                      borderColor: member.avatarColor,
                                      bgcolor: `${member.avatarColor}10`,
                                    }
                                  }}
                                >
                                  Contact
                                </Button>
                                
                                <Box display="flex" gap={0.5}>
                                  {member.social?.linkedin && (
                                    <IconButton 
                                      size="small"
                                      href={member.social.linkedin}
                                      target="_blank"
                                      sx={{ color: '#0077B5' }}
                                    >
                                      <LinkedIn sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                                    </IconButton>
                                  )}
                                  {member.social?.github && (
                                    <IconButton 
                                      size="small"
                                      href={member.social.github}
                                      target="_blank"
                                      sx={{ color: '#333' }}
                                    >
                                      <GitHub sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                                    </IconButton>
                                  )}
                                </Box>
                              </Box>
                            </Paper>
                          </Grow>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Zoom> */}

              {/* Partners */}
              {/* <Zoom in={true} timeout={900}>
                <Card 
                  sx={{ 
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: isDesktop ? 'translateY(-4px)' : 'none',
                      boxShadow: isDesktop ? 6 : 3,
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      fontWeight="bold"
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: iconConfig.color,
                        fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                        mb: { xs: 2, sm: 2.5, md: 3 }
                      }}
                    >
                      <Business sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                      Partners & Collaborators
                    </Typography>

                    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                      {partners.map((partner, index) => (
                        <Grid item xs={12} sm={6} key={partner.id}>
                          <Grow in={true} timeout={500 + index * 100}>
                            <Paper 
                              onMouseEnter={() => setHoveredCard(`partner-${index}`)}
                              onMouseLeave={() => setHoveredCard(null)}
                              sx={{
                                p: { xs: 1.5, sm: 2, md: 2.5 },
                                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                                height: '100%',
                                transition: 'all 0.3s ease',
                                transform: hoveredCard === `partner-${index}` && isDesktop ? 'translateY(-4px) scale(1.02)' : 'none',
                                boxShadow: hoveredCard === `partner-${index}` && isDesktop ? 6 : 2,
                                border: `2px solid ${partner.logoColor}20`,
                                cursor: 'pointer',
                              }}
                            >
                              <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: partner.logoColor,
                                    width: { xs: 45, sm: 50, md: 55, lg: 60 },
                                    height: { xs: 45, sm: 50, md: 55, lg: 60 },
                                    fontSize: { xs: 18, sm: 20, md: 22, lg: 24 },
                                    fontWeight: 'bold',
                                    boxShadow: `0 4px 12px ${partner.logoColor}40`,
                                  }}
                                >
                                  {partner.logo}
                                </Avatar>
                                <Box flex={1}>
                                  <Typography 
                                    variant="subtitle1" 
                                    fontWeight="bold" 
                                    sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" } }}
                                  >
                                    {partner.name}
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" } }}
                                  >
                                    {partner.type}
                                  </Typography>
                                </Box>
                              </Box>

                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                paragraph
                                sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" } }}
                              >
                                {partner.description}
                              </Typography>

                              <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <Chip
                                  label={partner.partnership}
                                  size="small"
                                  sx={{
                                    bgcolor: `${partner.logoColor}20`,
                                    color: partner.logoColor,
                                    fontWeight: 600,
                                    fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                                    height: { xs: 22, sm: 24, md: 26 },
                                  }}
                                />
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                                >
                                  Since {partner.since}
                                </Typography>
                              </Box>

                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                  <Typography 
                                    variant="caption" 
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                                  >
                                    Projects Completed
                                  </Typography>
                                  <Typography 
                                    variant="subtitle1" 
                                    fontWeight="bold" 
                                    color={partner.logoColor}
                                    sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" } }}
                                  >
                                    {partner.projects}+
                                  </Typography>
                                </Box>
                                <Box textAlign="right">
                                  <Typography 
                                    variant="caption" 
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                                  >
                                    Rating
                                  </Typography>
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <Rating 
                                      value={partner.rating} 
                                      precision={0.1} 
                                      readOnly 
                                      size="small"
                                      sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}
                                    />
                                    <Typography 
                                      variant="caption" 
                                      fontWeight="medium"
                                      sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                                    >
                                      {partner.rating}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>

                              <Button
                                fullWidth
                                variant="outlined"
                                size="small"
                                href={partner.website}
                                target="_blank"
                                sx={{ 
                                  mt: 2,
                                  borderColor: partner.logoColor,
                                  color: partner.logoColor,
                                  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                                  height: { xs: 32, sm: 36, md: 40 },
                                  '&:hover': {
                                    borderColor: partner.logoColor,
                                    bgcolor: `${partner.logoColor}10`,
                                  }
                                }}
                              >
                                Visit Website
                              </Button>
                            </Paper>
                          </Grow>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Zoom> */}
            </Stack>
          </Grid>

          {/* Right Column - Contact & Quick Info */}
          <Grid item xs={12} md={4}>
            <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {/* Contact Card */}
              <Zoom in={true} timeout={600}>
                <Card
                  sx={{
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: isDesktop ? "translateY(-4px)" : "none",
                      boxShadow: isDesktop ? 6 : 3,
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5, md: 3 },
                      background: iconConfig.gradient,
                      color: "white",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}
                    >
                      Contact Information
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ 
                        opacity: 0.9, 
                        fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" } 
                      }}
                    >
                      Get in touch with our service team
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                    <List disablePadding>
                      <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5, md: 2 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 36, sm: 38, md: 40 } }}>
                          <Avatar
                            sx={{
                              width: { xs: 28, sm: 30, md: 32 },
                              height: { xs: 28, sm: 30, md: 32 },
                              bgcolor: `${iconConfig.color}15`,
                              color: iconConfig.color,
                            }}
                          >
                            <Person sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                            >
                              Contact Person
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" } }}
                            >
                              {serviceData.contactPerson || "Excellence Allegiance Teams"}
                            </Typography>
                          }
                        />
                      </ListItem>

                      <Divider variant="inset" component="li" sx={{ ml: { xs: 6, sm: 6.5, md: 7 } }} />

                      <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5, md: 2 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 36, sm: 38, md: 40 } }}>
                          <Avatar
                            sx={{
                              width: { xs: 28, sm: 30, md: 32 },
                              height: { xs: 28, sm: 30, md: 32 },
                              bgcolor: `${iconConfig.color}15`,
                              color: iconConfig.color,
                            }}
                          >
                            <Email sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                            >
                              Email Address
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              sx={{
                                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                                wordBreak: "break-all",
                              }}
                            >
                              {serviceData.contactEmail || "contact@myeapl.com"}
                            </Typography>
                          }
                        />
                      </ListItem>

                      <Divider variant="inset" component="li" sx={{ ml: { xs: 6, sm: 6.5, md: 7 } }} />

                      <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5, md: 2 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 36, sm: 38, md: 40 } }}>
                          <Avatar
                            sx={{
                              width: { xs: 28, sm: 30, md: 32 },
                              height: { xs: 28, sm: 30, md: 32 },
                              bgcolor: `${iconConfig.color}15`,
                              color: iconConfig.color,
                            }}
                          >
                            <Phone sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                            >
                              Phone Number
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" } }}
                            >
                              {serviceData.contactPhone || "+91 6289534780"}
                            </Typography>
                          }
                        />
                      </ListItem>

                      <Divider variant="inset" component="li" sx={{ ml: { xs: 6, sm: 6.5, md: 7 } }} />

                      <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5, md: 2 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 36, sm: 38, md: 40 } }}>
                          <Avatar
                            sx={{
                              width: { xs: 28, sm: 30, md: 32 },
                              height: { xs: 28, sm: 30, md: 32 },
                              bgcolor: `${iconConfig.color}15`,
                              color: iconConfig.color,
                            }}
                          >
                            <LocationOn sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                            >
                              Location
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              sx={{ 
                                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                                lineHeight: 1.4 
                              }}
                            >
                              {serviceData.location ||
                                "1st floor, 1/16, Basanta Rd., Nitai Nagar, Mukundapur, Kolkata, West Bengal 700099"}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>

                    <Button
                      fullWidth
                      variant="contained"
                      size={isMobile ? "small" : "medium"}
                      startIcon={<WhatsApp sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />}
                      onClick={handleWhatsAppClick}
                      sx={{
                        mt: { xs: 2, sm: 2.5, md: 3 },
                        background: "#25D366",
                        "&:hover": {
                          background: "#128C7E",
                        },
                        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                        py: { xs: 1, sm: 1.2, md: 1.5 },
                        fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                      }}
                    >
                      Chat on WhatsApp
                    </Button>

                    {/* <Box
                      display="flex"
                      justifyContent="center"
                      gap={{ xs: 1.5, sm: 1.8, md: 2 }}
                      sx={{ mt: { xs: 2, sm: 2.5, md: 3 } }}
                    >
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          color: "#0077B5",
                          "&:hover": {
                            transform: isDesktop ? "scale(1.1)" : "none",
                          },
                        }}
                      >
                        <LinkedIn sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                      </IconButton>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          color: "#1DA1F2",
                          "&:hover": {
                            transform: isDesktop ? "scale(1.1)" : "none",
                          },
                        }}
                      >
                        <Twitter sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                      </IconButton>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          color: "#4267B2",
                          "&:hover": {
                            transform: isDesktop ? "scale(1.1)" : "none",
                          },
                        }}
                      >
                        <Facebook sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                      </IconButton>
                    </Box> */}
                  </CardContent>
                </Card>
              </Zoom>

              {/* Service Timeline */}
              {/* <Zoom in={true} timeout={700}>
                <Card
                  sx={{
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: isDesktop ? "translateY(-4px)" : "none",
                      boxShadow: isDesktop ? 6 : 3,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: iconConfig.color,
                        fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                        mb: { xs: 2, sm: 2.2, md: 2.5 },
                      }}
                    >
                      <Schedule sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                      Service Timeline
                    </Typography>

                    <Stack spacing={{ xs: 2, sm: 2.2, md: 2.5 }}>
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          gutterBottom
                          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                        >
                          Project Duration
                        </Typography>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          color={iconConfig.color}
                          sx={{ fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" } }}
                        >
                          {serviceData.duration || "Custom"}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          gutterBottom
                          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                        >
                          Current Progress
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box flex={1}>
                            <LinearProgress
                              variant="determinate"
                              value={serviceData.progress || 75}
                              sx={{
                                height: { xs: 6, sm: 8, md: 10 },
                                borderRadius: 5,
                                bgcolor: `${iconConfig.color}20`,
                                "& .MuiLinearProgress-bar": {
                                  bgcolor: iconConfig.color,
                                },
                              }}
                            />
                          </Box>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}
                          >
                            {serviceData.progress || 75}%
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          gutterBottom
                          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                        >
                          Timeline Breakdown
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Paper
                              sx={{
                                p: { xs: 1, sm: 1.2, md: 1.5 },
                                textAlign: "center",
                                bgcolor: `${iconConfig.color}08`,
                                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                              >
                                Start Date
                              </Typography>
                              <Typography
                                variant="body2"
                                fontWeight="medium"
                                sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" } }}
                              >
                                {serviceData.startDate || "Q1 2024"}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper
                              sx={{
                                p: { xs: 1, sm: 1.2, md: 1.5 },
                                textAlign: "center",
                                bgcolor: `${iconConfig.color}08`,
                                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                              >
                                End Date
                              </Typography>
                              <Typography
                                variant="body2"
                                fontWeight="medium"
                                sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" } }}
                              >
                                {serviceData.endDate || "Q4 2024"}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          gutterBottom
                          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                        >
                          Milestones
                        </Typography>
                        <Stack spacing={1}>
                          {[
                            "Planning",
                            "Development",
                            "Testing",
                            "Deployment",
                          ].map((milestone, index) => (
                            <Box
                              key={milestone}
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box display="flex" alignItems="center" gap={1}>
                                <CheckCircle
                                  sx={{
                                    fontSize: { xs: 16, sm: 18, md: 20 },
                                    color:
                                      index < 2
                                        ? "success.main"
                                        : "text.disabled",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" } }}
                                >
                                  {milestone}
                                </Typography>
                              </Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                              >
                                {index < 2 ? "Completed" : "Pending"}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Zoom> */}

              {/* Quick Actions */}
              {/* <Zoom in={true} timeout={800}>
                <Card
                  sx={{
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: isDesktop ? "translateY(-4px)" : "none",
                      boxShadow: isDesktop ? 6 : 3,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: iconConfig.color,
                        fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                        mb: { xs: 2, sm: 2.2, md: 2.5 },
                      }}
                    >
                      <Verified sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
                      Quick Actions
                    </Typography>

                    <Stack spacing={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        size={isMobile ? "small" : "medium"}
                        startIcon={
                          <AttachMoney
                            sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }}
                          />
                        }
                        sx={{
                          background: iconConfig.gradient,
                          borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                          py: { xs: 1, sm: 1.2, md: 1.5 },
                          fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                        }}
                      >
                        Request Quote
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        startIcon={
                          <ContactSupport
                            sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }}
                          />
                        }
                        sx={{
                          borderColor: iconConfig.color,
                          color: iconConfig.color,
                          borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                          py: { xs: 1, sm: 1.2, md: 1.5 },
                          fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                          "&:hover": {
                            borderColor: iconConfig.color,
                            bgcolor: `${iconConfig.color}10`,
                          },
                        }}
                      >
                        Schedule Consultation
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        startIcon={
                          <Dashboard sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
                        }
                        sx={{
                          borderColor: iconConfig.color,
                          color: iconConfig.color,
                          borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                          py: { xs: 1, sm: 1.2, md: 1.5 },
                          fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                          "&:hover": {
                            borderColor: iconConfig.color,
                            bgcolor: `${iconConfig.color}10`,
                          },
                        }}
                      >
                        View Case Studies
                      </Button>

                      <Divider sx={{ my: { xs: 1.5, sm: 1.8, md: 2 } }} />

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          gutterBottom
                          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}
                        >
                          Need Help?
                        </Typography>
                        <Button
                          fullWidth
                          variant="text"
                          size="small"
                          startIcon={
                            <Support sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                          }
                          sx={{
                            color: iconConfig.color,
                            fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                          }}
                        >
                          Visit Support Center
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Zoom> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default ServiceDetails;