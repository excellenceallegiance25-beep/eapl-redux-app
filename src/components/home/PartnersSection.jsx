import {
    Box,
    Chip,
    Container,
    Paper,
    Typography,
    alpha,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useState } from 'react';

const partners = [
    { name: 'Microsoft', type: 'Technology', logo: 'MS', color: '#00A4EF' },
    { name: 'Amazon', type: 'Cloud', logo: 'AZ', color: '#FF9900' },
    { name: 'Google', type: 'AI', logo: 'GG', color: '#4285F4' },
    { name: 'IBM', type: 'Enterprise', logo: 'IBM', color: '#054ADA' },
    { name: 'Salesforce', type: 'CRM', logo: 'SF', color: '#00A1E0' },
    { name: 'Oracle', type: 'Database', logo: 'OR', color: '#F80000' },
    { name: 'Intel', type: 'Hardware', logo: 'IN', color: '#0071C5' },
    { name: 'Dell', type: 'Technology', logo: 'DE', color: '#007DB8' },
    { name: 'Cisco', type: 'Networking', logo: 'CS', color: '#1BA0D7' },
    { name: 'Adobe', type: 'Creative', logo: 'AD', color: '#FF0000' },
    { name: 'SAP', type: 'Enterprise', logo: 'SP', color: '#0FAAFF' },
    { name: 'VMware', type: 'Virtualization', logo: 'VM', color: '#607078' },
];

const PartnersSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [marqueeKey, setMarqueeKey] = useState(0);

    // Duplicate partners for seamless loop
    const duplicatedPartners = [...partners, ...partners];

    return (
        <Box sx={{ py: { xs: 6, sm: 8, md: 12 }, overflow: 'hidden' }}>
            <Container maxWidth="xl">
                <Box textAlign="center" sx={{ mb: { xs: 4, sm: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
                    <Chip
                        label="Our Partners"
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
                        variant={isMobile ? "h3" : "h2"}
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
                    >
                        Trusted by Industry Leaders
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
                        We collaborate with global brands to deliver exceptional results
                    </Typography>
                </Box>

                {/* Marquee Container */}
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    py: 2,
                    '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        width: '100px',
                        height: '100%',
                        zIndex: 2,
                    },
                    '&::before': {
                        left: 0,
                        background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
                    },
                    '&::after': {
                        right: 0,
                        background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
                    }
                }}>
                    {/* Marquee Track */}
                    <Box
                        key={marqueeKey}
                        sx={{
                            display: 'flex',
                            animation: 'marquee 40s linear infinite',
                            '@keyframes marquee': {
                                '0%': { transform: 'translateX(0)' },
                                '100%': { transform: 'translateX(-50%)' },
                            },
                            '&:hover': {
                                animationPlayState: 'paused',
                            },
                        }}
                    >
                        {/* Duplicated partners for seamless loop */}
                        {duplicatedPartners.map((partner, index) => (
                            <Paper
                                key={`${partner.name}-${index}`}
                                elevation={0}
                                sx={{
                                    flexShrink: 0,
                                    mx: { xs: 1, sm: 1.5, md: 2 },
                                    p: { xs: 1.5, sm: 2, md: 2.5 },
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 3,
                                    minWidth: { xs: 120, sm: 140, md: 160 },
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[4],
                                        borderColor: partner.color,
                                        bgcolor: alpha(partner.color, 0.02),
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: 50, sm: 60, md: 70 },
                                        height: { xs: 50, sm: 60, md: 70 },
                                        borderRadius: '50%',
                                        bgcolor: alpha(partner.color, 0.1),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 8px',
                                        fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                                        fontWeight: 'bold',
                                        color: partner.color,
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    {partner.logo}
                                </Box>
                                <Typography
                                    variant={isMobile ? "subtitle2" : "subtitle1"}
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.05rem' },
                                        mb: 0.5,
                                    }}
                                >
                                    {partner.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                                        display: 'block',
                                    }}
                                >
                                    {partner.type}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>

                {/* Stats Section */}
                {/* <Box sx={{ 
          mt: { xs: 6, sm: 8, md: 10 },
          textAlign: 'center',
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          borderRadius: 4,
          p: { xs: 3, sm: 4, md: 5 },
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}>
          <Grid container spacing={3} justifyContent="center">
            {[
              { value: '50+', label: 'Partnerships Worldwide' },
              { value: '15+', label: 'Years of Collaboration' },
              { value: '200+', label: 'Joint Projects' },
              { value: '99%', label: 'Partner Satisfaction' },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  fontWeight="bold"
                  color="primary"
                  sx={{ 
                    fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box> */}
            </Container>
        </Box>
    );
};

export default PartnersSection;