import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogService } from '../../services/blogService';
import { AIBlogGenerator } from '../../services/aiBlogGenerator';
import './Blog.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [aiTopic, setAiTopic] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = async () => {
    setLoading(true);
    try {
      // First try to get cached posts
      const cachedPosts = BlogService.getCachedPosts();
      if (cachedPosts && cachedPosts.length > 0) {
        setPosts(cachedPosts);
        setSelectedPost(cachedPosts[0]);
      } else {
        // If no cache, try to refresh from API or use fallback
        const refreshedPosts = await BlogService.refreshPosts();
        setPosts(refreshedPosts);
        if (refreshedPosts.length > 0) {
          setSelectedPost(refreshedPosts[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
      // Use fallback directly
      const fallback = BlogService.getFallbackPosts();
      setPosts(fallback);
      setSelectedPost(fallback[0]);
    }
    setLoading(false);
  };

  const generateAIPost = async () => {
    if (!aiTopic.trim()) return;

    setGenerating(true);
    try {
      const content = await AIBlogGenerator.generatePost(aiTopic);
      const title = AIBlogGenerator.extractTitle(content);
      const excerpt = AIBlogGenerator.extractExcerpt(content);

      const newPost = await BlogService.addPost({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt,
        content,
        tags: ['ai-generated', 'brain-development']
      });

      setPosts([newPost, ...posts]);
      setSelectedPost(newPost);
      setAiTopic('');
    } catch (error) {
      console.error('Failed to generate post:', error);
      alert('AI generation failed. Please try again.');
    }
    setGenerating(false);
  };

  if (loading) {
    return <div className="blog-loading">Loading blog posts...</div>;
  }

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Kinder Brain Development Blog</h1>
        <p>Evidence-based insights for parents and educators</p>

        <div className="ai-generator">
          <h3>AI Post Generator</h3>
          <div className="ai-input-group">
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="Enter blog topic (e.g., 'executive function activities')"
              disabled={generating}
              onKeyPress={(e) => e.key === 'Enter' && generateAIPost()}
            />
            <button 
              onClick={generateAIPost} 
              disabled={generating || !aiTopic.trim()}
              className={generating ? 'generating' : ''}
            >
              {generating ? 'Generating...' : 'Generate Post'}
            </button>
          </div>
        </div>
      </header>

      <div className="blog-layout">
        <main className="blog-content">
          {selectedPost ? (
            <article className="blog-post">
              <h2>{selectedPost.title}</h2>
              <div className="post-meta">
                <time className="post-date">
                  {selectedPost.date || new Date().toLocaleDateString()}
                </time>
                {selectedPost.tags?.includes('ai-generated') && (
                  <span className="ai-badge">AI Generated</span>
                )}
                {selectedPost.local && (
                  <span className="local-badge">Local Draft</span>
                )}
              </div>
              <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </article>
          ) : (
            <div className="no-post-selected">
              <p>Select a post from the sidebar to read</p>
            </div>
          )}
        </main>

        <aside className="blog-sidebar">
          <h3>Recent Posts ({posts.length})</h3>
          <ul className="post-list">
            {posts.map(post => (
              <li
                key={post.id}
                className={selectedPost?.id === post.id ? 'active' : ''}
                onClick={() => setSelectedPost(post)}
              >
                <span className="post-title">{post.title}</span>
                <div className="post-meta-small">
                  <span className="post-date">{post.date}</span>
                  {post.tags?.includes('ai-generated') && (
                    <span className="ai-indicator">[AI]</span>
                  )}
                  {post.local && (
                    <span className="local-indicator">[Local]</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          
          {posts.length === 0 && (
            <div className="no-posts">
              <p>No posts yet. Generate your first AI post!</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}