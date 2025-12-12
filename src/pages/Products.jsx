import {
  CheckCircleOutline,
  Close,
  Cloud,
  CompareArrows,
  CurrencyExchange,
  Download,
  Favorite,
  FavoriteBorder,
  FilterList,
  Search,
  Security,
  Share,
  ShoppingCart,
  SupportAgent,
  Timeline,
  TrendingUp,
  Verified,
  Visibility
} from '@mui/icons-material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import {
  Alert,
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Slider,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { useMemo, useState } from 'react';
import PageHeader from '../components/common/PageHeader';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [wishlist, setWishlist] = useState(new Set([1, 3]));
  const [compareList, setCompareList] = useState(new Set([]));
  const [viewedProducts, setViewedProducts] = useState(new Set([]));
  const [activeTab, setActiveTab] = useState(0);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [showFreeTrial, setShowFreeTrial] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Marquee categories data (duplicated for continuous animation)
  const marqueeCategories = [
    { id: 'software', name: 'Software Solutions', count: 15, icon: '💻' },
    { id: 'saas', name: 'SaaS Platforms', count: 12, icon: '☁️' },
    { id: 'mobile-apps', name: 'Mobile Apps', count: 8, icon: '📱' },
    { id: 'analytics', name: 'Analytics', count: 10, icon: '📊' },
    { id: 'security', name: 'Security', count: 8, icon: '🛡️' },
    { id: 'developer-tools', name: 'Dev Tools', count: 12, icon: '⚙️' },
    { id: 'ai-ml', name: 'AI & ML', count: 7, icon: '🤖' },
    { id: 'cloud', name: 'Cloud Computing', count: 9, icon: '☁️' },
    { id: 'ecommerce', name: 'E-commerce', count: 11, icon: '🛒' },
    { id: 'crm', name: 'CRM Software', count: 6, icon: '👥' },
    { id: 'erp', name: 'ERP Systems', count: 5, icon: '🏢' },
    { id: 'cms', name: 'Content Management', count: 7, icon: '📝' },
  ];

  // Original categories for the filter dropdown
  const categories = [
    { id: 'all', name: 'All Products', count: 45, icon: '📦' },
    { id: 'software', name: 'Software Solutions', count: 15, icon: '💻' },
    { id: 'saas', name: 'SaaS Platforms', count: 12, icon: '☁️' },
    { id: 'mobile-apps', name: 'Mobile Apps', count: 8, icon: '📱' },
    { id: 'analytics', name: 'Analytics', count: 10, icon: '📊' },
    { id: 'security', name: 'Security', count: 8, icon: '🛡️' },
    { id: 'developer-tools', name: 'Dev Tools', count: 12, icon: '⚙️' },
    { id: 'ai-ml', name: 'AI & ML', count: 7, icon: '🤖' },
  ];

  const products = [
    {
      id: 1,
      name: 'CloudSync Pro',
      description: 'Enterprise cloud storage and collaboration platform with AI-powered insights',
      longDescription: 'A comprehensive cloud solution for businesses of all sizes. Features include unlimited storage, real-time collaboration tools, advanced security protocols, and AI-powered analytics to optimize your workflow.',
      price: 49.99,
      originalPrice: 69.99,
      monthly: true,
      category: 'saas',
      rating: 4.5,
      reviews: 128,
      downloads: 15000,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      badge: 'Popular',
      features: [
        'Unlimited Cloud Storage',
        'Real-time Collaboration Tools',
        'Advanced Security & Encryption',
        'API Access & Integrations',
        'AI-powered Analytics Dashboard',
        '24/7 Customer Support',
        'Team Management Features',
        'Version Control System'
      ],
      tags: ['cloud', 'collaboration', 'enterprise', 'storage'],
      freeTrial: true,
      trialDays: 30,
      discount: 28,
      vendor: 'TechCorp Inc.',
      vendorRating: 4.8,
      releaseDate: '2024-01-15',
      lastUpdated: '2024-03-10',
      systemRequirements: ['Windows 10+', 'macOS 10.14+', 'Linux', '8GB RAM'],
      integrations: ['Slack', 'Google Workspace', 'Microsoft 365', 'Salesforce'],
    },
    {
      id: 2,
      name: 'SecureShield Enterprise',
      description: 'Advanced cybersecurity suite with AI threat detection',
      longDescription: 'Complete cybersecurity solution offering real-time threat detection, firewall protection, VPN services, and 24/7 monitoring. Powered by AI algorithms that learn and adapt to new threats.',
      price: 299,
      originalPrice: 399,
      monthly: false,
      category: 'security',
      rating: 4.8,
      reviews: 56,
      downloads: 8200,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
      badge: 'Featured',
      features: [
        'AI Threat Detection',
        'Advanced Firewall Protection',
        'Secure VPN Services',
        '24/7 Security Monitoring',
        'Compliance Management',
        'Real-time Alerts',
        'Data Encryption',
        'Multi-factor Authentication'
      ],
      tags: ['security', 'cybersecurity', 'enterprise', 'protection'],
      freeTrial: true,
      trialDays: 14,
      discount: 25,
      vendor: 'CyberGuard Solutions',
      vendorRating: 4.9,
      releaseDate: '2023-11-20',
      lastUpdated: '2024-02-28',
      systemRequirements: ['Windows Server 2016+', 'Linux Server', '16GB RAM'],
      integrations: ['Active Directory', 'SIEM Tools', 'Cloud Platforms'],
    },
    {
      id: 3,
      name: 'AnalyticsAI Pro',
      description: 'AI-powered business intelligence and predictive analytics',
      longDescription: 'Transform your data into actionable insights with our AI-powered analytics platform. Features include predictive modeling, custom dashboards, data visualization, and machine learning capabilities.',
      price: 199.99,
      originalPrice: 249.99,
      monthly: true,
      category: 'analytics',
      rating: 4.3,
      reviews: 89,
      downloads: 11200,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      badge: 'New',
      features: [
        'Predictive Analytics Engine',
        'Custom Dashboard Builder',
        'Advanced Data Visualization',
        'Machine Learning Models',
        'Real-time Data Processing',
        'Multi-source Integration',
        'Automated Reporting',
        'Collaborative Workspace'
      ],
      tags: ['analytics', 'ai', 'business-intelligence', 'data'],
      freeTrial: true,
      trialDays: 30,
      discount: 20,
      vendor: 'DataMind Analytics',
      vendorRating: 4.6,
      releaseDate: '2024-02-01',
      lastUpdated: '2024-03-15',
      systemRequirements: ['Modern Browser', '4GB RAM', 'Internet Connection'],
      integrations: ['SQL Databases', 'Google Analytics', 'CRM Systems'],
    },
    {
      id: 4,
      name: 'DevHub Pro',
      description: 'Complete cloud development environment with CI/CD',
      longDescription: 'Streamline your development workflow with our all-in-one cloud IDE. Includes code editor, Git integration, testing suite, deployment tools, and team collaboration features.',
      price: 29.99,
      originalPrice: 39.99,
      monthly: true,
      category: 'developer-tools',
      rating: 4.6,
      reviews: 234,
      downloads: 28000,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
      badge: 'Best Seller',
      features: [
        'Cloud-based Code Editor',
        'Git Integration & Version Control',
        'Automated Testing Suite',
        'CI/CD Pipeline Tools',
        'Team Collaboration Features',
        'Multiple Language Support',
        'Debugging Tools',
        'Deployment Automation'
      ],
      tags: ['development', 'cloud', 'ide', 'ci-cd'],
      freeTrial: true,
      trialDays: 60,
      discount: 25,
      vendor: 'CodeStream Technologies',
      vendorRating: 4.7,
      releaseDate: '2023-09-10',
      lastUpdated: '2024-03-01',
      systemRequirements: ['Modern Browser', '2GB RAM'],
      integrations: ['GitHub', 'GitLab', 'Docker', 'AWS'],
    },
    {
      id: 5,
      name: 'ShopStream Commerce',
      description: 'AI-powered e-commerce platform for modern retailers',
      longDescription: 'Complete e-commerce solution featuring multi-channel selling, inventory management, payment processing, and AI-powered recommendations to boost your sales.',
      price: 399,
      originalPrice: 499,
      monthly: false,
      category: 'software',
      rating: 4.7,
      reviews: 67,
      downloads: 9500,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      badge: 'Trending',
      features: [
        'Multi-channel Selling Platform',
        'AI-powered Inventory Management',
        'Secure Payment Gateway',
        'Advanced Analytics Dashboard',
        'Customer Relationship Management',
        'Marketing Automation Tools',
        'Mobile App Builder',
        'Shipping Integration'
      ],
      tags: ['e-commerce', 'retail', 'ai', 'platform'],
      freeTrial: false,
      trialDays: 0,
      discount: 20,
      vendor: 'RetailTech Solutions',
      vendorRating: 4.5,
      releaseDate: '2023-12-05',
      lastUpdated: '2024-03-12',
      systemRequirements: ['Web Server', 'PHP 7.4+', 'MySQL 5.7+'],
      integrations: ['Stripe', 'PayPal', 'Shopify', 'WooCommerce'],
    },
    {
      id: 6,
      name: 'HealthTrack Pro',
      description: 'Healthcare management system with HIPAA compliance',
      longDescription: 'Comprehensive healthcare solution for clinics and hospitals. Manage patient records, appointments, billing, and telemedicine services with full HIPAA compliance.',
      price: 499,
      originalPrice: 599,
      monthly: false,
      category: 'software',
      rating: 4.9,
      reviews: 34,
      downloads: 4200,
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
      badge: 'Top Rated',
      features: [
        'Electronic Health Records (EHR)',
        'Appointment Scheduling System',
        'Medical Billing & Invoicing',
        'Telemedicine Integration',
        'HIPAA Compliant Security',
        'Prescription Management',
        'Lab Results Integration',
        'Patient Portal'
      ],
      tags: ['healthcare', 'medical', 'ehr', 'hipaa'],
      freeTrial: true,
      trialDays: 30,
      discount: 17,
      vendor: 'MediTech Systems',
      vendorRating: 4.9,
      releaseDate: '2024-01-20',
      lastUpdated: '2024-03-05',
      systemRequirements: ['Windows Server 2019+', 'SQL Server 2016+'],
      integrations: ['Lab Systems', 'Pharmacy Systems', 'Insurance Providers'],
    },
    {
      id: 7,
      name: 'TaskFlow Pro',
      description: 'Advanced project management and team collaboration',
      longDescription: 'Boost team productivity with our comprehensive project management tool. Features include Kanban boards, time tracking, file sharing, team chat, and advanced reporting.',
      price: 19.99,
      originalPrice: 24.99,
      monthly: true,
      category: 'saas',
      rating: 4.4,
      reviews: 156,
      downloads: 18500,
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      badge: 'Popular',
      features: [
        'Interactive Kanban Boards',
        'Advanced Time Tracking',
        'Secure File Sharing',
        'Team Chat & Messaging',
        'Custom Workflow Automation',
        'Gantt Chart Planning',
        'Resource Management',
        'Performance Analytics'
      ],
      tags: ['project-management', 'collaboration', 'productivity', 'saas'],
      freeTrial: true,
      trialDays: 45,
      discount: 20,
      vendor: 'Productivity Labs',
      vendorRating: 4.4,
      releaseDate: '2023-10-15',
      lastUpdated: '2024-03-08',
      systemRequirements: ['Modern Browser', 'Internet Connection'],
      integrations: ['Google Drive', 'Dropbox', 'Slack', 'Microsoft Teams'],
    },
    {
      id: 8,
      name: 'MobileFirst Framework',
      description: 'Cross-platform mobile app development with React Native',
      longDescription: 'Build native mobile apps for iOS and Android using React Native. Includes UI components, testing tools, deployment automation, and real-time collaboration features.',
      price: 149,
      originalPrice: 199,
      monthly: false,
      category: 'mobile-apps',
      rating: 4.5,
      reviews: 78,
      downloads: 12300,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      badge: 'Developer Choice',
      features: [
        'React Native Framework',
        'Pre-built UI Components',
        'Testing & Debugging Tools',
        'Deployment Automation',
        'Real-time Collaboration',
        'Code Sharing Platform',
        'Performance Monitoring',
        'App Store Deployment'
      ],
      tags: ['mobile', 'react-native', 'development', 'cross-platform'],
      freeTrial: true,
      trialDays: 30,
      discount: 25,
      vendor: 'AppDev Studios',
      vendorRating: 4.6,
      releaseDate: '2023-11-30',
      lastUpdated: '2024-02-25',
      systemRequirements: ['Node.js 14+', 'React Native CLI', 'Xcode/Android Studio'],
      integrations: ['Firebase', 'AWS Amplify', 'GitHub Actions'],
    },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.includes(searchTerm.toLowerCase()));

      const matchesCategory = category === 'all' || product.category === category;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesDiscount = !showDiscounted || product.discount > 0;
      const matchesFreeTrial = !showFreeTrial || product.freeTrial;

      return matchesSearch && matchesCategory && matchesPrice && matchesDiscount && matchesFreeTrial;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    }

    return filtered;
  }, [searchTerm, category, sortBy, priceRange, showDiscounted, showFreeTrial]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
    setViewedProducts(prev => new Set([...prev, product.id]));
  };

  const handleWishlistToggle = (productId) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleCompareToggle = (productId) => {
    setCompareList(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        if (newSet.size < 4) {
          newSet.add(productId);
        } else {
          alert('Maximum 4 products can be compared');
        }
      }
      return newSet;
    });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleShare = async (product) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`${product.name} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        title="Software Marketplace"
        subtitle="Discover powerful tools and solutions to transform your business"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }]}
        backgroundImage={`linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${alpha(theme.palette.secondary.main, 0.85)} 100%), url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop)`}
        height={350}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Quick Stats */}
        {/* <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {products.length}+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Products
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {new Set(products.map(p => p.category)).size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categories
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {products.reduce((acc, p) => acc + p.downloads, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Downloads
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                4.6
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Rating
              </Typography>
            </Paper>
          </Grid>
        </Grid> */}

        {/* Marquee Animation for Categories */}
        <Box sx={{ mb: 6, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mr: 2 }}>
              Browse by Category
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="primary" fontWeight="medium">
                Scroll to explore
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
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
                background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
              },
              '&::after': {
                right: 0,
                background: 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                animation: 'marquee 30s linear infinite',
                '@keyframes marquee': {
                  '0%': {
                    transform: 'translateX(0)',
                  },
                  '100%': {
                    transform: 'translateX(-50%)',
                  },
                },
                '&:hover': {
                  animationPlayState: 'paused',
                },
              }}
            >
              {/* First set of categories */}
              {[...marqueeCategories, ...marqueeCategories].map((cat, index) => (
                <Box
                  key={`${cat.id}-${index}`}
                  sx={{
                    flex: '0 0 auto',
                    width: '200px',
                    mx: 2,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      height: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                        borderColor: 'primary.main',
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                    }}
                    onClick={() => setCategory(cat.id)}
                  >
                    <Typography variant="h3" sx={{ mb: 1, fontSize: '2.5rem' }}>
                      {cat.icon}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      {cat.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cat.count} Products
                    </Typography>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Hover to pause scrolling • Click to filter by category
            </Typography>
          </Box> */}
        </Box>

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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search products, features, or tags..."
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
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
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
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="popular">Most Popular</MenuItem>
                  <MenuItem value="discount">Best Discount</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ px: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showDiscounted}
                    onChange={(e) => setShowDiscounted(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Discounted Only"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showFreeTrial}
                    onChange={(e) => setShowFreeTrial(e.target.checked)}
                    color="primary"
                  />
                }
                label="Free Trial Available"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  onClick={() => {
                    setSearchTerm('');
                    setCategory('all');
                    setSortBy('latest');
                    setPriceRange([0, 1000]);
                    setShowDiscounted(false);
                    setShowFreeTrial(false);
                  }}
                  startIcon={<FilterList />}
                >
                  Clear All Filters
                </Button>
                {compareList.size > 0 && (
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    startIcon={<CompareArrows />}
                  >
                    Compare ({compareList.size})
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  {/* Badge */}
                  {product.badge && (
                    <Chip
                      label={product.badge}
                      color={
                        product.badge === 'Featured' ? 'primary' :
                          product.badge === 'New' ? 'success' :
                            product.badge === 'Best Seller' ? 'warning' :
                              product.badge === 'Trending' ? 'secondary' : 'default'
                      }
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 1
                      }}
                    />
                  )}

                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <Chip
                      label={`-${product.discount}%`}
                      color="error"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 1
                      }}
                    />
                  )}

                  {/* Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      objectFit: 'cover',
                      width: '100%',
                      aspectRatio: '4/3',
                    }}
                  />

                  {/* Content Area - Fixed height for consistency */}
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    p: 2.5,
                    height: 'calc(100% - 200px)', // Subtract image height
                    justifyContent: 'space-between'
                  }}>
                    {/* Top Section: Category & Rating */}
                    <Box sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Chip
                          label={product.category}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={product.rating} precision={0.5} size="small" readOnly />
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                            ({product.reviews})
                          </Typography>
                        </Box>
                      </Box>

                      {/* Product Name */}
                      <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                          fontSize: '1rem',
                          lineHeight: 1.3,
                          minHeight: '2.6rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {product.name}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1.5,
                          fontSize: '0.875rem',
                          lineHeight: 1.4,
                          minHeight: '2.8rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {product.description}
                      </Typography>
                    </Box>

                    {/* Middle Section: Price & Tags */}
                    <Box sx={{ mb: 2 }}>
                      {/* Price */}
                      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1.5 }}>
                        {product.discount > 0 ? (
                          <>
                            <Typography variant="h6" component="span" fontWeight="bold" color="primary">
                              ${product.price.toFixed(2)}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="span"
                              color="text.secondary"
                              sx={{ textDecoration: 'line-through', ml: 1 }}
                            >
                              ${product.originalPrice.toFixed(2)}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="h6" component="span" fontWeight="bold" color="primary">
                            ${product.price.toFixed(2)}
                          </Typography>
                        )}
                        {product.monthly && (
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            /month
                          </Typography>
                        )}
                      </Box>

                      {/* Tags */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                        {product.tags.slice(0, 3).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.65rem',
                              height: '22px',
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        ))}
                        {product.tags.length > 3 && (
                          <Chip
                            label={`+${product.tags.length - 3}`}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.65rem',
                              height: '22px',
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        )}
                      </Box>

                      {/* Free Trial */}
                      {product.freeTrial && (
                        <Alert
                          severity="info"
                          sx={{
                            py: 0.5,
                            '& .MuiAlert-icon': { fontSize: '1rem' },
                            '& .MuiAlert-message': { fontSize: '0.75rem' }
                          }}
                        >
                          {product.trialDays}-day free trial
                        </Alert>
                      )}
                    </Box>

                    {/* Bottom Section: Actions */}
                    <Box>
                      {/* Main Action Button */}
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ShoppingCart />}
                        onClick={() => handleProductClick(product)}
                        size="small"
                        sx={{
                          mb: 1.5,
                          py: 0.75,
                          fontSize: '0.875rem',
                          fontWeight: 'medium'
                        }}
                      >
                        View Details
                      </Button>

                      {/* Secondary Actions */}
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 0.5
                      }}>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Add to Wishlist">
                            <IconButton
                              size="small"
                              onClick={() => handleWishlistToggle(product.id)}
                              color={wishlist.has(product.id) ? 'primary' : 'default'}
                              sx={{
                                width: 32,
                                height: 32,
                                '& .MuiSvgIcon-root': { fontSize: '1rem' }
                              }}
                            >
                              {wishlist.has(product.id) ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Compare">
                            <IconButton
                              size="small"
                              onClick={() => handleCompareToggle(product.id)}
                              color={compareList.has(product.id) ? 'secondary' : 'default'}
                              sx={{
                                width: 32,
                                height: 32,
                                '& .MuiSvgIcon-root': { fontSize: '1rem' }
                              }}
                            >
                              <CompareArrows />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Share">
                            <IconButton
                              size="small"
                              onClick={() => handleShare(product)}
                              sx={{
                                width: 32,
                                height: 32,
                                '& .MuiSvgIcon-root': { fontSize: '1rem' }
                              }}
                            >
                              <Share />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Tooltip title="Quick Preview">
                          <IconButton
                            size="small"
                            sx={{
                              width: 32,
                              height: 32,
                              '& .MuiSvgIcon-root': { fontSize: '1rem' }
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {filteredProducts.length > productsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 8 }}>
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

        {/* Product Categories Overview */}
        {/* <Box sx={{ mb: 8 }}>
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
        </Box> */}

        {/* Why Choose Us */}
        <Paper
          sx={{
            p: 6,
            mb: 8,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Why Choose Our Marketplace?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              { icon: <Verified />, title: 'Verified Products', desc: 'All products are thoroughly tested and verified' },
              { icon: <Security />, title: 'Secure Payments', desc: 'Safe and encrypted payment processing' },
              { icon: <SupportAgent />, title: '24/7 Support', desc: 'Round-the-clock customer support' },
              { icon: <Cloud />, title: 'Cloud Delivery', desc: 'Instant digital downloads and access' },
              { icon: <CurrencyExchange />, title: 'Money Back Guarantee', desc: '30-day satisfaction guarantee' },
              { icon: <Timeline />, title: 'Regular Updates', desc: 'Products are regularly maintained and updated' },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight="medium">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Enhanced Product Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {selectedProduct.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label={selectedProduct.category} color="primary" variant="outlined" />
                    {selectedProduct.badge && (
                      <Chip label={selectedProduct.badge} color="secondary" size="small" />
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={selectedProduct.rating} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({selectedProduct.reviews} reviews)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <IconButton onClick={() => setOpenDialog(false)} size="large">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ pt: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={selectedProduct.image}
                      alt={selectedProduct.name}
                      sx={{
                        borderRadius: 2,
                        objectFit: 'cover',
                        width: '100%',
                        maxHeight: 400,
                      }}
                    />
                    {selectedProduct.discount > 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'error.main',
                          color: 'white',
                          p: 1,
                          borderRadius: 1,
                          fontWeight: 'bold',
                        }}
                      >
                        -{selectedProduct.discount}%
                      </Box>
                    )}
                  </Box>

                  {/* Vendor Info */}
                  <Paper sx={{ p: 2, mt: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {selectedProduct.vendor.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {selectedProduct.vendor}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating value={selectedProduct.vendorRating} size="small" readOnly />
                          <Typography variant="caption" color="text.secondary">
                            Verified Seller
                          </Typography>
                        </Box>
                      </Box>
                      <Button variant="outlined" size="small">
                        View Profile
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  {/* Price Section */}
                  <Paper sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                      {selectedProduct.discount > 0 ? (
                        <>
                          <Typography variant="h3" fontWeight="bold" color="primary">
                            ${selectedProduct.price.toFixed(2)}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              textDecoration: 'line-through',
                              ml: 2,
                              color: 'text.secondary'
                            }}
                          >
                            ${selectedProduct.originalPrice.toFixed(2)}
                          </Typography>
                          <Chip
                            label={`Save $${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}`}
                            color="error"
                            sx={{ ml: 2 }}
                          />
                        </>
                      ) : (
                        <Typography variant="h3" fontWeight="bold" color="primary">
                          ${selectedProduct.price.toFixed(2)}
                        </Typography>
                      )}
                      {selectedProduct.monthly && (
                        <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
                          /month
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCart />}
                        fullWidth={isMobile}
                        sx={{ flex: 1 }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={wishlist.has(selectedProduct.id) ? <Favorite /> : <FavoriteBorder />}
                        onClick={() => handleWishlistToggle(selectedProduct.id)}
                        color={wishlist.has(selectedProduct.id) ? 'primary' : 'inherit'}
                      >
                        {wishlist.has(selectedProduct.id) ? 'Saved' : 'Save'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<CompareArrows />}
                        onClick={() => handleCompareToggle(selectedProduct.id)}
                        color={compareList.has(selectedProduct.id) ? 'secondary' : 'inherit'}
                      >
                        Compare
                      </Button>
                    </Box>

                    {selectedProduct.freeTrial && (
                      <Alert severity="success" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          🎉 {selectedProduct.trialDays}-day free trial available! No credit card required.
                        </Typography>
                      </Alert>
                    )}
                  </Paper>

                  {/* Description */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Description
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedProduct.longDescription}
                    </Typography>
                  </Box>

                  {/* Key Features */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Key Features
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedProduct.features.map((feature, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <CheckCircle color="primary" sx={{ fontSize: 20, mt: 0.5 }} />
                            <Typography variant="body2">{feature}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>

                {/* Additional Info Tabs */}
                <Grid item xs={12}>
                  <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <Tabs value={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tab label="System Requirements" />
                      <Tab label="Integrations" />
                      <Tab label="Updates" />
                      <Tab label="Reviews" />
                    </Tabs>
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                            System Requirements
                          </Typography>
                          <List dense>
                            {selectedProduct.systemRequirements.map((req, index) => (
                              <ListItem key={index}>
                                <ListItemIcon sx={{ minWidth: 30 }}>
                                  <CheckCircleOutline color="primary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={req} />
                              </ListItem>
                            ))}
                          </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                            Integrations
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {selectedProduct.integrations.map((integration, index) => (
                              <Chip key={index} label={integration} variant="outlined" />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                startIcon={<Download />}
                onClick={() => {/* Demo download */ }}
              >
                Try Demo
              </Button>
              <Button
                startIcon={<Share />}
                onClick={() => handleShare(selectedProduct)}
              >
                Share
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={() => {/* Purchase */ }}
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