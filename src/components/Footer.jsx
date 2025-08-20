import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>&copy; {new Date().getFullYear()} DecisionSupport</p>
        </div>
        <div className="footer-right">
          <p>Built for academic research purposes</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
