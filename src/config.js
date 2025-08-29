// Frontend configuration - No API keys or secrets here!
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',
  APP_VERSION: '1.0.0',
  FEATURES: {
    AI_GENERATION: true,
    OFFLINE_MODE: false,
    PROGRESS_TRACKING: true
  },
  ROUTES: {
    BLOG: '/blog',
    ACTIVITIES: '/activities',
    PROGRESS: '/progress'
  }
};