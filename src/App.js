import React from 'react';
import { observer, useObservable } from 'mobx-react-lite';

import './index.css';

import {
  Layout,
  Sidebar,
  Content,
} from './components/Layout';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import Petition from './components/Petition';

import PetitionStore from './mobx/petition';

const AppRoot = () => {
  const { isOnline } = useObservable(PetitionStore);
  return (
    <>
      <NavBar />
      <Layout>
        <>
          <Sidebar>
            <UserProfile />
          </Sidebar>
          <Content>
            {isOnline ? <Petition /> : 'Not connected to contract'}
          </Content>
        </>
      </Layout>
    </>
  );
};

export default observer(AppRoot);
