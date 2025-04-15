import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Machining Scheduler
        </Typography>
        <Button
          color="inherit"
          component={RouterLink}
          to="/"
        >
          Schedule
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/new-order"
        >
          New Order
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 