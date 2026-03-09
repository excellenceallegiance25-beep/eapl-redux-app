import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  ArrowForward,
  ArrowRightAlt,
  CheckCircle,
  CloudUpload,
  Delete,
  Description,
  Person,
  Email,
  Phone,
  Work,
  LocationOn,
  BusinessCenter,
  Schedule,
  AttachMoney,
  School,
  TrendingUp,
  Groups,
  Lightbulb,
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
  Avatar,
  Divider,
  Fade,
  Zoom,
  Card,
  CardContent,
  CardActions,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
} from "@mui/material";
import { getJobOpeningsList } from "../../services/AppConfigAction";

// Constants
const BENEFITS = [
  "Competitive salary & equity packages",
  "Flexible remote work options",
  "Continuous learning & development",
  "Health & wellness benefits",
  "Cutting-edge technology stack",
  "Global team collaboration",
];

const EXPERIENCE_OPTIONS = [
  { value: "0-1", label: "0-1 years" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-8", label: "5-8 years" },
  { value: "8+", label: "8+ years" },
];

const NOTICE_PERIOD_OPTIONS = [
  { value: "immediate", label: "Immediate" },
  { value: "15", label: "15 days" },
  { value: "30", label: "30 days" },
  { value: "45", label: "45 days" },
  { value: "60", label: "60 days" },
  { value: "90", label: "90 days" },
];

const JOB_TYPE_COLORS = {
  Remote: "#4CAF50",
  Hybrid: "#FF9800",
  Onsite: "#2196F3",
  "Full-time": "#9C27B0",
  "Part-time": "#FF5722",
  Contract: "#795548",
};

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Mock job descriptions (in real app, these would come from API)
const JOB_DESCRIPTIONS = {
  "Senior React Developer": {
    description:
      "We're looking for an experienced React developer to lead our frontend development team and build scalable web applications.",
    responsibilities: [
      "Lead the development of complex React applications",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with UX designers to implement responsive designs",
      "Optimize application performance and ensure best practices",
      "Participate in architectural decisions and technical planning",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "3+ years of hands-on React experience",
      "Strong knowledge of Redux, Context API, and modern React patterns",
      "Experience with TypeScript and unit testing",
      "Excellent problem-solving and communication skills",
    ],
    niceToHave: [
      "Experience with Next.js or similar frameworks",
      "Contributions to open source projects",
      "Knowledge of backend technologies (Node.js, Python)",
    ],
  },
  "UX/UI Designer": {
    description:
      "Join our creative team to design intuitive and beautiful user experiences for our global client base.",
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Conduct user research and usability testing",
      "Develop wireframes, prototypes, and high-fidelity mockups",
      "Collaborate with developers to ensure design implementation",
      "Maintain and evolve our design system",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating design process",
      "Understanding of responsive design principles",
      "Experience with user research methodologies",
    ],
    niceToHave: [
      "Experience with motion design and prototyping",
      "Knowledge of HTML/CSS",
      "Background in SaaS product design",
    ],
  },
  "DevOps Engineer": {
    description:
      "We need a DevOps engineer to build and maintain our cloud infrastructure and CI/CD pipelines.",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure on AWS/Azure",
      "Implement monitoring and alerting systems",
      "Automate deployment processes",
      "Ensure system security and compliance",
    ],
    requirements: [
      "4+ years of DevOps experience",
      "Strong knowledge of Docker and Kubernetes",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Proficiency in scripting languages (Python, Bash)",
      "Experience with monitoring tools (Prometheus, Grafana)",
    ],
    niceToHave: [
      "AWS/Azure certifications",
      "Experience with microservices architecture",
      "Knowledge of service mesh technologies",
    ],
  },
};

// Custom hooks
const useJobOpenings = () => {
  const dispatch = useDispatch();
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConfigs = async () => {
      setLoading(true);
      try {
        const result = await dispatch(getJobOpeningsList());
        if (result.type === "JOB_OPENING_LIST") {
          // Enhance openings with descriptions
          const enhancedOpenings = result.payload.map((opening) => ({
            ...opening,
            details: JOB_DESCRIPTIONS[opening.title] || {
              description:
                "Join our dynamic team and contribute to exciting projects.",
              responsibilities: [
                "Collaborate with cross-functional teams",
                "Write clean, maintainable code",
                "Participate in code reviews",
                "Troubleshoot and debug issues",
                "Stay updated with industry trends",
              ],
              requirements: [
                "Relevant experience in the field",
                "Strong problem-solving skills",
                "Good communication skills",
                "Team player attitude",
              ],
              niceToHave: ["Additional relevant skills"],
            },
          }));
          setOpenings(enhancedOpenings);
          setError(null);
        } else {
          setError("Failed to load job openings");
        }
      } catch (err) {
        setError("An error occurred while loading job openings");
        console.error("Error loading job openings:", err);
      } finally {
        setLoading(false);
      }
    };
    loadConfigs();
  }, [dispatch]);

  return { openings, loading, error };
};

// Validation schemas
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ""));

// Custom form hook
const useApplicationForm = (selectedJob, onSuccess) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    currentCompany: "",
    noticePeriod: "",
    expectedSalary: "",
    coverLetter: "",
    resume: null,
    resumeName: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    switch (name) {
      case "fullName":
        return !value?.trim() ? "Full name is required" : "";
      case "email":
        if (!value?.trim()) return "Email is required";
        return !validateEmail(value) ? "Email is invalid" : "";
      case "phone":
        if (!value?.trim()) return "Phone number is required";
        return !validatePhone(value)
          ? "Please enter a valid 10-digit phone number"
          : "";
      case "experience":
        return !value ? "Please select experience range" : "";
      case "resume":
        return !value ? "Resume is required" : "";
      default:
        return "";
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField],
  );

  const handleFileUpload = useCallback((file) => {
    if (!file) return false;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        resume: "Please upload PDF or DOC/DOCX files only",
      }));
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size should be less than 5MB",
      }));
      return false;
    }

    setFormData((prev) => ({
      ...prev,
      resume: file,
      resumeName: file.name,
    }));
    setErrors((prev) => ({ ...prev, resume: "" }));
    return true;
  }, []);

  const handleRemoveResume = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      resume: null,
      resumeName: "",
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      currentCompany: "",
      noticePeriod: "",
      expectedSalary: "",
      coverLetter: "",
      resume: null,
      resumeName: "",
    });
    setErrors({});
    setTouched({});
  }, []);

  return {
    formData,
    errors,
    touched,
    validateForm,
    handleChange,
    handleFileUpload,
    handleRemoveResume,
    resetForm,
  };
};

// Sub-components
const JobTypeChip = ({ type }) => {
  const theme = useTheme();

  return (
    <Chip
      label={type}
      size="small"
      sx={{
        bgcolor: JOB_TYPE_COLORS[type] || theme.palette.primary.main,
        color: "white",
        fontWeight: "bold",
        "&:hover": {
          opacity: 0.9,
        },
      }}
    />
  );
};

const BenefitItem = ({ benefit, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <CheckCircle
          sx={{
            color: "primary.main",
            fontSize: isMobile ? "1.2rem" : "1.5rem",
          }}
        />
        <Typography variant={isMobile ? "body2" : "body1"}>
          {benefit}
        </Typography>
      </Box>
    </Zoom>
  );
};

const JobDescription = ({ opening, expanded }) => {
  const theme = useTheme();

  if (!opening.details) return null;

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Box
        sx={{
          mt: 2,
          p: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.02),
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" paragraph color="text.secondary">
          {opening.details.description}
        </Typography>

        <Typography
          variant="subtitle2"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 2 }}
        >
          Key Responsibilities:
        </Typography>
        <List dense disablePadding>
          {opening.details.responsibilities.map((item, idx) => (
            <ListItem key={idx} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <TrendingUp color="primary" sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          ))}
        </List>

        <Typography
          variant="subtitle2"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 2 }}
        >
          Requirements:
        </Typography>
        <List dense disablePadding>
          {opening.details.requirements.map((item, idx) => (
            <ListItem key={idx} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircle color="success" sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          ))}
        </List>

        {opening.details.niceToHave &&
          opening.details.niceToHave.length > 0 && (
            <>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                gutterBottom
                sx={{ mt: 2 }}
              >
                Nice to Have:
              </Typography>
              <List dense disablePadding>
                {opening.details.niceToHave.map((item, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <Lightbulb color="warning" sx={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
      </Box>
    </Collapse>
  );
};

const JobOpeningCard = ({ opening, onApply, isSelected, onSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (onSelect) onSelect(opening.id);
  };

  return (
    <Card
      elevation={isSelected ? 4 : 0}
      sx={{
        border: "1px solid",
        borderColor: isSelected ? "primary.main" : "divider",
        borderRadius: 2,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      {opening.isNew && (
        <Badge
          color="error"
          badgeContent="NEW"
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            "& .MuiBadge-badge": {
              fontSize: "0.7rem",
              fontWeight: "bold",
              padding: "0 8px",
            },
          }}
        />
      )}

      <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Box>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight="bold"
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              {opening.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                mt: 0.5,
              }}
            >
              <Chip
                icon={<BusinessCenter sx={{ fontSize: 14 }} />}
                label={opening.department}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem" }}
              />
              <Chip
                icon={<Schedule sx={{ fontSize: 14 }} />}
                label={opening.type}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem" }}
              />
              {opening.salary && (
                <Chip
                  icon={<AttachMoney sx={{ fontSize: 14 }} />}
                  label={opening.salary}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.7rem" }}
                />
              )}
            </Box>
          </Box>
          <JobTypeChip type={opening.workType || opening.type} />
        </Box>

        <Typography
          variant={isMobile ? "caption" : "body2"}
          color="text.secondary"
          sx={{
            mb: 1,
            fontSize: { xs: "0.75rem", md: "0.875rem" },
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flexWrap: "wrap",
          }}
        >
          <LocationOn sx={{ fontSize: "1rem" }} /> {opening.location}
          {opening.postedDate && (
            <>
              <Box component="span" sx={{ mx: 0.5 }}>
                •
              </Box>
              Posted: {opening.postedDate}
            </>
          )}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {opening.details?.description.substring(0, 100)}...
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            size={isMobile ? "small" : "medium"}
            onClick={() => onApply(opening)}
            disabled
            sx={{
              fontSize: { xs: "0.8rem", md: "0.875rem" },
              textTransform: "none",
            }}
          >
            Apply Now
          </Button>
          <Button
            variant="text"
            size={isMobile ? "small" : "medium"}
            onClick={handleExpandClick}
            endIcon={
              <ArrowRightAlt
                sx={{
                  transform: expanded ? "rotate(90deg)" : "none",
                  transition: "0.3s",
                }}
              />
            }
            sx={{
              fontSize: { xs: "0.8rem", md: "0.875rem" },
              textTransform: "none",
            }}
          >
            {expanded ? "Show Less" : "View Details"}
          </Button>
        </Box>

        <JobDescription opening={opening} expanded={expanded} />
      </CardContent>
    </Card>
  );
};

// Main Component
const CareerSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    openings,
    loading: openingsLoading,
    error: openingsError,
  } = useJobOpenings();

  const [selectedJob, setSelectedJob] = useState(null);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const {
    formData,
    errors,
    touched,
    validateForm,
    handleChange,
    handleFileUpload,
    handleRemoveResume,
    resetForm,
  } = useApplicationForm(selectedJob, () => setOpenSuccessSnackbar(true));

  const handleApplyClick = useCallback((opening) => {
    setSelectedJob(opening);
    setOpenApplyDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenApplyDialog(false);
    setSelectedJob(null);
    resetForm();
  }, [resetForm]);

  const handleFileInputChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload],
  );

  const handleSubmitApplication = useCallback(async () => {
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Application submitted:", {
        jobId: selectedJob?.id,
        jobTitle: selectedJob?.title,
        ...formData,
      });

      setOpenSuccessSnackbar(true);
      handleCloseDialog();
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setUploading(false);
    }
  }, [validateForm, errors, selectedJob, formData, handleCloseDialog]);

  const handleSnackbarClose = useCallback(() => {
    setOpenSuccessSnackbar(false);
  }, []);

  const handleJobSelect = useCallback((jobId) => {
    setSelectedJobId(jobId);
  }, []);

  return (
    <Box
      component="section"
      aria-label="Careers Section"
      sx={{ py: 10, bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            sx={{
              transition: "all 0.5s ease-in-out",
              justifyContent: "center",
            }}
          >
            {/* Left Section - Company Benefits */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  px: { xs: 2, sm: 3, md: 0 },
                  position: "sticky",
                  top: 100,
                }}
              >
                <Chip
                  label="Join Our Team"
                  color="primary"
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    py: 1,
                    px: 2,
                  }}
                />

                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Shape the Future <br />
                  With Us
                </Typography>

                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  color="text.secondary"
                  paragraph
                  sx={{
                    mb: 4,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Join a team of innovators, builders, and problem-solvers who
                  are passionate about creating exceptional digital experiences.
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    borderRadius: 3,
                    mb: 4,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Why Join Us?
                  </Typography>
                  <Stack spacing={2}>
                    {BENEFITS.map((benefit, index) => (
                      <BenefitItem
                        key={benefit}
                        benefit={benefit}
                        index={index}
                      />
                    ))}
                  </Stack>
                </Paper>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    size={isMobile ? "medium" : "large"}
                    component="a"
                    href="mailto:hr@myeapl.com?subject=Job Inquiry&body=Hello HR Team,%0D%0A%0D%0AI am interested in exploring opportunities at EAPL.%0D%0A%0D%0ARegards,"
                    sx={{
                      py: { xs: 1.25, md: 1.5 },
                      px: { xs: 3, md: 4 },
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    Contact HR Team
                  </Button>
                  <Button
                    variant="outlined"
                    size={isMobile ? "medium" : "large"}
                    startIcon={<Groups />}
                    href="#openings"
                    sx={{
                      py: { xs: 1.25, md: 1.5 },
                      px: { xs: 3, md: 4 },
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    View Openings
                  </Button>
                </Stack>
              </Box>
            </Grid>

            {/* Right Section - Job Openings */}
            <Grid
              item
              xs={12}
              md={7}
              id="openings"
              sx={{ position: "relative" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  bgcolor: alpha(theme.palette.primary.main, 0.02),
                  borderRadius: { xs: 2, md: 4 },
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
                    }}
                  >
                    Open Positions
                  </Typography>
                  <Chip
                    label={`${openings.length} openings`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                {openingsLoading ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <LinearProgress sx={{ maxWidth: 200, mx: "auto", mb: 3 }} />
                    <Typography color="text.secondary">
                      Loading opportunities...
                    </Typography>
                  </Box>
                ) : openingsError ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Alert severity="error" sx={{ maxWidth: 400, mx: "auto" }}>
                      {openingsError}
                    </Alert>
                  </Box>
                ) : openings.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Work
                      sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      gutterBottom
                    >
                      No Current Openings
                    </Typography>
                    <Typography color="text.secondary">
                      We don't have any open positions right now, but we're
                      always looking for talented individuals.
                      <br />
                      <Button
                        component="a"
                        href="mailto:hr@myeapl.com?subject=Resume Submission&body=Hello HR Team,%0D%0A%0D%0APlease find my resume attached for your consideration.%0D%0A%0D%0ARegards,"
                        sx={{ mt: 2 }}
                      >
                        Send us your resume
                      </Button>
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    {openings.map((opening, index) => (
                      <JobOpeningCard
                        key={opening.id || index}
                        opening={{
                          ...opening,
                          isNew: index < 2, // Mark first two as new
                          postedDate: "2 days ago",
                          workType: opening.type,
                          salary: "Competitive",
                        }}
                        onApply={handleApplyClick}
                        isSelected={selectedJobId === opening.id}
                        onSelect={handleJobSelect}
                      />
                    ))}
                  </Stack>
                )}

                {/* Department Filter - Optional */}
                {openings.length > 0 && (
                  <Box
                    sx={{
                      mt: 3,
                      pt: 3,
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Not seeing the right fit?
                      <Button
                        component="a"
                        href="mailto:hr@myeapl.com?subject=Resume Submission&body=Hello HR Team,%0D%0A%0D%0APlease find my resume attached for your consideration.%0D%0A%0D%0ARegards,"
                        sx={{ mt: 1 }}
                        size="small"
                      >
                        Send us your resume
                      </Button>
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      </Container>

      {/* Application Dialog - Enhanced with job details */}
      <Dialog
        open={openApplyDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        scroll="body"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, md: 3 },
            m: { xs: 1, sm: 2 },
            maxHeight: { xs: "95vh", md: "90vh" },
          },
        }}
      >
        {selectedJob && (
          <>
            <DialogTitle
              sx={{
                p: { xs: 2, md: 3 },
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                  <Work />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedJob.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                      mt: 0.5,
                    }}
                  >
                    <Chip
                      size="small"
                      label={selectedJob.department}
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      label={selectedJob.location}
                      variant="outlined"
                      icon={<LocationOn sx={{ fontSize: 14 }} />}
                    />
                    <Chip
                      size="small"
                      label={selectedJob.type}
                      sx={{
                        bgcolor:
                          JOB_TYPE_COLORS[selectedJob.type] ||
                          theme.palette.primary.main,
                        color: "white",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
              {/* Job Details Summary */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.02),
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Position Overview
                </Typography>
                <Typography variant="body2" paragraph>
                  {selectedJob.details?.description}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Experience
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedJob.experience || "3-5 years"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Work Type
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedJob.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Location
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedJob.location}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Department
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedJob.department}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Application Form
              </Typography>

              <Stack spacing={3}>
                {/* Personal Information */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={touched.fullName && !!errors.fullName}
                        helperText={touched.fullName && errors.fullName}
                        required
                        InputProps={{
                          startAdornment: (
                            <Person
                              sx={{
                                mr: 1,
                                color: "text.secondary",
                                fontSize: 20,
                              }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        required
                        InputProps={{
                          startAdornment: (
                            <Email
                              sx={{
                                mr: 1,
                                color: "text.secondary",
                                fontSize: 20,
                              }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                        required
                        InputProps={{
                          startAdornment: (
                            <Phone
                              sx={{
                                mr: 1,
                                color: "text.secondary",
                                fontSize: 20,
                              }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                {/* Professional Information */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Professional Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        error={touched.experience && !!errors.experience}
                        required
                      >
                        <InputLabel>Years of Experience</InputLabel>
                        <Select
                          name="experience"
                          value={formData.experience}
                          label="Years of Experience"
                          onChange={handleChange}
                        >
                          {EXPERIENCE_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.experience && errors.experience && (
                          <FormHelperText>{errors.experience}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Current Company"
                        name="currentCompany"
                        value={formData.currentCompany}
                        onChange={handleChange}
                        placeholder="Optional"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Notice Period</InputLabel>
                        <Select
                          name="noticePeriod"
                          value={formData.noticePeriod}
                          label="Notice Period"
                          onChange={handleChange}
                        >
                          {NOTICE_PERIOD_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Expected Salary"
                        name="expectedSalary"
                        placeholder="e.g., ₹15,00,000/annum"
                        value={formData.expectedSalary}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Cover Letter"
                        name="coverLetter"
                        multiline
                        rows={4}
                        value={formData.coverLetter}
                        onChange={handleChange}
                        placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                {/* Resume Upload */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Resume/CV
                  </Typography>

                  {!formData.resume ? (
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CloudUpload />}
                      sx={{
                        width: "100%",
                        py: 3,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        "&:hover": {
                          borderStyle: "dashed",
                          borderWidth: 2,
                        },
                      }}
                    >
                      Upload Resume (PDF, DOC, DOCX) - Max 5MB
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileInputChange}
                      />
                    </Button>
                  ) : (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Description color="primary" />
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {formData.resumeName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        onClick={handleRemoveResume}
                        color="error"
                        size="small"
                        aria-label="Remove resume"
                      >
                        <Delete />
                      </IconButton>
                    </Paper>
                  )}

                  {touched.resume && errors.resume && (
                    <FormHelperText error>{errors.resume}</FormHelperText>
                  )}
                </Box>
              </Stack>
            </DialogContent>

            <DialogActions
              sx={{
                p: { xs: 2, md: 3 },
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                borderTop: `1px solid ${theme.palette.divider}`,
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
              }}
            >
              <Button
                onClick={handleCloseDialog}
                fullWidth={isMobile}
                variant="outlined"
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitApplication}
                disabled={uploading}
                variant="contained"
                fullWidth={isMobile}
                startIcon={
                  uploading ? (
                    <LinearProgress size={20} color="inherit" />
                  ) : (
                    <ArrowForward />
                  )
                }
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  minWidth: { xs: "100%", sm: "200px" },
                }}
              >
                {uploading ? "Submitting..." : "Submit Application"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: "100%",
            boxShadow: theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Application Submitted Successfully!
          </Typography>
          <Typography variant="body2">
            Thank you for applying to {selectedJob?.title}. We'll review your
            application and get back to you within 5-7 business days.
          </Typography>
        </Alert>
      </Snackbar>

      {/* Global Loading Overlay */}
      {uploading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};

export default React.memo(CareerSection);
