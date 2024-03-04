import React from "react";
import ReactDOM from "react-dom/client";
import Home from "../src/components/Home.jsx";

//allows us to set specific url routes to componenents in application
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
