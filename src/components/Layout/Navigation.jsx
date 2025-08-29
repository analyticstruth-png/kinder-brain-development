import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <h2>Kinder Brain Development</h2>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>
        <Link 
          to="/activities" 
          className={location.pathname === '/activities' ? 'active' : ''}
        >
          Activities
        </Link>
        <Link 
          to="/blog" 
          className={location.pathname === '/blog' ? 'active' : ''}
        >
          Blog
        </Link>
        <Link 
          to="/guides" 
          className={location.pathname === '/guides' ? 'active' : ''}
        >
          Guides
        </Link>
        <Link 
          to="/newsletter" 
          className={location.pathname === '/newsletter' ? 'active' : ''}
        >
          Newsletter
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;