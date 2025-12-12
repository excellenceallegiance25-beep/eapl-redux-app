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
import { useEffect, useState } from 'react';
import { getReviewList } from "../../services/AppConfigAction";
import { useDispatch } from 'react-redux';


const reviewss = [
  {
    name: "Sarah Johnson",
    position: "CTO",
    company: "TechCorp Inc.",
    comment:
      "Excellence Allegiance transformed our digital infrastructure. Exceptional quality and support throughout the project.",
    rating: 5,
    initials: "SJ",
    color: "#2196F3",
  },
  {
    name: "Michael Chen",
    position: "CEO",
    company: "InnovateLabs",
    comment:
      "The best tech partner we've worked with. Their cloud expertise saved us 40% in costs.",
    rating: 5,
    initials: "MC",
    color: "#4CAF50",
  },
  {
    name: "Emma Davis",
    position: "Director",
    company: "GlobalTech",
    comment:
      "Professional team, on-time delivery, and excellent post-launch support.",
    rating: 4,
    initials: "ED",
    color: "#FF9800",
  },
];

// Duplicate list for seamless scrolling

const ReviewsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // Move the function definition inside useEffect
    const loadConfigs = async () => {
      const result = await dispatch(getReviewList());
      console.log('Configurations loaded successfully', 'success');
      if (result.type === "REVIEW_LIST") {
        setReviews(result.payload);
      }
    };

    loadConfigs();
  }, [dispatch]); // Only dispatch is needed as dependency

  const scrollingReviews = [...reviews, ...reviews];

  return (
    <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: "grey.50" }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Chip
            label="Client Reviews"
            color="secondary"
            sx={{ mb: 2, fontWeight: "bold", px: 2, py: 1 }}
          />
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            What Our Clients Say
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Reviews scroll automatically.
          </Typography>
        </Box>

        {/* Always scrolling (no pause) */}
        <Box
          sx={{
            height: 350,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              animation: "scrollReviews 30s linear infinite",
            }}
          >
            {scrollingReviews.map((review, index) => (
              <Card
                key={index}
                sx={{
                  p: 3,
                  mb: 2,
                  borderRadius: 3,
                  transition: "transform .2s",
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <Rating value={review.rating} readOnly sx={{ mb: 1 }} />

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2, fontStyle: "italic" }}
                >
                  "{review.comment_text}"
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: review.color }}>
                    {review.initials}
                  </Avatar>

                  <Box>
                    <Typography fontWeight="bold">{review.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.position}, {review.company}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Animation */}
        <style>
          {`
            @keyframes scrollReviews {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
          `}
        </style>
      </Container>
    </Box>
  );
};

export default ReviewsSection;
