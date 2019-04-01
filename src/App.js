import React from 'react';
import { observer } from 'mobx-react-lite';

import './index.css';

import {
  Layout,
  Sidebar,
  Content,
} from './components/Layout';

const AppRoot = () => (
  <>
    <Layout>
      <>
        <Sidebar />
        <Content />
      </>
    </Layout>
  </>
);

export default observer(AppRoot);
