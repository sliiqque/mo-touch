import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}
      <div className="main-content" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <div className="page-vignette-container">
          <div className="page-vignette-extreme"></div>
        </div>
        <Header />
        <Gallery />
        <Footer />
      </div>
    </>
  );
};

export default App;
