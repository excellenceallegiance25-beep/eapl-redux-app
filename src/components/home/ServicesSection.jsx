import { ArrowRightAlt, ExpandMore, ExpandLess } from '@mui/icons-material';
import {
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
import { useState } from 'react';

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

    const [showAllServices, setShowAllServices] = useState(false);

    const services = [
        {
            title: 'Cloud Solutions',
            description: 'Enterprise cloud infrastructure with auto-scaling and global CDN.',
            icon: '☁️',
            color: '#2196F3',
            features: ['AWS/Azure', 'Migration', 'DevOps'],
        },
        {
            title: 'Software Development',
            description: 'Custom applications with modern frameworks and best practices.',
            icon: '💻',
            color: '#673AB7',
            features: ['Web Apps', 'Mobile Apps', 'APIs'],
        },
        {
            title: 'Cybersecurity',
            description: 'Complete security solutions with threat detection and compliance.',
            icon: '🔒',
            color: '#F44336',
            features: ['Pen Testing', 'Encryption', 'Monitoring'],
        },
        {
            title: 'AI & Analytics',
            description: 'Data-driven insights and machine learning solutions.',
            icon: '🤖',
            color: '#4CAF50',
            features: ['BI Dashboards', 'Predictive', 'ML Models'],
        },
        {
            title: 'Mobile Development',
            description: 'Cross-platform mobile apps for iOS and Android.',
            icon: '📱',
            color: '#FF9800',
            features: ['React Native', 'Flutter', 'Native'],
        },
        {
            title: 'Digital Transformation',
            description: 'Complete digital overhaul with process automation.',
            icon: '🚀',
            color: '#9C27B0',
            features: ['Strategy', 'Automation', 'Modernization'],
        },
        {
            title: 'IoT Solutions',
            description: 'Connect and manage devices with smart IoT platforms.',
            icon: '🌐',
            color: '#00BCD4',
            features: ['Smart Devices', 'Real-time Data'],
        },
        {
            title: 'Blockchain Services',
            description: 'Secure decentralized solutions for finance and supply chain.',
            icon: '⛓️',
            color: '#FF5722',
            features: ['Smart Contracts', 'DApps'],
        },
        {
            title: 'DevOps & CI/CD',
            description: 'Automated deployment pipelines and infrastructure as code.',
            icon: '⚙️',
            color: '#795548',
            features: ['Jenkins', 'Docker', 'Kubernetes'],
        },
        {
            title: 'Quality Assurance',
            description: 'Comprehensive testing solutions for software quality.',
            icon: '✅',
            color: '#607D8B',
            features: ['Automation', 'Performance', 'Security'],
        },
        {
            title: 'UI/UX Design',
            description: 'User-centered design for exceptional digital experiences.',
            icon: '🎨',
            color: '#E91E63',
            features: ['Wireframes', 'Prototyping', 'User Testing'],
        },
        {
            title: 'Consulting Services',
            description: 'Strategic technology consulting and roadmap planning.',
            icon: '📊',
            color: '#3F51B5',
            features: ['Strategy', 'Architecture', 'Planning'],
        },
    ];

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
                            justifyContent: 'center', // Center align cards
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
                                    justifyContent: 'center', // Center each card
                                }}
                            >
                                {/* SYMMETRICAL CARD - Same dimensions for all */}
                                <Card
                                    sx={{
                                        width: SYMMETRICAL_CARD_CONFIG.fixedDimensions.width,
                                        height: SYMMETRICAL_CARD_CONFIG.fixedDimensions.height,
                                        minWidth: SYMMETRICAL_CARD_CONFIG.fixedDimensions.width,
                                        minHeight: SYMMETRICAL_CARD_CONFIG.fixedDimensions.height,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease-in-out',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: theme.shadows[8],
                                            borderColor: service.color,
                                            '& .service-icon': {
                                                transform: 'scale(1.1)',
                                            }
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            width: '100%',
                                            p: SYMMETRICAL_CARD_CONFIG.padding,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {/* Icon Container - Centered */}
                                        <Box
                                            className="service-icon"
                                            sx={{
                                                width: SYMMETRICAL_CARD_CONFIG.iconSize,
                                                height: SYMMETRICAL_CARD_CONFIG.iconSize,
                                                borderRadius: '50%',
                                                bgcolor: alpha(service.color, 0.1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: SYMMETRICAL_CARD_CONFIG.iconFontSize,
                                                color: service.color,
                                                mb: 2,
                                                transition: 'transform 0.3s ease-in-out',
                                                flexShrink: 0,
                                                mx: 'auto', // Center horizontally
                                            }}
                                        >
                                            {service.icon}
                                        </Box>

                                        {/* Title - Fixed Height & Centered */}
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            align="center"
                                            sx={{
                                                fontSize: SYMMETRICAL_CARD_CONFIG.titleFontSize,
                                                lineHeight: 1.3,
                                                height: SYMMETRICAL_CARD_CONFIG.titleHeight,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                mb: 1,
                                                flexShrink: 0,
                                            }}
                                        >
                                            {service.title}
                                        </Typography>

                                        {/* Description - Fixed Height & Centered */}
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            align="center"
                                            sx={{
                                                fontSize: SYMMETRICAL_CARD_CONFIG.descriptionFontSize,
                                                lineHeight: 1.5,
                                                height: SYMMETRICAL_CARD_CONFIG.descriptionHeight,
                                                display: '-webkit-box',
                                                WebkitLineClamp: SYMMETRICAL_CARD_CONFIG.descriptionLines,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                mb: 2,
                                                flexGrow: 0,
                                            }}
                                        >
                                            {service.description}
                                        </Typography>

                                        {/* Features Chips - Centered */}
                                        <Box
                                            sx={{
                                                mb: 2,
                                                height: SYMMETRICAL_CARD_CONFIG.featuresHeight,
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Box sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 1,
                                                justifyContent: 'center',
                                                maxWidth: '100%',
                                            }}>
                                                {service.features.map((feature, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={feature}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: alpha(service.color, 0.1),
                                                            color: service.color,
                                                            fontSize: SYMMETRICAL_CARD_CONFIG.chipFontSize,
                                                            height: SYMMETRICAL_CARD_CONFIG.chipHeight,
                                                            flexShrink: 0,
                                                            maxWidth: '100%',
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        {/* Button - Centered */}
                                        <Box sx={{
                                            mt: 'auto',
                                            flexShrink: 0,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                endIcon={<ArrowRightAlt />}
                                                sx={{
                                                    borderColor: alpha(service.color, 0.3),
                                                    color: service.color,
                                                    '&:hover': {
                                                        borderColor: service.color,
                                                        bgcolor: alpha(service.color, 0.04),
                                                    },
                                                    fontSize: SYMMETRICAL_CARD_CONFIG.buttonFontSize,
                                                    py: SYMMETRICAL_CARD_CONFIG.buttonPaddingY,
                                                    px: 3,
                                                    minWidth: 140,
                                                }}
                                            >
                                                Learn More
                                            </Button>
                                        </Box>
                                    </CardContent>
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
                        onClick={toggleShowAllServices}
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