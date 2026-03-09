import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  ArrowBack,
  Save,
  Refresh,
  Search,
  Clear,
  Work,
  LocationOn,
  AttachMoney,
  Schedule,
  BusinessCenter,
  CheckCircle,
  Warning,
  Info,
  Person,
  Email,
  Phone,
  Description,
  CloudUpload,
  Download,
  FilePresent,
  Close,
  FilterAlt,
  Sort,
  Assessment,
  People,
  TrendingUp,
  Timeline,
  PieChart,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Snackbar,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Avatar,
  Divider,
  InputAdornment,
  Switch,
  FormControlLabel,
  Badge,
  Tabs,
  Tab,
  Fab,
  Zoom,
  Fade,
  Card,
  CardContent,
  CardActions,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  ButtonGroup,
  Menu,
  MenuItem as MenuItem2,
  AvatarGroup,
} from "@mui/material";

// Constants
const DEPARTMENT_OPTIONS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
  "Customer Support",
  "Research & Development",
];

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Temporary",
  "Freelance",
];

const WORK_TYPE_OPTIONS = ["Remote", "Hybrid", "Onsite"];

const EXPERIENCE_LEVELS = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Lead",
  "Manager",
  "Director",
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active", statusColor: "success" },
  { value: "draft", label: "Draft", statusColor: "warning" },
  { value: "closed", label: "Closed", statusColor: "error" },
  { value: "on-hold", label: "On Hold", statusColor: "info" },
];

const APPLICATION_STATUS_OPTIONS = [
  { value: "new", label: "New", color: "info" },
  { value: "reviewed", label: "Reviewed", color: "primary" },
  { value: "shortlisted", label: "Shortlisted", color: "success" },
  { value: "rejected", label: "Rejected", color: "error" },
  {
    value: "interview-scheduled",
    label: "Interview Scheduled",
    color: "warning",
  },
  { value: "interviewed", label: "Interviewed", color: "secondary" },
  { value: "offered", label: "Offered", color: "success" },
  { value: "hired", label: "Hired", color: "success" },
  { value: "withdrawn", label: "Withdrawn", color: "default" },
];

const CURRENCY_OPTIONS = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];
const SALARY_PERIOD_OPTIONS = ["hour", "month", "year"];

const JOB_TYPE_COLORS = {
  "Full-time": "#4CAF50",
  "Part-time": "#FF9800",
  Contract: "#2196F3",
  Internship: "#9C27B0",
  Temporary: "#FF5722",
  Freelance: "#795548",
};

// Mock data for initial development
const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior React Developer",
    department: "Engineering",
    type: "Full-time",
    workType: "Remote",
    location: "Bangalore, India",
    experience: "Senior Level",
    experienceYears: "5-8 years",
    salary: {
      min: 1800000,
      max: 2500000,
      currency: "INR",
      period: "year",
    },
    description:
      "We're looking for an experienced React developer to lead our frontend development team and build scalable web applications.",
    requirements:
      "5+ years of experience in frontend development\n3+ years of hands-on React experience\nStrong knowledge of Redux, Context API",
    responsibilities:
      "Lead the development of complex React applications\nMentor junior developers\nCollaborate with UX designers",
    niceToHave: "Experience with Next.js\nContributions to open source",
    status: "active",
    postedDate: "2024-01-15",
    applications: 12,
    views: 345,
    createdBy: "John Doe",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "UX/UI Designer",
    department: "Design",
    type: "Full-time",
    workType: "Hybrid",
    location: "Mumbai, India",
    experience: "Mid Level",
    experienceYears: "3-5 years",
    salary: {
      min: 1200000,
      max: 1800000,
      currency: "INR",
      period: "year",
    },
    description:
      "Join our creative team to design intuitive and beautiful user experiences for our global client base.",
    requirements:
      "3+ years of experience in UX/UI design\nProficiency in Figma\nStrong portfolio",
    responsibilities:
      "Create user-centered designs\nConduct user research\nDevelop wireframes",
    niceToHave: "Experience with motion design\nKnowledge of HTML/CSS",
    status: "active",
    postedDate: "2024-01-12",
    applications: 8,
    views: 234,
    createdBy: "Jane Smith",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-12",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    department: "Engineering",
    type: "Full-time",
    workType: "Remote",
    location: "Pune, India",
    experience: "Senior Level",
    experienceYears: "5-8 years",
    salary: {
      min: 2000000,
      max: 2800000,
      currency: "INR",
      period: "year",
    },
    description:
      "We need a DevOps engineer to build and maintain our cloud infrastructure and CI/CD pipelines.",
    requirements:
      "4+ years of DevOps experience\nStrong knowledge of Docker and Kubernetes\nExperience with Terraform",
    responsibilities:
      "Design and implement CI/CD pipelines\nManage cloud infrastructure\nImplement monitoring",
    niceToHave: "AWS/Azure certifications\nExperience with microservices",
    status: "draft",
    applications: 0,
    views: 89,
    createdBy: "John Doe",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
];

// Mock candidates data
const MOCK_CANDIDATES = [
  {
    id: "c1",
    jobId: "1",
    fullName: "Amit Sharma",
    email: "amit.sharma@example.com",
    phone: "9876543210",
    experience: "5-8",
    currentCompany: "Tech Mahindra",
    noticePeriod: "30",
    expectedSalary: "2200000",
    coverLetter:
      "I am excited to apply for the Senior React Developer position...",
    resumeUrl: "/resumes/amit-sharma.pdf",
    status: "shortlisted",
    appliedDate: "2024-01-16",
    skills: ["React", "Redux", "TypeScript", "Node.js"],
    rating: 4.5,
    interviews: [
      {
        round: 1,
        type: "Technical",
        date: "2024-01-20",
        feedback: "Good technical skills",
        status: "completed",
      },
      {
        round: 2,
        type: "HR",
        date: "2024-01-22",
        feedback: "Pending",
        status: "scheduled",
      },
    ],
    notes: "Strong candidate with 6 years of React experience",
  },
  {
    id: "c2",
    jobId: "1",
    fullName: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "9876543211",
    experience: "3-5",
    currentCompany: "Infosys",
    noticePeriod: "45",
    expectedSalary: "1800000",
    coverLetter: "I have been working with React for 4 years...",
    resumeUrl: "/resumes/priya-patel.pdf",
    status: "new",
    appliedDate: "2024-01-17",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    rating: 3.5,
    interviews: [],
    notes: "Good portfolio, needs technical assessment",
  },
  {
    id: "c3",
    jobId: "1",
    fullName: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "9876543212",
    experience: "5-8",
    currentCompany: "Amazon",
    noticePeriod: "60",
    expectedSalary: "2500000",
    coverLetter:
      "I am a Senior Frontend Engineer with 7 years of experience...",
    resumeUrl: "/resumes/rahul-verma.pdf",
    status: "interview-scheduled",
    appliedDate: "2024-01-15",
    skills: ["React", "Redux", "TypeScript", "Next.js", "GraphQL"],
    rating: 5,
    interviews: [
      {
        round: 1,
        type: "Technical",
        date: "2024-01-21",
        feedback: "Excellent",
        status: "completed",
      },
    ],
    notes: "Very strong candidate, fast-track process",
  },
  {
    id: "c4",
    jobId: "2",
    fullName: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "9876543213",
    experience: "3-5",
    currentCompany: "Adobe",
    noticePeriod: "30",
    expectedSalary: "1500000",
    coverLetter: "I am a UX Designer with 4 years of experience...",
    resumeUrl: "/resumes/neha-gupta.pdf",
    status: "reviewed",
    appliedDate: "2024-01-14",
    skills: ["Figma", "Adobe XD", "User Research", "Wireframing"],
    rating: 4,
    interviews: [],
    notes: "Portfolio review in progress",
  },
  {
    id: "c5",
    jobId: "2",
    fullName: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "9876543214",
    experience: "5-8",
    currentCompany: "Microsoft",
    noticePeriod: "45",
    expectedSalary: "2000000",
    coverLetter: "I have 6 years of experience in product design...",
    resumeUrl: "/resumes/vikram-singh.pdf",
    status: "rejected",
    appliedDate: "2024-01-13",
    skills: ["Figma", "Sketch", "Prototyping", "User Testing"],
    rating: 3,
    interviews: [],
    notes: "Experience doesn't match requirements",
  },
];

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`job-tabpanel-${index}`}
      aria-labelledby={`job-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Application Status Chip Component
const ApplicationStatusChip = ({ status }) => {
  const statusConfig =
    APPLICATION_STATUS_OPTIONS.find((s) => s.value === status) ||
    APPLICATION_STATUS_OPTIONS[0];
  return (
    <Chip
      label={statusConfig.label}
      size="small"
      color={statusConfig.color}
      sx={{ fontWeight: "medium", minWidth: 100 }}
    />
  );
};

// Candidate Card Component
const CandidateCard = ({ candidate, onView, onUpdateStatus, onDelete }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 48,
                height: 48,
              }}
            >
              {candidate.fullName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {candidate.fullName}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Email sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="caption">{candidate.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Phone sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="caption">{candidate.phone}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                <Chip
                  size="small"
                  label={`${candidate.experience} years`}
                  icon={<Work sx={{ fontSize: 14 }} />}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={candidate.currentCompany}
                  icon={<BusinessCenter sx={{ fontSize: 14 }} />}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={`₹${(candidate.expectedSalary / 100000).toFixed(1)}L`}
                  icon={<AttachMoney sx={{ fontSize: 14 }} />}
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1,
            }}
          >
            <ApplicationStatusChip status={candidate.status} />
            <Rating
              value={candidate.rating}
              readOnly
              size="small"
              precision={0.5}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {candidate.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem" }}
              />
            ))}
          </Box>
        </Box>

        <Collapse in={expanded}>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Cover Letter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {candidate.coverLetter}
            </Typography>

            {candidate.interviews.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Interview Progress
                </Typography>
                <Stepper orientation="vertical" size="small">
                  {candidate.interviews.map((interview, index) => (
                    <Step
                      key={index}
                      active={interview.status === "scheduled"}
                      completed={interview.status === "completed"}
                    >
                      <StepLabel>
                        <Typography variant="body2">
                          {interview.type} Round
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {interview.date} - {interview.feedback}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </>
            )}

            {candidate.notes && (
              <>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Notes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {candidate.notes}
                </Typography>
              </>
            )}
          </Box>
        </Collapse>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button
          size="small"
          startIcon={<Visibility />}
          onClick={() => onView(candidate)}
        >
          View Details
        </Button>
        <Button
          size="small"
          startIcon={<Description />}
          component="a"
          href={candidate.resumeUrl}
          target="_blank"
        >
          Resume
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
        <Box sx={{ flex: 1 }} />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={candidate.status}
            onChange={(e) => onUpdateStatus(candidate, e.target.value)}
            size="small"
          >
            {APPLICATION_STATUS_OPTIONS.map((option) => (
              <MenuItem2 key={option.value} value={option.value}>
                {option.label}
              </MenuItem2>
            ))}
          </Select>
        </FormControl>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(candidate)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

// Main Component
const CareerJobManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // State
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create"); // 'create', 'edit', 'view'
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candidatesDialogOpen, setCandidatesDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateDetailsOpen, setCandidateDetailsOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    type: "Full-time",
    workType: "Remote",
    location: "",
    experience: "",
    experienceYears: "",
    salary: {
      min: "",
      max: "",
      currency: "INR",
      period: "year",
    },
    description: "",
    requirements: "",
    responsibilities: "",
    niceToHave: "",
    status: "draft",
    skills: [],
    openings: 1,
    urgent: false,
    remote: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Table states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [tabValue, setTabValue] = useState(0);

  // Candidate filters
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateStatusFilter, setCandidateStatusFilter] = useState("all");
  const [candidateJobFilter, setCandidateJobFilter] = useState("all");

  // Load jobs and candidates on mount
  useEffect(() => {
    loadJobs();
    loadCandidates();
  }, []);

  // Filter jobs when filters change
  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, filterStatus, filterDepartment, tabValue]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      // In real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setJobs(MOCK_JOBS);
      setError(null);
    } catch (err) {
      setError("Failed to load jobs");
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCandidates = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCandidates(MOCK_CANDIDATES);
    } catch (err) {
      console.error("Error loading candidates:", err);
    }
  };

  const filterJobs = useCallback(() => {
    let filtered = [...jobs];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((job) => job.status === filterStatus);
    }

    // Filter by department
    if (filterDepartment !== "all") {
      filtered = filtered.filter((job) => job.department === filterDepartment);
    }

    // Filter by tab (status groups)
    if (tabValue === 0) {
      // All jobs
    } else if (tabValue === 1) {
      filtered = filtered.filter((job) => job.status === "active");
    } else if (tabValue === 2) {
      filtered = filtered.filter((job) => job.status === "draft");
    } else if (tabValue === 3) {
      filtered = filtered.filter((job) => job.status === "closed");
    }

    setFilteredJobs(filtered);
    setPage(0);
  }, [jobs, searchTerm, filterStatus, filterDepartment, tabValue]);

  const validateForm = () => {
    const errors = {};

    if (!formData.title?.trim()) {
      errors.title = "Job title is required";
    }

    if (!formData.department) {
      errors.department = "Department is required";
    }

    if (!formData.location?.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.experience) {
      errors.experience = "Experience level is required";
    }

    if (!formData.description?.trim()) {
      errors.description = "Job description is required";
    }

    if (
      formData.salary.min &&
      formData.salary.max &&
      Number(formData.salary.min) > Number(formData.salary.max)
    ) {
      errors.salary = "Minimum salary cannot be greater than maximum salary";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("salary.")) {
      const salaryField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setTouched((prev) => ({ ...prev, [name]: true }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleOpenCreate = () => {
    setDialogMode("create");
    setSelectedJob(null);
    setFormData({
      title: "",
      department: "",
      type: "Full-time",
      workType: "Remote",
      location: "",
      experience: "",
      experienceYears: "",
      salary: {
        min: "",
        max: "",
        currency: "INR",
        period: "year",
      },
      description: "",
      requirements: "",
      responsibilities: "",
      niceToHave: "",
      status: "draft",
      skills: [],
      openings: 1,
      urgent: false,
      remote: false,
    });
    setFormErrors({});
    setTouched({});
    setOpenDialog(true);
  };

  const handleOpenEdit = (job) => {
    setDialogMode("edit");
    setSelectedJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      type: job.type,
      workType: job.workType,
      location: job.location,
      experience: job.experience,
      experienceYears: job.experienceYears || "",
      salary: job.salary || {
        min: "",
        max: "",
        currency: "INR",
        period: "year",
      },
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      niceToHave: job.niceToHave || "",
      status: job.status,
      skills: job.skills || [],
      openings: job.openings || 1,
      urgent: job.urgent || false,
      remote: job.remote || false,
    });
    setOpenDialog(true);
  };

  const handleOpenView = (job) => {
    setDialogMode("view");
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleOpenDelete = (job) => {
    setSelectedJob(job);
    setDeleteDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedJob(null);
  };

  const handleOpenCandidates = (job) => {
    setSelectedJob(job);
    setCandidatesDialogOpen(true);
  };

  const handleCloseCandidates = () => {
    setCandidatesDialogOpen(false);
    setSelectedJob(null);
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setCandidateDetailsOpen(true);
  };

  const handleCloseCandidateDetails = () => {
    setCandidateDetailsOpen(false);
    setSelectedCandidate(null);
  };

  const handleUpdateCandidateStatus = async (candidate, newStatus) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === candidate.id ? { ...c, status: newStatus } : c,
        ),
      );
      setSuccess(`Candidate status updated to ${newStatus}`);
    } catch (err) {
      setError("Failed to update candidate status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCandidate = async (candidate) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${candidate.fullName}'s application?`,
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCandidates((prev) => prev.filter((c) => c.id !== candidate.id));
      setSuccess("Candidate application deleted successfully");
    } catch (err) {
      setError("Failed to delete candidate");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async () => {
    if (!validateForm()) {
      setSuccess(null);
      setError("Please fix the errors before saving");
      return;
    }

    setLoading(true);
    try {
      // In real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (dialogMode === "create") {
        const newJob = {
          id: Date.now().toString(),
          ...formData,
          postedDate: new Date().toISOString().split("T")[0],
          applications: 0,
          views: 0,
          createdBy: "Current User",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setJobs((prev) => [newJob, ...prev]);
        setSuccess("Job created successfully!");
      } else if (dialogMode === "edit" && selectedJob) {
        const updatedJob = {
          ...selectedJob,
          ...formData,
          updatedAt: new Date().toISOString(),
        };
        setJobs((prev) =>
          prev.map((job) => (job.id === selectedJob.id ? updatedJob : job)),
        );
        setSuccess("Job updated successfully!");
      }

      handleCloseDialog();
    } catch (err) {
      setError("Failed to save job");
      console.error("Error saving job:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async () => {
    if (!selectedJob) return;

    setLoading(true);
    try {
      // In real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setJobs((prev) => prev.filter((job) => job.id !== selectedJob.id));
      setSuccess("Job deleted successfully!");
      handleCloseDelete();
    } catch (err) {
      setError("Failed to delete job");
      console.error("Error deleting job:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicateJob = (job) => {
    const duplicatedJob = {
      ...job,
      id: Date.now().toString(),
      title: `${job.title} (Copy)`,
      status: "draft",
      applications: 0,
      views: 0,
      postedDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setJobs((prev) => [duplicatedJob, ...prev]);
    setSuccess("Job duplicated successfully!");
  };

  const handleStatusChange = async (job, newStatus) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? { ...j, status: newStatus, updatedAt: new Date().toISOString() }
            : j,
        ),
      );
      setSuccess(`Job status updated to ${newStatus}`);
    } catch (err) {
      setError("Failed to update job status");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterDepartment("all");
    setTabValue(0);
  };

  const getCandidatesForJob = (jobId) => {
    return candidates.filter((c) => c.jobId === jobId);
  };

  const getFilteredCandidates = () => {
    let filtered = candidates;

    if (selectedJob) {
      filtered = filtered.filter((c) => c.jobId === selectedJob.id);
    }

    if (candidateSearch) {
      filtered = filtered.filter(
        (c) =>
          c.fullName.toLowerCase().includes(candidateSearch.toLowerCase()) ||
          c.email.toLowerCase().includes(candidateSearch.toLowerCase()),
      );
    }

    if (candidateStatusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === candidateStatusFilter);
    }

    return filtered;
  };

  const getApplicationStats = (jobId) => {
    const jobCandidates = candidates.filter((c) => c.jobId === jobId);
    return {
      total: jobCandidates.length,
      new: jobCandidates.filter((c) => c.status === "new").length,
      shortlisted: jobCandidates.filter((c) => c.status === "shortlisted")
        .length,
      interviewed: jobCandidates.filter((c) => c.status === "interviewed")
        .length,
      rejected: jobCandidates.filter((c) => c.status === "rejected").length,
      hired: jobCandidates.filter((c) => c.status === "hired").length,
    };
  };

  const formatSalary = (salary) => {
    if (!salary || !salary.min || !salary.max) return "Not specified";

    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: salary.currency,
      maximumFractionDigits: 0,
    });

    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}/${salary.period}`;
  };

  const getStatusChip = (status) => {
    const statusConfig =
      STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[1];
    return (
      <Chip
        label={statusConfig.label}
        size="small"
        color={statusConfig.statusColor}
        sx={{ fontWeight: "medium" }}
      />
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          textAlign: "center",
          p: 3,
          color:"#294246"
        }}
      >
        Under Development.............
      </Box>

      <Box
        sx={{
          py: 10,
          // bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl">
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: 2,
              mb: 3,
            }}
          >
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Job Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create, edit, and manage job openings and track applicants
              </Typography>
            </Box>
          </Box> */}

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenCreate}
              size="large"
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Create New Job
            </Button>
          </Box>

          {/* Filters and Search */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              mb: 3,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search jobs by title, department, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setSearchTerm("")}
                        >
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    {STATUS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={filterDepartment}
                    label="Department"
                    onChange={(e) => setFilterDepartment(e.target.value)}
                  >
                    <MenuItem value="all">All Departments</MenuItem>
                    {DEPARTMENT_OPTIONS.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={loadJobs}
                    disabled={loading}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="text"
                    onClick={handleClearFilters}
                    disabled={
                      !searchTerm &&
                      filterStatus === "all" &&
                      filterDepartment === "all"
                    }
                  >
                    Clear Filters
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Tabs
                value={tabValue}
                onChange={(e, v) => setTabValue(v)}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons="auto"
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "0.9rem",
                    fontWeight: "medium",
                  },
                }}
              >
                <Tab label="All Jobs" />
                <Tab label="Active" />
                <Tab label="Drafts" />
                <Tab label="Closed" />
              </Tabs>
            </Box>
          </Paper>

          {/* Jobs Table */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              overflow: "hidden",
            }}
          >
            {loading && <LinearProgress />}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}
                  >
                    <TableCell>Job Title</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Applications</TableCell>
                    <TableCell>Posted Date</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredJobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job) => {
                      const stats = getApplicationStats(job.id);
                      return (
                        <TableRow key={job.id} hover>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {job.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                ID: {job.id}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={job.department}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <LocationOn
                                sx={{ fontSize: 14, color: "text.secondary" }}
                              />
                              <Typography variant="body2">
                                {job.location}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={job.type}
                              size="small"
                              sx={{
                                bgcolor:
                                  JOB_TYPE_COLORS[job.type] ||
                                  theme.palette.primary.main,
                                color: "white",
                              }}
                            />
                          </TableCell>
                          <TableCell>{getStatusChip(job.status)}</TableCell>
                          <TableCell align="center">
                            <Tooltip
                              title={`${stats.new} new, ${stats.shortlisted} shortlisted`}
                            >
                              <Badge
                                badgeContent={stats.total}
                                color="primary"
                                max={99}
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleOpenCandidates(job)}
                              >
                                <People color="action" />
                              </Badge>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {job.postedDate}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="center"
                            >
                              <Tooltip title="View Candidates">
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenCandidates(job)}
                                  color="secondary"
                                >
                                  <People fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View">
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenView(job)}
                                  color="info"
                                >
                                  <Visibility fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenEdit(job)}
                                  color="primary"
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenDelete(job)}
                                  color="error"
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Duplicate">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDuplicateJob(job)}
                                  color="default"
                                >
                                  <Add fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}

                  {filteredJobs.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                        <Work
                          sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                        />
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          gutterBottom
                        >
                          No Jobs Found
                        </Typography>
                        <Typography color="text.secondary" paragraph>
                          {searchTerm ||
                          filterStatus !== "all" ||
                          filterDepartment !== "all"
                            ? "Try adjusting your filters"
                            : "Create your first job posting to get started"}
                        </Typography>
                        {!searchTerm &&
                          filterStatus === "all" &&
                          filterDepartment === "all" && (
                            <Button
                              variant="contained"
                              startIcon={<Add />}
                              onClick={handleOpenCreate}
                            >
                              Create New Job
                            </Button>
                          )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={filteredJobs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>

          {/* Candidates Dialog */}
          <Dialog
            open={candidatesDialogOpen}
            onClose={handleCloseCandidates}
            maxWidth="md"
            fullWidth
            scroll="body"
            PaperProps={{
              sx: {
                borderRadius: 2,
                m: { xs: 1, sm: 2 },
                maxHeight: { xs: "98vh", md: "90vh" },
              },
            }}
          >
            <DialogTitle
              sx={{
                p: { xs: 2, md: 3 },
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <People />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight="bold">
                    Applicants for {selectedJob?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total {getCandidatesForJob(selectedJob?.id).length}{" "}
                    applicants
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseCandidates}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
              {/* Candidate Filters */}
              <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  size="small"
                  placeholder="Search candidates..."
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ flex: 1 }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={candidateStatusFilter}
                    label="Status"
                    onChange={(e) => setCandidateStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    {APPLICATION_STATUS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Candidates List */}
              {getFilteredCandidates().length > 0 ? (
                getFilteredCandidates().map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onView={handleViewCandidate}
                    onUpdateStatus={handleUpdateCandidateStatus}
                    onDelete={handleDeleteCandidate}
                  />
                ))
              ) : (
                <Box sx={{ textAlign: "center", py: 5 }}>
                  <Person
                    sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Applicants Found
                  </Typography>
                  <Typography color="text.secondary">
                    {candidateSearch || candidateStatusFilter !== "all"
                      ? "Try adjusting your filters"
                      : "No one has applied for this position yet"}
                  </Typography>
                </Box>
              )}
            </DialogContent>
          </Dialog>

          {/* Candidate Details Dialog */}
          <Dialog
            open={candidateDetailsOpen}
            onClose={handleCloseCandidateDetails}
            maxWidth="sm"
            fullWidth
          >
            {selectedCandidate && (
              <>
                <DialogTitle>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 56, height: 56 }}
                    >
                      {selectedCandidate.fullName.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {selectedCandidate.fullName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Applied for:{" "}
                        {
                          jobs.find((j) => j.id === selectedCandidate.jobId)
                            ?.title
                        }
                      </Typography>
                    </Box>
                    <IconButton onClick={handleCloseCandidateDetails}>
                      <Close />
                    </IconButton>
                  </Box>
                </DialogTitle>
                <DialogContent dividers>
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        gutterBottom
                      >
                        Contact Information
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <Email fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Email"
                            secondary={selectedCandidate.email}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Phone fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Phone"
                            secondary={selectedCandidate.phone}
                          />
                        </ListItem>
                      </List>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        gutterBottom
                      >
                        Professional Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Experience
                          </Typography>
                          <Typography variant="body2">
                            {selectedCandidate.experience} years
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Current Company
                          </Typography>
                          <Typography variant="body2">
                            {selectedCandidate.currentCompany}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Notice Period
                          </Typography>
                          <Typography variant="body2">
                            {selectedCandidate.noticePeriod} days
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Expected Salary
                          </Typography>
                          <Typography variant="body2">
                            ₹
                            {(
                              selectedCandidate.expectedSalary / 100000
                            ).toFixed(1)}
                            L
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        gutterBottom
                      >
                        Skills
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {selectedCandidate.skills.map((skill) => (
                          <Chip key={skill} label={skill} size="small" />
                        ))}
                      </Box>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        gutterBottom
                      >
                        Cover Letter
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedCandidate.coverLetter}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        gutterBottom
                      >
                        Interview Progress
                      </Typography>
                      {selectedCandidate.interviews.length > 0 ? (
                        <Stepper orientation="vertical">
                          {selectedCandidate.interviews.map(
                            (interview, index) => (
                              <Step
                                key={index}
                                active={interview.status === "scheduled"}
                                completed={interview.status === "completed"}
                              >
                                <StepLabel>
                                  <Typography variant="body2">
                                    {interview.type} Round
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Date: {interview.date}
                                  </Typography>
                                  {interview.feedback && (
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      color="text.secondary"
                                    >
                                      Feedback: {interview.feedback}
                                    </Typography>
                                  )}
                                </StepLabel>
                              </Step>
                            ),
                          )}
                        </Stepper>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No interviews scheduled yet
                        </Typography>
                      )}
                    </Box>

                    {selectedCandidate.notes && (
                      <>
                        <Divider />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="primary"
                            gutterBottom
                          >
                            Notes
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedCandidate.notes}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button
                    startIcon={<Download />}
                    component="a"
                    href={selectedCandidate.resumeUrl}
                    target="_blank"
                  >
                    Download Resume
                  </Button>
                  <Button onClick={handleCloseCandidateDetails}>Close</Button>
                </DialogActions>
              </>
            )}
          </Dialog>

          {/* Create/Edit Job Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="lg"
            fullWidth
            scroll="body"
            PaperProps={{
              sx: {
                borderRadius: 2,
                m: { xs: 1, sm: 2 },
                maxHeight: { xs: "98vh", md: "95vh" },
              },
            }}
          >
            <DialogTitle
              sx={{
                p: { xs: 2, md: 3 },
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {dialogMode === "create" ? (
                    <Add />
                  ) : dialogMode === "edit" ? (
                    <Edit />
                  ) : (
                    <Visibility />
                  )}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {dialogMode === "create"
                      ? "Create New Job"
                      : dialogMode === "edit"
                        ? "Edit Job"
                        : "View Job"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dialogMode === "create"
                      ? "Fill in the details to create a new job opening"
                      : dialogMode === "edit"
                        ? `Editing: ${selectedJob?.title}`
                        : `Viewing: ${selectedJob?.title}`}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Basic Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    error={touched.title && !!formErrors.title}
                    helperText={touched.title && formErrors.title}
                    required
                    disabled={dialogMode === "view"}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={touched.department && !!formErrors.department}
                    required
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      name="department"
                      value={formData.department}
                      label="Department"
                      onChange={handleInputChange}
                      disabled={dialogMode === "view"}
                    >
                      {DEPARTMENT_OPTIONS.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.department && formErrors.department && (
                      <FormHelperText>{formErrors.department}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      label="Job Type"
                      onChange={handleInputChange}
                      disabled={dialogMode === "view"}
                    >
                      {JOB_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Work Type</InputLabel>
                    <Select
                      name="workType"
                      value={formData.workType}
                      label="Work Type"
                      onChange={handleInputChange}
                      disabled={dialogMode === "view"}
                    >
                      {WORK_TYPE_OPTIONS.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    error={touched.location && !!formErrors.location}
                    helperText={touched.location && formErrors.location}
                    required
                    disabled={dialogMode === "view"}
                  />
                </Grid>

                {/* Experience & Salary */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mt: 2 }}
                  >
                    Experience & Compensation
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={touched.experience && !!formErrors.experience}
                  >
                    <InputLabel>Experience Level</InputLabel>
                    <Select
                      name="experience"
                      value={formData.experience}
                      label="Experience Level"
                      onChange={handleInputChange}
                      disabled={dialogMode === "view"}
                    >
                      {EXPERIENCE_LEVELS.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Years of Experience (e.g., 3-5 years)"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    placeholder="3-5 years"
                    disabled={dialogMode === "view"}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      name="salary.currency"
                      value={formData.salary.currency}
                      label="Currency"
                      onChange={handleInputChange}
                      disabled={dialogMode === "view"}
                    >
                      {CURRENCY_OPTIONS.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Minimum Salary"
                    name="salary.min"
                    type="number"
                    value={formData.salary.min}
                    onChange={handleInputChange}
                    disabled={dialogMode === "view"}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Maximum Salary"
                    name="salary.max"
                    type="number"
                    value={formData.salary.max}
                    onChange={handleInputChange}
                    disabled={dialogMode === "view"}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Period</InputLabel>
                    <Select
                      name="salary.period"
                      value={formData.salary.period}
                      label="Period"
                      onChange={handleInputChange}
                      disabled={dialogMode === "view"}
                    >
                      {SALARY_PERIOD_OPTIONS.map((period) => (
                        <MenuItem key={period} value={period}>
                          {period}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {formErrors.salary && (
                  <Grid item xs={12}>
                    <Alert severity="error">{formErrors.salary}</Alert>
                  </Grid>
                )}

                {/* Job Details */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mt: 2 }}
                  >
                    Job Details
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Description"
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    error={touched.description && !!formErrors.description}
                    helperText={touched.description && formErrors.description}
                    required
                    disabled={dialogMode === "view"}
                    placeholder="Provide a detailed description of the role..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Key Responsibilities"
                    name="responsibilities"
                    multiline
                    rows={4}
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                    disabled={dialogMode === "view"}
                    placeholder="List the key responsibilities (one per line)"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Requirements"
                    name="requirements"
                    multiline
                    rows={4}
                    value={formData.requirements}
                    onChange={handleInputChange}
                    disabled={dialogMode === "view"}
                    placeholder="List the requirements (one per line)"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nice to Have (Optional)"
                    name="niceToHave"
                    multiline
                    rows={3}
                    value={formData.niceToHave}
                    onChange={handleInputChange}
                    disabled={dialogMode === "view"}
                    placeholder="List any additional skills or qualifications (one per line)"
                  />
                </Grid>

                {/* Additional Settings */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mt: 2 }}
                  >
                    Additional Settings
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Number of Openings"
                    name="openings"
                    type="number"
                    value={formData.openings}
                    onChange={handleInputChange}
                    disabled={dialogMode === "view"}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      label="Status"
                      onChange={handleInputChange}
                      disabled={dialogMode === "view"}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.urgent}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              urgent: e.target.checked,
                            }))
                          }
                          disabled={dialogMode === "view"}
                          color="error"
                        />
                      }
                      label="Urgent Hiring"
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions
              sx={{
                p: { xs: 2, md: 3 },
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Button onClick={handleCloseDialog} disabled={loading}>
                {dialogMode === "view" ? "Close" : "Cancel"}
              </Button>
              {dialogMode !== "view" && (
                <Button
                  onClick={handleSaveJob}
                  variant="contained"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <LinearProgress size={20} color="inherit" />
                    ) : (
                      <Save />
                    )
                  }
                >
                  {loading
                    ? "Saving..."
                    : dialogMode === "create"
                      ? "Create Job"
                      : "Save Changes"}
                </Button>
              )}
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleCloseDelete}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "error.main" }}>
                  <Delete />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Delete Job
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                Are you sure you want to delete this job?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Job:</strong> {selectedJob?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Department:</strong> {selectedJob?.department}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Status:</strong> {selectedJob?.status}
              </Typography>
              <Alert severity="warning" sx={{ mt: 2 }}>
                This action cannot be undone. All associated candidate data will
                also be deleted.
              </Alert>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} disabled={loading}>
                Cancel
              </Button>
              <Button
                onClick={handleDeleteJob}
                variant="contained"
                color="error"
                disabled={loading}
                startIcon={
                  loading ? (
                    <LinearProgress size={20} color="inherit" />
                  ) : (
                    <Delete />
                  )
                }
              >
                {loading ? "Deleting..." : "Delete Job"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Success/Error Snackbars */}
          <Snackbar
            open={!!success}
            autoHideDuration={4000}
            onClose={() => setSuccess(null)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSuccess(null)}
              severity="success"
              sx={{ width: "100%" }}
            >
              {success}
            </Alert>
          </Snackbar>

          <Snackbar
            open={!!error}
            autoHideDuration={4000}
            onClose={() => setError(null)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setError(null)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>

          {/* Floating Action Button for mobile */}
          {isMobile && (
            <Zoom in={true}>
              <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                onClick={handleOpenCreate}
              >
                <Add />
              </Fab>
            </Zoom>
          )}
        </Container>
      </Box>
    </>
  );
};

export default React.memo(CareerJobManagement);
