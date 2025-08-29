import { config } from '../config';

const API_BASE = `${config.API_URL}/api`;

export class BlogService {
  static async getAllPosts() {
    try {
      const response = await fetch(`${API_BASE}/posts`);
      if (!response.ok) throw new Error('API failed');
      return await response.json();
    } catch (error) {
      console.error('API error, using fallback data:', error);
      return this.getFallbackPosts();
    }
  }

  static getCachedPosts() {
    // Simple in-memory cache implementation
    try {
      const cached = localStorage.getItem('blogPostsCache');
      if (cached) {
        const posts = JSON.parse(cached);
        // Check if cache is less than 5 minutes old
        const cacheTime = localStorage.getItem('blogPostsCacheTime');
        if (cacheTime && (Date.now() - parseInt(cacheTime)) < 300000) {
          return posts;
        }
      }
    } catch (error) {
      console.warn('Cache read failed:', error);
    }
    return [];
  }

  static setCache(posts) {
    try {
      localStorage.setItem('blogPostsCache', JSON.stringify(posts));
      localStorage.setItem('blogPostsCacheTime', Date.now().toString());
    } catch (error) {
      console.warn('Cache write failed:', error);
    }
  }

  static async createPost(postData) {
    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (!response.ok) throw new Error('Create post failed');
      const newPost = await response.json();
      
      // Update cache
      const cachedPosts = this.getCachedPosts();
      this.setCache([newPost, ...cachedPosts]);
      
      return newPost;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  }

  static async addPost(postData) {
    try {
      return await this.createPost(postData);
    } catch (error) {
      console.error('Failed to add post via API, using local data:', error);
      // Create local post with demo data
      const localPost = {
        ...postData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        local: true // Flag to indicate this is not from API
      };
      
      // Add to cache
      const cachedPosts = this.getCachedPosts();
      this.setCache([localPost, ...cachedPosts]);
      
      return localPost;
    }
  }

  static async refreshPosts() {
    try {
      const posts = await this.getAllPosts();
      this.setCache(posts);
      return posts;
    } catch (error) {
      console.error('Failed to refresh posts:', error);
      return this.getCachedPosts();
    }
  }

  static getFallbackPosts() {
    return [{
      id: 1,
      title: 'Welcome to Kinder Brain Development Blog',
      slug: 'welcome-to-our-blog',
      content: '# Welcome!\n\nThis is your AI-powered blog for brain development insights. \n\n## Features:\n- AI-generated content\n- Educational resources\n- Latest research insights\n\nStay tuned for more content!',
      excerpt: 'Discover AI-powered insights into child brain development and educational strategies.',
      date: new Date().toISOString().split('T')[0],
      tags: ['welcome', 'introduction']
    }, {
      id: 2,
      title: 'Understanding Executive Functions in Children',
      slug: 'executive-functions-in-children',
      content: '# Executive Functions: The Brain\'s CEO\n\nExecutive functions are crucial for:\n- Self-control\n- Working memory\n- Cognitive flexibility\n\n## Activities to develop executive functions:\n1. Memory games\n2. Puzzle solving\n3. Role-playing scenarios',
      excerpt: 'Learn about executive functions and how to nurture them in young children.',
      date: new Date().toISOString().split('T')[0],
      tags: ['brain-development', 'executive-functions']
    }];
  }

  // Initialize with some data if empty
  static async initialize() {
    const cached = this.getCachedPosts();
    if (cached.length === 0) {
      const fallback = this.getFallbackPosts();
      this.setCache(fallback);
      return fallback;
    }
    return cached;
  }
}

// Initialize when module loads
BlogService.initialize().catch(console.error);