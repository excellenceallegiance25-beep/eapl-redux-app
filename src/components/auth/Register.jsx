import { AppRegistration } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import RegisterPopup from "./RegisterPopup";

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [popupOpen, setPopupOpen] = useState(false);

  // Responsive configuration
  const responsive = {
    // Container
    // containerMaxWidth: { xs: "100%", sm: "sm", md: "sm", lg: "md" },

    // Paper dimensions
    paperWidth: { xs: "95%", sm: "90%", md: 500, lg: 550, xl: 600 },
    paperPadding: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 },
    paperBorderRadius: { xs: 2, sm: 2.5, md: 3, lg: 3, xl: 4 },

    // Icon box
    iconBoxSize: { xs: 60, sm: 70, md: 80, lg: 85, xl: 90 },
    iconSize: { xs: 30, sm: 35, md: 40, lg: 42, xl: 45 },
    iconMargin: {
      xs: "0 auto 20px",
      sm: "0 auto 25px",
      md: "0 auto 30px",
      lg: "0 auto 32px",
      xl: "0 auto 35px",
    },

    // Typography
    titleSize: {
      xs: "1.5rem",
      sm: "1.8rem",
      md: "2rem",
      lg: "2.2rem",
      xl: "2.2rem",
    },
    subtitleSize: {
      xs: "0.9rem",
      sm: "0.95rem",
      md: "1rem",
      lg: "1.1rem",
      xl: "1.2rem",
    },
    bodySize: {
      xs: "0.8rem",
      sm: "0.85rem",
      md: "0.9rem",
      lg: "0.95rem",
      xl: "1rem",
    },
    captionSize: {
      xs: "0.65rem",
      sm: "0.7rem",
      md: "0.75rem",
      lg: "0.8rem",
      xl: "0.85rem",
    },

    // Spacing
    spacing: {
      section: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
      paragraph: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
      list: { xs: 1.5, sm: 1.8, md: 2, lg: 2.2, xl: 2.5 },
      button: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
    },

    // Button
    buttonMinWidth: { xs: 180, sm: 190, md: 200, lg: 220, xl: 240 },
    buttonHeight: { xs: 44, sm: 48, md: 52, lg: 56, xl: 60 },
    buttonFontSize: {
      xs: "0.85rem",
      sm: "0.9rem",
      md: "1rem",
      lg: "1.1rem",
      xl: "1.2rem",
    },

    // Benefits list
    benefitsMaxWidth: { xs: "100%", sm: 400, md: 400, lg: 450, xl: 500 },
  };

  return (
    <Container
      // width="lg"
      maxWidth={false}
      sx={{
        py: 10,
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
        minHeight: { xs: "100vh", sm: "auto" },
        display: "flex",
        alignItems: "center",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #074866 0%, #04455f 100%)"
            : "linear-gradient(135deg, #1e1e46 0%, #16213e 100%)",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: 600,
            md: 600,
            lg: 900,
          },
          mx: "auto",
        }}
      >
        <Box
          sx={{
            minHeight: { xs: "auto", sm: "90vh" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 2, sm: 0 },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: responsive.paperPadding,
              width: responsive.paperWidth,
              borderRadius: responsive.paperBorderRadius,
              textAlign: "center",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(232, 244, 248, 0.95)"
                  : "rgba(30, 30, 40, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 20px 40px rgba(0,0,0,0.1)"
                  : "0 20px 40px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: { xs: "none", md: "translateY(-4px)" },
                boxShadow: (theme) =>
                  theme.palette.mode === "light"
                    ? "0 30px 60px rgba(0,0,0,0.15)"
                    : "0 30px 60px rgba(0,0,0,0.4)",
              },
            }}
          >
            <Box
              sx={{
                width: responsive.iconBoxSize,
                height: responsive.iconBoxSize,
                borderRadius: "50%",
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.light"
                    : "primary.dark",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: responsive.iconMargin,
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "scale(1.05) rotate(5deg)" },
                },
              }}
            >
              <AppRegistration sx={{ fontSize: responsive.iconSize }} />
            </Box>

            <Typography
              variant={isMobile ? "h5" : isTablet ? "h4" : "h4"}
              gutterBottom
              fontWeight="bold"
              sx={{
                fontSize: responsive.titleSize,
                mb: { xs: 1.5, sm: 2, md: 2.5 },
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "linear-gradient(45deg, #05305c, #073357)"
                    : "linear-gradient(45deg, #063963, #053155)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Join Our Tech Community
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{
                fontSize: responsive.bodySize,
                mb: responsive.spacing.paragraph,
                px: { xs: 1, sm: 2, md: 3 },
                maxWidth: { xs: "100%", sm: 500, md: 550, lg: 600 },
                mx: "auto",
              }}
            >
              Create an account to access exclusive features, track your
              projects, and connect with our tech experts at Excellence
              Allegiance.
            </Typography>

            <Box
              sx={{
                mb: responsive.spacing.section,
                px: { xs: 1, sm: 2, md: 3 },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.1rem",
                    md: "1.2rem",
                    lg: "1.3rem",
                  },
                  mb: { xs: 1.5, sm: 1.8, md: 2 },
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Why Register?
              </Typography>

              <Box
                textAlign="left"
                sx={{
                  maxWidth: responsive.benefitsMaxWidth,
                  mx: "auto",
                }}
              >
                {[
                  "Access to premium tech resources",
                  "Project management dashboard",
                  "Priority technical support",
                  "Exclusive webinars and training",
                  "Community forum access",
                ].map((benefit, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: { xs: 1, sm: 1.2, md: 1.5 },
                      fontSize: responsive.bodySize,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      "&:hover": {
                        color: "primary.main",
                        transform: { xs: "none", sm: "translateX(5px)" },
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        color: "success.main",
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                        mr: 1,
                      }}
                    >
                      ✓
                    </Box>
                    {benefit}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              onClick={() => setPopupOpen(true)}
              fullWidth={isMobile}
              sx={{
                minWidth: responsive.buttonMinWidth,
                height: responsive.buttonHeight,
                fontSize: responsive.buttonFontSize,
                mb: responsive.spacing.button,
                borderRadius: { xs: 2, sm: 2.5, md: 3 },
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "linear-gradient(45deg, #1976d2, #42a5f5)"
                    : "linear-gradient(45deg, #1e88e5, #42a5f5)",
                boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "linear-gradient(45deg, #1565c0, #1976d2)"
                      : "linear-gradient(45deg, #1976d2, #1e88e5)",
                  transform: { xs: "none", sm: "translateY(-2px)" },
                  boxShadow: "0 12px 24px rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              Create Free Account
            </Button>

            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{
                fontSize: responsive.captionSize,
                px: { xs: 2, sm: 3, md: 4 },
                lineHeight: 1.6,
              }}
            >
              By registering, you agree to our Terms of Service and Privacy
              Policy
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Registration Popup */}
      <RegisterPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </Container>
  );
};

export default Register;
