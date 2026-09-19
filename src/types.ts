export interface AuthorInfo {
  name: string;
  credentials?: string;
  affiliation?: string;
  bio?: string;
  contact?: string;
}

export interface Section {
  heading: string;
  content: string;
}

export interface CaseStudy {
  title: string;
  context: string;
  intervention: string;
  results: string;
}

export interface Chapter {
  number: number;
  title: string;
  subtitle?: string;
  epigraph?: {
    quote: string;
    attribution: string;
  };
  abstract?: string;
  sections: Section[];
  caseStudy?: CaseStudy;
  takeaways: string[];
  discussionQuestions: string[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface BibliographyItem {
  citation: string;
  year?: string | number;
  type?: "journal" | "book" | "institutional_report" | "conference";
  doi?: string;
}

export interface Endorsement {
  quote: string;
  endorser: string;
  affiliation?: string;
}

export type BookTheme = 
  | "classic-navy"
  | "emerald-press"
  | "obsidian-crimson"
  | "oxford-burgundy"
  | "scholarly-sepia"
  | "cybernetic-cobalt"
  | "slate-titanium"
  | "terracotta-earth"
  | string;

export type FontPairing = 
  | "garamond"
  | "merriweather"
  | "newsreader";

export interface ThemeDesign {
  name: string;
  archetype?: string;
  primary: string;
  accent: string;
  dark: string;
  light: string;
  surface: string;
  border: string;
  gold: string;
  fontPairing: FontPairing;
  rationale?: string;
}

export interface BookProject {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  subject: string;
  author: AuthorInfo;
  isbn: string;
  edition: string;
  publisher: string;
  publicationYear: number;
  theme: BookTheme;
  fontPairing: FontPairing;
  themeDesign?: ThemeDesign;
  dedication: string;
  epigraph: {
    quote: string;
    attribution: string;
  };
  foreword: {
    author: string;
    content: string;
  };
  preface: string;
  acknowledgments: string;
  introduction: {
    title: string;
    content: string;
  };
  chapters: Chapter[];
  conclusion: {
    title: string;
    content: string;
  };
  glossary: GlossaryItem[];
  bibliography: BibliographyItem[];
  endorsements: Endorsement[];
  backCoverSynopsis: string;
  lastUpdated: string;
}
