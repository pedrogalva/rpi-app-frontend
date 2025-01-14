import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import SlackIntegrationPage from "./slack-integrations";

function RouterComp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SlackIntegrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComp;
