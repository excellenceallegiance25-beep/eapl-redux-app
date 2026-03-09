import {
  People,
  Rocket,
  ThumbUp,
  Timeline,
  TrendingUp,
  EmojiEvents,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Chip,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Fade,
  Zoom,
  Avatar,
  Paper,
  Grow,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import happy_client_background from "../../assets/images/happy_client.jpg";
import meeting from "../../assets/images/meeting.jpg";
import team_background from "../../assets/images/team_bg.avif";
import wave_graph_background from "../../assets/images/wave_graph_bg.avif";
import { getAchievementssList } from "../../services/AppConfigAction";

// Icon mapping
const ICON_CONFIG = {
  Rocket: { component: Rocket, color: "#4361ee" },
  Timeline: { component: Timeline, color: "#f72585" },
  ThumbUp: { component: ThumbUp, color: "#4cc9f0" },
  People: { component: People, color: "#f8961e" },
  TrendingUp: { component: TrendingUp, color: "#38b000" },
  EmojiEvents: { component: EmojiEvents, color: "#ffb703" },
};

// Color palette for achievements (hex colors only for MUI compatibility)
const COLOR_PALETTE = [
  "#4361ee", // Primary Blue
  "#f72585", // Pink
  "#4cc9f0", // Light Blue
  "#f8961e", // Orange
  "#38b000", // Green
  "#7209b7", // Purple
];

const ACHIEVEMENT_IMAGES = {
  "Total Projects": wave_graph_background,
  "Ongoing Projects": meeting,
  "Happy Clients": happy_client_background,
  "Team Members": team_background,
};

const getIconComponent = (iconName, props = {}) => {
  const iconConfig = ICON_CONFIG[iconName] || ICON_CONFIG.Rocket;
  const IconComponent = iconConfig.component;
  return <IconComponent {...props} />;
};

const AchievementsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});
  const sectionRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        const result = await dispatch(getAchievementssList());
        if (result.type === "ACHIEVEMENT_LIST") {
          setAchievements(result.payload);
        }
      } catch (error) {
        console.error("Failed to load achievements:", error);
      }
    };
    loadConfigs();
  }, [dispatch]);

  // Animate counting numbers when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            achievements.forEach((achievement, index) => {
              // Extract numeric value from string (e.g., "150+" -> 150)
              const numericValue =
                parseInt(achievement.value.replace(/[^0-9]/g, "")) || 0;
              animateValue(index, 0, numericValue, 2000);
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [achievements]);

  const animateValue = (index, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setAnimatedValues((prev) => ({
        ...prev,
        [index]: Math.floor(current),
      }));
    }, 16);

    return () => clearInterval(timer);
  };

  const getColorForIndex = (index) => {
    return COLOR_PALETTE[index % COLOR_PALETTE.length];
  };

  // Format the display value with suffix
  const getDisplayValue = (achievement, index) => {
    const numericValue = animatedValues[index];
    if (numericValue === undefined) return achievement.value;

    const suffix = achievement.suffix || "";
    const hasPlus = achievement.value.includes("+");
    return `${numericValue}${hasPlus ? "+" : ""}${suffix}`;
  };

  if (achievements.length === 0) {
    return null;
  }

  // ✅ FULLY RESPONSIVE VERSION

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 10,
        // background: "#e9f6f8",
        background: `linear-gradient(45deg,rgba(205, 230, 245, 0.7) 50%,rgba(141, 218, 240, 0.4) 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: -60, md: -100 },
          right: { xs: -60, md: -100 },
          width: { xs: 180, md: 300 },
          height: { xs: 180, md: 300 },
          borderRadius: "50%",
          background: "rgba(101, 173, 173, 0.51)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: -80, md: -120 },
          left: { xs: -80, md: -120 },
          width: { xs: 220, md: 400 },
          height: { xs: 220, md: 400 },
          borderRadius: "50%",
          background: "rgba(243, 124, 177, 0.44)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        {/* ================= HEADER ================= */}
        <Box textAlign="center" mb={{ xs: 6, sm: 8, md: 10 }}>
          <Chip
            icon={<EmojiEvents sx={{ fontSize: 18 }} />}
            label="Our Track Record"
            sx={{
              mb: 3,
              fontWeight: 600,
              fontSize: { xs: "0.75rem", sm: "0.9rem" },
              px: 3,
              py: 1.8,
              borderRadius: "40px",
              backgroundColor: "#1a237e",
              color: "white",
            }}
          />

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: "1.9rem",
                sm: "2.5rem",
                md: "3.2rem",
                lg: "3.8rem",
              },
              color: "#1a237e",
              mb: 2,
            }}
          >
            Excellence in Numbers
          </Typography>

          <Typography
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: {
                xs: "0.95rem",
                sm: "1.05rem",
                md: "1.2rem",
              },
              color: "#546e7a",
              lineHeight: 1.7,
            }}
          >
            Transforming visions into reality through measurable results and
            unwavering commitment
          </Typography>
        </Box>

        {/* ================= GRID ================= */}
        <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
          {achievements.slice(0, 4).map((achievement, index) => {
            const color = getColorForIndex(index);
            const image =
              ACHIEVEMENT_IMAGES[achievement.title] || wave_graph_background;
            const isHovered = hoveredIndex === index;

            return (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <Paper
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  elevation={isHovered ? 10 : 3}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderTop: `4px solid ${color}`,
                  }}
                >
                  {/* IMAGE */}
                  <Box
                    sx={{
                      height: {
                        xs: 160,
                        sm: 180,
                        md: 200,
                      },
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.4s ease",
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* CONTENT */}
                  <Box
                    sx={{
                      p: { xs: 2.5, sm: 3, md: 4 },
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Title Row */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: { xs: 40, sm: 46 },
                          height: { xs: 40, sm: 46 },
                          bgcolor: alpha(color, 0.12),
                          color: color,
                          mr: 2,
                        }}
                      >
                        {getIconComponent(achievement.icon)}
                      </Avatar>

                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                          },
                        }}
                      >
                        {achievement.title}
                      </Typography>
                    </Box>

                    {/* VALUE */}
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: {
                          xs: "2.3rem",
                          sm: "2.8rem",
                          md: "3.2rem",
                        },
                        color: color,
                        mb: 1,
                      }}
                    >
                      {getDisplayValue(achievement, index)}
                    </Typography>

                    {/* DESCRIPTION */}
                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: {
                          xs: "0.85rem",
                          sm: "0.95rem",
                        },
                        lineHeight: 1.6,
                        flexGrow: 1,
                      }}
                    >
                      {achievement.description}
                    </Typography>

                    {/* Progress */}
                    <Box
                      sx={{
                        mt: 3,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: alpha(color, 0.2),
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: isHovered ? "100%" : "70%",
                          backgroundColor: color,
                          transition: "width 0.4s ease",
                        }}
                      />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );

  // return (
  //   <Box
  //     ref={sectionRef}
  //     sx={{
  //       py: { xs: 10, sm: 12, md: 16 },
  //       background: "#ffffff",
  //       position: "relative",
  //       overflow: "hidden",
  //     }}
  //   >
  //     {/* Background Decorative Elements - Using hex colors only */}
  //     <Box
  //       sx={{
  //         position: "absolute",
  //         top: -100,
  //         right: -100,
  //         width: 300,
  //         height: 300,
  //         borderRadius: "50%",
  //         background: "rgba(67, 97, 238, 0.03)",
  //         zIndex: 1,
  //       }}
  //     />
  //     <Box
  //       sx={{
  //         position: "absolute",
  //         bottom: -100,
  //         left: -100,
  //         width: 400,
  //         height: 400,
  //         borderRadius: "50%",
  //         background: "rgba(247, 37, 133, 0.03)",
  //         zIndex: 1,
  //       }}
  //     />

  //     <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
  //       {/* Header Section */}
  //       <Fade in timeout={1000}>
  //         <Box textAlign="center" sx={{ mb: { xs: 8, sm: 10, md: 12 } }}>
  //           <Zoom in timeout={800}>
  //             <Chip
  //               icon={<EmojiEvents sx={{ fontSize: 20 }} />}
  //               label="Our Track Record"
  //               sx={{
  //                 mb: 4,
  //                 fontWeight: 600,
  //                 fontSize: { xs: "0.9rem", sm: "1rem" },
  //                 py: 2.5,
  //                 px: 4,
  //                 backgroundColor: "#1a237e",
  //                 color: "white",
  //                 border: "none",
  //                 boxShadow: "0 8px 20px rgba(26, 35, 126, 0.2)",
  //                 borderRadius: "50px",
  //                 letterSpacing: "0.5px",
  //                 textTransform: "uppercase",
  //                 '&:hover': {
  //                   backgroundColor: "#0d47a1",
  //                 }
  //               }}
  //             />
  //           </Zoom>

  //           <Typography
  //             variant="h2"
  //             sx={{
  //               fontWeight: 800,
  //               fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4rem" },
  //               color: "#1a237e",
  //               mb: 2,
  //               letterSpacing: "-0.02em",
  //               lineHeight: 1.2,
  //             }}
  //           >
  //             Excellence in Numbers
  //           </Typography>

  //           <Typography
  //             variant="h6"
  //             sx={{
  //               maxWidth: 700,
  //               mx: "auto",
  //               fontSize: { xs: "1.1rem", sm: "1.25rem" },
  //               color: "#546e7a",
  //               lineHeight: 1.8,
  //               fontWeight: 400,
  //             }}
  //           >
  //             Transforming visions into reality through measurable results and unwavering commitment
  //           </Typography>
  //         </Box>
  //       </Fade>

  //       {/* Achievements Grid */}
  //       <Grid container spacing={{ xs: 4, md: 5 }} justifyContent={'center'}>
  //         {achievements.slice(0, 4).map((achievement, index) => {
  //           const color = getColorForIndex(index);
  //           const image = ACHIEVEMENT_IMAGES[achievement.title] || wave_graph_background;
  //           const isHovered = hoveredIndex === index;

  //           return (
  //             <Grid item xs={12} sm={6} key={index}>
  //               <Grow in timeout={800 + index * 200}>
  //                 <Paper
  //                   onMouseEnter={() => setHoveredIndex(index)}
  //                   onMouseLeave={() => setHoveredIndex(null)}
  //                   elevation={isHovered ? 12 : 4}
  //                   sx={{
  //                     borderRadius: 4,
  //                     overflow: "hidden",
  //                     backgroundColor: "#ffffff",
  //                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  //                     transform: isHovered ? "translateY(-8px)" : "none",
  //                     height: "100%",
  //                     position: "relative",
  //                     borderTop: `4px solid ${color}`,
  //                   }}
  //                 >
  //                   <Box sx={{ position: "relative", height: 200, overflow: "hidden" }}>
  //                     <Box
  //                       sx={{
  //                         height: "100%",
  //                         backgroundImage: `url(${image})`,
  //                         backgroundSize: "cover",
  //                         backgroundPosition: "center",
  //                         transition: "transform 0.5s ease",
  //                         transform: isHovered ? "scale(1.1)" : "scale(1)",
  //                       }}
  //                     />
  //                     <Box
  //                       sx={{
  //                         position: "absolute",
  //                         top: 0,
  //                         left: 0,
  //                         right: 0,
  //                         bottom: 0,
  //                         background: `linear-gradient(to top, rgba(0,0,0,0.7), transparent)`,
  //                       }}
  //                     />
  //                   </Box>

  //                   <Box sx={{ p: 4 }}>
  //                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
  //                       <Avatar
  //                         sx={{
  //                           width: 48,
  //                           height: 48,
  //                           backgroundColor: alpha(color, 0.1),
  //                           color: color,
  //                           mr: 2,
  //                         }}
  //                       >
  //                         {getIconComponent(achievement.icon)}
  //                       </Avatar>
  //                       <Typography variant="h5" fontWeight={600} color="#1e293b">
  //                         {achievement.title}
  //                       </Typography>
  //                     </Box>

  //                     <Typography
  //                       variant="h2"
  //                       sx={{
  //                         fontSize: { xs: "3rem", md: "3.5rem" },
  //                         fontWeight: 800,
  //                         color: color,
  //                         mb: 1,
  //                         lineHeight: 1.2,
  //                       }}
  //                     >
  //                       {getDisplayValue(achievement, index)}
  //                     </Typography>

  //                     <Typography
  //                       variant="body1"
  //                       sx={{
  //                         color: "#64748b",
  //                         lineHeight: 1.7,
  //                         fontSize: "1rem",
  //                       }}
  //                     >
  //                       {achievement.description}
  //                     </Typography>

  //                     {/* Progress indicator */}
  //                     <Box
  //                       sx={{
  //                         mt: 3,
  //                         height: 4,
  //                         borderRadius: 2,
  //                         backgroundColor: alpha(color, 0.2),
  //                         overflow: "hidden",
  //                       }}
  //                     >
  //                       <Box
  //                         sx={{
  //                           height: "100%",
  //                           width: isHovered ? "100%" : "70%",
  //                           backgroundColor: color,
  //                           borderRadius: 2,
  //                           transition: "width 0.5s ease",
  //                         }}
  //                       />
  //                     </Box>
  //                   </Box>
  //                 </Paper>
  //               </Grow>
  //             </Grid>
  //           );
  //         })}
  //       </Grid>

  //       {/* Call to Action Section - Using solid colors */}
  //       {/* <Fade in timeout={1500}>
  //         <Box
  //           sx={{
  //             mt: { xs: 8, md: 12 },
  //             textAlign: "center",
  //             p: { xs: 4, md: 6 },
  //             borderRadius: 4,
  //             background: "linear-gradient(145deg, #1a237e, #0d47a1)",
  //             color: "white",
  //           }}
  //         >
  //           <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
  //             Ready to Achieve More?
  //           </Typography>
  //           <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
  //             Join us in our journey of excellence and innovation
  //           </Typography>
  //           <Chip
  //             label="Contact Us Today"
  //             onClick={() => {}}
  //             sx={{
  //               backgroundColor: "white",
  //               color: "#1a237e",
  //               fontWeight: 600,
  //               fontSize: "1rem",
  //               py: 3,
  //               px: 4,
  //               "&:hover": {
  //                 backgroundColor: alpha("#fff", 0.9),
  //                 transform: "scale(1.05)",
  //                 cursor: "pointer",
  //               },
  //               transition: "all 0.3s ease",
  //             }}
  //           />
  //         </Box>
  //       </Fade> */}

  //       {/* Footer Stats */}
  //       {/* <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           gap: 4,
  //           mt: 6,
  //           pt: 4,
  //           borderTop: "1px solid #e0e0e0",
  //         }}
  //       >
  //         {achievements.slice(0, 3).map((achievement, index) => (
  //           <Box key={index} sx={{ textAlign: "center" }}>
  //             <Typography variant="h6" sx={{ color: getColorForIndex(index), fontWeight: 700 }}>
  //               {achievement.value}
  //             </Typography>
  //             <Typography variant="caption" sx={{ color: "#757575" }}>
  //               {achievement.title}
  //             </Typography>
  //           </Box>
  //         ))}
  //       </Box> */}
  //     </Container>
  //   </Box>
  // );
};

export default AchievementsSection;
