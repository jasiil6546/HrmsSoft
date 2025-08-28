import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Header({ isCheckedIn, onCheckoutClick }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>IT Company Portal</Typography>
        {isCheckedIn && (
          <IconButton color="inherit" onClick={onCheckoutClick}>
            <AccessTimeIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Header;
