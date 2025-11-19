import React from "react";
import { BrowserRouter } from "react-router";

import IntegrationsRouter from "./slack-integrations/integrations-router";
import HomePage from "./home/home-router";
import AuthRouter from "./auth/auth-router";
import RpisRouter from "./rpis/rpi-router";
import AnticipationRouter from "./asaas-anticipations/anticipation-router";

import { RouteChangeValidator } from "./context/AuthContext";

import MainPageHeader from "./components/page-header";
import Sidebar from "./components/sidebar";
import ContextProvider from "./context";

function RouterComp() {
  return (
    <BrowserRouter basename="/front_rpi">
      <ContextProvider>
        <RouteChangeValidator>
          <MainPageHeader />
          <Sidebar />
          <AuthRouter />
          <HomePage />
          <IntegrationsRouter />
          <RpisRouter />
          <AnticipationRouter />
        </RouteChangeValidator>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default RouterComp;
