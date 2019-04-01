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

import ContractStore from './mobx/contract';

const AppRoot = () => {
  const { isOnline, address } = useObservable(ContractStore);
  return (
    <>
      <NavBar />
      <Layout>
        <>
          <Sidebar>
            <UserProfile />
          </Sidebar>
          <Content>
            {isOnline ? address : 'Not connected to contract'}
          </Content>
        </>
      </Layout>
    </>
  );
};

export default observer(AppRoot);
