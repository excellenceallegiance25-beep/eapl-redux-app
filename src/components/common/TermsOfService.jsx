import { Description, Gavel } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const alpha = (color, value) => {
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${value})`;
  }
  return color;
};

const TermsOfService = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Responsive font sizes
  const responsiveFont = {
    h4: {
      fontSize: isMobile ? "1.8rem" : isTablet ? "2.2rem" : "2.5rem",
    },
    h6: {
      fontSize: isMobile ? "1.1rem" : isTablet ? "1.2rem" : "1.25rem",
    },
    body1: {
      fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : "1.05rem",
    },
    body2: {
      fontSize: isMobile ? "0.85rem" : isTablet ? "0.9rem" : "0.95rem",
    },
    caption: {
      fontSize: isMobile ? "0.75rem" : "0.8rem",
    },
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        mt: { xs: 6, sm: 8, md: 10 },
        mb: { xs: 0.5, sm: 0.75, md: 1 },
        background:
          "linear-gradient(120deg, rgba(55, 74, 78, 0.55), rgba(63, 91, 97, 0.55) 60%)",
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: 1, sm: 1.5, md: 2 },
          background: "linear-gradient(120deg, #fff, #dceef1 60%)",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5, md: 2 },
            mb: { xs: 1, sm: 1.5, md: 2 },
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Gavel
            sx={{
              fontSize: { xs: 30, sm: 35, md: 40 },
              color: "primary.main",
            }}
          />
          <Typography variant="h4" fontWeight="bold" sx={responsiveFont.h4}>
            Terms of Service
          </Typography>
        </Box>

        {/* Chips Stack - Responsive */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 1.5, md: 2 }}
          sx={{
            mb: { xs: 2, sm: 2.5, md: 3 },
            flexWrap: "wrap",
            gap: 1,
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Chip
            label="Effective Date: January 1, 2020"
            size={isMobile ? "small" : "small"}
            variant="outlined"
            icon={<Description />}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          />
          <Chip
            label="Last Updated: February 19, 2026"
            size={isMobile ? "small" : "small"}
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          />
          <Chip
            label="Version 1.0"
            size={isMobile ? "small" : "small"}
            color="primary"
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          />
        </Stack>

        {/* Alert - Responsive */}
        <Alert
          severity="warning"
          sx={{
            mb: { xs: 2, sm: 2.5, md: 3 },
            "& .MuiAlert-message": {
              fontSize: responsiveFont.body2.fontSize,
            },
          }}
        >
          <AlertTitle
            sx={{
              fontSize: isMobile ? "0.95rem" : "1rem",
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            Important Legal Notice
          </AlertTitle>
          <Typography sx={responsiveFont.body2}>
            By using our Services, you agree to these legally binding Terms.
            Please read them carefully before accessing or using our platform.
          </Typography>
        </Alert>

        <Divider sx={{ my: { xs: 2, sm: 3, md: 4 } }} />

        {/* Main Content */}
        <Box>
          {/* Introduction */}
          <Typography paragraph sx={responsiveFont.body1}>
            These Terms of Service (“Terms”) govern your use of services
            provided by <strong>Excellence Allegiance Private Limited</strong>,
            an India-based company headquartered in Kolkata, West Bengal
            (“Company”, “we”, “us”, or “our”), including our website{" "}
            <strong>https://myeapl.com</strong> and related services.
          </Typography>

          {/* Sections Grid */}
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mt: 1 }}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 2, md: 0 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    ...responsiveFont.h6,
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  1. Acceptance of Terms
                </Typography>
                <Typography paragraph sx={responsiveFont.body1}>
                  By accessing or using our Services, you agree to comply with
                  these Terms. If you do not agree, you must discontinue use
                  immediately.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    ...responsiveFont.h6,
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  2. Eligibility
                </Typography>
                <Typography paragraph sx={responsiveFont.body1}>
                  You must be at least 18 years old or legally competent under
                  Indian law to use our Services.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    ...responsiveFont.h6,
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  3. Account Responsibilities
                </Typography>
                <Typography paragraph sx={responsiveFont.body1}>
                  You are responsible for maintaining confidentiality of your
                  account credentials. You agree to provide accurate and
                  complete information.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    ...responsiveFont.h6,
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  4. Permitted Use
                </Typography>
                <Typography paragraph sx={responsiveFont.body1}>
                  You agree not to misuse the Services or engage in unlawful,
                  fraudulent, harmful, or abusive behavior.
                </Typography>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    ...responsiveFont.h6,
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  5. Intellectual Property
                </Typography>
                <Typography paragraph sx={responsiveFont.body1}>
                  All content, trademarks, logos, designs, software, and
                  materials available through the Services are the exclusive
                  property of Excellence Allegiance Private Limited and are
                  protected under Indian intellectual property laws.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    ...responsiveFont.h6,
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  6. User Content
                </Typography>
                <Typography paragraph sx={responsiveFont.body1}>
                  Any content you submit grants us a non-exclusive,
                  royalty-free, worldwide license to use, reproduce, and
                  distribute such content in connection with the Services.
                </Typography>
              </Box>
            </Grid>

            {/* Full Width Sections */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                7. Payments
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                All payments for services must be made as agreed in the project
                contract. Failure to make timely payments may result in:
              </Typography>
              <Box
                component="ul"
                sx={{
                  pl: { xs: 3, sm: 4 },
                  mb: 2,
                  "& li": {
                    ...responsiveFont.body1,
                    mb: 0.5,
                  },
                }}
              >
                <li>Suspension of services</li>
                <li>Delay in project delivery</li>
                <li>Termination of agreement</li>
              </Box>
              <Typography paragraph sx={responsiveFont.body1}>
                We reserve the right to charge applicable taxes as per Indian
                law.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                8. Termination
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                We reserve the right to suspend or terminate access without
                notice if you violate these Terms.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                9. Confidentiality
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                We respect the confidentiality of client information. Any
                confidential information shared during a project will not be
                disclosed to third parties unless required by law or agreed in
                writing.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                10. Disclaimer of Warranties
              </Typography>
              <Typography
                paragraph
                sx={{
                  ...responsiveFont.body2,
                  fontFamily: "monospace",
                  bgcolor: alpha(theme.palette.error.light, 0.05),
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 1,
                  overflowX: "auto",
                }}
              >
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE". WE
                DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                11. Limitation of Liability
              </Typography>
              <Typography
                paragraph
                sx={{
                  ...responsiveFont.body2,
                  fontFamily: "monospace",
                  bgcolor: alpha(theme.palette.error.light, 0.05),
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 1,
                  overflowX: "auto",
                }}
              >
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY
                SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR SERVICES DURING THE
                PREVIOUS 12 MONTHS.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                12. Force Majeure
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                We shall not be liable for failure to perform due to events
                beyond our reasonable control including natural disasters,
                government actions, internet disruptions, or other force majeure
                events.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                13. Compliance with Indian Laws
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                These Terms comply with:
              </Typography>
              <Box
                component="ul"
                sx={{
                  pl: { xs: 3, sm: 4 },
                  mb: 2,
                  "& li": {
                    ...responsiveFont.body1,
                    mb: 0.5,
                  },
                }}
              >
                <li>Information Technology Act, 2000</li>
                <li>SPDI Rules, 2011</li>
                <li>Digital Personal Data Protection Act, 2023</li>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                14. Governing Law
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                These Terms shall be governed by the laws of India. Courts in
                Kolkata, West Bengal shall have exclusive jurisdiction.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                15. Changes to Terms
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                We reserve the right to update or modify these Terms at any
                time. Updated Terms will be posted on this page with a revised
                effective date. Continued use of the website after changes
                constitutes acceptance of the revised Terms.
              </Typography>
            </Grid>
          </Grid>

          {/* Contact Information */}
          <Typography
            variant="h6"
            sx={{
              ...responsiveFont.h6,
              fontWeight: "bold",
              color: "primary.main",
              mb: 2,
              mt: 3,
            }}
          >
            Contact Information
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: alpha(theme.palette.primary.light, 0.05),
                  borderRadius: 1,
                  height: "100%",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: responsiveFont.body1.fontSize }}
                >
                  Email
                </Typography>
                <Typography sx={responsiveFont.body2}>
                  contact@myeapl.com
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: alpha(theme.palette.primary.light, 0.05),
                  borderRadius: 1,
                  height: "100%",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: responsiveFont.body1.fontSize }}
                >
                  Phone
                </Typography>
                <Typography sx={responsiveFont.body2}>
                  +91 6289534780
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: alpha(theme.palette.primary.light, 0.05),
                  borderRadius: 1,
                  height: "100%",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: responsiveFont.body1.fontSize }}
                >
                  Address
                </Typography>
                <Typography sx={responsiveFont.body2}>
                  1st Floor, 1/16 Basanta Road
                  <br />
                  Nitai Nagar, Mukundapur
                  <br />
                  Kolkata, West Bengal 700099
                  <br />
                  India
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: { xs: 3, sm: 4 } }} />

          {/* Footer */}
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={responsiveFont.body2}
          >
            © 2026 Excellence Allegiance Private Limited. All rights reserved.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
