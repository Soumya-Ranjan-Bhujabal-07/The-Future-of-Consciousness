import React, { useEffect, useRef, useState } from "react";
import { Activity, Shield, Cpu, RefreshCw, Layers } from "lucide-react";

// =========================================================
// 1. 3D Global Workspace Theory Connectome (Canvas-Projected)
// =========================================================

interface NodeGWT {
  id: string;
  name: string;
  module: "prefrontal" | "sensory" | "memory" | "evaluation" | "motor";
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  size: number;
  active: boolean;
}

interface ConnectionGWT {
  from: string;
  to: string;
  weight: number;
}

export const GlobalWorkspaceBroadcast3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Controls state
  const [frequency, setFrequency] = useState<number>(4); // Hz (cycles/sec)
  const [coupling, setCoupling] = useState<number>(75); // %
  const [activeModuleFocus, setActiveModuleFocus] = useState<string>("all");
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<NodeGWT | null>(null);

  // 3D rotation angles
  const angleXRef = useRef<number>(0.3);
  const angleYRef = useRef<number>(0.5);
  const isMouseDown = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Nodes definition (workspace central hub + satellite modules)
  const nodesRef = useRef<NodeGWT[]>([
    // Central Global Workspace Hub (Prefrontal/Thalamic central gateway)
    { id: "hub-1", name: "Thalamocortical Gateway", module: "prefrontal", x: 0, y: 0, z: 0, px: 0, py: 0, size: 7, active: true },
    { id: "hub-2", name: "Prefrontal Core Hub", module: "prefrontal", x: -0.1, y: 0.15, z: -0.1, px: 0, py: 0, size: 6, active: true },
    { id: "hub-3", name: "Anterior Cingulate Router", module: "prefrontal", x: 0.1, y: -0.15, z: 0.1, px: 0, py: 0, size: 5, active: true },

    // Sensory Input Modules (Occipital, Temporal, Parietal)
    { id: "sen-1", name: "Primary Visual Node (V1)", module: "sensory", x: 0.7, y: -0.4, z: -0.5, px: 0, py: 0, size: 4, active: true },
    { id: "sen-2", name: "Somatosensory Cluster", module: "sensory", x: 0.6, y: 0.3, z: -0.4, px: 0, py: 0, size: 4, active: true },
    { id: "sen-3", name: "Auditory Cortex Assembly", module: "sensory", x: 0.8, y: -0.1, z: 0.2, px: 0, py: 0, size: 4, active: true },

    // Memory Storage Assemblies (Hippocampus/Temporal)
    { id: "mem-1", name: "Hippocampal Indexer", module: "memory", x: -0.4, y: -0.5, z: 0.6, px: 0, py: 0, size: 4, active: true },
    { id: "mem-2", name: "Entorhinal Chrono-Map", module: "memory", x: -0.6, y: -0.4, z: 0.3, px: 0, py: 0, size: 3.5, active: true },
    { id: "mem-3", name: "Amygdala Emotional Valence", module: "memory", x: -0.3, y: -0.3, z: 0.5, px: 0, py: 0, size: 4, active: true },

    // Evaluative / Attentional Networks (Parietal/Subcortical)
    { id: "eva-1", name: "Salience Network Node", module: "evaluation", x: -0.2, y: 0.6, z: -0.6, px: 0, py: 0, size: 4.5, active: true },
    { id: "eva-2", name: "Dorsal Attention System", module: "evaluation", x: 0.1, y: 0.7, z: 0.3, px: 0, py: 0, size: 4, active: true },

    // Motor Execution Modules
    { id: "mot-1", name: "Primary Motor Cortex (M1)", module: "motor", x: -0.5, y: 0.4, z: 0.5, px: 0, py: 0, size: 4.5, active: true },
    { id: "mot-2", name: "Cerebellar Coordinating Nodes", module: "motor", x: -0.7, y: 0.2, z: -0.3, px: 0, py: 0, size: 4, active: true }
  ]);

  // Connective edges linking the central workspace hub to external sub-cognitive processors
  const connectionsRef = useRef<ConnectionGWT[]>([
    // Core hub integration
    { from: "hub-1", to: "hub-2", weight: 1.0 },
    { from: "hub-2", to: "hub-3", weight: 1.0 },
    { from: "hub-3", to: "hub-1", weight: 1.0 },

    // Sensory pathways to workspace
    { from: "hub-1", to: "sen-1", weight: 0.8 },
    { from: "hub-2", to: "sen-2", weight: 0.75 },
    { from: "hub-3", to: "sen-3", weight: 0.7 },

    // Memory gateways (Reciprocal connection)
    { from: "hub-1", to: "mem-1", weight: 0.85 },
    { from: "hub-2", to: "mem-2", weight: 0.65 },
    { from: "hub-3", to: "mem-3", weight: 0.7 },

    // Evaluative links
    { from: "hub-2", to: "eva-1", weight: 0.9 },
    { from: "hub-3", to: "eva-2", weight: 0.8 },

    // Motor triggers
    { from: "hub-1", to: "mot-1", weight: 0.8 },
    { from: "hub-2", to: "mot-2", weight: 0.6 },

    // Short-range peripheral links
    { from: "sen-1", to: "sen-2", weight: 0.4 },
    { from: "mem-1", to: "mem-2", weight: 0.5 },
    { from: "mem-1", to: "mem-3", weight: 0.6 },
    { from: "eva-1", to: "eva-2", weight: 0.45 },
    { from: "mot-1", to: "mot-2", weight: 0.5 }
  ]);

  let waveOffset = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle background radial gradient
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, width / 1.5);
      bgGrad.addColorStop(0, "rgba(50, 45, 40, 0.15)");
      bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Rotate angles automatically if active
      if (isRotating && !isMouseDown.current) {
        angleYRef.current += 0.002;
        angleXRef.current = 0.3 + Math.sin(angleYRef.current * 0.5) * 0.15;
      }

      const cosX = Math.cos(angleXRef.current);
      const sinX = Math.sin(angleXRef.current);
      const cosY = Math.cos(angleYRef.current);
      const sinY = Math.sin(angleYRef.current);

      // 3D Perspective settings
      const fov = 260;
      const cameraDistance = 2.0;

      // Filter and project nodes
      const nodes = nodesRef.current.map((node) => {
        // Rotate around Y-axis
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.x * sinY + node.z * cosY;

        // Rotate around X-axis
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = node.y * sinX + z1 * cosX;

        // Perspective Projection
        const scale = fov / (cameraDistance + z2);
        const px = centerX + x1 * scale * 1.5;
        const py = centerY + y2 * scale * 1.5;

        // Update the reference object coordinates for precise mouse tracking & hovering
        node.px = px;
        node.py = py;

        return {
          ...node,
          px,
          py,
          depth: z2,
          scale,
          active: activeModuleFocus === "all" || node.module === activeModuleFocus || node.module === "prefrontal"
        };
      });

      // Sort nodes and draw connections first
      connectionsRef.current.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);

        if (!fromNode || !toNode) return;

        const isPathFocused =
          (activeModuleFocus === "all" ||
            fromNode.module === activeModuleFocus ||
            toNode.module === activeModuleFocus) &&
          (fromNode.active && toNode.active);

        const avgDepth = (fromNode.depth + toNode.depth) / 2;
        const opacity = Math.max(0.05, Math.min(0.7, (1.0 - (avgDepth + 1.2) / 2.4))) * (isPathFocused ? 1.0 : 0.15);

        ctx.beginPath();
        ctx.moveTo(fromNode.px, fromNode.py);
        ctx.lineTo(toNode.px, toNode.py);

        // Highlight connections between workspace prefrontal core and other modules with beautiful sage green
        if (fromNode.module === "prefrontal" && toNode.module !== "prefrontal" && isPathFocused) {
          ctx.strokeStyle = `rgba(146, 168, 142, ${opacity * (coupling / 100)})`;
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = `rgba(207, 189, 168, ${opacity * 0.35})`;
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();

        // Animated Broadcast Signal Wavefronts propagating outwards
        if (isPathFocused && fromNode.module === "prefrontal") {
          const speed = 0.015 * frequency;
          const pos = (waveOffset * speed) % 1.0;

          const waveX = fromNode.px + (toNode.px - fromNode.px) * pos;
          const waveY = fromNode.py + (toNode.py - fromNode.py) * pos;

          ctx.beginPath();
          ctx.arc(waveX, waveY, 2.5, 0, 2 * Math.PI);
          ctx.fillStyle = "#92a88e"; // beautiful sage green signal pulse
          ctx.fill();
        }
      });

      // Sort nodes back-to-front
      const sortedNodes = [...nodes].sort((a, b) => b.depth - a.depth);

      // Draw Nodes
      sortedNodes.forEach((node) => {
        let color = "rgba(140, 125, 112, 0.4)"; // default slate walnut
        let glowColor = "rgba(207, 189, 168, 0.15)";

        if (node.active) {
          if (node.module === "prefrontal") {
            color = "#92a88e"; // Soft moss/sage workspace center
            glowColor = "rgba(146, 168, 142, 0.4)";
          } else if (node.module === "sensory") {
            color = "#cfbda8"; // Warm sand sensory nodes
            glowColor = "rgba(207, 189, 168, 0.3)";
          } else if (node.module === "memory") {
            color = "#8c7d70"; // Wood brown memory nodes
            glowColor = "rgba(140, 125, 112, 0.3)";
          } else if (node.module === "evaluation") {
            color = "#708272"; // Dark forest sage attention nodes
            glowColor = "rgba(112, 130, 114, 0.3)";
          } else if (node.module === "motor") {
            color = "#cf7d61"; // Clay terracotta action nodes
            glowColor = "rgba(207, 125, 97, 0.3)";
          }
        } else {
          color = "rgba(140, 125, 112, 0.15)"; // De-emphasized state
          glowColor = "transparent";
        }

        const nodeSize = node.size * (node.scale / 120);
        const isHovered = hoveredNode && hoveredNode.id === node.id;

        ctx.beginPath();
        ctx.arc(node.px, node.py, nodeSize * (isHovered ? 1.8 : 1.3), 0, 2 * Math.PI);
        ctx.fillStyle = glowColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.px, node.py, nodeSize * (isHovered ? 1.3 : 1.0), 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.strokeStyle = "#1b1411";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Draw pulse wave from central gateway
        if (node.id === "hub-1" && node.active) {
          const pulseRadius = nodeSize * (1.5 + Math.sin(waveOffset * 0.1) * 1.5);
          ctx.beginPath();
          ctx.arc(node.px, node.py, pulseRadius, 0, 2 * Math.PI);
          ctx.strokeStyle = "rgba(146, 168, 142, 0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      waveOffset += 1.2;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [frequency, coupling, activeModuleFocus, isRotating, hoveredNode]);

  // Handle Dragging to rotate
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isMouseDown.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      angleYRef.current += deltaX * 0.007;
      angleXRef.current += deltaY * 0.007;

      angleXRef.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, angleXRef.current));

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    } else {
      let foundNode: NodeGWT | null = null;
      const threshold = 14;

      nodesRef.current.forEach((node) => {
        const dx = mouseX - node.px;
        const dy = mouseY - node.py;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < threshold) {
          foundNode = node;
        }
      });

      setHoveredNode(foundNode);
    }
  };

  const handleMouseUpOrLeave = () => {
    isMouseDown.current = false;
  };

  return (
    <div className="w-full rounded border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl shadow p-5 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-earth-clay/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-earth-forest/20 border border-earth-moss/20 rounded text-earth-sage">
            <Activity size={16} className="animate-pulse" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-earth-sage tracking-wider font-bold block uppercase">
              COGNITIVE SIMULATION ENGINE
            </span>
            <h4 className="font-sans text-sm font-extrabold text-earth-parchment tracking-wide">
              Global Workspace Broadcast Network (3D GWT)
            </h4>
          </div>
        </div>

        {/* Focus Controller */}
        <div className="flex items-center space-x-1.5 self-start md:self-center">
          <span className="font-mono text-[10px] text-earth-sand/40 mr-1.5">NETWORK FOCUS:</span>
          {["all", "sensory", "memory", "evaluation", "motor"].map((m) => (
            <button
              key={m}
              onClick={() => setActiveModuleFocus(m)}
              className={`px-2.5 py-1 rounded font-mono text-[9px] font-bold border transition-all uppercase ${
                activeModuleFocus === m
                  ? "bg-earth-forest/20 border-earth-moss/30 text-earth-sage shadow-sm"
                  : "bg-earth-dark/40 border-earth-clay/15 text-earth-sand/50 hover:text-earth-sand"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Interactive 3D Canvas Projection */}
        <div
          ref={containerRef}
          className="lg:col-span-2 relative h-[300px] md:h-[340px] w-full rounded border border-earth-clay/10 bg-earth-dark/60 overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* User tips overlay */}
          <div className="absolute top-3 left-3 pointer-events-none font-mono text-[8px] text-earth-sand/30 space-y-1">
            <div className="flex items-center space-x-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isRotating ? "bg-earth-sage animate-ping" : "bg-earth-bark"}`} />
              <span className="font-bold">STATUS: {isRotating ? "AUTOROTATING" : "MANUAL_ROTATION"}</span>
            </div>
            <div>PROJECTION: PERSPECTIVE_3D_MATRIX</div>
          </div>

          <div className="absolute bottom-3 right-3 pointer-events-none font-mono text-[8px] text-earth-sand/30 bg-earth-dark/50 py-1 px-2 rounded border border-earth-clay/10">
            DRAG MOUSE TO ROTATE • HOVER COGNITIVE NODES
          </div>

          {/* Node details overlay on hover */}
          {hoveredNode && (
            <div className="absolute bottom-3 left-3 max-w-[240px] bg-earth-dark/95 border border-earth-moss/30 rounded p-2.5 shadow-xl pointer-events-none font-mono text-[9px] text-earth-sand/90 space-y-1">
              <div className="flex justify-between font-bold text-earth-sage">
                <span>{hoveredNode.name.toUpperCase()}</span>
                <span className="text-[8px] bg-earth-forest/20 border border-earth-moss/20 px-1 rounded uppercase text-earth-sage">{hoveredNode.module}</span>
              </div>
              <p className="font-sans text-[10px] text-earth-sand/70 leading-normal">
                {hoveredNode.module === "prefrontal" && "A component of the central workspace gateway, facilitating global coordination and information integration across specialized cortical networks."}
                {hoveredNode.module === "sensory" && "Receives raw physical signals (vision, acoustics, touch), preparing cortical packets for workspace entry."}
                {hoveredNode.module === "memory" && "Saves and recovers episodic structures. Under workspace focus, broadcasts autobiographical frames."}
                {hoveredNode.module === "evaluation" && "Modulates attentional bandwidth. Highlights critical survival alerts for workspace prioritization."}
                {hoveredNode.module === "motor" && "Translates global conscious intentions into structural physical actions, driving biological musculature."}
              </p>
              <div className="text-[8px] text-earth-sand/40 text-right pt-0.5 border-t border-earth-clay/10">
                3D COORD: {hoveredNode.x.toFixed(2)}, {hoveredNode.y.toFixed(2)}, {hoveredNode.z.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Controls and Model Explanations */}
        <div className="flex flex-col justify-between space-y-5">
          <div className="space-y-4 font-sans">
            <div>
              <h5 className="text-xs font-bold text-earth-parchment uppercase tracking-wider mb-1.5 flex items-center">
                <Layers size={12} className="text-earth-sage mr-1.5" />
                Workspace Mechanics
              </h5>
              <p className="text-xs text-earth-sand/70 leading-relaxed">
                Global Workspace Theory (GWT) posits that consciousness acts as a "theater of the mind." Sub-cognitive processes run silently in the background, but when information enters the central workspace hub (sage), it is **globally broadcast** (the pulses you see) to all modules, creating unified awareness.
              </p>
            </div>

            {/* Adjustable Sliders */}
            <div className="space-y-3 pt-3 border-t border-earth-clay/10 font-mono text-[10px]">
              {/* Slider 1: Broadcast Frequency */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-earth-sand/40 font-bold">BROADCAST RATIO</span>
                  <span className="text-earth-sage font-bold">{frequency} Hz (Theta-Alpha)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={frequency}
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="w-full accent-earth-sage h-1 bg-earth-dark/40 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Synaptic Coupling */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-earth-sand/40 font-bold">SYNAPTIC INTEGRATION</span>
                  <span className="text-earth-bark font-bold">{coupling}% COUPLING</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={coupling}
                  onChange={(e) => setCoupling(parseInt(e.target.value))}
                  className="w-full accent-earth-bark h-1 bg-earth-dark/40 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t border-earth-clay/10 pt-3">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`w-full py-2 px-3 rounded font-mono text-[10px] font-bold border transition-all flex items-center justify-center space-x-2 ${
                isRotating
                  ? "bg-earth-forest/20 border-earth-moss/20 text-earth-sage"
                  : "bg-earth-dark/40 border-earth-clay/20 text-earth-sand/50 hover:text-earth-sand"
              }`}
            >
              <RefreshCw size={11} className={isRotating ? "animate-spin-slow" : ""} />
              <span>{isRotating ? "HALT ENGINE AUTOROTATION" : "ENGAGE DEVIATION ROTATION"}</span>
            </button>

            <div className="flex items-center space-x-1.5 p-2 bg-earth-dark/50 border border-earth-clay/10 rounded font-sans text-[10px] text-earth-sand/50">
              <Shield size={12} className="text-earth-sage shrink-0" />
              <span>GWT is backed by modern imaging showing high-amplitude frontoparietal synchronization during conscious processing.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// =========================================================
// 2. Interactive BCI Transduction Model (Tailwind CSS 3D)
// =========================================================

export const SiliconSubstrateCSS3D: React.FC = () => {
  const [exploded, setExploded] = useState<boolean>(true);
  const [synthesisRatio, setSynthesisRatio] = useState<number>(30); // 0% to 100%
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [pulseSignal, setPulseSignal] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseSignal(prev => !prev);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const translateDistance = exploded ? 40 : 15;
  const separationFactor = 1.0 - (synthesisRatio / 100) * 0.7;
  const currentSeparation = translateDistance * separationFactor;

  return (
    <div className="w-full rounded border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl shadow p-5 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-earth-clay/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-earth-forest/20 border border-earth-moss/20 rounded text-earth-sage">
            <Cpu size={16} />
          </div>
          <div>
            <span className="font-mono text-[9px] text-earth-sage tracking-wider font-bold block uppercase">
              INTERFACE HARDWARE TRANSDUCTION
            </span>
            <h4 className="font-sans text-sm font-extrabold text-earth-parchment tracking-wide">
              Carbon-Silicon Synaptic Junction (CSS 3D)
            </h4>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExploded(!exploded)}
            className={`py-1 px-3 rounded font-mono text-[9px] font-bold border transition-all ${
              exploded
                ? "bg-earth-forest/20 border-earth-moss/30 text-earth-sage"
                : "bg-earth-dark/40 border-earth-clay/15 text-earth-sand/50 hover:text-earth-sand"
            }`}
          >
            {exploded ? "COMPACT STRUCTURAL RATIO" : "EXPLODE 3D STACK"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
        {/* The 3D Render Canvas Box using pure CSS 3D perspectives */}
        <div 
          className="lg:col-span-3 h-80 relative rounded border border-earth-clay/10 bg-earth-dark/60 overflow-hidden flex items-center justify-center select-none group"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(146,168,142,0.06),transparent_70%)] pointer-events-none" />

          {/* Isometric rotated frame */}
          <div 
            className="w-72 h-64 relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `rotateX(56deg) rotateZ(-38deg) rotateY(${exploded ? 0 : 4}deg)`,
              transformStyle: "preserve-3d"
            }}
          >
            {/* LAYER 1: SILICON MICROELECTRODE ARRAY (Top layer) */}
            <div 
              onMouseEnter={() => setHoveredLayer("silicon")}
              onMouseLeave={() => setHoveredLayer(null)}
              className={`absolute inset-0 bg-earth-forest/10 border-2 rounded transition-all duration-[800ms] cursor-help p-4 flex flex-col justify-between overflow-hidden shadow ${
                hoveredLayer === "silicon" 
                  ? "border-earth-sage bg-earth-forest/25 scale-[1.02]" 
                  : "border-earth-moss/20"
              }`}
              style={{
                transform: `translateZ(${currentSeparation * 2}px)`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Technical background grids */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 opacity-25 p-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border border-earth-moss/20 rounded-sm flex items-center justify-center">
                    <span className={`w-1 h-1 rounded-full bg-earth-sage ${pulseSignal ? "animate-ping" : ""}`} />
                  </div>
                ))}
              </div>

              {/* Laser signal trace lines overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <path d="M0,40 L60,40 L100,80 L200,80" stroke="#92a88e" strokeWidth="1" fill="none" />
                <path d="M240,160 L180,160 L140,200 L40,200" stroke="#92a88e" strokeWidth="1" fill="none" />
              </svg>

              <div className="flex justify-between items-start font-mono text-[8px] text-earth-sage font-bold z-10" style={{ transform: "translateZ(10px)" }}>
                <span>DECODER MATRIX [Si]</span>
                <span>Z_03</span>
              </div>

              <div className="flex justify-between items-end font-mono text-[7px] text-earth-sand/40 z-10" style={{ transform: "translateZ(10px)" }}>
                <span>BANDWIDTH: 10,000 HZ</span>
                <span>32-CH PROBES</span>
              </div>
            </div>

            {/* LAYER 2: BIOCOMPATIBLE BARRIER HYDROGEL (Middle layer) */}
            <div 
              onMouseEnter={() => setHoveredLayer("hydrogel")}
              onMouseLeave={() => setHoveredLayer(null)}
              className={`absolute inset-0 bg-earth-clay/5 border-2 rounded transition-all duration-[800ms] cursor-help p-4 flex flex-col justify-between overflow-hidden shadow ${
                hoveredLayer === "hydrogel" 
                  ? "border-earth-bark bg-earth-clay/15" 
                  : "border-earth-clay/20"
              }`}
              style={{
                transform: `translateZ(${currentSeparation}px)`,
                transformStyle: "preserve-3d"
              }}
            >
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, #cf7d61 1px, transparent 1px)", backgroundSize: "12px 12px" }} />

              <div className="flex justify-between items-start font-mono text-[8px] text-earth-bark font-bold z-10" style={{ transform: "translateZ(5px)" }}>
                <span>BIOCOMPATIBLE HYDROGEL</span>
                <span>Z_02</span>
              </div>

              {pulseSignal && (
                <div 
                  className="w-3 h-3 rounded-full bg-earth-sand absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" 
                  style={{ transform: "translateZ(15px)" }}
                />
              )}

              <div className="flex justify-between items-end font-mono text-[7px] text-earth-sand/40 z-10" style={{ transform: "translateZ(5px)" }}>
                <span>GLIAL MITIGATION SHIELD</span>
                <span>DIFFUSION_ACTIVE</span>
              </div>
            </div>

            {/* LAYER 3: BIOLOGICAL CORTICAL LAYER (Bottom layer) */}
            <div 
              onMouseEnter={() => setHoveredLayer("cortex")}
              onMouseLeave={() => setHoveredLayer(null)}
              className={`absolute inset-0 bg-earth-forest/5 border-2 rounded transition-all duration-[800ms] cursor-help p-4 flex flex-col justify-between overflow-hidden shadow ${
                hoveredLayer === "cortex" 
                  ? "border-earth-moss bg-earth-forest/15 scale-[0.99]" 
                  : "border-earth-moss/20"
              }`}
              style={{
                transform: `translateZ(-${currentSeparation}px)`,
                transformStyle: "preserve-3d"
              }}
            >
              <div className="absolute inset-0 opacity-35 p-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full bg-earth-sage animate-pulse" />
                  <div className="absolute top-10 left-10 w-px h-16 bg-gradient-to-b from-earth-sage to-transparent" />
                  
                  <div className="absolute bottom-12 right-12 w-2.5 h-2.5 rounded-full bg-earth-sage animate-pulse" />
                  <div className="absolute bottom-12 right-12 w-px h-12 bg-gradient-to-t from-earth-sage to-transparent" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-earth-moss/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start font-mono text-[8px] text-earth-sage font-bold z-10" style={{ transform: "translateZ(3px)" }}>
                <span>CORTICAL NEURONS [C]</span>
                <span>Z_01</span>
              </div>

              <div className="flex justify-between items-end font-mono text-[7px] text-earth-sand/40 z-10" style={{ transform: "translateZ(3px)" }}>
                <span>LAYER IV PYRAMIDAL CELLS</span>
                <span>IONIC_POTENTIALS</span>
              </div>
            </div>
          </div>

          <div className="absolute top-3 left-3 pointer-events-none font-mono text-[8px] text-earth-sand/30 bg-earth-dark/50 py-1 px-2 rounded border border-earth-clay/10">
            ISOMETRIC 3D ROTATION MODEL
          </div>
        </div>

        {/* Detailed context card for hovered layer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded border border-earth-clay/10 bg-earth-dark/50 min-h-[160px] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase tracking-wider">
                LAYER_METADATA_INSPECTOR
              </span>
              
              {!hoveredLayer ? (
                <div className="space-y-1">
                  <h5 className="font-sans text-xs font-bold text-earth-parchment">Hover over a 3D Layer to analyze</h5>
                  <p className="font-sans text-xs text-earth-sand/50 leading-relaxed">
                    Hovering reveals the physical material blueprints of the bio-electronic transduction junction, mapping electrical flow from cellular networks up to silicon arrays.
                  </p>
                </div>
              ) : hoveredLayer === "silicon" ? (
                <div className="space-y-1">
                  <h5 className="font-sans text-xs font-bold text-earth-sage flex items-center">
                    <Cpu size={12} className="mr-1.5" />
                    Layer 3: Silicon Micro-Electrode Array
                  </h5>
                  <p className="font-sans text-xs text-earth-sand/80 leading-relaxed">
                    Consists of dense microelectrode clusters. Captures continuous extracellular field potentials at a scale of 10-100μm, feeding amplified high-frequency voltages into hardware decoders to map motor and linguistic intent.
                  </p>
                </div>
              ) : hoveredLayer === "hydrogel" ? (
                <div className="space-y-1">
                  <h5 className="font-sans text-xs font-bold text-earth-bark flex items-center">
                    <Layers size={12} className="mr-1.5" />
                    Layer 2: Biocompatible Shield
                  </h5>
                  <p className="font-sans text-xs text-earth-sand/80 leading-relaxed">
                    A flexible, porous polymer mesh resembling natural extracellular matrix. Mitigates the foreign-body response and prevents glial scarring, ensuring micro-electrodes remain bio-integrated without tissue rejection.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h5 className="font-sans text-xs font-bold text-earth-sage flex items-center">
                    <Activity size={12} className="mr-1.5" />
                    Layer 1: Biological Cortical Columns
                  </h5>
                  <p className="font-sans text-xs text-earth-sand/80 leading-relaxed">
                    The organic carbon layer containing Layer IV pyramidal cells. Fires action potentials via sodium-potassium channels, generating the baseline cognitive impulses that are mapped by the overlying electrode hardware.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-earth-clay/10 pt-3 font-mono text-[9px] text-earth-sand/40 flex justify-between">
              <span>EXPLODED SCALE: {exploded ? "1.8x EXTENDED" : "1.0x COMPACT"}</span>
              <span className="text-earth-sage font-bold">SYNTHESIS: ACTIVE</span>
            </div>
          </div>

          {/* Integration Slider */}
          <div className="p-4 rounded border border-earth-clay/10 bg-earth-dark/30 space-y-3 font-mono text-[10px]">
            <div className="flex justify-between items-center">
              <span className="text-earth-sand/40 font-bold uppercase tracking-wide">CARBON-TO-SILICON SYNTHESIS DEPTH</span>
              <span className="text-earth-sage font-bold">{synthesisRatio}% SYNTHESIS</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={synthesisRatio}
              onChange={(e) => setSynthesisRatio(parseInt(e.target.value))}
              className="w-full accent-earth-sage h-1 bg-earth-dark/40 rounded-lg cursor-pointer"
            />

            <p className="font-sans text-[10px] leading-relaxed text-earth-sand/40">
              *Synthesis Slider: Pulls the physical layers closer together in 3D space to simulate seamless bio-digital convergence, increasing long-term signal integration and reducing latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
