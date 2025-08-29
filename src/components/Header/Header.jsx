import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          {/* Add your logo img here if needed */}
          <span>Kinder Brain Development</span>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/activities" className={location.pathname === '/activities' ? 'active' : ''}>Activities</Link></li>
          <li><Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''}>Resources</Link></li>
          <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
          <li><Link to="/programs" className={location.pathname === '/programs' ? 'active' : ''}>Programs</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        </ul>

        <button className="mobile-menu-button">
          ☰
        </button>
      </nav>
    </header>
  );
}