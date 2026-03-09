import {
  Chat,
  CheckCircle,
  Description,
  Email,
  Person,
  Phone,
  Send,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Fade,
  Grid,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendUserDetailsToManager } from "../../services/AppConfigAction";
import contact_image from "../../assets/images/sendmessage.avif"; // change path
// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const ContactForm = ({
  onSubmit,
  initialValues = {},
  showHeader = true,
  customHeader,
  variant = "default", // 'default', 'compact', 'full'
  onSuccess,
  onError,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    email: initialValues.email || "",
    phone: initialValues.phone || "",
    subject: initialValues.subject || "",
    message: initialValues.message || "",
    department: initialValues.department || "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Function to reset form fields to empty
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      department: "",
    });
  };

  // Responsive configuration
  const responsive = {
    // Padding
    paperPadding: {
      default: { xs: 3, sm: 4, md: 5, lg: 6 },
      compact: { xs: 2, sm: 2.5, md: 3 },
      full: { xs: 4, sm: 5, md: 6, lg: 7 },
    },
    // Typography
    titleSize: {
      default: { xs: "1.5rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
      compact: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" },
      full: { xs: "1.8rem", sm: "2rem", md: "2.2rem", lg: "2.5rem" },
    },
    subtitleSize: {
      default: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
      compact: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
      full: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
    },
    // Spacing
    spacing: {
      default: { xs: 2, sm: 2.5, md: 3 },
      compact: { xs: 1.5, sm: 2, md: 2.5 },
      full: { xs: 2.5, sm: 3, md: 3.5, lg: 4 },
    },
    // Button
    buttonHeight: {
      default: { xs: 48, sm: 52, md: 56 },
      compact: { xs: 40, sm: 44, md: 48 },
      full: { xs: 52, sm: 56, md: 60 },
    },
    buttonFontSize: {
      default: { xs: "0.9rem", sm: "0.95rem", md: "1rem" },
      compact: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
      full: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
    },
    // Icons
    iconSize: {
      default: { xs: 18, sm: 20, md: 22 },
      compact: { xs: 16, sm: 18, md: 20 },
      full: { xs: 20, sm: 22, md: 24 },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject?.trim()) newErrors.subject = "Subject is required";
    if (!formData.message?.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      source: "website_contact_form",
      submittedAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      setError(null);

      // If custom onSubmit is provided, use it
      if (onSubmit) {
        await onSubmit(payload);
        setSuccess(true);
        setShowSuccessMessage(true);
        resetForm(); // Clear form fields

        // Call onSuccess callback if provided
        if (onSuccess) onSuccess(payload);
      } else {
        // Default submission using Redux action
        const result = await dispatch(sendUserDetailsToManager(payload));

        if (
          result?.type === "USER_DETAILS_FETCH_SUCCESS" &&
          result?.payload?.success
        ) {
          setSuccess(true);
          setShowSuccessMessage(true);

          resetForm(); // Clear form fields

          // Call onSuccess callback if provided
          if (onSuccess) onSuccess(result);

          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 5000);
        } else {
          const errorMsg = result?.payload?.message || "Submission failed";
          setError(errorMsg);
          if (onError) onError(errorMsg);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMsg = error.message || "Failed to submit contact form";
      setError(errorMsg);
      if (onError) onError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: { xs: 2, sm: 2.5, md: 3 },
      backgroundColor: "rgba(248, 250, 252, 0.8)",
      border: "1px solid #E2E8F0",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        backgroundColor: "#FFFFFF",
        borderColor: "#94A3B8",
        boxShadow: "0 2px 8px rgba(148, 163, 184, 0.1)",
      },
      "&.Mui-focused": {
        backgroundColor: "#FFFFFF",
        borderColor: "#3B82F6",
        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#64748B",
      fontWeight: 500,
      fontSize: responsive.subtitleSize[variant],
    },
    "& .MuiFormHelperText-root": {
      color: "#94A3B8",
      fontSize: { xs: "0.7rem", sm: "0.75rem" },
      marginLeft: 0,
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        mt: { xs: 8, sm: 10, md: 12 },
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        background:
          "linear-gradient(135deg, #D4C9BE 0%, #124a58 50%, #04395c 100%)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)",
        },
      }}
    >
      <Container maxWidth="xl">
        <Fade in={true} timeout={1000}>
          <Box>
            <Grid
              container
              // spacing={{ xs: 3, sm: 4, md: 5 }}
              alignItems="stretch"
            >
              {/* left Column: Image Section */}
              <Grid
                item
                xs={12}
                md={4}
                lg={5}
                sx={{
                  display: { xs: "block", md: "flex" },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 280, sm: 350, md: "100%" },
                    minHeight: { md: 520 },
                    borderRadius: { xs: 3, md: 4 },
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                    animation: `${fadeIn} 0.8s ease-out`,
                  }}
                >
                  {/* Background Image */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${contact_image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      transition: "transform 0.7s ease",
                      "&:hover": {
                        transform: "scale(1.06)",
                      },
                    }}
                  />

                  {/* Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.9) 100%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      p: { xs: 3, sm: 4 },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="white"
                      sx={{
                        fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.7rem" },
                        mb: 1,
                      }}
                    >
                      Let’s Build Something Amazing
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                        lineHeight: 1.7,
                      }}
                    >
                      Our experts are ready to understand your requirements and
                      deliver innovative digital solutions tailored to your
                      business.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* right Column: Contact Form */}
              <Grid item xs={12} sm={12} md={8} lg={7}>
                <Paper
                  elevation={0}
                  sx={{
                    width: "100%",
                    maxWidth: 720,
                    mx: "auto",
                    p: responsive.paperPadding[variant],
                    borderRadius: { xs: 3, sm: 3.5, md: 4 },
                    height: "100%",
                    background:
                      "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: `0 20px 40px rgba(0,0,0,0.08),
                   0 8px 16px rgba(0,0,0,0.04),
                   inset 0 1px 0 rgba(255,255,255,0.9)`,
                    position: "relative",
                    overflow: "hidden",
                    backdropFilter: "blur(10px)",
                    animation: `${fadeIn} 0.6s ease-out`,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: { xs: "4px", sm: "5px" },
                      background:
                        "linear-gradient(90deg, #3B82F6 0%, #083de9 50%, #0F172A 100%)",
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: { xs: "80px", sm: "100px", md: "120px" },
                      height: { xs: "80px", sm: "100px", md: "120px" },
                      background:
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
                      borderTopLeftRadius: "50%",
                    },
                  }}
                >
                  {/* Header Section */}
                  {showHeader && (
                    <Box
                      sx={{
                        mb: responsive.spacing[variant],
                        position: "relative",
                        zIndex: 1,
                        textAlign: variant === "compact" ? "center" : "left",
                      }}
                    >
                      {customHeader || (
                        <>
                          <Typography
                            variant={isMobile ? "h5" : "h4"}
                            fontWeight={700}
                            // color= "#1a237e"
                            gutterBottom
                            sx={{
                              fontSize: responsive.titleSize[variant],
                              background:
                                "linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                              color: "#1a237e",
                            }}
                          >
                            Send a Message
                          </Typography>
                          <Typography
                            variant="body1"
                            color="#475569"
                            sx={{
                              lineHeight: 1.7,
                              fontSize: responsive.subtitleSize[variant],
                            }}
                          >
                            Complete the form below and our dedicated team will
                            respond to your inquiry within 24 business hours.
                          </Typography>
                        </>
                      )}
                    </Box>
                  )}

                  {/* Error Alert */}
                  {error && (
                    <Alert
                      severity="error"
                      sx={{
                        mb: responsive.spacing[variant],
                        borderRadius: 2,
                        animation: `${fadeIn} 0.3s ease-out`,
                      }}
                      onClose={() => setError(null)}
                    >
                      {error}
                    </Alert>
                  )}

                  {/* Success Message */}
                  <Collapse in={showSuccessMessage}>
                    <Box
                      sx={{
                        mb: responsive.spacing[variant],
                        p: { xs: 2, sm: 2.5, md: 3 },
                        borderRadius: 3,
                        background:
                          "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                        backdropFilter: "blur(10px)",
                        textAlign: "center",
                        animation: `${fadeIn} 0.6s ease-out`,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: { xs: 1, sm: 2 },
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            animation: `${pulse} 2s infinite`,
                          }}
                        >
                          <CheckCircle
                            sx={{
                              color: "#10B981",
                              fontSize: { xs: 24, sm: 28 },
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          color="#065F46"
                          sx={{
                            fontSize: {
                              xs: "1rem",
                              sm: "1.1rem",
                              md: "1.25rem",
                            },
                          }}
                        >
                          Message Sent Successfully!
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="#047857"
                        sx={{
                          maxWidth: "600px",
                          mx: "auto",
                          lineHeight: 1.7,
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        }}
                      >
                        Thank you for reaching out. We've received your message
                        and our team will review your inquiry. You can expect a
                        response within 24 business hours.
                      </Typography>
                    </Box>
                  </Collapse>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={responsive.spacing[variant]}>
                      {/* Name Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          name="name"
                          label="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          sx={textFieldStyles}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person
                                  sx={{
                                    color: "#8a2605",
                                    fontSize: responsive.iconSize[variant],
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Email Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          name="email"
                          type="email"
                          label="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          sx={textFieldStyles}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email
                                  sx={{
                                    color: "#0964e2",
                                    fontSize: responsive.iconSize[variant],
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Phone Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          helperText="Optional"
                          sx={textFieldStyles}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone
                                  sx={{
                                    color: "#bb0ed2",
                                    fontSize: responsive.iconSize[variant],
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Subject Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          name="subject"
                          label="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          sx={textFieldStyles}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Description
                                  sx={{
                                    color: "#09b209",
                                    fontSize: responsive.iconSize[variant],
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Message Field */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          name="message"
                          label="Your Message"
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          multiline
                          rows={variant === "compact" ? 3 : 5}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          sx={textFieldStyles}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{ alignItems: "flex-start", mt: 1.5 }}
                              >
                                <Chat
                                  sx={{
                                    color: "#4c079b",
                                    fontSize: responsive.iconSize[variant],
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Submit Button */}
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size={isMobile ? "medium" : "large"}
                          fullWidth
                          disabled={submitting}
                          sx={{
                            height: responsive.buttonHeight[variant],
                            borderRadius: { xs: 2, sm: 2.5, md: 3 },
                            background:
                              "linear-gradient(135deg, #D4C9BE 0%, #1E40AF 100%)",
                            fontWeight: 600,
                            fontSize: responsive.buttonFontSize[variant],
                            textTransform: "none",
                            letterSpacing: "0.01em",
                            boxShadow: `
                  0 4px 20px rgba(59, 130, 246, 0.25),
                  0 2px 8px rgba(59, 130, 246, 0.2)
                `,
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: "-100%",
                              width: "100%",
                              height: "100%",
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                              transition: "left 0.7s ease",
                            },
                            "&:hover:not(:disabled)": {
                              transform: "translateY(-2px)",
                              boxShadow: `
                    0 8px 30px rgba(59, 130, 246, 0.35),
                    0 4px 12px rgba(59, 130, 246, 0.25)
                  `,
                              background:
                                "linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)",
                              "&::before": {
                                left: "100%",
                              },
                            },
                            "&:active:not(:disabled)": {
                              transform: "translateY(0)",
                              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                            },
                            "&.Mui-disabled": {
                              background:
                                "linear-gradient(135deg, #94A3B8 0%, #64748B 100%)",
                              opacity: 0.7,
                            },
                          }}
                          startIcon={
                            <Send
                              sx={{
                                fontSize: {
                                  xs: responsive.iconSize[variant] - 2,
                                  sm: responsive.iconSize[variant],
                                },
                              }}
                            />
                          }
                        >
                          {submitting ? "Sending..." : "Send Message"}
                        </Button>
                      </Grid>

                      {/* Privacy Note */}
                      {variant !== "compact" && (
                        <Grid item xs={12}>
                          <Typography
                            variant="caption"
                            color="#64748B"
                            align="center"
                            sx={{
                              display: "block",
                              mt: 1,
                              lineHeight: 1.6,
                              fontSize: {
                                xs: "0.7rem",
                                sm: "0.75rem",
                                md: "0.8rem",
                              },
                            }}
                          >
                            By submitting this form, you acknowledge and agree
                            to our{" "}
                            <Link
                              href="/privacy"
                              color="primary"
                              sx={{
                                textDecoration: "none",
                                fontWeight: 600,
                                color: "#3B82F6",
                                borderBottom: "1px solid transparent",
                                transition: "border-color 0.2s",
                                "&:hover": {
                                  borderBottomColor: "#3B82F6",
                                },
                              }}
                            >
                              Privacy Policy
                            </Link>{" "}
                            and consent to being contacted regarding your
                            inquiry.
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default ContactForm;
