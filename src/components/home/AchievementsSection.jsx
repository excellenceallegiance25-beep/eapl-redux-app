import { Rocket, Timeline, ThumbUp, People } from '@mui/icons-material';
import {
    Box,
    Card,
    Chip,
    Container,
    Grid,
    Slide,
    Typography,
    useMediaQuery,
    useTheme,
    alpha,
} from '@mui/material';
import { useEffect, useState } from 'react';

const achievements = [
    {
        title: 'Projects Delivered',
        value: '500+',
        description: 'Successful implementations worldwide',
        icon: <Rocket fontSize="large" />,
        color: '#2196F3',
    },
    {
        title: 'Ongoing Projects',
        value: '85+',
        description: 'Currently active development',
        icon: <Timeline fontSize="large" />,
        color: '#4CAF50',
    },
    {
        title: 'Happy Clients',
        value: '200+',
        description: 'Global enterprise customers',
        icon: <ThumbUp fontSize="large" />,
        color: '#FF9800',
    },
    {
        title: 'Team Members',
        value: '150+',
        description: 'Expert engineers & consultants',
        icon: <People fontSize="large" />,
        color: '#9C27B0',
    },
];

const AchievementsSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate achievements
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % achievements.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ py: { xs: 6, sm: 8, md: 12 }, bgcolor: 'grey.50' }}>
            <Container maxWidth="xl">
                <Box textAlign="center" sx={{ mb: { xs: 4, sm: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
                    <Chip
                        label="Our Achievements"
                        color="secondary"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            py: 1,
                            px: 2,
                        }}
                    />
                    <Typography
                        variant={isMobile ? "h3" : "h2"}
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
                    >
                        Delivering Excellence Since 2010
                    </Typography>
                    <Typography
                        variant={isMobile ? "body1" : "h6"}
                        color="text.secondary"
                        sx={{
                            maxWidth: 700,
                            mx: 'auto',
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                        }}
                    >
                        Measurable impact and continuous growth
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}
                    sx={{
                        // transition: 'all 0.5s ease-in-out',
                        justifyContent: 'center', // Center align cards
                    }}>
                    {achievements.map((achievement, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Slide direction="up" in={true} timeout={500 + index * 200}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        p: { xs: 2, sm: 3, md: 4 },
                                        height: '100%',
                                        border: activeIndex === index ? `2px solid ${achievement.color}` : 'none',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: theme.shadows[6],
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: 60, md: 80 },
                                            height: { xs: 60, md: 80 },
                                            borderRadius: '50%',
                                            bgcolor: alpha(achievement.color, 0.1),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 20px',
                                            color: achievement.color,
                                        }}
                                    >
                                        {achievement.icon}
                                    </Box>
                                    <Typography
                                        variant={isMobile ? "h3" : "h2"}
                                        fontWeight="bold"
                                        gutterBottom
                                        color={achievement.color}
                                        sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                                    >
                                        {achievement.value}
                                    </Typography>
                                    <Typography
                                        variant={isMobile ? "subtitle1" : "h6"}
                                        gutterBottom
                                        sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                                    >
                                        {achievement.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {achievement.description}
                                    </Typography>
                                </Card>
                            </Slide>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default AchievementsSection;