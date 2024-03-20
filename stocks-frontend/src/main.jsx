import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home.jsx";
import Register from "../src/components/Register.jsx";

//allows us to set specific url routes to componenents in application
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
