import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CheckoutModal({ open, onClose, onCheckout }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Check-Out
        <IconButton onClick={onClose} style={{position:'absolute',right:8,top:8}}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={onCheckout}>Check Out</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CheckoutModal;
