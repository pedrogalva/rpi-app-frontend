import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import SlackIntegrationPage from "./slack-integrations";
import IntegrationPage from "./integration-page";
import GoogleLoginComp from "./auth";
import MainPageHeader from "./components/page-header";

function RouterComp() {
  let actualRoute = document.referrer;

  if (
    !actualRoute.includes("https://internal.moveonmarcas.com.br") &&
    !actualRoute.includes("http://localhost:3000")
  ) {
    actualRoute = "";
  } else if (actualRoute.includes("auth")) {
    actualRoute = "";
  } else {
    actualRoute = btoa(actualRoute);
  }

  return (
    <BrowserRouter basename="/front_rpi">
      <MainPageHeader />
      <Routes>
        <Route
          path="/auth"
          element={<GoogleLoginComp base64RedirectUrl={actualRoute} />}
        />
        <Route path="/" element={<SlackIntegrationPage />} />
        <Route Component={IntegrationPage} path="/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComp;
