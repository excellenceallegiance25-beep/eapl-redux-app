import {
  ArrowRightAlt,
  ExpandLess,
  ExpandMore,
  Code,
  Cloud,
  Security,
  Analytics,
  MobileFriendly,
  Settings,
  Dns,
  Storage,
  Timeline,
  Devices,
  Hub,
  Api,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Fade,
  Zoom,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import useLoading from "../../redux/slices/useLoading";
import { getApplicationServicesList } from "../../services/AppConfigAction";
import eaplRotatingLogo from "../../assets/images/EAPLfavicon.png";

// ==================== SYMMETRICAL CARD CONFIGURATION ====================
const SYMMETRICAL_CARD_CONFIG = {
  fixedDimensions: {
    width: 360,
    height: 440,
  },
  cardsPerRow: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
  },
  initialRows: {
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
  },
  spacing: {
    xs: 3,
    sm: 3,
    md: 4,
    lg: 4,
    xl: 4,
  },
  padding: 3,
  iconSize: 80,
  iconFontSize: 40,
  titleFontSize: "1.35rem",
  titleHeight: 70,
  descriptionFontSize: "0.9rem",
  descriptionHeight: 80,
  descriptionLines: 3,
  featuresHeight: 36,
  chipFontSize: "0.8rem",
  chipHeight: 28,
  buttonFontSize: "0.9rem",
  buttonPaddingY: 1,
};

// Modern tech stack icons mapping
const TECH_ICONS = {
  "Cloud Solutions": <Cloud sx={{ fontSize: 40 }} />,
  "Software Development": <Code sx={{ fontSize: 40 }} />,
  Cybersecurity: <Security sx={{ fontSize: 40 }} />,
  "AI & Analytics": <Analytics sx={{ fontSize: 40 }} />,
  "Mobile Development": <MobileFriendly sx={{ fontSize: 40 }} />,
  "Digital Transformation": <Timeline sx={{ fontSize: 40 }} />,
  "IoT Solutions": <Hub sx={{ fontSize: 40 }} />,
  "Blockchain Services": <Dns sx={{ fontSize: 40 }} />,
  "DevOps & CI/CD": <Settings sx={{ fontSize: 40 }} />,
  "Quality Assurance": <Storage sx={{ fontSize: 40 }} />,
  "UI/UX Design": <Devices sx={{ fontSize: 40 }} />,
  "Consulting Services": <Api sx={{ fontSize: 40 }} />,
};

const ServicesSection = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const [showAllServices, setShowAllServices] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { showLoader, hideLoader } = useLoading();
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfigs = async () => {
      // showLoader(eaplRotatingLogo, 0);
      setLoading(true);
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
        // hideLoader();
      }
      setLoading(false);
    };
    loadConfigs();
  }, [dispatch]);

  // Helper functions
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

  const getServiceIcon = (service) => {
    if (!service.icon) return null;
    if (isImageUrl(service.icon)) return service.icon;
    if (service.icon && service.icon.length > 50) {
      const base64Pattern = /^[A-Za-z0-9+/=]+$/;
      if (base64Pattern.test(service.icon.substring(0, 50))) {
        return `data:image/png;base64,${service.icon}`;
      }
    }
    return service.icon;
  };

  const safeAlpha = (color, opacity) => {
    const safeColor = isValidColor(color) ? color : "#1976d2";
    return alpha(safeColor, opacity);
  };

  const isValidColor = (color) => {
    if (!color) return false;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) return true;
    if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(color)) return true;
    return false;
  };

  const getServiceColor = (service) => {
    if (service.color && isValidColor(service.color)) return service.color;

    const colorMap = {
      Cloud: "#4361ee",
      Development: "#7209b7",
      Security: "#f72585",
      Analytics: "#4cc9f0",
      Mobile: "#f8961e",
      Transformation: "#3a0ca3",
      IoT: "#4895ef",
      Blockchain: "#f15bb5",
      DevOps: "#fe5f55",
      Quality: "#577590",
      Design: "#b5179e",
      Consulting: "#2b9348",
    };

    const category = service.category || service.title || "";
    for (const [key, color] of Object.entries(colorMap)) {
      if (category.toLowerCase().includes(key.toLowerCase())) return color;
    }

    const defaultColors = [
      "#4361ee",
      "#7209b7",
      "#f72585",
      "#4cc9f0",
      "#f8961e",
      "#3a0ca3",
    ];
    if (service.title) {
      const hash = service.title
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return defaultColors[hash % defaultColors.length];
    }
    return "#4361ee";
  };

  const getGradientBackground = (color) => {
    return `linear-gradient(135deg, ${safeAlpha("#ffffff", 0.02)} 0%, ${safeAlpha("#f8f9fa", 0.05)} 100%)`;
  };

  const floatingAnimation = {
    animation: "floating 3s ease-in-out infinite",
    "@keyframes floating": {
      "0%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-8px)" },
      "100%": { transform: "translateY(0px)" },
    },
  };

  const currentDevice = isXs
    ? "xs"
    : isSm
      ? "sm"
      : isMd
        ? "md"
        : isLg
          ? "lg"
          : "xl";
  const initialServicesCount =
    SYMMETRICAL_CARD_CONFIG.cardsPerRow[currentDevice] *
    SYMMETRICAL_CARD_CONFIG.initialRows[currentDevice];
  const servicesToShow = showAllServices
    ? services
    : services.slice(0, initialServicesCount);

  const getContainerHeight = () => {
    const cardHeight = SYMMETRICAL_CARD_CONFIG.fixedDimensions.height;
    const spacing = SYMMETRICAL_CARD_CONFIG.spacing[currentDevice];
    const initialRows = SYMMETRICAL_CARD_CONFIG.initialRows[currentDevice];
    return cardHeight * initialRows + spacing * (initialRows - 1) + 60;
  };

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 12 },
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #e9edf5 50%, #f0f4fa 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        {/* ================= HEADER ================= */}
        <Box textAlign="center" mb={{ xs: 5, md: 8 }}>
          <Chip
            label="⚡ Our Services"
            sx={{
              mb: 3,
              fontWeight: 700,
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              px: 3,
              py: 2,
              borderRadius: "30px",
              background: "linear-gradient(135deg, #1976d2, #1565c0)",
              color: "white",
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: "1.9rem",
                sm: "2.4rem",
                md: "3rem",
                lg: "3.5rem",
              },
              color: "#1a237e",
              mb: 2,
            }}
          >
            Innovative Tech Solutions
          </Typography>

          <Typography
            sx={{
              maxWidth: 750,
              mx: "auto",
              fontSize: {
                xs: "0.95rem",
                sm: "1.05rem",
                md: "1.2rem",
              },
              color: "#546e7a",
            }}
          >
            Empowering businesses with cutting-edge technology and
            <Box
              component="span"
              sx={{
                color: "#1976d2",
                fontWeight: 600,
                mx: 1,
              }}
            >
              future-ready solutions
            </Box>
          </Typography>
        </Box>

        {/* ================= SERVICES GRID ================= */}
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
          justifyContent="center"
        >
          {servicesToShow.map((service, index) => {
            const serviceColor = getServiceColor(service);
            const isHovered = hoveredCard === index;
            const techIcon = TECH_ICONS[service.title] || (
              <Code sx={{ fontSize: 36 }} />
            );

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    p: { xs: 2.5, sm: 3 },
                    transition: "all 0.3s ease",
                    background:
                      "linear-gradient(100deg, #ffffff, rgba(217, 233, 236, 0.2), #8fbece)",
                    boxShadow: isHovered
                      ? `0 20px 40px -10px ${safeAlpha(serviceColor, 0.3)}`
                      : "0 10px 25px rgba(0,0,0,0.08)",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                  }}
                >
                  {/* ICON */}
                  <Box display="flex" justifyContent="center" mb={3}>
                    <Avatar
                      sx={{
                        width: { xs: 60, sm: 70, md: 80 },
                        height: { xs: 60, sm: 70, md: 80 },
                        bgcolor: safeAlpha(serviceColor, 0.1),
                        color: serviceColor,
                      }}
                    >
                      {isImageUrl(service.icon) ? (
                        <Box
                          component="img"
                          src={getServiceIcon(service)}
                          alt={service.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        techIcon
                      )}
                    </Avatar>
                  </Box>

                  {/* TITLE */}
                  <Typography
                    align="center"
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: "1.05rem",
                        sm: "1.15rem",
                        md: "1.25rem",
                      },
                      mb: 2,
                      color: "#1a237e",
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* DESCRIPTION */}
                  <Typography
                    align="center"
                    sx={{
                      fontSize: {
                        xs: "0.85rem",
                        sm: "0.9rem",
                        md: "0.95rem",
                      },
                      color: "#607d8b",
                      mb: 3,
                      flexGrow: 1,
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* FEATURES */}
                  {service.features && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexWrap="wrap"
                      gap={1}
                      mb={3}
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
                              fontSize: "0.75rem",
                              bgcolor: safeAlpha(serviceColor, 0.1),
                            }}
                          />
                        ))}
                    </Box>
                  )}

                  {/* BUTTON */}
                  <Box textAlign="center">
                    <Button
                      component={RouterLink}
                      to={`/services/${service.id}`}
                      endIcon={<ArrowRightAlt />}
                      sx={{
                        borderRadius: "30px",
                        fontWeight: 600,
                        textTransform: "none",
                        color: serviceColor,
                        border: `1px solid ${safeAlpha(serviceColor, 0.4)}`,
                        "&:hover": {
                          background: safeAlpha(serviceColor, 0.1),
                        },
                      }}
                    >
                      Explore
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* VIEW MORE BUTTON */}
        {services.length > initialServicesCount && (
          <Box textAlign="center" mt={6}>
            <Button
              variant="contained"
              onClick={() => setShowAllServices(!showAllServices)}
              endIcon={showAllServices ? <ExpandLess /> : <ExpandMore />}
              sx={{
                px: 5,
                py: 1.8,
                borderRadius: "40px",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1976d2, #1565c0)",
              }}
            >
              {showAllServices
                ? "Show Less Services"
                : `View All ${services.length} Services`}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );

  // return (
  //   <Box
  //     sx={{
  //       py: { xs: 8, sm: 10, md: 14 },
  //       background: "linear-gradient(135deg, #f5f7fa 0%, #e9edf5 50%, #f0f4fa 100%)",
  //       position: "relative",
  //       overflow: "hidden",
  //     }}
  //   >
  //     <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
  //       {/* Header Section */}
  //       <Fade in timeout={1000}>
  //         <Box textAlign="center" sx={{ mb: { xs: 5, sm: 7, md: 9 } }}>
  //           <Zoom in timeout={500}>
  //             <Chip
  //               label="⚡ Our Services"
  //               sx={{
  //                 mb: 3,
  //                 fontWeight: 700,
  //                 fontSize: { xs: "0.9rem", sm: "1rem" },
  //                 py: 2.5,
  //                 px: 3.5,
  //                 background: "linear-gradient(135deg, #1976d2, #1565c0)",
  //                 color: "white",
  //                 border: "none",
  //                 boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
  //                 borderRadius: "30px",
  //                 "& .MuiChip-label": {
  //                   px: 2,
  //                 },
  //               }}
  //             />
  //           </Zoom>

  //           <Typography
  //             variant={isXs ? "h3" : "h2"}
  //             sx={{
  //               fontWeight: 800,
  //               fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
  //               color: "#1a237e",
  //               mb: 2,
  //               letterSpacing: "-0.02em",
  //               textShadow: "0 2px 10px rgba(25, 118, 210, 0.1)",
  //             }}
  //           >
  //             Innovative Tech Solutions
  //           </Typography>

  //           <Typography
  //             variant={isXs ? "body1" : "h6"}
  //             sx={{
  //               maxWidth: 750,
  //               mx: "auto",
  //               fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
  //               color: "#455a64",
  //               lineHeight: 1.7,
  //               fontWeight: 400,
  //             }}
  //           >
  //             Empowering businesses with cutting-edge technology and
  //             <Box component="span" sx={{
  //               color: "#1976d2",
  //               fontWeight: 600,
  //               display: "inline-block",
  //               mx: 1,
  //               background: "linear-gradient(135deg, #1976d2, #1565c0)",
  //               WebkitBackgroundClip: "text",
  //               WebkitTextFillColor: "transparent",
  //             }}>
  //               future-ready solutions
  //             </Box>
  //           </Typography>
  //         </Box>
  //       </Fade>

  //       {/* Services Grid */}
  //       <Box
  //         sx={{
  //           position: "relative",
  //           minHeight: showAllServices ? "auto" : getContainerHeight(),
  //           overflow: "hidden",
  //           mb: 5,
  //         }}
  //       >
  //         <Grid
  //           container
  //           spacing={SYMMETRICAL_CARD_CONFIG.spacing[currentDevice]}
  //           sx={{
  //             transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  //             justifyContent: "center",
  //           }}
  //         >
  //           {servicesToShow.map((service, index) => {
  //             const serviceColor = getServiceColor(service);
  //             const isHovered = hoveredCard === index;
  //             const techIcon = TECH_ICONS[service.title] || <Code sx={{ fontSize: 40 }} />;

  //             return (
  //               <Grid
  //                 item
  //                 xs={12}
  //                 sm={6}
  //                 md={4}
  //                 lg={4}
  //                 xl={3}
  //                 key={index}
  //                 sx={{
  //                   display: "flex",
  //                   justifyContent: "center",
  //                 }}
  //               >
  //                 <Zoom in timeout={500 + index * 100}>
  //                   <Card
  //                     onMouseEnter={() => setHoveredCard(index)}
  //                     onMouseLeave={() => setHoveredCard(null)}
  //                     sx={{
  //                       width: SYMMETRICAL_CARD_CONFIG.fixedDimensions.width,
  //                       height: SYMMETRICAL_CARD_CONFIG.fixedDimensions.height,
  //                       minWidth: SYMMETRICAL_CARD_CONFIG.fixedDimensions.width,
  //                       minHeight: SYMMETRICAL_CARD_CONFIG.fixedDimensions.height,
  //                       display: "flex",
  //                       flexDirection: "column",
  //                       border: "1px solid",
  //                       borderColor: safeAlpha(serviceColor, isHovered ? 0.3 : 0.1),
  //                       borderRadius: "24px",
  //                       transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  //                       overflow: "hidden",
  //                       position: "relative",
  //                       background: "#ffffff",
  //                       boxShadow: isHovered
  //                         ? `0 20px 40px -10px ${safeAlpha(serviceColor, 0.3)}, 0 0 0 1px ${safeAlpha(serviceColor, 0.2)}`
  //                         : "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
  //                       transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
  //                       ...(index % 2 === 0 && !isHovered && floatingAnimation),
  //                       "&::before": {
  //                         content: '""',
  //                         position: "absolute",
  //                         top: 0,
  //                         left: 0,
  //                         right: 0,
  //                         height: "4px",
  //                         background: `linear-gradient(90deg, ${serviceColor}, ${safeAlpha(serviceColor, 0.5)}, ${serviceColor})`,
  //                         transition: "all 0.3s ease",
  //                       },
  //                     }}
  //                   >
  //                     {/* Animated background on hover */}
  //                     <Box
  //                       sx={{
  //                         position: "absolute",
  //                         top: 0,
  //                         left: 0,
  //                         right: 0,
  //                         bottom: 0,
  //                         background: `radial-gradient(circle at ${isHovered ? '30%' : '50%'} 50%, ${safeAlpha(serviceColor, 0.08)} 0%, transparent 70%)`,
  //                         transition: "all 0.5s ease",
  //                         opacity: isHovered ? 1 : 0,
  //                       }}
  //                     />

  //                     <CardContent
  //                       sx={{
  //                         flexGrow: 1,
  //                         display: "flex",
  //                         flexDirection: "column",
  //                         height: "100%",
  //                         p: SYMMETRICAL_CARD_CONFIG.padding,
  //                         position: "relative",
  //                         zIndex: 2,
  //                       }}
  //                     >
  //                       {/* Icon Section */}
  //                       <Box
  //                         sx={{
  //                           display: "flex",
  //                           justifyContent: "center",
  //                           mb: 3,
  //                           position: "relative",
  //                         }}
  //                       >
  //                         <Avatar
  //                           sx={{
  //                             width: SYMMETRICAL_CARD_CONFIG.iconSize,
  //                             height: SYMMETRICAL_CARD_CONFIG.iconSize,
  //                             bgcolor: safeAlpha(serviceColor, 0.1),
  //                             color: serviceColor,
  //                             border: `2px solid ${safeAlpha(serviceColor, 0.2)}`,
  //                             boxShadow: isHovered
  //                               ? `0 0 30px ${safeAlpha(serviceColor, 0.3)}`
  //                               : "none",
  //                             transition: "all 0.3s ease",
  //                             fontSize: SYMMETRICAL_CARD_CONFIG.iconFontSize,
  //                           }}
  //                         >
  //                           {isImageUrl(service.icon) ? (
  //                             <Box
  //                               component="img"
  //                               src={getServiceIcon(service)}
  //                               alt={service.title}
  //                               sx={{
  //                                 width: "100%",
  //                                 height: "100%",
  //                                 objectFit: "cover",
  //                               }}
  //                             />
  //                           ) : (
  //                             techIcon
  //                           )}
  //                         </Avatar>

  //                         {/* Glow effect */}
  //                         <Box
  //                           sx={{
  //                             position: "absolute",
  //                             top: "50%",
  //                             left: "50%",
  //                             transform: "translate(-50%, -50%)",
  //                             width: SYMMETRICAL_CARD_CONFIG.iconSize + 10,
  //                             height: SYMMETRICAL_CARD_CONFIG.iconSize + 10,
  //                             background: `radial-gradient(circle, ${safeAlpha(serviceColor, 0.15)} 0%, transparent 70%)`,
  //                             borderRadius: "50%",
  //                             filter: "blur(10px)",
  //                             opacity: isHovered ? 1 : 0,
  //                             transition: "opacity 0.3s ease",
  //                             zIndex: -1,
  //                           }}
  //                         />
  //                       </Box>

  //                       {/* Title */}
  //                       <Typography
  //                         variant="h6"
  //                         align="center"
  //                         sx={{
  //                           fontSize: SYMMETRICAL_CARD_CONFIG.titleFontSize,
  //                           fontWeight: 700,
  //                           minHeight: SYMMETRICAL_CARD_CONFIG.titleHeight,
  //                           mb: 2,
  //                           color: "#1a237e",
  //                           transition: "all 0.3s ease",
  //                           letterSpacing: "0.3px",
  //                         }}
  //                       >
  //                         {service.title}
  //                       </Typography>

  //                       {/* Description */}
  //                       <Typography
  //                         variant="body2"
  //                         align="center"
  //                         sx={{
  //                           fontSize: SYMMETRICAL_CARD_CONFIG.descriptionFontSize,
  //                           lineHeight: 1.7,
  //                           minHeight: SYMMETRICAL_CARD_CONFIG.descriptionHeight,
  //                           mb: 3,
  //                           color: "#546e7a",
  //                           transition: "all 0.3s ease",
  //                           overflow: "hidden",
  //                           display: "-webkit-box",
  //                           WebkitLineClamp: SYMMETRICAL_CARD_CONFIG.descriptionLines,
  //                           WebkitBoxOrient: "vertical",
  //                         }}
  //                       >
  //                         {service.description}
  //                       </Typography>

  //                       {/* Features Chips */}
  //                       {service.features && (
  //                         <Box
  //                           sx={{
  //                             mb: 3,
  //                             display: "flex",
  //                             justifyContent: "center",
  //                             flexWrap: "wrap",
  //                             gap: 1,
  //                             minHeight: SYMMETRICAL_CARD_CONFIG.featuresHeight,
  //                           }}
  //                         >
  //                           {service.features.split(",").slice(0, 3).map((feature, idx) => (
  //                             <Chip
  //                               key={idx}
  //                               label={feature.trim()}
  //                               size="small"
  //                               sx={{
  //                                 bgcolor: safeAlpha(serviceColor, 0.08),
  //                                 color: "#37474f",
  //                                 fontSize: SYMMETRICAL_CARD_CONFIG.chipFontSize,
  //                                 height: SYMMETRICAL_CARD_CONFIG.chipHeight,
  //                                 fontWeight: 500,
  //                                 border: `1px solid ${safeAlpha(serviceColor, 0.15)}`,
  //                                 transition: "all 0.3s ease",
  //                                 "&:hover": {
  //                                   bgcolor: safeAlpha(serviceColor, 0.15),
  //                                   color: serviceColor,
  //                                 },
  //                               }}
  //                             />
  //                           ))}
  //                         </Box>
  //                       )}

  //                       {/* Button */}
  //                       <Box sx={{ mt: "auto", display: "flex", justifyContent: "center" }}>
  //                         <Button
  //                           component={RouterLink}
  //                           to={`/services/${service.id}`}
  //                           endIcon={
  //                             <ArrowRightAlt
  //                               sx={{
  //                                 transition: "transform 0.3s ease",
  //                               }}
  //                             />
  //                           }
  //                           sx={{
  //                             color: serviceColor,
  //                             fontSize: SYMMETRICAL_CARD_CONFIG.buttonFontSize,
  //                             py: SYMMETRICAL_CARD_CONFIG.buttonPaddingY,
  //                             px: 3,
  //                             minWidth: 140,
  //                             borderRadius: "30px",
  //                             background: isHovered
  //                               ? safeAlpha(serviceColor, 0.08)
  //                               : "transparent",
  //                             border: `1.5px solid ${safeAlpha(serviceColor, 0.3)}`,
  //                             transition: "all 0.3s ease",
  //                             fontWeight: 600,
  //                             textTransform: "none",
  //                             "&:hover": {
  //                               background: safeAlpha(serviceColor, 0.12),
  //                               borderColor: serviceColor,
  //                               transform: "translateY(-2px)",
  //                               boxShadow: `0 8px 16px -5px ${safeAlpha(serviceColor, 0.2)}`,
  //                               "& .MuiButton-endIcon": {
  //                                 transform: "translateX(5px)",
  //                               },
  //                             },
  //                           }}
  //                         >
  //                           Explore
  //                         </Button>
  //                       </Box>
  //                     </CardContent>
  //                   </Card>
  //                 </Zoom>
  //               </Grid>
  //             );
  //           })}
  //         </Grid>

  //         {/* Gradient Overlay */}
  //         {!showAllServices && services.length > initialServicesCount && (
  //           <Box
  //             sx={{
  //               position: "absolute",
  //               bottom: 0,
  //               left: 0,
  //               right: 0,
  //               height: "250px",
  //               background: "linear-gradient(to bottom, transparent 0%, #f0f4fa 80%)",
  //               pointerEvents: "none",
  //               zIndex: 3,
  //             }}
  //           />
  //         )}
  //       </Box>

  //       {/* View All Button */}
  //       {services.length > initialServicesCount && (
  //         <Fade in timeout={1000}>
  //           <Box sx={{ textAlign: "center" }}>
  //             <Button
  //               variant="contained"
  //               size={isXs ? "large" : "large"}
  //               onClick={() => setShowAllServices(!showAllServices)}
  //               endIcon={showAllServices ? <ExpandLess /> : <ExpandMore />}
  //               sx={{
  //                 px: { xs: 5, sm: 6 },
  //                 py: { xs: 1.8, sm: 2 },
  //                 fontSize: { xs: "1rem", sm: "1.1rem" },
  //                 fontWeight: 600,
  //                 borderRadius: "40px",
  //                 background: "linear-gradient(135deg, #1976d2, #1565c0)",
  //                 color: "white",
  //                 boxShadow: "0 10px 25px -5px rgba(25, 118, 210, 0.4)",
  //                 transition: "all 0.3s ease",
  //                 "&:hover": {
  //                   transform: "translateY(-2px)",
  //                   boxShadow: "0 15px 30px -5px rgba(25, 118, 210, 0.5)",
  //                   background: "linear-gradient(135deg, #1e88e5, #1976d2)",
  //                 },
  //               }}
  //             >
  //               {showAllServices ? "Show Less Services" : `View All ${services.length} Services`}
  //             </Button>
  //           </Box>
  //         </Fade>
  //       )}
  //     </Container>
  //   </Box>
  // );
};

export default ServicesSection;
