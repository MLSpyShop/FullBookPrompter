import React from "react";
import { BookOpen, Download, Copy, Printer, Sliders, Check, Code, Eye, Layers, ExternalLink, Palette } from "lucide-react";
import { BookProject, BookTheme } from "../types";

interface BookNavbarProps {
  book: BookProject;
  viewMode: "trade" | "continuous" | "code";
  setViewMode: (mode: "trade" | "continuous" | "code") => void;
  onOpenSubjectModal: () => void;
  onPrint: () => void;
  onDownloadHtml: () => void;
  onCopyHtml: () => void;
  onOpenNewTab: () => void;
  onChangeTheme: (theme: BookTheme) => void;
  copied: boolean;
  isGenerating: boolean;
}

export const BookNavbar: React.FC<BookNavbarProps> = ({
  book,
  viewMode,
  setViewMode,
  onOpenSubjectModal,
  onPrint,
  onDownloadHtml,
  onCopyHtml,
  onOpenNewTab,
  onChangeTheme,
  copied,
  isGenerating,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#131722]/95 backdrop-blur border-b border-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Active Book Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-900/30 flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-wider text-amber-400">
                FULLBOOKPROMPTER
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded uppercase tracking-wider">
                6"×9" Trade Monograph
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-xs md:max-w-md">
              <span className="font-semibold text-slate-300">{book.title}</span> • {book.author.name}
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode("trade")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === "trade"
                ? "bg-amber-500 text-slate-950 font-semibold shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
            title="Simulated 6x9 Print Trade Book"
          >
            <Layers className="w-3.5 h-3.5" />
            6"×9" Trade Book
          </button>
          <button
            onClick={() => setViewMode("continuous")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === "continuous"
                ? "bg-amber-500 text-slate-950 font-semibold shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
            title="Continuous Reader Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            Fluid Reader
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === "code"
                ? "bg-amber-500 text-slate-950 font-semibold shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
            title="View Standalone HTML Code Output"
          >
            <Code className="w-3.5 h-3.5" />
            Raw HTML
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Palette Picker */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
            <Palette className="w-3 h-3 text-amber-400" />
            <select
              value={book.theme}
              onChange={(e) => onChangeTheme(e.target.value as BookTheme)}
              className="bg-transparent text-[11px] text-slate-300 font-medium focus:outline-none cursor-pointer"
              title="Change Book Palette"
            >
              <option value="classic-navy">Navy Press</option>
              <option value="oxford-burgundy">Oxford Burgundy</option>
              <option value="emerald-press">Emerald Press</option>
              <option value="obsidian-crimson">Obsidian Crimson</option>
              <option value="scholarly-sepia">Scholarly Sepia</option>
            </select>
          </div>

          {/* Subject & Author Modal Button */}
          <button
            onClick={onOpenSubjectModal}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg border border-slate-700 transition shadow-sm"
            title="Configure Subject, Abstract, and Author Info"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Subject & Author</span>
          </button>

          {/* Open in New Tab Button */}
          <button
            onClick={onOpenNewTab}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition shadow-sm"
            title="Open standalone HTML eBook in a new browser window"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden md:inline">Open in Tab</span>
          </button>

          {/* Print Button (6x9 PDF) */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition shadow-sm"
            title="Print or Save as 6x9 PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden md:inline">Print / PDF</span>
          </button>

          {/* Copy HTML Button */}
          <button
            onClick={onCopyHtml}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition shadow-sm"
            title="Copy Standalone HTML Document"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">Copy HTML</span>
              </>
            )}
          </button>

          {/* Download HTML Button */}
          <button
            onClick={onDownloadHtml}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-lg shadow-md shadow-amber-950/40 transition"
            title="Download Single Standalone HTML File"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .HTML</span>
          </button>
        </div>
      </div>
    </header>
  );
};
