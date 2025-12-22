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
    Paper
} from '@mui/material';
import {
    ArrowBack,
    Add,
    Edit,
    Delete,
    Search,
    CheckCircle,
    Cancel
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { getApplicationServicesList } from '../../services/AppConfigAction';

export const ServicesManagementPage = () => {
    const navigate = useNavigate();
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    
    const [services, setServices] = useState([]);
    useEffect(() => {
        const loadConfigs = async () => {
            setLoading(true);
            try {
                const result = await dispatch(getApplicationServicesList());
                console.log('Services loaded successfully', 'success');
                if (result.type === "APPCONFIG_INIT") {
                    // Ensure data matches the expected structure
                    const formattedServices = result.payload.map(service => ({
                        ...service,
                        // Ensure status is in correct format
                        status: service.status === true || service.status === 'active' ? 'active' : 'inactive'
                    }));
                    setServices(formattedServices);
                    setFilteredServices(formattedServices);
                }
            } catch (error) {
                console.error('Error loading services:', error);
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
                service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.price?.toString().includes(searchTerm) ||
                service.duration?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredServices(filtered);
        }
    }, [searchTerm, services]);

    const [openDialog, setOpenDialog] = useState(false);
    const [currentService, setCurrentService] = useState({
        name: '',
        category: 'development',
        price: '',
        duration: '',
        status: 'active'
    });

    const handleEdit = (service) => {
        setCurrentService(service);
        setOpenDialog(true);
    };

    const handleDelete = (id) => {
        // In real app, you would dispatch a delete action here
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(service => service.id !== id));
            console.log('Delete service with id:', id);
        }
    };

    const toggleStatus = (id) => {
        setServices(services.map(service => {
            if (service.id === id) {
                const newStatus = service.status === 'active' ? 'inactive' : 'active';
                // In real app, you would dispatch an update action here
                console.log('Toggle status for service:', id, 'to', newStatus);
                return { ...service, status: newStatus };
            }
            return service;
        }));
    };

    const handleSubmit = () => {
        // Convert status to boolean for API/database if needed
        const serviceToSubmit = {
            ...currentService,
            status: currentService.status === 'active'
        };

        if (currentService.id) {
            // Update existing service
            // In real app, dispatch update action
            console.log('Update service:', serviceToSubmit);
            setServices(services.map(service =>
                service.id === currentService.id ? currentService : service
            ));
        } else {
            // Add new service
            // In real app, dispatch create action
            console.log('Add service:', serviceToSubmit);
            const newService = {
                ...currentService,
                id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1
            };
            setServices([...services, newService]);
        }
        setOpenDialog(false);
        setCurrentService({ name: '', category: 'development', price: '', duration: '', status: 'active' });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle color="success" />;
            case 'inactive': return <Cancel color="error" />;
            default: return <Cancel color="disabled" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'inactive': return 'error';
            default: return 'default';
        }
    };

    const getCategoryColor = (category) => {
        switch (category?.toLowerCase()) {
            case 'development': return 'primary';
            case 'design': return 'secondary';
            case 'marketing': return 'warning';
            case 'consulting': return 'info';
            case 'support': return 'success';
            default: return 'default';
        }
    };

    // Define columns for DataGrid
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            type: 'number'
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
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={getCategoryColor(params.value)}
                    size="small"
                    variant="outlined"
                />
            )
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
            renderCell: (params) => (
                <Typography fontWeight="medium">
                    {params.value}
                </Typography>
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
                <Typography variant="body2" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {params.value || 'No description'}
                </Typography>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" gap={1}>
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
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
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
                </Stack>
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

    return (
        <Container maxWidth="xl" sx={{ py: 4, height: '100vh' }} disableGutters>
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
                        setCurrentService({
                            name: '',
                            category: 'development',
                            price: '',
                            duration: '',
                            description: '',
                            status: 'active',
                        });
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
                    checkboxSelection
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
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {currentService.id ? `Edit Service: ${currentService.name}` : 'Add New Service'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Service Name"
                            value={currentService.name}
                            onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                        />

                        <Select
                            value={currentService.category}
                            onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                            fullWidth
                            margin="normal"
                        >
                            {serviceCategories.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>

                        <TextField
                            label="Price"
                            value={currentService.price}
                            onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
                            fullWidth
                            margin="normal"
                            placeholder="e.g., $5000, $100/hour, Custom quote"
                        />

                        <TextField
                            label="Duration"
                            value={currentService.duration}
                            onChange={(e) => setCurrentService({ ...currentService, duration: e.target.value })}
                            fullWidth
                            margin="normal"
                            placeholder="e.g., 3 months, 2 weeks, On-going"
                        />

                        <TextField
                            label="Description"
                            value={currentService.description || ''}
                            onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            placeholder="Brief description of the service..."
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={currentService.status === 'active'}
                                    onChange={(e) => setCurrentService({
                                        ...currentService,
                                        status: e.target.checked ? 'active' : 'inactive'
                                    })}
                                />
                            }
                            label={`Status: ${currentService.status === 'active' ? 'Active' : 'Inactive'}`}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {currentService.id ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};