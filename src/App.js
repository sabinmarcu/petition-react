import React from 'react';
import { observer } from 'mobx-react-lite';

import './index.css';

import {
  Layout,
  Sidebar,
  Content,
} from './components/Layout';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';

const AppRoot = () => (
  <>
    <NavBar />
    <Layout>
      <>
        <Sidebar>
          <UserProfile />
        </Sidebar>
        <Content />
      </>
    </Layout>
  </>
);

export default observer(AppRoot);
