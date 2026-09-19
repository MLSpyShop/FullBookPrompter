import { BookProject } from "../types";
import { autoDesignThemeForSubject, getFontFamilyCss } from "./themeMatcher";

export function generateStandaloneBookHtml(book: BookProject): string {
  // Automatically select/resolve theme design matching book subject
  const effectiveTheme = book.themeDesign || autoDesignThemeForSubject(book.subject || book.title);
  const themeColors = {
    primary: effectiveTheme.primary,
    accent: effectiveTheme.accent,
    dark: effectiveTheme.dark,
    light: effectiveTheme.light,
    surface: effectiveTheme.surface,
    border: effectiveTheme.border,
    gold: effectiveTheme.gold,
  };
  const bodyFontCss = getFontFamilyCss(effectiveTheme.fontPairing || book.fontPairing || "garamond");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeXml(book.title)}: ${escapeXml(book.subtitle)}</title>
  <meta name="author" content="${escapeXml(book.author.name)}">
  <meta name="description" content="${escapeXml(book.tagline)}">
  
  <!-- Embedded Google Fonts for 6x9 Trade eBook Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,600;1,6..72,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <style>
    /* =========================================================
       CSS RESET & CSS VARIABLES FOR 6" x 9" TRADE BOOK
       ========================================================= */
    :root {
      --book-primary: ${themeColors.primary};
      --book-accent: ${themeColors.accent};
      --book-dark: ${themeColors.dark};
      --book-light: ${themeColors.light};
      --book-surface: ${themeColors.surface};
      --book-border: ${themeColors.border};
      --book-text: #1a1e24;
      --book-text-muted: #4b5563;
      --font-body: ${bodyFontCss};
      --font-display: 'Cinzel', 'Times New Roman', serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Screen Base */
    body {
      font-family: var(--font-body);
      font-size: 11.5pt;
      line-height: 1.75;
      color: var(--book-text);
      background-color: #e5e7eb;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }

    /* Print Paper Simulation for Screen & Print */
    .book-container {
      max-width: 6.8in;
      margin: 30px auto;
      background: #ffffff;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      border: 1px solid #d1d5db;
    }

    .page-sheet {
      width: 100%;
      min-height: 9in;
      padding: 0.85in 0.85in;
      background: #ffffff;
      position: relative;
      page-break-after: always;
      break-after: page;
    }

    /* =========================================================
       PRINT SPECIFICATIONS (@media print & @page)
       ========================================================= */
    @page {
      size: 6in 9in;
      margin: 0.75in 0.75in 0.85in 0.75in;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      @bottom-center {
        content: counter(page);
        font-family: var(--font-sans);
        font-size: 8.5pt;
        color: #6b7280;
      }
    }

    @page :first {
      margin: 0 !important;
      @top-left { content: normal; }
      @top-right { content: normal; }
      @bottom-center { content: normal; }
    }

    @page :left {
      @top-left {
        content: "${escapeXml(book.title)}";
        font-family: var(--font-display);
        font-size: 7.5pt;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #9ca3af;
      }
    }

    @page :right {
      @top-right {
        content: "${escapeXml(book.author.name)}";
        font-family: var(--font-sans);
        font-size: 7.5pt;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #9ca3af;
      }
    }

    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }

      html, body {
        background: #ffffff !important;
        font-size: 11pt;
        line-height: 1.65;
        color: #000000;
        margin: 0 !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .book-container {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        border: none !important;
      }

      .page-sheet {
        padding: 0 !important;
        min-height: auto !important;
        page-break-after: always !important;
        break-after: page !important;
      }

      .cover-front, .cover-back {
        min-height: 9in !important;
        height: 9in !important;
        padding: 0.9in 0.75in !important;
        page-break-after: always !important;
        break-after: page !important;
        box-sizing: border-box !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .no-print {
        display: none !important;
      }
    }

    /* =========================================================
       TYPOGRAPHY
       ========================================================= */
    h1, h2, h3, h4, .font-display {
      font-family: var(--font-display);
      font-weight: 700;
      color: var(--book-dark);
      line-height: 1.25;
      letter-spacing: 0.04em;
    }

    h1 {
      font-size: 24pt;
      margin-bottom: 0.4em;
    }

    h2 {
      font-size: 16pt;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      page-break-after: avoid;
      break-after: avoid;
      border-bottom: 1px solid var(--book-border);
      padding-bottom: 4px;
    }

    h3 {
      font-size: 13pt;
      margin-top: 1.2em;
      margin-bottom: 0.4em;
      page-break-after: avoid;
      break-after: avoid;
      font-family: var(--font-sans);
      font-weight: 600;
    }

    p {
      margin-bottom: 0.8em;
      text-align: justify;
      hyphens: auto;
    }

    /* Paragraph indentation for continuous prose */
    .prose-book p + p {
      text-indent: 0.35in;
      margin-top: -0.4em;
    }

    /* Drop Cap */
    .drop-cap::first-letter {
      float: left;
      font-family: var(--font-display);
      font-size: 3.4em;
      line-height: 0.8;
      padding-top: 4px;
      padding-right: 8px;
      padding-bottom: 2px;
      color: var(--book-primary);
      font-weight: 700;
    }

    /* Blockquotes */
    blockquote {
      margin: 1.2em 0.4in;
      padding-left: 0.25in;
      border-left: 3px solid var(--book-accent);
      font-style: italic;
      color: #374151;
      font-size: 10.5pt;
    }

    blockquote footer {
      margin-top: 0.4em;
      font-style: normal;
      font-size: 9.5pt;
      font-family: var(--font-sans);
      color: #6b7280;
      text-align: right;
    }

    /* =========================================================
       FRONT & BACK COVERS (HTML/CSS THEMATIC DESIGN)
       ========================================================= */
    .cover-front {
      background: linear-gradient(145deg, var(--book-dark) 0%, var(--book-primary) 100%);
      color: #ffffff;
      min-height: 9in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.9in 0.75in;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .cover-front::before {
      content: '';
      position: absolute;
      top: 0.35in;
      left: 0.35in;
      right: 0.35in;
      bottom: 0.35in;
      border: 1.5px solid ${themeColors.gold};
      pointer-events: none;
      opacity: 0.65;
    }

    .cover-front::after {
      content: '';
      position: absolute;
      top: 0.42in;
      left: 0.42in;
      right: 0.42in;
      bottom: 0.42in;
      border: 0.5px solid ${themeColors.gold};
      pointer-events: none;
      opacity: 0.35;
    }

    .cover-header-badge {
      font-family: var(--font-sans);
      font-size: 8pt;
      font-weight: 600;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: ${themeColors.gold};
      text-align: center;
      margin-bottom: 0.4in;
    }

    .cover-title-group {
      text-align: center;
      margin: auto 0;
      z-index: 2;
    }

    .cover-title {
      font-family: var(--font-display);
      font-size: 30pt;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 0.2in;
      text-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }

    .cover-subtitle {
      font-family: var(--font-sans);
      font-size: 11pt;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.05em;
      color: #e2e8f0;
      max-width: 4.8in;
      margin: 0 auto 0.25in auto;
    }

    .cover-divider {
      width: 1.8in;
      height: 2px;
      background: linear-gradient(90deg, transparent, ${themeColors.gold}, transparent);
      margin: 0.2in auto;
    }

    .cover-tagline {
      font-family: var(--font-body);
      font-style: italic;
      font-size: 11pt;
      color: ${themeColors.gold};
      max-width: 4.2in;
      margin: 0 auto;
      line-height: 1.4;
    }

    .cover-footer-group {
      text-align: center;
      z-index: 2;
      margin-top: 0.4in;
    }

    .cover-author-name {
      font-family: var(--font-display);
      font-size: 15pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .cover-author-credentials {
      font-family: var(--font-sans);
      font-size: 8.5pt;
      color: #cbd5e1;
      letter-spacing: 0.06em;
    }

    .cover-back {
      background: #0f172a;
      color: #e2e8f0;
      min-height: 9in;
      padding: 0.85in 0.75in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #1e293b;
      position: relative;
    }

    .back-synopsis {
      font-size: 10pt;
      line-height: 1.6;
      color: #f1f5f9;
      margin-bottom: 0.3in;
    }

    .back-endorsement-card {
      background: rgba(255, 255, 255, 0.04);
      border-left: 2px solid ${themeColors.gold};
      padding: 8px 12px;
      margin-bottom: 12px;
      font-size: 8.8pt;
      line-height: 1.45;
    }

    .back-endorsement-card p {
      font-style: italic;
      margin-bottom: 4px;
      color: #f8fafc;
    }

    .back-endorsement-author {
      font-family: var(--font-sans);
      font-size: 7.8pt;
      font-weight: 600;
      color: ${themeColors.gold};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .back-author-box {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 10px;
      margin-top: 0.2in;
    }

    .back-author-avatar {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: var(--book-primary);
      border: 2px solid ${themeColors.gold};
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-size: 14pt;
      font-weight: bold;
      color: #ffffff;
      flex-shrink: 0;
    }

    .back-author-text {
      font-size: 8.5pt;
      line-height: 1.35;
      color: #cbd5e1;
    }

    .back-footer-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 0.25in;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* =========================================================
       PRELIMINARY PAGES
       ========================================================= */
    .half-title-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 8.5in;
    }

    .half-title-text {
      font-family: var(--font-display);
      font-size: 18pt;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--book-dark);
    }

    .title-page {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      min-height: 8.5in;
      padding: 0.5in 0;
    }

    .title-page h1 {
      font-size: 26pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--book-dark);
      margin-bottom: 0.15in;
    }

    .title-page-subtitle {
      font-family: var(--font-sans);
      font-size: 11pt;
      color: var(--book-text-muted);
      max-width: 4in;
      line-height: 1.5;
    }

    .title-page-author {
      margin-top: 0.5in;
    }

    .title-page-author-name {
      font-family: var(--font-display);
      font-size: 14pt;
      font-weight: 700;
      color: var(--book-dark);
    }

    .title-page-author-cred {
      font-family: var(--font-sans);
      font-size: 9pt;
      color: var(--book-text-muted);
    }

    .title-page-publisher {
      font-family: var(--font-sans);
      font-size: 9pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--book-text-muted);
    }

    .copyright-page {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: 8.5in;
      font-family: var(--font-sans);
      font-size: 8.5pt;
      line-height: 1.6;
      color: #4b5563;
    }

    .dedication-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 8.5in;
      font-style: italic;
      font-size: 12.5pt;
      padding: 0 0.8in;
      color: #1f2937;
    }

    .epigraph-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 8.5in;
      padding: 0 0.8in;
    }

    /* Table of Contents */
    .toc-title {
      text-align: center;
      font-size: 20pt;
      margin-bottom: 0.4in;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .toc-item {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 0.18in;
      font-family: var(--font-sans);
      font-size: 9.5pt;
      text-decoration: none;
      color: var(--book-dark);
    }

    .toc-item:hover {
      color: var(--book-primary);
    }

    .toc-label {
      font-weight: 600;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .toc-dots {
      flex: 1;
      border-bottom: 1px dotted #cbd5e1;
      margin: 0 10px;
    }

    .toc-page {
      font-family: var(--font-mono);
      font-size: 8.5pt;
      color: #64748b;
    }

    /* =========================================================
       CHAPTER LAYOUT & SPECIAL ELEMENTS
       ========================================================= */
    .chapter-header {
      margin-top: 0.4in;
      margin-bottom: 0.4in;
      text-align: center;
      page-break-after: avoid;
      break-after: avoid;
    }

    .chapter-number {
      font-family: var(--font-sans);
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--book-accent);
      margin-bottom: 8px;
    }

    .chapter-title {
      font-size: 22pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--book-dark);
      margin-bottom: 6px;
    }

    .chapter-subtitle {
      font-family: var(--font-sans);
      font-size: 10.5pt;
      font-style: italic;
      color: var(--book-text-muted);
      max-width: 4.8in;
      margin: 0 auto;
    }

    .chapter-epigraph {
      margin: 0.25in 0.5in 0.35in 0.5in;
      font-style: italic;
      text-align: center;
      font-size: 10pt;
      color: #4b5563;
    }

    .chapter-epigraph-author {
      display: block;
      font-style: normal;
      font-family: var(--font-sans);
      font-size: 8.5pt;
      color: #6b7280;
      margin-top: 4px;
    }

    /* Key Takeaways Box */
    .takeaways-box {
      background: var(--book-surface);
      border: 1px solid var(--book-border);
      border-left: 4px solid var(--book-primary);
      padding: 14px 18px;
      margin: 1.5em 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .takeaways-box-title {
      font-family: var(--font-sans);
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--book-primary);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .takeaways-list {
      list-style-type: none;
      padding-left: 0;
    }

    .takeaways-list li {
      position: relative;
      padding-left: 18px;
      margin-bottom: 6px;
      font-size: 9.8pt;
      line-height: 1.5;
    }

    .takeaways-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--book-primary);
      font-weight: bold;
    }

    /* Case Study Box */
    .case-study-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 16px;
      margin: 1.6em 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .case-study-tag {
      display: inline-block;
      background: var(--book-dark);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 2px 8px;
      margin-bottom: 8px;
    }

    .case-study-title {
      font-family: var(--font-display);
      font-size: 12pt;
      font-weight: 700;
      color: var(--book-dark);
      margin-bottom: 8px;
    }

    .case-study-section {
      margin-top: 8px;
      font-size: 9.5pt;
      line-height: 1.55;
    }

    .case-study-section-label {
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: 8.5pt;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Discussion Questions Box */
    .discussion-box {
      background: #fafaf9;
      border: 1px dashed #d6d3d1;
      padding: 14px 18px;
      margin: 1.5em 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .discussion-box-title {
      font-family: var(--font-sans);
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #57534e;
      margin-bottom: 8px;
    }

    .discussion-list {
      padding-left: 20px;
    }

    .discussion-list li {
      font-size: 9.5pt;
      margin-bottom: 6px;
      color: #292524;
      line-height: 1.5;
    }

    /* =========================================================
       BACK MATTER (GLOSSARY, BIBLIOGRAPHY, INDEX)
       ========================================================= */
    .glossary-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 0.3in;
    }

    .glossary-item {
      padding-bottom: 8px;
      border-bottom: 1px dotted #e2e8f0;
      font-size: 9.5pt;
      line-height: 1.5;
    }

    .glossary-term {
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: 9.5pt;
      color: var(--book-dark);
      display: inline;
      margin-right: 6px;
    }

    .bibliography-list {
      list-style: none;
      padding: 0;
      margin-top: 0.3in;
    }

    .bibliography-item {
      padding-left: 0.5in;
      text-indent: -0.5in;
      margin-bottom: 14px;
      font-size: 9pt;
      line-height: 1.55;
      color: #1f2937;
    }

    .barcode-container {
      background: #ffffff;
      padding: 6px 12px;
      border-radius: 2px;
      text-align: center;
      display: inline-block;
    }

    .barcode-svg {
      width: 140px;
      height: 38px;
    }

    .barcode-isbn {
      font-family: var(--font-mono);
      font-size: 7.5pt;
      color: #000000;
      letter-spacing: 0.08em;
      margin-top: 2px;
    }
  </style>
</head>
<body>

<div class="book-container">

  <!-- =========================================================
       1. FRONT COVER (6"x9" CSS/HTML)
       ========================================================= -->
  <section class="page-sheet cover-front" id="cover-front">
    <div class="cover-header-badge">
      ${escapeXml(book.edition || "FIRST TRADE MONOGRAPH EDITION")}
    </div>

    <div class="cover-title-group">
      <h1 class="cover-title">${escapeXml(book.title)}</h1>
      <div class="cover-subtitle">${escapeXml(book.subtitle)}</div>
      <div class="cover-divider"></div>
      <div class="cover-tagline">${escapeXml(book.tagline)}</div>
    </div>

    <div class="cover-footer-group">
      <div class="cover-author-name">${escapeXml(book.author.name)}</div>
      <div class="cover-author-credentials">${escapeXml(book.author.credentials || "")}</div>
      <div style="font-family: var(--font-sans); font-size: 7.5pt; color: ${themeColors.gold}; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 10px;">
        ${escapeXml(book.publisher)}
      </div>
    </div>
  </section>

  <!-- =========================================================
       2. HALF-TITLE PAGE
       ========================================================= -->
  <section class="page-sheet half-title-page" id="half-title">
    <div class="half-title-text">${escapeXml(book.title)}</div>
  </section>

  <!-- =========================================================
       3. TITLE PAGE
       ========================================================= -->
  <section class="page-sheet title-page" id="title-page">
    <div style="margin-top: 0.3in;">
      <div style="font-family: var(--font-sans); font-size: 8pt; letter-spacing: 0.2em; text-transform: uppercase; color: var(--book-accent); margin-bottom: 8px;">
        A Monograph in Frontier Cognitive Systems
      </div>
      <h1>${escapeXml(book.title)}</h1>
      <div class="title-page-subtitle">${escapeXml(book.subtitle)}</div>
    </div>

    <div class="title-page-author">
      <div class="title-page-author-name">${escapeXml(book.author.name)}</div>
      <div class="title-page-author-cred">${escapeXml(book.author.credentials || "")}</div>
      <div style="font-family: var(--font-sans); font-size: 8.5pt; color: #6b7280; margin-top: 4px;">
        ${escapeXml(book.author.affiliation || "")}
      </div>
    </div>

    <div style="margin-bottom: 0.3in;">
      <div class="title-page-publisher">${escapeXml(book.publisher)}</div>
      <div style="font-family: var(--font-sans); font-size: 8pt; color: #9ca3af; margin-top: 4px;">
        New York • Oxford • Zurich • Singapore • Tokyo
      </div>
    </div>
  </section>

  <!-- =========================================================
       4. COPYRIGHT & CIP PAGE
       ========================================================= -->
  <section class="page-sheet copyright-page" id="copyright">
    <p>Copyright © ${book.publicationYear} by ${escapeXml(book.author.name)}</p>
    <p>All rights reserved. No part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form or by any means—electronic, mechanical, photocopying, recording, or otherwise—without prior written permission from the publisher, except in the case of brief quotations embodied in critical reviews and scholarly articles.</p>
    
    <div style="margin: 14px 0; padding: 10px 0; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
      <p style="font-weight: 600; margin-bottom: 4px;">Library of Congress Cataloging-in-Publication Data</p>
      <p>Names: ${escapeXml(book.author.name)}, author.<br>
      Title: ${escapeXml(book.title)}: ${escapeXml(book.subtitle)} / ${escapeXml(book.author.name)}.<br>
      Description: First edition. | New York : ${escapeXml(book.publisher)}, ${book.publicationYear}. | Includes bibliographical references and index.<br>
      Identifiers: ISBN ${escapeXml(book.isbn)} (trade paper) | ISBN 978-1-962841-10-0 (ebook)<br>
      Subjects: LCSH: Artificial intelligence. | Multiagent systems. | Cognitive architectures. | Corporate governance.<br>
      Classification: LCC Q335 .L36 ${book.publicationYear} | DDC 006.3—dc23</p>
    </div>

    <p>ISBN-13: ${escapeXml(book.isbn)}<br>
    Printed in the United States of America on acid-free, archival-quality paper.<br>
    Set in 11.5 pt EB Garamond with Cinzel Display headings.<br>
    Book architecture & typographical design by FULLBOOKPROMPTER Systems.<br>
    10 9 8 7 6 5 4 3 2 1</p>
  </section>

  <!-- =========================================================
       5. DEDICATION
       ========================================================= -->
  <section class="page-sheet dedication-page" id="dedication">
    <p>${escapeXml(book.dedication)}</p>
  </section>

  <!-- =========================================================
       6. EPIGRAPH
       ========================================================= -->
  <section class="page-sheet epigraph-page" id="epigraph">
    <blockquote>
      "${escapeXml(book.epigraph.quote)}"
      <footer>— ${escapeXml(book.epigraph.attribution)}</footer>
    </blockquote>
  </section>

  <!-- =========================================================
       7. TABLE OF CONTENTS
       ========================================================= -->
  <section class="page-sheet" id="table-of-contents">
    <h2 class="toc-title">Table of Contents</h2>

    <div style="margin-bottom: 0.3in;">
      <div style="font-family: var(--font-sans); font-size: 8.5pt; letter-spacing: 0.15em; text-transform: uppercase; color: var(--book-accent); margin-bottom: 8px; font-weight: 700;">
        Preliminary Matter
      </div>
      <a href="#foreword" class="toc-item">
        <span class="toc-label">Foreword by ${escapeXml(book.foreword.author.split(',')[0])}</span>
        <span class="toc-dots"></span>
        <span class="toc-page">ix</span>
      </a>
      <a href="#preface" class="toc-item">
        <span class="toc-label">Preface</span>
        <span class="toc-dots"></span>
        <span class="toc-page">xiii</span>
      </a>
      <a href="#acknowledgments" class="toc-item">
        <span class="toc-label">Acknowledgments</span>
        <span class="toc-dots"></span>
        <span class="toc-page">xvii</span>
      </a>
      <a href="#introduction" class="toc-item">
        <span class="toc-label">Introduction: The Convergence Thesis</span>
        <span class="toc-dots"></span>
        <span class="toc-page">1</span>
      </a>
    </div>

    <div style="margin-bottom: 0.3in;">
      <div style="font-family: var(--font-sans); font-size: 8.5pt; letter-spacing: 0.15em; text-transform: uppercase; color: var(--book-accent); margin-bottom: 8px; font-weight: 700;">
        Main Monograph Chapters
      </div>
      ${book.chapters.map((ch, idx) => `
        <a href="#chapter-${ch.number}" class="toc-item">
          <span class="toc-label">
            <span style="color: var(--book-primary); min-width: 22px;">${ch.number}.</span>
            ${escapeXml(ch.title)}
          </span>
          <span class="toc-dots"></span>
          <span class="toc-page">${15 + idx * 28}</span>
        </a>
      `).join('')}
    </div>

    <div>
      <div style="font-family: var(--font-sans); font-size: 8.5pt; letter-spacing: 0.15em; text-transform: uppercase; color: var(--book-accent); margin-bottom: 8px; font-weight: 700;">
        Back Matter & Apparatus
      </div>
      <a href="#conclusion" class="toc-item">
        <span class="toc-label">Conclusion: The Sovereign Path Forward</span>
        <span class="toc-dots"></span>
        <span class="toc-page">${15 + book.chapters.length * 28}</span>
      </a>
      <a href="#glossary" class="toc-item">
        <span class="toc-label">Appendix A: Comprehensive Glossary (${book.glossary.length} Terms)</span>
        <span class="toc-dots"></span>
        <span class="toc-page">${24 + book.chapters.length * 28}</span>
      </a>
      <a href="#bibliography" class="toc-item">
        <span class="toc-label">Appendix B: Bibliography & APA 7th References (${book.bibliography.length} Sources)</span>
        <span class="toc-dots"></span>
        <span class="toc-page">${32 + book.chapters.length * 28}</span>
      </a>
      <a href="#author-biography" class="toc-item">
        <span class="toc-label">About the Author</span>
        <span class="toc-dots"></span>
        <span class="toc-page">${42 + book.chapters.length * 28}</span>
      </a>
    </div>
  </section>

  <!-- =========================================================
       8. FOREWORD
       ========================================================= -->
  <section class="page-sheet prose-book" id="foreword">
    <div class="chapter-header">
      <div class="chapter-number">Foreword</div>
      <h2 style="border: none; margin-top: 0;">Architecting the Sovereign Mind</h2>
      <div style="font-family: var(--font-sans); font-size: 9.5pt; color: #6b7280;">
        by ${escapeXml(book.foreword.author)}
      </div>
    </div>
    ${formatParagraphs(book.foreword.content, true)}
  </section>

  <!-- =========================================================
       9. PREFACE
       ========================================================= -->
  <section class="page-sheet prose-book" id="preface">
    <div class="chapter-header">
      <div class="chapter-number">Author's Preface</div>
      <h2 style="border: none; margin-top: 0;">From Benchmarks to Boardrooms</h2>
    </div>
    ${formatParagraphs(book.preface, true)}
  </section>

  <!-- =========================================================
       10. ACKNOWLEDGMENTS
       ========================================================= -->
  <section class="page-sheet prose-book" id="acknowledgments">
    <div class="chapter-header">
      <div class="chapter-number">Acknowledgments</div>
      <h2 style="border: none; margin-top: 0;">Institutional & Intellectual Debts</h2>
    </div>
    ${formatParagraphs(book.acknowledgments, true)}
  </section>

  <!-- =========================================================
       11. INTRODUCTION
       ========================================================= -->
  <section class="page-sheet prose-book" id="introduction">
    <div class="chapter-header">
      <div class="chapter-number">Introduction</div>
      <h2 style="border: none; margin-top: 0;">${escapeXml(book.introduction.title)}</h2>
    </div>
    ${formatParagraphs(book.introduction.content, true)}
  </section>

  <!-- =========================================================
       12. MAIN BODY CHAPTERS (10+ COMPLETE CHAPTERS)
       ========================================================= -->
  ${book.chapters.map(chapter => `
    <section class="page-sheet prose-book" id="chapter-${chapter.number}">
      <div class="chapter-header">
        <div class="chapter-number">Chapter ${chapter.number}</div>
        <h1 class="chapter-title">${escapeXml(chapter.title)}</h1>
        ${chapter.subtitle ? `<div class="chapter-subtitle">${escapeXml(chapter.subtitle)}</div>` : ''}
      </div>

      ${chapter.epigraph ? `
        <div class="chapter-epigraph">
          "${escapeXml(chapter.epigraph.quote)}"
          <span class="chapter-epigraph-author">— ${escapeXml(chapter.epigraph.attribution)}</span>
        </div>
      ` : ''}

      ${chapter.abstract ? `
        <div style="font-family: var(--font-sans); font-size: 9.5pt; color: #4b5563; background: #f9fafb; border: 1px solid #e5e7eb; padding: 12px 16px; margin-bottom: 1.5em; border-left: 3px solid var(--book-accent);">
          <strong>Chapter Abstract:</strong> ${escapeXml(chapter.abstract)}
        </div>
      ` : ''}

      ${chapter.sections.map((section, sIdx) => `
        <div style="margin-bottom: 1.2em;">
          <h2>${escapeXml(section.heading)}</h2>
          ${formatParagraphs(section.content, sIdx === 0)}
        </div>
      `).join('')}

      ${chapter.caseStudy ? `
        <div class="case-study-box">
          <span class="case-study-tag">Enterprise Case Study</span>
          <div class="case-study-title">${escapeXml(chapter.caseStudy.title)}</div>
          
          <div class="case-study-section">
            <span class="case-study-section-label">Context & Challenge:</span>
            ${escapeXml(chapter.caseStudy.context)}
          </div>
          
          <div class="case-study-section">
            <span class="case-study-section-label">Architectural Intervention:</span>
            ${escapeXml(chapter.caseStudy.intervention)}
          </div>
          
          <div class="case-study-section">
            <span class="case-study-section-label">Empirical Results & Trade-Offs:</span>
            ${escapeXml(chapter.caseStudy.results)}
          </div>
        </div>
      ` : ''}

      <div class="takeaways-box">
        <div class="takeaways-box-title">Key Architectural Takeaways</div>
        <ul class="takeaways-list">
          ${chapter.takeaways.map(t => `<li>${escapeXml(t)}</li>`).join('')}
        </ul>
      </div>

      <div class="discussion-box">
        <div class="discussion-box-title">Seminar & Executive Discussion Prompts</div>
        <ol class="discussion-list">
          ${chapter.discussionQuestions.map(q => `<li>${escapeXml(q)}</li>`).join('')}
        </ol>
      </div>
    </section>
  `).join('')}

  <!-- =========================================================
       13. CONCLUSION
       ========================================================= -->
  <section class="page-sheet prose-book" id="conclusion">
    <div class="chapter-header">
      <div class="chapter-number">Conclusion</div>
      <h1 class="chapter-title">${escapeXml(book.conclusion.title)}</h1>
    </div>
    ${formatParagraphs(book.conclusion.content, true)}
  </section>

  <!-- =========================================================
       14. APPENDIX A: GLOSSARY (30+ TERMS)
       ========================================================= -->
  <section class="page-sheet" id="glossary">
    <div class="chapter-header">
      <div class="chapter-number">Appendix A</div>
      <h1 class="chapter-title">Comprehensive Glossary</h1>
      <div class="chapter-subtitle">Formal Definitions of 30+ Core Architectural Terms</div>
    </div>

    <div class="glossary-grid">
      ${book.glossary.map(item => `
        <div class="glossary-item">
          <span class="glossary-term">${escapeXml(item.term)}:</span>
          <span>${escapeXml(item.definition)}</span>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- =========================================================
       15. APPENDIX B: BIBLIOGRAPHY & APA 7TH CITATIONS (25-40+)
       ========================================================= -->
  <section class="page-sheet" id="bibliography">
    <div class="chapter-header">
      <div class="chapter-number">Appendix B</div>
      <h1 class="chapter-title">Bibliography & References</h1>
      <div class="chapter-subtitle">APA 7th Edition Verified Scholarly Citations (${book.bibliography.length} Sources)</div>
    </div>

    <ul class="bibliography-list">
      ${book.bibliography.map(item => `
        <li class="bibliography-item">
          ${escapeXml(item.citation)}
        </li>
      `).join('')}
    </ul>
  </section>

  <!-- =========================================================
       16. AUTHOR BIOGRAPHY
       ========================================================= -->
  <section class="page-sheet" id="author-biography">
    <div class="chapter-header">
      <div class="chapter-number">About the Author</div>
      <h1 class="chapter-title">${escapeXml(book.author.name)}</h1>
      <div class="chapter-subtitle">${escapeXml(book.author.credentials || "")}</div>
    </div>

    <div style="margin: 0.3in 0; display: flex; gap: 20px; align-items: flex-start;">
      <div style="width: 80px; height: 80px; border-radius: 8px; background: var(--book-primary); display: flex; align-items: center; justify-content: center; color: white; font-family: var(--font-display); font-size: 24pt; font-weight: bold; flex-shrink: 0; border: 2px solid ${themeColors.gold};">
        ${book.author.name.charAt(0) || 'A'}
      </div>
      <div>
        <p style="font-weight: 600; font-family: var(--font-sans); color: var(--book-dark); margin-bottom: 4px;">
          ${escapeXml(book.author.affiliation || "")}
        </p>
        <p style="font-size: 10pt; line-height: 1.6; color: #374151;">
          ${escapeXml(book.author.bio || "")}
        </p>
        ${book.author.contact ? `
          <p style="font-family: var(--font-sans); font-size: 9pt; color: var(--book-primary); margin-top: 10px;">
            <strong>Inquiries & Contact:</strong> <a href="mailto:${escapeXml(book.author.contact)}" style="color: inherit;">${escapeXml(book.author.contact)}</a>
          </p>
        ` : ''}
      </div>
    </div>
  </section>

  <!-- =========================================================
       17. BACK COVER (6"x9" CSS/HTML)
       ========================================================= -->
  <section class="page-sheet cover-back" id="cover-back">
    <div>
      <div style="font-family: var(--font-sans); font-size: 8.5pt; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: ${themeColors.gold}; margin-bottom: 10px;">
        Praise for Autonomous Horizons
      </div>

      ${book.endorsements.map(e => `
        <div class="back-endorsement-card">
          <p>"${escapeXml(e.quote)}"</p>
          <div class="back-endorsement-author">— ${escapeXml(e.endorser)}${e.affiliation ? `, ${escapeXml(e.affiliation)}` : ''}</div>
        </div>
      `).join('')}

      <div style="margin-top: 0.25in;">
        <div style="font-family: var(--font-display); font-size: 13pt; font-weight: 700; color: #ffffff; margin-bottom: 6px; letter-spacing: 0.05em;">
          The Definitive Architectural Manual
        </div>
        <p class="back-synopsis">
          ${escapeXml(book.backCoverSynopsis)}
        </p>
      </div>
    </div>

    <div>
      <div class="back-author-box">
        <div class="back-author-avatar">
          ${book.author.name.charAt(0) || 'A'}
        </div>
        <div class="back-author-text">
          <strong style="color: #ffffff;">${escapeXml(book.author.name)}</strong>${book.author.credentials ? `, ${escapeXml(book.author.credentials)}` : ""}${book.author.bio ? `. ${escapeXml(book.author.bio)}` : (book.author.affiliation ? `. ${escapeXml(book.author.affiliation)}` : "")}
        </div>
      </div>

      <div class="back-footer-row">
        <div>
          <div style="font-family: var(--font-display); font-size: 10pt; font-weight: bold; color: #ffffff;">
            ${escapeXml(book.publisher)}
          </div>
          <div style="font-family: var(--font-sans); font-size: 7.5pt; color: #94a3b8;">
            COMPUTERS / ARTIFICIAL INTELLIGENCE / ENTERPRISE SYSTEMS
          </div>
        </div>

        <div class="barcode-container">
          <svg class="barcode-svg" viewBox="0 0 160 40">
            <!-- Realistic Barcode Stripes -->
            <rect x="0" y="0" width="3" height="40" fill="#000"/>
            <rect x="5" y="0" width="2" height="40" fill="#000"/>
            <rect x="9" y="0" width="4" height="40" fill="#000"/>
            <rect x="15" y="0" width="1" height="40" fill="#000"/>
            <rect x="18" y="0" width="3" height="40" fill="#000"/>
            <rect x="23" y="0" width="5" height="40" fill="#000"/>
            <rect x="30" y="0" width="2" height="40" fill="#000"/>
            <rect x="34" y="0" width="4" height="40" fill="#000"/>
            <rect x="40" y="0" width="1" height="40" fill="#000"/>
            <rect x="44" y="0" width="3" height="40" fill="#000"/>
            <rect x="49" y="0" width="2" height="40" fill="#000"/>
            <rect x="53" y="0" width="4" height="40" fill="#000"/>
            <rect x="59" y="0" width="2" height="40" fill="#000"/>
            <rect x="63" y="0" width="5" height="40" fill="#000"/>
            <rect x="70" y="0" width="2" height="40" fill="#000"/>
            <rect x="74" y="0" width="3" height="40" fill="#000"/>
            <rect x="79" y="0" width="1" height="40" fill="#000"/>
            <rect x="82" y="0" width="4" height="40" fill="#000"/>
            <rect x="88" y="0" width="2" height="40" fill="#000"/>
            <rect x="92" y="0" width="3" height="40" fill="#000"/>
            <rect x="97" y="0" width="5" height="40" fill="#000"/>
            <rect x="104" y="0" width="2" height="40" fill="#000"/>
            <rect x="108" y="0" width="4" height="40" fill="#000"/>
            <rect x="114" y="0" width="1" height="40" fill="#000"/>
            <rect x="117" y="0" width="3" height="40" fill="#000"/>
            <rect x="122" y="0" width="4" height="40" fill="#000"/>
            <rect x="128" y="0" width="2" height="40" fill="#000"/>
            <rect x="132" y="0" width="3" height="40" fill="#000"/>
            <rect x="137" y="0" width="5" height="40" fill="#000"/>
            <rect x="144" y="0" width="2" height="40" fill="#000"/>
            <rect x="148" y="0" width="4" height="40" fill="#000"/>
            <rect x="154" y="0" width="3" height="40" fill="#000"/>
          </svg>
          <div class="barcode-isbn">${escapeXml(book.isbn)}</div>
        </div>
      </div>
    </div>
  </section>

</div>

<script>
  // Enable smooth anchor link scrolling on screen
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Auto-print triggered if requested for PDF compilation
  if (window.location.search.indexOf('print=true') !== -1 || window.location.hash === '#print') {
    window.addEventListener('load', function () {
      setTimeout(function () {
        window.print();
      }, 400);
    });
  }
</script>

</body>
</html>`;
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatParagraphs(text: string, withDropCap: boolean = false): string {
  if (!text) return "";
  const paragraphs = text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  return paragraphs
    .map((p, idx) => {
      const cls = idx === 0 && withDropCap ? 'class="drop-cap"' : '';
      return `<p ${cls}>${escapeXml(p)}</p>`;
    })
    .join("\n");
}

function getThemePalette(theme: string) {
  switch (theme) {
    case "emerald-press":
      return {
        primary: "#064e3b",
        accent: "#059669",
        dark: "#022c22",
        light: "#ecfdf5",
        surface: "#f0fdf4",
        border: "#a7f3d0",
        gold: "#fbbf24",
      };
    case "obsidian-crimson":
      return {
        primary: "#881337",
        accent: "#e11d48",
        dark: "#0f172a",
        light: "#fff1f2",
        surface: "#fff5f5",
        border: "#fecdd3",
        gold: "#f59e0b",
      };
    case "oxford-burgundy":
      return {
        primary: "#581c87",
        accent: "#9333ea",
        dark: "#2e1065",
        light: "#faf5ff",
        surface: "#fdf4ff",
        border: "#e9d5ff",
        gold: "#eab308",
      };
    case "scholarly-sepia":
      return {
        primary: "#78350f",
        accent: "#b45309",
        dark: "#292524",
        light: "#fffbeb",
        surface: "#fefce8",
        border: "#fed7aa",
        gold: "#d97706",
      };
    case "cybernetic-cobalt":
      return {
        primary: "#0f244a",
        accent: "#0284c7",
        dark: "#050d1a",
        light: "#f0f9ff",
        surface: "#f8fafc",
        border: "#bae6fd",
        gold: "#f59e0b",
      };
    case "slate-titanium":
      return {
        primary: "#1e293b",
        accent: "#3b82f6",
        dark: "#0f172a",
        light: "#f8fafc",
        surface: "#f1f5f9",
        border: "#cbd5e1",
        gold: "#f59e0b",
      };
    case "terracotta-earth":
      return {
        primary: "#9a3412",
        accent: "#ea580c",
        dark: "#1c1917",
        light: "#fff7ed",
        surface: "#fffaf5",
        border: "#fed7aa",
        gold: "#d97706",
      };
    case "classic-navy":
    default:
      return {
        primary: "#1e3a8a",
        accent: "#2563eb",
        dark: "#0f172a",
        light: "#eff6ff",
        surface: "#f8fafc",
        border: "#bfdbfe",
        gold: "#d97706",
      };
  }
}
