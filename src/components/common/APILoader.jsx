import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import {
    Backdrop,
    Box,
    Fade,
    Typography,
    Zoom,
    alpha,
    keyframes,
    useTheme
} from '@mui/material';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

// Modern animations
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const morph = keyframes`
  0%, 100% { border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%; }
  34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
  67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const neonPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 5px currentColor) brightness(1); }
  50% { filter: drop-shadow(0 0 20px currentColor) brightness(1.3); }
`;

const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
`;

const floatingOrbit = keyframes`
  0% { transform: rotate(0deg) translateX(60px) rotate(0deg) scale(1); opacity: 0.8; }
  50% { transform: rotate(180deg) translateX(70px) rotate(-180deg) scale(1.1); opacity: 0.4; }
  100% { transform: rotate(360deg) translateX(60px) rotate(-360deg) scale(1); opacity: 0.8; }
`;

// Stage colors array - each stage has its own color scheme
const STAGE_COLORS = [
    '#3b82f6', // Stage 0: Blue
    '#8b5cf6', // Stage 1: Purple
    '#ec4899', // Stage 2: Pink
    '#f59e0b', // Stage 3: Amber
    '#10b981', // Success: Emerald
    '#ef4444'  // Error: Red
];

// Stage configurations with names and icons
const STAGES = [
    {
        icon: <AutoAwesomeRoundedIcon key="stage0" />,
        name: "Initializing",
        message: "Starting up analysis engine"
    },
    {
        icon: <RocketLaunchRoundedIcon key="stage1" />,
        name: "Processing",
        message: "Analyzing data patterns"
    },
    {
        icon: <Diversity3RoundedIcon key="stage2" />,
        name: "Optimizing",
        message: "Refining insights"
    },
    {
        icon: <AutoAwesomeRoundedIcon key="stage3" />,
        name: "Finalizing",
        message: "Preparing results"
    }
];

const APILoader = () => {
    const theme = useTheme();
    const [progressValue, setProgressValue] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [particles, setParticles] = useState([]);
    const containerRef = useRef(null);
    const progressAnimationRef = useRef(null);

    const {
        isLoading,
        gifUrl,
        imageUrl,
        message = 'Processing your request',
        progress,
        status = 'loading',
        subMessage = 'Calculating insights'
    } = useSelector((state) => state.loading);

    // Determine current stage based on elapsed time and progress
    const currentStage = useMemo(() => {
        if (status !== 'loading') return 0;

        // Use progress if available
        if (progress !== undefined) {
            return Math.floor((progress / 100) * (STAGES.length - 1));
        }

        // Otherwise use elapsed time
        const stage = Math.min(Math.floor(elapsedTime / 5), STAGES.length - 1);
        return stage;
    }, [elapsedTime, progress, status]);

    // Get current color based on stage and status
    const getCurrentColor = useMemo(() => {
        if (status === 'success') return STAGE_COLORS[4];
        if (status === 'error') return STAGE_COLORS[5];
        return STAGE_COLORS[currentStage % STAGE_COLORS.length];
    }, [currentStage, status]);

    // Create floating particles with stage-based colors
    useEffect(() => {
        if (!isLoading) {
            setParticles([]);
            return;
        }

        const particleColors = [
            getCurrentColor,
            alpha(getCurrentColor, 0.7),
            alpha(getCurrentColor, 0.4)
        ];

        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            size: Math.random() * 4 + 2,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            color: particleColors[Math.floor(Math.random() * particleColors.length)]
        }));
        setParticles(newParticles);
    }, [isLoading, getCurrentColor]);

    // Smooth progress animation with requestAnimationFrame
    useEffect(() => {
        if (progress === undefined) return;

        const animateProgress = () => {
            setProgressValue(prev => {
                const diff = progress - prev;
                const step = diff * 0.15; // Smoother interpolation
                const newValue = Math.abs(diff) < 0.5 ? progress : prev + step;
                return Math.min(Math.max(newValue, 0), 100);
            });

            if (Math.abs(progressValue - progress) > 0.5) {
                progressAnimationRef.current = requestAnimationFrame(animateProgress);
            }
        };

        progressAnimationRef.current = requestAnimationFrame(animateProgress);

        return () => {
            if (progressAnimationRef.current) {
                cancelAnimationFrame(progressAnimationRef.current);
            }
        };
    }, [progress, progressValue]);

    // Update elapsed time
    useEffect(() => {
        if (!isLoading) {
            setElapsedTime(0);
            return;
        }

        const interval = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading]);

    // Get icon based on status and stage
    const getStatusIcon = useMemo(() => {
        if (gifUrl) {
            return (
                <Box
                    component="img"
                    src={gifUrl}
                    alt="Loading"
                    loading="lazy"
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'contain',
                        borderRadius: '20%',
                        animation: `${morph} 8s ease-in-out infinite`,
                        boxShadow: `
                            0 0 40px ${alpha(getCurrentColor, 0.5)},
                            0 0 80px ${alpha(getCurrentColor, 0.3)},
                            inset 0 0 20px rgba(255, 255, 255, 0.2)
                        `,
                        border: `2px solid ${alpha(getCurrentColor, 0.6)}`,
                        position: 'relative',
                        zIndex: 2
                    }}
                />
            );
        }

        if (imageUrl) {
            return (
                <Box
                    component="img"
                    src={imageUrl}
                    alt="Loading"
                    loading="lazy"
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'contain',
                        borderRadius: '50%',
                        animation: `${neonPulse} 2s ease-in-out infinite`,
                        boxShadow: `
                            0 0 40px ${alpha(getCurrentColor, 0.6)},
                            0 0 80px ${alpha(getCurrentColor, 0.3)}
                        `,
                        position: 'relative',
                        zIndex: 2
                    }}
                />
            );
        }

        // Show stage-specific icon
        return (
            <Box
                sx={{
                    fontSize: '3.5rem',
                    color: getCurrentColor,
                    animation: `${neonPulse} 2s ease-in-out infinite`,
                    position: 'relative',
                    zIndex: 2,
                    transition: 'all 0.3s ease'
                }}
            >
                {STAGES[currentStage]?.icon || <AutoAwesomeRoundedIcon />}
            </Box>
        );
    }, [gifUrl, imageUrl, getCurrentColor, currentStage]);

    // Generate dynamic messages based on elapsed time and stage
    const getDynamicMessage = useMemo(() => {
        if (status !== 'loading') return subMessage;

        const stageMessages = [
            "Initializing systems...",
            "Analyzing data patterns",
            "Processing complex algorithms",
            "Optimizing results",
            "Generating insights",
            "Finalizing calculations"
        ];

        const stageIndex = Math.min(Math.floor(elapsedTime / 4), stageMessages.length - 1);
        return stageMessages[stageIndex];
    }, [elapsedTime, status, subMessage]);

    if (!isLoading) return null;

    return (
        <Backdrop
            open={isLoading}
            ref={containerRef}
            sx={{
                zIndex: 99999,
                backgroundColor: 'rgba(10, 10, 15, 0.97)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                p: 2,
                overflow: 'hidden'
            }}
        >
            {/* Animated background with gradient based on stage */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                background: `radial-gradient(circle at 50% 50%, 
                    ${alpha(getCurrentColor, 0.1)} 0%, 
                    ${alpha(getCurrentColor, 0.05)} 40%,
                    transparent 70%)`,
                opacity: 0.9,
                transition: 'all 0.5s ease'
            }}>
                {/* Floating particles */}
                {particles.map(particle => (
                    <Box
                        key={particle.id}
                        sx={{
                            position: 'absolute',
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                            animation: `${float} ${particle.duration}s ease-in-out infinite`,
                            animationDelay: `${particle.delay}s`,
                            opacity: 0.3,
                            filter: 'blur(1px)'
                        }}
                    />
                ))}
            </Box>

            {/* Main loader container */}
            <Zoom in={isLoading} style={{ transitionDelay: '100ms' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        maxWidth: 400,
                        width: '100%',
                        p: 4,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Central icon/animation */}
                    <Box
                        sx={{
                            position: 'relative',
                            width: 220,
                            height: 220,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1
                        }}
                    >
                        {/* Stage indicator dots */}
                        {status === 'loading' && (
                            <Box sx={{
                                position: 'absolute',
                                top: -20,
                                display: 'flex',
                                gap: 1
                            }}>
                                {STAGES.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: index === currentStage
                                                ? getCurrentColor
                                                : alpha(getCurrentColor, 0.2),
                                            transition: 'all 0.3s ease',
                                            animation: index === currentStage
                                                ? `${pulse} 1.5s ease-in-out infinite`
                                                : 'none',
                                            boxShadow: index === currentStage
                                                ? `0 0 8px ${getCurrentColor}`
                                                : 'none'
                                        }}
                                    />
                                ))}
                            </Box>
                        )}

                        {/* Outer orbiting rings */}
                        <Box sx={{
                            position: 'absolute',
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            border: `1px dashed ${alpha(getCurrentColor, 0.3)}`,
                            animation: `${floatingOrbit} 8s linear infinite`,
                            transition: 'all 0.5s ease'
                        }} />
                        <Box sx={{
                            position: 'absolute',
                            width: 160,
                            height: 160,
                            borderRadius: '50%',
                            border: `1px dotted ${alpha(getCurrentColor, 0.2)}`,
                            animation: `${floatingOrbit} 6s linear infinite reverse`,
                            transition: 'all 0.5s ease'
                        }} />

                        {/* Orbiting dots */}
                        {status === 'loading' && (
                            <>
                                <Box sx={{
                                    position: 'absolute',
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${getCurrentColor}, ${alpha(getCurrentColor, 0.5)})`,
                                    animation: `${orbit} 3s linear infinite`,
                                    opacity: 0.6,
                                    filter: `drop-shadow(0 0 6px ${getCurrentColor})`
                                }} />
                                <Box sx={{
                                    position: 'absolute',
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: getCurrentColor,
                                    animation: `${orbit} 2s linear infinite reverse`,
                                    opacity: 0.3,
                                    filter: `drop-shadow(0 0 4px ${getCurrentColor})`
                                }} />
                            </>
                        )}

                        {/* Main icon container */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 130,
                                height: 130,
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, 
                                    ${alpha(getCurrentColor, 0.25)} 0%, 
                                    ${alpha(getCurrentColor, 0.1)} 100%)`,
                                boxShadow: `
                                    inset 0 0 30px ${alpha(getCurrentColor, 0.3)},
                                    0 0 50px ${alpha(getCurrentColor, 0.4)},
                                    0 0 100px ${alpha(getCurrentColor, 0.2)}
                                `,
                                border: `1.5px solid ${alpha(getCurrentColor, 0.4)}`,
                                animation: `${morph} 12s ease-in-out infinite`,
                                backdropFilter: 'blur(8px)',
                                zIndex: 1,
                                transition: 'all 0.5s ease'
                            }}
                        >
                            {getStatusIcon}
                        </Box>
                    </Box>

                    {/* Text content */}
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                        {/* Stage indicator */}
                        {/* {status === 'loading' && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: getCurrentColor,
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    mb: 1,
                                    display: 'block',
                                    opacity: 0.9,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {STAGES[currentStage]?.name || 'Processing'} • Stage {currentStage + 1}
                            </Typography>
                        )} */}

                        {/* Main message */}
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: '#ffffff',
                                mb: 1,
                                background: status === 'loading'
                                    ? `linear-gradient(90deg, 
                                        #ffffff, 
                                        ${getCurrentColor}, 
                                        #ffffff,
                                        ${alpha(getCurrentColor, 0.7)})`
                                    : '#ffffff',
                                backgroundSize: '300% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                animation: status === 'loading'
                                    ? `${shimmer} 2.5s linear infinite`
                                    : 'none',
                                letterSpacing: '-0.01em',
                                transition: 'all 0.5s ease'
                            }}
                        >
                            {message}
                        </Typography>

                        {/* Sub message */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: alpha('#ffffff', 0.75),
                                mb: 2,
                                minHeight: 20,
                                fontWeight: 400,
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {elapsedTime > 1 ? getDynamicMessage : subMessage}
                        </Typography>

                        {/* Progress bar (if progress is available) */}
                        {progress !== undefined && (
                            <Box sx={{ width: '100%', mb: 2 }}>
                                <Box sx={{
                                    position: 'relative',
                                    height: 3,
                                    borderRadius: 1.5,
                                    backgroundColor: alpha('#ffffff', 0.1),
                                    overflow: 'hidden',
                                    mb: 0.5
                                }}>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            height: '100%',
                                            width: `${progressValue}%`,
                                            background: `linear-gradient(90deg, 
                                                ${getCurrentColor}, 
                                                ${alpha(getCurrentColor, 0.8)})`,
                                            backgroundSize: '200% 100%',
                                            animation: `${shimmer} 2s linear infinite`,
                                            transition: 'width 0.3s ease-out',
                                            borderRadius: 1.5,
                                            boxShadow: `0 0 10px ${alpha(getCurrentColor, 0.5)}`
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: alpha('#ffffff', 0.6),
                                        fontSize: '0.7rem',
                                        fontWeight: 500,
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <span>Progress</span>
                                    <span>{Math.round(progressValue)}%</span>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Zoom>

            {/* Bottom info text */}
            <Fade in={isLoading} style={{ transitionDelay: '300ms' }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: alpha('#ffffff', 0.5),
                        fontSize: '0.7rem',
                        textAlign: 'center',
                        maxWidth: 400,
                        letterSpacing: '0.02em',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {status === 'loading' && elapsedTime > 10
                        ? 'Still processing • This may take a moment longer...'
                        : 'Please wait while we process your request'}
                </Typography>
            </Fade>
        </Backdrop>
    );
};

export default APILoader;