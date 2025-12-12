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
import { useDispatch } from 'react-redux';
import { getAchievementssList } from '../../services/AppConfigAction';

// Icon mapping object
const iconComponents = {
    'Rocket': Rocket,
    'Timeline': Timeline,
    'ThumbUp': ThumbUp,
    'People': People,
    // Add more icons as needed based on your API response
};

// Function to get icon component
const getIconComponent = (iconName) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent fontSize="large" /> : <Rocket fontSize="large" />;
};

// Achievement backgrounds configuration - keep your existing backgrounds
const ACHIEVEMENT_BACKGROUNDS = {
    projects: 'linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80")',
    ongoing: 'linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80")',
    clients: 'linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("https://images.unsplash.com/photo-1551836026-d5c2d5e43487?auto=format&fit=crop&w=600&q=80")',
    team: 'linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80")',
};

const AchievementsSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeIndex, setActiveIndex] = useState(0);
    const [achievements, setAchievements] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadConfigs = async () => {
            const result = await dispatch(getAchievementssList());
            console.log('Achievements loaded:', result);
            if (result.type === "ACHIEVEMENT_LIST") {
                setAchievements(result.payload);
            }
        };
        loadConfigs();
    }, [dispatch]);

    // Auto-rotate achievements only when achievements are loaded
    useEffect(() => {
        if (achievements.length > 0) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % achievements.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [achievements.length]);

    // Function to get background based on achievement data
    const getAchievementBackground = (achievement) => {
        // Use API-provided bgImage if available, otherwise fallback
        if (achievement.bgType === 'image') {
            // If bgImage is a URL, use it directly
            if (achievement.bgImage?.startsWith('http')) {
                return `linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("${achievement.bgImage}")`;
            }
            // Otherwise use the hardcoded backgrounds
            const backgroundMap = {
                'projects_bg.jpg': ACHIEVEMENT_BACKGROUNDS.projects,
                'ongoing_bg.jpg': ACHIEVEMENT_BACKGROUNDS.ongoing,
                'clients_bg.jpg': ACHIEVEMENT_BACKGROUNDS.clients,
                'team_bg.jpg': ACHIEVEMENT_BACKGROUNDS.team,
            };
            return backgroundMap[achievement.bgImage] || ACHIEVEMENT_BACKGROUNDS.projects;
        }
        return `linear-gradient(135deg, ${alpha(achievement.color, 0.2)} 0%, ${alpha(achievement.color, 0.1)} 100%)`;
    };

    return (
        <Box sx={{
            py: { xs: 6, sm: 8, md: 12 },
            background: `
                linear-gradient(180deg, #202d55ff 0%, #111827 100%),
                radial-gradient(circle at 20% 80%, rgba(117, 100, 177, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(153, 99, 99, 0.05) 0%, transparent 50%)
            `,
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Box textAlign="center" sx={{ mb: { xs: 4, sm: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
                    <Chip
                        label="Our Achievements"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            py: 1,
                            px: 2,
                            background: 'linear-gradient(135deg, rgba(130, 109, 207, 0.85) 0%, rgba(172, 103, 103, 0.85) 100%)',
                            color: '#ffffff',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    />
                    <Typography
                        variant={isMobile ? "h3" : "h2"}
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                            background: `linear-gradient(135deg, 
                                rgba(130, 109, 207, 0.9) 0%, 
                                rgba(172, 103, 103, 0.9) 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 4px 30px rgba(130, 109, 207, 0.3)',
                        }}
                    >
                        Delivering Excellence Since 2020
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ justifyContent: 'center' }}>
                    {achievements.map((achievement, index) => (
                        <Grid item xs={12} sm={6} md={3} key={achievement.id || index}>
                            <Slide direction="up" in={true} timeout={500 + index * 200}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        p: { xs: 2, sm: 3, md: 4 },
                                        height: '100%',
                                        minHeight: 280,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: getAchievementBackground(achievement),
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backdropFilter: 'blur(10px)',
                                        border: `1px solid rgba(255, 255, 255, 0.1)`,
                                        borderRadius: 3,
                                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                                        zIndex: activeIndex === index ? 2 : 1,
                                        boxShadow: activeIndex === index
                                            ? `0 20px 40px rgba(0, 0, 0, 0.4),
                                               0 0 0 1px ${alpha(achievement.color, 0.4)},
                                               0 0 30px ${alpha(achievement.color, 0.3)}`
                                            : '0 8px 32px rgba(0, 0, 0, 0.2)',
                                        '&:hover': {
                                            transform: 'translateY(-8px) scale(1.02)',
                                            boxShadow: `
                                                0 25px 50px rgba(0, 0, 0, 0.4),
                                                0 0 0 1px ${alpha(achievement.color, 0.5)},
                                                0 0 40px ${alpha(achievement.color, 0.4)}
                                            `,
                                            borderColor: alpha(achievement.color, 0.6),
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(135deg, 
                                                rgba(0, 0, 0, 0.6) 0%, 
                                                rgba(0, 0, 0, 0.8) 100%)`,
                                            opacity: 0.7,
                                            zIndex: 0,
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        {/* Icon Container */}
                                        <Box
                                            className="achievement-icon"
                                            sx={{
                                                width: { xs: 70, md: 90 },
                                                height: { xs: 70, md: 90 },
                                                borderRadius: '50%',
                                                background: `linear-gradient(135deg, 
                                                    ${alpha(achievement.color, 0.2)} 0%, 
                                                    ${alpha(achievement.color, 0.1)} 100%)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 20px',
                                                color: '#ffffff',
                                                fontSize: { xs: '2rem', md: '2.5rem' },
                                                backdropFilter: 'blur(10px)',
                                                border: `2px solid ${alpha('#ffffff', 0.2)}`,
                                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}
                                        >
                                            {getIconComponent(achievement.icon)}
                                        </Box>

                                        {/* Value */}
                                        <Typography
                                            className="achievement-value"
                                            variant={isMobile ? "h3" : "h2"}
                                            fontWeight="bold"
                                            gutterBottom
                                            sx={{
                                                fontSize: { xs: '2.2rem', md: '2.8rem' },
                                                color: '#ffffff',
                                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}
                                        >
                                            {achievement.value}
                                        </Typography>

                                        {/* Title */}
                                        <Typography
                                            variant={isMobile ? "subtitle1" : "h6"}
                                            gutterBottom
                                            sx={{
                                                fontSize: { xs: '1rem', md: '1.25rem' },
                                                color: '#ffffff',
                                                fontWeight: '600',
                                                mb: 1,
                                            }}
                                        >
                                            {achievement.title}
                                        </Typography>

                                        {/* Description */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: alpha('#fff', 0.8),
                                                flexGrow: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {achievement.description}
                                        </Typography>
                                    </Box>
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