// API Configuration
// Change this to your Render backend URL after deployment
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:4000'
  : 'https://evo-bypass-backend.onrender.com'; // Change this to your Render URL

// Export for use in other files
window.API_CONFIG = {
  API_URL: API_URL,
  ENDPOINTS: {
    BYPASS: `${API_URL}/api/bypass/bypass`,
    STATS: `${API_URL}/api/bypass/stats`,
    HEALTH: `${API_URL}/health`
  }
};

console.log('🔧 API Configuration loaded:', window.API_CONFIG);
