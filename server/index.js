import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import postsRoutes from './routes/posts.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/posts', postsRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root API endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to Kinder Brain Development API',
    version: '1.0.0',
    endpoints: {
      posts: '/api/posts',
      ai: '/api/ai',
      health: '/api/health',
      activities: '/api/activities',
      user: '/api/user/:id',
      progress: '/api/progress'
    }
  });
});

// Your existing activities routes
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

// Progress tracking endpoint
app.post('/api/progress', (req, res) => {
  const { userId, activityId, score, timeSpent } = req.body;
  
  console.log('Progress saved:', { userId, activityId, score, timeSpent, timestamp: new Date() });
  
  res.json({ 
    success: true, 
    message: 'Progress saved successfully',
    data: { userId, activityId, score, timeSpent }
  });
});

// User profile endpoint
app.get('/api/user/:userId', (req, res) => {
  const { userId } = req.params;
  
  res.json({
    id: userId,
    name: 'Young Learner',
    age: 5,
    joinDate: '2023-10-15',
    totalActivities: 12,
    averageScore: 85
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Keep server running
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}/api`);
  console.log(`🤖 AI endpoints: http://localhost:${PORT}/api/ai`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Activities: http://localhost:${PORT}/api/activities`);
  console.log(`📊 User API: http://localhost:${PORT}/api/user/123`);
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