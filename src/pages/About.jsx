import {
  CheckCircle,
  Cloud,
  Code,
  Email,
  Groups,
  LocationOn,
  Phone,
  Public,
  Security,
  Timeline,
  Rocket,
  TrendingUp,
  VerifiedUser,
  EmojiEvents,
  School,
  Business,
  Diversity3,
  Handshake,
  Engineering,
  Psychology,
  Architecture,
  Terminal,
  DataArray,
} from '@mui/icons-material';
import {
  Avatar, Box, Card,
  CardContent, Chip, Container,
  Grid, List,
  ListItem,
  ListItemIcon,
  ListItemText, Paper, Typography,
  alpha,
  useTheme
} from '@mui/material';
import PageHeader from '../components/common/PageHeader';

const About = () => {
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

  const departments = [
    {
      name: 'AI Research',
      icon: <Psychology fontSize="large" />,
      members: 24,
      projects: 18,
      description: 'Developing cutting-edge AI solutions'
    },
    {
      name: 'Cloud Engineering',
      icon: <Cloud fontSize="large" />,
      members: 42,
      projects: 56,
      description: 'Building scalable cloud infrastructure'
    },
    {
      name: 'DevOps',
      icon: <Terminal fontSize="large" />,
      members: 28,
      projects: 32,
      description: 'Automating deployment pipelines'
    },
    {
      name: 'Data Science',
      icon: <DataArray fontSize="large" />,
      members: 19,
      projects: 25,
      description: 'Transforming data into insights'
    }
  ];

  const coreValues = [
    {
      title: 'Excellence in Execution',
      icon: <EmojiEvents />,
      description: 'We deliver beyond expectations, focusing on quality and precision in every project.'
    },
    {
      title: 'Innovation First',
      icon: <Rocket />,
      description: 'Constantly exploring new technologies and methodologies to stay ahead.'
    },
    {
      title: 'Client Partnership',
      icon: <Handshake />,
      description: 'We work with clients as partners, not just vendors.'
    },
    {
      title: 'Continuous Learning',
      icon: <School />,
      description: 'Investing in our team\'s growth through training and certifications.'
    }
  ];

  const milestones = [
    { 
      year: '2015', 
      title: 'Company Founded', 
      description: 'Started with 5 members in a small garage, focusing on custom software solutions',
      icon: <Business />
    },
    { 
      year: '2017', 
      title: 'First Major Enterprise Client', 
      description: 'Secured partnership with Fortune 500 healthcare provider',
      icon: <VerifiedUser />
    },
    { 
      year: '2019', 
      title: 'Cloud Services Division', 
      description: 'Expanded to AWS and Azure cloud migration services',
      icon: <Cloud />
    },
    { 
      year: '2021', 
      title: 'International Expansion', 
      description: 'Opened offices in London, Singapore, and Toronto',
      icon: <Public />
    },
    { 
      year: '2023', 
      title: 'AI Research Lab Established', 
      description: 'Launched dedicated AI research division with top-tier talent',
      icon: <Architecture />
    },
  ];

  const certifications = [
    'AWS Partner Network',
    'Microsoft Gold Partner',
    'Google Cloud Premier Partner',
    'ISO 27001 Certified',
    'SOC 2 Type II Compliant'
  ];

  return (
    <Box>
      <PageHeader
        title="About Excellence Allegiance"
        subtitle="Empowering digital transformation through innovation and expertise"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about' }]}
        backgroundImage="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      />

      <Container maxWidth="lg">
        {/* Company Overview */}
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <Chip 
            label="SINCE 2015" 
            color="primary" 
            variant="outlined"
            sx={{ mb: 3, fontWeight: 'bold', px: 3, py: 1 }}
          />
          <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
            Shaping the Future of Technology
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
            Excellence Allegiance is a premier technology consulting firm specializing in digital transformation, 
            cloud solutions, and enterprise software development. With a team of 150+ experts across 4 continents, 
            we help organizations navigate complex technological challenges and achieve measurable business outcomes.
          </Typography>
        </Box>

        {/* Mission & Vision Cards */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
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
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
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
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Core Values */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
            Our Core Values
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            The principles that guide everything we do
          </Typography>

          <Grid container spacing={4}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  p: 3,
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8]
                  }
                }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: theme.palette.primary.main,
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
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Leadership Team */}
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

          <Grid container spacing={4}>
            {leadershipTeam.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
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

        {/* Departments */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
            Our Expertise Areas
          </Typography>
          
          <Grid container spacing={4}>
            {departments.map((dept, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover .department-icon': {
                    transform: 'scale(1.2)',
                    color: theme.palette.primary.main
                  }
                }}>
                  <Box
                    className="department-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: theme.palette.text.secondary,
                      transition: 'all 0.3s',
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
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Company Timeline */}
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
            {/* Timeline line */}
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
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  mb: 6,
                  position: 'relative',
                  flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                }}
              >
                {/* Year Indicator */}
                <Box
                  sx={{
                    width: { xs: '60px', md: '100px' },
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

                {/* Content Card */}
                <Box
                  sx={{
                    flex: 1,
                    position: 'relative',
                    ml: { xs: 0, md: index % 2 === 0 ? 0 : 'auto' },
                    mr: { xs: 0, md: index % 2 === 0 ? 'auto' : 0 },
                    maxWidth: { xs: 'calc(100% - 60px)', md: '400px' },
                  }}
                >
                  {/* Connector dot */}
                  <Box
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
                    }}
                  />

                  <Card
                    sx={{
                      p: 3,
                      boxShadow: theme.shadows[4],
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
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
            ))}
          </Box>
        </Box>

        {/* Certifications & Partnerships */}
        <Paper sx={{ p: 5, mb: 8, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" align="center" sx={{ mb: 4 }}>
            Certifications & Industry Recognition
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {certifications.map((cert, index) => (
              <Grid item key={index}>
                <Chip
                  icon={<VerifiedUser />}
                  label={cert}
                  variant="outlined"
                  sx={{
                    px: 3,
                    py: 2,
                    fontSize: '1rem',
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Contact Information */}
        <Box sx={{ mb: 6 }}>
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
                color: '#667eea'
              },
              {
                icon: <Email sx={{ fontSize: 40 }} />,
                title: 'Contact Email',
                details: ['hello@excellenceallegiance.com', 'sales@excellenceallegiance.com', 'careers@excellenceallegiance.com'],
                color: '#f5576c'
              },
              {
                icon: <Phone sx={{ fontSize: 40 }} />,
                title: 'Phone Numbers',
                details: ['+1 (415) 123-4567 (Sales)', '+1 (415) 987-6543 (Support)', '24/7 Emergency: +1 (415) 555-7890'],
                color: '#4CAF50'
              }
            ].map((contact, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px ${alpha(contact.color, 0.2)}`
                  }
                }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: alpha(contact.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 25px',
                      color: contact.color,
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
                        mb: 1,
                        color: idx === 0 ? 'text.primary' : 'text.secondary'
                      }}
                    >
                      {detail}
                    </Typography>
                  ))}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;