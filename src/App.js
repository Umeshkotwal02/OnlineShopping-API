import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader";
import Header from "./components/headercomp/Header";
import MobileFooter from "./components/mobileheadercomp/MobileFooter";
import Footer from "./components/Footer";
import ScrollUp from "./components/ScrollUp";
import { publicRoutes } from "./routes/allRoutes";
import AutoScrollToTop from "./components/AutoScrollToTop";
import { STORAGE } from "./config/config";
import NotFoundPage from "./pages/NoFoundPage";

function App() {

  const deviceId = localStorage.getItem(STORAGE?.DEVICEID || "defaultDeviceId");
  if (!deviceId) {
    const newDeviceId = Date.now();
    localStorage.setItem(STORAGE?.DEVICEID || "defaultDeviceId", newDeviceId);
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2205);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
            }}
          />
          <AutoScrollToTop />
          <Header />
          <MobileFooter />
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <ScrollUp />
        </Router>
      )}
    </>
  );
}

export default App;
