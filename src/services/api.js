const API_BASE_URL = 'http://localhost:3001/api';

export const apiService = {
  // Health check
  async getHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  // Get all activities
  async getActivities() {
    const response = await fetch(`${API_BASE_URL}/activities`);
    if (!response.ok) throw new Error('Failed to fetch activities');
    return response.json();
  },

  // Save user progress
  async saveProgress(userId, activityId, score, timeSpent) {
    const response = await fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, activityId, score, timeSpent }),
    });
    if (!response.ok) throw new Error('Failed to save progress');
    return response.json();
  },

  // Get user profile
  async getUserProfile(userId) {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
  }
};

// Utility function for handling API errors
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    error: true,
    message: error.message || 'An unexpected error occurred'
  };
};