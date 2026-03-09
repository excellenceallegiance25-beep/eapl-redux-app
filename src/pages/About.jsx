import {
  Architecture,
  Business,
  CheckCircle,
  Cloud,
  Code,
  EmojiEvents,
  Handshake,
  Psychology,
  Public,
  Rocket,
  School,
  Smartphone,
  Terminal,
  TrendingUp,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Zoom,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import { getEmployeeList } from "../services/AppConfigAction";
import OurTeam from "../components/common/Ourteam";
import AIimagebg from "../assets/images/AIimagebg.jpg";
import mobilebg from "../assets/images/mobilebg.jpg";
import serverbg from "../assets/images/serverbg.jpg";
import teambg from "../assets/images/teambg.jpg";
import sendmessagebg from "../assets/images/sendmessage.avif";
import consultingbg from "../assets/images/consultingbg.jpg";
import outsideearth from "../assets/images/outsideearth.jpg";
import officemeetingbg from "../assets/images/officemeetingbg.jpg";
import Amazon_Web_Services_Logo from "../assets/images/Amazon_Web_Services_Logo.svg";
import Microsoft_logo from "../assets/images/Microsoft_logo.svg";
import Google_Cloud_logo from "../assets/images/Google_Cloud_logo.svg";
import blankofficecoridorbg from "../assets/images/blankofficecoridorbg.jpg";
import procastinationbg from "../assets/images/procastinationbg.avif";

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const office1 = blankofficecoridorbg;
// "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=400&fit=crop";
const office2 = officemeetingbg;
// "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&h=400&fit=crop";
const innovation = procastinationbg;
// "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1950&q=80";

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Responsive container maxWidth
  const containerMaxWidth = isMobile ? false : isTablet ? "lg" : "xl";

  // Responsive font sizes
  const getFontSize = {
    h1: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
    h2: { xs: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
    h3: { xs: "1.5rem", sm: "1.75rem", md: "2rem", lg: "2.5rem" },
    h4: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
    h5: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem", lg: "1.75rem" },
    h6: { xs: "1rem", sm: "1.1rem", md: "1.25rem", lg: "1.5rem" },
    body1: { xs: "0.875rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
    body2: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem", lg: "0.95rem" },
    caption: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem", lg: "0.8rem" },
  };

  // Responsive spacing
  const getSpacing = {
    section: { xs: 4, sm: 6, md: 8, lg: 10 },
    container: { xs: 2, sm: 3, md: 4, lg: 5 },
    card: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
  };

  const [leadershipTeam, setLeadershipTeam] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadConfigs = async () => {
      const result = await dispatch(getEmployeeList());
      if (result.type === "EMP_LIST") {
        setLeadershipTeam(result.payload);
      }
    };
    loadConfigs();
  }, [dispatch]);

  const departments = [
    {
      name: "AI Research",
      icon: <Psychology fontSize="large" />,
      members: 10,
      projects: 18,
      description: "Developing cutting-edge AI solutions",
      image: AIimagebg,
      // "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    },
    {
      name: "Mobile Development",
      icon: <Smartphone fontSize="large" />,
      members: 22,
      projects: 56,
      description: "Building innovative mobile applications",
      image: mobilebg,
      // "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    },
    {
      name: "DevOps",
      icon: <Terminal fontSize="large" />,
      members: 12,
      projects: 32,
      description: "Automating deployment pipelines",
      image: serverbg,
      // "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    },
    {
      name: "Web Development",
      icon: <Code fontSize="large" />,
      members: 19,
      projects: 25,
      description: "Creating responsive web applications",
      image: teambg,
      // "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    },
  ];

  const coreValues = [
    {
      title: "Excellence in Execution",
      icon: <EmojiEvents />,
      description:
        "We deliver beyond expectations, focusing on quality and precision in every project.",
      color: "#667eea",
    },
    {
      title: "Innovation First",
      icon: <Rocket />,
      description:
        "Constantly exploring new technologies and methodologies to stay ahead.",
      color: "#f093fb",
    },
    {
      title: "Client Partnership",
      icon: <Handshake />,
      description: "We work with clients as partners, not just vendors.",
      color: "#4CAF50",
    },
    {
      title: "Continuous Learning",
      icon: <School />,
      description:
        "Investing in our team's growth through training and certifications.",
      color: "#FF9800",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description:
        "Started with 5 members in a small garage, focusing on custom software solutions",
      icon: <Business />,
      image: sendmessagebg,
      // "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    },
    {
      year: "2021",
      title: "First Major Enterprise Client",
      description: "Secured partnership with Fortune 500 healthcare provider",
      icon: <VerifiedUser />,
      image: consultingbg,
      // "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    },
    {
      year: "2022",
      title: "Cloud Services Division",
      description: "Expanded to AWS and Azure cloud migration services",
      icon: <Cloud />,
      image: outsideearth,
      // "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    },
    {
      year: "2024",
      title: "International Expansion",
      description: "Opened offices in London, Singapore, and Toronto",
      icon: <Public />,
      image: officemeetingbg,
      // "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=300&fit=crop",
    },
    {
      year: "2025",
      title: "AI Research Lab Established",
      description:
        "Launched dedicated AI research division with top-tier talent",
      icon: <Architecture />,
      image: AIimagebg,
      // "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    },
  ];

  const certifications = [
    {
      name: "AWS Partner Network",
      logo: Amazon_Web_Services_Logo,
      // "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    },
    {
      name: "Microsoft Gold Partner",
      logo: Microsoft_logo,
      // "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Google Cloud Premier Partner",
      logo: Google_Cloud_logo,
      // "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    },
  ];

  // const handleLeaderClick = (leader) => {
  //   setSelectedLeader(leader);
  //   setOpenDialog(true);
  // };

  // const getAvatarImage = (avatar) => {
  //   switch (avatar) {
  //     case "SJ":
  //       return team1;
  //     case "MC":
  //       return team2;
  //     case "ED":
  //       return team3;
  //     case "DW":
  //       return team4;
  //     default:
  //       return innovation;
  //   }
  // };

  return (
    <Box>
      <PageHeader
        title="About Excellence Allegiance"
        animation="slideInLeft"
        subtitle="Empowering digital transformation through innovation and expertise"
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${innovation})`}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          color: "white",
          minHeight: { xs: "300px", sm: "350px", md: "400px", lg: "450px" },
        }}
      />

      <Container
        maxWidth={containerMaxWidth}
        sx={{
          py: { xs: 3, sm: 4, md: 5, lg: 6 },
          px: { xs: 2, sm: 3, md: 4, lg: 5 },
        }}
      >
        {/* Company Overview with Stats */}
        <Box
          sx={{
            mb: { xs: 4, sm: 5, md: 6, lg: 8 },
            textAlign: "center",
            position: "relative",
          }}
        >
          <Zoom in={true} style={{ transitionDelay: "100ms" }}>
            <Chip
              label="SINCE 2020"
              color="primary"
              variant="outlined"
              sx={{
                mb: { xs: 2, sm: 2.5, md: 3 },
                fontWeight: "bold",
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.5, sm: 0.75, md: 1 },
                fontSize: getFontSize.caption,
                height: { xs: 28, sm: 32, md: 36 },
              }}
            />
          </Zoom>

          <Fade in={true} timeout={1000}>
            <Typography
              variant="h2"
              gutterBottom
              fontWeight="bold"
              sx={{
                mb: { xs: 2, sm: 2.5, md: 3 },
                fontSize: getFontSize.h2,
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                px: { xs: 1, sm: 2 },
                color: "#1a237e",
              }}
            >
              Shaping the Future of Technology
            </Typography>
          </Fade>

          <Fade in={true} timeout={1500}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
                mx: "auto",
                lineHeight: { xs: 1.5, sm: 1.6, md: 1.7, lg: 1.8 },
                mb: { xs: 4, sm: 5, md: 6 },
                fontSize: getFontSize.body1,
                px: { xs: 2, sm: 3, md: 4 },
              }}
            >
              Excellence Allegiance is a premier technology consulting firm
              specializing in digital transformation, cloud solutions, and
              enterprise software development. With a team of 150+ experts
              across 4 continents, we help organizations navigate complex
              technological challenges and achieve measurable business outcomes.
            </Typography>
          </Fade>

          {/* Stats Counter */}
          <Grid
            container
            spacing={{ xs: 1.5, sm: 2, md: 3 }}
            sx={{
              mt: { xs: 3, sm: 4, md: 5 },
              justifyContent: "center",
            }}
          >
            {[
              { number: "150+", label: "Experts Worldwide", icon: "👥" },
              { number: "10+", label: "Countries Served", icon: "🌍" },
              { number: "98%", label: "Client Satisfaction", icon: "⭐" },
              { number: "60+", label: "Projects Completed", icon: "🚀" },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Grow in={true} timeout={(index + 1) * 300}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                      textAlign: "center",
                      borderRadius: { xs: 2, sm: 2.5, md: 3 },
                      bgcolor: alpha(theme.palette.primary.main, 0.25),
                      transition: "transform 0.3s, background-color 0.3s",
                      "&:hover": {
                        transform: isDesktop ? "translateY(-5px)" : "none",
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                      sx={{
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.8rem",
                          md: "2.2rem",
                          lg: "2.5rem",
                        },
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontSize: getFontSize.body2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                        }}
                      >
                        {stat.icon}
                      </Box>
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mission & Vision Cards */}
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{ mb: { xs: 4, sm: 5, md: 6, lg: 8 } }}
        >
          <Grid item xs={12} md={6}>
            <Grow in={true}>
              <Card
                sx={{
                  height: "100%",
                  background: `linear-gradient(rgba(66, 73, 106, 0.9), rgba(51, 39, 62, 0.9)), url(${office1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  "&:hover": {
                    transform: isDesktop ? "scale(1.02)" : "none",
                  },
                }}
              >
                <Box
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 3.5, lg: 4 },
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1.5, sm: 2 },
                      mb: { xs: 2, sm: 2.5, md: 3 },
                    }}
                  >
                    <Rocket
                      sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }}
                    />
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      sx={{
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.8rem",
                          md: "2.2rem",
                          lg: "2.5rem",
                        },
                      }}
                    >
                      Our Mission
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      mb: { xs: 2.5, sm: 3, md: 3.5 },
                      opacity: 0.95,
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                        lg: "1.2rem",
                      },
                      lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                    }}
                  >
                    To accelerate digital innovation by providing cutting-edge
                    technology solutions that drive growth, efficiency, and
                    sustainable competitive advantage.
                  </Typography>
                  <List sx={{ pt: 0 }}>
                    {[
                      "Transform businesses through strategic technology adoption",
                      "Deliver exceptional ROI through measurable outcomes",
                      "Foster long-term partnerships built on trust and results",
                    ].map((item, index) => (
                      <ListItem
                        key={index}
                        sx={{ px: 0, py: { xs: 0.5, sm: 0.75, md: 1 } }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: { xs: 28, sm: 32, md: 36 },
                            color: "white",
                          }}
                        >
                          <CheckCircle
                            sx={{
                              fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "1rem",
                                lg: "1.1rem",
                              },
                              opacity: 0.9,
                              lineHeight: 1.5,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Card>
            </Grow>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grow in={true} timeout={500}>
              <Card
                sx={{
                  height: "100%",
                  background: `linear-gradient(rgba(89, 58, 92, 0.9), rgba(100, 121, 205, 0.9)), url(${office2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  "&:hover": {
                    transform: isDesktop ? "scale(1.02)" : "none",
                  },
                }}
              >
                <Box
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 3.5, lg: 4 },
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1.5, sm: 2 },
                      mb: { xs: 2, sm: 2.5, md: 3 },
                    }}
                  >
                    <TrendingUp
                      sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }}
                    />
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      sx={{
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.8rem",
                          md: "2.2rem",
                          lg: "2.5rem",
                        },
                      }}
                    >
                      Our Vision
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      mb: { xs: 2.5, sm: 3, md: 3.5 },
                      opacity: 0.95,
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                        lg: "1.2rem",
                      },
                      lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                    }}
                  >
                    To be the world's most trusted technology innovation
                    partner, recognized for transforming industries and creating
                    lasting impact.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 1, sm: 1.5, md: 2 },
                      flexWrap: "wrap",
                      mt: { xs: 2, sm: 2.5, md: 3 },
                    }}
                  >
                    {[
                      "Global Leader",
                      "Innovation Hub",
                      "Trusted Partner",
                      "Industry Pioneer",
                    ].map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "white",
                          fontWeight: "bold",
                          backdropFilter: "blur(10px)",
                          fontSize: getFontSize.caption,
                          height: { xs: 24, sm: 28, md: 32, lg: 36 },
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.3)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Card>
            </Grow>
          </Grid>
        </Grid>

        {/* Core Values with Interactive Cards */}
        {/* <Box
          component="section"
          sx={{
            // width: "100vw",
            // position: "relative",
            // left: "50%",
            // right: "50%",
            // ml: "-50vw",
            // mr: "-50vw",
            // mb: { xs: 4, sm: 5, md: 6, lg: 8 },
            // py: { xs: 4, sm: 5, md: 6, lg: 8 },
            // px: { xs: 2, sm: 3, md: 4, lg: 5 },
            background: "linear-gradient(135deg, #296374 0%, #1f4e5f 100%)",
          }}
        > */}
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6, lg: 8 }, mt: 5 }}>
          <Typography
            variant="h2"
            align="center"
            fontWeight="bold"
            sx={{
              mb: { xs: 1.5, sm: 2 },
              color: "#065972",
              fontSize: getFontSize.h2,
              px: { xs: 1, sm: 2 },
            }}
          >
            Our Core Values
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: { xs: 3, sm: 4, md: 5, lg: 6 },
              color: "rgba(43, 2, 2, 0.85)",
              maxWidth: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
              mx: "auto",
              fontSize: getFontSize.body1,
              px: { xs: 2, sm: 3 },
            }}
          >
            The principles that guide everything we do
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            // alignItems="stretch"
            // sx={{
            //   // width: { xs: '100%', sm: '95%', md: '90%' },
            //   // mx: 'auto',
            // }}
          >
            {coreValues.map((value, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={3}
                display="flex"
                justifyContent="center"
              >
                <Grow in timeout={index * 200}>
                  <Card
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    sx={{
                      width: "100%",
                      maxWidth: { xs: "100%", sm: 320, md: 340 },
                      height: "100%",
                      p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                      textAlign: "center",
                      cursor: "pointer",
                      borderRadius: { xs: 2, sm: 2.5, md: 3 },
                      // backgroundColor: "#ffffff",
                      background: `linear-gradient(270deg, #b3dcec, #ffff 60%)`,
                      transition: "all 0.35s ease",
                      boxShadow:
                        hoveredCard === index && isDesktop
                          ? "0px 20px 40px rgba(0,0,0,0.15)"
                          : "0px 6px 16px rgba(0,0,0,0.08)",
                      transform:
                        hoveredCard === index && isDesktop
                          ? "translateY(-10px)"
                          : "translateY(0)",
                      borderTop: `5px solid ${value.color}`,
                      position: "relative",
                      overflow: "hidden",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(180deg, ${alpha(value.color, 0.08)}, transparent 60%)`,
                        opacity: hoveredCard === index && isDesktop ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 60, sm: 65, md: 70, lg: 80 },
                        height: { xs: 60, sm: 65, md: 70, lg: 80 },
                        borderRadius: "50%",
                        bgcolor: alpha(value.color, 0.12),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: { xs: 2, sm: 2.5, md: 3 },
                        color: value.color,
                        transition: "all 0.35s ease",
                        transform:
                          hoveredCard === index && isDesktop
                            ? "scale(1.15)"
                            : "scale(1)",
                        fontSize: {
                          xs: "1.75rem",
                          sm: "2rem",
                          md: "2.25rem",
                          lg: "2.5rem",
                        },
                      }}
                    >
                      {value.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      align="center"
                      gutterBottom
                      sx={{
                        fontSize: {
                          xs: "1rem",
                          sm: "1.1rem",
                          md: "1.2rem",
                          lg: "1.3rem",
                        },
                        mb: { xs: 1, sm: 1.5 },
                      }}
                    >
                      {value.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      align="center"
                      sx={{
                        color: "text.secondary",
                        lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                        fontSize: getFontSize.body2,
                        px: { xs: 1, sm: 1.5 },
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Leadership Team with Images */}
        <OurTeam />

        {/* Departments with Hover Effects */}
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6, lg: 8 }, mt: 5 }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{
              mb: { xs: 3, sm: 4, md: 5, lg: 6 },
              fontSize: getFontSize.h2,
              px: { xs: 1, sm: 2 },
              color: "#1a237e",
            }}
          >
            Our Expertise Areas
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{ justifyContent: "center" }}
          >
            {departments.map((dept, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={index * 200}>
                  <Paper
                    sx={{
                      p: 0,
                      overflow: "hidden",
                      height: "100%",
                      position: "relative",
                      cursor: "pointer",
                      borderRadius: { xs: 2, sm: 2.5, md: 3 },
                      transition: "all 0.3s",
                      background: `linear-gradient(231deg, #f9fbfc 60%, #b5f1f7)`,
                      "&:hover": {
                        transform: isDesktop ? "translateY(-8px)" : "none",
                        boxShadow: isDesktop
                          ? theme.shadows[8]
                          : theme.shadows[4],
                        "& .department-content": {
                          transform: isDesktop ? "translateY(0)" : "none",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: { xs: 140, sm: 150, md: 160, lg: 180 },
                        backgroundImage: `url(${dept.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <Box
                      className="department-content"
                      sx={{
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        textAlign: "center",
                        transition: "transform 0.3s",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 45, sm: 50, md: 55, lg: 60 },
                          height: { xs: 45, sm: 50, md: 55, lg: 60 },
                          borderRadius: "50%",
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
                          color: theme.palette.primary.main,
                          fontSize: {
                            xs: "1.4rem",
                            sm: "1.5rem",
                            md: "1.75rem",
                            lg: "2rem",
                          },
                        }}
                      >
                        {dept.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        fontWeight="bold"
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                          mb: { xs: 0.5, sm: 0.75 },
                        }}
                      >
                        {dept.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{
                          mb: { xs: 1.5, sm: 2, md: 2.5 },
                          fontSize: getFontSize.body2,
                          px: { xs: 1, sm: 1.5 },
                        }}
                      >
                        {dept.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          mt: { xs: 1, sm: 1.5, md: 2 },
                        }}
                      >
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="primary"
                            sx={{
                              fontSize: {
                                xs: "1.1rem",
                                sm: "1.3rem",
                                md: "1.5rem",
                                lg: "1.75rem",
                              },
                            }}
                          >
                            {dept.members}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: getFontSize.caption }}
                          >
                            Experts
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="secondary"
                            sx={{
                              fontSize: {
                                xs: "1.1rem",
                                sm: "1.3rem",
                                md: "1.5rem",
                                lg: "1.75rem",
                              },
                            }}
                          >
                            {dept.projects}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: getFontSize.caption }}
                          >
                            Projects
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Interactive Timeline */}
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6, lg: 8 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4, md: 5, lg: 6 } }}>
            <Chip
              label="OUR JOURNEY"
              color="primary"
              variant="outlined"
              sx={{
                mb: { xs: 2, sm: 2.5, md: 3 },
                fontWeight: "bold",
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.5, sm: 0.75, md: 1 },
                fontSize: getFontSize.caption,
                height: { xs: 28, sm: 32, md: 36 },
              }}
            />
            <Typography
              variant="h2"
              gutterBottom
              fontWeight="bold"
              sx={{
                fontSize: getFontSize.h2,
                px: { xs: 1, sm: 2 },
                color: "#1a237e",
              }}
            >
              Milestones & Achievements
            </Typography>
          </Box>

          <Box
            sx={{ position: "relative", mt: { xs: 3, sm: 4, md: 5, lg: 6 } }}
          >
            <Box
              sx={{
                position: "absolute",
                left: { xs: "20px", sm: "25px", md: "50%" },
                transform: { xs: "none", md: "translateX(-50%)" },
                width: { xs: "2px", sm: "3px", md: "4px" },
                height: "100%",
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                zIndex: 0,
              }}
            />

            {milestones.map((milestone, index) => (
              <Grow in={true} timeout={index * 300} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    mb: { xs: 3, sm: 4, md: 5, lg: 6 },
                    position: "relative",
                    flexDirection: {
                      xs: "row",
                      md: index % 2 === 0 ? "row" : "row-reverse",
                    },
                    alignItems: "start",
                    cursor: "pointer",
                    "&:hover .timeline-dot": {
                      transform: isDesktop ? "scale(1.5)" : "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: "70px",
                        sm: "80px",
                        md: "100px",
                        lg: "120px",
                      },
                      textAlign: {
                        xs: "left",
                        md: index % 2 === 0 ? "right" : "left",
                      },
                      pr: { xs: 1, md: index % 2 === 0 ? 3 : 0 },
                      pl: { xs: 0, md: index % 2 === 0 ? 0 : 3 },
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      color="primary"
                      sx={{
                        fontSize: {
                          xs: "1.2rem",
                          sm: "1.5rem",
                          md: "2rem",
                          lg: "2.5rem",
                        },
                        opacity: 0.8,
                      }}
                    >
                      {milestone.year}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      position: "relative",
                      ml: { xs: 1, md: index % 2 === 0 ? 0 : "auto" },
                      mr: { xs: 0, md: index % 2 === 0 ? "auto" : 0 },
                      maxWidth: {
                        xs: "calc(100% - 90px)",
                        sm: "calc(100% - 100px)",
                        md: "350px",
                        lg: "400px",
                      },
                    }}
                  >
                    <Box
                      className="timeline-dot"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: {
                          xs: "-24px",
                          sm: "-28px",
                          md: index % 2 === 0 ? "-16px" : "calc(100% + 16px)",
                        },
                        transform: "translateY(-50%)",
                        width: { xs: "10px", sm: "12px", md: "16px" },
                        height: { xs: "10px", sm: "12px", md: "16px" },
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        border: {
                          xs: "2px solid white",
                          sm: "3px solid white",
                        },
                        zIndex: 2,
                        transition: "transform 0.3s",
                      }}
                    />

                    <Card
                      sx={{
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        boxShadow: theme.shadows[4],
                        borderLeft:
                          { xs: "3px", sm: "4px" } +
                          ` solid ${theme.palette.primary.main}`,
                        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                        transition: "transform 0.3s",
                        color: "#fff",
                        backgroundImage: `
                          linear-gradient(
                            135deg,
                            rgba(69, 65, 85, 0.95) 0%,
                            rgba(69, 65, 85, 0.7) 25%,
                            rgba(167, 154, 154, 0.4) 75%,
                            rgba(167, 154, 154, 0.2) 100%
                          ),
                          url(${milestone.image})
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "multiply",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(135deg, rgba(69, 65, 85, 0.3) 0%, transparent 50%)",
                          zIndex: 1,
                        },
                        "&:hover": {
                          transform: isDesktop ? "translateX(5px)" : "none",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1, sm: 1.5 },
                          mb: { xs: 1, sm: 1.5 },
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        <Box
                          sx={{
                            color: "primary.main",
                            fontSize: {
                              xs: "1.2rem",
                              sm: "1.4rem",
                              md: "1.6rem",
                              lg: "1.8rem",
                            },
                          }}
                        >
                          {milestone.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{
                            fontSize: {
                              xs: "0.9rem",
                              sm: "1rem",
                              md: "1.1rem",
                              lg: "1.2rem",
                            },
                          }}
                        >
                          {milestone.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="#fff"
                        sx={{
                          fontSize: getFontSize.body2,
                          lineHeight: { xs: 1.5, sm: 1.6 },
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        {milestone.description}
                      </Typography>
                    </Card>
                  </Box>
                </Box>
              </Grow>
            ))}
          </Box>
        </Box>

        {/* Interactive Certifications */}
        <Paper
          sx={{
            p: { xs: 2, sm: 3, md: 4, lg: 5 },
            mb: { xs: 4, sm: 5, md: 6, lg: 8 },
            bgcolor: alpha(theme.palette.primary.main, 0.13),
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #667eea, #f093fb)",
            }}
          />

          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            align="center"
            sx={{
              mb: { xs: 2, sm: 2.5, md: 3, lg: 4 },
              fontSize: getFontSize.h4,
              px: { xs: 1, sm: 2 },
              color: "#1a237e",
            }}
          >
            Certifications & Industry Recognition
          </Typography>

          <Grid
            container
            spacing={{ xs: 1.5, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {certifications.map((cert, index) => (
              <Grid item key={index}>
                <Grow in={true} timeout={index * 200}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 1, sm: 1.5, md: 2 },
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1, sm: 1.5, md: 2 },
                      cursor: "pointer",
                      borderRadius: { xs: 1.5, sm: 2 },
                      background: `linear-gradient(231deg, #b6e6f1 , #f5f8f8 60%)`,
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: isDesktop ? "translateY(-5px)" : "none",
                        boxShadow: isDesktop
                          ? theme.shadows[4]
                          : theme.shadows[2],
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={cert.logo}
                      alt={cert.name}
                      sx={{
                        width: { xs: 25, sm: 30, md: 35, lg: 40 },
                        height: { xs: 25, sm: 30, md: 35, lg: 40 },
                        objectFit: "contain",
                      }}
                    />
                    <Typography
                      variant="body1"
                      fontWeight="medium"
                      sx={{
                        fontSize: {
                          xs: "0.75rem",
                          sm: "0.8rem",
                          md: "0.9rem",
                          lg: "1rem",
                        },
                      }}
                    >
                      {cert.name}
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
