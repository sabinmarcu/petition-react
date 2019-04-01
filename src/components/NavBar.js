import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

import style from './NavBar.module.css';

const NavBar = () => {
  const title = 'DApps with React';
  return (
    <AppBar position="static" style={style.navBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
