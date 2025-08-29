import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components - CHECK THESE PATHS ARE CORRECT
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Blog from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';

// Import pages - MAKE SURE THESE EXIST
import Home from './pages/Home';
import Activities from './pages/Activities';
import Resources from './pages/Resources';
import Printables from './pages/Printables';
import Programs from './pages/Programs';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/printables" element={<Printables />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/contact" element={<Contact />} />
            {/* BLOG ROUTES - MUST BE INCLUDED */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
