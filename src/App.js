import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import MemberList from './MemberList/MemberList';
import { PageHeader, Layout, Divider } from 'antd';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <PageHeader
          className="site-page-header"
          title={<div><img alt="dome" src="/dome.svg" /><span>Members of the United States Congress</span></div>}
          subTitle="Find more information about the Members of the 116th United States Congress"
        />
      </Header>
      <Content style={{ padding: '0 24px 24px', marginTop: '20px' }}>
        <Divider />
        <MemberList />
      </Content>
    </Layout>
  );
}

export default App;
