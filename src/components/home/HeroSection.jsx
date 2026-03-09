import { ArrowForward, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import home_background from "../../assets/images/home_bg.avif";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/ContactForm");
    }
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: `
          linear-gradient(135deg, rgba(0, 5, 10, 0.88), rgba(3, 35, 53, 0.85)),
          url("${home_background}")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        px: { xs: 2, sm: 3, md: 6 },
      }}
    >
      {/* Glow Effect */}
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)",
          top: "-200px",
          right: "-200px",
          filter: "blur(120px)",
        }}
      />

      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              color: "white",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* COMPANY NAME */}
            <Typography
              sx={{
                fontWeight: 800,
                mb: { xs: 2, sm: 3, md: 4 },
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.4rem",
                  md: "3rem",
                  lg: "3.8rem",
                  xl: "4.5rem",
                },
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
              }}
            >
              Excellence Allegiance{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  display: { xs: "block", sm: "inline" },
                }}
              >
                Private Limited
              </Box>
            </Typography>

            {/* TAGLINE */}
            <Typography
              sx={{
                mb: { xs: 4, md: 6 },
                opacity: 0.9,
                maxWidth: { xs: "100%", md: 750 },
                mx: "auto",
                fontSize: {
                  xs: "0.95rem",
                  sm: "1.05rem",
                  md: "1.2rem",
                  lg: "1.35rem",
                },
                lineHeight: 1.7,
              }}
            >
              Delivering enterprise-grade IT solutions including
              software development, cloud infrastructure,
              cybersecurity, and AI-driven digital transformation
              for modern businesses.
            </Typography>

            {/* BUTTONS */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: 3 }}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: { xs: 5, md: 8 } }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleGetStarted}
                sx={{
                  width: { xs: "100%", sm: "80%", md: "auto" },
                  py: { xs: 1.4, sm: 1.6, md: 2 },
                  px: { md: 5 },
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.05rem",
                  },
                  borderRadius: 3,
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                  boxShadow:
                    "0 10px 30px rgba(59,130,246,0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                  },
                }}
              >
                Get Free Consultation
              </Button>

              {/* <Button
                component={RouterLink}
                to="/services"
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: "80%", md: "auto" },
                  py: { xs: 1.4, sm: 1.6, md: 2 },
                  px: { md: 5 },
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.05rem",
                  },
                  borderRadius: 3,
                  textTransform: "none",
                  borderColor: "#3B82F6",
                  color: "#3B82F6",
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    backgroundColor:
                      "rgba(59,130,246,0.08)",
                  },
                }}
              >
                Explore Services
              </Button> */}
            </Stack>
          </Box>
        </Fade>

        {/* SCROLL INDICATOR */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 20, md: 40 },
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            cursor: "pointer",
            display: { xs: "none", md: "block" },
          }}
          onClick={scrollToNext}
        >
          <Typography
            variant="body2"
            sx={{ color: "white", mb: 1, opacity: 0.8 }}
          >
            Explore Services
          </Typography>
          <KeyboardArrowDown
            sx={{
              color: "white",
              animation: "bounce 2s infinite",
              fontSize: 40,
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
