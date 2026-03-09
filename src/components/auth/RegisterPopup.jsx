import {
  ArrowBack,
  Business,
  CheckCircle,
  Close,
  Email,
  Lock,
  Person,
  Phone,
  TimerOutlined,
  VerifiedUser,
  Visibility,
  VisibilityOff,
  Security,
  WorkspacePremium,
  RocketLaunch,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
  alpha,
  Avatar,
  Card,
  CardMedia,
  Fade,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  newEmployeeRegistration,
  resendOTPnewEmployeeRegistration,
  verifyingOtp,
} from "../../services/AppConfigAction";

// For now, we'll use SVG data URIs as fallbacks
const registerIllustration =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23f0f7ff'/%3E%3Cpath d='M70 80 L130 80 L130 120 L70 120 Z' fill='%232196f3' opacity='0.2'/%3E%3Ccircle cx='100' cy='90' r='15' fill='%232196f3'/%3E%3Crect x='90' y='110' width='20' height='30' fill='%232196f3' opacity='0.8'/%3E%3C/svg%3E";
const emailVerification =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23fff3e0'/%3E%3Crect x='60' y='70' width='80' height='60' rx='8' fill='%23ff9800' opacity='0.2'/%3E%3Cpath d='M60 70 L100 100 L140 70' stroke='%23ff9800' stroke-width='4' fill='none'/%3E%3Ccircle cx='100' cy='100' r='20' fill='%23ff9800'/%3E%3C/svg%3E";
const successAnimation =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23e8f5e9'/%3E%3Ccircle cx='100' cy='100' r='50' fill='%234caf50' opacity='0.2'/%3E%3Cpath d='M70 100 L95 125 L130 75' stroke='%234caf50' stroke-width='8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E";
const companyLogo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232196f3'/%3E%3Ctext x='50' y='65' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3EEA%3C/text%3E%3C/svg%3E";

const RegisterPopup = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Steps for registration process
  const steps = ["Registration Details", "Email Verification", "Complete"];
  const [activeStep, setActiveStep] = useState(0);

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [verificationData, setVerificationData] = useState({
    otp: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [verificationErrors, setVerificationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // API responses
  const [apiResponse, setApiResponse] = useState({
    success: false,
    message: "",
    type: null,
  });

  // OTP timer and storage
  const [otpTimer, setOtpTimer] = useState(0);
  // const [canResendOTP, setCanResendOTP] = useState(true);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  // const [storedOTP, setStoredOTP] = useState("");
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const [registeredEmployeeId, setRegisteredEmployeeId] = useState(null);
  const MAX_ATTEMPTS = 3;

  // Loading states
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Responsive font sizes
  const getFontSize = {
    h4: { xs: "1.3rem", sm: "1.5rem", md: "1.7rem", lg: "2rem" },
    h5: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem", lg: "1.5rem" },
    h6: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
    body1: { xs: "0.85rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
    body2: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem", lg: "0.95rem" },
    caption: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem", lg: "0.8rem" },
  };

  // Reset everything when dialog opens
  useEffect(() => {
    if (open) {
      setActiveStep(0);
      setErrors({});
      setVerificationErrors({});
      setApiResponse({
        success: false,
        message: "",
        type: null,
      });
      setOtpTimer(0);
      // setCanResendOTP(true);
      // setStoredOTP("");
      setVerificationAttempts(0);
      setIsRegistering(false);
      setIsVerifying(false);
      setIsResendingOTP(false);
    }
  }, [open]);

  // OTP Timer Effect
  useEffect(() => {
    if (otpTimer <= 0) return;

    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpTimer]);

  const startOTPTimer = () => {
    setOtpTimer(180);
    // setCanResendOTP(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Form validations (unchanged)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      formData.phone &&
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and numbers";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    return newErrors;
  };

  const validateOTP = () => {
    const newErrors = {};
    if (!verificationData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(verificationData.otp)) {
      newErrors.otp = "OTP must be 6 digits";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiResponse.message) {
      setApiResponse({ success: false, message: "", type: null });
    }
  };

  const handleOTPChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setVerificationData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));

    if (verificationErrors[name]) {
      setVerificationErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // if (numericValue.length === 6 && storedOTP) {
    //   setTimeout(() => handleVerifyOTP(), 100);
    // }
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();

    setApiResponse({ success: false, message: "", type: null });
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const registrationPayload = {
      employeeId: 0,
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      company: formData.company,
      phone:
        formData.phone && formData.phone.trim() !== ""
          ? formData.phone.replace(/\D/g, "")
          : null,
      currentPassword: formData.password,
      newPassword: formData.password,
    };

    setIsRegistering(true);
    setApiResponse({ success: false, message: "", type: null });

    try {
      const result = await dispatch(
        newEmployeeRegistration(registrationPayload),
      );

      if (result.payload) {
        if (result.payload.success === true) {
          // let receivedOTP = "";

          if (result.payload.dataList && result.payload.dataList[0]) {
            const empId = result.payload.dataList[0];
            setRegisteredEmployeeId(empId);
          }

          // if (receivedOTP) {
          //   setStoredOTP(receivedOTP);
          // } else {
          //   const demoOTP = Math.floor(
          //     100000 + Math.random() * 900000,
          //   ).toString();
          //   setStoredOTP(demoOTP);
          // }

          setVerificationData((prev) => ({
            ...prev,
            email: formData.email,
          }));

          setApiResponse({
            success: true,
            message:
              result.payload.message ||
              "Registration successful! Please check your email for OTP.",
            type: "OTP_SENT",
          });

          setActiveStep(1);
          startOTPTimer();

          // if (storedOTP) {
          //   setTimeout(() => {
          //     setVerificationData((prev) => ({
          //       ...prev,
          //       otp: storedOTP,
          //     }));
          //   }, 500);
          // }
        } else {
          setApiResponse({
            success: false,
            message:
              result.payload.message ||
              "Registration failed. Please try again.",
            type: null,
          });
        }
      } else if (result.error) {
        setApiResponse({
          success: false,
          message:
            result.error.message || "Registration failed. Please try again.",
          type: null,
        });
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: error.message || "An unexpected error occurred.",
        type: null,
      });
    } finally {
      setIsRegistering(false);
    }
  };

  // const handleVerifyOTPTest = () => {
  //   const validationErrors = validateOTP();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setVerificationErrors(validationErrors);
  //     return;
  //   }

  //   if (verificationAttempts >= MAX_ATTEMPTS) {
  //     setApiResponse({
  //       success: false,
  //       message: `Maximum verification attempts (${MAX_ATTEMPTS}) exceeded. Please resend OTP.`,
  //       type: null,
  //     });
  //     setVerificationErrors({ otp: "Maximum attempts exceeded" });
  //     return;
  //   }

  //   if (otpTimer <= 0 && storedOTP) {
  //     setApiResponse({
  //       success: false,
  //       message: "OTP has expired. Please resend a new code.",
  //       type: null,
  //     });
  //     setVerificationErrors({ otp: "OTP expired" });
  //     // setStoredOTP("");
  //     // setCanResendOTP(true);
  //     return;
  //   }

  //   // if (!storedOTP) {
  //   //   setApiResponse({
  //   //     success: false,
  //   //     message: "No OTP found. Please resend OTP.",
  //   //     type: null,
  //   //   });
  //   //   setVerificationErrors({ otp: "OTP not found" });
  //   //   return;
  //   // }

  //   setVerificationAttempts((prev) => prev + 1);
  //   setIsVerifying(true);

  //   if (verificationData.otp === storedOTP) {
  //     setApiResponse({
  //       success: true,
  //       message: "Email verified successfully! Your account is now active.",
  //       type: "VERIFIED",
  //     });

  //     setStoredOTP("");
  //     setOtpTimer(0);
  //     setActiveStep(2);

  //     setTimeout(() => {
  //       handleClose();
  //       navigate("/login");
  //     }, 3000);
  //   } else {
  //     const remainingAttempts = MAX_ATTEMPTS - verificationAttempts;
  //     setVerificationErrors({ otp: "Invalid OTP" });
  //     setVerificationData((prev) => ({ ...prev, otp: "" }));

  //     if (remainingAttempts <= 0) {
  //       setTimeout(() => {
  //         setApiResponse({
  //           success: false,
  //           message:
  //             "Too many failed attempts. Please resend OTP to try again.",
  //           type: null,
  //         });
  //       }, 1000);
  //     }
  //   }

  //   setIsVerifying(false);
  // };

  const handleVerifyOTP = async () => {
    const validationErrors = validateOTP();
    if (Object.keys(validationErrors).length > 0) {
      setVerificationErrors(validationErrors);
      return;
    }

    if (!registeredEmployeeId) {
      setApiResponse({
        success: false,
        message: "Session expired. Please register again.",
        type: null,
      });
      return;
    }

    setIsVerifying(true);

    try {
      const result = await dispatch(
        verifyingOtp({
          employeeId: registeredEmployeeId,
          otp: verificationData.otp,
          otpType: "REG_EMAIL_VERIFICATION",
        }),
      );

      if (result?.payload?.success) {
        setApiResponse({
          success: true,
          message: result.payload.message,
          type: "VERIFIED",
        });

        setActiveStep(2);

        setTimeout(() => {
          handleClose();
          navigate("/login");
        }, 2000);
      } else {
        setVerificationErrors({
          otp: result?.payload?.message || "Invalid OTP",
        });

        setVerificationData((prev) => ({ ...prev, otp: "" }));
      }
    } catch (err) {
      setApiResponse({
        success: false,
        message: "Verification failed. Try again.",
        type: null,
      });
    }

    setIsVerifying(false);
  };

  // const handleResendOTPTest = async () => {
  //   // if (!canResendOTP) return;

  //   setIsResendingOTP(true);
  //   setApiResponse({ success: false, message: "", type: null });
  //   setVerificationErrors({});
  //   setVerificationData((prev) => ({ ...prev, otp: "" }));
  //   setVerificationAttempts(0);

  //   try {
  //     const result = await dispatch(
  //       resendOTPnewEmployeeRegistration({
  //         firstname: formData.firstName,
  //         email: verificationData.email || formData.email,
  //       }),
  //     );

  //     if (result.payload) {
  //       if (result.payload.success === true) {
  //         let newOTP = "";

  //         if (result.payload.dataList && result.payload.dataList[0]) {
  //           newOTP = result.payload.dataList[0];
  //         }

  //         if (newOTP) {
  //           setStoredOTP(newOTP);
  //         } else {
  //           const demoOTP = Math.floor(
  //             100000 + Math.random() * 900000,
  //           ).toString();
  //           setStoredOTP(demoOTP);
  //           newOTP = demoOTP;
  //         }

  //         setApiResponse({
  //           success: true,
  //           message:
  //             result.payload.message || "New OTP has been sent to your email.",
  //           type: "OTP_RESENT",
  //         });

  //         startOTPTimer();
  //       } else {
  //         setApiResponse({
  //           success: false,
  //           message:
  //             result.payload.message ||
  //             "Failed to resend OTP. Please try again.",
  //           type: null,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     setApiResponse({
  //       success: false,
  //       message: error.message || "Failed to resend OTP.",
  //       type: null,
  //     });
  //   } finally {
  //     setIsResendingOTP(false);
  //   }
  // };

  const handleResendOTP = async () => {
    if (otpTimer > 0) return;

    setIsResendingOTP(true);
    setApiResponse({ success: false, message: "", type: null });
    setVerificationErrors({});
    setVerificationData((prev) => ({ ...prev, otp: "" }));
    setVerificationAttempts(0);

    try {
      const result = await dispatch(
        resendOTPnewEmployeeRegistration({
          employeeId: registeredEmployeeId, // ✅ send employeeId
          email: verificationData.email || formData.email,
          firstname: formData.firstName,
        }),
      );

      if (result?.payload?.success) {
        setApiResponse({
          success: true,
          message:
            result.payload.message || "New OTP has been sent to your email.",
          type: "OTP_RESENT",
        });

        startOTPTimer();
      } else {
        setApiResponse({
          success: false,
          message:
            result?.payload?.message ||
            "Failed to resend OTP. Please try again.",
          type: null,
        });
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: error.message || "Failed to resend OTP.",
        type: null,
      });
    } finally {
      setIsResendingOTP(false);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
    setApiResponse({ success: false, message: "", type: null });
    setVerificationErrors({});
    setVerificationData({ otp: "", email: "" });
    setVerificationAttempts(0);
    setIsVerifying(false);
  };

  const handleClose = () => {
    setActiveStep(0);
    setErrors({});
    setVerificationErrors({});
    setApiResponse({
      success: false,
      message: "",
      type: null,
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    });
    setVerificationData({ otp: "", email: "" });
    setOtpTimer(0);
    // setCanResendOTP(true);
    // setStoredOTP("");
    setVerificationAttempts(0);
    setIsRegistering(false);
    setIsVerifying(false);
    setIsResendingOTP(false);
    onClose();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderRegistrationForm();
      case 1:
        return renderVerificationForm();
      case 2:
        return renderSuccessScreen();
      default:
        return null;
    }
  };

  const renderRegistrationForm = () => (
    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
      <Grid
        item
        xs={12}
        sx={{
          px: { xs: 1, sm: 2, md: 3 },
          maxHeight: { md: "60vh" },
          overflowY: { md: "auto" },
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: alpha(theme.palette.primary.main, 0.05),
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: alpha(theme.palette.primary.main, 0.2),
            borderRadius: "10px",
            "&:hover": {
              background: alpha(theme.palette.primary.main, 0.3),
            },
          },
        }}
      >
        {/* API Error Alert */}
        {apiResponse.message && !apiResponse.success && (
          <Alert
            severity="error"
            sx={{
              mb: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: { xs: 1.5, sm: 2 },
              fontSize: getFontSize.body2,
            }}
            variant="filled"
          >
            {apiResponse.message}
          </Alert>
        )}

        <form onSubmit={handleSubmitRegistration}>
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {/* ===== SECTION 1: PERSONAL INFORMATION ===== */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  bgcolor: alpha(theme.palette.primary.main, 0.02),
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                {/* Section Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 1.5 },
                    mb: { xs: 2, sm: 2.5 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 28, sm: 30, md: 32 },
                      height: { xs: 28, sm: 30, md: 32 },
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                    }}
                  >
                    <Person sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{ fontSize: getFontSize.body1 }}
                    >
                      Personal Information
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: getFontSize.caption }}
                    >
                      Tell us about yourself
                    </Typography>
                  </Box>
                </Box>

                {/* Form Fields */}
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      placeholder="John"
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      required
                      disabled={isRegistering || loading}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: getFontSize.caption,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      placeholder="Doe"
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      required
                      disabled={isRegistering || loading}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: getFontSize.caption,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* ===== SECTION 2: CONTACT INFORMATION ===== */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  bgcolor: alpha(theme.palette.info.main, 0.02),
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                }}
              >
                {/* Section Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 1.5 },
                    mb: { xs: 2, sm: 2.5 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 28, sm: 30, md: 32 },
                      height: { xs: 28, sm: 30, md: 32 },
                      bgcolor: theme.palette.info.main,
                      color: "white",
                    }}
                  >
                    <Email sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{ fontSize: getFontSize.body1 }}
                    >
                      Contact Information
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: getFontSize.caption }}
                    >
                      How to reach you
                    </Typography>
                  </Box>
                </Box>

                {/* Form Fields */}
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      placeholder="john.doe@company.com"
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      disabled={isRegistering || loading}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: getFontSize.caption,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 10);
                        handleChange({
                          target: { name: "phone", value: value },
                        });
                      }}
                      error={!!errors.phone}
                      helperText={errors.phone || "Optional"}
                      disabled={isRegistering || loading}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      placeholder="555-123-4567"
                      inputProps={{
                        maxLength: 10,
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: getFontSize.caption,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* ===== SECTION 3: COMPANY INFORMATION ===== */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  bgcolor: alpha(theme.palette.warning.main, 0.02),
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                }}
              >
                {/* Section Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 1.5 },
                    mb: { xs: 2, sm: 2.5 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 28, sm: 30, md: 32 },
                      height: { xs: 28, sm: 30, md: 32 },
                      bgcolor: theme.palette.warning.main,
                      color: "white",
                    }}
                  >
                    <Business sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{ fontSize: getFontSize.body1 }}
                    >
                      Company Information
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: getFontSize.caption }}
                    >
                      Where you work
                    </Typography>
                  </Box>
                </Box>

                {/* Form Fields */}
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      placeholder="Excellence Allegiance Pvt Ltd"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      error={!!errors.company}
                      helperText={errors.company}
                      required
                      disabled={isRegistering || loading}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: getFontSize.body2,
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: getFontSize.caption,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* ===== SECTION 4: SECURITY ===== */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  bgcolor: alpha(theme.palette.success.main, 0.02),
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                }}
              >
                {/* Section Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 1.5 },
                    mb: { xs: 2, sm: 2.5 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 28, sm: 30, md: 32 },
                      height: { xs: 28, sm: 30, md: 32 },
                      bgcolor: theme.palette.success.main,
                      color: "white",
                    }}
                  >
                    <Lock sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{ fontSize: getFontSize.body1 }}
                    >
                      Security
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: getFontSize.caption }}
                    >
                      Secure your account
                    </Typography>
                  </Box>
                </Box>

                {/* Form Fields */}
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={!!errors.password}
                      size={isMobile ? "small" : "medium"}
                    >
                      <InputLabel sx={{ fontSize: getFontSize.body2 }}>
                        Password *
                      </InputLabel>
                      <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        label="Password *"
                        required
                        disabled={isRegistering || loading}
                        sx={{
                          fontSize: getFontSize.body2,
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              disabled={isRegistering || loading}
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText sx={{ fontSize: getFontSize.caption }}>
                        {errors.password ||
                          "Min 8 chars with uppercase, lowercase & numbers"}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={!!errors.confirmPassword}
                      size={isMobile ? "small" : "medium"}
                    >
                      <InputLabel sx={{ fontSize: getFontSize.body2 }}>
                        Confirm Password *
                      </InputLabel>
                      <OutlinedInput
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password *"
                        required
                        disabled={isRegistering || loading}
                        sx={{
                          fontSize: getFontSize.body2,
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                              disabled={isRegistering || loading}
                              size="small"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {errors.confirmPassword && (
                        <FormHelperText
                          error
                          sx={{ fontSize: getFontSize.caption }}
                        >
                          {errors.confirmPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          mt: { xs: 1, sm: 1.5 },
                          p: { xs: 1, sm: 1.5 },
                          bgcolor: alpha(theme.palette.primary.main, 0.03),
                          borderRadius: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            fontWeight={500}
                            sx={{ fontSize: getFontSize.caption }}
                          >
                            Password strength:
                          </Typography>
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            sx={{
                              fontSize: getFontSize.caption,
                              color:
                                formData.password.length >= 8 &&
                                /[A-Z]/.test(formData.password) &&
                                /[a-z]/.test(formData.password) &&
                                /[0-9]/.test(formData.password)
                                  ? theme.palette.success.main
                                  : formData.password.length >= 4
                                    ? theme.palette.warning.main
                                    : theme.palette.error.main,
                            }}
                          >
                            {formData.password.length >= 8 &&
                            /[A-Z]/.test(formData.password) &&
                            /[a-z]/.test(formData.password) &&
                            /[0-9]/.test(formData.password)
                              ? "Strong"
                              : formData.password.length >= 4
                                ? "Medium"
                                : "Weak"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          {[1, 2, 3, 4].map((level) => (
                            <Box
                              key={level}
                              sx={{
                                flex: 1,
                                height: { xs: 4, sm: 5, md: 6 },
                                borderRadius: 1,
                                bgcolor:
                                  formData.password.length >= 8 &&
                                  /[A-Z]/.test(formData.password) &&
                                  /[a-z]/.test(formData.password) &&
                                  /[0-9]/.test(formData.password)
                                    ? level <= 4
                                      ? theme.palette.success.main
                                      : alpha(theme.palette.grey[400], 0.3)
                                    : formData.password.length >= 4
                                      ? level <= 2
                                        ? theme.palette.warning.main
                                        : alpha(theme.palette.grey[400], 0.3)
                                      : level <= 1
                                        ? theme.palette.error.main
                                        : alpha(theme.palette.grey[400], 0.3),
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>

            {/* ===== SECTION 5: TERMS & AGREEMENT ===== */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  bgcolor: alpha(theme.palette.grey[500], 0.02),
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  border: `1px solid ${alpha(theme.palette.grey[500], 0.1)}`,
                }}
              >
                <Box display="flex" alignItems="flex-start">
                  <Checkbox
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    disabled={isRegistering || loading}
                    required
                    size="small"
                    sx={{
                      p: 0,
                      mr: { xs: 1, sm: 1.5 },
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: getFontSize.body2,
                    }}
                  >
                    I agree to the{" "}
                    <Link
                      component={Link}
                      to="/terms"
                      onClick={handleClose}
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        fontWeight: 600,
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      component={Link}
                      to="/privacy"
                      onClick={handleClose}
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        fontWeight: 600,
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </Typography>
                </Box>
                {errors.acceptTerms && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      display: "block",
                      fontSize: getFontSize.caption,
                    }}
                  >
                    {errors.acceptTerms}
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* ===== ACTION BUTTONS ===== */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: { xs: 2, sm: 2 },
                  pt: { xs: 2, sm: 2.5 },
                }}
              >
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  disabled={isRegistering || loading}
                  fullWidth={isMobile}
                  sx={{
                    borderRadius: { xs: 1.5, sm: 2 },
                    px: { xs: 3, sm: 4 },
                    py: { xs: 0.8, sm: 1 },
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: getFontSize.body2,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.02),
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isRegistering || loading}
                  fullWidth={isMobile}
                  startIcon={
                    isRegistering ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : null
                  }
                  sx={{
                    minWidth: { xs: "100%", sm: 160 },
                    borderRadius: { xs: 1.5, sm: 2 },
                    px: { xs: 3, sm: 4 },
                    py: { xs: 0.8, sm: 1 },
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: getFontSize.body2,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.35)}`,
                    },
                  }}
                >
                  {isRegistering ? "Creating Account..." : "Create Account"}
                </Button>
              </Box>
            </Grid>

            {/* ===== LOGIN LINK ===== */}
            <Grid item xs={12} sx={{ mt: { xs: 1, sm: 2 } }}>
              <Divider
                sx={{
                  width: "100%",
                  "&::before, &::after": {
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    px: { xs: 1.5, sm: 2 },
                    fontWeight: 500,
                    fontSize: getFontSize.caption,
                  }}
                >
                  OR
                </Typography>
              </Divider>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  mt: { xs: 1.5, sm: 2 },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ fontSize: getFontSize.body2 }}
                >
                  Already have an account?{" "}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      handleClose();
                      navigate("/login");
                    }}
                    disabled={isRegistering || loading}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      p: 0,
                      minWidth: "auto",
                      fontSize: getFontSize.body2,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        background: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );

  const renderVerificationForm = () => (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.5, md: 3 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={8} lg={7}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            mb: { xs: 2, sm: 2.5, md: 3 },
            bgcolor: alpha(theme.palette.info.main, 0.08),
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.info.main,
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
          >
            <Email sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              fontWeight="600"
              sx={{ fontSize: getFontSize.body2 }}
            >
              Verification Email Sent
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: getFontSize.caption,
                wordBreak: "break-all",
              }}
            >
              To <strong>{verificationData.email}</strong>
            </Typography>
          </Box>
        </Paper>

        {apiResponse.message && (
          <Alert
            severity={apiResponse.success ? "success" : "error"}
            sx={{
              mb: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: { xs: 2, sm: 2.5 },
              fontSize: getFontSize.body2,
            }}
            onClose={() =>
              setApiResponse({ success: false, message: "", type: null })
            }
            variant={apiResponse.success ? "standard" : "filled"}
          >
            {apiResponse.message}
          </Alert>
        )}

        <Box textAlign="center" mb={{ xs: 2, sm: 2.5, md: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="600"
            sx={{ fontSize: getFontSize.h6 }}
          >
            Enter Verification Code
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: getFontSize.body2 }}
          >
            Please enter the 6-digit code sent to your email
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Verification Code"
              name="otp"
              value={verificationData.otp}
              onChange={handleOTPChange}
              error={!!verificationErrors.otp}
              helperText={
                verificationErrors.otp ||
                `${MAX_ATTEMPTS - verificationAttempts} attempts remaining`
              }
              placeholder="000000"
              disabled={
                verificationAttempts >= MAX_ATTEMPTS ||
                isVerifying ||
                isResendingOTP
              }
              size={isMobile ? "small" : "medium"}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                startAdornment: (
                  <InputAdornment position="start">
                    <VerifiedUser
                      fontSize={isMobile ? "small" : "medium"}
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </InputAdornment>
                ),
                sx: {
                  fontSize: { xs: "20px", sm: "24px", md: "28px" },
                  textAlign: "center",
                  letterSpacing: { xs: "6px", sm: "8px", md: "10px" },
                  fontFamily: "monospace",
                  borderRadius: { xs: 2, sm: 2.5 },
                  fontWeight: 600,
                  "& input": {
                    textAlign: "center",
                  },
                },
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: getFontSize.body2,
                },
                "& .MuiFormHelperText-root": {
                  fontSize: getFontSize.caption,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
              gap={{ xs: 1.5, sm: 2 }}
              sx={{
                p: { xs: 1.5, sm: 2 },
                bgcolor: alpha(theme.palette.warning.main, 0.05),
                borderRadius: { xs: 2, sm: 2.5 },
                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  justifyContent: { xs: "space-between", sm: "flex-start" },
                }}
              >
                <TimerOutlined
                  sx={{
                    mr: 1.5,
                    color:
                      otpTimer > 0
                        ? theme.palette.warning.main
                        : theme.palette.error.main,
                    fontSize: { xs: 20, sm: 22 },
                    animation:
                      otpTimer <= 30 && otpTimer > 0
                        ? "blink 1s infinite"
                        : "none",
                    "@keyframes blink": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.5 },
                    },
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ fontSize: getFontSize.body2 }}
                  >
                    Code expires in:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color={otpTimer > 0 ? "warning.main" : "error.main"}
                    sx={{
                      lineHeight: 1,
                      fontSize: getFontSize.h6,
                    }}
                  >
                    {otpTimer > 0 ? formatTime(otpTimer) : "Expired"}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size={isMobile ? "small" : "medium"}
                onClick={handleResendOTP}
                disabled={otpTimer > 0 || isResendingOTP || isVerifying}
                fullWidth={isMobile}
                startIcon={
                  isResendingOTP ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <Email />
                  )
                }
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: { xs: 2, sm: 2.5 },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.2 },
                  fontSize: getFontSize.body2,
                  bgcolor: theme.palette.warning.main,
                  "&:hover": {
                    bgcolor: theme.palette.warning.dark,
                  },
                  "&:disabled": {
                    bgcolor: alpha(theme.palette.warning.main, 0.3),
                  },
                }}
              >
                {isResendingOTP ? "Sending..." : "Resend Code"}
              </Button>
            </Box>
          </Grid>

          {verificationAttempts >= MAX_ATTEMPTS - 1 &&
            verificationAttempts < MAX_ATTEMPTS && (
              <Grid item xs={12}>
                <Alert
                  severity="warning"
                  sx={{
                    borderRadius: { xs: 2, sm: 2.5 },
                    fontSize: getFontSize.body2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: getFontSize.body2 }}
                  >
                    ⚠️ Only {MAX_ATTEMPTS - verificationAttempts} attempt(s)
                    left. After that, you'll need to request a new code.
                  </Typography>
                </Alert>
              </Grid>
            )}
        </Grid>

        <DialogActions
          sx={{
            px: 0,
            pt: { xs: 3, sm: 4 },
            pb: { xs: 1, sm: 2 },
            gap: { xs: 1, sm: 2 },
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          {/* <Button
            onClick={handleBack}
            variant="outlined"
            startIcon={<ArrowBack />}
            fullWidth={isMobile}
            disabled={isVerifying || isResendingOTP}
            sx={{
              borderRadius: { xs: 2, sm: 2.5 },
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.2 },
              textTransform: "none",
              fontWeight: 500,
              fontSize: getFontSize.body2,
              borderWidth: 2,
            }}
          >
            Back
          </Button> */}
          <Button
            onClick={handleVerifyOTP}
            variant="contained"
            color="primary"
            fullWidth={isMobile}
            disabled={
              isVerifying ||
              verificationData.otp.length !== 6 ||
              verificationAttempts >= MAX_ATTEMPTS ||
              isResendingOTP
            }
            startIcon={
              isVerifying ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <VerifiedUser />
              )
            }
            sx={{
              minWidth: { xs: "100%", sm: 140 },
              borderRadius: { xs: 2, sm: 2.5 },
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.2 },
              textTransform: "none",
              fontWeight: 600,
              fontSize: getFontSize.body2,
              boxShadow: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            }}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
        </DialogActions>
      </Grid>
    </Grid>
  );

  const renderSuccessScreen = () => (
    <Fade in={true} timeout={1000}>
      <Box textAlign="center" py={{ xs: 2, sm: 3, md: 4 }}>
        {/* Success animation */}
        <Box
          sx={{
            position: "relative",
            width: { xs: 80, sm: 100, md: 120 },
            height: { xs: 80, sm: 100, md: 120 },
            margin: "0 auto 24px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              bgcolor: alpha(theme.palette.success.main, 0.2),
              animation: isDesktop ? "ripple 2s infinite" : "none",
              "@keyframes ripple": {
                "0%": { transform: "scale(0.8)", opacity: 1 },
                "100%": { transform: "scale(1.5)", opacity: 0 },
              },
            }}
          />
          <Box
            component="img"
            src={successAnimation}
            alt="Success"
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 1,
              animation: "bounce 1s ease-in-out",
              "@keyframes bounce": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: { xs: 30, sm: 35, md: 40 },
              height: { xs: 30, sm: 35, md: 40 },
              borderRadius: "50%",
              bgcolor: theme.palette.success.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              boxShadow: `0 4px 8px ${alpha(theme.palette.success.main, 0.3)}`,
            }}
          >
            <CheckCircle
              sx={{ color: "white", fontSize: { xs: 18, sm: 20, md: 24 } }}
            />
          </Box>
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          fontWeight="700"
          color="success.main"
          sx={{ fontSize: getFontSize.h4 }}
        >
          Welcome Aboard!
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          fontWeight="500"
          sx={{ fontSize: getFontSize.h6 }}
        >
          {formData.firstName} {formData.lastName}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{
            fontSize: getFontSize.body1,
            maxWidth: { xs: 300, sm: 350, md: 400 },
            mx: "auto",
            mb: { xs: 2, sm: 2.5, md: 3 },
            px: { xs: 2, sm: 0 },
          }}
        >
          {apiResponse.message ||
            "Your email has been successfully verified! Your account is now ready for activation."}
        </Typography>

        {/* Summary card */}
        <Card
          sx={{
            maxWidth: { xs: 300, sm: 350 },
            mx: "auto",
            mb: { xs: 3, sm: 4 },
            p: { xs: 1.5, sm: 2 },
            bgcolor: alpha(theme.palette.primary.main, 0.03),
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ fontSize: getFontSize.caption }}
              >
                Email
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                noWrap
                sx={{ fontSize: getFontSize.body2 }}
              >
                {formData.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ fontSize: getFontSize.caption }}
              >
                Company
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                noWrap
                sx={{ fontSize: getFontSize.body2 }}
              >
                {formData.company}
              </Typography>
            </Grid>
          </Grid>
        </Card>

        <Box
          sx={{ mt: { xs: 2, sm: 2.5, md: 3 }, mb: { xs: 2, sm: 2.5, md: 3 } }}
        >
          <CircularProgress
            size={isMobile ? 24 : 30}
            sx={{
              color: theme.palette.primary.main,
              animation: isDesktop ? "pulse 1.5s ease-in-out infinite" : "none",
            }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: getFontSize.body2 }}
        >
          Redirecting to login page in a few seconds...
        </Typography>

        <DialogActions
          sx={{
            justifyContent: "center",
            pt: { xs: 2, sm: 3 },
            gap: { xs: 1.5, sm: 2 },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
            onClick={() => {
              handleClose();
              navigate("/login");
            }}
            sx={{
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              px: { xs: 4, sm: 5 },
              py: { xs: 1, sm: 1.2, md: 1.5 },
              textTransform: "none",
              fontWeight: 600,
              fontSize: getFontSize.body1,
              boxShadow: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            Go to Login Now
          </Button>
        </DialogActions>
      </Box>
    </Fade>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3, md: 4 },
          boxShadow: `0 25px 50px ${alpha(theme.palette.common.black, 0.25)}`,
          overflow: "auto",
          height: { xs: "100%", sm: "auto" },
          margin: { xs: 0, sm: 2 },
        },
      }}
    >
      <DialogTitle
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          pb: { xs: 1, sm: 1.5, md: 2 },
          background: `linear-gradient(45deg, #0e556b, #448392)`,
          color: "white",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              sx={{
                bgcolor: "transparent",
                width: { xs: 32, sm: 36, md: 40 },
                height: { xs: 32, sm: 36, md: 40 },
              }}
            >
              {activeStep === 0 ? (
                <Person
                  sx={{ fontSize: { xs: "30px", sm: "40px", md: "50px" } }}
                />
              ) : activeStep === 1 ? (
                <Email
                  sx={{ fontSize: { xs: "24px", sm: "32px", md: "40px" } }}
                />
              ) : (
                <CheckCircle
                  sx={{ fontSize: { xs: "24px", sm: "32px", md: "40px" } }}
                />
              )}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                  mb: 0.5,
                }}
              >
                {activeStep === 0
                  ? "Create Account"
                  : activeStep === 1
                    ? "Verify Email"
                    : "Welcome!"}
              </Typography>
              <Typography
                variant="body2"
                color="white"
                sx={{
                  fontSize: getFontSize.caption,
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                }}
              >
                {activeStep === 0
                  ? "Step 1 of 3: Enter your details"
                  : activeStep === 1
                    ? "Step 2 of 3: Verify your email"
                    : "Step 3 of 3: Registration complete"}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            disabled={isRegistering || isVerifying || isResendingOTP}
            sx={{
              color: "white",
              bgcolor: "#04404b",
              "&:hover": { bgcolor: alpha(theme.palette.grey[500], 0.2) },
              width: { xs: 32, sm: 36 },
              height: { xs: 32, sm: 36 },
              top: { xs: -15, sm: -20, md: -25 },
              right: { xs: -10, sm: -12, md: -15 },
            }}
          >
            <Close fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          minHeight: { xs: "calc(100vh - 120px)", sm: 500, md: 550 },
          overflowX: "hidden",
        }}
      >
        {activeStep < 2 && (
          <Stepper
            activeStep={activeStep}
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{
              mb: { xs: 3, sm: 3.5, md: 4 },
              "& .MuiStepLabel-root .Mui-completed": {
                color: theme.palette.success.main,
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: theme.palette.primary.main,
              },
              "& .MuiStepLabel-label": {
                fontWeight: 500,
                fontSize: getFontSize.body2,
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {renderStepContent(activeStep)}
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPopup;
