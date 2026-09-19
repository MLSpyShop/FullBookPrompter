import React, { useState, useEffect } from "react";
import { Chapter, Section, CaseStudy } from "../types";
import { X, Save, Plus, Trash2, BookOpen, FileText, CheckCircle2, HelpCircle, Quote } from "lucide-react";

interface ChapterEditorModalProps {
  isOpen: boolean;
  chapter: Chapter | null;
  onClose: () => void;
  onSaveChapter: (updatedChapter: Chapter) => void;
}

export const ChapterEditorModal: React.FC<ChapterEditorModalProps> = ({
  isOpen,
  chapter,
  onClose,
  onSaveChapter,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "sections" | "casestudy" | "pedagogy">("overview");

  // Local state for editing
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [abstract, setAbstract] = useState<string>("");
  const [epigraphQuote, setEpigraphQuote] = useState<string>("");
  const [epigraphAttribution, setEpigraphAttribution] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);
  const [caseStudy, setCaseStudy] = useState<CaseStudy>({
    title: "",
    context: "",
    intervention: "",
    results: "",
  });
  const [takeaways, setTakeaways] = useState<string[]>([]);
  const [discussionQuestions, setDiscussionQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title || "");
      setSubtitle(chapter.subtitle || "");
      setAbstract(chapter.abstract || "");
      setEpigraphQuote(chapter.epigraph?.quote || "");
      setEpigraphAttribution(chapter.epigraph?.attribution || "");
      setSections(chapter.sections ? JSON.parse(JSON.stringify(chapter.sections)) : []);
      setCaseStudy(
        chapter.caseStudy
          ? { ...chapter.caseStudy }
          : { title: "", context: "", intervention: "", results: "" }
      );
      setTakeaways(chapter.takeaways ? [...chapter.takeaways] : []);
      setDiscussionQuestions(chapter.discussionQuestions ? [...chapter.discussionQuestions] : []);
    }
  }, [chapter]);

  if (!isOpen || !chapter) return null;

  const handleSave = () => {
    const updated: Chapter = {
      ...chapter,
      title: title.trim() || chapter.title,
      subtitle: subtitle.trim(),
      abstract: abstract.trim(),
      epigraph: epigraphQuote.trim()
        ? { quote: epigraphQuote.trim(), attribution: epigraphAttribution.trim() }
        : undefined,
      sections: sections.filter((s) => s.heading.trim() || s.content.trim()),
      caseStudy: caseStudy.title.trim() ? caseStudy : undefined,
      takeaways: takeaways.filter((t) => t.trim().length > 0),
      discussionQuestions: discussionQuestions.filter((q) => q.trim().length > 0),
    };

    onSaveChapter(updated);
    onClose();
  };

  // Section helpers
  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        heading: `Section ${prev.length + 1}`,
        content: "Enter substantive analysis with in-text APA citations...",
      },
    ]);
  };

  const handleRemoveSection = (idx: number) => {
    setSections((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateSection = (idx: number, field: keyof Section, value: string) => {
    setSections((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  };

  // Takeaways helpers
  const handleAddTakeaway = () => {
    setTakeaways((prev) => [...prev, "New critical takeaway insight."]);
  };

  const handleUpdateTakeaway = (idx: number, val: string) => {
    setTakeaways((prev) => prev.map((t, i) => (i === idx ? val : t)));
  };

  const handleRemoveTakeaway = (idx: number) => {
    setTakeaways((prev) => prev.filter((_, i) => i !== idx));
  };

  // Discussion question helpers
  const handleAddQuestion = () => {
    setDiscussionQuestions((prev) => [...prev, "Seminar inquiry on systemic governance trade-offs?"]);
  };

  const handleUpdateQuestion = (idx: number, val: string) => {
    setDiscussionQuestions((prev) => prev.map((q, i) => (i === idx ? val : q)));
  };

  const handleRemoveQuestion = (idx: number) => {
    setDiscussionQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#131722] border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 text-slate-100 my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/15 text-amber-400 rounded-lg border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Chapter {chapter.number} Editor
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                  {sections.length} Sections
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-display text-slate-100 truncate max-w-md sm:max-w-xl">
                {title || "Untitled Chapter"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pt-3 pb-2 flex-shrink-0 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            Overview & Epigraph
          </button>
          <button
            onClick={() => setActiveTab("sections")}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              activeTab === "sections"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Subsections ({sections.length})
          </button>
          <button
            onClick={() => setActiveTab("casestudy")}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              activeTab === "casestudy"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Empirical Case Study
          </button>
          <button
            onClick={() => setActiveTab("pedagogy")}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              activeTab === "pedagogy"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Takeaways & Discussion
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs pr-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                  Chapter Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="e.g. The Epistemological Threshold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                  Chapter Subtitle (Scope / Domain)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="e.g. From Predictive Models to Co-Reasoning Agents"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                  Chapter Abstract & Scholarly Scope
                </label>
                <textarea
                  rows={3}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed"
                  placeholder="Dense 2-3 sentence overview of the chapter's thesis and empirical methodology..."
                />
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <div className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                  Chapter Epigraph Quote
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">
                    Quote
                  </label>
                  <textarea
                    rows={2}
                    value={epigraphQuote}
                    onChange={(e) => setEpigraphQuote(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500 italic"
                    placeholder="e.g. The question of whether machines can think is about as relevant as whether submarines can swim."
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">
                    Attribution & Date
                  </label>
                  <input
                    type="text"
                    value={epigraphAttribution}
                    onChange={(e) => setEpigraphAttribution(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Edsger W. Dijkstra, 1984"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBSECTIONS */}
          {activeTab === "sections" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">
                  Subsections appear with formal typographic H2/H3 headers and drop-caps in the 6"×9" layout.
                </span>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Section
                </button>
              </div>

              {sections.map((section, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      § {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={section.heading}
                      onChange={(e) => handleUpdateSection(idx, "heading", e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-slate-100 font-semibold focus:outline-none focus:border-amber-500 text-xs"
                      placeholder={`Heading (e.g. ${chapter.number}.${idx + 1} Theoretical Foundations)`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-md transition"
                      title="Delete this section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    value={section.content}
                    onChange={(e) => handleUpdateSection(idx, "content", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed font-serif text-[12px]"
                    placeholder="Write detailed analytical prose. Separate paragraphs with blank lines. Include APA in-text citations like (Landry, 2024; Vaswani et al., 2017)..."
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: CASE STUDY */}
          {activeTab === "casestudy" && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 leading-relaxed">
                Empirical Case Studies provide peer-reviewed real-world grounding for academic and professional readership, styled as a shaded, double-bordered breakout container in print.
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                  Case Study Title
                </label>
                <input
                  type="text"
                  value={caseStudy.title}
                  onChange={(e) => setCaseStudy({ ...caseStudy, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
                  placeholder="e.g. Case Study: High-Frequency Settlement Verification in Sovereign Banking"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                  Context & Institutional Challenge
                </label>
                <textarea
                  rows={3}
                  value={caseStudy.context}
                  onChange={(e) => setCaseStudy({ ...caseStudy, context: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                  placeholder="Describe the operational setting, scale, constraints, and systemic vulnerability..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                  Intervention & Architecture Deployed
                </label>
                <textarea
                  rows={3}
                  value={caseStudy.intervention}
                  onChange={(e) => setCaseStudy({ ...caseStudy, intervention: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                  placeholder="Detail the algorithms, state reflection models, or verification boundaries implemented..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                  Empirical Results & Systemic Trade-Offs
                </label>
                <textarea
                  rows={3}
                  value={caseStudy.results}
                  onChange={(e) => setCaseStudy({ ...caseStudy, results: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                  placeholder="Include quantifiable metrics, variance reduction, compute efficiency, and failure edge cases..."
                />
              </div>
            </div>
          )}

          {/* TAB 4: PEDAGOGY */}
          {activeTab === "pedagogy" && (
            <div className="space-y-5">
              {/* Key Takeaways */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Key Architectural Takeaways ({takeaways.length})
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTakeaway}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] border border-slate-700 transition"
                  >
                    <Plus className="w-3 h-3" /> Add Takeaway
                  </button>
                </div>

                <div className="space-y-2">
                  {takeaways.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold text-xs">✓</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleUpdateTakeaway(idx, e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTakeaway(idx)}
                        className="p-1 text-rose-400 hover:bg-rose-500/20 rounded transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seminar Discussion Questions */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                    <HelpCircle className="w-4 h-4 text-sky-400" />
                    Seminar Discussion Questions ({discussionQuestions.length})
                  </div>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] border border-slate-700 transition"
                  >
                    <Plus className="w-3 h-3" /> Add Question
                  </button>
                </div>

                <div className="space-y-2">
                  {discussionQuestions.map((q, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-sky-400 font-mono text-xs pt-1.5">Q{idx + 1}:</span>
                      <textarea
                        rows={2}
                        value={q}
                        onChange={(e) => handleUpdateQuestion(idx, e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(idx)}
                        className="p-1 text-rose-400 hover:bg-rose-500/20 rounded transition mt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-lg shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Chapter Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
