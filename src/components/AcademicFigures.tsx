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
    <figure className="my-8 p-4 rounded border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl shadow-xl max-w-3xl mx-auto">
      <div className="relative aspect-video rounded overflow-hidden border border-earth-clay/10 group">
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out scale-100 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/80 via-earth-dark/20 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-3 left-3 font-mono text-[9px] text-earth-sage bg-earth-dark/75 px-2.5 py-0.5 rounded border border-earth-moss/20 uppercase tracking-widest font-bold">
          {figNum} // CORE_SCHEMATIC
        </div>
      </div>
      <figcaption className="mt-4 text-xs text-earth-sand/70 leading-relaxed pl-3 border-l-2 border-earth-sage font-sans">
        <span className="font-mono text-[10px] text-earth-parchment font-bold mr-1.5 uppercase tracking-wide">
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

  const width = 500;
  const height = 120;
  const points: [number, number][] = [];

  for (let x = 0; x <= width; x += 2) {
    const t = (x + timeStep * 1.5) * 0.05;
    let y = height / 2;

    if (filterMode === "raw") {
      const brainWave = 22 * Math.sin(t * 0.8) + 12 * Math.sin(t * 2.2);
      const highFreqNoise = (noiseLevel / 100) * 20 * Math.sin(t * 12.0) * Math.sin(t * 7.5);
      const muscleSaccade = (noiseLevel / 100) * 14 * Math.cos(t * 0.15);
      y += brainWave + highFreqNoise + muscleSaccade;
    } else if (filterMode === "bandpass") {
      const isolatedWave = 24 * Math.sin(t * 0.8) + 8 * Math.sin(t * 2.2);
      const minuteNoise = 2.0 * Math.sin(t * 15.0);
      y += isolatedWave + minuteNoise;
    } else {
      const rhythmicP300 = 26 * Math.sin(t * 0.8);
      y += rhythmicP300;
    }

    points.push([x, y]);
  }

  const dPath = points.map((p, idx) => `${idx === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");

  return (
    <div className="my-8 rounded border border-earth-clay/15 bg-earth-walnut/20 backdrop-blur-xl shadow-xl p-5 max-w-3xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-earth-clay/10 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-earth-forest/20 border border-earth-moss/20 text-earth-sage">
            <LineChart size={14} />
          </div>
          <div>
            <span className="font-mono text-[9px] text-earth-sage font-bold block uppercase">SIGNAL PROCESSING TELEMETRY</span>
            <h4 className="font-sans text-xs font-bold text-earth-parchment">Interactive BCI Waveform Filter System</h4>
          </div>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex bg-earth-dark/40 rounded p-0.5 border border-earth-clay/10 self-start sm:self-center font-mono text-[9px]">
          <button
            onClick={() => setFilterMode("raw")}
            className={`py-1 px-2.5 rounded font-bold transition-all ${
              filterMode === "raw" ? "bg-earth-clay/20 text-earth-bark border border-earth-clay/30" : "text-earth-sand/50 hover:text-earth-sand"
            }`}
          >
            RAW STREAMS
          </button>
          <button
            onClick={() => setFilterMode("bandpass")}
            className={`py-1 px-2.5 rounded font-bold transition-all ${
              filterMode === "bandpass" ? "bg-earth-forest/20 text-earth-sage border border-earth-moss/30" : "text-earth-sand/50 hover:text-earth-sand"
            }`}
          >
            BANDPASS FILTER
          </button>
          <button
            onClick={() => setFilterMode("ica")}
            className={`py-1 px-2.5 rounded font-bold transition-all ${
              filterMode === "ica" ? "bg-earth-forest/10 text-earth-sage border border-earth-moss/25" : "text-earth-sand/50 hover:text-earth-sand"
            }`}
          >
            ICA COMPONENT
          </button>
        </div>
      </div>

      {/* SVG Waveform Viewer */}
      <div className="relative bg-earth-dark/60 rounded border border-earth-clay/10 h-36 overflow-hidden flex items-center justify-center p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Waveform line */}
          <path
            d={dPath}
            fill="none"
            stroke={
              filterMode === "raw"
                ? "#cf7d61" // Clay Terracotta
                : filterMode === "bandpass"
                ? "#92a88e" // Sage Green
                : "#cfbda8" // Sand
            }
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-500"
          />

          {/* Reference Centerline */}
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="rgba(207, 189, 168, 0.05)" strokeDasharray="4 4" />
        </svg>

        {/* Floating noise marker for raw stream */}
        {filterMode === "raw" && (
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 font-mono text-[8px] text-earth-bark bg-earth-clay/10 border border-earth-clay/20 py-0.5 px-2 rounded-full animate-pulse">
            <Zap size={9} />
            <span>HEAVY MYOGRAPHIC NOISE</span>
          </div>
        )}

        {filterMode === "bandpass" && (
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 font-mono text-[8px] text-earth-sage bg-earth-forest/20 border border-earth-moss/30 py-0.5 px-2 rounded-full">
            <Activity size={9} className="animate-pulse" />
            <span>4-12 HZ ISOLATION COHERENT</span>
          </div>
        )}

        {filterMode === "ica" && (
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 font-mono text-[8px] text-earth-sage bg-earth-forest/10 border border-earth-moss/20 py-0.5 px-2 rounded-full">
            <Sliders size={9} />
            <span>OCULAR ARTIFACTS REMOVED (99.8%)</span>
          </div>
        )}
      </div>

      {/* Adjusters and Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch font-sans">
        <div className="md:col-span-2 p-3.5 rounded border border-earth-clay/10 bg-earth-dark/40 flex flex-col justify-between">
          <p className="text-xs text-earth-sand/70 leading-relaxed">
            {filterMode === "raw" && (
              <span><strong>Raw Streams:</strong> Raw EEG contains muscle clenching, ocular movements, and baseline skin potential drifts that swamp microscopic neural signals. High-bandwidth capturing requires active spatial filters to reveal cognitive signals.</span>
            )}
            {filterMode === "bandpass" && (
              <span><strong>Bandpass Filter (4–12 Hz):</strong> Eliminates muscular high-frequency electrical bursts and slow direct-current drift, carving out clean alpha and theta oscillations representing calm focus and internal visualization.</span>
            )}
            {filterMode === "ica" && (
              <span><strong>Independent Component Analysis (ICA):</strong> Mathematically decomposes overlapping electrical sources. It identifies and subtracts eye blinks or cardiac telemetry from scalp recordings, rendering pristine cognitive components.</span>
            )}
          </p>

          <div className="font-mono text-[9px] text-earth-sand/40 border-t border-earth-clay/10 pt-2 mt-2 flex justify-between">
            <span>TIME_INDEX: {timeStep}</span>
            <span>FREQ_SPECTRUM: FAST_FOURIER_TRANSFORM</span>
          </div>
        </div>

        {/* Controls block */}
        <div className="p-3.5 rounded border border-earth-clay/10 bg-earth-dark/25 flex flex-col justify-between space-y-3">
          <div className="space-y-2 font-mono text-[10px]">
            <span className="text-earth-sand/40 font-bold uppercase block">Filter Controls</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full py-1.5 px-3 rounded border border-earth-clay/10 bg-earth-dark/50 text-earth-sand/70 hover:text-earth-sand transition-colors flex items-center justify-center space-x-1.5"
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
              <span>{isPlaying ? "FREEZE SIMULATION" : "RESUME WAVEFORM"}</span>
            </button>
          </div>

          {filterMode === "raw" && (
            <div className="space-y-1 font-mono text-[9px]">
              <div className="flex justify-between">
                <span className="text-earth-sand/40">SIMULATE NOISE</span>
                <span className="text-earth-bark font-bold">{noiseLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                className="w-full accent-earth-bark h-1 bg-earth-dark/40 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
