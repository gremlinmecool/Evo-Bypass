'use client';

import Link from 'next/link';

export default function ToolsPage() {
  const tools = [
    {
      name: 'Link Bypasser',
      description: 'Bypass Linkvertise, Lootlabs, Work.ink and 30+ more services instantly',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-2 2"></path>
          <path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l2-2"></path>
        </svg>
      ),
      href: '/',
      available: true
    },
    {
      name: 'Green Screen Remover',
      description: 'Remove green screen backgrounds from images instantly',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      ),
      href: '/tools/green-screen',
      available: true
    },
    {
      name: 'Image Compressor',
      description: 'Compress images without losing quality',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 16 12 12 8 16"></polyline>
          <line x1="12" y1="12" x2="12" y2="21"></line>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
        </svg>
      ),
      href: '/tools/image-compressor',
      available: false
    },
    {
      name: 'QR Code Generator',
      description: 'Create custom QR codes for any URL or text',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
      href: '/tools/qr-generator',
      available: false
    },
    {
      name: 'URL Shortener',
      description: 'Create short, memorable links',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      ),
      href: '/tools/url-shortener',
      available: false
    },
    {
      name: 'More Tools',
      description: 'More amazing tools coming soon...',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      href: '#',
      available: false
    }
  ];

  return (
    <div className="mx-auto w-full max-w-6xl animate-fadeIn space-y-16 px-4 py-12 md:space-y-24">
      {/* Header */}
      <section className="text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zen-text-faint">
          Tools
        </p>
        <h1 className="text-4xl font-bold text-zen-text md:text-5xl">
          Free Online Tools
        </h1>
        <p className="mt-4 text-lg text-zen-text-muted">
          Professional tools for creators, developers, and everyone
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          tool.available ? (
            <Link
              key={index}
              href={tool.href}
              className="group relative overflow-hidden rounded-2xl border border-zen-border bg-zen-surface-1/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-zen-accent/40 hover:shadow-zen-glow"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-zen-accent/30 to-transparent"></div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zen-accent/25 bg-zen-accent-soft text-zen-accent transition-transform duration-500 group-hover:scale-110">
                {tool.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zen-text">{tool.name}</h3>
              <p className="text-sm text-zen-text-muted">{tool.description}</p>
            </Link>
          ) : (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-zen-border bg-zen-surface-1/40 p-6 backdrop-blur-sm opacity-60"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-zen-accent/30 to-transparent"></div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zen-border bg-zen-surface-2/60 text-zen-text-muted">
                {tool.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zen-text">{tool.name}</h3>
              <p className="text-sm text-zen-text-muted">{tool.description}</p>
              <span className="mt-3 inline-block rounded-full bg-zen-surface-2/60 px-3 py-1 text-xs font-semibold text-zen-text-faint">
                Coming Soon
              </span>
            </div>
          )
        ))}
      </section>
    </div>
  );
}
