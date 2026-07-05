import React, { useEffect, useRef, useState } from "react";
import { Activity, Cpu, Shield, Layers, RefreshCw, Eye, Sparkles, Brain, Lock, Shuffle, Compass, HelpCircle } from "lucide-react";

// ============================================================================
// CHAPTER 1 MODEL: Dualism Consciousness Bridge 3D (Pineal vs. Emergence)
// ============================================================================
export const DualismConsciousnessBridge3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelMode, setModelMode] = useState<"dualism" | "emergence">("dualism");
  const [coupling, setCoupling] = useState<number>(50); // %
  const [isRotating, setIsRotating] = useState<boolean>(true);

  const rotationRef = useRef<number>(0.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      // Rotate camera
      if (isRotating) {
        rotationRef.current += 0.005;
      }

      const cx = w / 2;
      const cy = h / 2;
      const cosR = Math.cos(rotationRef.current);
      const sinR = Math.sin(rotationRef.current);

      if (modelMode === "dualism") {
        // Draw Dualism Model: Physical Realm (bottom grid) + Spiritual Realm (top cloud) + Intersecting Pineal Beam
        // 1. Draw physical realm (neurons/mesh on bottom plane)
        ctx.strokeStyle = "rgba(146, 168, 142, 0.15)";
        ctx.lineWidth = 1;
        const gridZ = h - 60;
        ctx.beginPath();
        for (let i = -4; i <= 4; i++) {
          const x1 = cx + (i * 30) * cosR - 40 * sinR;
          const y1 = gridZ + (i * 10) * sinR + 20 * cosR;
          const x2 = cx + (i * 30) * cosR + 40 * sinR;
          const y2 = gridZ + (i * 10) * sinR - 20 * cosR;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.stroke();

        // 2. Draw Spiritual Realm (Glowing mental cloud at top)
        const cloudY = 50;
        const grad = ctx.createRadialGradient(cx, cloudY, 10, cx, cloudY, 60);
        grad.addColorStop(0, "rgba(140, 125, 112, 0.4)");
        grad.addColorStop(1, "rgba(140, 125, 112, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cloudY, 60, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#cfbda8";
        ctx.fillText("RES COGITANS (IMMATERIAL MIND)", cx - 80, cloudY - 10);

        ctx.fillStyle = "#92a88e";
        ctx.fillText("RES EXTENSA (PHYSICAL BRAIN)", cx - 75, gridZ + 40);

        // 3. Central Pineal Gland intersection (Descartes' bridge)
        const glandX = cx;
        const glandY = (cloudY + gridZ) / 2;
        
        ctx.beginPath();
        ctx.moveTo(cx, cloudY + 20);
        ctx.lineTo(cx, gridZ - 10);
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.2 + (coupling / 100) * 0.6})`;
        ctx.lineWidth = 2 + (coupling / 100) * 4;
        ctx.stroke();

        // Glowing Pineal core
        ctx.beginPath();
        ctx.arc(glandX, glandY, 6 + (coupling / 100) * 6, 0, Math.PI * 2);
        ctx.fillStyle = "#F59E0B";
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "9px monospace";
        ctx.fillText("PINEAL BRIDGE", glandX + 15, glandY + 4);

        // Particle flows floating up and down
        const pCount = 5;
        for (let i = 0; i < pCount; i++) {
          const progress = ((t * 0.02 + i / pCount) % 1.0);
          const py = cloudY + 20 + progress * (gridZ - cloudY - 30);
          ctx.beginPath();
          ctx.arc(cx, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
        }

      } else {
        // Draw Physicalist Emergence: Single interconnected dense 3D neural grid that glows on phase lock
        const nodeCount = 12;
        const nodes: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i < nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2;
          const r = 50 + Math.sin(i * 1.7) * 20;
          nodes.push({
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r * 0.5 + Math.cos(i * 3) * 15,
            z: Math.sin(i * 2.5) * 30
          });
        }

        // Draw connecting fibers
        ctx.strokeStyle = `rgba(146, 168, 142, ${0.1 + (coupling / 100) * 0.4})`;
        ctx.lineWidth = 0.8;
        for (let i = 0; i < nodeCount; i++) {
          const n1 = nodes[i];
          const rx1 = n1.x * cosR - n1.z * sinR + cx;
          const ry1 = n1.y + cy;

          for (let j = i + 1; j < nodeCount; j++) {
            if (Math.abs(i - j) < 4 || Math.abs(i - j) > 8) {
              const n2 = nodes[j];
              const rx2 = n2.x * cosR - n2.z * sinR + cx;
              const ry2 = n2.y + cy;
              ctx.beginPath();
              ctx.moveTo(rx1, ry1);
              ctx.lineTo(rx2, ry2);
              ctx.stroke();
            }
          }
        }

        // Draw emergent consciousness field inside the core
        const coreIntensity = (coupling / 100);
        const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 70);
        grad.addColorStop(0, `rgba(146, 168, 142, ${coreIntensity * 0.4})`);
        grad.addColorStop(1, "rgba(146, 168, 142, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, 70, 0, Math.PI * 2);
        ctx.fill();

        // Draw nodes
        nodes.forEach((node, idx) => {
          const rx = node.x * cosR - node.z * sinR + cx;
          const ry = node.y + cy;
          const nodeSize = 3 + Math.sin(t * 0.1 + idx) * 1.5;

          ctx.beginPath();
          ctx.arc(rx, ry, nodeSize, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? "#92a88e" : "#cfbda8";
          ctx.shadowColor = "#92a88e";
          ctx.shadowBlur = idx % 3 === 0 ? 8 : 0;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#92a88e";
        ctx.fillText("EMERGENT CONSCIOUSNESS STATE", cx - 85, cy - 65);
      }

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [modelMode, coupling, isRotating]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Brain size={16} className="text-earth-sage" />
          <div>
            <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase">CHAPTER 1: PHILOSOPHICAL FOUNDATIONS</span>
            <h4 className="font-sans text-xs font-bold text-white">Dualism Cartesian Bridge vs. Physicalist Emergence 3D</h4>
          </div>
        </div>
        <div className="flex bg-black/40 rounded-lg p-0.5 border border-earth-clay/10 font-mono text-[9px]">
          <button
            onClick={() => setModelMode("dualism")}
            className={`py-1 px-2 rounded font-bold transition-all ${modelMode === "dualism" ? "bg-earth-clay/10 text-earth-bark border border-earth-clay/20" : "text-earth-sand/70"}`}
          >
            CARTESIAN DUALISM
          </button>
          <button
            onClick={() => setModelMode("emergence")}
            className={`py-1 px-2 rounded font-bold transition-all ${modelMode === "emergence" ? "bg-earth-forest/20 text-earth-sage border border-earth-moss/30" : "text-earth-sand/70"}`}
          >
            PHYSICALIST EMERGENCE
          </button>
        </div>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          INTERACTIVE 3D SUBSTRATE MATRIX
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>SUBSTRATE COMPLEXITY COUPLING</span>
            <span className="text-earth-sage font-bold">{coupling}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={coupling}
            onChange={(e) => setCoupling(parseInt(e.target.value))}
            className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="py-1.5 px-3 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-earth-parchment font-bold transition-all flex items-center justify-center space-x-1.5 self-end"
        >
          <RefreshCw size={10} className={isRotating ? "animate-spin-slow" : ""} />
          <span>{isRotating ? "FREEZE 3D PERSPECTIVE" : "ENGAGE ROTATION"}</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 2 MODEL: Rhythmic Cortical Synchronizer 3D (Oscillatory Binding)
// ============================================================================
export const RhythmicCorticalSynchronizer3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gammaFreq, setGammaFreq] = useState<number>(40); // Hz
  const [phaseAlignment, setPhaseAlignment] = useState<number>(30); // %
  const [isRotating, setIsRotating] = useState<boolean>(true);

  const rotationRef = useRef<number>(1.2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      if (isRotating) rotationRef.current += 0.003;
      const cosR = Math.cos(rotationRef.current);
      const sinR = Math.sin(rotationRef.current);

      const cx = w / 2;
      const cy = h / 2;

      // Draw 3 vertical cortical columns in 3D
      const cols = [
        { name: "Visual Cortex Assembly (V1)", offset: -120, colColor: "#cfbda8" },
        { name: "Auditory Processing Hub", offset: 0, colColor: "#92a88e" },
        { name: "Somatosensory Associator", offset: 120, colColor: "#cf7d61" }
      ];

      cols.forEach((col, idx) => {
        const baseX = cx + col.offset * cosR;
        const baseY = cy + col.offset * sinR * 0.3 + 30;

        // Draw column column tube
        const colH = 100;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(baseX - 15, baseY);
        ctx.lineTo(baseX - 15, baseY - colH);
        ctx.lineTo(baseX + 15, baseY - colH);
        ctx.lineTo(baseX + 15, baseY);
        ctx.closePath();
        ctx.stroke();

        // Draw oscillation waves inside the column representing local gamma rhythms
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = col.colColor;
        ctx.beginPath();

        // Phase alignment formula
        // Low alignment -> waves are completely out of phase
        // High alignment -> waves synchronize perfectly
        const phaseShift = idx * (Math.PI * 2 * (1.0 - phaseAlignment / 100));
        
        for (let y = 0; y <= colH; y += 4) {
          const waveX = baseX + Math.sin(t * (gammaFreq * 0.005) - y * 0.08 + phaseShift) * 12;
          const currY = baseY - y;
          if (y === 0) ctx.moveTo(waveX, currY);
          else ctx.lineTo(waveX, currY);
        }
        ctx.stroke();

        // Draw a glowing active neuron inside the column
        const neuronY = baseY - colH/2 + Math.sin(t * 0.05 + idx) * 20;
        ctx.beginPath();
        ctx.arc(baseX, neuronY, 4, 0, Math.PI * 2);
        ctx.fillStyle = col.colColor;
        ctx.shadowColor = col.colColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Labels
        ctx.font = "8px monospace";
        ctx.fillStyle = "#94A3B8";
        ctx.fillText(col.name, baseX - 55, baseY + 18);
      });

      // Synchrony indicator ring at the top connecting them
      if (phaseAlignment > 70) {
        ctx.strokeStyle = `rgba(245, 158, 11, ${(phaseAlignment - 70) / 30})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        cols.forEach((col, idx) => {
          const baseX = cx + col.offset * cosR;
          const topY = cy + col.offset * sinR * 0.3 - 70;
          if (idx === 0) ctx.moveTo(baseX, topY);
          else ctx.lineTo(baseX, topY);
        });
        ctx.closePath();
        ctx.stroke();

        // Broadcast glow
        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#F59E0B";
        ctx.fillText("GAMMA PHASE COHERENCE LOCK (40Hz BINDING)", cx - 110, cy - 90);
      }

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [gammaFreq, phaseAlignment, isRotating]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Activity size={16} className="text-emerald-400" />
          <div>
            <span className="font-mono text-[9px] text-emerald-400 font-bold block uppercase">CHAPTER 2: NEURAL CORRELATES OF CONSCIOUSNESS</span>
            <h4 className="font-sans text-xs font-bold text-white">Rhythmic Gamma Oscillation Phase Binder 3D</h4>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          CROSS-FREQUENCY OSCILLATORY COUPLING MODEL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>GAMMA BAND CARRIER FREQUENCY</span>
            <span className="text-emerald-400 font-bold">{gammaFreq} Hz</span>
          </div>
          <input
            type="range"
            min="30"
            max="80"
            value={gammaFreq}
            onChange={(e) => setGammaFreq(parseInt(e.target.value))}
            className="w-full accent-emerald-500 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>PHASE ALIGNMENT (BINDING)</span>
            <span className="text-[#92a88e] font-bold">{phaseAlignment}% SYNCHRONY</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={phaseAlignment}
            onChange={(e) => setPhaseAlignment(parseInt(e.target.value))}
            className="w-full accent-[#92a88e] h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="py-1.5 px-3 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-earth-parchment font-bold transition-all flex items-center justify-center space-x-1.5 self-end"
        >
          <RefreshCw size={10} className={isRotating ? "animate-spin-slow" : ""} />
          <span>{isRotating ? "PAUSE COLUMN SPIN" : "SPIN COLUMNS"}</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 4 MODEL: Direct Prefrontal Stimulator 3D (TMS/tDCS Depolarization)
// ============================================================================
export const DirectPrefrontalStimulator3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMA, setCurrentMA] = useState<number>(1.5); // mA
  const [electrodeConfig, setElectrodeConfig] = useState<"frontoparietal" | "motor">("frontoparietal");
  const [isStimulating, setIsStimulating] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw abstract 3D side profile wireframe of brain cortex
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      // Draw cortical hemisphere outlines in 3D-ish ellipses
      ctx.beginPath();
      ctx.arc(cx - 20, cy, 65, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx - 15, cy - 10, 60, 45, Math.PI/6, 0, Math.PI * 2);
      ctx.stroke();

      // Define anode and cathode placements
      let anodeX = cx - 60;
      let anodeY = cy - 30; // Prefrontal (DLPFC)
      let cathodeX = cx + 35;
      let cathodeY = cy - 10; // Parietal/Somatic

      if (electrodeConfig === "motor") {
        anodeX = cx - 20;
        anodeY = cy - 50; // Motor Cortex
        cathodeX = cx - 70;
        cathodeY = cy + 20; // Mastoid / Occipital
      }

      // Draw field line arches between anode and cathode
      if (isStimulating) {
        ctx.strokeStyle = "rgba(245, 158, 11, 0.2)";
        ctx.lineWidth = 1 + currentMA;
        
        ctx.beginPath();
        ctx.moveTo(anodeX, anodeY);
        // Draw Bezier field arc
        ctx.bezierCurveTo(anodeX, anodeY - 40, cathodeX, cathodeY - 40, cathodeX, cathodeY);
        ctx.stroke();

        // Draw flowing current charges
        const chargeCount = 8;
        for (let i = 0; i < chargeCount; i++) {
          const progress = ((t * 0.015 * currentMA + i / chargeCount) % 1.0);
          // Quadratic bezier interpolation for visual flow
          const mx = (1 - progress) * (1 - progress) * anodeX + 2 * (1 - progress) * progress * ((anodeX + cathodeX)/2) + progress * progress * cathodeX;
          const my = (1 - progress) * (1 - progress) * anodeY + 2 * (1 - progress) * progress * (((anodeY + cathodeY)/2) - 40) + progress * progress * cathodeY;

          ctx.beginPath();
          ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#F59E0B";
          ctx.fill();
        }
      }

      // Draw Electrodes
      // Anode (+)
      ctx.beginPath();
      ctx.arc(anodeX, anodeY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#cf7d61";
      ctx.fill();
      ctx.font = "bold 9px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("+", anodeX - 3, anodeY + 3);

      // Cathode (-)
      ctx.beginPath();
      ctx.arc(cathodeX, cathodeY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#cfbda8";
      ctx.fill();
      ctx.font = "bold 9px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("-", cathodeX - 3, cathodeY + 3);

      // Depolarized glowing neurons in the anode zone
      const localNeurons = [
        { x: anodeX + 15, y: anodeY + 20 },
        { x: anodeX - 5, y: anodeY + 35 },
        { x: anodeX + 25, y: anodeY + 40 }
      ];

      localNeurons.forEach((n, idx) => {
        const firing = isStimulating && (t % Math.floor(25 / currentMA) === idx);
        ctx.beginPath();
        ctx.arc(n.x, n.y, firing ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = firing ? "#F59E0B" : "#475569";
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = firing ? 12 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Overlay text
      ctx.font = "8px monospace";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText("ANODE (EXCITATORY DEPOLARIZATION)", anodeX - 55, anodeY - 12);
      ctx.fillText("CATHODE (INHIBITORY HYPERPOLARIZATION)", cathodeX - 45, cathodeY + 18);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentMA, electrodeConfig, isStimulating]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Cpu size={16} className="text-amber-500" />
          <div>
            <span className="font-mono text-[9px] text-amber-500 font-bold block uppercase">CHAPTER 4: COGNITIVE AUGMENTATION</span>
            <h4 className="font-sans text-xs font-bold text-white">Transcranial Direct Current Neuromodulator 3D</h4>
          </div>
        </div>
        <div className="flex bg-black/40 rounded-lg p-0.5 border border-earth-clay/10 font-mono text-[9px]">
          <button
            onClick={() => setElectrodeConfig("frontoparietal")}
            className={`py-1 px-2.5 rounded font-bold transition-all ${electrodeConfig === "frontoparietal" ? "bg-earth-clay/10 text-earth-bark border border-earth-clay/20" : "text-earth-sand/70"}`}
          >
            DLPFC COGNITIVE SETUP
          </button>
          <button
            onClick={() => setElectrodeConfig("motor")}
            className={`py-1 px-2.5 rounded font-bold transition-all ${electrodeConfig === "motor" ? "bg-earth-clay/10 text-earth-bark border border-earth-clay/20" : "text-earth-sand/70"}`}
          >
            MOTOR CORTEX SETUP
          </button>
        </div>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          STIMULATION FIELD MODEL: {electrodeConfig.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>STIMULUS AMPLITUDE (CURRENT)</span>
            <span className="text-earth-bark font-bold">{currentMA} mA</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={currentMA}
            onChange={(e) => setCurrentMA(parseFloat(e.target.value))}
            className="w-full accent-amber-500 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <div className="flex items-center space-x-2 self-end">
          <button
            onClick={() => setIsStimulating(!isStimulating)}
            className={`w-full py-2 px-4 rounded font-bold border transition-all text-center ${
              isStimulating 
                ? "bg-red-500/15 border-red-500/30 text-earth-bark hover:bg-red-500/25" 
                : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
            }`}
          >
            {isStimulating ? "DEACTIVATE FIELD GENERATOR" : "ENGAGE CURRENT FIELD"}
          </button>
        </div>
        <div className="p-2.5 bg-[#0F172A] border border-earth-clay/10 rounded-lg flex items-center space-x-2 text-earth-sand/70 text-[9px] leading-snug">
          <Shield size={12} className="text-emerald-500 shrink-0" />
          <span>Constant direct current (tDCS) alters resting membrane potentials, promoting long-term potentiation (LTP) in local prefrontal areas.</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 5 MODEL: Hyperactive Agency Detector 3D (HADD Predator Attribution)
// ============================================================================
export const HyperactiveAgencyDetector3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [threatBias, setThreatBias] = useState<number>(65); // %
  const [noiseInput, setNoiseInput] = useState<number>(50); // %
  const [isScanning, setIsScanning] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw 3D scanning sonar sweeping line
      if (isScanning) {
        const angle = (t * 0.02) % (Math.PI * 2);
        ctx.strokeStyle = "rgba(146, 168, 142, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 120, cy + Math.sin(angle) * 120);
        ctx.stroke();

        // draw sonar circles
        for (let r = 30; r <= 120; r += 30) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(146, 168, 142, 0.05)";
          ctx.stroke();
        }
      }

      // Generate random environmental noise dots (like rustling wind leaves)
      const noiseSeed = Math.floor(noiseInput / 10);
      ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
      for (let i = 0; i < noiseSeed * 8; i++) {
        // Pseudo-random but stable dots based on sin
        const angle = i * 2.3 + Math.sin(t * 0.001) * 0.2;
        const dist = 30 + (i * 7) % 80;
        const nx = cx + Math.cos(angle) * dist;
        const ny = cy + Math.sin(angle) * dist;
        ctx.beginPath();
        ctx.arc(nx, ny, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // HADD agency threshold logic
      // If threat bias is high, the system clusters noise into a simulated "Entity" predator wireframe
      const agencyTriggered = threatBias > 40;
      if (agencyTriggered) {
        const entityIntensity = (threatBias / 100);
        ctx.strokeStyle = `rgba(239, 68, 68, ${entityIntensity})`;
        ctx.lineWidth = 1.5;

        // Draw wireframe predator/entity shape in center
        ctx.beginPath();
        ctx.moveTo(cx, cy - 25);
        ctx.lineTo(cx - 20, cy + 15);
        ctx.lineTo(cx + 20, cy + 15);
        ctx.closePath();
        ctx.stroke();

        // Entity Core Node glowing red
        ctx.beginPath();
        ctx.arc(cx, cy - 5, 5 + Math.sin(t * 0.1) * 2, 0, Math.PI * 2);
        ctx.fillStyle = "#cf7d61";
        ctx.shadowColor = "#cf7d61";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#cf7d61";
        ctx.fillText("HADD: AGENCY OVER-ATTRIBUTION", cx - 80, cy - 40);
        ctx.font = "8px monospace";
        ctx.fillStyle = "rgba(239, 68, 68, 0.7)";
        ctx.fillText("CLASSIFIED: INTENTIONAL PREDATOR / AGENT", cx - 100, cy + 30);
      } else {
        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#94A3B8";
        ctx.fillText("HADD: DE-ACTIVATED (AMBIENT RUSTLE)", cx - 90, cy - 40);
        ctx.font = "8px monospace";
        ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
        ctx.fillText("CLASSIFIED: PHYSICAL ENVIRONMENT (WIND)", cx - 95, cy + 30);
      }

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [threatBias, noiseInput, isScanning]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Eye size={16} className="text-earth-bark" />
          <div>
            <span className="font-mono text-[9px] text-earth-bark font-bold block uppercase">CHAPTER 5: COGNITIVE SCIENCE OF RELIGION</span>
            <h4 className="font-sans text-xs font-bold text-white">Hyperactive Agency Detection Device (HADD) Simulator 3D</h4>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          PATTERN CLUSTERING SIGNAL CLASSIFIER
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>SURVIVAL THREAT BIAS</span>
            <span className="text-earth-bark font-bold">{threatBias}% (HYPERACTIVE)</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={threatBias}
            onChange={(e) => setThreatBias(parseInt(e.target.value))}
            className="w-full accent-red-500 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>ENVIRONMENTAL WIND/LEAF NOISE</span>
            <span className="text-earth-sand/70 font-bold">{noiseInput}% LEVEL</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={noiseInput}
            onChange={(e) => setNoiseInput(parseInt(e.target.value))}
            className="w-full accent-slate-400 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <button
          onClick={() => setIsScanning(!isScanning)}
          className="py-1.5 px-3 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-earth-parchment font-bold transition-all flex items-center justify-center space-x-1.5 self-end"
        >
          <Compass size={10} className={isScanning ? "animate-pulse" : ""} />
          <span>{isScanning ? "FREEZE SCAN RADAR" : "SCAN SIGNAL"}</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 6 MODEL: End-of-Life Hypoxic Surge 3D (Clinical Gamma Surge)
// ============================================================================
export const HypoxicSurgeSimulator3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arrestTriggered, setArrestTriggered] = useState<boolean>(false);
  const [perfusion, setPerfusion] = useState<number>(100); // % blood oxygenation
  const [timeStep, setTimeStep] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Oxygen/ATP decay loop post-arrest
  useEffect(() => {
    let timer: number;
    if (arrestTriggered) {
      timer = window.setInterval(() => {
        setPerfusion((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return Math.max(0, prev - 1.5);
        });
        setTimeStep((t) => t + 1);
      }, 80);
    } else {
      setPerfusion(100);
      setTimeStep(0);
    }
    return () => clearInterval(timer);
  }, [arrestTriggered]);

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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw simple 3D grid layout
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = -5; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 25, 20);
        ctx.lineTo(cx + i * 25, h - 20);
        ctx.stroke();
      }

      // Calculate state: Normal, Surge, Flatline
      let surgeFactor = 0;
      let flatline = false;

      if (perfusion > 45) {
        // Normal baseline
        surgeFactor = 0.15;
      } else if (perfusion > 5 && perfusion <= 45) {
        // THE SURGE WAVE: oxygen cut creates massive localized ionic collapse / synchronous surge
        surgeFactor = Math.sin((perfusion - 5) / 40 * Math.PI) * 2.5;
      } else {
        // Flatline clinical death
        flatline = true;
      }

      if (!flatline) {
        // Draw interconnected spiking cortical columns firing
        const count = 22;
        ctx.fillStyle = perfusion > 45 ? "rgba(207, 189, 168, 0.5)" : `rgba(207, 125, 97, ${surgeFactor * 0.5})`;
        ctx.strokeStyle = perfusion > 45 ? "rgba(207, 189, 168, 0.2)" : `rgba(207, 125, 97, ${surgeFactor * 0.3})`;
        ctx.lineWidth = 0.8;

        const nodes: { x: number; y: number; active: boolean }[] = [];
        for (let i = 0; i < count; i++) {
          const angle = i * 2.5;
          const r = 50 + (i * 3) % 40;
          nodes.push({
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r * 0.6,
            active: (t % (perfusion > 45 ? 15 : 2) === 0)
          });
        }

        // Connect adjacent nodes
        for (let i = 0; i < count; i++) {
          const n1 = nodes[i];
          for (let j = i + 1; j < count; j++) {
            const n2 = nodes[j];
            const dist = Math.sqrt((n1.x - n2.x)**2 + (n1.y - n2.y)**2);
            if (dist < 40) {
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }
        }

        // Draw spikes
        nodes.forEach((node) => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.active ? 4 + surgeFactor * 3 : 2, 0, Math.PI * 2);
          ctx.fillStyle = perfusion > 45 ? "#cfbda8" : "#cf7d61";
          if (node.active && perfusion <= 45) {
            ctx.shadowColor = "#cf7d61";
            ctx.shadowBlur = 15;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Overlay status text
        ctx.font = "bold 9px monospace";
        if (perfusion > 45) {
          ctx.fillStyle = "#cfbda8";
          ctx.fillText("Baseline EEG: Synchronous Low Amplitude Waves", cx - 110, cy - 70);
        } else {
          ctx.fillStyle = "#cf7d61";
          ctx.fillText("CLINICAL HYPOXIC GAMMA SURGE ACTIVE (END-OF-LIFE)", cx - 120, cy - 70);
        }
      } else {
        // Flatline
        ctx.beginPath();
        ctx.moveTo(cx - 150, cy);
        // tiny flatline noise
        for (let x = cx - 150; x <= cx + 150; x += 10) {
          ctx.lineTo(x, cy + (Math.random() - 0.5) * 1.5);
        }
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#64748B";
        ctx.fillText("CLINICAL FLATLINE: ELECTROENCEPHALOGRAPHIC ISOELECTRICITY", cx - 145, cy - 30);
      }

      // Draw timeline gauge
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(cx - 150, h - 35, 300, 10);
      ctx.fillStyle = perfusion > 45 ? "#cfbda8" : perfusion > 5 ? "#cf7d61" : "#475569";
      ctx.fillRect(cx - 150, h - 35, (perfusion / 100) * 300, 10);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [perfusion]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Activity size={16} className="text-earth-sage animate-pulse" />
          <div>
            <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase">CHAPTER 6: PHYSIOLOGY OF DEATH</span>
            <h4 className="font-sans text-xs font-bold text-white">Post-Arrest Hypoxic Gamma Surge Simulator 3D</h4>
          </div>
        </div>
        <button
          onClick={() => {
            setArrestTriggered(!arrestTriggered);
            if (!arrestTriggered) {
              setPerfusion(100);
            }
          }}
          className={`py-1 px-3 rounded font-mono text-[9px] font-bold border transition-all ${
            arrestTriggered 
              ? "bg-red-500/15 border-red-500/30 text-earth-bark" 
              : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
          }`}
        >
          {arrestTriggered ? "RESET BLOOD CIRCULATION" : "TRIGGER CARDIAC ARREST"}
        </button>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          CORTICAL POWER SPECTRA GRAPH
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
        <div className="p-3 bg-black/40 border border-earth-clay/10 rounded-xl space-y-1">
          <span className="text-earth-sand/40 font-bold uppercase block text-[8px]">OXYGEN PERFUSION RATIO</span>
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-bold ${perfusion > 45 ? "text-earth-sage" : perfusion > 5 ? "text-earth-sage" : "text-earth-sand/40"}`}>
              {perfusion.toFixed(1)}% ATP STORES
            </span>
            <span className="text-[8.5px] text-earth-sand/40">
              {perfusion > 45 ? "[AEROBIC METABOLISM]" : perfusion > 5 ? "[IONIC DEPOLARIZATION SURGE]" : "[CELLULAR METABOLIC FLATLINE]"}
            </span>
          </div>
        </div>
        <div className="p-3 bg-[#231a16]/80 border border-earth-clay/10 rounded-xl flex items-center space-x-2 text-[9px] text-earth-sand/70 leading-normal font-sans">
          <HelpCircle size={14} className="text-amber-500 shrink-0" />
          <span>At cardiac arrest, oxygen depletion leads to depolarization blocks. This triggers a short-lived high-amplitude synchronized gamma burst associated with structured end-of-life visions.</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 7 MODEL: Cryogenic Tissue Slicing Vectorizer 3D (Connectomic Reconstructor)
// ============================================================================
export const CryoSlicingVectorizer3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sliceThicnkess, setSliceThickness] = useState<number>(30); // nm
  const [laserSpeed, setLaserSpeed] = useState<number>(4); // multiplier
  const [isSlicing, setIsSlicing] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw isometric 3D Tissue Block being sectioned
      const blockX = cx - 40;
      const blockY = cy + 20;

      // Draw tissue block box
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;

      // Draw 3D transparent cube lines
      ctx.beginPath();
      ctx.moveTo(blockX - 60, blockY - 30);
      ctx.lineTo(blockX + 60, blockY - 30);
      ctx.lineTo(blockX + 40, blockY + 10);
      ctx.lineTo(blockX - 80, blockY + 10);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(blockX - 60, blockY - 30);
      ctx.lineTo(blockX - 60, blockY + 20);
      ctx.lineTo(blockX - 80, blockY + 60);
      ctx.lineTo(blockX - 80, blockY + 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(blockX + 60, blockY - 30);
      ctx.lineTo(blockX + 60, blockY + 20);
      ctx.lineTo(blockX + 40, blockY + 60);
      ctx.lineTo(blockX + 40, blockY + 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(blockX - 80, blockY + 60);
      ctx.lineTo(blockX + 40, blockY + 60);
      ctx.stroke();

      // Moving scanning laser blade cutting across tissue block
      const cutZ = isSlicing ? (t * 0.4 * laserSpeed) % 50 : 20;
      const laserY = blockY - 30 + cutZ;

      ctx.strokeStyle = "#cf7d61";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(blockX - 70, laserY);
      ctx.lineTo(blockX + 50, laserY);
      ctx.stroke();

      // Draw scanned digital reconstructed network on the right side
      const rcx = cx + 110;
      const rcy = cy;

      // Draw simulated synapses reconstructing based on slicing resolution
      const isHiRes = sliceThicnkess < 25;
      const synCount = 10;
      const syns: { x: number; y: number; linked: boolean }[] = [];

      for (let i = 0; i < synCount; i++) {
        const theta = i * 2.1;
        const rad = 20 + (i * 4) % 25;
        syns.push({
          x: rcx + Math.cos(theta) * rad,
          y: rcy + Math.sin(theta) * rad,
          linked: isHiRes || (i % 2 === 0) // thick slicing leaves severed connections
        });
      }

      // Draw connections
      ctx.strokeStyle = isHiRes ? "rgba(146, 168, 142, 0.4)" : "rgba(239, 68, 68, 0.15)";
      ctx.lineWidth = isHiRes ? 1.5 : 0.6;
      for (let i = 0; i < synCount; i++) {
        const s1 = syns[i];
        for (let j = i + 1; j < synCount; j++) {
          const s2 = syns[j];
          const dist = Math.sqrt((s1.x - s2.x)**2 + (s1.y - s2.y)**2);
          if (dist < 35 && s1.linked && s2.linked) {
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      // Draw synapse nodes
      syns.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.linked ? 3 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = s.linked ? "#92a88e" : "#cf7d61";
        ctx.fill();
      });

      // Overlay text
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#cf7d61";
      ctx.fillText("CRYOTOME SECTONING (3D)", blockX - 60, blockY - 45);

      ctx.fillStyle = isHiRes ? "#92a88e" : "#cf7d61";
      ctx.fillText(isHiRes ? "RECONSTRUCTED METRIC CONNECTOME: COMPLETE" : "RECONSTRUCTION FAILED: PATHWAYS SEVERED", rcx - 90, rcy - 50);

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sliceThicnkess, laserSpeed, isSlicing]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Layers size={16} className="text-earth-sage" />
          <div>
            <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase">CHAPTER 7: WHOLE-BRAIN EMULATION</span>
            <h4 className="font-sans text-xs font-bold text-white">Nanometer Slicing Connectome Reconstructor 3D</h4>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          CRYOMAPPING SYNAPTIC DESTRUCTIVE VECTOR MATRIX
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>SLICING THICKNESS</span>
            <span className={`${sliceThicnkess < 25 ? "text-earth-sage" : "text-earth-bark"} font-bold`}>{sliceThicnkess} nm</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={sliceThicnkess}
            onChange={(e) => setSliceThickness(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg cursor-pointer accent-earth-bark"
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>LASER CUT ROTATION RATE</span>
            <span className="text-earth-sand/70 font-bold">{laserSpeed}x SPEED</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={laserSpeed}
            onChange={(e) => setLaserSpeed(parseInt(e.target.value))}
            className="w-full accent-slate-400 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <button
          onClick={() => setIsSlicing(!isSlicing)}
          className="py-1.5 px-3 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-earth-parchment font-bold transition-all flex items-center justify-center space-x-1.5 self-end"
        >
          <RefreshCw size={10} className={isSlicing ? "animate-spin-slow" : ""} />
          <span>{isSlicing ? "PAUSE BLADE MOTION" : "START BLADE"}</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 8 MODEL: Cognitive Liberty Privacy Guard 3D (Neurodata Sovereignty Shield)
// ============================================================================
export const CognitiveLibertyPrivacy3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shieldActive, setShieldActive] = useState<boolean>(true);
  const [regulatoryDensity, setRegulatoryDensity] = useState<number>(75); // %
  const [probeIntensity, setProbeIntensity] = useState<number>(30); // %

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw central 3D brain core model representing user's thoughts
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let r = 10; r <= 45; r += 12) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(146, 168, 142, 0.2)";
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      // Incoming advertising / corporation probes (red wave packets)
      const pulseSpeed = 1.5 + probeIntensity * 0.05;
      const probeX = cx - 140 + ((t * pulseSpeed) % 150);

      if (probeX < cx) {
        ctx.fillStyle = "#cf7d61";
        ctx.shadowColor = "#cf7d61";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(probeX, cy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(probeX - 10, cy - 8);
        ctx.quadraticCurveTo(probeX, cy, probeX - 10, cy + 8);
        ctx.stroke();

        ctx.font = "8px monospace";
        ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
        ctx.fillText("PROBE: AD_REACTION_EXTRACT()", cx - 150, cy - 15);
      }

      // Shield boundaries (concentric circle guards)
      if (shieldActive) {
        const shieldR = 70;
        const protectionOpacity = (regulatoryDensity / 100);

        // Repelling logic when probe hits shield
        const hitShield = probeX >= cx - shieldR - 5 && probeX <= cx - shieldR + 5;
        
        ctx.strokeStyle = hitShield ? "#92a88e" : `rgba(146, 168, 142, ${protectionOpacity})`;
        ctx.lineWidth = hitShield ? 3.5 : 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, shieldR, 0, Math.PI * 2);
        ctx.stroke();

        // draw deflecting sparks on impact
        if (hitShield) {
          ctx.strokeStyle = "#92a88e";
          ctx.beginPath();
          ctx.moveTo(cx - shieldR, cy);
          ctx.lineTo(cx - shieldR - 15, cy - 10);
          ctx.moveTo(cx - shieldR, cy);
          ctx.lineTo(cx - shieldR - 15, cy + 10);
          ctx.stroke();

          ctx.font = "bold 9px monospace";
          ctx.fillStyle = "#92a88e";
          ctx.fillText("SOVEREIGNTY SHIELD BLOCKED EXTRACT!", cx - 90, cy + 85);
        }

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#92a88e";
        ctx.fillText("COGNITIVE LIBERTY CHARTER ACTIVE", cx - 85, cy - 85);
      } else {
        // Shield down! Probe leaks all the way into internal core
        const breached = probeX >= cx - 20;
        if (breached) {
          ctx.fillStyle = "#cf7d61";
          ctx.font = "bold 9px monospace";
          ctx.fillText("PRIVACY BREACH: MENTAL REVENUE DATA LEAKED", cx - 110, cy + 85);
        }
        ctx.font = "bold 9px monospace";
        ctx.fillStyle = "#cf7d61";
        ctx.fillText("COGNITIVE SOVEREIGNTY EXPOSED", cx - 80, cy - 85);
      }

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [shieldActive, regulatoryDensity, probeIntensity]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Lock size={16} className="text-emerald-400" />
          <div>
            <span className="font-mono text-[9px] text-emerald-400 font-bold block uppercase">CHAPTER 8: NEUROETHICS & RIGHTS</span>
            <h4 className="font-sans text-xs font-bold text-white">Mental Privacy Sandbox & Liberty Guard 3D</h4>
          </div>
        </div>
        <button
          onClick={() => setShieldActive(!shieldActive)}
          className={`py-1 px-3 rounded font-mono text-[9px] font-bold border transition-all ${
            shieldActive 
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" 
              : "bg-red-500/15 border-red-500/30 text-earth-bark"
          }`}
        >
          {shieldActive ? "SHIELD GUARD ONLINE" : "DISABLE SOVEREIGNTY SHIELD"}
        </button>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          COGNITIVE DATA EXTRAPOLATOR IMMERSION
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>REGULATORY PRIVACY DENSITY</span>
            <span className="text-emerald-400 font-bold">{regulatoryDensity}% DECREE</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={regulatoryDensity}
            onChange={(e) => setRegulatoryDensity(parseInt(e.target.value))}
            className="w-full accent-emerald-500 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>EXTERNAL ADVERTISING PROBE FREQUENCY</span>
            <span className="text-earth-bark font-bold">{probeIntensity}% INTENSITY</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={probeIntensity}
            onChange={(e) => setProbeIntensity(parseInt(e.target.value))}
            className="w-full accent-red-500 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 9 MODEL: Orch-OR Microtubule Coherence 3D (Quantum Gravity Collapse)
// ============================================================================
export const OrchORMicrotubuleCoherence3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [decoherence, setDecoherence] = useState<number>(40); // % thermal noise
  const [coherenceRate, setCoherenceRate] = useState<number>(60); // %
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw a 3D cylindrical microtubule lattice representing tubulin monomers
      const segmentCount = 6;
      const rings = 12;
      const rSize = 35;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;

      // Determine quantum coherence criteria
      // High coherence rate and low decoherence (thermal noise) produces synchronized superposition states
      const totalCoherence = Math.max(0, coherenceRate - decoherence * 0.5);

      for (let s = 0; s < segmentCount; s++) {
        const sx = cx - 110 + s * 45;

        for (let r = 0; r < rings; r++) {
          const angle = (r / rings) * Math.PI * 2;
          const sy = cy + Math.sin(angle) * rSize * 0.4;
          const sz = Math.cos(angle) * rSize;

          // Determine monomer quantum state: superposition (neon blue/pink flickers) vs. collapsed (gray)
          const inSuperposition = totalCoherence > 25 && ((s + r + t) % Math.floor(120 / (totalCoherence + 1)) === 0);

          ctx.beginPath();
          ctx.arc(sx, sy, 3 + (sz / rSize) * 1.5, 0, Math.PI * 2);

          if (inSuperposition) {
            ctx.fillStyle = t % 2 === 0 ? "#92a88e" : "#cf7d61";
            ctx.shadowColor = "#92a88e";
            ctx.shadowBlur = 10;
          } else {
            ctx.fillStyle = "rgba(71, 85, 105, 0.4)";
            ctx.shadowBlur = 0;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Gravity Collapse wave lines trigger (objective reduction trigger)
      if (totalCoherence > 35 && t % 90 < 10) {
        ctx.strokeStyle = "rgba(167, 139, 250, 0.8)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 150, cy);
        ctx.lineTo(cx + 150, cy);
        ctx.stroke();

        ctx.fillStyle = "#cfbda8";
        ctx.font = "bold 9.5px monospace";
        ctx.fillText("OBJECTIVE WAVE COLLAPSE (ORCH-OR PROTOCONSCIOUSNESS TRIGGER)", cx - 170, cy - 60);
      } else {
        ctx.fillStyle = "#94A3B8";
        ctx.font = "bold 9px monospace";
        ctx.fillText(`Coherent Superposition Volume: ${totalCoherence.toFixed(0)}%`, cx - 110, cy - 65);
      }

      t++;
      animId = requestAnimationFrame(render);
    };

    if (isPlaying) {
      render();
    }
    return () => cancelAnimationFrame(animId);
  }, [decoherence, coherenceRate, isPlaying]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Sparkles size={16} className="text-earth-sage" />
          <div>
            <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase">CHAPTER 9: FUTURE FRONTIERS</span>
            <h4 className="font-sans text-xs font-bold text-white">Quantum Orchestrated Objective Reduction (Orch-OR) 3D</h4>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          MICROTUBULE TUBULIN LATTICE COHERENCE MODEL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>ENVIRONMENTAL DECOHERENCE (THERMAL NOISE)</span>
            <span className="text-earth-bark font-bold">{decoherence}% TEMP</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={decoherence}
            onChange={(e) => setDecoherence(parseInt(e.target.value))}
            className="w-full accent-red-500 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>QUANTUM RESOUNDING PUMP</span>
            <span className="text-[#92a88e] font-bold">{coherenceRate}% COHERENCE</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={coherenceRate}
            onChange={(e) => setCoherenceRate(parseInt(e.target.value))}
            className="w-full accent-[#92a88e] h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="py-1.5 px-3 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-earth-parchment font-bold transition-all flex items-center justify-center space-x-1.5 self-end"
        >
          <RefreshCw size={10} className={isPlaying ? "animate-spin-slow" : ""} />
          <span>{isPlaying ? "FREEZE COHERENT QUANTUM STATES" : "ENGAGE COHERENCE PUMP"}</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// CHAPTER 10 MODEL: Grand Ontological Convergence 3D (Techno-Ethics Unified Core)
// ============================================================================
export const OntologicalConvergence3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [synthesisLevel, setSynthesisLevel] = useState<number>(65); // %
  const [isRotating, setIsRotating] = useState<boolean>(true);

  const rotationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 240;
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
      ctx.fillStyle = "rgba(27, 20, 17, 1)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      if (isRotating) rotationRef.current += 0.007;
      const cosR = Math.cos(rotationRef.current);
      const sinR = Math.sin(rotationRef.current);

      // 3 pillars of the thesis: NCC (Bio), WBE (Silicon), Neuro-ethics (Value)
      // As synthesisLevel reaches 100%, their spatial separation converges to 0 (fusing in center)
      const maxSeparation = 75;
      const separation = maxSeparation * (1.0 - synthesisLevel / 100);

      const pillars = [
        { name: "NEUROBIOLOGICAL REGISTRY (NCC)", angle: 0, color: "#cfbda8" },
        { name: "SILICON EMULATION SUBSTRATES (WBE)", angle: (Math.PI * 2) / 3, color: "#92a88e" },
        { name: "COGNITIVE SOVEREIGNTY (ETHICS)", angle: (Math.PI * 4) / 3, color: "#cf7d61" }
      ];

      // Draw pillars
      pillars.forEach((p) => {
        const phi = p.angle + rotationRef.current;
        const px = cx + Math.cos(phi) * separation;
        const py = cy + Math.sin(phi) * separation * 0.4;

        // Glow ring for each separate pillar
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color === "#cfbda8" ? "59, 130, 246" : p.color === "#92a88e" ? "16, 185, 129" : "236, 72, 153"}, 0.2)`;
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Vector line to the central converging point
        ctx.strokeStyle = `rgba(255, 255, 255, ${synthesisLevel / 100 * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(cx, cy);
        ctx.stroke();

        // Text
        ctx.font = "8px monospace";
        ctx.fillStyle = p.color;
        ctx.fillText(p.name, px - 60, py + 24);
      });

      // Unified core glowing center of synthesis
      if (synthesisLevel > 50) {
        const unifiedIntensity = (synthesisLevel - 50) / 50;
        const coreRad = 10 + unifiedIntensity * 12;

        const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreRad + 30);
        grad.addColorStop(0, `rgba(245, 158, 11, ${unifiedIntensity * 0.55})`);
        grad.addColorStop(1, "rgba(245, 158, 11, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRad + 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, coreRad, 0, Math.PI * 2);
        ctx.fillStyle = "#F59E0B";
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 9px monospace";
        ctx.fillText("GRAND ONTOLOGICAL CONVERGENCE", cx - 85, cy - 40);
      }

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [synthesisLevel, isRotating]);

  return (
    <div className="my-6 rounded-2xl border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <Compass size={16} className="text-amber-500 animate-spin-slow" />
          <div>
            <span className="font-mono text-[9px] text-amber-500 font-bold block uppercase">CHAPTER 10: CONCLUSION</span>
            <h4 className="font-sans text-xs font-bold text-white">Grand Ontological Convergence Synthesis Engine 3D</h4>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative h-60 w-full rounded-xl bg-earth-dark/50 border border-earth-clay/10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-earth-sand/40 bg-black/50 py-0.5 px-1.5 rounded border border-earth-clay/10">
          CYBERNETIC COGNITION UNIFIED CORE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between text-earth-sand/70">
            <span>EMPIRICAL INTERDISCIPLINARY SYNTHESIS</span>
            <span className="text-earth-bark font-bold">{synthesisLevel}% CONVERGENCE</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={synthesisLevel}
            onChange={(e) => setSynthesisLevel(parseInt(e.target.value))}
            className="w-full accent-amber-500 h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="py-1.5 px-3 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-earth-parchment font-bold transition-all flex items-center justify-center space-x-1.5 self-end"
        >
          <RefreshCw size={10} className={isRotating ? "animate-spin-slow" : ""} />
          <span>{isRotating ? "FREEZE ONTOLOGICAL MATRIX" : "ENGAGE SPIN"}</span>
        </button>
      </div>
    </div>
  );
};
