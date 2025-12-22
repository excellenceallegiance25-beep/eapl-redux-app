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
    Tooltip
} from '@mui/material';
import {
    ArrowBack,
    Add,
    Edit,
    Delete,
    CheckCircle,
    Pending,
    Block
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { getPartnerList } from '../../services/AppConfigAction';

export const PartnersManagementPage = () => {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadConfigs = async () => {
            setLoading(true);
            try {
                const result = await dispatch(getPartnerList());
                console.log('Configurations loaded successfully', 'success');
                if (result.type === "PARTNER_LIST") {
                    setPartners(result.payload);
                }
            } catch (error) {
                console.error('Error loading partners:', error);
            } finally {
                setLoading(false);
            }
        };

        loadConfigs();
    }, [dispatch]);

    const [openDialog, setOpenDialog] = useState(false);
    const [currentPartner, setCurrentPartner] = useState({
        name: '',
        email: '',
        phone: '',
        services: '',
        status: 'active'
    });

    const handleEdit = (partner) => {
        setCurrentPartner(partner);
        setOpenDialog(true);
    };

    const handleDelete = (id) => {
        setPartners(partners.filter(partner => partner.id !== id));
    };

    const toggleStatus = (id) => {
        setPartners(partners.map(partner =>
            partner.id === id ? { ...partner, status: partner.status === 'active' ? 'inactive' : partner.status === 'pending' ? 'active' : 'pending' } : partner
        ));
    };

    const handleSubmit = () => {
        if (currentPartner.id) {
            // Update
            setPartners(partners.map(partner =>
                partner.id === currentPartner.id ? currentPartner : partner
            ));
        } else {
            // Add
            const newPartner = {
                ...currentPartner,
                id: partners.length + 1,
                services: currentPartner.services.split(',').map(s => s.trim())
            };
            setPartners([...partners, newPartner]);
        }
        setOpenDialog(false);
        setCurrentPartner({ name: '', email: '', phone: '', services: '', status: 'active' });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle color="success" />;
            case 'pending': return <Pending color="warning" />;
            case 'inactive': return <Block color="error" />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'pending': return 'warning';
            case 'inactive': return 'error';
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
            field: 'name',
            headerName: 'Name',
            width: 180,
            editable: false
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 220,
            renderCell: (params) => (
                <a href={`mailto:${params.value}`} style={{ color: 'inherit' }}>
                    {params.value}
                </a>
            )
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150
        },
        {
            field: 'services',
            headerName: 'Services',
            width: 250,
            renderCell: (params) => (
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {Array.isArray(params.value) ?
                        params.value.map((service, index) => (
                            <Chip
                                key={index}
                                label={service}
                                size="small"
                                variant="outlined"
                                sx={{ m: 0.2 }}
                            />
                        )) :
                        <Typography variant="body2">{params.value}</Typography>
                    }
                </Stack>
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
            width: 280,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Toggle Status">
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

    return (
        <Container maxWidth="xl" sx={{ py: 4, height: '100vh' }} disableGutters>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Back to Dashboard
            </Button>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Partners Management</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
                    Add Partner
                </Button>
            </Box>

            {/* DataGrid */}
            <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
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
                <DialogTitle>{currentPartner.id ? 'Edit Partner' : 'Add Partner'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Partner Name"
                            value={currentPartner.name}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, name: e.target.value })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={currentPartner.email}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, email: e.target.value })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Phone"
                            value={currentPartner.phone}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, phone: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Services (comma separated)"
                            value={Array.isArray(currentPartner.services) ? currentPartner.services.join(', ') : currentPartner.services}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, services: e.target.value })}
                            fullWidth
                            placeholder="Web Development, Cloud Services"
                            helperText="Separate services with commas"
                        />
                        <Select
                            value={currentPartner.status}
                            onChange={(e) => setCurrentPartner({ ...currentPartner, status: e.target.value })}
                            fullWidth
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {currentPartner.id ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};