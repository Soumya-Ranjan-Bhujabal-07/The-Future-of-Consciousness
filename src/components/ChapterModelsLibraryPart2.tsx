import React, { useEffect, useRef, useState } from "react";
import { Activity, Shield, Cpu, RefreshCw, Zap, Lock, Eye } from "lucide-react";

// ============================================================================
// CHAPTER 1 MODEL 2: Hard Problem Explanatory Chasm 3D
// ============================================================================
export const HardProblemChasm3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [objectiveRes, setObjectiveRes] = useState<number>(40); // %
  const [phenomenalSens, setPhenomenalSens] = useState<number>(50); // %
  const [bridgeFormed, setBridgeFormed] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 200;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#1b1411";
      ctx.fillRect(0, 0, w, h);

      const cy = h / 2;

      // Draw two separate cliffs in 3D perspective representing physical brain vs. subjective experience
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      // Left Cliff: Physicalist brain state grid (Cyan)
      ctx.fillStyle = "#0B1528";
      ctx.beginPath();
      ctx.moveTo(0, cy + 30);
      ctx.lineTo(w * 0.35, cy + 30);
      ctx.lineTo(w * 0.3, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Cliff: Phenomenal qualia cloud (Pink)
      ctx.fillStyle = "#160C20";
      ctx.beginPath();
      ctx.moveTo(w * 0.65, cy + 30);
      ctx.lineTo(w, cy + 30);
      ctx.lineTo(w, h);
      ctx.lineTo(w * 0.7, h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw left cliff neural lattice spikes (Cyan dots + pulses)
      const dotCount = 8;
      ctx.fillStyle = "#92a88e";
      for (let i = 0; i < dotCount; i++) {
        const dx = 20 + (i * (w * 0.3 - 40)) / dotCount;
        const dy = cy + 45 + (i % 3) * 15;
        ctx.beginPath();
        ctx.arc(dx, dy, 2 + Math.sin(t * 0.1 + i) * 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw right cliff subjective qualia colors (Pink/Purple radial gradient)
      const grad = ctx.createRadialGradient(w * 0.82, cy + 55, 5, w * 0.82, cy + 55, 45);
      grad.addColorStop(0, "rgba(207, 125, 97, 0.3)");
      grad.addColorStop(1, "rgba(207, 125, 97, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(w * 0.82, cy + 55, 45, 0, Math.PI * 2);
      ctx.fill();

      // Draw Explanatory Gap / Chasm (The physicalist-to-subjective bridge attempts)
      if (bridgeFormed) {
        ctx.strokeStyle = "rgba(245, 158, 11, 0.8)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w * 0.35, cy + 30);
        ctx.lineTo(w * 0.65, cy + 30);
        ctx.stroke();

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#F59E0B";
        ctx.fillText("EXPLANATORY BRIDGE FORMED", w * 0.38, cy + 18);
      } else {
        // Spark attempts stretching out but falling short
        const sparkLength = (objectiveRes / 100) * (w * 0.15);
        ctx.strokeStyle = "rgba(146, 168, 142, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(w * 0.35, cy + 30);
        ctx.lineTo(w * 0.35 + sparkLength, cy + 30 + Math.sin(t * 0.4) * 8);
        ctx.stroke();

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#cf7d61";
        ctx.fillText("EXPLANATORY GAP", w * 0.44, cy + 45);
      }

      ctx.font = "8px monospace";
      ctx.fillStyle = "#92a88e";
      ctx.fillText("PHYSICAL MECHANISMS [EEG/SPIKES]", 10, cy + 15);
      ctx.fillStyle = "#cf7d61";
      ctx.fillText("FIRST-PERSON SUBJECTIVE QUALIA [BLUE/SAD]", w - 180, cy + 15);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [objectiveRes, phenomenalSens, bridgeFormed]);

  return (
    <div className="my-5 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Zap size={14} className="text-earth-sage" />
          <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase">CHAPTER 1 • MODEL 2</span>
          <h4 className="font-sans text-xs font-bold text-white">David Chalmers' Explanatory Gap Simulator</h4>
        </div>
      </div>
      <div ref={containerRef} className="relative h-44 w-full rounded-xl bg-black/40 overflow-hidden border border-earth-clay/10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[9px]">
        <div className="space-y-1">
          <span className="text-earth-sand/40">OBJECTIVE RESOLUTION</span>
          <input type="range" min="10" max="100" value={objectiveRes} onChange={(e) => setObjectiveRes(parseInt(e.target.value))} className="w-full accent-earth-sage h-1 bg-white/10 rounded" />
        </div>
        <div className="space-y-1">
          <span className="text-earth-sand/40">PHENOMENAL SENSITIVITY</span>
          <input type="range" min="10" max="100" value={phenomenalSens} onChange={(e) => setPhenomenalSens(parseInt(e.target.value))} className="w-full accent-earth-bark h-1 bg-white/10 rounded" />
        </div>
        <button onClick={() => setBridgeFormed(!bridgeFormed)} className={`py-1.5 rounded font-bold border transition-all ${bridgeFormed ? "bg-earth-clay/10 border-amber-500/30 text-earth-bark" : "bg-white/5 border-white/10 text-earth-parchment hover:text-slate-200"}`}>
          {bridgeFormed ? "SEVER EXPLANATORY BRIDGE" : "BRIDGE COGNITIVE GAP"}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 4 MODEL 2: Biomimetic Hippocampal Memory Prosthetic 3D
// ============================================================================
export const BiomimeticMemoryProcessor3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prostheticGain, setProstheticGain] = useState<number>(60); // %
  const [isProcessing, setIsProcessing] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 200;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#1b1411";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw CA3 (input) to CA1 (output) neural loop in 3D
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.stroke();

      // CA3 cluster
      ctx.fillStyle = "#92a88e";
      ctx.beginPath();
      ctx.arc(cx - 50, cy, 7, 0, Math.PI * 2);
      ctx.fill();

      // CA1 cluster
      ctx.fillStyle = "#cfbda8";
      ctx.beginPath();
      ctx.arc(cx + 50, cy, 7, 0, Math.PI * 2);
      ctx.fill();

      // Prosthesis Micro-array bridge (top center)
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.fillRect(cx - 15, cy - 65, 30, 12);
      ctx.fill();

      // Spiking pulses passing through CA3 -> CA1 via prosthesis
      if (isProcessing) {
        const speed = 0.02 + (prostheticGain / 100) * 0.03;
        const progress = (t * speed) % 1.0;
        const angle = progress * Math.PI * 2 - Math.PI;
        const px = cx + Math.cos(angle) * 50;
        const py = cy + Math.sin(angle) * 50;

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#F59E0B";
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.font = "8px monospace";
      ctx.fillStyle = "#92a88e";
      ctx.fillText("INPUT [CA3 PATHWAY]", cx - 110, cy + 20);
      ctx.fillStyle = "#cfbda8";
      ctx.fillText("OUTPUT [CA1 RECALL]", cx + 45, cy + 20);
      ctx.fillStyle = "#F59E0B";
      ctx.fillText("BIOMIMETIC CO-PROCESSOR", cx - 55, cy - 74);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [prostheticGain, isProcessing]);

  return (
    <div className="my-5 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Cpu size={14} className="text-emerald-400" />
          <span className="font-mono text-[9px] text-emerald-400 font-bold block uppercase">CHAPTER 4 • MODEL 2</span>
          <h4 className="font-sans text-xs font-bold text-white">Biomimetic Hippocampal Prosthetic Co-Processor</h4>
        </div>
      </div>
      <div ref={containerRef} className="relative h-44 w-full rounded-xl bg-black/40 overflow-hidden border border-earth-clay/10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[9px]">
        <div className="space-y-1">
          <span className="text-earth-sand/40">PROSTHETIC TRANSDUCTION GAIN</span>
          <input type="range" min="10" max="100" value={prostheticGain} onChange={(e) => setProstheticGain(parseInt(e.target.value))} className="w-full accent-amber-500 h-1 bg-white/10 rounded" />
        </div>
        <button onClick={() => setIsProcessing(!isProcessing)} className={`py-1.5 rounded font-bold border transition-all ${isProcessing ? "bg-earth-clay/10 border-amber-500/30 text-earth-bark" : "bg-white/5 border-white/10 text-earth-parchment hover:text-slate-200"}`}>
          {isProcessing ? "PAUSE PROSTHETIC BYPASS" : "ENGAGE BIOMIMETIC SIGNAL"}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 5 MODEL 2: Temporal Lobe Transcendent Resonator 3D ("God Helmet")
// ============================================================================
export const TemporalLobeResonator3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fieldStrength, setFieldStrength] = useState<number>(75); // %
  const [resonanceHz, setResonanceHz] = useState<number>(8); // Hz (alpha)
  const [isEmitting, setIsEmitting] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 200;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#1b1411";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw 3D wireframe head skull top view
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.stroke();

      // Nose index
      ctx.beginPath();
      ctx.moveTo(cx, cy - 60);
      ctx.lineTo(cx, cy - 70);
      ctx.stroke();

      // Draw Temporal solenoids left/right emitting localized fields
      ctx.fillStyle = "#cf7d61";
      ctx.fillRect(cx - 72, cy - 10, 10, 20); // Left temporal solenoid
      ctx.fillRect(cx + 62, cy - 10, 10, 20); // Right temporal solenoid

      if (isEmitting) {
        // Draw magnetic flux ripples
        const radius = 25 + (t % 35) * 1.5;
        ctx.strokeStyle = `rgba(207, 125, 97, ${Math.max(0, 1.0 - (t % 35)/35) * (fieldStrength / 100)})`;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.arc(cx - 67, cy, radius, -Math.PI/3, Math.PI/3);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx + 67, cy, radius, Math.PI * 0.66, Math.PI * 1.33);
        ctx.stroke();

        // High intensity glowing temporal core indicating transcendent presence sense
        const surgeIntensity = fieldStrength / 100;
        ctx.fillStyle = `rgba(167, 139, 250, ${surgeIntensity * 0.35 * Math.sin(t * (resonanceHz * 0.08))})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#cfbda8";
        ctx.fillText(`TRANSCENDENT PRESENCE MEASURE: ${(fieldStrength * 1.4).toFixed(0)}`, cx - 85, cy + 4);
      }

      ctx.font = "8px monospace";
      ctx.fillStyle = "#cf7d61";
      ctx.fillText("LEFT TEMPORAL COIL", cx - 145, cy + 25);
      ctx.fillText("RIGHT TEMPORAL COIL", cx + 75, cy + 25);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [fieldStrength, resonanceHz, isEmitting]);

  return (
    <div className="my-5 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Eye size={14} className="text-earth-sage" />
          <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase">CHAPTER 5 • MODEL 2</span>
          <h4 className="font-sans text-xs font-bold text-white">Temporal Lobe Magnetic Resonance Simulator ("God Helmet")</h4>
        </div>
      </div>
      <div ref={containerRef} className="relative h-44 w-full rounded-xl bg-black/40 overflow-hidden border border-earth-clay/10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[9px]">
        <div className="space-y-1">
          <span className="text-earth-sand/40">MAGNETIC FIELD FLUX STRENGTH</span>
          <input type="range" min="10" max="100" value={fieldStrength} onChange={(e) => setFieldStrength(parseInt(e.target.value))} className="w-full accent-earth-bark h-1 bg-white/10 rounded" />
        </div>
        <div className="space-y-1">
          <span className="text-earth-sand/40">COIL FREQUENCY RATIO</span>
          <input type="range" min="2" max="20" value={resonanceHz} onChange={(e) => setResonanceHz(parseInt(e.target.value))} className="w-full accent-purple-500 h-1 bg-white/10 rounded" />
        </div>
        <button onClick={() => setIsEmitting(!isEmitting)} className={`py-1.5 rounded font-bold border transition-all ${isEmitting ? "bg-earth-clay/10 border-earth-clay/20 text-earth-sage" : "bg-white/5 border-white/10 text-earth-parchment hover:text-slate-200"}`}>
          {isEmitting ? "STOP TRANSCENDENT INDUCTION" : "ENGAGE RESONANT HELMET"}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 6 MODEL 2: Out-of-Body Temporoparietal Decoupler 3D
// ============================================================================
export const OBEDecouplerSimulator3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [multisensoryAlignment, setMultisensoryAlignment] = useState<number>(80); // %
  const [isDecoupling, setIsDecoupling] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 200;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#1b1411";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw a physical 3D lying body representation (Green)
      ctx.strokeStyle = "rgba(146, 168, 142, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Simple head + body line
      ctx.moveTo(cx - 70, cy + 20);
      ctx.lineTo(cx + 70, cy + 20);
      // limbs
      ctx.moveTo(cx - 70, cy + 20);
      ctx.arc(cx - 75, cy + 20, 5, 0, Math.PI * 2);
      ctx.stroke();

      // Draw the floating mental/astral observer body (Pink/Purple)
      // Separation is inversely proportional to multisensory alignment
      const separation = (100 - multisensoryAlignment) * 0.65;
      const observerY = cy + 20 - separation;

      ctx.strokeStyle = `rgba(207, 125, 97, ${Math.max(0.15, (100 - multisensoryAlignment) / 100)})`;
      ctx.beginPath();
      ctx.moveTo(cx - 70, observerY);
      ctx.lineTo(cx + 70, observerY);
      ctx.moveTo(cx - 70, observerY);
      ctx.arc(cx - 75, observerY, 5, 0, Math.PI * 2);
      ctx.stroke();

      // Connective sensory vectors showing decoupling
      if (multisensoryAlignment < 95) {
        ctx.strokeStyle = "rgba(245, 158, 11, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 75, cy + 20);
        ctx.lineTo(cx - 75, observerY);
        ctx.moveTo(cx + 30, cy + 20);
        ctx.lineTo(cx + 30, observerY);
        ctx.stroke();
      }

      // Overlay text
      ctx.font = "bold 9px monospace";
      if (multisensoryAlignment > 70) {
        ctx.fillStyle = "#92a88e";
        ctx.fillText("TPJ STATUS: MULTI-SENSORY CONGRUENCE", cx - 90, cy - 65);
      } else {
        ctx.fillStyle = "#cf7d61";
        ctx.fillText("TPJ STATUS: VESTIBULAR-VISUAL DECOUPLING ACTIVE", cx - 120, cy - 65);
      }

      ctx.font = "8px monospace";
      ctx.fillStyle = "#92a88e";
      ctx.fillText("PHYSICAL SOMATOSENSORY BODY", cx - 80, cy + 35);
      ctx.fillStyle = "#cf7d61";
      ctx.fillText("FLOATING SUBJECTIVE EGO-CENTER", cx - 80, observerY - 12);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [multisensoryAlignment]);

  return (
    <div className="my-5 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Activity size={14} className="text-earth-sage" />
          <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase">CHAPTER 6 • MODEL 2</span>
          <h4 className="font-sans text-xs font-bold text-white">Temporoparietal Junction Out-of-Body (OBE) Decoupler</h4>
        </div>
      </div>
      <div ref={containerRef} className="relative h-44 w-full rounded-xl bg-black/40 overflow-hidden border border-earth-clay/10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[9px]">
        <div className="space-y-1">
          <span className="text-earth-sand/40">TPJ SENSORY BINDING ALIGNMENT</span>
          <input type="range" min="10" max="100" value={multisensoryAlignment} onChange={(e) => setMultisensoryAlignment(parseInt(e.target.value))} className="w-full accent-[#92a88e] h-1 bg-white/10 rounded" />
        </div>
        <div className="p-2.5 bg-[#0F172A] border border-earth-clay/10 rounded-lg text-earth-sand/70 text-[8.5px] leading-snug font-sans">
          <span>Lowering multi-sensory vestibular-visual alignment simulates clinical hypoxia/TPJ disruption leading to a decoupled first-person perspective.</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 8 MODEL 2: Neuromorphic Cognitive Divide 3D
// ============================================================================
export const NeuroDivideSimulator3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [accessCost, setAccessCost] = useState<number>(85); // %
  const [interfaceBandwidth, setInterfaceBandwidth] = useState<number>(75); // %

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 200;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#1b1411";
      ctx.fillRect(0, 0, w, h);

      const cy = h / 2;

      // Draw baseline unenhanced neural network vs. enhanced high-bandwidth network
      // Left side: baseline population network (Slow, low-density spiking, Slate color)
      const leftCx = w * 0.25;
      ctx.strokeStyle = "rgba(71, 85, 105, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(leftCx, cy, 30, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#475569";
      for (let i = 0; i < 4; i++) {
        const dx = leftCx + Math.cos(i * 1.5) * 20;
        const dy = cy + Math.sin(i * 1.5) * 20;
        ctx.beginPath();
        ctx.arc(dx, dy, t % 40 === i * 10 ? 4 : 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Right side: enhanced co-processed population network (Fast, glowing high density spikes, Gold)
      const rightCx = w * 0.75;
      const divideGap = (accessCost / 100) * 160;

      ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(rightCx, cy, 30, 0, Math.PI * 2);
      ctx.stroke();

      // Glowing co-processor link
      ctx.fillStyle = "#F59E0B";
      const enhancedSpikeSpeed = 1 + Math.floor(interfaceBandwidth / 20);
      for (let i = 0; i < 8; i++) {
        const dx = rightCx + Math.cos(i * 0.8) * 20;
        const dy = cy + Math.sin(i * 0.8) * 20;
        const firing = t % Math.max(3, 15 - enhancedSpikeSpeed) === i % 3;
        ctx.beginPath();
        ctx.arc(dx, dy, firing ? 4.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = firing ? "#F59E0B" : "#B45309";
        ctx.fill();
      }

      // Draw separating boundary wall representing access barriers
      ctx.strokeStyle = `rgba(239, 68, 68, ${accessCost / 100})`;
      ctx.lineWidth = 2 + (accessCost / 100) * 4;
      ctx.beginPath();
      ctx.moveTo(w / 2, 20);
      ctx.lineTo(w / 2, h - 20);
      ctx.stroke();

      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#cf7d61";
      ctx.fillText(`STRATIFICATION DEFIANCE BARRIER: ${divideGap.toFixed(0)}m gap`, w / 2 - 100, cy - 65);

      ctx.font = "8px monospace";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText("BASELINE BIOLOGICAL POPULATION", leftCx - 70, cy + 45);
      ctx.fillStyle = "#F59E0B";
      ctx.fillText("AUGMENTED CO-PROCESSED ELITES", rightCx - 75, cy + 45);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [accessCost, interfaceBandwidth]);

  return (
    <div className="my-5 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Shield size={14} className="text-earth-bark" />
          <span className="font-mono text-[9px] text-earth-bark font-bold block uppercase">CHAPTER 8 • MODEL 2</span>
          <h4 className="font-sans text-xs font-bold text-white">Socioeconomic Cognitive Divide & Stratification Simulator</h4>
        </div>
      </div>
      <div ref={containerRef} className="relative h-44 w-full rounded-xl bg-black/40 overflow-hidden border border-earth-clay/10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[9px]">
        <div className="space-y-1">
          <span className="text-earth-sand/40">TECHNOLOGICAL CO-PROCESSOR ACCESS COST</span>
          <input type="range" min="10" max="100" value={accessCost} onChange={(e) => setAccessCost(parseInt(e.target.value))} className="w-full accent-red-500 h-1 bg-white/10 rounded" />
        </div>
        <div className="space-y-1">
          <span className="text-earth-sand/40">INTERFACE BANDWIDTH SPECTRUM</span>
          <input type="range" min="10" max="100" value={interfaceBandwidth} onChange={(e) => setInterfaceBandwidth(parseInt(e.target.value))} className="w-full accent-amber-500 h-1 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 9 MODEL 2: Synchronous Bidirectional BCI Read-Write Loop
// ============================================================================
export const BidirectionalBCI3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [writeCurrent, setWriteCurrent] = useState<number>(45); // %
  const [loopActive, setLoopActive] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 200;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#1b1411";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw a vertical cortical columns sheet
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 100, cy - 30);
      ctx.lineTo(cx + 100, cy - 30);
      ctx.lineTo(cx + 80, cy + 30);
      ctx.lineTo(cx - 120, cy + 30);
      ctx.closePath();
      ctx.stroke();

      // Dual micro-probe array penetrating sheet
      // Probe 1: Read array (Green)
      ctx.fillStyle = "#92a88e";
      ctx.fillRect(cx - 50, cy - 60, 5, 80);

      // Probe 2: Write array (Cyan)
      ctx.fillStyle = "#92a88e";
      ctx.fillRect(cx + 40, cy - 60, 5, 80);

      if (loopActive) {
        // Spikes floating up the Read Probe (Decoded Motor Intention)
        const readY = cy + 20 - ((t * 2) % 75);
        ctx.beginPath();
        ctx.arc(cx - 47.5, readY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#92a88e";
        ctx.shadowColor = "#92a88e";
        ctx.shadowBlur = 8;
        ctx.fill();

        // Stimulus pulses descending down the Write Probe (Sensory Tactile feedback)
        const writeY = cy - 55 + ((t * 1.5) % 70);
        ctx.beginPath();
        ctx.arc(cx + 42.5, writeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#92a88e";
        ctx.shadowColor = "#92a88e";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Loop arc linking them in background computing co-processor
        ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx - 5, cy - 55, 45, Math.PI, 0);
        ctx.stroke();

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#F59E0B";
        ctx.fillText("DECISION DECODING & SYNTHESIS GATEWAYS", cx - 95, cy - 70);
      }

      ctx.font = "8px monospace";
      ctx.fillStyle = "#92a88e";
      ctx.fillText("READ CORE [DECODE MOTOR INTENT]", cx - 140, cy + 42);
      ctx.fillStyle = "#92a88e";
      ctx.fillText("WRITE CORE [STIMULUS TACTILE]", cx + 25, cy + 42);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [writeCurrent, loopActive]);

  return (
    <div className="my-5 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Cpu size={14} className="text-emerald-400" />
          <span className="font-mono text-[9px] text-emerald-400 font-bold block uppercase">CHAPTER 9 • MODEL 2</span>
          <h4 className="font-sans text-xs font-bold text-white">Synchronous Bidirectional Read-Write Loop Processor</h4>
        </div>
      </div>
      <div ref={containerRef} className="relative h-44 w-full rounded-xl bg-black/40 overflow-hidden border border-earth-clay/10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[9px]">
        <div className="space-y-1">
          <span className="text-earth-sand/40">WRITE BACK STIMULUS STRENGTH</span>
          <input type="range" min="10" max="100" value={writeCurrent} onChange={(e) => setWriteCurrent(parseInt(e.target.value))} className="w-full accent-[#92a88e] h-1 bg-white/10 rounded" />
        </div>
        <button onClick={() => setLoopActive(!loopActive)} className={`py-1.5 rounded font-bold border transition-all ${loopActive ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-earth-parchment hover:text-slate-200"}`}>
          {loopActive ? "DEACTIVATE CLOSED-LOOP FEEDBACK" : "ACTIVATE BIDIRECTIONAL LOOP"}
        </button>
      </div>
    </div>
  );
};
