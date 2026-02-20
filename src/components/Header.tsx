import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="header">
      <div className="nav-section">
        <div className="logo-container">
          <Link to="/">
            <div className="logo-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
          </Link>
        </div>
      </div>
      <div className="values-section">
        <h3>+Menu</h3>
        <ul>
          <li>
            <Link
              to="/"
              style={{
                opacity: isActive("/") ? 1 : 0.5,
                textDecoration: isActive("/") ? "underline" : "none",
                textUnderlineOffset: "4px",
              }}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{
                opacity: isActive("/about") ? 1 : 0.5,
                textDecoration: isActive("/about") ? "underline" : "none",
                textUnderlineOffset: "4px",
              }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              style={{
                opacity: isActive("/services") ? 1 : 0.5,
                textDecoration: isActive("/services") ? "underline" : "none",
                textUnderlineOffset: "4px",
              }}
            >
              Services
            </Link>
          </li>
          <li>
            <a href="#" style={{ opacity: 0.5 }}>
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="location-section">
        <h3>+Studio</h3>
        <p>Los Angeles</p>
        <p>California</p>
      </div>
      <div className="contact-section">
        <h3>+Connect</h3>
        <p>
          <a href="mailto:hi@filip.fyi">hi@filip.fyi</a>
        </p>
      </div>
      <div className="social-section">
        <h3>+Follow</h3>
        <ul>
          <li>
            <a href="https://instagram.com/filipz__">Instagram</a>
          </li>
          <li>
            <a href="https://x.com/filipz">Twitter</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/filipzrnzevic">LinkedIn</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
