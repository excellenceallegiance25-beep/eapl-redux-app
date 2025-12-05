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

// Achievement backgrounds configuration
const ACHIEVEMENT_BACKGROUNDS = {
    projects: 'linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80")',
    ongoing: 'linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80")',
    clients: 'linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("https://images.unsplash.com/photo-1551836026-d5c2d5e43487?auto=format&fit=crop&w=600&q=80")',
    team: 'linear-gradient(135deg, rgba(130, 109, 207, 0.2) 0%, rgba(172, 103, 103, 0.1) 100%), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80")',
    
    // Pattern alternatives
    patterns: {
        projectsPattern: 'linear-gradient(135deg, rgba(130, 109, 207, 0.15) 0%, rgba(172, 103, 103, 0.1) 50%, transparent 100%), radial-gradient(circle at 50% 50%, rgba(130, 109, 207, 0.1) 0%, transparent 70%)',
        ongoingPattern: 'linear-gradient(45deg, rgba(130, 109, 207, 0.15) 25%, transparent 25%), linear-gradient(-45deg, rgba(172, 103, 103, 0.15) 25%, transparent 25%)',
        clientsPattern: 'radial-gradient(circle at 20% 80%, rgba(130, 109, 207, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(172, 103, 103, 0.1) 0%, transparent 50%)',
        teamPattern: 'linear-gradient(0deg, rgba(130, 109, 207, 0.15) 0%, transparent 30%), linear-gradient(90deg, rgba(172, 103, 103, 0.1) 0%, transparent 30%)',
    }
};

const achievements = [
    {
        title: 'Projects Delivered',
        value: '500+',
        description: 'Successful implementations worldwide',
        icon: <Rocket fontSize="large" />,
        color: '#2196F3',
        bgType: 'image', // 'image' or 'pattern'
        bgImage: ACHIEVEMENT_BACKGROUNDS.projects,
        bgPattern: ACHIEVEMENT_BACKGROUNDS.patterns.projectsPattern,
    },
    {
        title: 'Ongoing Projects',
        value: '85+',
        description: 'Currently active development',
        icon: <Timeline fontSize="large" />,
        color: '#4CAF50',
        bgType: 'image',
        bgImage: ACHIEVEMENT_BACKGROUNDS.ongoing,
        bgPattern: ACHIEVEMENT_BACKGROUNDS.patterns.ongoingPattern,
    },
    {
        title: 'Happy Clients',
        value: '200+',
        description: 'Global enterprise customers',
        icon: <ThumbUp fontSize="large" />,
        color: '#FF9800',
        bgType: 'image',
        bgImage: ACHIEVEMENT_BACKGROUNDS.clients,
        bgPattern: ACHIEVEMENT_BACKGROUNDS.patterns.clientsPattern,
    },
    {
        title: 'Team Members',
        value: '150+',
        description: 'Expert engineers & consultants',
        icon: <People fontSize="large" />,
        color: '#9C27B0',
        bgType: 'image',
        bgImage: ACHIEVEMENT_BACKGROUNDS.team,
        bgPattern: ACHIEVEMENT_BACKGROUNDS.patterns.teamPattern,
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

    // Hero gradient from your services section
    const HERO_GRADIENTS = {
        primary: 'linear-gradient(135deg, rgba(130, 109, 207, 0.85) 0%, rgba(172, 103, 103, 0.85) 100%)',
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
            {/* Animated background elements */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // background: `
                //     radial-gradient(circle at 10% 20%, rgba(130, 109, 207, 0.05) 0%, transparent 40%),
                //     radial-gradient(circle at 90% 80%, rgba(172, 103, 103, 0.03) 0%, transparent 40%)
                // `,
                zIndex: 0,
            }} />
            
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Box textAlign="center" sx={{ 
                    mb: { xs: 4, sm: 6, md: 10 }, 
                    px: { xs: 2, sm: 3 } 
                }}>
                    <Chip
                        label="Our Achievements"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            py: 1,
                            px: 2,
                            background: HERO_GRADIENTS.primary,
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
                    <Typography
                        variant={isMobile ? "body1" : "h6"}
                        sx={{
                            maxWidth: 700,
                            mx: 'auto',
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                            background: `linear-gradient(135deg, 
                                rgba(255, 255, 255, 0.9) 0%, 
                                rgba(255, 255, 255, 0.7) 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Measurable impact and continuous growth
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}
                    sx={{
                        justifyContent: 'center',
                    }}>
                    {achievements.map((achievement, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Slide direction="up" in={true} timeout={500 + index * 200}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        p: { xs: 2, sm: 3, md: 4 },
                                        height: '100%',
                                        minHeight: 280,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: achievement.bgType === 'image' 
                                            ? achievement.bgImage 
                                            : achievement.bgPattern,
                                        backgroundSize: achievement.bgType === 'image' ? 'cover' : '400% 400%',
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
                                            background: achievement.bgType === 'image' 
                                                ? `${achievement.bgImage},
                                                   linear-gradient(135deg, 
                                                       ${alpha(achievement.color, 0.3)} 0%, 
                                                       transparent 100%)`
                                                : `${achievement.bgPattern},
                                                   linear-gradient(135deg, 
                                                       ${alpha(achievement.color, 0.2)} 0%, 
                                                       transparent 100%)`,
                                            '& .achievement-icon': {
                                                transform: 'scale(1.1) rotate(5deg)',
                                                background: HERO_GRADIENTS.primary,
                                                boxShadow: `0 8px 32px ${alpha(achievement.color, 0.4)}`,
                                            },
                                            '& .achievement-value': {
                                                background: `linear-gradient(135deg, 
                                                    ${achievement.color} 0%, 
                                                    ${alpha(achievement.color, 0.8)} 100%)`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                textShadow: `0 4px 20px ${alpha(achievement.color, 0.4)}`,
                                            },
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
                                    {/* Content Container */}
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
                                            {achievement.icon}
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

                {/* Auto-rotate indicator */}
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {achievements.map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: activeIndex === index 
                                        ? alpha(theme.palette.primary.main, 0.8)
                                        : alpha('#fff', 0.2),
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: activeIndex === index 
                                            ? theme.palette.primary.main
                                            : alpha('#fff', 0.4),
                                        transform: 'scale(1.2)',
                                    },
                                }}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AchievementsSection;