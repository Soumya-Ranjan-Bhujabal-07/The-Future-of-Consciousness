import React, { useState } from "react";
import { Check, ShieldAlert, Cpu, Layers, Activity } from "lucide-react";

// ==========================================
// 1. Biological Intervention Matrix (Ch 1.4)
// ==========================================
export const InterventionMatrix: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const data = [
    {
      intervention: "Mechanical Cortical Trauma",
      mechanism: "Disruptions in localized neural architecture (e.g., prefrontal cortex damage).",
      impact: "Radical restructuring of personality, executive function, and moral reasoning.",
      icon: "🧠",
      detail: "Classic historical example: Phineas Gage. The damage to the ventromedial prefrontal cortex compromised the neural pathways responsible for emotional regulation, future consequence calculation, and social restraint, effectively proving that individual morality resides in physical cortical assemblies."
    },
    {
      intervention: "Pharmacological Agonism",
      mechanism: "Binding of molecules (e.g., psilocybin) to specific serotonin receptors ($5\\text{-HT}_{2\\text{A}}$).",
      impact: "Fundamental dissolution of spatial-temporal orientation and ego boundaries.",
      icon: "🧪",
      detail: "By overriding the standard filtering algorithms of the Default Mode Network (DMN), psychedelic molecules induce widespread hyper-connectivity across cortical networks. This de-afferentiation triggers a subjective collapse of ego divisions and vivid sensory synthesis."
    },
    {
      intervention: "Localised Electrical Stimulation",
      mechanism: "Focused microelectrode arrays delivering electrical currents to specific cortical structures.",
      impact: "Instantaneous elicitation of vivid episodic memories, forced motor actions, or complex sensory phosphenes.",
      icon: "⚡",
      detail: "Direct micro-stimulation of the temporal lobe (as documented by Wilder Penfield) can trigger un-mediated, highly structured autobiographical hallucinations. This supports the functional theory that memory constructs are physically archived and replayed via electrical triggers."
    },
    {
      intervention: "Neurodegenerative Decay",
      mechanism: "Progressive tau protein accumulation and amyloid-beta plaque deposition.",
      impact: "Systemic erosion of personal identity, autobiographical memory, and cognitive coherence.",
      icon: "📉",
      detail: "As synaptic densities collapse and long-range connectivity channels dissolve, the internal unified thread of self-awareness progressively fragments. This demonstrates that personal identity relies strictly upon continuous biological material integrity."
    }
  ];

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/40">
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="text-[#00F2FE]" size={16} />
          <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">
            INTERVENTION_CORRELATION_MATRIX
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#00F2FE]/70 font-semibold uppercase tracking-wider">
          SELECT ROW TO PARSE DEPTH
        </span>
      </div>

      <div className="divide-y divide-white/10">
        {data.map((row, idx) => {
          const isSelected = selectedRow === idx;
          return (
            <div
              key={idx}
              className={`transition-all duration-300 cursor-pointer ${
                isSelected ? "bg-[#00F2FE]/5" : "hover:bg-white/5"
              }`}
              onClick={() => setSelectedRow(isSelected ? null : idx)}
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-xl shrink-0">{row.icon}</span>
                  <span className="font-sans text-xs font-bold text-[#00F2FE] uppercase tracking-wide">
                    {row.intervention}
                  </span>
                </div>
                <div className="font-sans text-xs text-slate-300 md:col-span-1">
                  {row.mechanism}
                </div>
                <div className="font-sans text-xs text-slate-400 italic">
                  {row.impact}
                </div>
              </div>

              {isSelected && (
                <div className="px-4 pb-4 pt-1 border-t border-white/10 bg-black/30">
                  <div className="p-3.5 rounded-lg border border-[#00F2FE]/20 bg-[#00F2FE]/5 flex items-start space-x-3">
                    <ShieldAlert className="text-[#00F2FE] shrink-0 mt-0.5" size={14} />
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#00F2FE] font-bold block uppercase tracking-wider">
                        Electrophysiological Depth Log
                      </span>
                      <p className="font-sans text-xs leading-relaxed text-slate-300">
                        {row.detail}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 2. BCI Sensor Modalities Matrix (Ch 3.6)
// ==========================================
export const BciModalitiesMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("scalp");

  const modalities = [
    {
      id: "scalp",
      name: "Scalp EEG",
      invasiveness: "None (External)",
      spatial: "10 – 20 mm",
      temporal: "< 1 ms",
      bandwidth: "0.5 – 40 Hz",
      risk: "None",
      source: "Scalp Averaged Potentials",
      color: "border-teal-500/50 text-teal-400 animate-pulse",
      bg: "bg-teal-500/10",
      desc: "Electrodes sit directly on the scalp. Signals are heavily attenuated and spatial details are scattered by the skull, making it safe and non-invasive, but narrow in signal bandwidth. Highly effective for simple visual spellers (P300) or motor imagery training."
    },
    {
      id: "surface",
      name: "Surface ECoG",
      invasiveness: "Moderate (Craniotomy)",
      spatial: "1 – 5 mm",
      temporal: "< 1 ms",
      bandwidth: "0.5 – 200 Hz",
      risk: "Low (Dural irritation)",
      source: "Cortical Local Field Potentials",
      color: "border-[#00F2FE]/50 text-[#00F2FE]",
      bg: "bg-[#00F2FE]/10",
      desc: "Thin-film electrode grids resting directly on the brain's cortical surface beneath the skull. Captures synchronized local field potentials with exceptional signal quality and high frequency range, without penetrating brain tissue."
    },
    {
      id: "intracortical",
      name: "Intracortical Array",
      invasiveness: "High (Penetrating)",
      spatial: "10 – 100 μm",
      temporal: "< 1 ms",
      bandwidth: "1 – 10,000 Hz",
      risk: "High (Glial scarring)",
      source: "Individual Action Potentials",
      color: "border-rose-500/50 text-rose-400",
      bg: "bg-rose-500/10",
      desc: "Microelectrode needles (e.g. Utah Array) penetrating 1.5mm directly into the motor cortex. Capable of capturing individual neural action potentials (spikes), supporting high-bandwidth speech decoding and highly precise robotic control."
    },
    {
      id: "endovascular",
      name: "Endovascular Stent",
      invasiveness: "Low-Moderate (Catheter)",
      spatial: "1 – 2 mm",
      temporal: "< 1 ms",
      bandwidth: "0.5 – 150 Hz",
      risk: "Very Low (Vessel shielding)",
      source: "Vasculature Local Field Potentials",
      color: "border-amber-500/50 text-amber-400",
      bg: "bg-amber-500/10",
      desc: "Sensors nested on a expandable stent and threaded through the jugular vein to sit in the brain's venous system directly adjacent to the motor cortex. High-bandwidth capturing with near-zero long-term tissue rejection or stroke risk."
    }
  ];

  const current = modalities.find((m) => m.id === activeTab) || modalities[0];

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/40">
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="text-[#00F2FE]" size={16} />
          <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">
            BCI_SENSOR_MODALITIES_METRICS
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#00F2FE]/80 uppercase font-semibold">
          Biocompatible Comparison
        </span>
      </div>

      <div className="p-4 bg-black/30 grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-white/10">
        {modalities.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveTab(m.id)}
            className={`py-2 px-3 rounded-lg font-mono text-[10px] font-bold text-center border transition-all ${
              activeTab === m.id
                ? `${m.color} ${m.bg} shadow-md shadow-[#00F2FE]/10`
                : "border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/20 bg-white/5"
            }`}
          >
            {m.name.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/40">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${current.color} ${current.bg}`}>
              {current.name}
            </span>
            <span className="font-sans text-[11px] text-slate-400">
              Source: {current.source}
            </span>
          </div>

          <p className="font-sans text-xs leading-relaxed text-slate-300">
            {current.desc}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#0B0F19]/60 border border-white/10 space-y-2.5 font-mono text-[10px]">
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span className="text-slate-500">INVASIVENESS</span>
            <span className="text-slate-200 font-bold">{current.invasiveness}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span className="text-slate-500">SPATIAL RESOLUTION</span>
            <span className="text-[#00F2FE] font-bold shadow-[0_0_8px_rgba(0,242,254,0.15)]">{current.spatial}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span className="text-slate-500">TEMPORAL RESOLUTION</span>
            <span className="text-teal-400 font-bold">{current.temporal}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span className="text-slate-500">SIGNAL BANDWIDTH</span>
            <span className="text-blue-400 font-bold">{current.bandwidth}</span>
          </div>
          <div className="flex justify-between pt-0.5">
            <span className="text-slate-500">BIO-COMPATIBILITY RISK</span>
            <span className="text-rose-400 font-bold">{current.risk}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. Cross-Cultural Spiritual Frameworks (Ch 5.12)
// ==========================================
export const CrossCulturalMatrix: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const data = [
    {
      domain: "South Asia (Hindu, Buddhist, Jain)",
      framework: "Cyclical / Karmic Reincarnation",
      expression: "Focuses on spiritual continuity across multiple lifetimes, structural moral balance (Karma), and ultimate liberation from existence (Moksha/Nirvana).",
      focus: "Transcending rebirth cycles",
      illustration: "🔄",
      mechanic: "The mind is viewed as a dynamic, shifting continuum rather than a static entity. Actions leave subtle karmic seeds that configure the subsequent physical structure, treating biological life as a school for spiritual maturation."
    },
    {
      domain: "Western Societies (Abrahamic Monotheism)",
      framework: "Linear Eschatology",
      expression: "Emphasizes a singular earthly existence followed by divine judgment, leading to eternal continuation within Heaven or Hell.",
      focus: "Salvation & moral auditing",
      illustration: "➡️",
      mechanic: "Sovereignty of a unified, unique individual soul. Death marks an irreversible transition where personal identity and autobiographical actions are audited for eternal selection, establishing high stakes for earthly moral choices."
    },
    {
      domain: "Indigenous / Tribal Cultures",
      framework: "Animism",
      expression: "Projects conscious intent, personality, and internal life onto non-human entities, including animals, trees, rivers, and landmarks.",
      focus: "Ecological balance",
      illustration: "🌿",
      mechanic: "Rejects anthropocentric exclusivity of consciousness. Awareness is treated as an distributed, ambient fluid that flows through the organic ecosystem, requiring continuous social renegotiation with non-human minds."
    }
  ];

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/40">
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="text-[#00F2FE]" size={16} />
          <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">
            CROSS_CULTURAL_METAPHYSICAL_SCHEMES
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#00F2FE]/80">
          CH_05_ESCHATOLOGY
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-black/30">
        {data.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={idx}
              className={`p-5 transition-all duration-300 cursor-pointer ${
                isActive ? "bg-white/5 border-l-2 border-[#00F2FE]" : "hover:bg-white/5 border-l-2 border-transparent"
              }`}
              onClick={() => setActiveIdx(idx)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{item.illustration}</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {item.domain}
                  </span>
                  <span className="font-sans text-xs font-bold text-white">
                    {item.framework}
                  </span>
                </div>
              </div>
              <p className="font-sans text-xs leading-relaxed text-slate-300 mb-4 line-clamp-3">
                {item.expression}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[9px]">
                <span className="text-slate-500">EXISTENTIAL FOCUS</span>
                <span className="text-[#00F2FE] font-semibold">{item.focus}</span>
              </div>
            </div>
          );
        })}
      </div>

      {activeIdx !== null && (
        <div className="p-5 border-t border-white/10 bg-black/50 flex items-start space-x-4">
          <div className="text-2xl shrink-0 mt-1">{data[activeIdx].illustration}</div>
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] text-[#00F2FE] font-bold block uppercase tracking-widest">
              Analytical Cognitive Deep-Dive
            </span>
            <p className="font-sans text-xs leading-relaxed text-slate-300">
              {data[activeIdx].mechanic}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. Technology Future Scenarios (Ch 7.14)
// ==========================================
export const FutureScenariosMatrix: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<number | null>(0);

  const scenarios = [
    {
      title: "Biological Monopoly",
      technical: "Silicon consciousness proves impossible; the biological boundary remains absolute.",
      philosophical: "AI remains an unconscious automation; mind uploading fails due to biological limits.",
      grade: "LOW PROBABILITY",
      icon: "🔒",
      relevance: "Supports Substance Dualists and strict Biological Materialists. Consciousness is seen as an un-computable, complex property of cellular carbon mechanics. Neural technology remains limited to assistive bypass channels."
    },
    {
      title: "Synthetic Awakening",
      technical: "Autonomous artificial consciousness emerges within advanced neuromorphic networks.",
      philosophical: "Humanity shares the planet with synthetic minds, forcing a crisis over machine rights.",
      grade: "MODERATE PROBABILITY",
      icon: "🤖",
      relevance: "Supports Functionalism and Integrated Information Theory (IIT). Once integrated networks cross threshold connectivity scales (Phi), synthetic subjective awareness ignites natively, demanding immediate legal personhood."
    },
    {
      title: "Substrate Migration",
      technical: "Mind uploading achieves high-fidelity connectome emulation.",
      philosophical: "Biological mortality becomes optional; humans achieve digital continuity and immortality.",
      grade: "HIGHLY RELEVANT",
      icon: "🌌",
      relevance: "Supports Locke's Psychological Continuity Model. High-resolution connectome scans map all 100 trillion synapses. When executed on neuromorphic hardware, individual memory, personality, and agency are successfully re-instantiated."
    },
    {
      title: "Symbiotic Evolution",
      technical: "Humans and AI merge into distributed, hybrid cognitive systems.",
      philosophical: "The division between human and machine dissolves, leading to posthuman hive consciousness.",
      grade: "LONGER HORIZON",
      icon: "🧬",
      relevance: "Gradual, modular replace-and-upgrade migration of brain regions with cybernetic implants. This bypasses the duplication paradox entirely, preserving uninterrupted, un-divided first-person subjective awareness."
    }
  ];

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/40">
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Check className="text-[#00F2FE]" size={16} />
          <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">
            SUBSTRATE_EVOLUTIONARY_SCENARIOS
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#00F2FE]/70 font-semibold uppercase">
          CH_07_FUTURES
        </span>
      </div>

      <div className="divide-y divide-white/10 bg-black/20">
        {scenarios.map((sc, idx) => {
          const isActive = activeScenario === idx;
          return (
            <div
              key={idx}
              className={`transition-all duration-300 cursor-pointer ${
                isActive ? "bg-white/5 border-l-2 border-[#00F2FE]" : "hover:bg-white/5 border-l-2 border-transparent"
              }`}
              onClick={() => setActiveScenario(isActive ? null : idx)}
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-xl shrink-0">{sc.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-slate-500 font-bold uppercase">
                      {sc.grade}
                    </span>
                    <span className="font-sans text-xs font-bold text-[#00F2FE] uppercase tracking-wide">
                      {sc.title}
                    </span>
                  </div>
                </div>
                <div className="font-sans text-xs text-slate-300 md:col-span-2">
                  {sc.technical}
                </div>
                <div className="font-sans text-xs text-slate-400 italic">
                  {sc.philosophical}
                </div>
              </div>

              {isActive && (
                <div className="px-4 pb-4 pt-1 border-t border-white/10 bg-black/40">
                  <div className="p-3.5 rounded-lg border border-[#00F2FE]/20 bg-[#00F2FE]/5 flex items-start space-x-3">
                    <Activity className="text-[#00F2FE] shrink-0 mt-0.5" size={14} />
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#00F2FE] font-bold block uppercase tracking-wider">
                        Cognitive Evolutionary Repercussions
                      </span>
                      <p className="font-sans text-xs leading-relaxed text-slate-300">
                        {sc.relevance}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
