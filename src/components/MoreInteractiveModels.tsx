import React, { useState, useEffect, useRef } from "react";
import { Zap, Play, Cpu, Layers } from "lucide-react";

// ==========================================
// 1. ConnectomeSpikeSimulator3D
// ==========================================

interface Neuron3D {
  id: number;
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  depth: number;
  scale: number;
  voltage: number; // in mV (rest is -70mV, threshold is -55mV)
  lastFiredTick: number;
  baseColor: string;
}

interface Synapse3D {
  from: number;
  to: number;
  weight: number; // 0 to 1
}

interface SpikeParticle {
  from: number;
  to: number;
  progress: number; // 0 to 1
  px: number;
  py: number;
}

export const ConnectomeSpikeSimulator3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parameter states
  const [synapticWeight, setSynapticWeight] = useState<number>(85); // %
  const [conductionSpeed, setConductionSpeed] = useState<number>(4); // ticks per transmission
  const [refractoryPeriod, setRefractoryPeriod] = useState<number>(30); // ms
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeDendriteFocus, setActiveDendriteFocus] = useState<number | null>(null);

  // 3D rotation parameters
  const angleY = useRef<number>(0.6);
  const angleX = useRef<number>(0.3);
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const neuronsRef = useRef<Neuron3D[]>([]);
  const synapsesRef = useRef<Synapse3D[]>([]);
  const spikesRef = useRef<SpikeParticle[]>([]);
  const ticksRef = useRef<number>(0);

  // Initialize 3D connectome lattice (randomly clustered neural layers)
  useEffect(() => {
    const neurons: Neuron3D[] = [];
    const synapses: Synapse3D[] = [];

    // Create 3 layers of neurons (sensory, interneuron processing, motor output)
    const layers = [-0.6, 0, 0.6]; // z coordinates
    let idCounter = 1;

    layers.forEach((layerZ, layerIdx) => {
      const numNeurons = layerIdx === 1 ? 12 : 6;
      for (let i = 0; i < numNeurons; i++) {
        const angle = (i / numNeurons) * Math.PI * 2 + (layerIdx * 0.5);
        const radius = 0.35 + Math.random() * 0.15;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius + (Math.random() * 0.1 - 0.05);
        
        neurons.push({
          id: idCounter++,
          x,
          y,
          z: layerZ + (Math.random() * 0.1 - 0.05),
          px: 0,
          py: 0,
          depth: 0,
          scale: 0,
          voltage: -70,
          lastFiredTick: -100,
          baseColor: layerIdx === 0 ? "#92a88e" : layerIdx === 1 ? "#cfbda8" : "#cf7d61" // sensory: sage, inter: sand, motor: clay
        });
      }
    });

    neurons.forEach((nFrom) => {
      neurons.forEach((nTo) => {
        if (nFrom.id === nTo.id) return;

        const zDist = nTo.z - nFrom.z;
        if (zDist > 0.2 && zDist < 0.9) {
          const dist = Math.sqrt(Math.pow(nFrom.x - nTo.x, 2) + Math.pow(nFrom.y - nTo.y, 2));
          if (dist < 0.6 && Math.random() > 0.3) {
            synapses.push({
              from: nFrom.id,
              to: nTo.id,
              weight: 0.5 + Math.random() * 0.5
            });
          }
        }
        if (Math.abs(nFrom.z - nTo.z) < 0.15) {
          const dist = Math.sqrt(Math.pow(nFrom.x - nTo.x, 2) + Math.pow(nFrom.y - nTo.y, 2));
          if (dist < 0.4 && Math.random() > 0.6) {
            synapses.push({
              from: nFrom.id,
              to: nTo.id,
              weight: 0.3 + Math.random() * 0.4
            });
          }
        }
      });
    });

    neuronsRef.current = neurons;
    synapsesRef.current = synapses;
  }, []);

  // Handle Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      canvas.width = containerRef.current?.clientWidth || 500;
      canvas.height = 300;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Spike injection trigger
  const injectSpikeAt = (neuronId: number) => {
    const neuron = neuronsRef.current.find((n) => n.id === neuronId);
    if (!neuron) return;

    neuron.voltage = 30;
    neuron.lastFiredTick = ticksRef.current;

    const outbound = synapsesRef.current.filter((s) => s.from === neuronId);
    outbound.forEach((syn) => {
      spikesRef.current.push({
        from: syn.from,
        to: syn.to,
        progress: 0,
        px: 0,
        py: 0
      });
    });
  };

  // Main rendering & simulation tick loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const renderTick = () => {
      ticksRef.current += 1;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Physics: Update voltage decays & spike travel
      neuronsRef.current.forEach((n) => {
        if (n.voltage > -70) {
          if (n.voltage === 30) {
            n.voltage = -85; // hyperpolarization undershoot
          } else {
            n.voltage += (-70 - n.voltage) * 0.08;
          }
        }
      });

      const speedIncr = 1 / Math.max(1, conductionSpeed);
      const activeSpikes: SpikeParticle[] = [];

      spikesRef.current.forEach((spike) => {
        spike.progress += speedIncr;
        if (spike.progress >= 1.0) {
          const target = neuronsRef.current.find((n) => n.id === spike.to);
          const syn = synapsesRef.current.find((s) => s.from === spike.from && s.to === spike.to);

          if (target && syn) {
            const ticksSinceLastFire = ticksRef.current - target.lastFiredTick;
            const isRefractory = ticksSinceLastFire < (refractoryPeriod / 16);

            if (!isRefractory) {
              const weightMultiplier = synapticWeight / 100;
              const charge = syn.weight * 16 * weightMultiplier;
              target.voltage += charge;

              if (target.voltage >= -55) {
                injectSpikeAt(target.id);
              }
            }
          }
        } else {
          activeSpikes.push(spike);
        }
      });
      spikesRef.current = activeSpikes;

      // 2. Draw
      ctx.fillStyle = "rgba(27, 20, 17, 0.4)"; // warm dark earth fill
      ctx.fillRect(0, 0, width, height);

      // Rotate automatically if idle
      if (isRotating && !isDragging.current) {
        angleY.current += 0.003;
        angleX.current = 0.35 + Math.sin(angleY.current * 0.4) * 0.12;
      }

      const cosY = Math.cos(angleY.current);
      const sinY = Math.sin(angleY.current);
      const cosX = Math.cos(angleX.current);
      const sinX = Math.sin(angleX.current);

      const fov = 260;
      const cameraDistance = 2.0;

      // Project neurons to 2D
      neuronsRef.current.forEach((n) => {
        let x1 = n.x * cosY - n.z * sinY;
        let z1 = n.x * sinY + n.z * cosY;
        let y2 = n.y * cosX - z1 * sinX;
        let z2 = n.y * sinX + z1 * cosX;

        const scale = fov / (cameraDistance + z2);
        n.px = centerX + x1 * scale * 1.5;
        n.py = centerY + y2 * scale * 1.5;
        n.depth = z2;
        n.scale = scale;
      });

      // Draw synapses
      synapsesRef.current.forEach((syn) => {
        const from = neuronsRef.current.find((n) => n.id === syn.from);
        const to = neuronsRef.current.find((n) => n.id === syn.to);
        if (!from || !to) return;

        const avgDepth = (from.depth + to.depth) / 2;
        const opacity = Math.max(0.04, Math.min(0.5, (1.0 - (avgDepth + 1.2) / 2.4)));

        ctx.beginPath();
        ctx.moveTo(from.px, from.py);
        ctx.lineTo(to.px, to.py);
        ctx.strokeStyle = `rgba(207, 189, 168, ${opacity * 0.3})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      });

      // Draw traveling spike particles
      spikesRef.current.forEach((spike) => {
        const from = neuronsRef.current.find((n) => n.id === spike.from);
        const to = neuronsRef.current.find((n) => n.id === spike.to);
        if (!from || !to) return;

        const sx = from.px + (to.px - from.px) * spike.progress;
        const sy = from.py + (to.py - from.py) * spike.progress;

        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#cf7d61"; // Warm clay glowing signal packet
        ctx.fill();
      });

      // Draw Neurons (sorted by depth)
      const sortedNeurons = [...neuronsRef.current].sort((a, b) => b.depth - a.depth);
      sortedNeurons.forEach((n) => {
        const size = (4.5 + (n.voltage + 85) / 115 * 3.5) * (n.scale / 120);
        const isHovered = activeDendriteFocus === n.id;

        if (n.voltage > -55 || isHovered) {
          ctx.beginPath();
          ctx.arc(n.px, n.py, size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = n.voltage > 10 ? "rgba(207, 125, 97, 0.25)" : "rgba(146, 168, 142, 0.15)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.px, n.py, size * (isHovered ? 1.4 : 1.0), 0, Math.PI * 2);
        
        if (n.voltage > 0) {
          ctx.fillStyle = "#cf7d61"; // Firing flash
        } else {
          ctx.fillStyle = n.baseColor;
        }

        ctx.strokeStyle = "#1b1411";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        if (isHovered) {
          ctx.fillStyle = "#f4f1ea";
          ctx.font = "bold 8px monospace";
          ctx.fillText(`NEURON_${n.id} (${Math.round(n.voltage)}mV)`, n.px + 10, n.py - 4);
        }
      });

      animId = requestAnimationFrame(renderTick);
    };

    renderTick();
    return () => cancelAnimationFrame(animId);
  }, [synapticWeight, conductionSpeed, refractoryPeriod, isRotating, activeDendriteFocus]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging.current) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;

      angleY.current += dx * 0.007;
      angleX.current += dy * 0.007;
      angleX.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, angleX.current));

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    } else {
      let foundNodeId: number | null = null;
      let minDist = 18;

      neuronsRef.current.forEach((n) => {
        const dx = mouseX - n.px;
        const dy = mouseY - n.py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          foundNodeId = n.id;
        }
      });

      setActiveDendriteFocus(foundNodeId);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleCanvasClick = () => {
    if (activeDendriteFocus !== null) {
      injectSpikeAt(activeDendriteFocus);
    }
  };

  return (
    <div className="w-full rounded border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl shadow p-5 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-earth-clay/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-earth-forest/20 border border-earth-moss/20 rounded text-earth-sage">
            <Zap size={16} className="animate-pulse" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-earth-sage tracking-wider font-bold block uppercase">
              HEBBIAN CONNECTOMIC ENGINE
            </span>
            <h4 className="font-sans text-sm font-extrabold text-earth-parchment tracking-wide">
              3D Neural Cascade & Spike Connectome
            </h4>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const layer0 = neuronsRef.current.filter((n) => n.baseColor === "#92a88e");
              if (layer0.length > 0) {
                const randomNeuron = layer0[Math.floor(Math.random() * layer0.length)];
                injectSpikeAt(randomNeuron.id);
              }
            }}
            className="py-1 px-3 bg-earth-forest/20 border border-earth-moss/30 hover:bg-earth-forest/30 text-earth-sage rounded font-mono text-[9px] font-bold transition-all uppercase flex items-center space-x-1"
          >
            <Play size={10} />
            <span>INJECT SENSORY IMPULSE</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
        {/* The 3D Render Canvas Box */}
        <div 
          className="lg:col-span-3 h-[300px] relative rounded border border-earth-clay/10 bg-earth-dark/60 overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          <div className="absolute top-3 left-3 pointer-events-none font-mono text-[8px] text-earth-sand/30 bg-earth-dark/50 py-1 px-2 rounded border border-earth-clay/10 uppercase">
            3D Connectome Matrix • Click Node to Fire
          </div>
          <div className="absolute bottom-3 right-3 pointer-events-none font-mono text-[8px] text-earth-sage bg-earth-dark/50 py-1 px-2 rounded border border-earth-clay/10">
            PROJECTIONS: SENSORY(SAGE) → INTER(SAND) → MOTOR(CLAY)
          </div>
        </div>

        {/* Adjusters and Readout */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded border border-earth-clay/10 bg-earth-dark/60 space-y-4 font-mono text-[10px]">
            <span className="font-mono text-[9px] text-earth-sand/40 block border-b border-earth-clay/10 pb-1 font-bold uppercase tracking-widest">
              LATTICE_PARAMETER_DECIMATION
            </span>

            {/* Slider 1: Synaptic Weight */}
            <div className="space-y-1">
              <div className="flex justify-between text-earth-sand/70">
                <span>SYNAPTIC WEIGHT (GAIN)</span>
                <span className="text-earth-sage font-bold">{synapticWeight}%</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="150" 
                value={synapticWeight} 
                onChange={(e) => setSynapticWeight(Number(e.target.value))}
                className="w-full h-1 bg-earth-dark/40 rounded-lg appearance-none cursor-pointer accent-earth-sage"
              />
              <span className="text-[8px] text-earth-sand/40 block leading-tight">
                Increases amplitude of recipient voltage per incoming action potential spike.
              </span>
            </div>

            {/* Slider 2: Axonal Transmission speed */}
            <div className="space-y-1">
              <div className="flex justify-between text-earth-sand/70">
                <span>AXON CONDUCTION DELAY</span>
                <span className="text-earth-bark font-bold">{(conductionSpeed * 16).toFixed(0)} ms</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={conductionSpeed} 
                onChange={(e) => setConductionSpeed(Number(e.target.value))}
                className="w-full h-1 bg-earth-dark/40 rounded-lg appearance-none cursor-pointer accent-earth-bark"
              />
              <span className="text-[8px] text-earth-sand/40 block leading-tight">
                Emulates axonal myelination thickness, slowing down signal travel time between synapses.
              </span>
            </div>

            {/* Slider 3: Refractory Period */}
            <div className="space-y-1">
              <div className="flex justify-between text-earth-sand/70">
                <span>REFRACTORY BLOCKING</span>
                <span className="text-earth-bark font-bold">{refractoryPeriod} ms</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="80" 
                value={refractoryPeriod} 
                onChange={(e) => setRefractoryPeriod(Number(e.target.value))}
                className="w-full h-1 bg-earth-dark/40 rounded-lg appearance-none cursor-pointer accent-earth-bark"
              />
              <span className="text-[8px] text-earth-sand/40 block leading-tight">
                The minimum duration a neuron is paralyzed before it can depolarize and fire again.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. ImplantPlacementSimulator3D
// ==========================================

interface CellBody {
  x: number;
  y: number;
  layer: number; // I to VI
  pulseTick: number;
}

export const ImplantPlacementSimulator3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [deviceType, setDeviceType] = useState<"utah" | "neuropixels" | "ecog" | "eeg">("neuropixels");
  const [implantDepth, setImplantDepth] = useState<number>(50); // 0% (surface) to 100% (deep Layer VI)

  const cellsRef = useRef<CellBody[]>([]);
  const signalHistoryRef = useRef<number[]>([]);
  const ticksRef = useRef<number>(0);

  const layers = [
    { name: "Layer I (Molecular)", depthStart: 0, depthEnd: 15, color: "rgba(140, 125, 112, 0.15)" },
    { name: "Layer II/III (External Granular)", depthStart: 15, depthEnd: 40, color: "rgba(146, 168, 142, 0.08)" },
    { name: "Layer IV (Internal Granular)", depthStart: 40, depthEnd: 60, color: "rgba(207, 189, 168, 0.08)" },
    { name: "Layer V (Internal Pyramidal)", depthStart: 60, depthEnd: 85, color: "rgba(207, 125, 97, 0.08)" },
    { name: "Layer VI (Multiform)", depthStart: 85, depthEnd: 100, color: "rgba(112, 130, 114, 0.08)" },
  ];

  useEffect(() => {
    const cells: CellBody[] = [];
    for (let i = 0; i < 45; i++) {
      const yPercent = Math.random() * 100;
      let layer = 1;
      if (yPercent < 15) layer = 1;
      else if (yPercent < 40) layer = 2;
      else if (yPercent < 60) layer = 3;
      else if (yPercent < 85) layer = 4;
      else layer = 5;

      cells.push({
        x: 40 + Math.random() * 320,
        y: yPercent,
        layer,
        pulseTick: Math.random() * 100
      });
    }
    cellsRef.current = cells;
    signalHistoryRef.current = Array.from({ length: 150 }).map(() => 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ticksRef.current += 1;
      const w = canvas.width = containerRef.current?.clientWidth || 500;
      const h = canvas.height = 240;

      const columnWidth = w * 0.55;
      const oscWidth = w * 0.40;

      ctx.fillStyle = "#1b1411"; // warm dark background
      ctx.fillRect(0, 0, w, h);

      // --- DRAW 3D-LIKE CORTICAL COLUMN ---
      layers.forEach((layer) => {
        const yStart = (layer.depthStart / 100) * (h - 40) + 20;
        const yEnd = (layer.depthEnd / 100) * (h - 40) + 20;
        const layerHeight = yEnd - yStart;

        ctx.fillStyle = layer.color;
        ctx.fillRect(15, yStart, columnWidth - 20, layerHeight);

        ctx.strokeStyle = "rgba(207, 189, 168, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(15, yEnd);
        ctx.lineTo(columnWidth - 5, yEnd);
        ctx.stroke();

        ctx.fillStyle = "rgba(244, 241, 234, 0.25)";
        ctx.font = "7px monospace";
        ctx.fillText(layer.name.toUpperCase(), 20, yStart + 10);
      });

      // Draw cellular neural structures
      cellsRef.current.forEach((cell) => {
        const cx = 15 + (cell.x / 400) * (columnWidth - 40);
        const cy = (cell.y / 100) * (h - 40) + 20;

        const isFiring = (ticksRef.current + cell.pulseTick) % 70 < 4;
        
        ctx.beginPath();
        if (cell.layer === 4) {
          ctx.moveTo(cx, cy - 3.5);
          ctx.lineTo(cx - 3, cy + 2.5);
          ctx.lineTo(cx + 3, cy + 2.5);
          ctx.closePath();
        } else {
          ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        }

        ctx.fillStyle = isFiring 
          ? "rgba(207, 125, 97, 0.9)" 
          : cell.layer === 3 ? "rgba(146, 168, 142, 0.5)" : "rgba(207, 189, 168, 0.4)";
        ctx.fill();

        if (isFiring && cell.layer === 4) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx, cy - 14);
          ctx.strokeStyle = "rgba(207,125,97,0.4)";
          ctx.stroke();
        }
      });

      // --- COMPUTE ACTIVE SIGNAL BASED ON DEPTH AND DEVICE ---
      const activeY = (implantDepth / 100) * (h - 40) + 20;
      let waveVal = 0;

      if (deviceType === "utah") {
        const isNearLayer = implantDepth > 38 && implantDepth < 82;
        if (isNearLayer) {
          waveVal = Math.sin(ticksRef.current * 0.8) * 6;
          if (ticksRef.current % 18 === 0) waveVal += (Math.random() > 0.5 ? 24 : -24);
        } else {
          waveVal = (Math.random() - 0.5) * 2;
        }
      } else if (deviceType === "neuropixels") {
        waveVal = Math.sin(ticksRef.current * 0.4) * 8 + Math.cos(ticksRef.current * 1.5) * 5;
        if (ticksRef.current % 12 === 0) waveVal += (Math.random() > 0.5 ? 18 : -18);
        if (ticksRef.current % 34 === 0) waveVal += (Math.random() > 0.5 ? -28 : 28);
      } else if (deviceType === "ecog") {
        waveVal = Math.sin(ticksRef.current * 0.22) * 16 + Math.sin(ticksRef.current * 0.8) * 8;
        waveVal += (Math.random() - 0.5) * 4;
      } else {
        waveVal = Math.sin(ticksRef.current * 0.08) * 26 + Math.cos(ticksRef.current * 0.03) * 12;
        waveVal += (Math.random() - 0.5) * 1.5;
      }

      // Add to history
      signalHistoryRef.current.push(waveVal);
      if (signalHistoryRef.current.length > oscWidth - 10) {
        signalHistoryRef.current.shift();
      }

      // --- DRAW OSCILLOSCOPE READOUT PANEL ---
      const oscXStart = columnWidth + 5;
      ctx.fillStyle = "rgba(27, 20, 17, 0.7)";
      ctx.fillRect(oscXStart, 20, oscWidth - 15, h - 40);
      ctx.strokeStyle = "rgba(207, 189, 168, 0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(oscXStart, 20, oscWidth - 15, h - 40);

      // Grid inside oscilloscope
      ctx.strokeStyle = "rgba(146, 168, 142, 0.04)";
      for (let ox = oscXStart; ox < oscXStart + oscWidth; ox += 25) {
        ctx.beginPath(); ctx.moveTo(ox, 20); ctx.lineTo(ox, h - 20); ctx.stroke();
      }
      for (let oy = 20; oy < h - 20; oy += 20) {
        ctx.beginPath(); ctx.moveTo(oscXStart, oy); ctx.lineTo(oscXStart + oscWidth - 15, oy); ctx.stroke();
      }

      // Waveform line
      ctx.beginPath();
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = deviceType === "utah" ? "#cf7d61" : deviceType === "neuropixels" ? "#92a88e" : deviceType === "ecog" ? "#cfbda8" : "#8c7d70";
      
      signalHistoryRef.current.forEach((val, idx) => {
        const ox = oscXStart + idx;
        const oy = (h / 2) + val;
        if (idx === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
      });
      ctx.stroke();

      ctx.fillStyle = "#cfbda8";
      ctx.font = "bold 6.5px monospace";
      ctx.fillText("OSCILLOSCOPE_CHANNEL_01", oscXStart + 8, 32);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillText(`${deviceType.toUpperCase()}_MODE_ACTIVE`, oscXStart + 8, h - 28);

      // --- DRAW THE IMPLANT PROBE GRAPHIC ---
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(244, 241, 234, 0.65)";
      ctx.fillStyle = "rgba(244, 241, 234, 0.8)";

      if (deviceType === "utah") {
        const depthY = activeY;
        ctx.beginPath();
        ctx.moveTo(columnWidth / 2 - 25, depthY - 15);
        ctx.lineTo(columnWidth / 2 + 25, depthY - 15);
        ctx.stroke();
        for (let sp = -20; sp <= 20; sp += 8) {
          ctx.beginPath();
          ctx.moveTo(columnWidth / 2 + sp, depthY - 15);
          ctx.lineTo(columnWidth / 2 + sp, depthY);
          ctx.strokeStyle = "#cf7d61";
          ctx.stroke();
        }
      } else if (deviceType === "neuropixels") {
        ctx.beginPath();
        ctx.moveTo(columnWidth / 2, 20);
        ctx.lineTo(columnWidth / 2, activeY);
        ctx.strokeStyle = "#92a88e";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        for (let dotY = 25; dotY <= activeY; dotY += 12) {
          ctx.beginPath();
          ctx.arc(columnWidth / 2, dotY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (deviceType === "ecog") {
        ctx.fillStyle = "rgba(207,189,168,0.3)";
        ctx.strokeStyle = "#cfbda8";
        ctx.lineWidth = 1.5;
        ctx.fillRect(columnWidth / 2 - 35, 20, 70, 4);
        ctx.strokeRect(columnWidth / 2 - 35, 20, 70, 4);
      } else {
        ctx.fillStyle = "rgba(146, 168, 142, 0.3)";
        ctx.strokeStyle = "#92a88e";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(columnWidth / 2, 10, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [deviceType, implantDepth]);

  return (
    <div className="w-full rounded border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl shadow p-5 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-earth-clay/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-earth-forest/20 border border-earth-moss/20 rounded text-earth-sage">
            <Cpu size={16} />
          </div>
          <div>
            <span className="font-mono text-[9px] text-earth-sage tracking-wider font-bold block uppercase">
              CORTICAL TRANSLATION SYSTEM
            </span>
            <h4 className="font-sans text-sm font-extrabold text-earth-parchment tracking-wide">
              Electrode Depth Oscilloscope & Implant Simulator
            </h4>
          </div>
        </div>

        {/* Device Selection Tab Buttons */}
        <div className="flex bg-earth-dark/40 rounded p-0.5 border border-earth-clay/10 font-mono text-[9px]">
          {["utah", "neuropixels", "ecog", "eeg"].map((dev) => (
            <button
              key={dev}
              onClick={() => {
                setDeviceType(dev as any);
                if (dev === "ecog") setImplantDepth(0);
                if (dev === "eeg") setImplantDepth(-10);
              }}
              className={`py-1 px-2.5 rounded font-bold transition-all uppercase ${
                deviceType === dev 
                  ? "bg-earth-forest/20 text-earth-sage border border-earth-moss/30 shadow-sm" 
                  : "text-earth-sand/50 hover:text-earth-sand"
              }`}
            >
              {dev}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        {/* Visual Cortical Column */}
        <div className="lg:col-span-3 h-[240px] relative rounded border border-earth-clay/10 bg-earth-dark/50 overflow-hidden flex items-center justify-center select-none" ref={containerRef}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
          <div className="p-4 rounded border border-earth-clay/10 bg-earth-dark/60 space-y-4 font-mono text-[10px] flex-1">
            <span className="font-mono text-[9px] text-earth-sand/40 block border-b border-earth-clay/10 pb-1 font-bold uppercase tracking-widest">
              Implant Specifications
            </span>

            {/* Depth slider (active only for Utah / Neuropixels) */}
            <div className="space-y-1">
              <div className="flex justify-between text-earth-sand/70">
                <span>CORTICAL DEPTH PLACEMENT</span>
                <span className="text-earth-sage font-bold">
                  {deviceType === "eeg" ? "External (above skull)" : deviceType === "ecog" ? "Surface Sub-Dural" : `${implantDepth}% (${(implantDepth * 0.02).toFixed(2)}mm)`}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                disabled={deviceType === "ecog" || deviceType === "eeg"}
                value={implantDepth} 
                onChange={(e) => setImplantDepth(Number(e.target.value))}
                className="w-full h-1 bg-earth-dark/40 rounded-lg appearance-none cursor-pointer accent-earth-sage disabled:opacity-20 disabled:cursor-not-allowed"
              />
              <span className="text-[8px] text-earth-sand/40 block leading-tight">
                Utah Arrays penetrate 1.5mm to Layer IV. Neuropixels scan the entire 2.0mm depth across layers. ECoG rests on dural surface.
              </span>
            </div>

            {/* Microelectrode physics description */}
            <div className="pt-2 border-t border-earth-clay/10">
              <span className="text-[9px] text-earth-sand/50 font-bold uppercase tracking-wider block mb-1">Decoded Signal Characteristics</span>
              <p className="text-[8.5px] text-earth-sand/60 leading-relaxed font-sans">
                {deviceType === "utah" && "UTAH ARRAY: Captures sharp, localized 10,000Hz voltage spikes (extracellular single-unit action potentials) in Layer IV/V. Extremely high spatial resolution but high tissue scarring risk."}
                {deviceType === "neuropixels" && "NEUROPIXELS THREAD: Registures spike discharges across all 6 layers simultaneously with 960 micro-probes, enabling massive structural pathway tracing and mapping of cortical workflows."}
                {deviceType === "ecog" && "SURFACE ECOG: Registers aggregate micro-volt currents (Local Field Potentials) of the outer molecular sheet. Non-penetrative, low tissue reaction, with high high-gamma band resolution."}
                {deviceType === "eeg" && "SCALP EEG: Non-invasive, registers wide area micro-volt brain waves filtered through the high impedance bone barrier. Excellent temporal speed but poor local resolution."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
