import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MemoryMatch from "../components/MemoryMatch";
import { Link } from "react-router-dom";
import { Home, Brain, Target, Clock, Users, Award } from "lucide-react";

export default function Activities() {
  return (
    <div className="activities-container">
      {/* Navigation Header */}
      <header className="activities-header">
        <div className="header-content">
          <Link to="/" className="home-link">
            <Home size={24} />
            Back to Home
          </Link>
          <h1>🎮 Cognitive Development Activities</h1>
          <p>Fun games that build essential thinking skills for young learners</p>
        </div>
      </header>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h2>Why Play Matters for Cognitive Development</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <Target className="benefit-icon" />
            <h3>Focused Skill Building</h3>
            <p>Each game targets specific cognitive abilities like memory, attention, and problem-solving</p>
          </div>
          <div className="benefit-item">
            <Clock className="benefit-icon" />
            <h3>Short & Engaging</h3>
            <p>10-15 minute sessions designed for young attention spans</p>
          </div>
          <div className="benefit-item">
            <Users className="benefit-icon" />
            <h3>Progress Tracking</h3>
            <p>Monitor your child's development and celebrate milestones</p>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="games-section">
        <h2>Interactive Learning Games</h2>
        <div className="games-grid">
          {/* Memory Match Game */}
          <Card className="game-card active-game">
            <CardHeader>
              <CardTitle>Memory Match 🧠</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="game-description">
                <p><strong>Skills developed:</strong> Working memory, concentration, visual processing</p>
                <p>Find matching pairs of cards to exercise your memory muscles!</p>
              </div>
              <MemoryMatch />
            </CardContent>
          </Card>

          {/* Coming Soon Games */}
          <Card className="game-card coming-soon">
            <CardHeader>
              <CardTitle>Pattern Puzzles 🔍 <span className="badge">Coming Soon</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="coming-soon-content">
                <p>Identify and complete visual patterns to develop logical thinking</p>
                <div className="skills-list">
                  <span>Visual-spatial skills</span>
                  <span>Pattern recognition</span>
                  <span>Logical reasoning</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="game-card coming-soon">
            <CardHeader>
              <CardTitle>Story Sequence 📖 <span className="badge">Coming Soon</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="coming-soon-content">
                <p>Arrange pictures to create logical stories and develop narrative skills</p>
                <div className="skills-list">
                  <span>Language development</span>
                  <span>Sequential thinking</span>
                  <span>Creativity</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="game-card coming-soon">
            <CardHeader>
              <CardTitle>Quick Count 🔢 <span className="badge">Coming Soon</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="coming-soon-content">
                <p>Practice counting and basic math skills with fun visual challenges</p>
                <div className="skills-list">
                  <span>Number recognition</span>
                  <span>Basic arithmetic</span>
                  <span>Quick thinking</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <Award className="cta-icon" />
          <h2>Start Your Child's Cognitive Journey Today</h2>
          <p>Just 10-15 minutes daily can make a significant difference in developing essential thinking skills</p>
          <Link to="/" className="cta-button">
            Explore Our Full Program
          </Link>
        </div>
      </div>
    </div>
  );
}