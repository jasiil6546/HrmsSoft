import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Rating,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchGoals,
  addGoal,
  updateGoal,
  updateGoalStatus,
  completeGoalWithFeedback,
  deleteGoal,
} from "../../redux/Slice/goalSlice";
import AddGoalModal from "../../modals/Addgoal";

const statusMap = {
  1: "Pending",
  2: "Approved",
  3: "Rejected",
  4: "In-Progress",
  5: "Completed",
};

function Goalsm() {
  const dispatch = useDispatch();
  const { goals, status, error } = useSelector((state) => state.goals);
  const { user, token } = useSelector((state) => state.auth);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editGoal, setEditGoal] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    if (status === "idle" && token) dispatch(fetchGoals());
  }, [status, dispatch, token]);

  const handleAddGoal = (goalData) => {
    if (!token || !user) return alert("Please login first");
    const newGoal = { ...goalData, createdBy: user.id, assignedTo: user.id };
    dispatch(addGoal(newGoal));
    setAddOpen(false);
  };

  const handleEditGoal = (goalData) => {
    dispatch(updateGoal({ goalId: editGoal.goalId, updates: goalData }));
    setEditOpen(false);
    setEditGoal(null);
  };

  const handleEdit = (goal) => {
    setEditGoal(goal);
    setEditOpen(true);
  };

  const handleDelete = (goal) => {
    if (window.confirm(`Are you sure you want to delete "${goal.goalName}"?`)) {
      dispatch(deleteGoal(goal.goalId));
    }
  };

  const handleStartProgress = (goal) => {
    if (goal.status !== 2) return alert("Goal must be Approved");
    dispatch(updateGoalStatus({ goalId: goal.goalId, newStatus: 4 }));
  };

  const handleComplete = (goal) => {
    if (goal.status !== 4) return alert("Goal must be In-Progress");
    dispatch(updateGoalStatus({ goalId: goal.goalId, newStatus: 5 }));
    setSelectedGoal(goal);
    setFeedbackOpen(true);
  };

  const handleSaveFeedback = () => {
    if (rating < 1 || rating > 5) return alert("Please submit rating 1-5");
    if (!feedbackText.trim()) return alert("Feedback is required");
    dispatch(
      completeGoalWithFeedback({
        goalId: selectedGoal.goalId,
        rating,
        feedback: feedbackText,
      })
    );
    setFeedbackOpen(false);
    setSelectedGoal(null);
    setRating(0);
    setFeedbackText("");
  };

  const columns = [
    { field: "goalId", headerName: "ID", width: 80 },
    { field: "goalName", headerName: "Goal Name", width: 160 },
    { field: "description", headerName: "Description", width: 180 },
    { field: "startDate", headerName: "Start Date", width: 110 },
    { field: "endDate", headerName: "End Date", width: 110 },
    { field: "estimatedHours", headerName: "Est. Hours", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => statusMap[params.row?.status] || "Unknown",
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const goal = params.row;
        if (goal.status === 5 && goal.rating) {
          return (
            <Rating 
              value={goal.rating} 
              readOnly 
              size="small"
            />
          );
        }
        return <Typography color="text.secondary">-</Typography>;
      },
    },
    {
      field: "feedback",
      headerName: "Feedback",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const goal = params.row;
        if (goal.status === 5 && goal.feedback) {
          return (
            <Typography 
              variant="body2" 
              sx={{ 
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
              title={goal.feedback}
            >
              {goal.feedback}
            </Typography>
          );
        }
        return <Typography color="text.secondary">-</Typography>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const goal = params.row;
        return (
          <Box sx={{ display: "flex", gap: 3.1, flexWrap: "wrap" }}>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={() => handleEdit(goal)}
            >
              Edit
            </Button>
            
            <Button 
              size="small" 
              variant="outlined" 
              color="error"
              onClick={() => handleDelete(goal)}
            >
              Delete
            </Button>
            
            {goal.status === 2 && (
              <Button 
                size="small" 
                variant="contained" 
                onClick={() => handleStartProgress(goal)}
              >
                Start Progress
              </Button>
            )}
            {goal.status === 4 && (
              <Button 
                size="small" 
                variant="contained" 
                color="success" 
                onClick={() => handleComplete(goal)}
              >
                Complete
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ ml: 3, height: 550, width: "87%", mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ fontWeight: "bold" }}
        >
          My Goals
        </Typography>
        
        <Button variant="contained" onClick={() => setAddOpen(true)}>
          Add Goal
        </Button>
      </Box>

      {status === "loading" ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <DataGrid 
          rows={goals} 
          columns={columns} 
          getRowId={(row) => row.goalId} 
          pageSize={5} 
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          // ENABLE HORIZONTAL SCROLLING
          sx={{ 
            width: '100%',
            '& .MuiDataGrid-main': {
              overflow: 'auto'
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'auto'
            },
            '& .MuiDataGrid-columnsContainer': {
              minWidth: '1400px' // Set minimum width for columns
            },
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
          // Enable column resizing
          experimentalFeatures={{ columnResize: true }}
        />
      )}

      {/* Add Goal Modal */}
      <AddGoalModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAddGoal} />

      {/* Edit Goal Modal */}
      <AddGoalModal 
        open={editOpen} 
        onClose={() => {setEditOpen(false); setEditGoal(null);}} 
        onSave={handleEditGoal}
        initialData={editGoal}
      />

      {/* Feedback Modal */}
      <Modal open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Submit Rating & Feedback
          </Typography>
          <Rating value={rating} onChange={(e, v) => setRating(v)} precision={1} />
          <TextField
            label="Feedback"
            multiline
            minRows={3}
            fullWidth
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSaveFeedback}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Goalsm;

