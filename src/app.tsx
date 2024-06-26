import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import SideNavBar from "./components/sidenavbar";

import Discover from "./pages/discover";

import './css/app.css'; 

interface AppProps {

  props: any
}

export default function App(props: AppProps) {
  return (
    <Router>
      <PageContainer>
        <SideNavBar />
        <ContentWrapper>
          <Switch>
            <Route path="/discover" component={Discover} {...props}/>
          </Switch>
        </ContentWrapper>
      </PageContainer>
    </Router>
  );
}


const ContentWrapper = styled.main`
  padding-left: 280px;
`

const PageContainer = styled.main`
  overflow-x: hidden;
`
