import {
  Add,
  Announcement,
  Category,
  CheckCircle,
  Close,
  CloudUpload,
  Delete,
  Description,
  Download,
  Edit,
  FiberManualRecord,
  Image,
  InsertDriveFile,
  Person,
  PictureAsPdf,
  Refresh,
  Search,
  TextSnippet,
  Upload,
  Visibility,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  Divider,
  alpha,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { decrementUnreadCount } from "../../redux/slices/notificationSlice";
import {
  getMarkNoticeAsRead,
  getNoticesAttachmentList,
  getNoticesList,
  getNoticesReadByList,
  updateNoticesDetails,
} from "../../services/AppConfigAction";
import NoticeDetailDialog from "./NoticeDetailDialog";
import ReadStatusDialog from "./ReadStatusDialog";

const DashboardHome = () => {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  // ⭐ Get the refresh key from Redux
    const noticeRefreshKey = useSelector((state) => state.notification.noticeRefreshKey);

  // Responsive font sizes
  const getFontSize = {
    h4: { xs: "1.5rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
    h5: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem", lg: "1.5rem" },
    h6: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
    body1: { xs: "0.875rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
    body2: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem", lg: "0.95rem" },
    caption: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem", lg: "0.8rem" },
  };

  // Responsive spacing
  const getSpacing = {
    container: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
    card: { xs: 1.5, sm: 2, md: 2.5 },
  };

  const currentUser = user || {
    name: "Pramod Kumar W",
    role: "admin",
    email: "pramod@example.com",
  };

  const userRole = currentUser.role;
  const userName = currentUser.name;
  const userID = currentUser.id;

  const allEmployeesD = [
    { id: 1, name: "John Doe", department: "Engineering" },
    { id: 2, name: "Jane Smith", department: "HR" },
    { id: 3, name: "Mike Johnson", department: "Sales" },
    { id: 4, name: "Sarah Williams", department: "Marketing" },
    { id: 5, name: "Robert Brown", department: "Engineering" },
    { id: 6, name: "Emily Davis", department: "Finance" },
  ];

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    category: "Announcement",
    priority: "Medium",
    year: new Date().getFullYear(),
    expiresAt: "",
    isImportant: false,
    attachments: [],
    allEmployees: [],
  });

  // useEffect(() => {
  //   const loadAllData = async () => {
  //     // setLoading(true);
  //     // showLoader(eaplRotatingLogo, 0);
  //     try {
  //       await loadNoticeDetails();
  //       // await loadNoticeReadBy();
  //       // await loadNoticeAttachment();
  //     } catch (error) {
  //       console.error("Error loading data:", error);
  //     } finally {
  //       // setLoading(false);
  //       // hideLoader();
  //     }
  //   };

  //   loadAllData();
  // }, [dispatch]);

  const loadNoticeDetailsFFF = async () => {
    const payload = {
      noticeID: 0,
      category: "",
      priority: "",
      isActive: null,
      publishYear: 0,
      searchText: "",
    };

    const result = await dispatch(getNoticesList(payload));
    if (result.type === "NOTICE_LIST") {
      const formattedNotices = result.payload.dataList.map((notice) => ({
        ...notice,
        // allEmployees: allEmployeesD
      }));
      setNotices(formattedNotices);
      setFilteredNotices(formattedNotices);
    }
  };

  const loadNoticeDetails = useCallback(async () => {
        const payload = {
            noticeID: 0,
            category: "",
            priority: "",
            isActive: null,
            publishYear: 0,
            searchText: "",
        };

        const result = await dispatch(getNoticesList(payload));
        if (result.type === "NOTICE_LIST") {
            const formattedNotices = result.payload.dataList.map((notice) => ({
                ...notice,
            }));
            setNotices(formattedNotices);
            setFilteredNotices(formattedNotices);
        }
    }, [dispatch]);

    // Initial load
    useEffect(() => {
        const loadAllData = async () => {
            try {
                await loadNoticeDetails();
                // await loadNoticeReadBy();
                // await loadNoticeAttachment();
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadAllData();
    }, [loadNoticeDetails]);

    // ⭐ Refresh notices when noticeRefreshKey changes (user reads a notification)
    useEffect(() => {
        if (noticeRefreshKey > 0) { // Avoid initial load (key starts at 0)
            console.log("Refreshing notices grid - notification was read");
            loadNoticeDetails();
            
            // Optional: Show a subtle refresh indicator
            // You could set a state here to show a small "Refreshing..." toast or snackbar
        }
    }, [noticeRefreshKey, loadNoticeDetails]);

  const loadNoticeReadBy = async () => {
    const payload = {
      noticeID: 0,
    };

    const result = await dispatch(getNoticesReadByList(payload));
    // if (result.type === "NOTICE_LIST") {
    //     const formattedEmployees = result.payload.map(employee => ({
    //         ...employee,
    //         status: employee.status === true
    //     }));
    //     setEmployees(formattedEmployees);
    //     setFilteredEmployees(formattedEmployees);
    // }
  };

  const loadNoticeAttachment = async () => {
    const payload = {
      noticeID: 0,
      fileType: "",
    };
    const result = await dispatch(getNoticesAttachmentList(payload));
    // if (result.type === "NOTICE_LIST") {
    //     const formattedEmployees = result.payload.map(employee => ({
    //         ...employee,
    //         status: employee.status === true
    //     }));
    //     setEmployees(formattedEmployees);
    //     setFilteredEmployees(formattedEmployees);
    // }
  };

  // State management
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [openNoticeDialog, setOpenNoticeDialog] = useState(false);
  const [openViewersDialog, setOpenViewersDialog] = useState(false);
  const [openNoticeDetailDialog, setOpenNoticeDetailDialog] = useState(false);
  const [openReadStatusDialog, setOpenReadStatusDialog] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [tabValue, setTabValue] = useState(0);
  const [editingNotice, setEditingNotice] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  // Available options
  const noticeCategories = [
    "All",
    "Announcement",
    "Policy Update",
    "Event",
    "Maintenance",
    "Urgent",
    "Holiday",
    "General",
    "Meeting",
    "Training",
    "System Update",
  ];

  const priorityOptions = [
    { label: "All", color: "default" },
    { label: "High", color: "error" },
    { label: "Medium", color: "warning" },
    { label: "Low", color: "info" },
  ];

  const years = ["All", 2024, 2023, 2022, 2021, 2020];

  const fileTypes = {
    pdf: <PictureAsPdf color="error" />,
    doc: <Description color="primary" />,
    docx: <Description color="primary" />,
    txt: <TextSnippet color="info" />,
    jpg: <Image color="secondary" />,
    png: <Image color="secondary" />,
    default: <InsertDriveFile color="action" />,
  };

  // Get unique years from notices
  const getAvailableYears = () => {
    const yearsSet = new Set(notices.map((notice) => notice.year));
    return ["All", ...Array.from(yearsSet).sort((a, b) => b - a)];
  };

  // Get file icon
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    return fileTypes[extension] || fileTypes.default;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (typeof bytes === "string") return bytes;
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Filter notices based on criteria
  useEffect(() => {
    const isAdmin = userRole.toLowerCase() === "admin";
    let filtered = notices;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (notice) =>
          notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by year
    if (selectedYear !== "All") {
      filtered = filtered.filter((notice) => notice.year === selectedYear);
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (notice) => notice.category === selectedCategory,
      );
    }

    // Filter by priority
    if (selectedPriority !== "All") {
      filtered = filtered.filter(
        (notice) => notice.priority === selectedPriority,
      );
    }

    // MOST IMPORTANT: Role-based filtering
    // Admin sees ALL notices (active + inactive)
    // Non-admin sees ONLY active notices
    if (!isAdmin) {
      filtered = filtered.filter((notice) => notice.isActive);
    }
    // If isAdmin, no additional filtering needed - show everything

    setFilteredNotices(filtered);
  }, [
    notices,
    searchTerm,
    selectedYear,
    selectedCategory,
    selectedPriority,
    userRole,
  ]);

  // Open file function
  const handleOpenFile = (file) => {
    if (file.url) {
      window.open(file.url, "_blank");
    } else {
      // For demo purposes, show alert
      alert(
        `Opening file: ${file.name}\n\nIn a real application, this would open:\n${file.url || "File from server"}`,
      );
    }
  };

  // Download file function
  const handleDownloadFile = (file) => {
    if (file.url) {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Downloading ${file.name}`);
    }
  };

  // Delete notice
  const handleDeleteNotice = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this notice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      // Prepare delete request DTO
      const deleteRequest = {
        indicator: "D", // D=Delete
        id: id,
        isActive: false,
      };

      const result = await dispatch(updateNoticesDetails(deleteRequest));

      if (result.type === "NOTICE_DETAILS_UPDATE_SUCCESS") {
        // Refresh the notices list
        await loadNoticeDetails();

        // Close any open dialogs if this notice was selected
        if (selectedNotice && selectedNotice.id === id) {
          setOpenNoticeDetailDialog(false);
          setOpenReadStatusDialog(false);
          setSelectedNotice(null);
        }

        await Swal.fire({
          title: "Success!",
          text: "Notice deleted successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      } else {
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete notice. Please try again.",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
      await Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the notice.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // Create/Update notice
  const handleSaveNotice = async () => {
    if (!validateNotice()) {
      // Scroll to first error
      const firstError = Object.keys(validationErrors)[0];
      if (firstError) {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      return;
    }

    try {
      // Prepare the request DTO based on indicator
      const requestDto = {
        indicator: editingNotice ? "U" : "I", // I=Insert, U=Update
        title: newNotice.title,
        content: newNotice.content,
        category: newNotice.category,
        priority: newNotice.priority,
        createdBy: userName,
        expiresAt: newNotice.expiresAt || null,
        isActive: true, // Always active when created/updated
        year: newNotice.year || new Date().getFullYear(),
        attachments: newNotice.attachments.map((att) => ({
          // Map your attachment structure to AttachmentNoticeDto
          name: att.name,
          size: att.size,
          type: att.type,
          url: att.url || "",
          uploadedAt: att.uploadedAt,
        })),
        readBy: editingNotice
          ? // For updates, include existing readBy data
            (editingNotice.readBy || []).map((reader) => ({
              id: reader.id,
              noticeID: editingNotice.id,
              employeeID: reader.employeeID,
              empName: reader.name,
              readAt: reader.readAt,
            }))
          : [], // Empty for new notices
        allEmployees: [],
      };

      // Add ID for update operations
      if (editingNotice) {
        requestDto.id = editingNotice.id;
      }

      // Show loading swal
      Swal.fire({
        title: "Saving...",
        text: "Please wait while we save your notice.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Dispatch the update action
      const result = await dispatch(updateNoticesDetails(requestDto));

      if (result.type === "NOTICE_DETAILS_UPDATE_SUCCESS") {
        // Refresh the notices list after successful save
        await loadNoticeDetails();

        setOpenNoticeDialog(false);
        resetNewNotice();
        setEditingNotice(false);

        // Show success message
        await Swal.fire({
          title: "Success!",
          text: editingNotice
            ? "Notice updated successfully!"
            : "Notice created successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      } else {
        await Swal.fire({
          title: "Error!",
          text: "Failed to save notice. Please try again.",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error saving notice:", error);
      await Swal.fire({
        title: "Error!",
        text: "An error occurred while saving the notice.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // Edit notice
  const handleEditNotice = (notice) => {
    setNewNotice({
      ...notice,
      expiresAt: notice.expiresAt || "",
      isImportant: notice.isImportant || false,
      attachments: notice.attachments || [],
      allEmployees: notice.allEmployees || [],
    });
    setEditingNotice(notice);
    setOpenNoticeDialog(true);
  };

  const handleMarkAsRead = async (noticeId) => {
    const notice = notices.find((n) => n.id === noticeId);
    const hasRead = notice.readBy.some(
      (reader) => reader.employeeID === userID,
    );

    try {
      const updatedReadBy = hasRead
        ? notice.readBy.filter((reader) => reader.employeeID !== userID)
        : [
            ...notice.readBy,
            {
              id: userID,
              employeeID: userID,
              name: userName,
              noticeID: noticeId,
              readAt: new Date().toLocaleString(),
            },
          ];

      // Update the notice with new readBy status
      const updateRequest = {
        indicator: "U",
        id: noticeId,
        title: notice.title,
        content: notice.content,
        category: notice.category,
        priority: notice.priority,
        createdBy: notice.createdBy,
        expiresAt: notice.expiresAt || null,
        isActive: notice.isActive,
        year: notice.year,
        attachments: (notice.attachments || []).map((att) => ({
          name: att.name,
          size: att.size,
          type: att.type,
          url: att.url || "",
          uploadedAt: att.uploadedAt,
        })),
        readBy: updatedReadBy.map((reader) => ({
          id: reader.id,
          employeeID: reader.employeeID,
          empName: reader.name,
          noticeID: noticeId,
          readAt: reader.readAt,
        })),
        // allEmployees: (notice.allEmployees || []).map(emp => ({
        //     id: emp.id,
        //     name: emp.name,
        //     department: emp.department
        // })),
        allEmployees: [],
      };

      const result = await dispatch(updateNoticesDetails(updateRequest));

      if (result.type === "NOTICE_DETAILS_UPDATE_SUCCESS") {
        // Update local state immediately for better UX
        setNotices((prev) =>
          prev.map((notice) => {
            if (notice.id === noticeId) {
              if (hasRead) {
                return {
                  ...notice,
                  readBy: notice.readBy.filter(
                    (reader) => reader.employeeID !== userID,
                  ),
                  views: Math.max(0, notice.views - 1),
                };
              } else {
                return {
                  ...notice,
                  readBy: updatedReadBy,
                  views: notice.views + 1,
                };
              }
            }
            return notice;
          }),
        );
        dispatch(decrementUnreadCount());
      } else {
        console.error("Failed to update read status. Please try again");
        alert("Failed to update read status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating read status:", error);
      alert("An error occurred while updating read status.");
    }
  };

  // Update UI immediately, then sync with backend
  const markAsRead = async (noticeId) => {
    // Optimistically update UI
    // setHasRead(true);

    try {
      // API call
      const result = await dispatch(
        getMarkNoticeAsRead({
          employeeId: user.id,
          noticeId: noticeId,
        }),
      );

      // Revert on error
      if (result.payload?.success) {
        await loadNoticeDetails();
        dispatch(decrementUnreadCount());
      }
    } catch (error) {
      console.log("DashBoradHome.jsx markAsRead error:", error);
    }
  };

  // Toggle notice active status
  const handleToggleActive = async (noticeId) => {
    const notice = notices.find((n) => n.id === noticeId);
    if (!notice) return;

    const newStatus = !notice.isActive;
    const action = newStatus ? "activate" : "archive";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `you want to ${action} this notice?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus ? "#28a745" : "#6c757d",
      cancelButtonColor: "#3085d6",
      confirmButtonText: newStatus ? "Yes, activate it!" : "Yes, archive it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const updateRequest = {
        indicator: "U", // Update operation
        id: noticeId,
        title: notice.title,
        content: notice.content,
        category: notice.category,
        priority: notice.priority,
        createdBy: notice.createdBy,
        expiresAt: notice.expiresAt || null,
        isActive: newStatus, // Toggle active status
        year: notice.year,
        // Include other required fields from the notice
        attachments: (notice.attachments || []).map((att) => ({
          name: att.name,
          size: att.size,
          type: att.type,
          url: att.url || "",
          uploadedAt: att.uploadedAt,
        })),
        readBy: (notice.readBy || []).map((reader) => ({
          id: reader.id,
          employeeID: reader.employeeID,
          empName: reader.name,
          noticeID: noticeId,
          readAt: reader.readAt,
        })),
        allEmployees: [],
      };

      // Show loading state
      Swal.fire({
        title: "Updating...",
        text: "Please wait while we update the notice status.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const result = await dispatch(updateNoticesDetails(updateRequest));

      if (result.type === "NOTICE_DETAILS_UPDATE_SUCCESS") {
        // Refresh the notices list
        await loadNoticeDetails();

        await Swal.fire({
          title: "Success!",
          text: `Notice ${newStatus ? "activated" : "archived"} successfully!`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        await Swal.fire({
          title: "Error!",
          text: "Failed to update notice status. Please try again.",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error toggling notice status:", error);
      await Swal.fire({
        title: "Error!",
        text: "An error occurred while updating notice status.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // Reset form
  const resetNewNotice = () => {
    setNewNotice({
      title: "",
      content: "",
      category: "Announcement",
      priority: "Medium",
      year: new Date().getFullYear(),
      expiresAt: "",
      isImportant: false,
      attachments: [],
      allEmployees: [],
    });
    setSelectedFile(null);
    setFileUploadError("");
  };

  // File upload handlers
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      ".pdf",
      ".txt",
      ".doc",
      ".docx",
      ".jpg",
      ".jpeg",
      ".png",
    ];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedTypes.some((type) => fileExtension === type)) {
      setFileUploadError(
        "Please select a PDF, TXT, DOC, DOCX, JPG, or PNG file",
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileUploadError("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    setFileUploadError("");
  };

  const handleUploadFile = () => {
    if (!selectedFile) {
      setFileUploadError("Please select a file first");
      return;
    }

    const fileType = selectedFile.name.split(".").pop().toLowerCase();
    const fileExtension =
      fileType === "pdf"
        ? "pdf"
        : ["doc", "docx"].includes(fileType)
          ? "doc"
          : ["jpg", "jpeg", "png"].includes(fileType)
            ? "image"
            : "txt";

    const newFile = {
      id: Date.now(),
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size),
      type: fileExtension,
      url: URL.createObjectURL(selectedFile), // Create object URL for demo
      uploadedAt: new Date().toLocaleString(),
    };

    setNewNotice((prev) => ({
      ...prev,
      attachments: [...prev.attachments, newFile],
    }));

    setSelectedFile(null);
    setFileUploadError("");
    document.getElementById("file-upload").value = "";
  };

  const handleRemoveAttachment = (index) => {
    setNewNotice((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  // Export data
  const handleExportDataddddddd = () => {
    const csvData = notices.map((notice) => ({
      ID: notice.id,
      Title: notice.title,
      Category: notice.category,
      Priority: notice.priority,
      Year: notice.year,
      "Created By": notice.createdBy,
      "Created At": notice.createdAt,
      Views: notice.views,
      Readers: notice.readBy,
      "Total Employees": notice.allEmployees.length,
      "Read Percentage": `${Math.round((notice.readBy.length / notice.allEmployees.length) * 100)}%`,
      Status: notice.isActive ? "Active" : "Inactive",
    }));

    const csvString = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notices_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleExportData = () => {
    const csvData = notices.map((notice) => ({
      ID: notice.id,
      Title: notice.title,
      Category: notice.category,
      // 'Priority': notice.priority,
      Year: notice.year,
      "Created By": notice.createdBy,
      "Created At": notice.createdAt,
      "Expires At": notice.expiresAt || "N/A",
      // 'Views': notice.views,
      Readers: notice.readBy.length,
      "Total Employees": notice.allEmployees.length,
      "Read Percentage": `${Math.round((notice.readBy.length / notice.allEmployees.length) * 100)}%`,
      Status: notice.isActive ? "Active" : "Inactive",
      "Reader Names": notice.readBy.map((reader) => reader.empName).join("; "),
      // 'Reader IDs': notice.readBy.map(reader => reader.employeeID).join(', '),
      "Reader Departments": notice.readBy
        .map((reader) => {
          const employee = notice.allEmployees.find(
            (emp) => emp.id === reader.employeeID,
          );
          return employee ? employee.department : "N/A";
        })
        .join("; "),
      // 'All Employee Names': notice.allEmployees.map(emp => emp.name).join('; '),
      // 'All Employee Departments': notice.allEmployees.map(emp => emp.department).join('; ')
    }));

    // Escape CSV values that contain commas or quotes
    const escapeCSV = (value) => {
      if (value === null || value === undefined) return "";
      const stringValue = String(value);
      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const csvString = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) =>
        Object.values(row)
          .map((value) => escapeCSV(value))
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notices_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      // Format: "January 27, 2024"
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString; // Return original if parsing fails
    }
  };

  // Validation function
  const validateNotice = () => {
    const errors = {};
    const currentYear = new Date().getFullYear();

    // Title validation
    if (!newNotice.title.trim()) {
      errors.title = "Title is required";
    } else if (newNotice.title.length < 5) {
      errors.title = "Title must be at least 5 characters";
    } else if (newNotice.title.length > 100) {
      errors.title = "Title cannot exceed 100 characters";
    }

    // Content validation
    if (!newNotice.content.trim()) {
      errors.content = "Content is required";
    } else if (newNotice.content.length < 10) {
      errors.content = "Content must be at least 10 characters";
    } else if (newNotice.content.length > 2000) {
      errors.content = "Content cannot exceed 2000 characters";
    }

    // Category validation
    if (!newNotice.category) {
      errors.category = "Please select a category";
    }

    // Priority validation
    if (!newNotice.priority) {
      errors.priority = "Please select a priority";
    }

    // Year validation
    if (!newNotice.year) {
      errors.year = "Year is required";
    } else if (newNotice.year < 2000 || newNotice.year > currentYear + 1) {
      errors.year = `Year must be between 2000 and ${currentYear + 1}`;
    }

    // Expiry date validation
    if (newNotice.expiresAt) {
      const expiryDate = new Date(newNotice.expiresAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (expiryDate < today) {
        errors.expiresAt = "Expiry date cannot be in the past";
      }
    }

    // Attachments validation (optional - if you want to limit)
    if (newNotice.attachments.length > 5) {
      errors.attachments = "Maximum 5 files allowed";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Mobile Filter Drawer Component
  const MobileFilterDrawer = () => (
    <Drawer
      anchor="bottom"
      open={mobileFilterOpen}
      onClose={() => setMobileFilterOpen(false)}
      PaperProps={{
        sx: {
          height: "80vh",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          p: { xs: 2, sm: 3 },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: getFontSize.h6 }}>
          Filter Notices
        </Typography>
        <IconButton onClick={() => setMobileFilterOpen(false)} size="small">
          <Close />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Stack spacing={2.5}>
        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search notices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        {/* Year Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {getAvailableYears().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Category Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {noticeCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Priority Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Priority</InputLabel>
          <Select
            value={selectedPriority}
            label="Priority"
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            {priorityOptions.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                <Chip
                  label={option.label}
                  size="small"
                  color={option.color}
                  sx={{ fontSize: getFontSize.caption }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Clear Filters Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => {
            setSearchTerm("");
            setSelectedYear("All");
            setSelectedCategory("All");
            setSelectedPriority("All");
            setTabValue(0);
            setMobileFilterOpen(false);
          }}
          size="medium"
        >
          Clear Filters
        </Button>
      </Stack>
    </Drawer>
  );

  // Notice Card Component
  const NoticeCard = ({ notice }) => {
    const isAdmin = userRole.toLowerCase() === "admin";
    const hasRead = notice.readBy.some(
      (reader) => reader.employeeID === userID,
    );
    const priorityColor =
      notice.priority === "High"
        ? "error"
        : notice.priority === "Medium"
          ? "warning"
          : "info";
    const readPercentage = notice.allEmployees?.length > 0
      ? Math.round((notice.readBy.length / notice.allEmployees.length) * 100)
      : 0;

    const handleCardClick = () => {
      setSelectedNotice(notice);
      setOpenNoticeDetailDialog(true);

      if (isAdmin && !hasRead) {
        markAsRead(notice.id);
      }

      // Auto-mark as read for non-admin users
      if (!isAdmin && !hasRead) {
        handleMarkAsRead(notice.id);
      }
    };

    return (
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: { xs: 1.5, sm: 2 },
          borderLeft: { xs: `4px solid ${theme.palette[priorityColor].main}`, sm: `6px solid ${theme.palette[priorityColor].main}` },
          // backgroundColor: notice.isActive ? alpha(theme.palette.info.main, 0.08) : alpha(theme.palette.grey[500], 0.08),
          backgroundColor: notice.isActive ? "#c4efff" : "#f5f5f5",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            transform: isDesktop ? "translateY(-4px)" : "none",
            boxShadow: isDesktop ? "0 8px 25px rgba(0,0,0,0.1)" : theme.shadows[2],
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette[priorityColor].main}`,
            outlineOffset: "2px",
          },
        }}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
        tabIndex={0}
        aria-label={`Notice: ${notice.title}, Priority: ${notice.priority}`}
      >
        <CardContent
          sx={{ 
            p: { xs: 1.5, sm: 2, md: 2.5 }, 
            flexGrow: 1, 
            display: "flex", 
            flexDirection: "column" 
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
            sx={{ flexWrap: "wrap", gap: 0.5 }}
          >
            <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
              <Chip
                icon={<Category sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }} />}
                label={notice.category}
                size="small"
                variant="outlined"
                sx={{ 
                  fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                  height: { xs: 20, sm: 24 },
                }}
              />
              <Chip
                label={notice.priority}
                size="small"
                color={priorityColor}
                sx={{ 
                  fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                  height: { xs: 20, sm: 24 },
                }}
              />
              {!notice.isActive && isAdmin && (
                <Chip
                  label="Archived"
                  size="small"
                  color="default"
                  variant="outlined"
                  sx={{ 
                    fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                    height: { xs: 20, sm: 24 },
                  }}
                />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: getFontSize.caption }}>
              {notice.year}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: { xs: "2.4rem", sm: "2.6rem" },
            }}
          >
            {notice.title}
          </Typography>

          {/* Content preview */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              fontSize: getFontSize.body2,
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: { xs: 2, sm: 3 },
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flexGrow: 1,
              minHeight: { xs: "2.4rem", sm: "3.6rem" },
            }}
          >
            {notice.content}
          </Typography>

          {/* Stats */}
          <Box sx={{ mt: "auto" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Person sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} color="action" />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: getFontSize.caption }}>
                  {notice.createdBy}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Visibility sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} color="action" />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: getFontSize.caption }}>
                  {notice.readBy.length}
                </Typography>
              </Box>
            </Box>

            {/* Read progress */}
            {notice.allEmployees?.length > 0 && (
              <Box sx={{ mb: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={readPercentage}
                  color={
                    readPercentage > 80
                      ? "success"
                      : readPercentage > 50
                        ? "warning"
                        : "error"
                  }
                  sx={{ height: { xs: 3, sm: 4 }, borderRadius: 2 }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, fontSize: getFontSize.caption }}
                >
                  Read: {notice.readBy.length}/{notice.allEmployees.length} ({readPercentage}%)
                </Typography>
              </Box>
            )}

            {/* Actions */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              sx={{ flexWrap: "wrap" }}
            >
              {isAdmin ? (
                <>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Visibility sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNotice(notice);
                      setOpenReadStatusDialog(true);
                    }}
                    sx={{ 
                      fontSize: getFontSize.caption,
                      py: { xs: 0.25, sm: 0.5 },
                      px: { xs: 1, sm: 1.5 },
                    }}
                  >
                    Status
                  </Button>
                  <Box display="flex" gap={0.5}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditNotice(notice);
                        }}
                        sx={{ 
                          width: { xs: 28, sm: 32 }, 
                          height: { xs: 28, sm: 32 },
                        }}
                      >
                        <Edit sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={notice.isActive ? "Archive" : "Activate"}>
                      <IconButton
                        size="small"
                        color={notice.isActive ? "default" : "success"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleActive(notice.id);
                        }}
                        sx={{ 
                          width: { xs: 28, sm: 32 }, 
                          height: { xs: 28, sm: 32 },
                        }}
                      >
                        {notice.isActive ? (
                          <Close sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                        ) : (
                          <CheckCircle sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotice(notice.id);
                        }}
                        sx={{ 
                          width: { xs: 28, sm: 32 }, 
                          height: { xs: 28, sm: 32 },
                        }}
                      >
                        <Delete sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <Button
                  fullWidth
                  size="small"
                  variant={hasRead ? "outlined" : "contained"}
                  color={hasRead ? "success" : "primary"}
                  startIcon={hasRead ? <CheckCircle sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} /> : <Visibility sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />}
                  disabled={hasRead ? true : false}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsRead(notice.id);
                  }}
                  sx={{ 
                    fontSize: getFontSize.caption,
                    py: { xs: 0.5, sm: 0.75 },
                  }}
                >
                  {hasRead ? "Mark as Unread" : "Mark as Read"}
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "80vh",
        // p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
        py:7
      }}
    >
      <Container maxWidth="xl" disableGutters>
        {/* Header */}
        <Box
          sx={{
            mb: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Title and Actions Row */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ xs: "column", sm: "row" }}
            sx={{ gap: { xs: 2, sm: 2 } }}
          >
            <Box display="flex" alignItems="center" gap={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #114b7d, rgba(10, 143, 167, 0.8))",
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  color: "#f2f6f6",
                }}
              >
                <Announcement sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
              </Avatar>
              <Box>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  component="h1"
                  sx={{ fontSize: getFontSize.h4 }}
                >
                  Notices
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: getFontSize.body2 }}
                >
                  {userRole.toLowerCase() === "admin"
                    ? "Manage and track notices for all employees"
                    : "Stay updated with important announcements"}
                </Typography>
              </Box>
            </Box>

            {userRole.toLowerCase() === "admin" && (
              <Box 
                display="flex" 
                gap={1} 
                sx={{ 
                  width: { xs: "100%", sm: "auto" },
                  flexDirection: { xs: "row", sm: "row" },
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={handleExportData}
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    flex: { xs: 1, sm: "none" },
                    fontSize: getFontSize.body2,
                  }}
                >
                  Export
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => {
                    resetNewNotice();
                    setEditingNotice(false);
                    setOpenNoticeDialog(true);
                  }}
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    flex: { xs: 1, sm: "none" },
                    fontSize: getFontSize.body2,
                  }}
                >
                  Create
                </Button>
              </Box>
            )}
          </Box>

          {/* Filters Row - Desktop */}
          {!isMobile && (
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={1.5} alignItems="center">
                {/* Search */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search notices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ fontSize: getFontSize.body2 }}
                  />
                </Grid>

                {/* Year Filter */}
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ fontSize: getFontSize.body2 }}>Year</InputLabel>
                    <Select
                      value={selectedYear}
                      label="Year"
                      onChange={(e) => setSelectedYear(e.target.value)}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      {getAvailableYears().map((year) => (
                        <MenuItem key={year} value={year} sx={{ fontSize: getFontSize.body2 }}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Category Filter */}
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ fontSize: getFontSize.body2 }}>Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      label="Category"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      {noticeCategories.map((category) => (
                        <MenuItem key={category} value={category} sx={{ fontSize: getFontSize.body2 }}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Priority Filter */}
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ fontSize: getFontSize.body2 }}>Priority</InputLabel>
                    <Select
                      value={selectedPriority}
                      label="Priority"
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      {priorityOptions.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          <Chip
                            label={option.label}
                            size="small"
                            color={option.color}
                            sx={{ fontSize: getFontSize.caption }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Clear Filters */}
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedYear("All");
                      setSelectedCategory("All");
                      setSelectedPriority("All");
                      setTabValue(0);
                    }}
                    size="small"
                    sx={{ fontSize: getFontSize.body2 }}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Mobile Filter Button */}
          {isMobile && (
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Search />}
                onClick={() => setMobileFilterOpen(true)}
                size="medium"
                sx={{ 
                  justifyContent: "space-between",
                  py: 1.2,
                }}
              >
                <Typography sx={{ fontSize: getFontSize.body1 }}>
                  {searchTerm ? `"${searchTerm}"` : "Search & Filter Notices"}
                </Typography>
                <Chip 
                  label="Filters" 
                  size="small" 
                  color="primary" 
                  sx={{ ml: 1 }}
                />
              </Button>
            </Box>
          )}
        </Box>

        {/* Notices Grid */}
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={notice.id}>
                <NoticeCard notice={notice} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box textAlign="center" py={{ xs: 4, sm: 6 }}>
                <Announcement
                  sx={{ fontSize: { xs: 40, sm: 60 }, color: "text.disabled", mb: 2 }}
                />
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ fontSize: getFontSize.h6 }}
                >
                  No notices found
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: getFontSize.body2 }}
                >
                  Try adjusting your filters or create a new notice
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer />

      {/* Create/Edit Notice Dialog */}
      <Dialog
        open={openNoticeDialog}
        onClose={() => {
          setOpenNoticeDialog(false);
          resetNewNotice();
          setEditingNotice(false);
          setValidationErrors({});
        }}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            m: isMobile ? 0 : { xs: 2, sm: 3 },
            borderRadius: isMobile ? 0 : { xs: 2, sm: 3 },
          }
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            pb: 2,
            color: "white",
            background: "linear-gradient(to right, #0a6faa 0%, #1c6a84 60%)",
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 2 },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              component="div"
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}
            >
              {editingNotice ? "Edit Notice" : "Create New Notice"}
            </Typography>
            {editingNotice && (
              <Chip
                label="Editing"
                color="warning"
                size="small"
                icon={<Edit fontSize="small" />}
                sx={{ fontSize: getFontSize.caption }}
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            mt: { xs: 1, sm: 2 },
            overflow: "visible",
          }}
        >
          <Stack spacing={{ xs: 2, sm: 2.5 }}>
            {/* Notice Title */}
            <Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <InputLabel
                  required
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  }}
                >
                  Notice Title
                </InputLabel>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: getFontSize.caption }}>
                  {newNotice.title.length}/100
                </Typography>
              </Box>
              <TextField
                value={newNotice.title}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setNewNotice({ ...newNotice, title: e.target.value });
                    if (validationErrors.title) {
                      setValidationErrors((prev) => ({ ...prev, title: "" }));
                    }
                  }
                }}
                placeholder="Enter a clear, descriptive title"
                fullWidth
                size="small"
                error={!!validationErrors.title}
                helperText={validationErrors.title}
                FormHelperTextProps={{
                  sx: { fontSize: getFontSize.caption }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: getFontSize.body2,
                  },
                }}
              />
            </Box>

            {/* Content */}
            <Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <InputLabel
                  required
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  }}
                >
                  Content
                </InputLabel>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: getFontSize.caption }}>
                  {newNotice.content.length}/2000
                </Typography>
              </Box>
              <TextField
                value={newNotice.content}
                error={!!validationErrors.content}
                helperText={validationErrors.content}
                FormHelperTextProps={{
                  sx: { fontSize: getFontSize.caption }
                }}
                onChange={(e) => {
                  if (e.target.value.length <= 2000) {
                    setNewNotice({ ...newNotice, content: e.target.value });
                    if (validationErrors.content) {
                      setValidationErrors((prev) => ({ ...prev, content: "" }));
                    }
                  }
                }}
                placeholder="Provide detailed information about the notice..."
                multiline
                rows={isMobile ? 4 : 5}
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: getFontSize.body2,
                  },
                }}
              />
            </Box>

            {/* Category & Priority - Side by Side */}
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <InputLabel
                    required
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    Category
                  </InputLabel>
                  <TextField
                    select
                    value={newNotice.category}
                    onChange={(e) => {
                      setNewNotice({ ...newNotice, category: e.target.value });
                      if (validationErrors.category) {
                        setValidationErrors((prev) => ({ ...prev, category: "" }));
                      }
                    }}
                    error={!!validationErrors.category}
                    helperText={validationErrors.category}
                    FormHelperTextProps={{
                      sx: { fontSize: getFontSize.caption }
                    }}
                    fullWidth
                    size="small"
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            maxHeight: 250,
                            borderRadius: "8px",
                          },
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: getFontSize.body2,
                      },
                    }}
                  >
                    {noticeCategories
                      .filter((cat) => cat !== "All")
                      .map((category) => (
                        <MenuItem
                          key={category}
                          value={category}
                          sx={{ 
                            py: 1,
                            fontSize: getFontSize.body2,
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Category
                              fontSize="small"
                              sx={{ color: "text.secondary", fontSize: "1rem" }}
                            />
                            <Typography variant="body2" sx={{ fontSize: getFontSize.body2 }}>
                              {category}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <InputLabel
                    required
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    Priority
                  </InputLabel>
                  <TextField
                    select
                    value={newNotice.priority}
                    onChange={(e) => {
                      setNewNotice({ ...newNotice, priority: e.target.value });
                      if (validationErrors.priority) {
                        setValidationErrors((prev) => ({ ...prev, priority: "" }));
                      }
                    }}
                    error={!!validationErrors.priority}
                    helperText={validationErrors.priority}
                    FormHelperTextProps={{
                      sx: { fontSize: getFontSize.caption }
                    }}
                    fullWidth
                    size="small"
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            maxHeight: 250,
                            borderRadius: "8px",
                          },
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: getFontSize.body2,
                      },
                    }}
                  >
                    {priorityOptions
                      .filter((p) => p.label !== "All")
                      .map((option) => (
                        <MenuItem
                          key={option.label}
                          value={option.label}
                          sx={{ 
                            py: 1,
                            fontSize: getFontSize.body2,
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <FiberManualRecord
                              fontSize="small"
                              sx={{
                                color: (theme) =>
                                  theme.palette[option.color]?.main ||
                                  "text.secondary",
                                fontSize: "0.75rem",
                              }}
                            />
                            <Typography variant="body2" sx={{ fontSize: getFontSize.body2 }}>
                              {option.label}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <InputLabel
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    Expiry Date
                  </InputLabel>
                  <TextField
                    type="date"
                    value={newNotice.expiresAt}
                    onChange={(e) => {
                      setNewNotice({ ...newNotice, expiresAt: e.target.value });
                      if (e.target.value) {
                        const expiryDate = new Date(e.target.value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (expiryDate < today) {
                          setValidationErrors((prev) => ({
                            ...prev,
                            expiresAt: "Expiry date cannot be in the past",
                          }));
                        } else {
                          setValidationErrors((prev) => ({
                            ...prev,
                            expiresAt: "",
                          }));
                        }
                      }
                    }}
                    error={!!validationErrors.expiresAt}
                    helperText={validationErrors.expiresAt}
                    FormHelperTextProps={{
                      sx: { fontSize: getFontSize.caption }
                    }}
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: getFontSize.body2,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block", fontSize: getFontSize.caption }}
                  >
                    Leave empty for no expiration
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <InputLabel
                    required
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    Publish Year
                  </InputLabel>
                  <TextField
                    type="number"
                    value={newNotice.year}
                    disabled
                    onChange={(e) => {
                      const year = parseInt(e.target.value) || "";
                      setNewNotice({ ...newNotice, year });
                      if (validationErrors.year) {
                        setValidationErrors((prev) => ({ ...prev, year: "" }));
                      }
                    }}
                    error={!!validationErrors.year}
                    helperText={validationErrors.year}
                    FormHelperTextProps={{
                      sx: { fontSize: getFontSize.caption }
                    }}
                    placeholder="YYYY"
                    fullWidth
                    size="small"
                    InputProps={{
                      inputProps: {
                        min: 2000,
                        max: new Date().getFullYear() + 1,
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: getFontSize.body2,
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* File Upload Section */}
            <Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                sx={{ flexWrap: "wrap", gap: 0.5 }}
              >
                <InputLabel
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  }}
                >
                  Attachments
                </InputLabel>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: getFontSize.caption }}>
                  Max 10MB • Max 5 files
                </Typography>
              </Box>

              {/* File Upload Area */}
              <Paper
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  backgroundColor: validationErrors.attachments
                    ? alpha(theme.palette.error.main, 0.05)
                    : "background.default",
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderColor: validationErrors.attachments
                    ? "error.main"
                    : "divider",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  p: { xs: 2, sm: 3 },
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: validationErrors.attachments
                      ? "error.main"
                      : "primary.main",
                    backgroundColor: validationErrors.attachments
                      ? alpha(theme.palette.error.main, 0.08)
                      : alpha(theme.palette.primary.main, 0.02),
                  },
                }}
                onClick={() => {
                  if (newNotice.attachments.length >= 5) {
                    setValidationErrors((prev) => ({
                      ...prev,
                      attachments: "Maximum 5 files allowed",
                    }));
                    return;
                  }
                  document.getElementById("file-upload").click();
                }}
              >
                <input
                  id="file-upload"
                  type="file"
                  hidden
                  onChange={handleFileSelect}
                  disabled={newNotice.attachments.length >= 5}
                />

                <CloudUpload
                  sx={{
                    fontSize: { xs: 36, sm: 48 },
                    color: validationErrors.attachments
                      ? "error.main"
                      : "text.secondary",
                    mb: 1,
                    opacity: newNotice.attachments.length >= 5 ? 0.5 : 1,
                  }}
                />

                <Typography
                  variant="body1"
                  fontWeight={500}
                  gutterBottom
                  color={
                    validationErrors.attachments ? "error.main" : "text.primary"
                  }
                  sx={{ fontSize: getFontSize.body1 }}
                >
                  {newNotice.attachments.length >= 5
                    ? "Maximum files reached (5/5)"
                    : selectedFile
                      ? "File Selected"
                      : "Choose Files"}
                </Typography>

                <Typography
                  variant="body2"
                  color={
                    validationErrors.attachments
                      ? "error.main"
                      : "text.secondary"
                  }
                  paragraph
                  sx={{ fontSize: getFontSize.body2 }}
                >
                  {selectedFile
                    ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})`
                    : "Supports PDF, DOC, TXT, JPG, PNG"}
                </Typography>

                {validationErrors.attachments && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: 2,
                      borderRadius: "8px",
                      "& .MuiAlert-icon": {
                        fontSize: "1.2rem",
                      },
                      "& .MuiAlert-message": {
                        fontSize: getFontSize.body2,
                      },
                    }}
                  >
                    {validationErrors.attachments}
                  </Alert>
                )}

                {selectedFile && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    gap={1}
                    mt={2}
                    flexWrap="wrap"
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      Change
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUploadFile();
                      }}
                      startIcon={<Upload />}
                      disabled={newNotice.attachments.length >= 5}
                      sx={{ fontSize: getFontSize.body2 }}
                    >
                      Upload
                    </Button>
                  </Box>
                )}
              </Paper>

              {fileUploadError && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 2,
                    borderRadius: "8px",
                    "& .MuiAlert-icon": {
                      fontSize: "1.2rem",
                    },
                    "& .MuiAlert-message": {
                      fontSize: getFontSize.body2,
                    },
                  }}
                >
                  {fileUploadError}
                </Alert>
              )}

              {/* Uploaded Files List */}
              {newNotice.attachments.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                    sx={{ flexWrap: "wrap", gap: 1 }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontSize: getFontSize.body1,
                      }}
                    >
                      Uploaded Files ({newNotice.attachments.length}/5)
                    </Typography>
                    {newNotice.attachments.length >= 5 && (
                      <Chip
                        label="Maximum reached"
                        color="warning"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: getFontSize.caption }}
                      />
                    )}
                  </Box>
                  <Stack spacing={1.5}>
                    {newNotice.attachments.map((file, index) => (
                      <Paper
                        key={file.id}
                        variant="outlined"
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1.5}
                          flex={1}
                          sx={{ minWidth: 0 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "primary.light",
                              color: "primary.main",
                              width: { xs: 32, sm: 40 },
                              height: { xs: 32, sm: 40 },
                            }}
                          >
                            {getFileIcon(file.name, true)}
                          </Avatar>
                          <Box flex={1} minWidth={0}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ 
                                fontWeight: 500,
                                fontSize: getFontSize.body2,
                              }}
                            >
                              {file.name}
                            </Typography>
                            <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: getFontSize.caption }}
                              >
                                {file.size}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: getFontSize.caption }}
                              >
                                {file.uploadedAt}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveAttachment(index)}
                          sx={{
                            color: "error.main",
                            width: { xs: 28, sm: 32 },
                            height: { xs: 28, sm: 32 },
                          }}
                        >
                          <Delete sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                        </IconButton>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <Paper
          elevation={0}
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "background.paper",
            borderTop: 1,
            borderColor: "divider",
            zIndex: 1,
          }}
        >
          <DialogActions
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              gap: 1,
              justifyContent: "flex-end",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              onClick={() => {
                setOpenNoticeDialog(false);
                resetNewNotice();
                setEditingNotice(false);
                setValidationErrors({});
              }}
              color="inherit"
              fullWidth={isMobile}
              sx={{ 
                minWidth: { xs: "100%", sm: 100 },
                fontSize: getFontSize.body2,
                order: { xs: 2, sm: 1 },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveNotice}
              startIcon={editingNotice ? <Edit /> : <Add />}
              disabled={Object.keys(validationErrors).some(
                (key) => validationErrors[key],
              )}
              fullWidth={isMobile}
              sx={{ 
                minWidth: { xs: "100%", sm: 140 },
                fontSize: getFontSize.body2,
                order: { xs: 1, sm: 2 },
              }}
            >
              {editingNotice ? "Update" : "Publish"}
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>

      {/* Notice Detail Dialog */}
      <NoticeDetailDialog
        open={openNoticeDetailDialog}
        onClose={() => {
          setOpenNoticeDetailDialog(false);
          setSelectedNotice(null);
        }}
        notice={selectedNotice}
        userRole={userRole}
        userID={userID}
        onMarkAsRead={handleMarkAsRead}
        theme={theme}
      />

      {/* Read Status Dialog */}
      <ReadStatusDialog
        open={openReadStatusDialog}
        onClose={() => setOpenReadStatusDialog(false)}
        notice={selectedNotice}
        theme={theme}
      />
    </Box>
  );
};

export default DashboardHome;