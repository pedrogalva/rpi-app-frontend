import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import SlackIntegrationPage from "./slack-integrations";
import IntegrationPage from "./integration-page";

function RouterComp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/front_rpi/" element={<SlackIntegrationPage />} />
        <Route Component={IntegrationPage} path="/front_rpi/integration/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComp;
