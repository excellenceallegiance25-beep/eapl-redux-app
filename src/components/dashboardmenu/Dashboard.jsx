// components/dashboardmenu/Dashboard.jsx
import React, { useState, useEffect, Profiler } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Typography,
    Chip,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Stack,
    Container,
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    useTheme,
    useMediaQuery,
    Divider,
    alpha,
    Hidden
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications,
    Dashboard as DashboardIcon,
    Assignment,
    CalendarToday,
    Person,
    People,
    PendingActions,
    Business,
    AccountTree,
    Logout,
    ArrowForward,
    CheckCircle,
    PendingActions as PendingIcon,
    Group,
    Work,
    AccessTime,
    ChevronLeft,
    Close,
    MoreVert,
    KeyboardArrowDown,
    Home,
    BusinessCenter,
    SupervisorAccount
} from '@mui/icons-material';

// Import child components
import { EmployeeManagementPage } from './EmployeeManagementPage';
import { LeaveManagementPage } from './LeaveManagementPage';
import { ServicesManagementPage } from './ServicesManagementPage';
import { PartnersManagementPage } from './PartnersManagementPage';
import Profile from '../../pages/Profile';

const DashboardSidebar = ({ open, onClose, role, userName, mobileOpen, handleDrawerToggle }) => {
    const userRole = role || 'employee';
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

    const commonItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'My Projects', icon: <Assignment />, path: '/dashboard/my-projects' },
        { text: 'Leave Application', icon: <CalendarToday />, path: '/dashboard/leave' },
        { text: 'My Profile', icon: <Person />, path: '/dashboard/profile' },
    ];

    const adminItems = [
        { text: 'All Employees', icon: <People />, path: '/dashboard/employees' },
        { text: 'Leave Management', icon: <PendingActions />, path: '/dashboard/leave-management' },
        { text: 'Services Management', icon: <Business />, path: '/dashboard/services' },
        { text: 'Partners', icon: <AccountTree />, path: '/dashboard/partners' },
    ];

    let menuItems = [...commonItems];
    if (userRole.toLowerCase() === 'admin') {
        menuItems = [...commonItems, ...adminItems];
    }

    const drawerContent = (
        <>
            {/* Sidebar Header */}
            <Box sx={{
                p: 3,
                background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
                color: 'white',
                position: 'relative',
                textAlign: "center",
                alignContent: "center",
                minHeight: { xs: 140, md: 160, lg: 160, xl: 160 }
            }}>
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white'
                        }}
                        size="small"
                    >
                        <Close />
                    </IconButton>
                )}
                <Box display="flex" alignItems="center" gap={2}>
                    {/* <Avatar sx={{
                        bgcolor: 'white',
                        color: '#1976d2',
                        width: { xs: 48, md: 56 },
                        height: { xs: 48, md: 56 },
                        fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }}>
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </Avatar> */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant={isMobile ? "subtitle1" : "h6"}
                            fontWeight="bold"
                            noWrap
                            sx={{ fontSize: { xs: '0.95rem', md: '1.25rem' } }}
                        >
                            {userName || 'User'}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Welcome back!
                        </Typography>
                        <Chip
                            label={userRole.toUpperCase()}
                            size="small"
                            sx={{
                                // mt: 1,
                                ml: 1,
                                backgroundColor: alpha(theme.palette.common.white, 0.2),
                                color: 'white',
                                fontWeight: 'medium',
                                height: 24,
                                fontSize: '0.7rem'
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Navigation Menu */}
            <Box sx={{ p: 2, flexGrow: 1 }}>
                {/* <Typography variant="caption" sx={{
                    px: 2,
                    mb: 1,
                    color: 'text.secondary',
                    fontWeight: 500,
                    display: 'block',
                    fontSize: '0.75rem'
                }}>
                    MAIN MENU
                </Typography> */}
                <List sx={{ px: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem
                                button
                                key={item.text}
                                component={RouterLink}
                                to={item.path}
                                onClick={isMobile ? handleDrawerToggle : undefined}
                                sx={{
                                    mb: 0.5,
                                    borderRadius: 1.5,
                                    px: { xs: 1.5, md: 2 },
                                    py: { xs: 1, md: 1.5 },
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    },
                                    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                                    color: isActive ? theme.palette.primary.main : 'text.primary',
                                    '& .MuiListItemIcon-root': {
                                        color: isActive ? theme.palette.primary.main : 'text.secondary',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: { xs: 36, md: 40 },
                                    justifyContent: 'center'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: 500,
                                        fontSize: { xs: '0.85rem', md: '0.95rem' }
                                    }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            {/* Sidebar Footer */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Logout />}
                    component={RouterLink}
                    to="/"
                    sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontWeight: 500,
                        py: 1.25,
                        borderRadius: 1.5,
                        fontSize: { xs: '0.85rem', md: '0.95rem' }
                    }}
                >
                    Logout
                </Button>
            </Box>
        </>
    );

    // Mobile drawer
    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 280,
                        maxWidth: '85vw',
                        backgroundColor: '#f8f9fa',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        );
    }

    // Desktop/Tablet persistent drawer
    return (
        <Drawer
            variant="persistent"
            open={open}
            sx={{
                width: open ? 280 : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? 280 : 0,
                    boxSizing: 'border-box',
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                    backgroundColor: '#f8f9fa',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: 6,
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: 3,
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
};

const DashboardHome = ({ userName, userRole, navigate }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Sample data for dashboard
    const dashboardStats = {
        pendingLeaves: 5,
        approvedLeaves: 12,
        totalEmployees: 24,
        activeProjects: 8,
    };

    const pendingRequests = [
        { id: 1, employee: 'Jane Smith', type: 'Vacation', days: 5, date: '2024-01-20' },
        { id: 2, employee: 'Mike Johnson', type: 'Sick Leave', days: 2, date: '2024-01-18' },
    ];

    const recentActivities = [
        { id: 1, action: 'Leave approved', user: 'John Doe', time: '2 hours ago' },
        { id: 2, action: 'New employee added', user: 'Admin', time: '4 hours ago' },
    ];

    // Quick links for admin
    const quickLinks = [
        { title: 'Employees', icon: <People />, path: '/dashboard/employees', color: '#1976d2' },
        { title: 'Leave Management', icon: <PendingActions />, path: '/dashboard/leave-management', color: '#dc004e' },
        { title: 'Services', icon: <Business />, path: '/dashboard/services', color: '#ed6c02' },
        { title: 'Partners', icon: <AccountTree />, path: '/dashboard/partners', color: '#2e7d32' },
    ];

    const StatCard = ({ value, label, icon, color }) => (
        <Card sx={{
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            }
        }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography
                            variant={isMobile ? "h4" : "h3"}
                            fontWeight="bold"
                            color={color}
                            gutterBottom
                            sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }}
                        >
                            {value}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight="medium"
                            sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                        >
                            {label}
                        </Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: alpha(color, 0.1),
                        borderRadius: 2,
                        p: { xs: 1, md: 1.5 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {React.cloneElement(icon, {
                            sx: {
                                fontSize: { xs: 24, md: 32 },
                                color: color
                            }
                        })}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{
            flex: 1,
            // p: { xs: 1.5, sm: 2, md: 3 },
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
            overflowX: 'hidden'
        }}>
            <Container maxWidth="xl" disableGutters>
                {/* Welcome Section */}
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}
                    >
                        Welcome back, {userName}!
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
                    >
                        Here's what's happening with your account today.
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
                    <Grid item xs={6} sm={6} md={3}>
                        <StatCard
                            value={dashboardStats.pendingLeaves}
                            label="Pending Leaves"
                            icon={<PendingIcon />}
                            color={theme.palette.warning.main}
                        />
                    </Grid>

                    <Grid item xs={6} sm={6} md={3}>
                        <StatCard
                            value={dashboardStats.approvedLeaves}
                            label="Approved Leaves"
                            icon={<CheckCircle />}
                            color={theme.palette.success.main}
                        />
                    </Grid>

                    <Grid item xs={6} sm={6} md={3}>
                        <StatCard
                            value={dashboardStats.totalEmployees}
                            label="Total Employees"
                            icon={<Group />}
                            color={theme.palette.info.main}
                        />
                    </Grid>

                    <Grid item xs={6} sm={6} md={3}>
                        <StatCard
                            value={dashboardStats.activeProjects}
                            label="Active Projects"
                            icon={<Work />}
                            color={theme.palette.secondary.main}
                        />
                    </Grid>
                </Grid>

                {/* Two Column Layout */}
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                    {/* Left Column - Quick Links & Pending Requests */}
                    <Grid item xs={12} lg={8}>
                        {/* Quick Links for Admin */}
                        {userRole.toLowerCase() === 'admin' && (
                            <Card sx={{
                                mb: { xs: 2, sm: 3 },
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                border: '1px solid',
                                borderColor: 'divider'
                            }}>
                                <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                                        >
                                            Quick Links
                                        </Typography>
                                        <Button
                                            size="small"
                                            endIcon={<ArrowForward />}
                                            onClick={() => navigate('/dashboard')}
                                            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                        >
                                            More
                                        </Button>
                                    </Box>
                                    <Grid container spacing={{ xs: 1, sm: 2 }}>
                                        {quickLinks.map((link, index) => (
                                            <Grid item xs={6} sm={3} key={index}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={() => navigate(link.path)}
                                                    sx={{
                                                        height: { xs: 70, sm: 80, md: 100 },
                                                        flexDirection: 'column',
                                                        backgroundColor: link.color,
                                                        borderRadius: 1.5,
                                                        p: { xs: 1, sm: 1.5 },
                                                        minHeight: 'auto',
                                                        '&:hover': {
                                                            backgroundColor: alpha(link.color, 0.9),
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{
                                                        mb: { xs: 0.5, sm: 1 },
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: { xs: 20, sm: 24, md: 30 }
                                                        }
                                                    }}>
                                                        {link.icon}
                                                    </Box>
                                                    <Typography
                                                        variant="caption"
                                                        fontWeight="bold"
                                                        sx={{
                                                            color: 'white',
                                                            fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                                        }}
                                                    >
                                                        {link.title}
                                                    </Typography>
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        )}

                        {/* Pending Leave Requests */}
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            border: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" mb={{ xs: 2, sm: 3 }}>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                                    >
                                        Pending Leave Requests
                                    </Typography>
                                    <Button
                                        size="small"
                                        endIcon={<ArrowForward />}
                                        onClick={() => navigate('/dashboard/leave-management')}
                                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                    >
                                        View All
                                    </Button>
                                </Box>

                                {pendingRequests.length > 0 ? (
                                    <Stack spacing={{ xs: 1.5, sm: 2 }}>
                                        {pendingRequests.map((request) => (
                                            <Paper key={request.id} sx={{
                                                p: { xs: 2, sm: 2.5 },
                                                borderRadius: 1.5,
                                                borderLeft: `4px solid ${theme.palette.warning.main}`,
                                                backgroundColor: 'white'
                                            }}>
                                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}
                                                    alignItems={{ sm: 'center' }} justifyContent="space-between" gap={{ xs: 1.5, sm: 2 }}>
                                                    <Box flex={1}>
                                                        <Typography
                                                            variant="body1"
                                                            fontWeight="medium"
                                                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                                        >
                                                            {request.employee}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                                        >
                                                            {request.type} • {request.days} days
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                                                        >
                                                            Applied on: {request.date}
                                                        </Typography>
                                                    </Box>
                                                    <Stack
                                                        direction={{ xs: 'row', sm: 'row' }}
                                                        spacing={1}
                                                        sx={{ width: { xs: '100%', sm: 'auto' } }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            color="success"
                                                            variant="contained"
                                                            startIcon={<CheckCircle />}
                                                            fullWidth={isMobile}
                                                            sx={{
                                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                                py: { xs: 0.5, sm: 0.75 }
                                                            }}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            color="error"
                                                            variant="outlined"
                                                            startIcon={<Close />}
                                                            fullWidth={isMobile}
                                                            sx={{
                                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                                py: { xs: 0.5, sm: 0.75 }
                                                            }}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </Stack>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Box textAlign="center" py={{ xs: 3, sm: 4 }}>
                                        <CheckCircle sx={{
                                            fontSize: { xs: 48, sm: 60 },
                                            color: 'success.main',
                                            opacity: 0.3,
                                            mb: 2
                                        }} />
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                        >
                                            No pending leave requests
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column - Recent Activities */}
                    <Grid item xs={12} lg={4}>
                        {/* Recent Activities */}
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            border: '1px solid',
                            borderColor: 'divider',
                            height: '100%'
                        }}>
                            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    gutterBottom
                                    sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                                >
                                    Recent Activities
                                </Typography>
                                <Stack spacing={{ xs: 2, sm: 2.5 }}>
                                    {recentActivities.map((activity) => (
                                        <Box key={activity.id} display="flex" alignItems="flex-start" gap={{ xs: 1.5, sm: 2 }}>
                                            <Avatar sx={{
                                                width: { xs: 32, sm: 40 },
                                                height: { xs: 32, sm: 40 },
                                                bgcolor: 'primary.light',
                                                fontSize: { xs: '0.875rem', sm: '1rem' }
                                            }}>
                                                {activity.user.charAt(0)}
                                            </Avatar>
                                            <Box flex={1}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="medium"
                                                    sx={{ fontSize: { xs: '0.85rem', sm: '0.875rem' } }}
                                                >
                                                    {activity.action}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                                                >
                                                    By {activity.user}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    display="block"
                                                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                                                >
                                                    {activity.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                                <Button
                                    fullWidth
                                    variant="text"
                                    size="small"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                    }}
                                    endIcon={<KeyboardArrowDown />}
                                >
                                    Show More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const currentUser = user || {
        name: 'Pramod Kumar W',
        role: 'admin',
        email: 'pramod@example.com',
    };

    const userRole = currentUser.role;
    const userName = currentUser.name;

    // Auto-close sidebar on mobile by default
    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [isMobile]);

    const handleDrawerToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    // Get current path to determine which component to render
    const path = location.pathname;

    const getPageTitle = () => {
        switch (true) {
            case path === '/dashboard':
                return 'Dashboard';
            case path.includes('employees'):
                return 'Employee Management';
            case path.includes('leave-management'):
                return 'Leave Management';
            case path.includes('services'):
                return 'Services Management';
            case path.includes('partners'):
                return 'Partners Management';
            default:
                return 'Dashboard';
        }
    };

    const renderContent = () => {
        switch (path) {
            case '/dashboard/employees':
                return <EmployeeManagementPage />;
            case '/dashboard/leave-management':
                return <LeaveManagementPage />;
            case '/dashboard/services':
                return <ServicesManagementPage />;
            case '/dashboard/partners':
                return <PartnersManagementPage />;
            case '/dashboard/profile':
                return <Profile />;
            case '/dashboard':
            default:
                return <DashboardHome userName={userName} userRole={userRole} navigate={navigate} />;
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            overflow: 'hidden'
        }}>
            <DashboardSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                role={userRole}
                userName={userName}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                // ml: {
                //     xs: 0,
                //     md: sidebarOpen ? '280px' : '72px'
                // },
                transition: theme.transitions.create(['margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: '100%',
                minWidth: 0 // Prevent overflow
            }}>
                {/* Top App Bar - Responsive */}
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        backgroundColor: 'white',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        zIndex: theme.zIndex.drawer - 1,
                    }}
                >
                    <Toolbar sx={{
                        px: { xs: 1.5, sm: 2, md: 3 },
                        minHeight: { xs: '56px', sm: '64px' }
                    }}>
                        <IconButton
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                color: 'text.primary',
                                display: { xs: 'flex', md: 'flex' }
                            }}
                            size={isMobile ? "small" : "medium"}
                        >
                            {isMobile ? (
                                <MenuIcon />
                            ) : sidebarOpen ? (
                                <ChevronLeft />
                            ) : (
                                <MenuIcon />
                            )}
                        </IconButton>

                        <Typography
                            variant="h6"
                            sx={{
                                flexGrow: 1,
                                color: 'text.primary',
                                fontWeight: 600,
                                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {getPageTitle()}
                        </Typography>

                        <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center">
                            <IconButton size={isMobile ? "small" : "medium"}>
                                <Badge badgeContent={3} color="error" variant="dot">
                                    <Notifications fontSize={isMobile ? "small" : "medium"} />
                                </Badge>
                            </IconButton>
                            {/* <IconButton size={isMobile ? "small" : "medium"}>
                                <Avatar sx={{
                                    width: { xs: 32, sm: 36, md: 40 },
                                    height: { xs: 32, sm: 36, md: 40 },
                                    bgcolor: 'primary.main',
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}>
                                    {userName.charAt(0)}
                                </Avatar>
                            </IconButton> */}
                        </Stack>
                    </Toolbar>
                </AppBar>

                {/* Main Content Area */}
                <Box sx={{
                    flex: 1,
                    p: 3,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    '-webkit-overflow-scrolling': 'touch'
                }}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
};

// Export Dashboard as default and also export child components
export default Dashboard;
export { EmployeeManagementPage, LeaveManagementPage, ServicesManagementPage, PartnersManagementPage };