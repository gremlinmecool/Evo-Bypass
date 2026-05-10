import { Router } from 'express';
import { UltimateBypassService } from '../services/bypass-ultimate';
import rateLimit from 'express-rate-limit';

export const bypassRouter = Router();

// Rate limiting - 30 requests per minute
const bypassLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { success: false, error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * POST /api/bypass/bypass
 * Bypass a link and return the destination - SUPPORTS 50+ SERVICES
 */
bypassRouter.post('/bypass', bypassLimiter, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Perform bypass with ULTIMATE service
    const result = await UltimateBypassService.bypass(url);

    return res.json(result);

  } catch (error) {
    console.error('Bypass error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/bypass/test
 * Test endpoint
 */
bypassRouter.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'ULTIMATE Bypass API v3.0 is working',
    features: [
      'Caching (1 hour TTL)',
      'Multiple bypass methods',
      'Auto-retry (3 attempts)',
      'Rate limiting (30/min)',
      '50+ services supported',
      'Rekonise support',
      'Executor key systems',
      'Universal fallback'
    ],
    supportedServices: [
      'Linkvertise', 'Work.ink', 'Lootlabs', 'Rekonise', 'Platoboost',
      'Sub2Unlock', 'Boost.ink', 'Lockr.so', 'Shrtfly', 'Admaven',
      'mBoost', 'SocialWolvez', 'LetsBoost', 'Sub2Get', 'Rinku.pro',
      'Codex', 'KeyRBLX', 'Flux.li', 'Delta', 'Trigon', 'Fluxus',
      'Arceus', 'Hydrogen', 'VegaX', 'Evon', 'Gateway', 'KeySystem',
      'GetKey', 'PandaDev', 'RelzHub', 'HohoHub', 'Mobile Codex',
      '+ 20 more services'
    ]
  });
});

/**
 * GET /api/bypass/stats
 * Get cache statistics
 */
bypassRouter.get('/stats', (req, res) => {
  const stats = UltimateBypassService.getCacheStats();
  res.json({
    success: true,
    cache: stats
  });
});

/**
 * POST /api/bypass/clear-cache
 * Clear bypass cache (admin only)
 */
bypassRouter.post('/clear-cache', (req, res) => {
  UltimateBypassService.clearCache();
  res.json({
    success: true,
    message: 'Cache cleared successfully'
  });
});
