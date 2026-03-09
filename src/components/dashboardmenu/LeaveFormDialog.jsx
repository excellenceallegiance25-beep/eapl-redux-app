import { CheckCircle } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import eaplRotatingLogo from "../../assets/images/EAPLfavicon.png";
import useLoading from "../../redux/slices/useLoading";
import { leaveFailure } from "../../redux/slices/userSlice";
import { getEmployeeProfileList } from "../../services/AppConfigAction";

export const LeaveFormDialog = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
  title = "Leave Request",
  submitText = "Submit",
  showStatusField = false,
  mode = "dialog", // 'dialog' or 'page'
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
    employeeName: "",
    leaveType: "Vacation",
    startDate: "",
    endDate: "",
    reason: "",
    status: "pending",
    isHalfDay: false,
    durationType: "fullDay", // 'fullDay' or 'halfDay'
    startDateHalf: "morning", // 'morning' or 'afternoon'
    endDateHalf: "morning", // 'morning' or 'afternoon'
    rejectionReason: "", // New field for rejection reason
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allEmployees, setAllEmployees] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { showLoader, hideLoader, withLoader } = useLoading(); // Get loading functions

  const loadAllData = async () => {
    try {
      await Promise.all([loadProfileData()]);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  const loadProfileDataFFF = async () => {
    try {
      showLoader(eaplRotatingLogo, 0);
      const result = await dispatch(getEmployeeProfileList());

      if (
        result.type === "EMP_INFO_LIST" &&
        result.payload &&
        Array.isArray(result.payload) &&
        result.payload.length > 0
      ) {
        const currentUserId = user?.id;
        const userRole = user?.role;

        // Transform API data
        const employees = result.payload.map((emp) => ({
          id: emp.id,
          employeeId: emp.employeeId || emp.id,
          name: emp.name || emp.employeeName || "Unknown",
          department: emp.department || "Not Specified",
          role: emp.role || "employee",
        }));

        // setAllEmployees(employees);

        // Add dummy option for admin
        const employeesWithDefault = adminStatus
          ? [
              {
                id: 0,
                employeeId: 0,
                name: "Select Employee",
                department: "",
                role: "",
              },
              ...employees,
            ]
          : employees;

        setAllEmployees(employeesWithDefault);

        // Determine if user is admin
        const adminStatus = userRole === "admin" || user?.isAdmin === true;
        setIsAdmin(adminStatus);

        // For non-admin users, auto-select their profile
        if (!adminStatus) {
          let userProfileData = null;
          if (currentUserId) {
            userProfileData = employees.find(
              (emp) =>
                emp.id === currentUserId || emp.employeeId === currentUserId,
            );
          }

          if (!userProfileData && employees.length > 0) {
            userProfileData = employees[0];
            console.warn(
              "Could not find exact user profile, using first available",
            );
          }

          if (userProfileData) {
            setSelectedEmployee(userProfileData);
            setFormData((prev) => ({
              ...prev,
              employeeId: userProfileData.employeeId,
              employeeName: userProfileData.name,
            }));
          }
        }
      } else {
        console.error(
          "No profile data found in API response or invalid format",
        );
        setAllEmployees([]);
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
      setAllEmployees([]);
    } finally {
      hideLoader();
    }
  };

  const loadProfileData = async () => {
    try {
      showLoader(eaplRotatingLogo, 0);

      const result = await dispatch(getEmployeeProfileList());

      if (
        result.type === "EMP_INFO_LIST" &&
        result.payload &&
        Array.isArray(result.payload) &&
        result.payload.length > 0
      ) {
        const currentUserId = user?.id;
        const userRole = user?.role;

        // ⭐ DEFINE FIRST (IMPORTANT)
        const adminStatus = userRole === "admin" || user?.isAdmin === true;

        setIsAdmin(adminStatus);

        // Transform API data
        const employees = result.payload.map((emp) => ({
          id: emp.id,
          employeeId: emp.employeeId || emp.id,
          name: emp.name || emp.employeeName || "Unknown",
          department: emp.department || "Not Specified",
          role: emp.role || "employee",
        }));

        // ⭐ Now safe to use adminStatus
        const employeesWithDefault = adminStatus
          ? [
              {
                id: 0,
                employeeId: 0,
                name: "Select Employee",
                department: "",
                role: "",
              },
              ...employees,
            ]
          : employees;

        setAllEmployees(employeesWithDefault);

        // ⭐ Auto-select only for non-admin
        if (!adminStatus) {
          let userProfileData = employees.find(
            (emp) =>
              emp.id === currentUserId || emp.employeeId === currentUserId,
          );

          if (!userProfileData && employees.length > 0) {
            userProfileData = employees[0];
          }

          if (userProfileData) {
            setSelectedEmployee(userProfileData);

            setFormData((prev) => ({
              ...prev,
              employeeId: userProfileData.employeeId,
              employeeName: userProfileData.name,
            }));
          }
        }
      } else {
        setAllEmployees([]);
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
      setAllEmployees([]);
    } finally {
      hideLoader();
    }
  };

  // Load all data
  useEffect(() => {
    loadAllData();
  }, []);

  // Initialize form
  useEffect(() => {
    const dataToUse = initialData || locationPrefill;
    if (dataToUse) {
      // Find employee in the allEmployees array
      let employee = null;
      if (allEmployees.length > 0) {
        employee = allEmployees.find((emp) => {
          const matches =
            emp.employeeId === parseInt(dataToUse.employeeId) ||
            emp.employeeId === dataToUse.employeeId ||
            emp.name === dataToUse.employeeName;
          return matches;
        });
      }

      setFormData({
        leaveId: dataToUse.leaveId || 0,
        employeeId: dataToUse.employeeId || 0,
        employeeName: dataToUse.employeeName || "",
        leaveType: dataToUse.leaveType || "Vacation",
        startDate: dataToUse.startDate || "",
        endDate: dataToUse.endDate || "",
        reason: dataToUse.reason || "",
        status: dataToUse.status || "pending",
        isHalfDay: dataToUse.isHalfDay === "t" || dataToUse.isHalfDay === true,
        durationType:
          dataToUse.isHalfDay === "t" ||
          dataToUse.isHalfDay === true ||
          dataToUse.totalDays === "0.5"
            ? "halfDay"
            : "fullDay",
        startDateHalf: dataToUse.halfDayPeriod || "morning",
        endDateHalf: "morning",
        rejectionReason: dataToUse.rejectionReason || "", // Initialize rejection reason
      });

      if (employee) {
        setSelectedEmployee(employee);
      } else if (dataToUse.employeeName && dataToUse.employeeId) {
        const tempEmployee = {
          id: dataToUse.employeeId,
          employeeId: dataToUse.employeeId,
          name: dataToUse.employeeName,
          department: "Not Available",
          role: "employee",
        };
        setSelectedEmployee(tempEmployee);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        leaveId: 0,
        employeeId: isAdmin ? 0 : prev.employeeId,
        employeeName: isAdmin ? "" : prev.employeeName,
        leaveType: "Vacation",
        startDate: "",
        endDate: "",
        reason: "",
        status: "pending",
        isHalfDay: false,
        durationType: "fullDay",
        startDateHalf: "morning",
        endDateHalf: "morning",
        rejectionReason: "",
      }));

      if (isAdmin) {
        setSelectedEmployee(null);
      }
    }
    setErrors({});
    setSubmitted(false);
    setActiveStep(0);
  }, [open, initialData, locationPrefill]);

  // Handle when allEmployees loads
  useEffect(() => {
    if (allEmployees.length > 0 && !selectedEmployee && !isAdmin) {
      const currentUserId = user?.id;
      let userProfileData = allEmployees.find(
        (emp) => emp.id === currentUserId || emp.employeeId === currentUserId,
      );

      if (!userProfileData && allEmployees.length > 0) {
        userProfileData = allEmployees[0];
      }

      if (userProfileData) {
        setSelectedEmployee(userProfileData);
        setFormData((prev) => ({
          ...prev,
          employeeId: userProfileData.employeeId,
          employeeName: userProfileData.name,
        }));
      }
    }
  }, [allEmployees, isAdmin, user, selectedEmployee]);

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.employeeId) {
    //   newErrors.employee = "Please select an employee";
    // }
    if (!formData.employeeId || formData.employeeId === 0) {
      newErrors.employee = "Please select an employee";
    }
    if (!formData.startDate) newErrors.startDate = "Start date is required";

    if (formData.durationType === "fullDay" && !formData.endDate) {
      newErrors.endDate = "End date is required for full day leave";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";

    // Validate rejection reason if status is rejected
    if (formData.status === "rejected" && !formData.rejectionReason.trim()) {
      newErrors.rejectionReason =
        "Rejection reason is required when rejecting a leave request";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmployeeSelectFFF = (event, value) => {
    if (value) {
      setSelectedEmployee(value);
      setFormData((prev) => ({
        ...prev,
        employeeId: value.employeeId,
        employeeName: value.name,
      }));
      if (errors.employee) {
        setErrors((prev) => ({ ...prev, employee: "" }));
      }
    } else {
      setSelectedEmployee(null);
      setFormData((prev) => ({
        ...prev,
        employeeId: "",
        employeeName: "",
      }));
    }
  };

  const handleEmployeeSelect = (event, value) => {
    if (value) {
      setSelectedEmployee(value);

      setFormData((prev) => ({
        ...prev,
        employeeId: Number(value.employeeId),
        employeeName: value.name,
      }));

      setErrors((prev) => ({
        ...prev,
        employee: "",
      }));
    } else {
      setSelectedEmployee(null);

      setFormData((prev) => ({
        ...prev,
        employeeId: 0,
        employeeName: "",
      }));
    }
  };

  const handleDurationTypeChange = (event) => {
    const durationType = event.target.value;
    setFormData((prev) => ({
      ...prev,
      durationType,
      isHalfDay: durationType === "halfDay",
      endDate: durationType === "halfDay" ? prev.startDate : prev.endDate,
    }));
  };

  const handleStartDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      startDate: date,
      endDate: prev.durationType === "halfDay" ? date : prev.endDate,
    }));

    if (errors.startDate) {
      setErrors((prev) => ({ ...prev, startDate: "" }));
    }
  };

  const handleHalfDayChange = (event) => {
    const isHalfDay = event.target.checked;
    setFormData((prev) => ({
      ...prev,
      isHalfDay,
      durationType: isHalfDay ? "halfDay" : "fullDay",
      endDate: isHalfDay ? prev.startDate : prev.endDate,
    }));
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setFormData((prev) => ({
      ...prev,
      status,
      // Clear rejection reason when status is not rejected
      rejectionReason: status !== "rejected" ? "" : prev.rejectionReason,
    }));

    if (status !== "rejected" && errors.rejectionReason) {
      setErrors((prev) => ({ ...prev, rejectionReason: "" }));
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      let days = 0;
      if (
        formData.durationType === "fullDay" &&
        formData.startDate &&
        formData.endDate
      ) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      } else if (formData.durationType === "halfDay" && formData.startDate) {
        days = 0.5;
      }

      // Prepare payload for API
      const payload = {
        leaveId: formData.leaveId,
        employeeId: formData.employeeId,
        employeeName: formData.employeeName,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate:
          formData.durationType === "halfDay"
            ? formData.startDate
            : formData.endDate,
        reason: formData.reason,
        status: formData.status || "pending",
        isHalfDay: formData.durationType === "halfDay",
        halfDayPeriod: formData.startDateHalf,
        totalDays: days,
        appliedDate: new Date().toISOString().split("T")[0],
        indicator: formData.leaveId ? "update" : "new",
        rejectionReason: formData.rejectionReason || null, // Add rejection reason to payload
      };

      if (mode === "page") {
        showLoader(eaplRotatingLogo, 0);
        const response = await onSubmit(payload);
        if (response.success) {
          setActiveStep(1);
          setSubmitted(true);

          setTimeout(() => {
            if (location.pathname) {
              setActiveStep(0);
              setFormData({
                leaveId: 0,
                employeeId: 0,
                employeeName: "",
                leaveType: "Vacation",
                startDate: "",
                endDate: "",
                reason: "",
                status: "pending",
                isHalfDay: false,
                durationType: "fullDay",
                startDateHalf: "morning",
                endDateHalf: "morning",
                rejectionReason: "",
              });
              setSelectedEmployee(null);
            } else {
              navigate(-1);
            }
          }, 2000);
        } else {
          dispatch(leaveFailure(response.message || "Failed to save employee"));
        }
        hideLoader();
      } else {
        showLoader(eaplRotatingLogo, 0);
        const response = await onSubmit(payload);
        if (response.success && onClose) {
          onClose();
        } else {
          dispatch(
            leaveFailure(response.message || "Failed to submit leave request"),
          );
        }
        hideLoader();
      }
    }
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleClose = () => {
    if (mode === "page") {
      setFormData({
        leaveId: 0,
        employeeId: 0,
        employeeName: "",
        leaveType: "Vacation",
        startDate: "",
        endDate: "",
        reason: "",
        status: "pending",
        isHalfDay: false,
        durationType: "fullDay",
        startDateHalf: "morning",
        endDateHalf: "morning",
        rejectionReason: "",
      });
      setSelectedEmployee(null);
    } else if (onClose) {
      onClose();
    }
  };

  // Calculate duration display
  const getDurationDisplay = () => {
    if (formData.durationType === "halfDay" && formData.startDate) {
      return "0.5 day (Half Day)";
    } else if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return `${days} day${days > 1 ? "s" : ""}`;
    }
    return "";
  };

  const sectionCard = {
    p: 3,
    mb: 3,
    borderRadius: 3,
    backgroundColor: "#fff",
    boxShadow: "0 12px 30px rgba(15,42,68,0.08)",
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "#f9fbff",
    },
  };

  const durationBadge = {
    mt: 2,
    px: 2,
    py: 0.8,
    borderRadius: 2,
    backgroundColor: "rgba(79,195,247,0.15)",
    fontWeight: 600,
    width: "fit-content",
  };

  const successCard = {
    p: 6,
    borderRadius: 3,
    textAlign: "center",
    background: "linear-gradient(180deg, #ffffff, #f1f7ff)",
  };

  const SectionTitle = ({ title }) => (
    <>
      <Typography variant="subtitle1" fontWeight={600}>
        {title}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );

  // Render as Page
  if (mode === "page") {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          // background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 100%)',
        }}
      >
        {/* ================= HEADER + STEPPER ================= */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 12px 30px rgba(15,42,68,0.08)",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Leave Request
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Submit a new leave request for approval
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Fill Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirmation</StepLabel>
            </Step>
          </Stepper>
        </Paper>

        {/* ================= STEP 1 ================= */}
        {activeStep === 0 && (
          <>
            <Alert
              icon={false}
              sx={{
                mb: 3,
                borderRadius: 2,
                backgroundColor: "rgba(79,195,247,0.12)",
                color: "#0f2a44",
              }}
            >
              Please fill out all required fields. Your manager will review this
              request.
            </Alert>

            {/* ========= EMPLOYEE INFO ========= */}
            <Paper sx={sectionCard}>
              <SectionTitle title="Employee Information" />

              <FormControl fullWidth error={!!errors.employee}>
                <Autocomplete
                  options={allEmployees}
                  value={selectedEmployee}
                  getOptionLabel={(o) => `${o.name} [${o.employeeId}]`}
                  onChange={handleEmployeeSelect}
                  disabled={!isAdmin && !!selectedEmployee}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Employee"
                      required
                      error={!!errors.employee}
                      helperText={errors.employee}
                      sx={inputStyle}
                      InputProps={{
                        ...params.InputProps,
                        readOnly: !isAdmin,
                      }}
                    />
                  )}
                />
              </FormControl>
            </Paper>

            {/* ========= LEAVE DETAILS ========= */}
            <Paper sx={sectionCard}>
              <SectionTitle title="Leave Details" />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Leave Type</InputLabel>
                    <Select
                      value={formData.leaveType ?? ""}
                      onChange={handleChange("leaveType")}
                      label="Leave Type"
                      sx={inputStyle}
                    >
                      {[
                        "Unpaid",
                        "Vacation",
                        "Sick",
                        "Annual",
                        "Maternity",
                        "Paternity",
                        "Casual",
                      ].map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Duration Type</InputLabel>
                    <Select
                      value={formData.durationType ?? ""}
                      onChange={handleDurationTypeChange}
                      label="Duration Type"
                      sx={inputStyle}
                    >
                      <MenuItem value="fullDay">Full Day</MenuItem>
                      <MenuItem value="halfDay">Half Day</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* ========= DATE SECTION ========= */}
            <Paper sx={sectionCard}>
              <SectionTitle title="Leave Duration" />

              <Grid
                container
                spacing={2}
                sx={{
                  backgroundColor: "rgba(15,42,68,0.04)",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    type="date"
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    required
                    sx={inputStyle}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    type="date"
                    label="End Date"
                    value={formData.endDate}
                    onChange={handleChange("endDate")}
                    InputLabelProps={{ shrink: true }}
                    disabled={formData.durationType === "halfDay"}
                    fullWidth
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    required={formData.durationType === "fullDay"}
                    sx={inputStyle}
                  />
                </Grid>
              </Grid>

              {formData.durationType === "halfDay" && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Half Day Period</InputLabel>
                  <Select
                    value={formData.startDateHalf ?? ""}
                    onChange={handleChange("startDateHalf")}
                    label="Half Day Period"
                    sx={inputStyle}
                  >
                    <MenuItem value="morning">Morning (9 AM – 1 PM)</MenuItem>
                    <MenuItem value="afternoon">
                      Afternoon (2 PM – 6 PM)
                    </MenuItem>
                  </Select>
                </FormControl>
              )}

              {getDurationDisplay() && (
                <Box sx={durationBadge}>
                  Total Duration: {getDurationDisplay()}
                </Box>
              )}
            </Paper>

            {/* ========= REASON & STATUS ========= */}
            <Paper sx={sectionCard}>
              <SectionTitle title="Reason & Approval" />

              <TextField
                label="Reason"
                multiline
                rows={4}
                fullWidth
                required
                error={!!errors.reason}
                helperText={errors.reason}
                value={formData.reason}
                onChange={handleChange("reason")}
                sx={inputStyle}
              />

              {showStatusField && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status ?? ""}
                    onChange={handleStatusChange}
                    label="Status"
                    sx={inputStyle}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              )}

              <Collapse in={formData.status === "rejected"}>
                <TextField
                  label="Rejection Reason"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!errors.rejectionReason}
                  helperText={errors.rejectionReason}
                  required={formData.status === "rejected"}
                  placeholder="Please provide a reason for rejecting this leave request..."
                  value={formData.rejectionReason}
                  onChange={handleChange("rejectionReason")}
                  sx={{
                    ...inputStyle,
                    mt: 2,
                    backgroundColor: "rgba(244,67,54,0.04)",
                  }}
                />
              </Collapse>
            </Paper>

            {/* ========= ACTION BAR ========= */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mt: 3,
                borderRadius: 3,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Button color="inherit" onClick={handleClose}>
                Reset
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                {submitText}
              </Button>
            </Paper>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {activeStep === 1 && (
          <Card sx={successCard}>
            <CheckCircle sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
            <Typography variant="h5">Leave Request Submitted</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Your request has been sent for approval.
            </Typography>
          </Card>
        )}
      </Container>
    );
  }

  // Render as Dialog (default)
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          color: "#f2eaea",
          background: "#25747b",
          fontWeight: "bold",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Employee Selection */}
          <FormControl fullWidth error={!!errors.employee}>
            <Autocomplete
              // options={allEmployees}
              clearOnBlur={false}
              options={allEmployees.filter((emp) => emp.employeeId !== 0)}
              getOptionLabel={(option) =>
                `${option.name} [${option.employeeId}]`
              }
              value={selectedEmployee}
              disableClearable
              onChange={handleEmployeeSelect}
              disabled={viewMode || title === "Edit Leave" ? true : false}
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
                if (!option || !value) return false;
                return option.employeeId === value.employeeId;
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Leave Type</InputLabel>
            <Select
              value={formData.leaveType ?? ""}
              onChange={handleChange("leaveType")}
              label="Leave Type"
              disabled={viewMode}
            >
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Vacation">Vacation</MenuItem>
              <MenuItem value="Sick">Sick</MenuItem>
              <MenuItem value="Annual">Annual</MenuItem>
              <MenuItem value="Maternity">Maternity</MenuItem>
              <MenuItem value="Paternity">Paternity</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
            </Select>
          </FormControl>

          {/* Duration Type with Checkbox */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.durationType === "halfDay"}
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
                onChange={handleChange("endDate")}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.endDate}
                helperText={errors.endDate}
                required={formData.durationType === "fullDay"}
                disabled={formData.durationType === "halfDay" || viewMode}
              />
            </Grid>
          </Grid>

          {formData.durationType === "halfDay" && (
            <FormControl fullWidth>
              <InputLabel>Half Day Period</InputLabel>
              <Select
                value={formData.startDateHalf ?? ""}
                onChange={handleChange("startDateHalf")}
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
            onChange={handleChange("reason")}
            fullWidth
            error={!!errors.reason}
            helperText={errors.reason}
            required
            disabled={viewMode}
          />

          {showStatusField && (
            <>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status ?? ""}
                  onChange={handleStatusChange}
                  label="Status"
                  disabled={viewMode}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>

              {/* Rejection Reason Field - Only shown when status is 'rejected' */}
              <Collapse in={formData.status === "rejected"}>
                <TextField
                  label="Rejection Reason"
                  multiline
                  rows={3}
                  value={formData.rejectionReason}
                  onChange={handleChange("rejectionReason")}
                  fullWidth
                  error={!!errors.rejectionReason}
                  helperText={errors.rejectionReason}
                  required={formData.status === "rejected"}
                  disabled={viewMode}
                  placeholder="Please provide a reason for rejecting this leave request..."
                />
              </Collapse>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="inherit"
          sx={{ border: "1px solid grey", "&:hover": { color: "#157aecff" } }}
        >
          {viewMode ? "Close" : "Cancel"}
        </Button>
        {!viewMode && (
          <Button variant="contained" onClick={handleSubmit}>
            {submitText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default LeaveFormDialog;
