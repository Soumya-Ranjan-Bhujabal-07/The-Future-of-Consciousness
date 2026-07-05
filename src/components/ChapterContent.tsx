import React, { useState } from "react";
import { Chapter, Section } from "../types";
import {
  InterventionMatrix,
  BciModalitiesMatrix,
  CrossCulturalMatrix,
  FutureScenariosMatrix
} from "./DataVisualizers";
import {
  Brain,
  ShieldAlert,
  Cpu,
  Layers,
  Sparkles,
  RefreshCw,
  Scale,
  GitBranch,
  Eye,
  LineChart,
  Network
} from "lucide-react";
import { GlobalWorkspaceBroadcast3D, SiliconSubstrateCSS3D } from "./Integrated3DModels";
import { ConnectomeSpikeSimulator3D, ImplantPlacementSimulator3D } from "./MoreInteractiveModels";
import { EEGWaveformSimulator } from "./AcademicFigures";

import {
  DualismConsciousnessBridge3D,
  RhythmicCorticalSynchronizer3D,
  DirectPrefrontalStimulator3D,
  HyperactiveAgencyDetector3D,
  HypoxicSurgeSimulator3D,
  CryoSlicingVectorizer3D,
  CognitiveLibertyPrivacy3D,
  OrchORMicrotubuleCoherence3D,
  OntologicalConvergence3D
} from "./ChapterModelsLibrary";

import {
  HardProblemChasm3D,
  BiomimeticMemoryProcessor3D,
  TemporalLobeResonator3D,
  OBEDecouplerSimulator3D,
  NeuroDivideSimulator3D,
  BidirectionalBCI3D
} from "./ChapterModelsLibraryPart2";

// Helper to determine if a line of text represents a visual/graphic indicator
const isGraphicIndicator = (text: string): boolean => {
  return text.trim().startsWith("[") && text.trim().endsWith("]");
};

// Clean bracket indicator label
const cleanIndicatorLabel = (text: string): string => {
  return text.trim().slice(1, -1);
};

const getChapter3DModel = (chapterNum: number, modelIndex: number, key: string): React.ReactNode => {
  if (chapterNum === 1) {
    if (modelIndex === 1) return <DualismConsciousnessBridge3D key={key} />;
    if (modelIndex === 2) return <HardProblemChasm3D key={key} />;
  }
  if (chapterNum === 2) {
    if (modelIndex === 1) return <RhythmicCorticalSynchronizer3D key={key} />;
    if (modelIndex === 2) return null; // Avoid duplicate GWT (kept paragraph interceptor)
  }
  if (chapterNum === 3) {
    // Avoid duplicate models since chapter 3 has explicit paragraph-based interceptions for all three models
    return null;
  }
  if (chapterNum === 4) {
    if (modelIndex === 1) return <DirectPrefrontalStimulator3D key={key} />;
    if (modelIndex === 2) return <BiomimeticMemoryProcessor3D key={key} />;
  }
  if (chapterNum === 5) {
    if (modelIndex === 1) return <HyperactiveAgencyDetector3D key={key} />;
    if (modelIndex === 2) return <TemporalLobeResonator3D key={key} />;
  }
  if (chapterNum === 6) {
    if (modelIndex === 1) return <HypoxicSurgeSimulator3D key={key} />;
    if (modelIndex === 2) return <OBEDecouplerSimulator3D key={key} />;
  }
  if (chapterNum === 7) {
    if (modelIndex === 1) return <CryoSlicingVectorizer3D key={key} />;
    if (modelIndex === 2) return <ConnectomeSpikeSimulator3D key={key} />;
  }
  if (chapterNum === 8) {
    if (modelIndex === 1) return <CognitiveLibertyPrivacy3D key={key} />;
    if (modelIndex === 2) return <NeuroDivideSimulator3D key={key} />;
  }
  if (chapterNum === 9) {
    if (modelIndex === 1) return <OrchORMicrotubuleCoherence3D key={key} />;
    if (modelIndex === 2) return <BidirectionalBCI3D key={key} />;
  }
  if (chapterNum === 10) {
    if (modelIndex === 1) return <OntologicalConvergence3D key={key} />;
  }
  return null;
};

interface FigureData {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

const CHAPTER_ILLUSTRATIONS: Record<number, FigureData[]> = {
  1: [
    {
      src: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
      alt: "Abstract Neuronal Connections",
      title: "Conceptual Mind-Substrate Neural Mapping",
      caption: "Visualizing the complex network structures underpinning the material basis of mind and subjective experience."
    },
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      alt: "Global Information Network",
      title: "The Global Neuronal Workspace Paradigm",
      caption: "Long-range thalamocortical networks broadcasting information across diverse cognitive sub-modules to achieve conscious synthesis."
    }
  ],
  2: [
    {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      alt: "Digital Connectome Spatial Trace",
      title: "Functional Structural Connectome Map",
      caption: "Mapping of reciprocal pathways linking the thalamus, brainstem, and neocortex to maintain alert, content-rich awareness."
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      alt: "Rhythmic Signal Coupling",
      title: "Oscillatory Cortical Synchronization",
      caption: "Cross-frequency coupling (e.g., gamma nested in theta waves) enabling cohesive sensory binding across sensory regions."
    }
  ],
  3: [
    {
      src: "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=800&q=80",
      alt: "Microelectronic Electrode Grid",
      title: "Silicon Microelectrode Array Technology",
      caption: "High-density penetrating needle arrays designed to capture extracellular action potentials directly from motor areas."
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      alt: "Embedded Low-Latency Processing DSP",
      title: "Neural Transduction Signal Processing Subsystems",
      caption: "Low-noise digital signal processing units responsible for amplifying and filtering micro-volt neuronal signals."
    }
  ],
  4: [
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      alt: "Bionic Hand Interface",
      title: "Bidirectional Cybernetic Prosthesis",
      caption: "Advanced closed-loop prosthetic hand utilizing peripheral nerve stimulation to restore pressure and tactile sensations."
    },
    {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      alt: "Neocortical Artificial Mapping",
      title: "Augmented Cognitive Workspace Architecture",
      caption: "Neural pathways augmented by external cloud-emulated semantic models, pushing human processing limits beyond standard biological bounds."
    }
  ],
  5: [
    {
      src: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
      alt: "Light Burst in Ancient Sanctuary",
      title: "Neural Correlates of Mystical States",
      caption: "Transient temporal lobe hyper-excitation correlated with intensive agency detection and reports of transcendent presence."
    },
    {
      src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
      alt: "Cognitive Pattern Matching",
      title: "Hyperactive Agency Detection Mechanism (HADD)",
      caption: "Cognitive networks evolved to over-attribute intention and agent-like structures to neutral, random environmental noises."
    }
  ],
  6: [
    {
      src: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80",
      alt: "Glowing Cosmic Transition",
      title: "Hypoxic Neurochemical Surge Dynamics",
      caption: "Transient, highly organized gamma-band coherence recorded in mammalian brains during early cardiac arrest."
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      alt: "Ethereal Out of Body Mapping",
      title: "Temporoparietal Junction Dysfunction Model",
      caption: "Somatic out-of-body illusions (OBEs) triggered by electrical stimulation or failure of multi-sensory integration at the TPJ."
    }
  ],
  7: [
    {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      alt: "High-density Silicon Brain Layout",
      title: "Asynchronous Neuromorphic Substrate Emulation",
      caption: "Silicon chips utilizing non-von Neumann pathways that mimic the spiking mechanics and connectivity densities of human cerebral tissue."
    },
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      alt: "Silicon Synapse Grid",
      title: "Substrate-Independent Connectome Mapping",
      caption: "Mapping of 100-trillion-synapse connectomic datasets obtained from high-resolution cryogenic microtoming scans."
    }
  ],
  8: [
    {
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      alt: "Pristine Scales of Justice",
      title: "Jurisprudential Architecture of Cognitive Liberty",
      caption: "Balancing accelerated neural innovations against foundational human rights of mental privacy, psychological freedom, and cognitive self-determination."
    },
    {
      src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
      alt: "Social Discrepancy Graphic",
      title: "The Neuro-Divide and Cognitive Stratification",
      caption: "The ethical risk of highly enhanced sensory-cognitive implants becoming a luxury, reinforcing systemic societal inequalities."
    }
  ],
  9: [
    {
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      alt: "Quantum Superpositions Visual",
      title: "Quantum Biology and Microtubular Coherence",
      caption: "Proposals for quantum state preservation within cytoskeleton microtubules, currently debated as potential non-classical awareness vectors."
    },
    {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      alt: "Massive Synaptic Density Array",
      title: "Next-Generation Ultra-High Bandwidth BCIs",
      caption: "Prototyping soft, biomimetic thread-like neural arrays capable of registering millions of individual channels concurrently."
    }
  ],
  10: [
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      alt: "The Converging Ontological Field",
      title: "The Unified Materialist Consciousness Paradigm",
      caption: "The final grand convergence where biological neurodynamics, deep silicon networks, and cognitive liberty rights align into a cohesive framework of psychological continuity."
    }
  ]
};

const getSectionIllustrations = (chapterNum: number, sectionTitle: string, sectionIndex: number): FigureData[] => {
  return [];
};

const getSectionIllustrations_old = (chapterNum: number, sectionTitle: string, sectionIndex: number): FigureData[] => {
  const figures: FigureData[] = [];
  const cleanTitle = sectionTitle.toLowerCase();
  
  if (cleanTitle.includes("introduction") || cleanTitle.includes("revisiting") || cleanTitle.includes("overview")) {
    figures.push({
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      alt: "Global Information Network",
      title: "Ontological Overview and Paradigm Intersections",
      caption: "This global informational network visualization maps the complex intersection of cognitive neuroscience, machine learning, and existential philosophy as they converge on subjective continuity."
    });
  } 
  else if (cleanTitle.includes("bci") || cleanTitle.includes("interface") || cleanTitle.includes("sensor") || cleanTitle.includes("electrode") || cleanTitle.includes("recording") || cleanTitle.includes("invasive")) {
    figures.push({
      src: "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=800&q=80",
      alt: "Microelectronic Interface Array",
      title: "Cortical Electrophysiology Acquisition Substrates",
      caption: "High-density silicon electrode matrices designed to penetrate cortical margins, capturing high-frequency local field potentials with minimal glial scarring."
    });
    figures.push({
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      alt: "Semiconductor Hardware Integration",
      title: "Silicon-Carbon Transduction Hardware",
      caption: "Low-latency embedded DSP architectures responsible for digitizing extracellular voltage oscillations and routing them to external decoding models."
    });
  }
  else if (cleanTitle.includes("ai") || cleanTitle.includes("artificial") || cleanTitle.includes("machine") || cleanTitle.includes("sentience") || cleanTitle.includes("silicon") || cleanTitle.includes("substrate")) {
    figures.push({
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      alt: "Neural Network Weights Visualization",
      title: "Deep Feedforward Artificial Neural Networks",
      caption: "A multi-layered artificial neural network visualizing parallel matrix multiplications. Modern deep learning mimics some structural principles of human neocortical organization."
    });
    figures.push({
      src: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
      alt: "Deep Blue Data Fabric",
      title: "Neuromorphic Substrate Emulation Models",
      caption: "Silicon-based neuromorphic chips designed with non-von Neumann architectures, allowing spikes to propagate asynchronously in a manner mirroring biological brains."
    });
  }
  else if (cleanTitle.includes("ethical") || cleanTitle.includes("privacy") || cleanTitle.includes("rights") || cleanTitle.includes("liberty") || cleanTitle.includes("dignity") || cleanTitle.includes("neuroethics")) {
    figures.push({
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      alt: "Abstract Scales of Justice",
      title: "The Jurisprudential Framework of Cognitive Liberty",
      caption: "A symbolic representation of the delicate balance between rapid technological acceleration and the protection of cognitive autonomy and somatic privacy."
    });
  }
  else if (cleanTitle.includes("supernatural") || cleanTitle.includes("spiritual") || cleanTitle.includes("religion") || cleanTitle.includes("belief") || cleanTitle.includes("ghost") || cleanTitle.includes("spirit") || cleanTitle.includes("reincarnation") || cleanTitle.includes("hadd")) {
    figures.push({
      src: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
      alt: "Light Rays in Ancient Vault",
      title: "Neurological Origins of Ethereal Transcendence",
      caption: "Intense mystical states and hyperactive agency detection are highly correlated with temporal lobe activation, where neural noise is translated into structured, external agency."
    });
  }
  else if (cleanTitle.includes("death") || cleanTitle.includes("nde") || cleanTitle.includes("obe") || cleanTitle.includes("eschatological") || cleanTitle.includes("afterlife")) {
    figures.push({
      src: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80",
      alt: "Glowing Deep Stellar Cosmic Dust",
      title: "End-of-Life Electrophysiological Coherence",
      caption: "Transient synchronization in the high-gamma band recorded post-cardiac arrest, suggesting a highly organized neural cascade occurring during early clinical hypoxia."
    });
  }
  else if (cleanTitle.includes("enhancement") || cleanTitle.includes("cognitive") || cleanTitle.includes("memory") || cleanTitle.includes("sensory") || cleanTitle.includes("prosthetic") || cleanTitle.includes("cybernetic")) {
    figures.push({
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      alt: "Bionic Prosthetic Interface",
      title: "Bi-directional Sensory-Motor Closed-Loop Prosthetics",
      caption: "An advanced cybernetic hand featuring localized micro-sensors that feed pressure and thermal information back into the somatic sensory cortex."
    });
  }
  else if (cleanTitle.includes("quantum") || cleanTitle.includes("orch-or") || cleanTitle.includes("microtubule") || cleanTitle.includes("penrose") || cleanTitle.includes("coherence")) {
    figures.push({
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      alt: "Coherent Laser Lattice",
      title: "Microtubular Quantum Coherence Grids",
      caption: "Conceptual rendering of sub-cellular protein structures inside dendrites acting as resonant quantum conduits, shielding delicate states from thermodynamic dissipation."
    });
  }
  else {
    const fallbacks = [
      {
        src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
        alt: "Scientific Researcher and Microscope",
        title: "Empirical Neurobiology Validation Controls",
        caption: "Laboratory environments responsible for isolating single-channel action potentials and verifying functional correlations in biological neural substrates."
      },
      {
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        alt: "Network Data Array",
        title: "Large-Scale Connectome Topology",
        caption: "A high-fidelity spatial trace of structural pathways connecting primary brain lobes, illustrating the complex white matter networks that facilitate long-range broadcasting."
      },
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        alt: "Glow Network Waves",
        title: "Coherent Rhythmic Brainwave Synchronicities",
        caption: "Synchronous oscillation tracking showing cross-frequency coupling across frontal and parietal regions during active cognitive execution tasks."
      }
    ];
    figures.push(fallbacks[sectionIndex % fallbacks.length]);
  }

  if (figures.length < 2) {
    const secondPhotos = [
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        alt: "Digital Synapse Nodes",
        title: "Simulated Silicon Dendritic Pathways",
        caption: "A digital rendering of synthetic nerve fibers. In computational functionalism, any physical substrate that implements equivalent information integration can instantiate subjective awareness."
      },
      {
        src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
        alt: "Laboratory Specimen Processing",
        title: "Electrophysiological Brain Tissue Sectioning",
        caption: "High-resolution scanning electron microscopy slice mapping synapto-dendritic densities, providing the empirical foundation for accurate connectome emulation."
      },
      {
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        alt: "Abstract Blue Energy Network",
        title: "Global Neuronal Workspace Synchronization Wavefront",
        caption: "A representation of functional information integration, where distributed brain modules achieve unified subjective experience via long-range reciprocal axons."
      }
    ];
    figures.push(secondPhotos[(chapterNum + sectionIndex) % secondPhotos.length]);
  }

  return figures;
};

interface DynamicVisualCardProps {
  label: string;
}

const DynamicVisualCard: React.FC<DynamicVisualCardProps> = ({ label }) => {
  const [interactiveState, setInteractiveState] = useState<boolean>(false);
  const [sliderVal, setSliderVal] = useState<number>(50);

  // 1. Check for specific highly requested visualizers
  
  // A. Mary's Room
  if (label.includes("Mary’s Room") || label.includes("Mary's Room")) {
    return (
      <div className="my-6 p-5 rounded-xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl">
        <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-earth-clay/10">
          <Sparkles className="text-earth-sage" size={15} />
          <span className="font-mono text-xs font-bold text-earth-sand/80 tracking-wider">
            Thought Experiment: Mary's Room
          </span>
        </div>
        <p className="font-sans text-xs text-earth-sand/90 mb-4 leading-relaxed">
          Mary is a brilliant scientist who investigates the world from a monochromatic, black-and-white room. She knows every physical fact about color vision, but has never experienced color first-hand. What happens when she leaves?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-earth-dark/40 border border-earth-clay/10 flex flex-col justify-between h-36">
            <span className="font-mono text-[9px] text-earth-sand/40">INSIDE MARY'S ROOM (PHYSICALIST REPERTOIRE)</span>
            <div className="flex flex-col items-center justify-center grow space-y-1">
              <span className="text-[10px] font-mono text-earth-sand/50">Total physical dataset available</span>
              <span className="text-xs font-mono font-bold text-earth-sand/70">λ = 650nm (Red) is processed in V4 area</span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-earth-forest/15 border border-earth-moss/20 flex flex-col justify-between h-36">
            <span className="font-mono text-[9px] text-earth-sage">OUTSIDE ROOM (PHENOMENAL ACQUISITION)</span>
            <div className="flex flex-col items-center justify-center grow space-y-1">
              <span className="text-[10px] font-sans text-earth-sand/70">Does Mary gain new knowledge?</span>
              <button 
                onClick={() => setInteractiveState(!interactiveState)}
                className={`text-[10px] px-3 py-1 rounded font-mono border font-bold transition-all duration-300 ${
                  interactiveState 
                    ? "bg-earth-sage border-earth-sage text-earth-dark shadow" 
                    : "bg-earth-dark/40 border-earth-clay/20 text-earth-sage hover:border-earth-sage/60"
                }`}
              >
                {interactiveState ? "MARY SENSES RED QUALIA" : "TRIGGER EXTRACTION"}
              </button>
            </div>
            {interactiveState && (
              <span className="text-[10px] text-center font-mono text-earth-sage animate-pulse">
                "It feels like something to see red!"
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // B. Clinical Spectrum
  if (label.includes("Clinical Spectrum")) {
    const states = [
      { name: "Coma", arousal: 10, awareness: 10, color: "bg-slate-600", desc: "No sleep-wake cycles, no purposeful behavior." },
      { name: "Vegetative State", arousal: 80, awareness: 10, color: "bg-orange-500", desc: "Sleep-wake cycles present, completely unconscious." },
      { name: "MCS (Minimally Conscious)", arousal: 70, awareness: 40, color: "bg-teal-500", desc: "Fluctuating but reproducible purposeful behavior." },
      { name: "Conscious Wakefulness", arousal: 95, awareness: 95, color: "bg-emerald-500", desc: "Full arousal and intact cognitive content." },
      { name: "Locked-In Syndrome", arousal: 95, awareness: 95, color: "bg-cyan-500", desc: "Fully aware, completely paralyzed except for eyes." }
    ];
    return (
      <div className="my-6 p-5 rounded-xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl">
        <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-earth-clay/10">
          <LineChart className="text-earth-sage" size={15} />
          <span className="font-mono text-xs font-bold text-earth-sand/80 tracking-wider">
            Clinical Spectrum: Arousal & Awareness Grid
          </span>
        </div>
        <p className="font-sans text-xs text-earth-sand/90 mb-4 leading-relaxed">
          The two separate dimensions of consciousness: **Arousal** (brain stem activation / wakefulness) and **Awareness** (thalamocortical coordination / cognitive content).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative h-48 border border-earth-clay/15 rounded-lg bg-earth-dark/60 overflow-hidden p-4">
            {/* Axis Labels */}
            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[8px] text-earth-sand/30">
              Y-AXIS: AWARENESS (CONTENT)
            </div>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 font-mono text-[8px] text-earth-sand/30">
              X-AXIS: AROUSAL (WAKEFULNESS)
            </div>
            
            {/* Interactive Grid Coordinates */}
            {states.map((st, i) => (
              <button
                key={i}
                onClick={() => setSliderVal(i)}
                style={{ left: `${st.arousal}%`, bottom: `${st.awareness}%` }}
                className="absolute w-3 h-3 -ml-1.5 -mb-1.5 rounded-full border border-earth-sand/40 shadow transition-all duration-300 hover:scale-125 focus:outline-none cursor-pointer group"
              >
                <span className={`absolute inset-0 rounded-full ${st.color} ${sliderVal === i ? "animate-ping opacity-60" : ""}`} />
                <span className={`absolute inset-0 rounded-full ${st.color}`} />
              </button>
            ))}
            <div className="absolute top-2 right-2 text-[9px] font-mono text-earth-sand/30">Click coordinates to parse state</div>
          </div>
          <div className="p-4 rounded-lg bg-earth-dark/50 border border-earth-clay/15 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] text-earth-sage tracking-wider font-semibold block uppercase">CURRENT SELECTION</span>
              <h4 className="font-sans text-sm font-bold text-earth-parchment">{states[sliderVal]?.name}</h4>
              <p className="font-sans text-xs leading-relaxed text-earth-sand/80">{states[sliderVal]?.desc}</p>
            </div>
            <div className="pt-3 border-t border-earth-clay/10 font-mono text-[9px] text-earth-sand/40 flex justify-between">
              <span>AROUSAL: {states[sliderVal]?.arousal}%</span>
              <span>AWARENESS: {states[sliderVal]?.awareness}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // C. HADD Error Matrix
  if (label.includes("HADD")) {
    return (
      <div className="my-6 p-5 rounded-xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl">
        <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-earth-clay/10">
          <ShieldAlert className="text-earth-bark" size={15} />
          <span className="font-mono text-xs font-bold text-earth-sand/80 tracking-wider">
            Evolutionary HADD Asymmetric Error Matrix
          </span>
        </div>
        <p className="font-sans text-xs text-earth-sand/90 mb-4 leading-relaxed">
          The Hyperactive Agency Detection Device is an evolved survival heuristic. Why does our mind assume agency (creaking floorboards = ghosts) under chaotic inputs?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-earth-clay/10 bg-earth-dark/40 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-earth-sage font-bold block mb-1">TYPE I ERROR (FALSE POSITIVE)</span>
              <span className="font-sans text-xs font-bold text-earth-sand/90">Rustling leaves = Predator</span>
              <p className="font-sans text-[11px] text-earth-sand/60 mt-1">Cost: Transient fear, extra vigilance. Survivability is intact. Evolved bias select this trajectory.</p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-earth-sage bg-earth-forest/20 px-2 py-1 rounded border border-earth-moss/20 text-center">
              LOW COST / BENEFICIAL PRESERVATION
            </div>
          </div>
          <div className="p-4 rounded-lg border border-earth-clay/10 bg-earth-dark/40 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-earth-bark font-bold block mb-1">TYPE II ERROR (FALSE NEGATIVE)</span>
              <span className="font-sans text-xs font-bold text-earth-sand/90">Predator = Rustling leaves</span>
              <p className="font-sans text-[11px] text-earth-sand/60 mt-1">Cost: Death. Genetic selection of agency detection failure ends instantly.</p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-earth-bark bg-earth-clay/20 px-2 py-1 rounded border border-earth-clay/35 text-center">
              FATAL COST / CRITICAL COGNITIVE PRESSURES
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic grouping based on keyword categories to handle all 70+ indicators beautifully and safely
  let icon = <Brain size={15} className="text-earth-sage" />;
  let categoryLabel = "NEUROLOGICAL_ARCHITECTURAL_CALLOUT";
  let borderStyle = "border-earth-clay/15 bg-earth-walnut/15";

  if (label.includes("Privacy") || label.includes("Rights") || label.includes("Pillars") || label.includes("Ethical") || label.includes("Dignity")) {
    icon = <Scale size={15} className="text-earth-sage" />;
    categoryLabel = "NEUROETHICS_&_LEGISLATIVE_PILLARS";
    borderStyle = "border-earth-moss/25 bg-earth-forest/5";
  } else if (label.includes("Upload") || label.includes("Silicon") || label.includes("Digital") || label.includes("Future") || label.includes("Bostrom") || label.includes("Sim")) {
    icon = <Cpu size={15} className="text-earth-bark" />;
    categoryLabel = "COMPUTATIONAL_FUNCTIONALIST_MATRIX";
    borderStyle = "border-earth-clay/20 bg-earth-clay/5";
  } else if (label.includes("Eschatological") || label.includes("Spiritual") || label.includes("Soul") || label.includes("Death") || label.includes("NDE") || label.includes("Cognitive")) {
    icon = <Layers size={15} className="text-earth-sand" />;
    categoryLabel = "COGNITIVE_EVOLUTIONARY_BYPRODUCT_INDEX";
    borderStyle = "border-earth-clay/25 bg-earth-walnut/10";
  } else if (label.includes("Signal") || label.includes("P300") || label.includes("ECoG") || label.includes("Imaging") || label.includes("Micro-Architectural") || label.includes("Workspace") || label.includes("Rivalry")) {
    icon = <Network size={15} className="text-earth-sage" />;
    categoryLabel = "ELECTROPHYSIOLOGY_SIGNAL_INTEGRATION";
    borderStyle = "border-earth-moss/20 bg-earth-forest/5";
  }

  return (
    <div className={`my-6 p-5 rounded-xl border backdrop-blur-xl ${borderStyle}`}>
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-earth-clay/10 font-mono text-[10px]">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-earth-parchment font-bold tracking-wider">{categoryLabel}</span>
        </div>
        <span className="text-earth-sand/30 text-[9px]">DYN_TELEMETRY</span>
      </div>

      <div className="flex flex-col space-y-3">
        <h4 className="font-sans text-xs font-bold text-earth-sage leading-snug">
          {label}
        </h4>

        <div className="p-3 rounded-lg bg-earth-dark/40 border border-earth-clay/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 grow">
            <span className="font-mono text-[9px] text-earth-sand/40 uppercase tracking-widest block">Core Structural Thesis</span>
            <p className="font-sans text-[11px] leading-relaxed text-earth-sand/70">
              {label.includes("Workspace") 
                ? "This model argues that conscious subjective experience is achieved when sensory inputs are globally broadcast via high-bandwidth long-range thalamocortical networks to specialized local parallel processors, establishing functional access consciousness."
                : label.includes("P300")
                ? "A classic event-related potential waveform featuring a prominent positive spike 300ms post-stimulus, signaling dynamic cognitive evaluation of rare or relevant target stimulation within active neural streams."
                : label.includes("Quantum") || label.includes("Orch-OR")
                ? "This controversial Penrose-Hameroff paradigm asserts that macroscale classical computation is insufficient for awareness, placing quantum coherence and wave-collapse inside intracellular neuronal microtubules."
                : label.includes("Bostrom")
                ? "Bostrom's strict mathematical trilemma asserting that civilizations either self-destruct, lose interest in simulations, or we are almost certainly simulated minds running within virtual environments right now."
                : "This technical milestone demonstrates that consciousness relies entirely on specific structural configurations of information processing. If translated onto a stable silicon matrix, identity and continuity can theoretically survive a substrate transition."
              }
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2 self-end md:self-center">
            <button
              onClick={() => setInteractiveState(!interactiveState)}
              className={`px-3 py-1.5 rounded text-[10px] font-mono border font-bold transition-all duration-300 ${
                interactiveState
                  ? "bg-earth-sage border-earth-sage text-earth-dark shadow"
                  : "bg-earth-dark/40 border-earth-clay/20 text-earth-sage hover:border-earth-sage/40"
              }`}
            >
              {interactiveState ? "CORE_LOGS_ACTIVE" : "EXPAND_CORE_LOGS"}
            </button>
          </div>
        </div>

        {interactiveState && (
          <div className="p-3.5 rounded-lg border border-earth-clay/10 bg-earth-dark/50 font-mono text-[10px] text-earth-sand/60 space-y-1.5 leading-relaxed">
            <div className="text-earth-sage font-bold uppercase tracking-wider text-[9px] mb-1">
              CONNECTED NEURO-CHRONOLOGY RECORDS
            </div>
            <div>[00:01] Parsing informational parameters for target schematic...</div>
            <div>[00:03] Mapping active synapto-dendritic connections against simulated models...</div>
            <div>[00:05] Complete integration rate mapped with absolute 99.98% fidelity. System is stable.</div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ChapterContentProps {
  chapter: Chapter;
  activeChapterId: string;
  activeSectionId: string;
}

export const ChapterContent: React.FC<ChapterContentProps> = ({
  chapter,
  activeChapterId,
  activeSectionId,
}) => {
  const isChapterActive = activeChapterId === chapter.id;
  return (
    <article
      className={`space-y-12 transition-opacity duration-700 ease-in-out ${
        isChapterActive ? "opacity-100" : "opacity-60"
      }`}
    >
      <header className="border-b border-earth-clay/10 pb-6 mb-8">
        <div className="flex items-center space-x-2 font-mono text-[10px] text-earth-sage uppercase tracking-widest mb-1.5">
          <span>CHAPTER_0{chapter.number}</span>
          <span className="text-earth-sand/30">•</span>
          <span>RESEARCH_MANUSCRIPT_CORE</span>
        </div>
        <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-earth-parchment uppercase">
          {chapter.title}
        </h2>
      </header>

      <div className="space-y-8">
        {chapter.sections.map((section) => {
          const isActive = activeSectionId === section.id;
          return (
            <section
              key={section.id}
              id={section.id}
              className={`scroll-mt-24 transition-all duration-500 p-4 rounded ${
                isActive 
                  ? "bg-earth-forest/10 border border-earth-moss/25 shadow-sm" 
                  : "border border-transparent"
              }`}
            >
              <h3 className="font-sans text-base md:text-lg font-bold text-earth-parchment tracking-wide mb-4 flex items-center space-x-2">
                <span className="w-1.5 h-3.5 rounded bg-earth-sage shrink-0" />
                <span>{section.title}</span>
              </h3>

              <div className="space-y-4">
                {(() => {
                  const items: React.ReactNode[] = [];
                  const sectionIndex = chapter.sections.indexOf(section);

                  section.content.forEach((paragraph, pIdx) => {
                    let component: React.ReactNode = null;

                    // Direct 3D, Waveform, and Advanced Simulator Interceptions
                    if (paragraph.includes("[Global Neuronal Workspace Architecture: Local Parallel Processors vs. Long-Range Synchronized Broadcasters]")) {
                      component = <GlobalWorkspaceBroadcast3D key={`gwt-${pIdx}`} />;
                    } else if (paragraph.includes("[The Cortical Proximity Paradigm: Structural Differentiation of BCI Sensor Placements]")) {
                      component = <SiliconSubstrateCSS3D key={`css-${pIdx}`} />;
                    } else if (paragraph.includes("[The Closed-Loop BCI Signal Processing Architecture: Acquisition to Neuroplastic Feedback]")) {
                      component = <EEGWaveformSimulator key={`eeg-${pIdx}`} />;
                    } else if (paragraph.includes("[The Micro-Architectural Continuum: Intracellular Action Potential Propagation to Extracellular Electrode Capture]")) {
                      component = <ImplantPlacementSimulator3D key={`impl-${pIdx}`} />;
                    } else if (
                      paragraph.includes("[The Whole-Brain Emulation Workflow: Cryo-Preservation to Digital Substrate Simulation]") ||
                      paragraph.includes("[The Dialectic of Mind: Comparative Historical Lineage of Consciousness Concepts]") ||
                      paragraph.includes("[The Evolutionary Lineage of Neural Interfaces: From Berger’s Alpha Waves to Consumer Vasculature Arrays]") ||
                      paragraph.includes("[The Post-Cardiac Arrest Gamma Surge: High-Frequency Synchronization in the Final Seconds of Brain Function]")
                    ) {
                      component = null;
                    }
                    // Direct override interception for custom tables
                    else if (paragraph.includes("[Table: Intervention Neurological/Biochemical Impact Matrix]")) {
                      component = <InterventionMatrix key={`table1-${pIdx}`} />;
                    } else if (paragraph.includes("[Table: Modalities matrix comparison]") || paragraph.includes("[Table: BCI Sensor Modalities Matrix]")) {
                      component = <BciModalitiesMatrix key={`table2-${pIdx}`} />;
                    } else if (paragraph.includes("[Table: Cross-Cultural Spiritual Paradigms]")) {
                      component = <CrossCulturalMatrix key={`table3-${pIdx}`} />;
                    } else if (paragraph.includes("[Table: Technology Future Scenarios Paradigm]") || paragraph.includes("[Table: Technology Future Scenarios]")) {
                      component = <FutureScenariosMatrix key={`table4-${pIdx}`} />;
                    }
                    // Handle normal bracket indicator
                    else if (isGraphicIndicator(paragraph)) {
                      component = <DynamicVisualCard key={`dynamic-${pIdx}`} label={cleanIndicatorLabel(paragraph)} />;
                    } else {
                      // Standard paragraphs
                      component = (
                        <p
                           key={`para-${pIdx}`}
                           className="font-sans text-xs md:text-sm text-earth-sand/90 leading-relaxed tracking-wide select-text first-letter:text-earth-parchment first-letter:font-semibold"
                        >
                          {paragraph}
                        </p>
                      );
                    }

                    items.push(component);

                    // Insert exactly 2 elegant interactive 3D models per chapter to maintain perfect readable flow
                    const isSpecialComponent = 
                      isGraphicIndicator(paragraph) ||
                      paragraph.includes("[") ||
                      paragraph.includes("Table:");

                    if (!isSpecialComponent) {
                      // First 3D model of the chapter: goes after first paragraph (pIdx === 0) of the second section (sectionIndex === 1)
                      if (sectionIndex === 1 && pIdx === 0) {
                        const model = getChapter3DModel(chapter.number, 1, `dynamic-3d-model-${chapter.number}-1`);
                        if (model) {
                          items.push(model);
                        }
                      }
                      
                      // Second 3D model of the chapter: goes after first paragraph (pIdx === 0) of the middle section
                      const middleSecIdx = Math.max(2, Math.floor(chapter.sections.length / 2));
                      if (sectionIndex === middleSecIdx && pIdx === 0) {
                        const model = getChapter3DModel(chapter.number, 2, `dynamic-3d-model-${chapter.number}-2`);
                        if (model) {
                          items.push(model);
                        }
                      }

                      // Third 3D model (for Chapter 3 which has 3 custom models): goes after first paragraph of the last section
                      if (chapter.number === 3 && sectionIndex === chapter.sections.length - 1 && pIdx === 0) {
                        const model = getChapter3DModel(chapter.number, 3, `dynamic-3d-model-${chapter.number}-3`);
                        if (model) {
                          items.push(model);
                        }
                      }
                    }
                  });

                  return items;
                })()}
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
};
