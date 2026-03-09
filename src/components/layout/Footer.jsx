import {
  ArrowForward,
  Business,
  Email,
  ExpandLess,
  ExpandMore,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  LocationOn,
  Menu,
  Phone,
  Security,
  Star,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Snackbar,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Media queries for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(4);

  // Adjust visible columns based on screen size
  useEffect(() => {
    if (isMobile) {
      setVisibleColumns(1);
      setExpandedSections({});
    } else if (isTablet) {
      setVisibleColumns(3);
    } else {
      setVisibleColumns(4);
    }
  }, [isMobile, isTablet]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setTimeout(() => {
        setSubscriptionSuccess(true);
        setSnackbarOpen(true);
        setEmail("");
      }, 500);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const quickLinks = [
    { text: "Home", path: "/" },
    { text: "About Us", path: "/about" },
    { text: "Careers", path: "/careers" },
    { text: "Contact Us", path: "/contact" },
    { text: "Services", path: "/services" },
    { text: "FAQ", path: "/faq" },
  ];

  const companyLinks = [
    { text: "Our Team", path: "/team" },
    { text: "Products", path: "/products" },
    { text: "Partnerships", path: "/partnerships" },
    { text: "Privacy Policy", path: "/privacy" },
    { text: "Terms of Service", path: "/terms" },
  ];

  const socialLinks = [
    {
      icon: <Facebook />,
      label: "Facebook",
      url: "https://www.facebook.com/people/Excellence-Allegiance-Private-Limited/61583992607696/?mibextid=rS40aB7S9Ucbxw6v",
    },
    {
      icon: <LinkedIn />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/excellence-allegiance-private-limited/",
    },
    {
      icon: <Instagram />,
      label: "Instagram",
      url: "https://www.instagram.com/eallegiance?igsh=Y2pzejMzNzVhNmc3",
    },
  ];

  const contactInfo = {
    headquarters: [
      "1st floor, 1/16, Basanta Rd. Nitai Nagar, Mukundapur Kolkata, West Bengal 700099",
    ],
    phones: [ "Support: +91 6289534780"],
    emails: ["General: contact@myeapl.com"],
  };

  const certifications = [
    { icon: <VerifiedUser />, label: "ISO 27001" },
    { icon: <Security />, label: "GDPR" },
    { icon: <Star />, label: "Best Tech 2023" },
  ];

  // Mobile drawer content
  const MobileFooterDrawer = () => (
    <Drawer
      anchor="bottom"
      open={mobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      PaperProps={{
        sx: {
          height: "70vh",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: "#001f2b",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 3, overflowY: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#a3e5f4",
              fontSize: "1.2rem",
            }}
          >
            Excellence Allegiance
          </Typography>
          <IconButton
            onClick={() => setMobileDrawerOpen(false)}
            sx={{ color: "white" }}
          >
            <ExpandMore />
          </IconButton>
        </Box>

        {/* Quick Links */}
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            onClick={() => toggleSection("quickLinks")}
            sx={{
              justifyContent: "space-between",
              color: "white",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Quick Links
            {expandedSections.quickLinks ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={expandedSections.quickLinks}>
            <List>
              {quickLinks.map((link, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: location.pathname === link.path ? "#a3e5f4" : "grey.300",
                      fontWeight: location.pathname === link.path ? "bold" : "normal",
                      textDecoration: "none",
                      fontSize: "1rem",
                      "&:hover": { color: "#a3e5f4" },
                    }}
                  >
                    {link.text}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>

        {/* Company Links */}
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            onClick={() => toggleSection("companyLinks")}
            sx={{
              justifyContent: "space-between",
              color: "white",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Company
            {expandedSections.companyLinks ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={expandedSections.companyLinks}>
            <List>
              {companyLinks.map((link, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: location.pathname === link.path ? "#a3e5f4" : "grey.300",
                      fontWeight: location.pathname === link.path ? "bold" : "normal",
                      textDecoration: "none",
                      fontSize: "1rem",
                      "&:hover": { color: "#a3e5f4" },
                    }}
                  >
                    {link.text}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>

        {/* Contact Info */}
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            onClick={() => toggleSection("contactInfo")}
            sx={{
              justifyContent: "space-between",
              color: "white",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Contact
            {expandedSections.contactInfo ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={expandedSections.contactInfo}>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
                <LocationOn sx={{ color: "#a3e5f4", fontSize: "1.2rem" }} />
                <Typography sx={{ color: "grey.300", fontSize: "0.95rem" }}>
                  {contactInfo.headquarters[0]}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <Phone sx={{ color: "#a3e5f4", fontSize: "1.2rem" }} />
                <Typography sx={{ color: "grey.300", fontSize: "0.95rem" }}>
                  {contactInfo.phones[0]}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <Email sx={{ color: "#a3e5f4", fontSize: "1.2rem" }} />
                <Typography sx={{ color: "grey.300", fontSize: "0.95rem" }}>
                  {contactInfo.emails[0]}
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </Box>

        {/* Certifications */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 2, color: "#a3e5f4" }}>
            Certifications
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {certifications.map((cert, index) => (
              <Chip
                key={index}
                icon={cert.icon}
                label={cert.label}
                sx={{
                  bgcolor: "rgba(163,229,244,0.2)",
                  color: "white",
                  "& .MuiChip-icon": { color: "#a3e5f4" },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Social Links */}
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 2, color: "#a3e5f4" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                href={social.url}
                target="_blank"
                sx={{
                  color: "grey.300",
                  border: "1px solid",
                  borderColor: "grey.700",
                  p: 1.5,
                  "&:hover": { color: "#a3e5f4", borderColor: "#a3e5f4" },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <>
      {/* Mobile Footer Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            top: "auto",
            bottom: 0,
            backgroundColor: "#001f2b",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ color: "grey.300", fontSize: "0.9rem" }}>
              © {currentYear} Excellence Allegiance
            </Typography>
            <IconButton onClick={() => setMobileDrawerOpen(true)} sx={{ color: "white" }}>
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Main Footer */}
      {!isMobile && (
        <Box
          component="footer"
          sx={{
            background: "linear-gradient(180deg, #003d4f 0%, #002433 60%, #00111a 100%)",
            color: "white",
            pt: { sm: 5, md: 7 },
            pb: { sm: 4, md: 5 },
            mt: "auto",
          }}
        >
          <Container maxWidth="xl" sx={{ px: { sm: 4, md: 6 } }}>
            {/* Main Grid - Evenly Distributed Columns */}
            <Grid container spacing={{ sm: 4, md: 5 }} justifyContent="space-between">
              {/* Column 1: Company Info & Certifications */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: { sm: "1.3rem", md: "1.3rem", lg: "1.3rem" },
                    mb: 2.5,
                    lineHeight: 1.3,
                  }}
                >
                  Excellence Allegiance{" "}
                  <Box component="span" sx={{ color: "#a3e5f4", mt: 0.5 }}>
                    Pvt Ltd
                  </Box>
                </Typography>
                
                <Typography
                  sx={{
                    color: "grey.300",
                    fontSize: { sm: "0.95rem", md: "1rem" },
                    lineHeight: 1.6,
                    mb: 3,
                    pr: { md: 2 },
                  }}
                >
                  Pioneering digital transformation with cutting-edge technology solutions since 2020.
                </Typography>
                
                {/* Certifications */}
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", color: "#a3e5f4", mb: 2 }}>
                    Certifications
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {certifications.map((cert, index) => (
                      <Chip
                        key={index}
                        icon={cert.icon}
                        label={cert.label}
                        size="small"
                        sx={{
                          bgcolor: "rgba(163,229,244,0.15)",
                          color: "white",
                          fontSize: "0.85rem",
                          "& .MuiChip-icon": { color: "#a3e5f4", fontSize: "0.9rem" },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Column 2: Quick Links */}
              <Grid item xs={6} sm={3} md={2}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#a3e5f4",
                    fontSize: { sm: "1.1rem", md: "1.2rem" },
                    mb: 2.5,
                  }}
                >
                  Quick Links
                </Typography>
                <List dense sx={{ pt: 0 }}>
                  {quickLinks.map((link, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1.2 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <ArrowForward sx={{ color: "#a3e5f4", fontSize: "0.9rem" }} />
                      </ListItemIcon>
                      <Link
                        component={RouterLink}
                        to={link.path}
                        sx={{
                          color: location.pathname === link.path ? "#a3e5f4" : "grey.300",
                          textDecoration: "none",
                          fontSize: { sm: "0.95rem", md: "1rem" },
                          "&:hover": { color: "#a3e5f4", textDecoration: "underline" },
                        }}
                      >
                        {link.text}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Column 3: Company */}
              <Grid item xs={6} sm={3} md={2}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#a3e5f4",
                    fontSize: { sm: "1.1rem", md: "1.2rem" },
                    mb: 2.5,
                  }}
                >
                  Company
                </Typography>
                <List dense sx={{ pt: 0 }}>
                  {companyLinks.map((link, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1.2 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <Business sx={{ color: "#a3e5f4", fontSize: "0.9rem" }} />
                      </ListItemIcon>
                      <Link
                        component={RouterLink}
                        to={link.path}
                        sx={{
                          color: location.pathname === link.path ? "#a3e5f4" : "grey.300",
                          textDecoration: "none",
                          fontSize: { sm: "0.95rem", md: "1rem" },
                          "&:hover": { color: "#a3e5f4", textDecoration: "underline" },
                        }}
                      >
                        {link.text}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Column 4: Contact & Social */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#a3e5f4",
                    fontSize: { sm: "1.1rem", md: "1.2rem" },
                    mb: 2.5,
                  }}
                >
                  Contact
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                    <LocationOn sx={{ color: "#a3e5f4", fontSize: "1.2rem", mt: 0.3 }} />
                    <Typography sx={{ fontSize: { sm: "0.95rem", md: "1rem" }, lineHeight: 1.5, color: "grey.300" }}>
                      {contactInfo.headquarters[0]}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                    <Phone sx={{ color: "#a3e5f4", fontSize: "1.2rem" }} />
                    <Box>
                      <Typography sx={{ fontSize: { sm: "0.95rem", md: "1rem" }, color: "grey.300", mb: 0.5 }}>
                        {contactInfo.phones[0]}
                      </Typography>
                      <Typography sx={{ fontSize: { sm: "0.95rem", md: "1rem" }, color: "grey.300" }}>
                        {contactInfo.phones[1]}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Email sx={{ color: "#a3e5f4", fontSize: "1.2rem" }} />
                    <Box>
                      <Typography sx={{ fontSize: { sm: "0.95rem", md: "1rem" }, color: "grey.300", mb: 0.5 }}>
                        {contactInfo.emails[0]}
                      </Typography>
                      <Typography sx={{ fontSize: { sm: "0.95rem", md: "1rem" }, color: "grey.300" }}>
                        {contactInfo.emails[1]}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Social Links */}
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", color: "#a3e5f4", mb: 2 }}>
                    Follow Us
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        href={social.url}
                        target="_blank"
                        sx={{
                          color: "grey.300",
                          border: "1px solid",
                          borderColor: "grey.700",
                          p: 1.2,
                          "&:hover": { color: "#a3e5f4", borderColor: "#a3e5f4" },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: { sm: 4, md: 5 } }} />

            {/* Bottom Footer - Evenly Spaced */}
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    color: "grey.400",
                    fontSize: { sm: "0.9rem", md: "0.95rem" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  © {currentYear} Excellence Allegiance Pvt Ltd. All rights reserved.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    color: "grey.500",
                    fontSize: { sm: "0.85rem", md: "0.9rem" },
                    textAlign: { xs: "center", md: "right" },
                  }}
                >
                  Empowering businesses through technology and innovation.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Mobile Drawer */}
      <MobileFooterDrawer />

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ fontSize: "0.9rem" }}>
          Thank you for subscribing!
        </Alert>
      </Snackbar>

      {/* Mobile Spacing */}
      {isMobile && <Box sx={{ height: "56px" }} />}
    </>
  );
};

export default Footer;