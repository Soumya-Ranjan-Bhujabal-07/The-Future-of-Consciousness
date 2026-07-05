import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Chapter } from "../types";
import { Compass, Eye, EyeOff, Menu, ChevronRight } from "lucide-react";

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
    if (activeChapterId) {
      setExpandedChapters((prev) => ({ ...prev, [activeChapterId]: true }));
    }
  }, [activeChapterId]);

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
            className="flex items-center justify-center w-12 h-12 rounded bg-earth-walnut text-earth-sage font-bold shadow border border-earth-clay/20 active:scale-95 transition-transform"
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
          className={`flex items-center space-x-2 px-3 py-1.5 rounded border text-xs font-mono transition-all duration-300 backdrop-blur-md ${
            isImmersive
              ? "bg-earth-dark/90 border-earth-sage/30 text-earth-sage shadow-md"
              : "bg-earth-walnut/60 border-earth-clay/15 text-earth-sand/50 hover:text-earth-sage hover:border-earth-sage/30"
          }`}
          title={isImmersive ? "Exit Immersive Mode" : "Activate Immersive Mode"}
        >
          {isImmersive ? (
            <>
              <EyeOff size={14} />
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
            className="lg:hidden fixed inset-0 z-40 bg-earth-dark/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-earth-walnut/95 border-r border-earth-clay/10 backdrop-blur-xl p-6 overflow-y-auto"
            >
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-earth-clay/10">
                <Compass className="text-earth-sage" size={20} />
                <h3 className="font-mono text-xs font-semibold tracking-wider text-earth-parchment">
                  MANUSCRIPT MODULES
                </h3>
              </div>
              <nav className="space-y-4">
                {chapters.map((ch) => (
                  <div key={ch.id} className="space-y-1">
                    <button
                      onClick={() => onNavigate(ch.sections[0].id)}
                      className={`flex items-center justify-between w-full text-left font-mono text-xs py-1.5 px-2 rounded transition-colors ${
                        activeChapterId === ch.id
                          ? "text-earth-sage bg-earth-moss/20 border border-earth-sage/10 font-bold"
                          : "text-earth-sand/60 hover:text-earth-parchment"
                      }`}
                    >
                      <span className="truncate">
                        CH {ch.number}: {ch.title}
                      </span>
                    </button>
                    <div className="pl-4 border-l border-earth-clay/10 space-y-1 mt-1">
                      {ch.sections.map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => {
                            onNavigate(sec.id);
                            setIsOpenMobile(false);
                          }}
                          className={`block w-full text-left text-[11px] font-sans py-1 transition-all ${
                            activeSectionId === sec.id
                              ? "text-earth-sage font-medium pl-1 border-l-2 border-earth-sage"
                              : "text-earth-sand/40 hover:text-earth-sand"
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
            className="hidden lg:block shrink-0 sticky top-0 h-screen bg-earth-walnut/90 border-r border-earth-clay/15 backdrop-blur-xl overflow-y-auto select-none p-6 z-20"
          >
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-earth-clay/10">
              <div className="p-1.5 rounded bg-earth-forest/20 border border-earth-moss/20">
                <Compass className="text-earth-sage" size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-earth-sage/70 tracking-widest font-semibold uppercase">
                  Research Manuscript
                </span>
                <span className="font-mono text-xs font-bold text-earth-parchment tracking-wider">
                  CONSCIOUSNESS READER
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
                    className={`rounded border transition-all duration-300 ${
                      isActive
                        ? "bg-earth-forest/10 border-earth-clay/10"
                        : "border-transparent bg-transparent"
                    }`}
                  >
                    <div
                      onClick={() => onNavigate(ch.sections[0].id)}
                      className="group flex items-center justify-between w-full py-2.5 px-3 rounded cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2.5 text-left truncate">
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                            isActive
                              ? "bg-earth-moss/20 border-earth-sage/30 text-earth-sage shadow-sm"
                              : "bg-earth-dark/40 border border-earth-clay/10 text-earth-sand/50 group-hover:text-earth-sand"
                          }`}
                        >
                          CH_0{ch.number}
                        </span>
                        <span
                          className={`font-sans text-xs font-semibold tracking-wide transition-colors ${
                            isActive
                              ? "text-earth-parchment"
                              : "text-earth-sand/60 group-hover:text-earth-sand"
                          }`}
                        >
                          {ch.title}
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleChapter(ch.id, e)}
                        className={`p-1 rounded transition-all duration-300 ${
                          isActive
                            ? "text-earth-sage/80 hover:bg-earth-dark/30"
                            : "text-earth-sand/40 hover:text-earth-sand/60"
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
                          <div className="pl-5 pr-3 pb-3 border-l border-earth-clay/10 ml-[18px] space-y-1 mt-0.5">
                            {ch.sections.map((sec) => {
                              const isSecActive = activeSectionId === sec.id;
                              return (
                                <button
                                  key={sec.id}
                                  onClick={() => onNavigate(sec.id)}
                                  className={`block w-full text-left text-[11px] font-mono leading-relaxed py-1.5 px-2.5 rounded transition-all duration-200 truncate ${
                                    isSecActive
                                      ? "text-earth-sage bg-earth-forest/10 border border-earth-moss/20 font-bold shadow-sm"
                                      : "text-earth-sand/50 hover:text-earth-sand/80 border border-transparent"
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

            {/* Silent Academic Credit Line inside Sidebar Footer */}
            <div className="absolute bottom-6 left-6 right-6 font-mono text-[9px] text-earth-sand/30 space-y-1 pointer-events-none">
              <div className="h-px bg-earth-clay/10 my-2" />
              <div className="flex justify-between items-center text-[10px]">
                <span>IIT Madras Scholar Series</span>
                <span>Soumya Ranjan Bhujabal</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
