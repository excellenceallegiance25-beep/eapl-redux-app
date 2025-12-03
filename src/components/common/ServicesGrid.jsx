import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Button,
    Chip,
    Container,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const ServicesGrid = () => {
    const theme = useTheme();

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
            description: 'Custom applications with modern   and best practices.',
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
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            <Grid
                container
                spacing={3}
            // sx={{
            //     '& .MuiGrid-item': {
            //         display: 'flex',
            //         justifyContent: 'center',
            //     }
            // }}
            >
                {services.map((service, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        xl={4}
                        key={index}
                        sx={{ display: 'flex', justifyContent: 'space-around' }}
                    >

                        <Card
                            sx={{
                                width: '400px',          // <-- FIXED
                                height: '300px',         // <-- FIXED
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                transition: 'all 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4,
                                    borderColor: service.color,
                                },
                            }}
                        >


                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >

                                {/* Fixed Icon Container */}
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        bgcolor: alpha(service.color, 0.1),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 28,
                                        color: service.color,
                                        mb: 1,
                                        flexShrink: 0,
                                    }}
                                >
                                    {service.icon}
                                </Box>

                                {/* Fixed Title Area */}
                                <Box sx={{
                                    // height: '72px',
                                    mb: 1,
                                    flexShrink: 0,
                                }}>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{
                                            fontSize: '1.25rem',
                                            lineHeight: 1.3,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {service.title}
                                    </Typography>
                                </Box>

                                {/* Fixed Description Area */}
                                <Box sx={{
                                    // height: '90px',
                                    mb: 1,
                                    flexShrink: 0,
                                }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {service.description}
                                    </Typography>
                                </Box>

                                {/* Fixed Features Area */}
                                <Box sx={{
                                    // height: '80px',
                                    mb: 1,
                                    flexShrink: 0,
                                    overflow: 'hidden',
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1,
                                    }}>
                                        {service.features.map((feature, idx) => (
                                            <Chip
                                                key={idx}
                                                label={feature}
                                                size="small"
                                                sx={{
                                                    bgcolor: alpha(service.color, 0.1),
                                                    color: service.color,
                                                    fontSize: '0.75rem',
                                                    height: 28,
                                                    flexShrink: 0,
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>

                                {/* Button at bottom */}
                                <Box sx={{
                                    mt: 'auto',
                                    pt: 1,
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                    flexShrink: 0,
                                }}>
                                    <Button
                                        variant="text"
                                        size="small"
                                        endIcon={<ArrowRightAlt />}
                                        fullWidth
                                        sx={{
                                            color: service.color,
                                            fontSize: '0.875rem',
                                            justifyContent: 'space-between',
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
        </Container>
    );
};

export default ServicesGrid;