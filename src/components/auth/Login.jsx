import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockClockIcon from "@mui/icons-material/LockClock";
import SecurityIcon from "@mui/icons-material/Security";
import SendIcon from "@mui/icons-material/Send";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import eaplRotatingLogo from "../../assets/images/EAPLfavicon.png";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
} from "../../redux/slices/authSlice";
import useLoading from "../../redux/slices/useLoading";
import {
  commonOtpSendOnEmail,
  userLogin,
  verifyingOtp,
} from "../../services/AppConfigAction";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [tempUserData, setTempUserData] = useState(null);
  const [tempToken, setTempToken] = useState("");
  // const [otpVerification, setOtpVerification] = useState("");
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [otpSentSuccess, setOtpSentSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );
  const { showLoader, hideLoader } = useLoading();
  const timerRef = useRef(null);

  // Responsive configuration
  const responsive = {
    // Container heights
    containerMinHeight: { xs: "100vh", sm: "98vh", md: "95vh", lg: "95vh" },
    innerMinHeight: { xs: "100vh", sm: "95vh", md: "90vh", lg: "90vh" },

    // Paper dimensions
    paperWidth: { xs: "95%", sm: "90%", md: 420, lg: 440, xl: 460 },
    paperPadding: { xs: 3, sm: 3.5, md: 4, lg: 4.5, xl: 5 },

    // Typography sizes
    iconSize: { xs: 48, sm: 54, md: 60, lg: 64, xl: 70 },
    companyNameSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem" },

    // Form elements
    buttonHeight: { xs: 44, sm: 48, md: 52, lg: 56 },
    buttonFontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem", lg: "1.1rem" },
    textFieldMargin: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },

    // Spacing
    spacing: {
      mt: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
      mb: { xs: 1.5, sm: 1.8, md: 2, lg: 2.5, xl: 3 },
    },

    // OTP Dialog
    dialogWidth: { xs: "95%", sm: "90%", md: 500, lg: 550, xl: 600 },
    dialogPadding: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
    otpInputSize: {
      xs: "24px",
      sm: "26px",
      md: "28px",
      lg: "30px",
      xl: "32px",
    },
    otpLetterSpacing: {
      xs: "6px",
      sm: "7px",
      md: "8px",
      lg: "9px",
      xl: "10px",
    },
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      dispatch(loginFailure("Please fill in all fields"));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch(loginFailure("Please enter a valid email address"));
      return;
    }

    try {
      // Start loading
      dispatch(loginStart());
      showLoader(eaplRotatingLogo, 0);

      // Dispatch login action
      const result = await dispatch(userLogin(formData));

      // Check the action type in the result
      if (result.type === "EMP_COMPLETE_LOGIN_SUCCESS") {
        // Validate the payload structure
        if (!result.payload) {
          dispatch(loginFailure("Invalid server response"));
          hideLoader();
          return;
        }

        // Check if dataList exists and is not empty
        if (
          !result.payload.dataList ||
          !Array.isArray(result.payload.dataList)
        ) {
          dispatch(loginFailure("No user data received from server"));
          hideLoader();
          return;
        }

        if (result.payload.dataList.length === 0) {
          dispatch(
            loginFailure(
              "Access denied. Your account is either inactive or does not exist. Please contact your manager.",
            ),
          );
          hideLoader();
          return;
        }

        // Get user data from the payload
        const userData = result.payload.dataList[0];

        // Validate user data has required fields
        if (!userData || !userData.id) {
          dispatch(loginFailure("Invalid user data received"));
          hideLoader();
          return;
        }

        // Ensure user has minimum required data
        const completeUserData = {
          id: userData.id,
          name: userData.name || "",
          email: userData.email || formData.email,
          role: userData.role || "user",
          phone: userData.phone || "",
          title: userData.title || "",
          status: userData.status !== undefined ? userData.status : true,
          role_type: userData.role_type || "",
          profile_picture: userData.profile_picture || null,
          profile_picture_type: userData.profile_picture_type || null,
          department: userData.department || "",
          position: userData.position || "",
          twoFactorEnabled: userData.twoFactorEnabled || false,
        };

        // Check if 2FA is enabled
        if (completeUserData.twoFactorEnabled) {
          // Store user data temporarily
          setTempUserData(completeUserData);
          setTempToken(result.payload.token || "dummy-token");

          // Generate and send OTP
          const otpSent = await generateAndSendOTP(
            completeUserData.email,
            completeUserData.id,
          );

          if (otpSent) {
            // Show OTP dialog
            setShowOTPDialog(true);
            setOtpSentSuccess(true);
          }
          hideLoader();
        } else {
          // Direct login if 2FA is not enabled
          dispatch(
            loginSuccess({
              user: completeUserData,
              token: result.payload.token || "dummy-token",
            }),
          );
          hideLoader();

          // Navigate to dashboard
          navigate(`/dashboard`);
        }
      } else if (result.type === "EMP_FAILURE_LOGIN") {
        // Show error from payload
        const errorMessage = result.payload || "Login failed";
        dispatch(loginFailure(errorMessage));
        hideLoader();
      } else {
        // Handle unexpected response types
        console.error("Unexpected response type:", result.type);
        dispatch(loginFailure("Unexpected server response"));
        hideLoader();
      }
    } catch (error) {
      console.error("Login error:", error);
      hideLoader();

      // More specific error messages
      if (error.message && error.message.includes("Network Error")) {
        dispatch(loginFailure("Network error. Please check your connection."));
      } else if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        if (status === 401) {
          dispatch(loginFailure("Invalid email or password"));
        } else if (status === 403) {
          dispatch(loginFailure("Account disabled or access denied"));
        } else if (status === 404) {
          dispatch(loginFailure("Service not found"));
        } else if (status >= 500) {
          dispatch(loginFailure("Server error. Please try again later."));
        } else {
          dispatch(
            loginFailure(
              `Error ${status}: ${error.response.data?.message || "Unknown error"}`,
            ),
          );
        }
      } else {
        dispatch(loginFailure("An unexpected error occurred."));
      }
    }
  };

  const generateAndSendOTP = async (email, userId) => {
    const payload = {
      userId: userId,
      email: email,
      type: "2FA",
    };

    try {
      setOtpLoading(true);
      setOtpSentSuccess(false);

      const result = await dispatch(commonOtpSendOnEmail(payload));

      if (result?.type === "EMP_OTP_SEND_SUCCESS") {
        // Check if dataList exists and has content
        // if (!result.payload?.dataList || result.payload.dataList.length === 0) {
        //   throw new Error("No OTP received from server");
        // }

        // const otp = result.payload.dataList[0];
        // if (!otp || typeof otp !== "string" || otp.length !== 6) {
        //   throw new Error("Invalid OTP format received");
        // }

        // setOtpVerification(otp);

        // Clear any existing timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }

        // Start resend timer (60 seconds)
        setResendTimer(60);
        timerRef.current = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              timerRef.current = null;
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return true; // Indicate success
      } else {
        const errorMsg = result.payload || "Failed to generate OTP";
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("OTP generation error:", error);
      dispatch(loginFailure(`Failed to send OTP: ${error.message}`));
      return false; // Indicate failure
    } finally {
      setOtpLoading(false);
    }
  };

  const [otpError, setOtpError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleOTPSubmit = async () => {
    // Validate OTP length
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a 6-digit OTP");
      return;
    }

    if (verifyingOTP) return;

    try {
      setVerifyingOTP(true);
      setOtpLoading(true);
      setOtpError("");

      // if (otp === otpVerification) {
      //   // Successful verification
      //   dispatch(
      //     loginSuccess({
      //       user: tempUserData,
      //       token: tempToken,
      //     }),
      //   );

      //   setShowOTPDialog(false);
      //   setOtp("");
      //   setAttempts(0);
      //   navigate(`/dashboard`);
      // } else {
      //   // Wrong OTP
      //   const newAttempts = attempts + 1;
      //   setAttempts(newAttempts);

      //   if (newAttempts >= 3) {
      //     setOtpError("Too many failed attempts. Please request a new OTP.");
      //     setOtp("");
      //     setResendTimer(0); // Allow immediate resend
      //   } else {
      //     setOtpError(`Invalid OTP. ${3 - newAttempts} attempt(s) remaining.`);
      //     setOtp(""); // Clear the field
      //   }

      //   // Focus back to input
      //   setTimeout(() => {
      //     const otpInput = document.querySelector('input[inputmode="numeric"]');
      //     if (otpInput) otpInput.focus();
      //   }, 100);
      // }

      const result = await dispatch(
        verifyingOtp({
          employeeId: tempUserData.id,
          otp: otp,
          otpType: "2FA",
        }),
      );

      if (result?.type === "EMP_COMPLETE_VERIFY_OTP_SUCCESS") {
        dispatch(
          loginSuccess({
            user: tempUserData,
            token: tempToken,
          }),
        );

        setShowOTPDialog(false);
        navigate("/dashboard");
      } else {
        setOtpError(result?.payload.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setOtp("");
      setOtpError("An error occurred. Please try again.");
    } finally {
      setVerifyingOTP(false);
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    const otpSent = await generateAndSendOTP(
      tempUserData.email,
      tempUserData.id,
    );

    if (otpSent) {
      setOtpSentSuccess(true);
      setOtpError("");
      setAttempts(0);
      setOtp("");
    }
  };

  const handleCloseOTPDialog = () => {
    // Reset the login loading state when dialog is closed
    dispatch(registerFailure());

    setShowOTPDialog(false);
    setOtp("");
    // setOtpVerification("");
    setTempUserData(null);
    setTempToken("");
    setResendTimer(0);
    setVerifyingOTP(false);
    setOtpSentSuccess(false);
    setOtpError("");
    setAttempts(0);

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && otp.length === 6 && !verifyingOTP) {
      handleOTPSubmit();
    }
  };

  const glassTextField = {
    input: {
      color: "#fff",
      padding: isMobile ? "12px" : isTablet ? "13px" : "14px",
      fontSize: isMobile ? "0.9rem" : "1rem",
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
      fontSize: isMobile ? "0.85rem" : "1rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      background: "rgba(2, 78, 79, 0.12)",
      borderRadius: isMobile ? "8px" : "10px",
      backdropFilter: "blur(6px)",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.25)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.6)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
      backgroundColor: "transparent",
    },
    // Fix autofill
    "& input:-webkit-autofill": {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "#fff",
      transition: "background-color 5000s ease-in-out 0s",
      boxShadow: "inset 0 0 20px 20px rgba(255,255,255,0.12)",
      backgroundColor: "transparent !important",
      backdropFilter: "blur(6px)",
      borderRadius: isMobile ? "8px" : "10px",
      border: "none",
      padding: isMobile ? "12px" : "14px",
      fontSize: isMobile ? "0.9rem" : "1rem",
    },
    "& input:-webkit-autofill:hover": {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "#fff",
      transition: "background-color 5000s ease-in-out 0s",
      boxShadow: "inset 0 0 20px 20px rgba(255,255,255,0.12)",
      backgroundColor: "transparent !important",
    },
    "& input:-webkit-autofill:focus": {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "#fff",
      transition: "background-color 5000s ease-in-out 0s",
      boxShadow: "inset 0 0 20px 20px rgba(255,255,255,0.12)",
      backgroundColor: "transparent !important",
    },
    "& input:-webkit-autofill:active": {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "#fff",
      transition: "background-color 5000s ease-in-out 0s",
      boxShadow: "inset 0 0 20px 20px rgba(255,255,255,0.12)",
      backgroundColor: "transparent !important",
    },
  };

  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: responsive.containerMinHeight,
          background:
            "radial-gradient(circle at top, #02414d 0%, #033c4b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 1, sm: 2, md: 0 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            minHeight: responsive.innerMinHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: responsive.paperPadding,
              width: responsive.paperWidth,
              borderRadius: { xs: 1.5, sm: 2, md: 2, lg: 2.5 },
              color: "#fff",
              maxWidth: responsive.paperWidth,
              mx: "auto",
              border: "1px solid rgba(255,255,255,0.15)",
              position: "relative",
              overflow: "hidden",
              boxShadow:
                "0 25px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(248, 216, 7, 0.2)",
              background: "rgba(10, 25, 41, 0.7)",
              backdropFilter: "blur(20px)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: isDesktop ? "translateY(-5px)" : "none",
                boxShadow: isDesktop
                  ? "0 30px 70px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(248, 216, 7, 0.3)"
                  : "0 25px 60px rgba(0, 0, 0, 0.45)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.15), transparent 60%)",
                pointerEvents: "none",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background:
                  "linear-gradient(45deg, rgba(39, 231, 249, 0.3), rgba(21, 76, 131, 0.3))",
                borderRadius: "inherit",
                zIndex: -1,
                opacity: 0,
                transition: "opacity 0.5s ease",
              },
              "&:hover::after": {
                opacity: 1,
              },
            }}
          >
            <Typography align="center" fontWeight="bold">
              <GroupsIcon
                sx={{
                  fontSize: responsive.iconSize,
                  color: "#a3e5f4",
                  filter: "drop-shadow(0 0 20px rgba(163, 229, 244, 0.5))",
                  // animation: `${float} 6s ease-in-out infinite`,
                }}
              />
            </Typography>
            <Typography
              color="#fbfbfa"
              align="center"
              gutterBottom
              fontWeight="bold"
              sx={{
                fontSize: responsive.companyNameSize,
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
            >
              Excellence Allegiance{" "}
              <span
                style={{
                  color: "#a3e5f4",
                  textShadow: "0 0 15px rgba(163, 229, 244, 0.7)",
                }}
              >
                Pvt Ltd
              </span>
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: { xs: 1.5, sm: 1.8, md: 2 },
                  fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  background: "rgba(211, 47, 47, 0.2)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  border: "1px solid rgba(211, 47, 47, 0.5)",
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                autoFocus={!isMobile} // Auto-focus only on non-mobile devices
                sx={{
                  ...glassTextField,
                  mb: responsive.spacing.mb,
                  mt: { xs: 1, sm: 1.5, md: 2 },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                sx={{
                  ...glassTextField,
                  "& .MuiIconButton-root": {
                    color: "rgba(255,255,255,0.8)",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        size={isMobile ? "small" : "medium"}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? (
                          <VisibilityOff
                            fontSize={isMobile ? "small" : "medium"}
                          />
                        ) : (
                          <Visibility
                            fontSize={isMobile ? "small" : "medium"}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size={isMobile ? "medium" : "large"}
                disabled={loading}
                sx={{
                  mt: responsive.spacing.mt,
                  borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                  height: responsive.buttonHeight,
                  background: "linear-gradient(135deg, #27e7f9, #154c83)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  fontWeight: "bold",
                  fontSize: responsive.buttonFontSize,
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
                    transition: "left 0.5s ease",
                  },
                  "&:hover": {
                    background: "linear-gradient(135deg, #154c83, #27e7f9)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    "&::before": {
                      left: "100%",
                    },
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={isMobile ? 20 : 24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <Box
                sx={{
                  textAlign: "center",
                  mt: { xs: 1.5, sm: 1.8, md: 2 },
                }}
              >
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  underline="hover"
                  sx={{
                    color: "rgba(182, 183, 246, 0.8)",
                    fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#a3e5f4",
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  mt: { xs: 1.5, sm: 1.8, md: 2 },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                  }}
                >
                  Don't have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/register"
                    underline="hover"
                    fontWeight="bold"
                    sx={{
                      color: "#a3e5f4",
                      fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "#27e7f9",
                      },
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* OTP Verification Dialog */}
      <Dialog
        open={showOTPDialog}
        onClose={handleCloseOTPDialog}
        maxWidth="sm"
        fullWidth={isMobile}
        PaperProps={{
          sx: {
            borderRadius: { xs: 1.5, sm: 2, md: 2 },
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            width: responsive.dialogWidth,
            m: { xs: 1, sm: 2, md: 2 },
            background: "rgba(10, 25, 41, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(25, 118, 210, 0.2)",
            color: "white",
            py: { xs: 1.5, sm: 1.8, md: 2 },
            px: { xs: 2, sm: 2.5, md: 3 },
            borderTopLeftRadius: { xs: 1.5, sm: 2, md: 2 },
            borderTopRightRadius: { xs: 1.5, sm: 2, md: 2 },
            position: "relative",
            zIndex: 1,
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <DialogTitle
            sx={{
              color: "white",
              p: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1, sm: 1.2, md: 1.5 },
              fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
            }}
          >
            <SecurityIcon sx={{ fontSize: { xs: 22, sm: 25, md: 28 } }} />
            Two-Factor Authentication
          </DialogTitle>
        </Box>

        <DialogContent
          sx={{
            py: { xs: 3, sm: 3.5, md: 4 },
            px: { xs: 2.5, sm: 3, md: 4 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 2.5, md: 3 } }}>
            <Box
              sx={{
                width: { xs: 48, sm: 54, md: 60 },
                height: { xs: 48, sm: 54, md: 60 },
                bgcolor: "rgba(25, 118, 210, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <EmailIcon
                sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: "#a3e5f4" }}
              />
            </Box>

            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                color: "rgba(255,255,255,0.9)",
              }}
            >
              We've sent a verification code to your email address:
            </Typography>

            <Box
              sx={{
                bgcolor: "rgba(25, 118, 210, 0.1)",
                p: { xs: 1.5, sm: 1.8, md: 2 },
                borderRadius: 1,
                border: "1px solid rgba(255,255,255,0.1)",
                mb: { xs: 2, sm: 2.5, md: 3 },
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="600"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                  wordBreak: "break-all",
                  color: "#a3e5f4",
                }}
              >
                <AlternateEmailIcon fontSize="small" />
                {tempUserData?.email}
              </Typography>
            </Box>

            {/* Success message when OTP is sent */}
            {otpSentSuccess && !otpLoading && resendTimer === 60 && (
              <Alert
                severity="success"
                icon={<CheckCircleIcon />}
                sx={{
                  mb: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: 1,
                  alignItems: "center",
                  background: "rgba(46, 125, 50, 0.2)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  border: "1px solid rgba(46, 125, 50, 0.5)",
                  "& .MuiAlert-icon": {
                    fontSize: { xs: 20, sm: 22, md: 24 },
                    color: "#4caf50",
                  },
                  "& .MuiAlert-message": {
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  },
                }}
              >
                <Typography variant="body2">
                  <strong>OTP sent successfully!</strong> Check your inbox.
                </Typography>
              </Alert>
            )}
          </Box>

          <Box sx={{ mb: { xs: 2.5, sm: 3, md: 4 } }}>
            <Typography
              variant="subtitle2"
              fontWeight="600"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <LockClockIcon fontSize="small" sx={{ color: "#a3e5f4" }} />
              Enter Verification Code
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              value={otp}
              onChange={handleOTPChange}
              onKeyPress={handleKeyPress}
              inputProps={{
                maxLength: 6,
                inputMode: "numeric",
                pattern: "[0-9]*",
                style: {
                  textAlign: "center",
                  fontSize: responsive.otpInputSize,
                  letterSpacing: responsive.otpLetterSpacing,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 600,
                  padding: isMobile ? "10px" : "14px",
                  color: "#fff",
                },
              }}
              placeholder="• • • • • •"
              disabled={verifyingOTP}
              error={!!otpError}
              helperText={otpError}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  fontSize: responsive.otpInputSize,
                  backdropFilter: "blur(10px)",
                  "& input": {
                    textAlign: "center",
                    p: { xs: 1, sm: 1.2, md: 1.5 },
                  },
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#a3e5f4",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#f44336",
                  },
                },
                mb: 1,
                "& .MuiFormHelperText-root": {
                  textAlign: "center",
                  mx: 0,
                  color: "#f44336",
                  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                },
              }}
            />

            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 1,
                fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Enter the 6-digit code from your email
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.03)",
              p: { xs: 1.5, sm: 1.8, md: 2 },
              borderRadius: 1,
              border: "1px solid rgba(255,255,255,0.05)",
              mb: { xs: 2, sm: 2.5, md: 3 },
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Didn't receive the code?
              </Typography>

              {resendTimer > 0 ? (
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Resend in{" "}
                  <Box
                    component="span"
                    fontWeight="600"
                    sx={{ color: "#a3e5f4" }}
                  >
                    {resendTimer}s
                  </Box>
                </Typography>
              ) : (
                <Button
                  onClick={handleResendOTP}
                  disabled={otpLoading}
                  size={isMobile ? "small" : "medium"}
                  variant="text"
                  startIcon={
                    otpLoading ? (
                      <CircularProgress
                        size={isMobile ? 14 : 16}
                        sx={{ color: "#a3e5f4" }}
                      />
                    ) : (
                      <SendIcon
                        fontSize={isMobile ? "small" : "medium"}
                        sx={{ color: "#a3e5f4" }}
                      />
                    )
                  }
                  sx={{
                    color: "#a3e5f4",
                    fontWeight: 600,
                    fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                    "&:hover": { bgcolor: "rgba(163, 229, 244, 0.1)" },
                  }}
                >
                  {otpLoading ? "Sending..." : "Resend Code"}
                </Button>
              )}
            </Box>
          </Box>

          <Alert
            severity="info"
            variant="outlined"
            icon={<SecurityIcon />}
            sx={{
              borderRadius: 1,
              background: "rgba(2, 136, 209, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(2, 136, 209, 0.3)",
              "& .MuiAlert-icon": {
                fontSize: { xs: 18, sm: 19, md: 20 },
                color: "#a3e5f4",
              },
              "& .MuiAlert-message": {
                fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                color: "rgba(255,255,255,0.9)",
              },
            }}
          >
            <Typography variant="body2">
              <strong>Security Note:</strong> Never share your verification code
              with anyone.
            </Typography>
          </Alert>
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2.5, sm: 3, md: 4 },
            pb: { xs: 3, sm: 3.5, md: 4 },
            pt: { xs: 1, sm: 1.5, md: 2 },
            gap: { xs: 1, sm: 1.5, md: 2 },
            flexDirection: { xs: "column-reverse", sm: "row" },
            borderTop: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Button
            onClick={handleCloseOTPDialog}
            variant="outlined"
            size={isMobile ? "medium" : "large"}
            disabled={verifyingOTP}
            startIcon={
              <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
            }
            fullWidth={isMobile}
            sx={{
              borderRadius: 1,
              px: { xs: 2, sm: 2.5, md: 3 },
              borderColor: "rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
              "&:hover": {
                borderColor: "rgba(255,255,255,0.6)",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Back to Login
          </Button>

          <Button
            onClick={handleOTPSubmit}
            variant="contained"
            size={isMobile ? "medium" : "large"}
            disabled={otpLoading || otp.length !== 6 || verifyingOTP}
            startIcon={
              verifyingOTP ? null : (
                <VerifiedUserIcon fontSize={isMobile ? "small" : "medium"} />
              )
            }
            fullWidth={isMobile}
            sx={{
              borderRadius: 1,
              px: { xs: 2, sm: 2.5, md: 4 },
              background: "linear-gradient(135deg, #27e7f9, #154c83)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
              "&:hover": {
                background: "linear-gradient(135deg, #154c83, #27e7f9)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              },
            }}
          >
            {verifyingOTP ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={isMobile ? 16 : 20} color="inherit" />
                Verifying...
              </Box>
            ) : (
              "Verify & Continue"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
