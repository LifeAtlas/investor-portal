"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* ─── Data ─── */

const stats = [
  { label: "Founded", value: "2024" },
  { label: "Stage", value: "Pre-Seed" },
  { label: "HQ", value: "Gothenburg, SE" },
  { label: "Raising", value: "EUR 2.5M" },
  { label: "Interface", value: "LPI" },
  { label: "Framework", value: "WHO QoL" },
];

const partners = [
  { name: "Prof. Gunnar Cedersund", role: "Mechanistic Biology — Linköping University / AstraZeneca" },
  { name: "Pieter van Schalkwyk", role: "Founder & CEO, XMPro — Digital Twin Platform" },
  { name: "Marc Horner", role: "CEO, CytoTheryx — In Silico Clinical Trials" },
  { name: "Dr. Eric Stahlberg", role: "Director of Biomedical Informatics, Frederick National Lab / NCI" },
  { name: "Dan Maccreary", role: "Ex-Optum VP Engineering — Healthcare Data at Scale" },
  { name: "Dan Isaacs", role: "Digital Twin Standards & Interoperability" },
];

const timelinePhases = [
  {
    phase: "Phase 1 — The Self",
    period: "Now",
    title: "Your Digital Twin",
    desc: "Your genome, epigenome, microbiome, wearable streams, and life data — unified in one edge-native OS. Mechanistic models simulate your biology before you act. The first user becomes the proof that a life can be quantified, predicted, and optimized.",
    color: "blue",
  },
  {
    phase: "Phase 2 — The Environment",
    period: "2027",
    title: "Your Environment's Twin",
    desc: "The platform extends beyond the body. Plants, soil, air, light — every element of your living environment gets a twin. Your biological twin talks to the plant's twin. What grows is grown for you, biochemically optimized for your current metabolic state.",
    color: "green",
  },
  {
    phase: "Phase 3 — The Loop",
    period: "2028",
    title: "The Symbiotic Feedback Loop",
    desc: "Human and environment become one system. Your declining B12 trajectory triggers your garden to adjust light spectrum and nutrient delivery, maximizing bioavailable methylcobalamin precursors. The environment heals you. You sustain the environment. A closed loop.",
    color: "emerald",
  },
  {
    phase: "Phase 4 — The Network",
    period: "2029+",
    title: "Global Biomimetic Intelligence",
    desc: "Millions of human-environment twin pairs create a planetary feedback network. Crops grown in Gothenburg optimize for a community's collective nutritional gaps. Agriculture reverses environmental damage through precision. The network learns. The planet regenerates.",
    color: "teal",
  },
];

const convergencePoints = [
  {
    title: "Nutrigenomics → Personalized Agriculture",
    status: "Fragments exist",
    desc: "Nutrigenomix reads SNPs and says 'eat folate.' Jeju Island built per-plant agricultural twins. Nobody connects YOUR genome to YOUR plant's genome. We close the loop.",
  },
  {
    title: "Epigenetic Crop Programming",
    status: "Emerging",
    desc: "Decibel Bio writes the plant epigenome via foliar spray. Inari does AI-guided multiplex gene editing. They optimize for generic traits — yield, drought. We optimize for YOUR methylation profile.",
  },
  {
    title: "Controlled Environment Agriculture",
    status: "Mature",
    desc: "Vertical farms control light, temperature, humidity, CO2. The missing input: WHO should the output be optimized for? When the farm knows its consumer's biology, every parameter has a purpose.",
  },
  {
    title: "Biomimicry at Scale",
    status: "Conceptual",
    desc: "Nature doesn't extract — it regenerates. When human health and environmental health are the same optimization target, agriculture stops being extractive and becomes restorative. Longevity and sustainability are the same equation.",
  },
];

const revenueStreams = [
  {
    tier: "Freemium",
    price: "Free",
    desc: "Life OS core — dashboard, basic AI agents, wearable integration, LPI lite. The acquisition engine that brings people into the ecosystem.",
  },
  {
    tier: "Premium",
    price: "EUR 250/mo",
    desc: "Full AI orchestration, 3D visualization, WHO QoL tracking, marketplace access, environment monitoring. The twin starts talking to the world.",
  },
  {
    tier: "Concierge + Biological Twin",
    price: "EUR 3,600-6,000/yr",
    desc: "Biological digital twin anchor, dedicated AI agents, longevity planning, environment twin integration. Your biology and your environment as one system.",
  },
];

const platformStreams = [
  {
    stream: "Transaction Fees",
    metric: "5-10% take rate",
    desc: "Every marketplace transaction — supplements, seeds, devices, interventions. The OS accelerates purchases; we take a cut of what it accelerates.",
  },
  {
    stream: "Crop Performance Interface",
    metric: "B2B SaaS",
    desc: "CPI — the agricultural equivalent of LPI. Vertical farms and CEA operators subscribe to optimize their output for specific consumer biology profiles.",
  },
  {
    stream: "Longevity Data Insights",
    metric: "Future (Seed+)",
    desc: "Anonymized twin-pair data: what environments produce what health outcomes for what genetic profiles. The most valuable dataset in precision agriculture.",
  },
];

/* ─── Animated counter hook (client-safe with fallback) ─── */
function useCounter(end: number, duration: number = 2000, start: number = 0) {
  const [value, setValue] = useState(end); // Start at end value for SSR/static
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset to start for animation on client
    if (!hasAnimated) {
      setValue(start);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, start, hasAnimated]);

  return { value, ref };
}

/* ─── Component ─── */
export default function InvestorPortalV2() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const tam = useCounter(150, 2500);
  const sam = useCounter(10, 2000);
  const som = useCounter(90, 2200);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
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
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-green-950/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg">LA</div>
            <span className="text-[var(--color-text-secondary)] text-sm tracking-widest uppercase">Investor Portal</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            The Final Platform.<br />
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              Where Biology Meets Environment.
            </span>
          </h1>

          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mb-4 leading-relaxed">
            Life Atlas is the operating system for the relationship between you and your environment.
            Today: your health, your goals, your team. Tomorrow: your food, your air, your soil.
            The first platform where a human digital twin talks to a plant digital twin — and what
            grows is grown for you.
          </p>

          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mb-8 leading-relaxed">
            Edge-native. Decentralized. Sovereign. The only architecture that can close the loop
            between human biology and environmental biology — because the data never leaves the edge.
            Your genome doesn't go to a cloud. Your garden doesn't report to a corporation.
            The twin stays with you.
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

      {/* ═══ The Thesis ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">The Thesis</h2>
        <div className="bg-gradient-to-br from-blue-950/30 via-[var(--color-surface)] to-green-950/20 border border-blue-800/20 rounded-xl p-8">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
            Humanity has spent a century optimizing for extraction — from the environment and from ourselves.
            We grow food that depletes soil. We eat food that depletes our bodies. We treat the symptoms
            with pharmaceuticals while the root cause compounds. The trend line is clear: we are destroying
            ourselves and the environment in the same stroke.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
            But biology already solved this. Ecosystems don't extract — they regenerate. A forest doesn't
            deplete; it compounds. The answer isn't more technology applied to broken systems. The answer is
            biomimicry: building systems that work the way nature works — where improving human health
            <em> simultaneously </em> improves environmental health, and vice versa.
          </p>
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Life Atlas is the interface between human biology and environmental biology. The first
            platform where getting healthier makes the planet healthier — and a healthier planet
            makes you healthier. A compounding loop toward longevity escape velocity.
          </p>
        </div>
      </section>

      {/* ═══ The Problem ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">The Problem</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-surface)] border border-red-900/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">The Human Side</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Your life is fragmented across 50+ providers, wearable silos, disconnected apps.
              Healthcare spending tripled since 2000, yet we are sicker. The WHO defines quality of
              life across physical, psychological, social, and environmental domains — yet no platform
              addresses life holistically. Reactive care, zero predictive power.
            </p>
          </div>
          <div className="bg-[var(--color-surface)] border border-red-900/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">The Environment Side</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Agriculture optimizes for yield, not nutrition. Nutrigenomics reads your SNPs but can't
              change what grows. Agricultural digital twins model plant health but don't know who eats
              the output. Epigenetic crop editing optimizes for drought tolerance, not your methylation
              profile. The human and the environment are optimized independently. The loop is open.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ The Vision Timeline ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">The Vision</h2>
        <p className="text-[var(--color-text-secondary)] mb-10 max-w-3xl">
          Four phases. From one person's digital twin to a planetary feedback network.
          Each phase delivers standalone value. Together, they close the loop between human
          biology and environmental biology — reversing the extractive trend, building toward
          longevity escape velocity.
        </p>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 via-green-600 to-emerald-600 hidden md:block" />
          <div className="space-y-8">
            {timelinePhases.map((phase) => (
              <div key={phase.phase} className="md:pl-16 relative">
                <div className={`absolute left-4 w-5 h-5 rounded-full border-2 hidden md:block ${
                  phase.color === "blue" ? "border-blue-500 bg-blue-500/20" :
                  phase.color === "green" ? "border-green-500 bg-green-500/20" :
                  phase.color === "emerald" ? "border-emerald-500 bg-emerald-500/20" :
                  "border-teal-500 bg-teal-500/20"
                }`} style={{ top: "1.5rem" }} />
                <div className={`bg-[var(--color-surface)] border rounded-xl p-6 ${
                  phase.color === "blue" ? "border-blue-800/30" :
                  phase.color === "green" ? "border-green-800/30" :
                  phase.color === "emerald" ? "border-emerald-800/30" :
                  "border-teal-800/30"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      phase.color === "blue" ? "bg-blue-950/50 text-blue-400" :
                      phase.color === "green" ? "bg-green-950/50 text-green-400" :
                      phase.color === "emerald" ? "bg-emerald-950/50 text-emerald-400" :
                      "bg-teal-950/50 text-teal-400"
                    }`}>{phase.period}</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{phase.phase}</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    phase.color === "blue" ? "text-blue-400" :
                    phase.color === "green" ? "text-green-400" :
                    phase.color === "emerald" ? "text-emerald-400" :
                    "text-teal-400"
                  }`}>{phase.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Convergence ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">The Convergence</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl">
          The technology fragments exist in isolation. Nobody has connected them.
          Life Atlas is the interface layer — the operating system that unifies human genomics
          with agricultural genomics through the Life Programmable Interface (LPI) and a new
          Crop Performance Interface (CPI).
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {convergencePoints.map((c) => (
            <div key={c.title} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 hover:border-green-600/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{c.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-950/30 border border-green-800/30 text-green-400">
                  {c.status}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ The Closed Loop Diagram ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">The Closed Loop</h2>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8">
          <div className="grid md:grid-cols-5 gap-4 items-center text-center">
            <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl p-4">
              <div className="text-2xl mb-2">&#x1f9ec;</div>
              <div className="font-semibold text-blue-400 text-sm">Your Biological Twin</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">Genome, epigenome, microbiome, metabolomics</div>
            </div>
            <div className="text-2xl text-[var(--color-text-secondary)] hidden md:block">&#x27F7;</div>
            <div className="bg-green-950/30 border border-green-800/30 rounded-xl p-4">
              <div className="text-2xl mb-2">&#x1f331;</div>
              <div className="font-semibold text-green-400 text-sm">LPI + CPI</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">Orchestration layer matching human needs to plant potential</div>
            </div>
            <div className="text-2xl text-[var(--color-text-secondary)] hidden md:block">&#x27F7;</div>
            <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-xl p-4">
              <div className="text-2xl mb-2">&#x1f33f;</div>
              <div className="font-semibold text-emerald-400 text-sm">Plant Twin</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">Cultivar genome, epigenomic state, growth conditions</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-950/30 via-green-950/30 to-emerald-950/30 border border-green-800/20 rounded-xl px-6 py-3">
              <p className="text-sm text-[var(--color-text-secondary)]">
                <span className="text-green-400 font-medium">Example: </span>
                &ldquo;Given your current MTHFR methylation state and declining B12 trajectory,
                grow this specific cultivar under adjusted light spectrum and nutrient delivery
                to maximize bioavailable folate and methylcobalamin precursors.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Why This Wins ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Why This Wins</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "The Loop is the Moat",
              desc: "Anyone can do nutrigenomics lookup tables. Anyone can do precision agriculture. The value is in the interface between them — and that interface is LPI. Every meal closes the loop tighter. The model improves with every harvest cycle. This is a flywheel, not a feature.",
              gradient: "from-blue-600/20 to-blue-600/5",
            },
            {
              title: "Biomimicry Economics",
              desc: "When human health and environmental health are the same optimization target, the economics flip. Healthier people need less healthcare. Regenerative agriculture needs less input. The platform's users don't just save money — they create value that compounds in both directions.",
              gradient: "from-green-600/20 to-green-600/5",
            },
            {
              title: "Longevity Escape Velocity",
              desc: "The compounding loop between human biology and environmental biology isn't incremental — it's exponential. Each cycle produces more data, better models, more precise interventions. The rate of improvement accelerates. That's the definition of escape velocity.",
              gradient: "from-emerald-600/20 to-emerald-600/5",
            },
          ].map((item) => (
            <div key={item.title} className={`bg-gradient-to-b ${item.gradient} border border-[var(--color-border)] rounded-xl p-6`}>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Market ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">Market Opportunity</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl">
          Life Atlas sits at the convergence of longevity, precision agriculture, personal AI,
          and regenerative biology. Not one vertical — the operating system that connects them all.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div ref={tam.ref} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 text-center">
            <div className="text-sm text-[var(--color-text-secondary)] mb-1">TAM</div>
            <div className="text-3xl font-bold text-blue-400 mb-2">${tam.value}B+</div>
            <div className="text-sm text-[var(--color-text-secondary)]">Longevity + precision agriculture + personal AI convergence</div>
          </div>
          <div ref={sam.ref} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 text-center">
            <div className="text-sm text-[var(--color-text-secondary)] mb-1">SAM</div>
            <div className="text-3xl font-bold text-green-400 mb-2">EUR {sam.value}B</div>
            <div className="text-sm text-[var(--color-text-secondary)]">Premium life-optimization + CEA operators in EU/NA</div>
          </div>
          <div ref={som.ref} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 text-center">
            <div className="text-sm text-[var(--color-text-secondary)] mb-1">SOM (Y5)</div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">EUR {som.value}M+</div>
            <div className="text-sm text-[var(--color-text-secondary)]">15K premium users + CPI subscriptions + marketplace</div>
          </div>
        </div>
      </section>

      {/* ═══ Revenue Model ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">Revenue Model</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl">
          Three subscription tiers, three platform revenue streams. The final platform takes a cut
          of every decision it accelerates — for the body and the environment.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-blue-400">Subscription Tiers</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {revenueStreams.map((t) => (
            <div key={t.tier} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">{t.tier}</div>
              <div className="text-2xl font-bold text-blue-400 mb-3">{t.price}</div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-4 text-green-400">Platform Revenue Streams</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {platformStreams.map((s) => (
            <div key={s.stream} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">{s.stream}</div>
              <div className="text-lg font-bold text-green-400 mb-3">{s.metric}</div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Architecture ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-3">Architecture</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl">
          Two interfaces. One orchestration layer. Edge-native, decentralized, sovereign.
          Every component replaceable. No vendor lock-in. All open-source licensed.
        </p>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 font-mono text-sm leading-loose">
          <div className="text-[var(--color-text-secondary)]">
            <span className="text-blue-400">User</span> {"→"} Life Atlas OS (edge-native cockpit)<br />
            {"  → "}<span className="text-blue-400">LPI</span> — Life Programmable Interface (human twin gateway)<br />
            {"  → "}<span className="text-green-400">CPI</span> — Crop Performance Interface (plant twin gateway)<br />
            {"    → "}<span className="text-[var(--color-text)]">Orchestration</span> (AI agents, guardrails, observability)<br />
            {"      → "}<span className="text-[var(--color-text)]">Biological Models</span> (mechanistic human biology simulation)<br />
            {"      → "}<span className="text-[var(--color-text)]">Plant Growth Models</span> (cultivar genome, environment params)<br />
            {"        → "}<span className="text-[var(--color-text)]">Data Fabric</span> (edge-native, decentralized, user-owned)<br />
            {"          → "}<span className="text-emerald-400">Closed Loop</span> (harvest → consume → measure → adjust → grow)
          </div>
        </div>
      </section>

      {/* ═══ Advisory Board ═══ */}
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

      {/* ═══ The Ask ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">The Opportunity</h2>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Pre-Seed Round</h3>
              <div className="space-y-3 text-[var(--color-text-secondary)]">
                <div className="flex justify-between"><span>Raising</span><span className="text-[var(--color-text)] font-medium">EUR 2.5M</span></div>
                <div className="flex justify-between"><span>Instrument</span><span className="text-[var(--color-text)] font-medium">SAFE Note</span></div>
                <div className="flex justify-between"><span>Seed Target</span><span className="text-[var(--color-text)] font-medium">EUR 5-10M (H2 2027)</span></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Use of Funds</h3>
              <div className="space-y-3">
                {[
                  { label: "Product & Engineering", pct: 30 },
                  { label: "Team & Talent", pct: 25 },
                  { label: "CPI R&D (Plant Twin)", pct: 15 },
                  { label: "Partnerships & Legal", pct: 15 },
                  { label: "GTM & Operations", pct: 15 },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--color-text-secondary)]">{f.label}</span>
                      <span>{f.pct}%</span>
                    </div>
                    <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${f.pct}%`,
                          background: f.label.includes("CPI") ? "#22c55e" : "#3b82f6",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ The Narrative ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-blue-950/40 via-[var(--color-surface)] to-green-950/30 border border-green-800/20 rounded-xl p-8">
          <a href="/v2/story" className="text-sm text-green-400 hover:text-green-300 float-right mt-1 transition-colors">Read the full story →</a>
          <h2 className="text-2xl font-bold mb-4">The First User, The Final Platform</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
            Life Atlas starts with one person — the founder — as the first fully quantified
            human twin. Genome, epigenome, microbiome, wearable streams, life data. Then the
            environment joins. The plants in the window. The air in the room. The soil in the pot.
            Each one gets a twin. Each one talks to the others.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
            What grows is grown for you. Not yield-optimized. Not shelf-life-maximized.
            Biochemically tuned to your current metabolic state. The environment becomes an
            extension of your biology.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
            Scale this to a city, and agriculture stops being extractive. Scale it to a planet,
            and the trend reverses — humans and environments building each other up, not tearing
            each other down. Biomimicry at civilization scale.
          </p>
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
            This is what longevity escape velocity looks like: not just living longer,
            but building a world that makes living longer worth it.
          </p>
        </div>
      </section>

      {/* ═══ Access Gate ═══ */}
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
          <span>nicolas@lifeatlas.online</span>
        </div>
      </footer>
    </main>
  );
}
