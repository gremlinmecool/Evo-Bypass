'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 23387799 });

  useEffect(() => {
    // Fetch stats
    fetch('http://localhost:3000/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(err => console.error('Stats error:', err));
  }, []);

  const handleBypass = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:3000/api/bypass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
        setStats(prev => ({ ...prev, total: prev.total + 1 }));
      } else {
        setError(data.error || 'Bypass failed');
      }
    } catch (err) {
      setError('Network error. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            EVO BYPASS
          </h1>
          <p className="text-xl md:text-2xl text-gray mb-4">
            Bypass 30+ Link Services Instantly
          </p>
          <p className="text-gray-dark mb-8">
            Free • Fast • No Surveys • No Downloads
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.total.toLocaleString()}</div>
              <div className="text-sm text-gray">Links Bypassed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">30+</div>
              <div className="text-sm text-gray">Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm text-gray">Uptime</div>
            </div>
          </div>

          {/* Bypass Form */}
          <form onSubmit={handleBypass} className="max-w-2xl mx-auto">
            <div className="card-bw rounded-2xl p-8">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://linkvertise.com/123456/example"
                className="w-full bg-black border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-dark focus:outline-none focus:border-white/40 transition-all mb-4"
                disabled={loading}
              />

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {result && result.success && (
                <div className="bg-white/5 border border-white/20 rounded-xl p-4 mb-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray">Bypassed URL:</span>
                    <span className="text-xs text-gray-dark">{result.service}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={result.destination}
                      readOnly
                      className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(result.destination)}
                      className="btn-secondary px-4 py-2 rounded-lg text-sm"
                    >
                      Copy
                    </button>
                    <a
                      href={result.destination}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary px-4 py-2 rounded-lg text-sm"
                    >
                      Open
                    </a>
                  </div>
                  <div className="mt-2 text-xs text-gray-dark">
                    Processed in {result.processingTime}ms
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !url}
                className="btn-primary w-full py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Bypass Link'
                )}
              </button>
            </div>
          </form>

          {/* Popular Services */}
          <div className="mt-12">
            <p className="text-sm text-gray mb-4">SUPPORTED SERVICES</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Linkvertise', 'Lootlabs', 'Work.ink', 'Rekonise', 'Platoboost', 'Admaven', 'Lockr.so', 'Shrtfly'].map((service) => (
                <span key={service} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                  {service}
                </span>
              ))}
              <Link href="/supported" className="px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-light transition-colors">
                +22 More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose EVO Bypass?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-bw rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray">
                Bypass links in seconds with our optimized infrastructure
              </p>
            </div>

            <div className="card-bw rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">100% Secure</h3>
              <p className="text-gray">
                Your privacy matters. We don't store or track your links
              </p>
            </div>

            <div className="card-bw rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Always Free</h3>
              <p className="text-gray">
                No hidden fees, no premium tiers. Free forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            More Tools
          </h2>
          <p className="text-gray mb-12">
            Explore our collection of free online tools
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/tools/green-screen" className="card-bw rounded-2xl p-8 text-left hover:scale-105 transition-transform">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Green Screen Remover</h3>
                  <p className="text-gray">Remove green backgrounds from images instantly</p>
                </div>
              </div>
            </Link>

            <Link href="/tools" className="card-bw rounded-2xl p-8 text-left hover:scale-105 transition-transform">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">All Tools</h3>
                  <p className="text-gray">Explore all our free online tools</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
