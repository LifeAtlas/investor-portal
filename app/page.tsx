"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const stats = [
  { label: "Founded", value: "2024" },
  { label: "Stage", value: "Pre-Seed" },
  { label: "HQ", value: "Gothenburg, SE" },
  { label: "Raising", value: "EUR 1.5-2.5M" },
  { label: "Architecture", value: "Edge-Native" },
  { label: "Framework", value: "WHO QoL" },
];

const partners = [
  { name: "Prof. Gunnar Cedersund", role: "M4 Mechanistic Biology — Linköping University / AstraZeneca" },
  { name: "Pieter van Schalkwyk", role: "Founder & CEO, XMPro — Digital Twin Platform" },
  { name: "Marc Horner", role: "CEO, CytoTheryx — In Silico Clinical Trials" },
  { name: "Dr. Eric Stahlberg", role: "Director of Biomedical Informatics, Frederick National Lab / NCI" },
  { name: "Dan Maccreary", role: "Ex-Optum VP Engineering — Healthcare Data at Scale" },
  { name: "Dan Isaacs", role: "Digital Twin Standards & Interoperability" },
];

const lifeDomains = [
  { name: "Health & Longevity", desc: "Biological digital twins, precision medicine, longevity optimization", icon: "🧬" },
  { name: "Performance & Fitness", desc: "Athletes, biohackers, wearable-driven coaching (CO-AX)", icon: "🏃" },
  { name: "Equine", desc: "Arabian horse digital twins — Mulawa Stud partnership", icon: "🐎" },
  { name: "Chronic Disease", desc: "M4 mechanistic models for diabetes, oncology, metabolic disorders", icon: "💊" },
  { name: "Career & Goals", desc: "AI agents that orchestrate professional development and life goals", icon: "🎯" },
  { name: "Sovereign Health", desc: "Indigenous and community-owned health data sovereignty", icon: "🌍" },
];

const platformLayers = [
  { name: "Edge-Native Data Fabric", desc: "Decentralized, user-owned data — no cloud lock-in. Your data lives on your devices and encrypted edge nodes." },
  { name: "Industrial AI Agents (LLMs to LQMs)", desc: "Autonomous agents that don't just chat — they act. Life Quantified Models trained on your continuous data streams." },
  { name: "WHO Quality of Life Framework", desc: "Not just health metrics. Physical, psychological, social, and environmental wellbeing — the full picture of a life." },
  { name: "Wearable & Data Integrations", desc: "Continuous streams from wearables, medical records, financial data, calendars — every signal that defines your life." },
  { name: "3D Spatial Visualization", desc: "3D Earth showing your world. 3D body model showing your biology. All your information, spatially anchored." },
  { name: "Marketplace & Matchmaking", desc: "Connecting users with the right providers, products, and interventions — personalized discovery, not generic directories." },
  { name: "M4 Biological Twin Anchor", desc: "The crown jewel. Mechanistic simulation of your biology — predicting responses to interventions before you try them. Top tier." },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");

    // Store access locally
    const entry = { name, email, firm, date: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("investor_access_log") || "[]");
    existing.push(entry);
    localStorage.setItem("investor_access_log", JSON.stringify(existing));
    localStorage.setItem("investor_authenticated", "true");
    localStorage.setItem("investor_name", name);

    setSubmitted(true);
    setTimeout(() => router.push("/data-room"), 1500);
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg">LA</div>
            <span className="text-[var(--color-text-secondary)] text-sm tracking-widest uppercase">Investor Portal</span>
          </div>

          {/* [VISION UPDATE 2026-03-27: Life care, final platform, transaction revenue] */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            The Final Platform.<br />
            <span className="text-blue-400">The Autonomous Life Operating System.</span>
          </h1>

          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mb-4 leading-relaxed">
            Last mover advantage. Every silo app built the pieces — Life Atlas assembles them into the OS.
          </p>

          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-8 leading-relaxed">
            Life Atlas is the last platform anyone needs — an edge-native, decentralized OS with
            industrial AI agents that orchestrate life care across health, goals, relationships,
            career, and every domain. Not healthcare. Life care. Your data. Your devices. Your life,
            quantified, optimized, and accelerated.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {stats.map((s) => (
              <div key={s.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
                <div className="text-sm text-[var(--color-text-secondary)] mb-1">{s.label}</div>
                <div className="text-lg font-semibold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem — [VISION UPDATE 2026-03-27: Life care, final platform, transaction revenue] */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">The Problem</h2>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-4">
          Your LIFE is fragmented — not just your health. Medical records across 50+ providers.
          Fitness data locked in wearable silos. Financial information in disconnected apps. Goals in
          notebooks. Relationships in scattered contacts. Career milestones nowhere. Every domain of
          your life lives in a different silo, managed by a different app, with zero integration.
        </p>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
          Healthcare spending has tripled since 2000, yet we are sicker than ever. But the problem is
          bigger than healthcare — it is life fragmentation. The WHO defines quality of life across
          physical, psychological, social, and environmental domains — yet no platform addresses life
          holistically. Hundreds of silo apps each optimize one piece. No system orchestrates the whole.
          The result: reactive care, fragmented self-knowledge, and zero predictive power over your own
          life. The pieces exist. The operating system that assembles them does not. Until now.
        </p>
      </section>

      {/* The Solution */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">The Solution</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Orchestrate",
              desc: "Industrial AI agents that autonomously optimize your life across health, goals, relationships, and career. Not chatbots — autonomous agents that act on your behalf, powered by Life Quantified Models (LQMs) trained on your continuous data streams.",
            },
            {
              title: "Visualize",
              desc: "A 3D Earth showing your world and a 3D body model showing your biology. All your information — health, finance, relationships, goals — spatially anchored in one place. The Life Performance Index (LPI) gives you a single, edge-native score for how your life is tracking.",
            },
            {
              title: "Anchor",
              desc: "M4 biological digital twins as the scientific foundation. Mechanistic biology models (not statistical black boxes) simulate your body's response to interventions before you try them. The crown jewel of the platform, available at the premium tier.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">{item.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">Platform Architecture</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl">
          Seven layers — from decentralized infrastructure to the biological twin anchor.
          Each layer delivers standalone value; together they create the autonomous life OS — the final platform.
        </p>
        <div className="space-y-3">
          {platformLayers.map((layer, i) => (
            <div key={layer.name} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex gap-4 items-start hover:border-blue-600/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{layer.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{layer.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue Model — [VISION UPDATE 2026-03-27: Life care, final platform, transaction revenue] */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">Revenue Model</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl">
          Four revenue streams. The final platform takes a cut of every decision it accelerates.
        </p>

        {/* Subscription Tiers */}
        <h3 className="text-xl font-semibold mb-4 text-blue-400">Subscription Tiers</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              tier: "Freemium",
              price: "Free",
              desc: "Life Atlas core OS — life dashboard, basic AI agents, wearable integration, LPI lite. The acquisition engine.",
            },
            {
              tier: "Premium",
              price: "EUR 250/mo",
              desc: "Advanced AI orchestration, full LPI, marketplace access, matchmaking, 3D visualizations, WHO QoL tracking across all life domains.",
            },
            {
              tier: "Concierge + M4 Twin",
              price: "EUR 3,600-6,000/yr",
              desc: "White-glove service, dedicated AI agents, longevity planning, and the crown jewel: M4 biological digital twin anchor — mechanistic simulation of your actual biology.",
            },
          ].map((t) => (
            <div key={t.tier} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">{t.tier}</div>
              <div className="text-2xl font-bold text-blue-400 mb-3">{t.price}</div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Platform Revenue Streams */}
        <h3 className="text-xl font-semibold mb-4 text-blue-400">Platform Revenue Streams</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              stream: "Transaction Fees",
              metric: "5-10% take rate",
              desc: "Percentage cut of every marketplace transaction — supplements, devices, services, interventions. The OS accelerates purchases; we take a cut of what it accelerates.",
            },
            {
              stream: "Matchmaking Revenue",
              metric: "Commission-based",
              desc: "Connecting users with the right providers, clinics, coaches, and specialists. Personalized discovery replaces generic directories. Commission on every successful connection.",
            },
            {
              stream: "Data Insights",
              metric: "Future (Seed+)",
              desc: "Anonymized, privacy-preserving population insights for research partners. Differential privacy ensures no individual data leaves the user. Planned revenue stream at scale.",
            },
          ].map((s) => (
            <div key={s.stream} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">{s.stream}</div>
              <div className="text-lg font-bold text-blue-400 mb-3">{s.metric}</div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Last Mover Advantage — [VISION UPDATE 2026-03-27: Life care, final platform, transaction revenue] */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">Last Mover Advantage</h2>
        <div className="bg-[var(--color-surface)] border border-blue-600/30 rounded-xl p-8">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4">
            Every silo app of the last decade built one piece: wearables, fitness trackers, meditation apps,
            financial planners, career coaches, health records. Hundreds of billions invested in fragments.
            None of them built the operating system that connects them all.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4">
            Life Atlas is the last mover. We do not compete with silo apps — we orchestrate them.
            We are the integration layer, the decision engine, the OS that turns fragmented life data
            into unified life intelligence. The biological digital twin anchors the science.
            The platform accelerates every decision across every domain.
          </p>
          <p className="text-lg font-semibold text-blue-400">
            This is the final platform. The last one anyone needs.
          </p>
        </div>
      </section>

      {/* Market — [VISION UPDATE 2026-03-27: Life care, final platform, transaction revenue] */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">Market Opportunity</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl">
          Life Atlas operates at the intersection of the longevity economy, digital health,
          personal AI, and the quantified-self movement. This is not a health app — it is
          the final platform for life optimization, taking a cut of every decision it accelerates.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "TAM", value: "$150B+", desc: "Longevity + personal AI + life optimization convergence — the final platform market" },
            { label: "SAM", value: "EUR 5-10B", desc: "Premium life-optimization users in EU/NA willing to pay for the OS" },
            { label: "SOM (Y5)", value: "EUR 90M+", desc: "15,000 premium + concierge users + transaction & matchmaking revenue" },
          ].map((m) => (
            <div key={m.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 text-center">
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">{m.label}</div>
              <div className="text-3xl font-bold text-blue-400 mb-2">{m.value}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Life Domains */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">Life Domains</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl">
          One platform, many domains. Life Atlas is not a single-vertical health app —
          it is a life operating system that expands across every domain the WHO defines as quality of life.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {lifeDomains.map((v) => (
            <div key={v.name} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 hover:border-blue-600/50 transition-colors">
              <div className="text-2xl mb-2">{v.icon}</div>
              <h3 className="font-semibold mb-1">{v.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advisory Board */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Advisory Board</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {partners.map((p) => (
            <div key={p.name} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
              <div className="font-semibold mb-1">{p.name}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">{p.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The Ask */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">The Opportunity</h2>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Pre-Seed Round</h3>
              <div className="space-y-3 text-[var(--color-text-secondary)]">
                <div className="flex justify-between"><span>Raising</span><span className="text-[var(--color-text)] font-medium">EUR 1.5 — 2.5M</span></div>
                <div className="flex justify-between"><span>Instrument</span><span className="text-[var(--color-text)] font-medium">SAFE Note</span></div>
                <div className="flex justify-between"><span>Seed Target</span><span className="text-[var(--color-text)] font-medium">EUR 5-10M (H2 2027)</span></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Use of Funds</h3>
              <div className="space-y-3">
                {[
                  { label: "Product & Engineering", pct: 30 },
                  { label: "Team & Talent", pct: 30 },
                  { label: "Partnerships & Legal", pct: 20 },
                  { label: "GTM & Operations", pct: 20 },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--color-text-secondary)]">{f.label}</span>
                      <span>{f.pct}%</span>
                    </div>
                    <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${f.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Gate */}
      <section id="access" className="max-w-5xl mx-auto px-6 py-20">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Access Data Room</h2>
          <p className="text-[var(--color-text-secondary)] text-center mb-8">
            Enter your details to view our full investor materials.
          </p>

          {submitted ? (
            <div className="bg-green-950/30 border border-green-800/50 rounded-xl p-6 text-center">
              <div className="text-green-400 text-lg font-semibold mb-2">Access Granted</div>
              <p className="text-[var(--color-text-secondary)]">Redirecting to data room...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-blue-600"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                placeholder="Firm / Organization (optional)"
                value={firm}
                onChange={(e) => setFirm(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-blue-600"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Request Access
              </button>
              <p className="text-xs text-[var(--color-text-secondary)] text-center">
                By requesting access, you agree to keep all materials confidential.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-sm text-[var(--color-text-secondary)]">
          <span>Life Atlas AB — Gothenburg, Sweden</span>
          <span>nicolas@lifeatlas.io</span>
        </div>
      </footer>
    </main>
  );
}
