import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Laptop Store</h3>
            <p>Your trusted destination for the latest laptops from top brands.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/laptops">All Laptops</a></li>
              <li><a href="/cart">Shopping Cart</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/returns">Returns</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Laptop Store. All rights reserved. Built with React & FastAPI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
