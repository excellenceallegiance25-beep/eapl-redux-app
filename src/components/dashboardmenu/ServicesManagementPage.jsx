import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Button,
    Typography,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    Chip,
    IconButton,
    Tooltip,
    InputAdornment,
    FormControlLabel,
    Switch,
    Paper,
    Avatar,
    Grid,
    Alert,
    FormHelperText,
    CircularProgress,
    Snackbar
} from '@mui/material';
import {
    ArrowBack,
    Add,
    Edit,
    Delete,
    Search,
    CheckCircle,
    Cancel,
    Image as ImageIcon,
    CloudUpload,
    Close as CloseIcon
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { getApplicationServicesList, updateServiceRequest } from '../../services/AppConfigAction';

export const ServicesManagementPage = () => {
    const navigate = useNavigate();
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    // Search state
    const [searchTerm, setSearchTerm] = useState('');

    // Validation errors
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    // Snackbar for notifications
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const [services, setServices] = useState([]);
    useEffect(() => {
        const loadConfigs = async () => {
            setLoading(true);
            try {
                const result = await dispatch(getApplicationServicesList());
                if (result.type === "APPCONFIG_INIT") {
                    const formattedServices = result.payload.map(service => ({
                        ...service,
                        id: service.service_id || service.id,
                        // service_id: service.service_id || service.id,
                        status: service.status === true || service.status === 'active' || service.status === 1 ? 'active' : 'inactive',
                        icon: service.icon || service.icon_url || '📊'
                    }));
                    setServices(formattedServices);
                    setFilteredServices(formattedServices);
                    showSnackbar('Services loaded successfully', 'success');
                }
            } catch (error) {
                console.error('Error loading services:', error);
                showSnackbar('Failed to load services', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadConfigs();
    }, [dispatch]);

    // Filter services based on search
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredServices(services);
        } else {
            const filtered = services.filter(service =>
                service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.price?.toString().includes(searchTerm) ||
                service.duration?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredServices(filtered);
        }
    }, [searchTerm, services]);

    const [openDialog, setOpenDialog] = useState(false);
    const [currentService, setCurrentService] = useState({
        title: '',
        description: '',
        icon: '',
        category: 'Development',
        features: '',
        bg_type: 'image/jpeg',
        price: '',
        duration: '',
        status: 'active',
        indicator: 'I'
    });

    const [iconFile, setIconFile] = useState(null);
    const [iconPreview, setIconPreview] = useState('');

    // Snackbar helper
    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        if (!currentService.title?.trim()) {
            newErrors.title = 'Service title is required';
        } else if (currentService.title.trim().length > 100) {
            newErrors.title = 'Title must be less than 100 characters';
        }

        if (!currentService.category?.trim()) {
            newErrors.category = 'Category is required';
        }

        if (currentService.description && currentService.description.trim().length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }

        if (currentService.price && isNaN(parseFloat(currentService.price)) && currentService.price !== 'Custom quote') {
            newErrors.price = 'Price must be a valid number or "Custom quote"';
        }

        // Icon validation
        if (!currentService.icon?.trim() && !iconFile) {
            newErrors.icon = 'Icon or image is required';
        }

        if (currentService.features) {
            const featuresArray = currentService.features.split(',').map(f => f.trim()).filter(f => f);
            if (featuresArray.length > 10) {
                newErrors.features = 'Maximum 10 features allowed';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate icon file
    const validateIconFile = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];

        if (!validTypes.includes(file.type)) {
            setErrors(prev => ({
                ...prev,
                icon: 'Please upload a valid image (JPEG, PNG, GIF, SVG, WebP)'
            }));
            return false;
        }

        // Validate file size (max 2MB for icons)
        if (file.size > 2 * 1024 * 1024) {
            setErrors(prev => ({
                ...prev,
                icon: 'Image size should be less than 2MB'
            }));
            return false;
        }

        return true;
    };

    const handleEdit = (service) => {
        // Convert status to proper format for the form
        const statusForForm = service.status === 'active' || service.status === true || service.status === 1
            ? 'active'
            : 'inactive';

        setCurrentService({
            ...service,
            status: statusForForm, // Use string for the form
            indicator: 'U' // Update indicator
        });

        // Clear previous errors
        setErrors({});
        setSubmitError('');

        // Set icon preview if icon exists
        if (service.icon) {
            if (service.icon.startsWith('http') || service.icon.startsWith('data:')) {
                setIconPreview(service.icon);
            } else {
                // If it's an emoji or text, use it as is
                setIconPreview(service.icon);
            }
        }
        setIconFile(null);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const deletePayload = {
                    // service_id: id,
                    id: id,
                    indicator: 'D' // Delete indicator
                };

                const result = await dispatch(updateServiceRequest(deletePayload));

                if (result.type === "SERVICE_DETAILS_FETCH_SUCCESS") {
                    // Update local state
                    setServices(services.filter(service => service.id !== id));
                    showSnackbar('Service deleted successfully', 'success');
                } else {
                    showSnackbar(result.payload?.message || 'Failed to delete service', 'error');
                }
            } catch (error) {
                console.error('Error deleting service:', error);
                showSnackbar('Error deleting service', 'error');
            }
        }
    };

    const toggleStatus = async (id) => {
        const service = services.find(s => s.id === id);
        if (!service) return;

        const newStatus = service.status === 'active' ? true : false;
        const updatedService = {
            ...service,
            status: newStatus,
            indicator: 'U'
        };

        try {
            const result = await dispatch(updateServiceRequest(updatedService));

            if (result.type === "SERVICE_DETAILS_FETCH_SUCCESS") {
                // Update local state
                setServices(services.map(s =>
                    s.id === id ? { ...s, status: newStatus } : s
                ));
                showSnackbar(`Service ${newStatus} successfully`, 'success');
            } else {
                showSnackbar(result.payload?.message || 'Failed to update status', 'error');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            showSnackbar('Error updating status', 'error');
        }
    };

    const handleIconUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!validateIconFile(file)) {
            return;
        }

        setIconFile(file);

        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setIconPreview(base64String);
            // Set the icon as base64 string for the payload
            setCurrentService({
                ...currentService,
                icon: base64String
            });

            // Clear icon error if exists
            if (errors.icon) {
                const newErrors = { ...errors };
                delete newErrors.icon;
                setErrors(newErrors);
            }
        };
        reader.readAsDataURL(file);
    };

    const preparePayload = () => {
        let iconValue = currentService.icon;
        let iconType = null;

        // If we have an uploaded file, extract base64 data
        if (iconFile) {
            iconType = iconFile.type;
            // iconValue is already base64 from handleIconUpload
        } else if (currentService.icon && currentService.icon.startsWith('data:')) {
            // Extract type from existing base64
            const matches = currentService.icon.match(/^data:(.+);base64,/);
            if (matches) {
                iconType = matches[1];
                // Remove data URL prefix for API
                iconValue = currentService.icon.split(',')[1];
            }
        }

        // IMPORTANT: Determine what format your backend expects
        // Option 1: Boolean (true/false)
        // Option 2: String ('active'/'inactive')
        // Option 3: Number (1/0)

        // Let's try different approaches. First, let's log what we have:
        console.log("Current status value:", currentService.status);
        console.log("Type of status:", typeof currentService.status);

        // Convert status based on what your backend expects
        let statusValue;

        // Try boolean first (most common)
        if (currentService.status === 'active' || currentService.status === true) {
            statusValue = true;
        } else {
            statusValue = false;
        }

        // Alternative: Try string
        // statusValue = currentService.status === 'active' || currentService.status === true ? 'active' : 'inactive';

        // Alternative: Try number
        // statusValue = currentService.status === 'active' || currentService.status === true ? 1 : 0;

        console.log("Converted status value:", statusValue);
        console.log("Type of converted status:", typeof statusValue);

        // Prepare features
        const featuresValue = Array.isArray(currentService.features)
            ? currentService.features.join(',')
            : currentService.features;

        // Build payload
        const payload = {
            id: currentService.service_id || currentService.id,
            title: currentService.title.trim(),
            description: currentService.description?.trim() || '',
            icon: iconValue,
            icon_type: iconType,
            category: currentService.category,
            features: featuresValue,
            bg_type: iconType,
            price: currentService.price?.trim() || '',
            duration: currentService.duration?.trim() || '',
            status: statusValue, // Use the converted value
            indicator: currentService.indicator
        };

        // Remove any undefined or null values
        Object.keys(payload).forEach(key => {
            if (payload[key] === undefined || payload[key] === null || payload[key] === '') {
                delete payload[key];
            }
        });

        console.log("Final payload:", payload);
        console.log("JSON payload:", JSON.stringify(payload));

        return payload;
    };

    const handleSubmit = async () => {
        // Clear previous submit error
        setSubmitError('');

        // Validate form
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            const payload = preparePayload();

            // console.log('Submitting payload:', payload);

            const result = await dispatch(updateServiceRequest(payload));

            if (result.type === "SERVICE_DETAILS_FETCH_SUCCESS") {
                if (result.payload?.success) {
                    // Refresh services list
                    const refreshResult = await dispatch(getApplicationServicesList());
                    if (refreshResult.type === "APPCONFIG_INIT") {
                        const formattedServices = refreshResult.payload.map(service => ({
                            ...service,
                            id: service.service_id || service.id,
                            // service_id: service.service_id || service.id,
                            status: service.status === true || service.status === 'active' || service.status === 1 ? 'active' : 'inactive',
                            icon: service.icon || service.icon_url || '📊'
                        }));
                        setServices(formattedServices);
                        setFilteredServices(formattedServices);
                    }

                    showSnackbar(
                        currentService.indicator === 'I'
                            ? 'Service added successfully'
                            : 'Service updated successfully',
                        'success'
                    );

                    // Reset and close dialog
                    resetDialog();
                    setOpenDialog(false);
                } else {
                    setSubmitError(result.payload?.message || 'Operation failed');
                    showSnackbar(result.payload?.message || 'Operation failed', 'error');
                }
            } else {
                setSubmitError(result.payload?.message || 'Operation failed');
                showSnackbar(result.payload?.message || 'Operation failed', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError(error.message || 'Failed to save service. Please try again.');
            showSnackbar(error.message || 'Failed to save service', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const resetDialog = () => {
        setCurrentService({
            title: '',
            description: '',
            icon: '',
            category: 'Development',
            features: '',
            bg_type: 'image/jpeg',
            price: '',
            duration: '',
            status: 'active',
            indicator: 'I'
        });
        setIconFile(null);
        setIconPreview('');
        setErrors({});
        setSubmitError('');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle color="success" />;
            case 'inactive': return <Cancel color="error" />;
            default: return <Cancel color="disabled" />;
        }
    };

    const getStatusColor = (status) => {
        if (!status) return 'default'; // Handle undefined/null

        switch (status.toLowerCase()) {
            case 'active': return 'success';
            case 'inactive': return 'error';
            default: return 'default'; // Always return a valid color
        }
    };

    const getCategoryColor = (category) => {
        if (!category) return 'default'; // Handle undefined/null

        switch (category.toLowerCase()) {
            case 'development': return 'primary';
            case 'design': return 'secondary';
            case 'marketing': return 'warning';
            case 'consulting': return 'info';
            case 'support': return 'success';
            case 'security': return 'error';
            case 'cloud': return 'info';
            case 'analytics': return 'warning';
            default: return 'default'; // Always return a valid color
        }
    };

    // Define columns for DataGrid
    const columns = [
        {
            field: 'icon',
            headerName: 'Icon',
            width: 80,
            renderCell: (params) => {
                const iconValue = params.value;

                // Determine how to display the icon
                const renderIcon = () => {
                    if (!iconValue) {
                        return (
                            <Avatar sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
                                <ImageIcon fontSize="small" />
                            </Avatar>
                        );
                    }

                    // Check if it's a Base64 string
                    if (typeof iconValue === 'string') {
                        // Check if it's already a data URL
                        if (iconValue.startsWith('data:image/')) {
                            return (
                                <Avatar
                                    sx={{ width: 32, height: 32 }}
                                    src={iconValue}
                                    alt="Service Icon"
                                />
                            );
                        }

                        // Check if it's a pure Base64 (without data URL prefix)
                        if (iconValue.length > 100 && /^[A-Za-z0-9+/=]+$/.test(iconValue)) {
                            // It's likely a Base64 string without prefix
                            const base64Url = `data:image/jpeg;base64,${iconValue}`;
                            return (
                                <Avatar
                                    sx={{ width: 32, height: 32 }}
                                    src={base64Url}
                                    alt="Service Icon"
                                />
                            );
                        }

                        // Check if it's an emoji or short text
                        if (iconValue.length <= 3) {
                            return (
                                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '1rem' }}>
                                    {iconValue}
                                </Avatar>
                            );
                        }

                        // Check if it's a URL
                        if (iconValue.startsWith('http')) {
                            return (
                                <Avatar
                                    sx={{ width: 32, height: 32 }}
                                    src={iconValue}
                                    alt="Service Icon"
                                />
                            );
                        }
                    }

                    // Default fallback
                    return (
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            📊
                        </Avatar>
                    );
                };

                return (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%'
                    }}>
                        {renderIcon()}
                    </Box>
                );
            }
        },
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            type: 'number',
            headeralign: 'center',
            align: 'center'
        },
        {
            field: 'title',
            headerName: 'Service Name',
            width: 200,
            editable: false
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => {
                const category = params.value || ''; // Ensure it's not undefined
                return (
                    <Chip
                        label={category}
                        color={getCategoryColor(category)}
                        size="small"
                        variant="outlined"
                    />
                );
            }
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    height: '100%',
                    width: '100%'
                }}>
                    <Typography fontWeight="medium">
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 120
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    height: '100%',
                    width: '100%'
                }}>
                    <Typography variant="body2" sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {params.value || 'No description'}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    height: '100%',
                    width: '100%'
                }}>
                    {getStatusIcon(params.value)}
                    <Chip
                        label={params.value}
                        color={getStatusColor(params.value)}
                        size="small"
                        variant="outlined"
                    />
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            sortable: false,
            filterable: false,
            headeralign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    height: '100%',
                    width: '100%'
                }}>
                    <Tooltip title={params.row.status === 'active' ? 'Deactivate' : 'Activate'}>
                        <IconButton
                            size="small"
                            onClick={() => toggleStatus(params.row.id)}
                        >
                            {getStatusIcon(params.row.status)}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            onClick={() => handleEdit(params.row)}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    // Service categories for dropdown
    const serviceCategories = [
        'Development',
        'Design',
        'Marketing',
        'Consulting',
        'Support',
        'Cloud',
        'Security',
        'Analytics',
        'Integration',
        'Other'
    ];

    // Background types
    const bgTypes = ['color', 'image', 'gradient'];

    return (
        <Container maxWidth="xl" disableGutters>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Back to Dashboard
            </Button>

            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'stretch', md: 'center' }}
                justifyContent="space-between"
                gap={2}
                mb={3}
            >
                <Typography variant="h4">
                    Services Management
                </Typography>

                <TextField
                    fullWidth
                    sx={{ maxWidth: { md: 400 } }}
                    placeholder="Search services by name, category, price, or duration..."
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

                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        resetDialog();
                        setOpenDialog(true);
                    }}
                    sx={{ whiteSpace: 'nowrap', minWidth: "150px" }}
                >
                    Add Service
                </Button>
            </Box>

            {/* DataGrid */}
            <Box sx={{ height: 'calc(100vh - 250px)', width: '100%' }}>
                <DataGrid
                    rows={filteredServices}
                    columns={columns}
                    loading={loading}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                        sorting: {
                            sortModel: [{ field: 'id', sort: 'asc' }],
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'background.default',
                        },
                    }}
                />
            </Box>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={() => !submitting && setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {currentService.id ? `Edit Service: ${currentService.title}` : 'Add New Service'}
                    {currentService.id && (
                        <Chip
                            label={currentService.indicator === 'U' ? 'Update Mode' : 'Insert Mode'}
                            color="info"
                            size="small"
                            sx={{ ml: 2 }}
                        />
                    )}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {submitError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {submitError}
                            </Alert>
                        )}

                        <Grid container spacing={2}>
                            {/* Icon Upload Section */}
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: errors.icon ? 'error.main' : 'divider',
                                    borderRadius: 1,
                                    height: '100%'
                                }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Service Icon *
                                    </Typography>

                                    {/* Icon Preview */}
                                    <Avatar
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            bgcolor: 'primary.main',
                                            fontSize: '2rem',
                                            mb: 2,
                                            border: errors.icon ? '2px solid red' : 'none'
                                        }}
                                        src={iconPreview && iconPreview.startsWith('data:') ? iconPreview : undefined}
                                    >
                                        {iconPreview && !iconPreview.startsWith('data:')
                                            ? iconPreview
                                            : (currentService.icon || '📊')}
                                    </Avatar>

                                    {errors.icon && (
                                        <FormHelperText error sx={{ textAlign: 'center', mb: 1 }}>
                                            {errors.icon}
                                        </FormHelperText>
                                    )}

                                    {/* Upload Button */}
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="icon-upload"
                                        type="file"
                                        onChange={handleIconUpload}
                                        disabled={submitting}
                                    />
                                    <label htmlFor="icon-upload">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            startIcon={<CloudUpload />}
                                            size="small"
                                            fullWidth
                                            sx={{ mb: 1 }}
                                            disabled={submitting}
                                        >
                                            Upload Icon
                                        </Button>
                                    </label>

                                    <Typography variant="caption" color="text.secondary" align="center">
                                        Supported: JPEG, PNG, GIF, SVG, WebP (max 2MB)
                                    </Typography>

                                    {/* Or enter emoji/text */}
                                    <TextField
                                        label="Or enter icon/emoji"
                                        value={currentService.icon}
                                        onChange={(e) => {
                                            setCurrentService({ ...currentService, icon: e.target.value });
                                            setIconPreview(e.target.value);
                                            // Clear error if user enters something
                                            if (errors.icon) {
                                                const newErrors = { ...errors };
                                                delete newErrors.icon;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        size="small"
                                        fullWidth
                                        placeholder="e.g., 📊, 🔒, 🚀"
                                        error={!!errors.icon}
                                        disabled={submitting}
                                    />
                                </Box>
                            </Grid>

                            {/* Form Fields - First Column */}
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Service Title *"
                                        value={currentService.title}
                                        onChange={(e) => {
                                            setCurrentService({ ...currentService, title: e.target.value });
                                            if (errors.title) {
                                                const newErrors = { ...errors };
                                                delete newErrors.title;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        fullWidth
                                        required
                                        size="small"
                                        error={!!errors.title}
                                        helperText={errors.title}
                                        disabled={submitting}
                                    />

                                    <Select
                                        value={currentService.category}
                                        onChange={(e) => {
                                            setCurrentService({ ...currentService, category: e.target.value });
                                            if (errors.category) {
                                                const newErrors = { ...errors };
                                                delete newErrors.category;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        fullWidth
                                        required
                                        size="small"
                                        label="Category *"
                                        error={!!errors.category}
                                        disabled={submitting}
                                    >
                                        {serviceCategories.map((category) => (
                                            <MenuItem key={category} value={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.category && (
                                        <FormHelperText error>{errors.category}</FormHelperText>
                                    )}

                                    <TextField
                                        label="Price"
                                        value={currentService.price}
                                        onChange={(e) => {
                                            setCurrentService({ ...currentService, price: e.target.value });
                                            if (errors.price) {
                                                const newErrors = { ...errors };
                                                delete newErrors.price;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        fullWidth
                                        size="small"
                                        placeholder="e.g., 2541, $5000, Custom quote"
                                        error={!!errors.price}
                                        helperText={errors.price}
                                        disabled={submitting}
                                    />

                                    <TextField
                                        label="Duration"
                                        value={currentService.duration}
                                        onChange={(e) => setCurrentService({ ...currentService, duration: e.target.value })}
                                        fullWidth
                                        size="small"
                                        placeholder="e.g., 12 months, 2 weeks, On-going"
                                        disabled={submitting}
                                    />

                                    {/* <Select
                                        value={currentService.bg_type}
                                        onChange={(e) => setCurrentService({ ...currentService, bg_type: e.target.value })}
                                        fullWidth
                                        size="small"
                                        label="Background Type"
                                        disabled={submitting}
                                    >
                                        {bgTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)} Background
                                            </MenuItem>
                                        ))}
                                    </Select> */}
                                </Stack>
                            </Grid>

                            {/* Form Fields - Second Column */}
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Description"
                                        value={currentService.description}
                                        onChange={(e) => {
                                            setCurrentService({ ...currentService, description: e.target.value });
                                            if (errors.description) {
                                                const newErrors = { ...errors };
                                                delete newErrors.description;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        size="small"
                                        placeholder="Brief description of the service..."
                                        error={!!errors.description}
                                        helperText={errors.description || `${currentService.description?.length || 0}/500 characters`}
                                        disabled={submitting}
                                    />

                                    <TextField
                                        label="Features (comma separated)"
                                        value={currentService.features}
                                        onChange={(e) => {
                                            setCurrentService({ ...currentService, features: e.target.value });
                                            if (errors.features) {
                                                const newErrors = { ...errors };
                                                delete newErrors.features;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        size="small"
                                        placeholder="e.g., Feature 1,Feature 2,Feature 3"
                                        helperText={errors.features || "Separate multiple features with commas"}
                                        error={!!errors.features}
                                        disabled={submitting}
                                    />

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                        mt: 1
                                    }}>
                                        <Typography variant="body2">
                                            Service Status
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={currentService.status === 'active'}
                                                    onChange={(e) => setCurrentService({
                                                        ...currentService,
                                                        status: e.target.checked ? 'active' : 'inactive'
                                                    })}
                                                    size="small"
                                                    disabled={submitting}
                                                />
                                            }
                                            label={currentService.status === 'active' ? 'Active' : 'Inactive'}
                                            labelPlacement="start"
                                        />
                                    </Box>

                                    {/* Operation Indicator */}
                                    {currentService.id && (
                                        <Box sx={{
                                            p: 1.5,
                                            bgcolor: currentService.indicator === 'U' ? 'info.light' : 'warning.light',
                                            borderRadius: 1,
                                            textAlign: 'center'
                                        }}>
                                            <Typography variant="caption" fontWeight="medium">
                                                Mode: {currentService.indicator === 'U' ? 'UPDATE' : 'INSERT'}
                                            </Typography>
                                        </Box>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color={currentService.indicator === 'D' ? 'error' : 'primary'}
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={20} /> : null}
                    >
                        {submitting ? 'Processing...' : (
                            currentService.id
                                ? (currentService.indicator === 'D' ? 'Confirm Delete' : 'Update Service')
                                : 'Add Service'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};