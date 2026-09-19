import React from "react";
import { Chapter } from "../types";
import { Sparkles, BookOpen, CheckCircle2, HelpCircle, FileText, Edit3, Plus, Trash2 } from "lucide-react";

interface ChapterManagerProps {
  chapters: Chapter[];
  selectedChapterNum: number;
  onSelectChapter: (num: number) => void;
  onDeepenChapter: (chapter: Chapter) => void;
  onEditChapter: (chapter: Chapter) => void;
  onAddChapter: () => void;
  onDeleteChapter: (num: number) => void;
  isDeepening: boolean;
}

export const ChapterManager: React.FC<ChapterManagerProps> = ({
  chapters,
  selectedChapterNum,
  onSelectChapter,
  onDeepenChapter,
  onEditChapter,
  onAddChapter,
  onDeleteChapter,
  isDeepening,
}) => {
  const currentChapter = chapters.find((c) => c.number === selectedChapterNum) || chapters[0];

  return (
    <div className="bg-[#121620] border border-slate-800 rounded-xl p-4 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-300">
            Monograph Chapters ({chapters.length})
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddChapter}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs border border-slate-700 transition"
            title="Add a new chapter to the monograph"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Chapter</span>
          </button>
        </div>
      </div>

      {/* Chapter List Horizontal/Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2 mb-4">
        {chapters.map((ch) => {
          const isSelected = ch.number === selectedChapterNum;
          return (
            <button
              key={ch.number}
              onClick={() => onSelectChapter(ch.number)}
              className={`p-2 rounded-lg text-left transition border ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-sm"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Ch {ch.number}
              </div>
              <div className="text-xs font-semibold truncate mt-0.5" title={ch.title}>
                {ch.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Chapter Details Panel */}
      {currentChapter && (
        <div className="bg-slate-900/80 rounded-lg p-3.5 border border-slate-800/90 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-800 mb-3">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Chapter {currentChapter.number} Selected
              </span>
              <h4 className="font-bold text-sm text-slate-100 font-display truncate">
                {currentChapter.title}
              </h4>
              {currentChapter.subtitle && (
                <p className="text-xs text-slate-400 italic truncate">
                  {currentChapter.subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Edit Chapter Button */}
              <button
                type="button"
                onClick={() => onEditChapter(currentChapter)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-md transition border border-slate-700 text-xs shadow-sm"
                title="Edit chapter title, sections, case study, and questions"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Chapter</span>
              </button>

              {/* Deepen with Gemini */}
              <button
                type="button"
                disabled={isDeepening}
                onClick={() => onDeepenChapter(currentChapter)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-md transition shadow text-xs disabled:opacity-50"
                title="Expand with empirical case studies and deeper APA references via Gemini"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isDeepening ? "Deepening..." : "Deepen via Gemini"}</span>
              </button>

              {/* Delete Chapter if more than 1 */}
              {chapters.length > 1 && (
                <button
                  type="button"
                  onClick={() => onDeleteChapter(currentChapter.number)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition"
                  title="Remove this chapter from monograph"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300">
            {/* Sections summary */}
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
              <div className="font-semibold text-slate-300 text-[11px] mb-1.5 flex items-center gap-1">
                <FileText className="w-3 h-3 text-amber-400" />
                Subsections ({currentChapter.sections.length}):
              </div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                {currentChapter.sections.map((s, i) => (
                  <li key={i} className="truncate">• {s.heading}</li>
                ))}
              </ul>
            </div>

            {/* Case study summary */}
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
              <div className="font-semibold text-slate-300 text-[11px] mb-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Empirical Case Study:
              </div>
              <div className="text-[11px] text-slate-300 font-medium truncate">
                {currentChapter.caseStudy?.title || "None configured"}
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                {currentChapter.caseStudy?.results || currentChapter.abstract || ""}
              </p>
            </div>

            {/* Discussion prompts */}
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
              <div className="font-semibold text-slate-300 text-[11px] mb-1.5 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-sky-400" />
                Seminar Prompts ({currentChapter.discussionQuestions?.length || 0}):
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2 italic">
                "{currentChapter.discussionQuestions?.[0] || "No seminar prompts configured."}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
