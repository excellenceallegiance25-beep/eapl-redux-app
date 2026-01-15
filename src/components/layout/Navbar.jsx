import {
  AppRegistration,
  Build,
  Business,
  ContactMail,
  Dashboard,
  Home,
  Info,
  Login,
  Logout,
  Menu as MenuIcon,
  Person
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import RegisterPopup from '../auth/RegisterPopup';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Navigation items for non-authenticated users
  const publicMenuItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'About', path: '/about', icon: <Info /> },
    { text: 'Services', path: '/services', icon: <Build /> },
    // { text: 'Products', path: '/products', icon: <ShoppingCart /> },
    // { text: 'Blog', path: '/blog', icon: <Article /> },
    { text: 'Contact', path: '/contact', icon: <ContactMail /> },
  ];

  // Get user ID for navigation
  const userId = user?.id;

  // Navigation items for authenticated users
  const privateMenuItems = [
    { text: 'Dashboard', path: `/dashboard/${userId}`, icon: <Dashboard /> },
    { text: 'Profile', path: `/profile/${userId}`, icon: <Person /> },
  ];

  // Use appropriate menu items based on authentication
  const menuItems = isAuthenticated ? privateMenuItems : publicMenuItems;

  // Helper function to check if a path is active
  const isActive = (path) => {
    // For home page exact match
    if (path === '/') {
      return activePath === '/';
    }

    // For dashboard and profile with dynamic userId
    if (path.includes('/dashboard/') || path.includes('/profile/')) {
      return activePath.startsWith(path.split('/')[1]); // Check if path starts with 'dashboard' or 'profile'
    }

    // For other paths
    return activePath.startsWith(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Excellence Allegiance
        </Box>
        <Box component="span" sx={{ color: 'secondary.main', ml: 0.5 }}>
          Pvt Ltd
        </Box>
      </Typography>
      <List>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem
              key={item.text}
              component={RouterLink}
              to={item.path}
              sx={{
                textDecoration: 'none',
                color: active ? 'primary.main' : 'inherit',
                backgroundColor: active ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: active ? `4px solid ${theme.palette.primary.main}` : 'none',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <ListItemIcon sx={{ color: active ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: active ? 'bold' : 'medium',
                  color: active ? 'primary.main' : 'inherit'
                }}
              />
            </ListItem>
          );
        })}
        {!isAuthenticated ? (
          <>
            <ListItem
              component={RouterLink}
              to="/login"
              sx={{
                textDecoration: 'none',
                color: activePath === '/login' ? 'primary.main' : 'inherit',
                backgroundColor: activePath === '/login' ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: activePath === '/login' ? `4px solid ${theme.palette.primary.main}` : 'none',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <ListItemIcon sx={{ color: activePath === '/login' ? 'primary.main' : 'inherit' }}>
                <Login />
              </ListItemIcon>
              <ListItemText
                primary="Login"
                primaryTypographyProps={{
                  fontWeight: activePath === '/login' ? 'bold' : 'medium',
                  color: activePath === '/login' ? 'primary.main' : 'inherit'
                }}
              />
            </ListItem>
            <ListItem
              onClick={() => {
                setMobileOpen(false);
                setRegisterOpen(true);
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'secondary.light',
                  color: 'white',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'secondary.main' }}>
                <AppRegistration />
              </ListItemIcon>
              <ListItemText
                primary="Register"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  color: 'secondary.main'
                }}
              />
            </ListItem>
          </>
        ) : (
          <>
            {/* User info in mobile drawer */}
            <ListItem sx={{
              backgroundColor: 'primary.light',
              color: 'white',
              mb: 2
            }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary={user?.name || 'User'}
                secondary={user?.email}
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.8)' }}
              />
            </ListItem>
            <ListItem
              onClick={handleLogout}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'error.main'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'error.main' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  color: 'error.main'
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          background: 'white',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo/Brand */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                textDecoration: 'none',
                color: activePath === '/' ? 'primary.main' : 'primary.main',
                display: 'flex',
                alignItems: 'center',
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              <Business sx={{ mr: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                Excellence Allegiance
                <Box component="span" sx={{ color: 'secondary.main', ml: 0.5 }}>
                  Pvt Ltd
                </Box>
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                EA Pvt Ltd
              </Box>
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Show menu items for non-authenticated users */}
                {!isAuthenticated && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {publicMenuItems.map((item) => {
                      const active = isActive(item.path);
                      return (
                        <Button
                          key={item.text}
                          component={RouterLink}
                          to={item.path}
                          sx={{
                            color: active ? 'primary.main' : 'text.primary',
                            fontWeight: active ? 'bold' : 'normal',
                            '&:hover': {
                              color: 'primary.main',
                              backgroundColor: 'action.hover'
                            }
                          }}
                        >
                          {item.text}
                        </Button>
                      );
                    })}
                  </Box>
                )}

                {/* Show only Dashboard and Profile for authenticated users */}
                {isAuthenticated && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {privateMenuItems.map((item) => {
                      const active = isActive(item.path);
                      return (
                        <Button
                          key={item.text}
                          component={RouterLink}
                          to={item.path}
                          sx={{
                            color: active ? 'primary.main' : 'text.primary',
                            fontWeight: active ? 'bold' : 'normal',
                            '&:hover': {
                              color: 'primary.main',
                              backgroundColor: 'action.hover'
                            }
                          }}
                        >
                          {item.text}
                        </Button>
                      );
                    })}
                  </Box>
                )}

                {/* Auth Buttons */}
                <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                  {isAuthenticated ? (
                    <>
                      <Tooltip title="Account settings">
                        <IconButton
                          onClick={handleMenu}
                          size="small"
                          sx={{
                            ml: 2,
                            border: `2px solid ${theme.palette.primary.main}`,
                            '&:hover': {
                              borderColor: theme.palette.primary.dark,
                            }
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: 'primary.main',
                              fontWeight: 'bold'
                            }}
                          >
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </Avatar>
                        </IconButton>
                      </Tooltip>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                          sx: {
                            mt: 1.5,
                            minWidth: 200,
                            boxShadow: theme.shadows[3],
                          }
                        }}
                      >
                        <MenuItem
                          component={RouterLink}
                          to={`/profile/${userId}`}
                          onClick={handleClose}
                          sx={{
                            py: 1.5,
                            color: activePath.includes('/profile/') ? 'primary.main' : 'inherit',
                            fontWeight: activePath.includes('/profile/') ? 'bold' : 'normal',
                          }}
                        >
                          <Person sx={{ mr: 2, color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {user?.name || 'User'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user?.email}
                            </Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            handleLogout();
                          }}
                          sx={{
                            py: 1.5,
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'error.light',
                            }
                          }}
                        >
                          <Logout sx={{ mr: 2 }} />
                          <Typography fontWeight="medium">Logout</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Button
                        component={RouterLink}
                        to="/login"
                        color="primary"
                        variant="outlined"
                        startIcon={<Login />}
                        sx={{
                          borderWidth: 2,
                          fontWeight: activePath === '/login' ? 'bold' : 'normal',
                          '&:hover': {
                            borderWidth: 2,
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText'
                          }
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => setRegisterOpen(true)}
                        variant="contained"
                        color="secondary"
                        startIcon={<AppRegistration />}
                        sx={{
                          fontWeight: 'bold',
                          boxShadow: theme.shadows[2],
                          '&:hover': {
                            boxShadow: theme.shadows[4],
                            backgroundColor: 'secondary.dark'
                          }
                        }}
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            )}

            {/* Mobile auth button (only show when authenticated) */}
            {isMobile && isAuthenticated && (
              <IconButton
                onClick={handleMenu}
                size="small"
                sx={{
                  border: `2px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    borderColor: theme.palette.primary.dark,
                  }
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontWeight: 'bold'
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          sx: {
            '& .MuiBackdrop-root': {
              backdropFilter: 'blur(4px)',
            }
          }
        }}
        PaperProps={{
          sx: {
            width: 280,
            borderRight: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Register Popup */}
      <RegisterPopup
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  );
};

export default Navbar;