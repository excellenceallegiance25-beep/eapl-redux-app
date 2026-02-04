import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Box,
    Typography,
    Chip,
    Grid,
    Paper,
    Avatar,
    Stack,
    useMediaQuery,
    LinearProgress
} from '@mui/material';
import {
    Close,
    Category,
    Person,
    CalendarToday,
    AccessTime,
    AttachFile,
    Download,
    ArrowBack,
    CheckCircle,
    Visibility,
    PictureAsPdf,
    Description,
    TextSnippet,
    Image,
    InsertDriveFile
} from '@mui/icons-material';

const NoticeDetailDialog = ({
    open,
    onClose,
    notice,
    userRole = 'user',
    userID = '',
    onMarkAsRead,
    onViewReadStatus,
    onOpenFile,
    onDownloadFile,
    theme
}) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!notice) return null;

    const isAdmin = userRole.toLowerCase() === 'admin';
    const hasRead = notice.readBy?.some(reader => reader.employeeID === userID) || false;
    const priorityColor = notice.priority === 'High' ? 'error' :
        notice.priority === 'Medium' ? 'warning' : 'info';
    const readPercentage = notice.allEmployees?.length > 0 ?
        Math.round((notice.readBy?.length || 0) / notice.allEmployees.length * 100) : 0;

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    // Get file icon
    const getFileIcon = (fileName) => {
        const fileTypes = {
            pdf: <PictureAsPdf color="error" />,
            doc: <Description color="primary" />,
            docx: <Description color="primary" />,
            txt: <TextSnippet color="info" />,
            jpg: <Image color="secondary" />,
            png: <Image color="secondary" />,
            default: <InsertDriveFile color="action" />,
        };
        const extension = fileName?.split('.').pop().toLowerCase();
        return fileTypes[extension] || fileTypes.default;
    };

    const handleOpenFile = (file) => {
        if (onOpenFile) {
            onOpenFile(file);
        } else if (file.url) {
            window.open(file.url, '_blank');
        }
    };

    const handleDownloadFile = (file) => {
        if (onDownloadFile) {
            onDownloadFile(file);
        } else if (file.url) {
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            fullScreen={isMobile}
        >
            <DialogTitle sx={{
                borderBottom: 1,
                borderColor: 'divider',
                pb: 2,
                background: 'linear-gradient(to right, #0a6faa 0%, #1c6a84 60%)',
                color: '#ffff'
            }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" component="div" fontWeight="bold">
                        {notice.title}
                    </Typography>
                    <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                {/* Header Info */}
                <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap="wrap" py={1}>
                    <Chip
                        icon={<Category fontSize="small" />}
                        label={notice.category}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        label={notice.priority}
                        size="small"
                        color={priorityColor}
                    />
                    {!notice.isActive && (
                        <Chip
                            label="Archived"
                            size="small"
                            color="default"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                        />
                    )}
                    {hasRead && (
                        <Chip
                            icon={<CheckCircle fontSize="small" />}
                            label="Read"
                            size="small"
                            color="success"
                            variant="outlined"
                        />
                    )}
                </Box>

                {/* Metadata */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Person fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Published by: <strong>{notice.createdBy}</strong>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <CalendarToday fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Published on: <strong>{formatDate(notice.createdAt)}</strong>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <AccessTime fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Views: <strong>{notice.readBy?.length || 0}</strong>
                            </Typography>
                        </Box>
                    </Grid>
                    {notice.expiresAt && (
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <CalendarToday fontSize="small" color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    Expires: <strong>{notice.expiresAt}</strong>
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>

                {/* Content */}
                <Paper variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: 'grey.50' }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                        {notice.content}
                    </Typography>
                </Paper>

                {/* Attachments */}
                {notice.attachments && notice.attachments.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AttachFile /> Attachments ({notice.attachments.length})
                        </Typography>
                        <Stack spacing={1}>
                            {notice.attachments.map((file, index) => (
                                <Paper
                                    key={file.id || index}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: 'action.hover' }
                                    }}
                                    onDoubleClick={() => handleOpenFile(file)}
                                >
                                    <Box display="flex" alignItems="center" gap={2} onClick={() => handleOpenFile(file)}>
                                        <Avatar sx={{ bgcolor: 'grey.100' }}>
                                            {getFileIcon(file.name)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" fontWeight="medium">
                                                {file.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {file.size} • Click to open, double-click for details
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => handleDownloadFile(file)}
                                    >
                                        <Download fontSize="small" />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* Admin Stats */}
                {isAdmin && notice.allEmployees?.length > 0 && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Read Status: {notice.readBy?.length || 0} out of {notice.allEmployees.length} employees
                            ({readPercentage}%)
                        </Typography>
                        <Box sx={{
                            width: '100%',
                            height: 8,
                            bgcolor: 'grey.200',
                            borderRadius: 4,
                            overflow: 'hidden',
                            mt: 1
                        }}>
                            <Box sx={{
                                width: `${readPercentage}%`,
                                height: '100%',
                                bgcolor: 'primary.main',
                                borderRadius: 4
                            }} />
                        </Box>
                        {onViewReadStatus && (
                            <Button
                                size="small"
                                startIcon={<Visibility />}
                                onClick={() => {
                                    onClose();
                                    onViewReadStatus();
                                }}
                                sx={{ mt: 1 }}
                            >
                                View Read Status Details
                            </Button>
                        )}
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Button startIcon={<ArrowBack />} onClick={onClose}>
                    Back to Notices
                </Button>
                {!isAdmin && onMarkAsRead && (
                    <Button
                        variant={hasRead ? "outlined" : "contained"}
                        color={hasRead ? "success" : "primary"}
                        startIcon={hasRead ? <CheckCircle /> : <Visibility />}
                        disabled={hasRead}
                        onClick={() => onMarkAsRead(notice.id)}
                    >
                        {hasRead ? 'Already Read' : 'Mark as Read'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default NoticeDetailDialog;