import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import CustomCursor from "./CustomCursor";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <CustomCursor />
      <Header />
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
      <Footer />

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
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      ></div>
    </div>
  );
};

export default Layout;
