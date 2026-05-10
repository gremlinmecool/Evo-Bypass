import axios from 'axios';

interface BypassResult {
  success: boolean;
  key?: string;
  destination?: string;
  service: string;
  error?: string;
  processingTime: number;
}

export class BypassService {
  private static readonly TIMEOUT = 30000; // 30 seconds

  /**
   * Main bypass function - attempts to bypass any supported link
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

      // Detect service
      const service = this.detectService(url);

      // Try bypass based on service
      let result: BypassResult;

      switch (service) {
        case 'Linkvertise':
          result = await this.bypassLinkvertise(url);
          break;
        case 'Work.ink':
          result = await this.bypassWorkink(url);
          break;
        case 'Lootlabs':
          result = await this.bypassLootlabs(url);
          break;
        default:
          result = await this.universalBypass(url);
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
   * Linkvertise bypass implementation
   */
  private static async bypassLinkvertise(url: string): Promise<BypassResult> {
    try {
      // Use public bypass API
      const response = await axios.post('https://api.bypass.vip/bypass', {
        url: url
      }, {
        timeout: this.TIMEOUT,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.destination) {
        return {
          success: true,
          destination: response.data.destination,
          service: 'Linkvertise',
          processingTime: 0
        };
      }

      throw new Error('No destination found');
    } catch (error) {
      // Fallback to alternative method
      return this.universalBypass(url);
    }
  }

  /**
   * Work.ink bypass implementation
   */
  private static async bypassWorkink(url: string): Promise<BypassResult> {
    try {
      const response = await axios.get(url, {
        timeout: this.TIMEOUT,
        maxRedirects: 0,
        validateStatus: () => true
      });

      // Extract destination from response
      const destination = this.extractDestination(response.data);

      if (destination) {
        return {
          success: true,
          destination: destination,
          service: 'Work.ink',
          processingTime: 0
        };
      }

      throw new Error('Could not extract destination');
    } catch (error) {
      return this.universalBypass(url);
    }
  }

  /**
   * Lootlabs bypass implementation
   */
  private static async bypassLootlabs(url: string): Promise<BypassResult> {
    try {
      // Extract ID from URL
      const id = this.extractLootlabsId(url);
      
      if (!id) {
        throw new Error('Invalid Lootlabs URL');
      }

      // Use Lootlabs API
      const response = await axios.get(`https://api.lootlabs.gg/api/get-link/${id}`, {
        timeout: this.TIMEOUT
      });

      if (response.data && response.data.url) {
        return {
          success: true,
          destination: response.data.url,
          service: 'Lootlabs',
          processingTime: 0
        };
      }

      throw new Error('No destination found');
    } catch (error) {
      return this.universalBypass(url);
    }
  }

  /**
   * Universal bypass - works with most services
   */
  private static async universalBypass(url: string): Promise<BypassResult> {
    try {
      // Try multiple bypass APIs
      const apis = [
        'https://api.bypass.vip/bypass',
        'https://bypass.pm/bypass',
        'https://api-bypass.vercel.app/bypass'
      ];

      for (const api of apis) {
        try {
          const response = await axios.post(api, { url }, {
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
          });

          if (response.data && (response.data.destination || response.data.result)) {
            return {
              success: true,
              destination: response.data.destination || response.data.result,
              service: 'Universal',
              processingTime: 0
            };
          }
        } catch {
          continue;
        }
      }

      // If all APIs fail, try direct extraction
      const destination = await this.directExtraction(url);
      
      if (destination) {
        return {
          success: true,
          destination: destination,
          service: 'Universal',
          processingTime: 0
        };
      }

      throw new Error('All bypass methods failed');
    } catch (error) {
      return {
        success: false,
        service: 'Universal',
        error: 'Unable to bypass this link',
        processingTime: 0
      };
    }
  }

  /**
   * Direct extraction from HTML
   */
  private static async directExtraction(url: string): Promise<string | null> {
    try {
      const response = await axios.get(url, {
        timeout: this.TIMEOUT,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const html = response.data;

      // Try to find destination in HTML
      const patterns = [
        /destination["\s:]+["']([^"']+)["']/i,
        /target["\s:]+["']([^"']+)["']/i,
        /redirect["\s:]+["']([^"']+)["']/i,
        /url["\s:]+["']([^"']+)["']/i,
        /href=["']([^"']+)["']/i
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
   * Detect service from URL
   */
  private static detectService(url: string): string {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('linkvertise')) return 'Linkvertise';
    if (urlLower.includes('work.ink')) return 'Work.ink';
    if (urlLower.includes('lootlabs') || urlLower.includes('loot-labs')) return 'Lootlabs';
    if (urlLower.includes('admaven')) return 'Admaven';
    if (urlLower.includes('lockr.so')) return 'Lockr.so';
    if (urlLower.includes('shortfly') || urlLower.includes('shrtfly')) return 'Shrtfly';
    if (urlLower.includes('sub2unlock')) return 'Sub2Unlock';
    if (urlLower.includes('rekonise')) return 'Rekonise';
    if (urlLower.includes('boost.ink')) return 'Boost.ink';
    if (urlLower.includes('mboost')) return 'mBoost';
    if (urlLower.includes('platoboost')) return 'Platoboost';
    
    return 'Universal';
  }

  /**
   * Validate URL
   */
  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Extract destination from HTML
   */
  private static extractDestination(html: string): string | null {
    const patterns = [
      /destination["\s:]+["']([^"']+)["']/i,
      /target["\s:]+["']([^"']+)["']/i,
      /redirect["\s:]+["']([^"']+)["']/i
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Extract Lootlabs ID from URL
   */
  private static extractLootlabsId(url: string): string | null {
    const match = url.match(/lootlabs\.gg\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }
}
