// components/dashboardmenu/LeaveManagementPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Button,
    Typography,
    Paper,
    Chip,
    Stack,
    IconButton,
    Tooltip,
    Alert,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Checkbox
} from '@mui/material';
import {
    ArrowBack,
    Add,
    Edit,
    Delete,
    CheckCircle,
    Cancel,
    OpenInNew,
    Search,
    Refresh
} from '@mui/icons-material';
import { LeaveFormDialog } from './LeaveFormDialog';
import { useDispatch } from 'react-redux';
import { getEmpAppliedLeaveList, manageLeaveRequest } from '../../services/AppConfigAction';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import eaplRotatingLogo from '../../assets/images/EAPLfavicon.jpg';
import useLoading from '../../redux/slices/useLoading';

export const LeaveManagementPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showLoader, hideLoader, withLoader } = useLoading(); // Get loading functions

    useEffect(() => {
        const loadConfigs = async () => {
            showLoader(eaplRotatingLogo, 0);
            setLoading(true);
            try {
                await loadLeaveDetails();
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
                hideLoader();
            }

            // try {
            //     const result = await dispatch(getEmpAppliedLeaveList());
            //     console.log('Leave Details loaded successfully', 'success');
            //     if (result.type === "LEAVE_LIST") {
            //         // Ensure data matches the expected structure
            //         const formattedServices = result.payload.dataList.map(service => ({
            //             ...service,
            //             // // Ensure status is in correct format
            //             // status: service.status === true || service.status === 'active' ? 'active' : 'inactive'
            //         }));
            //         setLeaves(formattedServices);
            //     }
            // } catch (error) {
            //     console.error('Error loading services:', error);
            // }
        };

        loadConfigs();
    }, [dispatch]);

    const loadLeaveDetails = async () => {
        try {
            const result = await dispatch(getEmpAppliedLeaveList());
            // console.log('Leave Details loaded successfully', 'success');
            if (result.type === "LEAVE_LIST") {
                // Ensure data matches the expected structure
                const formattedServices = result.payload.dataList
                    .map(service => ({ ...service }))
                    .sort((a, b) => parseInt(b.leaveId) - parseInt(a.leaveId));

                setLeaves(formattedServices);
            }
        } catch (error) {
            console.error('Error loading services:', error);
        }
    };


    // Initial data
    // const initialLeaves = [
    //     {
    //         leaveId: 1,
    //         employee: 'John Doe',
    //         employeeId: 'EMP001',
    //         type: 'Vacation',
    //         startDate: '2024-01-20',
    //         endDate: '2024-01-25',
    //         totalDays: 5,
    //         status: 'pending',
    //         reason: 'Family vacation',
    //         appliedDate: '2024-01-15',
    //         approvedBy: null,
    //         approvedDate: null
    //     },
    //     {
    //         leaveId: 2,
    //         employee: 'Jane Smith',
    //         employeeId: 'EMP002',
    //         type: 'Sick Leave',
    //         startDate: '2024-01-15',
    //         endDate: '2024-01-16',
    //         totalDays: 2,
    //         status: 'approved',
    //         reason: 'Medical appointment',
    //         appliedDate: '2024-01-10',
    //         approvedBy: 'Manager Name',
    //         approvedDate: '2024-01-12'
    //     },
    //     {
    //         leaveId: 3,
    //         employee: 'Bob Johnson',
    //         employeeId: 'EMP003',
    //         type: 'Personal',
    //         startDate: '2024-01-30',
    //         endDate: '2024-01-30',
    //         totalDays: 1,
    //         status: 'rejected',
    //         reason: 'Personal work',
    //         appliedDate: '2024-01-25',
    //         approvedBy: 'Manager Name',
    //         approvedDate: '2024-01-26'
    //     },
    //     {
    //         leaveId: 4,
    //         employee: 'Alice Williams',
    //         employeeId: 'EMP004',
    //         type: 'Emergency',
    //         startDate: '2024-02-01',
    //         endDate: '2024-02-01',
    //         totalDays: 0.5,
    //         status: 'pending',
    //         reason: 'Urgent family matter',
    //         appliedDate: '2024-01-31',
    //         approvedBy: null,
    //         approvedDate: null,
    //         isHalfDay: true,
    //         halfDayPeriod: 'morning'
    //     },
    // ];


    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentLeave, setCurrentLeave] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1000);

    const handleFormSubmit = async (leaveData) => {
        try {
            // Determine if it's an update or new leave
            const isUpdate = currentLeave?.leaveId;

            // Call API
            const result = await dispatch(manageLeaveRequest(leaveData));

            if (result?.type === "EMP_APPLY_LEAVE_SUCCESS") {
                // API call succeeded, now update local state

                // if (isUpdate) {
                //     // Update existing leave in local state
                //     setLeaves(prevLeaves => prevLeaves.map(leave =>
                //         leave.leaveId === currentLeave.leaveId ? {
                //             ...leaveData,
                //             leaveId: currentLeave.leaveId,
                //             // Preserve fields that shouldn't change during update
                //             appliedDate: leave.appliedDate,
                //             approvedBy: leave.approvedBy,
                //             approvedDate: leave.approvedDate,
                //             status: leaveData.status || leave.status
                //         } : leave
                //     ));
                // }
                // else {
                //     // Add new leave to local state
                //     const newLeave = {
                //         ...leaveData,
                //         // Use leaveId from API response if available, otherwise generate one
                //         leaveId: result.payload?.leaveId || (leaves.length + 1),
                //         status: 'pending',
                //         appliedDate: new Date().toISOString().split('T')[0],
                //         approvedBy: null,
                //         approvedDate: null
                //     };
                //     setLeaves(prevLeaves => [newLeave, ...prevLeaves]);
                // }

                // Clean up
                await loadLeaveDetails();
                setCurrentLeave(null);
                setDialogOpen(false);

                // Show success message if available
                if (result.payload?.message) {
                    // Show notification
                    // console.log('Success:', result.payload.message);
                }

                return { success: true, message: result.payload?.message || 'Leave request submitted successfully' };; // Indicate success
            } else {
                // API call failed
                console.error('Leave submission failed:', result.payload?.message);
                return { success: false, message: result.payload?.message || 'Operation failed' };
            }
        } catch (error) {
            console.error('Error in handleFormSubmit:', error);
            return { success: false, message: error.message || 'Operation failed' };
        }
    };

    const handleApprove = (leaveId) => {
        setLeaves(leaves.map(leave =>
            leave.leaveId === leaveId ? {
                ...leave,
                status: 'approved',
                approvedBy: 'Current User',
                approvedDate: new Date().toISOString().split('T')[0]
            } : leave
        ));
    };

    const handleReject = (leaveId) => {
        setLeaves(leaves.map(leave =>
            leave.leaveId === leaveId ? {
                ...leave,
                status: 'rejected',
                approvedBy: 'Current User',
                approvedDate: new Date().toISOString().split('T')[0]
            } : leave
        ));
    };

    const handleEdit = (leave) => {
        setCurrentLeave(leave);
        setDialogOpen(true);
    };

    const handleDelete = async (leaveId) => {
        // Get leave details for better confirmation message
        const leaveToDelete = leaves.find(leave => leave.leaveId === leaveId);

        const result = await Swal.fire({
            title: 'Are you sure?',
            html: `
            <div style="text-align: left; padding: 10px;">
                <p>You are about to delete this leave request:</p>
                <p><strong>Employee:</strong> ${leaveToDelete?.employeeName || 'N/A'}</p>
                <p><strong>Leave Type:</strong> ${leaveToDelete?.leaveType || 'N/A'}</p>
                <p><strong>Period:</strong> ${leaveToDelete?.startDate} to ${leaveToDelete?.endDate}</p>
                <p><strong>Status:</strong> ${leaveToDelete?.status || 'N/A'}</p>
            </div>
        `,
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
                leaveId: leaveId,
                indicator: 'delete',
                employeeId: leaveToDelete?.employeeId,
                employeeName: leaveToDelete?.employeeName
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

            // Call your API
            const apiResult = await dispatch(manageLeaveRequest(payload));

            if (apiResult?.type === "EMP_APPLY_LEAVE_SUCCESS") {
                // Remove from local state
                setLeaves(prev => prev.filter(leave => leave.leaveId !== leaveId));

                // Show success
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Leave request has been deleted successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: apiResult.payload?.message || 'Failed to delete leave request',
                });
                // You could set an error state if needed
            }
        } catch (error) {
            console.error('Error deleting leave:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message || 'Failed to delete leave request',
            });
        }
    };

    const handleBulkDelete = () => {
        setLeaves(leaves.filter(leave => !selectedRows.includes(leave.leaveId)));
        setSelectedRows([]);
    };

    const handleBulkApprove = () => {
        setLeaves(leaves.map(leave =>
            selectedRows.includes(leave.leaveId) ? {
                ...leave,
                status: 'approved',
                approvedBy: 'Current User',
                approvedDate: new Date().toISOString().split('T')[0]
            } : leave
        ));
        setSelectedRows([]);
    };

    const handleBulkReject = () => {
        setLeaves(leaves.map(leave =>
            selectedRows.includes(leave.leaveId) ? {
                ...leave,
                status: 'rejected',
                approvedBy: 'Current User',
                approvedDate: new Date().toISOString().split('T')[0]
            } : leave
        ));
        setSelectedRows([]);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelected = filteredLeaves.map((n) => n.leaveId);
            setSelectedRows(newSelected);
            return;
        }
        setSelectedRows([]);
    };

    const handleSelectRow = (leaveId) => {
        const selectedIndex = selectedRows.indexOf(leaveId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, leaveId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }

        setSelectedRows(newSelected);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusChip = (status) => {
        const colors = {
            approved: { bgcolor: '#e8f5e9', color: '#2e7d32' },
            pending: { bgcolor: '#fff3e0', color: '#f57c00' },
            rejected: { bgcolor: '#ffebee', color: '#c62828' }
        };

        const style = colors[status] || { bgcolor: '#f5f5f5', color: '#757575' };

        return (
            <Chip
                label={status.toUpperCase()}
                size="small"
                sx={{
                    bgcolor: style.bgcolor,
                    color: style.color,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    minWidth: 80
                }}
            />
        );
    };

    const getDurationDisplay = (row) => {
        if (row.isHalfDay === 't') {
            return `${row.totalDays} day (Half Day - ${row.halfDayPeriod === 'morning' ? 'Morning' : 'Afternoon'})`;
        }
        return `${row.totalDays} day${row.totalDays > 1 ? 's' : ''}`;
    };

    const openAsPage = (leave = null) => {
        if (leave) {
            navigate('/leave-request', {
                state: {
                    prefillData: leave,
                    returnTo: '/dashboard/leaves'
                }
            });
        } else {
            navigate('/leave-request', {
                state: { returnTo: '/dashboard/leaves' }
            });
        }
    };

    // Quick fix - just convert employeeId to string
    const filteredLeaves = useMemo(() =>
        leaves.filter(leave =>
            (leave.employeeName || '').toLowerCase().includes(searchText.toLowerCase()) ||
            String(leave.employeeId || '').includes(searchText) || // Fixed here
            (leave.leaveType || '').toLowerCase().includes(searchText.toLowerCase()) ||
            (leave.reason || '').toLowerCase().includes(searchText.toLowerCase()) ||
            (leave.status || '').toLowerCase().includes(searchText.toLowerCase())
        ),
        [leaves, searchText]
    );

    // Calculate statistics
    const stats = useMemo(() => ({
        total: leaves.length,
        pending: leaves.filter(l => l.status === 'pending').length,
        approved: leaves.filter(l => l.status === 'approved').length,
        rejected: leaves.filter(l => l.status === 'rejected').length
    }), [leaves]);

    // Handle stat click - just update search text
    const handleStatClick = (status) => {
        if (searchText === status) {
            // If already searching for this status, clear it
            setSearchText('');
        } else {
            // Set search text to the status
            setSearchText(status);
        }
        setPage(0);
    };

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Get current page data
    const paginatedLeaves = filteredLeaves.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const isSelected = (leaveId) => selectedRows.indexOf(leaveId) !== -1;

    return (
        <Container maxWidth="xl" disableGutters >
            {/* Header */}
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Back to Dashboard
            </Button>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
                mb: 3
            }}>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#053c54' }}>
                    Leave Management
                </Typography>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    width: { xs: '100%', sm: 'auto' },
                    justifyContent: { xs: 'flex-end', sm: 'flex-start' }
                }}>
                    <Button
                        variant="contained"
                        startIcon={<Add sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                        onClick={() => {
                            setCurrentLeave(null);
                            setDialogOpen(true);
                        }}
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                            minWidth: { xs: '100%', sm: '140px' }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Add sx={{ display: { xs: 'inline-flex', sm: 'none' }, fontSize: '20px' }} />
                            <span>Add Leave</span>
                        </Box>
                    </Button>
                </Box>
            </Box>

            {/* Stats Bar */}
            <Box display="flex" gap={2} mb={2} flexWrap="wrap">
                <Paper sx={{ p: 1, flex: 1, minWidth: 150, textAlign: 'center' }}
                    onClick={() => setSearchText('')}>
                    <Typography variant="h6" color="primary">{stats.total}</Typography>
                    <Typography variant="body2" color="textSecondary">Total Leaves</Typography>
                </Paper>
                <Paper sx={{ p: 1, flex: 1, minWidth: 150, textAlign: 'center', bgcolor: '#eadfcf' }}
                    onClick={() => setSearchText(innerText => innerText === 'pending' ? '' : 'pending')}>
                    <Typography variant="h6" color="warning.main">{stats.pending}</Typography>
                    <Typography variant="body2" color="textSecondary">Pending</Typography>
                </Paper>
                <Paper sx={{ p: 1, flex: 1, minWidth: 150, textAlign: 'center', bgcolor: '#aedea9' }}
                    onClick={() => setSearchText(innerText => innerText === 'approved' ? '' : 'approved')}>
                    <Typography variant="h6" color="success.main">{stats.approved}</Typography>
                    <Typography variant="body2" color="textSecondary">Approved</Typography>
                </Paper>
                <Paper sx={{ p: 1, flex: 1, minWidth: 150, textAlign: 'center', bgcolor: '#eeb9b9' }}
                    onClick={() => setSearchText(innerText => innerText === 'rejected' ? '' : 'rejected')}>
                    <Typography variant="h6" color="error.main">{stats.rejected}</Typography>
                    <Typography variant="body2" color="textSecondary">Rejected</Typography>
                </Paper>
            </Box>

            {/* Bulk Actions Bar */}
            {/* {selectedRows.length > 0 && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: 'action.selected' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1">
                            {selectedRows.length} leave{selectedRows.length > 1 ? 's' : ''} selected
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircle />}
                                onClick={handleBulkApprove}
                            >
                                Approve All
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="error"
                                startIcon={<Cancel />}
                                onClick={handleBulkReject}
                            >
                                Reject All
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                onClick={handleBulkDelete}
                            >
                                Delete All
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setSelectedRows([])}
                            >
                                Clear Selection
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            )} */}

            {/* Search Bar */}
            <Paper sx={{ p: 1, mb: 3 }} elevation={3}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    gap: 2
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        width: { xs: '100%', sm: 'auto' },
                        flex: { sm: 1 }
                    }}>
                        <Search color="action" sx={{ display: { xs: 'none', sm: 'block' } }} />
                        <TextField
                            fullWidth
                            placeholder="Search by employee, ID, type, or status..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: (
                                    <Search
                                        color="action"
                                        sx={{
                                            mr: 1,
                                            display: { xs: 'block', sm: 'none' } // Show icon inside input on mobile
                                        }}
                                    />
                                ),
                            }}
                            sx={{
                                '& .MuiInput-root': {
                                    fontSize: { xs: '14px', sm: '16px' }
                                }
                            }}
                        />
                    </Box>

                    <Button
                        startIcon={<Refresh />}
                        variant="outlined"
                        size="medium"
                        onClick={() => {
                            setSearchText('');
                            setSelectedRows([]);
                            setPage(0);
                        }}
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                            minWidth: { sm: '120px' }
                        }}
                    >
                        Refresh
                    </Button>
                </Box>
            </Paper>

            <Box sx={{
                width: '100%',
                height: { xs: 'calc(100vh-150px)', lg: 'calc(100vh - 260px)' },
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <TableContainer
                    component={Paper}
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        '& .MuiTable-root': {
                            tableLayout: 'fixed', // This fixes column widths
                        }
                    }}
                >
                    <Table stickyHeader size="medium">
                        <TableHead sx={{
                            '& .MuiTableCell-head': {
                                backgroundColor: '#6288a6',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                borderBottom: '2px solid #5cb8ff',
                            }
                        }}>
                            <TableRow>
                                {/* Fixed widths for all columns */}
                                <TableCell
                                    align="center"
                                    sx={{
                                        width: '100px', // Fixed width
                                        minWidth: '180px', // Minimum width
                                        maxWidth: '80px', // Maximum width
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    Leave ID
                                </TableCell>

                                <TableCell
                                    sx={{
                                        width: '180px',
                                        minWidth: '180px',
                                        maxWidth: '180px',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    Employee Name
                                </TableCell>

                                <TableCell
                                    align="left"
                                    sx={{
                                        width: '120px',
                                        minWidth: '120px',
                                        maxWidth: '120px',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    Leave Type
                                </TableCell>

                                <TableCell
                                    align="left"
                                    sx={{
                                        width: '250px',
                                        minWidth: '250px',
                                        maxWidth: '280px',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    Date Range
                                </TableCell>

                                <TableCell
                                    align="left"
                                    sx={{
                                        width: '180px',
                                        minWidth: '180px',
                                        maxWidth: '180px',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    Duration
                                </TableCell>

                                <TableCell
                                    align="left"
                                    sx={{
                                        width: '180px',
                                        minWidth: '150px',
                                        maxWidth: '100px',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    Status
                                </TableCell>

                                <TableCell
                                    align="left"
                                    sx={{
                                        width: '120px',
                                        minWidth: '120px',
                                        maxWidth: '120px',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    Applied On
                                </TableCell>

                                <TableCell
                                    align="left"
                                    sx={{
                                        width: '130px',
                                        minWidth: '130px',
                                        maxWidth: '130px',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedLeaves.length > 0 ? (
                                paginatedLeaves.map((leave) => {
                                    const isItemSelected = isSelected(leave.leaveId);
                                    return (
                                        <TableRow
                                            key={leave.leaveId}
                                            hover
                                            selected={isItemSelected}
                                            onClick={() => handleSelectRow(leave.leaveId)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            {/* Body cells with same fixed widths */}
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    width: '80px',
                                                    minWidth: '80px',
                                                    maxWidth: '80px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                <Typography variant="body2" fontWeight="bold" noWrap>
                                                    #{leave.leaveId}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: '180px',
                                                    minWidth: '180px',
                                                    maxWidth: '180px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="body2" fontWeight="medium" noWrap>
                                                        {leave.employeeName}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary" noWrap>
                                                        ID: {leave.employeeId}
                                                    </Typography>
                                                </Box>
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: '120px',
                                                    minWidth: '120px',
                                                    maxWidth: '120px',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Chip
                                                    label={leave.leaveType}
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                    sx={{ maxWidth: '100%' }}
                                                />
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: '280px',
                                                    minWidth: '280px',
                                                    maxWidth: '280px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="body2" noWrap>
                                                        {formatDate(leave.startDate)} &nbsp; to &nbsp; {formatDate(leave.endDate)}
                                                    </Typography>
                                                </Box>
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: '180px',
                                                    minWidth: '180px',
                                                    maxWidth: '180px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                <Typography variant="body2" fontWeight="medium" noWrap>
                                                    {getDurationDisplay(leave)}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: '100px',
                                                    minWidth: '100px',
                                                    maxWidth: '100px',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {getStatusChip(leave.status)}
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: '120px',
                                                    minWidth: '120px',
                                                    maxWidth: '120px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                <Typography variant="body2" noWrap>
                                                    {formatDate(leave.appliedDate)}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                onClick={(e) => e.stopPropagation()}
                                                sx={{
                                                    width: '130px',
                                                    minWidth: '130px',
                                                    maxWidth: '130px',
                                                }}
                                            >
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleEdit(leave)}
                                                        >
                                                            <Edit fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => handleDelete(leave.leaveId)}
                                                        >
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        {/* No data message */}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


            {/* Info Alert */}
            {/* <Alert severity="info" sx={{ mt: 3 }}>
                Showing {paginatedLeaves.length} of {filteredLeaves.length} leave request{filteredLeaves.length !== 1 ? 's' : ''}
                {selectedRows.length > 0 && ` • ${selectedRows.length} selected`}
            </Alert> */}

            {/* Dialog as Popup */}
            <LeaveFormDialog
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                    setCurrentLeave(null);
                }}
                onSubmit={handleFormSubmit}
                initialData={currentLeave}
                title={currentLeave ? 'Edit Leave' : 'Add Leave'}
                submitText={currentLeave ? 'Update' : 'Add'}
                showStatusField={!!currentLeave}
                mode="dialog"
                viewMode={false}
            />
        </Container>
    );
};