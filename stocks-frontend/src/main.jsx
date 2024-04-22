import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/home.jsx";
import Register from "../src/components/Register.jsx";

//allows us to set specific url routes to componenents in application
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import BuyPage from "./components/BuyPage.jsx";
import StockHistory from "./components/StockHistory.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/BuyPage" element={<BuyPage />} />
          <Route path="/StockHistory" element={<StockHistory />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
