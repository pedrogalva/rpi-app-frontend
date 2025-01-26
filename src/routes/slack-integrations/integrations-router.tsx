import React from "react";
import { Routes, Route } from "react-router";

import SlackIntegrationPage from "./home-integrations";
import IntegrationPage from "./integration-page";

function IntegrationsRouter() {
  return (
    <Routes>
      <Route path="/integrations" element={<SlackIntegrationPage />} />
      <Route Component={IntegrationPage} path="/integrations/:id" />
    </Routes>
  );
}

export default IntegrationsRouter;
