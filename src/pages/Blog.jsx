import React, { useState, useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Badge,
  Fade,
  Grow,
  Zoom,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Search,
  CalendarToday,
  Person,
  Category,
  ArrowForward,
  Share,
  Bookmark,
  Comment,
  Favorite,
  TrendingUp,
  FilterList,
  Sort,
  AccessTime,
  Visibility,
  Email,
  Send,
  Close,
  BookmarkBorder,
  BookmarkAdd,
  Share as ShareIcon,
  MoreVert,
  Tag,
  Launch,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import PageHeader from '../components/common/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set([1, 2]));
  const [viewedPosts, setViewedPosts] = useState(new Set());
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Cloud Computing in 2024',
      excerpt: 'Explore the latest trends and innovations shaping cloud technology. Discover how edge computing and AI integration are transforming the cloud landscape.',
      content: 'Cloud computing continues to evolve at a rapid pace...',
      author: 'Sarah Johnson',
      authorAvatar: 'https://i.pravatar.cc/150?img=1',
      date: '2024-01-15',
      category: 'cloud',
      tags: ['cloud', 'technology', 'future', 'innovation'],
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      likes: 142,
      comments: 32,
      views: 1250,
      featured: true,
      trending: true,
    },
    {
      id: 2,
      title: 'AI Ethics in Modern Software Development',
      excerpt: 'Navigating the ethical considerations of AI implementation. A deep dive into responsible AI practices and frameworks.',
      content: 'As AI becomes more integrated into our systems...',
      author: 'Michael Chen',
      authorAvatar: 'https://i.pravatar.cc/150?img=2',
      date: '2024-01-10',
      category: 'ai',
      tags: ['ai', 'ethics', 'development', 'responsible-ai'],
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      likes: 256,
      comments: 48,
      views: 2100,
      featured: true,
      trending: true,
    },
    {
      id: 3,
      title: 'Cybersecurity Best Practices for Remote Teams',
      excerpt: 'Essential security measures for distributed workforces. Learn how to protect your organization in the age of remote work.',
      content: 'With remote work becoming the norm...',
      author: 'Emma Davis',
      authorAvatar: 'https://i.pravatar.cc/150?img=3',
      date: '2024-01-05',
      category: 'security',
      tags: ['security', 'remote-work', 'best-practices', 'cybersecurity'],
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
      likes: 189,
      comments: 33,
      views: 1850,
      featured: false,
      trending: false,
    },
    {
      id: 4,
      title: 'React vs Vue: Which Framework to Choose in 2024',
      excerpt: 'A comprehensive comparison of popular frontend frameworks. Performance, ecosystem, and learning curve analysis.',
      content: 'Both React and Vue have their strengths...',
      author: 'David Wilson',
      authorAvatar: 'https://i.pravatar.cc/150?img=4',
      date: '2024-01-02',
      category: 'development',
      tags: ['react', 'vue', 'frontend', 'comparison', 'javascript'],
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      likes: 324,
      comments: 85,
      views: 3200,
      featured: false,
      trending: true,
    },
    {
      id: 5,
      title: 'Microservices Architecture: Benefits and Challenges',
      excerpt: 'Understanding when and how to implement microservices. Real-world case studies and implementation strategies.',
      content: 'Microservices architecture offers scalability...',
      author: 'Sarah Johnson',
      authorAvatar: 'https://i.pravatar.cc/150?img=1',
      date: '2023-12-28',
      category: 'architecture',
      tags: ['microservices', 'architecture', 'scalability', 'distributed-systems'],
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=800&h=400&fit=crop',
      likes: 167,
      comments: 28,
      views: 1950,
      featured: false,
      trending: false,
    },
    {
      id: 6,
      title: 'Data Privacy Regulations You Need to Know',
      excerpt: 'Stay compliant with global data protection laws. GDPR, CCPA, and other regulations explained.',
      content: 'Data privacy regulations are constantly evolving...',
      author: 'Michael Chen',
      authorAvatar: 'https://i.pravatar.cc/150?img=2',
      date: '2023-12-20',
      category: 'compliance',
      tags: ['privacy', 'gdpr', 'compliance', 'regulations', 'data-protection'],
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      likes: 145,
      comments: 19,
      views: 1650,
      featured: false,
      trending: false,
    },
    {
      id: 7,
      title: 'DevOps Transformation: From Theory to Practice',
      excerpt: 'Practical guide to implementing DevOps in your organization.',
      content: 'DevOps is more than just tools...',
      author: 'Alex Rivera',
      authorAvatar: 'https://i.pravatar.cc/150?img=5',
      date: '2024-01-18',
      category: 'devops',
      tags: ['devops', 'ci-cd', 'automation', 'culture'],
      readTime: '11 min read',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      likes: 198,
      comments: 42,
      views: 2200,
      featured: true,
      trending: true,
    },
    {
      id: 8,
      title: 'Quantum Computing for Developers',
      excerpt: 'Introduction to quantum computing concepts for software engineers.',
      content: 'Quantum computing represents a paradigm shift...',
      author: 'Dr. James Wilson',
      authorAvatar: 'https://i.pravatar.cc/150?img=6',
      date: '2024-01-12',
      category: 'emerging-tech',
      tags: ['quantum', 'computing', 'future', 'algorithms'],
      readTime: '15 min read',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
      likes: 278,
      comments: 56,
      views: 2800,
      featured: false,
      trending: true,
    },
  ];

  const categories = [
    { id: 'all', name: 'All', count: blogPosts.length },
    { id: 'cloud', name: 'Cloud Computing', count: blogPosts.filter(p => p.category === 'cloud').length },
    { id: 'ai', name: 'Artificial Intelligence', count: blogPosts.filter(p => p.category === 'ai').length },
    { id: 'security', name: 'Security', count: blogPosts.filter(p => p.category === 'security').length },
    { id: 'development', name: 'Development', count: blogPosts.filter(p => p.category === 'development').length },
    { id: 'architecture', name: 'Architecture', count: blogPosts.filter(p => p.category === 'architecture').length },
    { id: 'compliance', name: 'Compliance', count: blogPosts.filter(p => p.category === 'compliance').length },
    { id: 'devops', name: 'DevOps', count: blogPosts.filter(p => p.category === 'devops').length },
    { id: 'emerging-tech', name: 'Emerging Tech', count: blogPosts.filter(p => p.category === 'emerging-tech').length },
  ];

  const sortOptions = [
    { value: 'date', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'likes', label: 'Most Liked' },
    { value: 'views', label: 'Most Viewed' },
  ];

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = category === 'all' || post.category === category;
      return matchesSearch && matchesCategory;
    });

    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [searchTerm, category, sortBy]);

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
    // Track view
    setViewedPosts(prev => new Set([...prev, post.id]));
  };

  const handleLikePost = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmarkPost = (postId) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleShare = async (post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(`${post.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      // API call would go here
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
      setEmail('');
    }
  };

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        title="Tech Insights Blog"
        subtitle="Stay ahead with cutting-edge technology trends, tutorials, and industry insights"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Blog', path: '/blog' }]}
        backgroundImage={`linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.5)} 100%), url(https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=400&fit=crop)`}
        height={300}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>

        {/* Enhanced Sidebar */}
        <Grid item xs={12} lg={4} display={"flex"}>
          {/* Trending Posts with Visual Indicators */}
          <Paper
            elevation={2}
            sx={{
              width: "50%",
              p: 3,
              mb: 4,
              borderRadius: 2,
              position: 'sticky',
              top: 160,
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
              Trending Now
              <Chip
                label="Hot"
                size="small"
                color="error"
                sx={{ ml: 2 }}
              />
            </Typography>
            <List disablePadding>
              {blogPosts
                .filter(p => p.trending)
                .slice(0, 5)
                .map((post, index) => (
                  <React.Fragment key={post.id}>
                    <ListItem
                      sx={{
                        py: 2,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' },
                        borderRadius: 1,
                      }}
                      onClick={() => handleViewPost(post)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                        <Typography
                          variant="h4"
                          color="text.disabled"
                          sx={{
                            mr: 2,
                            minWidth: 30,
                            fontWeight: 'bold',
                            color: index < 3 ? 'primary.main' : 'text.disabled'
                          }}
                        >
                          {index + 1}
                        </Typography>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                            {post.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Favorite fontSize="inherit" />
                              <Typography variant="caption">{post.likes}</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                    {index < 4 && <Divider />}
                  </React.Fragment>
                ))}
            </List>
          </Paper>

          {/* Newsletter with Animation */}
          <Paper
            elevation={2}
            sx={{
              width: "50%",
              p: 3,
              mb: 4,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            {isSubscribed ? (
              <Fade in={isSubscribed}>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    🎉 Subscribed Successfully!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thank you for subscribing to our newsletter!
                  </Typography>
                </Box>
              </Fade>
            ) : (
              <>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Newsletter
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Get weekly tech insights, tutorials, and industry updates delivered to your inbox.
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                  sx={{ mb: 2 }}
                  type="email"
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubscribe}
                  disabled={!email || !email.includes('@')}
                  endIcon={<Send />}
                >
                  Subscribe Now
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  No spam, unsubscribe anytime.
                </Typography>
              </>
            )}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                mt: 5,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: 'space-around',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {blogPosts.length}+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Articles
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {blogPosts.reduce((acc, post) => acc + post.views, 0).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Views
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {categories.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categories
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {new Set(blogPosts.map(p => p.author)).size}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expert Authors
                </Typography>
              </Box>
            </Paper>
          </Paper>

        </Grid>

        {/* Enhanced Filter Bar */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            position: 'sticky',
            top: 80,
            zIndex: 100,
            bgcolor: 'background.paper',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search articles, tags, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="medium">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  startAdornment={<Category sx={{ mr: 1, color: 'action.active' }} />}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                      <Chip
                        label={cat.count}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="medium">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={<Sort sx={{ mr: 1, color: 'action.active' }} />}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                  setSortBy('date');
                }}
                startIcon={<FilterList />}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {paginatedPosts.length === 0 ? (
              <Paper sx={{ p: 8, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No articles found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {paginatedPosts.map((post, index) => (
                  <Grid item xs={12} key={post.id}>
                    <Grow in timeout={300 + index * 100}>
                      <Card
                        elevation={2}
                        sx={{
                          width: "78vw",
                          borderRadius: 2,
                          overflow: 'hidden',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows[8],
                          }
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12} md={4}>
                            <Box sx={{ position: 'relative', height: '100%' }}>
                              <CardMedia
                                component="img"
                                height="240"
                                image={post.image}
                                alt={post.title}
                                sx={{
                                  objectFit: 'cover',
                                  height: '100%',
                                  minHeight: 240,
                                }}
                              />
                              {post.featured && (
                                <Chip
                                  label="Featured"
                                  color="primary"
                                  size="small"
                                  sx={{ position: 'absolute', top: 16, left: 16 }}
                                />
                              )}
                              {post.trending && (
                                <Chip
                                  label="Trending"
                                  color="secondary"
                                  size="small"
                                  sx={{ position: 'absolute', top: 16, right: 16 }}
                                />
                              )}
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <CardContent sx={{ p: 3 }}>
                              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                <Chip
                                  label={post.category}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  icon={<Category fontSize="small" />}
                                />
                                {post.tags.slice(0, 2).map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    icon={<Tag fontSize="small" />}
                                  />
                                ))}
                                {post.tags.length > 2 && (
                                  <Chip
                                    label={`+${post.tags.length - 2}`}
                                    size="small"
                                    variant="outlined"
                                  />
                                )}
                              </Box>

                              <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="bold"
                                sx={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                {post.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                width={"33vw"}
                                paragraph
                                sx={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                {post.excerpt}
                              </Typography>

                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Avatar
                                    src={post.authorAvatar}
                                    sx={{ width: 40, height: 40 }}
                                  >
                                    {post.author.charAt(0)}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="body2" fontWeight="medium">
                                      {post.author}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                      <Typography variant="caption" color="text.secondary">
                                        <CalendarToday sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric'
                                        })}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        <AccessTime sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                                        {post.readTime}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleLikePost(post.id)}
                                      color={likedPosts.has(post.id) ? 'primary' : 'default'}
                                    >
                                      <Favorite fontSize="small" />
                                    </IconButton>
                                    <Typography variant="body2">
                                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Comment fontSize="small" />
                                    <Typography variant="body2">{post.comments}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Visibility fontSize="small" />
                                    <Typography variant="body2">
                                      {post.views + (viewedPosts.has(post.id) ? 1 : 0)}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </CardContent>
                            <CardActions sx={{ px: 3, pb: 2 }}>
                              <Button
                                variant="contained"
                                size="small"
                                endIcon={<Launch />}
                                onClick={() => handleViewPost(post)}
                              >
                                Read Full Article
                              </Button>
                              <Box sx={{ flexGrow: 1 }} />
                              <IconButton
                                size="small"
                                onClick={() => handleBookmarkPost(post.id)}
                                color={bookmarkedPosts.has(post.id) ? 'primary' : 'default'}
                              >
                                {bookmarkedPosts.has(post.id) ? <BookmarkAdd /> : <BookmarkBorder />}
                              </IconButton>
                              <IconButton size="small" onClick={() => handleShare(post)}>
                                <ShareIcon />
                              </IconButton>
                            </CardActions>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => {
                    setPage(value);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  siblingCount={isMobile ? 0 : 1}
                />
              </Box>
            )}
          </Grid>

        </Grid>
      </Container>

      {/* Post Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        {selectedPost && (
          <>
            <DialogTitle>
              <Typography variant="h5" fontWeight="bold">
                {selectedPost.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                {selectedPost.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <CardMedia
                component="img"
                image={selectedPost.image}
                alt={selectedPost.title}
                sx={{ width: '100%', borderRadius: 1, mb: 3 }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar src={selectedPost.authorAvatar} sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {selectedPost.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(selectedPost.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" paragraph>
                {selectedPost.content}
              </Typography>

              <Typography variant="body1">
                This is a detailed view of the article. In a real application,
                this would contain the full article content fetched from an API.
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: '100%' }}>
                <Button
                  variant="contained"
                  startIcon={<Favorite />}
                  onClick={() => handleLikePost(selectedPost.id)}
                  color={likedPosts.has(selectedPost.id) ? 'primary' : 'inherit'}
                >
                  Like ({selectedPost.likes + (likedPosts.has(selectedPost.id) ? 1 : 0)})
                </Button>
                <Button
                  variant="outlined"
                  startIcon={bookmarkedPosts.has(selectedPost.id) ? <BookmarkAdd /> : <BookmarkBorder />}
                  onClick={() => handleBookmarkPost(selectedPost.id)}
                >
                  {bookmarkedPosts.has(selectedPost.id) ? 'Bookmarked' : 'Bookmark'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={() => handleShare(selectedPost)}
                >
                  Share
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={() => setOpenDialog(false)}>
                  Close
                </Button>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Blog;