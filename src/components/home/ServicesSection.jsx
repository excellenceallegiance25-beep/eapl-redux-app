import { ArrowRightAlt, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    safeAlpha,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    alpha,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import chart_bg from '../../assets/images/chart.jpg';
import codescreen_bg from '../../assets/images/codescreen.jpg';
import computing_bg from '../../assets/images/computing.jpg';
import earthconnection_bg from '../../assets/images/earthconnection.jpg';
import meeting_bg from '../../assets/images/meeting.jpg';
import mobileappscreen_bg from '../../assets/images/mobileappscreen.jpg';
import motherboard_bg from '../../assets/images/motherboard.avif';
import review_bg from '../../assets/images/review.jpg';
import robotdoing_bg from '../../assets/images/robotdoing.jpg';
import serverconnection_bg from '../../assets/images/serverconnection.jpg';
import workinghuman_bg from '../../assets/images/workinghuman.jpg';
import workingonlaptop_bg from '../../assets/images/workingonlaptop.jpg';
import { getApplicationServicesList } from '../../services/AppConfigAction';


// ==================== SYMMETRICAL CARD CONFIGURATION ====================
// ALL CARDS HAVE THE SAME FIXED DIMENSIONS ON ALL DEVICES
const SYMMETRICAL_CARD_CONFIG = {
    // FIXED CARD DIMENSIONS (same for all devices)
    fixedDimensions: {
        width: 345,    // Fixed width in pixels (same as MUI Card default)
        height: 400,   // Fixed height in pixels
    },

    // CARDS PER ROW (responsive)
    cardsPerRow: {
        xs: 1,  // Mobile: 1 card per row
        sm: 2,  // Small tablet: 2 cards per row
        md: 3,  // Tablet: 3 cards per row
        lg: 3,  // Desktop: 3 cards per row
        xl: 4,  // Large desktop: 4 cards per row
    },

    // NUMBER OF ROWS TO SHOW WHEN COLLAPSED
    initialRows: {
        xs: 2,  // Mobile: show 2 rows (2 cards total)
        sm: 2,  // Small tablet: show 2 rows (4 cards total)
        md: 2,  // Tablet: show 2 rows (6 cards total)
        lg: 2,  // Desktop: show 2 rows (6 cards total)
        xl: 2,  // Large desktop: show 2 rows (8 cards total)
    },

    // SPACING BETWEEN CARDS
    spacing: {
        xs: 3,  // Mobile
        sm: 3,  // Small tablet
        md: 4,  // Tablet
        lg: 4,  // Desktop
        xl: 4,  // Large desktop
    },

    // CARD PADDING (same for all devices)
    padding: 2.5,

    // ICON SIZE (same for all devices)
    iconSize: 70,
    iconFontSize: 32,

    // TITLE CONFIG (same for all devices)
    titleFontSize: '1.25rem',
    titleHeight: 56, // Fixed height for 2 lines

    // DESCRIPTION CONFIG (same for all devices)
    descriptionFontSize: '0.875rem',
    descriptionHeight: 66, // Fixed height for 3 lines
    descriptionLines: 3,

    // FEATURES CONFIG (same for all devices)
    featuresHeight: 32,
    chipFontSize: '0.75rem',
    chipHeight: 24,

    // BUTTON CONFIG (same for all devices)
    buttonFontSize: '0.875rem',
    buttonPaddingY: 0.8,
};
// ==================== END CONFIGURATION ====================

const ServicesSection = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));
    const navigate = useNavigate();
    const [showAllServices, setShowAllServices] = useState(false);

    const [services, setServices] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const loadConfigs = async () => {
            const result = await dispatch(getApplicationServicesList());
            // console.log('Configurations loaded successfully', 'success');

            if (result.type === "APPCONFIG_INIT") {
                // console.log('Raw services data:', result.payload); // Debug log

                // Process services to ensure they have colors and proper icon format
                const processedServices = result.payload.map(service => {
                    // console.log('Processing service:', service.title, 'icon:', service.icon); // Debug log

                    // Check if icon is base64 data without data URL prefix
                    let processedIcon = service.icon;

                    // If icon exists and looks like base64 (but not a full data URL)
                    if (service.icon &&
                        !service.icon.startsWith('data:') &&
                        !service.icon.startsWith('http') &&
                        service.icon.length > 100) { // Base64 strings are usually long

                        // Check if it's likely base64 (contains alphanumeric chars, +, /, =)
                        const base64Pattern = /^[A-Za-z0-9+/=]+$/;
                        if (base64Pattern.test(service.icon)) {
                            // Determine image type
                            const iconType = service.iconType || 'image/png'; // Default to PNG
                            processedIcon = `data:${iconType};base64,${service.icon}`;
                            // console.log('Converted to data URL:', processedIcon.substring(0, 50) + '...');
                        }
                    }

                    return {
                        ...service,
                        icon: processedIcon,
                        color: getServiceColor(service)
                    };
                });

                // console.log('Processed services:', processedServices);
                setServices(processedServices.filter(service =>
                    service.status === true
                ));
            }
        };
        loadConfigs();
    }, [dispatch]);

    // Add this helper function after your other helper functions
    const isImageUrl = (str) => {
        if (!str) return false;

        // Check if it's a base64 image
        if (str.startsWith('data:image/')) return true;

        // Check if it's a URL
        if (str.startsWith('http://') || str.startsWith('https://')) return true;

        // Check for common image file extensions
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp'];
        return imageExtensions.some(ext =>
            str.toLowerCase().includes(ext.toLowerCase())
        );
    };

    const getServiceIcon = (service) => {
        if (!service.icon) return null;

        // If it's already a valid image URL, return it
        if (isImageUrl(service.icon)) {
            return service.icon;
        }

        // If it's base64 without prefix, construct data URL
        if (service.icon && service.icon.length > 50) {
            // Try to detect if it's base64
            const base64Pattern = /^[A-Za-z0-9+/=]+$/;
            if (base64Pattern.test(service.icon.substring(0, 50))) {
                return `data:image/png;base64,${service.icon}`;
            }
        }

        // If it's a short string (emoji or text), return as-is
        return service.icon;
    };

    // Safe safeAlpha function that won't throw errors
    const safeAlpha = (color, opacity) => {
        const safeColor = getSafeColor(color);
        return alpha(safeColor, opacity); // <-- Call MUI's alpha function
    };

    // Service-specific background images (using Unsplash or similar sources)
    const getServiceImage = (serviceTitle) => {
        // Simple image mapper - maps service title to image
        const serviceImages = {
            'Cloud Solutions': workinghuman_bg,
            'Software Development': codescreen_bg,
            'Cybersecurity': motherboard_bg,
            'AI & Analytics': robotdoing_bg,
            'Mobile Development': mobileappscreen_bg,
            'Digital Transformation': workingonlaptop_bg,
            'IoT Solutions': earthconnection_bg,
            'Blockchain Services': computing_bg,
            'DevOps & CI/CD': serverconnection_bg,
            'Quality Assurance': review_bg,
            'UI/UX Design': chart_bg,
            'Consulting Services': meeting_bg,
        };

        // Fallback image if service not found
        const fallbackImage = workinghuman_bg;

        return serviceImages[serviceTitle] || fallbackImage;
    };

    // Add these helper functions at the top of your component (after the imports)
    const isValidColor = (color) => {
        if (!color) return false;

        // Check for valid hex colors
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) return true;

        // Check for rgb/rgba
        if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(color)) return true;
        if (/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0\.\d+)\)$/.test(color)) return true;

        // Check for hsl/hsla
        if (/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/.test(color)) return true;
        if (/^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0\.\d+)\)$/.test(color)) return true;

        return false;
    };

    const getSafeColor = (color, defaultColor = '#1976d2') => {
        return isValidColor(color) ? color : defaultColor;
    };

    // Function to get color based on service category or title
    const getServiceColor = (service) => {
        // Try to get color from service data
        if (service.color && isValidColor(service.color)) {
            return service.color;
        }

        // Fallback: Generate color based on category or title
        const category = service.category || service.title || '';

        const colorMap = {
            'Cloud': '#2196F3',
            'Development': '#673AB7',
            'Security': '#F44336',
            'Analytics': '#4CAF50',
            'Mobile': '#FF9800',
            'Transformation': '#9C27B0',
            'IoT': '#00BCD4',
            'Blockchain': '#FF5722',
            'Testing': '#607D8B',
            'Design': '#E91E63',
            'Consulting': '#3F51B5',
            'Software': '#673AB7',
            'Digital': '#9C27B0',
            'DevOps': '#795548',
            'Quality': '#607D8B',
            'UI/UX': '#E91E63',
        };

        // Find matching color
        for (const [key, color] of Object.entries(colorMap)) {
            if (category.toLowerCase().includes(key.toLowerCase())) {
                return color;
            }
        }

        // Default fallback colors based on hash of title
        const defaultColors = [
            '#2196F3', '#673AB7', '#F44336', '#4CAF50', '#FF9800',
            '#9C27B0', '#00BCD4', '#FF5722', '#607D8B', '#E91E63',
            '#3F51B5', '#795548'
        ];

        if (service.title) {
            const hash = service.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return defaultColors[hash % defaultColors.length];
        }

        return '#1976d2'; // MUI primary color as final fallback
    };

    // Alternative: Pattern backgrounds based on service type
    const getServicePattern = (serviceTitle) => {
        const patterns = {
            'Cloud Solutions': 'radial-gradient(circle at 20% 80%, rgba(33, 150, 243, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(33, 150, 243, 0.1) 0%, transparent 50%)',
            'Software Development': 'linear-gradient(135deg, rgba(103, 58, 183, 0.15) 0%, transparent 50%), linear-gradient(45deg, rgba(103, 58, 183, 0.1) 0%, transparent 50%)',
            'Cybersecurity': 'linear-gradient(45deg, rgba(244, 67, 54, 0.15) 25%, transparent 25%), linear-gradient(135deg, rgba(244, 67, 54, 0.1) 25%, transparent 25%)',
            'AI & Analytics': 'radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.15) 0%, transparent 70%), linear-gradient(0deg, rgba(76, 175, 80, 0.1) 0%, transparent 30%)',
            'Mobile Development': 'linear-gradient(120deg, rgba(255, 152, 0, 0.15) 0%, transparent 50%), linear-gradient(240deg, rgba(255, 152, 0, 0.1) 0%, transparent 50%)',
            'Digital Transformation': 'radial-gradient(ellipse at 30% 50%, rgba(156, 39, 176, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(156, 39, 176, 0.1) 0%, transparent 60%)',
            'IoT Solutions': 'linear-gradient(0deg, rgba(0, 188, 212, 0.15) 0%, transparent 30%), radial-gradient(circle at 50% 100%, rgba(0, 188, 212, 0.1) 0%, transparent 50%)',
            'Blockchain Services': 'linear-gradient(90deg, rgba(255, 87, 34, 0.15) 0%, transparent 50%), linear-gradient(180deg, rgba(255, 87, 34, 0.1) 0%, transparent 50%)',
            'DevOps & CI/CD': 'linear-gradient(45deg, rgba(121, 85, 72, 0.15) 25%, transparent 25%), linear-gradient(-45deg, rgba(121, 85, 72, 0.15) 25%, transparent 25%)',
            'Quality Assurance': 'radial-gradient(circle at 20% 50%, rgba(96, 125, 139, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(96, 125, 139, 0.1) 0%, transparent 50%)',
            'UI/UX Design': 'linear-gradient(135deg, rgba(233, 30, 99, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 0%, rgba(233, 30, 99, 0.1) 0%, transparent 50%)',
            'Consulting Services': 'linear-gradient(0deg, rgba(63, 81, 181, 0.15) 0%, transparent 40%), linear-gradient(90deg, rgba(63, 81, 181, 0.1) 0%, transparent 40%)',
        };
        return patterns[serviceTitle] || 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, transparent 50%)';
    };

    // Helper function to get current device config
    const getCurrentDevice = () => {
        if (isXs) return 'xs';
        if (isSm) return 'sm';
        if (isMd) return 'md';
        if (isLg) return 'lg';
        if (isXl) return 'xl';
        return 'md';
    };

    const currentDevice = getCurrentDevice();

    // Calculate number of services to show initially
    const getInitialServicesCount = () => {
        const cardsPerRow = SYMMETRICAL_CARD_CONFIG.cardsPerRow[currentDevice];
        const initialRows = SYMMETRICAL_CARD_CONFIG.initialRows[currentDevice];
        return cardsPerRow * initialRows;
    };

    const initialServicesCount = getInitialServicesCount();
    const servicesToShow = showAllServices
        ? services
        : services.slice(0, initialServicesCount);

    const toggleShowAllServices = () => {
        setShowAllServices(!showAllServices);
    };

    // Calculate container height when collapsed
    const getContainerHeight = () => {
        const cardHeight = SYMMETRICAL_CARD_CONFIG.fixedDimensions.height;
        const spacing = SYMMETRICAL_CARD_CONFIG.spacing[currentDevice];
        const initialRows = SYMMETRICAL_CARD_CONFIG.initialRows[currentDevice];

        // Height = (cardHeight * rows) + (spacing * (rows - 1))
        return (cardHeight * initialRows) + (spacing * (initialRows - 1)) + 50;
    };

    return (
        <Box sx={{ py: { xs: 6, sm: 8, md: 12 }, bgcolor: 'background.default' }}>
            <Container maxWidth="xl">
                <Box textAlign="center" sx={{ mb: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
                    <Chip
                        label="Our Services"
                        color="primary"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            py: 1,
                            px: 2,
                        }}
                    />
                    <Typography
                        variant={isXs ? "h3" : "h2"}
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
                    >
                        Comprehensive Tech Solutions
                    </Typography>
                    <Typography
                        variant={isXs ? "body1" : "h6"}
                        color="text.secondary"
                        sx={{
                            maxWidth: 700,
                            mx: 'auto',
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                        }}
                    >
                        We offer end-to-end technology services to transform your business
                    </Typography>
                </Box>

                {/* Fixed Height Container */}
                <Box
                    sx={{
                        position: 'relative',
                        minHeight: showAllServices ? 'auto' : getContainerHeight(),
                        overflow: 'hidden',
                        mb: 4,
                    }}
                >
                    {/* Grid with Fixed Symmetrical Cards */}
                    <Grid
                        container
                        spacing={SYMMETRICAL_CARD_CONFIG.spacing[currentDevice]}
                        sx={{
                            transition: 'all 0.5s ease-in-out',
                            justifyContent: 'center',
                        }}
                    >
                        {servicesToShow.map((service, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={4}
                                xl={3}
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* SYMMETRICAL CARD with Background Image/Pattern */}
                                <Card
                                    sx={{
                                        width: SYMMETRICAL_CARD_CONFIG.fixedDimensions.width,
                                        height: SYMMETRICAL_CARD_CONFIG.fixedDimensions.height,
                                        minWidth: SYMMETRICAL_CARD_CONFIG.fixedDimensions.width,
                                        minHeight: SYMMETRICAL_CARD_CONFIG.fixedDimensions.height,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: 'none',
                                        borderRadius: '16px',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        // Professional gradient overlay over image
                                        backgroundImage: `
                                            linear-gradient(
                                                to bottom,
                                                rgba(0, 0, 0, 0.85) 0%,
                                                rgba(0, 0, 0, 0.7) 30%,
                                                rgba(0, 0, 0, 0.4) 70%,
                                                rgba(0, 0, 0, 0.2) 100%
                                            ),
                                            // url(${getServiceImage(service.title)})
                                            url(${getServiceIcon(service)})
                                        `,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        color: 'white',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(45deg, 
                                                ${safeAlpha(service.color, 0.15)} 0%, 
                                                transparent 50%,
                                                ${safeAlpha(service.color, 0.05)} 100%
                                            )`,
                                            opacity: 0,
                                            transition: 'opacity 0.4s ease',
                                            zIndex: 0,
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-12px) scale(1.02)',
                                            boxShadow: `
                                                0 20px 40px rgba(0, 0, 0, 0.3),
                                                0 0 0 1px ${safeAlpha(service.color, 0.3)},
                                                0 0 60px ${safeAlpha(service.color, 0.1)}
                                            `,
                                            backgroundImage: `
                                                linear-gradient(
                                                    to bottom,
                                                    rgba(0, 0, 0, 0.7) 0%,
                                                    rgba(0, 0, 0, 0.55) 30%,
                                                    rgba(0, 0, 0, 0.3) 70%,
                                                    rgba(0, 0, 0, 0.15) 100%
                                                ),
                                                // url(${getServiceImage(service.title)})
                                                url(${getServiceIcon(service)})
                                            `,
                                            backgroundSize: '110% 110%',
                                            '&::before': {
                                                opacity: 1,
                                            },
                                            // '& .service-icon': {
                                            //     transform: 'scale(1.15) translateY(-5px)',
                                            //     bgcolor: safeAlpha(service.color, 0.95),
                                            //     boxShadow: `0 10px 25px ${safeAlpha(service.color, 0.4)}`,
                                            //     borderColor: safeAlpha('#fff', 0.5),
                                            // },
                                            '& .service-title': {
                                                color: service.color,
                                                textShadow: `0 0 20px ${safeAlpha(service.color, 0.5)}`,
                                            },
                                            '& .service-description': {
                                                color: '#ffffff',
                                            },
                                            '& .service-chip': {
                                                bgcolor: safeAlpha(service.color, 0.9),
                                                transform: 'translateY(-2px)',
                                                boxShadow: `0 4px 12px ${safeAlpha(service.color, 0.3)}`,
                                                borderColor: safeAlpha('#fff', 0.3),
                                            },
                                            '& .service-button': {
                                                borderColor: service.color,
                                                bgcolor: safeAlpha(service.color, 0.95),
                                                color: 'white',
                                                transform: 'translateY(-2px)',
                                                boxShadow: `0 8px 20px ${safeAlpha(service.color, 0.4)}`,
                                            }
                                        },
                                    }}
                                >
                                    {/* Animated gradient border effect */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(45deg, 
                                                transparent 40%, 
                                                ${safeAlpha(service.color, 0.1)} 50%, 
                                                transparent 60%
                                            )`,
                                            backgroundSize: '300% 300%',
                                            animation: 'shimmer 3s infinite linear',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                            zIndex: 0,
                                            '&:hover': {
                                                opacity: 0.3,
                                            },
                                            '@keyframes shimmer': {
                                                '0%': { backgroundPosition: '-100% 0' },
                                                '100%': { backgroundPosition: '200% 0' },
                                            }
                                        }}
                                    />

                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            width: '100%',
                                            p: 3,
                                            position: 'relative',
                                            zIndex: 1,
                                            '&:hover': {
                                                '& .service-content': {
                                                    transform: 'translateY(-5px)',
                                                }
                                            }
                                        }}
                                    >
                                        {/* Professional Icon Container with glow effect */}
                                        <Box
                                            className="service-icon"
                                            sx={{
                                                width: SYMMETRICAL_CARD_CONFIG.iconSize,
                                                height: SYMMETRICAL_CARD_CONFIG.iconSize,
                                                borderRadius: '20px',
                                                bgcolor: safeAlpha(service.color, 0.8),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: SYMMETRICAL_CARD_CONFIG.iconFontSize,
                                                color: 'white',
                                                mb: 3,
                                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                flexShrink: 0,
                                                mx: 'auto',
                                                backdropFilter: 'blur(20px) saturate(180%)',
                                                border: `2px solid ${safeAlpha('#fff', 0.15)}`,
                                                boxShadow: `inset 0 0 20px ${safeAlpha('#fff', 0.1)},0 8px 32px ${safeAlpha(service.color, 0.3)}`,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                // Set background if it's an image
                                                ...(isImageUrl(service.icon) && {
                                                    backgroundImage: `url('${service.icon}')`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                }),
                                            }}
                                        >
                                            {isImageUrl(service.icon) ? (
                                                // For images: show overlay with first letter
                                                null
                                            ) : (
                                                // For text/emoji: show directly
                                                <Typography sx={{
                                                    fontSize: '2rem',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    zIndex: 1,
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                    height: '100%'
                                                }}>
                                                    {service.title?.charAt(0) || '📊'}
                                                </Typography>
                                            )}
                                        </Box>

                                        {/* Title with professional typography */}
                                        <Typography
                                            className="service-title"
                                            variant="h6"
                                            fontWeight="700"
                                            align="center"
                                            sx={{
                                                fontSize: '1.375rem',
                                                lineHeight: 1.3,
                                                height: 'auto',
                                                minHeight: SYMMETRICAL_CARD_CONFIG.titleHeight,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 2,
                                                flexShrink: 0,
                                                color: '#ffffff',
                                                transition: 'all 0.4s ease',
                                                textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                                                letterSpacing: '0.5px',
                                            }}
                                        >
                                            {service.title}
                                        </Typography>

                                        {/* Description with better readability */}
                                        <Typography
                                            className="service-description"
                                            variant="body2"
                                            align="center"
                                            sx={{
                                                fontSize: '0.9375rem',
                                                lineHeight: 1.6,
                                                height: 'auto',
                                                minHeight: SYMMETRICAL_CARD_CONFIG.descriptionHeight,
                                                mb: 3,
                                                flexGrow: 0,
                                                color: safeAlpha('#fff', 0.85),
                                                transition: 'all 0.4s ease',
                                                fontWeight: '300',
                                                letterSpacing: '0.3px',
                                            }}
                                        >
                                            {service.description}
                                        </Typography>

                                        {/* Professional Chips Container */}
                                        <Box
                                            sx={{
                                                mb: 3,
                                                flexShrink: 0,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
                                                gap: 1,
                                                minHeight: SYMMETRICAL_CARD_CONFIG.featuresHeight,
                                            }}
                                        >
                                            {service.features.split(',').map((feature, idx) => (
                                                <Chip
                                                    key={idx}
                                                    className="service-chip"
                                                    label={feature.trim()}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: safeAlpha(service.color, 0.75),
                                                        color: 'white',
                                                        fontSize: '0.75rem',
                                                        height: '28px',
                                                        fontWeight: '500',
                                                        backdropFilter: 'blur(10px)',
                                                        border: `1px solid ${safeAlpha('#fff', 0.15)}`,
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        '&:hover': {
                                                            transform: 'translateY(-1px)',
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Box>

                                        {/* Professional Button with subtle animation */}
                                        <Box
                                            sx={{
                                                mt: 'auto',
                                                flexShrink: 0,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                opacity: 0.9,
                                                transition: 'opacity 0.3s ease',
                                                '&:hover': {
                                                    opacity: 1,
                                                }
                                            }}
                                        >
                                            <Button
                                                className="service-button"
                                                variant="outlined"
                                                size="medium"
                                                component={RouterLink}
                                                to={`/services/${service.id}`}
                                                endIcon={<ArrowRightAlt sx={{ transition: 'transform 0.3s ease' }} />}
                                                sx={{
                                                    borderColor: safeAlpha('#fff', 0.25),
                                                    color: 'white',
                                                    bgcolor: safeAlpha('#000', 0.2),
                                                    fontSize: '0.875rem',
                                                    py: 1.2,
                                                    px: 4,
                                                    minWidth: 160,
                                                    backdropFilter: 'blur(20px)',
                                                    borderWidth: 1.5,
                                                    borderRadius: '12px',
                                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    fontWeight: '600',
                                                    letterSpacing: '0.5px',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        borderColor: service.color,
                                                        bgcolor: safeAlpha(service.color, 0.9),
                                                        color: 'white',
                                                        '& .MuiButton-endIcon': {
                                                            transform: 'translateX(4px)',
                                                        }
                                                    },
                                                }}
                                            >
                                                Explore Service
                                            </Button>
                                        </Box>
                                    </CardContent>

                                    {/* Subtle corner accent */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            width: '60px',
                                            height: '60px',
                                            background: `linear-gradient(135deg, 
                                                ${safeAlpha(service.color, 0.2)} 0%, 
                                                transparent 50%
                                            )`,
                                            borderBottomLeftRadius: '50%',
                                            transition: 'all 0.4s ease',
                                            zIndex: 0,
                                            '&:hover': {
                                                background: `linear-gradient(135deg, 
                                                ${safeAlpha(service.color, 0.4)} 0%, 
                                                transparent 50%
                                            )`,
                                            }
                                        }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Gradient Overlay when collapsed */}
                    {!showAllServices && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '200px',
                                background: `linear-gradient(to bottom, 
                                transparent 0%, 
                                ${theme.palette.background.default} 70%
                                )`,
                                pointerEvents: 'none',
                                zIndex: 2,
                            }}
                        />
                    )}
                </Box>

                {/* Toggle Button */}
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size={isXs ? "medium" : "large"}
                        // onClick={toggleShowAllServices}
                        component={RouterLink}
                        to={`/services`}
                        endIcon={showAllServices ? <ExpandLess /> : <ExpandMore />}
                        sx={{
                            px: { xs: 4, sm: 5 },
                            py: { xs: 1.5, sm: 1.75 },
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            fontWeight: 'bold',
                            borderRadius: 2,
                            minWidth: 200,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[6],
                            },
                            transition: 'all 0.3s',
                            backdropFilter: 'blur(10px)',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        }}
                    >
                        {showAllServices
                            ? 'Show Less'
                            : `View All Services (${services.length})`
                        }
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ServicesSection;