// components/NotificationDrawer.jsx
import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Chip,
    Button,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Divider,
    Menu,
    MenuItem,
    Snackbar,
    Alert,
    CircularProgress,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    Close,
    FilterList,
    MarkEmailRead,
    Article,
    Announcement,
    Event,
    CalendarToday,
    CheckCircle,
    Delete,
    MoreVert,
    NotificationsOff,
    Circle
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMarkNoticeAsRead, getNoticesList, getNotificationList } from '../../services/AppConfigAction';
import NoticeDetailDialog from './NoticeDetailDialog';
import { decrementUnreadCount } from '../../redux/slices/notificationSlice';

const NotificationDrawer = ({ open, onClose, isMobile }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    // State
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedType, setSelectedType] = useState('all');
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [openNoticeDetailDialog, setOpenNoticeDetailDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const currentUser = user || {
        name: 'Pramod Kumar W',
        role: 'admin',
        email: 'pramod@example.com',
    };

    const userRole = currentUser.role;
    const userName = currentUser.name;
    const userID = currentUser.id;

    // Stats
    const [stats, setStats] = useState({
        total: 0,
        unread: 0
    });

    // Notification types
    const notificationTypes = [
        { value: 'all', label: 'All', icon: <NotificationsIcon />, color: 'primary' },
        { value: 'notice', label: 'Notices', icon: <Article />, color: 'info' },
        { value: 'announcement', label: 'Announcements', icon: <Announcement />, color: 'warning' },
        { value: 'event', label: 'Events', icon: <Event />, color: 'success' },
        { value: 'leave', label: 'Leave', icon: <CalendarToday />, color: 'secondary' }
    ];

    // Fetch notifications when drawer opens
    useEffect(() => {
        if (open && user?.id) {
            fetchNotifications(user?.id);
        }
    }, [open, user?.id]);

    const fetchNotifications = async (loggedInId) => {
        try {
            setLoading(true);
            setError('');

            // Mock data for demo
            const notificationLists = [
                {
                    notifId: '1',
                    type: 'notice',
                    title: 'Quarterly Meeting Schedule Updated',
                    message: 'The quarterly meeting schedule has been updated. Please check the new timings.',
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                    read: false,
                    data: { noticeId: '123' }
                },
                {
                    notifId: '2',
                    type: 'leave',
                    title: 'Leave Request Approved',
                    message: 'Your leave request for January 15-17, 2024 has been approved.',
                    createdAt: new Date(Date.now() - 7200000).toISOString(),
                    read: true,
                    data: { leaveId: '456' }
                },
                {
                    notifId: '3',
                    type: 'announcement',
                    title: 'New Office Policy',
                    message: 'Please review the updated remote work policy document.',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    read: false,
                    data: { documentId: '789' }
                },
                {
                    notifId: '4',
                    type: 'event',
                    title: 'Team Building Event',
                    message: 'Annual team building event scheduled for February 20, 2024.',
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    read: true,
                    data: { eventId: '101' }
                }
            ];

            const result = await dispatch(getNotificationList(loggedInId));
            if (result.type === "EMP_NOTIFICATION_LIST") {
                const notificationList = result.payload.dataList.map(notification => ({
                    ...notification,
                }));
                setNotifications(notificationList);
                calculateStats(notificationList);
            }

        } catch (error) {
            console.error('Error fetching notifications:', error);
            setError('Failed to load notifications. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (notifications) => {
        const total = notifications.length;
        const unread = notifications.filter(n => !n.read).length;
        setStats({ total, unread });
    };

    // Filter notifications
    useEffect(() => {
        let filtered = [...notifications];

        if (selectedType !== 'all') {
            filtered = filtered.filter(n => n.type === selectedType);
        }

        if (activeTab === 1) {
            filtered = filtered.filter(n => !n.read);
        } else if (activeTab === 2) {
            filtered = filtered.filter(n => n.read);
        }

        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFilteredNotifications(filtered);
    }, [notifications, activeTab, selectedType]);

    // Handlers
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        handleFilterClose();
    };

    const handleMenuOpen = (event, notification) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedNotification(notification);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedNotification(null);

    };

    // Your existing handleNotificationClick function
    const handleNotificationClick = async (notification) => {
        // Parse the data string if it exists
        let parsedData = {};
        try {
            if (notification.data && typeof notification.data === 'string') {
                parsedData = JSON.parse(notification.data);
                console.log('Parsed data:', parsedData);
            } else if (notification.data && typeof notification.data === 'object') {
                parsedData = notification.data;
            }
        } catch (error) {
            console.error('Error parsing notification data:', error);
        }

        if (!notification.read) {
            // Get noticeId from parsed data
            const noticeId = parsedData.noticeId || parsedData.refId || parsedData.id;
            console.log('Found noticeId:', noticeId);

            if (noticeId) {
                await markAsRead(notification.notifId, noticeId);
                // After marking as read, fetch notice details and open dialog
                await fetchAndOpenNoticeDetails(noticeId);
            } else {
                console.warn('No noticeId found in parsed data');
            }
        } else {
            // If already read, just open the notice details
            const noticeId = parsedData.noticeId || parsedData.refId || parsedData.id;
            if (noticeId) {
                await fetchAndOpenNoticeDetails(noticeId);
            }
        }
    };

    // New function to fetch notice details and open dialog
    const fetchAndOpenNoticeDetails = async (noticeId) => {
        setIsLoading(true);
        try {
            // Fetch notice details from your API
            const noticeDetails = await fetchNoticeDetails(noticeId);

            // Set the notice data and open dialog
            setSelectedNotice(noticeDetails);
            setOpenNoticeDetailDialog(true);

        } catch (error) {
            console.error('Error fetching notice details:', error);
            // Show error message
            alert('Failed to load notice details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to fetch notice details from API
    const fetchNoticeDetails = async (noticeId) => {
        // Implement your API call here
        // Example:
        const response = await dispatch(getNoticesList({
            noticeID: noticeId,
            // other parameters as needed
        }));

        if (response.type === "NOTICE_LIST" && response.payload.dataList) {
            return response.payload.dataList[0]; // Get the first notice
        }

        // Fallback: return mock data if API fails
        return {
            id: noticeId,
            title: `Notice #${noticeId}`,
            content: 'Notice details will be loaded here...',
            category: 'General',
            priority: 'Medium',
            createdBy: 'Admin',
            createdAt: new Date().toISOString(),
            readBy: [],
            allEmployees: [],
            isActive: true,
            // other properties as needed
        };
    };

    // const handleNotificationClick = async (notification) => {

    //     // Parse the data string if it exists
    //     let parsedData = {};
    //     try {
    //         if (notification.data && typeof notification.data === 'string') {
    //             parsedData = JSON.parse(notification.data);
    //             console.log('Parsed data:', parsedData);
    //         } else if (notification.data && typeof notification.data === 'object') {
    //             parsedData = notification.data;
    //         }
    //     } catch (error) {
    //         console.error('Error parsing notification data:', error);
    //     }

    //     if (!notification.read) {
    //         // Get noticeId from parsed data
    //         const noticeId = parsedData.noticeId || parsedData.refId || parsedData.id;
    //         console.log('Found noticeId:', noticeId);

    //         if (noticeId) {
    //             await markAsRead(notification.notifId, noticeId);
    //             // navigate(`/dashboard/${user?.id}`);
    //         } else {
    //             console.warn('No noticeId found in parsed data');
    //         }
    //     }

    //     // if (notification.data?.noticeId) {
    //     //     navigate(`/notices/${notification.data.noticeId}`);
    //     //     onClose();
    //     // } else if (notification.data?.leaveId) {
    //     //     navigate('/dashboard/leave-request');
    //     //     onClose();
    //     // } else if (notification.data?.eventId) {
    //     //     navigate(`/events/${notification.data.eventId}`);
    //     //     onClose();
    //     // }
    // };

    const markAsRead = async (notificationId, noticeId) => {
        try {
            // Update UI immediately
            setNotifications(prev =>
                prev.map(n =>
                    n.notifId === notificationId ? { ...n, read: true } : n
                )
            );

            // Call backend API
            if (noticeId) {
                const result = await dispatch(getMarkNoticeAsRead({
                    employeeId: user?.id,
                    noticeId: noticeId
                }));

                // Handle response
                if (result.payload?.success) {
                    console.log('Successfully marked as read:', result.payload);
                    fetchNotifications(user?.id);
                    dispatch(decrementUnreadCount());
                    setSuccessMessage('Notification marked as read');
                } else {
                    console.error('Failed to mark as read:', result.payload?.message);
                    // Revert UI change if API call failed
                    setNotifications(prev =>
                        prev.map(n =>
                            n.notifId === notificationId ? { ...n, read: false } : n
                        )
                    );
                }
            } else {
                console.warn('No noticeId found for notification:', notificationId);
            }
        } catch (error) {
            console.error('Error marking as read:', error);
            // Revert UI change on error
            setNotifications(prev =>
                prev.map(n =>
                    n.notifId === notificationId ? { ...n, read: false } : n
                )
            );
        }
    };

    const markAllAsRead = async () => {
        try {
            setNotifications(prev =>
                prev.map(n => ({ ...n, read: true }))
            );
            setSuccessMessage('All notifications marked as read');

            // API call
            // await fetch(`/api/notifications/user/${user.id}/read-all`, { method: 'PUT' });
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            setNotifications(prev =>
                prev.filter(n => n.notifId !== notificationId)
            );
            setSuccessMessage('Notification deleted');
            handleMenuClose();

            // API call
            // await fetch(`/api/notifications/${notificationId}`, { method: 'DELETE' });
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const getNotificationIcon = (type) => {
        const typeConfig = notificationTypes.find(t => t.value === type);
        if (typeConfig) {
            return React.cloneElement(typeConfig.icon, { color: typeConfig.color });
        }
        return <NotificationsIcon color="action" />;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${Math.floor(diffInHours / 24)}d ago`;
    };

    const drawerWidth = fullScreen ? '100%' : 400;

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        maxWidth: '100vw',
                        boxSizing: 'border-box',
                        background: 'linear-gradient(135deg, #d0edec 0%, #dae4f1 100%)',
                        display: 'flex',
                        flexDirection: 'column'
                    },
                }}
            >
                {/* Header */}
                <Box sx={{
                    p: 2,
                    background: 'linear-gradient(to right, #037773, #076177)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NotificationsIcon />
                        <Typography variant="h6">Notifications</Typography>
                        <Chip
                            label={activeTab === 2 ? (stats.total - stats.unread) : activeTab === 1 ? stats.unread : stats.total}
                            size="small"
                            sx={{
                                ml: 1,
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        />
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{ color: 'white' }}
                        size="small"
                    >
                        <Close />
                    </IconButton>
                </Box>

                {/* Filter and Actions */}
                <Box sx={{
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    flexShrink: 0
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        {/* <Button
                        startIcon={<FilterList />}
                        onClick={handleFilterClick}
                        size="small"
                        sx={{
                            textTransform: 'none',
                            color: 'text.secondary'
                        }}
                    >
                        {notificationTypes.find(t => t.value === selectedType)?.label || 'Filter'}
                    </Button> */}
                        {/* {stats.unread > 0 && (
                        <Button
                            startIcon={<MarkEmailRead />}
                            onClick={markAllAsRead}
                            size="small"
                            sx={{ textTransform: 'none' }}
                            variant="outlined"
                        >
                            Mark All Read
                        </Button>
                    )} */}
                    </Box>

                    {/* Tabs */}
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{ mt: 1 }}
                    >
                        <Tab label="All" />
                        <Tab label="Unread" />
                        <Tab label="Read" />
                    </Tabs>
                </Box>

                {/* Filter Menu */}
                <Menu
                    anchorEl={filterAnchorEl}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleFilterClose}
                >
                    {notificationTypes.map((type) => (
                        <MenuItem
                            key={type.value}
                            onClick={() => handleTypeSelect(type.value)}
                            selected={selectedType === type.value}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {type.icon}
                                {type.label}
                            </Box>
                        </MenuItem>
                    ))}
                </Menu>

                {/* Notification Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    onClick={(e) => e.stopPropagation()}
                >
                    <MenuItem onClick={() => {
                        if (selectedNotification && !selectedNotification.read) {

                            // Parse the data string if it exists
                            let parsedData = {};
                            try {
                                if (selectedNotification.data && typeof selectedNotification.data === 'string') {
                                    parsedData = JSON.parse(selectedNotification.data);
                                    console.log('Parsed data:', parsedData);
                                } else if (selectedNotification.data && typeof selectedNotification.data === 'object') {
                                    parsedData = selectedNotification.data;
                                }
                            } catch (error) {
                                console.error('Error parsing notification data:', error);
                            }

                            const noticeId = parsedData.noticeId || parsedData.refId || parsedData.id;
                            console.log('Found noticeId:', noticeId);

                            if (noticeId) {
                                markAsRead(selectedNotification.notifId, noticeId);
                                // navigate(`/dashboard/${user?.id}`);
                            } else {
                                console.warn('No noticeId found in parsed data');
                            }

                            // markAsRead(selectedNotification.notifId);
                        }
                        handleMenuClose();
                    }}>
                        <CheckCircle sx={{ mr: 1, fontSize: 20 }} /> Mark as Read
                    </MenuItem>
                    <MenuItem onClick={() => {
                        if (selectedNotification) {
                            deleteNotification(selectedNotification.notifId);
                        }
                    }} sx={{ color: 'error.main' }}>
                        <Delete sx={{ mr: 1, fontSize: 20 }} /> Delete
                    </MenuItem>
                </Menu>

                {/* Notifications List */}
                <Box sx={{
                    flex: 1,
                    overflow: 'auto',
                    position: 'relative'
                }}>
                    {loading ? (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                            <CircularProgress />
                        </Box>
                    ) : filteredNotifications.length === 0 ? (
                        <Box sx={{
                            textAlign: 'center',
                            p: 4,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <NotificationsOff sx={{
                                fontSize: 60,
                                color: 'text.secondary',
                                mb: 2,
                                opacity: 0.5
                            }} />
                            <Typography variant="body1" color="text.secondary">
                                No notifications found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {selectedType !== 'all'
                                    ? `No ${selectedType} notifications`
                                    : activeTab === 1
                                        ? 'No unread notifications'
                                        : activeTab === 2
                                            ? 'No read notifications'
                                            : 'All caught up!'}
                            </Typography>
                        </Box>
                    ) : (
                        <List disablePadding>
                            {filteredNotifications.map((notification, index) => (
                                <React.Fragment key={notification.notifId}>
                                    <ListItem
                                        // Use onClick instead of button prop to avoid HTML validation issues
                                        onClick={() => handleNotificationClick(notification)}
                                        sx={{
                                            py: 2,
                                            px: 2,
                                            cursor: 'pointer',
                                            backgroundColor: notification.read ? 'transparent' : 'action.hover',
                                            '&:hover': {
                                                backgroundColor: notification.read ? 'action.hover' : 'action.selected'
                                            },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{
                                                    bgcolor: notification.read ? 'grey.300' : 'primary.light',
                                                    color: notification.read ? 'grey.600' : 'primary.contrastText'
                                                }}
                                            >
                                                {getNotificationIcon(notification.type)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <Box sx={{ flex: 1, ml: 2 }}>
                                            {/* Title and Menu Button */}
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                mb: 0.5
                                            }}>
                                                <Typography
                                                    component="div"
                                                    variant="body1"
                                                    fontWeight={notification.read ? 400 : 600}
                                                    sx={{
                                                        flex: 1,
                                                        mr: 1,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {notification.title}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => handleMenuOpen(e, notification)}
                                                    sx={{ ml: 1 }}
                                                >
                                                    <MoreVert fontSize="small" />
                                                </IconButton>
                                            </Box>

                                            {/* Message */}
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 1,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}
                                            >
                                                {notification.message}
                                            </Typography>

                                            {/* Date and Unread indicator */}
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mt: 0.5
                                            }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatDate(notification.createdAt)}
                                                </Typography>
                                                {!notification.read && (
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Circle sx={{
                                                            fontSize: 8,
                                                            color: 'primary.main',
                                                            mr: 0.5
                                                        }} />
                                                        <Typography variant="caption" color="primary">
                                                            Unread
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </ListItem>
                                    {index < filteredNotifications.length - 1 && (
                                        <Divider component="li" />
                                    )}
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mx: 2,
                            mb: 2,
                            flexShrink: 0
                        }}
                        onClose={() => setError('')}
                    >
                        {error}
                    </Alert>
                )}

                {/* Success Snackbar */}
                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={3000}
                    onClose={() => setSuccessMessage('')}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        severity="success"
                        onClose={() => setSuccessMessage('')}
                        sx={{ width: '100%' }}
                    >
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Drawer>

            {/* Notice Detail Dialog */}
            <NoticeDetailDialog
                open={openNoticeDetailDialog}
                onClose={() => {
                    setOpenNoticeDetailDialog(false);
                    setSelectedNotice(null);
                }}
                notice={selectedNotice}
                userRole={userRole}
                userID={userID}
                // onMarkAsRead={handleMarkAsRead} // You'll need to implement this
                theme={theme} // You'll need to pass theme
            />
        </>
    );
};

export default NotificationDrawer;