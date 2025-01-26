import React from "react";

import { Routes, Route } from "react-router";
import GoogleLoginComp from "./index";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<GoogleLoginComp />} />
    </Routes>
  );
};

export default AuthRouter;
