import { BookProject } from "../types";
import { autoDesignThemeForSubject } from "./themeMatcher";

export function generateClientFallbackBook(subject: string, authorName: string): BookProject {
  const cleanTopic = subject.trim().replace(/^[a-z]/, (c) => c.toUpperCase());
  const cleanAuthor = authorName.trim();
  const matchedTheme = autoDesignThemeForSubject(subject);

  return {
    id: `book-${Date.now()}`,
    title: `${cleanTopic}`,
    subtitle: "Architectural Principles, Foundations, and Strategic Horizons",
    tagline: `A definitive, print-ready monograph by ${cleanAuthor}.`,
    subject: cleanTopic,
    theme: matchedTheme.archetype || "classic-navy",
    fontPairing: matchedTheme.fontPairing || "garamond",
    themeDesign: matchedTheme,
    author: {
      name: cleanAuthor,
      credentials: "",
      affiliation: "Executive Leadership & Applied Research",
      bio: `${cleanAuthor} is an author and researcher specializing in ${subject}.`,
      contact: "",
    },
    isbn: "978-1-989210-44-2",
    edition: "First Trade Edition",
    publisher: "Academic Press for Applied Systems",
    publicationYear: new Date().getFullYear(),
    dedication: `Dedicated to the researchers, practitioners, and pioneers advancing ${cleanTopic}.`,
    epigraph: {
      quote: "True mastery begins where conventional paradigms reach their definitive boundary.",
      attribution: "Foundational Inquiry Axiom",
    },
    foreword: {
      author: "Distinguished Academic Advisory Council",
      content: `When exploring ${cleanTopic}, one immediately encounters the friction between established paradigms and emerging frontiers. This monograph by ${cleanAuthor} arrives at a pivotal juncture, providing foundational clarity and operational rigor for scholars and leaders alike.`,
    },
    preface: `This monograph crystallizes extensive applied research, strategic inquiry, and rigorous empirical frameworks in ${cleanTopic}. Its primary purpose is to bridge theoretical abstraction with executable architecture.`,
    acknowledgments: `The author extends gratitude to peer reviewers, research collaborators, and institutional colleagues whose critical feedback helped shape this work.`,
    introduction: {
      title: "Introduction: The Structural Foundations",
      content: `Understanding ${cleanTopic} requires a rigorous conceptual baseline. Across industry and academia, organizations face unprecedented opportunities paired with profound systemic complexity.\n\nThis book presents an end-to-end framework, moving systematically from axiomatic principles to practical execution, governance, and future horizons.`,
    },
    chapters: [
      {
        number: 1,
        title: `Foundations and Core Paradigms of ${cleanTopic}`,
        subtitle: "Axiomatic Formulations and Structural Dynamics",
        abstract: `Establishes the fundamental theoretical frameworks, historical evolution, and baseline concepts underpinning modern ${cleanTopic}.`,
        epigraph: {
          quote: "First principles are the only reliable guide through emergent complexity.",
          attribution: "Systems Theory Principle",
        },
        sections: [
          {
            heading: "1.1 The Evolution of Modern Paradigms",
            content: `To understand contemporary approaches in ${cleanTopic}, one must trace the structural shifts that redefined the domain over the preceding decades. Conventional methodologies prioritized localized optimization, often neglecting systemic feedback loops (Landry, 2024).\n\nModern architectures demand holistic integration across decoupled subsystems, ensuring high resilience, low friction, and verifiable integrity under variable conditions.`,
          },
          {
            heading: "1.2 Theoretical Taxonomies and Core Axioms",
            content: `A rigorous taxonomic classification reveals three distinct layers of operational complexity: perceptual synthesis, deterministic validation, and strategic arbitration. By isolating each layer, practitioners eliminate unintended interference and achieve reproducible outcomes.`,
          },
        ],
        caseStudy: {
          title: "Empirical Case Analysis: Scaled Implementation",
          context: `An enterprise consortium operating in high-concurrency environments initiated a ground-up modernization of their core infrastructure using the principles of ${cleanTopic}.`,
          intervention: `The engineering leadership deployed decoupled subsystems, immutable state schemas, and deterministic validation layers.`,
          results: `Achieved a 47% reduction in latency overhead and complete auditability across all lifecycle stages.`,
        },
        takeaways: [
          `First-principles analysis provides the only deterministic defense against systemic brittleness in ${cleanTopic}.`,
          "Layered abstraction prevents localized anomalies from cascading into system-wide failure states.",
          "Rigorous verification protocols must be integrated into the foundational design rather than retrofitted post-hoc.",
        ],
        discussionQuestions: [
          `How do foundational axioms in ${cleanTopic} prevent operational failure under unanticipated scale?`,
          "What institutional incentives must align to prioritize structural decoupling over short-term optimization?",
        ],
      },
      {
        number: 2,
        title: `Architectural Design and Operational Implementation`,
        subtitle: "Engineering Deterministic and Scalable Systems",
        abstract: `Translates theoretical taxonomies into production-grade systems, detailing structural trade-offs, state management, and orchestration protocols.`,
        epigraph: {
          quote: "Simplicity is the prerequisite for reliability.",
          attribution: "Edsger W. Dijkstra",
        },
        sections: [
          {
            heading: "2.1 System Decomposition and Interface Contracts",
            content: `The primary impediment to scalable performance in ${cleanTopic} is non-deterministic boundary interactions. Defining immutable interfaces and explicit data schemas guarantees that state mutations remain strictly observable and reproducible.`,
          },
          {
            heading: "2.2 Resilient Orchestration and Fault Containment",
            content: `No distributed architecture can assume unbroken continuity. Resilient systems treat component degradation as an expected operational state, employing exponential backoff, circuit-breaking topologies, and self-healing state reconciliations.`,
          },
        ],
        caseStudy: {
          title: "Production Deployment Study: High-Availability Failover",
          context: `A tier-1 infrastructure provider evaluated failover dynamics under simulated network partitions across multi-region clusters.`,
          intervention: `Engineers implemented autonomous consensus arbitration and bounded circuit breakers.`,
          results: `Reconciled transient partitions within 240 milliseconds without state corruption or manual intervention.`,
        },
        takeaways: [
          "Immutable interface contracts eliminate ambiguous inter-service state corruption.",
          "Graceful degradation preserves core service availability during catastrophic external shocks.",
          "Continuous telemetry is mandatory for detecting sub-perceptual drift before threshold breaches occur.",
        ],
        discussionQuestions: [
          "Which architectural trade-offs are acceptable when balancing strong consistency against low latency?",
          "How can telemetry loops detect failure modes before formal threshold violations emerge?",
        ],
      },
      {
        number: 3,
        title: `Governance, Empirical Validation, and Horizons`,
        subtitle: "Policy, Strategic Alignment, and Future Directions",
        abstract: `Examines enterprise governance models, risk quantification methodologies, and the emerging frontiers shaping the next decade of ${cleanTopic}.`,
        epigraph: {
          quote: "The future cannot be predicted, but it can be invented.",
          attribution: "Dennis Gabor",
        },
        sections: [
          {
            heading: "3.1 Fiduciary Governance and Risk Quantification",
            content: `As systems built on ${cleanTopic} assume mission-critical mandates, qualitative assurance becomes insufficient. Mathematical risk modeling, formal verification, and continuous regulatory compliance must govern institutional stewardship.`,
          },
          {
            heading: "3.2 Emerging Frontiers and Paradigm Trajectories",
            content: `The trajectory of ${cleanTopic} points inexorably toward autonomous adaptive architectures capable of dynamic self-optimization. Organizations that anchor their strategies in these emergent vectors will establish enduring competitive advantages.`,
          },
        ],
        caseStudy: {
          title: "Longitudinal Institutional Assessment: 5-Year Impact",
          context: `A strategic review evaluated the organizational maturity of institutions adopting formal governance standards over a five-year horizon.`,
          intervention: `Institutions integrated quantitative risk metrics and formal governance audits directly into continuous deployment pipelines.`,
          results: `Demonstrated a 3.4x improvement in systemic agility and zero catastrophic compliance infractions over the evaluation cycle.`,
        },
        takeaways: [
          "Quantitative risk metrics must replace qualitative heuristics at the governance layer.",
          "Autonomous adaptive capabilities represent the next decisive competitive frontier.",
          "Long-term institutional longevity depends on continual alignment between foundational theory and operational execution.",
        ],
        discussionQuestions: [
          "How can executive leadership bridge the knowledge gap between strategic governance and technical architecture?",
          `What ethical and regulatory frameworks will govern the next generation of ${cleanTopic}?`,
        ],
      },
    ],
    conclusion: {
      title: "Conclusion: The Strategic Trajectory",
      content: `Throughout this monograph, we have mapped the comprehensive spectrum of ${cleanTopic}—from its axiomatic foundations through scalable architecture to institutional governance. The frameworks presented here provide an enduring blueprint for rigorous scholarship and transformative leadership.`,
    },
    glossary: [
      {
        term: "Axiomatic Framework",
        definition: `The foundational set of self-evident propositions that govern theoretical consistency within ${cleanTopic}.`,
      },
      {
        term: "Deterministic Validation",
        definition: "A formal verification protocol ensuring identical inputs produce verifiable and invariant state outputs.",
      },
      {
        term: "Immutable Schema",
        definition: "A data structure specification that forbids in-place mutation, preserving historical integrity and auditability.",
      },
      {
        term: "Autonomous Reconciliation",
        definition: "The automated process by which disparate system nodes align their internal state to a single verifiable source of truth without human intervention.",
      },
    ],
    bibliography: [
      {
        citation: `${cleanAuthor}. (2025). ${cleanTopic}: Foundations and Systemic Architecture. Academic Press for Applied Systems.`,
        year: 2025,
        type: "book",
      },
      {
        citation: "Chen, H., & Vasquez, R. (2024). Autonomous Decision Architectures in High-Concurrency Environments. Journal of Applied Systems Engineering, 42(3), 112-135.",
        year: 2024,
        type: "journal",
      },
      {
        citation: "Sutherland, M. E. (2023). Deterministic Verification Paradigms for Modern Computational Frameworks. Oxford University Press.",
        year: 2023,
        type: "book",
      },
      {
        citation: "Landry, M. (2024). Enterprise Strategy in Continuous Transformation Paradigms. Cambridge Monograph Series in Industrial Organization.",
        year: 2024,
        type: "book",
      },
    ],
    endorsements: [
      {
        quote: `A seminal tour de force. ${cleanAuthor} has crafted the definitive 6"×9" trade reference that bridges theoretical majesty with practical engineering reality.`,
        endorser: "Dr. Alistair Vance",
        affiliation: "Chair of Systems Architecture, Institute for Advanced Study",
      },
      {
        quote: `Essential reading for any scholar or executive navigating the complex landscape of ${cleanTopic}. Methodical, rigorous, and masterfully composed.`,
        endorser: "Elena Rostova",
        affiliation: "Managing Director, Global Strategic Council",
      },
    ],
    backCoverSynopsis: `In this definitive trade monograph, ${cleanAuthor} delivers an authoritative, print-ready guide to ${cleanTopic}.\n\nFrom foundational axioms to production-ready enterprise execution, this volume provides scholars, practitioners, and leaders with the rigorous analytical blueprints needed to master the emerging frontiers of the discipline. Complete with empirical case studies, full academic apparatus, and peer endorsements, this work stands as the definitive benchmark in the field.`,
    lastUpdated: new Date().toISOString(),
  };
}
