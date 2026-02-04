import {
    Add,
    Announcement,
    CalendarToday,
    CheckCircle,
    Close,
    Delete,
    Edit,
    Person,
    Visibility,
    FilterList,
    PictureAsPdf,
    TextSnippet,
    Image,
    InsertDriveFile,
    Download,
    ArrowBack,
    AttachFile,
    Description,
    Flag,
    Category,
    AccessTime,
    CloudUpload,
    Search,
    Refresh,
    Business,
    Groups,
    Upload,
    FiberManualRecord
} from '@mui/icons-material';
import {
    alpha,
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
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
    FormControl,
    InputLabel,
    Select,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Tabs,
    Tab,
    Badge,
    Divider,
    Alert
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getMarkNoticeAsRead, getNoticesAttachmentList, getNoticesList, getNoticesReadByList, updateNoticesDetails } from '../../services/AppConfigAction';
import { useDispatch, useSelector } from 'react-redux';
import cloudCartoon from '../../assets/images/cloudCartoon.avif';
import Swal from 'sweetalert2';
import NoticeDetailDialog from './NoticeDetailDialog';
import ReadStatusDialog from './ReadStatusDialog';
import { decrementUnreadCount, setNotifications } from '../../redux/slices/notificationSlice';

const DashboardHome = () => {
    const { user } = useSelector((state) => state.auth);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState('');

    const currentUser = user || {
        name: 'Pramod Kumar W',
        role: 'admin',
        email: 'pramod@example.com',
    };

    const userRole = currentUser.role;
    const userName = currentUser.name;
    const userID = currentUser.id;

    const allEmployeesD =
        [
            { id: 1, name: 'John Doe', department: 'Engineering' },
            { id: 2, name: 'Jane Smith', department: 'HR' },
            { id: 3, name: 'Mike Johnson', department: 'Sales' },
            { id: 4, name: 'Sarah Williams', department: 'Marketing' },
            { id: 5, name: 'Robert Brown', department: 'Engineering' },
            { id: 6, name: 'Emily Davis', department: 'Finance' }
        ];

    const [newNotice, setNewNotice] = useState({
        title: '',
        content: '',
        category: 'Announcement',
        priority: 'Medium',
        year: new Date().getFullYear(),
        expiresAt: '',
        isImportant: false,
        attachments: [],
        allEmployees: []
    });

    useEffect(() => {
        const loadAllData = async () => {
            // setLoading(true);
            // showLoader(eaplRotatingLogo, 0);
            try {
                await loadNoticeDetails();
                // await loadNoticeReadBy();
                // await loadNoticeAttachment();
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                // setLoading(false);
                // hideLoader();
            }
        };

        loadAllData();
    }, [dispatch]);

    const loadNoticeDetails = async () => {
        const payload = {
            noticeID: 0,
            category: '',
            priority: '',
            isActive: null,
            publishYear: 0,
            searchText: ''
        };

        const result = await dispatch(getNoticesList(payload));
        if (result.type === "NOTICE_LIST") {
            const formattedNotices = result.payload.dataList.map(notice => ({
                ...notice,
                // allEmployees: allEmployeesD
            }));
            setNotices(formattedNotices);
            setFilteredNotices(formattedNotices);
        }
    };

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
            fileType: '',
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
    const [fileUploadError, setFileUploadError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPriority, setSelectedPriority] = useState('All');
    const [tabValue, setTabValue] = useState(0);
    const [editingNotice, setEditingNotice] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    // Available options
    const noticeCategories = [
        'All',
        'Announcement',
        'Policy Update',
        'Event',
        'Maintenance',
        'Urgent',
        'Holiday',
        'General',
        'Meeting',
        'Training',
        'System Update'
    ];

    const priorityOptions = [
        { label: 'All', color: 'default' },
        { label: 'High', color: 'error' },
        { label: 'Medium', color: 'warning' },
        { label: 'Low', color: 'info' }
    ];

    const years = ['All', 2024, 2023, 2022, 2021, 2020];

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
        const yearsSet = new Set(notices.map(notice => notice.year));
        return ['All', ...Array.from(yearsSet).sort((a, b) => b - a)];
    };

    // Get file icon
    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        return fileTypes[extension] || fileTypes.default;
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (typeof bytes === 'string') return bytes;
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Filter notices based on criteria
    useEffect(() => {
        const isAdmin = userRole.toLowerCase() === 'admin';
        let filtered = notices;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(notice =>
                notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notice.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by year
        if (selectedYear !== 'All') {
            filtered = filtered.filter(notice => notice.year === selectedYear);
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(notice => notice.category === selectedCategory);
        }

        // Filter by priority
        if (selectedPriority !== 'All') {
            filtered = filtered.filter(notice => notice.priority === selectedPriority);
        }

        // MOST IMPORTANT: Role-based filtering
        // Admin sees ALL notices (active + inactive)
        // Non-admin sees ONLY active notices
        if (!isAdmin) {
            filtered = filtered.filter(notice => notice.isActive);
        }
        // If isAdmin, no additional filtering needed - show everything

        setFilteredNotices(filtered);
    }, [notices, searchTerm, selectedYear, selectedCategory, selectedPriority, userRole]);

    // Open file function
    const handleOpenFile = (file) => {
        if (file.url) {
            window.open(file.url, '_blank');
        } else {
            // For demo purposes, show alert
            alert(`Opening file: ${file.name}\n\nIn a real application, this would open:\n${file.url || 'File from server'}`);
        }
    };

    // Download file function
    const handleDownloadFile = (file) => {
        if (file.url) {
            const link = document.createElement('a');
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
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this notice?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            // Prepare delete request DTO
            const deleteRequest = {
                indicator: 'D', // D=Delete
                id: id,
                isActive: false
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
                    title: 'Success!',
                    text: 'Notice deleted successfully!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6'
                });
            } else {
                await Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete notice. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                });
            }
        } catch (error) {
            console.error('Error deleting notice:', error);
            await Swal.fire({
                title: 'Error!',
                text: 'An error occurred while deleting the notice.',
                icon: 'error',
                confirmButtonColor: '#3085d6'
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
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            return;
        }

        try {
            // Prepare the request DTO based on indicator
            const requestDto = {
                indicator: editingNotice ? 'U' : 'I', // I=Insert, U=Update
                title: newNotice.title,
                content: newNotice.content,
                category: newNotice.category,
                priority: newNotice.priority,
                createdBy: userName,
                expiresAt: newNotice.expiresAt || null,
                isActive: true, // Always active when created/updated
                year: newNotice.year || new Date().getFullYear(),
                attachments: newNotice.attachments.map(att => ({
                    // Map your attachment structure to AttachmentNoticeDto
                    name: att.name,
                    size: att.size,
                    type: att.type,
                    url: att.url || '',
                    uploadedAt: att.uploadedAt
                })),
                readBy: editingNotice ?
                    // For updates, include existing readBy data
                    (editingNotice.readBy || []).map(reader => ({
                        id: reader.id,
                        noticeID: editingNotice.id,
                        employeeID: reader.employeeID,
                        empName: reader.name,
                        readAt: reader.readAt
                    })) :
                    [], // Empty for new notices
                allEmployees: []
            };

            // Add ID for update operations
            if (editingNotice) {
                requestDto.id = editingNotice.id;
            }

            // Show loading swal
            Swal.fire({
                title: 'Saving...',
                text: 'Please wait while we save your notice.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
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
                    title: 'Success!',
                    text: editingNotice ? 'Notice updated successfully!' : 'Notice created successfully!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6'
                });
            } else {
                await Swal.fire({
                    title: 'Error!',
                    text: 'Failed to save notice. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                });
            }
        } catch (error) {
            console.error('Error saving notice:', error);
            await Swal.fire({
                title: 'Error!',
                text: 'An error occurred while saving the notice.',
                icon: 'error',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    // Edit notice
    const handleEditNotice = (notice) => {
        setNewNotice({
            ...notice,
            expiresAt: notice.expiresAt || '',
            isImportant: notice.isImportant || false,
            attachments: notice.attachments || [],
            allEmployees: notice.allEmployees || []
        });
        setEditingNotice(notice);
        setOpenNoticeDialog(true);
    };

    const handleMarkAsRead = async (noticeId) => {
        const notice = notices.find(n => n.id === noticeId);
        const hasRead = notice.readBy.some(reader => reader.employeeID === userID);

        try {
            const updatedReadBy = hasRead
                ? notice.readBy.filter(reader => reader.employeeID !== userID)
                : [
                    ...notice.readBy,
                    {
                        id: userID,
                        employeeID: userID,
                        name: userName,
                        noticeID: noticeId,
                        readAt: new Date().toLocaleString()
                    }
                ];

            // Update the notice with new readBy status
            const updateRequest = {
                indicator: 'U',
                id: noticeId,
                title: notice.title,
                content: notice.content,
                category: notice.category,
                priority: notice.priority,
                createdBy: notice.createdBy,
                expiresAt: notice.expiresAt || null,
                isActive: notice.isActive,
                year: notice.year,
                attachments: (notice.attachments || []).map(att => ({
                    name: att.name,
                    size: att.size,
                    type: att.type,
                    url: att.url || '',
                    uploadedAt: att.uploadedAt
                })),
                readBy: updatedReadBy.map(reader => ({
                    id: reader.id,
                    employeeID: reader.employeeID,
                    empName: reader.name,
                    noticeID: noticeId,
                    readAt: reader.readAt
                })),
                // allEmployees: (notice.allEmployees || []).map(emp => ({
                //     id: emp.id,
                //     name: emp.name,
                //     department: emp.department
                // })),
                allEmployees: []
            };

            const result = await dispatch(updateNoticesDetails(updateRequest));

            if (result.type === "NOTICE_DETAILS_UPDATE_SUCCESS") {
                // Update local state immediately for better UX
                setNotices(prev => prev.map(notice => {
                    if (notice.id === noticeId) {
                        if (hasRead) {
                            return {
                                ...notice,
                                readBy: notice.readBy.filter(reader => reader.employeeID !== userID),
                                views: Math.max(0, notice.views - 1)
                            };
                        } else {
                            return {
                                ...notice,
                                readBy: updatedReadBy,
                                views: notice.views + 1
                            };
                        }
                    }
                    return notice;
                }));
                dispatch(decrementUnreadCount());
            } else {
                console.error('Failed to update read status. Please try again');
                alert('Failed to update read status. Please try again.');
            }
        } catch (error) {
            console.error('Error updating read status:', error);
            alert('An error occurred while updating read status.');
        }
    };

    // Update UI immediately, then sync with backend
    const markAsRead = async (noticeId) => {
        // Optimistically update UI
        // setHasRead(true);

        try {
            // API call
            const result = await dispatch(getMarkNoticeAsRead({
                employeeId: user.id,
                noticeId: noticeId
            }));

            // Revert on error
            if (result.payload?.success) {
                await loadNoticeDetails();
                dispatch(decrementUnreadCount());
            }
        } catch (error) {
            console.log('DashBoradHome.jsx markAsRead error:', error);

        }
    };

    // Toggle notice active status
    const handleToggleActive = async (noticeId) => {
        const notice = notices.find(n => n.id === noticeId);
        if (!notice) return;

        const newStatus = !notice.isActive;
        const action = newStatus ? 'activate' : 'archive';

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `you want to ${action} this notice?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: newStatus ? '#28a745' : '#6c757d',
            cancelButtonColor: '#3085d6',
            confirmButtonText: newStatus ? 'Yes, activate it!' : 'Yes, archive it!',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const updateRequest = {
                indicator: 'U', // Update operation
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
                attachments: (notice.attachments || []).map(att => ({
                    name: att.name,
                    size: att.size,
                    type: att.type,
                    url: att.url || '',
                    uploadedAt: att.uploadedAt
                })),
                readBy: (notice.readBy || []).map(reader => ({
                    id: reader.id,
                    employeeID: reader.employeeID,
                    empName: reader.name,
                    noticeID: noticeId,
                    readAt: reader.readAt
                })),
                allEmployees: []
            };

            // Show loading state
            Swal.fire({
                title: 'Updating...',
                text: 'Please wait while we update the notice status.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const result = await dispatch(updateNoticesDetails(updateRequest));

            if (result.type === "NOTICE_DETAILS_UPDATE_SUCCESS") {
                // Refresh the notices list
                await loadNoticeDetails();

                await Swal.fire({
                    title: 'Success!',
                    text: `Notice ${newStatus ? 'activated' : 'archived'} successfully!`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    timer: 1500,
                    timerProgressBar: true
                });
            } else {
                await Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update notice status. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                });
            }
        } catch (error) {
            console.error('Error toggling notice status:', error);
            await Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating notice status.',
                icon: 'error',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    // Reset form
    const resetNewNotice = () => {
        setNewNotice({
            title: '',
            content: '',
            category: 'Announcement',
            priority: 'Medium',
            year: new Date().getFullYear(),
            expiresAt: '',
            isImportant: false,
            attachments: [],
            allEmployees: []
        });
        setSelectedFile(null);
        setFileUploadError('');
    };

    // File upload handlers
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const allowedTypes = ['.pdf', '.txt', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

        if (!allowedTypes.some(type => fileExtension === type)) {
            setFileUploadError('Please select a PDF, TXT, DOC, DOCX, JPG, or PNG file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setFileUploadError('File size must be less than 10MB');
            return;
        }

        setSelectedFile(file);
        setFileUploadError('');
    };

    const handleUploadFile = () => {
        if (!selectedFile) {
            setFileUploadError('Please select a file first');
            return;
        }

        const fileType = selectedFile.name.split('.').pop().toLowerCase();
        const fileExtension = fileType === 'pdf' ? 'pdf' :
            ['doc', 'docx'].includes(fileType) ? 'doc' :
                ['jpg', 'jpeg', 'png'].includes(fileType) ? 'image' :
                    'txt';

        const newFile = {
            id: Date.now(),
            name: selectedFile.name,
            size: formatFileSize(selectedFile.size),
            type: fileExtension,
            url: URL.createObjectURL(selectedFile), // Create object URL for demo
            uploadedAt: new Date().toLocaleString()
        };

        setNewNotice(prev => ({
            ...prev,
            attachments: [...prev.attachments, newFile]
        }));

        setSelectedFile(null);
        setFileUploadError('');
        document.getElementById('file-upload').value = '';
    };

    const handleRemoveAttachment = (index) => {
        setNewNotice(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    // Export data
    const handleExportDataddddddd = () => {
        const csvData = notices.map(notice => ({
            'ID': notice.id,
            'Title': notice.title,
            'Category': notice.category,
            'Priority': notice.priority,
            'Year': notice.year,
            'Created By': notice.createdBy,
            'Created At': notice.createdAt,
            'Views': notice.views,
            'Readers': notice.readBy,
            'Total Employees': notice.allEmployees.length,
            'Read Percentage': `${Math.round((notice.readBy.length / notice.allEmployees.length) * 100)}%`,
            'Status': notice.isActive ? 'Active' : 'Inactive'
        }));

        const csvString = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(row => Object.values(row).join(','))
        ].join('\n');

        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `notices_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const handleExportData = () => {
        const csvData = notices.map(notice => ({
            'ID': notice.id,
            'Title': notice.title,
            'Category': notice.category,
            // 'Priority': notice.priority,
            'Year': notice.year,
            'Created By': notice.createdBy,
            'Created At': notice.createdAt,
            'Expires At': notice.expiresAt || 'N/A',
            // 'Views': notice.views,
            'Readers': notice.readBy.length,
            'Total Employees': notice.allEmployees.length,
            'Read Percentage': `${Math.round((notice.readBy.length / notice.allEmployees.length) * 100)}%`,
            'Status': notice.isActive ? 'Active' : 'Inactive',
            'Reader Names': notice.readBy.map(reader => reader.empName).join('; '),
            // 'Reader IDs': notice.readBy.map(reader => reader.employeeID).join(', '),
            'Reader Departments': notice.readBy.map(reader => {
                const employee = notice.allEmployees.find(emp => emp.id === reader.employeeID);
                return employee ? employee.department : 'N/A';
            }).join('; '),
            // 'All Employee Names': notice.allEmployees.map(emp => emp.name).join('; '),
            // 'All Employee Departments': notice.allEmployees.map(emp => emp.department).join('; ')
        }));

        // Escape CSV values that contain commas or quotes
        const escapeCSV = (value) => {
            if (value === null || value === undefined) return '';
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        };

        const csvString = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(row =>
                Object.values(row).map(value => escapeCSV(value)).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `notices_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        try {
            const date = new Date(dateString);

            // Format: "January 27, 2024"
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
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
            errors.title = 'Title is required';
        } else if (newNotice.title.length < 5) {
            errors.title = 'Title must be at least 5 characters';
        } else if (newNotice.title.length > 100) {
            errors.title = 'Title cannot exceed 100 characters';
        }

        // Content validation
        if (!newNotice.content.trim()) {
            errors.content = 'Content is required';
        } else if (newNotice.content.length < 10) {
            errors.content = 'Content must be at least 10 characters';
        } else if (newNotice.content.length > 2000) {
            errors.content = 'Content cannot exceed 2000 characters';
        }

        // Category validation
        if (!newNotice.category) {
            errors.category = 'Please select a category';
        }

        // Priority validation
        if (!newNotice.priority) {
            errors.priority = 'Please select a priority';
        }

        // Year validation
        if (!newNotice.year) {
            errors.year = 'Year is required';
        } else if (newNotice.year < 2000 || newNotice.year > currentYear + 1) {
            errors.year = `Year must be between 2000 and ${currentYear + 1}`;
        }

        // Expiry date validation
        if (newNotice.expiresAt) {
            const expiryDate = new Date(newNotice.expiresAt);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (expiryDate < today) {
                errors.expiresAt = 'Expiry date cannot be in the past';
            }
        }

        // Attachments validation (optional - if you want to limit)
        if (newNotice.attachments.length > 5) {
            errors.attachments = 'Maximum 5 files allowed';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Notice Card Component
    const NoticeCard = ({ notice }) => {
        const isAdmin = userRole.toLowerCase() === 'admin';
        const hasRead = notice.readBy.some(reader => reader.employeeID === userID);
        const priorityColor = notice.priority === 'High' ? 'error' :
            notice.priority === 'Medium' ? 'warning' : 'info';
        const readPercentage = Math.round((notice.readBy.length / notice.allEmployees.length) * 100);

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
                    width: '100%',  // Fill the grid item
                    minWidth: '100%',
                    height: '100%', // Fill available height

                    // Grid-specific optimizations
                    display: 'flex',
                    flexDirection: 'column',

                    // Visual styling
                    borderRadius: 2,
                    borderLeft: `6px solid ${theme.palette[priorityColor].main}`,
                    backgroundColor: notice.isActive ? '#c4efff' : '#f5f5f5',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    },

                    // Active/focus states
                    '&:active': {
                        transform: 'translateY(-2px)',
                    },
                    '&:focus-visible': {
                        outline: `3px solid ${theme.palette[priorityColor].main}`,
                        outlineOffset: '2px',
                    }
                }}
                onClick={handleCardClick}
                // Add keyboard accessibility
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick();
                    }
                }}
                tabIndex={0} // Make card focusable
                aria-label={`Notice: ${notice.title}, Priority: ${notice.priority}`}
            >
                <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
                        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                            <Chip
                                icon={<Category fontSize="small" />}
                                label={notice.category}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                            />
                            <Chip
                                label={notice.priority}
                                size="small"
                                color={priorityColor}
                                sx={{ fontSize: '0.7rem' }}
                            />
                            {!notice.isActive && isAdmin && (
                                <Chip
                                    label="Archived"
                                    size="small"
                                    color="default"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                />
                            )}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            {notice.year}
                        </Typography>
                    </Box>

                    {/* Title */}
                    <Typography variant="h6" fontWeight="bold" gutterBottom
                        sx={{
                            fontSize: '1rem',
                            width: { lg: '300px', xl: '320px' }
                        }}>
                        {notice.title}
                    </Typography>

                    {/* Content preview */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 2,
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flexGrow: 1,
                            width: { lg: '300px', xl: '320px' }
                        }}
                    >
                        {notice.content}
                    </Typography>

                    {/* Stats */}
                    <Box sx={{ mt: 'auto' }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                <Person fontSize="small" color="action" />
                                <Typography variant="caption" color="text.secondary">
                                    {notice.createdBy}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                <Visibility fontSize="small" color="action" />
                                <Typography variant="caption" color="text.secondary">
                                    {/* {notice.views} */}
                                    {notice.readBy.length}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Read progress */}
                        <Box sx={{ mb: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={readPercentage}
                                color={readPercentage > 80 ? 'success' : readPercentage > 50 ? 'warning' : 'error'}
                                sx={{ height: 4, borderRadius: 2 }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                Read: {notice.readBy.length}/{notice.allEmployees.length} ({readPercentage}%)
                            </Typography>
                        </Box>

                        {/* Actions */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                            {isAdmin ? (
                                <>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<Visibility />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedNotice(notice);
                                            setOpenReadStatusDialog(true);
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
                                            >
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={notice.isActive ? 'Archive' : 'Activate'}>
                                            <IconButton
                                                size="small"
                                                color={notice.isActive ? 'default' : 'success'}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleActive(notice.id);
                                                }}
                                            >
                                                {notice.isActive ? <Close fontSize="small" /> : <CheckCircle fontSize="small" />}
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
                                            >
                                                <Delete fontSize="small" />
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
                                    startIcon={hasRead ? <CheckCircle /> : <Visibility />}
                                    disabled={hasRead ? true : false}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMarkAsRead(notice.id);
                                    }}
                                >
                                    {hasRead ? 'Mark as Unread' : 'Mark as Read'}
                                </Button>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        );
    };

    // // Notice Detail Dialog
    // const NoticeDetailDialog = () => {
    //     if (!selectedNotice) return null;

    //     const isAdmin = userRole.toLowerCase() === 'admin';
    //     const hasRead = selectedNotice.readBy.some(reader => reader.employeeID === userID);
    //     const priorityColor = selectedNotice.priority === 'High' ? 'error' :
    //         selectedNotice.priority === 'Medium' ? 'warning' : 'info';

    //     return (
    //         <Dialog
    //             open={openNoticeDetailDialog}
    //             onClose={() => {
    //                 setOpenNoticeDetailDialog(false);
    //                 setSelectedNotice(null);
    //             }}
    //             maxWidth="md"
    //             fullWidth
    //             fullScreen={isMobile}
    //         >
    //             <DialogTitle sx={{
    //                 borderBottom: 1, borderColor: 'divider', pb: 2,
    //                 background: 'linear-gradient(to right, #0a6faa 0%, #1c6a84 60%)',
    //                 color: '#ffff'
    //             }}>
    //                 <Box display="flex" alignItems="center" justifyContent="space-between">
    //                     <Typography variant="h6" component="div" fontWeight="bold">
    //                         {selectedNotice.title}
    //                     </Typography>
    //                     <IconButton onClick={() => setOpenNoticeDetailDialog(false)} size="small" sx={{ color: 'white' }}>
    //                         <Close />
    //                     </IconButton>
    //                 </Box>
    //             </DialogTitle>

    //             <DialogContent sx={{ pt: 3 }}>
    //                 {/* Header Info */}
    //                 <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap="wrap" py={1}>
    //                     <Chip
    //                         icon={<Category fontSize="small" />}
    //                         label={selectedNotice.category}
    //                         size="small"
    //                         variant="outlined"
    //                     />
    //                     <Chip
    //                         label={selectedNotice.priority}
    //                         size="small"
    //                         color={priorityColor}
    //                     />
    //                     {/* <Chip
    //                         label={`Year: ${selectedNotice.year}`}
    //                         size="small"
    //                         variant="outlined"
    //                     /> */}
    //                     {!selectedNotice.isActive && (
    //                         <Chip
    //                             label="Archived"
    //                             size="small"
    //                             color="default"
    //                             variant="outlined"
    //                             sx={{ fontSize: '0.7rem' }}
    //                         />
    //                     )}
    //                     {hasRead && (
    //                         <Chip
    //                             icon={<CheckCircle fontSize="small" />}
    //                             label="Read"
    //                             size="small"
    //                             color="success"
    //                             variant="outlined"
    //                         />
    //                     )}
    //                 </Box>

    //                 {/* Metadata */}
    //                 <Grid container spacing={2} sx={{ mb: 3 }}>
    //                     <Grid item xs={12} sm={6}>
    //                         <Box display="flex" alignItems="center" gap={1}>
    //                             <Person fontSize="small" color="action" />
    //                             <Typography variant="body2" color="text.secondary">
    //                                 Published by: <strong>{selectedNotice.createdBy}</strong>
    //                             </Typography>
    //                         </Box>
    //                     </Grid>
    //                     {/* <Grid item xs={12} sm={6}>
    //                         <Box display="flex" alignItems="center" gap={1}>
    //                             <CalendarToday fontSize="small" color="action" />
    //                             <Typography variant="body2" color="text.secondary">
    //                                 Published on: <strong>{selectedNotice.createdAt}</strong>
    //                             </Typography>
    //                         </Box>
    //                     </Grid> */}
    //                     <Grid item xs={12} sm={6}>
    //                         <Box display="flex" alignItems="center" gap={1}>
    //                             <CalendarToday fontSize="small" color="action" />
    //                             <Typography variant="body2" color="text.secondary">
    //                                 Published on: <strong>
    //                                     {formatDate(selectedNotice.createdAt)}
    //                                 </strong>
    //                             </Typography>
    //                         </Box>
    //                     </Grid>
    //                     <Grid item xs={12} sm={6}>
    //                         <Box display="flex" alignItems="center" gap={1}>
    //                             <AccessTime fontSize="small" color="action" />
    //                             <Typography variant="body2" color="text.secondary">
    //                                 Views: <strong>{selectedNotice.readBy.length ? selectedNotice.readBy.length : 0}</strong>
    //                             </Typography>
    //                         </Box>
    //                     </Grid>
    //                     <Grid item xs={12} sm={6}>
    //                         <Box display="flex" alignItems="center" gap={1}>
    //                             <CalendarToday fontSize="small" color="action" />
    //                             <Typography variant="body2" color="text.secondary">
    //                                 Expires: <strong>{selectedNotice.expiresAt || 'No expiry'}</strong>
    //                             </Typography>
    //                         </Box>
    //                     </Grid>
    //                 </Grid>

    //                 {/* Content */}
    //                 <Paper variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: 'grey.50' }}>
    //                     <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
    //                         {selectedNotice.content}
    //                     </Typography>
    //                 </Paper>

    //                 {/* Attachments */}
    //                 {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
    //                     <Box sx={{ mb: 3 }}>
    //                         <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //                             <AttachFile /> Attachments ({selectedNotice.attachments.length})
    //                         </Typography>
    //                         <Stack spacing={1}>
    //                             {selectedNotice.attachments.map((file) => (
    //                                 <Paper
    //                                     key={file.id}
    //                                     variant="outlined"
    //                                     sx={{
    //                                         p: 2,
    //                                         display: 'flex',
    //                                         alignItems: 'center',
    //                                         justifyContent: 'space-between',
    //                                         cursor: 'pointer',
    //                                         '&:hover': { backgroundColor: 'action.hover' }
    //                                     }}
    //                                     onDoubleClick={() => handleOpenFile(file)}
    //                                 >
    //                                     <Box display="flex" alignItems="center" gap={2} onClick={() => handleOpenFile(file)}>
    //                                         <Avatar sx={{ bgcolor: 'grey.100' }}>
    //                                             {getFileIcon(file.name)}
    //                                         </Avatar>
    //                                         <Box>
    //                                             <Typography variant="body2" fontWeight="medium">
    //                                                 {file.name}
    //                                             </Typography>
    //                                             <Typography variant="caption" color="text.secondary">
    //                                                 {file.size} • Click to open, double-click for details
    //                                             </Typography>
    //                                         </Box>
    //                                     </Box>
    //                                     <IconButton
    //                                         size="small"
    //                                         color="primary"
    //                                         onClick={() => handleDownloadFile(file)}
    //                                     >
    //                                         <Download fontSize="small" />
    //                                     </IconButton>
    //                                 </Paper>
    //                             ))}
    //                         </Stack>
    //                     </Box>
    //                 )}

    //                 {/* Admin Stats */}
    //                 {isAdmin && (
    //                     <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
    //                         <Typography variant="subtitle2" gutterBottom>
    //                             Read Status: {selectedNotice.readBy.length} out of {selectedNotice.allEmployees.length} employees
    //                             ({Math.round((selectedNotice.readBy.length / selectedNotice.allEmployees.length) * 100)}%)
    //                         </Typography>
    //                         <Box sx={{
    //                             width: '100%',
    //                             height: 8,
    //                             bgcolor: 'grey.200',
    //                             borderRadius: 4,
    //                             overflow: 'hidden',
    //                             mt: 1
    //                         }}>
    //                             <Box sx={{
    //                                 width: `${Math.round((selectedNotice.readBy.length / selectedNotice.allEmployees.length) * 100)}%`,
    //                                 height: '100%',
    //                                 bgcolor: 'primary.main',
    //                                 borderRadius: 4
    //                             }} />
    //                         </Box>
    //                         <Button
    //                             size="small"
    //                             startIcon={<Visibility />}
    //                             onClick={() => {
    //                                 setOpenNoticeDetailDialog(false);
    //                                 setOpenReadStatusDialog(true);
    //                             }}
    //                             sx={{ mt: 1 }}
    //                         >
    //                             View Read Status Details
    //                         </Button>
    //                     </Box>
    //                 )}
    //             </DialogContent>

    //             <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
    //                 <Button startIcon={<ArrowBack />} onClick={() => setOpenNoticeDetailDialog(false)}>
    //                     Back to Notices
    //                 </Button>
    //                 {/* {!isAdmin && (
    //                     <Button
    //                         variant={hasRead ? "outlined" : "contained"}
    //                         color={hasRead ? "success" : "primary"}
    //                         startIcon={hasRead ? <CheckCircle /> : <Visibility />}
    //                         disabled={hasRead ? true : false}
    //                         onClick={() => handleMarkAsRead(selectedNotice.id)}
    //                     >
    //                         {hasRead ? 'Mark as Unread' : 'Mark as Read'}
    //                     </Button>
    //                 )} */}
    //             </DialogActions>
    //         </Dialog>
    //     );
    // };

    // // Read Status Dialog
    // const ReadStatusDialog = () => {
    //     if (!selectedNotice) return null;

    //     const readEmployees = selectedNotice.readBy || [];
    //     const allEmployees = selectedNotice.allEmployees || [];

    //     // Calculate read/unread statistics
    //     const unreadEmployees = allEmployees.filter(employee =>
    //         !readEmployees.some(read => read.empName === employee.name)
    //     );

    //     const readPercentage = allEmployees.length > 0
    //         ? Math.round((readEmployees.length / allEmployees.length) * 100)
    //         : 0;

    //     // Group by department
    //     const departmentStats = allEmployees.reduce((acc, employee) => {
    //         const dept = employee.department || 'Unknown';
    //         if (!acc[dept]) {
    //             acc[dept] = { total: 0, read: 0 };
    //         }
    //         acc[dept].total++;

    //         if (readEmployees.some(read => read.empName === employee.name)) {
    //             acc[dept].read++;
    //         }
    //         return acc;
    //     }, {});

    //     return (
    //         <Dialog
    //             open={openReadStatusDialog}
    //             onClose={() => setOpenReadStatusDialog(false)}
    //             maxWidth="lg"
    //             fullWidth
    //             PaperProps={{
    //                 sx: {
    //                     borderRadius: 2,
    //                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
    //                 }
    //             }}
    //         >
    //             <DialogTitle sx={{
    //                 borderBottom: 1,
    //                 borderColor: 'divider',
    //                 pb: 2,
    //                 background: 'linear-gradient(to right, #0a6faa 0%, #1c6a84 60%)',
    //                 color: 'white',
    //                 position: 'relative',
    //                 overflow: 'hidden'
    //             }}>
    //                 <Box sx={{ position: 'relative', zIndex: 1 }}>
    //                     <Box display="flex" justifyContent="space-between" alignItems="center">
    //                         <Box>
    //                             {/* <Typography variant="h6" component="div" fontWeight="bold">
    //                                 Read Status Dashboard
    //                             </Typography> */}
    //                             <Typography variant="h6" component="div" fontWeight="bold">
    //                                 {selectedNotice.title}
    //                             </Typography>
    //                         </Box>
    //                         <IconButton
    //                             onClick={() => setOpenReadStatusDialog(false)}
    //                             sx={{ color: 'white' }}
    //                             size="small"
    //                         >
    //                             <Close />
    //                         </IconButton>
    //                     </Box>

    //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
    //                         <Box>
    //                             <Typography variant="caption" sx={{ opacity: 0.8 }}>
    //                                 Overall Completion
    //                             </Typography>
    //                             <Typography variant="h4" fontWeight="bold">
    //                                 {readPercentage}%
    //                             </Typography>
    //                         </Box>

    //                         <Box sx={{ flex: 1 }}>
    //                             <Box display="flex" justifyContent="space-between" mb={0.5}>
    //                                 <Typography variant="caption" sx={{ opacity: 0.8 }}>
    //                                     Read: {readEmployees.length}
    //                                 </Typography>
    //                                 <Typography variant="caption" sx={{ opacity: 0.8 }}>
    //                                     Total: {allEmployees.length}
    //                                 </Typography>
    //                             </Box>
    //                             <LinearProgress
    //                                 variant="determinate"
    //                                 value={readPercentage}
    //                                 sx={{
    //                                     height: 8,
    //                                     borderRadius: 4,
    //                                     backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //                                     '& .MuiLinearProgress-bar': {
    //                                         borderRadius: 4,
    //                                         background: 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)'
    //                                     }
    //                                 }}
    //                             />
    //                         </Box>
    //                     </Box>
    //                 </Box>

    //                 {/* Decorative elements */}
    //                 <Box sx={{
    //                     position: 'absolute',
    //                     top: -20,
    //                     right: -20,
    //                     width: 100,
    //                     height: 100,
    //                     borderRadius: '50%',
    //                     background: 'rgba(255, 255, 255, 0.1)'
    //                 }} />
    //             </DialogTitle>

    //             <DialogContent sx={{ pt: 3, px: 3 }}>
    //                 <Grid container spacing={3} p={2} justifyContent={'center'}>
    //                     {/* Read Employees */}
    //                     <Grid item xs={12} md={6}>
    //                         <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
    //                             <TableContainer>
    //                                 <Table size="small">
    //                                     <TableHead sx={{ bgcolor: 'grey.50' }}>
    //                                         <TableRow>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight="bold">
    //                                                     Employee
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight="bold">
    //                                                     Department
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell align="right">
    //                                                 <Typography variant="subtitle2" fontWeight="bold">
    //                                                     Read At
    //                                                 </Typography>
    //                                             </TableCell>
    //                                         </TableRow>
    //                                     </TableHead>
    //                                     <TableBody>
    //                                         {readEmployees.length > 0 ? (
    //                                             readEmployees.map((reader, index) => {
    //                                                 const employee = allEmployees.find(e => e.name === reader.empName);
    //                                                 const readDate = new Date(reader.readAt);
    //                                                 const isToday = readDate.toDateString() === new Date().toDateString();

    //                                                 return (
    //                                                     <TableRow
    //                                                         key={reader.id || index}
    //                                                         hover
    //                                                         sx={{
    //                                                             '&:last-child td': { borderBottom: 0 },
    //                                                             bgcolor: index % 2 === 0 ? 'transparent' : 'grey.50'
    //                                                         }}
    //                                                     >
    //                                                         <TableCell>
    //                                                             <Box display="flex" alignItems="center" gap={1.5}>
    //                                                                 <Avatar
    //                                                                     sx={{
    //                                                                         width: 32,
    //                                                                         height: 32,
    //                                                                         fontSize: '0.875rem',
    //                                                                         bgcolor: '#4CAF50'
    //                                                                     }}
    //                                                                 >
    //                                                                     {reader.empName?.charAt(0) || 'U'}
    //                                                                 </Avatar>
    //                                                                 <Box>
    //                                                                     <Typography variant="body2" fontWeight="medium">
    //                                                                         {reader.empName}
    //                                                                     </Typography>
    //                                                                     {reader.id && (
    //                                                                         <Typography variant="caption" color="text.secondary">
    //                                                                             ID: {reader.employeeID}
    //                                                                         </Typography>
    //                                                                     )}
    //                                                                 </Box>
    //                                                             </Box>
    //                                                         </TableCell>
    //                                                         <TableCell>
    //                                                             <Chip
    //                                                                 label={employee?.department || 'Unknown'}
    //                                                                 size="small"
    //                                                                 variant="outlined"
    //                                                             />
    //                                                         </TableCell>
    //                                                         <TableCell align="right">
    //                                                             <Box display="flex" flexDirection="column" alignItems="flex-end">
    //                                                                 <Typography variant="body2" fontWeight="medium">
    //                                                                     {isToday ? 'Today' : readDate.toLocaleDateString()}
    //                                                                 </Typography>
    //                                                                 <Typography variant="caption" color="text.secondary">
    //                                                                     {readDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    //                                                                 </Typography>
    //                                                             </Box>
    //                                                         </TableCell>
    //                                                     </TableRow>
    //                                                 );
    //                                             })
    //                                         ) : (
    //                                             <TableRow>
    //                                                 <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
    //                                                     <Box sx={{ color: 'text.secondary' }}>
    //                                                         <CheckCircle sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
    //                                                         <Typography variant="body2">
    //                                                             No employees have read this notice yet
    //                                                         </Typography>
    //                                                     </Box>
    //                                                 </TableCell>
    //                                             </TableRow>
    //                                         )}
    //                                     </TableBody>
    //                                 </Table>
    //                             </TableContainer>
    //                         </Paper>
    //                     </Grid>

    //                     {/* Unread Employees */}
    //                     <Grid item xs={12} md={6}>
    //                         <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
    //                             <TableContainer>
    //                                 <Table size="small">
    //                                     <TableHead sx={{ bgcolor: 'grey.50' }}>
    //                                         <TableRow>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight="bold">
    //                                                     Employee
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 <Typography variant="subtitle2" fontWeight="bold">
    //                                                     Department
    //                                                 </Typography>
    //                                             </TableCell>
    //                                             <TableCell align="right">
    //                                                 <Typography variant="subtitle2" fontWeight="bold">
    //                                                     Status
    //                                                 </Typography>
    //                                             </TableCell>
    //                                         </TableRow>
    //                                     </TableHead>
    //                                     <TableBody>
    //                                         {unreadEmployees.length > 0 ? (
    //                                             unreadEmployees.map((employee, index) => (
    //                                                 <TableRow
    //                                                     key={employee.id}
    //                                                     hover
    //                                                     sx={{
    //                                                         '&:last-child td': { borderBottom: 0 },
    //                                                         bgcolor: index % 2 === 0 ? 'transparent' : 'grey.50'
    //                                                     }}
    //                                                 >
    //                                                     <TableCell>
    //                                                         <Box display="flex" alignItems="center" gap={1.5}>
    //                                                             <Avatar
    //                                                                 sx={{
    //                                                                     width: 32,
    //                                                                     height: 32,
    //                                                                     fontSize: '0.875rem',
    //                                                                     bgcolor: '#757575'
    //                                                                 }}
    //                                                             >
    //                                                                 {employee.name.charAt(0)}
    //                                                             </Avatar>
    //                                                             <Box>
    //                                                                 <Typography variant="body2" fontWeight="medium">
    //                                                                     {employee.name}
    //                                                                 </Typography>
    //                                                                 <Typography variant="caption" color="text.secondary">
    //                                                                     ID: {employee.id}
    //                                                                 </Typography>
    //                                                             </Box>
    //                                                         </Box>
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <Chip
    //                                                             label={employee.department || 'Unknown'}
    //                                                             size="small"
    //                                                             variant="outlined"
    //                                                         />
    //                                                     </TableCell>
    //                                                     <TableCell align="right">
    //                                                         <Chip
    //                                                             label="Not Read"
    //                                                             size="small"
    //                                                             color="error"
    //                                                             variant="outlined"
    //                                                             icon={<Close fontSize="small" />}
    //                                                         />
    //                                                     </TableCell>
    //                                                 </TableRow>
    //                                             ))
    //                                         ) : (
    //                                             <TableRow>
    //                                                 <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
    //                                                     <Box sx={{ color: 'success.main' }}>
    //                                                         <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
    //                                                         <Typography variant="body2" fontWeight="medium">
    //                                                             All employees have read this notice!
    //                                                         </Typography>
    //                                                     </Box>
    //                                                 </TableCell>
    //                                             </TableRow>
    //                                         )}
    //                                     </TableBody>
    //                                 </Table>
    //                             </TableContainer>
    //                         </Paper>
    //                     </Grid>
    //                 </Grid>
    //             </DialogContent>

    //             <DialogActions sx={{
    //                 p: 2,
    //                 borderTop: 1,
    //                 borderColor: 'divider',
    //                 bgcolor: 'grey.50'
    //             }}>
    //                 <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
    //                     <Typography variant="caption" color="text.secondary">
    //                         Updated: {new Date().toLocaleString()}
    //                     </Typography>
    //                     <Box>
    //                         <Button
    //                             variant="outlined"
    //                             onClick={() => setOpenReadStatusDialog(false)}
    //                             sx={{ mr: 1 }}
    //                         >
    //                             Close
    //                         </Button>
    //                     </Box>
    //                 </Box>
    //             </DialogActions>
    //         </Dialog>
    //     );
    // };

    return (
        <Box sx={{
            flex: 1,
            minHeight: '80vh',
            p: { xs: 2, sm: 3 },
            m: { xs: 2, sm: 3, md: 4, lg: 5 }
        }}

        >
            <Container maxWidth="xl" disableGutters >
                {/* Header */}
                <Box sx={{
                    mb: 4,
                    // p: 2,
                    // background: `linear-gradient(135deg, #9ac9f0, rgba(8, 196, 229, 0.8))`,
                    color: '#053c54'
                }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{
                                background: 'linear-gradient(135deg, #114b7d, rgba(10, 143, 167, 0.8))'
                                , width: 48, height: 48, color: '#f2f6f6'
                            }}>
                                <Announcement />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" fontWeight="bold" component="h1">
                                    Notices
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {userRole.toLowerCase() === 'admin'
                                        ? 'Manage and track notices for all employees'
                                        : 'Stay updated with important announcements'
                                    }
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Grid container spacing={1} alignItems="center">
                                {/* Search */}
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search notices..."
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
                                </Grid>

                                {/* Year Filter */}
                                <Grid item xs={12} sm={6} md={2}>
                                    <FormControl fullWidth>
                                        <InputLabel>Year</InputLabel>
                                        <Select
                                            value={selectedYear}
                                            label="Year"
                                            onChange={(e) => setSelectedYear(e.target.value)}
                                        >
                                            {getAvailableYears().map(year => (
                                                <MenuItem key={year} value={year}>{year}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Category Filter */}
                                <Grid item xs={12} sm={6} md={2}>
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={selectedCategory}
                                            label="Category"
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            {noticeCategories.map(category => (
                                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Priority Filter */}
                                <Grid item xs={12} sm={6} md={2}>
                                    <FormControl fullWidth>
                                        <InputLabel>Priority</InputLabel>
                                        <Select
                                            value={selectedPriority}
                                            label="Priority"
                                            onChange={(e) => setSelectedPriority(e.target.value)}
                                        >
                                            {priorityOptions.map(option => (
                                                <MenuItem key={option.label} value={option.label}>
                                                    <Chip
                                                        label={option.label}
                                                        size="small"
                                                        color={option.color}
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
                                            setSearchTerm('');
                                            setSelectedYear('All');
                                            setSelectedCategory('All');
                                            setSelectedPriority('All');
                                            setTabValue(0);
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                        {userRole.toLowerCase() === 'admin' && (
                            <Box display="flex" gap={1}>
                                <Button
                                    variant="outlined"
                                    startIcon={<Download />}
                                    onClick={handleExportData}
                                >
                                    Export Data
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={() => {
                                        resetNewNotice();
                                        setEditingNotice(false);
                                        setOpenNoticeDialog(true);
                                    }}
                                >
                                    Create Notice
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* Notices Grid */}
                <Grid container spacing={3}>
                    {filteredNotices.length > 0 ? (
                        filteredNotices.map((notice) => (
                            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={notice.id} >
                                <NoticeCard notice={notice} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Box textAlign="center" py={6}>
                                <Announcement sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No notices found
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Try adjusting your filters or create a new notice
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>

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
            >
                <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, color: 'white', background: 'linear-gradient(to right, #0a6faa 0%, #1c6a84 60%)', }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight="bold" component="div">
                            {editingNotice ? 'Edit Notice' : 'Create New Notice'}
                        </Typography>
                        {editingNotice && (
                            <Chip
                                label="Editing"
                                color="warning"
                                size="small"
                                icon={<Edit fontSize="small" />}
                            />
                        )}
                    </Box>
                </DialogTitle>
                <DialogContent sx={{
                    p: 3,
                    pt: 3,
                    overflow: 'visible'
                }}>
                    <Stack spacing={1}>
                        {/* Notice Title */}
                        <Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                <InputLabel
                                    required
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Notice Title
                                </InputLabel>
                                <Typography variant="caption" color="text.secondary">
                                    {newNotice.title.length}/100 characters
                                </Typography>
                            </Box>
                            <TextField
                                value={newNotice.title}
                                onChange={(e) => {
                                    if (e.target.value.length <= 100) {
                                        setNewNotice({ ...newNotice, title: e.target.value });
                                        // Clear validation error when user starts typing
                                        if (validationErrors.title) {
                                            setValidationErrors(prev => ({ ...prev, title: '' }));
                                        }
                                    }
                                }}
                                placeholder="Enter a clear, descriptive title"
                                fullWidth
                                size="medium"
                                error={!!validationErrors.title}
                                helperText={validationErrors.title}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'background.paper',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: validationErrors.title ? 'error.light' : 'action.hover'
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: 'background.paper',
                                            boxShadow: validationErrors.title
                                                ? '0 0 0 2px rgba(211, 47, 47, 0.1)'
                                                : '0 0 0 2px rgba(24, 133, 197, 0.1)'
                                        },
                                        '&.Mui-error': {
                                            borderColor: 'error.main'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        {/* Content */}
                        <Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                <InputLabel
                                    required
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Content
                                </InputLabel>
                                <Typography variant="caption" color="text.secondary">
                                    {newNotice.content.length}/2000 characters
                                </Typography>
                            </Box>
                            <TextField
                                value={newNotice.content}
                                error={!!validationErrors.content}
                                helperText={validationErrors.content}
                                onChange={(e) => {
                                    if (e.target.value.length <= 2000) {
                                        setNewNotice({ ...newNotice, content: e.target.value });
                                        // Clear validation error when user starts typing
                                        if (validationErrors.content) {
                                            setValidationErrors(prev => ({ ...prev, content: '' }));
                                        }
                                    }
                                }}
                                placeholder="Provide detailed information about the notice..."
                                multiline
                                rows={5}
                                fullWidth
                                size="medium"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'background.paper',
                                        '& textarea': {
                                            resize: 'vertical'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        {/* Category & Priority - Side by Side */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <InputLabel
                                        required
                                        sx={{
                                            mb: 1,
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: '0.875rem'
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
                                                setValidationErrors(prev => ({ ...prev, category: '' }));
                                            }
                                        }}
                                        error={!!validationErrors.category}
                                        helperText={validationErrors.category}
                                        fullWidth
                                        size="medium"
                                        SelectProps={{
                                            MenuProps: {
                                                PaperProps: {
                                                    sx: {
                                                        maxHeight: 250,
                                                        borderRadius: '8px',
                                                        mt: 0.5
                                                    }
                                                }
                                            }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px'
                                            }
                                        }}
                                    >
                                        {noticeCategories.filter(cat => cat !== 'All').map((category) => (
                                            <MenuItem key={category} value={category} sx={{ py: 1.5 }}>
                                                <Box display="flex" alignItems="center" gap={1.5}>
                                                    <Category fontSize="small" sx={{ color: 'text.secondary' }} />
                                                    <Typography variant="body2">{category}</Typography>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <InputLabel
                                        required
                                        sx={{
                                            mb: 1,
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: '0.875rem'
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
                                                setValidationErrors(prev => ({ ...prev, priority: '' }));
                                            }
                                        }}
                                        error={!!validationErrors.priority}
                                        helperText={validationErrors.priority}
                                        fullWidth
                                        size="medium"
                                        SelectProps={{
                                            MenuProps: {
                                                PaperProps: {
                                                    sx: {
                                                        maxHeight: 250,
                                                        borderRadius: '8px',
                                                        mt: 0.5
                                                    }
                                                }
                                            }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px'
                                            }
                                        }}
                                    >
                                        {priorityOptions.filter(p => p.label !== 'All').map((option) => (
                                            <MenuItem key={option.label} value={option.label} sx={{ py: 1.5 }}>
                                                <Box display="flex" alignItems="center" gap={1.5}>
                                                    <FiberManualRecord
                                                        fontSize="small"
                                                        sx={{
                                                            color: theme => theme.palette[option.color]?.main || 'text.secondary',
                                                            fontSize: '0.75rem'
                                                        }}
                                                    />
                                                    <Typography variant="body2">{option.label}</Typography>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <InputLabel
                                        sx={{
                                            mb: 1,
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Expiry Date
                                    </InputLabel>
                                    <TextField
                                        type="date"
                                        value={newNotice.expiresAt}
                                        onChange={(e) => {
                                            setNewNotice({ ...newNotice, expiresAt: e.target.value });
                                            // Validate expiry date is not in the past
                                            if (e.target.value) {
                                                const expiryDate = new Date(e.target.value);
                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0);
                                                if (expiryDate < today) {
                                                    setValidationErrors(prev => ({
                                                        ...prev,
                                                        expiresAt: 'Expiry date cannot be in the past'
                                                    }));
                                                } else {
                                                    setValidationErrors(prev => ({ ...prev, expiresAt: '' }));
                                                }
                                            }
                                        }}
                                        error={!!validationErrors.expiresAt}
                                        helperText={validationErrors.expiresAt}
                                        fullWidth
                                        size="medium"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                        Leave empty for no expiration
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <InputLabel
                                        required
                                        sx={{
                                            mb: 1,
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Publish Year
                                    </InputLabel>
                                    <TextField
                                        type="number"
                                        value={newNotice.year}
                                        disabled
                                        onChange={(e) => {
                                            const year = parseInt(e.target.value) || '';
                                            setNewNotice({ ...newNotice, year });
                                            if (validationErrors.year) {
                                                setValidationErrors(prev => ({ ...prev, year: '' }));
                                            }
                                        }}
                                        error={!!validationErrors.year}
                                        helperText={validationErrors.year}
                                        placeholder="YYYY"
                                        fullWidth
                                        size="medium"
                                        InputProps={{
                                            inputProps: {
                                                min: 2000,
                                                max: new Date().getFullYear() + 1,
                                                style: { textAlign: 'center' }
                                            }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        {/* File Upload Section */}
                        <Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                <InputLabel
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Attachments
                                </InputLabel>
                                <Typography variant="caption" color="text.secondary">
                                    Max 10MB per file • Max 5 files
                                </Typography>
                            </Box>

                            {/* File Upload Area */}
                            <Paper
                                variant="outlined"
                                sx={{
                                    borderRadius: '12px',
                                    backgroundColor: validationErrors.attachments ? 'error.light' : 'background.default',
                                    borderStyle: 'dashed',
                                    borderWidth: 2,
                                    borderColor: validationErrors.attachments ? 'error.main' : 'divider',
                                    textAlign: 'center',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: validationErrors.attachments ? 'error.main' : 'primary.main',
                                        backgroundColor: validationErrors.attachments ? 'error.light' : 'action.hover'
                                    }
                                }}
                                onClick={() => {
                                    if (newNotice.attachments.length >= 5) {
                                        setValidationErrors(prev => ({
                                            ...prev,
                                            attachments: 'Maximum 5 files allowed'
                                        }));
                                        return;
                                    }
                                    document.getElementById('file-upload').click();
                                }}
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    hidden
                                    onChange={handleFileSelect}
                                    disabled={newNotice.attachments.length >= 5}
                                />

                                <CloudUpload sx={{
                                    fontSize: 48,
                                    color: validationErrors.attachments ? 'error.main' : 'text.secondary',
                                    mb: 1.5,
                                    opacity: newNotice.attachments.length >= 5 ? 0.5 : 1
                                }} />

                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    gutterBottom
                                    color={validationErrors.attachments ? 'error.main' : 'text.primary'}
                                >
                                    {newNotice.attachments.length >= 5
                                        ? 'Maximum files reached (5/5)'
                                        : selectedFile
                                            ? 'File Selected'
                                            : 'Choose Files'
                                    }
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color={validationErrors.attachments ? 'error.main' : 'text.secondary'}
                                    paragraph
                                >
                                    {selectedFile
                                        ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})`
                                        : 'Supports PDF, DOC, XLS, JPG, PNG'
                                    }
                                </Typography>

                                {validationErrors.attachments && (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            mt: 2,
                                            borderRadius: '8px',
                                            '& .MuiAlert-icon': {
                                                alignItems: 'center'
                                            }
                                        }}
                                    >
                                        {validationErrors.attachments}
                                    </Alert>
                                )}

                                {selectedFile && (
                                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFile(null);
                                            }}
                                        >
                                            Change File
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
                                        borderRadius: '8px',
                                        '& .MuiAlert-icon': {
                                            alignItems: 'center'
                                        }
                                    }}
                                >
                                    {fileUploadError}
                                </Alert>
                            )}

                            {/* Uploaded Files List */}
                            {newNotice.attachments.length > 0 && (
                                <Box sx={{ mt: 3 }}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'text.primary'
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
                                            />
                                        )}
                                    </Box>
                                    <Stack spacing={1.5}>
                                        {newNotice.attachments.map((file, index) => (
                                            <Paper
                                                key={file.id}
                                                variant="outlined"
                                                sx={{
                                                    p: 2,
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                                    }
                                                }}
                                            >
                                                <Box display="flex" alignItems="center" gap={2} flex={1}>
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: 'primary.light',
                                                            color: 'primary.main',
                                                            width: 40,
                                                            height: 40
                                                        }}
                                                    >
                                                        {getFileIcon(file.name, true)}
                                                    </Avatar>
                                                    <Box flex={1} minWidth={0}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            noWrap
                                                            sx={{ fontWeight: 500 }}
                                                        >
                                                            {file.name}
                                                        </Typography>
                                                        <Box display="flex" gap={2} alignItems="center">
                                                            <Typography variant="caption" color="text.secondary">
                                                                {file.size}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {file.uploadedAt}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveAttachment(index)}
                                                    sx={{
                                                        color: 'error.main',
                                                        '&:hover': {
                                                            backgroundColor: 'error.light'
                                                        }
                                                    }}
                                                >
                                                    <Delete fontSize="small" />
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
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: 'background.paper',
                        borderTop: 1,
                        borderColor: 'divider',
                        zIndex: 1,
                    }}
                >
                    <DialogActions sx={{
                        p: 3,
                        gap: 1,
                        justifyContent: 'flex-end',
                    }}>
                        <Button
                            onClick={() => {
                                setOpenNoticeDialog(false);
                                resetNewNotice();
                                setEditingNotice(false);
                                setValidationErrors({});
                            }}
                            color="inherit"
                            sx={{ minWidth: 100 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSaveNotice}
                            startIcon={editingNotice ? <Edit /> : <Add />}
                            disabled={Object.keys(validationErrors).some(key => validationErrors[key])}
                            sx={{ minWidth: 140 }}
                        >
                            {editingNotice ? 'Update Notice' : 'Publish Notice'}
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
                // onViewReadStatus={() => {
                //     setOpenNoticeDetailDialog(false);
                //     setOpenReadStatusDialog(true);
                // }}
                theme={theme}
            />

            {/* Read Status Dialog */}
            <ReadStatusDialog
                open={openReadStatusDialog}
                onClose={() => setOpenReadStatusDialog(false)}
                notice={selectedNotice}
                theme={theme}
            />

            {/* Notice Detail Dialog */}
            {/* {selectedNotice && openNoticeDetailDialog && (
                <NoticeDetailDialog />
            )} */}

            {/* Read Status Dialog */}
            {/* {selectedNotice && openReadStatusDialog && (
                <ReadStatusDialog />
            )} */}
        </Box>
    );
};

export default DashboardHome;