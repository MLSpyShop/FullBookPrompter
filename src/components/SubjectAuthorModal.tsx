import React, { useState } from "react";
import { X, Sparkles, BookOpen, User, Palette, Bookmark, Layers, Search, CheckCircle2, FileText, Quote, Award } from "lucide-react";
import { BookProject, BookTheme, FontPairing } from "../types";
import { defaultMasterBook } from "../data/defaultBook";

interface SubjectAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: BookProject;
  onUpdateBookMeta: (updatedMeta: Partial<BookProject>) => void;
  onGenerateWithGemini: (subject: string, authorInfo: any, theme: BookTheme, chapterCount: number) => Promise<void>;
  isGenerating: boolean;
}

export const SubjectAuthorModal: React.FC<SubjectAuthorModalProps> = ({
  isOpen,
  onClose,
  book,
  onUpdateBookMeta,
  onGenerateWithGemini,
  isGenerating,
}) => {
  const [activeTab, setActiveTab] = useState<"subject_author" | "book_meta" | "preliminaries" | "back_matter">("subject_author");

  // Subject & Author
  const [subject, setSubject] = useState(book.subject);
  const [authorName, setAuthorName] = useState(book.author.name);
  const [authorCredentials, setAuthorCredentials] = useState(book.author.credentials || "");
  const [authorAffiliation, setAuthorAffiliation] = useState(book.author.affiliation || "");
  const [authorBio, setAuthorBio] = useState(book.author.bio || "");
  const [authorContact, setAuthorContact] = useState(book.author.contact || "");
  const [chapterCount, setChapterCount] = useState<number>(book.chapters.length || 15);

  // Book Meta & Styling
  const [title, setTitle] = useState(book.title);
  const [subtitle, setSubtitle] = useState(book.subtitle);
  const [tagline, setTagline] = useState(book.tagline);
  const [isbn, setIsbn] = useState(book.isbn);
  const [publisher, setPublisher] = useState(book.publisher);
  const [edition, setEdition] = useState(book.edition);
  const [theme, setTheme] = useState<BookTheme>(book.theme);
  const [fontPairing, setFontPairing] = useState<FontPairing>(book.fontPairing || "garamond");

  // Preliminaries
  const [dedication, setDedication] = useState(book.dedication);
  const [epigraphQuote, setEpigraphQuote] = useState(book.epigraph.quote);
  const [epigraphAttribution, setEpigraphAttribution] = useState(book.epigraph.attribution);
  const [forewordAuthor, setForewordAuthor] = useState(book.foreword.author);
  const [forewordContent, setForewordContent] = useState(book.foreword.content);
  const [preface, setPreface] = useState(book.preface);
  const [acknowledgments, setAcknowledgments] = useState(book.acknowledgments);
  const [introTitle, setIntroTitle] = useState(book.introduction.title);
  const [introContent, setIntroContent] = useState(book.introduction.content);

  // Back Matter
  const [conclusionTitle, setConclusionTitle] = useState(book.conclusion.title);
  const [conclusionContent, setConclusionContent] = useState(book.conclusion.content);
  const [backCoverSynopsis, setBackCoverSynopsis] = useState(book.backCoverSynopsis);

  // Research sources
  const [isResearching, setIsResearching] = useState<boolean>(false);
  const [discoveredSources, setDiscoveredSources] = useState<any[]>([]);

  if (!isOpen) return null;

  const handleApplyChanges = () => {
    onUpdateBookMeta({
      title: title.trim() || book.title,
      subtitle: subtitle.trim() || book.subtitle,
      tagline: tagline.trim() || book.tagline,
      isbn: isbn.trim() || book.isbn,
      publisher: publisher.trim() || book.publisher,
      edition: edition.trim() || book.edition,
      subject,
      theme,
      fontPairing,
      author: {
        name: authorName.trim() || book.author.name,
        credentials: authorCredentials.trim(),
        affiliation: authorAffiliation.trim(),
        bio: authorBio.trim(),
        contact: authorContact.trim(),
      },
      dedication: dedication.trim(),
      epigraph: {
        quote: epigraphQuote.trim(),
        attribution: epigraphAttribution.trim(),
      },
      foreword: {
        author: forewordAuthor.trim(),
        content: forewordContent.trim(),
      },
      preface: preface.trim(),
      acknowledgments: acknowledgments.trim(),
      introduction: {
        title: introTitle.trim() || book.introduction.title,
        content: introContent.trim(),
      },
      conclusion: {
        title: conclusionTitle.trim() || book.conclusion.title,
        content: conclusionContent.trim(),
      },
      backCoverSynopsis: backCoverSynopsis.trim(),
    });
    onClose();
  };

  const handleLoadPreset = (presetType: "landry" | "quantum" | "climate" | "genomics") => {
    if (presetType === "landry") {
      setSubject(defaultMasterBook.subject);
      setAuthorName(defaultMasterBook.author.name);
      setAuthorCredentials(defaultMasterBook.author.credentials || "");
      setAuthorAffiliation(defaultMasterBook.author.affiliation || "");
      setAuthorBio(defaultMasterBook.author.bio || "");
      setAuthorContact(defaultMasterBook.author.contact || "");
      setTitle(defaultMasterBook.title);
      setSubtitle(defaultMasterBook.subtitle);
      setTheme("classic-navy");
      setFontPairing("garamond");
      setChapterCount(10);
    } else if (presetType === "quantum") {
      setSubject("Quantum Supremacy, Post-Quantum Cryptography, and Fault-Tolerant Logical Qubits in Distributed Systems: Architectural Proofs and National Security Defense");
      setAuthorName("Dr. Marcus Sterling");
      setAuthorCredentials("Ph.D., Chair of Applied Quantum Computing, Zurich Quantum Laboratory");
      setAuthorAffiliation("Zurich Institute for Advanced Physics & High-Assurance Cryptography");
      setAuthorBio("Dr. Marcus Sterling is an authority on topological qubit error correction and lattice-based cryptographic hardness guarantees.");
      setAuthorContact("sterling.m@zurichquantum.ch");
      setTitle("Quantum Sovereignty");
      setSubtitle("Fault-Tolerant Logical Qubits, Topological Verification, and Post-Quantum Security");
      setTheme("obsidian-crimson");
      setFontPairing("newsreader");
      setChapterCount(15);
    } else if (presetType === "climate") {
      setSubject("Regenerative Planetary Bio-Economics: Decoupled Circular Metabolism, Closed-Loop Biomanufacturing, and Synthetic Carbon Sequestration Frameworks");
      setAuthorName("Prof. Vivienne Vance");
      setAuthorCredentials("Sc.D., Fellow in Ecological Economics & Planetary Earth Systems");
      setAuthorAffiliation("Oxford Program on the Future of Sustainable Industry");
      setAuthorBio("Prof. Vance bridges macroeconomic thermodynamics, industrial ecology, and synthetic biology to design zero-carbon closed-loop industrial ecosystems.");
      setAuthorContact("vance.vivienne@oxford-future.org");
      setTitle("Planetary Metabolism");
      setSubtitle("Thermodynamics of Circular Industry, Biomanufacturing, and Ecological Economics");
      setTheme("emerald-press");
      setFontPairing("garamond");
      setChapterCount(15);
    } else if (presetType === "genomics") {
      setSubject("Programmable Epigenomics and Cellular Rejuvenation: Synthetic Gene Circuits, Molecular Clock Reversal, and High-Fidelity In Vivo Therapeutics");
      setAuthorName("Dr. Elena Chen-O'Connor");
      setAuthorCredentials("M.D., Ph.D., Director of Molecular Regeneration & Synthetic Biology");
      setAuthorAffiliation("Broad Institute & Harvard Center for Regenerative Therapeutics");
      setAuthorBio("Dr. Chen-O'Connor pioneered base-editing epigenetic therapies and multi-scale cellular rejuvenation architectures.");
      setAuthorContact("e.chenoconnor@broadinstitute.org");
      setTitle("Programmable Epigenomics");
      setSubtitle("Synthetic Gene Circuits, Epigenetic Clock Reversal, and High-Fidelity In Vivo Therapeutics");
      setTheme("oxford-burgundy");
      setFontPairing("merriweather");
      setChapterCount(15);
    }
  };

  // Discover scholarly sources via Gemini APA 7th backend
  const handleResearchSources = async () => {
    if (!subject) return;
    setIsResearching(true);
    try {
      const res = await fetch("/api/research-sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });
      if (res.ok) {
        const data = await res.json();
        setDiscoveredSources(data.sources || []);
      }
    } catch (e) {
      console.warn("Failed to discover sources:", e);
    } finally {
      setIsResearching(false);
    }
  };

  const handleStartGeminiGeneration = async () => {
    await onGenerateWithGemini(
      subject,
      {
        name: authorName,
        credentials: authorCredentials,
        affiliation: authorAffiliation,
        bio: authorBio,
        contact: authorContact,
      },
      theme,
      chapterCount
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#131722] border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 text-slate-100 my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/15 text-amber-400 rounded-lg border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-amber-400">
                FULLBOOKPROMPTER Studio Configuration
              </h2>
              <p className="text-xs text-slate-400">
                Enter Subject/Abstract and Author Profile for 65,000-token print-ready monograph
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-800 pt-3 pb-2 flex-shrink-0 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab("subject_author")}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              activeTab === "subject_author"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            1. Subject & Author (Required)
          </button>
          <button
            onClick={() => setActiveTab("book_meta")}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              activeTab === "book_meta"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            2. Title & Theme Styling
          </button>
          <button
            onClick={() => setActiveTab("preliminaries")}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              activeTab === "preliminaries"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            3. Preliminaries & Foreword
          </button>
          <button
            onClick={() => setActiveTab("back_matter")}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              activeTab === "back_matter"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            4. Conclusion & Back Cover
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs pr-1">
          {/* TAB 1: SUBJECT & AUTHOR */}
          {activeTab === "subject_author" && (
            <div className="space-y-4">
              {/* Quick Presets */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Bookmark className="w-3 h-3 text-amber-400" />
                  Quick Academic / Subject Presets:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleLoadPreset("landry")}
                    className="px-2.5 py-1.5 text-left rounded-lg bg-slate-800/80 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-700/60 transition"
                  >
                    <div className="font-semibold text-amber-300 truncate">Marie Landry</div>
                    <div className="text-[10px] text-slate-400 truncate">Cognitive Autonomous AI</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadPreset("quantum")}
                    className="px-2.5 py-1.5 text-left rounded-lg bg-slate-800/80 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-700/60 transition"
                  >
                    <div className="font-semibold text-slate-200 truncate">Dr. M. Sterling</div>
                    <div className="text-[10px] text-slate-400 truncate">Quantum Cryptography</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadPreset("climate")}
                    className="px-2.5 py-1.5 text-left rounded-lg bg-slate-800/80 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-700/60 transition"
                  >
                    <div className="font-semibold text-slate-200 truncate">Prof. V. Vance</div>
                    <div className="text-[10px] text-slate-400 truncate">Planetary Bio-Economics</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadPreset("genomics")}
                    className="px-2.5 py-1.5 text-left rounded-lg bg-slate-800/80 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-700/60 transition"
                  >
                    <div className="font-semibold text-slate-200 truncate">Dr. E. Chen-O'Connor</div>
                    <div className="text-[10px] text-slate-400 truncate">Programmable Epigenetics</div>
                  </button>
                </div>
              </div>

              {/* SUBJECT / ABSTRACT */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                    SUBJECT / Abstract (Core Monograph Thesis) *
                  </label>
                  <button
                    type="button"
                    disabled={isResearching || !subject}
                    onClick={handleResearchSources}
                    className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 disabled:opacity-50"
                  >
                    <Search className="w-3 h-3" />
                    {isResearching ? "Searching scholarly citations..." : "Verify APA Citations"}
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
                  placeholder="Enter detailed research subject or abstract..."
                />
              </div>

              {/* Discovered Sources Preview if any */}
              {discoveredSources.length > 0 && (
                <div className="p-3 bg-sky-950/40 border border-sky-800/60 rounded-xl space-y-2">
                  <div className="font-semibold text-sky-300 text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    {discoveredSources.length} Scholarly APA 7th Sources Discovered
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-1 text-[10px] text-slate-300 font-mono pr-1">
                    {discoveredSources.slice(0, 5).map((s, idx) => (
                      <div key={idx} className="p-1.5 bg-slate-950/60 rounded border border-slate-800">
                        {s.citation}
                      </div>
                    ))}
                    {discoveredSources.length > 5 && (
                      <div className="text-slate-400 italic">...and {discoveredSources.length - 5} more sources</div>
                    )}
                  </div>
                </div>
              )}

              {/* AUTHOR INFO FIELDS */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <div className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  AUTHOR Information *
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                      Author Full Name (e.g. Marie Landry)
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                      placeholder="e.g. Marie Landry"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                      Credentials & Titles (Optional)
                    </label>
                    <input
                      type="text"
                      value={authorCredentials}
                      onChange={(e) => setAuthorCredentials(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                      placeholder="e.g. Chief Executive Officer & AI Systems Strategist"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                      Institutional Affiliation
                    </label>
                    <input
                      type="text"
                      value={authorAffiliation}
                      onChange={(e) => setAuthorAffiliation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                      placeholder="e.g. Cognitive Horizons Institute"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                      Contact Email / Website
                    </label>
                    <input
                      type="text"
                      value={authorContact}
                      onChange={(e) => setAuthorContact(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                      placeholder="e.g. marielandryceo@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Author Biographical Note (Included on Back Cover and Preliminaries)
                  </label>
                  <textarea
                    rows={3}
                    value={authorBio}
                    onChange={(e) => setAuthorBio(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed"
                    placeholder="Brief career highlights, executive or research leadership, and focus areas..."
                  />
                </div>
              </div>

              {/* Generation target */}
              <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <div>
                  <div className="font-semibold text-amber-300 text-xs">
                    Target Monograph Scale
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Comprehensive scholarly depth across front matter, chapters, APA references, and glossary.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-300">Chapters:</label>
                  <select
                    value={chapterCount}
                    onChange={(e) => setChapterCount(Number(e.target.value))}
                    className="bg-slate-900 border border-amber-500/40 rounded-lg px-2.5 py-1 text-amber-300 font-bold focus:outline-none"
                  >
                    <option value={15}>15 Chapters (All 65,000 Output Tokens)</option>
                    <option value={12}>12 Chapters (~50k tokens)</option>
                    <option value={10}>10 Chapters (~40k tokens)</option>
                    <option value={8}>8 Chapters (~30k tokens)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOK META & STYLING */}
          {activeTab === "book_meta" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Monograph Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Tagline (Cover)
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    ISBN-13
                  </label>
                  <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Publisher / Press
                  </label>
                  <input
                    type="text"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Edition
                  </label>
                  <input
                    type="text"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Theme & Typography */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Book Color Palette (Embedded CSS)
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as BookTheme)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="classic-navy">Classic Academic Navy (#0f172a / Gold)</option>
                    <option value="oxford-burgundy">Oxford Burgundy (#4a0404 / Amber)</option>
                    <option value="emerald-press">Emerald Press (#064e3b / Bronze)</option>
                    <option value="obsidian-crimson">Obsidian Crimson (#0a0a0c / Crimson)</option>
                    <option value="scholarly-sepia">Scholarly Warm Sepia (#2b1e16 / Ochre)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Typography Pairing
                  </label>
                  <select
                    value={fontPairing}
                    onChange={(e) => setFontPairing(e.target.value as FontPairing)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="garamond">EB Garamond + Cinzel (Classic Trade)</option>
                    <option value="merriweather">Merriweather + Playfair (Literary Warmth)</option>
                    <option value="newsreader">Newsreader + Inter (Contemporary Monograph)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRELIMINARIES & APPARATUS */}
          {activeTab === "preliminaries" && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                  Dedication
                </label>
                <textarea
                  rows={2}
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 italic"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Epigraph Quote
                  </label>
                  <textarea
                    rows={2}
                    value={epigraphQuote}
                    onChange={(e) => setEpigraphQuote(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-amber-500 italic"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                    Epigraph Attribution
                  </label>
                  <input
                    type="text"
                    value={epigraphAttribution}
                    onChange={(e) => setEpigraphAttribution(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                <div className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                  Foreword (By Distinguished Colleague or Academic)
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">
                    Foreword Author & Affiliation
                  </label>
                  <input
                    type="text"
                    value={forewordAuthor}
                    onChange={(e) => setForewordAuthor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">
                    Foreword Text
                  </label>
                  <textarea
                    rows={4}
                    value={forewordContent}
                    onChange={(e) => setForewordContent(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed font-serif text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                  Author's Preface
                </label>
                <textarea
                  rows={4}
                  value={preface}
                  onChange={(e) => setPreface(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed font-serif text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                  Acknowledgments
                </label>
                <textarea
                  rows={3}
                  value={acknowledgments}
                  onChange={(e) => setAcknowledgments(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                  Introduction Title & Substantive Content
                </label>
                <input
                  type="text"
                  value={introTitle}
                  onChange={(e) => setIntroTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 mb-2 font-semibold focus:outline-none focus:border-amber-500"
                />
                <textarea
                  rows={4}
                  value={introContent}
                  onChange={(e) => setIntroContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed font-serif text-[11px]"
                />
              </div>
            </div>
          )}

          {/* TAB 4: BACK MATTER & ENDORSEMENTS */}
          {activeTab === "back_matter" && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                  Conclusion Title & Synthesis
                </label>
                <input
                  type="text"
                  value={conclusionTitle}
                  onChange={(e) => setConclusionTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 mb-2 font-semibold focus:outline-none focus:border-amber-500"
                />
                <textarea
                  rows={5}
                  value={conclusionContent}
                  onChange={(e) => setConclusionContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed font-serif text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-[10px] uppercase font-semibold mb-1">
                  Back Cover Synopsis (Printed on the 6"×9" Back Cover)
                </label>
                <textarea
                  rows={6}
                  value={backCoverSynopsis}
                  onChange={(e) => setBackCoverSynopsis(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleApplyChanges}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition w-full sm:w-auto"
            >
              Apply Form Edits
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isGenerating || !subject}
              onClick={handleStartGeminiGeneration}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-lg shadow-md transition disabled:opacity-50 w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? "Generating 65k Architecture..." : "Generate Full Monograph"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
