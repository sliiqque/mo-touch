import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="nav-section">
        <div className="logo-container">
          <div className="logo-circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
          </div>
        </div>
      </div>
      <div className="values-section">
        <h3>+Menu</h3>
        <ul>
          <li><a href="#">Work</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="location-section">
        <h3>+Studio</h3>
        <p>Los Angeles</p>
        <p>California</p>
      </div>
      <div className="contact-section">
        <h3>+Connect</h3>
        <p><a href="mailto:hi@filip.fyi">hi@filip.fyi</a></p>
      </div>
      <div className="social-section">
        <h3>+Follow</h3>
        <ul>
          <li><a href="https://instagram.com/filipz__">Instagram</a></li>
          <li><a href="https://x.com/filipz">Twitter</a></li>
          <li><a href="https://linkedin.com/in/filipzrnzevic">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
