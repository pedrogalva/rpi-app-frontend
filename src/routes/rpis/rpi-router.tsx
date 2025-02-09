import React from "react";
import { Routes, Route } from "react-router";

import RpiPage from "./rpi-page";
import SingleRpiPage from "./single-rpi-page";

function RpisRouter() {
  return (
    <Routes>
      <Route path="/rpis" element={<RpiPage />} />
      <Route Component={SingleRpiPage} path="/rpis/:rpi_type" />
    </Routes>
  );
}

export default RpisRouter;
