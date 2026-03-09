import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const CTASection = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        px: { xs: 2, sm: 3 },
        background:
          "linear-gradient(15deg,#162a3a 0%,#2f5d7c 40%,#8faec2 75%,#d97b6a 100%)",
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "1.7rem",
              sm: "2.2rem",
              md: "2.8rem",
              lg: "3.2rem",
            },
            lineHeight: 1.3,
            mb: { xs: 2, sm: 3 },
          }}
        >
          Ready to Transform Your Business?
        </Typography>

        {/* Subheading */}
        <Typography
          sx={{
            opacity: 0.9,
            maxWidth: 700,
            mx: "auto",
            mb: { xs: 4, sm: 5, md: 6 },
            fontSize: {
              xs: "0.95rem",
              sm: "1.1rem",
              md: "1.25rem",
              lg: "1.4rem",
            },
          }}
        >
          Join thousands of successful companies already working with us
        </Typography>

        {/* Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            color="secondary"
            endIcon={<ArrowForward />}
            sx={{
              py: { xs: 1.4, sm: 1.6, md: 1.8 },
              px: { xs: 3, sm: 4, md: 5 },
              fontSize: {
                xs: "0.95rem",
                sm: "1rem",
                md: "1.1rem",
              },
              fontWeight: 600,
              borderRadius: 3,
              width: { xs: "100%", sm: "auto" },
              maxWidth: { xs: 300, sm: "none" },
            }}
          >
            Get Started Today
          </Button>

          {/* Optional second button */}
          {/* 
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              py: { xs: 1.4, sm: 1.6 },
              px: { xs: 3, sm: 4 },
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              borderWidth: 2,
              borderRadius: 3,
              width: { xs: "100%", sm: "auto" },
              maxWidth: { xs: 300, sm: "none" },
            }}
          >
            Schedule a Demo
          </Button>
          */}
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;