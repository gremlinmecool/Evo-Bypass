import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

interface BypassResult {
  success: boolean;
  destination?: string;
  service: string;
  error?: string;
  processingTime: number;
  method?: string;
  cached?: boolean;
}

interface CacheEntry {
  destination: string;
  timestamp: number;
  service: string;
}

/**
 * Advanced Bypass Service with caching, multiple APIs, and fallbacks
 */
export class AdvancedBypassService {
  private static cache = new Map<string, CacheEntry>();
  private static readonly CACHE_TTL = 3600000; // 1 hour
  private static readonly TIMEOUT = 30000;
  private static readonly MAX_RETRIES = 3;

  private static axiosInstance: AxiosInstance = axios.create({
    timeout: this.TIMEOUT,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    }
  });

  /**
   * Main bypass function with caching and multiple strategies
   */
  static async bypass(url: string): Promise<BypassResult> {
    const startTime = Date.now();

    try {
      // Validate URL
      if (!url || !this.isValidUrl(url)) {
        return {
          success: false,
          service: 'Unknown',
          error: 'Invalid URL provided',
          processingTime: Date.now() - startTime
        };
      }

      // Check cache first
      const cached = this.getFromCache(url);
      if (cached) {
        return {
          success: true,
          destination: cached.destination,
          service: cached.service,
          processingTime: Date.now() - startTime,
          cached: true,
          method: 'Cache'
        };
      }

      // Detect service
      const service = this.detectService(url);

      // Try bypass with retries
      let result: BypassResult | null = null;
      let lastError: string = '';

      for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
        try {
          result = await this.attemptBypass(url, service);
          if (result.success) {
            break;
          }
          lastError = result.error || 'Unknown error';
        } catch (error) {
          lastError = error instanceof Error ? error.message : 'Unknown error';
          if (attempt === this.MAX_RETRIES) {
            throw error;
          }
          // Wait before retry
          await this.sleep(1000 * attempt);
        }
      }

      if (!result || !result.success) {
        return {
          success: false,
          service,
          error: lastError || 'All bypass attempts failed',
          processingTime: Date.now() - startTime
        };
      }

      // Cache successful result
      if (result.destination) {
        this.addToCache(url, result.destination, service);
      }

      result.processingTime = Date.now() - startTime;
      result.service = service;

      return result;

    } catch (error) {
      return {
        success: false,
        service: 'Unknown',
        error: error instanceof Error ? error.message : 'Bypass failed',
        processingTime: Date.now() - startTime
      };
    }
  }

  /**
   * Attempt bypass using multiple methods
   */
  private static async attemptBypass(url: string, service: string): Promise<BypassResult> {
    // Try service-specific methods first
    switch (service) {
      case 'Linkvertise':
        return await this.bypassLinkvertise(url);
      case 'Work.ink':
        return await this.bypassWorkink(url);
      case 'Lootlabs':
        return await this.bypassLootlabs(url);
      case 'Rekonise':
        return await this.bypassRekonise(url);
      case 'Platoboost':
        return await this.bypassPlatoboost(url);
      default:
        return await this.universalBypass(url);
    }
  }

  /**
   * Linkvertise bypass with multiple methods
   */
  private static async bypassLinkvertise(url: string): Promise<BypassResult> {
    // Method 1: Bypass.vip API
    try {
      const response = await this.axiosInstance.post('https://api.bypass.vip/bypass', {
        url: url
      });

      if (response.data?.destination) {
        return {
          success: true,
          destination: response.data.destination,
          service: 'Linkvertise',
          processingTime: 0,
          method: 'Bypass.vip API'
        };
      }
    } catch (error) {
      console.log('Bypass.vip failed, trying alternative...');
    }

    // Method 2: Direct extraction
    try {
      const response = await this.axiosInstance.get(url);
      const $ = cheerio.load(response.data);
      
      // Look for destination in scripts
      const scripts = $('script').toArray();
      for (const script of scripts) {
        const content = $(script).html() || '';
        const match = content.match(/destination["\s:]+["']([^"']+)["']/i);
        if (match && match[1]) {
          return {
            success: true,
            destination: match[1],
            service: 'Linkvertise',
            processingTime: 0,
            method: 'Direct extraction'
          };
        }
      }
    } catch (error) {
      console.log('Direct extraction failed');
    }

    // Method 3: Universal fallback
    return await this.universalBypass(url);
  }

  /**
   * Work.ink bypass
   */
  private static async bypassWorkink(url: string): Promise<BypassResult> {
    try {
      const response = await this.axiosInstance.get(url, {
        maxRedirects: 0,
        validateStatus: () => true
      });

      // Check for redirect
      if (response.headers.location) {
        return {
          success: true,
          destination: response.headers.location,
          service: 'Work.ink',
          processingTime: 0,
          method: 'Redirect follow'
        };
      }

      // Parse HTML
      const $ = cheerio.load(response.data);
      const destination = $('a[href]').first().attr('href');

      if (destination && this.isValidUrl(destination)) {
        return {
          success: true,
          destination: destination,
          service: 'Work.ink',
          processingTime: 0,
          method: 'HTML parsing'
        };
      }
    } catch (error) {
      console.log('Work.ink bypass failed');
    }

    return await this.universalBypass(url);
  }

  /**
   * Lootlabs bypass
   */
  private static async bypassLootlabs(url: string): Promise<BypassResult> {
    try {
      // Extract ID
      const match = url.match(/lootlabs\.gg\/([a-zA-Z0-9]+)/);
      if (!match) {
        throw new Error('Invalid Lootlabs URL');
      }

      const id = match[1];

      // Try API
      const response = await this.axiosInstance.get(`https://api.lootlabs.gg/api/get-link/${id}`);

      if (response.data?.url) {
        return {
          success: true,
          destination: response.data.url,
          service: 'Lootlabs',
          processingTime: 0,
          method: 'Lootlabs API'
        };
      }
    } catch (error) {
      console.log('Lootlabs API failed');
    }

    return await this.universalBypass(url);
  }

  /**
   * Rekonise bypass
   */
  private static async bypassRekonise(url: string): Promise<BypassResult> {
    try {
      const response = await this.axiosInstance.get(url);
      const $ = cheerio.load(response.data);

      // Look for destination
      const destination = $('input[name="destination"]').val() as string;

      if (destination && this.isValidUrl(destination)) {
        return {
          success: true,
          destination: destination,
          service: 'Rekonise',
          processingTime: 0,
          method: 'Form extraction'
        };
      }
    } catch (error) {
      console.log('Rekonise bypass failed');
    }

    return await this.universalBypass(url);
  }

  /**
   * Platoboost bypass
   */
  private static async bypassPlatoboost(url: string): Promise<BypassResult> {
    try {
      const response = await this.axiosInstance.get(url);
      const $ = cheerio.load(response.data);

      // Extract from meta tags
      const destination = $('meta[property="og:url"]').attr('content');

      if (destination && this.isValidUrl(destination)) {
        return {
          success: true,
          destination: destination,
          service: 'Platoboost',
          processingTime: 0,
          method: 'Meta tag extraction'
        };
      }
    } catch (error) {
      console.log('Platoboost bypass failed');
    }

    return await this.universalBypass(url);
  }

  /**
   * Universal bypass with multiple APIs
   */
  private static async universalBypass(url: string): Promise<BypassResult> {
    const apis = [
      { url: 'https://api.bypass.vip/bypass', key: 'destination' },
      { url: 'https://bypass.pm/bypass', key: 'result' },
      { url: 'https://api-bypass.vercel.app/bypass', key: 'destination' }
    ];

    for (const api of apis) {
      try {
        const response = await this.axiosInstance.post(api.url, { url }, {
          timeout: 10000
        });

        const destination = response.data?.[api.key];
        if (destination && this.isValidUrl(destination)) {
          return {
            success: true,
            destination: destination,
            service: 'Universal',
            processingTime: 0,
            method: `API: ${api.url}`
          };
        }
      } catch (error) {
        continue;
      }
    }

    // Last resort: direct extraction
    try {
      const destination = await this.directExtraction(url);
      if (destination) {
        return {
          success: true,
          destination: destination,
          service: 'Universal',
          processingTime: 0,
          method: 'Direct extraction'
        };
      }
    } catch (error) {
      console.log('Direct extraction failed');
    }

    return {
      success: false,
      service: 'Universal',
      error: 'All bypass methods failed',
      processingTime: 0
    };
  }

  /**
   * Direct extraction from HTML
   */
  private static async directExtraction(url: string): Promise<string | null> {
    try {
      const response = await this.axiosInstance.get(url);
      const $ = cheerio.load(response.data);

      // Try multiple selectors
      const selectors = [
        'input[name="destination"]',
        'input[name="target"]',
        'input[name="redirect"]',
        'a[data-destination]',
        'a[data-target]'
      ];

      for (const selector of selectors) {
        const value = $(selector).val() || $(selector).attr('data-destination') || $(selector).attr('data-target');
        if (value && this.isValidUrl(value as string)) {
          return value as string;
        }
      }

      // Try regex patterns
      const html = response.data;
      const patterns = [
        /destination["\s:]+["']([^"']+)["']/i,
        /target["\s:]+["']([^"']+)["']/i,
        /redirect["\s:]+["']([^"']+)["']/i,
        /window\.location\s*=\s*["']([^"']+)["']/i
      ];

      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match && match[1] && this.isValidUrl(match[1])) {
          return match[1];
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Cache management
   */
  private static getFromCache(url: string): CacheEntry | null {
    const entry = this.cache.get(url);
    if (!entry) return null;

    // Check if expired
    if (Date.now() - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(url);
      return null;
    }

    return entry;
  }

  private static addToCache(url: string, destination: string, service: string): void {
    this.cache.set(url, {
      destination,
      timestamp: Date.now(),
      service
    });

    // Clean old entries
    if (this.cache.size > 1000) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      for (let i = 0; i < 100; i++) {
        this.cache.delete(entries[i][0]);
      }
    }
  }

  /**
   * Detect service from URL
   */
  private static detectService(url: string): string {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('linkvertise')) return 'Linkvertise';
    if (urlLower.includes('work.ink')) return 'Work.ink';
    if (urlLower.includes('lootlabs') || urlLower.includes('loot-labs')) return 'Lootlabs';
    if (urlLower.includes('rekonise')) return 'Rekonise';
    if (urlLower.includes('platoboost')) return 'Platoboost';
    if (urlLower.includes('admaven')) return 'Admaven';
    if (urlLower.includes('lockr.so')) return 'Lockr.so';
    if (urlLower.includes('shortfly') || urlLower.includes('shrtfly')) return 'Shrtfly';
    if (urlLower.includes('sub2unlock')) return 'Sub2Unlock';
    if (urlLower.includes('boost.ink')) return 'Boost.ink';
    if (urlLower.includes('mboost')) return 'mBoost';
    
    return 'Universal';
  }

  /**
   * Validate URL
   */
  private static isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * Sleep utility
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clear cache
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache stats
   */
  static getCacheStats(): { size: number; entries: number } {
    return {
      size: this.cache.size,
      entries: this.cache.size
    };
  }
}
