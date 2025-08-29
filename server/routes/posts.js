import express from 'express';
import { 
  getAllPosts, 
  getPostBySlug, 
  createPost, 
  getAdminPosts 
} from '../controllers/postController.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);

// Admin routes (will add authentication later)
router.post('/', createPost);
router.get('/admin/all', getAdminPosts);

export default router;