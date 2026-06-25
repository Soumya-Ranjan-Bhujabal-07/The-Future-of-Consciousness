import React, { useState, useEffect, useRef } from "react";
import {
  PAPER_TITLE,
  PAPER_ABSTRACT,
  PAPER_KEYWORDS,
  CHAPTERS,
  REFERENCES,
  ReferenceGroup
} from "./data/paperContent";
import { InteractiveBrain3D } from "./components/InteractiveBrain3D";
import { Sidebar } from "./components/Sidebar";
import { ChapterContent } from "./components/ChapterContent";
import {
  BookOpen,
  Search,
  Bookmark,
  ExternalLink,
  ChevronUp,
  Award,
  Globe,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";

export default function App() {
  const [activeChapterId, setActiveChapterId] = useState<string>("chapter-1");
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-1-1");
  const [isImmersive, setIsImmersive] = useState<boolean>(false);
  const [showAbstract, setShowAbstract] = useState<boolean>(true);
  const [refSearch, setRefSearch] = useState<string>("");
  const [activeRefTab, setActiveRefTab] = useState<string>("all");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back-to-top button
      setShowScrollTop(window.scrollY > 800);

      // ScrollSpy: track headings
      const scrollPosition = window.scrollY + 140; // threshold offset

      let currentChapter = "chapter-1";
      let currentSection = "sec-1-1";

      for (const chapter of CHAPTERS) {
        for (const section of chapter.sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const top = element.offsetTop;
            if (scrollPosition >= top) {
              currentChapter = chapter.id;
              currentSection = section.id;
            }
          }
        }
      }

      setActiveChapterId(currentChapter);
      setActiveSectionId(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.offsetTop - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Filter references based on tab and search
  const filteredReferences = REFERENCES.filter((group) => {
    if (activeRefTab !== "all" && group.category !== activeRefTab) return false;
    return true;
  }).map((group) => {
    const items = group.items.filter((item) =>
      item.toLowerCase().includes(refSearch.toLowerCase())
    );
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-[#040810] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Reading Progress Tracker Accent */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 z-50 shadow-md shadow-cyan-500/10" />

      <div className="flex">
        {/* Navigation Sidebar */}
        <Sidebar
          chapters={CHAPTERS}
          activeChapterId={activeChapterId}
          activeSectionId={activeSectionId}
          onNavigate={handleNavigate}
          isImmersive={isImmersive}
          setIsImmersive={setIsImmersive}
        />

        {/* Main Scholarly Content Column */}
        <main
          className={`grow min-w-0 transition-all duration-500 px-4 sm:px-8 lg:px-16 pt-24 pb-32 max-w-5xl mx-auto`}
        >
          {/* Header Metadata Section */}
          <header className="mb-12 space-y-6 text-center lg:text-left border-b border-slate-900 pb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
              <Award size={12} className="animate-pulse" />
              <span>Doctoral Research Manuscript</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-100 to-cyan-300">
              {PAPER_TITLE}
            </h1>

            {/* Author Credits Block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-900 font-mono text-[11px] text-slate-400">
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <span className="text-slate-600 uppercase tracking-wider text-[9px]">Lead Researcher</span>
                <span className="text-slate-200 font-bold">SOUMYA RANJAN BHUJABAL</span>
                <span className="text-slate-500 text-[10px]">Student of Data Science at IIT MADRAS</span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <span className="text-slate-600 uppercase tracking-wider text-[9px]">Citations & Format</span>
                <span className="text-slate-200 font-bold">APA 7th Scholarly Edition</span>
                <span className="text-slate-500 text-[10px]">10 Interrelated Chapters</span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <span className="text-slate-600 uppercase tracking-wider text-[9px]">Last Synchronized</span>
                <span className="text-slate-200 font-bold flex items-center">
                  <Calendar size={12} className="mr-1" />
                  2026-06-25
                </span>
                <span className="text-slate-500 text-[10px]">UTC Time Frame</span>
              </div>
            </div>
          </header>

          {/* Interactive 3D Brain Matrix Box */}
          <section className="mb-16 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-slate-500">
              <span className="flex items-center">
                <Layers size={13} className="mr-1.5 text-cyan-400" />
                INTEGRATED CARBON-TO-SILICON PROJECTION
              </span>
              <span>SCROLL DEPTH REACTIVE</span>
            </div>
            <InteractiveBrain3D />
            <p className="font-mono text-[10px] text-slate-500 leading-relaxed text-center">
              *Interactive Graph: Hover to displace neural nodes. Use scrollwheel or page down to trigger dynamic cybernetic frequency transitions (amber to cyan).
            </p>
          </section>

          {/* Academic Abstract Section */}
          <section className="mb-16 rounded-xl border border-slate-900 bg-slate-950/20 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/20">
            <button
              onClick={() => setShowAbstract(!showAbstract)}
              className="w-full flex items-center justify-between p-5 text-left border-b border-slate-900 bg-slate-950/40 hover:bg-slate-950/60 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="text-cyan-400" size={16} />
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-200">
                  MANUSCRIPT_ABSTRACT
                </span>
              </div>
              <span className="font-mono text-[10px] text-cyan-400/80 font-bold">
                {showAbstract ? "COLLAPSE" : "EXPAND"}
              </span>
            </button>

            {showAbstract && (
              <div className="p-6 space-y-6">
                <p className="font-sans text-xs md:text-sm leading-relaxed text-slate-300 tracking-wide select-text">
                  {PAPER_ABSTRACT}
                </p>

                {/* Keywords Tags */}
                <div className="pt-4 border-t border-slate-900 space-y-2">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-bold">
                    Indexing Keywords
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PAPER_KEYWORDS.map((word, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-md border border-slate-800/80 bg-slate-950 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors cursor-default"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Chapter Content Parser Loop */}
          <div className="space-y-16">
            {CHAPTERS.map((chapter) => (
              <ChapterContent
                key={chapter.id}
                chapter={chapter}
                activeSectionId={activeSectionId}
              />
            ))}
          </div>

          {/* Scholarly References Terminal Panel */}
          <section id="references-panel" className="mt-24 pt-12 border-t border-slate-900 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                <Bookmark size={14} />
                <span>APA 7th Edition Compendium</span>
              </div>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight text-slate-100 uppercase">
                References
              </h2>
            </div>

            {/* Search and Category Filter controls */}
            <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 backdrop-blur-md space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <input
                  type="text"
                  placeholder="Search across 100+ peer-reviewed reference citations..."
                  value={refSearch}
                  onChange={(e) => setRefSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 rounded-lg pl-10 pr-4 py-2 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                />
              </div>

              {/* Categorization Tabs */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setActiveRefTab("all")}
                  className={`py-1.5 px-3 rounded text-[9px] font-mono font-semibold uppercase tracking-wider border transition-all ${
                    activeRefTab === "all"
                      ? "border-cyan-500/50 bg-cyan-950/25 text-cyan-400"
                      : "border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 bg-slate-950/10"
                  }`}
                >
                  ALL CITATIONS
                </button>
                {REFERENCES.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRefTab(g.category)}
                    className={`py-1.5 px-3 rounded text-[9px] font-mono font-semibold uppercase tracking-wider border transition-all ${
                      activeRefTab === g.category
                        ? "border-cyan-500/50 bg-cyan-950/25 text-cyan-400"
                        : "border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 bg-slate-950/10"
                    }`}
                  >
                    {g.category}
                  </button>
                ))}
              </div>
            </div>

            {/* List rendered */}
            <div className="space-y-8 select-text">
              {filteredReferences.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-3">
                  <h4 className="font-mono text-[10px] text-cyan-400/80 font-bold uppercase tracking-wider border-b border-slate-900 pb-1">
                    {group.category}
                  </h4>
                  <ul className="space-y-2.5 pl-2">
                    {group.items.map((ref, idx) => (
                      <li
                        key={idx}
                        className="font-sans text-[11px] md:text-xs text-slate-400 leading-relaxed pl-4 -indent-4 border-l border-slate-900 hover:border-cyan-500/40 pl-4 hover:text-slate-300 transition-colors"
                      >
                        {ref}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {filteredReferences.length === 0 && (
                <p className="font-mono text-xs text-slate-600 italic text-center py-12">
                  No citations match your search query.
                </p>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Dynamic Float Back to Top Trigger */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400/40 shadow-lg shadow-black/60 transition-transform active:scale-95"
          title="Return to top of document"
        >
          <ChevronUp size={16} />
        </button>
      )}
    </div>
  );
}
