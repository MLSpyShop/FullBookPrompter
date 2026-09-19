import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { BookProject } from "./types";
import { generateStandaloneBookHtml } from "./utils/htmlBookExporter";
import { autoDesignThemeForSubject } from "./utils/themeMatcher";
import { generateClientFallbackBook } from "./utils/clientFallbackBook";
import { 
  BookOpen, 
  Sparkles, 
  Printer, 
  ExternalLink, 
  Loader2,
  Bookmark,
  FileText,
  Palette,
  FileDown
} from "lucide-react";

export default function App() {
  const [topic, setTopic] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [book, setBook] = useState<BookProject | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCompilingPdf, setIsCompilingPdf] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Standalone print-ready 6x9 HTML document (only when book exists)
  const htmlContent = useMemo(() => {
    if (!book) return "";
    return generateStandaloneBookHtml(book);
  }, [book]);

  // Sync iframe with book HTML
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !book || !htmlContent) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(htmlContent);
    doc.close();
  }, [htmlContent, book]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Compile the final PDF by printing the HTML
  const triggerPrintCompilation = useCallback(() => {
    if (!book || !htmlContent) return;
    showToast("Compiling final PDF: Choose 'Save as PDF' in the print dialog.");

    const iframe = iframeRef.current;
    let printed = false;

    try {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        printed = true;
      }
    } catch (err) {
      console.warn("Iframe direct print fallback:", err);
    }

    // Fallback in case iframe sandbox blocks direct modal print
    if (!printed) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    }
  }, [book, htmlContent]);

  // Auto-compile PDF by printing HTML right after generation completes
  useEffect(() => {
    if (!isCompilingPdf || !book || !htmlContent) return;

    const timer = setTimeout(() => {
      triggerPrintCompilation();
      setIsCompilingPdf(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [isCompilingPdf, book, htmlContent, triggerPrintCompilation]);

  // Open standalone print window to compile PDF
  const handleOpenPrintWindow = useCallback(() => {
    if (!book || !htmlContent) return;
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const win = window.open(`${url}#print`, "_blank");
    if (win) {
      showToast("Opened print preview window to compile PDF.");
    }
  }, [book, htmlContent]);

  // Jump to specific book section in preview
  const handleJumpToSection = (sectionId: string) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    const elem = iframe.contentWindow.document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Ultra-simple Generate Handler
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTopic = topic.trim();
    const cleanAuthor = author.trim();

    if (!cleanTopic || !cleanAuthor) {
      showToast("Please enter both a topic and author.");
      return;
    }

    setIsGenerating(true);
    showToast(`Generating complete monograph for "${cleanTopic}"...`);

    try {
      let bookData: BookProject | null = null;

      try {
        const response = await fetch("/api/generate-book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: cleanTopic,
            author: cleanAuthor,
          }),
        });

        if (response.ok) {
          const { book: generatedBook } = await response.json();
          if (generatedBook && generatedBook.title) {
            const autoTheme = generatedBook.themeDesign || autoDesignThemeForSubject(cleanTopic);
            bookData = {
              id: `book-${Date.now()}`,
              title: generatedBook.title,
              subtitle: generatedBook.subtitle || "A Definitive Monograph",
              tagline: generatedBook.tagline || `An Authoritative Work by ${cleanAuthor}`,
              subject: cleanTopic,
              author: {
                name: cleanAuthor,
                credentials: generatedBook.author?.credentials || "",
                affiliation: generatedBook.author?.affiliation || "",
                bio: generatedBook.author?.bio || `${cleanAuthor} is the author of this monograph on ${cleanTopic}.`,
                contact: generatedBook.author?.contact || "",
              },
              isbn: generatedBook.isbn || "978-1-989210-44-2",
              edition: generatedBook.edition || "First Edition",
              publisher: generatedBook.publisher || "Academic Press for Applied Systems",
              publicationYear: new Date().getFullYear(),
              theme: autoTheme.archetype || generatedBook.theme || "classic-navy",
              fontPairing: autoTheme.fontPairing || generatedBook.fontPairing || "garamond",
              themeDesign: autoTheme,
              dedication: generatedBook.dedication || `Dedicated to everyone advancing research and practice in ${cleanTopic}.`,
              epigraph: generatedBook.epigraph || {
                quote: "True mastery begins where conventional paradigms reach their definitive boundary.",
                attribution: "Foundational Inquiry Axiom",
              },
              foreword: generatedBook.foreword || {
                author: "Distinguished Academic Advisory Council",
                content: `This monograph arrives at a pivotal juncture, providing foundational clarity and operational rigor for scholars and practitioners in ${cleanTopic}.`,
              },
              preface: generatedBook.preface || `This volume crystallizes extensive research, strategic inquiry, and rigorous empirical frameworks in ${cleanTopic}.`,
              acknowledgments: generatedBook.acknowledgments || `The author extends sincere gratitude to peer reviewers, research collaborators, and institutional colleagues whose critical scrutiny helped shape this work.`,
              introduction: generatedBook.introduction || {
                title: "Introduction: Foundations and Horizons",
                content: `Understanding ${cleanTopic} requires a rigorous conceptual baseline. This book presents an end-to-end framework, moving systematically from axiomatic principles to practical enterprise execution and future horizons.`,
              },
              chapters: generatedBook.chapters || [],
              conclusion: generatedBook.conclusion || {
                title: "Conclusion: The Strategic Trajectory",
                content: `As established throughout this monograph, ${cleanTopic} represents a transformative discipline that demands theoretical precision and operational rigor.`,
              },
              glossary: generatedBook.glossary || [],
              bibliography: generatedBook.bibliography || [],
              endorsements: generatedBook.endorsements || [],
              backCoverSynopsis: generatedBook.backCoverSynopsis || `In this definitive trade monograph, ${cleanAuthor} delivers a comprehensive, print-ready guide to ${cleanTopic}.`,
              lastUpdated: new Date().toISOString(),
            };
          }
        }
      } catch (apiError) {
        console.warn("API route unavailable (e.g. static hosting / GitHub Pages), falling back to client-side synthesis:", apiError);
      }

      // Fallback for static environments (GitHub Pages) or if API was unreachable
      if (!bookData) {
        bookData = generateClientFallbackBook(cleanTopic, cleanAuthor);
      }

      setBook(bookData);

      // Trigger automatic compilation of final PDF by printing HTML
      setIsCompilingPdf(true);
      showToast(`HTML generated! Compiling final 6"×9" PDF for "${bookData.title}"...`);
    } catch (err: any) {
      console.error("Generation error:", err);
      showToast(err.message || "Failed to generate monograph.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d111a] text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900/95 border border-amber-500/40 text-amber-200 text-xs px-4 py-3 rounded-lg shadow-2xl animate-in fade-in flex items-center gap-2 max-w-md">
          <Printer className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-[#121622] sticky top-0 z-30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-wide text-white flex items-center gap-2">
                FullBookPrompter
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Output: PDF ONLY (6"×9" Trade)
                </span>
              </h1>
            </div>
          </div>

          {/* Export Actions: PDF ONLY */}
          <div className="flex items-center gap-2">
            <button
              id="compile-pdf-button"
              onClick={triggerPrintCompilation}
              disabled={!book || isGenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition shadow-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Compile and save final 6x9 trade PDF via print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Compile / Save PDF</span>
            </button>

            <button
              onClick={handleOpenPrintWindow}
              disabled={!book || isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Open full print view in new window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Window</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
        {/* ULTRA SIMPLE GENERATOR FORM: TOPIC + AUTHOR + GENERATE. NO OPTIONS. */}
        <div className="bg-[#141824] border border-slate-800 rounded-xl p-5 shadow-lg">
          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row items-stretch md:items-end gap-3">
            {/* Topic Input */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="topic-input" className="text-xs font-medium text-slate-300">
                Book Topic
              </label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter book topic (e.g., Enterprise Agentic AI & Autonomous Workflows)..."
                disabled={isGenerating}
                className="w-full bg-[#0d111a] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                required
              />
            </div>

            {/* Author Input */}
            <div className="w-full md:w-72 flex flex-col gap-1.5">
              <label htmlFor="author-input" className="text-xs font-medium text-slate-300">
                Author
              </label>
              <input
                id="author-input"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name (e.g., Marie Landry)..."
                disabled={isGenerating}
                className="w-full bg-[#0d111a] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                required
              />
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button
                type="submit"
                id="generate-button"
                disabled={isGenerating || !topic.trim() || !author.trim()}
                className="w-full md:w-auto h-[42px] px-6 rounded-lg font-semibold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center gap-2 shadow-md hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating & Compiling PDF...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Book</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* When a book is generated: show PDF Status Banner, Book Bar, and Viewer */}
        {book ? (
          <>
            {/* Output: PDF Only Helper Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-semibold text-amber-300">Output: PDF ONLY</span>
                <span className="text-amber-400/80">•</span>
                <span className="text-slate-300">
                  To save your monograph as a PDF file: In the print dialog, select <strong className="text-amber-300 font-semibold">"Destination: Save as PDF"</strong>. All 6"×9" trade margins, covers, and page numbers are preset.
                </span>
              </div>
              <button
                onClick={triggerPrintCompilation}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition shadow-sm self-end sm:self-auto flex-shrink-0 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Compile PDF Now</span>
              </button>
            </div>

            {/* Book Preview Header & Section Quick Navigation */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#141824] border border-slate-800 rounded-xl px-4 py-2.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-white truncate max-w-xs">{book.title}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{book.author.name}</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400/90 font-mono">{book.chapters.length} Chapters</span>
                {book.themeDesign && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-[11px] text-slate-300 border border-slate-700/80">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: book.themeDesign.primary }}
                        title={`Primary: ${book.themeDesign.primary}`}
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm -ml-0.5"
                        style={{ backgroundColor: book.themeDesign.accent }}
                        title={`Accent: ${book.themeDesign.accent}`}
                      />
                      <span className="font-medium text-slate-200">
                        Theme: {book.themeDesign.name}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">
                        ({book.fontPairing})
                      </span>
                    </span>
                  </>
                )}
              </div>

              {/* Quick Jump Dropdown */}
              <div className="flex items-center gap-2 text-xs flex-shrink-0">
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Jump to:</span>
                <div className="relative">
                  <select
                    onChange={(e) => handleJumpToSection(e.target.value)}
                    className="bg-[#0d111a] border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                    defaultValue="cover-front"
                  >
                    <option value="cover-front">Front Cover</option>
                    <option value="title-page">Title Page</option>
                    <option value="table-of-contents">Table of Contents</option>
                    <option value="foreword">Foreword</option>
                    <option value="introduction">Introduction</option>
                    {book.chapters.map((ch) => (
                      <option key={ch.number} value={`chapter-${ch.number}`}>
                        Chapter {ch.number}: {ch.title.length > 25 ? `${ch.title.slice(0, 25)}...` : ch.title}
                      </option>
                    ))}
                    <option value="conclusion">Conclusion</option>
                    <option value="glossary">Glossary</option>
                    <option value="references">References</option>
                    <option value="cover-back">Back Cover</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Standalone Book Viewer Container */}
            <div className="bg-[#1e2333] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[820px]">
              <iframe
                ref={iframeRef}
                title="6x9 Trade PDF Preview"
                className="w-full h-full border-0 bg-white"
                sandbox="allow-same-origin allow-scripts allow-modals"
              />
            </div>
          </>
        ) : isGenerating ? (
          /* Loading State */
          <div className="bg-[#141824] border border-slate-800 rounded-xl flex flex-col items-center justify-center gap-4 text-slate-300 py-24 px-6">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-pulse">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <div className="text-center max-w-md">
              <h3 className="text-base font-semibold text-white mb-1.5">Generating & Compiling Final PDF</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Synthesizing full book apparatus, matching bespoke theme for "{topic}", and compiling final 6"×9" trade PDF by printing HTML for {author}...
              </p>
            </div>
          </div>
        ) : (
          /* Empty State - Output: PDF ONLY */
          <div className="bg-[#141824] border border-slate-800 rounded-xl flex flex-col items-center justify-center text-center py-20 px-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">
              Ready to Author Your 6"×9" PDF Monograph
            </h2>
            <p className="text-xs text-slate-400 max-w-lg mb-8 leading-relaxed">
              Enter your book topic and author name above, then click <span className="text-amber-400 font-medium">Generate Book</span>. The monograph will be synthesized and automatically compiled to a print-ready 6"×9" PDF via print.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full text-left">
              <div className="bg-[#0d111a] border border-slate-800 rounded-lg p-3.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                  <FileText className="w-4 h-4" />
                  <span>Full Trade Apparatus</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Front and back covers, title page, copyright, TOC, foreword, chapters, bibliography, and back cover.
                </p>
              </div>

              <div className="bg-[#0d111a] border border-slate-800 rounded-lg p-3.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                  <Palette className="w-4 h-4" />
                  <span>Auto-Designed Theme</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Color palettes and typography are automatically designed to match your subject matter with zero configuration.
                </p>
              </div>

              <div className="bg-[#0d111a] border border-slate-800 rounded-lg p-3.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                  <FileDown className="w-4 h-4" />
                  <span>Output: PDF ONLY</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  After generation, compiles directly into a final 6"×9" trade PDF by printing the HTML. Destination: Save as PDF.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
