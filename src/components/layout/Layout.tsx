import { useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import CustomCursor from "../CustomCursor";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <CustomCursor />
      <Navbar />
      <main
        key={location.pathname}
        className="page-content"
        style={{
          minHeight: "100vh",
          paddingTop: "0", // Header is fixed/overlay
        }}
      >
        {children}
      </main>
      <div className="footer-mobile-hidden">
        <Footer />
      </div>

      {/* Vignette Effect */}
      <div className="page-vignette-container">
        <div className="page-vignette-extreme"></div>
      </div>

      {/* Noise Overlay */}
      <div
        className="noise-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9000,
          opacity: 0.05,
          backgroundImage: "url('/noise.svg')",
        }}
      ></div>
    </div>
  );
};

export default Layout;
