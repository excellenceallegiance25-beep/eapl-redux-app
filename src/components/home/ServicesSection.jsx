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

    // Service-specific background images (using Unsplash or similar sources)
    const getServiceBackground = (serviceTitle) => {
        const backgrounds = {
            'Cloud Solutions': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=345&q=80")',
            'Software Development': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=345&q=80")',
            'Cybersecurity': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w-345&q=80")',
            'AI & Analytics': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=345&q=80")',
            'Mobile Development': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=345&q=80")',
            'Digital Transformation': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=345&q=80")',
            'IoT Solutions': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=345&q=80")',
            'Blockchain Services': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=345&q=80")',
            'DevOps & CI/CD': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=345&q=80")',
            'Quality Assurance': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=345&q=80")',
            'UI/UX Design': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=345&q=80")',
            'Consulting Services': 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=345&q=80")',
        };
        return backgrounds[serviceTitle] || 'linear-gradient(rgba(130, 109, 207, 0.7), rgba(172, 103, 103, 0.7)), url("https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=345&q=80")';
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

    const services = [
        {
            title: 'Cloud Solutions',
            description: 'Enterprise cloud infrastructure with auto-scaling and global CDN.',
            icon: '☁️',
            color: '#2196F3',
            features: ['AWS/Azure', 'Migration', 'DevOps'],
            bgType: 'image',

            // Added
            category: 'Cloud',
            details: 'We provide end-to-end cloud solutions including migration strategy, implementation, and ongoing management.',
        },
        {
            title: 'Software Development',
            description: 'Custom applications with modern frameworks and best practices.',
            icon: '💻',
            color: '#673AB7',
            features: ['Web Apps', 'Mobile Apps', 'APIs'],
            bgType: 'image',

            // Added
            category: 'Development',
            details: 'From concept to deployment, we build robust and scalable software solutions.',
        },
        {
            title: 'Cybersecurity',
            description: 'Complete security solutions with threat detection and compliance.',
            icon: '🔒',
            color: '#F44336',
            features: ['Pen Testing', 'Encryption', 'Monitoring'],
            bgType: 'image',

            // Added
            category: 'Security',
            details: 'Protect your digital assets with our advanced security solutions.',
        },
        {
            title: 'AI & Analytics',
            description: 'Data-driven insights and machine learning solutions.',
            icon: '🤖',
            color: '#4CAF50',
            features: ['BI Dashboards', 'Predictive', 'ML Models'],
            bgType: 'image',

            // Added
            category: 'Analytics',
            details: 'Leverage the power of data with our analytics and AI solutions.',
        },
        {
            title: 'Mobile Development',
            description: 'Cross-platform mobile apps for iOS and Android.',
            icon: '📱',
            color: '#FF9800',
            features: ['React Native', 'Flutter', 'Native'],
            bgType: 'image',

            // Added
            category: 'Mobile',
            details: 'Build engaging mobile experiences with our expert development team.',
        },
        {
            title: 'Digital Transformation',
            description: 'Complete digital overhaul with process automation.',
            icon: '🚀',
            color: '#9C27B0',
            features: ['Strategy', 'Automation', 'Modernization'],
            bgType: 'image',

            // Added
            category: 'Transformation',
            details: 'Guide your business through digital transformation with our proven methodologies.',
        },
        {
            title: 'IoT Solutions',
            description: 'Connect and manage devices with smart IoT platforms.',
            icon: '🌐',
            color: '#00BCD4',
            features: ['Smart Devices', 'Real-time Data'],
            bgType: 'image',

            // No direct pair in second array
            category: 'IoT',
            details: 'End-to-end IoT platform development, device integration, and real-time monitoring.',
        },
        {
            title: 'Blockchain Services',
            description: 'Secure decentralized solutions for finance and supply chain.',
            icon: '⛓️',
            color: '#FF5722',
            features: ['Smart Contracts', 'DApps'],
            bgType: 'image',

            // No direct pair in second array
            category: 'Blockchain',
            details: 'Build and deploy secure blockchain applications and smart contracts.',
        },
        {
            title: 'DevOps & CI/CD',
            description: 'Automated deployment pipelines and infrastructure as code.',
            icon: '⚙️',
            color: '#795548',
            features: ['Jenkins', 'Docker', 'Kubernetes'],
            bgType: 'image',

            // Added (best match)
            category: 'Development',
            details: 'Accelerate your development lifecycle with CI/CD automation and DevOps practices.',
        },
        {
            title: 'Quality Assurance',
            description: 'Comprehensive testing solutions for software quality.',
            icon: '✅',
            color: '#607D8B',
            features: ['Automation', 'Performance', 'Security'],
            bgType: 'image',

            // No equivalent in second array
            category: 'Testing',
            details: 'End-to-end software testing including automation, performance, and security validation.',
        },
        {
            title: 'UI/UX Design',
            description: 'User-centered design for exceptional digital experiences.',
            icon: '🎨',
            color: '#E91E63',
            features: ['Wireframes', 'Prototyping', 'User Testing'],
            bgType: 'image',

            // No equivalent in second array
            category: 'Design',
            details: 'Craft intuitive and visually stunning user experiences with modern UI/UX practices.',
        },
        {
            title: 'Consulting Services',
            description: 'Strategic technology consulting and roadmap planning.',
            icon: '📊',
            color: '#3F51B5',
            features: ['Strategy', 'Architecture', 'Planning'],
            bgType: 'image',

            // Added (matches IT Consulting)
            category: 'Transformation',
            details: 'Get expert guidance for your technology investments and digital roadmap.',
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
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease-in-out',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        // Background based on service type
                                        background: service.bgType === 'image'
                                            ? getServiceBackground(service.title)
                                            : getServicePattern(service.title),
                                        backgroundSize: service.bgType === 'image' ? 'cover' : '400% 400%',
                                        backgroundPosition: service.bgType === 'image' ? 'center' : '0% 0%',
                                        backgroundRepeat: 'no-repeat',
                                        color: 'white',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: theme.shadows[8],
                                            borderColor: service.color,
                                            backgroundSize: service.bgType === 'image' ? '420% 420%' : '450% 450%',
                                            '& .service-icon': {
                                                transform: 'scale(1.1) rotate(5deg)',
                                                bgcolor: alpha(service.color, 0.9),
                                            },
                                            '& .service-title': {
                                                color: service.color,
                                            },
                                            '& .service-description': {
                                                color: alpha('#fff', 0.9),
                                            },
                                            '& .service-chip': {
                                                bgcolor: alpha(service.color, 0.9),
                                                color: 'white',
                                            },
                                            '& .service-button': {
                                                borderColor: service.color,
                                                bgcolor: alpha(service.color, 0.9),
                                                color: 'white',
                                            }
                                        },
                                        '&::before': service.bgType === 'pattern' ? {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(135deg, 
                                                ${alpha(service.color, 0.3)} 0%, 
                                                ${alpha('#000', 0.7)} 100%)`,
                                            zIndex: 0,
                                        } : {},
                                    }}
                                >
                                    {/* Overlay for better text readability */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)',
                                            zIndex: 0,
                                            opacity: service.bgType === 'image' ? 0.7 : 0.3,
                                            transition: 'opacity 0.3s ease-in-out',
                                            '&:hover': {
                                                opacity: service.bgType === 'image' ? 0.5 : 0.2,
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
                                            p: SYMMETRICAL_CARD_CONFIG.padding,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            zIndex: 1,
                                        }}
                                    >
                                        {/* Icon Container */}
                                        <Box
                                            className="service-icon"
                                            sx={{
                                                width: SYMMETRICAL_CARD_CONFIG.iconSize,
                                                height: SYMMETRICAL_CARD_CONFIG.iconSize,
                                                borderRadius: '50%',
                                                bgcolor: alpha(service.color, 0.7),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: SYMMETRICAL_CARD_CONFIG.iconFontSize,
                                                color: 'white',
                                                mb: 2,
                                                transition: 'all 0.3s ease-in-out',
                                                flexShrink: 0,
                                                mx: 'auto',
                                                backdropFilter: 'blur(10px)',
                                                border: `2px solid ${alpha('#fff', 0.2)}`,
                                            }}
                                        >
                                            {service.icon}
                                        </Box>

                                        {/* Title */}
                                        <Typography
                                            className="service-title"
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
                                                color: 'white',
                                                transition: 'color 0.3s ease-in-out',
                                            }}
                                        >
                                            {service.title}
                                        </Typography>

                                        {/* Description */}
                                        <Typography
                                            className="service-description"
                                            variant="body2"
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
                                                color: alpha('#fff', 0.8),
                                                transition: 'color 0.3s ease-in-out',
                                            }}
                                        >
                                            {service.description}
                                        </Typography>

                                        {/* Features Chips */}
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
                                                        className="service-chip"
                                                        label={feature}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: alpha(service.color, 0.7),
                                                            color: 'white',
                                                            fontSize: SYMMETRICAL_CARD_CONFIG.chipFontSize,
                                                            height: SYMMETRICAL_CARD_CONFIG.chipHeight,
                                                            flexShrink: 0,
                                                            maxWidth: '100%',
                                                            backdropFilter: 'blur(10px)',
                                                            border: `1px solid ${alpha('#fff', 0.2)}`,
                                                            transition: 'all 0.3s ease-in-out',
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        {/* Button */}
                                        <Box sx={{
                                            mt: 'auto',
                                            flexShrink: 0,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}>
                                            <Button
                                                className="service-button"
                                                variant="outlined"
                                                size="small"
                                                endIcon={<ArrowRightAlt />}
                                                sx={{
                                                    borderColor: alpha('#fff', 0.3),
                                                    color: 'white',
                                                    '&:hover': {
                                                        borderColor: service.color,
                                                        bgcolor: alpha(service.color, 0.7),
                                                    },
                                                    fontSize: SYMMETRICAL_CARD_CONFIG.buttonFontSize,
                                                    py: SYMMETRICAL_CARD_CONFIG.buttonPaddingY,
                                                    px: 3,
                                                    minWidth: 140,
                                                    backdropFilter: 'blur(10px)',
                                                    borderWidth: 1.5,
                                                    transition: 'all 0.3s ease-in-out',
                                                    fontWeight: 'bold',
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