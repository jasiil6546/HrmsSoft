import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Rating } from "@mui/material";

export default function FeedbackModal({ open, onClose, onSave }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSave({ rating, feedback });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Provide Feedback</DialogTitle>
      <DialogContent>
        <Rating value={rating} onChange={(e, newVal) => setRating(newVal)} />
        <TextField
          label="Feedback"
          fullWidth
          margin="dense"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
