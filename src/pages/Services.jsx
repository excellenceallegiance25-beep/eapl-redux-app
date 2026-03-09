import {
  Analytics,
  ArrowForward,
  CheckCircle,
  Cloud,
  Code,
  KeyboardArrowDown,
  Rocket,
  Security,
  Smartphone,
  SupportAgent,
  ViewList,
  Storage,
  Computer,
  Language,
  Settings,
  Dns,
  Web,
  DataUsage,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
  Zoom,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { getApplicationServicesList } from "../services/AppConfigAction";

import chart_bg from "../assets/images/chart.jpg";
import codescreen_bg from "../assets/images/codescreen.jpg";
import computing_bg from "../assets/images/computing.jpg";
import earthconnection_bg from "../assets/images/earthconnection.jpg";
import meeting_bg from "../assets/images/meeting.jpg";
import mobileappscreen_bg from "../assets/images/mobileappscreen.jpg";
import motherboard_bg from "../assets/images/normalmotherboard.jpg";
import review_bg from "../assets/images/review.jpg";
import robotdoing_bg from "../assets/images/robotdoing.jpg";
import serverconnection_bg from "../assets/images/serverconnection.jpg";
import workinghuman_bg from "../assets/images/workinghuman.jpg";
import workingonlaptop_bg from "../assets/images/workingonlaptop.jpg";
import wrritingsomthingbg from "../assets/images/wrritingsomthingbg.avif";

const Services = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Responsive container maxWidth
  const containerMaxWidth = isMobile ? false : isTablet ? "lg" : "xl";

  // Responsive font sizes and spacing
  const responsive = {
    // Heading sizes
    h1: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem", lg: "3.5rem", xl: "4rem" },
    h2: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem", lg: "2.5rem", xl: "3rem" },
    h3: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem", lg: "2rem", xl: "2.2rem" },
    h4: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem", lg: "1.8rem", xl: "2rem" },
    h5: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem", xl: "1.5rem" },
    h6: { xs: "0.9rem", sm: "0.95rem", md: "1rem", lg: "1.1rem", xl: "1.2rem" },
    body1: {
      xs: "0.8rem",
      sm: "0.85rem",
      md: "0.9rem",
      lg: "1rem",
      xl: "1.1rem",
    },
    body2: {
      xs: "0.7rem",
      sm: "0.75rem",
      md: "0.8rem",
      lg: "0.875rem",
      xl: "0.95rem",
    },

    // Spacing
    spacing: {
      section: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
      container: { xs: 2, sm: 2.5, md: 3, lg: 4, xl: 5 },
      grid: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 4 },
    },

    // Card dimensions
    card: {
      width: { xs: "100%", sm: 280, md: 300, lg: 320, xl: 345 },
      height: { xs: 300, sm: 310, md: 320, lg: 340, xl: 360 },
      iconSize: { xs: 35, sm: 40, md: 45, lg: 48, xl: 50 },
    },
  };

  const [services, setServices] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadConfigs = async () => {
      const result = await dispatch(getApplicationServicesList());

      if (result.type === "APPCONFIG_INIT") {
        const processedServices = result.payload.map((service) => {
          let processedIcon = service.icon;

          if (
            service.icon &&
            !service.icon.startsWith("data:") &&
            !service.icon.startsWith("http") &&
            service.icon.length > 100
          ) {
            const base64Pattern = /^[A-Za-z0-9+/=]+$/;
            if (base64Pattern.test(service.icon)) {
              const iconType = service.iconType || "image/png";
              processedIcon = `data:${iconType};base64,${service.icon}`;
            }
          }

          return {
            ...service,
            icon: processedIcon,
            color: getServiceColor(service),
          };
        });

        setServices(
          processedServices.filter((service) => service.status === true),
        );
      }
    };
    loadConfigs();
  }, [dispatch]);

  const getServiceColor = (service) => {
    if (service.color && isValidColor(service.color)) {
      return service.color;
    }

    const category = service.category || service.title || "";

    const colorMap = {
      Cloud: "#2196F3",
      Development: "#673AB7",
      Security: "#F44336",
      Analytics: "#4CAF50",
      Mobile: "#FF9800",
      Transformation: "#9C27B0",
      IoT: "#00BCD4",
      Blockchain: "#FF5722",
      Testing: "#607D8B",
      Design: "#E91E63",
      Consulting: "#3F51B5",
      Software: "#673AB7",
      Digital: "#9C27B0",
      DevOps: "#795548",
      Quality: "#607D8B",
      "UI/UX": "#E91E63",
    };

    for (const [key, color] of Object.entries(colorMap)) {
      if (category.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }

    const defaultColors = [
      "#2196F3",
      "#673AB7",
      "#F44336",
      "#4CAF50",
      "#FF9800",
      "#9C27B0",
      "#00BCD4",
      "#FF5722",
      "#607D8B",
      "#E91E63",
      "#3F51B5",
      "#795548",
    ];

    if (service.title) {
      const hash = service.title
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return defaultColors[hash % defaultColors.length];
    }

    return "#1976d2";
  };

  const safeAlpha = (color, opacity) => {
    const safeColor = getSafeColor(color);
    return alpha(safeColor, opacity);
  };

  const isImageUrl = (str) => {
    if (!str) return false;
    if (str.startsWith("data:image/")) return true;
    if (str.startsWith("http://") || str.startsWith("https://")) return true;
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".svg",
      ".webp",
      ".bmp",
    ];
    return imageExtensions.some((ext) =>
      str.toLowerCase().includes(ext.toLowerCase()),
    );
  };

  const isValidColor = (color) => {
    if (!color) return false;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) return true;
    if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(color)) return true;
    if (
      /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0\.\d+)\)$/.test(
        color,
      )
    )
      return true;
    if (/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/.test(color))
      return true;
    if (
      /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0\.\d+)\)$/.test(
        color,
      )
    )
      return true;
    return false;
  };

  const getSafeColor = (color, defaultColor = "#1976d2") => {
    return isValidColor(color) ? color : defaultColor;
  };

  const headerImage = wrritingsomthingbg;
  // "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80";

  const serviceCategories = [
    { name: "All", icon: <ViewList />, color: "#2196F3" },
    { name: "Cloud", icon: <Cloud />, color: "#2196F3" },
    { name: "Development", icon: <Code />, color: "#673AB7" },
    { name: "Security", icon: <Security />, color: "#F44336" },
    { name: "Mobile", icon: <Smartphone />, color: "#FF9800" },
    { name: "Analytics", icon: <Analytics />, color: "#4CAF50" },
    { name: "Transformation", icon: <Rocket />, color: "#9C27B0" },
  ];

  const getServiceBackground = (serviceTitle) => {
    const backgrounds = {
      "Cloud Solutions": workinghuman_bg,
      "Software Development": codescreen_bg,
      Cybersecurity: motherboard_bg,
      "AI & Analytics": robotdoing_bg,
      "Mobile Development": mobileappscreen_bg,
      "Digital Transformation": workingonlaptop_bg,
      "IoT Solutions": earthconnection_bg,
      "Blockchain Services": computing_bg,
      "DevOps & CI/CD": serverconnection_bg,
      "Quality Assurance": review_bg,
      "UI/UX Design": chart_bg,
      "Consulting Services": meeting_bg,
    };
    return (
      backgrounds[serviceTitle] ||
      `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${motherboard_bg})`
    );
  };

  // Technologies data
  const technologies = {
    current: [
      { name: "React", icon: <Code />, color: "#61DAFB", category: "Frontend" },
      { name: "Node.js", icon: <Dns />, color: "#68A063", category: "Backend" },
      { name: "Python", icon: <Code />, color: "#3776AB", category: "Backend" },
      { name: "AWS", icon: <Cloud />, color: "#FF9900", category: "Cloud" },
      {
        name: "Docker",
        icon: <Storage />,
        color: "#2496ED",
        category: "DevOps",
      },
      {
        name: "MongoDB",
        icon: <DataUsage />,
        color: "#47A248",
        category: "Database",
      },
      {
        name: "TypeScript",
        icon: <Code />,
        color: "#3178C6",
        category: "Frontend",
      },
      {
        name: "GraphQL",
        icon: <DataUsage />,
        color: "#E10098",
        category: "API",
      },
    ],
    previous: [
      {
        name: "Angular",
        icon: <Web />,
        color: "#DD0031",
        category: "Frontend",
      },
      { name: "Java", icon: <Code />, color: "#007396", category: "Backend" },
      { name: "PHP", icon: <Code />, color: "#777BB4", category: "Backend" },
      {
        name: "MySQL",
        icon: <Storage />,
        color: "#4479A1",
        category: "Database",
      },
      {
        name: "Redis",
        icon: <DataUsage />,
        color: "#DC382D",
        category: "Database",
      },
      {
        name: "Kubernetes",
        icon: <Settings />,
        color: "#326CE5",
        category: "DevOps",
      },
      { name: "Vue.js", icon: <Web />, color: "#4FC08D", category: "Frontend" },
      {
        name: "Firebase",
        icon: <Cloud />,
        color: "#FFCA28",
        category: "Backend",
      },
    ],
  };

  const servicePackages = [
    {
      id: "starter",
      name: "Starter",
      price: "$2,999",
      period: "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 5 Users",
        "Basic Support",
        "10GB Storage",
        "Standard Security",
        "Monthly Reports",
      ],
      recommended: false,
      color: "#4CAF50",
    },
    {
      id: "professional",
      name: "Professional",
      price: "$5,999",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 20 Users",
        "Priority Support",
        "100GB Storage",
        "Advanced Security",
        "API Access",
        "Weekly Reports",
      ],
      recommended: true,
      color: "#2196F3",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$12,999",
      period: "/month",
      description: "Complete solution for large organizations",
      features: [
        "Unlimited Users",
        "24/7 Support",
        "1TB Storage",
        "Enterprise Security",
        "Custom Solutions",
        "Dedicated Manager",
      ],
      recommended: false,
      color: "#9C27B0",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Discovery",
      description: "Understand your requirements and business goals",
      icon: <SupportAgent />,
      color: "#2196F3",
    },
    {
      step: "2",
      title: "Planning",
      description: "Create detailed project roadmap and architecture",
      icon: <Analytics />,
      color: "#673AB7",
    },
    {
      step: "3",
      title: "Development",
      description: "Build, test, and iterate on the solution",
      icon: <Code />,
      color: "#4CAF50",
    },
    {
      step: "4",
      title: "Deployment",
      description: "Launch and monitor the implementation",
      icon: <Cloud />,
      color: "#FF9800",
    },
    {
      step: "5",
      title: "Support",
      description: "Ongoing maintenance and optimization",
      icon: <CheckCircle />,
      color: "#9C27B0",
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setViewAll(newValue === 0);
  };

  const filteredServices =
    viewAll || tabValue === 0
      ? services
      : services.filter(
          (service) => service.category === serviceCategories[tabValue].name,
        );

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Enhanced Header with Parallax - Fully Responsive */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, sm: 350, md: 400, lg: 450, xl: 500 },
          background: `linear-gradient(135deg, rgba(26, 24, 24, 0.95) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.95) 100%), url(${headerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { md: "fixed" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 30%, rgba(233, 14, 14, 0.2) 0%, transparent 50%)",
            animation: isDesktop ? "pulse 2s ease-in-out infinite" : "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 80% 70%, rgba(70, 23, 179, 0.2) 0%, transparent 50%)",
            animation: isDesktop
              ? "pulse 2s ease-in-out infinite reverse"
              : "none",
          },
        }}
      >
        <Container
          maxWidth={containerMaxWidth}
          sx={{
            position: "relative",
            zIndex: 3,
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Fade in timeout={1000}>
            <Box
              sx={{
                maxWidth: { xs: "100%", md: "90%", lg: "85%" },
                mx: "auto",
              }}
            >
              <Zoom in timeout={800}>
                <Chip
                  label={
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Box
                        component="span"
                        sx={{
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        }}
                      >
                        ✨
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: {
                            xs: "0.6rem",
                            sm: "0.65rem",
                            md: "0.7rem",
                            lg: "0.75rem",
                          },
                          fontWeight: 600,
                          letterSpacing: 1,
                        }}
                      >
                        INNOVATION DRIVEN
                      </Typography>
                      <Box
                        component="span"
                        sx={{
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        }}
                      >
                        ✨
                      </Box>
                    </Box>
                  }
                  sx={{
                    mb: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                    height: { xs: 24, sm: 26, md: 28, lg: 32 },
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                      transform: isDesktop ? "scale(1.05)" : "none",
                    },
                    transition: "all 0.3s",
                  }}
                />
              </Zoom>

              <Typography
                variant="h1"
                sx={{
                  fontSize: responsive.h1,
                  fontWeight: 900,
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                  mb: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                  textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                  animation: "fadeInUp 2s ease-out",
                  background:
                    "linear-gradient(135deg, #edf2f3 50%, #033835 50%, #f0f6fd 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 200%",
                  animation:
                    "gradientShift 5s ease infinite, fadeInUp 1s ease-out",
                }}
              >
                Transform Your Business
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: responsive.h5,
                  mb: { xs: 3, sm: 4, md: 5, lg: 6 },
                  fontWeight: 300,
                  maxWidth: { xs: "100%", sm: 500, md: 600, lg: 700, xl: 800 },
                  mx: "auto",
                  opacity: 0.95,
                  animation: "fadeInUp 1s ease-out 0.3s both",
                  textShadow: "0 2px 15px rgba(0,0,0,0.4)",
                  lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                  px: { xs: 2, sm: 0 },
                }}
              >
                Comprehensive technology solutions tailored for modern
                businesses
              </Typography>
            </Box>
          </Fade>
        </Container>

        <IconButton
          sx={{
            position: "absolute",
            bottom: { xs: 8, sm: 10, md: 15, lg: 20 },
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            animation: "bounce 2s infinite",
            opacity: { xs: 0.8, sm: 1 },
            display: { xs: "none", sm: "flex" },
            "&:hover": {
              background: "rgba(255,255,255,0.1)",
            },
          }}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <KeyboardArrowDown
            sx={{ fontSize: { xs: 20, sm: 24, md: 28, lg: 32 } }}
          />
        </IconButton>
      </Box>

      <Box
        sx={{
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
            "25%": { transform: "translateY(-20px) translateX(10px)" },
            "50%": { transform: "translateY(10px) translateX(-10px)" },
            "75%": { transform: "translateY(-10px) translateX(20px)" },
          },
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": {
              transform: "translateY(0) translateX(-50%)",
            },
            "40%": { transform: "translateY(-20px) translateX(-50%)" },
            "60%": { transform: "translateY(-10px) translateX(-50%)" },
          },
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(30px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          "@keyframes gradientShift": {
            "0%, 100%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
          },
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.2, transform: "scale(1)" },
            "50%": { opacity: 0.3, transform: "scale(1.1)" },
          },
          "@keyframes shimmer": {
            "0%": { backgroundPosition: "-200% 0" },
            "100%": { backgroundPosition: "200% 0" },
          },
        }}
      />

      <Container
        maxWidth={containerMaxWidth}
        sx={{
          py: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
        }}
      >
        {/* Service Tabs Section */}
        <Box sx={{ mb: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 } }}>
          <Paper
            sx={{
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                bgcolor: "background.paper",
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  minHeight: { xs: 48, sm: 56, md: 64 },
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  px: { xs: 1, sm: 1.5, md: 2 },
                  "&.Mui-selected": {
                    color: serviceCategories[tabValue]?.color || "primary.main",
                  },
                },
                "& .MuiTabs-scrollButtons": {
                  width: { xs: 28, sm: 32, md: 36 },
                  "&.Mui-disabled": {
                    opacity: 0.3,
                  },
                },
              }}
            >
              {serviceCategories.map((category, index) => (
                <Tab
                  key={index}
                  icon={React.cloneElement(category.icon, {
                    sx: {
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                    },
                  })}
                  label={category.name}
                  sx={{
                    transition: "all 0.3s",
                    "&:hover": {
                      color: category.color,
                      bgcolor: safeAlpha(category.color, 0.05),
                    },
                  }}
                />
              ))}
            </Tabs>

            <Box sx={{ p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 } }}>
              {tabValue > 0 && !viewAll && (
                <Box sx={{ mb: { xs: 3, sm: 4, md: 5 }, textAlign: "center" }}>
                  <Box
                    sx={{
                      width: { xs: 50, sm: 60, md: 70, lg: 80 },
                      height: { xs: 50, sm: 60, md: 70, lg: 80 },
                      borderRadius: "50%",
                      bgcolor: safeAlpha(
                        serviceCategories[tabValue].color,
                        0.1,
                      ),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: { xs: 1.5, sm: 2, md: 2.5 },
                    }}
                  >
                    {React.cloneElement(serviceCategories[tabValue].icon, {
                      sx: {
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.8rem",
                          md: "2rem",
                          lg: "2.2rem",
                        },
                      },
                    })}
                  </Box>
                  <Typography
                    variant="h3"
                    gutterBottom
                    fontWeight="bold"
                    sx={{ fontSize: responsive.h3 }}
                  >
                    {serviceCategories[tabValue].name} Services
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    paragraph
                    sx={{
                      fontSize: responsive.h6,
                      maxWidth: { xs: "100%", sm: 500, md: 600, lg: 700 },
                      mx: "auto",
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    Transform your business with our specialized{" "}
                    {serviceCategories[tabValue].name.toLowerCase()} solutions
                  </Typography>
                </Box>
              )}

              {/* Services Grid */}
              <Grid
                container
                spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }}
                justifyContent="center"
              >
                {filteredServices.map((service, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={3}
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      sx={{
                        width: "100%",
                        maxWidth: responsive.card.width,
                        height: responsive.card.height,
                        position: "relative",
                        overflow: "hidden",
                        border: "none",
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                        background: `linear-gradient(45deg, rgba(0, 0, 0, 0.95) 0%,rgba(0, 0, 0, 0.7) 50%,rgba(0, 0, 0, 0.4) 100%),url(${getServiceBackground(service.title)})`,
                        backgroundSize: "cover, cover",
                        backgroundPosition: "center, center",
                        backgroundRepeat: "no-repeat",
                        transition: isDesktop
                          ? "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                          : "none",
                        cursor: "pointer",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(45deg, ${safeAlpha(service.color, 0)} 0%,${safeAlpha(service.color, 0.1)} 50%,${safeAlpha(service.color, 0.3)} 100%)`,
                          opacity: 0,
                          transition: "opacity 0.5s ease",
                          zIndex: 1,
                        },
                        "&:hover": isDesktop
                          ? {
                              transform: "translateY(-8px) scale(1.02)",
                              boxShadow: `0 20px 40px -12px ${safeAlpha(service.color, 0.4)}`,
                              "&:before": {
                                opacity: 1,
                              },
                              "& .service-overlay": {
                                opacity: 1,
                              },
                              "& .service-title": {
                                transform: "translateY(-2px)",
                              },
                            }
                          : {},
                        ...(isImageUrl(service.icon) && {
                          background: `linear-gradient(45deg, rgba(0, 0, 0, 0.9) 0%,rgba(0, 0, 0, 0.6) 50%,rgba(0, 0, 0, 0.3) 100%),url('${service.icon}')`,
                        }),
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(45deg, 
              transparent 40%, 
              ${safeAlpha(service.color, 0.1)} 50%, 
              transparent 60%)`,
                          backgroundSize: "300% 300%",
                          animation: isDesktop
                            ? "shimmer 3s infinite linear"
                            : "none",
                          borderRadius: "inherit",
                          opacity: 0,
                          transition: "opacity 0.5s ease",
                          pointerEvents: "none",
                        }}
                        className="service-overlay"
                      />

                      <CardContent
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          color: "white",
                          p: { xs: 1.5, sm: 2, md: 2.5 },
                        }}
                      >
                        <Box
                          sx={{
                            mb: { xs: 1, sm: 1.5, md: 2 },
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            className="service-title"
                            variant="h5"
                            fontWeight="800"
                            gutterBottom
                            sx={{
                              fontSize: {
                                xs: "1rem",
                                sm: "1.1rem",
                                md: "1.2rem",
                              },
                              background: `linear-gradient(45deg, 
                  #fff 30%, 
                  ${safeAlpha(service.color, 0.9)} 70%
                )`,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                              transition: "all 0.3s ease",
                              letterSpacing: "-0.5px",
                            }}
                          >
                            {service.title}
                          </Typography>

                          <Chip
                            label={service.category}
                            size="small"
                            sx={{
                              bgcolor: safeAlpha(service.color, 0.2),
                              color: "white",
                              backdropFilter: "blur(20px)",
                              fontWeight: 600,
                              border: `1px solid ${safeAlpha("#fff", 0.3)}`,
                              boxShadow: `0 4px 12px ${safeAlpha(service.color, 0.2)}`,
                              transition: "all 0.3s ease",
                              fontSize: {
                                xs: "0.6rem",
                                sm: "0.65rem",
                                md: "0.7rem",
                              },
                              height: { xs: 18, sm: 20, md: 22 },
                              "&:hover": {
                                bgcolor: safeAlpha(service.color, 0.3),
                                transform: isDesktop
                                  ? "translateY(-2px)"
                                  : "none",
                              },
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            flex: 1,
                            opacity: 0.95,
                            lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                            mb: { xs: 1.5, sm: 2, md: 2.5 },
                            textAlign: "center",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.75rem",
                              md: "0.8rem",
                            },
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            position: "relative",
                            "&:after": {
                              content: '""',
                              position: "absolute",
                              bottom: -6,
                              left: "25%",
                              width: "50%",
                              height: 2,
                              background: `linear-gradient(90deg, 
                  transparent, 
                  ${safeAlpha(service.color, 0.5)}, 
                  transparent
                )`,
                              opacity: 0.6,
                            },
                          }}
                        >
                          {service.description}
                        </Typography>

                        <Box
                          className="service-features"
                          sx={{
                            mb: { xs: 1.5, sm: 2, md: 2.5 },
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: { xs: 0.3, sm: 0.5, md: 0.8 },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {service.features
                            .split(",")
                            .slice(0, 3)
                            .map((feature, idx) => (
                              <Chip
                                key={idx}
                                label={feature.trim()}
                                size="small"
                                sx={{
                                  bgcolor: safeAlpha("#fff", 0.05),
                                  color: "white",
                                  border: `1px solid ${safeAlpha("#fff", 0.15)}`,
                                  fontSize: {
                                    xs: "0.55rem",
                                    sm: "0.6rem",
                                    md: "0.65rem",
                                  },
                                  fontWeight: 500,
                                  backdropFilter: "blur(10px)",
                                  transition: "all 0.3s ease",
                                  height: { xs: 18, sm: 20, md: 22 },
                                  "&:hover": {
                                    bgcolor: safeAlpha(service.color, 0.3),
                                    borderColor: safeAlpha(service.color, 0.6),
                                    transform: isDesktop
                                      ? "translateY(-2px)"
                                      : "none",
                                    boxShadow: `0 4px 8px ${safeAlpha(service.color, 0.2)}`,
                                  },
                                }}
                              />
                            ))}
                          {service.features.split(",").length > 3 && (
                            <Chip
                              label={`+${service.features.split(",").length - 3}`}
                              size="small"
                              sx={{
                                bgcolor: safeAlpha("#000", 0.4),
                                color: safeAlpha("#fff", 0.7),
                                fontSize: {
                                  xs: "0.5rem",
                                  sm: "0.55rem",
                                  md: "0.6rem",
                                },
                                height: { xs: 18, sm: 20, md: 22 },
                              }}
                            />
                          )}
                        </Box>

                        <Button
                          fullWidth
                          component={RouterLink}
                          to={`/services/${service.id}`}
                          variant="contained"
                          size="small"
                          endIcon={<ArrowForward />}
                          sx={{
                            background: `linear-gradient(135deg, 
      ${safeAlpha(service.color, 0.9)} 0%, 
      ${safeAlpha((service.color, 15), 0.9)} 100%
    )`,
                            border: "none",
                            color: "white",
                            fontWeight: 600,
                            py: { xs: 0.8, sm: 1, md: 1.2 },
                            px: { xs: 1.5, sm: 2 },
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.75rem",
                              md: "0.8rem",
                            },
                            letterSpacing: "0.3px",
                            boxShadow: `0 6px 16px ${safeAlpha(service.color, 0.25)}`,
                            transition: "all 0.3s ease",
                            position: "relative",
                            overflow: "hidden",

                            "&:hover": isDesktop
                              ? {
                                  transform: "translateY(-2px)",
                                  boxShadow: `0 12px 24px ${safeAlpha(service.color, 0.35)}`,
                                  background: `linear-gradient(135deg, 
        ${safeAlpha((service.color, 5), 0.95)} 0%, 
        ${safeAlpha(service.color, 0.95)} 100%
      )`,
                                  "& .button-shine": {
                                    transform: "translateX(100%)",
                                  },
                                }
                              : {},

                            "&:active": {
                              transform: "translateY(0)",
                              boxShadow: `0 4px 12px ${safeAlpha(service.color, 0.2)}`,
                            },
                          }}
                        >
                          <Box
                            className="button-shine"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: "-100%",
                              width: "50%",
                              height: "100%",
                              background: `linear-gradient(90deg, 
        transparent, 
        ${safeAlpha("#fff", 0.15)}, 
        transparent
      )`,
                              transition: "transform 0.6s ease",
                              display: isDesktop ? "block" : "none",
                            }}
                          />

                          <Box sx={{ position: "relative", zIndex: 1 }}>
                            Explore
                          </Box>
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Box>

        {/* NEW SECTION: Technologies We Work With */}
        <Box sx={{ mb: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 } }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{ fontSize: responsive.h2, color: "#1a237e" }}
          >
            Technologies We Work With
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: responsive.h6,
              mb: { xs: 2.5, sm: 3, md: 4 },
              maxWidth: { xs: "100%", sm: 500, md: 600, lg: 700 },
              mx: "auto",
              px: { xs: 2, sm: 3, md: 0 },
            }}
          >
            Leveraging cutting-edge tools and frameworks to build robust
            solutions
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent={"center"}
          >
            {/* Current Technologies */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  height: "100%",
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                  //  background: `linear-gradient(231deg, #b6e6f1 , #f5f8f8 60%)`,
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": isDesktop
                    ? {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      }
                    : {},
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: { xs: 60, sm: 80, md: 100 },
                    height: { xs: 60, sm: 80, md: 100 },
                    background:
                      "radial-gradient(circle at top right, rgba(4, 174, 241, 0.32), transparent 70%)",
                    borderRadius: "50%",
                  }}
                />

                <Typography
                  variant="h4"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    fontSize: {
                      xs: "1.1rem",
                      sm: "1.3rem",
                      md: "1.5rem",
                      lg: "1.8rem",
                    },
                    color: "#2196F3",
                    mb: { xs: 1.5, sm: 2, md: 2.5 },
                    position: "relative",
                    display: "inline-block",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: { xs: 30, sm: 40, md: 50 },
                      height: 2,
                      background: "#2196F3",
                      borderRadius: 2,
                    },
                  }}
                >
                  Current Stack
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{
                    fontSize: responsive.body1,
                    mb: { xs: 1.5, sm: 2, md: 2.5 },
                  }}
                >
                  Technologies we're actively using and mastering
                </Typography>

                <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  {technologies.current.map((tech, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Box
                        sx={{
                          p: { xs: 0.8, sm: 1, md: 1.2 },
                          borderRadius: { xs: 1, sm: 1.5, md: 2 },
                          background: safeAlpha(tech.color, 0.05),
                          border: `1px solid ${safeAlpha(tech.color, 0.2)}`,
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            transform: isDesktop
                              ? "translateY(-4px) scale(1.02)"
                              : "none",
                            background: safeAlpha(tech.color, 0.1),
                            borderColor: tech.color,
                            boxShadow: `0 6px 12px ${safeAlpha(tech.color, 0.15)}`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 28, sm: 32, md: 36 },
                              height: { xs: 28, sm: 32, md: 36 },
                              borderRadius: "50%",
                              background: safeAlpha(tech.color, 0.15),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mb: 0.5,
                              color: tech.color,
                            }}
                          >
                            {React.cloneElement(tech.icon, {
                              sx: {
                                fontSize: {
                                  xs: "1rem",
                                  sm: "1.2rem",
                                  md: "1.3rem",
                                },
                              },
                            })}
                          </Box>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            sx={{
                              fontSize: {
                                xs: "0.6rem",
                                sm: "0.65rem",
                                md: "0.7rem",
                              },
                              mb: 0.3,
                            }}
                          >
                            {tech.name}
                          </Typography>
                          <Chip
                            label={tech.category}
                            size="small"
                            sx={{
                              height: { xs: 14, sm: 16, md: 18 },
                              fontSize: {
                                xs: "0.45rem",
                                sm: "0.5rem",
                                md: "0.55rem",
                              },
                              background: safeAlpha(tech.color, 0.1),
                              color: tech.color,
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Previous Technologies */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  height: "100%",
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": isDesktop
                    ? {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      }
                    : {},
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: { xs: 60, sm: 80, md: 100 },
                    height: { xs: 60, sm: 80, md: 100 },
                    background:
                      "radial-gradient(circle at top right, rgba(155, 39, 176, 0.3), transparent 70%)",
                    borderRadius: "50%",
                  }}
                />

                <Typography
                  variant="h4"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    fontSize: {
                      xs: "1.1rem",
                      sm: "1.3rem",
                      md: "1.5rem",
                      lg: "1.8rem",
                    },
                    color: "#9C27B0",
                    mb: { xs: 1.5, sm: 2, md: 2.5 },
                    position: "relative",
                    display: "inline-block",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: { xs: 30, sm: 40, md: 50 },
                      height: 2,
                      background: "#9C27B0",
                      borderRadius: 2,
                    },
                  }}
                >
                  Previous Experience
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{
                    fontSize: responsive.body1,
                    mb: { xs: 1.5, sm: 2, md: 2.5 },
                  }}
                >
                  Technologies we've successfully delivered projects with
                </Typography>

                <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  {technologies.previous.map((tech, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Box
                        sx={{
                          p: { xs: 0.8, sm: 1, md: 1.2 },
                          borderRadius: { xs: 1, sm: 1.5, md: 2 },
                          background: safeAlpha(tech.color, 0.05),
                          border: `1px solid ${safeAlpha(tech.color, 0.2)}`,
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          opacity: 0.9,
                          "&:hover": {
                            transform: isDesktop
                              ? "translateY(-4px) scale(1.02)"
                              : "none",
                            background: safeAlpha(tech.color, 0.1),
                            borderColor: tech.color,
                            boxShadow: `0 6px 12px ${safeAlpha(tech.color, 0.15)}`,
                            opacity: 1,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 28, sm: 32, md: 36 },
                              height: { xs: 28, sm: 32, md: 36 },
                              borderRadius: "50%",
                              background: safeAlpha(tech.color, 0.15),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mb: 0.5,
                              color: tech.color,
                            }}
                          >
                            {React.cloneElement(tech.icon, {
                              sx: {
                                fontSize: {
                                  xs: "1rem",
                                  sm: "1.2rem",
                                  md: "1.3rem",
                                },
                              },
                            })}
                          </Box>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            sx={{
                              fontSize: {
                                xs: "0.6rem",
                                sm: "0.65rem",
                                md: "0.7rem",
                              },
                              mb: 0.3,
                            }}
                          >
                            {tech.name}
                          </Typography>
                          <Chip
                            label={tech.category}
                            size="small"
                            sx={{
                              height: { xs: 14, sm: 16, md: 18 },
                              fontSize: {
                                xs: "0.45rem",
                                sm: "0.5rem",
                                md: "0.55rem",
                              },
                              background: safeAlpha(tech.color, 0.1),
                              color: tech.color,
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          {/* Stats Section */}
          <Box
            sx={{
              mt: { xs: 3, sm: 4, md: 5 },
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
            }}
          >
            {[
              {
                label: "Technologies Mastered",
                value: "50+",
                color: "#2196F3",
              },
              { label: "Successful Projects", value: "200+", color: "#4CAF50" },
              { label: "Expert Developers", value: "25+", color: "#FF9800" },
            ].map((stat, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: { xs: 1.5, sm: 2, md: 2.5 },
                  textAlign: "center",
                  minWidth: { xs: 100, sm: 120, md: 140, lg: 160 },
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  background: `linear-gradient(135deg, ${safeAlpha(stat.color, 0.05)} 0%, ${safeAlpha(stat.color, 0.1)} 100%)`,
                  border: `1px solid ${safeAlpha(stat.color, 0.2)}`,
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.5rem",
                      md: "1.8rem",
                      lg: "2rem",
                    },
                    color: stat.color,
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: "0.65rem",
                      sm: "0.7rem",
                      md: "0.75rem",
                      lg: "0.8rem",
                    },
                  }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Service Packages Section */}
        <Box sx={{ mb: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 } }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{ fontSize: responsive.h2, color: "#1a237e" }}
          >
            Choose Your Plan
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: responsive.h6,
              mb: { xs: 2.5, sm: 3, md: 3.5 },
              px: { xs: 2, sm: 3, md: 0 },
            }}
          >
            Flexible pricing designed to scale with your business
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
          >
            {servicePackages.map((pkg, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    position: "relative",
                    border: pkg.recommended ? `2px solid ${pkg.color}` : "none",
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    overflow: "hidden",
                    transition: "all 0.3s",
                    "&:hover": isDesktop
                      ? {
                          transform: "translateY(-6px)",
                          boxShadow: `0 15px 30px ${safeAlpha(pkg.color, 0.2)}`,
                        }
                      : {},
                  }}
                >
                  {pkg.recommended && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        bgcolor: pkg.color,
                      }}
                    />
                  )}

                  {pkg.recommended && (
                    <Chip
                      label="Most Popular"
                      sx={{
                        position: "absolute",
                        top: { xs: 10, sm: 12, md: 14 },
                        right: { xs: 10, sm: 12, md: 14 },
                        bgcolor: pkg.color,
                        color: "white",
                        fontWeight: "bold",
                        fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                        height: { xs: 22, sm: 24, md: 26 },
                      }}
                    />
                  )}

                  <CardContent
                    sx={{
                      textAlign: "center",
                      pt: pkg.recommended
                        ? { xs: 5, sm: 6, md: 7 }
                        : { xs: 3, sm: 4, md: 5 },
                      px: { xs: 1.5, sm: 2, md: 2.5 },
                      pb: { xs: 2, sm: 2.5, md: 3 },
                    }}
                  >
                    <Typography
                      variant="h4"
                      gutterBottom
                      fontWeight="bold"
                      color={pkg.color}
                      sx={{
                        fontSize: {
                          xs: "1.2rem",
                          sm: "1.3rem",
                          md: "1.5rem",
                          lg: "1.8rem",
                        },
                      }}
                    >
                      {pkg.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                      sx={{ fontSize: responsive.body1 }}
                    >
                      {pkg.description}
                    </Typography>

                    <Box sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }}>
                      <Typography
                        variant="h2"
                        component="span"
                        fontWeight="bold"
                        sx={{
                          fontSize: {
                            xs: "1.5rem",
                            sm: "1.8rem",
                            md: "2rem",
                            lg: "2.5rem",
                          },
                        }}
                      >
                        {pkg.price}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="span"
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "1rem",
                            lg: "1.2rem",
                          },
                        }}
                      >
                        {pkg.period}
                      </Typography>
                    </Box>

                    <List sx={{ mb: { xs: 1.5, sm: 2, md: 2.5 } }}>
                      {pkg.features.map((feature, idx) => (
                        <ListItem
                          key={idx}
                          sx={{ py: { xs: 0.3, sm: 0.5, md: 0.8 } }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: { xs: 28, sm: 32, md: 36 },
                              justifyContent: "center",
                            }}
                          >
                            <CheckCircle
                              color="primary"
                              sx={{
                                fontSize: {
                                  xs: "0.9rem",
                                  sm: "1rem",
                                  md: "1.1rem",
                                },
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              variant: "body1",
                              sx: {
                                fontSize: {
                                  xs: "0.7rem",
                                  sm: "0.75rem",
                                  md: "0.8rem",
                                },
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      fullWidth
                      component={RouterLink}
                      to={`/services/${pkg.id}`}
                      variant={pkg.recommended ? "contained" : "outlined"}
                      size="medium"
                      sx={{
                        bgcolor: pkg.recommended ? pkg.color : "transparent",
                        borderColor: pkg.color,
                        color: pkg.recommended ? "white" : pkg.color,
                        "&:hover": {
                          bgcolor: pkg.recommended
                            ? safeAlpha(pkg.color, 0.9)
                            : safeAlpha(pkg.color, 0.05),
                        },
                        fontWeight: "bold",
                        py: { xs: 0.8, sm: 1, md: 1.2 },
                        px: { xs: 1.5, sm: 2 },
                        borderRadius: { xs: 1.5, sm: 2 },
                        fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Process Section */}
        <Box sx={{ mb: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 } }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{ fontSize: responsive.h2, color: "#1a237e" }}
          >
            How We Work
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: responsive.h5,
              mb: { xs: 2.5, sm: 3, md: 3.5 },
              px: { xs: 2, sm: 3, md: 0 },
            }}
          >
            Our proven methodology for delivering exceptional results
          </Typography>

          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 3,
                bgcolor: "divider",
                transform: "translateY(-50%)",
                display: { xs: "none", md: "block" },
              }}
            />

            <Box
              sx={{
                position: "relative",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: { xs: 20, sm: 30, md: 40 },
                  zIndex: 1,
                  pointerEvents: "none",
                  display: { xs: "none", md: "block" },
                },
                "&::before": {
                  left: 0,
                  background:
                    "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
                },
                "&::after": {
                  right: 0,
                  background:
                    "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  overflowY: "hidden",
                  py: { xs: 1.5, sm: 2, md: 2.5 },
                  px: { xs: 0.5, sm: 1, md: 2 },
                  gap: { xs: 1.5, sm: 2, md: 2.5 },
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    height: { xs: 4, sm: 5, md: 6 },
                  },
                  "&::-webkit-scrollbar-track": {
                    background: theme.palette.grey[100],
                    borderRadius: 4,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: theme.palette.grey[300],
                    borderRadius: 4,
                    "&:hover": {
                      background: theme.palette.grey[400],
                    },
                  },
                  WebkitOverflowScrolling: "touch",
                  scrollBehavior: "smooth",
                }}
              >
                {processSteps.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: "0 0 auto",
                      width: {
                        xs: 220,
                        sm: 240,
                        md: 260,
                        lg: 280,
                        xl: 300,
                      },
                      minWidth: { xs: 220, sm: 240, md: 260, lg: 280, xl: 300 },
                      position: "relative",
                    }}
                  >
                    {index < processSteps.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "100%",
                          transform: "translateY(-50%)",
                          width: { xs: 12, sm: 16, md: 20 },
                          height: 2,
                          bgcolor: "primary.light",
                          opacity: 0.5,
                          display: { xs: "none", md: "block" },
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            right: -4,
                            top: -3,
                            width: 0,
                            height: 0,
                            borderTop: "4px solid transparent",
                            borderBottom: "4px solid transparent",
                            borderLeft: "6px solid",
                            borderLeftColor: "primary.main",
                          },
                        }}
                      />
                    )}

                    <Card
                      sx={{
                        textAlign: "center",
                        height: "100%",
                        border: "none",
                        boxShadow: 3,
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                        position: "relative",
                        overflow: "visible",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        background:
                          "linear-gradient(230deg, rgba(255,255,255,1), rgb(216, 242, 247))",
                        "&:hover": isDesktop
                          ? {
                              transform: "translateY(-6px)",
                              boxShadow: 6,
                              "& .step-number": {
                                transform: "scale(1.1)",
                                boxShadow: 4,
                              },
                            }
                          : {},
                      }}
                    >
                      <Box
                        className="step-number"
                        sx={{
                          position: "absolute",
                          top: { xs: -16, sm: -18, md: -20 },
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: { xs: 32, sm: 36, md: 40 },
                          height: { xs: 32, sm: 36, md: 40 },
                          borderRadius: "50%",
                          bgcolor: step.color,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                          fontWeight: "bold",
                          zIndex: 2,
                          boxShadow: 3,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {step.step}
                      </Box>

                      <CardContent
                        sx={{
                          pt: { xs: 4, sm: 4.5, md: 5 },
                          pb: { xs: 1.5, sm: 2, md: 2.5 },
                          px: { xs: 1, sm: 1.5, md: 2 },
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 40, sm: 45, md: 50 },
                            height: { xs: 40, sm: 45, md: 50 },
                            borderRadius: "50%",
                            bgcolor: safeAlpha(step.color, 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: { xs: 1, sm: 1.5, md: 1.8 },
                            color: step.color,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {React.cloneElement(step.icon, {
                            sx: {
                              fontSize: {
                                xs: "1.2rem",
                                sm: "1.3rem",
                                md: "1.4rem",
                              },
                            },
                          })}
                        </Box>

                        <Typography
                          variant="h6"
                          gutterBottom
                          fontWeight="bold"
                          sx={{
                            fontSize: {
                              xs: "0.85rem",
                              sm: "0.95rem",
                              md: "1rem",
                            },
                            mb: 0.5,
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: {
                              xs: "0.65rem",
                              sm: "0.7rem",
                              md: "0.75rem",
                            },
                          }}
                        >
                          {step.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                alignItems: "center",
                gap: 0.8,
                mt: { xs: 1.5, sm: 2 },
              }}
            >
              {processSteps.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: 5, sm: 6 },
                    height: { xs: 5, sm: 6 },
                    borderRadius: "50%",
                    bgcolor: index === 0 ? "primary.main" : "grey.300",
                    transition: "background-color 0.3s",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
