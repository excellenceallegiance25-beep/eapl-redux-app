import {
  Architecture,
  Business,
  CheckCircle,
  Cloud,
  DataArray,
  EmojiEvents,
  Handshake,
  Psychology,
  Public,
  Rocket,
  School,
  Terminal,
  TrendingUp,
  VerifiedUser
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Zoom,
  alpha,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';

// Import placeholder images (you'll need to replace these with actual images)
const team1 = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop';
const team2 = 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop';
const team3 = 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w-400&h=400&fit=crop';
const team4 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop';
const office1 = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=400&fit=crop';
const office2 = 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&h=400&fit=crop';
// const innovation = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h-400&fit=crop';
const innovation = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1950&q=80';

const About = () => {
  const theme = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const leadershipTeam = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      avatar: team1,
      bio: '15+ years in enterprise technology. Former Google Engineering Director. Passionate about driving digital transformation through innovative solutions.',
      expertise: ['Cloud Architecture', 'Digital Transformation', 'Leadership'],
      linkedin: '#',
      fullBio: 'Sarah founded Excellence Allegiance in 2015 with a vision to bridge the gap between business needs and technological innovation. Under her leadership, the company has grown to serve over 200 clients globally.',
      education: 'MBA from Stanford, BSc Computer Science from MIT'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      avatar: team2,
      bio: 'PhD in Computer Science from MIT. AI/ML specialist with 20+ patents in machine learning algorithms.',
      expertise: ['AI/ML', 'DevOps', 'System Design', 'Research'],
      linkedin: '#',
      fullBio: 'Michael leads our technology strategy and innovation efforts. His research in neural networks has been published in top-tier journals.',
      education: 'PhD MIT, Postdoc at Stanford AI Lab'
    },
    {
      name: 'Emma Davis',
      role: 'VP of Engineering',
      avatar: team3,
      bio: 'Led teams at Amazon Web Services. Expert in building scalable distributed systems.',
      expertise: ['Microservices', 'Cloud Security', 'Agile', 'Scalability'],
      linkedin: '#',
      fullBio: 'Emma oversees all engineering operations, ensuring our solutions meet the highest standards of quality and reliability.',
      education: 'MSc Computer Engineering, Carnegie Mellon'
    },
    {
      name: 'David Wilson',
      role: 'Chief Security Officer',
      avatar: team4,
      bio: 'Former cybersecurity lead at NSA. Certified Ethical Hacker with extensive experience in threat intelligence.',
      expertise: ['Cybersecurity', 'Compliance', 'Risk Management', 'Cryptography'],
      linkedin: '#',
      fullBio: 'David built our security framework from the ground up, implementing industry-leading practices to protect client data.',
      education: 'MSc Cybersecurity, Georgia Tech'
    },
  ];

  const departments = [
    {
      name: 'AI Research',
      icon: <Psychology fontSize="large" />,
      members: 24,
      projects: 18,
      description: 'Developing cutting-edge AI solutions',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
    },
    {
      name: 'Cloud Engineering',
      icon: <Cloud fontSize="large" />,
      members: 42,
      projects: 56,
      description: 'Building scalable cloud infrastructure',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
    },
    {
      name: 'DevOps',
      icon: <Terminal fontSize="large" />,
      members: 28,
      projects: 32,
      description: 'Automating deployment pipelines',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
    },
    {
      name: 'Data Science',
      icon: <DataArray fontSize="large" />,
      members: 19,
      projects: 25,
      description: 'Transforming data into insights',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    }
  ];

  const coreValues = [
    {
      title: 'Excellence in Execution',
      icon: <EmojiEvents />,
      description: 'We deliver beyond expectations, focusing on quality and precision in every project.',
      color: '#667eea'
    },
    {
      title: 'Innovation First',
      icon: <Rocket />,
      description: 'Constantly exploring new technologies and methodologies to stay ahead.',
      color: '#f093fb'
    },
    {
      title: 'Client Partnership',
      icon: <Handshake />,
      description: 'We work with clients as partners, not just vendors.',
      color: '#4CAF50'
    },
    {
      title: 'Continuous Learning',
      icon: <School />,
      description: 'Investing in our team\'s growth through training and certifications.',
      color: '#FF9800'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with 5 members in a small garage, focusing on custom software solutions',
      icon: <Business />,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop'
    },
    {
      year: '2021',
      title: 'First Major Enterprise Client',
      description: 'Secured partnership with Fortune 500 healthcare provider',
      icon: <VerifiedUser />,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop'
    },
    {
      year: '2022',
      title: 'Cloud Services Division',
      description: 'Expanded to AWS and Azure cloud migration services',
      icon: <Cloud />,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
    },
    {
      year: '2024',
      title: 'International Expansion',
      description: 'Opened offices in London, Singapore, and Toronto',
      icon: <Public />,
      image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=300&fit=crop'
    },
    {
      year: '2025',
      title: 'AI Research Lab Established',
      description: 'Launched dedicated AI research division with top-tier talent',
      icon: <Architecture />,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
    },
  ];

  const certifications = [
    { name: 'AWS Partner Network', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Microsoft Gold Partner', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Google Cloud Premier Partner', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
    { name: 'ISO 27001 Certified', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/ISO_Certification.svg' },
    { name: 'SOC 2 Type II Compliant', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/AICPA_logo.svg' }
  ];

  const handleLeaderClick = (leader) => {
    setSelectedLeader(leader);
    setOpenDialog(true);
  };

  return (
    <Box>
      <PageHeader
        title="About Excellence Allegiance"
        subtitle="Empowering digital transformation through innovation and expertise"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about' }]}
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${innovation})`}
      // sx={{
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   height: { xs: 400, md: 500 ,xl:600
      //   },
      //   display: 'flex',
      //   alignItems: 'center',
      //   color: 'white' // Ensure text is white
      // }}
      />

      <Container maxWidth="xl">
        {/* Company Overview with Stats */}
        <Box sx={{ mb: 10, textAlign: 'center', position: 'relative' }}>
          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Chip
              label="SINCE 2020"
              color="primary"
              variant="outlined"
              sx={{ mb: 3, fontWeight: 'bold', px: 3, py: 1 }}
            />
          </Zoom>

          <Fade in={true} timeout={1000}>
            <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
              Shaping the Future of Technology
            </Typography>
          </Fade>

          <Fade in={true} timeout={1500}>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8, mb: 6 }}>
              Excellence Allegiance is a premier technology consulting firm specializing in digital transformation,
              cloud solutions, and enterprise software development. With a team of 150+ experts across 4 continents,
              we help organizations navigate complex technological challenges and achieve measurable business outcomes.
            </Typography>
          </Fade>

          {/* Stats Counter */}
          <Grid container spacing={3} sx={{ mt: 6 ,justifyContent: 'center' }}>
            {[
              { number: '150+', label: 'Experts Worldwide', icon: '👥' },
              { number: '40+', label: 'Countries Served', icon: '🌍' },
              { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
              { number: '200+', label: 'Projects Completed', icon: '🚀' }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Grow in={true} timeout={(index + 1) * 300}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      }
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <Box component="span" sx={{ fontSize: '1.5rem', mr: 1 }}>{stat.icon}</Box>
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mission & Vision Cards */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Grow in={true}>
              <Card sx={{
                height: '100%',
                background: `linear-gradient(rgba(66, 73, 106, 0.9), rgba(51, 39, 62, 0.9)), url(${office1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}>
                <Box sx={{ p: 5, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Rocket sx={{ fontSize: 40 }} />
                    <Typography variant="h3" fontWeight="bold">
                      Our Mission
                    </Typography>
                  </Box>
                  <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.95 }}>
                    To accelerate digital innovation by providing cutting-edge technology solutions
                    that drive growth, efficiency, and sustainable competitive advantage.
                  </Typography>
                  <List>
                    {[
                      'Transform businesses through strategic technology adoption',
                      'Deliver exceptional ROI through measurable outcomes',
                      'Foster long-term partnerships built on trust and results'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40, color: 'white' }}>
                          <CheckCircle />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ variant: 'h6', sx: { opacity: 0.9 } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Card>
            </Grow>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grow in={true} timeout={500}>
              <Card sx={{
                height: '100%',
                background: `linear-gradient(rgba(89, 58, 92, 0.9), rgba(100, 121, 205, 0.9)), url(${office2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}>
                <Box sx={{ p: 5, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <TrendingUp sx={{ fontSize: 40 }} />
                    <Typography variant="h3" fontWeight="bold">
                      Our Vision
                    </Typography>
                  </Box>
                  <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.95 }}>
                    To be the world's most trusted technology innovation partner,
                    recognized for transforming industries and creating lasting impact.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
                    {['Global Leader', 'Innovation Hub', 'Trusted Partner', 'Industry Pioneer'].map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 'bold',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.3)'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Card>
            </Grow>
          </Grid>
        </Grid>

        {/* Core Values with Interactive Cards */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
            Our Core Values
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            The principles that guide everything we do
          </Typography>

          <Grid container spacing={4} sx={{justifyContent: 'center'}}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      transform: hoveredCard === index ? 'translateY(-8px)' : 'none',
                      boxShadow: hoveredCard === index ? theme.shadows[8] : theme.shadows[2],
                      borderTop: `4px solid ${value.color}`,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${value.color}, transparent)`,
                        opacity: 0,
                        transition: 'opacity 0.3s'
                      },
                      '&:hover::before': {
                        opacity: 1
                      }
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: alpha(value.color, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        color: value.color,
                        transition: 'all 0.3s',
                        transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {value.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Leadership Team with Images */}
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

          <Grid container spacing={4} justifyContent="center">
            {leadershipTeam.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Grow in={true} timeout={index * 200}>
                  <Card
                    sx={{
                      height: 400,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      overflow: 'hidden',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: theme.shadows[10],
                        '& .leader-image': {
                          transform: 'scale(1.1)'
                        },
                        '& .leader-overlay': {
                          opacity: 1
                        }
                      }
                    }}
                    onClick={() => handleLeaderClick(member)}
                  >
                    <Box
                      className="leader-image"
                      sx={{
                        height: '60%',
                        backgroundImage: `url(${member.avatar})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'fit-center',
                        backgroundRepeat:'no-repeat',
                        transition: 'transform 0.5s'
                      }}
                    />
                    <Box
                      className="leader-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: '40%',
                        bgcolor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s'
                      }}
                    >
                      <Typography variant="h6" color="white" fontWeight="bold">
                        View Profile →
                      </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        {member.name}
                      </Typography>
                      <Chip
                        label={member.role}
                        color="primary"
                        size="small"
                        sx={{ mb: 2, fontWeight: 'bold' }}
                      />
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Departments with Hover Effects */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
            Our Expertise Areas
          </Typography>

          <Grid container spacing={4} sx={{justifyContent: 'center'}}>
            {departments.map((dept, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={index * 200}>
                  <Paper
                    sx={{
                      p: 0,
                      overflow: 'hidden',
                      height: '100%',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                        '& .department-content': {
                          transform: 'translateY(0)'
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 200,
                        backgroundImage: `url(${dept.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <Box
                      className="department-content"
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        transition: 'transform 0.3s'
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 15px',
                          color: theme.palette.primary.main,
                        }}
                      >
                        {dept.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {dept.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                        {dept.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" fontWeight="bold" color="primary">
                            {dept.members}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Experts
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" fontWeight="bold" color="secondary">
                            {dept.projects}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Projects
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Interactive Timeline */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label="OUR JOURNEY"
              color="primary"
              variant="outlined"
              sx={{ mb: 3, fontWeight: 'bold', px: 3, py: 1 }}
            />
            <Typography variant="h3" gutterBottom fontWeight="bold">
              Milestones & Achievements
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', mt: 6 }}>
            <Box
              sx={{
                position: 'absolute',
                left: { xs: '30px', md: '50%' },
                transform: { xs: 'none', md: 'translateX(-50%)' },
                width: '4px',
                height: '100%',
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                zIndex: 0,
              }}
            />

            {milestones.map((milestone, index) => (
              <Grow in={true} timeout={index * 300} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    mb: 6,
                    position: 'relative',
                    flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                    alignItems: 'start',
                    cursor: 'pointer',
                    '&:hover .timeline-dot': {
                      transform: 'scale(1.5)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '100px', md: '120px', lg: '140px', xl: '150px' },
                      textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                      pr: { xs: 2, md: index % 2 === 0 ? 4 : 0 },
                      pl: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      color="primary"
                      sx={{
                        fontSize: { xs: '2rem', md: '3rem' },
                        opacity: 0.8,
                      }}
                    >
                      {milestone.year}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      position: 'relative',
                      ml: { xs: 0, md: index % 2 === 0 ? 0 : 'auto' },
                      mr: { xs: 0, md: index % 2 === 0 ? 'auto' : 0 },
                      maxWidth: { xs: 'calc(100% - 60px)', md: '400px' },
                    }}
                  >
                    <Box
                      className="timeline-dot"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: { xs: '-38px', md: index % 2 === 0 ? '-20px' : 'calc(100% + 20px)' },
                        transform: 'translateY(-50%)',
                        width: { xs: '16px', md: '20px' },
                        height: { xs: '16px', md: '20px' },
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        border: `4px solid ${theme.palette.background.paper}`,
                        zIndex: 2,
                        transition: 'transform 0.3s'
                      }}
                    />

                    <Card
                      sx={{
                        p: 3,
                        boxShadow: theme.shadows[4],
                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ color: 'primary.main' }}>
                          {milestone.icon}
                        </Box>
                        <Typography variant="h5" fontWeight="bold">
                          {milestone.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {milestone.description}
                      </Typography>
                    </Card>
                  </Box>
                </Box>
              </Grow>
            ))}
          </Box>
        </Box>

        {/* Interactive Certifications */}
        <Paper sx={{
          p: 5,
          mb: 8,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #667eea, #f093fb)',
            }}
          />

          <Typography variant="h4" gutterBottom fontWeight="bold" align="center" sx={{ mb: 4 }}>
            Certifications & Industry Recognition
          </Typography>

          <Grid container spacing={3} justifyContent="center" alignItems="center">
            {certifications.map((cert, index) => (
              <Grid item key={index}>
                <Grow in={true} timeout={index * 200}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[4],
                        bgcolor: alpha(theme.palette.primary.main, 0.05)
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={cert.logo}
                      alt={cert.name}
                      sx={{
                        width: 40,
                        height: 40,
                        objectFit: 'contain'
                      }}
                    />
                    <Typography variant="body1" fontWeight="medium">
                      {cert.name}
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Contact Information with Images */}
        {/* <Box sx={{ mb: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" align="center" sx={{ mb: 1 }}>
            Ready to Transform Your Business?
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" paragraph sx={{ mb: 6 }}>
            Get in touch with our team of experts
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <LocationOn sx={{ fontSize: 40 }} />,
                title: 'Global Headquarters',
                details: ['123 Innovation Drive', 'San Francisco, CA 94107', 'United States'],
                color: '#667eea',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
              },
              {
                icon: <Email sx={{ fontSize: 40 }} />,
                title: 'Contact Email',
                details: ['hello@excellenceallegiance.com', 'sales@excellenceallegiance.com', 'careers@excellenceallegiance.com'],
                color: '#f5576c',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
              },
              {
                icon: <Phone sx={{ fontSize: 40 }} />,
                title: 'Phone Numbers',
                details: ['+1 (415) 123-4567 (Sales)', '+1 (415) 987-6543 (Support)', '24/7 Emergency: +1 (415) 555-7890'],
                color: '#4CAF50',
                image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
              }
            ].map((contact, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={true} timeout={index * 300}>
                  <Card sx={{
                    p: 0,
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${alpha(contact.color, 0.2)}`,
                      '& .contact-image': {
                        transform: 'scale(1.1)'
                      }
                    }
                  }}>
                    <Box
                      className="contact-image"
                      sx={{
                        height: 150,
                        backgroundImage: `url(${contact.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.5s'
                      }}
                    />
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: alpha(contact.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '-55px auto 25px',
                          color: contact.color,
                          border: `4px solid ${theme.palette.background.paper}`,
                          position: 'relative',
                          zIndex: 1
                        }}
                      >
                        {contact.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                        {contact.title}
                      </Typography>
                      {contact.details.map((detail, idx) => (
                        <Typography
                          key={idx}
                          variant="body1"
                          sx={{
                            mb: 2,
                            color: idx === 0 ? 'text.primary' : 'text.secondary',
                            transition: 'all 0.3s',
                            '&:hover': {
                              color: contact.color,
                              transform: 'translateX(5px)'
                            }
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Container>

      {/* Leader Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedLeader && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={selectedLeader.avatar}
                  sx={{ width: 60, height: 60 }}
                />
                <Box>
                  <Typography variant="h5" fontWeight="bold">{selectedLeader.name}</Typography>
                  <Typography color="text.secondary">{selectedLeader.role}</Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Biography
                </Typography>
                <Typography paragraph>
                  {selectedLeader.fullBio}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Education
                </Typography>
                <Typography paragraph>
                  {selectedLeader.education}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom color="primary">
                  Expertise
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedLeader.expertise.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 'medium' }}
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button
                variant="contained"
                color="primary"
                href={selectedLeader.linkedin}
                target="_blank"
              >
                View LinkedIn
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default About;