import React, { useState, useEffect } from 'react';
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
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import PageHeader from '../components/common/PageHeader';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Cloud Computing in 2024',
      excerpt: 'Explore the latest trends and innovations shaping cloud technology.',
      content: 'Cloud computing continues to evolve at a rapid pace...',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'cloud',
      tags: ['cloud', 'technology', 'future'],
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h-400&fit=crop',
      likes: 42,
      comments: 12,
      featured: true,
    },
    {
      id: 2,
      title: 'AI Ethics in Modern Software Development',
      excerpt: 'Navigating the ethical considerations of AI implementation.',
      content: 'As AI becomes more integrated into our systems...',
      author: 'Michael Chen',
      date: '2024-01-10',
      category: 'ai',
      tags: ['ai', 'ethics', 'development'],
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      likes: 56,
      comments: 8,
      featured: true,
    },
    {
      id: 3,
      title: 'Cybersecurity Best Practices for Remote Teams',
      excerpt: 'Essential security measures for distributed workforces.',
      content: 'With remote work becoming the norm...',
      author: 'Emma Davis',
      date: '2024-01-05',
      category: 'security',
      tags: ['security', 'remote-work', 'best-practices'],
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
      likes: 89,
      comments: 23,
      featured: false,
    },
    {
      id: 4,
      title: 'React vs Vue: Which Framework to Choose in 2024',
      excerpt: 'A comprehensive comparison of popular frontend frameworks.',
      content: 'Both React and Vue have their strengths...',
      author: 'David Wilson',
      date: '2024-01-02',
      category: 'development',
      tags: ['react', 'vue', 'frontend', 'comparison'],
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      likes: 124,
      comments: 45,
      featured: false,
    },
    {
      id: 5,
      title: 'Microservices Architecture: Benefits and Challenges',
      excerpt: 'Understanding when and how to implement microservices.',
      content: 'Microservices architecture offers scalability...',
      author: 'Sarah Johnson',
      date: '2023-12-28',
      category: 'architecture',
      tags: ['microservices', 'architecture', 'scalability'],
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=800&h=400&fit=crop',
      likes: 67,
      comments: 18,
      featured: false,
    },
    {
      id: 6,
      title: 'Data Privacy Regulations You Need to Know',
      excerpt: 'Stay compliant with global data protection laws.',
      content: 'Data privacy regulations are constantly evolving...',
      author: 'Michael Chen',
      date: '2023-12-20',
      category: 'compliance',
      tags: ['privacy', 'gdpr', 'compliance', 'regulations'],
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      likes: 45,
      comments: 9,
      featured: false,
    },
  ];

  const categories = [
    'all',
    'cloud',
    'ai',
    'security',
    'development',
    'architecture',
    'compliance',
    'trends',
  ];

  const tags = [
    { name: 'cloud', count: 12 },
    { name: 'ai', count: 8 },
    { name: 'security', count: 15 },
    { name: 'react', count: 7 },
    { name: 'devops', count: 9 },
    { name: 'mobile', count: 6 },
  ];

  const popularPosts = blogPosts.sort((a, b) => b.likes - a.likes).slice(0, 3);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchesCategory = category === 'all' || post.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <PageHeader
        title="Tech Blog"
        subtitle="Insights, trends, and best practices in technology"
        breadcrumbs={[{ label: 'Blog', path: '/blog' }]}
      />

      <Container maxWidth="lg">
        {/* Featured Posts */}
        {filteredPosts.filter(post => post.featured).length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Featured Posts
            </Typography>
            <Grid container spacing={4}>
              {filteredPosts
                .filter(post => post.featured)
                .map((post) => (
                  <Grid item xs={12} md={6} key={post.id}>
                    <Card sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={post.image}
                        alt={post.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip
                            label={post.category}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <Chip
                            icon={<CalendarToday fontSize="small" />}
                            label={new Date(post.date).toLocaleDateString()}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {post.excerpt}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {post.author.charAt(0)}
                            </Avatar>
                            <Typography variant="body2">{post.author}</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {post.readTime}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          endIcon={<ArrowForward />}
                          onClick={() => {/* Navigate to post detail */}}
                        >
                          Read More
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton size="small">
                          <Favorite />
                        </IconButton>
                        <IconButton size="small">
                          <Comment />
                        </IconButton>
                        <IconButton size="small">
                          <Share />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {/* Search and Filter */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* Blog Posts Grid */}
            <Grid container spacing={3}>
              {filteredPosts
                .filter(post => !post.featured)
                .map((post) => (
                  <Grid item xs={12} key={post.id}>
                    <Card>
                      <Grid container>
                        <Grid item xs={12} md={4}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={post.image}
                            alt={post.title}
                            sx={{ objectFit: 'cover', height: '100%' }}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <CardContent>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                              <Chip
                                label={post.category}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                              {post.tags.map((tag) => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                            
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                              {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {post.excerpt}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ width: 32, height: 32 }}>
                                  {post.author.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" fontWeight="medium">
                                    {post.author}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {new Date(post.date).toLocaleDateString()} • {post.readTime}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <Favorite fontSize="small" />
                                  <Typography variant="body2">{post.likes}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <Comment fontSize="small" />
                                  <Typography variant="body2">{post.comments}</Typography>
                                </Box>
                              </Box>
                            </Box>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              endIcon={<ArrowForward />}
                              onClick={() => {/* Navigate to post detail */}}
                            >
                              Read Article
                            </Button>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton size="small">
                              <Bookmark />
                            </IconButton>
                            <IconButton size="small">
                              <Share />
                            </IconButton>
                          </CardActions>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 6 }}>
                <Pagination
                  count={Math.ceil(filteredPosts.length / 5)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Popular Posts */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                <TrendingUp sx={{ verticalAlign: 'middle', mr: 1 }} />
                Popular Posts
              </Typography>
              <List>
                {popularPosts.map((post) => (
                  <ListItem
                    key={post.id}
                    sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight="medium">
                          {post.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(post.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.readTime}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Categories */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                <Category sx={{ verticalAlign: 'middle', mr: 1 }} />
                Categories
              </Typography>
              <List>
                {categories.map((cat) => (
                  <ListItem
                    key={cat}
                    sx={{ py: 1 }}
                    button
                    onClick={() => setCategory(cat)}
                  >
                    <ListItemText
                      primary={cat.charAt(0).toUpperCase() + cat.slice(1)}
                      primaryTypographyProps={{
                        fontWeight: category === cat ? 'bold' : 'normal',
                        color: category === cat ? 'primary.main' : 'inherit',
                      }}
                    />
                    <Chip
                      label={blogPosts.filter(p => p.category === cat).length}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Tags */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Popular Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag.name}
                    label={`${tag.name} (${tag.count})`}
                    variant="outlined"
                    onClick={() => setSearchTerm(tag.name)}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Newsletter Subscription */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Subscribe to Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Get the latest tech insights delivered to your inbox.
              </Typography>
              <TextField
                fullWidth
                placeholder="Your email"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button variant="contained" fullWidth>
                Subscribe
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;