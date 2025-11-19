import React from "react";
import { Routes, Route } from "react-router";

import AnticipationPage from "./anticipation-page";
import SingleAnticipationPage from "./single-anticipation-page";

function AnticipationRouter() {
  return (
    <Routes>
      <Route path="/anticipations" element={<AnticipationPage />} />
      <Route
        Component={SingleAnticipationPage}
        path="/anticipations/:rpi_type"
      />
    </Routes>
  );
}

export default AnticipationRouter;
