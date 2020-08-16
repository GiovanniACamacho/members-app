import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import MemberList from './MemberList/MemberList';
import Member from './Member/Member';
import { PageHeader, Layout, Divider, Affix } from 'antd';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Affix>
        <Header>
          <PageHeader
            className="site-page-header"
            title={<div><img alt="dome" src="/dome.svg" /><span>Members of the United States Congress</span></div>}
            subTitle="Find more information about the Members of the 116th United States Congress"
          />
        </Header>
      </Affix>
      <Content style={{ padding: '0 24px 24px', marginTop: '20px' }}>
        <Divider />
          <Router>
            <Switch>
              <Route exact={true} path={[ "/", "/member-list" ]}>
                <MemberList />
              </Route>
              <Route path="/member/:id">
                <Member />
              </Route>
            </Switch>
          </Router>
      </Content>
    </Layout>
  );
}

export default App;
