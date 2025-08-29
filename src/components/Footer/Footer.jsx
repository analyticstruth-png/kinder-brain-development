import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Kinder Brain Development</h3>
          <p>Evidence-based educational resources and activities for early childhood brain development and cognitive growth.</p>
          <div className="social-links">
            <a href="https://facebook.com" aria-label="Facebook">📘</a>
            <a href="https://instagram.com" aria-label="Instagram">📸</a>
            <a href="https://pinterest.com" aria-label="Pinterest">📌</a>
            <a href="https://twitter.com" aria-label="Twitter">🐦</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <Link to="/activities">Learning Activities</Link>
          <Link to="/printables">Free Printables</Link>
          <Link to="/blog">Educational Blog</Link>
          <Link to="/resources">Teaching Resources</Link>
        </div>
        
        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/programs">Our Programs</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/testimonials">Testimonials</Link>
        </div>
        
        <div className="footer-section">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for new activities and resources:</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Kinder Brain Development. All rights reserved.</p>
        <p>
          <Link to="/privacy" style={{color: '#c7d2fe', marginRight: '1rem'}}>Privacy Policy</Link>
          <Link to="/terms" style={{color: '#c7d2fe'}}>Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;