import pool from '../config/database.js';

export const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      'SELECT * FROM posts WHERE slug = $1 AND status = $2',
      [slug, 'published']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, excerpt, tags, is_ai_generated = false } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Convert tags array to proper JSON format for PostgreSQL
    const tagsArray = Array.isArray(tags) ? tags : [];
    const tagsJson = JSON.stringify(tagsArray);

    const result = await pool.query(
      `INSERT INTO posts
       (title, slug, content, excerpt, tags, is_ai_generated, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'published')
       RETURNING *`,
      [title, slug, content, excerpt, tagsJson, is_ai_generated]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating post:', error);

    if (error.code === '23505') { // Unique violation
      res.status(400).json({ error: 'Post with this title already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getAdminPosts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};