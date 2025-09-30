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
import Report from "./pages/report";
import Service from "./pages/service";
import NotFound from "./pages/notFoundPage";
import PageTransition from "./components/PageTransition/PageTransition";
import { Support } from "./pages/support";
import { AuthProvider } from "./contexts/AuthContext";
import { TermsPage } from "./pages/terms";
import { Slide, ToastContainer } from "react-toastify";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeSwitcher />
      <ColorBlindnessSwitcher />
      <ColorBlindnessFilters />
      <AuthProvider>
        <BrowserRouter>
          {/* <PageTransition> */}
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
              <Route element={<Report />} path="/report" />
              <Route element={<Service />} path="/service" />
              <Route element={<TermsPage />} path="/terms" />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
          {/* </PageTransition> */}
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
