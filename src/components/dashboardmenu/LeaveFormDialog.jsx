// components/common/LeaveFormDialog.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    Paper,
    Container,
    IconButton,
    Stepper,
    Step,
    StepLabel,
    Alert,
    Card,
    CardContent,
    Divider,
    Grid,
    FormControlLabel,
    Checkbox,
    Autocomplete
} from '@mui/material';
import {
    Close,
    ArrowBack,
    CheckCircle,
    CalendarToday,
    Person
} from '@mui/icons-material';
import { leaveFailure } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeProfileList } from '../../services/AppConfigAction';

export const LeaveFormDialog = ({
    open,
    onClose,
    onSubmit,
    initialData = null,
    title = "Leave Request",
    submitText = "Submit",
    showStatusField = false,
    mode = 'dialog', // 'dialog' or 'page'
    viewMode = false,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Get prefill data from location state if in page mode
    const locationPrefill = location.state?.prefillData;

    const [formData, setFormData] = useState({
        leaveId: 0,
        employeeId: 0,
        employeeName: '',
        leaveType: 'Vacation',
        startDate: '',
        endDate: '',
        reason: '',
        status: 'pending',
        isHalfDay: false,
        durationType: 'fullDay', // 'fullDay' or 'halfDay'
        startDateHalf: 'morning', // 'morning' or 'afternoon'
        endDateHalf: 'morning' // 'morning' or 'afternoon'
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    // Add these to your component state
    const [allEmployees, setAllEmployees] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const loadAllData = async () => {
        try {
            await Promise.all([
                loadProfileData(),
            ]);
        } catch (error) {
            console.error('Error loading profile data:', error);
        }
    };

    const loadProfileData = async () => {
        try {
            const result = await dispatch(getEmployeeProfileList());
            // console.log('Profile API result:', result);

            if (result.type === "EMP_INFO_LIST" && result.payload && Array.isArray(result.payload) && result.payload.length > 0) {
                const currentUserId = user?.id;
                const userRole = user?.role;

                // Transform API data
                const employees = result.payload.map(emp => ({
                    id: emp.id,
                    employeeId: emp.employeeId || emp.id,
                    name: emp.name || emp.employeeName || 'Unknown',
                    department: emp.department || 'Not Specified',
                    role: emp.role || 'employee'
                }));

                // console.log('Transformed employees:', employees);
                setAllEmployees(employees);

                // Determine if user is admin
                const adminStatus = userRole === 'admin' || user?.isAdmin === true;
                setIsAdmin(adminStatus);

                // console.log('User is admin:', adminStatus, 'User role:', userRole);

                // For non-admin users, auto-select their profile
                if (!adminStatus) {
                    let userProfileData = null;
                    if (currentUserId) {
                        userProfileData = employees.find(emp =>
                            emp.id === currentUserId ||
                            emp.employeeId === currentUserId
                        );
                    }

                    if (!userProfileData && employees.length > 0) {
                        userProfileData = employees[0];
                        console.warn('Could not find exact user profile, using first available');
                    }

                    if (userProfileData) {
                        // console.log('Setting employee for non-admin:', userProfileData);
                        setSelectedEmployee(userProfileData);
                        setFormData(prev => ({
                            ...prev,
                            employeeId: userProfileData.employeeId,
                            employeeName: userProfileData.name
                        }));
                    }
                }
            } else {
                console.error('No profile data found in API response or invalid format');
                setAllEmployees([]);
            }
        } catch (error) {
            console.error('Error loading profile data:', error);
            setAllEmployees([]);
        }
    };

    // Load all data
    useEffect(() => {
        loadAllData();
    }, []);

    // Initialize form
    useEffect(() => {
        // console.log('Initializing form with:', {
        //     initialData,
        //     locationPrefill,
        //     allEmployeesLength: allEmployees.length,
        //     selectedEmployee
        // });

        const dataToUse = initialData || locationPrefill;
        if (dataToUse) {
            // console.log('Data to use:', dataToUse);

            // Find employee in the allEmployees array
            let employee = null;
            if (allEmployees.length > 0) {
                employee = allEmployees.find(emp => {
                    const matches = (
                        emp.employeeId === parseInt(dataToUse.employeeId) ||
                        emp.employeeId === dataToUse.employeeId ||
                        emp.name === dataToUse.employeeName
                    );
                    // console.log('Checking employee:', emp, 'matches:', matches);
                    return matches;
                });
            }

            // console.log('Found employee for edit/view:', employee);

            setFormData({
                leaveId: dataToUse.leaveId || 0,
                employeeId: dataToUse.employeeId || 0,
                employeeName: dataToUse.employeeName || '',
                leaveType: dataToUse.leaveType || 'Vacation',
                startDate: dataToUse.startDate || '',
                endDate: dataToUse.endDate || '',
                reason: dataToUse.reason || '',
                status: dataToUse.status || 'pending',
                isHalfDay: dataToUse.isHalfDay === 't' || dataToUse.isHalfDay === true,
                // Calculate duration type based on API data
                durationType: (dataToUse.isHalfDay === 't' || dataToUse.isHalfDay === true ||
                    dataToUse.totalDays === "0.5") ? 'halfDay' : 'fullDay',
                startDateHalf: dataToUse.halfDayPeriod || 'morning',
                endDateHalf: 'morning' // Default value
            });

            if (employee) {
                setSelectedEmployee(employee);
                // console.log('Set selected employee:', employee);
            } else if (dataToUse.employeeName && dataToUse.employeeId) {
                // Create a temporary employee object if not found in allEmployees
                const tempEmployee = {
                    id: dataToUse.employeeId,
                    employeeId: dataToUse.employeeId,
                    name: dataToUse.employeeName,
                    department: 'Not Available',
                    role: 'employee'
                };
                setSelectedEmployee(tempEmployee);
                // console.log('Created temp employee:', tempEmployee);
            }
        } else {
            // Reset form for new leave
            // console.log('Resetting form for new leave');
            setFormData({
                leaveId: 0,
                employeeId: 0,
                employeeName: '',
                leaveType: 'Vacation',
                startDate: '',
                endDate: '',
                reason: '',
                status: 'pending',
                isHalfDay: false,
                durationType: 'fullDay',
                startDateHalf: 'morning',
                endDateHalf: 'morning'
            });
            // Don't reset selectedEmployee if it's already set for non-admin user
            if (isAdmin) {
                setSelectedEmployee(null);
            }
        }
        setErrors({});
        setSubmitted(false);
        setActiveStep(0);
    }, [open, initialData, locationPrefill]); // Remove allEmployees from dependencies

    // Handle when allEmployees loads
    useEffect(() => {
        if (allEmployees.length > 0 && !selectedEmployee && !isAdmin) {
            // Auto-select current user's profile for non-admin
            const currentUserId = user?.id;
            let userProfileData = allEmployees.find(emp =>
                emp.id === currentUserId ||
                emp.employeeId === currentUserId
            );

            if (!userProfileData && allEmployees.length > 0) {
                userProfileData = allEmployees[0];
            }

            if (userProfileData) {
                setSelectedEmployee(userProfileData);
                setFormData(prev => ({
                    ...prev,
                    employeeId: userProfileData.employeeId,
                    employeeName: userProfileData.name
                }));
                // console.log('Auto-set employee after allEmployees loaded:', userProfileData);
            }
        }
    }, [allEmployees, isAdmin, user, selectedEmployee]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.employeeId || !formData.employeeName) {
            newErrors.employee = 'Please select an employee';
        }
        if (!formData.startDate) newErrors.startDate = 'Start date is required';

        // Only validate end date if it's full day leave
        if (formData.durationType === 'fullDay' && !formData.endDate) {
            newErrors.endDate = 'End date is required for full day leave';
        }

        if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            newErrors.endDate = 'End date must be after start date';
        }
        if (!formData.reason.trim()) newErrors.reason = 'Reason is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEmployeeSelect = (event, value) => {
        if (value) {
            setSelectedEmployee(value);
            setFormData(prev => ({
                ...prev,
                employeeId: value.employeeId,
                employeeName: value.name
            }));
            if (errors.employee) {
                setErrors(prev => ({ ...prev, employee: '' }));
            }
        } else {
            setSelectedEmployee(null);
            setFormData(prev => ({
                ...prev,
                employeeId: '',
                employeeName: ''
            }));
        }
    };

    const handleDurationTypeChange = (event) => {
        const durationType = event.target.value;
        setFormData(prev => ({
            ...prev,
            durationType,
            isHalfDay: durationType === 'halfDay',
            // Auto-fill end date with start date for half day
            endDate: durationType === 'halfDay' ? prev.startDate : prev.endDate
        }));
    };

    const handleStartDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            startDate: date,
            // Auto-update end date if it's half day
            endDate: prev.durationType === 'halfDay' ? date : prev.endDate
        }));

        if (errors.startDate) {
            setErrors(prev => ({ ...prev, startDate: '' }));
        }
    };

    const handleHalfDayChange = (event) => {
        const isHalfDay = event.target.checked;
        setFormData(prev => ({
            ...prev,
            isHalfDay,
            durationType: isHalfDay ? 'halfDay' : 'fullDay',
            // Auto-fill end date with start date for half day
            endDate: isHalfDay ? prev.startDate : prev.endDate
        }));
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            // Calculate days based on duration leaveType
            let days = 0;
            if (formData.durationType === 'fullDay' && formData.startDate && formData.endDate) {
                const start = new Date(formData.startDate);
                const end = new Date(formData.endDate);
                days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            } else if (formData.durationType === 'halfDay' && formData.startDate) {
                days = 0.5; // Half day count as 0.5
            }

            // Prepare payload for API
            const payload = {
                leaveId: formData.leaveId,
                employeeId: formData.employeeId,
                employeeName: formData.employeeName,
                leaveType: formData.leaveType,
                startDate: formData.startDate,
                endDate: formData.durationType === 'halfDay' ? formData.startDate : formData.endDate,
                reason: formData.reason,
                status: formData.status || 'pending',
                isHalfDay: formData.durationType === 'halfDay',
                halfDayPeriod: formData.startDateHalf,
                totalDays: days,
                appliedDate: new Date().toISOString().split('T')[0],
                indicator: formData.leaveId ? 'update' : 'new'
            };

            // console.log('Leave Request Payload:', payload);

            if (mode === 'page') {

                const response = await onSubmit(payload);

                if (response.success) {
                    // Only set active step to 1 if API call was successful
                    setActiveStep(1);
                    setSubmitted(true);

                    // Auto-navigate back after submission
                    setTimeout(() => {
                        if (location.pathname) {
                            setActiveStep(0);
                            // Reset form for new leave
                            setFormData({
                                leaveId: 0,
                                employeeId: 0,
                                employeeName: '',
                                leaveType: 'Vacation',
                                startDate: '',
                                endDate: '',
                                reason: '',
                                status: 'pending',
                                isHalfDay: false,
                                durationType: 'fullDay',
                                startDateHalf: 'morning',
                                endDateHalf: 'morning'
                            });
                            setSelectedEmployee(null);
                        } else {
                            navigate(-1);
                        }
                    }, 2000);
                } else {
                    dispatch(leaveFailure(response.message || 'Failed to save employee'));
                }
            } else {
                // For dialog mode, wait for the API call
                const response = await onSubmit(payload);
                if (response.success && onClose) {
                    onClose();
                } else {
                    // Handle error in dialog mode
                    dispatch(leaveFailure(response.message || 'Failed to submit leave request'));
                }
            }
        }
    };

    const handleChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleClose = () => {
        if (mode === 'page') {
            setFormData({
                leaveId: 0,
                employeeId: 0,
                employeeName: '',
                leaveType: 'Vacation',
                startDate: '',
                endDate: '',
                reason: '',
                status: 'pending',
                isHalfDay: false,
                durationType: 'fullDay',
                startDateHalf: 'morning',
                endDateHalf: 'morning'
            });
            setSelectedEmployee(null);
        } else if (onClose) {
            onClose();
        }
    };

    // Calculate duration display
    const getDurationDisplay = () => {
        if (formData.durationType === 'halfDay' && formData.startDate) {
            return '0.5 day (Half Day)';
        } else if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            return `${days} day${days > 1 ? 's' : ''}`;
        }
        return '';
    };

    // Render as Page
    if (mode === 'page') {
        return (
            <Container maxWidth="lg">
                {/* Header */}
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Leave Request
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Submit a new leave request for approval
                            </Typography>
                        </Box>
                        {/* <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton> */}
                    </Box>

                    {/* Stepper */}
                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        <Step>
                            <StepLabel>Fill Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Confirmation</StepLabel>
                        </Step>
                    </Stepper>

                    {activeStep === 0 && (
                        <>
                            <Alert severity="info" sx={{ mb: 3 }}>
                                Please fill out all required fields. Your manager will review this request.
                            </Alert>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {/* Employee Selection */}
                                <FormControl fullWidth error={!!errors.employee}>
                                    {/* <Autocomplete
                                        options={selectedEmployee}
                                        getOptionLabel={(option) => `${option.name} [${option.employeeId}]`}
                                        value={selectedEmployee}
                                        onChange={handleEmployeeSelect}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Employee"
                                                required
                                                error={!!errors.employee}
                                                helperText={errors.employee}
                                            />
                                        )}
                                        renderOption={(props, option) => {
                                            const { key, ...restProps } = props;
                                            return (
                                                <li key={key} {...restProps}>
                                                    <Box>
                                                        <Typography variant="body1">{option.name}</Typography>
                                                        <Typography variant="caption" color="textSecondary">
                                                            ID: {option.employeeId} | Dept: {option.department}
                                                        </Typography>
                                                    </Box>
                                                </li>
                                            );
                                        }}
                                    />
                                    // For Autocomplete (employee selection) */}
                                    <Autocomplete
                                        options={allEmployees}
                                        getOptionLabel={(option) => `${option.name} [${option.employeeId}]`}
                                        value={selectedEmployee}
                                        onChange={handleEmployeeSelect}
                                        disabled={!isAdmin && !!selectedEmployee} // Disable for non-admins
                                        readOnly={!isAdmin} // Make read-only for non-admins
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Employee"
                                                required
                                                error={!!errors.employee}
                                                helperText={errors.employee}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    readOnly: !isAdmin, // Make input read-only for non-admins
                                                }}
                                            />
                                        )}
                                        renderOption={(props, option) => {
                                            const { key, ...restProps } = props;
                                            return (
                                                <li key={key} {...restProps}>
                                                    <Box>
                                                        <Typography variant="body1">{option.name}</Typography>
                                                        <Typography variant="caption" color="textSecondary">
                                                            ID: {option.employeeId} | Dept: {option.department} |
                                                            Role: {option.role || 'employee'}
                                                        </Typography>
                                                    </Box>
                                                </li>
                                            );
                                        }}
                                        isOptionEqualToValue={(option, value) => {
                                            // Handle null values
                                            if (!option || !value) return false;
                                            return option.employeeId === value.employeeId;
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>Leave Type</InputLabel>
                                    <Select
                                        value={formData.leaveType ?? ''}
                                        onChange={handleChange('leaveType')}
                                        label="Leave Type"
                                    >
                                        <MenuItem value="Unpaid">Unpaid</MenuItem>
                                        <MenuItem value="Vacation">Vacation</MenuItem>
                                        <MenuItem value="Sick">Sick</MenuItem>
                                        {/* <MenuItem value="Personal">Personal</MenuItem> */}
                                        <MenuItem value="Annual">Annual</MenuItem>
                                        <MenuItem value="Maternity">Maternity</MenuItem>
                                        <MenuItem value="Paternity">Paternity</MenuItem>
                                        <MenuItem value="Casual">Casual</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Duration Type Selection */}
                                <FormControl fullWidth>
                                    <InputLabel>Duration Type</InputLabel>
                                    <Select
                                        value={formData.durationType ?? ''}
                                        onChange={handleDurationTypeChange}
                                        label="Duration Type"
                                    >
                                        <MenuItem value="fullDay">Full Day</MenuItem>
                                        <MenuItem value="halfDay">Half Day</MenuItem>
                                    </Select>
                                </FormControl>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Start Date"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => handleStartDateChange(e.target.value)}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            error={!!errors.startDate}
                                            helperText={errors.startDate}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="End Date"
                                            type="date"
                                            value={formData.endDate}
                                            onChange={handleChange('endDate')}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            error={!!errors.endDate}
                                            helperText={errors.endDate}
                                            required={formData.durationType === 'fullDay'}
                                            disabled={formData.durationType === 'halfDay'}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Half Day Options */}
                                {formData.durationType === 'halfDay' && (
                                    <FormControl fullWidth>
                                        <InputLabel>Half Day Period</InputLabel>
                                        <Select
                                            value={formData.startDateHalf ?? ''}
                                            onChange={handleChange('startDateHalf')}
                                            label="Half Day Period"
                                        >
                                            <MenuItem value="morning">Morning (9 AM - 1 PM)</MenuItem>
                                            <MenuItem value="afternoon">Afternoon (2 PM - 6 PM)</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}

                                {getDurationDisplay() && (
                                    <Typography variant="body2" color="primary" fontWeight="medium">
                                        Total Duration: {getDurationDisplay()}
                                    </Typography>
                                )}

                                <TextField
                                    label="Reason"
                                    multiline
                                    rows={4}
                                    value={formData.reason}
                                    onChange={handleChange('reason')}
                                    fullWidth
                                    error={!!errors.reason}
                                    helperText={errors.reason}
                                    required
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                    <Button onClick={handleClose} color="inherit">
                                        Cancel
                                    </Button>
                                    <Button variant="contained" onClick={handleSubmit} size="large">
                                        {submitText}
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    )}

                    {activeStep === 1 && (
                        <Card>
                            <CardContent>
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                                    <Typography variant="h5" gutterBottom>
                                        Leave Request Submitted!
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" paragraph>
                                        Your request has been sent for approval. You will receive a confirmation email shortly.
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Redirecting you back...
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    )}
                </Paper>

                {/* Policy Info */}
                <Paper sx={{ p: 3, bgcolor: 'action.hover' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Leave Policy
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        • Submit requests at least 3 days in advance for planned leaves
                        <br />
                        • Emergency leaves can be requested on the same day
                        <br />
                        • You will receive email confirmation upon submission
                        <br />
                        • Half-day leaves count as 0.5 days
                    </Typography>
                </Paper>
            </Container>
        );
    }

    // Render as Dialog (default)
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Employee Selection */}
                    <FormControl fullWidth error={!!errors.employee}>
                        <Autocomplete
                            options={allEmployees}
                            getOptionLabel={(option) => `${option.name} [${option.employeeId}]`}
                            value={selectedEmployee}
                            onChange={handleEmployeeSelect}
                            disabled={viewMode}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Employee"
                                    required
                                    error={!!errors.employee}
                                    helperText={errors.employee}
                                />
                            )}
                            renderOption={(props, option) => {
                                const { key, ...restProps } = props;
                                return (
                                    <li key={key} {...restProps}>
                                        <Box>
                                            <Typography variant="body1">{option.name}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                ID: {option.employeeId} | Dept: {option.department}
                                            </Typography>
                                        </Box>
                                    </li>
                                );
                            }}
                            isOptionEqualToValue={(option, value) => {
                                // Handle null values
                                if (!option || !value) return false;
                                return option.employeeId === value.employeeId;
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Leave Type</InputLabel>
                        <Select
                            value={formData.leaveType ?? ''}
                            onChange={handleChange('leaveType')}
                            label="Leave Type"
                            disabled={viewMode}
                        >
                            <MenuItem value="Unpaid">Unpaid</MenuItem>
                            <MenuItem value="Vacation">Vacation</MenuItem>
                            <MenuItem value="Sick">Sick</MenuItem>
                            {/* <MenuItem value="Personal">Personal</MenuItem> */}
                            <MenuItem value="Annual">Annual</MenuItem>
                            <MenuItem value="Maternity">Maternity</MenuItem>
                            <MenuItem value="Paternity">Paternity</MenuItem>
                            <MenuItem value="Casual">Casual</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Duration Type with Checkbox */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.durationType === 'halfDay'}
                                    onChange={handleHalfDayChange}
                                    color="primary"
                                />
                            }
                            label="Half Day Leave"
                            disabled={viewMode}
                        />
                        <Typography variant="body2" color="textSecondary">
                            (Check for half day, leave unchecked for full day)
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Start Date"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => handleStartDateChange(e.target.value)}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.startDate}
                                helperText={errors.startDate}
                                required
                                disabled={viewMode}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="End Date"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange('endDate')}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.endDate}
                                helperText={errors.endDate}
                                required={formData.durationType === 'fullDay'}
                                disabled={formData.durationType === 'halfDay' || viewMode}
                            />
                        </Grid>
                    </Grid>

                    {/* Half Day Options */}
                    {formData.durationType === 'halfDay' && (
                        <FormControl fullWidth>
                            <InputLabel>Half Day Period</InputLabel>
                            <Select
                                value={formData.startDateHalf ?? ''}
                                onChange={handleChange('startDateHalf')}
                                label="Half Day Period"
                                disabled={viewMode}
                            >
                                <MenuItem value="morning">Morning (9 AM - 1 PM)</MenuItem>
                                <MenuItem value="afternoon">Afternoon (2 PM - 6 PM)</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {getDurationDisplay() && (
                        <Typography variant="body2" color="primary" fontWeight="medium">
                            Total Duration: {getDurationDisplay()}
                        </Typography>
                    )}

                    <TextField
                        label="Reason"
                        multiline
                        rows={3}
                        value={formData.reason}
                        onChange={handleChange('reason')}
                        fullWidth
                        error={!!errors.reason}
                        helperText={errors.reason}
                        required
                        disabled={viewMode}
                    />

                    {showStatusField && (
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={formData.status ?? ''}
                                onChange={handleChange('status')}
                                label="Status"
                                disabled={viewMode}
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="approved">Approved</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit"
                    sx={{ border: '1px solid grey', '&:hover': { color: '#157aecff' } }}>
                    {viewMode ? 'Close' : 'Cancel'}
                </Button>
                {!viewMode && ( // Only show submit button if not in view mode
                    <Button variant="contained" onClick={handleSubmit}>
                        {submitText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
export default LeaveFormDialog;