import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  Avatar,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Info,
  Build,
  ShoppingCart,
  Article,
  ContactMail,
  Dashboard,
  Person,
  Logout,
  Login,
  AppRegistration,
  Business,
} from '@mui/icons-material';
import { logout } from '../../redux/slices/authSlice';
import RegisterPopup from '../auth/RegisterPopup';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Navigation items for non-authenticated users
  const publicMenuItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'About', path: '/about', icon: <Info /> },
    { text: 'Services', path: '/services', icon: <Build /> },
    // { text: 'Products', path: '/products', icon: <ShoppingCart /> },
    // { text: 'Blog', path: '/blog', icon: <Article /> },
    { text: 'Contact', path: '/contact', icon: <ContactMail /> },
  ];

  // Navigation items for authenticated users (ONLY Dashboard and Profile)
  const privateMenuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { text: 'Profile', path: '/profile', icon: <Person /> },
  ];

  // Use appropriate menu items based on authentication
  const menuItems = isAuthenticated ? privateMenuItems : publicMenuItems;

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
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ fontWeight: 'medium' }}
            />
          </ListItem>
        ))}
        {!isAuthenticated ? (
          <>
            <ListItem 
              component={RouterLink}
              to="/login"
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                <Login />
              </ListItemIcon>
              <ListItemText 
                primary="Login" 
                primaryTypographyProps={{ fontWeight: 'medium' }}
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
                  backgroundColor: 'action.hover',
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
                color: 'primary.main',
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
                    {publicMenuItems.map((item) => (
                      <Button
                        key={item.text}
                        component={RouterLink}
                        to={item.path}
                        color="inherit"
                        sx={{ 
                          color: 'text.primary',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'action.hover'
                          }
                        }}
                      >
                        {item.text}
                      </Button>
                    ))}
                  </Box>
                )}

                {/* Show only Dashboard and Profile for authenticated users */}
                {isAuthenticated && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {privateMenuItems.map((item) => (
                      <Button
                        key={item.text}
                        component={RouterLink}
                        to={item.path}
                        color="inherit"
                        startIcon={item.icon}
                        sx={{ 
                          color: 'text.primary',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'action.hover'
                          }
                        }}
                      >
                        {item.text}
                      </Button>
                    ))}
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
                          to="/profile"
                          onClick={handleClose}
                          sx={{ py: 1.5 }}
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