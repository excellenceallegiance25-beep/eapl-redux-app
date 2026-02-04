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
    Avatar,
    FormControl,
    InputLabel,
    Alert,
    CircularProgress,
    Switch,
    FormControlLabel
} from '@mui/material';
import {
    ArrowBack,
    Add,
    Edit,
    Delete,
    CheckCircle,
    Pending,
    Block,
    CloudUpload
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { getPartnerList, updatePartnersDetails } from '../../services/AppConfigAction';
import eaplRotatingLogo from '../../assets/images/EAPLfavicon.jpg';
import useLoading from '../../redux/slices/useLoading';


export const PartnersManagementPage = () => {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const dispatch = useDispatch();
    const { showLoader, hideLoader, withLoader } = useLoading();

    useEffect(() => {
        loadPartners();
    }, [dispatch]);

    const loadPartners = async () => {
        showLoader(eaplRotatingLogo, 0);
        setLoading(true);
        setError(null);
        try {
            const result = await dispatch(getPartnerList());
            if (result.type === "PARTNER_LIST") {
                setPartners(result.payload);
            }
        } catch (error) {
            console.error('Error loading partners:', error);
            setError('Failed to load partners');
        } finally {
            setLoading(false);
            hideLoader();
        }
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [currentPartner, setCurrentPartner] = useState({
        id: 0,
        name: '',
        email: '',
        phone: '',
        services: '',
        type: '',
        color: '',
        logo: '',
        status: true,
        profilePicture: null,
        profilePictureUrl: '',
        profilePictureType: '',
        indicator: 'I' // I for Insert, U for Update, D for Delete
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState('');

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setError('Please select a valid image file (JPEG, PNG, GIF, WebP)');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size should be less than 5MB');
                return;
            }

            try {
                // Convert to base64
                const base64Image = await convertImageToBase64(file);

                // Extract file type from base64 string
                const fileTypeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
                const fileType = fileTypeMatch ? fileTypeMatch[1] : 'image/jpeg';

                setSelectedFile(file);
                setFilePreview(base64Image);
                setCurrentPartner({
                    ...currentPartner,
                    profilePicture: base64Image,
                    profilePictureUrl: base64Image,
                    profilePictureType: fileType
                });
                setError(null);
            } catch (error) {
                console.error('Error converting image:', error);
                setError('Failed to process image');
            }
        }
    };

    const handleEdit = (partner) => {
        // Determine profile picture URL
        let profilePictureUrl = '';
        let profilePictureType = '';
        let profilePicture = null;

        // Check for profile picture in various formats
        if (partner.profilePicture) {
            if (typeof partner.profilePicture === 'string') {
                // If it's already a data URL
                if (partner.profilePicture.startsWith('data:image/')) {
                    profilePictureUrl = partner.profilePicture;
                    profilePicture = partner.profilePicture;
                    profilePictureType = partner.profilePictureType || partner.profilePicture.match(/^data:(image\/\w+);base64,/)?.[1] || 'image/jpeg';
                }
                // If it's a pure base64 string (without data URL prefix)
                else if (partner.profilePicture.length > 100) {
                    try {
                        // Try to decode to check if it's valid base64
                        atob(partner.profilePicture);
                        // Convert to data URL
                        profilePictureUrl = `data:image/jpeg;base64,${partner.profilePicture}`;
                        profilePicture = partner.profilePicture;
                        profilePictureType = partner.profilePictureType || 'image/jpeg';
                    } catch (e) {
                        // If not base64, assume it's a URL
                        profilePictureUrl = partner.profilePicture;
                        profilePicture = partner.profilePicture;
                        profilePictureType = partner.profilePictureType || 'image/jpeg';
                    }
                }
            }
        } else if (partner.profilePictureUrl) {
            // Use profilePictureUrl as fallback
            profilePictureUrl = partner.profilePictureUrl;
            profilePicture = partner.profilePictureUrl;
        }

        // Set the preview
        if (profilePictureUrl) {
            setFilePreview(profilePictureUrl);
        } else {
            setFilePreview('');
        }

        setCurrentPartner({
            id: partner.id || 0,
            name: partner.name || '',
            email: partner.email || '',
            phone: partner.phone || '',
            services: Array.isArray(partner.services) ? partner.services.join(', ') : partner.services || '',
            type: partner.type || '',
            color: partner.color || '',
            logo: partner.logo || '',
            status: partner.status !== false, // Ensure boolean
            profilePicture: profilePicture,
            profilePictureUrl: profilePictureUrl,
            profilePictureType: profilePictureType || partner.profilePictureType || '',
            indicator: 'U'
        });

        setSelectedFile(null);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            try {
                const partnerToDelete = partners.find(partner => partner.id === id);
                if (!partnerToDelete) return;

                const deletePayload = {
                    id: partnerToDelete.id,
                    indicator: 'D'
                };

                const result = await dispatch(updatePartnersDetails(deletePayload));

                if (result.type === "PARTNER_DETAILS_FETCH_SUCCESS" && result.payload.success) {
                    // Remove from local state
                    setPartners(partners.filter(partner => partner.id !== id));
                    setSuccess('Partner deleted successfully');
                    setTimeout(() => setSuccess(null), 3000);
                } else {
                    setError(result.payload.message || 'Failed to delete partner');
                }
            } catch (error) {
                console.error('Error deleting partner:', error);
                setError('Failed to delete partner');
            }
        }
    };

    const toggleStatus = async (id) => {
        const partner = partners.find(p => p.id === id);
        if (!partner) return;

        const newStatus = !partner.status;

        try {
            const updatePayload = {
                id: partner.id,
                name: partner.name,
                email: partner.email,
                phone: partner.phone,
                services: Array.isArray(partner.services) ? partner.services.join(', ') : partner.services,
                type: partner.type,
                color: partner.color,
                logo: partner.logo,
                status: newStatus,
                profilePicture: partner.profilePicture,
                profilePictureType: partner.profilePictureType,
                indicator: 'U'
            };

            const result = await dispatch(updatePartnersDetails(updatePayload));

            if (result.type === "PARTNER_DETAILS_FETCH_SUCCESS" && result.payload.success) {
                // Update local state
                setPartners(partners.map(partner =>
                    partner.id === id ? { ...partner, status: newStatus } : partner
                ));
                setSuccess('Status updated successfully');
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError(result.payload.message || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            setError('Failed to update status');
        }
    };

    const handleSubmit = async () => {
        // Validation
        if (!currentPartner.name) {
            setError('Name is required');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            // Prepare payload according to backend API
            const payload = {
                id: currentPartner.id || 0,
                name: currentPartner.name,
                email: currentPartner.email || '',
                phone: currentPartner.phone || '',
                services: Array.isArray(currentPartner.services) ?
                    currentPartner.services :
                    currentPartner.services.split(',').map(s => s.trim()).join(','),
                type: currentPartner.type || '',
                color: currentPartner.color || '',
                logo: currentPartner.logo || '',
                status: currentPartner.status !== false, // Ensure boolean
                indicator: currentPartner.indicator
            };

            // Add profile picture if exists
            if (currentPartner.profilePicture) {
                payload.profilePicture = currentPartner.profilePicture;
                payload.profilePictureType = currentPartner.profilePictureType;
            }

            console.log('Submitting payload:', payload);

            const result = await dispatch(updatePartnersDetails(payload));

            if (result.type === "PARTNER_DETAILS_FETCH_SUCCESS") {
                if (result.payload.success) {
                    // Reload partners to get updated data
                    await loadPartners();

                    // Reset form
                    setOpenDialog(false);
                    setCurrentPartner({
                        id: 0,
                        name: '',
                        email: '',
                        phone: '',
                        services: '',
                        type: '',
                        color: '',
                        logo: '',
                        status: true,
                        profilePicture: null,
                        profilePictureUrl: '',
                        profilePictureType: '',
                        indicator: 'I'
                    });
                    setSelectedFile(null);
                    setFilePreview('');

                    setSuccess(`Partner ${currentPartner.indicator === 'I' ? 'added' : 'updated'} successfully`);
                    setTimeout(() => setSuccess(null), 3000);
                } else {
                    setError(result.payload.message || 'Operation failed');
                }
            } else {
                setError('Failed to save partner');
            }
        } catch (error) {
            console.error('Error saving partner:', error);
            setError(`Failed to ${currentPartner.indicator === 'I' ? 'create' : 'update'} partner`);
        } finally {
            setUploading(false);
        }
    };

    const getStatusIcon = (status) => {
        if (status === true || status === 'true') {
            return <CheckCircle color="success" />;
        } else {
            return <Block color="error" />;
        }
    };

    const getStatusLabel = (status) => {
        if (status === true || status === 'true') {
            return 'Active';
        } else {
            return 'Inactive';
        }
    };

    const getStatusColor = (status) => {
        if (status === true || status === 'true') {
            return 'success';
        } else {
            return 'error';
        }
    };

    // Define columns for DataGrid
    const columns = [
        {
            field: 'profilePicture',
            headerName: '',
            width: 80,
            renderCell: (params) => {
                const iconValue = params.value;
                const partnerName = params.row.name || '';

                // Helper function to render avatar
                const renderAvatar = () => {
                    // If no profile picture, show initials
                    if (!iconValue) {
                        return (
                            <Avatar
                                sx={{
                                    bgcolor: 'primary.main',
                                    width: 40,
                                    height: 40,
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {partnerName.charAt(0).toUpperCase()}
                            </Avatar>
                        );
                    }

                    // Check if it's a Base64 string
                    if (typeof iconValue === 'string') {
                        // Check if it's already a data URL
                        if (iconValue.startsWith('data:image/')) {
                            return (
                                <Avatar
                                    sx={{ width: 40, height: 40 }}
                                    src={iconValue}
                                    alt={partnerName}
                                />
                            );
                        }

                        // Check if it's a pure Base64 (without data URL prefix)
                        if (iconValue.length > 100) {
                            try {
                                // Try to decode to check if it's valid base64
                                atob(iconValue);
                                // It's likely a Base64 string without prefix
                                const base64Url = `data:image/jpeg;base64,${iconValue}`;
                                return (
                                    <Avatar
                                        sx={{ width: 40, height: 40 }}
                                        src={base64Url}
                                        alt={partnerName}
                                    />
                                );
                            } catch (e) {
                                // Not valid base64, treat as URL or text
                            }
                        }

                        // Check if it's a URL
                        if (iconValue.startsWith('http://') || iconValue.startsWith('https://')) {
                            return (
                                <Avatar
                                    sx={{ width: 40, height: 40 }}
                                    src={iconValue}
                                    alt={partnerName}
                                    onError={(e) => {
                                        // If image fails to load, show initials
                                        e.target.style.display = 'none';
                                    }}
                                >
                                    {partnerName.charAt(0).toUpperCase()}
                                </Avatar>
                            );
                        }
                    }

                    // Default fallback to initials
                    return (
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                width: 40,
                                height: 40,
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {partnerName.charAt(0).toUpperCase()}
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
                        {renderAvatar()}
                    </Box>
                );
            },
            sortable: false,
            filterable: false
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    {/* <Tooltip title={`Set ${params.row.status ? 'Inactive' : 'Active'}`}>
                        <IconButton
                            size="small"
                            onClick={() => toggleStatus(params.row.id)}
                            color={params.row.status ? "success" : "error"}
                        >
                            {getStatusIcon(params.row.status)}
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            onClick={() => handleEdit(params.row)}
                            color="primary"
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
                </Stack>
            )
        },
        // {
        //     field: 'id',
        //     headerName: 'ID',
        //     width: 70,
        //     type: 'number',
        //     align: 'center',
        //     headerAlign: 'center',
        //     editable: false
        // },
        {
            field: 'name',
            headerName: 'Name',
            width: 160,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    height: '100%',
                    width: '100%'
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {params.value}
                    </Typography>
                </Box>

            )
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            renderCell: (params) => {
                if (!params.value) return null;
                return (
                    <a
                        href={`mailto:${params.value}`}
                        style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '0.875rem'
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        {params.value}
                    </a>
                );
            }
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 140,
            renderCell: (params) => {
                if (!params.value) return null;
                return (
                    <a
                        href={`tel:${params.value}`}
                        style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '0.875rem'
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        {params.value}
                    </a>
                );
            }
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value || 'N/A'}
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ fontSize: '0.75rem' }}
                />
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
                        label={getStatusLabel(params.value)}
                        color={getStatusColor(params.value)}
                        size="small"
                        variant="outlined"
                        sx={{
                            minWidth: '80px',
                            fontWeight: 'medium'
                        }}
                    />
                </Box>
            )
        },
        {
            field: 'services',
            headerName: 'Services',
            width: 350,
            renderCell: (params) => {
                if (!params.value) return null;

                let servicesArray = [];
                if (Array.isArray(params.value)) {
                    servicesArray = params.value;
                } else if (typeof params.value === 'string') {
                    servicesArray = params.value.split(',').map(s => s.trim()).filter(s => s !== '');
                }

                if (servicesArray.length === 0) return null;

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        {/* <Stack
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                            sx={{ maxWidth: '100%' }}
                        > */}
                        {servicesArray.slice(0, 3).map((service, index) => (
                            <Tooltip key={index} title={service} arrow>
                                <Chip
                                    label={service}
                                    size="small"
                                    sx={{
                                        maxWidth: 90,
                                        height: 22,
                                        fontSize: '0.72rem',
                                        fontWeight: 500,
                                        borderRadius: 1.5,
                                        backgroundColor: 'rgba(79,195,247,0.12)',
                                        color: '#0f2a44',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        '&:hover': {
                                            backgroundColor: 'rgba(79,195,247,0.2)',
                                        },
                                    }}
                                />
                            </Tooltip>
                        ))}

                        {servicesArray.length > 3 && (
                            <Tooltip title={servicesArray.slice(3).join(', ')} arrow>
                                <Chip
                                    label={`+${servicesArray.length - 3}`}
                                    size="small"
                                    sx={{
                                        height: 22,
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        borderRadius: 1.5,
                                        cursor: 'pointer',

                                        backgroundColor: 'rgba(15,42,68,0.08)',
                                        color: '#0f2a44',

                                        '&:hover': {
                                            backgroundColor: 'rgba(15,42,68,0.15)',
                                        },
                                    }}
                                />
                            </Tooltip>
                        )}
                        {/* </Stack> */}
                    </Box>
                );
            }
        },


    ];

    return (
        <Container maxWidth="xl" disableGutters>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Back to Dashboard
            </Button>

            {/* Success/Error Messages */}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                {/* <Typography variant="h4">Partners Management</Typography> */}
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        setCurrentPartner({
                            id: 0,
                            name: '',
                            email: '',
                            phone: '',
                            services: '',
                            type: '',
                            color: '',
                            logo: '',
                            status: true,
                            profilePicture: null,
                            profilePictureUrl: '',
                            profilePictureType: '',
                            indicator: 'I'
                        });
                        setFilePreview('');
                        setSelectedFile(null);
                        setOpenDialog(true);
                    }}
                >
                    Add Partner
                </Button>
            </Box>

            {/* DataGrid */}
            <Box sx={{ height: 'calc(100vh - 220px)', width: '100%' }}>
                <DataGrid
                    rows={partners}
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
                        border: 'none',
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'background.default',
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'action.hover',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#6288a6 !important',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: '#fdfafaff !important',
                            fontWeight: 'bold !important',
                        },
                        '& .no-sort-icon .MuiDataGrid-iconButtonContainer, & .no-sort-icon .MuiDataGrid-menuIcon': {
                            display: 'none'
                        }
                    }}
                />
            </Box>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={() => !uploading && setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {currentPartner.indicator === 'I' ? 'Add Partner' : 'Edit Partner'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Profile Picture Upload Section */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 1,
                            p: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            mb: 2
                        }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Profile Picture
                            </Typography>

                            {/* Profile Picture Preview */}
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    bgcolor: (filePreview || currentPartner.profilePicture || currentPartner.profilePictureUrl)
                                        ? 'transparent'
                                        : 'primary.main',
                                    fontSize: (filePreview || currentPartner.profilePicture || currentPartner.profilePictureUrl)
                                        ? 'auto'
                                        : '2.5rem',
                                    mb: 2,
                                    border: '2px solid',
                                    borderColor: 'divider'
                                }}
                                src={(() => {
                                    // Priority 1: File preview (new upload)
                                    if (filePreview) return filePreview;

                                    // Priority 2: Existing profile picture
                                    if (currentPartner.profilePicture) {
                                        // Check if it's a data URL
                                        if (typeof currentPartner.profilePicture === 'string') {
                                            if (currentPartner.profilePicture.startsWith('data:image/')) {
                                                return currentPartner.profilePicture;
                                            } else if (currentPartner.profilePicture.length > 100) {
                                                try {
                                                    atob(currentPartner.profilePicture);
                                                    return `data:image/jpeg;base64,${currentPartner.profilePicture}`;
                                                } catch (e) {
                                                    return currentPartner.profilePicture;
                                                }
                                            }
                                        }
                                        return currentPartner.profilePicture;
                                    }

                                    // Priority 3: Profile picture URL
                                    if (currentPartner.profilePictureUrl) {
                                        return currentPartner.profilePictureUrl;
                                    }

                                    return null;
                                })()}
                                alt={currentPartner.name || 'Partner'}
                            >
                                {(!filePreview && !currentPartner.profilePicture && !currentPartner.profilePictureUrl)
                                    ? (currentPartner.name?.charAt(0)?.toUpperCase() || 'P')
                                    : null}
                            </Avatar>

                            {/* Upload Button */}
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="profile-picture-upload"
                                type="file"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                            <label htmlFor="profile-picture-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<CloudUpload />}
                                    size="small"
                                    fullWidth
                                    sx={{ mb: 1 }}
                                    disabled={uploading}
                                >
                                    Upload Picture
                                </Button>
                            </label>

                            <Typography variant="caption" color="text.secondary" align="center">
                                Supported: JPEG, PNG, GIF, WebP (max 5MB)
                            </Typography>

                            {/* Remove Picture Button (only show if there's a picture) */}
                            {(filePreview || currentPartner.profilePicture || currentPartner.profilePictureUrl) && (
                                <Button
                                    variant="text"
                                    size="small"
                                    color="error"
                                    onClick={() => {
                                        setFilePreview('');
                                        setSelectedFile(null);
                                        setCurrentPartner({
                                            ...currentPartner,
                                            profilePicture: null,
                                            profilePictureUrl: '',
                                            profilePictureType: ''
                                        });
                                    }}
                                    disabled={uploading}
                                    sx={{ mt: 1 }}
                                >
                                    Remove Picture
                                </Button>
                            )}
                        </Box>

                        <TextField
                            label="Partner Name *"
                            value={currentPartner.name}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, name: e.target.value })}
                            fullWidth
                            required
                            error={!currentPartner.name && !!error}
                            disabled={uploading}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={currentPartner.email}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, email: e.target.value })}
                            fullWidth
                            disabled={uploading}
                        />
                        <TextField
                            label="Phone"
                            value={currentPartner.phone}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, phone: e.target.value })}
                            fullWidth
                            disabled={uploading}
                        />
                        <TextField
                            label="Type"
                            value={currentPartner.type}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, type: e.target.value })}
                            fullWidth
                            disabled={uploading}
                            placeholder="Partner type"
                        />
                        {/* <TextField
                            label="Color"
                            value={currentPartner.color}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, color: e.target.value })}
                            fullWidth
                            disabled={uploading}
                            placeholder="#FFFFFF"
                        /> */}
                        {/* <TextField
                            label="Logo URL"
                            value={currentPartner.logo}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, logo: e.target.value })}
                            fullWidth
                            disabled={uploading}
                            placeholder="https://example.com/logo.png"
                        /> */}
                        <TextField
                            label="Services (comma separated)"
                            value={currentPartner.services}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, services: e.target.value })}
                            fullWidth
                            placeholder="Web Development, Cloud Services"
                            helperText="Separate services with commas"
                            disabled={uploading}
                            multiline
                            rows={2}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={currentPartner.status !== false}
                                    onChange={(e) => setCurrentPartner({
                                        ...currentPartner,
                                        status: e.target.checked
                                    })}
                                    disabled={uploading}
                                />
                            }
                            label="Active Status"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} disabled={uploading}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={uploading || !currentPartner.name}
                    >
                        {uploading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                        {currentPartner.indicator === 'I' ? 'Add' : 'Update'} Partner
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};