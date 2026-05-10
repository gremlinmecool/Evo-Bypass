"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { supportedGroups } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export function SupportedBrowser() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredGroups = supportedGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (!normalizedQuery) {
          return true;
        }

        return (
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.domains.some((domain) => domain.toLowerCase().includes(normalizedQuery))
        );
      })
    }))
    .filter((group) => group.items.length > 0);

  const serviceCount = supportedGroups.reduce((total, group) => total + group.items.length, 0);
  const domainCount = supportedGroups.reduce(
    (total, group) => total + group.items.reduce((sum, item) => sum + item.domains.length, 0),
    0
  );

  return (
    <div className="mx-auto w-[min(1180px,calc(100%-24px))] py-16 md:py-20">
      <GlassCard className="rounded-[32px] p-5 md:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--text-muted)]">Zen Bypass</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-5xl">
          Supported Services
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-[color:var(--text-muted)] md:text-base">
          Explore every supported service and inspect its domain coverage. Search by service name or domain, then click any item for the full list.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-[color:var(--text-muted)]">
          <span className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--card-solid)] px-4 py-2">
            Categories: {supportedGroups.length}
          </span>
          <span className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--card-solid)] px-4 py-2">
            Services: {serviceCount}
          </span>
          <span className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--card-solid)] px-4 py-2">
            Domains: {domainCount}
          </span>
          <span className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--card-solid)] px-4 py-2">
            Updated: 5/10/2026, 5:54:59 PM
          </span>
        </div>

        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="h-14 w-full rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--card-solid)] pl-12 pr-5 text-sm outline-none"
            placeholder="Search service or domain..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <p className="mt-4 text-sm text-[color:var(--text-muted)]">
          {normalizedQuery
            ? `Showing ${filteredGroups.reduce((sum, group) => sum + group.items.length, 0)} matching services.`
            : "Showing all supported services."}
        </p>

        <div className="mt-8 space-y-10">
          {filteredGroups.map((group) => (
            <section key={group.name}>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">{group.name}</h2>
                <span className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--card-solid)] px-3 py-1 text-xs text-[color:var(--text-muted)]">
                  {group.items.length}
                </span>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-[22px] border border-[color:var(--border-color)] bg-[color:var(--card-solid)] p-5 shadow-[0_12px_35px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{item.name}</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.domains.map((domain) => (
                            <span
                              key={domain}
                              className="rounded-full border border-[color:var(--border-color)] bg-[#f8fafc] px-3 py-1 text-xs text-[color:var(--text-muted)] dark:bg-white/5"
                            >
                              {domain}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-lg text-slate-400">{">"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </GlassCard>

      <div className="mt-6 rounded-[24px] border border-[#a7f3d0] bg-[#ecfdf5] px-6 py-6 text-sm dark:bg-[rgba(16,185,129,0.08)]">
        <h3 className="text-xl font-semibold text-[#14532d] dark:text-[#a7f3d0]">Need another link supported?</h3>
        <p className="mt-3 text-[#166534] dark:text-[#bbf7d0]">
          Want a specific link or provider added to the list? Send us a request and we will review it.
        </p>
        <a
          className="mt-3 inline-block font-medium text-[#166534] underline-offset-4 hover:underline dark:text-[#bbf7d0]"
          href={siteConfig.supportServerUrl}
          target="_blank"
          rel="noreferrer"
        >
          Join us on Discord
        </a>
      </div>
    </div>
  );
}
