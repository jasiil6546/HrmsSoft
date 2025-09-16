import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchGoals, updateGoalStatus } from "../../redux/Slice/goalSlice";

const statusMap = {
  1: "Pending",
  2: "Approved", 
  3: "Rejected",
  4: "In-Progress",
  5: "Completed",
};

function Goaly() {
  const dispatch = useDispatch();
  const { goals, status, error } = useSelector((state) => state.goals);
  const { user, token } = useSelector((state) => state.auth);


  console.log("User:", user);
  console.log("User role:", user?.role);
  console.log("Goals:", goals);

  useEffect(() => {
    if (status === "idle" && token) dispatch(fetchGoals());
  }, [status, dispatch, token]);

  const handleApprove = (goalId) => {
    console.log("Approving goal:", goalId);
    dispatch(updateGoalStatus({ goalId, newStatus: 2 }));
  };

  const handleReject = (goalId) => {
    console.log("Rejecting goal:", goalId);
    dispatch(updateGoalStatus({ goalId, newStatus: 3 }));
  };

  const columns = [
    { field: "goalId", headerName: "ID", width: 80 },
    { field: "goalName", headerName: "Goal Name", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "status",
      headerName: "Status", 
      width: 120,
      renderCell: (params) => {
        const status = params.row?.status;
        console.log("Goal status:", status, "for goal:", params.row?.goalId);
        return statusMap[status] || "Unknown";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const goal = params.row;
        console.log("Rendering actions for goal:", goal?.goalId, "status:", goal?.status);

       
        if (goal?.status === 1) {
          return (
            <Box sx={{ display: "flex", gap: 5,mt:1 }}>
              <Button 
                size="small" 
                variant="contained" 
                color="success" 
                onClick={() => handleApprove(goal.goalId)}
              >
                Approve
              </Button>
              <Button 
                size="small" 
                variant="contained" 
                color="error" 
                onClick={() => handleReject(goal.goalId)}
              >
                Reject
              </Button>
            </Box>
          );
        }
        
        // Show current status for non-pending goals
        return (
          <Typography variant="body2" color="text.secondary">
            {statusMap[goal?.status] || "No actions"}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box sx={{ ml: 3, height: 550, width: "95%", mt: 2 }}>
     <Typography 
  variant="h6" 
  gutterBottom 
  sx={{ fontWeight: "bold" }}
>
  Admin Goal Approvals
</Typography>

     
      <Box sx={{ mb: 2, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
        <Typography variant="body2">
          Total Goals: {goals?.length || 0} | 
          Pending Goals: {goals?.filter(g => g.status === 1).length || 0}
        </Typography>
      </Box>

      {status === "loading" ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <DataGrid 
          rows={goals} 
          columns={columns} 
          getRowId={(row) => row.goalId} 
          pageSize={7} 
          rowsPerPageOptions={[7]}
          disableSelectionOnClick
        />
      )}
    </Box>
  );
}



export default Goaly;
