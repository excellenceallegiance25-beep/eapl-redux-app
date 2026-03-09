import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  commonOtpSendOnEmail,
  resetOTPforVerification,
  sendEmailForOTP,
  verifyingOtp,
} from "../../services/AppConfigAction";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpVerfification, setOtpVerfification] = useState("");

  const steps = ["Enter Email", "Verify OTP", "Set New Password"];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain an uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain a lowercase letter";
    }

    if (!/\d/.test(password)) {
      return "Password must contain a number";
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSendOtp = async () => {
    // Validate email
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const payload = {
      email: formData.email,
      type: "FORGOT_PASSWORD",
    };

    try {
      let result;
      result = await dispatch(commonOtpSendOnEmail(payload));
      // result = await dispatch(sendEmailForOTP(payload));

      if (result?.type === "EMP_OTP_SEND_SUCCESS") {
        // const otp = result.payload.dataList[0];
        // setOtpVerfification(otp);
        setMessage("OTP has been sent to your email. Please check your inbox.");
        setOtpSent(true);
        setActiveStep(1);
      } else {
        // setError(data.message || 'Failed to send OTP. Please try again.');
        setError(
          result.payload?.message || "Failed to send OTP. Please try again.",
        );
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    // Validate OTP
    if (!formData.otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    if (formData.otp.length !== 6) {
      setErrors({ otp: "OTP must be 6 digits" });
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await dispatch(
        verifyingOtp({
          email: formData.email,
          otp: formData.otp,
          otpType: "FORGOT_PASSWORD",
        }),
      );

      if (result?.type === "EMP_COMPLETE_VERIFY_OTP_SUCCESS") {
        setMessage("OTP verified successfully!");
        setOtpVerified(true);
        setActiveStep(2);
      } else {
        setError(result?.payload.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const errors = {};

    // Validate new password
    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
    } else {
      const validationError = validatePassword(formData.newPassword);
      if (validationError) {
        errors.newPassword = validationError;
      }
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const payload = {
      email: formData.email,
      newPassword: formData.newPassword,
    };

    try {
      const result = await dispatch(resetOTPforVerification(payload));

      if (result?.type === "PASSWORD_RESET") {
        setMessage("Password reset successfully! Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(
          result.payload?.message ||
            "Failed to reset password. Please try again.",
        );
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // const handleResetPassword = async () => {
  //   // Validate passwords
  //   const errors = {};
  //   const validationError = validatePassword(formData.newPassword);
  //   if (validationError) {
  //     errors.newPassword = validationError;
  //   }

  //   if (!formData.newPassword) {
  //     errors.newPassword = "New password is required";
  //   } else if (!validatePassword(formData.newPassword)) {
  //     errors.newPassword =
  //       "Password must be at least 8 characters with uppercase, lowercase, and number";
  //   }

  //   if (!formData.confirmPassword) {
  //     errors.confirmPassword = "Please confirm your password";
  //   } else if (formData.newPassword !== formData.confirmPassword) {
  //     errors.confirmPassword = "Passwords do not match";
  //   }

  //   if (Object.keys(errors).length > 0) {
  //     setErrors(errors);
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");
  //   setMessage("");

  //   const payload = {
  //     email: formData.email,
  //     newPassword: formData.newPassword,
  //   };

  //   try {
  //     let result;
  //     result = await dispatch(resetOTPforVerification(payload));

  //     if (result?.type === "PASSWORD_RESET") {
  //       setMessage("Password reset successfully! Redirecting to login...");
  //       // Redirect to login after 2 seconds
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 2000);
  //     } else {
  //       setError(
  //         result.payload?.message ||
  //           "Failed to reset password. Please try again.",
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Error resetting password:", err);
  //     setError("Network error. Please check your connection.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    const payload = {
      email: formData.email,
      type: "FORGOT_PASSWORD",
    };

    try {
      let result;
      result = await dispatch(commonOtpSendOnEmail(payload));
      // result = await dispatch(sendEmailForOTP(payload));

      if (result?.type === "EMP_OTP_SEND_SUCCESS") {
        // const otp = result.payload.dataList[0];
        // setOtpVerfification(otp);
        setMessage("New OTP has been sent to your email.");
      } else {
        setError(result.payload?.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Enter your email address to receive a verification code.
            </Typography>

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              disabled={loading}
              autoComplete="email"
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSendOtp}
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                "Send Verification Code"
              )}
            </Button>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Enter the 6-digit verification code sent to {formData.email}
            </Typography>

            <TextField
              fullWidth
              label="Verification Code"
              name="otp"
              type="text"
              value={formData.otp}
              onChange={handleChange}
              error={!!errors.otp}
              helperText={errors.otp || "Enter the 6-digit code"}
              margin="normal"
              disabled={loading}
              inputProps={{ maxLength: 6 }}
            />

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleResendOtp}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                Resend Code
              </Button>

              <Button
                variant="contained"
                onClick={handleVerifyOtp}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                {loading ? <CircularProgress size={24} /> : "Verify Code"}
              </Button>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Create a new password for your account.
            </Typography>

            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword}
              helperText={
                errors.newPassword ||
                "Minimum 8 characters with uppercase, lowercase, and number"
              }
              margin="normal"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              disabled={loading}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleResetPassword}
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/login")}
            sx={{ mb: 2 }}
          >
            Back to Login
          </Button>

          <Typography
            variant="h4"
            gutterBottom
            align="center"
            fontWeight="bold"
          >
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Follow the steps to reset your password
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          {renderStepContent(activeStep)}

          {activeStep === 0 && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Remember your password?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/login")}
                  underline="hover"
                  fontWeight="bold"
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
