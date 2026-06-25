import React, { useState, useEffect } from "react";
import { LineChart, Sliders, Play, Pause, Zap, Activity } from "lucide-react";

// ==========================================
// 1. UnsplashFigure (Scholarly Frame & Caption)
// ==========================================

interface UnsplashFigureProps {
  src: string;
  alt: string;
  figNum: string;
  title: string;
  caption: string;
}

export const UnsplashFigure: React.FC<UnsplashFigureProps> = ({
  src,
  alt,
  figNum,
  title,
  caption,
}) => {
  return (
    <figure className="my-8 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/40 max-w-3xl mx-auto">
      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 group">
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out scale-100 group-hover:scale-[1.02]"
        />
        {/* Subtle glass overlay elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        {/* Technical tag floating in corner */}
        <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#00F2FE] bg-black/75 px-2.5 py-0.5 rounded border border-[#00F2FE]/20 uppercase tracking-widest font-bold">
          {figNum} // CORE_SCHEMATIC
        </div>
      </div>
      <figcaption className="mt-4 text-xs text-slate-300 leading-relaxed pl-3 border-l-2 border-[#00F2FE] font-sans">
        <span className="font-mono text-[10px] text-white font-bold mr-1.5 uppercase tracking-wide">
          {figNum}: {title}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
};


// ====================================================
// 2. Interactive BCI Signal & Waveform Processor (SVG)
// ====================================================

export const EEGWaveformSimulator: React.FC = () => {
  const [filterMode, setFilterMode] = useState<"raw" | "bandpass" | "ica">("raw");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [noiseLevel, setNoiseLevel] = useState<number>(40); // %
  const [timeStep, setTimeStep] = useState<number>(0);

  // Animation frame loop for continuous signal movement
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    const tick = () => {
      setTimeStep((t) => t + 1);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Generate SVG path for waveform based on timeStep and filter mode
  const width = 500;
  const height = 120;
  const points: [number, number][] = [];

  for (let x = 0; x <= width; x += 2) {
    const t = (x + timeStep * 1.5) * 0.05;
    let y = height / 2;

    if (filterMode === "raw") {
      // Raw signal: combination of high-freq muscle noise, low-freq drift, and primary waves
      const brainWave = 22 * Math.sin(t * 0.8) + 12 * Math.sin(t * 2.2);
      const highFreqNoise = (noiseLevel / 100) * 20 * Math.sin(t * 12.0) * Math.sin(t * 7.5);
      const muscleSaccade = (noiseLevel / 100) * 14 * Math.cos(t * 0.15); // slow drift
      y += brainWave + highFreqNoise + muscleSaccade;
    } else if (filterMode === "bandpass") {
      // Clean isolated cortical oscillation (theta/alpha 4-12Hz)
      const isolatedWave = 24 * Math.sin(t * 0.8) + 8 * Math.sin(t * 2.2);
      // extremely small trace noise
      const minuteNoise = 2.0 * Math.sin(t * 15.0);
      y += isolatedWave + minuteNoise;
    } else {
      // Independent Component Analysis (ICA) - clean spatial components (e.g. blink artifact removed)
      // High signal regularity, pristine biological rhythm
      const rhythmicP300 = 26 * Math.sin(t * 0.8);
      y += rhythmicP300;
    }

    points.push([x, y]);
  }

  const dPath = points.map((p, idx) => `${idx === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");

  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-5 max-w-3xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <LineChart size={14} />
          </div>
          <div>
            <span className="font-mono text-[9px] text-teal-400 font-bold block">SIGNAL PROCESSING TELEMETRY</span>
            <h4 className="font-sans text-xs font-bold text-slate-200">Interactive BCI Waveform Filter System</h4>
          </div>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5 self-start sm:self-center font-mono text-[9px]">
          <button
            onClick={() => setFilterMode("raw")}
            className={`py-1 px-2.5 rounded font-bold transition-all ${
              filterMode === "raw" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            RAW STREAMS
          </button>
          <button
            onClick={() => setFilterMode("bandpass")}
            className={`py-1 px-2.5 rounded font-bold transition-all ${
              filterMode === "bandpass" ? "bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            BANDPASS FILTER
          </button>
          <button
            onClick={() => setFilterMode("ica")}
            className={`py-1 px-2.5 rounded font-bold transition-all ${
              filterMode === "ica" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            ICA COMPONENT
          </button>
        </div>
      </div>

      {/* SVG Waveform Viewer */}
      <div className="relative bg-black/60 rounded-xl border border-white/5 h-36 overflow-hidden flex items-center justify-center p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Waveform line */}
          <path
            d={dPath}
            fill="none"
            stroke={
              filterMode === "raw"
                ? "rgba(239, 68, 68, 0.85)"
                : filterMode === "bandpass"
                ? "rgba(0, 242, 254, 0.9)"
                : "rgba(16, 185, 129, 0.9)"
            }
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-500"
          />

          {/* Reference Centerline */}
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
        </svg>

        {/* Floating noise marker for raw stream */}
        {filterMode === "raw" && (
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 font-mono text-[8px] text-red-400 bg-red-950/20 border border-red-500/15 py-0.5 px-2 rounded-full animate-pulse">
            <Zap size={9} />
            <span>HEAVY MYOGRAPHIC NOISE</span>
          </div>
        )}

        {filterMode === "bandpass" && (
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 font-mono text-[8px] text-[#00F2FE] bg-[#00F2FE]/10 border border-[#00F2FE]/20 py-0.5 px-2 rounded-full">
            <Activity size={9} className="animate-pulse" />
            <span>4-12 HZ ISOLATION COHERENT</span>
          </div>
        )}

        {filterMode === "ica" && (
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 font-mono text-[8px] text-emerald-400 bg-emerald-950/20 border border-emerald-500/15 py-0.5 px-2 rounded-full">
            <Sliders size={9} />
            <span>OCULAR ARTIFACTS REMOVED (99.8%)</span>
          </div>
        )}
      </div>

      {/* Adjusters and Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch font-sans">
        <div className="md:col-span-2 p-3.5 rounded-xl border border-white/5 bg-[#0B0F19]/40 flex flex-col justify-between">
          <p className="text-xs text-slate-400 leading-relaxed">
            {filterMode === "raw" && (
              <strong>Raw Streams:</strong> + " raw EEG contains muscle clenching, ocular movements, and baseline skin potential drifts that swamp microscopic neural signals. High-bandwidth capturing requires active spatial filters to reveal cognitive signals."
            )}
            {filterMode === "bandpass" && (
              <strong>Bandpass Filter (4–12 Hz):</strong> + " eliminates muscular high-frequency electrical bursts and slow direct-current drift, carving out clean alpha and theta oscillations representing calm focus and internal visualization."
            )}
            {filterMode === "ica" && (
              <strong>Independent Component Analysis (ICA):</strong> + " mathematically decomposes overlapping electrical sources. It identifies and subtracts eye blinks or cardiac telemetry from scalp recordings, rendering pristine cognitive components."
            )}
          </p>

          <div className="font-mono text-[9px] text-slate-500 border-t border-white/5 pt-2 mt-2 flex justify-between">
            <span>TIME_INDEX: {timeStep}</span>
            <span>FREQ_SPECTRUM: FAST_FOURIER_TRANSFORM</span>
          </div>
        </div>

        {/* Controls block */}
        <div className="p-3.5 rounded-xl border border-white/5 bg-[#0B0F19]/25 flex flex-col justify-between space-y-3">
          <div className="space-y-2 font-mono text-[10px]">
            <span className="text-slate-500 font-bold uppercase block">Filter Controls</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full py-1.5 px-3 rounded border border-white/10 bg-white/5 text-slate-300 hover:text-white transition-colors flex items-center justify-center space-x-1.5"
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
              <span>{isPlaying ? "FREEZE SIMULATION" : "RESUME WAVEFORM"}</span>
            </button>
          </div>

          {filterMode === "raw" && (
            <div className="space-y-1 font-mono text-[9px]">
              <div className="flex justify-between">
                <span className="text-slate-500">SIMULATE NOISE AMPLITUDE</span>
                <span className="text-red-400 font-bold">{noiseLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                className="w-full accent-red-500 h-1 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
