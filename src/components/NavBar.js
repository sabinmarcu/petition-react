import React from 'react';
import { observer, useObservable } from 'mobx-react-lite';

import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

import AccountStore from '../mobx/account';
import style from './NavBar.module.css';

const NavBar = () => {
  const title = 'DApps with React';
  const { isOnline, primaryAccount } = useObservable(AccountStore);
  return (
    <AppBar position="static" className={style.navBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          className={style.title}
        >
          {title}
        </Typography>
        <Typography color="white" className={style.account}>
          {isOnline ? primaryAccount : 'Not Connected'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default observer(NavBar);
