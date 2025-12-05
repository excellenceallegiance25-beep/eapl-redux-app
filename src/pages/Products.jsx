import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircle from '@mui/icons-material/CheckCircle';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Search,
  FilterList,
  ShoppingCart,
  Visibility,
  Favorite,
  Share,
  Close,
} from '@mui/icons-material';
import PageHeader from '../components/common/PageHeader';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const categories = [
    'all',
    'software',
    'saas',
    'mobile-apps',
    'analytics',
    'security',
    'developer-tools',
  ];

  const products = [
    {
      id: 1,
      name: 'CloudSync Pro',
      description: 'Enterprise cloud storage and collaboration platform',
      price: '$49.99',
      monthly: true,
      category: 'saas',
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      features: ['Unlimited Storage', 'Real-time Collaboration', 'Advanced Security', 'API Access'],
    },
    {
      id: 2,
      name: 'SecureShield',
      description: 'Advanced cybersecurity suite for businesses',
      price: '$299',
      monthly: false,
      category: 'security',
      rating: 4.8,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
      features: ['Threat Detection', 'Firewall', 'VPN', '24/7 Monitoring'],
    },
    {
      id: 3,
      name: 'AnalyticsAI',
      description: 'AI-powered business intelligence platform',
      price: '$199.99',
      monthly: true,
      category: 'analytics',
      rating: 4.3,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      features: ['Predictive Analytics', 'Custom Dashboards', 'Data Visualization', 'ML Models'],
    },
    {
      id: 4,
      name: 'DevHub',
      description: 'Complete development environment in the cloud',
      price: '$29.99',
      monthly: true,
      category: 'developer-tools',
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w-400&h=300&fit=crop',
      features: ['Code Editor', 'Git Integration', 'Testing Suite', 'Deployment Tools'],
    },
    {
      id: 5,
      name: 'ShopStream',
      description: 'E-commerce platform for modern retailers',
      price: '$399',
      monthly: false,
      category: 'software',
      rating: 4.7,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      features: ['Multi-channel', 'Inventory Management', 'Payment Gateway', 'Analytics'],
    },
    {
      id: 6,
      name: 'HealthTrack',
      description: 'Healthcare management system for clinics',
      price: '$499',
      monthly: false,
      category: 'software',
      rating: 4.9,
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
      features: ['Patient Records', 'Appointment Scheduling', 'Billing', 'HIPAA Compliant'],
    },
    {
      id: 7,
      name: 'TaskFlow',
      description: 'Project management and team collaboration tool',
      price: '$19.99',
      monthly: true,
      category: 'saas',
      rating: 4.4,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      features: ['Kanban Boards', 'Time Tracking', 'File Sharing', 'Team Chat'],
    },
    {
      id: 8,
      name: 'MobileFirst',
      description: 'Cross-platform mobile app development framework',
      price: '$149',
      monthly: false,
      category: 'mobile-apps',
      rating: 4.5,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      features: ['React Native', 'iOS & Android', 'UI Components', 'Testing'],
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.id - a.id;
    }
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  return (
    <Box>
      <PageHeader
        title="Our Products"
        subtitle="Innovative software solutions for every business need"
        breadcrumbs={[{ label: 'Products', path: '/products' }]}
        backgroundImage={`linear-gradient(rgba(3, 5, 6, 0.85), rgba(21, 25, 29, 0.85)), url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop)`}
      />

      <Container maxWidth="lg">
        {/* Filters and Search */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search products..."
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
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  startAdornment={<FilterList />}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Products Grid */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {sortedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip
                      label={product.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={product.rating} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.reviews})
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography variant="h4" component="span" fontWeight="bold">
                      {product.price}
                    </Typography>
                    {product.monthly && (
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        /month
                      </Typography>
                    )}
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleProductClick(product)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Pagination
            count={Math.ceil(filteredProducts.length / 8)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            size="large"
          />
        </Box>

        {/* Product Categories Overview */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Product Categories
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              { name: 'Software Solutions', count: '15+ Products', icon: '💻' },
              { name: 'SaaS Platforms', count: '12+ Products', icon: '☁️' },
              { name: 'Security Tools', count: '8+ Products', icon: '🛡️' },
              { name: 'Analytics Suite', count: '10+ Products', icon: '📊' },
            ].map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Product Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="bold">
                  {selectedProduct.name}
                </Typography>
                <IconButton onClick={() => setOpenDialog(false)}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={selectedProduct.image}
                    alt={selectedProduct.name}
                    sx={{ borderRadius: 2, objectFit: 'cover' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={selectedProduct.rating} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({selectedProduct.reviews} reviews)
                      </Typography>
                    </Box>

                    <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                      {selectedProduct.price}
                      {selectedProduct.monthly && ' /month'}
                    </Typography>

                    <Typography variant="body1" paragraph>
                      {selectedProduct.description}
                    </Typography>

                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Key Features:
                    </Typography>
                    <List>
                      {selectedProduct.features.map((feature, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                startIcon={<Favorite />}
                onClick={() => {/* Add to wishlist */ }}
              >
                Save
              </Button>
              <Button
                startIcon={<Share />}
                onClick={() => {/* Share functionality */ }}
              >
                Share
              </Button>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={() => {/* Purchase functionality */ }}
                sx={{ ml: 2 }}
              >
                Purchase Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Products;