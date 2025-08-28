import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CheckinModal({ open, onClose, onCheckin }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Check-In
        <IconButton onClick={onClose} style={{position:'absolute',right:8,top:8}}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={onCheckin}>Check In</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CheckinModal;
