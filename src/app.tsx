import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import SideNavBar from "./components/sidenavbar";

import Discover from "./pages/discover";

import './css/app.css'; 

interface AppProps {

  props: any
}

const App: React.FC = () => {
  return (
    <Router>
      <PageContainer>
        <SideNavBar />
        <ContentWrapper>
          <Switch>
            <Route path="/" component={Discover} />
          </Switch>
        </ContentWrapper>
      </PageContainer>
    </Router>
  );
}

export default App;


const ContentWrapper = styled.main`
  padding-left: 280px;
`

const PageContainer = styled.main`
  overflow-x: hidden;
`

