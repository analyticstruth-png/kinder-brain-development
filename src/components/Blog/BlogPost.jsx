import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const BlogPost = () => {
  const { slug } = useParams(); // eslint-disable-line no-unused-vars
  
  // Temporary data - in real app, you'd fetch based on slug
  const post = {
    title: "5 Brain Development Activities for Toddlers",
    content: `
      <h2>Introduction</h2>
      <p>Early childhood is a critical period for brain development. Here are 5 evidence-based activities that support cognitive growth...</p>
      
      <h2>1. Sensory Play</h2>
      <p>Sensory bins with rice, beans, or water help develop neural connections...</p>
      
      <h2>2. Puzzle Games</h2>
      <p>Simple puzzles improve problem-solving skills and spatial awareness...</p>
    `,
    date: "2025-08-25",
    readTime: "5 min read",
    image: "/blog/toddler-activities.jpg"
  };

  return (
    <div className="blog-post-container">
      <Link to="/blog" className="back-button">← Back to Blog</Link>
      
      <article className="blog-post-detail">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-date">{post.date}</span>
            <span className="post-read-time">{post.readTime}</span>
          </div>
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title} 
              className="post-featured-image" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </header>
        
        <div 
          className="post-content" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
};

export default BlogPost;