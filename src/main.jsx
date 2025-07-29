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
import ThemeSwitcher from "./utils/ThemeSwitcher";
import ColorBlindnessSwitcher from "./utils/ColorBlindnessSwitcher";
import ColorBlindnessFilters from "./components/ColorBlindnessFilters";
import Finance from "./pages/finance";
import Tasks from "./pages/tasks";
import Calendar from "./pages/calendar";
import Stock from "./pages/stock";
import NotFound from "./pages/notFoundPage";
import PageTransition from "./components/PageTransition/PageTransition";
import { Support } from "./pages/support";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeSwitcher />
      <ColorBlindnessSwitcher />
      <ColorBlindnessFilters />
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route element={<LandingPage />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<ProtectedRoutes />}>
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Stock />} path="/stock" />
              <Route element={<Settings />} path="/settings" />
              <Route element={<Support />} path="/support" />
              <Route element={<Finance />} path="/finance" />
              <Route element={<Calendar />} path="/calendar" />
              <Route element={<Tasks />} path="/tasks" />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
