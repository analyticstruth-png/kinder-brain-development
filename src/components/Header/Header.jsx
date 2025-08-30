import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <span>Kinder Brain Development</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/activities" className={location.pathname === '/activities' ? 'active' : ''}>Activities</Link></li>
          <li><Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''}>Resources</Link></li>
          
          {/* KEEP BLOG TAB FOR SEO */}
          <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
          
          {/* ADD AI ASSISTANT TAB */}
          <li><Link to="/cognitive-agent" className={location.pathname === '/cognitive-agent' ? 'active' : ''}>AI Assistant</Link></li>
          
          <li><Link to="/programs" className={location.pathname === '/programs' ? 'active' : ''}>Programs</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/activities" className={location.pathname === '/activities' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Activities</Link></li>
            <li><Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Resources</Link></li>
            
            {/* KEEP BLOG IN MOBILE */}
            <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Blog</Link></li>
            
            {/* ADD AI ASSISTANT IN MOBILE */}
            <li><Link to="/cognitive-agent" className={location.pathname === '/cognitive-agent' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>AI Assistant</Link></li>
            
            <li><Link to="/programs" className={location.pathname === '/programs' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Programs</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}