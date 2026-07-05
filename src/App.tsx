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
  const [fadeOpacity, setFadeOpacity] = useState<boolean>(true);

  // Trigger brief, subtle fade transition when chapter changes to guide cognitive flow
  useEffect(() => {
    setFadeOpacity(false);
    const timer = setTimeout(() => {
      setFadeOpacity(true);
    }, 40);
    return () => clearTimeout(timer);
  }, [activeChapterId]);

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
    <div className="min-h-screen bg-earth-dark text-earth-sand font-sans selection:bg-earth-sage selection:text-earth-dark">
      {/* Top Reading Progress Tracker Accent */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-earth-moss via-earth-sage to-earth-bark z-50" />

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
          className={`grow min-w-0 transition-all duration-500 px-4 sm:px-8 lg:px-16 pt-24 pb-32 max-w-5xl mx-auto transition-opacity duration-300 ease-out ${
            fadeOpacity ? "opacity-100" : "opacity-80"
          }`}
        >
          {/* Header Metadata Section */}
          <header className="mb-12 space-y-6 text-center lg:text-left border-b border-earth-clay/10 pb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-earth-forest/20 border border-earth-moss/20 text-earth-sage font-mono text-[10px] uppercase tracking-widest">
              <Award size={12} />
              <span>Doctoral Research Manuscript</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-earth-parchment">
              {PAPER_TITLE}
            </h1>

            {/* Author Credits Block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-earth-clay/10 font-mono text-[11px] text-earth-sand/60">
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <span className="text-earth-sage/60 uppercase tracking-wider text-[9px]">Lead Researcher</span>
                <span className="text-earth-parchment font-bold">SOUMYA RANJAN BHUJABAL</span>
                <span className="text-earth-sand/55 text-[10px]">Student of Data Science at IIT MADRAS</span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <span className="text-earth-sage/60 uppercase tracking-wider text-[9px]">Citations & Format</span>
                <span className="text-earth-parchment font-bold">APA 7th Scholarly Edition</span>
                <span className="text-earth-sand/55 text-[10px]">10 Interrelated Chapters</span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <span className="text-earth-sage/60 uppercase tracking-wider text-[9px]">Last Synchronized</span>
                <span className="text-earth-parchment font-bold flex items-center">
                  <Calendar size={12} className="mr-1 text-earth-sage" />
                  2026-06-25
                </span>
                <span className="text-earth-sand/55 text-[10px]">UTC Time Frame</span>
              </div>
            </div>
          </header>

          {/* Interactive 3D Brain Matrix Box */}
          <section className="mb-16 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-earth-sand/50">
              <span className="flex items-center">
                <Layers size={13} className="mr-1.5 text-earth-sage" />
                INTEGRATED NEURAL ASSEMBLY MAP
              </span>
              <span>SCROLL ROTATIONAL SPEED</span>
            </div>
            <InteractiveBrain3D />
            <p className="font-mono text-[10px] text-earth-sand/40 leading-relaxed text-center">
              *Interactive Assembly: Hover to displace neural nodes. Use scroll to adjust rotation speed.
            </p>
          </section>

          {/* Academic Abstract Section */}
          <section className="mb-16 rounded-xl border border-earth-clay/10 bg-earth-walnut/10 backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => setShowAbstract(!showAbstract)}
              className="w-full flex items-center justify-between p-4 text-left border-b border-earth-clay/10 bg-earth-walnut/20 hover:bg-earth-walnut/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="text-earth-sage" size={15} />
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-earth-parchment">
                  Manuscript Abstract
                </span>
              </div>
              <span className="font-mono text-[10px] text-earth-sage font-bold">
                {showAbstract ? "COLLAPSE" : "EXPAND"}
              </span>
            </button>

            {showAbstract && (
              <div className="p-6 space-y-6">
                <p className="font-sans text-xs md:text-sm leading-relaxed text-earth-sand/90 tracking-wide select-text">
                  {PAPER_ABSTRACT}
                </p>

                {/* Keywords Tags */}
                <div className="pt-4 border-t border-earth-clay/10 space-y-2">
                  <span className="font-mono text-[10px] text-earth-sand/50 uppercase tracking-widest block font-bold">
                    Indexing Keywords
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PAPER_KEYWORDS.map((word, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-2 py-0.5 rounded border border-earth-clay/25 bg-earth-walnut/40 text-earth-sand/80 hover:text-earth-sage hover:border-earth-sage/40 transition-colors cursor-default"
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
                activeChapterId={activeChapterId}
                activeSectionId={activeSectionId}
              />
            ))}
          </div>

          {/* Scholarly References Terminal Panel */}
          <section id="references-panel" className="mt-24 pt-12 border-t border-earth-clay/10 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-earth-sage font-mono text-xs uppercase tracking-widest">
                <Bookmark size={14} />
                <span>APA 7th Edition Compendium</span>
              </div>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-earth-parchment uppercase">
                References
              </h2>
            </div>

            {/* Search and Category Filter controls */}
            <div className="p-4 rounded-xl border border-earth-clay/10 bg-earth-walnut/10 backdrop-blur-md space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-sand/40" size={15} />
                <input
                  type="text"
                  placeholder="Search across peer-reviewed reference citations..."
                  value={refSearch}
                  onChange={(e) => setRefSearch(e.target.value)}
                  className="w-full bg-earth-walnut/40 border border-earth-clay/20 rounded pl-10 pr-4 py-2 text-xs font-mono text-earth-sand placeholder-earth-sand/30 focus:outline-none focus:border-earth-sage/50 focus:ring-1 focus:ring-earth-sage/10"
                />
              </div>

              {/* Categorization Tabs */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setActiveRefTab("all")}
                  className={`py-1.5 px-3 rounded text-[9px] font-mono font-semibold uppercase tracking-wider border transition-all ${
                    activeRefTab === "all"
                      ? "border-earth-sage/50 bg-earth-moss/20 text-earth-sage"
                      : "border-earth-clay/10 text-earth-sand/50 hover:text-earth-sand hover:border-earth-clay/30 bg-transparent"
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
                        ? "border-earth-sage/50 bg-earth-moss/20 text-earth-sage"
                        : "border-earth-clay/10 text-earth-sand/50 hover:text-earth-sand hover:border-earth-clay/30 bg-transparent"
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
                  <h4 className="font-mono text-[10px] text-earth-sage font-bold uppercase tracking-wider border-b border-earth-clay/10 pb-1">
                    {group.category}
                  </h4>
                  <ul className="space-y-2.5 pl-2">
                    {group.items.map((ref, idx) => (
                      <li
                        key={idx}
                        className="font-sans text-[11px] md:text-xs text-earth-sand/70 leading-relaxed pl-4 -indent-4 border-l border-earth-clay/10 hover:border-earth-sage/40 hover:text-earth-sand transition-colors"
                      >
                        {ref}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {filteredReferences.length === 0 && (
                <p className="font-mono text-xs text-earth-sand/40 italic text-center py-12">
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
          className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-10 h-10 rounded bg-earth-walnut border border-earth-clay/20 text-earth-sage hover:text-earth-parchment hover:border-earth-sage/40 shadow shadow-black/20 transition-transform active:scale-95"
          title="Return to top of document"
        >
          <ChevronUp size={16} />
        </button>
      )}
    </div>
  );
}
