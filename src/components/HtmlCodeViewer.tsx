import React, { useState } from "react";
import { Copy, Check, Download, FileCode, CheckCircle2 } from "lucide-react";

interface HtmlCodeViewerProps {
  htmlContent: string;
  bookTitle: string;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
}

export const HtmlCodeViewer: React.FC<HtmlCodeViewerProps> = ({
  htmlContent,
  bookTitle,
  onCopy,
  onDownload,
  copied,
}) => {
  // Approximate token calculation: roughly 4 characters per token
  const charCount = htmlContent.length;
  const wordCount = htmlContent.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  const approxTokens = Math.round(charCount / 3.8);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] text-slate-200 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Bar with Metrics */}
      <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FileCode className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Single Continuous HTML Document Output
            </h3>
            <p className="text-[11px] text-slate-400">
              Complete, self-contained `&lt;!DOCTYPE html&gt;` to `&lt;/html&gt;` with embedded CSS and 6"×9" print rules
            </p>
          </div>
        </div>

        {/* Token & Stats Badges */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
            <span className="text-amber-400 font-semibold">~{approxTokens.toLocaleString()}</span> Tokens
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
            <span className="text-emerald-400 font-semibold">{wordCount.toLocaleString()}</span> Words
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
            <span className="text-sky-400 font-semibold">{(charCount / 1024).toFixed(1)}</span> KB
          </div>

          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded text-xs font-medium border border-slate-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Raw HTML</span>
              </>
            )}
          </button>

          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-semibold shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .html</span>
          </button>
        </div>
      </div>

      {/* Code Textarea */}
      <div className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-300 leading-relaxed bg-[#0b0e14]">
        <pre className="whitespace-pre-wrap select-all">
          {htmlContent}
        </pre>
      </div>
    </div>
  );
};
