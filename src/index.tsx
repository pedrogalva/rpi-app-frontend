import React from "react";
import ReactDOM from "react-dom/client";
import RouterComp from "./routes/router";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterComp />
  </React.StrictMode>
);
