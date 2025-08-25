import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Users, BookOpen, Trophy, Eye, Hand, Sparkles, Target, Settings, GraduationCap, BarChart, Megaphone, FileDown, Info, Home, Award, MousePointerClick } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/activities')
      .then(response => response.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading activities:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading magical activities...</div>
      </div>
    );
  }

  return (
    <div className="fun-body">
      {/* Header with subtitle */}
      <header className="fun-header">
        <h1 className="fun-title">Kinder Brain Development</h1>
        <p className="header-subtitle">Where Learning Meets Play - Unlock Your Child's Cognitive Potential!</p>
      </header>

      {/* Floating Tabs */}
     <nav className="floating-tabs">
  <ul>
    <li><Link to="/" className="tab-button"><Home className="tab-icon" /> Home</Link></li>
    <li><Link to="/activities" className="tab-button"><Brain className="tab-icon" /> Activities</Link></li>
    <li><a href="#programs" className="tab-button"><GraduationCap className="tab-icon" /> Program</a></li>
    <li><Link to="/resources" className="tab-button"><BookOpen className="tab-icon" /> Resources</Link></li>
    <li><a href="#subscribe" className="tab-button"><Megaphone className="tab-icon" /> Subscribe</a></li>
  </ul>
</nav>

      {/* Welcome Box */}
      <div className="content-box welcome-box">
        <h2>Welcome to Cognitive Adventures!</h2>
        <p>Discover a world of fun and easy-peasy learning. We complement your homeschool resources to unlock Cognitive Magic in young minds!</p>
      </div>

      {/* Fun Elements */}
      <div className="fun-elements">
        <div className="fun-element">✨</div>
        <div className="fun-element">❤️</div>
        <div className="fun-element">✏️</div>
        <div className="fun-element">📚</div>
        <div className="fun-element">🍎</div>
        <div className="fun-element">⚽</div>
      </div>

      {/* Why Choose Our Program */}
      <div className="content-box info-box">
        <h2>Why Choose Our Program?</h2>
        <p>Our program is tailored for homeschooling parents and teachers, making it easy to integrate engaging activities that foster young minds in a structured yet joyful environment.</p>
      </div>

      {/* Comprehensive Cognitive Development Plan */}
      <section id="programs" className="programs-section">
        <h2 className="programs-title">
    <a 
        href="/printables/program-overview.html" 
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#4a7a2d', textDecoration: 'none' }}
        onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
        onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
    >
        Comprehensive Cognitive Development Plan
    </a>
</h2>
        <div className="cognitive-skills-grid">
          <div className="skill-card">
            <div className="skill-icon">
              <Brain className="icon" />
            </div>
            <h3>Executive Function</h3>
          </div>
          <div className="skill-card">
            <div className="skill-icon">
              <BookOpen className="icon" />
            </div>
            <h3>Language & Listening</h3>
          </div>
          <div className="skill-card">
            <div className="skill-icon">
              <Trophy className="icon" />
            </div>
            <h3>Early Math</h3>
          </div>
          <div className="skill-card">
            <div className="skill-icon">
              <Eye className="icon" />
            </div>
            <h3>Visual-Spatial</h3>
          </div>
          <div className="skill-card">
            <div className="skill-icon">
              <Hand className="icon" />
            </div>
            <h3>Fine Motor</h3>
          </div>
          <div className="skill-card">
            <div className="skill-icon">
              <Users className="icon" />
            </div>
            <h3>Social-Emotional</h3>
          </div>
        </div>
      </section>

      {/* From the Founder */}
      <div className="content-box personal-statement">
        <h2>From the Founder</h2>
        <p>"As a passionate educator and parent, I've seen the spark in children's eyes when learning feels like play. Our Kinder Brain Development Program is my dream to blend structured cognitive development with whimsical fun, helping kids build memory, attention, and problem-solving skills while laughing along the way. Join us on this magical journey!"</p>
        <p className="founder-signature">- Inmet Brunet, Founder</p>
      </div>

      {/* Fun Resources */}
      <section id="resources" className="content-box resources-section">
        <h2>Fun Resources</h2>
        <p>Download printable worksheets, watch tutorial videos, and join our community forum for tips and sharing ideas. Everything is designed to be kid-friendly and parent-approved!</p>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="content-box subscribe-section">
        <h2>Subscribe to our Newsletter</h2>
        <p>Email us at analyticstruth@gmail.com or follow us on social media for daily fun tips!</p>
      </section>

      {/* Footer */}
      <footer className="fun-footer">
        <div className="footer-content">
          <h3>Let's Make Learning Magical!</h3>
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">📸</a>
            <a href="#" className="social-link">📌</a>
            <a href="#" className="social-link">📺</a>
          </div>
          <p>&copy; 2025 Kinder Brain Development. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;