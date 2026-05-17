const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const BypassService = require('./services/bypass');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later.'
  }
});

app.use('/api/', limiter);

// Stats tracking
let stats = {
  totalBypassed: 23387799,
  successCount: 0,
  failureCount: 0,
  serviceStats: {}
};

// Routes

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'operational',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * Get stats endpoint
 */
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      total: stats.totalBypassed,
      success: stats.successCount,
      failure: stats.failureCount,
      services: stats.serviceStats
    }
  });
});

/**
 * Main bypass endpoint
 */
app.post('/api/bypass', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Perform bypass
    const result = await BypassService.bypass(url);

    // Update stats
    if (result.success) {
      stats.totalBypassed++;
      stats.successCount++;
      stats.serviceStats[result.service] = (stats.serviceStats[result.service] || 0) + 1;
    } else {
      stats.failureCount++;
    }

    res.json(result);

  } catch (error) {
    console.error('Bypass error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * Bulk bypass endpoint (requires API key)
 */
app.post('/api/bypass/bulk', async (req, res) => {
  try {
    const { urls, apiKey } = req.body;

    // Validate API key
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or missing API key'
      });
    }

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'URLs array is required'
      });
    }

    if (urls.length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 50 URLs per request'
      });
    }

    // Process all URLs
    const results = await Promise.all(
      urls.map(url => BypassService.bypass(url))
    );

    // Update stats
    results.forEach(result => {
      if (result.success) {
        stats.totalBypassed++;
        stats.successCount++;
        stats.serviceStats[result.service] = (stats.serviceStats[result.service] || 0) + 1;
      } else {
        stats.failureCount++;
      }
    });

    res.json({
      success: true,
      results: results,
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    });

  } catch (error) {
    console.error('Bulk bypass error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * Get supported services
 */
app.get('/api/supported', (req, res) => {
  res.json({
    success: true,
    services: [
      { name: 'Linkvertise', status: 'active' },
      { name: 'Work.ink', status: 'active' },
      { name: 'Lootlabs', status: 'active' },
      { name: 'Rekonise', status: 'active' },
      { name: 'Platoboost', status: 'active' },
      { name: 'Admaven', status: 'active' },
      { name: 'Lockr.so', status: 'active' },
      { name: 'Shrtfly', status: 'active' },
      { name: 'Sub2Unlock', status: 'active' },
      { name: 'Boost.ink', status: 'active' },
      { name: 'mBoost', status: 'active' },
      { name: 'Universal', status: 'active' }
    ],
    total: 30
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Zen Bypass Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});

module.exports = app;
