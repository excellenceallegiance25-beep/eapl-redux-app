import {
  Box,
  Container,
  Divider,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  alpha,
} from "@mui/material";

const PrivacyPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Responsive font sizes
  const responsiveFont = {
    h4: {
      fontSize: isMobile ? "1.8rem" : isTablet ? "2.2rem" : "2.5rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: isMobile ? "1.3rem" : isTablet ? "1.4rem" : "1.5rem",
      fontWeight: "bold",
    },
    h6: {
      fontSize: isMobile ? "1.1rem" : isTablet ? "1.15rem" : "1.2rem",
      fontWeight: "600",
    },
    subtitle1: {
      fontSize: isMobile ? "0.9rem" : isTablet ? "0.95rem" : "1rem",
    },
    body1: {
      fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : "1.05rem",
    },
    body2: {
      fontSize: isMobile ? "0.85rem" : isTablet ? "0.9rem" : "0.95rem",
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
        <Typography variant="h4" gutterBottom sx={responsiveFont.h4}>
          Privacy Policy
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          paragraph
          sx={responsiveFont.subtitle1}
        >
          Effective Date: January 1, 2020 <br />
          Last Updated: February 19, 2026
        </Typography>

        <Divider sx={{ my: { xs: 2, sm: 2.5, md: 3 } }} />

        <Box>
          {/* Introduction */}
          <Typography paragraph sx={responsiveFont.body1}>
            Excellence Allegiance Private Limited (“Excellence Allegiance”,
            “Company”, “we”, “us”, or “our”) is an India-based company
            headquartered in Kolkata, West Bengal. We are committed to
            protecting the privacy and personal data of users across India and
            the Asia-Pacific region.
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            This Privacy Policy explains how we collect, use, process, disclose,
            and safeguard your information when you access our websites,
            applications, platforms, and services (collectively, the
            “Services”).
          </Typography>

          {/* Section 1 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 3, sm: 3.5, md: 4 },
              color: "primary.main",
            }}
          >
            1. Information We Collect
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  color: "primary.dark",
                  mb: 1,
                }}
              >
                Information You Provide
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                We may collect personal information including your name, email
                address, phone number, company name, postal address, login
                credentials, payment details, and other information voluntarily
                submitted by you.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  color: "primary.dark",
                  mb: 1,
                }}
              >
                Automatically Collected Information
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                When you use our Services, we may automatically collect IP
                address, device information, browser type, operating system,
                time zone, interaction data, and cookie identifiers.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  color: "primary.dark",
                  mb: 1,
                }}
              >
                Location Information
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                We may collect approximate location information through IP
                address or network-based data to enhance user experience and
                security.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{
                  ...responsiveFont.h6,
                  color: "primary.dark",
                  mb: 1,
                }}
              >
                Information from Third Parties
              </Typography>
              <Typography paragraph sx={responsiveFont.body1}>
                We may receive information from business partners, affiliates,
                marketing providers, and analytics service providers.
              </Typography>
            </Grid>
          </Grid>

          {/* Section 2 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 3, sm: 3.5, md: 4 },
              color: "primary.main",
            }}
          >
            2. Purpose of Processing
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
            <li>Provide and maintain our Services</li>
            <li>Create and manage user accounts</li>
            <li>Process payments and transactions</li>
            <li>Respond to inquiries and customer support requests</li>
            <li>Improve performance and user experience</li>
            <li>Send service-related communications</li>
            <li>Prevent fraud and unauthorized activities</li>
            <li>Comply with legal and regulatory obligations</li>
          </Box>

          <Typography
            paragraph
            sx={{
              ...responsiveFont.body1,
              fontStyle: "italic",
              color: "text.secondary",
            }}
          >
            We do not sell personal data.
          </Typography>

          {/* Section 3 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 3, sm: 3.5, md: 4 },
              color: "primary.main",
            }}
          >
            3. Legal Compliance (India)
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            We comply with:
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
            <li>Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
          </Box>

          <Typography paragraph sx={responsiveFont.body1}>
            Sensitive personal data such as passwords, financial details, health
            records, and biometric data (if collected) are processed only with
            consent and appropriate safeguards.
          </Typography>

          {/* Section 4 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 3, sm: 3.5, md: 4 },
              color: "primary.main",
            }}
          >
            4. Data Sharing
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            We may share personal information with:
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
            <li>Payment gateways</li>
            <li>Cloud hosting providers</li>
            <li>Regulatory or government authorities when legally required</li>
          </Box>

          {/* Section 5 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 3, sm: 3.5, md: 4 },
              color: "primary.main",
            }}
          >
            5. Data Security
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            We implement reasonable technical and organizational security
            measures, including encryption, secure servers, and access controls,
            to protect personal data from unauthorized access or misuse.
          </Typography>

          {/* Section 6 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 3, sm: 3.5, md: 4 },
              color: "primary.main",
            }}
          >
            6. Data Retention
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            Personal information is retained only as long as necessary for
            legitimate business purposes or as required by applicable Indian
            laws.
          </Typography>

          {/* Section 7 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 3, sm: 3.5, md: 4 },
              color: "primary.main",
            }}
          >
            7. Cross-Border Transfers
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            In certain cases, data may be stored or processed outside India
            within Asia-Pacific regions or other jurisdictions where our service
            providers operate, subject to appropriate safeguards.
          </Typography>

          {/* Section 8 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 3, sm: 3.5, md: 4 },
              color: "primary.main",
            }}
          >
            8. Your Rights (Under Indian Law)
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
            <li>Right to access personal data</li>
            <li>Right to correction or updating information</li>
            <li>Right to withdraw consent</li>
            <li>Right to grievance redressal</li>
          </Box>

          <Typography paragraph sx={responsiveFont.body1}>
            To exercise these rights, contact:{" "}
            <strong>contact@myeapl.com</strong>
          </Typography>

          {/* Grievance Officer */}
          <Typography
            variant="h6"
            sx={{
              ...responsiveFont.h6,
              mt: 3,
              color: "primary.dark",
            }}
          >
            Grievance Officer
          </Typography>

          <Box
            sx={{
              pl: { xs: 2, sm: 2.5, md: 3 },
              mb: 3,
              p: { xs: 2, sm: 2.5 },
              bgcolor: alpha(theme.palette.primary.light, 0.08),
              borderRadius: 1,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography sx={responsiveFont.body2}>
              <strong>Excellence Allegiance Private Limited Team</strong> <br />
              Email: contact@myeapl.com <br />
              Phone: +91 6289534780 <br />
              1st Floor, 1/16 Basanta Road <br />
              Nitai Nagar, Mukundapur <br />
              Kolkata, West Bengal 700099 <br />
              India
            </Typography>
          </Box>

          {/* Section 9 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 2, sm: 2.5, md: 3 },
              color: "primary.main",
            }}
          >
            9. Children’s Privacy
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            Our Services are not directed to children under 18 years of age. We
            do not knowingly collect personal data from minors without verified
            parental consent where required.
          </Typography>

          {/* Section 10 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 2, sm: 2.5, md: 3 },
              color: "primary.main",
            }}
          >
            10. Account and Personal Data Deletion
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            We provide users with the ability to request deletion of their
            account and associated personal information in accordance with
            applicable laws and this Privacy Policy.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              ...responsiveFont.h6,
              color: "primary.dark",
              mb: 1,
            }}
          >
            Requesting Deletion
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            To request deletion of your account or personal information, please
            contact us at <strong>contact@myeapl.com</strong> using your
            registered email address or mobile number. We may request additional
            information, where necessary, to verify your identity before
            processing your request.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              ...responsiveFont.h6,
              color: "primary.dark",
              mb: 1,
            }}
          >
            Processing Your Request
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
            <li>
              Your request will be reviewed after successful identity
              verification.
            </li>
            <li>
              Your account may be permanently deactivated or deleted, where
              applicable.
            </li>
            <li>
              Personal information associated with your account will be removed
              from our active systems.
            </li>
            <li>
              Access to the affected account and related Services will no longer
              be available once the deletion process has been completed.
            </li>
          </Box>

          <Typography paragraph sx={responsiveFont.body1}>
            Where we are legally required or otherwise permitted to retain
            certain information, such information will continue to be handled in
            accordance with this Privacy Policy and applicable laws.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              ...responsiveFont.h6,
              color: "primary.dark",
              mb: 1,
            }}
          >
            Processing Time
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            We will make reasonable efforts to process verified deletion
            requests within <strong>30 business days</strong>, although
            additional time may be required where permitted by applicable laws
            or due to exceptional operational circumstances.
          </Typography>

          {/* Section 11 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              ...responsiveFont.h5,
              mt: { xs: 2, sm: 2.5, md: 3 },
              color: "primary.main",
            }}
          >
            11. Changes to This Policy
          </Typography>

          <Typography paragraph sx={responsiveFont.body1}>
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page with a revised date.
          </Typography>

          <Divider sx={{ my: { xs: 3, sm: 3.5, md: 4 } }} />

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

export default PrivacyPolicy;
