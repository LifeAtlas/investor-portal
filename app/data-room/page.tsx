"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DocStatus = "ready" | "draft" | "coming";

interface Document {
  name: string;
  description: string;
  status: DocStatus;
  tier: 1 | 2 | 3;
}

const documents: Document[] = [
  // Tier 1 — First Meeting
  { name: "PreSeed Deck (March 2026)", description: "26-slide investor pitch deck", status: "ready", tier: 1 },
  { name: "Executive Summary", description: "Autonomous Longevity OS — team, market, financials", status: "ready", tier: 1 },
  { name: "One-Pager", description: "Single-page investment thesis", status: "ready", tier: 1 },

  // Tier 2 — Follow-Up
  { name: "Investor Knowledge Base (50 Questions)", description: "Comprehensive Q&A covering all investor concerns", status: "ready", tier: 2 },
  { name: "Financial Overview", description: "Revenue projections, burn rate, use of funds", status: "ready", tier: 2 },
  { name: "Platform Deep Dive", description: "Autonomous Longevity OS anchored in biological digital twins — 5-layer architecture", status: "ready", tier: 2 },
  { name: "Competitive Landscape", description: "9 competitors across 8 dimensions", status: "ready", tier: 2 },
  { name: "Market Analysis", description: "TAM/SAM/SOM with bottom-up methodology", status: "ready", tier: 2 },
  { name: "Position Paper", description: "All Futures in One Place — Autonomous Longevity OS vision", status: "ready", tier: 2 },

  // Tier 3 — Due Diligence
  { name: "Cap Table Model", description: "Dynamic scenarios at EUR 8/10/12M pre-money", status: "ready", tier: 3 },
  { name: "Financial Model (Excel)", description: "6-sheet model: Revenue, Valuation, Cap Table, Burn", status: "ready", tier: 3 },
  { name: "Go-to-Market Plan", description: "Channels, segments, pricing, 18-month timeline", status: "ready", tier: 3 },
  { name: "Regulatory Strategy", description: "GDPR, EU MDR, HIPAA roadmap", status: "ready", tier: 3 },
  { name: "Team Bios & Org Chart", description: "Current team, advisors, post-raise org", status: "ready", tier: 3 },
  { name: "Partnership Pipeline", description: "12 verticals with honest status assessment", status: "ready", tier: 3 },
  { name: "Traction Report", description: "Milestones, roadmap Q1 2026 — Q2 2028", status: "ready", tier: 3 },
  { name: "Architecture Diagram", description: "Investor-friendly platform overview", status: "ready", tier: 3 },
  { name: "Competitor Matrix (Visual)", description: "Checkmark comparison vs 5 competitors", status: "ready", tier: 3 },
  { name: "Shareholders Agreement", description: "Corporate governance structure", status: "draft", tier: 3 },
  { name: "Founder Vesting Schedule", description: "4-year vest, 1-year cliff", status: "draft", tier: 3 },
  { name: "ESOP Pool", description: "10% employee option pool framework", status: "draft", tier: 3 },
  { name: "MNDA Template", description: "Mutual NDA for confidential discussions", status: "ready", tier: 3 },
  { name: "Product Demo Video", description: "3-5 minute platform walkthrough", status: "coming", tier: 3 },
];

const tierLabels: Record<number, string> = {
  1: "First Meeting",
  2: "Follow-Up Materials",
  3: "Due Diligence",
};

const statusConfig: Record<DocStatus, { label: string; color: string; bg: string }> = {
  ready: { label: "Available", color: "text-green-400", bg: "bg-green-950/30 border-green-800/30" },
  draft: { label: "Draft", color: "text-amber-400", bg: "bg-amber-950/30 border-amber-800/30" },
  coming: { label: "Coming Soon", color: "text-[var(--color-text-secondary)]", bg: "bg-[var(--color-surface)] border-[var(--color-border)]" },
};

export default function DataRoom() {
  const [authenticated, setAuthenticated] = useState(false);
  const [investorName, setInvestorName] = useState("");
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("investor_authenticated");
    const name = localStorage.getItem("investor_name");
    if (auth === "true" && name) {
      setAuthenticated(true);
      setInvestorName(name);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!authenticated) return null;

  const filteredDocs = selectedTier ? documents.filter((d) => d.tier === selectedTier) : documents;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">LA</div>
            <span className="font-semibold">Life Atlas Data Room</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--color-text-secondary)]">Welcome, {investorName}</span>
            <button
              onClick={() => { localStorage.clear(); router.push("/"); }}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Raising", value: "EUR 1.5-2.5M" },
            { label: "Instrument", value: "SAFE Note" },
            { label: "Platform", value: "Longevity OS" },
            { label: "Documents", value: `${documents.length}` },
          ].map((s) => (
            <div key={s.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">{s.label}</div>
              <div className="text-lg font-semibold">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Product Vision */}
        <div className="mb-10 bg-gradient-to-br from-blue-950/40 to-[var(--color-surface)] border border-blue-800/30 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Product Vision</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Life Atlas is the autonomous longevity operating system — edge-native, decentralized, with industrial AI agents
            orchestrating life across health, goals, and WHO quality of life domains. The M4 biological digital twin is the
            scientific anchor available at the premium tier.
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3">
              <div className="text-[var(--color-text-secondary)] mb-1">Freemium</div>
              <div className="font-medium">Core OS</div>
              <div className="text-xs text-[var(--color-text-secondary)]">Dashboard, basic AI agents, wearables</div>
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3">
              <div className="text-[var(--color-text-secondary)] mb-1">Premium</div>
              <div className="font-medium">EUR 250/mo</div>
              <div className="text-xs text-[var(--color-text-secondary)]">Full AI orchestration, LPI, 3D viz</div>
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3">
              <div className="text-[var(--color-text-secondary)] mb-1">Concierge</div>
              <div className="font-medium">EUR 3,600-6,000/yr</div>
              <div className="text-xs text-[var(--color-text-secondary)]">White-glove, dedicated agents</div>
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3">
              <div className="text-[var(--color-text-secondary)] mb-1">Top Tier</div>
              <div className="font-medium">M4 Digital Twin</div>
              <div className="text-xs text-[var(--color-text-secondary)]">Biological digital twin anchor</div>
            </div>
          </div>
        </div>

        {/* Tier Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedTier(null)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              selectedTier === null
                ? "bg-blue-600 text-white"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
            }`}
          >
            All Documents
          </button>
          {[1, 2, 3].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier === selectedTier ? null : tier)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                selectedTier === tier
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              Tier {tier}: {tierLabels[tier]}
            </button>
          ))}
        </div>

        {/* Document List */}
        {[1, 2, 3].map((tier) => {
          const tierDocs = filteredDocs.filter((d) => d.tier === tier);
          if (tierDocs.length === 0) return null;
          return (
            <div key={tier} className="mb-10">
              <h2 className="text-lg font-semibold mb-4 text-[var(--color-text-secondary)]">
                Tier {tier} — {tierLabels[tier]}
              </h2>
              <div className="space-y-2">
                {tierDocs.map((doc) => {
                  const status = statusConfig[doc.status];
                  return (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 hover:border-blue-600/30 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium mb-0.5">{doc.name}</div>
                        <div className="text-sm text-[var(--color-text-secondary)]">{doc.description}</div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <span className={`text-xs px-3 py-1 rounded-full border ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                        {doc.status === "ready" && (
                          <button className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer whitespace-nowrap">
                            Request
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Contact */}
        <div className="mt-16 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Questions?</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Schedule a call or reach out directly.
          </p>
          <a
            href="mailto:nicolas@lifeatlas.io?subject=Life Atlas Pre-Seed — Investor Inquiry"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Contact Nicolas Waern
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] mt-16 py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-sm text-[var(--color-text-secondary)]">
          <span>Life Atlas AB — Confidential</span>
          <span>All materials subject to NDA</span>
        </div>
      </footer>
    </main>
  );
}
