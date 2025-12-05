import {
    Avatar, Box, Card,
    CardContent, Chip,
    Grid,
    Typography,
    alpha,
    useTheme
} from '@mui/material';

const Ourteam = () => {

    const theme = useTheme();

    const leadershipTeam = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            avatar: 'SJ',
            bio: '15+ years in enterprise technology. Former Google Engineering Director.',
            expertise: ['Cloud Architecture', 'Digital Transformation'],
            linkedin: '#'
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            avatar: 'MC',
            bio: 'PhD in Computer Science from MIT. AI/ML specialist with 20+ patents.',
            expertise: ['AI/ML', 'DevOps', 'System Design'],
            linkedin: '#'
        },
        {
            name: 'Emma Davis',
            role: 'VP of Engineering',
            avatar: 'ED',
            bio: 'Led teams at Amazon Web Services. Expert in scalable systems.',
            expertise: ['Microservices', 'Cloud Security', 'Agile'],
            linkedin: '#'
        },
        {
            name: 'David Wilson',
            role: 'Chief Security Officer',
            avatar: 'DW',
            bio: 'Former cybersecurity lead at NSA. Certified Ethical Hacker.',
            expertise: ['Cybersecurity', 'Compliance', 'Risk Management'],
            linkedin: '#'
        },
    ];

    return (
        <Box sx={{ mb: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Chip
                    label="LEADERSHIP"
                    color="secondary"
                    sx={{ mb: 3, fontWeight: 'bold', px: 3, py: 1 }}
                />
                <Typography variant="h3" gutterBottom fontWeight="bold">
                    Meet Our Leadership Team
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                    Industry veterans with decades of combined experience in technology and business transformation
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{
                transition: 'all 0.5s ease-in-out',
                justifyContent: 'center', // Center align cards
            }}>
                {leadershipTeam.map((member, index) => (
                    <Grid item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        xl={3}
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', // Center each card
                        }}>
                        <Card sx={{
                            width: 345,
                            height: 400,
                            minWidth: 345,
                            minHeight: 400,
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[6]
                            }
                        }}>
                            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        margin: '0 auto 20px',
                                        bgcolor: theme.palette.primary.main,
                                        fontSize: '2.5rem',
                                        border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`
                                    }}
                                >
                                    {member.avatar}
                                </Avatar>
                                <Typography variant="h5" gutterBottom fontWeight="bold">
                                    {member.name}
                                </Typography>
                                <Chip
                                    label={member.role}
                                    color="primary"
                                    size="small"
                                    sx={{ mb: 2, fontWeight: 'bold' }}
                                />
                                <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2, minHeight: 60 }}>
                                    {member.bio}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                    {member.expertise.map((skill, idx) => (
                                        <Chip
                                            key={idx}
                                            label={skill}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontSize: '0.75rem' }}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Ourteam;