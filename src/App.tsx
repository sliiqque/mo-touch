import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { UIProvider } from "./context/UIContext";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <UIProvider>
      <Router>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        <div
          className="main-content"
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.8s ease",
          }}
        >
          <Layout>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </ErrorBoundary>
          </Layout>
        </div>
      </Router>
    </UIProvider>
  );
};

export default App;
