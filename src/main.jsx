import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./pages/dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./pages/login";
import Settings from "./pages/settings";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<LandingPage />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<ProtectedRoutes />}>
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Settings />} path="/settings" />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
