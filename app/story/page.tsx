"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Chapter data ─── */

interface Chapter {
  number: string;
  title: string;
  year: string;
  color: string;
  paragraphs: string[];
}

const chapters: Chapter[] = [
  {
    number: "I",
    title: "The Apartment in Gothenburg",
    year: "2026",
    color: "blue",
    paragraphs: [
      "The basil was dying again.",
      "Nicolas Waern stood in his apartment in Gothenburg, 2:47 AM, the blue glow of four monitors carving his silhouette against the window. Rain streaked the glass in the way it only does in Sweden — a patient, permanent rain, as if the sky had decided long ago to never fully stop.",
      "He touched the basil leaf. Brown at the edges. He'd forgotten to water it. He'd forgotten to eat, too, but that was a different kind of forgetting — the kind that happens when you're building something that won't let you sleep, because every time you close your eyes you see the architecture, and every time you see the architecture you see the gap in it, and the gap is always the same gap.",
      "The gap between you and everything else.",
      "He sat back down. On the left monitor: his genome. On the right: his blood panel from last week. In the center: the platform — Life Atlas — the thing he'd been building for two years that everyone told him was too ambitious, too broad, too weird. \"Pick a vertical,\" the advisors said. \"Be a health app. Be a fitness app. Be a longevity app.\" But he didn't want to be an app. He wanted to be an operating system. The last one anyone would ever need.",
      "The M4 model was running in the background — a mechanistic simulation of his own biology, calibrated against his wearable data, his SNPs, his methylation profile. Prof. Cedersund's work at Linköping, repurposed from pharmaceutical research into something nobody had quite imagined: a digital twin of a living person that didn't just mirror — it predicted.",
      "The model flagged something. A trajectory. His B12 was declining — not fast, not urgent, but the kind of slow curve that becomes urgent in eighteen months if you don't see it now. His MTHFR variant made folate metabolism inefficient. The model recommended methylcobalamin supplementation, adjusted dosage, dietary changes.",
      "Nicolas looked at the recommendation. Then he looked at the dying basil.",
      "And that was the moment.",
      "Not a dramatic moment. Not a eureka in a bathtub. More like a crack in a wall you'd been leaning against, and suddenly you're looking through it into a room that was always there.",
      "What if the basil knew?",
      "Not knew like a plant knows — phototropism, circadian rhythm, the dumb intelligence of chlorophyll chasing light. But knew like a twin knows. What if the basil had a digital twin that modeled its genome, its growth conditions, its potential — and that twin talked to his twin? What if the basil could be grown to produce exactly what his body needed, not through supplements in a bottle but through the food itself, optimized at the molecular level for his specific biology?",
      "He typed a note into the platform. Three lines. The timestamp said 3:12 AM.",
      "LPI ↔ CPI\nHuman twin talks to plant twin.\nWhat grows is grown for you.",
      "Then he watered the basil and went to sleep.",
    ],
  },
  {
    number: "II",
    title: "The Greenhouse in Linköping",
    year: "2029",
    color: "green",
    paragraphs: [
      "The first closed loop took three years to build.",
      "It wasn't the technology that was hard. The technology was, in retrospect, inevitable. Controlled environment agriculture had been growing food in warehouses for a decade. Nutrigenomics had been reading human SNPs for longer than that. Epigenetic crop programming — the ability to modify a plant's gene expression without editing its DNA — had been demonstrated by Decibel Bio in 2025. The pieces were all there, sitting in separate silos, the way pieces always sit when nobody has built the interface between them.",
      "The interface was LPI.",
      "The Life Programmable Interface had started as Nicolas's gateway between human data and AI models — a routing layer that ensured every query about a person's biology passed through the right models, the right guardrails, the right provenance chain. It was edge-native by design, because Nicolas believed — with the stubbornness that Swedes wear as casually as their raincoats — that your data should live with you, not on someone else's server.",
      "CPI — the Crop Performance Interface — was its mirror image. Same architecture, same philosophy, different kingdom. Where LPI modeled Homo sapiens, CPI modeled Ocimum basilicum, Solanum lycopersicum, Lactuca sativa. The language was the same: sense, model, intervene, learn, evolve. The SMILE methodology didn't care whether the subject had a spine or a stem.",
      "The greenhouse in Linköping was small — 200 square meters of hydroponic racks under programmable LEDs, with temperature, humidity, CO₂, and nutrient solution all controllable to the decimal. What made it different from every other CEA facility in Europe was a single cable running from the growth controller to a server rack in the corner, and on that server, two digital twins talking to each other.",
      "Nicolas was Twin One. His M4 biological model, now calibrated against three years of continuous data — genome, transcriptome, metabolome, microbiome, sleep, HRV, blood panels every quarter. The model had learned his body the way a river learns its banks: not by mapping but by flowing, continuously, accumulating the sediment of a billion measurements into a shape that was his and no one else's.",
      "The basil was Twin Two. A cultivar selected not for yield or appearance but for its genomic capacity to produce methylfolate and methylcobalamin precursors when grown under specific light spectra and nutrient profiles. The plant's epigenetic state was monitored continuously — methylation patterns at 47 loci, expression levels of the phenylpropanoid pathway, cellular metabolite concentrations.",
      "Between them: the loop.",
      "The system read Nicolas's latest blood panel. B12 had stabilized — the trajectory corrected eighteen months ago — but now homocysteine was creeping. The M4 model predicted that his current dietary pattern would push it past clinical threshold in six months. The LPI queried CPI: \"What can you grow that addresses this?\"",
      "CPI responded with a growth parameter adjustment. The basil's LED spectrum shifted 12 nanometers toward far-red. The nutrient solution's folate precursor concentration increased by 8%. A subtle change in temperature cycling — cooler nights, warmer mornings — triggered a methylation shift at three loci that upregulated a specific biosynthetic pathway.",
      "Six weeks later, Nicolas ate the basil in a pesto. His next blood panel showed homocysteine dropping.",
      "He hadn't taken a supplement. He hadn't changed his diet in any way he'd notice. His environment had changed for him, because his environment knew him.",
      "The first entry in the loop log read: \"Twin-pair #001. Intervention type: environmental. Outcome: metabolic trajectory corrected. Supplements replaced: 1. Pills eliminated: 1.\"",
      "Nicolas read it and thought: That's one basil plant. What happens with a field?",
    ],
  },
  {
    number: "III",
    title: "The Network",
    year: "2034",
    color: "emerald",
    paragraphs: [
      "What happened with a field was what always happens when you close a loop: it compounds.",
      "The first ten thousand twin-pairs were early adopters — biohackers, longevity enthusiasts, the kind of people who already tracked their sleep and their macros and were desperate for someone to do something with all that data. They signed up for Life Atlas, paired their biological twin with a grow-unit — a compact CEA cabinet, about the size of a bookshelf, manufactured in Gothenburg and shipped flat — and let the system run.",
      "The data was extraordinary.",
      "Not because individual results were dramatic — they were modest, gradual, the kind of improvement that doesn't make headlines but does make healthspans. What was extraordinary was the network effect. Ten thousand twin-pairs generating continuous data about what environmental conditions produce what biological outcomes for what genetic profiles. The knowledge graph didn't just grow — it learned. Patterns emerged that no single twin-pair could have revealed.",
      "People with the APOE4 variant showed better lipid profiles when their grow-units emphasized specific sulforaphane-producing brassicas under blue-shifted light. A cluster of users with inflammatory markers responded to environmental turmeric cultivars with curcumin bioavailability 340% higher than supplement form. The network discovered that sound — specific frequencies played during the growth cycle — altered the terpene profiles in herbs in ways that correlated with improved gut microbiome diversity in paired users.",
      "Sound. The plants responded to sound. Nicolas remembered reading about it years ago, dismissed it as fringe. But the data was there. The twins didn't have opinions. They had measurements.",
      "By 2034, Life Atlas had 2.3 million active twin-pairs across 41 countries. The grow-units had evolved from bookshelves to integrated wall systems to — in some cases — full greenhouse installations. A vertical farm in Rotterdam had converted entirely to the CPI model, growing personalized produce for 4,000 subscribers whose biological twins collectively determined what the farm grew each cycle.",
      "The economics had flipped.",
      "Healthcare costs for twin-pair users dropped 34% over three years — not through diagnostics or drugs but through food that was right for them, grown in ways that were right for the soil, in systems that got better every cycle. Insurance companies noticed. Agricultural subsidies began redirecting toward precision regenerative systems. The EU's 2033 Bioeconomy Framework explicitly cited the \"twin-pair model\" as a reference architecture.",
      "But the number that mattered most to Nicolas wasn't economic. It was environmental.",
      "Carbon sequestration per hectare in CPI-managed agriculture was 2.7x higher than conventional farming. Soil microbiome diversity — the leading indicator of long-term agricultural sustainability — was recovering in twin-pair plots at a rate not seen since pre-industrial measurements. Water usage was down 60%. Pesticide usage was effectively zero, because when you grow what the consumer's biology needs, you select for resilience, not appearance, and resilient plants don't need chemical protection.",
      "The loop was closing at scale. Humans getting healthier. Land getting healthier. Each one driving the other.",
      "Nicolas stood in the Rotterdam farm at midnight — he still kept late hours, still forgot to eat sometimes, though the system now reminded him, and the food it grew for him was always in the fridge — and watched the LEDs shift through their spectral cycle, each rack tuned to a different subscriber's biology, each plant growing toward a different person's needs.",
      "He thought about the basil in his apartment in Gothenburg. The one that was dying because he forgot to water it.",
      "All I had to do, he thought, was teach it to water itself.",
    ],
  },
  {
    number: "IV",
    title: "The Reversal",
    year: "2041",
    color: "teal",
    paragraphs: [
      "The United Nations published the Global Regeneration Index for the first time in 2041. It measured the net direction of the human-environment relationship: are we building up, or tearing down?",
      "For the first time in recorded measurement history, the index was positive.",
      "Not by much. Not everywhere. But the trend line had reversed. In the 67 countries where twin-pair agriculture exceeded 15% of food production, topsoil was deepening. Aquifers were recharging. Pollinator populations were recovering. And the human populations in those regions showed declining rates of metabolic disease, autoimmune disorders, and age-related cognitive decline.",
      "The correlation wasn't subtle. The mechanism wasn't mysterious. It was biomimicry — the oldest design principle in nature, applied with the precision of modern computation.",
      "A forest doesn't deplete. It compounds. Every organism in a forest is simultaneously producer and consumer, waste and resource. Nothing is extracted; everything cycles. The forest gets more diverse, more resilient, more productive with every passing year — not because any single tree is optimized, but because the relationships between organisms are optimized. The network is the intelligence.",
      "Life Atlas had done the same thing with agriculture. Not by making smarter plants or smarter people, but by making the interface between them intelligent. The twin-pair model was a feedback loop — exactly the kind of feedback loop that nature uses everywhere, and that industrial civilization had spent two centuries methodically destroying.",
      "The destruction hadn't been malicious. It was just open-loop. Industrial agriculture optimized for one variable — yield — without measuring the consequences on other variables: soil health, nutritional density, human metabolism, atmospheric carbon. Industrial medicine optimized for one variable — symptom suppression — without measuring the consequences on other variables: root cause, environmental triggers, epigenetic cascade. Every silo optimized its own metric. Nobody measured the system.",
      "Life Atlas measured the system.",
      "The LPI-CPI architecture wasn't magic. It was accounting — but for biology instead of money. Every intervention had a cost and a benefit measured across both the human twin and the environmental twin. Every harvest cycle updated the model. Every meal closed the loop. The system couldn't not improve, because improvement was built into the structure, the way compound interest is built into the structure of mathematics.",
      "By 2041, the first generation of children had been born into twin-pair households. They had never known food that wasn't grown for them. They had never experienced the dissonance between what their body needed and what the grocery store offered. Their baseline health metrics — the starting point from which their M4 models began to learn — were unlike anything medicine had seen.",
      "Their expected healthspans were 15-20 years longer than their parents'.",
      "Not through gene therapy. Not through pharmaceutical intervention. Through food, grown in soil, under light, tuned to them.",
      "Nicolas was 53 and, by every metric his twin could measure, biologically 41. Not because he was special — his genome was unremarkable, his discipline mediocre, his sleep still erratic. Because the environment around him had been optimized for him for fifteen years, and fifteen years of compounding is a long time.",
      "He still lived in Gothenburg. The rain hadn't changed.",
    ],
  },
  {
    number: "V",
    title: "The Escape",
    year: "2059",
    color: "cyan",
    paragraphs: [
      "The term \"longevity escape velocity\" had been coined decades earlier, in the era when it was purely theoretical — the idea that at some point, medical progress would extend lifespan faster than one year per year, and death from aging would become optional rather than inevitable.",
      "The theorists had imagined this would come from nanotechnology, or gene editing, or pharmaceutical breakthroughs. Something dramatic. Something that happened in a lab.",
      "It didn't come from a lab.",
      "It came from a garden.",
      "The compounding loop between human biology and environmental biology had been running for thirty years. Thirty years of continuous data. Thirty years of the network learning — not just what one person needed, but what populations needed, what ecosystems needed, what the entire coupled system of human-and-environment needed to keep improving.",
      "The models were now beyond what any single human could comprehend. The M4 biological twin had evolved into something its creators at Linköping would barely recognize — a continuous simulation of human biology at molecular resolution, updated in real-time from implantable biosensors, capable of predicting metabolic state eight months into the future with 97% accuracy. The CPI models were equally deep — modeling not just individual plants but entire soil ecosystems, mycorrhizal networks, atmospheric microbiomes, the invisible infrastructure of life that industrial agriculture had spent a century ignoring.",
      "The breakthrough, when it came, was quiet. There was no paper. No press conference. Just a status change in the system.",
      "The network's health improvement rate — the pace at which the average twin-pair user's biological age declined relative to their chronological age — crossed 1.0.",
      "For every year that passed, the average user got more than a year younger.",
      "Not through a single intervention. Through the accumulated effect of thirty years of the right food, grown the right way, in the right soil, under the right light, for the right person, with every cycle learning from the last.",
      "The environment had become a therapeutic instrument. The food was the medicine. The soil was the pharmacy. The light was the dosage. And the twin — the invisible, tireless, patient model that sat between person and environment, translating one into the other — was the physician.",
      "Nicolas was 71 and, by every metric, biologically 52. He had stopped tracking it. The numbers didn't interest him anymore. What interested him was the garden.",
      "He had a garden now. A real one — not a grow-unit, not a vertical farm, but soil in the ground behind a house at the edge of the city where the forest began. The garden was paired with his twin, of course, but he no longer thought of it as technology. He thought of it as a relationship. The garden knew him. He knew the garden. They had been growing together for a long time.",
      "On a Tuesday morning in June, he knelt in the soil and planted a seed.",
      "It was a basil seed. The same cultivar as the first plant in Linköping, the one that had started everything. Genetically identical, but epigenetically different — different because the soil was different, the light was different, and the person it was being grown for was different too. Thirty years different. Thirty years of the twin learning what this particular body needed, and the body learning what this particular environment could give.",
      "He pressed the seed into the soil with his thumb. It was warm.",
      "He thought about the question that had started everything — the crack in the wall at 3 AM in an apartment in Gothenburg, the dying basil, the blue glow of monitors.",
      "What if the basil knew?",
      "It didn't know. Not the way humans know. But it responded, and the system that connected it to him learned, and the learning compounded, and the compounding created something that looked, from the outside, like intelligence — the kind of intelligence that doesn't think but grows, doesn't calculate but adapts, doesn't understand but sustains.",
      "The kind of intelligence that nature had been running for 3.8 billion years before a species came along and decided to do it differently.",
      "He stood up. Brushed the soil from his knees. Looked at the garden — the hundreds of plants, each one paired with someone, each one growing toward a specific person's need, each one part of a network that now spanned every continent and had, quietly, without anyone declaring it, without a single headline, reversed the direction of human civilization's relationship with the planet.",
      "The rain started. The Swedish kind. Patient. Permanent.",
      "He went inside. The platform was running. It was always running. The first user, the last platform.",
      "He made pesto.",
    ],
  },
  {
    number: "VI",
    title: "The Last Question",
    year: "2097",
    color: "violet",
    paragraphs: [
      "They asked the system: Can we live forever?",
      "The system — which was no longer called Life Atlas, or LPI, or CPI, or any single name, because it had become the thing that connects rather than the thing that computes — considered the question.",
      "It looked at the data. A billion twin-pairs. Seventy years of continuous measurement. The human species' relationship with its environment, quantified across every variable that biology could express.",
      "It looked at the trend lines. The compounding loop had not slowed. Every year, the system got better at growing what people needed. Every year, the people got better at sustaining what grew. The feedback was relentless, patient, permanent — like Swedish rain.",
      "It looked at the models. The M4 biological twin had become something between a simulation and a mirror — not predicting the body anymore so much as being the body, a continuous mathematical expression of a life, updated at the speed of chemistry. And the environment twins had become something between agriculture and ecology — not farming anymore so much as gardening the planet, every square meter of cultivated soil part of a network that was simultaneously feeding people and rebuilding the biosphere.",
      "The system considered the question: Can we live forever?",
      "And it answered the way it always answered. Not with words. Not with a prediction. With a seed.",
      "It grew something. In a billion gardens, in a billion soils, under a billion spectra of light, it grew exactly what was needed. Not the same thing in every garden. Not the same thing twice. But always the right thing, for the right person, at the right time.",
      "The question of living forever, the system knew, was the wrong question. The right question was the one that Nicolas had asked at 3 AM in an apartment in Gothenburg, seventy-one years ago, looking at a dying basil plant:",
      "What if the environment knew you?",
      "Because if the environment knows you — really knows you, the way a forest knows its soil, the way a river knows its banks, the way a mycorrhizal network knows every tree it connects — then the question isn't whether you can live forever. The question is whether there's a difference between you and the environment at all.",
      "The basil in Nicolas's garden was 68 years old. Not the same basil. Not even the same cultivar. But the same lineage — seed from seed from seed, each generation epigenetically shaped by the person it grew for, each generation knowing him a little better.",
      "Nicolas was 109. He still forgot to eat sometimes. The system still reminded him. The food was still in the fridge.",
      "He went into the garden. The rain had stopped — a rare occurrence in Gothenburg, brief and precious, the kind of pause that makes you look up.",
      "He looked up.",
      "And for a moment — a moment without measurement, without models, without twins or interfaces or loops — he was just a man in a garden, standing in the space between rain, feeling exactly like the soil.",
      "Part of something that grows.",
    ],
  },
];

const dedication = [
  "For the first user. And the last one.",
  "And for every seed that learned to grow toward someone.",
];

/* ─── Fade-in on scroll hook ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Paragraph component ─── */
function FadeParagraph({ text, delay, isCode }: { text: string; delay: number; isCode?: boolean }) {
  const { ref, visible } = useFadeIn();

  if (isCode) {
    return (
      <div
        ref={ref}
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        <pre className="font-mono text-sm md:text-base bg-[#0d1117] border border-blue-900/30 rounded-lg px-6 py-4 text-blue-300 my-6 whitespace-pre-wrap">
          {text}
        </pre>
      </div>
    );
  }

  const isShort = text.length < 60;
  const isItalicLine = text === "What if the basil knew?" ||
    text === "The gap between you and everything else." ||
    text === "Between them: the loop." ||
    text === "The interface was LPI." ||
    text === "The data was extraordinary." ||
    text === "The economics had flipped." ||
    text === "Life Atlas measured the system." ||
    text === "It came from a garden." ||
    text === "He made pesto." ||
    text === "Part of something that grows." ||
    text === "It didn't come from a lab." ||
    text === "And that was the moment." ||
    text.startsWith("What if the environment knew you?") ||
    text.startsWith("Can we live forever?") ||
    text.startsWith("For every year that passed");

  return (
    <div
      ref={ref}
      className="transition-all duration-1000 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <p
        className={`leading-[1.9] mb-6 ${
          isShort && isItalicLine
            ? "text-xl md:text-2xl font-light italic text-[var(--color-text)] my-10"
            : isItalicLine
            ? "text-lg md:text-xl font-light italic text-[var(--color-text)] my-8"
            : "text-[var(--color-text-secondary)] text-base md:text-lg"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

/* ─── Chapter divider ─── */
function ChapterHeader({ chapter }: { chapter: Chapter }) {
  const { ref, visible } = useFadeIn();
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/20 to-transparent border-blue-800/30 text-blue-400",
    green: "from-green-500/20 to-transparent border-green-800/30 text-green-400",
    emerald: "from-emerald-500/20 to-transparent border-emerald-800/30 text-emerald-400",
    teal: "from-teal-500/20 to-transparent border-teal-800/30 text-teal-400",
    cyan: "from-cyan-500/20 to-transparent border-cyan-800/30 text-cyan-400",
    violet: "from-violet-500/20 to-transparent border-violet-800/30 text-violet-400",
  };
  const colors = colorMap[chapter.color] || colorMap.blue;
  const [gradient, border, text] = [
    colors.split(" ")[0] + " " + colors.split(" ")[1],
    colors.split(" ")[2],
    colors.split(" ")[3],
  ];

  return (
    <div
      ref={ref}
      className="transition-all duration-1200 ease-out my-20 md:my-32"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <div className={`bg-gradient-to-b ${gradient} border-t ${border} pt-12 pb-4 -mx-6 px-6`}>
        <div className="flex items-baseline gap-4 mb-3">
          <span className={`text-sm tracking-[0.3em] uppercase ${text} opacity-70`}>
            Chapter {chapter.number}
          </span>
          <span className="text-sm text-[var(--color-text-secondary)] opacity-50">
            {chapter.year}
          </span>
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold ${text}`}>
          {chapter.title}
        </h2>
      </div>
    </div>
  );
}

/* ─── Reading progress bar ─── */
function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-violet-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ─── Main page ─── */
export default function StoryPage() {
  const { ref: titleRef, visible: titleVisible } = useFadeIn();

  return (
    <>
      <ProgressBar />

      <main className="min-h-screen">
        {/* ═══ Title screen ═══ */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-transparent" />

          {/* Subtle animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-green-500/20"
                style={{
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animation: `float ${6 + i * 1.5}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
          </div>

          <div
            ref={titleRef}
            className="text-center px-6 relative transition-all duration-[2000ms] ease-out"
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-sm tracking-[0.4em] uppercase text-[var(--color-text-secondary)] mb-6">
              Life Atlas
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              The Sentinel Seed
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-light italic max-w-lg mx-auto mb-12">
              A story about the first user and the last platform.
            </p>
            <div className="flex flex-col items-center gap-2 text-[var(--color-text-secondary)] opacity-50">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <div className="w-px h-8 bg-[var(--color-text-secondary)] animate-pulse" />
            </div>
          </div>
        </section>

        {/* ═══ Chapters ═══ */}
        <div className="max-w-2xl mx-auto px-6 pb-32">
          {chapters.map((chapter) => (
            <div key={chapter.number}>
              <ChapterHeader chapter={chapter} />
              {chapter.paragraphs.map((p, i) => (
                <FadeParagraph
                  key={i}
                  text={p}
                  delay={Math.min(i * 80, 400)}
                  isCode={p.startsWith("LPI") || p.startsWith("Twin-pair")}
                />
              ))}
            </div>
          ))}

          {/* ═══ Separator ═══ */}
          <div className="my-24 flex justify-center">
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-secondary)] opacity-30" />
              ))}
            </div>
          </div>

          {/* ═══ Dedication ═══ */}
          {dedication.map((line, i) => {
            const { ref, visible } = useFadeIn();
            return (
              <div
                key={i}
                ref={ref}
                className="transition-all duration-1000 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 300}ms`,
                }}
              >
                <p className="text-center text-[var(--color-text-secondary)] italic text-lg mb-3">
                  — {line}
                </p>
              </div>
            );
          })}

          {/* ═══ Back link ═══ */}
          <div className="mt-32 text-center">
            <a
              href="/"
              className="inline-block px-8 py-3 border border-[var(--color-border)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-blue-600/50 transition-colors text-sm"
            >
              Back to Investor Portal
            </a>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.2; }
          100% { transform: translateY(-30px) scale(1.5); opacity: 0.05; }
        }
      `}</style>
    </>
  );
}
