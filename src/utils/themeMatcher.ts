import { FontPairing, ThemeDesign } from "../types";

export function autoDesignThemeForSubject(subject: string): ThemeDesign {
  const text = (subject || "").toLowerCase();

  // 1. Artificial Intelligence, Computing, Robotics, Quantum, Cybersecurity, Tech
  if (
    /\b(ai|artificial intelligence|machine learning|deep learning|neural|llm|agentic|autonomous|robot|robotics|algorithm|software|code|cyber|cybersecurity|crypto|blockchain|quantum|data|cloud|devops|fullstack|digital|computing|virtual|iot)\b/i.test(
      text
    )
  ) {
    return {
      name: "Cybernetic Cobalt & Electric Azure",
      archetype: "cybernetic-cobalt",
      primary: "#0f244a",
      accent: "#0284c7",
      dark: "#050d1a",
      light: "#f0f9ff",
      surface: "#f8fafc",
      border: "#bae6fd",
      gold: "#f59e0b",
      fontPairing: "newsreader",
      rationale:
        "Engineered with crisp, high-contrast algorithmic navy and vibrant azure accents, paired with Newsreader editorial typography for contemporary technical rigor.",
    };
  }

  // 2. Biology, Medicine, Healthcare, Ecology, Genetics, Environment, Wellness
  if (
    /\b(bio|biology|biomedical|medicine|medical|health|healthcare|pharma|clinical|gene|genetics|dna|ecology|ecological|environment|climate|sustainability|green|nature|botany|wellness|nutrition|epidemiology)\b/i.test(
      text
    )
  ) {
    return {
      name: "Bio-Emerald & Arbor Jade",
      archetype: "emerald-press",
      primary: "#064e3b",
      accent: "#059669",
      dark: "#022c22",
      light: "#ecfdf5",
      surface: "#f0fdf4",
      border: "#a7f3d0",
      gold: "#eab308",
      fontPairing: "merriweather",
      rationale:
        "Anchored in deep chlorophyll emerald and organic jade tones, complemented by Merriweather's sturdy, legible letterforms for life sciences and empirical health scholarship.",
    };
  }

  // 3. Business, Management, Finance, Law, Economics, Governance, Strategy
  if (
    /\b(business|finance|financial|economics|economy|investing|venture|capital|banking|management|leadership|executive|corporate|governance|law|legal|contract|regulation|strategy|mergers|fiduciary|audit)\b/i.test(
      text
    )
  ) {
    return {
      name: "Executive Navy & Sovereign Gold",
      archetype: "classic-navy",
      primary: "#1e3a8a",
      accent: "#2563eb",
      dark: "#0b193d",
      light: "#eff6ff",
      surface: "#f8fafc",
      border: "#bfdbfe",
      gold: "#d97706",
      fontPairing: "garamond",
      rationale:
        "Crafted with regal institutional navy and burnished gold trims, paired with timeless EB Garamond for authoritative executive discourse and fiduciary gravitas.",
    };
  }

  // 4. Philosophy, Psychology, Cognitive Science, Ethics, Literature, Human Arts
  if (
    /\b(philosophy|philosophical|ethics|moral|psychology|psychological|psychoanalysis|cognitive|cognition|mind|consciousness|literature|literary|poetry|epistemology|humanities|existential|psyche|sociology)\b/i.test(
      text
    )
  ) {
    return {
      name: "Oxford Plum & Crimson Intellect",
      archetype: "oxford-burgundy",
      primary: "#4c0519",
      accent: "#be123c",
      dark: "#1f020a",
      light: "#fff1f2",
      surface: "#fff5f7",
      border: "#fecdd3",
      gold: "#eab308",
      fontPairing: "garamond",
      rationale:
        "Deep contemplative wine and claret accents invoking collegiate hall traditions and philosophical inquiry, paired with classical humanist serif typography.",
    };
  }

  // 5. History, Archaeology, Antiquity, Classics, Heritage, Genealogy, Archive
  if (
    /\b(history|historical|archaeology|ancient|antiquity|medieval|renaissance|archive|archival|classics|roman|greek|monarchy|dynasty|heritage|tradition|civilization)\b/i.test(
      text
    )
  ) {
    return {
      name: "Archival Parchment & Imperial Walnut",
      archetype: "scholarly-sepia",
      primary: "#6b2d0d",
      accent: "#b45309",
      dark: "#292524",
      light: "#fffbeb",
      surface: "#fefce8",
      border: "#fed7aa",
      gold: "#d97706",
      fontPairing: "garamond",
      rationale:
        "Warm antiquarian tones inspired by illuminated vellum manuscripts and seasoned bookbindings, honoring historical provenance and scholarly documentation.",
    };
  }

  // 6. Engineering, Physics, Mathematics, Aerospace, Architecture, Materials
  if (
    /\b(engineering|engineer|physics|physical|math|mathematics|mechanics|aerospace|space|satellite|astronomy|astrophysics|architecture|structural|materials|civil|nanotech|energy|nuclear)\b/i.test(
      text
    )
  ) {
    return {
      name: "Titanium Slate & Electric Sapphire",
      archetype: "slate-titanium",
      primary: "#1e293b",
      accent: "#3b82f6",
      dark: "#0f172a",
      light: "#f8fafc",
      surface: "#f1f5f9",
      border: "#cbd5e1",
      gold: "#f59e0b",
      fontPairing: "newsreader",
      rationale:
        "Industrial graphite and slate matrix illuminated by precision sapphire lines, embodying technical craftsmanship, structural engineering, and quantitative precision.",
    };
  }

  // 7. Military, Geopolitics, Intelligence, Defense, Crisis Management, Security
  if (
    /\b(military|defense|war|geopolitics|geopolitical|crisis|intelligence|tactical|espionage|sovereignty|diplomacy|foreign policy|national security|conflict)\b/i.test(
      text
    )
  ) {
    return {
      name: "Obsidian Iron & Crimson Resolve",
      archetype: "obsidian-crimson",
      primary: "#7f1d1d",
      accent: "#b91c1c",
      dark: "#09090b",
      light: "#fef2f2",
      surface: "#fafafa",
      border: "#fecaca",
      gold: "#d97706",
      fontPairing: "merriweather",
      rationale:
        "Commanding dark obsidian paired with crimson threat indicators and high-impact structural typography for geopolitical strategy and high-stakes statecraft.",
    };
  }

  // 8. Earth Sciences, Geography, Anthropology, Urban Planning, Agriculture, Culture
  if (
    /\b(geography|earth|geology|ocean|anthropology|urban|city|planning|community|indigenous|culture|cultural|agriculture|farming|food|gastronomy)\b/i.test(
      text
    )
  ) {
    return {
      name: "Terracotta Sienna & Warm Ochre",
      archetype: "terracotta-earth",
      primary: "#9a3412",
      accent: "#ea580c",
      dark: "#1c1917",
      light: "#fff7ed",
      surface: "#fffaf5",
      border: "#fed7aa",
      gold: "#d97706",
      fontPairing: "merriweather",
      rationale:
        "Earthy mineral ochre and fired clay tones capturing geographic vitality, sociological context, and cultural heritage.",
    };
  }

  // Default balanced academic theme
  return {
    name: "Classic Oxford Navy & Heraldic Gold",
    archetype: "classic-navy",
    primary: "#1e3a8a",
    accent: "#2563eb",
    dark: "#0f172a",
    light: "#eff6ff",
    surface: "#f8fafc",
    border: "#bfdbfe",
    gold: "#d97706",
    fontPairing: "garamond",
    rationale:
      "Universally balanced scholarly trade palette calibrated for timeless publication and universal readability.",
  };
}

export function getFontFamilyCss(pairing: FontPairing): string {
  switch (pairing) {
    case "merriweather":
      return "'Merriweather', Georgia, 'Times New Roman', serif";
    case "newsreader":
      return "'Newsreader', 'Times New Roman', Georgia, serif";
    case "garamond":
    default:
      return "'EB Garamond', Garamond, Georgia, 'Times New Roman', serif";
  }
}
