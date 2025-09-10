import React, { useState, useMemo } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import leaveData from "../../Json/leave_requests_2025.json";

function LeaveRequests() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const rows = useMemo(
    () =>
      leaveData.map((leave, i) => ({
        id: i + 1,
        status: leave.status,
        employeeName: leave.employeeName,
        leaveType: leave.leaveType,
        type: leave.type || "Paid",
        leavePeriod: `${leave.leavePeriod.from} - ${leave.leavePeriod.to}`,
        noOfDays: `${leave.noOfDays} Day(s)`,
        dateOfRequest: leave.dateOfRequest,
      })),
    []
  );

  const filteredRows = rows.filter(
    (row) =>
      (statusFilter === "All" || row.status === statusFilter) &&
      (typeFilter === "All" || row.leaveType === typeFilter)
  );

  const renderStatus = (params) => {
    const status = params.value;
    let color = "#999";
    if (status === "Approved") color = "green";
    if (status === "Rejected") color = "red";
    if (status === "Pending") color = "orange";
    if (status === "Cancelled") color = "gray";

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: color,
          }}
        />
        <Typography variant="body2">{status}</Typography>
      </Box>
    );
  };

  const columns = [
    { field: "status", headerName: "Status", width: 150, renderCell: renderStatus },
    { field: "employeeName", headerName: "Employee Name", width: 200 },
    { field: "leaveType", headerName: "Leave Type", width: 180 },
    { field: "type", headerName: "Type", width: 120 },
    { field: "leavePeriod", headerName: "Leave Period", width: 220 },
    { field: "noOfDays", headerName: "Days/Hours Taken", width: 160 },
    { field: "dateOfRequest", headerName: "Date of Request", width: 150 },
  ];

  return (
    <Box sx={{ p: 2, bgcolor: "#fff" }}>
    
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          mb: 2,
          gap: 2,
          alignItems: isSmallScreen ? "stretch" : "center",
        }}
      >
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Leave Type</InputLabel>
            <Select
              value={typeFilter}
              label="Leave Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {[...new Set(leaveData.map((l) => l.leaveType))].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ textTransform: "none", bgcolor: "#1976d2" }}
            onClick={() => alert("Add Request Clicked!")}
          >
            Add Request
          </Button>
        </Box>
      </Box>

     
      <Box sx={{ width: "100%", "& .MuiDataGrid-root": { minWidth: 0 } }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          autoHeight
          sx={{
            border: "1px solid #eee",
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#f9fafb",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default LeaveRequests;
