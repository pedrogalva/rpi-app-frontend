import React from "react";
import { Routes, Route } from "react-router";

import { HomePage } from "./HomePage";

function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default HomeRouter;
