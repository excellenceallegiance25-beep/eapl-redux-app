import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Install: npm install sweetalert2
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
    Avatar,
    Grid,
    Alert
} from '@mui/material';
import {
    ArrowBack,
    Add,
    Edit,
    Delete,
    Search,
    CheckCircle,
    Cancel,
    Person,
    AdminPanelSettings,
    ManageAccounts,
    Engineering,
    Upload
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import {
    createEmployeeProfile,
    deleteEmployeeProfile,
    getApplicationDepartmentsList,
    getApplicationPositionsList,
    getApplicationRolesList,
    getEmployeeProfileList,
    updateEmployeeCompleteProfile,
    updateEmployeeProfile
} from '../../services/AppConfigAction';

export const EmployeeManagementPage = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [employeeRoles, setEmployeeRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);

    // Dialog states
    const [openDialog, setOpenDialog] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        position: '',
        status: true,
        profilePicture: null,
        profilePictureType: null
    });

    // Error handling
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    // File upload
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            try {
                await loadEmployees();
                await loadRolesDetails();
                await loadDepartmentDetails();
                await loadPositionDetails();
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, [dispatch]);

    const loadEmployees = async () => {
        const result = await dispatch(getEmployeeProfileList());
        if (result.type === "EMP_INFO_LIST") {
            const formattedEmployees = result.payload.map(employee => ({
                ...employee,
                status: employee.status === true
            }));
            setEmployees(formattedEmployees);
            setFilteredEmployees(formattedEmployees);
        }
    };

    const loadRolesDetails = async () => {
        const result = await dispatch(getApplicationRolesList());
        if (result.type === "APPCONFIG_INIT") {
            setEmployeeRoles(result.payload);
        }
    };

    const loadDepartmentDetails = async () => {
        const result = await dispatch(getApplicationDepartmentsList());
        if (result.type === "APPCONFIG_INIT") {
            setDepartments(result.payload);
        }
    };

    const loadPositionDetails = async () => {
        const result = await dispatch(getApplicationPositionsList());
        if (result.type === "APPCONFIG_INIT") {
            setPositions(result.payload);
        }
    };

    // Filter employees based on search
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter(employee =>
                employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.phone?.includes(searchTerm) ||
                employee.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.position?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEmployees(filtered);
        }
    }, [searchTerm, employees]);

    const handleEdit = (employee) => {
        // Convert status back to boolean for the form
        const employeeData = {
            ...employee,
            status: employee.status === true,
            profilePicture: null,
            profilePictureType: null
        };

        setCurrentEmployee(employeeData);

        // Set image preview if profile picture exists
        if (employee.profilePicture) {
            setImagePreview(`data:image/png;base64,${employee.profilePicture}`);
        } else {
            setImagePreview(null);
        }

        setSelectedImage(null);
        setErrors({});
        setSubmitError('');
        setOpenDialog(true);
    };



    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const payload = {
                id: id,
                indicator: "D",
            };

            // Show loading
            Swal.fire({
                title: 'Deleting...',
                text: 'Please wait',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            let result;
            result = await dispatch(updateEmployeeCompleteProfile(payload));

            if (result?.type === "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS") {
                await loadEmployees();

                // Show success
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Employee has been deleted successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: result.payload?.message || 'Operation failed',
                });
                setErrors(result.payload?.message || 'Operation failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message || 'Failed to save employee',
            });
            setSubmitError(error.message || 'Failed to save employee');
        }
    };

    // const handleDelete = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this employee?')) {
    //         try {
    //             const payload = {
    //                 id: id,
    //                 indicator: "D",
    //             };

    //             let result;
    //             result = await dispatch(updateEmployeeCompleteProfile(payload));

    //             if (result?.type === "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS") {
    //                 await loadEmployees();
    //                 // handleCloseDialog();
    //             } else {
    //                 setErrors(result.payload?.message || 'Operation failed');
    //             }
    //         } catch (error) {
    //             console.error('Error submitting form:', error);
    //             setSubmitError(error.message || 'Failed to save employee');
    //         }
    //     }
    // };

    const toggleStatus = async (id) => {
        try {
            const employee = employees.find(emp => emp.id === id);
            if (!employee) return;

            const newStatus = employee.status === 'active' ? false : true;

            const payload = {
                employeeId: id,
                status: newStatus
            };

            const result = await dispatch(updateEmployeeCompleteProfile(payload));
            if (result.type === "EMP_INFO_UPDATE_SUCCESS") {
                await loadEmployees();
            } else {
                throw new Error(result.payload?.message || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert(error.message || 'Failed to update status');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!currentEmployee.name?.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!currentEmployee.email?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentEmployee.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!currentEmployee.role) {
            newErrors.role = 'Role is required';
        }

        if (!currentEmployee.department) {
            newErrors.department = 'Department is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            setErrors({ ...errors, profilePicture: 'Please upload a valid image (JPEG, PNG, GIF)' });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrors({ ...errors, profilePicture: 'Image size should be less than 5MB' });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setImagePreview(base64String);
            setSelectedImage(file);

            // Clear any previous image errors
            if (errors.profilePicture) {
                const newErrors = { ...errors };
                delete newErrors.profilePicture;
                setErrors(newErrors);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            // Prepare payload
            let profilePictureBase64 = null;
            let profilePictureType = null;

            // Handle image upload
            if (selectedImage) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    profilePictureBase64 = base64String.split(',')[1]; // Remove data URL prefix
                    profilePictureType = selectedImage.type;
                    completeSubmission(profilePictureBase64, profilePictureType);
                };
                reader.readAsDataURL(selectedImage);
            } else if (imagePreview && !selectedImage) {
                // Keep existing image
                profilePictureBase64 = imagePreview.split(',')[1];
                profilePictureType = imagePreview.split(';')[0].split(':')[1];
                await completeSubmission(profilePictureBase64, profilePictureType);
            } else {
                // No image
                await completeSubmission(null, null);
            }

        } catch (error) {
            console.error('Error processing image:', error);
            setSubmitError('Failed to process image. Please try again.');
        }
    };

    const completeSubmission = async (profilePictureBase64, profilePictureType) => {
        try {
            const payload = {
                ...currentEmployee,
                status: currentEmployee.status === true,
                profilePicture: profilePictureBase64,
                profilePictureType: profilePictureType,
                indicator: currentEmployee.id ? "U" : "I",
                newPassword: currentEmployee.password
            };

            // Remove undefined values
            Object.keys(payload).forEach(key => {
                if (payload[key] === undefined || payload[key] === null) {
                    delete payload[key];
                }
            });

            let result;
            result = await dispatch(updateEmployeeCompleteProfile(payload));

            if (result?.type === "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS") {

                if (result.payload?.type === "FAILED") {
                    setSubmitError(result.payload?.message || 'Operation failed');
                } else {
                    await loadEmployees();
                    handleCloseDialog();
                }
            } else {
                setSubmitError(result.payload?.message || 'Operation failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError(error.message || 'Failed to save employee');
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentEmployee({
            name: '',
            email: '',
            phone: '',
            role: '',
            department: '',
            position: '',
            status: true,
            profilePicture: null,
            profilePictureType: null
        });
        setImagePreview(null);
        setSelectedImage(null);
        setErrors({});
        setSubmitError('');
    };

    // Helper functions for display
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

    const getRoleIcon = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin': return <AdminPanelSettings />;
            case 'manager': return <ManageAccounts />;
            case 'employee': return <Person />;
            default: return <Person />;
        }
    };

    const getRoleColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin': return 'error';
            case 'manager': return 'warning';
            case 'employee': return 'primary';
            default: return 'default';
        }
    };

    // DataGrid columns
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            type: 'number',
            renderCell: (params) => (
                'EA0' + params.value
            )
        },
        {
            field: 'profilePicture',
            headerName: '',
            width: 60,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                const hasImage = Boolean(params.value);
                const src = hasImage
                    ? `data:image/png;base64,${params.value}`
                    : undefined;

                return (
                    <Avatar
                        src={src}
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                        }}
                    >
                        {!hasImage && <Person />}
                    </Avatar>
                );
            },
        },
        {
            field: 'name',
            headerName: 'Employee Name',
            width: 180,
            editable: false
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            renderCell: (params) => (
                <a href={`mailto:${params.value}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {params.value}
                </a>
            )
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 130
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 120,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" alignContent="center" gap={1}>
                    {getRoleIcon(params.value)}
                    <Chip
                        label={params.value}
                        color={getRoleColor(params.value)}
                        size="small"
                        variant="outlined"
                    />
                </Box>
            )
        },
        {
            field: 'department',
            headerName: 'Department',
            width: 190,
            renderCell: (params) => (
                <Chip
                    label={params.value ? params.value : 'Not Assigned'}
                    color={params.value ? "info" : "warning"}
                    size="small"
                    variant="outlined"
                />
            )
        },
        {
            field: 'position',
            headerName: 'Position',
            width: 160,
            renderCell: (params) => (
                params.value ? params.value : 'Not Assigned'
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            alignItems: 'center',
            width: 100,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" gap={1}>
                    {getStatusIcon(params.value === true ? 'active' : 'inactive')}
                    {/* <Chip
                        label={params.value === true ? 'active' : 'inactive'}
                        color={getStatusColor(params.value === true ? 'active' : 'inactive')}
                        size="small"
                        variant="outlined"
                    /> */}
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

    return (
        <Container maxWidth="xl" sx={{ py: 4, height: '100vh' }} disableGutters>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Back to Dashboard
            </Button>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Employee Management</Typography>
                <TextField
                    fullWidth
                    sx={{ maxWidth: { md: 400 } }}
                    placeholder="Search employees by name, email, role, department, or position..."
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
                <Button variant="contained" startIcon={<Add />} onClick={() => {
                    setCurrentEmployee({
                        name: '',
                        email: '',
                        phone: '',
                        role: '',
                        department: '',
                        position: '',
                        status: true,
                        profilePicture: null,
                        profilePictureType: null
                    });
                    setImagePreview(null);
                    setSelectedImage(null);
                    setErrors({});
                    setSubmitError('');
                    setOpenDialog(true);
                }}>
                    Add Employee
                </Button>
            </Box>

            {/* DataGrid */}
            <Box sx={{ height: 'calc(100vh - 250px)', width: '100%' }}>
                <DataGrid
                    rows={filteredEmployees}
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
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                />
            </Box>

            {/* Add/Edit Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { minHeight: '60vh' }
                }}
            >
                <DialogTitle>
                    {currentEmployee.id ? `Edit Employee: ${currentEmployee.name}` : 'Add New Employee'}
                </DialogTitle>
                <DialogContent>
                    {submitError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {submitError}
                        </Alert>
                    )}

                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Profile Picture Upload */}
                        <Box display="flex" alignItems="center" gap={3} mb={2}>
                            <Avatar
                                src={imagePreview}
                                sx={{ width: 80, height: 80, cursor: 'pointer' }}
                                onClick={() => document.getElementById('profile-picture-upload').click()}
                            >
                                {!imagePreview && <Person sx={{ fontSize: 40 }} />}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1">Profile Picture</Typography>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="profile-picture-upload"
                                    type="file"
                                    onChange={handleImageUpload}
                                />
                                <label htmlFor="profile-picture-upload">
                                    <Button
                                        component="span"
                                        startIcon={<Upload />}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Upload Image
                                    </Button>
                                </label>
                                {errors.profilePicture && (
                                    <Typography color="error" variant="caption">
                                        {errors.profilePicture}
                                    </Typography>
                                )}
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Recommended: Square image, max 5MB
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Full Name *"
                                    value={currentEmployee.name}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                                    fullWidth
                                    required
                                    margin="normal"
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Email Address *"
                                    type="email"
                                    value={currentEmployee.email}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                                    fullWidth
                                    required
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Phone Number"
                                    value={currentEmployee.phone}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, phone: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Select
                                    value={currentEmployee.department}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, department: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.department}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>Select Department *</em>
                                    </MenuItem>
                                    {departments.map((dept) => (
                                        <MenuItem key={dept.id} value={dept.name}>
                                            {dept.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.department && (
                                    <Typography color="error" variant="caption">
                                        {errors.department}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Select
                                    value={currentEmployee.position || ''}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, position: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>Select Position (Optional)</em>
                                    </MenuItem>
                                    {positions.map((position) => (
                                        <MenuItem key={position.id} value={position.name}>
                                            {position.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Select
                                    value={currentEmployee.role}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, role: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.role}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>Select Role *</em>
                                    </MenuItem>
                                    {employeeRoles.map((role) => (
                                        <MenuItem key={role.id} value={role.name}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                {getRoleIcon(role.name)}
                                                {role.name}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.role && (
                                    <Typography color="error" variant="caption">
                                        {errors.role}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Password *"
                                    value={currentEmployee.password}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, password: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={currentEmployee.status === true}
                                    onChange={(e) => setCurrentEmployee({
                                        ...currentEmployee,
                                        status: e.target.checked
                                    })}
                                />
                            }
                            label={`Status: ${currentEmployee.status === true ? 'Active' : 'Inactive'}`}
                            sx={{ mt: 2, width: "170px" }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {currentEmployee.id ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};