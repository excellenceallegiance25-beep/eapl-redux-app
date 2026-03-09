import {
  AccessTime,
  Add,
  Business,
  Chat,
  CheckCircle,
  Description,
  Directions,
  Email,
  LocationOn,
  Navigation,
  Person,
  Phone,
  Place,
  Remove,
  Schedule,
  Security,
  Send,
  SupportAgent,
  Verified,
} from "@mui/icons-material";
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Fade,
  Grid,
  Grow,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import workingHour_bg from "../assets/images/workingHour.jpg";
import workingperson_bg from "../assets/images/workingperson.jpg";
import manylaptopbg_bg from "../assets/images/manylaptopbg.jpg";
import buildingbg_bg from "../assets/images/buildingbg.jpg";
import meeting_bg from "../assets/images/meeting.jpg";
import PageHeader from "../components/common/PageHeader";
import { sendUserDetailsToManager } from "../services/AppConfigAction";
import ContactForm from "../components/common/ContactForm";

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeInfo, setActiveInfo] = useState(0);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Responsive container maxWidth
  const containerMaxWidth = isMobile ? false : isTablet ? "lg" : "xl";

  // Responsive font sizes
  const getFontSize = {
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
    caption: {
      xs: "0.6rem",
      sm: "0.65rem",
      md: "0.7rem",
      lg: "0.75rem",
      xl: "0.8rem",
    },
  };

  const departments = [
    "General Inquiry",
    "Sales",
    "Technical Support",
    "Billing",
    "Partnership",
    "Careers",
  ];

  const contactInfo = [
    {
      icon: <LocationOn fontSize="large" />,
      title: "Visit Our Office",
      details: [
        "1st floor, 1/16, Basanta Rd.",
        "Nitai Nagar, Mukundapur",
        "Kolkata, West Bengal 700099",
      ],
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      delay: 100,
      image: buildingbg_bg,
      // "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      action: () =>
        window.open("https://maps.app.goo.gl/4KzGDkDDPkAnKovw7", "_blank"),
    },
    {
      icon: <Email fontSize="large" />,
      title: "Email Us",
      details: ["contact@myeapl.com"],
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
      delay: 200,
      action: () =>
        (window.location.href =
          "mailto:contact@myeapl.com?subject=Inquiry%20from%20Website"),
      image: workingperson_bg,
      // "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    },
    {
      icon: <Phone fontSize="large" />,
      title: "Call Us",
      details: ["+91 6289534780"],
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      delay: 300,
      action: () => (window.location.href = "tel:+91 6289534780"),
      image: manylaptopbg_bg,
      // "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    },
    {
      icon: <Schedule fontSize="large" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 10:30AM - 07:30PM",
        "Saturday: 10AM - 4PM",
        "Sunday: Closed",
      ],
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
      delay: 400,
      image: workingHour_bg,
      action: null,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.department)
      newErrors.department = "Please select a department";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!validateForm(data)) {
      console.error("Form validation failed");
      return;
    }

    const payload = {
      ...data,
      source: "website_contact_form",
    };

    try {
      setUploading(true);
      setError(null);
      setSubmitting("Submitting response...");

      const result = await dispatch(sendUserDetailsToManager(payload));

      if (result?.type === "USER_DETAILS_FETCH_SUCCESS") {
        if (result?.payload?.success) {
          // console.log("User details saved successfully");
          setOpenSnackbar(true);
          e.target.reset();
          setError(null);
          setTimeout(() => {
            setSubmitting("");
          }, 2000);
        } else {
          console.error("Backend error:", result?.payload?.message);
          setError(result?.payload?.message || "Submission failed");
          setSubmitting("");
        }
      } else {
        console.error("Unexpected action type:", result?.type);
        setError("Unexpected server response");
        setSubmitting("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit contact form");
      setSubmitting("");
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setUploading(true);
      setError(null);

      const result = await dispatch(
        sendUserDetailsToManager({
          ...formData,
          source: "website_contact_form",
        }),
      );

      if (
        result?.type === "USER_DETAILS_FETCH_SUCCESS" &&
        result?.payload?.success
      ) {
        setOpenSnackbar(true);
        return { success: true };
      } else {
        throw new Error(result?.payload?.message || "Submission failed");
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{ bgcolor: theme.palette.background.default, overflowX: "hidden" }}
    >
      <PageHeader
        title="Get in Touch"
        animation="slideInRight"
        subtitle="We're here to help and answer any questions you might have"
        backgroundImage={`linear-gradient(rgba(52, 59, 67, 0.85), rgba(31, 56, 77, 0.85)), url(${meeting_bg})`}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: "35vh", sm: "40vh", md: "45vh", lg: "50vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <Container
        maxWidth={containerMaxWidth}
        sx={{
          mt: { xs: -3, sm: -4, md: -5 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Floating Contact Info Cards */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Grid
            container
            spacing={{ xs: 2, sm: 2.5, md: 3 }}
            justifyContent="center"
          >
            {contactInfo.map((contact, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={contact.delay}>
                  <Card
                    elevation={4}
                    onClick={contact.action}
                    sx={{
                      height: "100%",
                      transition: "all 0.3s ease",
                      cursor: contact.action ? "pointer" : "default",
                      background: `linear-gradient(90deg, #d9f6f7,#FFF)`,
                      border: `2px solid transparent`,
                      "&:hover": {
                        transform: isDesktop
                          ? "translateY(-8px)"
                          : "translateY(-4px)",
                        boxShadow: theme.shadows[8],
                        borderColor: contact.action
                          ? contact.color
                          : "transparent",
                      },
                      overflow: "hidden",
                      position: "relative",
                      borderRadius: { xs: 2, sm: 2.5, md: 3 },
                      "&:hover .contact-image": {
                        transform: isDesktop ? "scale(1.1)" : "scale(1.05)",
                      },
                      bgcolor: "background.paper",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: `linear-gradient(90deg, ${contact.color}, ${alpha(contact.color, 0.5)})`,
                      },
                    }}
                    onMouseEnter={() => setActiveInfo(index)}
                  >
                    <Box
                      className="contact-image"
                      sx={{
                        height: { xs: 120, sm: 130, md: 140, lg: 150 },
                        backgroundImage: `url(${contact.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "transform 0.5s",
                      }}
                    />
                    <Box
                      sx={{
                        p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 50, sm: 60, md: 65, lg: 70 },
                          height: { xs: 50, sm: 60, md: 65, lg: 70 },
                          borderRadius: "50%",
                          bgcolor: alpha(contact.color, 0.1),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: {
                            xs: "-35px auto 15px",
                            sm: "-40px auto 20px",
                            md: "-45px auto 22px",
                            lg: "-55px auto 25px",
                          },
                          color: contact.color,
                          border: `4px solid ${theme.palette.background.paper}`,
                          position: "relative",
                          zIndex: 1,
                          "& svg": {
                            fontSize: { xs: 24, sm: 28, md: 30, lg: 32 },
                          },
                        }}
                      >
                        {contact.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        fontWeight="bold"
                        sx={{
                          fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                            md: "1.2rem",
                            lg: "1.3rem",
                          },
                          mb: { xs: 2, sm: 2.5, md: 3 },
                        }}
                      >
                        {contact.title}
                      </Typography>
                      {contact.details.map((detail, idx) => (
                        <Typography
                          key={idx}
                          variant="body1"
                          sx={{
                            mb: 1.5,
                            color:
                              idx === 0 ? "text.primary" : "text.secondary",
                            transition: "all 0.3s",
                            fontSize: getFontSize.body1,
                            wordBreak: "break-word",
                            "&:hover": {
                              color: contact.color,
                              transform: isDesktop ? "translateX(5px)" : "none",
                            },
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Main Content Section - Map and Contact Info */}
        <Box
          sx={{
            mt: { xs: 8, sm: 10, md: 12 },
            mb: { xs: 6, sm: 7, md: 8 },
          }}
        >
          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
            <Grid item xs={12}>
              <Fade in={true} timeout={700}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: { xs: "center", md: "flex-start" },
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 4, md: 5 },
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {/* Enhanced Map Container */}
                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", md: "1 1 50%", lg: "1 1 55%" },
                      width: "100%",
                      maxWidth: { xs: "100%", md: "700px", lg: "800px" },
                      position: "relative",
                    }}
                  >
                    <Paper
                      elevation={8}
                      sx={{
                        borderRadius: { xs: 3, sm: 4, md: "20px" },
                        overflow: "hidden",
                        position: "relative",
                        height: { xs: 300, sm: 350, md: 400, lg: 450 },
                        transform: "translateZ(0)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: isDesktop
                            ? "translateY(-5px) scale(1.01)"
                            : "none",
                          boxShadow: isDesktop
                            ? "0 30px 60px rgba(0,0,0,0.2)"
                            : 8,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <iframe
                          title="Google Maps - Our Headquarters"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.772122709782!2d88.4031208!3d22.4952639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271d4ec05af01%3A0xaece0c5471680424!2sExcellence%20Allegiance%20Private%20Limited!5e0!3m2!1sen!2sin!4v1705661567895!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{
                            border: 0,
                          }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />

                        {/* Custom Map Controls */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: { xs: 10, sm: 15, md: 20 },
                            right: { xs: 10, sm: 15, md: 20 },
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            pointerEvents: "auto",
                          }}
                        >
                          <Box
                            sx={{
                              background: "white",
                              borderRadius: "8px",
                              overflow: "hidden",
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Button
                              size="small"
                              sx={{
                                minWidth: { xs: 30, sm: 35, md: 40 },
                                height: { xs: 30, sm: 35, md: 40 },
                                borderRadius: 0,
                                borderBottom: "1px solid #eee",
                              }}
                            >
                              <Add
                                sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }}
                              />
                            </Button>
                            <Button
                              size="small"
                              sx={{
                                minWidth: { xs: 30, sm: 35, md: 40 },
                                height: { xs: 30, sm: 35, md: 40 },
                                borderRadius: 0,
                              }}
                            >
                              <Remove
                                sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }}
                              />
                            </Button>
                          </Box>

                          <Box
                            sx={{
                              width: { xs: 30, sm: 35, md: 40 },
                              height: { xs: 30, sm: 35, md: 40 },
                              background: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                              cursor: "pointer",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: isDesktop ? "rotate(30deg)" : "none",
                                background: "#f8f9fa",
                              },
                            }}
                          >
                            <Navigation
                              sx={{
                                color: "#666",
                                fontSize: { xs: 16, sm: 18, md: 20 },
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Custom Location Pin */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -100%)",
                            pointerEvents: "none",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: { xs: 30, sm: 35, md: 40 },
                              height: { xs: 30, sm: 35, md: 40 },
                              borderRadius: "50%",
                              background: "rgba(255, 68, 68, 0.2)",
                              animation: isDesktop
                                ? "pulse 2s infinite"
                                : "none",
                            }}
                          />

                          <Box
                            sx={{
                              width: { xs: 45, sm: 50, md: 55, lg: 60 },
                              height: { xs: 45, sm: 50, md: 55, lg: 60 },
                              borderRadius: "50% 50% 50% 0",
                              background:
                                "linear-gradient(135deg, #ff4444, #ff6666)",
                              transform: "rotate(-45deg)",
                              position: "relative",
                              boxShadow: "0 10px 30px rgba(255, 68, 68, 0.3)",
                              animation: isDesktop
                                ? "bounce 2s infinite"
                                : "none",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: { xs: 20, sm: 25, md: 30 },
                                height: { xs: 20, sm: 25, md: 30 },
                                background: "white",
                                borderRadius: "50%",
                              },
                              "&::after": {
                                content: '"🏢"',
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform:
                                  "translate(-50%, -50%) rotate(45deg)",
                                fontSize: { xs: 12, sm: 14, md: 16 },
                              },
                            }}
                          />
                        </Box>

                        {/* Info Window */}
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background:
                              "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                            backdropFilter: "blur(10px)",
                            padding: { xs: 1.5, sm: 2 },
                            borderTop: "1px solid rgba(0,0,0,0.1)",
                            transform: "translateY(0)",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: isDesktop
                                ? "translateY(-5px)"
                                : "none",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 1, sm: 1.5, md: 2 },
                            }}
                          >
                            <Box sx={{ flexShrink: 0 }}>
                              <Place
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontSize: { xs: 20, sm: 22, md: 24 },
                                }}
                              />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{
                                  fontSize: {
                                    xs: "0.85rem",
                                    sm: "0.95rem",
                                    md: "1rem",
                                  },
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                Excellence Allegiance Pvt Ltd
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  fontSize: {
                                    xs: "0.7rem",
                                    sm: "0.75rem",
                                    md: "0.8rem",
                                  },
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                Kolkata, West Bengal • 22.4952639° N,
                                88.4031208° E
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              size={isMobile ? "small" : "medium"}
                              startIcon={
                                <Directions
                                  sx={{ fontSize: { xs: 16, sm: 18 } }}
                                />
                              }
                              onClick={() =>
                                window.open(
                                  "https://www.google.com/maps/dir/?api=1&destination=22.4952639,88.4031208",
                                  "_blank",
                                )
                              }
                              sx={{
                                background:
                                  "linear-gradient(135deg, #4285F4, #34A853)",
                                borderRadius: "20px",
                                fontWeight: "bold",
                                fontSize: {
                                  xs: "0.7rem",
                                  sm: "0.75rem",
                                  md: "0.8rem",
                                },
                                py: { xs: 0.5, sm: 0.8, md: 1 },
                                px: { xs: 1.5, sm: 2, md: 2.5 },
                                whiteSpace: "nowrap",
                                minWidth: { xs: "auto", sm: "auto" },
                                "&:hover": {
                                  transform: isDesktop
                                    ? "translateY(-2px)"
                                    : "none",
                                },
                              }}
                            >
                              {isMobile ? "Go" : "Directions"}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>

                    {/* Map Stats Cards */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 1.5, md: 2 },
                        mt: { xs: 2, sm: 2.5, md: 3 },
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          background: "white",
                          p: { xs: 1, sm: 1.2, md: 1.5 },
                          borderRadius: { xs: 2, sm: 2.5, md: 3 },
                          minWidth: { xs: 80, sm: 90, md: 100 },
                          textAlign: "center",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: getFontSize.caption }}
                        >
                          📍 Latitude
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ fontSize: getFontSize.body2 }}
                        >
                          22.495264° N
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          background: "white",
                          p: { xs: 1, sm: 1.2, md: 1.5 },
                          borderRadius: { xs: 2, sm: 2.5, md: 3 },
                          minWidth: { xs: 80, sm: 90, md: 100 },
                          textAlign: "center",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: getFontSize.caption }}
                        >
                          🌐 Longitude
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ fontSize: getFontSize.body2 }}
                        >
                          88.403121° E
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          background: "white",
                          p: { xs: 1, sm: 1.2, md: 1.5 },
                          borderRadius: { xs: 2, sm: 2.5, md: 3 },
                          minWidth: { xs: 80, sm: 90, md: 100 },
                          textAlign: "center",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: getFontSize.caption }}
                        >
                          ⏰ Timezone
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ fontSize: getFontSize.body2 }}
                        >
                          IST (UTC+5:30)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Contact Info Section */}
                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", md: "1 1 40%", lg: "1 1 35%" },
                      width: "100%",
                      maxWidth: {
                        xs: "100%",
                        sm: "500px",
                        md: "450px",
                        lg: "400px",
                      },
                      mx: { xs: "auto", md: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1.5, sm: 2 },
                        mb: { xs: 3, sm: 4 },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 40, sm: 45, md: 48, lg: 56 },
                          height: { xs: 40, sm: 45, md: 48, lg: 56 },
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#667eea",
                          position: "relative",
                          flexShrink: 0,
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            inset: { xs: "-2px", sm: "-3px", md: "-4px" },
                            borderRadius: "50%",
                            border: "2px solid rgba(102, 126, 234, 0.2)",
                            animation: isDesktop ? "pulse 2s infinite" : "none",
                          },
                        }}
                      >
                        <Business
                          sx={{
                            fontSize: { xs: 20, sm: 22, md: 24, lg: 28 },
                          }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color="grey.900"
                          sx={{
                            fontSize: {
                              xs: "1rem",
                              sm: "1.1rem",
                              md: "1.2rem",
                            },
                            lineHeight: 1.3,
                          }}
                        >
                          Contact & Hours
                        </Typography>
                        <Typography
                          variant="body2"
                          color="grey.600"
                          sx={{
                            fontSize: getFontSize.body2,
                            mt: 0.5,
                          }}
                        >
                          Connect instantly or check availability
                        </Typography>
                      </Box>
                    </Box>

                    {/* Response Time Section */}
                    <Box
                      sx={{
                        mb: { xs: 3, sm: 4 },
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                        background:
                          "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                        border: "1px solid",
                        borderColor: "grey.100",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "space-between",
                          alignItems: { xs: "flex-start", sm: "center" },
                          gap: { xs: 1, sm: 0 },
                          mb: { xs: 1, sm: 1.5 },
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="grey.700"
                          sx={{ fontSize: getFontSize.body2 }}
                        >
                          Response Performance
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: { xs: 6, sm: 7, md: 8 },
                              height: { xs: 6, sm: 7, md: 8 },
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #10b981, #34d399)",
                              animation: isDesktop
                                ? "pulse-small 2s infinite"
                                : "none",
                            }}
                          />
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            color="success.dark"
                            sx={{ fontSize: getFontSize.body2 }}
                          >
                            85% within 2h
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          height: { xs: 4, sm: 5, md: 6 },
                          bgcolor: "grey.200",
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            width: "85%",
                            background:
                              "linear-gradient(90deg, #10b981, #34d399)",
                            borderRadius: 3,
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                              animation: isDesktop
                                ? "shimmer 2s infinite"
                                : "none",
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Contact Actions Grid */}
                    <Grid
                      container
                      spacing={{ xs: 1.5, sm: 2 }}
                      sx={{ mb: { xs: 3, sm: 4 } }}
                    >
                      <Grid item xs={12} sm={6}>
                        <Box
                          onClick={() =>
                            (window.location.href = "tel:+91 6289534780")
                          }
                          sx={{
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: { xs: 2, sm: 2.5 },
                            border: "1px solid",
                            borderColor: "grey.200",
                            background: "white",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            "&:hover": {
                              borderColor: "#3b82f6",
                              background:
                                "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                              transform: isDesktop
                                ? "translateY(-2px)"
                                : "translateY(-1px)",
                              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 32, sm: 36, md: 40 },
                              height: { xs: 32, sm: 36, md: 40 },
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mb: { xs: 1, sm: 1.5 },
                            }}
                          >
                            <Phone
                              sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="grey.900"
                            sx={{ fontSize: getFontSize.body2 }}
                          >
                            Call Now
                          </Typography>
                          <Typography
                            variant="caption"
                            color="grey.600"
                            sx={{
                              mt: 0.5,
                              fontSize: getFontSize.caption,
                              wordBreak: "break-word",
                            }}
                          >
                            +91 62895 34780
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          onClick={() =>
                            (window.location.href = "mailto:contact@myeapl.com")
                          }
                          sx={{
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: { xs: 2, sm: 2.5 },
                            border: "1px solid",
                            borderColor: "grey.200",
                            background: "white",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            "&:hover": {
                              borderColor: "#8b5cf6",
                              background:
                                "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
                              transform: isDesktop
                                ? "translateY(-2px)"
                                : "translateY(-1px)",
                              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 32, sm: 36, md: 40 },
                              height: { xs: 32, sm: 36, md: 40 },
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mb: { xs: 1, sm: 1.5 },
                            }}
                          >
                            <Email
                              sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="grey.900"
                            sx={{ fontSize: getFontSize.body2 }}
                          >
                            Email Us
                          </Typography>
                          <Typography
                            variant="caption"
                            color="grey.600"
                            sx={{
                              mt: 0.5,
                              fontSize: getFontSize.caption,
                              wordBreak: "break-all",
                            }}
                          >
                            contact@myeapl.com
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Office Hours Section */}
                    <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: { xs: 2, sm: 3 },
                        }}
                      >
                        <Schedule
                          sx={{
                            color: "grey.500",
                            fontSize: { xs: 18, sm: 20, md: 22 },
                          }}
                        />
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="grey.700"
                          sx={{ fontSize: getFontSize.body1 }}
                        >
                          Office Hours
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          flexWrap: { sm: "wrap" },
                          gap: { xs: 1.5, sm: 2 },
                        }}
                      >
                        {[
                          {
                            day: "Mon - Fri",
                            time: "10:30AM - 7:30PM",
                            status: "Open",
                            color: "#10b981",
                            bgColor: "#d1fae5",
                          },
                          {
                            day: "Saturday",
                            time: "10:00AM - 4:00PM",
                            status: "Limited",
                            color: "#f59e0b",
                            bgColor: "#fef3c7",
                          },
                          {
                            day: "Sunday",
                            time: "Closed",
                            status: "Closed",
                            color: "#6b7280",
                            bgColor: "#f3f4f6",
                          },
                        ].map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              flex: { xs: "none", sm: 1 },
                              display: "flex",
                              flexDirection: { xs: "row", sm: "column" },
                              alignItems: { xs: "center", sm: "flex-start" },
                              justifyContent: "space-between",
                              p: { xs: 1.5, sm: 2 },
                              borderRadius: { xs: 2, sm: 2.5 },
                              background: item.bgColor,
                              border: "1px solid",
                              borderColor: `${item.color}20`,
                              transition: "all 0.3s ease",
                              minWidth: { sm: 0 },
                              "&:hover": {
                                transform: isDesktop
                                  ? "translateY(-2px)"
                                  : "translateX(2px)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                flex: { xs: 1, sm: "none" },
                                mb: { sm: 1 },
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                color="grey.900"
                                sx={{
                                  fontSize: getFontSize.body2,
                                  mb: { sm: 0.5 },
                                }}
                              >
                                {item.day}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="grey.600"
                                sx={{
                                  fontSize: getFontSize.caption,
                                  display: "block",
                                }}
                              >
                                {item.time}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                px: { xs: 1, sm: 1.5 },
                                py: { xs: 0.25, sm: 0.5 },
                                borderRadius: "20px",
                                background: item.bgColor,
                                border: `1px solid ${item.color}40`,
                                flexShrink: 0,
                                mt: { xs: 0, sm: "auto" },
                              }}
                            >
                              <Typography
                                variant="caption"
                                fontWeight={600}
                                sx={{
                                  color: item.color,
                                  fontSize: getFontSize.caption,
                                }}
                              >
                                {item.status}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Send a Message Section - Using ContactForm component */}
      <ContactForm
        onSubmit={handleFormSubmit}
        variant="full"
        showHeader={true}
        // onSuccess={() => {
        //   console.log("Form submitted successfully");
        // }}
        onError={(error) => {
          setError(error);
        }}
      />

      {/* Why Choose Us Section */}
      <Box
        sx={{
          py: { xs: 6, sm: 8, md: 10, lg: 12 },
          px: { xs: 2, sm: 3, md: 4 },
          bgcolor: "#f8fafc",
        }}
      >
        <Container maxWidth={containerMaxWidth}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 2, sm: 2.5, md: 3 },
                }}
              >
                {/* Response Time & Features */}
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 3.5, lg: 4 },
                    borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
                    background: "white",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="#1e293b"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
                      mb: { xs: 2.5, sm: 3, md: 3.5 },
                    }}
                  >
                    Why Choose Us
                  </Typography>

                  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                    {[
                      {
                        icon: <AccessTime sx={{ color: "#3b82f6" }} />,
                        title: "Fast Response Time",
                        description:
                          "85% of inquiries answered within 2 business hours",
                        color: "#3b82f6",
                        bgColor: "#eff6ff",
                      },
                      {
                        icon: <Verified sx={{ color: "#10b981" }} />,
                        title: "Expert Support",
                        description:
                          "Dedicated team with 10+ years of industry experience",
                        color: "#10b981",
                        bgColor: "#f0fdf4",
                      },
                      {
                        icon: <Security sx={{ color: "#8b5cf6" }} />,
                        title: "Secure & Private",
                        description:
                          "Your information is protected with enterprise-grade security",
                        color: "#8b5cf6",
                        bgColor: "#f5f3ff",
                      },
                      {
                        icon: <SupportAgent sx={{ color: "#f59e0b" }} />,
                        title: "24/7 Support",
                        description:
                          "Emergency support available round the clock",
                        color: "#f59e0b",
                        bgColor: "#fffbeb",
                      },
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 1.5, sm: 2 },
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: { xs: 2, sm: 2.5 },
                            background: item.bgColor,
                            border: `1px solid ${item.color}20`,
                            transition: "all 0.3s ease",
                            height: "100%",
                            "&:hover": {
                              transform: isDesktop ? "translateX(4px)" : "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 36, sm: 40 },
                              height: { xs: 36, sm: 40 },
                              borderRadius: "50%",
                              background: `${item.color}15`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {React.cloneElement(item.icon, {
                              sx: { fontSize: { xs: 18, sm: 20, md: 22 } },
                            })}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="#1e293b"
                              sx={{ fontSize: getFontSize.body2 }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="#64748b"
                              sx={{ fontSize: getFontSize.caption }}
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            maxWidth: { xs: "90vw", sm: 400, md: 450 },
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
            },
          }}
          icon={false}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              <Box
                sx={{
                  width: { xs: 36, sm: 40, md: 44 },
                  height: { xs: 36, sm: 40, md: 44 },
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  animation: isDesktop ? "pulse 2s infinite" : "none",
                }}
              >
                <CheckCircle sx={{ fontSize: { xs: 22, sm: 24, md: 28 } }} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    color: "white",
                    mb: 0.5,
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  }}
                >
                  ✨ Message sent successfully!
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.5,
                    fontSize: getFontSize.body2,
                  }}
                >
                  We'll get back to you soon. Thank you for reaching out!
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 1.5 },
                    mt: { xs: 1, sm: 1.5 },
                    pt: { xs: 1, sm: 1.5 },
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTime
                      sx={{ fontSize: { xs: 14, sm: 16 }, opacity: 0.8 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.8,
                        fontSize: getFontSize.caption,
                      }}
                    >
                      Response within 2h
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Verified
                      sx={{ fontSize: { xs: 14, sm: 16 }, opacity: 0.8 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.8,
                        fontSize: getFontSize.caption,
                      }}
                    >
                      Confirmation sent
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Alert>
      </Snackbar>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          @keyframes pulse-small {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes bounce {
            0%, 100% { transform: rotate(-45deg) translateY(0); }
            50% { transform: rotate(-45deg) translateY(-10px); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </Box>
  );
};

export default Contact;
