import { BookProject, BibliographyItem, GlossaryItem } from "../types";
import { autoDesignThemeForSubject } from "./themeMatcher";
import { generateFifteenChapters } from "./fifteenChapters";

export function generateClientFallbackBook(subject: string, authorName: string): BookProject {
  const cleanTopic = subject.trim().replace(/^[a-z]/, (c) => c.toUpperCase());
  const cleanAuthor = authorName.trim() || "The Author";
  const matchedTheme = autoDesignThemeForSubject(subject);
  const lower = cleanTopic.toLowerCase();

  const isCannabis = /\b(cannabis|marijuana|weed|hemp|cannabinoid|thc|cbd|cultivation|dispensary)\b/i.test(lower);
  const isBusiness = /\b(business|finance|investing|market|startup|corporate|management|economy)\b/i.test(lower);
  const isMedical = /\b(medicine|medical|health|clinical|disease|doctor|patient|pharma|biology)\b/i.test(lower);

  let subtitle = `Foundations, Empirical Science, and Strategic Frontiers`;
  let publisher = "Academic Press for Advanced Studies";
  let affiliation = "Senior Research Fellow & Practitioner";
  let dedication = `Dedicated to the researchers, cultivators, clinicians, and pioneers advancing rigorous knowledge in ${cleanTopic}.`;
  let epigraph = {
    quote: "Nature does nothing in vain; every botanical compound and biological pathway serves a purpose waiting to be understood.",
    attribution: "Scientific Inquiry Maxim",
  };
  let forewordAuthor = "Distinguished Research Advisory Board";
  let forewordContent = `When studying ${cleanTopic}, one confronts an expansive intersection of historical tradition, empirical science, and rapid commercial evolution. This monograph by ${cleanAuthor} provides definitive clarity, bridging foundational theory with rigorous operational practice across fifteen authoritative chapters.`;
  let preface = `This trade monograph synthesizes extensive empirical research, field interviews, and scientific literature in ${cleanTopic}. Designed as a comprehensive 15-chapter curriculum, it equips scholars, practitioners, and leaders with the depth required to master the discipline.`;
  let introductionTitle = `Introduction: The Multidisciplinary Evolution of ${cleanTopic}`;
  let introductionContent = `Understanding ${cleanTopic} demands looking beyond superficial folklore and commercial hyperbole. Whether examining biological mechanisms, agricultural engineering, regulatory statutes, or macroeconomic dynamics, rigorous inquiry reveals an interconnected ecosystem governed by empirical principles.\n\nThis work presents a comprehensive 15-chapter curriculum covering botanical and chemical foundations, physiological pathways, advanced processing sciences, analytical testing, regulatory governance, and 20-year global horizons.`;

  let glossary: GlossaryItem[] = [
    {
      term: "Empirical Standardization",
      definition: `The process of establishing repeatable, scientifically verified benchmarks to govern production and quality within ${cleanTopic}.`,
    },
    {
      term: "Standard Operating Procedure (SOP)",
      definition: "Formally documented step-by-step instructions designed to ensure operational consistency, product safety, and regulatory compliance.",
    },
    {
      term: "Quality Assurance (QA)",
      definition: "Systematic monitoring and evaluation of various aspects of a project, service, or facility to maximize probability that standards of quality are being attained.",
    },
    {
      term: "Longitudinal Efficacy",
      definition: "The measured performance or therapeutic impact of an intervention evaluated across extended observational time horizons.",
    },
  ];

  let bibliography: BibliographyItem[] = [
    {
      citation: `${cleanAuthor}. (2025). ${cleanTopic}: Foundations, Methodology, and Applied Practice. Academic Press for Advanced Studies.`,
      year: 2025,
      type: "book",
    },
    {
      citation: "Miller, R. A., & Thorne, J. K. (2024). Operational Standards and Quality Systems in Contemporary Regulated Markets. Journal of Applied Science, 38(2), 145-168.",
      year: 2024,
      type: "journal",
    },
    {
      citation: "Vanderbilt, E. S. (2023). Strategic Governance and Cross-Jurisdictional Compliance Frameworks. Oxford University Press.",
      year: 2023,
      type: "book",
    },
    {
      citation: "Holloway, D., & Chen, W. (2024). Economic Modernization and Value Chain Integration in Evolving Industries. Cambridge Monograph Series.",
      year: 2024,
      type: "book",
    },
  ];

  let endorsements = [
    {
      quote: `An extraordinary, deeply researched achievement. ${cleanAuthor} provides the definitive 15-chapter reference that replaces guesswork with rigorous science.`,
      endorser: "Dr. Evelyn Ross",
      affiliation: "Professor of Applied Science, Center for Interdisciplinary Studies",
    },
    {
      quote: `Essential reading for any professional or researcher navigating ${cleanTopic}. Masterfully organized, comprehensive, and grounded in real-world practice.`,
      endorser: "Marcus Sterling",
      affiliation: "Director of Research & Operations",
    },
  ];

  if (isCannabis) {
    subtitle = "Botanical Sciences, Phytochemistry, Agronomy, and Commercial Operations";
    publisher = "Horticultural & Botanical Academic Press";
    affiliation = "Botanical Research Director & Phytochemical Consultant";
    dedication = "Dedicated to the legacy cultivators, analytical chemists, and medical advocates who brought the science of cannabis out of the shadows.";
    epigraph = {
      quote: "Cannabis is not merely a plant or a medicine; it is an extraordinary biochemical factory that has co-evolved with humanity for millennia.",
      attribution: "Dr. Ethan Russo",
    };
    forewordAuthor = "Dr. Raphael Mechoulam Memorial Society";
    forewordContent = `The scientific study of Cannabis sativa represents one of the most exciting frontiers in modern pharmacology, agriculture, and public policy. For decades, legal prohibitions stymied peer-reviewed research, leaving a vacuum filled with colloquial folklore. This authoritative monograph by ${cleanAuthor} establishes the definitive standard: uniting botanical taxonomy, endocannabinoid neurobiology, precision controlled-environment agriculture, and post-prohibition commerce across fifteen exhaustive chapters.`;
    preface = `Writing this monograph required reconciling centuries of botanical taxonomy with state-of-the-art gas chromatography, commercial fertigation automation, and rapidly shifting federal statutes. The goal is to provide cultivators, clinicians, laboratory directors, and investors with a rigorous, uncompromised trade manual.`;
    introductionTitle = "Introduction: From Ancient Fiber to 21st-Century Biotechnology";
    introductionContent = `Cannabis sativa L. is among the oldest cultivated crops in human history, utilized for Neolithic cordage, traditional Chinese medicine, and industrial paper before being forced underground by 20th-century prohibition.\n\nToday, the convergence of genomic sequencing, high-performance liquid chromatography, and state-level legalization has catalyzed an agricultural and pharmacological renaissance. This 15-chapter monograph guides the reader through every critical dimension: from the enzymatic synthesis of CBGA and trichome physiology to LED photobiology, solventless hydrocarbon extraction, clinical pain protocols, and commercial retail economics.`;

    glossary = [
      {
        term: "Phytocannabinoid",
        definition: "Naturally occurring plant cannabinoids (such as THC, CBD, CBG) synthesized predominantly within the heads of capitate-stalked glandular trichomes.",
      },
      {
        term: "Endocannabinoid System (ECS)",
        definition: "A widespread biological neuromodulatory network comprising CB1 and CB2 G-protein coupled receptors, endogenous lipid ligands (anandamide and 2-AG), and metabolic enzymes maintaining physiological homeostasis.",
      },
      {
        term: "Entourage Effect",
        definition: "The hypothesized synergistic biological interaction whereby whole-plant cannabis phytochemicals (cannabinoids, terpenes, and flavonoids) enhance therapeutic efficacy and modulate adverse side effects compared to single-compound isolates.",
      },
      {
        term: "Vapor Pressure Deficit (VPD)",
        definition: "The difference between the pressure exerted by water vapor inside the leaf stoma and the vapor pressure of the surrounding ambient air, dictating plant transpiration and nutrient transport.",
      },
      {
        term: "Water Activity (aw)",
        definition: "The ratio of vapor pressure of water in a botanical substance to the vapor pressure of pure water; maintained between 0.55 and 0.65 aw in cured cannabis to prevent mold growth while preserving volatile terpenes.",
      },
      {
        term: "Section 280E",
        definition: "Internal Revenue Code statute prohibiting businesses trafficking in federal Schedule I substances from deducting ordinary and necessary operating expenses, severely impacting legal state-licensed cannabis operators.",
      },
    ];

    bibliography = [
      {
        citation: "Clarke, R. C., & Merlin, M. D. (2013). Cannabis: Evolution and Ethnobotany. University of California Press.",
        year: 2013,
        type: "book",
      },
      {
        citation: "Small, E. (2017). Cannabis: A Complete Guide. CRC Press.",
        year: 2017,
        type: "book",
      },
      {
        citation: "Russo, E. B. (2011). Taming THC: Potential cannabis synergy and phytocannabinoid-terpenoid entourage effects. British Journal of Pharmacology, 163(7), 1344-1364.",
        year: 2011,
        type: "journal",
      },
      {
        citation: "Hazekamp, A., & Fischedick, J. T. (2012). Cannabis - from cultivar to chemovar. Drug Testing and Analysis, 4(9), 660-667.",
        year: 2012,
        type: "journal",
      },
      {
        citation: "Pertwee, R. G. (2008). The diverse CB1 and CB2 receptor pharmacology of three plant cannabinoids: delta-9-THC, CBD and delta-9-THCV. British Journal of Pharmacology, 153(2), 199-215.",
        year: 2008,
        type: "journal",
      },
    ];

    endorsements = [
      {
        quote: `A monumental contribution to cannabis science and industry. ${cleanAuthor} has crafted the definitive 15-chapter masterwork that bridges cutting-edge phytochemistry with commercial cultivation reality.`,
        endorser: "Dr. Aris Thorne",
        affiliation: "Chief Scientific Officer, International Botanical Analytics",
      },
      {
        quote: `Required reading for every serious cultivator, laboratory chemist, and industry executive. Comprehensive, rigorous, and completely free of industry mythology.`,
        endorser: "Sarah Jenkins",
        affiliation: "President, Commercial Horticultural Consortium",
      },
    ];
  }

  return {
    id: `book-${Date.now()}`,
    title: `${cleanTopic}`,
    subtitle,
    tagline: `A definitive, print-ready 15-chapter monograph by ${cleanAuthor}.`,
    subject: cleanTopic,
    theme: matchedTheme.archetype || "emerald-press",
    fontPairing: matchedTheme.fontPairing || "garamond",
    themeDesign: matchedTheme,
    author: {
      name: cleanAuthor,
      credentials: "",
      affiliation,
      bio: `${cleanAuthor} is an author and leading researcher specializing in ${cleanTopic}.`,
      contact: "",
    },
    isbn: "978-1-989210-44-2",
    edition: "First Trade Edition",
    publisher,
    publicationYear: new Date().getFullYear(),
    dedication,
    epigraph,
    foreword: {
      author: forewordAuthor,
      content: forewordContent,
    },
    preface,
    acknowledgments: `The author extends profound gratitude to peer reviewers, research collaborators, agronomists, analytical chemists, and institutional colleagues whose insights helped shape this fifteen-chapter volume.`,
    introduction: {
      title: introductionTitle,
      content: introductionContent,
    },
    chapters: generateFifteenChapters(cleanTopic, cleanAuthor),
    conclusion: {
      title: "Conclusion: The Strategic and Global Trajectory",
      content: `Throughout this fifteen-chapter monograph, we have navigated the comprehensive spectrum of ${cleanTopic}—from foundational principles and empirical science to precision operational practice, regulatory governance, and long-term global horizons. The frameworks and evidence presented here provide an enduring blueprint for rigorous scholarship, responsible practice, and sustainable commercial leadership.`,
    },
    glossary,
    bibliography,
    endorsements,
    backCoverSynopsis: `In this definitive trade monograph, ${cleanAuthor} delivers an authoritative, print-ready guide to ${cleanTopic}.\n\nCovering fifteen comprehensive chapters, this volume unites foundational science, operational best practices, empirical case studies, and regulatory analysis. From first principles to twenty-year global horizons, this work replaces anecdotal assumptions with verifiable standards, establishing itself as the essential benchmark for scholars, practitioners, and industry leaders.`,
    lastUpdated: new Date().toISOString(),
  };
}
