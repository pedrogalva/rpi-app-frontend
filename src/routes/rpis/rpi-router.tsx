import React from "react";
import { Routes, Route } from "react-router";

import RpiPage from "./rpi-page";

function RpisRouter() {
  return (
    <Routes>
      <Route path="/rpis" element={<RpiPage />} />
    </Routes>
  );
}

export default RpisRouter;
