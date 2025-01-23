import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import SlackIntegrationPage from "./slack-integrations";
import IntegrationPage from "./integration-page";
import GoogleLoginComp from "./auth";

function RouterComp() {
  return (
    <BrowserRouter basename="/front_rpi">
      <Routes>
        <Route path="/auth" element={<GoogleLoginComp />} />
        <Route path="/" element={<SlackIntegrationPage />} />
        <Route Component={IntegrationPage} path="/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComp;
