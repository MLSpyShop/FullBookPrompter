import React, { useRef, useEffect, useState } from "react";
import { ZoomIn, ZoomOut, Bookmark, Printer, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { BookProject } from "../types";

interface BookViewerProps {
  htmlContent: string;
  book: BookProject;
  viewMode: "trade" | "continuous";
  onPrint: () => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  htmlContent,
  book,
  viewMode,
  onPrint,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zoom, setZoom] = useState<number>(100);
  const [activeSection, setActiveSection] = useState<string>("cover-front");

  // Load HTML into iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(htmlContent);
    doc.close();
  }, [htmlContent]);

  // Navigate to specific hash anchor in iframe
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const elem = iframe.contentWindow.document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Previous and next chapter navigation
  const currentChapterIndex = book.chapters.findIndex(
    (c) => `chapter-${c.number}` === activeSection
  );

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      const prevCh = book.chapters[currentChapterIndex - 1];
      navigateToSection(`chapter-${prevCh.number}`);
    } else if (currentChapterIndex === 0) {
      navigateToSection("introduction");
    } else if (activeSection === "introduction") {
      navigateToSection("foreword");
    } else if (activeSection === "foreword") {
      navigateToSection("table-of-contents");
    } else if (activeSection === "table-of-contents") {
      navigateToSection("cover-front");
    }
  };

  const handleNextChapter = () => {
    if (activeSection === "cover-front") {
      navigateToSection("table-of-contents");
    } else if (activeSection === "table-of-contents") {
      navigateToSection("foreword");
    } else if (activeSection === "foreword") {
      navigateToSection("introduction");
    } else if (activeSection === "introduction") {
      if (book.chapters.length > 0) {
        navigateToSection(`chapter-${book.chapters[0].number}`);
      }
    } else if (currentChapterIndex >= 0 && currentChapterIndex < book.chapters.length - 1) {
      const nextCh = book.chapters[currentChapterIndex + 1];
      navigateToSection(`chapter-${nextCh.number}`);
    } else if (currentChapterIndex === book.chapters.length - 1) {
      navigateToSection("conclusion");
    } else if (activeSection === "conclusion") {
      navigateToSection("glossary");
    } else if (activeSection === "glossary") {
      navigateToSection("references");
    } else if (activeSection === "references") {
      navigateToSection("cover-back");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4">
      {/* Table of Contents Quick Nav Sidebar */}
      <div className="w-full lg:w-64 bg-[#141824] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800 mb-2">
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-300">
              Navigation Index
            </span>
          </div>

          <div className="space-y-1 max-h-[48vh] lg:max-h-[62vh] overflow-y-auto pr-1 text-xs">
            {/* Covers & Preliminary */}
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-1">
              Covers & Front Matter
            </div>
            <button
              onClick={() => navigateToSection("cover-front")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "cover-front"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Front Cover (6"×9")
            </button>
            <button
              onClick={() => navigateToSection("title-page")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "title-page"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Title & Half-Title
            </button>
            <button
              onClick={() => navigateToSection("copyright")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "copyright"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Copyright & CIP
            </button>
            <button
              onClick={() => navigateToSection("table-of-contents")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "table-of-contents"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Table of Contents
            </button>
            <button
              onClick={() => navigateToSection("foreword")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "foreword"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Foreword
            </button>
            <button
              onClick={() => navigateToSection("preface")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "preface"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Author's Preface
            </button>
            <button
              onClick={() => navigateToSection("introduction")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "introduction"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Introduction
            </button>

            {/* Chapters */}
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
              Monograph Chapters
            </div>
            {book.chapters.map((ch) => (
              <button
                key={ch.number}
                onClick={() => navigateToSection(`chapter-${ch.number}`)}
                className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                  activeSection === `chapter-${ch.number}`
                    ? "bg-amber-500/20 text-amber-300 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                Ch {ch.number}: {ch.title}
              </button>
            ))}

            {/* Back Matter */}
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
              Apparatus & Back Matter
            </div>
            <button
              onClick={() => navigateToSection("conclusion")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "conclusion"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Conclusion
            </button>
            <button
              onClick={() => navigateToSection("glossary")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "glossary"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Glossary of Terms
            </button>
            <button
              onClick={() => navigateToSection("references")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "references"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              APA 7th References
            </button>
            <button
              onClick={() => navigateToSection("about-author")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "about-author"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              About the Author
            </button>
            <button
              onClick={() => navigateToSection("cover-back")}
              className={`w-full text-left px-2 py-1.5 rounded transition truncate ${
                activeSection === "cover-back"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Back Cover (6"×9")
            </button>
          </div>
        </div>

        {/* Print quick button */}
        <div className="pt-3 border-t border-slate-800">
          <button
            onClick={onPrint}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Print 6"×9" Trade PDF</span>
          </button>
        </div>
      </div>

      {/* Main Book Stage */}
      <div className="flex-1 flex flex-col bg-[#0b0e14] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Stage Toolbar */}
        <div className="bg-[#141824] px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          {/* Quick Jump Dropdown */}
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={activeSection}
              onChange={(e) => navigateToSection(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <optgroup label="Front Matter">
                <option value="cover-front">Front Cover</option>
                <option value="title-page">Title Page</option>
                <option value="copyright">Copyright & CIP</option>
                <option value="table-of-contents">Table of Contents</option>
                <option value="foreword">Foreword</option>
                <option value="preface">Preface</option>
                <option value="introduction">Introduction</option>
              </optgroup>
              <optgroup label="Chapters">
                {book.chapters.map((ch) => (
                  <option key={ch.number} value={`chapter-${ch.number}`}>
                    Chapter {ch.number}: {ch.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Back Matter">
                <option value="conclusion">Conclusion</option>
                <option value="glossary">Glossary of Terms</option>
                <option value="references">APA 7th References</option>
                <option value="about-author">About the Author</option>
                <option value="cover-back">Back Cover</option>
              </optgroup>
            </select>

            {/* Prev / Next chapter quick toggles */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevChapter}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Previous section / chapter"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextChapter}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Next section / chapter"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Zoom and layout controls */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden xl:inline">
              6.0" × 9.0" Trade | 0.75" Gutters
            </span>
            <button
              onClick={() => setZoom((z) => Math.max(z - 10, 60))}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 10, 140))}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(100)}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 transition"
              title="Reset Zoom to 100%"
            >
              100%
            </button>
          </div>
        </div>

        {/* Simulated Stage Area with Iframe */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center bg-[#090c12]">
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.15s ease-out",
              width: viewMode === "trade" ? "6.8in" : "100%",
              maxWidth: "100%",
              minHeight: "9.5in",
            }}
            className={viewMode === "trade" ? "shadow-2xl rounded-sm" : "w-full"}
          >
            <iframe
              ref={iframeRef}
              title="Print-Ready eBook Preview"
              className="w-full h-[850px] border-none bg-white rounded-sm shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
