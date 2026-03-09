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
  Visibility,
  Menu as MenuIcon,
  Tune,
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
  useTheme,
  Drawer,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Portal,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Fix for aria-hidden warning - remove aria-hidden from root when dialog is open
  useEffect(() => {
    if (openDialog || mobileFilterOpen) {
      // Remove any aria-hidden attributes from root and its ancestors
      const root = document.getElementById('root');
      if (root && root.getAttribute('aria-hidden') === 'true') {
        root.removeAttribute('aria-hidden');
      }
      
      // Also check body element
      if (document.body.getAttribute('aria-hidden') === 'true') {
        document.body.removeAttribute('aria-hidden');
      }
    }
  }, [openDialog, mobileFilterOpen]);

  // Responsive font sizes
  const getFontSize = {
    h2: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' },
    h3: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem', lg: '2.5rem' },
    h4: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' },
    h5: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem', lg: '1.5rem' },
    h6: { xs: '0.95rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
    body1: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
    body2: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem', lg: '0.95rem' },
    caption: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.8rem' },
  };

  // Responsive spacing
  const getSpacing = {
    section: { xs: 3, sm: 4, md: 5, lg: 6 },
    container: { xs: 2, sm: 3, md: 4, lg: 5 },
    card: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
  };

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
        // console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`${product.name} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const productsPerPage = isMobile ? 4 : isTablet ? 6 : 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // Mobile Filter Drawer
  const MobileFilterDrawer = () => (
    <Drawer
      anchor="bottom"
      open={mobileFilterOpen}
      onClose={() => setMobileFilterOpen(false)}
      PaperProps={{
        sx: {
          height: '85vh',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          p: 3,
        }
      }}
      // Add these props to fix accessibility
      ModalProps={{
        keepMounted: false,
        disableEnforceFocus: false,
        disableAutoFocus: false,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">Filter Products</Typography>
        <IconButton onClick={() => setMobileFilterOpen(false)} aria-label="Close filter">
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        {/* Category Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={category ?? ''}
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

        {/* Sort By */}
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy ?? ''}
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

        {/* Price Range */}
        <Box>
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

        {/* Toggle Filters */}
        <FormControlLabel
          control={
            <Switch
              checked={showDiscounted}
              onChange={(e) => setShowDiscounted(e.target.checked)}
              color="primary"
              size="small"
            />
          }
          label="Show Discounted Only"
        />

        <FormControlLabel
          control={
            <Switch
              checked={showFreeTrial}
              onChange={(e) => setShowFreeTrial(e.target.checked)}
              color="primary"
              size="small"
            />
          }
          label="Free Trial Available"
        />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              setSearchTerm('');
              setCategory('all');
              setSortBy('latest');
              setPriceRange([0, 1000]);
              setShowDiscounted(false);
              setShowFreeTrial(false);
            }}
          >
            Clear All
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setMobileFilterOpen(false)}
          >
            Apply Filters
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        title="Software Marketplace"
        subtitle="Discover powerful tools and solutions to transform your business"
        // breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }]}
        backgroundImage={`linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 40%, ${alpha(theme.palette.secondary.main, 0.85)} 100%), url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop)`}
        height={{ xs: 250, sm: 300, md: 350 }}
      />

      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 5, lg: 6 } }}>
        {/* Marquee Animation for Categories */}
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            mb: 2,
            gap: { xs: 1, sm: 0 }
          }}>
            <Typography 
              variant="h4" 
              gutterBottom={isMobile} 
              fontWeight="bold" 
              sx={{ 
                fontSize: getFontSize.h4,
                mr: { sm: 2 }
              }}
            >
              Browse by Category
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp color="primary" sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.2rem' } }} />
              <Typography variant="body2" color="primary" fontWeight="medium" sx={{ fontSize: getFontSize.body2 }}>
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
                width: { xs: 40, sm: 60, md: 80 },
                height: '100%',
                zIndex: 2,
              },
              '&::before': {
                left: 0,
                background: `linear-gradient(90deg, ${theme.palette.background.default} 0%, transparent 100%)`,
              },
              '&::after': {
                right: 0,
                background: `linear-gradient(270deg, ${theme.palette.background.default} 0%, transparent 100%)`,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                animation: 'marquee 30s linear infinite',
                '@keyframes marquee': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' },
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
                    width: { xs: '140px', sm: '160px', md: '180px' },
                    mx: { xs: 1, sm: 1.5, md: 2 },
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: { xs: 2, sm: 2.5, md: 3 },
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      height: { xs: '120px', sm: '130px', md: '140px' },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        transform: isDesktop ? 'translateY(-8px)' : 'translateY(-4px)',
                        boxShadow: isDesktop ? theme.shadows[8] : theme.shadows[4],
                        borderColor: 'primary.main',
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                    }}
                    onClick={() => setCategory(cat.id)}
                  >
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mb: 0.5, 
                        fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' }
                      }}
                    >
                      {cat.icon}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="medium" 
                      sx={{ 
                        mb: 0.3,
                        fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                      }}
                    >
                      {cat.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}
                    >
                      {cat.count} Products
                    </Typography>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Enhanced Filter Bar - Desktop */}
        {!isMobile ? (
          <Paper
            elevation={2}
            sx={{
              p: { sm: 2.5, md: 3 },
              mb: { sm: 3, md: 4 },
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
                        <IconButton size="small" onClick={() => setSearchTerm('')} aria-label="Clear search">
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category ?? ''}
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
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy ?? ''}
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
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: getFontSize.body2 }}>
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={10}
                    size="small"
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
                      size="small"
                    />
                  }
                  label={<Typography sx={{ fontSize: getFontSize.body2 }}>Show Discounted Only</Typography>}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showFreeTrial}
                      onChange={(e) => setShowFreeTrial(e.target.checked)}
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography sx={{ fontSize: getFontSize.body2 }}>Free Trial Available</Typography>}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { md: 'flex-end' } }}>
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
                    sx={{ fontSize: getFontSize.body2 }}
                  >
                    Clear All Filters
                  </Button>
                  {compareList.size > 0 && (
                    <Button
                      size="small"
                      color="secondary"
                      variant="outlined"
                      startIcon={<CompareArrows />}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      Compare ({compareList.size})
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          // Mobile Filter Bar
          <Paper
            elevation={2}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              position: 'sticky',
              top: 70,
              zIndex: 100,
              bgcolor: 'background.paper',
            }}
          >
            <Grid container spacing={1.5} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Search products..."
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
                        <IconButton size="small" onClick={() => setSearchTerm('')} aria-label="Clear search">
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category ?? ''}
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
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Tune />}
                  onClick={() => setMobileFilterOpen(true)}
                  size="small"
                  aria-label="Open filters"
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <Paper sx={{ p: { xs: 4, sm: 6, md: 8 }, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ fontSize: getFontSize.h5 }}>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: getFontSize.body1 }}>
              Try adjusting your search or filter criteria
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3, lg: 4 }} sx={{ mb: 4 }}>
            {paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    '&:hover': {
                      transform: isDesktop ? 'translateY(-4px)' : 'none',
                      boxShadow: isDesktop ? theme.shadows[8] : theme.shadows[4],
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
                        top: { xs: 8, sm: 12 },
                        left: { xs: 8, sm: 12 },
                        zIndex: 1,
                        fontSize: getFontSize.caption,
                        height: { xs: 20, sm: 24 },
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
                        top: { xs: 8, sm: 12 },
                        right: { xs: 8, sm: 12 },
                        zIndex: 1,
                        fontSize: getFontSize.caption,
                        height: { xs: 20, sm: 24 },
                      }}
                    />
                  )}

                  {/* Image */}
                  <CardMedia
                    component="img"
                    height={{ xs: 160, sm: 180, md: 200 }}
                    image={product.image}
                    alt={product.name}
                    sx={{
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />

                  {/* Content Area */}
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                  }}>
                    {/* Category & Rating */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={product.category}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                          height: { xs: 20, sm: 22, md: 24 },
                        }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={product.rating} precision={0.5} size="small" readOnly />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontSize: getFontSize.caption }}>
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
                        fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem', lg: '1.1rem' },
                        lineHeight: 1.3,
                        minHeight: { xs: '2.4rem', sm: '2.6rem' },
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
                        fontSize: getFontSize.body2,
                        lineHeight: 1.4,
                        minHeight: { xs: '2.4rem', sm: '2.6rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.description}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1.5 }}>
                      {product.discount > 0 ? (
                        <>
                          <Typography variant="h6" component="span" fontWeight="bold" color="primary" sx={{ fontSize: getFontSize.h6 }}>
                            ${product.price.toFixed(2)}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through', ml: 1, fontSize: getFontSize.body2 }}
                          >
                            ${product.originalPrice.toFixed(2)}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h6" component="span" fontWeight="bold" color="primary" sx={{ fontSize: getFontSize.h6 }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                      )}
                      {product.monthly && (
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1, fontSize: getFontSize.caption }}>
                          /month
                        </Typography>
                      )}
                    </Box>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                      {product.tags.slice(0, 3).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: getFontSize.caption,
                            height: { xs: 18, sm: 20, md: 22 },
                            '& .MuiChip-label': { px: { xs: 0.5, sm: 1 } }
                          }}
                        />
                      ))}
                      {product.tags.length > 3 && (
                        <Chip
                          label={`+${product.tags.length - 3}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: getFontSize.caption,
                            height: { xs: 18, sm: 20, md: 22 },
                            '& .MuiChip-label': { px: { xs: 0.5, sm: 1 } }
                          }}
                        />
                      )}
                    </Box>

                    {/* Free Trial Alert */}
                    {product.freeTrial && (
                      <Alert
                        severity="info"
                        sx={{
                          py: 0.3,
                          mb: 1.5,
                          '& .MuiAlert-icon': { fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } },
                          '& .MuiAlert-message': { fontSize: getFontSize.caption }
                        }}
                      >
                        {product.trialDays}-day free trial
                      </Alert>
                    )}

                    {/* Main Action Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleProductClick(product)}
                      size="small"
                      sx={{
                        mb: 1.5,
                        py: { xs: 0.5, sm: 0.75 },
                        fontSize: getFontSize.body2,
                      }}
                    >
                      View Details
                    </Button>

                    {/* Secondary Actions */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Add to Wishlist">
                          <IconButton
                            size="small"
                            onClick={() => handleWishlistToggle(product.id)}
                            color={wishlist.has(product.id) ? 'primary' : 'default'}
                            sx={{
                              width: { xs: 28, sm: 30, md: 32 },
                              height: { xs: 28, sm: 30, md: 32 },
                              '& .MuiSvgIcon-root': { fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }
                            }}
                            aria-label={wishlist.has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
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
                              width: { xs: 28, sm: 30, md: 32 },
                              height: { xs: 28, sm: 30, md: 32 },
                              '& .MuiSvgIcon-root': { fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }
                            }}
                            aria-label={compareList.has(product.id) ? "Remove from compare" : "Add to compare"}
                          >
                            <CompareArrows />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Share">
                          <IconButton
                            size="small"
                            onClick={() => handleShare(product)}
                            sx={{
                              width: { xs: 28, sm: 30, md: 32 },
                              height: { xs: 28, sm: 30, md: 32 },
                              '& .MuiSvgIcon-root': { fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }
                            }}
                            aria-label="Share product"
                          >
                            <Share />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Tooltip title="Quick Preview">
                        <IconButton
                          size="small"
                          sx={{
                            width: { xs: 28, sm: 30, md: 32 },
                            height: { xs: 28, sm: 30, md: 32 },
                            '& .MuiSvgIcon-root': { fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }
                          }}
                          aria-label="Quick preview"
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {filteredProducts.length > productsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, sm: 5, md: 6 }, mb: { xs: 6, sm: 7, md: 8 } }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => {
                setPage(value);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              color="primary"
              size={isMobile ? 'medium' : 'large'}
              showFirstButton={!isMobile}
              showLastButton={!isMobile}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={isMobile ? 1 : 2}
            />
          </Box>
        )}

        {/* Why Choose Us */}
        <Paper
          sx={{
            p: { xs: 3, sm: 4, md: 5, lg: 6 },
            mb: { xs: 6, sm: 7, md: 8 },
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            fontWeight="bold"
            sx={{ 
              fontSize: getFontSize.h4,
              mb: { xs: 2, sm: 3, md: 4 }
            }}
          >
            Why Choose Our Marketplace?
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mt: { xs: 1, sm: 2 } }}>
            {[
              { icon: <Verified />, title: 'Verified Products', desc: 'All products are thoroughly tested and verified' },
              { icon: <Security />, title: 'Secure Payments', desc: 'Safe and encrypted payment processing' },
              { icon: <SupportAgent />, title: '24/7 Support', desc: 'Round-the-clock customer support' },
              { icon: <Cloud />, title: 'Cloud Delivery', desc: 'Instant digital downloads and access' },
              { icon: <CurrencyExchange />, title: 'Money Back Guarantee', desc: '30-day satisfaction guarantee' },
              { icon: <Timeline />, title: 'Regular Updates', desc: 'Products are regularly maintained and updated' },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ 
                    color: 'primary.main',
                    '& .MuiSvgIcon-root': { fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }
                  }}>
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      fontWeight="medium"
                      sx={{ 
                        fontSize: getFontSize.h6,
                        mb: { xs: 0.5, sm: 1 }
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      {feature.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer />

      {/* Enhanced Product Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : { xs: 2, sm: 3 },
            m: isMobile ? 0 : { xs: 2, sm: 3, md: 4 },
          }
        }}
        // Add these props to fix accessibility issues
        disableEnforceFocus={false}
        disableAutoFocus={false}
        keepMounted={false}
        aria-modal={true}
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{ 
              pb: 1, 
              p: { xs: 2, sm: 2.5, md: 3 },
            }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between', 
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: { xs: 1, sm: 0 }
              }}>
                <Box>
                  <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' }
                    }}
                  >
                    {selectedProduct.name}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 1, sm: 2 }, 
                    flexWrap: 'wrap' 
                  }}>
                    <Chip 
                      label={selectedProduct.category} 
                      color="primary" 
                      variant="outlined" 
                      size={isMobile ? "small" : "medium"}
                    />
                    {selectedProduct.badge && (
                      <Chip 
                        label={selectedProduct.badge} 
                        color="secondary" 
                        size={isMobile ? "small" : "medium"}
                      />
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={selectedProduct.rating} precision={0.5} readOnly size={isMobile ? "small" : "medium"} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: getFontSize.body2 }}>
                        ({selectedProduct.reviews} reviews)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <IconButton onClick={() => setOpenDialog(false)} size={isMobile ? "medium" : "large"} aria-label="Close dialog">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ 
              pt: { xs: 2, sm: 2.5, md: 3 },
              p: { xs: 2, sm: 2.5, md: 3 },
            }}>
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={selectedProduct.image}
                      alt={selectedProduct.name}
                      sx={{
                        borderRadius: { xs: 1.5, sm: 2 },
                        objectFit: 'cover',
                        width: '100%',
                        maxHeight: { xs: 250, sm: 300, md: 400 },
                      }}
                    />
                    {selectedProduct.discount > 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: { xs: 12, sm: 16 },
                          right: { xs: 12, sm: 16 },
                          bgcolor: 'error.main',
                          color: 'white',
                          p: { xs: 0.5, sm: 1 },
                          borderRadius: 1,
                          fontWeight: 'bold',
                          fontSize: getFontSize.body2,
                        }}
                      >
                        -{selectedProduct.discount}%
                      </Box>
                    )}
                  </Box>

                  {/* Vendor Info */}
                  <Paper sx={{ 
                    p: { xs: 1.5, sm: 2, md: 2.5 }, 
                    mt: { xs: 2, sm: 3 }, 
                    borderRadius: { xs: 1.5, sm: 2 } 
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }}>
                        {selectedProduct.vendor.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium" sx={{ fontSize: getFontSize.h6 }}>
                          {selectedProduct.vendor}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Rating value={selectedProduct.vendorRating} size="small" readOnly />
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: getFontSize.caption }}>
                            Verified Seller
                          </Typography>
                        </Box>
                      </Box>
                      <Button variant="outlined" size={isMobile ? "small" : "medium"}>
                        View Profile
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  {/* Price Section */}
                  <Paper sx={{ 
                    p: { xs: 2, sm: 2.5, md: 3 }, 
                    mb: { xs: 2, sm: 3 }, 
                    borderRadius: { xs: 1.5, sm: 2 }, 
                    bgcolor: alpha(theme.palette.primary.main, 0.05) 
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'baseline' }, 
                      mb: 2,
                      gap: { xs: 1, sm: 0 }
                    }}>
                      {selectedProduct.discount > 0 ? (
                        <>
                          <Typography variant="h3" fontWeight="bold" color="primary" sx={{ fontSize: getFontSize.h3 }}>
                            ${selectedProduct.price.toFixed(2)}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              textDecoration: 'line-through',
                              ml: { sm: 2 },
                              color: 'text.secondary',
                              fontSize: getFontSize.h6,
                            }}
                          >
                            ${selectedProduct.originalPrice.toFixed(2)}
                          </Typography>
                          <Chip
                            label={`Save $${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}`}
                            color="error"
                            size="small"
                            sx={{ ml: { sm: 2 }, mt: { xs: 0.5, sm: 0 } }}
                          />
                        </>
                      ) : (
                        <Typography variant="h3" fontWeight="bold" color="primary" sx={{ fontSize: getFontSize.h3 }}>
                          ${selectedProduct.price.toFixed(2)}
                        </Typography>
                      )}
                      {selectedProduct.monthly && (
                        <Typography variant="body1" color="text.secondary" sx={{ ml: { sm: 2 }, fontSize: getFontSize.body1 }}>
                          /month
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 2 }, 
                      flexWrap: 'wrap' 
                    }}>
                      <Button
                        variant="contained"
                        size={isMobile ? "medium" : "large"}
                        startIcon={<ShoppingCart />}
                        fullWidth={isMobile}
                        sx={{ flex: 1 }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        size={isMobile ? "medium" : "large"}
                        startIcon={wishlist.has(selectedProduct.id) ? <Favorite /> : <FavoriteBorder />}
                        onClick={() => handleWishlistToggle(selectedProduct.id)}
                        color={wishlist.has(selectedProduct.id) ? 'primary' : 'inherit'}
                        fullWidth={isMobile}
                      >
                        {wishlist.has(selectedProduct.id) ? 'Saved' : 'Save'}
                      </Button>
                      <Button
                        variant="outlined"
                        size={isMobile ? "medium" : "large"}
                        startIcon={<CompareArrows />}
                        onClick={() => handleCompareToggle(selectedProduct.id)}
                        color={compareList.has(selectedProduct.id) ? 'secondary' : 'inherit'}
                        fullWidth={isMobile}
                      >
                        Compare
                      </Button>
                    </Box>

                    {selectedProduct.freeTrial && (
                      <Alert severity="success" sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: getFontSize.body2 }}>
                          🎉 {selectedProduct.trialDays}-day free trial available! No credit card required.
                        </Typography>
                      </Alert>
                    )}
                  </Paper>

                  {/* Description */}
                  <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ fontSize: getFontSize.h6 }}>
                      Description
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ fontSize: getFontSize.body1 }}>
                      {selectedProduct.longDescription}
                    </Typography>
                  </Box>

                  {/* Key Features */}
                  <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ fontSize: getFontSize.h6 }}>
                      Key Features
                    </Typography>
                    <Grid container spacing={{ xs: 1, sm: 2 }}>
                      {selectedProduct.features.map((feature, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <CheckCircle color="primary" sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, mt: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: getFontSize.body2 }}>{feature}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>

                {/* Additional Info Tabs */}
                <Grid item xs={12}>
                  <Paper sx={{ borderRadius: { xs: 1.5, sm: 2 }, overflow: 'hidden' }}>
                    <Tabs 
                      value={0} 
                      sx={{ 
                        borderBottom: 1, 
                        borderColor: 'divider',
                        '& .MuiTab-root': {
                          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                          minWidth: { xs: 'auto', sm: 120 },
                          px: { xs: 1.5, sm: 2, md: 3 },
                        }
                      }}
                    >
                      <Tab label="System Requirements" />
                      <Tab label="Integrations" />
                      <Tab label="Updates" />
                      <Tab label="Reviews" />
                    </Tabs>
                    <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Grid container spacing={{ xs: 2, sm: 3 }}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" gutterBottom fontWeight="medium" sx={{ fontSize: getFontSize.h6 }}>
                            System Requirements
                          </Typography>
                          <List dense>
                            {selectedProduct.systemRequirements.map((req, index) => (
                              <ListItem key={index} sx={{ py: { xs: 0.3, sm: 0.5 } }}>
                                <ListItemIcon sx={{ minWidth: { xs: 28, sm: 30 } }}>
                                  <CheckCircleOutline color="primary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={req} 
                                  primaryTypographyProps={{ 
                                    sx: { fontSize: getFontSize.body2 } 
                                  }} 
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" gutterBottom fontWeight="medium" sx={{ fontSize: getFontSize.h6 }}>
                            Integrations
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {selectedProduct.integrations.map((integration, index) => (
                              <Chip 
                                key={index} 
                                label={integration} 
                                variant="outlined" 
                                size="small"
                                sx={{ fontSize: getFontSize.caption }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ 
              p: { xs: 2, sm: 2.5, md: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 },
            }}>
              <Button
                startIcon={<Download />}
                size={isMobile ? "medium" : "large"}
                fullWidth={isMobile}
                sx={{ fontSize: getFontSize.body2 }}
              >
                Try Demo
              </Button>
              <Button
                startIcon={<Share />}
                onClick={() => handleShare(selectedProduct)}
                size={isMobile ? "medium" : "large"}
                fullWidth={isMobile}
                sx={{ fontSize: getFontSize.body2 }}
              >
                Share
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                color="primary"
                size={isMobile ? "medium" : "large"}
                startIcon={<ShoppingCart />}
                fullWidth={isMobile}
                sx={{ fontSize: getFontSize.body2 }}
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