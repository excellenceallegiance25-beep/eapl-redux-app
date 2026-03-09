// OurTeam.jsx
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Grow,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getEmployeeList } from "../../services/AppConfigAction";
import firstdeveloperpic from "../../assets/images/firstdeveloperpic.avif";
import secdeveloperpic from "../../assets/images/secdeveloperpic.avif";
import firstdirectorpic from "../../assets/images/firstdirectorpic.avif";
import secdirectorpic from "../../assets/images/secdirectorpic.avif";
// Import placeholder images (you'll need to replace these with actual images)
const team1 =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop";
const team2 =
  "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop";
const team3 =
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop";
const team4 =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop";
const innovation =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1950&q=80";

const OurTeam = () => {
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [leadershipTeam, setLeadershipTeam] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  // Responsive font sizes
  const getFontSize = {
    h2: { xs: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
    h4: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
    h5: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem", lg: "1.75rem" },
    h6: { xs: "1rem", sm: "1.1rem", md: "1.25rem", lg: "1.5rem" },
    body1: { xs: "0.875rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
    body2: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem", lg: "0.95rem" },
    caption: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem", lg: "0.8rem" },
  };

  useEffect(() => {
    const loadConfigs = async () => {
      const result = await dispatch(getEmployeeList());
      if (result.type === "EMP_LIST") {
        setLeadershipTeam(result.payload);
      }
    };
    loadConfigs();
  }, [dispatch]);

  // Fallback data if API returns empty
  const fallbackTeam = [
    {
      name: "Debarun Guria",
      role: "Managing Director",
      avatar: "DG",
      bio: "Managing Director of Excellence Allegiance Private Limited, leading strategic growth and operational excellence.",
      expertise: [
        "Business Leadership",
        "Operations Management",
        "Strategic Planning",
        "Team Management",
        "Client Relations",
      ],
      linkedin: "https://linkedin.com/in/debarun-guria-a873951b7",
      fullBio:
        "Debarun Guria is the Co-Founder and Managing Director of Excellence Allegiance Private Limited. Since its inception, he has been instrumental in driving strategic initiatives, operational efficiency, and sustainable business growth. Under his leadership, the organization has expanded its service capabilities and strengthened client relationships across multiple sectors.",
      education:
        "Priyadarshini College of Engineering and Technology, Nellore | Chandrakona Jirat High School",
    },
    {
      name: "Anindya Karmakar",
      role: "Managing Director",
      avatar: "AK",
      bio: "Managing Director with strong expertise in IT operations, technical support, and business management.",
      expertise: [
        "Information Technology Management",
        "Technical Support",
        "Business Operations",
        "Leadership",
        "Sales & Client Management",
      ],
      linkedin: "https://linkedin.com/in/anindya-karmakar-366583b8",
      fullBio:
        "Anindya Karmakar is a seasoned IT professional and Managing Director with extensive experience in technical support and software services. He brings strong expertise in IT operations, business development, and leadership. His strategic direction and problem-solving capabilities have played a key role in strengthening the company’s technical and operational foundation.",
      education:
        "Mahatma Gandhi University | Nalanda Institute of Advanced Studies",
    },
    {
      name: "Pramod Kumar Dablu",
      role: "Full Stack Developer",
      avatar: "PD",
      bio: "Full Stack Spring Boot and React Redux Developer experienced in designing microservices-driven architectures and deploying cloud-native applications with a focus on scalability and performance.",
      expertise: [
        "Java",
        "Spring MVC",
        "Hibernate",
        "JDBC",
        "Servlets",
        "React",
        "Redux",
        "TypeScript",
        "Material UI",
        "Microservices Architecture",
        "Relational Databases (Oracle, MySQL, PostgreSQL)",
        "Agile Development",
      ],
      linkedin: "https://linkedin.com/in/pramodkumardablupkw",
      fullBio:
        "Pramod Kumar Dablu is an Associate System Engineer and Full Stack Developer with strong expertise in Java-based backend systems and modern frontend frameworks. He has hands-on experience designing and developing scalable microservices, responsive web interfaces, and database-driven enterprise applications. He focuses on clean architecture, performance optimization, and maintainable code practices.",
      education:
        "Bachelor of Technology (B.Tech), Budge Budge Institute of Technology",
    },
    {
      name: "Paromita Saha",
      role: "Full Stack Developer",
      avatar: "PS",
      bio: "Full Stack MERN Developer building scalable, secure, and high-performance web applications.",
      expertise: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "RESTful APIs",
        "Frontend Architecture",
        "Backend Development",
        "Application Security",
      ],
      linkedin: "https://linkedin.com/in/paromita-puja",
      fullBio:
        "Paromita Saha is a Full Stack Developer specializing in the MERN stack. She develops dynamic and scalable web applications with a focus on performance, security, and user experience. With strong backend and frontend capabilities, she contributes to delivering robust and production-ready software solutions.",
      education:
        "Techno India University | NSHM College of Management and Technology",
    },
  ];

  const displayTeam = leadershipTeam.length > 0 ? leadershipTeam : fallbackTeam;

  const getAvatarImage = (avatar) => {
    switch (avatar) {
      case "DG":
        return firstdirectorpic;
      case "AK":
        return secdirectorpic;
      case "PD":
        return firstdeveloperpic;
      case "PS":
        return secdeveloperpic;
      default:
        return innovation;
    }
  };

  const handleLeaderClick = (leader) => {
    setSelectedLeader(leader);
    setOpenDialog(true);
  };

  return (
    <Box
      sx={{
        py: 2,
        width: "100%",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 5 },
        }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4, md: 5, lg: 6 } }}>
          <Chip
            label="LEADERSHIP"
            color="secondary"
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
              lineHeight: { xs: 1.2, sm: 1.3 },
              color: "#1a237e",
            }}
          >
            Meet Our Leadership Team
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: { xs: "95%", sm: "85%", md: "75%", lg: "65%" },
              mx: "auto",
              fontSize: getFontSize.body1,
              px: { xs: 2, sm: 3 },
              lineHeight: { xs: 1.5, sm: 1.6 },
            }}
          >
            Industry veterans with decades of combined experience in technology
            and business transformation
          </Typography>
        </Box>

        {/* Team Grid */}
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
        >
          {displayTeam.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Grow in={true} timeout={index * 200}>
                <Card
                  sx={{
                    height: { xs: 320, sm: 350, md: 400, lg: 500 },
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    boxShadow: theme.shadows[2],
                    "&:hover": {
                      transform: isDesktop ? "translateY(-10px)" : "none",
                      boxShadow: isDesktop
                        ? theme.shadows[10]
                        : theme.shadows[4],
                      "& .leader-image": {
                        transform: isDesktop ? "scale(1.1)" : "none",
                      },
                      "& .leader-overlay": {
                        opacity: isDesktop ? 1 : 0,
                      },
                    },
                  }}
                  onClick={() => handleLeaderClick(member)}
                >
                  <Box
                    className="leader-image"
                    sx={{
                      height: { xs: "55%", sm: "58%", md: "60%" },
                      backgroundImage: `url(${getAvatarImage(member.avatar)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  <Box
                    className="leader-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: { xs: "45%", sm: "42%", md: "40%" },
                      bgcolor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="white"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                        textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                      }}
                    >
                      View Profile →
                    </Typography>
                  </Box>
                  <CardContent
                    sx={{
                      p: { xs: 1.5, sm: 2, md: 2.5 },
                      textAlign: "center",
                      // height: { xs: "45%", sm: "42%", md: "40%" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontWeight="bold"
                      sx={{
                        fontSize: {
                          xs: "0.95rem",
                          sm: "1rem",
                          md: "1.1rem",
                          lg: "1.2rem",
                        },
                        mb: { xs: 0.5, sm: 0.75 },
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      color="primary"
                      size="small"
                      sx={{
                        mb: { xs: 1, sm: 1.5, md: 2 },
                        fontWeight: "bold",
                        fontSize: getFontSize.caption,
                        height: { xs: 22, sm: 24, md: 26 },
                        alignSelf: "center",
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{
                        // mb: { xs: 1, sm: 1.5, md: 2 },
                        fontSize: getFontSize.body2,
                        px: { xs: 0.5, sm: 1 },
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: { xs: 1.4, sm: 1.5 },
                        // p:2
                      }}
                    >
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Show message if no team members */}
        {displayTeam.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 4, sm: 6, md: 8 },
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              }}
            >
              Loading team members...
            </Typography>
          </Box>
        )}
      </Container>

      {/* Leader Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            m: { xs: 1, sm: 2, md: 3 },
            maxHeight: { xs: "90vh", sm: "85vh", md: "80vh" },
            overflow: "hidden",
          },
        }}
      >
        {selectedLeader && (
          <>
            <DialogTitle
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.02),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
                <Avatar
                  src={getAvatarImage(selectedLeader.avatar)}
                  sx={{
                    width: { xs: 45, sm: 50, md: 60 },
                    height: { xs: 45, sm: 50, md: 60 },
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                    }}
                  >
                    {selectedLeader.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    {selectedLeader.role}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                overflowY: "auto",
              }}
            >
              <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary"
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Biography
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    fontSize: getFontSize.body1,
                    lineHeight: { xs: 1.5, sm: 1.6 },
                    color: "text.primary",
                  }}
                >
                  {selectedLeader.fullBio || selectedLeader.bio}
                </Typography>
              </Box>

              {selectedLeader.education && (
                <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    sx={{
                      fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    Education
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      fontSize: getFontSize.body1,
                      lineHeight: { xs: 1.5, sm: 1.6 },
                    }}
                  >
                    {selectedLeader.education}
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary"
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Expertise
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 0.5, sm: 1 },
                    flexWrap: "wrap",
                  }}
                >
                  {/* FIX: Handle both string and array formats */}
                  {selectedLeader.expertise && (
                    <>
                      {Array.isArray(selectedLeader.expertise)
                        ? // If it's an array, map directly
                          selectedLeader.expertise.map((skill, idx) => (
                            <Chip
                              key={idx}
                              label={
                                typeof skill === "string"
                                  ? skill.trim()
                                  : String(skill)
                              }
                              color="primary"
                              variant="outlined"
                              size={isMobile ? "small" : "medium"}
                              sx={{
                                fontWeight: "medium",
                                fontSize: getFontSize.caption,
                                height: { xs: 24, sm: 28, md: 32 },
                              }}
                            />
                          ))
                        : // If it's a string, split it
                          typeof selectedLeader.expertise === "string" &&
                          selectedLeader.expertise
                            .split(",")
                            .map((skill, idx) => (
                              <Chip
                                key={idx}
                                label={skill.trim()}
                                color="primary"
                                variant="outlined"
                                size={isMobile ? "small" : "medium"}
                                sx={{
                                  fontWeight: "medium",
                                  fontSize: getFontSize.caption,
                                  height: { xs: 24, sm: 28, md: 32 },
                                }}
                              />
                            ))}
                    </>
                  )}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 0 },
                bgcolor: alpha(theme.palette.primary.main, 0.02),
              }}
            >
              <Button
                onClick={() => setOpenDialog(false)}
                fullWidth={isMobile}
                variant="outlined"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  order: { xs: 2, sm: 1 },
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                href={selectedLeader.linkedin || "#"}
                target="_blank"
                fullWidth={isMobile}
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  order: { xs: 1, sm: 2 },
                }}
              >
                View LinkedIn Profile
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default OurTeam;
