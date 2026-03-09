import {
    ExpandMore
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Typography,
    useMediaQuery,
    useTheme,
    Paper,
    alpha,
    Link,
    Button
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const FaqSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Responsive font sizes
    const getFontSize = {
        h4: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem', lg: '2.5rem' },
        h6: { xs: '0.95rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
        body1: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem', lg: '1rem' },
    };

    const faqData = [
        {
            question: 'What is your typical project timeline?',
            answer: 'Project timelines vary based on complexity. Small projects typically take 4-8 weeks, while enterprise solutions can take 3-6 months. We provide detailed timeline estimates during the initial consultation.',
        },
        {
            question: 'Do you provide ongoing support?',
            answer: 'Yes, we offer various support packages including 24/7 monitoring, regular maintenance, and emergency support. Our support team is available through multiple channels to ensure your systems run smoothly.',
        },
        {
            question: 'Can you work with our existing infrastructure?',
            answer: 'Absolutely. We specialize in integrating with legacy systems and modernizing existing infrastructure. Our team has extensive experience working with diverse technology stacks.',
        },
        {
            question: 'What industries do you serve?',
            answer: 'We serve clients across various industries including finance, healthcare, retail, manufacturing, and technology. Each solution is tailored to meet specific industry requirements and compliance standards.',
        },
        {
            question: 'What is your typical response time?',
            answer: 'We respond to all inquiries within 24 hours during business days. Premium support clients receive priority response times of 4-8 hours.',
        },
        {
            question: 'Do you offer emergency support?',
            answer: 'Yes, we provide 24/7 emergency support for our enterprise clients. Our on-call team ensures critical issues are addressed immediately.',
        },
        {
            question: 'Can I schedule a demo?',
            answer: 'Absolutely! Contact our sales team to schedule a personalized demo. We can showcase relevant features based on your specific business needs.',
        },
    ];

    const whatsappNumber = '+916289534780'; // Format: country code + number without spaces/special chars
    const whatsappMessage = 'Hello, I have a question about your services.';

    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, '_blank');
    };

    return (
        <Box sx={{ 
            py: 10,
            backgroundColor: alpha(theme.palette.primary.main, 0.02),
            width: '100%'
        }}>
            <Container 
                maxWidth="lg"
                sx={{ 
                    px: { xs: 2, sm: 3, md: 4 }
                }}
            >
                {/* Header Section */}
                <Box sx={{ 
                    textAlign: 'center', 
                    mb: { xs: 3, sm: 4, md: 5 }
                }}>
                    <Typography 
                        variant="h4" 
                        align="center" 
                        gutterBottom 
                        fontWeight="bold"
                        sx={{ 
                            fontSize: getFontSize.h4,
                            lineHeight: { xs: 1.3, sm: 1.4 },
                            mb: { xs: 1.5, sm: 2 }
                        }}
                    >
                        Frequently Asked Questions
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ 
                            maxWidth: { xs: '100%', sm: '80%', md: '70%' },
                            mx: 'auto',
                            fontSize: getFontSize.body1,
                            px: { xs: 2, sm: 3 }
                        }}
                    >
                        Find answers to common questions about our services, process, and how we work with clients
                    </Typography>
                </Box>

                {/* FAQ Accordions */}
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: 'transparent',
                        maxWidth: { xs: '100%', md: '900px' },
                        mx: 'auto',
                        borderRadius: { xs: 2, sm: 3 },
                        overflow: 'hidden'
                    }}
                >
                    {faqData.map((faq, index) => (
                        <Accordion 
                            key={index} 
                            sx={{ 
                                mb: { xs: 1, sm: 1.5 },
                                borderRadius: { xs: 1.5, sm: 2 },
                                '&:before': {
                                    display: 'none',
                                },
                                boxShadow: theme.shadows[1],
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: theme.shadows[3],
                                },
                                '&.Mui-expanded': {
                                    margin: { xs: '8px 0', sm: '12px 0' },
                                    boxShadow: theme.shadows[4],
                                }
                            }}
                        >
                            <AccordionSummary 
                                expandIcon={<ExpandMore sx={{ 
                                    fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' }
                                }} />}
                                sx={{
                                    minHeight: { xs: 48, sm: 56, md: 64 },
                                    '& .MuiAccordionSummary-content': {
                                        margin: { xs: '8px 0', sm: '12px 0' }
                                    },
                                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                                    borderRadius: { xs: 1.5, sm: 2 },
                                    '&.Mui-expanded': {
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                    }
                                }}
                            >
                                <Typography 
                                    fontWeight="bold"
                                    sx={{ 
                                        fontSize: getFontSize.h6,
                                        lineHeight: { xs: 1.4, sm: 1.5 },
                                        pr: { xs: 2, sm: 3 }
                                    }}
                                >
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails 
                                sx={{ 
                                    p: { xs: 2, sm: 2.5, md: 3 },
                                    backgroundColor: '#fff'
                                }}
                            >
                                <Typography 
                                    sx={{ 
                                        fontSize: getFontSize.body1,
                                        lineHeight: { xs: 1.6, sm: 1.7 },
                                        color: 'text.secondary'
                                    }}
                                >
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Paper>

                {/* Contact CTA with WhatsApp */}
                <Box sx={{ 
                    textAlign: 'center', 
                    mt: { xs: 4, sm: 5, md: 6 },
                    px: { xs: 2, sm: 3 }
                }}>
                    <Box 
                        sx={{ 
                            display: 'inline-block',
                            p: { xs: 2, sm: 2.5, md: 3 },
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                            borderRadius: { xs: 2, sm: 3 },
                            maxWidth: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
                            mx: 'auto'
                        }}
                    >
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ 
                                fontSize: getFontSize.body1,
                                mb: { xs: 1.5, sm: 2 },
                                lineHeight: 1.6
                            }}
                        >
                            Still have questions? Chat with us directly on WhatsApp!
                        </Typography>
                        
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: { xs: 1.5, sm: 2 }
                        }}>
                            {/* WhatsApp Button */}
                            <Button
                                variant="contained"
                                startIcon={<WhatsAppIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
                                onClick={handleWhatsAppClick}
                                sx={{
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                                    py: { xs: 1, sm: 1.2 },
                                    px: { xs: 3, sm: 4 },
                                    borderRadius: { xs: 2, sm: 3 },
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    width: { xs: '100%', sm: 'auto' },
                                    '&:hover': {
                                        backgroundColor: '#128C7E',
                                    }
                                }}
                            >
                                +91 6289534780
                            </Button>

                            {/* Alternative contact */}
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
                                }}
                            >
                                or email us at{" "}
                                <Link 
                                    href="mailto:contact@myeapl.com"
                                    sx={{ 
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    contact@myeapl.com
                                </Link>
                            </Typography>
                        </Box>

                        {/* Contact numbers */}
                        {/* <Box sx={{ 
                            mt: { xs: 2, sm: 2.5 },
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'center',
                            gap: { xs: 1, sm: 3 }
                        }}>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 0.5,
                                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                                }}
                            >
                                <Box component="span" sx={{ color: 'text.secondary' }}>📞 Sales:</Box>
                                <Link 
                                    href="tel:+916289534780"
                                    sx={{ 
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        fontWeight: 'medium',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    +91 6289534780
                                </Link>
                            </Typography>
                            
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 0.5,
                                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                                }}
                            >
                                <Box component="span" sx={{ color: 'text.secondary' }}>🛠️ Support:</Box>
                                <Link 
                                    href="tel:+916289534780"
                                    sx={{ 
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        fontWeight: 'medium',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    +91 6289534780
                                </Link>
                            </Typography>
                        </Box> */}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FaqSection;