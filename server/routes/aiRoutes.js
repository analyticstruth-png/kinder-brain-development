import express from 'express';
import OpenAI from 'openai';
import pool from '../config/database.js';

const router = express.Router();

// Initialize OpenAI with API key and project specification
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: 'proj_1m7XeWjrBSBuVnvZf0tB1FfX' // 
});

// AI Cognitive Response Endpoint - MAIN AI AGENT
router.post('/cognitive/respond', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message is required',
        content: 'Please provide a question or message to continue.'
      });
    }

    // If no API key, return informative message
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return res.json({
        content: "Welcome to the Cognitive Skills AI Assistant! I'm currently in setup mode. " +
                "Please configure the OpenAI API key to enable full functionality. " +
                "In the meantime, here's a tip: Regular reading and problem-solving activities " +
                "significantly boost children's cognitive development.",
        cognitiveSkills: ['Cognitive Development', 'Learning', 'Brain Health']
      });
    }

    // Use real OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: 'You are a cognitive development expert specializing in children\'s brain development ' +
                'ages 0-5. Provide practical, evidence-based advice. Focus on: ' +
                '- Cognitive skill development\n- Brain growth strategies\n- Practical activities\n' +
                '- Age-appropriate exercises\n- Scientific research findings\n' +
                'Keep responses educational, supportive, and actionable.'
      }, {
        role: 'user',
        content: message
      }],
      max_tokens: 600,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0]?.message?.content;

    res.json({
      content: aiResponse,
      cognitiveSkills: extractCognitiveSkills(aiResponse),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cognitive AI Error:', error);
    
    res.status(500).json({
      content: "I apologize, I'm experiencing technical difficulties. " +
              "Please try again in a moment. For now, consider trying: " +
              "1. Reading interactive books together\n2. Engaging in puzzle games\n" +
              "3. Practicing memory matching games\n4. Exploring sensory play activities",
      cognitiveSkills: ['Technical Difficulty'],
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// AI Blog Generation Endpoint (keep existing)
router.post('/generate-blog', async (req, res) => {
  try {
    const { topic, style = "educational" } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    let content;
    
    // If no API key, use enhanced mock content
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      content = generateEnhancedMockPost(topic);
    } else {
      // Use real OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `Create a comprehensive blog post about "${topic}" for parents and educators of children aged 0-5. 
          Focus on brain development, practical tips, and evidence-based strategies. 
          Style: ${style}
          
          Format in markdown with proper headings.`
        }],
        max_tokens: 1000,
        temperature: 0.7
      });

      content = completion.choices[0]?.message?.content || generateEnhancedMockPost(topic);
    }

    // Extract title and excerpt
    const title = extractTitle(content);
    const excerpt = extractExcerpt(content);

    res.json({ 
      content,
      title,
      excerpt,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tags: ['ai-generated', 'brain-development'],
      is_ai_generated: true
    });

  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ 
      error: 'AI generation failed',
      message: error.message 
    });
  }
});

// AI Generate and Save Endpoint (keep existing)
router.post('/generate-and-save', async (req, res) => {
  try {
    const { topic, style = "educational" } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // Generate content (same as above)
    let content;
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      content = generateEnhancedMockPost(topic);
    } else {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `Create a comprehensive blog post about "${topic}" for parents and educators of children aged 0-5. 
          Focus on brain development, practical tips, and evidence-based strategies. 
          Style: ${style}
          
          Format in markdown with proper headings.`
        }],
        max_tokens: 1000,
        temperature: 0.7
      });
      content = completion.choices[0]?.message?.content || generateEnhancedMockPost(topic);
    }

    // Extract metadata
    const title = extractTitle(content);
    const excerpt = extractExcerpt(content);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Save to database
    const result = await pool.query(
      `INSERT INTO posts
       (title, slug, content, excerpt, tags, is_ai_generated, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'published')
       RETURNING *`,
      [title, slug, content, excerpt, ['ai-generated', 'brain-development'], true]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('AI generation and save error:', error);
    res.status(500).json({ 
      error: 'AI generation and save failed',
      message: error.message 
    });
  }
});

// Helper function to extract cognitive skills from AI response
function extractCognitiveSkills(content) {
  if (!content) return ['General Cognitive Development'];
  
  const skills = [];
  const skillKeywords = {
    'Problem Solving': ['problem.solv', 'puzzle', 'logic', 'reasoning'],
    'Critical Thinking': ['critical think', 'analy', 'evaluat', 'question'],
    'Memory': ['memory', 'recall', 'remember', 'memoriz'],
    'Attention': ['attention', 'focus', 'concentrat', 'engage'],
    'Language': ['language', 'vocabulary', 'reading', 'writing', 'speak'],
    'Executive Function': ['executive', 'planning', 'organiz', 'self.control'],
    'Social Skills': ['social', 'share', 'cooperat', 'empathy'],
    'Creativity': ['creative', 'imagin', 'innovative', 'art', 'music']
  };

  const contentLower = content.toLowerCase();
  
  Object.entries(skillKeywords).forEach(([skill, keywords]) => {
    if (keywords.some(keyword => contentLower.includes(keyword))) {
      skills.push(skill);
    }
  });

  return skills.length > 0 ? skills : ['Cognitive Development', 'Learning Skills'];
}

// Helper functions (keep existing)
function generateEnhancedMockPost(topic) {
  return `# 🧠 ${topic}: Boost Your Child's Brain Development

## Why ${topic} Matters

${topic} plays a crucial role in early childhood brain development. Research shows that regular engagement in ${topic.toLowerCase()} activities can significantly enhance cognitive growth and neural connections.

### Key Benefits:
- **Enhanced cognitive development** through engaging activities
- **Improved problem-solving skills** 
- **Stronger neural connections**
- **Better executive function** development

*AI-generated educational content*`;
}

function extractTitle(content) {
  const firstLine = content.split('\n')[0];
  return firstLine.replace(/^#\s*[^\w\s]*\s*/, '').trim();
}

function extractExcerpt(content) {
  const lines = content.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && line.length > 20 && !line.includes('##')) {
      return line;
    }
  }
  return 'Discover evidence-based strategies for optimal brain development through engaging activities.';
}

export default router;