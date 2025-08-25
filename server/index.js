import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Your React frontend URL
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Kinder Brain Development API is working!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Activities route - expanded with more data
app.get('/api/activities', (req, res) => {
  const activities = [
    { 
      id: 1, 
      name: 'Memory Match', 
      skill: 'executive function',
      description: 'Improve working memory with matching card games',
      duration: '10-15 minutes',
      difficulty: 'beginner'
    },
    { 
      id: 2, 
      name: 'Pattern Recognition', 
      skill: 'visual-spatial',
      description: 'Identify and complete visual patterns',
      duration: '15-20 minutes', 
      difficulty: 'intermediate'
    },
    { 
      id: 3, 
      name: 'Story Builder', 
      skill: 'language',
      description: 'Create stories using sequential picture cards',
      duration: '20-25 minutes',
      difficulty: 'intermediate'
    },
    { 
      id: 4, 
      name: 'Number Counting', 
      skill: 'math',
      description: 'Learn counting and basic arithmetic',
      duration: '10-15 minutes',
      difficulty: 'beginner'
    },
    { 
      id: 5, 
      name: 'Shape Tracing', 
      skill: 'fine motor',
      description: 'Practice fine motor skills with shape tracing',
      duration: '15-20 minutes',
      difficulty: 'beginner'
    },
    { 
      id: 6, 
      name: 'Emotion Cards', 
      skill: 'social-emotional',
      description: 'Identify and discuss different emotions',
      duration: '15-20 minutes',
      difficulty: 'intermediate'
    }
  ];
  res.json(activities);
});

// New endpoint to save user progress
app.post('/api/progress', (req, res) => {
  const { userId, activityId, score, timeSpent } = req.body;
  
  // In a real application, you would save this to a database
  console.log('Progress saved:', { userId, activityId, score, timeSpent, timestamp: new Date() });
  
  res.json({ 
    success: true, 
    message: 'Progress saved successfully',
    data: { userId, activityId, score, timeSpent }
  });
});

// New endpoint to get user profile
app.get('/api/user/:userId', (req, res) => {
  const { userId } = req.params;
  
  // Mock user data - in real app, fetch from database
  res.json({
    id: userId,
    name: 'Young Learner',
    age: 5,
    joinDate: '2023-10-15',
    totalActivities: 12,
    averageScore: 85
  });
});

// Keep server running
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Activities API: http://localhost:${PORT}/api/activities`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server stopped.');
    process.exit(0);
  });
});

export default app;