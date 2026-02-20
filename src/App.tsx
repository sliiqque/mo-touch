import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div
        className="main-content"
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.8s ease" }}
      >
        <div className="page-vignette-container">
          <div className="page-vignette-extreme"></div>
        </div>
        <Header />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
