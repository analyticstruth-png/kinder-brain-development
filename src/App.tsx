import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Activities from './pages/Activities';
import Resources from './pages/Resources';
import Blog from './components/Blog/Blog'; // ADD THIS IMPORT
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog" element={<Blog />} /> {/* ADD THIS ROUTE */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;