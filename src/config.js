// Frontend configuration - uses Vite environment variables
export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  API_KEY: import.meta.env.VITE_API_KEY || '',
  ENVIRONMENT: import.meta.env.MODE || 'development',
  IS_DEVELOPMENT: import.meta.env.DEV || true,
  IS_PRODUCTION: import.meta.env.PROD || false
};

// Default export for easier imports
export default config;