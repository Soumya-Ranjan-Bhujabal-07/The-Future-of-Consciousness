import React, { useEffect, useRef, useState } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  px: number; // projected x
  py: number; // projected y
  baseColor: string;
  size: number;
}

export const InteractiveBrain3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.003);
  const [hoverNodeInfo, setHoverNodeInfo] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = containerRef.current?.clientWidth || 300;
    let height = canvas.height = containerRef.current?.clientHeight || 300;

    // Generate brain shape nodes in 3D
    const nodes: Node3D[] = [];
    const nodeCount = 180;

    // Seed pseudo-random brain-like structures (two hemispheres)
    for (let i = 0; i < nodeCount; i++) {
      const isLeft = Math.random() > 0.5;
      const theta = Math.random() * Math.PI;
      const phi = (Math.random() * Math.PI) - (isLeft ? Math.PI : 0);

      // Math modelling for a multi-lobed brain structure
      const rX = 0.95 + 0.15 * Math.sin(theta * 3);
      const rY = 0.75 + 0.1 * Math.cos(phi * 4);
      const rZ = 0.85 + 0.15 * Math.sin(theta * 2);

      // Separate hemispheres slightly on X axis
      const hemisphereOffset = isLeft ? -0.15 : 0.15;

      const x = rX * Math.sin(theta) * Math.cos(phi) + hemisphereOffset;
      const y = rY * Math.sin(theta) * Math.sin(phi) * 1.1; // elongated vertically
      const z = rZ * Math.cos(theta) * 0.9;

      // Color mapping: Earthy colors (sage green, moss green, warm wood brown, clay terracotta)
      const colorRandom = Math.random();
      let baseColor = "rgba(143, 168, 145, 0.7)"; // Sage Green
      if (colorRandom < 0.3) {
        baseColor = "rgba(140, 115, 85, 0.7)"; // Wood Brown
      } else if (colorRandom < 0.6) {
        baseColor = "rgba(58, 74, 60, 0.75)"; // Moss Green
      } else if (colorRandom < 0.8) {
        baseColor = "rgba(176, 117, 89, 0.65)"; // Terracotta Clay
      }

      nodes.push({
        x,
        y,
        z,
        px: 0,
        py: 0,
        baseColor,
        size: Math.random() * 2.2 + 1,
      });
    }

    // Add neural stem
    for (let i = 0; i < 20; i++) {
      const theta = (i / 20) * Math.PI * 2;
      const r = 0.15 + Math.random() * 0.05;
      const x = r * Math.cos(theta);
      const y = 0.95 + (i / 20) * 0.6; // extending downwards
      const z = r * Math.sin(theta);
      nodes.push({
        x,
        y,
        z,
        px: 0,
        py: 0,
        baseColor: "rgba(140, 115, 85, 0.5)", // Muted wood brown
        size: Math.random() * 1.5 + 0.8,
      });
    }

    let angleY = 0;
    let angleX = 0.2; // slight downward tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetAngleY = 0;
    let targetAngleX = 0.2;
    let canvasMouseX: number | null = null;
    let canvasMouseY: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x - width / 2) / (width / 2);
      mouseY = (y - height / 2) / (height / 2);
      canvasMouseX = x;
      canvasMouseY = y;

      // Push rotation target
      targetAngleY = mouseX * 0.8;
      targetAngleX = mouseY * 0.5 + 0.2;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
      targetAngleY = 0;
      targetAngleX = 0.2;
      canvasMouseX = null;
      canvasMouseY = null;
    };

    const handleScroll = () => {
      const depth = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setRotationSpeed(0.003 + depth * 0.015);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current) {
          width = canvas.width = entry.contentRect.width || 300;
          height = canvas.height = entry.contentRect.height || 300;
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Organic Neurological Structure Labels
    const structures = [
      "Thalamocortical Signal Pathway",
      "Local Cortical Microcircuit",
      "Synaptic Density Distribution",
      "Intracellular Signal Propagation",
      "Global Neuronal Workspace Node",
      "Prefrontal Executive Assembly",
      "Hippocampal Memory Trace Mapping",
      "Electrophysiological Recording Node"
    ];

    let ticks = 0;

    // Render loop
    const tick = () => {
      ticks++;
      ctx.clearRect(0, 0, width, height);

      // Smooth easing of target angles
      angleY += (targetAngleY + ticks * rotationSpeed - angleY) * 0.05;
      angleX += (targetAngleX - angleX) * 0.05;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const fov = 160; // field of view
      const centerX = width / 2;
      const centerY = height / 2;
      const scaleFactor = Math.min(width, height) * 0.32;

      let closestNode: Node3D | null = null;
      let closestDist = 999999;

      // Project nodes
      nodes.forEach((node) => {
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        const depthScale = fov / (fov + z2);
        node.px = centerX + x1 * scaleFactor * depthScale;
        node.py = centerY + y2 * scaleFactor * depthScale;

        let displaceX = 0;
        let displaceY = 0;
        let isHovered = false;

        if (canvasMouseX !== null && canvasMouseY !== null) {
          const dx = node.px - canvasMouseX;
          const dy = node.py - canvasMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < closestDist) {
            closestDist = dist;
            closestNode = node;
          }

          if (dist < 45) {
            isHovered = true;
            const force = (45 - dist) / 45 * 10;
            displaceX = (dx / (dist || 1)) * force;
            displaceY = (dy / (dist || 1)) * force;
          }
        }

        const renderX = node.px + displaceX;
        const renderY = node.py + displaceY;

        ctx.beginPath();
        const alpha = Math.max(0.12, depthScale * 0.7);
        ctx.arc(renderX, renderY, node.size * depthScale * (isHovered ? 1.6 : 1.0), 0, Math.PI * 2);

        let colorStr = node.baseColor;
        
        if (isHovered) {
          colorStr = "rgba(217, 164, 115, 0.95)"; // Warm terracotta highlight on hover
        }

        ctx.fillStyle = colorStr.replace("0.7", alpha.toString()).replace("0.6", alpha.toString()).replace("0.5", alpha.toString());
        ctx.shadowBlur = isHovered ? 8 : 0;
        ctx.shadowColor = isHovered ? "#d9a473" : "transparent";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw synapses between nearby nodes
      ctx.lineWidth = 0.5;
      const maxDistanceSq = (width * 0.08) * (width * 0.08);

      for (let i = 0; i < nodes.length; i += 2) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 4) {
          const nodeB = nodes[j];
          const dx = nodeA.px - nodeB.px;
          const dy = nodeA.py - nodeB.py;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const alpha = (1 - distSq / maxDistanceSq) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodeA.px, nodeA.py);
            ctx.lineTo(nodeB.px, nodeB.py);
            ctx.strokeStyle = `rgba(143, 168, 145, ${alpha})`; // Sage green synaptic line
            ctx.stroke();
          }
        }
      }

      if (closestNode && closestDist < 35) {
        const nodeIndex = Math.abs(Math.floor((closestNode as Node3D).x * 1234 + (closestNode as Node3D).y * 5678)) % structures.length;
        setHoverNodeInfo(structures[nodeIndex]);
      } else if (ticks % 120 === 0 && Math.random() > 0.6) {
        setHoverNodeInfo(structures[Math.floor(Math.random() * structures.length)]);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [rotationSpeed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center border border-earth-clay/10 rounded-xl bg-earth-walnut/20 backdrop-blur-xl overflow-hidden group select-none cursor-pointer shadow-md shadow-black/5"
    >
      <div className="absolute bottom-4 left-5 font-mono text-[11px] text-earth-sand/80 pointer-events-none transition-all duration-300">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-earth-sage mr-2" />
        {hoverNodeInfo || "Active Synaptic Network Map"}
      </div>

      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
