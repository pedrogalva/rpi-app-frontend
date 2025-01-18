import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import SlackIntegrationPage from "./slack-integrations";
import IntegrationPage from "./integration-page";

function RouterComp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SlackIntegrationPage />} />
        <Route Component={IntegrationPage} path="/integration/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComp;
