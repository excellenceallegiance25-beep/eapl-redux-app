import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import customerReview from "../../assets/images/customerReview.avif";
import { getReviewList } from "../../services/AppConfigAction";

const ReviewsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const result = await dispatch(getReviewList());
      if (result?.type === "REVIEW_LIST") {
        setReviews(result.payload || []);
      }
    };
    loadReviews();
  }, [dispatch]);

  const scrollingReviews = reviews.length ? [...reviews, ...reviews] : [];

  // Animation speed based on screen size
  const getAnimationSpeed = () => {
    if (isMobile) return "25s";
    if (isTablet) return "30s";
    return "36s";
  };

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6, md: 8, lg: 10 },
        background: "linear-gradient(135deg, #162a3a, #4a6d87, #8daec3, #d97b6a)",
        color: "#fff",
      }}
    >
      <Container maxWidth="xl">
        {/* ================= HEADER ================= */}
        <Box textAlign="center" sx={{ mb: { xs: 3, sm: 4, md: 5, lg: 6 } }}>
          <Chip
            label="Client Reviews"
            color="secondary"
            sx={{
              mb: { xs: 1, sm: 1.5, md: 2 },
              fontWeight: 600,
              px: { xs: 1.5, sm: 2 },
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
              height: { xs: 24, sm: 28, md: 32 },
            }}
          />

          <Typography
            fontWeight={700}
            sx={{
              fontSize: {
                xs: "1.4rem",
                sm: "1.8rem",
                md: "2.2rem",
                lg: "2.4rem",
              },
              mb: { xs: 0.5, sm: 0.75, md: 1 },
              lineHeight: { xs: 1.3, sm: 1.2 },
            }}
          >
            What Our Clients Say
          </Typography>

          <Typography
            sx={{
              fontSize: { 
                xs: "0.85rem", 
                sm: "0.95rem", 
                md: "1.05rem", 
                lg: "1.1rem" 
              },
              opacity: 0.9,
              px: { xs: 2, sm: 0 },
            }}
          >
            Trusted by professionals across industries
          </Typography>
        </Box>

        {/* ================= MAIN LAYOUT ================= */}
        <Box
          sx={{
            minHeight: { xs: 400, sm: 450, md: 500, lg: 520 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, sm: 4, md: 4, lg: 5 },
          }}
        >
          {/* ================= REVIEWS COLUMN ================= */}
          <Box
            sx={{
              flex: { md: 1 },
              width: { xs: "100%", md: "auto" },
              position: "relative",
              height: { 
                xs: 380, 
                sm: 420, 
                md: 500, 
                lg: 520 
              },
              overflow: "hidden",
            }}
          >
            {/* Top Gradient Fade */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: { xs: 30, sm: 35, md: 40 },
                zIndex: 2,
                background: "linear-gradient(to bottom, rgba(22,42,58,1), rgba(22,42,58,0))",
                pointerEvents: "none",
              }}
            />

            {/* Bottom Gradient Fade */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: { xs: 30, sm: 35, md: 40 },
                zIndex: 2,
                background: "linear-gradient(to top, rgba(22,42,58,1), rgba(22,42,58,0))",
                pointerEvents: "none",
              }}
            />

            <Box
              className="reviews-scroll"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 2.5, md: 3 },
                animation: `scrollReviews ${getAnimationSpeed()} linear infinite`,
                pr: { xs: 0.5, sm: 1, md: 1.5 },
              }}
            >
              {scrollingReviews.map((review, index) => {
                // Responsive transformations
                const getOffset = () => {
                  if (isMobile) return index % 2 === 0 ? -5 : 5;
                  if (isTablet) return index % 2 === 0 ? -10 : 10;
                  return index % 2 === 0 ? -15 : 15;
                };
                
                const offset = getOffset();
                const rotation = index % 3 === 0 ? "-0.5deg" : "0.5deg";

                return (
                  <Card
                    key={`${index}-${review.id || index}`}
                    sx={{
                      p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                      borderRadius: { xs: 2, sm: 2.5, md: 3 },
                      width: { 
                        xs: "98%", 
                        sm: "96%", 
                        md: "95%",
                        lg: "94%" 
                      },
                      alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                      transform: {
                        xs: `translateX(${offset * 0.5}px) rotate(${rotation})`,
                        sm: `translateX(${offset * 0.7}px) rotate(${rotation})`,
                        md: `translateX(${offset}px) rotate(${rotation})`,
                      },
                      boxShadow: theme.shadows[4],
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: {
                          xs: "translateY(-3px) scale(1.01)",
                          sm: "translateY(-4px) scale(1.015)",
                          md: "translateY(-5px) scale(1.02)",
                        },
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <Rating
                      value={review.rating || 5}
                      readOnly
                      size={isMobile ? "small" : "medium"}
                      sx={{ 
                        mb: { xs: 0.5, sm: 0.75, md: 1 },
                        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }
                      }}
                    />

                    <Typography
                      color="text.secondary"
                      sx={{
                        mb: { xs: 1.5, sm: 1.75, md: 2 },
                        fontStyle: "italic",
                        fontSize: { 
                          xs: "0.8rem", 
                          sm: "0.85rem", 
                          md: "0.9rem",
                          lg: "0.95rem" 
                        },
                        lineHeight: { xs: 1.5, sm: 1.55, md: 1.6 },
                        display: "-webkit-box",
                        WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      "{review.comment_text}"
                    </Typography>

                    <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5, md: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: { xs: 32, sm: 38, md: 42, lg: 44 },
                          height: { xs: 32, sm: 38, md: 42, lg: 44 },
                          fontWeight: 600,
                          fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.9rem", lg: "1rem" },
                        }}
                      >
                        {review.initials ||
                          review.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          fontWeight={600}
                          sx={{
                            fontSize: { 
                              xs: "0.8rem", 
                              sm: "0.85rem", 
                              md: "0.95rem",
                              lg: "1rem" 
                            },
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: { xs: 150, sm: 180, md: 200, lg: 220 },
                          }}
                        >
                          {review.name}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: { 
                              xs: "0.65rem", 
                              sm: "0.7rem", 
                              md: "0.8rem",
                              lg: "0.85rem" 
                            },
                            opacity: 0.8,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: { xs: 150, sm: 180, md: 200, lg: 220 },
                          }}
                        >
                          {review.position}
                          {review.company && `, ${review.company}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Box>

          {/* ================= IMAGE COLUMN ================= */}
          <Box
            sx={{
              width: { xs: "100%", md: "45%", lg: "42%" },
              height: { 
                xs: 250, 
                sm: 300, 
                md: "auto",
                lg: "auto" 
              },
              display: "flex",
              mt: { xs: 2, sm: 3, md: 0 },
            }}
          >
            <Box
              sx={{
                position: { xs: "relative", md: "sticky" },
                top: { md: 24, lg: 32 },
                height: "100%",
                width: "100%",
                borderRadius: { xs: 3, sm: 3.5, md: 4 },
                overflow: "hidden",
                boxShadow: theme.shadows[6],
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box
                component="img"
                src={customerReview}
                alt="Customer reviews"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: { xs: "scale(1.03)", sm: "scale(1.04)", md: "scale(1.05)" },
                  },
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  color: "white",
                  padding: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.95rem",
                      sm: "1.1rem",
                      md: "1.2rem",
                      lg: "1.3rem",
                    },
                    fontWeight: 600,
                    mb: { xs: 0.25, sm: 0.5 },
                  }}
                >
                  Happy Customers
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.8rem",
                      md: "0.85rem",
                      lg: "0.9rem",
                    },
                    opacity: 0.9,
                  }}
                >
                  Trusted by thousands worldwide
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ================= ANIMATION ================= */}
        <style>
          {`
          @keyframes scrollReviews {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          .reviews-scroll:hover {
            animation-play-state: paused;
          }

          /* Smooth scrolling on mobile */
          @media (max-width: 600px) {
            .reviews-scroll {
              will-change: transform;
              -webkit-overflow-scrolling: touch;
            }
          }
        `}
        </style>
      </Container>
    </Box>
  );
};

export default ReviewsSection;