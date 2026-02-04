import {
    AccountTree,
    Business,
    CalendarToday,
    ChevronLeft,
    Close,
    Dashboard as DashboardIcon,
    Logout,
    Menu as MenuIcon,
    PendingActions,
    People,
    Person
} from '@mui/icons-material';
import {
    alpha,
    AppBar,
    Box,
    Button,
    Chip,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import EAPLfavicon from '../../assets/images/EAPLfavicon.jpg';
import eaplRotatingLogo from '../../assets/images/eaplRotatingLogo.gif';
import Profile from '../../pages/Profile';
import { logout } from '../../redux/slices/authSlice';
import useLoading from '../../redux/slices/useLoading';
import DashboardHome from './DashboardHome';
import { EmployeeManagementPage } from './EmployeeManagementPage';
import { LeaveManagementPage } from './LeaveManagementPage';
import { LeaveRequestPage } from './LeaveRequestPage';
import NotificationBell from './NotificationBell';
import { PartnersManagementPage } from './PartnersManagementPage';
import { ServicesManagementPage } from './ServicesManagementPage';
import NotificationDrawer from './NotificationDrawer';

const DashboardSidebar = ({ open, onClose, role, userName, mobileOpen, handleDrawerToggle }) => {
    const userRole = role || 'employee';
    const { user } = useSelector((state) => state.auth);
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const { showLoader, hideLoader, withLoader } = useLoading(); // Get loading functions

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        showLoader(EAPLfavicon, 80);
        dispatch(logout());
        navigate('/');
        setTimeout(hideLoader, 500);
    };

    const commonItems = [
        { text: 'Notices', icon: <DashboardIcon />, path: `/dashboard` },
        // { text: 'Dashboard', icon: <DashboardIcon />, path: `/dashboard/${user?.id}` },
        { text: 'Leave Application', icon: <CalendarToday />, path: '/dashboard/leave-request' },
        { text: 'My Information', icon: <Person />, path: '/dashboard/profile' },
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
            <Box sx={{
                p: 3,
                background: 'linear-gradient(180deg, #b0e1fa 48%, #08548b 74%)',
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

                {/* <Box
                    component="img"
                    src={eaplRotatingLogo}
                    alt="Loading"
                    sx={{
                        width: 100,
                        mixBlendMode: "multiply",
                    }}
                /> */}

                <Box
                    sx={{
                        position: "relative",
                        height: 120,
                        // top: 5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Glow Aura */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: -10,
                            borderRadius: "50%",
                            background: `
        radial-gradient(
          circle,
          rgba(143,174,194,0.45) 0%,
          rgba(47,93,124,0.35) 45%,
          transparent 70%
        )
      `,
                            filter: "blur(18px)",
                            animation: "pulseGlow 2.6s ease-in-out infinite",
                        }}
                    />

                    {/* Orbit Ring 1 */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: 130,
                            height: 130,
                            borderRadius: "50%",
                            border: "1px dotted rgba(77, 118, 146, 0.55)",
                            background: `
        radial-gradient(
          circle,
          rgba(255,255,255,0.15),
          rgba(47,93,124,0.35)
        )
      `,
                            background: 'radial- gradient(circle, rgb(255 0 0 / 0 %), rgb(0 29 48 / 16 %))',
                            backdropFilter: "blur(4px)",
                            animation: "spinCW 20s linear infinite",
                        }}
                    />

                    {/* Orbit Ring 2 */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: 95,
                            height: 95,
                            borderRadius: "50%",
                            border: "2px dotted rgba(180,210,225,0.6)",
                            background: `
        radial-gradient(
          circle,
          rgba(233,241,246,0.35),
          rgba(143,174,194,0.4)
        )
      `,
                            animation: "spinCCW 5.6s linear infinite",
                        }}
                    />

                    {/* Orbit Ring 3 */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            border: "1px dotted rgba(233,241,246,0.6)",
                            background: `
        radial-gradient(
          circle,
          rgba(255,255,255,0.6),
          rgba(143,174,194,0.55)
        )
      `,
                            animation: "spinCW 6.1s linear infinite",
                        }}
                    />

                    {/* Center Logo */}
                    <Box
                        component="img"
                        src={eaplRotatingLogo}
                        alt="Loading"
                        sx={{
                            width: 96,
                            zIndex: 2,
                            animation: "floatLogo 1.8s ease-in-out infinite",
                            // filter: "drop-shadow(0 6px 14px rgba(47,93,124,0.35))",
                            mixBlendMode: "multiply",
                        }}
                    />

                    {/* Animations */}
                    <style>
                        {`
      @keyframes spinCW {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes spinCCW {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }

      @keyframes floatLogo {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.05); }
      }

      @keyframes pulseGlow {
        0%, 100% { opacity: 0.55; }
        50% { opacity: 1; }
      }
    `}
                    </style>
                </Box>

                <Box display="flex" alignItems="center" gap={2} >
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

            <Box sx={{
                p: 2,
                background: 'linear-gradient(180deg, #276d9e 0%, rgba(112, 65, 158, 0.8) 100%)',
                flexGrow: 1
            }}>
                <List sx={{ px: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem
                                key={item.text}
                                component={RouterLink}
                                to={item.path}
                                onClick={isMobile ? handleDrawerToggle : undefined}
                                sx={{
                                    mb: 0.5,
                                    borderRadius: 2,
                                    px: { xs: 1.5, md: 2 },
                                    py: { xs: 1, md: 1.3 },

                                    // ACTIVE STATE
                                    backgroundColor: isActive
                                        ? 'rgba(255,255,255,0.12)'
                                        : 'transparent',

                                    // TEXT COLOR
                                    color: isActive ? '#ffffff' : 'rgba(230,238,246,0.85)',

                                    transition: 'all 0.25s ease',

                                    // HOVER STATE
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.08)',
                                        transform: 'translateX(2px)',
                                    },

                                    // ICON STYLE
                                    '& .MuiListItemIcon-root': {
                                        minWidth: { xs: 36, md: 40 },
                                        justifyContent: 'center',
                                        color: isActive ? '#4fc3f7' : 'rgba(230,238,246,0.7)',
                                        transition: 'color 0.25s ease',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                                        letterSpacing: '0.3px',
                                    }}
                                />
                            </ListItem>

                        );
                    })}
                </List>
            </Box>

            <Box sx={{
                p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: 'rgba(114, 91, 171, 0.8)'
            }}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Logout />}
                    onClick={() => {
                        handleLogout();
                    }}
                    sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontWeight: 500,
                        py: 1.25,
                        borderRadius: 1.5,
                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                        background: 'linear-gradient(180deg, #001b35 0%, rgba(112, 65, 158, 0.8) 100%)',
                        color: 'white',
                        '&:hover': {
                            background: 'linear-gradient(180deg, rgba(112, 65, 158, 0.8) 0%,#001b35 100%)',
                            transform: 'translateX(2px)',
                        },
                    }}
                >
                    Logout
                </Button>
            </Box>
        </>
    );

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
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
};

<DashboardHome />

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const currentUser = user || {
        name: 'Pramod Kumar W',
        role: 'admin',
        email: 'pramod@example.com',
    };

    const userRole = currentUser.role;
    const userName = currentUser.name;

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

    const handleNotificationClick = () => {
        setNotificationDrawerOpen(true);
    };

    const handleNotificationDrawerClose = () => {
        setNotificationDrawerOpen(false);
    };

    const path = location.pathname;

    const getPageTitle = () => {
        switch (true) {
            case path === '/dashboard':
                // return 'Dashboard';
                return 'Notices';
            case path.includes('employees'):
                return 'Employee Management';
            case path.includes('/leave-request'):
                return 'Leave Application';
            case path.includes('leave-management'):
                return 'Leave Management';
            case path.includes('services'):
                return 'Services Management';
            case path.includes('partners'):
                return 'Partners Management';
            case path.includes('profile'):
                return 'My Information';
            default:
                return 'Dashboard';
        }
    };

    const renderContent = () => {
        switch (path) {
            case '/dashboard/employees':
                return <EmployeeManagementPage />;
            case '/dashboard/leave-request':
                return <LeaveRequestPage />;
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
            overflow: 'hidden',
            background: `radial-gradient(circle at 20% 80%, rgba(197, 163, 232, 0.8) 0%, rgba(255,255,255,0.8) 20%, transparent 20%),
                        radial-gradient(circle at 80% 20%, rgba(8, 196, 229, 0.8) 0%, rgba(255,255,255,0.8) 20%, transparent 20%),
                        radial-gradient(circle at 40% 40%, rgba(159, 190, 241, 0.8) 0%, rgba(255,255,255,0.6) 15%, transparent 15%),
                        linear-gradient(135deg, #9ac9f0, #afd4ef)
                        `,
            backgroundAttachment: 'fixed'
        }}>
            <DashboardSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                role={userRole}
                userName={userName}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            {/* Notification Drawer */}
            <NotificationDrawer
                open={notificationDrawerOpen}
                onClose={handleNotificationDrawerClose}
                isMobile={isMobile}
            />

            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: theme.transitions.create(['margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: '100%',
                minWidth: 0
            }}>
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        background: 'linear-gradient(to right, #b0e1fa 10%, rgb(23, 147, 169) 60%)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        zIndex: theme.zIndex.drawer + 1, // Increased z-index
                        width: {
                            xs: '100%',
                            md: sidebarOpen ? `calc(100% - 280px)` : '100%'
                        },
                        ml: {
                            xs: 0,
                            md: sidebarOpen ? `280px` : 0
                        },
                        transition: theme.transitions.create(['width', 'margin'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),

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
                                display: { xs: 'flex', md: 'flex' },
                                color: '#053c54'
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
                                // color: 'text.primary',
                                fontWeight: 600,
                                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color: '#053c54'
                            }}
                        >
                            {getPageTitle()}
                        </Typography>

                        {/* <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center">
                            <IconButton size={isMobile ? "small" : "medium"}>
                                <Badge badgeContent={3} color="error" variant="dot">
                                    <Notifications fontSize={isMobile ? "small" : "medium"} />
                                </Badge>
                            </IconButton>
                        </Stack> */}
                        {/* Notification Bell */}
                        <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center">
                            <NotificationBell
                                isMobile={isMobile}
                                onClick={handleNotificationClick}
                            />
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Box sx={{
                    flex: 1,
                    p: 3,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    // background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 100%)'
                }}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
export { EmployeeManagementPage, LeaveManagementPage, PartnersManagementPage, ServicesManagementPage };

