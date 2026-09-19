import React, { useMemo } from "react";
import { BookProject } from "../types";
import { Gauge, BookOpen, Quote, FileText, CheckCircle2, Award } from "lucide-react";

interface MonographMetricsBarProps {
  book: BookProject;
  onJumpToSection?: (sectionId: string) => void;
}

export const MonographMetricsBar: React.FC<MonographMetricsBarProps> = ({
  book,
  onJumpToSection,
}) => {
  const stats = useMemo(() => {
    let wordCount = 0;

    const count = (text?: string) => {
      if (!text) return 0;
      return text.trim().split(/\s+/).filter(Boolean).length;
    };

    // Front matter & apparatus
    wordCount += count(book.title);
    wordCount += count(book.subtitle);
    wordCount += count(book.dedication);
    wordCount += count(book.epigraph.quote);
    wordCount += count(book.foreword.content);
    wordCount += count(book.preface);
    wordCount += count(book.acknowledgments);
    wordCount += count(book.introduction.content);

    // Chapters
    let caseStudyCount = 0;
    let sectionCount = 0;
    book.chapters.forEach((ch) => {
      wordCount += count(ch.title);
      wordCount += count(ch.subtitle);
      wordCount += count(ch.abstract);
      wordCount += count(ch.epigraph?.quote);

      if (ch.sections) {
        sectionCount += ch.sections.length;
        ch.sections.forEach((s) => {
          wordCount += count(s.heading);
          wordCount += count(s.content);
        });
      }

      if (ch.caseStudy) {
        caseStudyCount++;
        wordCount += count(ch.caseStudy.title);
        wordCount += count(ch.caseStudy.context);
        wordCount += count(ch.caseStudy.intervention);
        wordCount += count(ch.caseStudy.results);
      }

      if (ch.takeaways) {
        ch.takeaways.forEach((t) => (wordCount += count(t)));
      }

      if (ch.discussionQuestions) {
        ch.discussionQuestions.forEach((q) => (wordCount += count(q)));
      }
    });

    // Conclusion, Glossary & References
    wordCount += count(book.conclusion.content);
    wordCount += count(book.backCoverSynopsis);

    if (book.glossary) {
      book.glossary.forEach((g) => {
        wordCount += count(g.term) + count(g.definition);
      });
    }

    if (book.bibliography) {
      book.bibliography.forEach((b) => {
        wordCount += count(b.citation);
      });
    }

    const estimatedPages = Math.max(1, Math.ceil(wordCount / 280));
    // Rule of thumb: ~1.32 tokens per word for academic and scientific prose
    const estimatedTokens = Math.round(wordCount * 1.32);
    const capacityRatio = Math.min(100, Math.round((estimatedTokens / 65000) * 100));

    return {
      wordCount,
      estimatedPages,
      estimatedTokens,
      capacityRatio,
      caseStudyCount,
      sectionCount,
      citationCount: book.bibliography.length,
      glossaryCount: book.glossary.length,
    };
  }, [book]);

  return (
    <div className="bg-[#10141d] border-b border-slate-800 text-slate-300 px-4 sm:px-6 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Left: Quick Stat Badges */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-100">{stats.wordCount.toLocaleString()}</span> Words
          </div>

          <span className="text-slate-700">•</span>

          <div className="flex items-center gap-1 text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-100">~{stats.estimatedPages}</span> Pages (6"×9" Trade)
          </div>

          <span className="text-slate-700">•</span>

          <div className="flex items-center gap-1 text-slate-300">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold text-slate-100">{book.chapters.length}</span> Chapters ({stats.sectionCount} Subsections)
          </div>

          <span className="text-slate-700">•</span>

          <div className="flex items-center gap-1 text-slate-300">
            <Quote className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-100">{stats.citationCount}+</span> APA 7th Citations
          </div>

          <span className="text-slate-700">•</span>

          <div className="flex items-center gap-1 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-100">{stats.caseStudyCount}</span> Empirical Case Studies
          </div>
        </div>

        {/* Right: 65k Token Capacity Density Meter */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Monograph Density:</span>
            <span className="font-mono font-bold text-amber-300">
              {stats.estimatedTokens.toLocaleString()} / 65,000
            </span>
            <span className="text-[10px] text-slate-500">tokens</span>
          </div>

          {/* Progress bar */}
          <div className="w-24 sm:w-32 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/80">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                stats.capacityRatio >= 80
                  ? "bg-gradient-to-r from-emerald-500 to-amber-400"
                  : stats.capacityRatio >= 40
                  ? "bg-gradient-to-r from-sky-500 to-amber-400"
                  : "bg-amber-500"
              }`}
              style={{ width: `${stats.capacityRatio}%` }}
              title={`${stats.capacityRatio}% of 65,000 capacity utilized`}
            />
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-400">
            {stats.capacityRatio}%
          </span>
        </div>
      </div>
    </div>
  );
};
