import { CheckCircle, Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ReadStatusDialog = ({ open, onClose, notice, theme }) => {
  if (!notice) return null;

  const readEmployees = notice.readBy || [];
  const allEmployees = notice.allEmployees || [];
  const unreadEmployees = allEmployees.filter(
    (employee) => !readEmployees.some((read) => read.empName === employee.name),
  );
  const readPercentage =
    allEmployees.length > 0
      ? Math.round((readEmployees.length / allEmployees.length) * 100)
      : 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          pb: 2,
          background: "linear-gradient(to right, #0a6faa 0%, #1c6a84 60%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="div" fontWeight="bold">
              {notice.title}
            </Typography>
            <IconButton onClick={onClose} sx={{ color: "white" }} size="small">
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Overall Completion
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {readPercentage}%
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Read: {readEmployees.length}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Total: {allEmployees.length}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={readPercentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background:
                      "linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, px: 3 }}>
        <Grid container spacing={3} p={2} justifyContent={"center"}>
          {/* Read Employees */}
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{ borderRadius: 2, overflow: "hidden" }}
            >
              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ bgcolor: "grey.50" }}>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Employee
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Department
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight="bold">
                          Read At
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {readEmployees.length > 0 ? (
                      readEmployees.map((reader, index) => {
                        // Find employee details from allEmployees or use reader data
                        const employee = allEmployees.find(
                          (e) =>
                            e.name === reader.empName ||
                            e.empName === reader.empName,
                        );
                        const readDate = new Date(reader.readAt);
                        const isToday =
                          readDate.toDateString() === new Date().toDateString();

                        return (
                          <TableRow
                            key={reader.id || reader.employeeID || index}
                            hover
                            sx={{
                              "&:last-child td": { borderBottom: 0 },
                              bgcolor:
                                index % 2 === 0 ? "transparent" : "grey.50",
                            }}
                          >
                            <TableCell>
                              <Box display="flex" alignItems="center" gap={1.5}>
                                <Avatar
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: "0.875rem",
                                    bgcolor: "#4CAF50",
                                  }}
                                >
                                  {reader.empName?.charAt(0) ||
                                    reader.name?.charAt(0) ||
                                    "U"}
                                </Avatar>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    fontWeight="medium"
                                  >
                                    {reader.empName ||
                                      reader.name ||
                                      "Unknown Employee"}
                                  </Typography>
                                  {reader.employeeID && (
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      ID: {reader.employeeID}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  employee?.department ||
                                  reader.department ||
                                  "Unknown"
                                }
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-end"
                              >
                                <Typography variant="body2" fontWeight="medium">
                                  {isToday
                                    ? "Today"
                                    : readDate.toLocaleDateString()}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {readDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                          <Box sx={{ color: "text.secondary" }}>
                            <CheckCircle
                              sx={{ fontSize: 40, mb: 1, opacity: 0.5 }}
                            />
                            <Typography variant="body2">
                              No employees have read this notice yet
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Unread Employees */}
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{ borderRadius: 2, overflow: "hidden" }}
            >
              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ bgcolor: "grey.50" }}>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Employee
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Department
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight="bold">
                          Status
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {unreadEmployees.length > 0 ? (
                      unreadEmployees.map((employee, index) => (
                        <TableRow
                          key={employee.id || index}
                          hover
                          sx={{
                            "&:last-child td": { borderBottom: 0 },
                            bgcolor:
                              index % 2 === 0 ? "transparent" : "grey.50",
                          }}
                        >
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1.5}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  fontSize: "0.875rem",
                                  bgcolor: "#757575",
                                }}
                              >
                                {employee.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight="medium">
                                  {employee.name}
                                </Typography>
                                {employee.id && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    ID: {employee.id}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={employee.department || "Unknown"}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label="Not Read"
                              size="small"
                              color="error"
                              variant="outlined"
                              icon={<Close fontSize="small" />}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                          <Box sx={{ color: "success.main" }}>
                            <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="body2" fontWeight="medium">
                              All employees have read this notice!
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "grey.50",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="caption" color="text.secondary">
            Updated: {new Date().toLocaleString()}
          </Typography>
          <Box>
            <Button variant="outlined" onClick={onClose} sx={{ mr: 1 }}>
              Close
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ReadStatusDialog;
