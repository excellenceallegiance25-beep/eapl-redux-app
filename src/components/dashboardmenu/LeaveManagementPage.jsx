// components/dashboardmenu/LeaveManagementPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select
} from '@mui/material';
import {
    ArrowBack,
    Add,
    Edit,
    Delete,
    CheckCircle,
    Cancel,
    Search
} from '@mui/icons-material';

export const LeaveManagementPage = () => {
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([
        { id: 1, employee: 'John Doe', type: 'Vacation', startDate: '2024-01-20', endDate: '2024-01-25', days: 5, status: 'pending', reason: 'Family vacation' },
        { id: 2, employee: 'Jane Smith', type: 'Sick Leave', startDate: '2024-01-15', endDate: '2024-01-16', days: 2, status: 'approved', reason: 'Medical appointment' },
        { id: 3, employee: 'Bob Johnson', type: 'Personal', startDate: '2024-01-30', endDate: '2024-01-30', days: 1, status: 'rejected', reason: 'Personal work' },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [currentLeave, setCurrentLeave] = useState({
        employee: '',
        type: 'Vacation',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleApprove = (id) => {
        setLeaves(leaves.map(leave =>
            leave.id === id ? { ...leave, status: 'approved' } : leave
        ));
    };

    const handleReject = (id) => {
        setLeaves(leaves.map(leave =>
            leave.id === id ? { ...leave, status: 'rejected' } : leave
        ));
    };

    const handleEdit = (leave) => {
        setCurrentLeave(leave);
        setOpenDialog(true);
    };

    const handleDelete = (id) => {
        setLeaves(leaves.filter(leave => leave.id !== id));
    };

    const handleSubmit = () => {
        if (currentLeave.id) {
            // Update existing
            setLeaves(leaves.map(leave =>
                leave.id === currentLeave.id ? currentLeave : leave
            ));
        } else {
            // Add new
            const newLeave = {
                ...currentLeave,
                id: leaves.length + 1,
                status: 'pending',
                days: Math.ceil((new Date(currentLeave.endDate) - new Date(currentLeave.startDate)) / (1000 * 60 * 60 * 24)) + 1
            };
            setLeaves([...leaves, newLeave]);
        }
        setOpenDialog(false);
        setCurrentLeave({ employee: '', type: 'Vacation', startDate: '', endDate: '', reason: '' });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'success';
            case 'pending': return 'warning';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }} disableGutters>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Back to Dashboard
            </Button>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Leave Management</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
                    Add Leave
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Dates</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaves.map((leave) => (
                            <TableRow key={leave.id}>
                                <TableCell>{leave.id}</TableCell>
                                <TableCell>{leave.employee}</TableCell>
                                <TableCell>{leave.type}</TableCell>
                                <TableCell>{leave.startDate} to {leave.endDate}</TableCell>
                                <TableCell>{leave.days}</TableCell>
                                <TableCell>
                                    <Chip label={leave.status} color={getStatusColor(leave.status)} size="small" />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        {leave.status === 'pending' && (
                                            <>
                                                <Button size="small" color="success" onClick={() => handleApprove(leave.id)}>
                                                    Approve
                                                </Button>
                                                <Button size="small" color="error" onClick={() => handleReject(leave.id)}>
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        <Button size="small" onClick={() => handleEdit(leave)}>
                                            Edit
                                        </Button>
                                        <Button size="small" color="error" onClick={() => handleDelete(leave.id)}>
                                            Delete
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{currentLeave.id ? 'Edit Leave' : 'Add Leave'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400 }}>
                        <TextField
                            label="Employee"
                            value={currentLeave.employee}
                            onChange={(e) => setCurrentLeave({ ...currentLeave, employee: e.target.value })}
                            fullWidth
                        />
                        <Select
                            value={currentLeave.type}
                            onChange={(e) => setCurrentLeave({ ...currentLeave, type: e.target.value })}
                            fullWidth
                        >
                            <MenuItem value="Vacation">Vacation</MenuItem>
                            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                            <MenuItem value="Personal">Personal</MenuItem>
                            <MenuItem value="Emergency">Emergency</MenuItem>
                        </Select>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={currentLeave.startDate}
                            onChange={(e) => setCurrentLeave({ ...currentLeave, startDate: e.target.value })}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            value={currentLeave.endDate}
                            onChange={(e) => setCurrentLeave({ ...currentLeave, endDate: e.target.value })}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Reason"
                            multiline
                            rows={3}
                            value={currentLeave.reason}
                            onChange={(e) => setCurrentLeave({ ...currentLeave, reason: e.target.value })}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {currentLeave.id ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};