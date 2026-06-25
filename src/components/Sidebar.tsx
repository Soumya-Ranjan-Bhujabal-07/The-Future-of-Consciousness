import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Chapter } from "../types";
import { Compass, Eye, EyeOff, List, Menu, ChevronRight } from "lucide-react";

interface SidebarProps {
  chapters: Chapter[];
  activeChapterId: string;
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
  isImmersive: boolean;
  setIsImmersive: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  activeChapterId,
  activeSectionId,
  onNavigate,
  isImmersive,
  setIsImmersive,
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    "chapter-1": true,
  });
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    // Keep current chapter expanded
    if (activeStateChapterId) {
      setExpanded(activeState => ({ ...activeState, [activeStateChapterId]: true }));
    }
  }, [activeChapterId]);

  const setExpanded = (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => {
    setExpandedChapters((prev) => fn(prev));
  };

  const activeStateChapterId = activeChapterId;

  const toggleChapter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedChapters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {/* Mobile Drawer Trigger (Only shown on mobile when not in immersive mode) */}
      {!isImmersive && (
        <div className="lg:hidden fixed bottom-6 right-6 z-50 flex space-x-2">
          <button
            id="mobile-toggle-btn"
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
          >
            {isOpenMobile ? <EyeOff size={20} /> : <Menu size={20} />}
          </button>
        </div>
      )}

      {/* Floater Immersive Mode Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <button
          id="immersive-toggle-btn"
          onClick={() => setIsImmersive(!isImmersive)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 backdrop-blur-md ${
            isImmersive
              ? "bg-slate-950/80 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/10"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40"
          }`}
          title={isImmersive ? "Exit Immersive Mode" : "Activate Immersive Mode"}
        >
          {isImmersive ? (
            <>
              <EyeOff size={14} className="animate-pulse" />
              <span>IMMERSIVE ON</span>
            </>
          ) : (
            <>
              <Eye size={14} />
              <span>IMMERSIVE OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpenMobile && !isImmersive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#0B0F19]/90 border-r border-white/10 backdrop-blur-xl p-6 overflow-y-auto"
            >
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                <Compass className="text-[#00F2FE] animate-spin-slow" size={22} />
                <h3 className="font-mono text-sm font-semibold tracking-wider text-white">
                  CONSCIOUSNESS CORE
                </h3>
              </div>
              <nav className="space-y-4">
                {chapters.map((ch) => (
                  <div key={ch.id} className="space-y-1">
                    <button
                      onClick={() => onNavigate(ch.sections[0].id)}
                      className={`flex items-center justify-between w-full text-left font-mono text-xs py-1.5 px-2 rounded transition-colors ${
                        activeChapterId === ch.id
                          ? "text-[#00F2FE] bg-[#00F2FE]/10 border border-[#00F2FE]/10 font-bold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span className="truncate">
                        CH {ch.number}: {ch.title}
                      </span>
                    </button>
                    <div className="pl-4 border-l border-white/10 space-y-1 mt-1">
                      {ch.sections.map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => {
                            onNavigate(sec.id);
                            setIsOpenMobile(false);
                          }}
                          className={`block w-full text-left text-[11px] font-sans py-1 transition-all ${
                            activeSectionId === sec.id
                              ? "text-[#00F2FE] font-medium pl-1 border-l-2 border-[#00F2FE] shadow-[0_0_8px_rgba(0,242,254,0.1)]"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {sec.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <AnimatePresence>
        {!isImmersive && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "24rem", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block shrink-0 sticky top-0 h-screen bg-white/5 border-r border-white/10 backdrop-blur-xl overflow-y-auto select-none p-6 z-20"
          >
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/10">
              <div className="p-1.5 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/20">
                <Compass className="text-[#00F2FE] animate-spin-slow" size={18} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#00F2FE]/70 tracking-widest font-semibold uppercase">
                  Research Dashboard
                </span>
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  CONSCIOUSNESS_CORE_v1.0
                </span>
              </div>
            </div>

            <nav className="space-y-3 pb-24">
              {chapters.map((ch) => {
                const isExpanded = !!expandedChapters[ch.id];
                const isActive = activeChapterId === ch.id;

                return (
                  <div
                    key={ch.id}
                    className={`rounded-lg border transition-all duration-300 ${
                      isActive
                        ? "bg-white/5 border-white/10 shadow-md shadow-black/20"
                        : "border-transparent bg-transparent"
                    }`}
                  >
                    <div
                      onClick={() => onNavigate(ch.sections[0].id)}
                      className="group flex items-center justify-between w-full py-2.5 px-3 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2.5 text-left truncate">
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                            isActive
                              ? "bg-[#00F2FE]/10 border-[#00F2FE]/30 text-[#00F2FE] shadow-[0_0_8px_rgba(0,242,254,0.15)]"
                              : "bg-white/5 border-white/5 text-slate-400 group-hover:text-slate-300"
                          }`}
                        >
                          CH_0{ch.number}
                        </span>
                        <span
                          className={`font-sans text-xs font-semibold tracking-wide transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-slate-400 group-hover:text-slate-200"
                          }`}
                        >
                          {ch.title}
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleChapter(ch.id, e)}
                        className={`p-1 rounded-md transition-all duration-300 ${
                          isActive
                            ? "text-[#00F2FE]/80 hover:bg-white/5"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                      >
                        <ChevronRight
                          size={14}
                          className={`transform transition-transform duration-300 ${
                            isExpanded ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Section items animation */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-5 pr-3 pb-3 border-l border-white/5 ml-[18px] space-y-1 mt-0.5">
                            {ch.sections.map((sec) => {
                              const isSecActive = activeSectionId === sec.id;
                              return (
                                <button
                                  key={sec.id}
                                  onClick={() => onNavigate(sec.id)}
                                  className={`block w-full text-left text-[11px] font-mono leading-relaxed py-1.5 px-2.5 rounded transition-all duration-200 truncate ${
                                    isSecActive
                                      ? "text-[#00F2FE] bg-[#00F2FE]/5 border border-[#00F2FE]/10 shadow-[0_0_8px_rgba(0,242,254,0.05)] font-bold"
                                      : "text-slate-400 hover:text-slate-200 border border-transparent"
                                  }`}
                                >
                                  {sec.title}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Ambient telemetry indicators in sidebar footer */}
            <div className="absolute bottom-6 left-6 right-6 font-mono text-[9px] text-slate-500 space-y-1 pointer-events-none">
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between">
                <span>SIGNAL CAPTURE</span>
                <span className="text-[#00F2FE] font-bold">ACTIVE [125 Gb/s]</span>
              </div>
              <div className="flex justify-between">
                <span>MEM_ENCODING</span>
                <span className="text-[#4FACFE] font-bold">COGNITIVE_PROSTHESIS</span>
              </div>
              <div className="flex justify-between">
                <span>DECODER_MODEL</span>
                <span className="text-[#00F2FE]/80">LLM_TRANSFORMER_V4</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
