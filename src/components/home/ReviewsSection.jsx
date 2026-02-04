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
import { getReviewList } from "../../services/AppConfigAction";
import cloudCartoon from '../../assets/images/cloudCartoon.avif';
import customerReview from '../../assets/images/customerReview.png';

const ReviewsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  return (
    <Box sx={{
      py: { xs: 6, md: 10 },
      // background: 'linear-gradient(135deg, #114b7d, rgba(10, 143, 167, 0.8))',
      background: 'linear-gradient(135deg, #162a3a, #4a6d87, #8daec3, #d97b6a)',
      color: '#ffff'
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 2 }}>
          <Chip
            label="Client Reviews"
            color="secondary"
            sx={{ mb: 2, fontWeight: 600, px: 2 }}
          />
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            What Our Clients Say
          </Typography>
          <Typography color="#ffff">
            Trusted by professionals across industries
          </Typography>
        </Box>

        {/* Scroll Container with Two Columns */}
        <Box
          sx={{
            height: 500,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            gap: 4,
          }}
        >
          {/* First Column - Reviews */}
          <Box
            sx={{
              flex: 1,
              // overflow: "auto",
              position: "relative",
            }}
          >
            <Box
              className="reviews-scroll"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                animation: "scrollReviews 32s linear infinite",
              }}
            >
              {scrollingReviews.map((review, index) => {
                const offset = index % 2 === 0 ? -20 : 20;
                const rotation = index % 3 === 0 ? "-1deg" : "1deg";

                return (
                  <Card
                    key={index}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      width: "100%",
                      alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                      transform: `translateX(${offset}px) rotate(${rotation})`,
                      boxShadow: theme.shadows[4],
                      transition: "all 0.3s ease",
                      "&:hover": !isMobile && {
                        transform: "translateY(-6px) scale(1.02)",
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <Rating
                      value={review.rating || 0}
                      readOnly
                      size="small"
                      sx={{ mb: 1 }}
                    />

                    <Typography
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontStyle: "italic",
                        lineHeight: 1.6,
                      }}
                    >
                      "{review.comment_text}"
                    </Typography>

                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: 44,
                          height: 44,
                          fontWeight: 600,
                        }}
                      >
                        {review.initials ||
                          review.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                      </Avatar>

                      <Box>
                        <Typography fontWeight={600}>
                          {review.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {review.position}
                          {review.company && `, ${review.company}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>

            {/* Gradient overlay at bottom for smooth scrolling */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 30,
                background: "linear-gradient(to right ,transparent, #114b7d,transparent)",
                zIndex: 2,
              }}
            />
          </Box>

          {/* Second Column - Single Full-height Image */}
          <Box
            sx={{
              width: isMobile ? "40%" : "45%",
              display: { xs: "none", md: "block" }, // Hide on mobile, show on desktop
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 20,
                height: "100%",
                width: "100%",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: theme.shadows[6],
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              {/* Replace with your actual image */}
              <Box
                component="img"
                src={customerReview} // Your image path here
                alt="Customer reviews"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />

              {/* Optional overlay with text */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  color: "white",
                  padding: 3,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Happy Customers
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Trusted by thousands worldwide
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Scroll Container */}
        {/* <Box
          sx={{
            height: 500,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            className="reviews-scroll"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              animation: "scrollReviews 32s linear infinite",
            }}
          >
            {scrollingReviews.map((review, index) => {
              const offset = index % 2 === 0 ? -20 : 20;
              const rotation = index % 3 === 0 ? "-1deg" : "1deg";

              return (
                <Card
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    width: isMobile ? "100%" : "92%",
                    alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                    transform: `translateX(${offset}px) rotate(${rotation})`,
                    boxShadow: theme.shadows[4],
                    transition: "all 0.3s ease",
                    "&:hover": !isMobile && {
                      transform: "translateY(-6px) scale(1.02)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Rating
                    value={review.rating || 0}
                    readOnly
                    size="small"
                    sx={{ mb: 1 }}
                  />

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}
                  >
                    “{review.comment_text}”
                  </Typography>

                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 44,
                        height: 44,
                        fontWeight: 600,
                      }}
                    >
                      {review.initials ||
                        review.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </Avatar>

                    <Box>
                      <Typography fontWeight={600}>
                        {review.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.position}
                        {review.company && `, ${review.company}`}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Box> */}

        {/* Animation + Pause on Hover */}
        <style>
          {`
            @keyframes scrollReviews {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(-50%);
              }
            }

            .reviews-scroll:hover {
              animation-play-state: paused;
            }
          `}
        </style>
      </Container>
    </Box>
  );
};

export default ReviewsSection;
