import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button } from "@mui/material";

function AddGoalModal({ open, onClose, onSave, initialData }) {
  const { user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    goalName: "",
    description: "",
    startDate: "",
    endDate: "",
    estimatedHours: 0,
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ goalName: "", description: "", startDate: "", endDate: "", estimatedHours: 0 });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.goalName || !formData.startDate || !formData.endDate) return alert("Goal Name, Start Date, and End Date are required");
    onSave({ ...formData, assignedTo: user?.id });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initialData ? "Edit Goal" : "Add Goal"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField margin="dense" label="Goal Name" name="goalName" fullWidth value={formData.goalName} onChange={handleChange} />
          <TextField margin="dense" label="Description" name="description" fullWidth value={formData.description} onChange={handleChange} />
          <TextField margin="dense" label="Start Date" name="startDate" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.startDate} onChange={handleChange} />
          <TextField margin="dense" label="End Date" name="endDate" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.endDate} onChange={handleChange} />
          <TextField margin="dense" label="Estimated Hours" name="estimatedHours" type="number" fullWidth value={formData.estimatedHours} onChange={handleChange} />
          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button type="submit" color="primary" variant="contained">Save</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddGoalModal;

